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
  email: "joshuacowell2005@gmail.com",

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
// (see SETUP.md, it walks you through all six).
// Leave a link as "" and its Pay button simply hides; the
// "Start my build" flow keeps working either way.
// ------------------------------------------------------------
export const stripeLinks = {
  launch: "",          // One-time $300
  launchCare: "",      // $300 setup + $25/mo
  pro: "",             // One-time $550
  proCare: "",         // $550 setup + $25/mo
  resumePolish: "",    // One-time $40
  resumeMeeting: "",   // One-time $75
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
      "Your custom web address set up for you (about $15/year, and it is yours), or launch free on a simple address",
    ],
    careMonthly: 25,
    stripeKey: "launch",
    stripeCareKey: "launchCare",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 550,
    priceLabel: "$550",
    blurb: "For people who want to stand out.",
    headline: ["Up to 7 pages", "Photo and project gallery", "Visitor messages land in your inbox"],
    full: [
      "Everything in Launch",
      "Up to 7 pages",
      "A photo and project gallery that is a joy to scroll",
      "A working contact form: visitor messages land straight in your email",
      "A testimonials section that builds instant trust",
      "Extra animation and polish throughout",
    ],
    careMonthly: 25,
    stripeKey: "pro",
    stripeCareKey: "proCare",
    popular: true,
  },
  {
    id: "signature",
    name: "Signature",
    price: 900,
    priceLabel: "from $900",
    customQuote: true,
    blurb: "If you can describe it, I can build it.",
    headline: ["Everything in Pro", "Smart features you pick", "3 personal strategy meetings"],
    full: [
      "Everything in Pro",
      "Smart features, priced by what you pick (see below)",
      "3 personal 30-minute strategy meetings with me",
      "30 days of post-launch tweaks included",
      "Your exact quote confirmed within 24 hours of your form",
    ],
    careMonthly: 40,
    stripeKey: "",
    stripeCareKey: "",
    popular: false,
  },
]

// Smart features shown inside the Signature card. Ranges keep quotes honest.
export const smartFeatures = [
  { id: "booking", label: "Online booking calendar that fills itself in", range: "+$100 to $200" },
  { id: "uploads", label: "Visitors can send you files through your site", range: "+$75 to $150" },
  { id: "newsletter", label: "Newsletter signup that grows your audience", range: "+$75" },
  { id: "private", label: "Private pages only your clients can see", range: "+$100 to $250" },
  { id: "other", label: "Something else? Describe it and I will quote it", range: "custom" },
]

// ------------------------------------------------------------
// CARE PLAN (the monthly option that keeps a site online + maintained)
// ------------------------------------------------------------
export const carePlan = {
  name: "Care Plan",
  monthly: 25, // Signature uses its own careMonthly (40)
  blurb: "Keeps your site fresh with edits whenever you need them.",
  editDefinition:
    "Send changes whenever you need them, a new job, a new project, fresh photos, a reworded section, and I make the updates for you, usually fast. No logging in, no fiddling with anything.",
  features: [
    "Send changes whenever you want, I handle the updates",
    "Priority turnaround on every request",
    "A discount on bigger redesigns and new pages",
    "Cancel anytime, your site stays online either way",
  ],
}

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
    detail: "Once I build your first version, you get a private preview link and up to 3 rounds of changes. Send as many tweaks as you like in each round. I keep going until it feels exactly right, then it goes live.",
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
      name: "Polish + Strategy Meeting",
      price: 75,
      priceLabel: "$75",
      blurb: "The polish, plus 30 minutes with me.",
      full: ["Everything in Resume Polish", "A personal 30-minute meeting", "Resume, cover letter, or portfolio direction, your call"],
      stripeKey: "resumeMeeting",
    },
  ],
  // The before/after demo on the pricing page.
  xray: {
    before: [
      "Responsible for helping with test procedures for the rocket team",
      "Worked on various projects with other students",
      "Good communication skills and hard worker",
    ],
    after: [
      "Wrote and ran 14 test procedures for a 3,000 lbf static fire campaign, zero failed reviews",
      "Led a 6-student propulsion sub-team to a first-place finish out of 41 schools",
      "Presented monthly readiness reviews to faculty and industry judges",
    ],
    lessons: [
      "Numbers beat adjectives",
      "Lead with the result, not the duty",
      "Cut the filler nobody reads",
    ],
  },
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
    url: "https://cowelljoshua.github.io",
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
    url: "", // paste the live URL here when it is up, then set live: true
    thumb: "/examples/caroline.png",
    live: false,
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

export const sectionOptions = [
  "About me", "Projects / Work", "Resume", "Photo gallery", "Testimonials", "Experience timeline", "Contact", "Blog / Writing",
]

// ------------------------------------------------------------
// FAQ
// ------------------------------------------------------------
export const faq = [
  {
    q: "What do I actually have to do?",
    a: "One form. You tell me about yourself, pick a style, and attach your files. I handle the design, the build, the web address, and the launch. You review a private preview and request changes before it goes live.",
  },
  {
    q: "How do changes and edits work?",
    a: "Two stages. While I am building, you get up to 3 rounds of changes to get your site exactly right before launch. After launch, an optional Care Plan keeps it current: send me changes whenever you need them and I make them for you.",
  },
  {
    q: "How long does it take?",
    a: `Most sites are ready in ${site.delivery.standard}. Need it sooner? The rush option moves you to the front of the line for delivery in ${site.delivery.rush}.`,
  },
  {
    q: "Do I pay for hosting or a domain?",
    a: "Hosting is included free, for as long as you want your site online. A custom web address like yourname.com is about $15 a year, paid to the domain company, and you own it. Rather not? I can launch you free on a simpler address. Either way, I set it all up.",
  },
  {
    q: "Can I make changes myself?",
    a: "Every change runs through me, so you never have to log in, wrestle with code, or learn a design tool. Want something updated? Send a quick note and it is handled, usually fast. You decide what is on your site; I do the technical part for you.",
  },
  {
    q: "What if I cancel the Care Plan?",
    a: "No problem, cancel anytime. Your site stays online (hosting is free), you just stop getting monthly edits from me. You can pick the plan back up whenever you want.",
  },
  {
    q: "What if I do not like the design?",
    a: "You will. Before launch you get a private preview and up to 3 rounds of changes, so I can shape it until it feels like you. I do not stop at good enough.",
  },
]
