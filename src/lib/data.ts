/** Contact details shared with the parent company, Zollgate (zollgate.com). */
export const company = {
  email: "info@zollgate.com",
  phone: "+49 911 47846614",
  phoneHref: "tel:+4991147846614",
  street: "Von-Behring-Straße 9",
  city: "88131 Lindau am Bodensee",
  country: "Germany",
  parentUrl: "https://www.zollgate.com",
  imprintUrl: "https://www.zollgate.com/imprint",
  privacyUrl: "https://www.zollgate.com/privacy-policy",
};

export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

export type Player = {
  slug: string;
  name: string;
  bio: string;
  // Everything below is optional so a newly signed player can go live before the full profile is ready.
  number?: number;
  position?: Position;
  club?: string;
  league?: string;
  nationality?: string;
  age?: number;
  height?: string;
  foot?: "Left" | "Right" | "Both";
  marketValue?: string;
  contractUntil?: string;
  /** Season the headline stats refer to, e.g. "2026/27". */
  statsSeason?: string;
  stats?: { apps: number; goals: number; assists: number; cleanSheets?: number; minutes?: number };
  joined?: string;
  // Optional extended profile
  birthDate?: string;
  weight?: string;
  role?: string;
  photo?: string;
  career?: { period: string; club: string; detail?: string }[];
  seasons?: { season: string; club: string; league: string; apps: number; goals: number; assists: number; minutes: number }[];
  strengths?: { label: string; score: number; note?: string }[];
  ambition?: string[];
  videos?: { src: string; poster: string; title: string }[];
  portfolio?: string;
  sourceUrl?: string;
};

export const players: Player[] = [
  {
    slug: "godfred-kotei",
    name: "Godfred Kotei",
    number: 7,
    position: "Midfielder",
    role: "Winger (left / right)",
    club: "ASV Hamburg",
    league: "Landesliga Hansa (Tier 6)",
    nationality: "Ghana",
    birthDate: "2004-06-21",
    age: 22,
    height: "1.93 m",
    weight: "85 kg",
    foot: "Right",
    statsSeason: "2026/27",
    stats: { apps: 7, goals: 2, assists: 0, minutes: 462 },
    photo: "/players/godfred-kotei/action.jpg",
    bio: "Godfred Kotei is a 1.93 m winger who can play on either the left or the right flank. He stands out for his pace, his technique and his ability to win one-on-one duels. This season he has started all seven of ASV Hamburg's league matches and posts a 97 team MVP rating on FuPa.",
    career: [
      { period: "2012", club: "FC Türkiye Hamburg" },
      { period: "2014", club: "ESV Einigkeit" },
      { period: "U15", club: "Eintracht Norderstedt", detail: "Oberliga" },
      { period: "U17", club: "Harburger Türksport" },
      { period: "U19", club: "Eimsbütteler TV Hamburg", detail: "Regionalliga / Oberliga" },
      { period: "Final U19 year / first team", club: "Harksheide", detail: "Oberliga (Tier 5)" },
      { period: "2024/25", club: "Klub Kosova", detail: "Landesliga Hansa (Tier 6)" },
      { period: "2025 – present", club: "ASV Hamburg", detail: "Landesliga Hansa (Tier 6)" },
    ],
    seasons: [
      { season: "2026/27", club: "ASV Hamburg", league: "Landesliga Hansa", apps: 7, goals: 2, assists: 0, minutes: 462 },
      { season: "2025/26", club: "ASV Hamburg", league: "Landesliga Hansa", apps: 15, goals: 1, assists: 0, minutes: 595 },
      { season: "2024/25", club: "Klub Kosova", league: "Landesliga Hansa", apps: 17, goals: 3, assists: 0, minutes: 1210 },
    ],
    strengths: [
      { label: "Pace", score: 9 },
      { label: "Dribbling", score: 8 },
      { label: "1 v 1", score: 9 },
      { label: "Finishing", score: 8, note: "Including his weaker left foot" },
      { label: "Crossing & assists", score: 7 },
      { label: "Duels", score: 7 },
      { label: "Stamina", score: 8 },
    ],
    ambition: [
      "My goal is to keep developing as an athlete, improve my abilities on the pitch and establish myself in senior football at the highest level possible.",
      "I want to keep building on my strengths, above all pace, dribbling and one-on-one situations, and grow into a versatile winger.",
    ],
    portfolio: "/players/godfred-kotei/portfolio.jpg",
    sourceUrl: "https://www.fupa.net/player/godfred-kotei-2337050",
    joined: "October 2026",
  },
  {
    slug: "roth-mateta",
    photo: "/players/roth-mateta/photo.jpg",
    name: "Roth Mateta",
    bio: "Roth Mateta joined Zollgate Agency in October 2026. His full profile, including career history and statistics, will be published soon. In the meantime, watch his highlights below.",
    joined: "October 2026",
    videos: [
      { src: "/players/roth-mateta/highlight-1.mp4", poster: "/players/roth-mateta/highlight-1.jpg", title: "Match highlights" },
      { src: "/players/roth-mateta/highlight-2.mp4", poster: "/players/roth-mateta/highlight-2.jpg", title: "Finishing clip" },
    ],
  },
  {
    slug: "kwame-asante",
    photo: "/players/kwame-asante/photo.jpg",
    name: "Kwame Asante",
    number: 8,
    position: "Midfielder",
    club: "KRC Genk",
    league: "Jupiler Pro League",
    nationality: "Ghana",
    age: 22,
    height: "1.79 m",
    foot: "Both",
    marketValue: "€7M",
    contractUntil: "2027",
    statsSeason: "2025/26",
    stats: { apps: 34, goals: 7, assists: 11 },
    bio: "Box-to-box engine who breaks lines with the ball and covers every blade of grass without it. Kwame is a regular for his national team and one of the league's top ball-winners.",
  },
  {
    slug: "jonas-weber",
    photo: "/players/jonas-weber/photo.jpg",
    name: "Jonas Weber",
    number: 1,
    position: "Goalkeeper",
    club: "SC Paderborn",
    league: "2. Bundesliga",
    nationality: "Germany",
    age: 24,
    height: "1.93 m",
    foot: "Right",
    marketValue: "€2.8M",
    contractUntil: "2026",
    statsSeason: "2025/26",
    stats: { apps: 29, goals: 0, assists: 1, cleanSheets: 12 },
    bio: "A commanding presence who is comfortable playing out from the back. Jonas kept 12 clean sheets last season and has one of the highest save percentages in the division.",
  },
  {
    slug: "mateo-silva",
    photo: "/players/mateo-silva/photo.jpg",
    name: "Mateo Silva",
    number: 4,
    position: "Defender",
    club: "Club Brugge",
    league: "Jupiler Pro League",
    nationality: "Uruguay",
    age: 21,
    height: "1.88 m",
    foot: "Left",
    marketValue: "€6M",
    contractUntil: "2029",
    statsSeason: "2025/26",
    stats: { apps: 27, goals: 3, assists: 2 },
    bio: "A left-footed centre-back who reads the game well and progresses the ball with intent. Strong in the air and calm under pressure, Mateo has developed fast since his move to Europe.",
  },
];

export const positions: Position[] = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

export const services = [
  {
    title: "Player Representation",
    text: "Licensed agents who negotiate contracts, transfers and loans with one goal: the right next step for your career.",
    icon: "handshake",
    image: "/images/service-representation.jpg",
  },
  {
    title: "Scouting & Recruitment",
    text: "Data-led scouting combined with live match reports so clubs find talent and talent finds the right club.",
    icon: "scope",
    image: "/images/service-scouting.jpg",
  },
  {
    title: "Career Development",
    text: "Individual development plans, performance analysis and mentoring from former professionals.",
    icon: "chart",
    image: "/images/service-development.jpg",
  },
  {
    title: "Legal & Financial",
    text: "Contract review, tax planning, image rights and wealth management through trusted partners.",
    icon: "shield",
    image: "/images/service-legal.jpg",
  },
  {
    title: "Brand & Media",
    text: "Sponsorship deals, social media strategy and media training to grow your profile on and off the pitch.",
    icon: "spark",
    image: "/images/service-media.jpg",
  },
  {
    title: "Relocation & Welfare",
    text: "Housing, language lessons, family support and mental health resources for every move.",
    icon: "home",
    image: "/images/service-relocation.jpg",
  },
] as const;

export const steps = [
  { title: "Discover", text: "We watch matches and study performance data to find players with the potential to go further." },
  { title: "Assess", text: "Our analysts and former pros build a full profile: technical, physical, tactical and personal." },
  { title: "Plan", text: "Together we set a clear career roadmap with milestones for the next three to five years." },
  { title: "Deliver", text: "We negotiate the deals, handle the details and stay alongside you at every stage." },
];

export const testimonials = [
  {
    quote: "Zollgate understood exactly what I needed at that stage of my career. The move to Belgium was the best decision I've made.",
    name: "Kwame Asante",
    role: "Midfielder, KRC Genk",
  },
  {
    quote: "Professional, transparent and always available. They brought us three players who fit our system perfectly.",
    name: "Head of Recruitment",
    role: "Partner club, Eredivisie",
  },
  {
    quote: "From the first contract to finding an apartment for my family, they took care of everything so I could focus on football.",
    name: "Mateo Silva",
    role: "Defender, Club Brugge",
  },
];

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
  image?: string;
  player?: string;
};

export const posts: Post[] = [
  {
    slug: "godfred-kotei-joins-zollgate",
    title: "Godfred Kotei joins Zollgate Agency",
    category: "Signing",
    date: "2026-10-08",
    image: "/players/godfred-kotei/action.jpg",
    player: "godfred-kotei",
    excerpt: "The ASV Hamburg winger is the latest player to sign with Zollgate Agency.",
    body: [
      "We are delighted to welcome Godfred Kotei to Zollgate Agency. The 22-year-old Ghanaian winger plays for ASV Hamburg in the Landesliga Hansa and signed with us this month.",
      "Standing 1.93 m tall, Godfred is comfortable on either flank and is known for his pace, his dribbling and his ability to beat defenders one on one. He came through the youth set-ups of Eintracht Norderstedt, Harburger Türksport and Eimsbütteler TV Hamburg before stepping into senior football with Harksheide in the Oberliga.",
      "He has made a strong start to the 2026/27 season, starting all seven league matches for ASV Hamburg and scoring twice.",
      "Our goal together is clear: to keep developing Godfred's game and to help him establish himself at the highest level he can reach in senior football.",
    ],
  },
  {
    slug: "roth-mateta-joins-zollgate",
    title: "Roth Mateta signs with Zollgate Agency",
    category: "Signing",
    date: "2026-10-08",
    image: "/players/roth-mateta/highlight-1.jpg",
    player: "roth-mateta",
    excerpt: "We are pleased to welcome Roth Mateta to the Zollgate Agency family.",
    body: [
      "Roth Mateta has joined Zollgate Agency this month. We are excited to support Roth in the next stage of his career.",
      "His full player profile, with career history and statistics, will be published on our website soon. Until then, his match highlights are already available on his player page.",
      "Clubs interested in Roth can contact our team directly for more information.",
    ],
  },
  {
    slug: "asante-extends-with-genk",
    title: "Kwame Asante signs contract extension with KRC Genk",
    category: "Transfers",
    date: "2026-09-28",
    excerpt: "Our midfielder commits his future to the Belgian club following a breakout season.",
    body: [
      "Kwame Asante has signed a new contract with KRC Genk that runs until 2027, with an option for a further year.",
      "The 22-year-old made 34 appearances last season, scoring 7 goals and providing 11 assists from central midfield.",
      "\"Kwame has grown enormously here and the club showed real belief in him,\" said his Zollgate agent. \"This is the right environment for his next step.\"",
    ],
  },
  {
    slug: "summer-window-review",
    title: "Summer window review: 14 deals completed across Europe",
    category: "Agency",
    date: "2026-09-05",
    excerpt: "A look back at a busy transfer window for Zollgate players and partner clubs.",
    body: [
      "This summer our team completed 14 transfers and loans across eight countries, with a combined volume of more than €22M.",
      "Highlights include three first moves to Europe for South American players and two promotions from youth academies to first-team contracts.",
      "We thank our partner clubs and, above all, our players and their families for their trust.",
    ],
  },
  {
    slug: "youth-scouting-program",
    title: "Launching the Zollgate Youth Scouting Program",
    category: "Scouting",
    date: "2026-08-14",
    excerpt: "A new initiative to identify and support talented players aged 15 to 18.",
    body: [
      "We are launching a dedicated youth scouting program covering academies in Portugal, Belgium, Ghana and Nigeria.",
      "Selected players will receive a development plan, access to performance analysis and guidance for their families, at no cost.",
      "Applications open through our contact page. Coaches and academies are welcome to recommend players.",
    ],
  },
];

export function getPlayer(slug: string) {
  return players.find((p) => p.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
