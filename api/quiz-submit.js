// Vercel serverless function — handles quiz email submission
// Adds subscriber to Mailchimp with name, email, gift type tag
// Called from index.html submitEmail()

const MC_KEY    = process.env.MAILCHIMP_API_KEY    || "";
const MC_SERVER = process.env.MAILCHIMP_SERVER     || "us20";
const MC_LIST   = process.env.MAILCHIMP_AUDIENCE_ID || "d27c884b56";
const MC_BASE   = `https://${MC_SERVER}.api.mailchimp.com/3.0`;

const GIFT_TAG_MAP = {
  "faith":    "gifted-gift-faith",
  "mercy":    "gifted-gift-mercy",
  "prophecy": "gifted-gift-prophecy",
  "teaching": "gifted-gift-teaching",
};

function normGift(gift) {
  if (!gift) return null;
  const g = gift.toLowerCase();
  if (g.includes("faith") || g.includes("prayer"))      return "faith";
  if (g.includes("mercy") || g.includes("service"))     return "mercy";
  if (g.includes("proph") || g.includes("discern"))     return "prophecy";
  if (g.includes("teach") || g.includes("lead"))        return "teaching";
  return null;
}

async function mcRequest(path, method, body) {
  const auth = Buffer.from(`anystring:${MC_KEY}`).toString("base64");
  const res = await fetch(`${MC_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
}

function md5(str) {
  // Simple MD5 for subscriber hash — use crypto in Node
  const crypto = require("crypto");
  return crypto.createHash("md5").update(str.toLowerCase()).digest("hex");
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  const { email, name, gift_type } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const hash    = md5(email);
  const giftKey = normGift(gift_type);
  const tags    = ["gifted-quiz-complete"];
  if (giftKey) tags.push(GIFT_TAG_MAP[giftKey]);

  try {
    // Upsert subscriber
    const upsert = await mcRequest(`/lists/${MC_LIST}/members/${hash}`, "PUT", {
      email_address: email,
      status_if_new: "subscribed",
      status:        "subscribed",
      merge_fields:  { FNAME: name || "" },
    });

    if (!upsert.ok && upsert.status !== 400) {
      return res.status(500).json({ error: "Mailchimp upsert failed", detail: upsert.data });
    }

    // Apply tags
    await mcRequest(`/lists/${MC_LIST}/members/${hash}/tags`, "POST", {
      tags: tags.map(t => ({ name: t, status: "active" })),
    });

    // Also forward to n8n for any additional automation (fire and forget)
    fetch("http://165.227.200.77:5678/webhook/gifted-quiz-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: name || "", gift_type: giftKey || gift_type, source: "quiz" }),
    }).catch(() => {});

    return res.status(200).json({ ok: true, gift: giftKey });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
