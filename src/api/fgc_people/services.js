const googleSheet = require("../../helpers/google_form");

exports.getAllData = async () => {
  const spreadSheetData = await googleSheet.parseSheet();
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