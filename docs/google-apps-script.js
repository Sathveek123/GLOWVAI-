/**
 * ============================================================================
 * GLOW VAI: Google Sheets + Google Drive Production WebApp Script
 * ============================================================================
 * TARGET GOOGLE DRIVE FOLDER ID: 1Fa4wfLJvDZiRduv0nq4iH-dTfBrh2q47
 *
 * SPREADSHEET COLUMNS (Single Clean 'Leads' Sheet):
 * 1. Timestamp (IST - Indian Standard Time)
 * 2. IP Address
 * 3. Location
 * 4. Browser
 * 5. OS
 * 6. Name
 * 7. Phone
 * 8. Email
 * 9. Skin Concern
 * 10. Image URL
 * 11. Image ID
 * ============================================================================
 */

const TARGET_FOLDER_ID = '1Fa4wfLJvDZiRduv0nq4iH-dTfBrh2q47';
const SHEET_NAME = 'Leads';

const HEADERS = [
  'Timestamp',
  'IP Address',
  'Location',
  'Browser',
  'OS',
  'Name',
  'Phone',
  'Email',
  'Skin Concern',
  'Image URL',
  'Image ID'
];

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
  } catch (err) {}

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

    const payload = body.data || body;

    // 1. Get or setup active sheet without creating extra tabs
    const sheet = getOrSetupSheet_();

    // 2. Handle image upload if base64 image data is provided
    let imageUrl = payload.image_url || '';
    let imageId = payload.image_file_id || payload.image_id || '';

    if (payload.image_base64) {
      const driveResult = saveToGoogleDrive_(payload.image_base64, payload.name || payload.phone || 'User');
      if (driveResult.ok) {
        imageUrl = driveResult.image_url;
        imageId = driveResult.image_id;
      }
    }

    // 3. Format Timestamp in Indian Standard Time (IST: UTC+5:30)
    const istTimestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    // 4. Extract location string
    let locationStr = payload.location || '';
    if (!locationStr) {
      const city = payload.city || '';
      const region = payload.region || '';
      const country = payload.country || '';
      locationStr = [city, region, country].filter(Boolean).join(', ') || 'India';
    }

    // 5. Construct single clean data row matching HEADERS exactly
    const newRow = [
      istTimestamp,                                // 1. Timestamp (IST)
      payload.ip || '127.0.0.1',                  // 2. IP Address
      locationStr,                                 // 3. Location
      payload.browser || 'Chrome',                 // 4. Browser
      payload.os || 'Android',                     // 5. OS
      payload.name || '',                          // 6. Name
      payload.phone || '',                         // 7. Phone
      payload.email || '',                         // 8. Email
      payload.skin_concern || payload.skinConcern || '', // 9. Skin Concern
      imageUrl,                                    // 10. Image URL
      imageId                                      // 11. Image ID
    ];

    sheet.appendRow(newRow);

    return jsonResponse_({
      ok: true,
      timestamp: istTimestamp,
      image_url: imageUrl,
      image_id: imageId
    });

  } catch (err) {
    return jsonResponse_({ ok: false, error: err.toString() });
  } finally {
    try {
      lock.releaseLock();
    } catch (err) {}
  }
}

// ---------------- GOOGLE DRIVE IMAGE SAVER ----------------

function saveToGoogleDrive_(base64String, userName) {
  try {
    const cleanB64 = base64String.replace(/^data:image\/[^;]+;base64,/, '');
    const bytes = Utilities.base64Decode(cleanB64);
    
    // Determine mime type
    let mime = 'image/jpeg';
    if (base64String.indexOf('image/png') > -1) mime = 'image/png';
    if (base64String.indexOf('image/webp') > -1) mime = 'image/webp';

    const timestampStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyyMMdd_HHmmss");
    const cleanName = String(userName).replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `GlowVai_Scan_${cleanName}_${timestampStr}.jpg`;

    const blob = Utilities.newBlob(bytes, mime, fileName);
    
    // Target Google Drive Folder ID: 1Fa4wfLJvDZiRduv0nq4iH-dTfBrh2q47
    const folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    const file = folder.createFile(blob);

    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {}

    return {
      ok: true,
      image_id: file.getId(),
      image_url: file.getUrl()
    };
  } catch (err) {
    return { ok: false, error: err.toString() };
  }
}

// ---------------- SPREADSHEET INITIALIZER (NO EXTRA TABS) ----------------

function getOrSetupSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    const existingSheets = ss.getSheets();
    if (existingSheets.length > 0) {
      sheet = existingSheets[0];
      sheet.setName(SHEET_NAME);
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setValues([HEADERS])
      .setFontWeight('bold')
      .setFontColor('#FFFFFF')
      .setBackground('#0050FF'); // GLOW VAI Electric Blue
    sheet.setFrozenRows(1);

    // Format phone column as plain text '@'
    sheet.getRange(2, 7, sheet.getMaxRows() - 1, 1).setNumberFormat('@');

    try {
      sheet.autoResizeColumns(1, HEADERS.length);
    } catch (e) {}
  }

  return sheet;
}

function testSetup() {
  const sheet = getOrSetupSheet_();
  Logger.log("SUCCESS! Connected to spreadsheet. Header created: " + sheet.getName());
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
