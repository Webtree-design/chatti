const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { connectToDB, closeDB } = require("../mongodb");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { username, email, password1 } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password1, 10);

  // Generate a unique token
  const token = crypto.randomBytes(32).toString("hex");

  const client = await connectToDB();

  try {
    const database = client.db();
    const collection = database.collection("User");

    // Check if the username already exists
    const existingUser = await collection.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Insert the new user into the database with the token and timestamp
    const result = await collection.insertOne({
      username: username,
      email: email,
      password: hashedPassword,
      verificationToken: token,
      isVerified: false, // User is not verified initially
      verificationTimestamp: new Date(), // Current timestamp
    });

    console.log("User registered successfully:", result);

    // Send confirmation email with the verification link
    await sendConfirmationEmail(email, username, token);

    res.status(201).json({ message: "User registered successfully. Please check your email to verify your account." });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    await closeDB(client);
  }
});

async function sendConfirmationEmail(email, username, token) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const verificationUrl = `http://localhost:5601/verify?token=${token}`;

  try {
    let info = await transporter.sendMail({
      from: '"Registration" <noreply@example.com>',
      to: email,
      subject: "Registration Confirmation",
      html: `<p>Hello ${username},</p><p>Thank you for registering! Please <a href="${verificationUrl}">click here</a> to verify your email.</p>`,
    });
    console.log("Confirmation email sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log("Error sending confirmation email:", err);
  }
}

module.exports = router;
