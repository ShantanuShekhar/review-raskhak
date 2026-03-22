const express = require("express");
const {
  getReviews,
  createAiReply,
} = require("../services/reviewService");

const router = express.Router();

router.get("/", async (_req, res) => {
  const reviews = await getReviews();
  res.json(reviews);
});

router.post("/ai-reply", async (req, res) => {
  const { reviewText } = req.body;
  const reply = await createAiReply(reviewText || "");
  res.json({ reply });
});

module.exports = router;
