const moment = require('moment');
const cron = require("node-cron");
const format = require("string-template");

const Whatsapp = require('../helpers/whatsapp_sender');
const sms = require('../helpers/sms_sender');
const messages = require('../helpers/message_templates');
const googleSheet = require("../helpers/google_form");

exports.runBirthdayWishesJob = () => {
  console.log("Running Cron Job");
  cron.schedule("0 6 * * *", sendBirthdayWishes);
};

// Private helper methods
const sendWishesToCelebrant = (celebrant) => {
  let phoneNumber = celebrant['Phone Number'].trim();
  // Update the phoneNumber string if it starts with a '0' 
  phoneNumber = phoneNumber[0] == '0' ? `234${phoneNumber.substring(1)}` : phoneNumber;

  // Send SMS to celebrant
  sms.sendMessage(
    format(messages.sms_template, [celebrant['Firstname']]),
    [phoneNumber]
  );

  // Send WhatsApp message in group
  Whatsapp.sendMessage(
    format(messages.whatsapp_template, [celebrant['Firstname'], celebrant['Lastname']])
  );
};

const sendBirthdayWishes = async () => {
  const result = await googleSheet.parseSheet();
  const isCelebrant = person => moment().format('M/DD') == person['Date Of Birth'];
  const celebrants = result.filter(isCelebrant);

  if (celebrants.length > 0) {
    console.log(`Found ${celebrants.length} celebrant(s)`)
    celebrants.map(sendWishesToCelebrant);
  }
};
