const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
const testRoutes = require("./routes/testRoutes");
const { startReviewPollingJob } = require("./jobs/reviewPollingJob"); 

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Review Rakshak backend is running" });
});

app.use("/api/reviews", reviewRoutes);
app.use("/api/test", testRoutes);

startReviewPollingJob();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});


// Mock data for testing
