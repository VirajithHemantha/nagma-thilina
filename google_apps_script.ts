function doPost(e: any) {
  try {
    // 1. Check if the request contains parameters
    if (!e || !e.parameter) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No parameters provided"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. Extract the 'sheet' name (e.g., 'rsvp' or 'wish') and the JSON 'payload'
    var sheetName = e.parameter.sheet; 
    var payloadStr = e.parameter.payload;
    
    if (!sheetName || !payloadStr) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Missing 'sheet' or 'payload' parameter"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the stringified payload sent from the frontend
    var payload = JSON.parse(payloadStr);
    
    // 3. Connect to the Google Spreadsheet using the provided ID
    var doc = SpreadsheetApp.openById('1oys5FvkA3TElwKwQHHLvH5M0z3p-nheTRjUHDOJMH2o');
    
    // 4. Find the sheet by name or create it dynamically if it doesn't exist
    var sheet = doc.getSheetByName(sheetName);
    var isNewSheet = false;
    
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      isNewSheet = true;
    }
    
    // 5. Handle headers automatically based on the payload's keys
    var headers = Object.keys(payload);
    
    if (isNewSheet) {
      // If it's a brand new sheet, set the first row as headers and make them bold
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    } else {
      // If the sheet exists, read existing headers to match the payload correctly
      var existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      
      var newHeadersAdded = false;
      headers = existingHeaders;
      
      // Check if the payload contains any fields not currently in the headers
      Object.keys(payload).forEach(function(key) {
        if (headers.indexOf(key) === -1) {
          headers.push(key);
          newHeadersAdded = true;
        }
      });
      
      // If new fields were found, update the header row
      if (newHeadersAdded) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      }
    }
    
    // 6. Map the payload values to the corresponding headers
    var rowData = [];
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      // Push the value if it exists, otherwise leave the cell blank
      rowData.push(payload[header] !== undefined ? payload[header] : "");
    }
    
    // 7. Append the data as a new row to the sheet
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sheet: sheetName,
      message: "Data appended successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error: any) {
    // Return errors if any occur during execution
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Support GET requests as well (optional, mainly for pinging/testing)
function doGet(e: any) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Google Apps Script Web App is running!"
  })).setMimeType(ContentService.MimeType.JSON);
}
