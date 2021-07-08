const token_id = process.env.BULK_SMS_TOKEN_ID
const token_secret = process.env.BULK_SMS_TOKEN_SECRET
const basic_auth = process.env.BULK_SMS_BASIC_AUTH

module.exports.sendMessage = function(message, phones){
    const https = require('https');

    let username = process.env.BULK_SMS_USERNAME;
    let password = process.env.BULK_SMS_PASSWORD;

    let postData = JSON.stringify({
    'to' : phones,
    'body': message
    });

    let options = {
    hostname: 'api.bulksms.com',
    port: 443,
    path: '/v1/messages',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
    };

    let req = https.request(options, (resp) => {
    console.log('statusCode:', resp.statusCode);
    let data = '';
        resp.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        console.log("Response:", data);
    });
    });

    req.on('error', (e) => {
    console.error(e);
    });

    req.write(postData);
    req.end();

}