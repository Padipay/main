const express = require('express'); 
const Cors = require('cors')
var bodyParser = require('body-parser')
const dotenv = require('./dotenvConfig')()
const app = express();
const port = process.env.PORT || 5000;

const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccountKey');
const {getAuth} = require("firebase-admin/auth");

const ejs = require('ejs');
const sendVerificationEmail = require('./sendEmail');
const sendSuccessfulTransactionEmail = require('./succesfulTransactionEmail');
const sendResetPasswordEmail = require('./resetPasswordEmail');

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// initialize Firebase Admin SDK
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(Cors(corsOption))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => { 
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.post('/send-custom-verification-email', async (req, res) => {
  const {userEmail, redirectUrl, username} = req.body
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if(!userEmail?.match(emailValidate)){
    return res.status(401).json({message: 'Invalid email'})
  }else if(!redirectUrl || typeof redirectUrl !== 'string'){
    return res.status(401).json({message: 'Invalid redirectUrl'})
  }

  const actionCodeSettings = {
    url: redirectUrl
  }
  
  try{
    const actionLink =  await getAuth()
    .generateEmailVerificationLink(userEmail, actionCodeSettings)
    const template = await ejs.renderFile('views/verifyEmail.ejs', {
      actionLink,
      userEmail,
      randomNumber: Math.random()
    })
    await sendVerificationEmail(userEmail, template, actionLink)
    res.status(200).json({message:'Email successfully sent'})
  }catch(error){
    const message = error.message
    if(error.code === 'auth/user-not-found'){
      return res.status(404).json({message})
    }
    if(error.code === 'auth/invalid-continue-uri'){
      return res.status(401).json({message})
    }
    res.status(500).json({message})
  }
})

app.post('/send-reset-password-email', async (req, res) => {
  const {userEmail, redirectUrl} = req.body
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if(!userEmail?.match(emailValidate)){
    return res.status(401).json({message: 'Invalid email'})
  }else if(!redirectUrl || typeof redirectUrl !== 'string'){
    return res.status(401).json({message: 'Invalid redirectUrl'})
  }

  const actionCodeSettings = {
    url: redirectUrl
  }
  
  try{
    const actionLink =  await getAuth()
    .generatePasswordResetLink(userEmail, actionCodeSettings)
    await sendResetPasswordEmail(userEmail, actionLink)
    res.status(200).json({message:'Email successfully sent'})
  }catch(error){
    const message = error.message
    if(error.code === 'auth/invalid-email'){
      return res.status(404).json({message})
    }
    if(error.code === 'auth/invalid-continue-uri'){
      return res.status(401).json({message})
    }
    res.status(500).json({message})
  }
})

app.post('/send-success-email', async (req, res) => {
  const {userEmail, send, receive, token, date, id} = req.body
  try{
    const template = await ejs.renderFile('views/successEmail.ejs', {
      userEmail,
      id,
      send,
      receive,
      token,
      date,
      randomNumber: Math.random()
    })
    await sendSuccessfulTransactionEmail(userEmail, template, send, receive, token, date, id)
    res.status(200).json({message:'Email successfully sent'})
  }catch(error){
    const message = error.message
    res.status(500).json({message})
  }
})

app.post('/api/messages', (req, res) => {
  const {numberTo, body} = req.body
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: numberTo,
      body: body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});
