const csv = require('csv-parser')
const fs = require('fs')

module.exports.parseFile = function(path, callback){
    const results = [];
    fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        callback(results)
    });
}