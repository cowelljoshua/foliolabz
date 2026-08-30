// ============================================================
// FOLIOLAB SITE CONFIG
// Everything you might ever want to change lives in this file:
// prices, payment links, contact info, copy, FAQ, examples.
// Edit, save, redeploy. Nothing else needs touching.
// ============================================================

export const site = {
  brand: "FolioLabz",
  tagline: "Portfolios made easy",

  // CHANGE THIS to the email you want client submissions and questions to reach.
  // (Netlify form notifications are configured separately in the Netlify dashboard,
  // this one is used for the mailto links on the site.)
  email: "foliolabz@gmail.com",

  // The home-page story section.
  // storyPhoto is the big picture shown above the signature (added 2026-07-14,
  // cropped from the rocket photo). OPTIONAL LATER: for the small round avatar
  // next to the signature, drop a CLOSE-UP of your face (no sunglasses) at
  // public/josh-headshot.jpg and set showPhoto: true.
  founder: {
    name: "Josh Cowell",
    role: "Founder, FolioLabz",
    storyPhoto: "/josh-founder.jpg",
    photo: "/josh-headshot.jpg",
    showPhoto: false,
  },
}

// ------------------------------------------------------------
// PAYMENT TRUST
// One short line plus the Stripe mark. Rendered by StripeNote.jsx.
// ------------------------------------------------------------
export const payments = {
  short: "Payments handled securely by",
}

// ------------------------------------------------------------
// STRIPE PAYMENT LINKS
// Paste your Payment Link URLs here after creating them in Stripe
// (see SETUP.md, it walks you through them).
// Leave a link as "" and its Pay button simply hides; the
// "Start my build" flow keeps working either way.
// ------------------------------------------------------------
export const stripeLinks = {
  deposit: "https://buy.stripe.com/3cI3co9UQaP50hC1uI7Re0c",         // $20 deposit that starts a website build
  balance: "https://buy.stripe.com/fZu8wI4Awe1hfcw0qE7Re0d",         // $130 balance ($150 total minus the $20 deposit)
  domainYearly: "https://buy.stripe.com/9B6bIUc2Yf5l9Sc7T67Re03",    // $30/yr recurring custom domain
  domainMonthly: "https://buy.stripe.com/cNifZaeb6aP51lGgpC7Re04",   // $4/mo recurring custom domain
  editWording: "https://buy.stripe.com/6oU7sE2so3mDd4oehu7Re05",     // $10 wording edits (as many as they want in one request)
  editDesign: "https://buy.stripe.com/7sY7sEgje6yP5BW8Xa7Re06",      // $40 design change
  resumePolish: "https://buy.stripe.com/9B63co5EA4qH1lGb5i7Re0b",    // One-time $20
  // Legacy links, kept only so clients who bought the old Launch/Pro
  // packages can still pay their original balance from the portal.
  legacyDeposit: "https://buy.stripe.com/00w4gs4Aw7CT6G0fly7Re00",   // old $50 deposit
  launchBalance: "https://buy.stripe.com/7sY14gd72f5l9Sc3CQ7Re01",   // $250 balance (old Launch $300 minus deposit)
  proBalance: "https://buy.stripe.com/bJe8wI0kg4qH3tOc9m7Re02",      // $500 balance (old Pro $550 minus deposit)
}

// ------------------------------------------------------------
// THE PACKAGE
// One price, one feature set. The id stays "pro" so existing
// client records and the /examples/pro route keep working.
// ------------------------------------------------------------
export const tier = {
  id: "pro",
  name: "Portfolio",
  originalPrice: 300,
  originalPriceLabel: "$300",
  price: 150,
  priceLabel: "$150",
  blurb: "Everything you need in one portfolio, built and launched for you.",
  headline: ["Built around your work", "Up to 10 featured projects", "Free hosting, no monthly fee"],
}

// Kept as an array so pages that map over packages need no special case.
export const tiers = [tier]

// The launch discount. Change the date here and every banner follows.
export const sale = {
  endsLabel: "through September 30",
}

// ------------------------------------------------------------
// HOW PAYMENT WORKS (deposit first, balance at launch)
// ------------------------------------------------------------
export const deposit = {
  amount: 20,
  label: "$20 today, applied toward your total",
  detail:
    "Your $20 deposit is part of the $150 total, not an extra fee. The remaining $130 is due only after your site is live and you approve it. Nothing is charged by the form.",
}

// ------------------------------------------------------------
// WEB ADDRESSES / DOMAINS (free option vs a custom .com)
// ------------------------------------------------------------
export const hosting = {
  free: {
    title: "Free web address",
    example: "yourname.netlify.app",
    detail: "Go live at no cost on a clean address like yourname.netlify.app. Free hosting applies only while you use a .netlify.app address.",
  },
  custom: {
    title: "Your own .com or .net",
    yearly: "$30/yr",
    monthly: "$4/mo",
    priceLine: "$30 a year, or $4 a month",
    detail:
      "Want your own .com instead? It is $30 a year, or $4 a month. I check availability first, then buy it, set it up, and bill it through your account, so you never deal with a domain company.",
  },
}

// ------------------------------------------------------------
// CLIENT PORTAL (self-service for existing clients)
// A no-login page. Clients enter name + email, then can pay a
// balance, set up a custom domain, or request an edit. Every
// action emails you and shows the matching Stripe pay button.
// ------------------------------------------------------------
export const portal = {
  heading: "Client portal",
  sub: "Already a client? Pick up your project right here.",
  gateTitle: "Let's find your project",
  gateNote:
    "No password needed. Your name and email just make sure everything reaches me and gets tagged to the right project.",
}

// Balance still owed after the $20 deposit.
export const balances = [
  { pkg: "pro", name: "Portfolio", total: "$150", balanceLabel: "$130", stripeKey: "balance" },
]

// Old packages, kept only so clients who signed up before the single
// price can still see the right numbers in the portal. Not shown as a
// choice to anyone new.
export const legacyBalances = [
  { pkg: "launch", name: "Launch", total: "$300", balanceLabel: "$250", stripeKey: "launchBalance" },
  { pkg: "pro-legacy", name: "Pro", total: "$550", balanceLabel: "$500", stripeKey: "proBalance" },
]

// Every balance definition, for looking up an existing client's package.
export const allBalances = [...balances, ...legacyBalances]

// Custom domain, handled by you. Payment is annual after availability is confirmed.
export const domainOffer = {
  detail:
    "Interested in your own .com or .net? If you already have names in mind, share them. I check availability and confirm the domain before payment starts.",
  yearly: { label: "$30/yr", stripeKey: "domainYearly" },
  monthly: { label: "$4/mo", stripeKey: "domainMonthly" },
}

// Post-launch edit requests, priced flat.
export const edits = [
  {
    id: "wording",
    name: "Wording edits",
    priceLabel: "$10",
    blurb:
      "Fix or reword any text on your site. Send as many wording changes as you want in one go, it is all one $10 request.",
    stripeKey: "editWording",
  },
  {
    id: "design",
    name: "Design change",
    priceLabel: "$40",
    blurb: "Change the look: colors, fonts, layout, or a whole new section.",
    stripeKey: "editDesign",
  },
]

// ------------------------------------------------------------
// GUARANTEES
// ------------------------------------------------------------
export const promises = {
  website: {
    title: "Love it before it launches",
    detail: "Once I build your first version, you get a private preview link and up to 3 rounds of changes. Send as many tweaks as you like in each round, then it goes live.",
    short: "Private preview and 3 rounds of changes before it goes live.",
  },
  resume: {
    title: "If it is not noticeably better, it is free",
    detail: "Full refund, no questions. That is how confident I am.",
  },
}

// ------------------------------------------------------------
// RESUME POLISH SERVICE
// ------------------------------------------------------------
export const resumeService = {
  // One option only. Kept as an array so pages can keep mapping over it.
  tiers: [
    {
      id: "resume-polish",
      name: "Resume Polish",
      originalPrice: 40,
      originalPriceLabel: "$40",
      price: 20,
      priceLabel: "$20",
      blurb: "Send your resume. Get it back sharper.",
      full: ["Wording that leads with results", "Clean, recruiter-friendly layout", "Personal notes on what I changed and why"],
      stripeKey: "resumePolish",
    },
  ],
}

// ------------------------------------------------------------
// STYLE DEMOS (the built-in example portfolios)
// Each id has a matching demo page + route. Visual design lives
// in each demo page; this is the catalog shown in the gallery.
// ------------------------------------------------------------
export const demoStyles = [
  {
    id: "midnight",
    name: "Midnight",
    vibe: "Dark and futuristic",
    persona: "Mara Chen, Mechanical Engineer",
    sampleField: "Engineering",
    blurb: "A cinematic, high-contrast direction with glowing details and a strong project reveal.",
    traits: ["High contrast", "Project-led", "Subtle glow"],
    swatch: ["#0a0a14", "#7c5cff", "#22d3ee"],
  },
  {
    id: "softlight",
    name: "Soft Light",
    vibe: "Clean, airy, calm",
    persona: "Elena Brooks, Registered Nurse",
    sampleField: "Healthcare",
    blurb: "An open, reassuring direction that makes experience and personal values easy to scan.",
    traits: ["Open layout", "People-first", "Gentle color"],
    swatch: ["#f7f6f2", "#7aa5a0", "#e8b4a0"],
  },
  {
    id: "editorial",
    name: "Editorial",
    vibe: "Bold, magazine style",
    persona: "Devon Price, Marketing Graduate",
    sampleField: "Marketing",
    blurb: "A type-driven direction with strong opinions, sharp pacing, and room for a clear point of view.",
    traits: ["Big type", "Story-led", "Sharp pacing"],
    swatch: ["#111111", "#f5f0e8", "#e63946"],
  },
  {
    id: "warmstudio",
    name: "Warm Studio",
    vibe: "Creative earth tones",
    persona: "Sofia Reyes, Photographer",
    sampleField: "Photography",
    blurb: "A tactile, image-forward direction with an approachable handmade quality.",
    traits: ["Image-led", "Warm texture", "Relaxed grid"],
    swatch: ["#f3e9dc", "#b4552d", "#3a2e26"],
  },
  {
    id: "classicslate",
    name: "Classic Slate",
    vibe: "Traditional and refined",
    persona: "James Whitfield, Finance Student",
    sampleField: "Finance",
    blurb: "A polished, structured direction that gives credentials and results quiet authority.",
    traits: ["Credentials-led", "Structured", "Quiet detail"],
    swatch: ["#f4f4f6", "#1e293b", "#996515"],
  },
  {
    id: "neon",
    name: "Neon Grid",
    vibe: "Cyber and high-energy",
    persona: "Kai Nakamura, Software Developer",
    sampleField: "Software",
    blurb: "A fast, energetic direction with technical cues, playful motion, and punchy proof points.",
    traits: ["Energetic", "Proof-led", "Playful motion"],
    swatch: ["#0b0710", "#ff2e97", "#0ff0fc"],
  },
  {
    id: "botanical",
    name: "Botanical",
    vibe: "Organic and calming",
    persona: "Priya Anand, Wellness Coach",
    sampleField: "Wellness",
    blurb: "A grounded, human direction with soft rhythm and plenty of space for a personal story.",
    traits: ["Story-led", "Organic shapes", "Soft rhythm"],
    swatch: ["#f4f1e9", "#4f7a4a", "#c98a5a"],
  },
  {
    id: "mono",
    name: "Mono",
    vibe: "Minimal black and white",
    persona: "Theo Laurent, Architect",
    sampleField: "Architecture",
    blurb: "A disciplined direction where typography, spacing, and the work itself do all the talking.",
    traits: ["Minimal", "Work-led", "Precise grid"],
    swatch: ["#ffffff", "#111111", "#8a8a8a"],
  },
  {
    id: "coastal",
    name: "Coastal",
    vibe: "Fresh and breezy",
    persona: "Hannah Reed, Teacher",
    sampleField: "Education",
    blurb: "A friendly, upbeat direction that makes personality and everyday impact feel immediate.",
    traits: ["Friendly", "Personality-led", "Rounded details"],
    swatch: ["#eef6f8", "#2a7f9e", "#f2b134"],
  },
  {
    id: "luxe",
    name: "Ivory Luxe",
    vibe: "Elegant and premium",
    persona: "Camille Rousseau, Interior Designer",
    sampleField: "Interior design",
    blurb: "A restrained, premium direction with elegant type and gallery-like presentation.",
    traits: ["Premium", "Gallery-led", "Elegant type"],
    swatch: ["#f6f1e7", "#1a1a1a", "#b08d57"],
  },
]

// ------------------------------------------------------------
// CAREER-AWARE PALETTES
// Thirty universal color directions. The visitor's career changes
// the recommended content, while every visual stays color-only.
// ------------------------------------------------------------
export const portfolioPalettes = [
  {
    id: "afterdark",
    name: "After Dark",
    type: "Navy / violet / cyan",
    blurb: "Deep navy with vivid violet and an electric cyan highlight.",
    bestFor: "Bold and modern.",
    swatch: ["#090d18", "#7567ff", "#71e5ff"],
  },
  {
    id: "clearspace",
    name: "Clear Space",
    type: "Ivory / sage / mist",
    blurb: "Warm ivory with muted sage and a soft blue-green.",
    bestFor: "Calm and approachable.",
    swatch: ["#f7f8f5", "#438176", "#dcebe7"],
  },
  {
    id: "casebook",
    name: "Warm Contrast",
    type: "Cream / terracotta / ink",
    blurb: "Warm cream and terracotta grounded by crisp dark ink.",
    bestFor: "Warm and distinctive.",
    swatch: ["#f1ebdf", "#b44825", "#171717"],
  },
  {
    id: "essential",
    name: "Monochrome",
    type: "White / black / gray",
    blurb: "Black, white, and soft gray with no competing color.",
    bestFor: "Timeless and flexible.",
    swatch: ["#ffffff", "#111111", "#b8b8b8"],
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    type: "Navy / blue / foam",
    blurb: "Inky navy with confident blue and pale sea foam.",
    bestFor: "Focused and trustworthy.",
    swatch: ["#0b1f33", "#277da1", "#d9f0f0"],
  },
  {
    id: "forest",
    name: "Forest",
    type: "Charcoal / green / mint",
    blurb: "Dark charcoal with fresh green and a quiet mint.",
    bestFor: "Grounded and fresh.",
    swatch: ["#101a16", "#2f855a", "#cfe8d8"],
  },
  {
    id: "sunset",
    name: "Sunset",
    type: "Plum / coral / gold",
    blurb: "Deep plum with energetic coral and warm golden yellow.",
    bestFor: "Expressive and upbeat.",
    swatch: ["#2b1638", "#ef6f6c", "#f3c969"],
  },
  {
    id: "classic",
    name: "Classic Navy",
    type: "Ivory / navy / gold",
    blurb: "Soft ivory with traditional navy and a restrained gold.",
    bestFor: "Polished and established.",
    swatch: ["#f5f1e8", "#18263d", "#b5944b"],
  },
  {
    id: "berry",
    name: "Berry",
    type: "Ink / berry / blush",
    blurb: "Near-black ink with rich berry and a pale blush.",
    bestFor: "Confident and creative.",
    swatch: ["#19131d", "#9d3c72", "#f1d8e4"],
  },
  {
    id: "clay",
    name: "Clay & Olive",
    type: "Sand / clay / olive",
    blurb: "Natural sand with earthy clay and softened olive.",
    bestFor: "Organic and relaxed.",
    swatch: ["#e9ddc7", "#a85d3f", "#626b47"],
  },
  {
    id: "lavender",
    name: "Lavender Haze",
    type: "Lilac / indigo / pearl",
    blurb: "Soft lilac with deep indigo and a luminous pearl backdrop.",
    bestFor: "Imaginative and polished.",
    swatch: ["#f1edfa", "#5446a8", "#c8b9ef"],
  },
  {
    id: "citrus",
    name: "Citrus Ink",
    type: "Ink / lemon / white",
    blurb: "Dark ink sharpened by bright lemon and clean white.",
    bestFor: "Energetic and direct.",
    swatch: ["#15191d", "#f4d53f", "#f8faf8"],
  },
  {
    id: "copper",
    name: "Copper Blue",
    type: "Steel / copper / cream",
    blurb: "Cool steel blue balanced by warm copper and soft cream.",
    bestFor: "Technical and refined.",
    swatch: ["#25384a", "#b86f4b", "#f3eadc"],
  },
  {
    id: "meadow",
    name: "Meadow",
    type: "Cream / grass / sky",
    blurb: "A bright cream base with fresh grass green and open-sky blue.",
    bestFor: "Optimistic and friendly.",
    swatch: ["#fbf7e8", "#5b8f45", "#86b9d1"],
  },
  {
    id: "wine",
    name: "Wine & Rose",
    type: "Wine / rose / linen",
    blurb: "Full-bodied wine with dusty rose and a warm linen neutral.",
    bestFor: "Rich and expressive.",
    swatch: ["#4a1830", "#c27b8f", "#f3e9df"],
  },
  {
    id: "arctic",
    name: "Arctic",
    type: "Ice / cobalt / navy",
    blurb: "Pale ice with crisp cobalt and a deep navy anchor.",
    bestFor: "Clear and confident.",
    swatch: ["#e9f4f7", "#2864dc", "#10243b"],
  },
  {
    id: "papaya",
    name: "Papaya",
    type: "Papaya / teal / cream",
    blurb: "Warm papaya orange contrasted with saturated teal and cream.",
    bestFor: "Playful and memorable.",
    swatch: ["#f28b62", "#126b68", "#fff3df"],
  },
  {
    id: "espresso",
    name: "Espresso",
    type: "Coffee / caramel / oat",
    blurb: "Dark coffee brown with caramel warmth and a soft oat base.",
    bestFor: "Grounded and sophisticated.",
    swatch: ["#2d211c", "#b77845", "#e8dcc9"],
  },
  {
    id: "orchid",
    name: "Electric Orchid",
    type: "Black / orchid / lavender",
    blurb: "Near-black with a vivid orchid accent and pale lavender.",
    bestFor: "Creative and high-impact.",
    swatch: ["#151218", "#c348d6", "#ead8f1"],
  },
  {
    id: "harbor",
    name: "Harbor",
    type: "Slate / aqua / fog",
    blurb: "Marine slate with quiet aqua and a light coastal fog.",
    bestFor: "Dependable and calm.",
    swatch: ["#263a45", "#5aa6a6", "#e3ecea"],
  },
  {
    id: "marigold",
    name: "Marigold",
    type: "Charcoal / marigold / bone",
    blurb: "Graphic charcoal lifted by warm marigold and a bone neutral.",
    bestFor: "Bold and welcoming.",
    swatch: ["#252525", "#dda62b", "#f2eee3"],
  },
  {
    id: "eucalyptus",
    name: "Eucalyptus",
    type: "Eucalyptus / cream / charcoal",
    blurb: "Muted eucalyptus green with airy cream and gentle charcoal.",
    bestFor: "Natural and composed.",
    swatch: ["#6f8f7b", "#f4f0e5", "#29332e"],
  },
  {
    id: "ruby",
    name: "Ruby Signal",
    type: "Ruby / ink / blush",
    blurb: "A clear ruby signal against dark ink and restrained blush.",
    bestFor: "Decisive and modern.",
    swatch: ["#c73546", "#171b23", "#f2dadd"],
  },
  {
    id: "denim",
    name: "Washed Denim",
    type: "Denim / sand / rust",
    blurb: "Washed denim blue paired with natural sand and a rust accent.",
    bestFor: "Relaxed and capable.",
    swatch: ["#55758f", "#e8dcc5", "#a95736"],
  },
  {
    id: "mintchip",
    name: "Mint Chip",
    type: "Mint / chocolate / white",
    blurb: "Cool mint with deep chocolate and a clean white finish.",
    bestFor: "Fresh and distinctive.",
    swatch: ["#c9eadf", "#352925", "#fbfbf7"],
  },
  {
    id: "ultraviolet",
    name: "Ultraviolet",
    type: "Violet / midnight / silver",
    blurb: "Saturated violet set against midnight blue and soft silver.",
    bestFor: "Futuristic and bold.",
    swatch: ["#6f42d9", "#10172b", "#d9dce5"],
  },
  {
    id: "terrace",
    name: "Terrace",
    type: "Brick / moss / parchment",
    blurb: "Weathered brick and moss softened by a parchment background.",
    bestFor: "Earthy and editorial.",
    swatch: ["#9f503d", "#586248", "#eee3cc"],
  },
  {
    id: "sorbet",
    name: "Sorbet",
    type: "Peach / raspberry / vanilla",
    blurb: "Soft peach with a raspberry accent and creamy vanilla.",
    bestFor: "Bright and personable.",
    swatch: ["#f7b69e", "#bd3f68", "#fff4dc"],
  },
  {
    id: "blueprint",
    name: "Blueprint",
    type: "Blueprint / white / orange",
    blurb: "Classic blueprint blue with crisp white and a precise orange mark.",
    bestFor: "Structured and inventive.",
    swatch: ["#174b78", "#f6f8f5", "#ed7b32"],
  },
  {
    id: "moonstone",
    name: "Moonstone",
    type: "Moon gray / teal / plum",
    blurb: "A moon-gray foundation with jewel-like teal and muted plum.",
    bestFor: "Balanced and uncommon.",
    swatch: ["#d9dadd", "#277b7a", "#68445f"],
  },
]

// ------------------------------------------------------------
// REAL CLIENT SITES
// Set live: true once a site is online. thumb is the fallback
// image shown while the live preview loads (public/examples/).
// ------------------------------------------------------------
export const realSites = [
  {
    id: "josh",
    name: "Josh Cowell",
    field: "Engineering",
    url: "https://joshuacowell.com",
    thumb: "/examples/josh-hd.png",
    live: true,
  },
  {
    id: "david",
    name: "David Cowell",
    field: "Engineering",
    url: "https://davidcowell.com",
    thumb: "/examples/david-hd.png",
    live: true,
  },
  {
    id: "caden",
    name: "Caden Solle",
    field: "Engineering",
    url: "https://cowelljoshua.github.io/caden-solle/",
    thumb: "/examples/caden-hd.png",
    live: true,
  },
  {
    id: "dave",
    name: "Dave Patchell",
    field: "Talent Acquisition",
    url: "https://davepatchell.netlify.app/",
    thumb: "/examples/dave-hd.png",
    live: true,
  },
  {
    id: "caroline",
    name: "Caroline",
    field: "Nursing",
    url: "https://carolinethomas.netlify.app/",
    thumb: "/examples/caroline-hd.png",
    live: true,
  },
]

// ------------------------------------------------------------
// INTAKE FORM OPTIONS
// ------------------------------------------------------------
export const palettes = [
  { id: "electric", name: "Electric", colors: ["#0a0a14", "#7c5cff", "#22d3ee"] },
  { id: "calm", name: "Calm", colors: ["#f7f6f2", "#7aa5a0", "#e8b4a0"] },
  { id: "bold", name: "Bold", colors: ["#111111", "#f5f0e8", "#e63946"] },
  { id: "earthy", name: "Earthy", colors: ["#f3e9dc", "#b4552d", "#3a2e26"] },
  { id: "classic", name: "Classic", colors: ["#f4f4f6", "#1e293b", "#996515"] },
  { id: "forest", name: "Forest", colors: ["#0f1a14", "#3ddc84", "#e8f5e9"] },
  { id: "sunset", name: "Sunset", colors: ["#1a1023", "#ff6b6b", "#ffd166"] },
  { id: "unsure", name: "Not sure, surprise me", colors: ["#666", "#999", "#ccc"] },
]

export const brandChips = [
  "Apple", "Nike", "Stripe", "Notion", "Airbnb", "Tesla", "Spotify", "Patagonia", "Rolex", "National Geographic",
]

// The common ones. Anything else goes through the "Other" box on the form.
export const pageOptions = [
  "About me", "Projects / Work", "Resume", "Testimonials", "Experience timeline", "Contact", "Skills & tools", "Certifications", "Awards & honors", "Publications / research",
]

// The most projects a client can submit.
export const projectLimit = 10

// ------------------------------------------------------------
// FAQ
// ------------------------------------------------------------
export const faq = [
  {
    q: "What do I actually have to do?",
    a: "One form. You tell me about yourself, enter your career field, choose a visual direction, and attach your files. I tailor the design to your work and handle the build, web address, and launch. You review a private preview and request changes before it goes live.",
  },
  {
    q: "When do I pay, and how much?",
    a: "A portfolio is $150 total, down from $300. Your $20 deposit is part of that price, not an extra fee, and the remaining $130 is due only after your site is live and you approve it. Nothing is charged by the form.",
  },
  {
    q: "Is paying safe?",
    a: "Yes. Every payment goes through Stripe, the same checkout used by millions of businesses. You pay on Stripe's own secure page, so your card details never touch this site and I never see them.",
  },
  {
    q: "How do changes and edits work?",
    a: "While I am building, you get up to 3 rounds of changes to get your site exactly right before launch. Send as many tweaks as you like in each round, then it goes live.",
  },
  {
    q: "Do I pay for hosting or a domain?",
    a: "Hosting is free only when your site uses a clean address like yourname.netlify.app. Want your own .com or .net instead? That is $30 a year, or $4 a month. If you have a name in mind, I check availability; if not, you can decide later. Payment starts only after I confirm the name, then I buy it, set it up, and bill it through your account.",
  },
  {
    q: "Can I make changes myself?",
    a: "Every change runs through me, so you never have to log in, wrestle with code, or learn a design tool. Before launch, just tell me what to change. After launch, send it through the client portal and I will handle it for you.",
  },
  {
    q: "What do changes cost after launch?",
    a: "Wording edits are $10, and you can send as many wording changes as you want in one go, it is all one request. A design change (colors, fonts, layout, or a new section) is $40. You request either one from the client portal, no back-and-forth needed.",
  },
  {
    q: "What if I do not like the design?",
    a: "Before launch, you get a private preview and up to 3 rounds of changes. I refine it with your feedback until it feels like you.",
  },
]
