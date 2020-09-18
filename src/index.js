const dotenv = require('dotenv');
dotenv.config();
const cron = require("node-cron");
const format = require("string-template")
const express = require("express");
const moment = require('moment')

const Whatsapp = require('./whatsapp_sender')
const sms = require('./sms_sender')
const messages = require('./message_templates')
const googleSheet = require("./google_form")

moment.locale('WAT')
app = express();
app.listen(process.env.PORT || 3000);

app.get('/health', (req, res) => {
    res.send('OK!')
  })
cron.schedule("* * * * *", function(){
    celebrants = []
    console.log("Running Cron Job");
    googleSheet.parseSheet((result)=>{
        result.forEach(element => {
            if(moment().format('M/DD') == element['Date Of Birth']){
                celebrants.push(element)
            }
        });
        if(celebrants.length > 0){
            console.log(`Found ${celebrants.length} celebrant(s)`)
            celebrants.forEach((celebrant)=>{
                var phoneNumber = celebrant['Phone Number'];
                if(phoneNumber.indexOf('0') === 0 ){
                    phoneNumber = `234${phoneNumber.substring(1)}`
                }
                sms.sendMessage(
                    format(messages.sms_template, [celebrant['Firstname']])
                    ,[phoneNumber]
                    )
                Whatsapp.sendMessage(
                    format(messages.whatsapp_template, [celebrant['Firstname'], celebrant['Lastname']])
                    )
            })
        }
    })
});