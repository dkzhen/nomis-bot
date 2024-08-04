const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { startFarming } = require("./func/startFarming");
const { claimFarming } = require("./func/claimFarming");
const { AuthUserId } = require("./func/AuthUserId");
configDotenv();

const main = async () => {
  await claimFarming();
  await startFarming();
};
main();

cron.schedule("0 * * * *", startFarming);
cron.schedule("0 * * * *", claimFarming);

// Start the server
const port = process.env.PORT || 103;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
