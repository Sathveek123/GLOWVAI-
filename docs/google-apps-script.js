/**
 * GLOW VAI: Sheets + Drive backend (private, secret-protected, consent-gated)
 * Only your Next.js server may call this. Never put SHEETS_SECRET in browser code.
 */

const LEADS = 'Leads';
const FOLDER_NAME = 'GlowVai Face Scans';
const EXISTING_FOLDER_ID = ''; // paste once, run useExistingFolder(), then clear it
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_CELL_CHARS = 2000;
const MAX_BY_HEADER = { items_json: 6000, sub_scores: 600, message: 1500 };
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const SCAN_TYPES = ['camera', 'upload', 'quiz'];
const PHONE_RE = /^\+?[0-9]{10,14}$/;
const ID_RE = /^[A-Za-z0-9-]{8,64}$/;
const DATE_COLS = ['created_at', 'consent_at', 'completed_at'];
const DATE_FORMAT = 'dd/MM/yyyy HH:mm:ss';

// Internal keys (code uses these). Always append new columns at the END.
const TABS = {
  Leads: [
    'session_id', 'created_at', 'name', 'phone', 'email', 'skin_concern',
    'ip', 'city', 'region', 'country', 'device', 'browser', 'os',
    'referrer', 'utm_source', 'utm_campaign',
    'consent', 'consent_version', 'image_consent', 'marketing_opt_in',
    'age_confirmed', 'consent_at',
    'status', 'completed_at', 'overall_score', 'sub_scores', 'scan_count',
    'image_file_id', 'image_url',
    'scan_type', 'persona', 'glow_level'
  ],
  Waitlist: ['created_at', 'email', 'pincode', 'city', 'consent', 'source'],
  Feedback: ['created_at', 'first_name', 'city', 'skin_type', 'product',
             'rating', 'message', 'consent_to_publish', 'status'],
  Newsletter: ['created_at', 'email', 'source', 'consent', 'consent_at'],
  Contact: ['created_at', 'name', 'email', 'phone', 'topic', 'message', 'status'],
  DataRequests: ['created_at', 'contact', 'type', 'status'],
  OrderIntents: ['created_at', 'order_ref', 'items_json', 'subtotal',
                 'pincode', 'source_page', 'status']
};

// Friendly header text for the Leads tab (staff-readable). Other tabs use the keys.
const LABELS = {
  session_id: 'Session ID', created_at: 'Timestamp (IST)', name: 'Name', phone: 'Phone',
  email: 'Email', skin_concern: 'Skin Concern', ip: 'IP Address', city: 'City',
  region: 'Region', country: 'Country', device: 'Device', browser: 'Browser', os: 'OS',
  referrer: 'Referrer', utm_source: 'UTM Source', utm_campaign: 'UTM Campaign',
  consent: 'Data Consent', consent_version: 'Consent Version', image_consent: 'Image Consent',
  marketing_opt_in: 'Marketing Opt-in', age_confirmed: '18+ Confirmed',
  consent_at: 'Consent Time', status: 'Status', completed_at: 'Scan Completed',
  overall_score: 'Glow Score', sub_scores: 'Sub-scores', scan_count: 'Scan Count',
  image_file_id: 'Image ID', image_url: 'Image Link (private)',
  scan_type: 'Scan Type', persona: 'Persona', glow_level: 'Glow Level'
};
function label_(tab, key) { return tab === LEADS ? (LABELS[key] || key) : key; }

// ---------------- ONE-TIME SETUP ----------------
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone('Asia/Kolkata');
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SECRET')) {
    props.setProperty('SECRET', Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, ''));
  }
  if (!props.getProperty('IMAGE_RETENTION_DAYS')) props.setProperty('IMAGE_RETENTION_DAYS', '90');
  if (!props.getProperty('LEAD_RETENTION_DAYS')) props.setProperty('LEAD_RETENTION_DAYS', '180');
  migrateHeaders();
  const folder = getFolder_();
  Logger.log('SECRET (copy to .env as SHEETS_SECRET): ' + props.getProperty('SECRET'));
  Logger.log('Private Drive folder: ' + folder.getUrl());
  Logger.log('Retention days: images=' + props.getProperty('IMAGE_RETENTION_DAYS') +
    ', leads=' + props.getProperty('LEAD_RETENTION_DAYS') + '. Have your lawyer confirm these.');
}

function useExistingFolder() {
  if (!EXISTING_FOLDER_ID) { Logger.log('Paste a folder ID into EXISTING_FOLDER_ID first.'); return; }
  DriveApp.getFolderById(EXISTING_FOLDER_ID); // throws if no access
  PropertiesService.getScriptProperties().setProperty('FOLDER_ID', EXISTING_FOLDER_ID);
  Logger.log('Folder saved. Now clear EXISTING_FOLDER_ID in the code and run lockDownExistingFiles().');
}

// Makes the folder and every file in it private (owner only). Run once after upgrading.
function lockDownExistingFiles() {
  const folder = getFolder_();
  try { folder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE); } catch (e) {}
  const files = folder.getFiles();
  let n = 0;
  while (files.hasNext()) {
    const f = files.next();
    try { f.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE); n++; } catch (e) {}
  }
  Logger.log('Made ' + n + ' files private. Also check the folder Share dialog for any extra people.');
}

function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'purgeOldData') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('purgeOldData').timeBased().everyDays(1).atHour(3).create();
}

// Adds missing headers at the END. Never moves existing data.
function migrateHeaders() {
  Object.keys(TABS).forEach(name => {
    const sheet = getSheet_(name);
    const lastCol = Math.max(sheet.getLastColumn(), 1);
    const have = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
    TABS[name].forEach(key => {
      const lab = label_(name, key);
      if (have.indexOf(lab) === -1 && have.indexOf(key) === -1) {
        const col = sheet.getLastColumn() + 1;
        sheet.getRange(1, col).setValue(lab)
          .setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#0050FF');
        have.push(lab);
      }
    });
  });
}

// ---------------- ENTRY POINTS ----------------
function doGet() { return out_({ ok: false, error: 'method_not_allowed' }); } // GET never writes

function doPost(e) {
  const lock = LockService.getScriptLock();
  try { lock.waitLock(20000); } catch (err) { return out_({ ok: false, error: 'busy' }); }
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
    return out_({ ok: false, error: 'server_error' }); // no internals leaked
  } finally {
    lock.releaseLock();
  }
}

// ---------------- ACTIONS ----------------
function appendRow_(tab, data) {
  if (!TABS[tab] || tab === LEADS) return out_({ ok: false, error: 'bad_tab' });
  const sheet = getSheet_(tab);
  if (TABS[tab].indexOf('status') > -1 && !data.status) data.status = 'new';
  sheet.appendRow(TABS[tab].map(h => clean_(h, data[h])));
  return out_({ ok: true });
}

function createLead_(d) {
  if (!ID_RE.test(String(d.session_id || ''))) return out_({ ok: false, error: 'bad_session_id' });
  if (d.phone && !PHONE_RE.test(String(d.phone))) return out_({ ok: false, error: 'bad_phone' });

  const scanType = String(d.scan_type || 'camera');
  if (SCAN_TYPES.indexOf(scanType) === -1) return out_({ ok: false, error: 'bad_scan_type' });
  if (scanType !== 'quiz') {
    const score = Number(d.overall_score);
    if (!(score >= 0 && score <= 100)) return out_({ ok: false, error: 'bad_score' });
  }
  // Consent must be recorded. No consent, no row.
  if (String(d.consent) !== 'yes' || String(d.age_confirmed) !== 'yes') {
    return out_({ ok: false, error: 'consent_required' });
  }

  const sheet = getSheet_(LEADS);
  if (findRow_(sheet, d.session_id)) return out_({ ok: true, duplicate: true });

  // Never trust image fields from the client.
  d.image_file_id = '';
  d.image_url = '';
  d.image_consent = String(d.image_consent) === 'yes' ? 'yes' : 'no';
  if (d.image_consent === 'yes' && d.image_base64) {
    const r = saveImage_(d.session_id, d.mime || 'image/jpeg', d.image_base64);
    if (r.ok) { d.image_file_id = r.id; d.image_url = r.url; }
  }
  delete d.image_base64;

  d.scan_type = scanType;
  d.created_at = new Date();
  d.completed_at = new Date();
  d.consent_at = d.consent_at || new Date();
  d.status = 'completed';
  d.scan_count = d.scan_count || 1;
  sheet.appendRow(TABS.Leads.map(h => clean_(h, d[h])));
  return out_({ ok: true, image_saved: !!d.image_file_id });
}

function uploadImage_(b) {
  const id = String(b.session_id || '');
  if (!ID_RE.test(id)) return out_({ ok: false, error: 'bad_session_id' });
  const sheet = getSheet_(LEADS);
  const row = findRow_(sheet, id);
  if (!row) return out_({ ok: false, error: 'session_not_found' });
  if (getCell_(sheet, row, 'image_consent') !== 'yes') return out_({ ok: false, error: 'no_image_consent' });

  const r = saveImage_(id, b.mime, b.image_base64);
  if (!r.ok) return out_({ ok: false, error: r.error });

  const oldId = getCell_(sheet, row, 'image_file_id');
  if (oldId) trash_(oldId); // retake keeps only the latest image
  setCell_(sheet, row, 'image_file_id', r.id);
  setCell_(sheet, row, 'image_url', r.url);
  return out_({ ok: true });
}

function completeScan_(b) {
  const sheet = getSheet_(LEADS);
  const row = findRow_(sheet, b.session_id);
  if (!row) return out_({ ok: false, error: 'session_not_found' });
  const score = Number(b.overall_score);
  if (!(score >= 0 && score <= 100)) return out_({ ok: false, error: 'bad_score' });
  setCell_(sheet, row, 'status', 'completed');
  setCell_(sheet, row, 'completed_at', new Date());
  setCell_(sheet, row, 'overall_score', score);
  setCell_(sheet, row, 'sub_scores', JSON.stringify(b.sub_scores || {}));
  if (b.skin_concern) setCell_(sheet, row, 'skin_concern', b.skin_concern);
  return out_({ ok: true });
}

// DPDP erasure: removes the sheet row AND the Drive image.
function deleteUser_(b) {
  const sheet = getSheet_(LEADS);
  const data = sheet.getDataRange().getValues();
  const K = TABS.Leads;
  const iId = K.indexOf('session_id'), iPhone = K.indexOf('phone');
  const iEmail = K.indexOf('email'), iFile = K.indexOf('image_file_id');
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

// ---------------- RETENTION (daily, batch write) ----------------
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
  const K = TABS.Leads;
  const range = sheet.getRange(2, 1, last - 1, K.length);
  const rows = range.getValues();
  const c = n => K.indexOf(n);
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
function saveImage_(id, mimeIn, b64In) {
  const mime = String(mimeIn || '').toLowerCase();
  if (ALLOWED_MIME.indexOf(mime) === -1) return { ok: false, error: 'bad_mime' };
  const b64 = String(b64In || '').replace(/^data:[^;]+;base64,/, '');
  if (!b64) return { ok: false, error: 'no_image' };
  const bytes = Utilities.base64Decode(b64);
  if (bytes.length > MAX_IMAGE_BYTES) return { ok: false, error: 'image_too_large' };

  const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
  const file = getFolder_().createFile(Utilities.newBlob(bytes, mime, id + '_' + Date.now() + '.' + ext));
  try { file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE); } catch (e) {}
  return { ok: true, id: file.getId(), url: file.getUrl() };
}

function getSheet_(name) {
  const keys = TABS[name];
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
    const labels = keys.map(k => label_(name, k));
    sheet.getRange(1, 1, 1, keys.length).setValues([labels])
      .setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#0050FF');
    sheet.setFrozenRows(1);
    const rows = Math.max(sheet.getMaxRows() - 1, 1);
    ['phone', 'session_id', 'pincode', 'contact'].forEach(h => {
      const i = keys.indexOf(h);
      if (i > -1) sheet.getRange(2, i + 1, rows, 1).setNumberFormat('@');
    });
    DATE_COLS.forEach(h => {
      const i = keys.indexOf(h);
      if (i > -1) sheet.getRange(2, i + 1, rows, 1).setNumberFormat(DATE_FORMAT);
    });
    sheet.autoResizeColumns(1, keys.length);
  }
  return sheet;
}

function getFolder_() {
  const props = PropertiesService.getScriptProperties();
  const saved = props.getProperty('FOLDER_ID');
  if (saved) { try { return DriveApp.getFolderById(saved); } catch (e) {} }
  const folder = DriveApp.createFolder(FOLDER_NAME);
  try { folder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE); } catch (e) {}
  props.setProperty('FOLDER_ID', folder.getId());
  return folder;
}

function trash_(fileId) { try { DriveApp.getFileById(fileId).setTrashed(true); } catch (e) {} }

function findRow_(sheet, id) {
  if (!ID_RE.test(String(id || ''))) return null;
  const hit = sheet.getRange(1, 1, sheet.getMaxRows(), 1)
    .createTextFinder(String(id)).matchEntireCell(true).findNext();
  return hit && hit.getRow() > 1 ? hit.getRow() : null;
}

function getCell_(sheet, row, key) {
  return String(sheet.getRange(row, TABS.Leads.indexOf(key) + 1).getValue() || '');
}

function setCell_(sheet, row, key, value) {
  sheet.getRange(row, TABS.Leads.indexOf(key) + 1).setValue(clean_(key, value));
}

// Dates become real Date objects. Text is length-capped and formula-safe.
// No fake defaults: a missing value stays empty.
function clean_(header, v) {
  if (DATE_COLS.indexOf(header) > -1) {
    const d = v ? new Date(v) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  }
  if (v === undefined || v === null) return '';
  const cap = MAX_BY_HEADER[header] || MAX_CELL_CHARS;
  const s = String(v).slice(0, cap);
  if (header === 'phone') return PHONE_RE.test(s) ? s : '';
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
