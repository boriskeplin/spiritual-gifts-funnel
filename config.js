// ═══════════════════════════════════════════════════════════════════
// GIFTED — BETA CONFIGURATION
// Fill in each value below. Everything in the funnel reads from here.
// ═══════════════════════════════════════════════════════════════════

const GIFTED_CONFIG = {

  stripePaymentLink:  '',
  mailchimpFormAction: 'http://165.227.200.77:5678/webhook/gifted-quiz-email',

  gumroad: {
    tripwire:   'https://giftedministry.gumroad.com/l/bodpe',
    bundle:     'https://giftedministry.gumroad.com/l/ntuttv',
    challenge:  'https://giftedministry.gumroad.com/l/thbrj',
  },

  fbPixelId: '2455680908285872',
  ga4Id:     'G-LEPTSHR2ML',
  domain:    'https://gifted.church',

};

// Do not edit below this line
if (typeof module !== 'undefined') module.exports = GIFTED_CONFIG;
