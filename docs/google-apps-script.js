/**
 * ============================================================================
 * GLOW VAI: Google Sheets + Google Drive Production WebApp Script
 * ============================================================================
 *
 * FEATURES & AUTOMATION:
 * 1. Automatic Table Creation: Paste this into ANY new Google Sheet and deploy.
 *    It automatically creates all required tabs ('Leads', 'Waitlist', 'Feedback',
 *    'Newsletter', 'Contact', 'DataRequests') with formatted headers.
 *
 * 2. Automatic Google Drive Integration: Creates a private Google Drive folder
 *    named "GlowVai Face Scans" to store face scan images, saving the Drive file
 *    ID and view URL directly into the spreadsheet row.
 *
 * 3. Complete Data Tracking:
 *    - Manually provided by user: Name, Phone Number, Face Scan Image, Skin Concern.
 *    - Automatically detected by system: Email, IP Address, Location (City, Region, Country),
 *      Timestamp, Device, Browser, Operating System.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Click Extensions -> Apps Script.
 * 3. Replace all code in the editor with this script.
 * 4. Click Deploy -> New Deployment.
 *    - Select type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy and copy the Web App URL into your .env.local file:
 *    SHEETS_WEBAPP_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
 * ============================================================================
 */

const LEADS_TAB = 'Leads';
const DRIVE_FOLDER_NAME = 'GlowVai Face Scans';
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB limit
const MAX_CELL_CHARS = 2000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

// Table Header Maps for Automatic Table Creation
const TABS = {
  Leads: [
    'session_id',
    'created_at',
    'name',
    'phone',
    'email',
    'skin_concern',
    'ip',
    'city',
    'region',
    'country',
    'device',
    'browser',
    'os',
    'referrer',
    'utm_source',
    'utm_campaign',
    'consent',
    'consent_version',
    'image_consent',
    'marketing_opt_in',
    'age_confirmed',
    'consent_at',
    'status',
    'completed_at',
    'overall_score',
    'sub_scores',
    'scan_count',
    'image_file_id',
    'image_url'
  ],
  Waitlist: ['created_at', 'email', 'pincode', 'city', 'consent', 'source'],
  Feedback: [
    'created_at',
    'first_name',
    'city',
    'skin_type',
    'product',
    'rating',
    'message',
    'consent_to_publish',
    'status'
  ],
  Newsletter: ['created_at', 'email', 'source', 'consent', 'consent_at'],
  Contact: ['created_at', 'name', 'email', 'phone', 'topic', 'message', 'status'],
  DataRequests: ['created_at', 'contact', 'type', 'status']
};

// ---------------- ENTRY POINTS (POST & GET) ----------------

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {
    // Lock timeout fallback
  }

  try {
    let body = {};
    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        body = e.parameter || {};
      }
    } else if (e && e.parameter) {
      body = e.parameter;
    }

    // Optional secret verification if set in Script Properties
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('SECRET');
    if (secret && body.secret && body.secret !== secret) {
      return jsonResponse_({ ok: false, error: 'unauthorized_secret' });
    }

    // Auto-create sheets and tables if missing
    Object.keys(TABS).forEach(getSheet_);

    const action = body.action || (body.data && body.data.action);

    switch (action) {
      case 'create':
        return createLead_(body.data || body);
      case 'upload_image':
        return uploadImage_(body);
      case 'complete':
        return completeScan_(body);
      case 'delete_user':
        return deleteUser_(body);
      case 'append':
        return appendRow_(body.tab || 'Leads', body.data || body);
      default:
        // Default smart fallback: if lead details exist, create lead record
        if (body.name || body.phone || body.session_id || (body.data && body.data.name)) {
          return createLead_(body.data || body);
        }
        return jsonResponse_({
          ok: true,
          message: 'GLOW VAI WebApp Endpoint Active & Ready'
        });
    }
  } catch (err) {
    return jsonResponse_({ ok: false, error: err.toString() });
  } finally {
    try {
      lock.releaseLock();
    } catch (e) {}
  }
}

// ---------------- ACTIONS & BUSINESS LOGIC ----------------

function createLead_(d) {
  const sheet = getSheet_(LEADS_TAB);
  const sessionId = String(d.session_id || '').trim();

  // If duplicate session_id exists, return success without creating duplicate row
  if (sessionId && findRowBySessionId_(sheet, sessionId)) {
    return jsonResponse_({ ok: true, duplicate: true, session_id: sessionId });
  }

  const dataObj = d.data || d;
  dataObj.created_at = dataObj.created_at || new Date().toISOString();
  dataObj.status = dataObj.status || 'started';
  dataObj.scan_count = dataObj.scan_count || 0;

  const row = TABS.Leads.map(header => cleanValue_(header, dataObj[header]));
  sheet.appendRow(row);

  return jsonResponse_({ ok: true, session_id: dataObj.session_id });
}

function uploadImage_(b) {
  const dataObj = b.data || b;
  const sessionId = String(dataObj.session_id || '').trim();

  if (!sessionId) {
    return jsonResponse_({ ok: false, error: 'missing_session_id' });
  }

  const sheet = getSheet_(LEADS_TAB);
  const rowIndex = findRowBySessionId_(sheet, sessionId);

  if (!rowIndex) {
    return jsonResponse_({ ok: false, error: 'session_not_found' });
  }

  const mime = String(dataObj.mime || 'image/jpeg').toLowerCase();
  if (ALLOWED_MIME.indexOf(mime) === -1) {
    return jsonResponse_({ ok: false, error: 'unsupported_image_mime' });
  }

  const b64Data = String(dataObj.image_base64 || '').replace(/^data:[^;]+;base64,/, '');
  if (!b64Data) {
    return jsonResponse_({ ok: false, error: 'empty_image_data' });
  }

  const bytes = Utilities.base64Decode(b64Data);
  if (bytes.length > MAX_IMAGE_BYTES) {
    return jsonResponse_({ ok: false, error: 'image_exceeds_5mb_limit' });
  }

  // Delete previous image file for retakes
  const existingFileId = getCellValue_(sheet, rowIndex, 'image_file_id');
  if (existingFileId) {
    trashDriveFile_(existingFileId);
  }

  // Create new file in Google Drive folder
  const extension = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
  const fileName = 'Scan_' + sessionId + '_' + Date.now() + '.' + extension;
  const blob = Utilities.newBlob(bytes, mime, fileName);
  const folder = getOrCreateDriveFolder_();
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);

  // Update sheet row with Google Drive file ID & URL
  setCellValue_(sheet, rowIndex, 'image_file_id', file.getId());
  setCellValue_(sheet, rowIndex, 'image_url', file.getUrl());
  setCellValue_(sheet, rowIndex, 'image_consent', 'yes');

  const currentCount = Number(getCellValue_(sheet, rowIndex, 'scan_count')) || 0;
  setCellValue_(sheet, rowIndex, 'scan_count', currentCount + 1);

  return jsonResponse_({
    ok: true,
    file_id: file.getId(),
    image_url: file.getUrl()
  });
}

function completeScan_(b) {
  const dataObj = b.data || b;
  const sessionId = String(dataObj.session_id || '').trim();

  const sheet = getSheet_(LEADS_TAB);
  const rowIndex = findRowBySessionId_(sheet, sessionId);

  if (!rowIndex) {
    return jsonResponse_({ ok: false, error: 'session_not_found' });
  }

  const score = Number(dataObj.overall_score);
  if (!isNaN(score)) {
    setCellValue_(sheet, rowIndex, 'overall_score', score);
  }

  if (dataObj.sub_scores) {
    const subScoresStr = typeof dataObj.sub_scores === 'string'
      ? dataObj.sub_scores
      : JSON.stringify(dataObj.sub_scores);
    setCellValue_(sheet, rowIndex, 'sub_scores', subScoresStr);
  }

  if (dataObj.skin_concern) {
    setCellValue_(sheet, rowIndex, 'skin_concern', dataObj.skin_concern);
  }

  setCellValue_(sheet, rowIndex, 'status', 'completed');
  setCellValue_(sheet, rowIndex, 'completed_at', new Date().toISOString());

  return jsonResponse_({ ok: true, session_id: sessionId, status: 'completed' });
}

function appendRow_(tabName, dataObj) {
  if (!TABS[tabName]) {
    tabName = 'Leads';
  }
  const sheet = getSheet_(tabName);
  dataObj.created_at = dataObj.created_at || new Date().toISOString();
  if (TABS[tabName].indexOf('status') > -1 && !dataObj.status) {
    dataObj.status = 'new';
  }

  const row = TABS[tabName].map(header => cleanValue_(header, dataObj[header]));
  sheet.appendRow(row);

  return jsonResponse_({ ok: true, tab: tabName });
}

function deleteUser_(b) {
  const dataObj = b.data || b;
  const sheet = getSheet_(LEADS_TAB);
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return jsonResponse_({ ok: true, removed: 0 });

  const headers = data[0];
  const idxSession = headers.indexOf('session_id');
  const idxPhone = headers.indexOf('phone');
  const idxEmail = headers.indexOf('email');
  const idxFileId = headers.indexOf('image_file_id');

  const targetSession = String(dataObj.session_id || '').trim();
  const targetPhone = String(dataObj.phone || '').trim();
  const targetEmail = String(dataObj.email || '').trim().toLowerCase();

  let removedCount = 0;

  for (let r = data.length - 1; r >= 1; r--) {
    const row = data[r];
    const matchSession = targetSession && String(row[idxSession]) === targetSession;
    const matchPhone = targetPhone && String(row[idxPhone]) === targetPhone;
    const matchEmail = targetEmail && String(row[idxEmail]).toLowerCase() === targetEmail;

    if (matchSession || matchPhone || matchEmail) {
      if (idxFileId > -1 && row[idxFileId]) {
        trashDriveFile_(String(row[idxFileId]));
      }
      sheet.deleteRow(r + 1);
      removedCount++;
    }
  }

  return jsonResponse_({ ok: true, removed: removedCount });
}

// ---------------- AUTOMATIC SHEET & DRIVE CREATORS ----------------

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    const existingSheets = ss.getSheets();
    // Rename default Sheet1 if blank
    if (existingSheets.length === 1 && existingSheets[0].getName() === 'Sheet1' && existingSheets[0].getLastRow() === 0) {
      sheet = existingSheets[0];
      sheet.setName(name);
    } else {
      sheet = ss.insertSheet(name);
    }
  }

  // Create formatted table headers if empty
  if (sheet.getLastRow() === 0) {
    const headers = TABS[name] || TABS.Leads;
    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight('bold')
      .setFontColor('#FFFFFF')
      .setBackground('#0050FF');
    sheet.setFrozenRows(1);

    // Format phone, session_id, pincode as text (@) to prevent stripping leading zeroes or plus signs
    ['phone', 'session_id', 'pincode'].forEach(headerName => {
      const colIdx = headers.indexOf(headerName);
      if (colIdx > -1) {
        sheet.getRange(2, colIdx + 1, sheet.getMaxRows() - 1, 1).setNumberFormat('@');
      }
    });

    try {
      sheet.autoResizeColumns(1, headers.length);
    } catch (e) {}
  }

  return sheet;
}

function getOrCreateDriveFolder_() {
  const props = PropertiesService.getScriptProperties();
  const folderId = props.getProperty('FOLDER_ID');

  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (e) {}
  }

  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    const folder = folders.next();
    props.setProperty('FOLDER_ID', folder.getId());
    return folder;
  }

  const newFolder = DriveApp.createFolder(DRIVE_FOLDER_NAME);
  props.setProperty('FOLDER_ID', newFolder.getId());
  return newFolder;
}

function trashDriveFile_(fileId) {
  try {
    DriveApp.getFileById(fileId).setTrashed(true);
  } catch (e) {}
}

function findRowBySessionId_(sheet, sessionId) {
  if (!sessionId) return null;
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return null;
  const sessionCol = data[0].indexOf('session_id');
  if (sessionCol === -1) return null;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][sessionCol]).trim() === String(sessionId).trim()) {
      return i + 1; // 1-indexed sheet row number
    }
  }
  return null;
}

function getCellValue_(sheet, rowIndex, headerName) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const colIdx = headers.indexOf(headerName);
  if (colIdx === -1) return '';
  return String(sheet.getRange(rowIndex, colIdx + 1).getValue() || '');
}

function setCellValue_(sheet, rowIndex, headerName, value) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const colIdx = headers.indexOf(headerName);
  if (colIdx > -1) {
    sheet.getRange(rowIndex, colIdx + 1).setValue(cleanValue_(headerName, value));
  }
}

function cleanValue_(header, val) {
  if (val === undefined || val === null) return '';
  let str = String(val).slice(0, MAX_CELL_CHARS);
  // Escapes formula injection characters
  if (/^[=+\-@]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------------- ONE-TIME MANUAL INITIALIZER (OPTIONAL) ----------------
function setup() {
  Object.keys(TABS).forEach(getSheet_);
  const folder = getOrCreateDriveFolder_();
  Logger.log('TABLES INITIALIZED SUCCESSFULLY!');
  Logger.log('Drive Folder URL: ' + folder.getUrl());
}
