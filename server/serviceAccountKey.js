const dotenv = require('./dotenvConfig')()

require("dotenv").config();
// const firebase_private_key_b64 = Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64');
// const firebase_private_key = firebase_private_key_b64.toString('utf8');

module.exports = {
  "project_id": process.env.PROJECT_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
}
