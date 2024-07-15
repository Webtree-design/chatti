const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const cron = require("node-cron");

const PORT = 5601;
const app = express();

const jsonParser = bodyParser.json({ limit: "5mb" });
app.use(jsonParser);

app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*', // Specify your frontend URLs
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const auth = require("./app/authentication/token");
const authenticateTokenFunc = auth.authenticateToken;

const login = require("./app/authentication/login");
app.use("/login", login);

const resetPassword = require("./app/authentication/password");
app.use("/password", resetPassword);

const registration = require("./app/authentication/registration");
app.use("/registration", registration);

const verifyRegistration = require("./app/authentication/verifyRegistration");
app.use("/verify", verifyRegistration);

const logout = require("./app/authentication/logout");
app.use("/logout", authenticateTokenFunc, logout);

// Include the cleanup task
require("./app/cleanup");

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
