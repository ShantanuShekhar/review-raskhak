const { fetchReviewsFromDb } = require("../models/reviewModel");

async function getReviews() {
  return fetchReviewsFromDb();
}

async function createAiReply(reviewText) {
  if (!reviewText?.trim()) {
    return "Thank you for your feedback. We appreciate your support.";
  }

  // Placeholder for AI service integration.
  return `Thanks for your review: "${reviewText}". We value your feedback and will improve continuously.`;
}

module.exports = {
  getReviews,
  createAiReply,
};
