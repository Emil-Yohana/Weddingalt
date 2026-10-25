const SPREADSHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'RSVPs';

function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'First name',
      'Last name',
      'Email',
      'Attendance',
      'Number of guests',
      'Dietary restrictions',
      'Song request',
      'Message',
      'Language'
    ]);
  }
}

function doPost(event) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = event && event.parameter ? event.parameter : {};

  sheet.appendRow([
    new Date(),
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.attendance || '',
    data.guestCount || '1',
    data.dietaryRestrictions || '',
    data.song || '',
    data.message || '',
    data.language || 'en'
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput('RSVP endpoint is ready.')
    .setMimeType(ContentService.MimeType.TEXT);
}
