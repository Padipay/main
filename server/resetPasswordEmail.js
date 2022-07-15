const dotenv = require('./dotenvConfig')()
const sgMail = require('@sendgrid/mail')

const SENDGRID_KEY = process.env.SENDGRID_API_KEY
const VERIFIED_EMAIL = process.env.VERIFIED_SENDER

sgMail.setApiKey(SENDGRID_KEY)

module.exports = function sendResetPasswordEmail(userEmail, template, actionLink){
    const message = {
      from: {
        name: 'Reset Password',
        email: VERIFIED_EMAIL
      },
      to: userEmail,
      subject: 'Reset Password',
      text: `A request to reset your padipay account password was made. Click the link to continue the process.
      \n\n${actionLink} \n\nIf this action wasn't intiated by you send disregard and send a mail to support@padipay.io.`,
      html: template
    }
  
    return sgMail.send(message)
}
