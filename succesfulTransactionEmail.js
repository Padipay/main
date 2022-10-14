require('dotenv').config({path: './.env'})
const sgMail = require('@sendgrid/mail')

const SENDGRID_KEY = process.env.SENDGRID_API_KEY
const VERIFIED_EMAIL = process.env.VERIFIED_SENDER

sgMail.setApiKey(SENDGRID_KEY)

module.exports = function sendSuccessfulTransactionEmail(userEmail, template, send, receive, token, date, id){
  const message = {
    from: {
      name: 'Padipay Successful Transaction',
      email: VERIFIED_EMAIL
    },
    to: userEmail,
    subject: 'Padipay Successful Transaction',
    text: `Your transaction was successful. Below are details of the transaction
    \n\n Trandaction ID: ${id}.
    \n\n Send: ${send} ${token}.
    \n\n Receive ${receive}.
    \n\n Date: ${date}.`,
    html: template
  }

  return sgMail.send(message)
}