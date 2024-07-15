const express = require("express");
const router = express.Router();
const { connectToDB, closeDB } = require("../mongodb");

router.get("/", async (req, res) => {
  const { token } = req.query;

  const client = await connectToDB();

  try {
    const database = client.db();
    const collection = database.collection("User");

    // Find the user with the matching verification token
    const user = await collection.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Update the user's status to verified
    await collection.updateOne(
      { verificationToken: token },
      { $set: { isVerified: true, verificationTimestamp: null }, $unset: { verificationToken: "" } }
    );

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    await closeDB(client);
  }
});

module.exports = router;
