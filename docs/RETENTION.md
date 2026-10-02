# GLOW VAI Data Retention & Anonymisation Policy

## Regulatory Context
Under India's **Digital Personal Data Protection (DPDP) Act, 2023**, personal data must not be retained longer than necessary to satisfy the specific purpose for which it was collected.

## Retention Policy Rules
1. **Lead Data (`Leads` tab)**: Anonymise or delete phone numbers and email addresses after 180 days unless the user becomes an active customer.
2. **Contact & Data Requests (`Contact`, `DataRequests` tabs)**: Retain for 90 days following request resolution, then purge PII.
3. **Waitlist & Newsletter (`Waitlist`, `Newsletter` tabs)**: Retain until consent is withdrawn via `/api/data-request`.

## Google Apps Script Automated Purge Trigger
Add this time-driven trigger script in Apps Script (`Triggers -> Add Trigger -> autoPurgeOldLeads` daily):

```javascript
function autoPurgeOldLeads() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Leads');
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const dateCol = headers.indexOf('created_at');
  const phoneCol = headers.indexOf('phone');
  const emailCol = headers.indexOf('email');

  const RETENTION_DAYS = 180;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);

  for (let i = 1; i < data.length; i++) {
    const rowDate = new Date(data[i][dateCol]);
    if (rowDate < cutoff) {
      const rowNum = i + 1;
      // Anonymise PII columns
      if (phoneCol > -1) sheet.getRange(rowNum, phoneCol + 1).setValue('[ANONYMISED]');
      if (emailCol > -1) sheet.getRange(rowNum, emailCol + 1).setValue('[ANONYMISED]');
    }
  }
}
```
