// Vercel serverless proxy — receives tracking events from quiz (HTTPS)
// and forwards to VPS admin (HTTP) server-side, bypassing mixed content block

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).end();

  const { event } = req.body || {};
  if (!event) return res.status(400).json({ error: "missing event" });

  try {
    await fetch("http://165.227.200.77:8768/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
    });
  } catch (_) {
    // VPS unreachable — don't fail the client
  }

  return res.status(200).json({ ok: true });
}
