const cron = require("node-cron");
const { connectToDB, closeDB } = require("./mongodb");

// Schedule the task to run every hour
cron.schedule("0 * * * *", async () => {
  const client = await connectToDB();
  try {
    const database = client.db();
    const collection = database.collection("User");

    // Calculate the timestamp for 24 hours ago
    const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Delete users who are not verified and older than 24 hours
    const result = await collection.deleteMany({
      isVerified: false,
      verificationTimestamp: { $lt: cutoffDate }
    });

    console.log(`Cleanup task: Deleted ${result.deletedCount} unverified users.`);
  } catch (err) {
    console.error("Error during cleanup task:", err);
  } finally {
    await closeDB(client);
  }
});
