// ═══════════════════════════════════════════════════════════════════
// GIFTED — BETA CONFIGURATION
// Fill in each value below. Everything in the funnel reads from here.
// ═══════════════════════════════════════════════════════════════════

const GIFTED_CONFIG = {

  // ── STRIPE ─────────────────────────────────────────────────────
  // Create a Payment Link in stripe.com → Payment Links → Create new
  // Amount: £1 · Label: "Spiritual Gifts Profile — Ministry Offering"
  // After payment redirect URL: https://YOUR-DOMAIN/thankyou.html
  stripePaymentLink:  'https://buy.stripe.com/PASTE_YOUR_LINK_HERE',
  gumroadMonthlyUrl:  'https://YOURNAME.gumroad.com/l/PASTE_MONTHLY_SUBSCRIPTION',  // $33/mo recurring

  // ── MAILCHIMP ──────────────────────────────────────────────────
  // 1. Log in to mailchimp.com
  // 2. Audience → Manage Audience → Signup forms → Embedded forms
  // 3. Copy the form action URL (looks like: https://xxx.us1.list-manage.com/subscribe/post?u=XXX&id=XXX)
  mailchimpFormAction: 'http://165.227.200.77:5678/webhook/gifted-quiz-email',

  // ── GUMROAD PRODUCT URLs ───────────────────────────────────────
  // For each product:
  // 1. Log in to gumroad.com → New Product → Upload PDF → Set price → Publish
  // 2. Copy the product URL (looks like: https://YOURNAME.gumroad.com/l/XXXXX)
  gumroad: {
    tripwire:   'https://YOURNAME.gumroad.com/l/PASTE_TRIPWIRE_PRODUCT',   // £1 gift profile
    prayer:     'https://YOURNAME.gumroad.com/l/PASTE_PRAYER_PRODUCT',     // £4
    marriage:   'https://YOURNAME.gumroad.com/l/PASTE_MARRIAGE_PRODUCT',   // £4
    scripture:  'https://YOURNAME.gumroad.com/l/PASTE_SCRIPTURE_PRODUCT',  // £4
    warfare:    'https://YOURNAME.gumroad.com/l/PASTE_WARFARE_PRODUCT',    // £4
    identity:   'https://YOURNAME.gumroad.com/l/PASTE_IDENTITY_PRODUCT',   // £4
    commission: 'https://YOURNAME.gumroad.com/l/PASTE_COMMISSION_PRODUCT', // £4
    prophetic:  'https://YOURNAME.gumroad.com/l/PASTE_PROPHETIC_PRODUCT',  // £4
    healing:    'https://YOURNAME.gumroad.com/l/PASTE_HEALING_PRODUCT',    // £4
    bundle:     'https://YOURNAME.gumroad.com/l/PASTE_BUNDLE_PRODUCT',     // £17.97
    challenge:  'https://YOURNAME.gumroad.com/l/PASTE_CHALLENGE_PRODUCT',  // £27
  },

  // ── FACEBOOK PIXEL ─────────────────────────────────────────────
  // 1. business.facebook.com → Events Manager → Connect Data Sources → Web
  // 2. Create pixel → copy the 15-16 digit Pixel ID
  fbPixelId: 'PASTE_YOUR_PIXEL_ID_HERE',

  // ── GOOGLE ANALYTICS 4 ────────────────────────────────────────
  // 1. analytics.google.com → Create property → Web stream
  // 2. Copy the Measurement ID (looks like: G-XXXXXXXXXX)
  ga4Id: 'G-PASTE_YOUR_ID_HERE',

  // ── DOMAIN ────────────────────────────────────────────────────
  // Your Vercel URL or custom domain (no trailing slash)
  domain: 'https://spiritual-gifts-funnel.vercel.app',

};

// Do not edit below this line
if (typeof module !== 'undefined') module.exports = GIFTED_CONFIG;
