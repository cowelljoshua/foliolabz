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

  github: "https://github.com/cowelljoshua",

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
  domainYearly: "https://buy.stripe.com/9B6bIUc2Yf5l9Sc7T67Re03",    // $20/yr RECURRING, custom .com/.net for a client
  domainMonthly: "https://buy.stripe.com/cNifZaeb6aP51lGgpC7Re04",   // $4/mo RECURRING, custom .com/.net for a client
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
    price: 300,
    priceLabel: "$300",
    blurb: "Everything you need to look professional.",
    headline: ["Up to 4 pages", "Custom design in your style", "Launched and live for you"],
    full: [
      "Up to 4 pages: Home, Work, Resume, Contact",
      "A custom design in the style you pick",
      "Looks perfect on phones, tablets, and laptops",
      "Contact and social buttons wherever you want them",
      "A resume download button for recruiters",
      "Hosting included free, for as long as you want it online",
      "Launch free on a clean web address, or add your own .com for $4/mo (or $20/yr) and I handle it",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 550,
    priceLabel: "$550",
    blurb: "For people who want to stand out.",
    headline: ["Up to 7 pages", "Photo and project gallery", "1 personal strategy meeting"],
    full: [
      "Everything in Launch",
      "Up to 7 pages",
      "A photo and project gallery that is a joy to scroll",
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
  label: "$50 deposit to start",
  detail:
    "You start with a $50 deposit to lock in your spot. The rest of your package is due only once your site is live and you love it. Nothing else is charged by the form.",
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
    monthly: "$4/mo",
    yearly: "$20/yr",
    detail:
      "Want yourname.com instead? It is $4/mo, or $20/yr. I buy it, set it up, and bill it through your account, so you never deal with a domain company.",
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

// Custom domain, handled by you. Client picks monthly or yearly billing.
export const domainOffer = {
  detail:
    "Trade your free address for your own .com or .net. I buy it, connect it, and keep it pointed at your site. Pay monthly or yearly, cancel anytime.",
  monthly: { label: "$4/mo", stripeKey: "domainMonthly" },
  yearly: { label: "$20/yr", stripeKey: "domainYearly" },
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
    blurb: "Glowing accents on deep black. Built to impress technical recruiters.",
    swatch: ["#0a0a14", "#7c5cff", "#22d3ee"],
  },
  {
    id: "softlight",
    name: "Soft Light",
    vibe: "Clean, airy, calm",
    persona: "Elena Brooks, Registered Nurse",
    blurb: "Gentle colors and lots of breathing room. Warm and trustworthy.",
    swatch: ["#f7f6f2", "#7aa5a0", "#e8b4a0"],
  },
  {
    id: "editorial",
    name: "Editorial",
    vibe: "Bold, magazine style",
    persona: "Devon Price, Marketing Graduate",
    blurb: "Huge type and confident layout. For people with something to say.",
    swatch: ["#111111", "#f5f0e8", "#e63946"],
  },
  {
    id: "warmstudio",
    name: "Warm Studio",
    vibe: "Creative earth tones",
    persona: "Sofia Reyes, Photographer",
    blurb: "Terracotta and cream, image-first. Made for visual work.",
    swatch: ["#f3e9dc", "#b4552d", "#3a2e26"],
  },
  {
    id: "classicslate",
    name: "Classic Slate",
    vibe: "Traditional and refined",
    persona: "James Whitfield, Finance Student",
    blurb: "Serif type and quiet confidence. Banks and firms love this one.",
    swatch: ["#f4f4f6", "#1e293b", "#996515"],
  },
  {
    id: "neon",
    name: "Neon Grid",
    vibe: "Cyber and high-energy",
    persona: "Kai Nakamura, Software Developer",
    blurb: "Electric magenta and cyan on black. For builders who ship.",
    swatch: ["#0b0710", "#ff2e97", "#0ff0fc"],
  },
  {
    id: "botanical",
    name: "Botanical",
    vibe: "Organic and calming",
    persona: "Priya Anand, Wellness Coach",
    blurb: "Sage green and cream. Grounded, healthy, and human.",
    swatch: ["#f4f1e9", "#4f7a4a", "#c98a5a"],
  },
  {
    id: "mono",
    name: "Mono",
    vibe: "Minimal black and white",
    persona: "Theo Laurent, Architect",
    blurb: "Nothing but type, space, and confidence. Design speaks for itself.",
    swatch: ["#ffffff", "#111111", "#8a8a8a"],
  },
  {
    id: "coastal",
    name: "Coastal",
    vibe: "Fresh and breezy",
    persona: "Hannah Reed, Teacher",
    blurb: "Ocean blues and warm sand. Friendly and easy to trust.",
    swatch: ["#eef6f8", "#2a7f9e", "#f2b134"],
  },
  {
    id: "luxe",
    name: "Ivory Luxe",
    vibe: "Elegant and premium",
    persona: "Camille Rousseau, Interior Designer",
    blurb: "Ivory and gold with quiet serif type. Understated luxury.",
    swatch: ["#f6f1e7", "#1a1a1a", "#b08d57"],
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
    thumb: "/examples/josh.png",
    live: true,
  },
  {
    id: "david",
    name: "David Cowell",
    field: "Engineering",
    url: "https://davidcowell.com",
    thumb: "/examples/david.png",
    live: true,
  },
  {
    id: "caroline",
    name: "Caroline",
    field: "Nursing",
    url: "https://carolinethomas.netlify.app/",
    thumb: "/examples/caroline.png",
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
  "About me", "Projects / Work", "Resume", "Photo gallery", "Testimonials", "Experience timeline", "Contact", "Blog / Writing",
]

// How many pages each package can pick from the list above.
export const pageLimits = { launch: 4, pro: 7 }

// ------------------------------------------------------------
// FAQ
// ------------------------------------------------------------
export const faq = [
  {
    q: "What do I actually have to do?",
    a: "One form. You tell me about yourself, pick a style, and attach your files. I handle the design, the build, the web address, and the launch. You review a private preview and request changes before it goes live.",
  },
  {
    q: "When do I pay, and how much?",
    a: "You start with a $50 deposit to lock in your spot. The rest of your package is due only once your site is live and you love it. Nothing else is charged by the form.",
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
    a: "Hosting is included free, for as long as you want your site online, and you can launch free on a clean address like yourname.netlify.app. Want your own .com or .net instead? That is $4 a month, or $20 a year. I buy it, set it up, and bill it through your account, so you never deal with a domain company.",
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
    a: "Before launch, you get a private preview and up to 3 rounds of changes, so we can shape it until it feels like you.",
  },
]
