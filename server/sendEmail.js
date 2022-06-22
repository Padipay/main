const dotenv = require('./dotenvConfig')()
const sgMail = require('@sendgrid/mail')

const SENDGRID_KEY = process.env.SENDGRID_API_KEY
const VERIFIED_EMAIL = process.env.VERIFIED_SENDER

sgMail.setApiKey(SENDGRID_KEY)

module.exports = function sendVerificationEmail(userEmail, template, actionLink){
    const message = {
      from: {
        name: 'Custom verify',
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

// module.exports = function sendVerificationEmail (userEmail, username, template, actionLink)  {
//     const request  = mailjet
//         .post("send", {'version': 'v3.1'})
//         .request({
//             "Messages": [{
//                 "From": {
//                     "Email": "cocofemi@gmail.com",
//                     "Name": "Padidpay"
//                 },
//                 "To": [{
//                     "Email": userEmail,
//                     "Name": username
//                 }],
//                 Subject: 'Verify your email address',
//                 "TextPart": `Thanks for signing up with us. Follow the link below to verify your email address.
//                 \n\n${actionLink} \n\nIf this email wasn't intended for you feel free to delete it.`,
//                 "HTMLPart": template
//             }]
//         }).then((result) => {
//             console.log(result.body)
//         }).catch((err) => {
//             console.log(err.message)
//         })
// }