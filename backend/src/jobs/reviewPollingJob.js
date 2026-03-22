const cron = require("node-cron");

function startReviewPollingJob() {
  // Every 5 minutes: placeholder for GMB/WhatsApp review sync.
  cron.schedule("*/5 * * * *", () => {
    console.log("Polling external review channels...");
  });
}

module.exports = {
  startReviewPollingJob,
};
