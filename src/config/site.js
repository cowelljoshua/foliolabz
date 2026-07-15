// ============================================================
// FOLIOLAB SITE CONFIG
// Everything you might ever want to change lives in this file:
// prices, payment links, contact info, copy, FAQ, examples.
// Edit, save, redeploy. Nothing else needs touching.
// ============================================================

export const site = {
  brand: "FolioLabz",
  tagline: "Portfolio websites, built for you.",

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

  // Typical build timelines shown on the pricing page. Wording stays soft ("about").
  delivery: {
    standard: "about 2 weeks",
    rush: "1 week",
  },
}

// ------------------------------------------------------------
// STRIPE PAYMENT LINKS
// Paste your Payment Link URLs here after creating them in Stripe
// (see SETUP.md, it walks you through them).
// Leave a link as "" and its Pay button simply hides; the
// "Start my build" flow keeps working either way.
// ------------------------------------------------------------
export const stripeLinks = {
  deposit: "https://buy.stripe.com/00w4gs4Aw7CT6G0fly7Re00",         // $50 deposit that starts any website build
  launchBalance: "https://buy.stripe.com/7sY14gd72f5l9Sc3CQ7Re01",   // $250 balance (Launch $300 minus the $50 deposit)
  proBalance: "https://buy.stripe.com/bJe8wI0kg4qH3tOc9m7Re02",      // $500 balance (Pro $550 minus the $50 deposit)
  domainYearly: "https://buy.stripe.com/9B6bIUc2Yf5l9Sc7T67Re03", // $30/yr recurring custom domain
  editWording: "https://buy.stripe.com/6oU7sE2so3mDd4oehu7Re05",     // $10 wording edits (as many as they want in one request)
  editDesign: "https://buy.stripe.com/7sY7sEgje6yP5BW8Xa7Re06",      // $40 design change
  resumePolish: "https://buy.stripe.com/4gMcMY3wsaP5d4o2yM7Re07",    // One-time $40
  resumeMeeting: "https://buy.stripe.com/dRmfZa5EA5uL8O84GU7Re08",   // "Resume Polish Pro" in Stripe, one-time $75
}

// ------------------------------------------------------------
// WEBSITE TIERS
// ------------------------------------------------------------
export const tiers = [
  {
    id: "launch",
    name: "Launch",
    originalPrice: 350,
    originalPriceLabel: "$350",
    price: 300,
    priceLabel: "$300",
    blurb: "Everything you need to look professional.",
    headline: ["Up to 4 pages", "Custom design in your style", "Launched and live for you"],
    full: [
      "Up to 4 pages: Home, Work, Resume, Contact",
      "A custom design shaped around your career and chosen color direction",
      "Looks perfect on phones, tablets, and laptops",
      "Contact and social buttons wherever you want them",
      "A resume download button for recruiters",
      "Hosting included free, for as long as you want it online",
      "Launch free on a clean web address, or add your own .com for $30/yr and I handle it",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    originalPrice: 600,
    originalPriceLabel: "$600",
    price: 550,
    priceLabel: "$550",
    blurb: "For people who want to stand out.",
    headline: ["Up to 7 pages", "Expanded galleries and case studies", "1 personal strategy meeting"],
    full: [
      "Everything in Launch",
      "Up to 7 pages",
      "Larger photo galleries and in-depth project case studies",
      "A working contact form: visitor messages land straight in your email",
      "A testimonials section that builds instant trust",
      "Extra animation and polish throughout",
      "1 personal 30-minute strategy meeting with me",
    ],
    popular: true,
  },
]

// ------------------------------------------------------------
// HOW PAYMENT WORKS (deposit first, balance at launch)
// ------------------------------------------------------------
export const deposit = {
  amount: 50,
  label: "$50 today, applied toward your total",
  detail:
    "Your $50 deposit is part of the package price, not an extra fee. The remaining balance is due only after your site is live and you approve it. Nothing else is charged by the form.",
}

// ------------------------------------------------------------
// WEB ADDRESSES / DOMAINS (free option vs a custom .com)
// ------------------------------------------------------------
export const hosting = {
  free: {
    title: "Free web address",
    example: "yourname.netlify.app",
    detail: "Go live at no cost on a clean address like yourname.netlify.app. Hosting stays free for as long as you want.",
  },
  custom: {
    title: "Your own .com or .net",
    yearly: "$30/yr",
    detail:
      "Want your own .com instead? It is $30/yr. I check availability first, then buy it, set it up, and bill it through your account, so you never deal with a domain company.",
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

// Balance still owed after the $50 deposit, by package.
export const balances = [
  { pkg: "launch", name: "Launch", total: "$300", balanceLabel: "$250", stripeKey: "launchBalance" },
  { pkg: "pro", name: "Pro", total: "$550", balanceLabel: "$500", stripeKey: "proBalance" },
]

// Custom domain, handled by you. Payment is annual after availability is confirmed.
export const domainOffer = {
  detail:
    "Interested in your own .com or .net? If you already have names in mind, share them. I check availability and confirm the domain before payment starts.",
  yearly: { label: "$30/yr", stripeKey: "domainYearly" },
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
// RUSH (the only add-on)
// ------------------------------------------------------------
export const rush = {
  price: 75,
  label: "Rush my build",
  detail: `Standard delivery is ${site.delivery.standard}. Rush moves you to the front of the line: ${site.delivery.rush}.`,
}

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
  heading: "Not ready for a website? Start with your resume.",
  humanLine: "Edited by a human.",
  tiers: [
    {
      id: "resume-polish",
      name: "Resume Polish",
      price: 40,
      priceLabel: "$40",
      blurb: "Send your resume. Get it back sharper.",
      full: ["Wording that leads with results", "Clean, recruiter-friendly layout", "Personal notes on what I changed and why"],
      stripeKey: "resumePolish",
    },
    {
      id: "resume-meeting",
      name: "Resume Polish Pro",
      price: 75,
      priceLabel: "$75",
      blurb: "The polish, plus 30 minutes with me.",
      full: ["Everything in Resume Polish", "A personal 30-minute meeting", "Resume, cover letter, or portfolio direction, your call"],
      stripeKey: "resumeMeeting",
    },
  ],
  resumePdf: "/josh-resume.pdf",
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
// Ten universal color directions. The visitor's career changes
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
    id: "caroline",
    name: "Caroline",
    field: "Nursing",
    url: "https://carolinethomas.netlify.app/",
    thumb: "/examples/caroline-hd.png",
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
    field: "Mechanical Engineering",
    url: "https://cowelljoshua.github.io/caden-solle/",
    thumb: "/examples/caden-hd.png",
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

export const pageOptions = [
  "About me", "Projects / Work", "Resume", "Photo gallery", "Testimonials", "Experience timeline", "Contact", "Blog / Writing", "Skills & tools", "Certifications", "Awards & honors", "Publications / research", "Services", "FAQ", "Press / features", "Speaking & events", "Booking / availability",
]

// How many pages each package can pick from the list above.
export const pageLimits = { launch: 4, pro: 7 }

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
    a: "Your $50 deposit is part of the package price, not an extra fee. The remaining balance is due only after your site is live and you approve it. Nothing else is charged by the form.",
  },
  {
    q: "How do changes and edits work?",
    a: "While I am building, you get up to 3 rounds of changes to get your site exactly right before launch. Send as many tweaks as you like in each round, then it goes live.",
  },
  {
    q: "How long does it take?",
    a: `Most sites are ready in ${site.delivery.standard}. Need it sooner? The rush option moves you to the front of the line for delivery in ${site.delivery.rush}.`,
  },
  {
    q: "Do I pay for hosting or a domain?",
    a: "Hosting is included free, for as long as you want your site online, and you can launch free on a clean address like yourname.netlify.app. Want your own .com or .net instead? That is $30 a year. If you have a name in mind, I check availability; if not, you can decide later. Payment starts only after I confirm the name, then I buy it, set it up, and bill it through your account.",
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
