require('dotenv').config({path: './.env'})
const sendGridMail = require('@sendgrid/mail')
const SENDGRID_KEY = process.env.SENDGRID_API_KEY
sendGridMail.setApiKey(SENDGRID_KEY);



function getMessage() {
  const body = 'This is a test email using SendGrid from Node.js';
  return {
    to: 'cocofemi@gmail.com',
    from: 'femi@padipay.io',
    subject: 'Test email with Node.js and SendGrid',
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

async function sendEmail() {
  try {
    await sendGridMail.send(getMessage());
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

(async () => {
  console.log('Sending test email');
  await sendEmail();
})();