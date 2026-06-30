export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Pricing", to: "/pricing" },
  { label: "Booking", to: "/booking" },
  { label: "Careers", to: "/careers" },
  { label: "Feedback", to: "/feedback" },
  { label: "Contact", to: "/contact" },
] as const;

export const BRAND = {
  name: "Quick Shortly",
  tagline: "Shoot on iPhone. Edit Like Cinema.",
  email: "hello@quickshortly.com",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
};

export const STATS = [
  { value: 1200, suffix: "+", label: "Happy Clients" },
  { value: 3500, suffix: "+", label: "Projects Completed" },
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 980, suffix: "+", label: "Five Star Reviews" },
];

export const SERVICES = [
  { slug: "instagram-reels", title: "Instagram Reels", icon: "Instagram", desc: "Scroll-stopping vertical reels engineered for reach and retention." },
  { slug: "wedding-films", title: "Wedding Films", icon: "Heart", desc: "Cinematic wedding stories that feel like a feature film." },
  { slug: "pre-wedding", title: "Pre-Wedding", icon: "Camera", desc: "Romantic pre-wedding shoots with cinematic color and motion." },
  { slug: "corporate-ads", title: "Corporate Ads", icon: "Building2", desc: "High-impact brand commercials that convert viewers to customers." },
  { slug: "ai-videos", title: "AI Videos", icon: "Sparkles", desc: "Next-gen AI-generated visuals and avatars for modern brands." },
  { slug: "ai-trailer", title: "AI Trailer", icon: "Clapperboard", desc: "Epic AI-powered trailers with cinematic pacing and sound." },
  { slug: "short-film", title: "Short Film", icon: "Film", desc: "Story-driven short films shot and edited like cinema." },
  { slug: "trailer-cut", title: "Trailer Cut", icon: "Scissors", desc: "Punchy trailer edits that build hype in seconds." },
  { slug: "motion-graphics", title: "Motion Graphics", icon: "Shapes", desc: "Fluid motion design, titles, and animated explainers." },
  { slug: "logo-animation", title: "Logo Animation", icon: "Hexagon", desc: "Signature animated logo stings for a premium brand feel." },
  { slug: "color-grading", title: "Color Grading", icon: "Palette", desc: "Hollywood-grade color that gives footage a cinematic mood." },
  { slug: "youtube-editing", title: "YouTube Editing", icon: "Youtube", desc: "Retention-first long-form edits that grow your channel." },
  { slug: "social-media", title: "Social Media Content", icon: "Share2", desc: "Always-on content packages across every platform." },
] as const;

export const PRICING = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/ project",
    desc: "For creators getting started.",
    features: ["1 Edited Reel", "Up to 30s", "Basic Color Grade", "2 Revisions", "48h Delivery"],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹14,999",
    period: "/ project",
    desc: "For growing brands & influencers.",
    features: ["4 Edited Videos", "Up to 90s each", "Cinematic Color", "Motion Graphics", "5 Revisions", "24h Priority"],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹39,999",
    period: "/ project",
    desc: "For premium campaigns.",
    features: ["10 Videos", "4K Delivery", "AI Visuals", "Sound Design", "Unlimited Revisions", "Dedicated Editor"],
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For studios & large teams.",
    features: ["Unlimited Volume", "Full Production Crew", "Brand Retainer", "SLA & Support", "Account Manager"],
    popular: false,
  },
];

export const PORTFOLIO_FILTERS = [
  "All",
  "Wedding",
  "Corporate",
  "Instagram",
  "AI Videos",
  "Commercial",
  "Trailer",
] as const;

export const PORTFOLIO = [
  { id: 1, title: "Aisha & Rohan", category: "Wedding", hue: 330 },
  { id: 2, title: "Nexus Brand Film", category: "Corporate", hue: 256 },
  { id: 3, title: "Summer Drop Reel", category: "Instagram", hue: 30 },
  { id: 4, title: "Neon Dreams AI", category: "AI Videos", hue: 290 },
  { id: 5, title: "Urban Watch Ad", category: "Commercial", hue: 200 },
  { id: 6, title: "Eclipse Trailer", category: "Trailer", hue: 12 },
  { id: 7, title: "Maya & Dev", category: "Wedding", hue: 345 },
  { id: 8, title: "FinTech Launch", category: "Corporate", hue: 220 },
  { id: 9, title: "Glow Skincare", category: "Instagram", hue: 160 },
  { id: 10, title: "Synthwave AI Story", category: "AI Videos", hue: 275 },
  { id: 11, title: "AutoX Commercial", category: "Commercial", hue: 240 },
  { id: 12, title: "Phantom Trailer", category: "Trailer", hue: 0 },
];

export const CAREERS = [
  { title: "Video Editor", type: "Full-time · Remote", desc: "Cut cinematic stories across reels, ads, and films." },
  { title: "Motion Graphics Designer", type: "Full-time · Hybrid", desc: "Design fluid motion, titles, and animated brand systems." },
  { title: "AI Video Editor", type: "Full-time · Remote", desc: "Pioneer AI-generated visuals and next-gen workflows." },
  { title: "Camera Operator", type: "Contract · On-site", desc: "Shoot premium iPhone & cinema-grade footage on location." },
  { title: "Graphic Designer", type: "Full-time · Remote", desc: "Craft thumbnails, brand kits, and social design." },
];

export const BOOKING_STATUS = [
  "Pending",
  "Editing",
  "Rendering",
  "Quality Check",
  "Delivered",
] as const;
