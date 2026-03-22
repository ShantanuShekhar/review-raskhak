import axios from "axios";

const BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .toString()
  .trim()
  .replace(/\/$/, "");

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

function toReadableError(error, fallback) {
  const serverError = error?.response?.data?.error;
  return new Error(serverError || fallback);
}

export async function getReviews(businessId, page = 1, filter = "all") {
  try {
    const response = await api.get(`/api/reviews/${businessId}`, {
      params: { page, filter },
    });
    return { data: response.data };
  } catch (error) {
    throw toReadableError(error, "Unable to load reviews.");
  }
}

export async function generateReply(reviewId) {
  try {
    const response = await api.post("/api/reviews/generate-reply", { reviewId });
    return { data: response.data };
  } catch (error) {
    throw toReadableError(error, "Unable to generate AI reply.");
  }
}
