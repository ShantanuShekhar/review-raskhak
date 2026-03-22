async function fetchReviewsFromDb() {
  // Placeholder for real DB query layer.
  return [
    {
      id: 1,
      rating: 5,
      source: "Google",
      text: "Great service and very quick support.",
      createdAt: new Date().toISOString(),
    },
  ];
}

module.exports = {
  fetchReviewsFromDb,
};
