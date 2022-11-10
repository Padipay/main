const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const express = require("express");
const Cors = require("cors");
var bodyParser = require("body-parser");
const dotenv = require("./dotenvConfig")();
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey");
const { getAuth } = require("firebase-admin/auth");

const ejs = require("ejs");
const sendVerificationEmail = require("./sendEmail");
const sendSuccessfulTransactionEmail = require("./succesfulTransactionEmail");
const sendResetPasswordEmail = require("./resetPasswordEmail");
const fetchRates = require("./fetchRates");
const dispatch_request = require("./binancepay");
const dbConnect = require("./db/dbConnect");

// execute database connection
dbConnect();

const User = require("./db/userModel");

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

require("dotenv").config();
// const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// initialize Firebase Admin SDK
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const corsOption = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(Cors(corsOption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// All remaining requests return the React app, so it can handle routing.
// app.get('*', function(request, response) {
//   response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/express_backend", (req, res) => {
  console.log("welcome");
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/admin-register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/admin-login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "PADIPDAY-TOKEN-SECRET-DHHDHDHD",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

app.post("/send-custom-verification-email", async (req, res) => {
  const { userEmail, redirectUrl, username } = req.body;
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!userEmail?.match(emailValidate)) {
    return res.status(401).json({ message: "Invalid email" });
  } else if (!redirectUrl || typeof redirectUrl !== "string") {
    return res.status(401).json({ message: "Invalid redirectUrl" });
  }

  const actionCodeSettings = {
    url: redirectUrl,
  };

  try {
    const actionLink = await getAuth().generateEmailVerificationLink(
      userEmail,
      actionCodeSettings
    );
    const template = await ejs.renderFile("views/emailVerify.ejs", {
      actionLink,
      userEmail,
      randomNumber: Math.random(),
    });
    await sendVerificationEmail(userEmail, template, actionLink);
    res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    const message = error.message;
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message });
    }
    if (error.code === "auth/invalid-continue-uri") {
      return res.status(401).json({ message });
    }
    res.status(500).json({ message });
  }
});

app.post("/send-reset-password-email", async (req, res) => {
  const { userEmail, redirectUrl } = req.body;
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!userEmail?.match(emailValidate)) {
    return res.status(401).json({ message: "Invalid email" });
  } else if (!redirectUrl || typeof redirectUrl !== "string") {
    return res.status(401).json({ message: "Invalid redirectUrl" });
  }

  const actionCodeSettings = {
    url: redirectUrl,
  };

  try {
    const actionLink = await getAuth().generatePasswordResetLink(
      userEmail,
      actionCodeSettings
    );
    const template = await ejs.renderFile("views/emailReset.ejs", {
      actionLink,
      userEmail,
      randomNumber: Math.random(),
    });
    await sendResetPasswordEmail(userEmail, template, actionLink);
    res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    const message = error.message;
    if (error.code === "auth/invalid-email") {
      return res.status(404).json({ message });
    }
    if (error.code === "auth/invalid-continue-uri") {
      return res.status(401).json({ message });
    }
    res.status(500).json({ message });
  }
});

app.post("/send-success-email", async (req, res) => {
  const { userEmail, send, receive, token, date, id } = req.body;
  try {
    const template = await ejs.renderFile("views/emailSuccess.ejs", {
      userEmail,
      id,
      send,
      receive,
      token,
      date,
      randomNumber: Math.random(),
    });
    await sendSuccessfulTransactionEmail(
      userEmail,
      template,
      send,
      receive,
      token,
      date,
      id
    );
    res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    const message = error.message;
    res.status(500).json({ message });
  }
});

app.post("/api/messages", (req, res) => {
  const { numberTo, body } = req.body;
  res.header("Content-Type", "application/json");
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: numberTo,
      body: body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.get("/padipay/rates", async (req, res) => {
  fetchRates()
    .then((data) => {
      res.status(200).json({
        data,
        message: "Real time rates",
        success: true,
      });
      console.log("success");
    })
    .catch((error) => {
      const message = error.message;
      res.status(500).json({ message });
    });
});

app.post("/notification", async (req, res) => {
  try {
    const event = req.body.event;
    const encryptedData = crypto
      .createHmac("SHA512", "80ad3f0e2db64a61b0bec492a09bcf35")
      .update(JSON.stringify(event))
      .digest("hex");
    const signatureFromWebhook = req.headers["signature"];
    if (encryptedData === signatureFromWebhook) {
      console.log("success");
      console.log(event);
    }
    res.status(200).json({ success: "true" });
  } catch (error) {
    console.log(error);
  }
});

// app.post('/create-order', async (req, res) => {
//   const { http_method, path, payload } = req.body

//     try {
//       const response = await dispatch_request(http_method, path, payload)
//       res.status(200).json({ message: "New Order", success: true, data:response.data })
//     } catch (error) {
//       const message = error.message
//         res.status(500).json({message})
//     }
// })

// app.post('/query-order', async (req, res) => {
//   const { http_method, path, payload } = req.body

//     try {
//       const response = await dispatch_request(http_method, path, payload)
//       res.status(200).json({ message: "Order", success: true, data:response.data })
//     } catch (error) {
//       const message = error.message
//         res.status(500).json({message})
//     }
// })
