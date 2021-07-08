const util = require('util');
const googleSheet = require("../helpers/google_form");

// Convert parseSheet method to a promise
const parseSheet = util.promisify(googleSheet.parseSheet);

exports.getAllData = async () => {
  const spreadSheetData = await parseSheet();
  return spreadSheetData.map(prepareObject);
};

// Private Helper Methods
const prepareObject = (row) => ({
  firstName: row['Firstname'],
  lastName: row['Lastname'],
  dob: row['Date Of Birth'], // this can be changed to full string, like "March, 1991"
  phoneNumber: row['Phone Number'],
  location: row['Place of Residence (State/Country)'],
  image: row['Recent Photo'],
  socialMedia: {
    facebook: row['Facebook handle'],
    instagram: row['Instagram Handle']
  }
});