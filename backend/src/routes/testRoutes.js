const express = require("express");
const { sendAlert } = require("../services/whatsappService");

const router = express.Router();

router.post("/whatsapp-new-review", async (req, res) => {
  try {
    const to = process.env.OWNER_WHATSAPP;
    if (!to) {
      return res.status(500).json({ success: false, error: "OWNER_WHATSAPP is not set" });
    }
    const result = await sendAlert(to, "new_review", {
      author: "Rahul Sharma",
      rating: 5,
      comment: "Bahut achhi service!",
    });
    if (!result.success) return res.status(502).json(result);
    return res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/whatsapp-negative", async (req, res) => {
  try {
    const to = process.env.OWNER_WHATSAPP;
    if (!to) {
      return res.status(500).json({ success: false, error: "OWNER_WHATSAPP is not set" });
    }
    const result = await sendAlert(to, "negative_urgent", {
      author: "Angry Customer",
      rating: 1,
      comment: "Bilkul bekaar service hai",
    });
    if (!result.success) return res.status(502).json(result);
    return res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/whatsapp-weekly", async (req, res) => {
  try {
    const to = process.env.OWNER_WHATSAPP;
    if (!to) {
      return res.status(500).json({ success: false, error: "OWNER_WHATSAPP is not set" });
    }
    const result = await sendAlert(to, "weekly_report", {
      total: 10,
      positive: 7,
      negative: 3,
    });
    if (!result.success) return res.status(502).json(result);
    return res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
