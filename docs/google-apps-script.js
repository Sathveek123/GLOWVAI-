/**
 * GLOW VAI Extended Google Apps Script Web App
 * ------------------------------------------------------------
 * Supports multiple tabs: 'Leads', 'Waitlist', 'Feedback', 'Newsletter'.
 * Automatically creates sheets and headers if missing.
 * Prevents formula injection by prefixing inputs starting with =, +, -, @ with an apostrophe.
 * 
 * Deployment Instructions:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Replace all existing script code with this file.
 * 4. Go to Project Settings (gear icon) -> Script Properties -> Add 'SECRET' with your random secret string.
 * 5. Click Deploy -> New Deployment -> Web App.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and add it to your environment variables:
 *    SHEETS_WEBAPP_URL="https://script.google.com/macros/s/..."
 *    SHEETS_SECRET="your_secret_string"
 */

const HEADERS_MAP = {
  Leads: [
    'session_id', 'created_at', 'name', 'phone', 'email', 'ip', 'city', 'region',
    'country', 'device', 'browser', 'os', 'referrer', 'utm_source', 'utm_campaign',
    'consent', 'consent_at', 'status', 'completed_at', 'overall_score', 'sub_scores'
  ],
  Waitlist: [
    'created_at', 'email', 'pincode', 'city', 'consent', 'source'
  ],
  Feedback: [
    'created_at', 'first_name', 'city', 'skin_type', 'product', 'rating', 'message', 'consent_to_publish', 'status'
  ],
  Newsletter: [
    'created_at', 'email', 'source', 'consent', 'consent_at'
  ]
};

function sanitizeValue(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (/^[=+\-@]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const expectedSecret = props.getProperty('SECRET');

    const json = JSON.parse(e.postData.contents);

    // Verify secret
    if (expectedSecret && json.secret !== expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized secret' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Handle legacy 'create' / 'complete' actions for Leads tab
    if (json.action === 'create' || json.action === 'complete') {
      return handleLeadsAction(ss, json);
    }

    // Tab-based routing
    const tabName = json.tab || 'Leads';
    const headers = HEADERS_MAP[tabName] || Object.keys(json.data || {});

    let sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(headers);
    }

    const rowData = headers.map(header => sanitizeValue(json.data ? json.data[header] : ''));
    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, tab: tabName }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleLeadsAction(ss, json) {
  let sheet = ss.getSheetByName('Leads');
  if (!sheet) {
    sheet = ss.insertSheet('Leads');
    sheet.appendRow(HEADERS_MAP.Leads);
  }

  if (json.action === 'create') {
    const d = json.data || {};
    const row = HEADERS_MAP.Leads.map(h => sanitizeValue(d[h] || ''));
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, session_id: d.session_id }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (json.action === 'complete') {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const sessionCol = headers.indexOf('session_id');

    if (sessionCol === -1) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'session_id column not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][sessionCol]) === String(json.session_id)) {
        const rowNum = i + 1;
        const statusCol = headers.indexOf('status') + 1;
        const completedCol = headers.indexOf('completed_at') + 1;
        const scoreCol = headers.indexOf('overall_score') + 1;
        const subScoresCol = headers.indexOf('sub_scores') + 1;

        if (statusCol > 0) sheet.getRange(rowNum, statusCol).setValue('completed');
        if (completedCol > 0) sheet.getRange(rowNum, completedCol).setValue(new Date().toISOString());
        if (scoreCol > 0) sheet.getRange(rowNum, scoreCol).setValue(json.overall_score);
        if (subScoresCol > 0) sheet.getRange(rowNum, subScoresCol).setValue(JSON.stringify(json.sub_scores));

        return ContentService.createTextOutput(JSON.stringify({ ok: true, session_id: json.session_id }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
