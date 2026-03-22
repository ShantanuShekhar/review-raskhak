const twilio = require("twilio");

function getFromWhatsApp() {
  const raw = process.env.TWILIO_WHATSAPP_NUMBER || process.env.TWILIO_WHATSAPP_FROM || "+14155238886";
  const num = raw.replace(/^whatsapp:/i, "").trim();
  return num.startsWith("+") ? `whatsapp:${num}` : `whatsapp:+${num}`;
}

function normalizeToWhatsApp(value) {
  if (!value) return "";
  const v = String(value).trim();
  if (v.startsWith("whatsapp:")) return v;
  if (v.startsWith("+")) return `whatsapp:${v}`;
  return `whatsapp:+${v.replace(/^\+/, "")}`;
}

function starsLabel(rating) {
  const n = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return "⭐".repeat(n || 1);
}

function buildMessage(type, data) {
  const author = (data?.author || "Unknown").toString().trim();
  const stars = starsLabel(data?.rating ?? data?.stars);
  const comment = (data?.comment || "").toString().trim() || "(no comment)";

  if (type === "negative_urgent") {
    return `🚨 URGENT - Negative Review!
👤 ${author} - ${stars} star  
💬 ${comment}
ABHI reply karo!`;
  }
  if (type === "weekly_report") {
    const total = Number(data?.total ?? 0);
    const positive = Number(data?.positive ?? 0);
    const negative = Number(data?.negative ?? 0);
    return `📊 Weekly Report
Total: ${total} reviews
✅ Positive: ${positive}
❌ Negative: ${negative}`;
  }
  return `⭐ Naya Review Aaya!
👤 ${author} - ${stars} star
💬 ${comment}
Dashboard pe reply karo!`;
}

/**
 * @param {string} toNumber
 * @param {"new_review"|"negative_urgent"|"weekly_report"} type
 * @param {object} data
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
async function sendAlert(toNumber, type, data) {
  const accountSid = (process.env.TWILIO_SID || "").trim();
  const authToken = (process.env.TWILIO_AUTH_TOKEN || "").trim();

  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials missing from .env file");
  }

  console.log("Twilio SID starts with:", accountSid.slice(0, 5));

  try {
    const client = twilio(accountSid, authToken);

    const from = getFromWhatsApp();
    const to = normalizeToWhatsApp(toNumber);
    if (!to) {
      return { success: false, error: "Missing destination WhatsApp number" };
    }
    const body = buildMessage(type, data || {});
    const created = await client.messages.create({
      from,
      to,
      body,
    });
    return { success: true, messageId: created.sid };
  } catch (error) {
    console.error("whatsapp_send_failed", type, error.message);
    return { success: false, error: `Failed to send WhatsApp alert: ${error.message}` };
  }
}

module.exports = { sendAlert };
