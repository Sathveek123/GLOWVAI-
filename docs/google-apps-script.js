/**
 * GLOW VAI: Sheets + Drive backend (single file, six tabs)
 * After any code edit: Deploy > Manage deployments > Edit > New version.
 * Fails closed: no SECRET property means every request is rejected.
 * Only your Next.js server may call this. Never expose the secret to a browser.
 */

const LEADS = 'Leads';
const FOLDER_NAME = 'GlowVai Face Scans';
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_CELL_CHARS = 2000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const PHONE_RE = /^\+?[0-9]{10,14}$/;
const ID_RE = /^[A-Za-z0-9-]{8,64}$/;

const TABS = {
  Leads: [
    'session_id', 'created_at', 'name', 'phone', 'email', 'skin_concern',
    'ip', 'city', 'region', 'country', 'device', 'browser', 'os',
    'referrer', 'utm_source', 'utm_campaign',
    'consent', 'consent_version', 'image_consent', 'marketing_opt_in',
    'age_confirmed', 'consent_at',
    'status', 'completed_at', 'overall_score', 'sub_scores', 'scan_count',
    'image_file_id', 'image_url'
  ],
  Waitlist: ['created_at', 'email', 'pincode', 'city', 'consent', 'source'],
  Feedback: ['created_at', 'first_name', 'city', 'skin_type', 'product',
             'rating', 'message', 'consent_to_publish', 'status'],
  Newsletter: ['created_at', 'email', 'source', 'consent', 'consent_at'],
  Contact: ['created_at', 'name', 'email', 'phone', 'topic', 'message', 'status'],
  DataRequests: ['created_at', 'contact', 'type', 'status']
};

// ---------------- ONE-TIME SETUP ----------------
function setup() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SECRET')) {
    props.setProperty('SECRET', Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, ''));
  }
  if (!props.getProperty('IMAGE_RETENTION_DAYS')) props.setProperty('IMAGE_RETENTION_DAYS', '90');
  if (!props.getProperty('LEAD_RETENTION_DAYS')) props.setProperty('LEAD_RETENTION_DAYS', '180');
  Object.keys(TABS).forEach(getSheet_);
  const folder = getFolder_();
  Logger.log('SECRET (copy to .env as SHEETS_SECRET): ' + props.getProperty('SECRET'));
  Logger.log('Private Drive folder: ' + folder.getUrl());
  Logger.log('Retention days: images=' + props.getProperty('IMAGE_RETENTION_DAYS') +
    ', leads=' + props.getProperty('LEAD_RETENTION_DAYS') + '. Have your lawyer confirm these.');
}

function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'purgeOldData') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('purgeOldData').timeBased().everyDays(1).atHour(3).create();
}

// ---------------- ENTRY POINT ----------------
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return out_({ ok: false, error: 'busy' });
  }
  try {
    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret) return out_({ ok: false, error: 'unauthorized' }); // fail closed
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.secret !== secret) return out_({ ok: false, error: 'unauthorized' });

    switch (body.action) {
      case 'create':       return createLead_(body.data || {});
      case 'upload_image': return uploadImage_(body);
      case 'complete':     return completeScan_(body);
      case 'delete_user':  return deleteUser_(body);
      case 'append':       return appendRow_(body.tab, body.data || {});
      default:             return out_({ ok: false, error: 'unknown_action' });
    }
  } catch (err) {
    return out_({ ok: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}

// ---------------- ACTIONS ----------------
function appendRow_(tab, data) {
  if (!TABS[tab] || tab === LEADS) return out_({ ok: false, error: 'bad_tab' });
  const sheet = getSheet_(tab);
  if (!data.created_at) data.created_at = new Date().toISOString();
  if (TABS[tab].indexOf('status') > -1 && !data.status) data.status = 'new';
  sheet.appendRow(TABS[tab].map(h => clean_(h, data[h])));
  return out_({ ok: true });
}

function createLead_(d) {
  if (!ID_RE.test(String(d.session_id || ''))) return out_({ ok: false, error: 'bad_session_id' });
  if (d.phone && !PHONE_RE.test(String(d.phone))) return out_({ ok: false, error: 'bad_phone' });
  const sheet = getSheet_(LEADS);
  if (findRow_(sheet, d.session_id)) return out_({ ok: true, duplicate: true });

  d.created_at = d.created_at || new Date().toISOString();
  d.status = d.status || 'started';
  d.scan_count = d.scan_count || 0;
  sheet.appendRow(TABS.Leads.map(h => clean_(h, d[h])));
  return out_({ ok: true });
}

function uploadImage_(b) {
  const id = String(b.session_id || '');
  if (!ID_RE.test(id)) return out_({ ok: false, error: 'bad_session_id' });
  const sheet = getSheet_(LEADS);
  const row = findRow_(sheet, id);
  if (!row) return out_({ ok: false, error: 'session_not_found' });
  if (getCell_(sheet, row, 'image_consent') !== 'yes') return out_({ ok: false, error: 'no_image_consent' });

  const mime = String(b.mime || '').toLowerCase();
  if (ALLOWED_MIME.indexOf(mime) === -1) return out_({ ok: false, error: 'bad_mime' });
  const b64 = String(b.image_base64 || '').replace(/^data:[^;]+;base64,/, '');
  if (!b64) return out_({ ok: false, error: 'no_image' });
  const bytes = Utilities.base64Decode(b64);
  if (bytes.length > MAX_IMAGE_BYTES) return out_({ ok: false, error: 'image_too_large' });

  const oldId = getCell_(sheet, row, 'image_file_id');
  if (oldId) trash_(oldId); // retake keeps only the latest image

  const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
  const file = getFolder_().createFile(Utilities.newBlob(bytes, mime, id + '_' + Date.now() + '.' + ext));
  file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);

  setCell_(sheet, row, 'image_file_id', file.getId());
  setCell_(sheet, row, 'image_url', file.getUrl());
  setCell_(sheet, row, 'scan_count', (Number(getCell_(sheet, row, 'scan_count')) || 0) + 1);
  return out_({ ok: true });
}

function completeScan_(b) {
  const sheet = getSheet_(LEADS);
  const row = findRow_(sheet, b.session_id);
  if (!row) return out_({ ok: false, error: 'session_not_found' });
  const score = Number(b.overall_score);
  if (!(score >= 0 && score <= 100)) return out_({ ok: false, error: 'bad_score' });
  setCell_(sheet, row, 'status', 'completed');
  setCell_(sheet, row, 'completed_at', new Date().toISOString());
  setCell_(sheet, row, 'overall_score', score);
  setCell_(sheet, row, 'sub_scores', JSON.stringify(b.sub_scores || {}));
  if (b.skin_concern) setCell_(sheet, row, 'skin_concern', b.skin_concern);
  return out_({ ok: true });
}

// DPDP erasure: removes the sheet row AND the Drive image.
function deleteUser_(b) {
  const sheet = getSheet_(LEADS);
  const data = sheet.getDataRange().getValues();
  const iId = TABS.Leads.indexOf('session_id');
  const iPhone = TABS.Leads.indexOf('phone');
  const iEmail = TABS.Leads.indexOf('email');
  const iFile = TABS.Leads.indexOf('image_file_id');
  const sid = b.session_id ? String(b.session_id) : '';
  const phone = b.phone ? String(b.phone) : '';
  const email = b.email ? String(b.email).toLowerCase() : '';
  if (!sid && !phone && !email) return out_({ ok: false, error: 'no_identifier' });

  let removed = 0;
  for (let r = data.length - 1; r >= 1; r--) {
    const hit = (sid && String(data[r][iId]) === sid) ||
                (phone && String(data[r][iPhone]) === phone) ||
                (email && String(data[r][iEmail]).toLowerCase() === email);
    if (hit) {
      if (data[r][iFile]) trash_(String(data[r][iFile]));
      sheet.deleteRow(r + 1);
      removed++;
    }
  }
  return out_({ ok: true, removed: removed });
}

// ---------------- RETENTION (daily trigger, batch write) ----------------
function purgeOldData() {
  const props = PropertiesService.getScriptProperties();
  const imgDays = Number(props.getProperty('IMAGE_RETENTION_DAYS')) || 90;
  const leadDays = Number(props.getProperty('LEAD_RETENTION_DAYS')) || 180;
  const now = Date.now();
  const imgCutoff = now - imgDays * 864e5;
  const leadCutoff = now - leadDays * 864e5;

  const sheet = getSheet_(LEADS);
  const last = sheet.getLastRow();
  if (last < 2) return;
  const H = TABS.Leads;
  const range = sheet.getRange(2, 1, last - 1, H.length);
  const rows = range.getValues();
  const c = n => H.indexOf(n);
  let changed = false;

  rows.forEach(row => {
    const created = new Date(row[c('created_at')]).getTime();
    if (!created) return;
    if (created < imgCutoff && row[c('image_file_id')]) {
      trash_(String(row[c('image_file_id')]));
      row[c('image_file_id')] = '';
      row[c('image_url')] = '';
      changed = true;
    }
    if (created < leadCutoff && row[c('status')] !== 'anonymised') {
      ['name', 'phone', 'email', 'ip'].forEach(k => { row[c(k)] = '[REMOVED]'; });
      row[c('status')] = 'anonymised';
      changed = true;
    }
  });
  if (changed) range.setValues(rows);
}

// ---------------- HELPERS ----------------
function getSheet_(name) {
  const headers = TABS[name];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    const only = ss.getSheets();
    if (name === LEADS && only.length === 1 && only[0].getName() === 'Sheet1' && only[0].getLastRow() === 0) {
      sheet = only[0].setName(name);
    } else {
      sheet = ss.insertSheet(name);
    }
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      .setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#0050FF');
    sheet.setFrozenRows(1);
    ['phone', 'session_id', 'pincode', 'contact'].forEach(h => {
      const i = headers.indexOf(h);
      if (i > -1) sheet.getRange(2, i + 1, sheet.getMaxRows() - 1, 1).setNumberFormat('@');
    });
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function getFolder_() {
  const props = PropertiesService.getScriptProperties();
  const saved = props.getProperty('FOLDER_ID');
  if (saved) { try { return DriveApp.getFolderById(saved); } catch (e) {} }
  const folder = DriveApp.createFolder(FOLDER_NAME);
  props.setProperty('FOLDER_ID', folder.getId());
  return folder;
}

function trash_(fileId) {
  try { DriveApp.getFileById(fileId).setTrashed(true); } catch (e) {}
}

function findRow_(sheet, id) {
  if (!ID_RE.test(String(id || ''))) return null;
  const hit = sheet.getRange(1, 1, sheet.getMaxRows(), 1)
    .createTextFinder(String(id)).matchEntireCell(true).findNext();
  return hit && hit.getRow() > 1 ? hit.getRow() : null;
}

function getCell_(sheet, row, header) {
  return String(sheet.getRange(row, TABS.Leads.indexOf(header) + 1).getValue() || '');
}

function setCell_(sheet, row, header, value) {
  sheet.getRange(row, TABS.Leads.indexOf(header) + 1).setValue(clean_(header, value));
}

// Caps length and blocks formula injection. Phone is validated by regex instead.
function clean_(header, v) {
  if (v === undefined || v === null) return '';
  let s = String(v).slice(0, MAX_CELL_CHARS);
  if (header === 'phone') return PHONE_RE.test(s) ? s : '';
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
