const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
module.exports.parseSheet = async function run(callback){
    await doc.useServiceAccountAuth(require(process.env.GOOGLE_KEY_FILE));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    callback(rows)
}