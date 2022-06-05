const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)


module.exports = function sendVerificationEmail (userEmail, username, template, actionLink)  {
    const request  = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages": [{
                "From": {
                    "Email": "cocofemi@gmail.com",
                    "Name": "Padidpay"
                },
                "To": [{
                    "Email": userEmail,
                    "Name": username
                }],
                Subject: 'Verify your email address',
                "TextPart": `Thanks for signing up with us. Follow the link below to verify your email address.
                \n\n${actionLink} \n\nIf this email wasn't intended for you feel free to delete it.`,
                "HTMLPart": template
            }]
        }).then((result) => {
            console.log(result.body)
        }).catch((err) => {
            console.log(err.message)
        })
}