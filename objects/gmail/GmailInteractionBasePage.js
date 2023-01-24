const gmail = require('gmail-tester');
const path = require('path');
const mailClientSecret = path.resolve(__dirname, "client_secret_gmail.json");
const mailToken = path.resolve(__dirname, "token_gmail.json")
const maxWaitTimeSec = 60;
const waitTimeSec = 10;

class GmailInteractionBasePage {
  async waitEmailInMailBox(sender, receiver, subject, startSendingMailTime) {
    let result = new Object();
    let email = await gmail.check_inbox(
      mailClientSecret, 
      mailToken,
      {
        subject: subject,
        from: sender,
        to: receiver,
        before: startSendingMailTime,
        wait_time_sec: waitTimeSec,
        max_wait_time_sec: maxWaitTimeSec,
        include_body : true,
        include_attachments : true
      }
    )
    if (email) {
      console.log("%s email(s) was found!", await email.length());
      result['emailReceived'] = true;
      result['mailBody'] = email[0].mailBody.html;
      result['attachment'] = email[0].attachments;
    } else {
      console.log('Email was not found!')
      result['emailReceived'] = false;
    }
    return result;
  }
}

export default GmailInteractionBasePage;