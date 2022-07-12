const dotenv = require('./dotenvConfig')()
const sgMail = require('@sendgrid/mail')

const SENDGRID_KEY = process.env.SENDGRID_API_KEY
const VERIFIED_EMAIL = process.env.VERIFIED_SENDER

sgMail.setApiKey(SENDGRID_KEY)

module.exports = function sendVerificationEmail(userEmail, template, actionLink){
    const message = {
      from: {
        name: 'Verify Email',
        email: VERIFIED_EMAIL
      },
      to: userEmail,
      subject: 'Verify your email address',
      text: `Thanks for signing up with us. Follow the link below to verify your email address.
      \n\n${actionLink} \n\nIf this email wasn't intended for you feel free to delete it.`,
      html: template
    }
  
    return sgMail.send(message)
}

// module.exports = function sendSuccessfulTransactionEmail(userEmail, template, send, receive, token, date, id){
//   const message = {
//     from: {
//       name: 'Successful Transaction',
//       email: VERIFIED_EMAIL
//     },
//     to: userEmail,
//     subject: 'Padipay Successful Transaction',
//     text: `Your transaction was successful. Below are details of the transaction
//     \n\n Trandaction ID: ${id}.
//     \n\n Send: ${send} ${token}.
//     \n\n Receive ${receive}.
//     \n\n Date: ${date}.`,
//     html: template
//   }

//   return sgMail.send(message)
// }
