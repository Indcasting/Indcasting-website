"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Camera,
  Clapperboard,
  Pencil,
  BadgeCheck,
  Play,
  Sparkles,
  Globe,
  Film,
  Ruler,
  Building2,
  Briefcase,
  Users,
  MapPin,
  Link2,
  Star,
  ChevronRight,
} from "lucide-react";

/* ═══════════════════════════════════════
   INTERFACES
═══════════════════════════════════════ */

interface Talent {
  type: "talent";
  id: string;
  name: string;
  role: string;
  city: string;
  experience: string;
  languages: string[];
  about: string;
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  age: number;
  gender: string;
  skin: string;
  build: string;
  followers: number;
  projects: number;
  rating: number;
  avatar: string;
  cover: string;
  headshots: string[];
  showreels: { title: string; thumb: string; url: string }[];
  skills: string[];
  credits: { title: string; role: string; year: string; type: string }[];
  verified: boolean;
  premium: boolean;
}

interface Seeker {
  type: "seeker";
  id: string;
  name: string;
  company: string;
  role: string;          // e.g. "Casting Director"
  city: string;
  website: string;
  about: string;
  founded: string;
  companySize: string;
  industry: string;
  followers: number;
  activeCalls: number;
  hiredTotal: number;
  rating: number;
  avatar: string;
  cover: string;
  languages: string[];
  genres: string[];
  verified: boolean;
  premium: boolean;
  castingCalls: {
    id: string;
    title: string;
    category: string;
    location: string;
    deadline: string;
    status: "open" | "closed";
  }[];
  pastProductions: { title: string; year: string; type: string; role: string }[];
}

type Profile = Talent | Seeker;

/* ═══════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════ */

const MOCK_PROFILES: Record<string, Profile> = {
  /* ── TALENTS ── */
  "riya-sharma": {
    type: "talent",
    id: "riya-sharma",
    name: "Riya Sharma",
    role: "Actor",
    city: "Mumbai",
    experience: "5 years",
    languages: ["Hindi", "English", "Marathi"],
    about: "Passionate actor with 5 years of experience in theatre and independent films. Always looking for challenging roles that push creative boundaries and tell meaningful stories.",
    height: "5'6\"", weight: "52 kg", eyeColor: "Brown", hairColor: "Black",
    age: 26, gender: "Female", skin: "Wheatish", build: "Slim",
    followers: 12400, projects: 34, rating: 4.8,
    avatar: "/images/img1.jpg", cover: "/images/img3.jpg",
    headshots: ["/images/img1.jpg", "/images/img3.jpg", "/images/img5.jpg"],
    showreels: [
      { title: "Drama Reel 2025", thumb: "/images/img_2.png", url: "#" },
      { title: "Commercial Reel", thumb: "/images/img_7.png", url: "#" },
    ],
    skills: ["Method Acting", "Stage Combat", "Improv", "Voice Modulation", "Dance"],
    credits: [
      { title: "Mumbai Nights", role: "Lead", year: "2024", type: "OTT Series" },
      { title: "Broken Threads", role: "Supporting", year: "2023", type: "Feature Film" },
      { title: "Zindagi Ek Safar", role: "Guest", year: "2023", type: "TV Show" },
      { title: "The Last Letter", role: "Lead", year: "2022", type: "Short Film" },
    ],
    verified: true, premium: true,
  },
  "arjun-mehta": {
    type: "talent",
    id: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Model",
    city: "Delhi",
    experience: "3 years",
    languages: ["Hindi", "English", "Punjabi"],
    about: "Editorial and commercial model based in Delhi. Worked with leading fashion brands across India. Open to OTT and film projects.",
    height: "5'11\"", weight: "72 kg", eyeColor: "Dark Brown", hairColor: "Black",
    age: 24, gender: "Male", skin: "Dusky", build: "Athletic",
    followers: 8200, projects: 21, rating: 4.6,
    avatar: "/images/img_7.png", cover: "/images/img4.jpg",
    headshots: ["/images/img_7.png", "/images/img12.jpg", "/images/img_6.png"],
    showreels: [{ title: "Fashion Reel 2025", thumb: "/images/img_8.png", url: "#" }],
    skills: ["Runway", "Editorial", "Commercial", "Fitness Modelling"],
    credits: [
      { title: "Vogue India — Summer 2024", role: "Cover Model", year: "2024", type: "Editorial" },
      { title: "FabIndia Campaign", role: "Brand Face", year: "2023", type: "Commercial" },
    ],
    verified: true, premium: false,
  },

  /* ── SEEKERS ── */
  "rahul-kapoor": {
    type: "seeker",
    id: "rahul-kapoor",
    name: "Rahul Kapoor",
    company: "Kapoor Films & Associates",
    role: "Casting Director",
    city: "Mumbai",
    website: "kapoorfilms.in",
    about: "Award-winning casting director with 12 years of experience across Bollywood features, OTT originals, and national ad campaigns. Known for discovering fresh talent and building ensemble casts that resonate with audiences.",
    founded: "2012",
    companySize: "10–50 employees",
    industry: "Film & Television",
    followers: 3400,
    activeCalls: 6,
    hiredTotal: 280,
    rating: 4.9,
    avatar: "/images/img_8.png",
    cover: "/images/img4.jpg",
    languages: ["Hindi", "English", "Gujarati"],
    genres: ["Drama", "Thriller", "Romance", "OTT Originals"],
    verified: true,
    premium: true,
    castingCalls: [
      { id: "cc1", title: "Lead Actress — Hindi Feature Film", category: "Actor", location: "Mumbai", deadline: "15 Aug 2026", status: "open" },
      { id: "cc2", title: "Male Model for Luxury Brand Campaign", category: "Model", location: "Delhi", deadline: "20 Aug 2026", status: "open" },
      { id: "cc3", title: "Child Artist — OTT Series", category: "Child Artist", location: "Mumbai", deadline: "10 Aug 2026", status: "open" },
      { id: "cc4", title: "Voice Artist — Animation Film (Hindi)", category: "Voice Artist", location: "Remote", deadline: "5 Aug 2026", status: "closed" },
    ],
    pastProductions: [
      { title: "Dilli Waali Dil", year: "2024", type: "OTT Series", role: "Casting Director" },
      { title: "Raat Ka Aakhri Scene", year: "2023", type: "Feature Film", role: "Lead Casting" },
      { title: "HeroShots — Myntra", year: "2023", type: "Ad Campaign", role: "Talent Director" },
      { title: "Kahaani Ek Raat Ki", year: "2022", type: "Web Series", role: "Casting Director" },
    ],
  },
  "sneha-agarwal": {
    type: "seeker",
    id: "sneha-agarwal",
    name: "Sneha Agarwal",
    company: "Stardust Casting Agency",
    role: "Casting Agency Head",
    city: "Mumbai",
    website: "stardustcasting.com",
    about: "Leading casting agency running 30+ projects annually across film, OTT, advertising, and live events. We believe great casting is the foundation of every great story.",
    founded: "2015",
    companySize: "50–200 employees",
    industry: "Casting & Talent Management",
    followers: 5800,
    activeCalls: 14,
    hiredTotal: 950,
    rating: 4.7,
    avatar: "/images/img_10.png",
    cover: "/images/img11.jpg",
    languages: ["Hindi", "English", "Marathi", "Bengali"],
    genres: ["Feature Films", "OTT", "Ad Films", "Music Videos", "Live Events"],
    verified: true,
    premium: true,
    castingCalls: [
      { id: "cc5", title: "Supporting Actors — Streaming Drama", category: "Actor", location: "Mumbai", deadline: "18 Aug 2026", status: "open" },
      { id: "cc6", title: "Dancers for Music Video", category: "Dancer", location: "Bengaluru", deadline: "25 Aug 2026", status: "open" },
    ],
    pastProductions: [
      { title: "Zara Si Baat", year: "2024", type: "OTT Original", role: "Full Cast" },
      { title: "Nykaa — Beauty Campaign", year: "2024", type: "Ad Campaign", role: "Talent Sourcing" },
    ],
  },

  "amit-verma": {
    type: "seeker",
    id: "amit-verma",
    name: "Amit Verma",
    company: "Verma Productions",
    role: "Film Producer",
    city: "Mumbai",
    website: "vermaproductions.in",
    about: "Film producer working across feature films, OTT projects, and commercial productions. Focused on building strong creative teams and discovering fresh talent.",
    founded: "2016",
    companySize: "10–50 employees",
    industry: "Film & Television",
    followers: 2900,
    activeCalls: 5,
    hiredTotal: 210,
    rating: 4.8,
    avatar: "/images/img_7.png",
    cover: "/images/img4.jpg",
    languages: ["Hindi", "English", "Gujarati"],
    genres: ["Drama", "Thriller", "Romance", "Commercial"],
    verified: true,
    premium: false,
    castingCalls: [
      { id: "cc7", title: "Supporting Actor — Hindi Feature Film", category: "Actor", location: "Mumbai", deadline: "22 Aug 2026", status: "open" },
      { id: "cc8", title: "Female Model — Fashion Campaign", category: "Model", location: "Delhi", deadline: "28 Aug 2026", status: "open" },
      { id: "cc9", title: "Character Artist — OTT Series", category: "Actor", location: "Mumbai", deadline: "12 Aug 2026", status: "closed" },
    ],
    pastProductions: [
      { title: "City Lights Again", year: "2025", type: "Feature Film", role: "Producer" },
      { title: "The Other Side", year: "2024", type: "OTT Series", role: "Executive Producer" },
    ],
  },

  "meera-shah": {
    type: "seeker",
    id: "meera-shah",
    name: "Meera Shah",
    company: "Shah Creative Studios",
    role: "Creative Producer",
    city: "Delhi",
    website: "shahcreativestudios.in",
    about: "Creative producer and talent coordinator working across digital campaigns, music videos, branded content, and independent productions.",
    founded: "2018",
    companySize: "10–50 employees",
    industry: "Digital Media & Entertainment",
    followers: 4100,
    activeCalls: 8,
    hiredTotal: 340,
    rating: 4.8,
    avatar: "/images/img_10.png",
    cover: "/images/img11.jpg",
    languages: ["Hindi", "English", "Punjabi"],
    genres: ["Digital", "Music Videos", "Ad Films", "OTT"],
    verified: true,
    premium: true,
    castingCalls: [
      { id: "cc10", title: "Fresh Faces — Digital Campaign", category: "Actor", location: "Delhi", deadline: "19 Aug 2026", status: "open" },
      { id: "cc11", title: "Dancers — Music Video", category: "Dancer", location: "Delhi", deadline: "26 Aug 2026", status: "open" },
      { id: "cc12", title: "Voice Artist — Brand Film", category: "Voice Artist", location: "Remote", deadline: "8 Aug 2026", status: "closed" },
    ],
    pastProductions: [
      { title: "Urban Stories", year: "2025", type: "Digital Series", role: "Creative Producer" },
      { title: "Summer Beats", year: "2024", type: "Music Video", role: "Talent Coordinator" },
    ],
  },

  "karan-malhotra": {
    type: "seeker",
    id: "karan-malhotra",
    name: "Karan Malhotra",
    company: "Malhotra Entertainment",
    role: "Casting Producer",
    city: "Bengaluru",
    website: "malhotraentertainment.in",
    about: "Casting producer specialising in OTT, advertising, and regional entertainment projects. Passionate about connecting emerging artists with meaningful opportunities.",
    founded: "2019",
    companySize: "10–50 employees",
    industry: "Entertainment",
    followers: 3600,
    activeCalls: 7,
    hiredTotal: 275,
    rating: 4.7,
    avatar: "/images/img_8.png",
    cover: "/images/img3.jpg",
    languages: ["English", "Hindi", "Kannada"],
    genres: ["OTT", "Drama", "Advertising", "Regional Cinema"],
    verified: true,
    premium: false,
    castingCalls: [
      { id: "cc13", title: "Lead Actor — Regional OTT Series", category: "Actor", location: "Bengaluru", deadline: "21 Aug 2026", status: "open" },
      { id: "cc14", title: "Commercial Models — Lifestyle Brand", category: "Model", location: "Bengaluru", deadline: "30 Aug 2026", status: "open" },
      { id: "cc15", title: "Supporting Cast — Web Series", category: "Actor", location: "Bengaluru", deadline: "6 Aug 2026", status: "closed" },
    ],
    pastProductions: [
      { title: "North Star", year: "2025", type: "OTT Series", role: "Casting Producer" },
      { title: "Everyday India", year: "2024", type: "Ad Campaign", role: "Talent Director" },
    ],
  },
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return String(n);
}

/* ═══════════════════════════════════════
   SHARED STYLES
═══════════════════════════════════════ */

const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:   #0f0e0d;
    --cream: #FFFDF7;
    --gold:  #c9a84c;
    --gold2: #e8c96a;
    --mist:  #f0ebe0;
    --mid:   #6b6560;
    --white: #ffffff;
    --teal:  #0d7a6e;
    --red:   #c0392b;
  }
  html.dark {
    --ink:   #f6f6f6;
    --cream: #0b0b0b;
    --mist:  #1c1c1c;
    --mid:   #b8b8b8;
    --white: #141414;
  }
  body {
    background: var(--cream);
    color: var(--ink);
    font-family: system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* PAGE */
  .pp { min-height: 100vh; background: var(--cream); }

  /* COVER */
  .pp-cover {
    position: relative; width: 100%; height: 280px; overflow: hidden;
    background: linear-gradient(135deg,#1a1208 0%,#2d2010 50%,#1a1208 100%);
  }
  .pp-cover img { width:100%; height:100%; object-fit:cover; object-position:center top; opacity:.55; }
  .pp-cover-grad {
    position:absolute; inset:0;
    background: linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%);
  }

  /* IDENTITY */
  .pp-identity { position:relative; max-width:1100px; margin:0 auto; padding:0 24px; }
  .pp-avatar-wrap { position:absolute; top:-75px; left:24px; }
  .pp-avatar {
    width:150px; height:150px; border-radius:50%;
    border:4px solid var(--cream); object-fit:cover; display:block;
    box-shadow:0 4px 20px rgba(0,0,0,.25);
  }
  .pp-avatar-sq {
    width:150px; height:150px; border-radius:20px;
    border:4px solid var(--cream); object-fit:cover; display:block;
    box-shadow:0 4px 20px rgba(0,0,0,.25);
  }
  .pp-verified {
    position:absolute; bottom:4px; right:4px;
    width:26px; height:26px; border-radius:50%;
    background:var(--gold); border:2px solid var(--cream);
    display:flex; align-items:center; justify-content:center;
    color:#111;
  }

  .pp-info-row {
    padding-top:90px;
    display:flex; justify-content:space-between; align-items:flex-end;
    flex-wrap:wrap; gap:16px;
  }
  .pp-name {
    font-family:"Instrument Serif",Georgia,serif;
    font-size:clamp(1.9rem,3.5vw,2.9rem);
    font-weight:400; line-height:1.1; color:var(--ink);
    display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  }
  .pp-badge-pro {
    display:inline-flex; align-items:center; gap:4px;
    background:linear-gradient(135deg,var(--gold),var(--gold2));
    color:#111; font-size:.6rem; font-weight:800;
    text-transform:uppercase; letter-spacing:.1em;
    padding:3px 8px; border-radius:100px;
  }
  .pp-meta {
    display:flex; flex-wrap:wrap; gap:8px; align-items:center;
    margin-top:6px; font-size:.88rem; color:var(--mid);
  }
  .pp-meta-dot { color:var(--mist); }
  .pp-role-tag {
    display:inline-flex; align-items:center;
    background:rgba(201,168,76,.12); border:1px solid rgba(201,168,76,.3);
    color:var(--gold); font-size:.75rem; font-weight:700;
    text-transform:uppercase; letter-spacing:.08em;
    padding:3px 10px; border-radius:100px;
  }
  .pp-seeker-tag {
    display:inline-flex; align-items:center; gap:5px;
    background:rgba(13,122,110,.1); border:1px solid rgba(13,122,110,.3);
    color:var(--teal); font-size:.75rem; font-weight:700;
    text-transform:uppercase; letter-spacing:.08em;
    padding:3px 10px; border-radius:100px;
  }
  html.dark .pp-seeker-tag { color:#4ecdc4; border-color:rgba(78,205,196,.3); background:rgba(78,205,196,.08); }

  /* ACTIONS */
  .pp-actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .pp-btn-follow {
    padding:11px 30px; border-radius:999px;
    font-size:.9rem; font-weight:700; cursor:pointer; transition:.2s;
    border:2px solid var(--ink); background:var(--ink); color:var(--cream);
  }
  .pp-btn-follow.following { background:transparent; color:var(--ink); }
  html.dark .pp-btn-follow { border-color:#fff; background:#fff; color:#111; }
  html.dark .pp-btn-follow.following { background:transparent; color:#fff; }
  .pp-btn-secondary {
    padding:11px 22px; border-radius:999px; font-size:.9rem; font-weight:600;
    cursor:pointer; transition:.2s; border:1.5px solid var(--mist);
    background:transparent; color:var(--ink);
  }
  .pp-btn-secondary:hover { border-color:var(--gold); color:var(--gold); }
  html.dark .pp-btn-secondary { border-color:#333; color:#ddd; }
  .pp-btn-gold {
    padding:11px 22px; border-radius:999px; font-size:.9rem; font-weight:700;
    cursor:pointer; transition:.2s; border:2px solid var(--gold);
    background:var(--gold); color:#111;
  }
  .pp-btn-gold:hover { background:var(--gold2); }

  /* CHIPS STRIP */
  .pp-chips { display:flex; flex-wrap:wrap; gap:8px; padding:14px 0; }
  .pp-chip {
    font-size:.78rem; font-weight:600; padding:5px 14px; border-radius:100px;
    background:var(--mist); color:var(--mid);
    border:1px solid transparent; transition:.2s;
  }
  html.dark .pp-chip { background:#1e1e1e; }
  .pp-chip:hover { border-color:var(--gold); color:var(--gold); }

  /* STATS */
  .pp-stats {
    display:flex; gap:32px; padding:20px 0 0;
    border-top:1px solid var(--mist); margin-top:16px;
    flex-wrap:wrap;
  }
  html.dark .pp-stats { border-color:#222; }
  .pp-stat { display:flex; flex-direction:column; gap:2px; }
  .pp-stat-val { font-size:1.3rem; font-weight:800; color:var(--ink); letter-spacing:-.03em; }
  html.dark .pp-stat-val { color:#eee; }
  .pp-stat-lab { font-size:.72rem; color:var(--mid); text-transform:uppercase; letter-spacing:.08em; }

  /* TABS */
  .pp-tabs { display:flex; border-bottom:1px solid var(--mist); margin-top:10px; }
  html.dark .pp-tabs { border-color:#222; }
  .pp-tab {
    padding:14px 24px; font-size:.88rem; font-weight:600;
    background:none; border:none; cursor:pointer; color:var(--mid);
    border-bottom:2px solid transparent; margin-bottom:-1px; transition:.2s;
  }
  .pp-tab.active { color:var(--ink); border-bottom-color:var(--gold); }
  html.dark .pp-tab.active { color:#fff; }

  /* BODY GRID */
  .pp-body {
    max-width:1100px; margin:0 auto; padding:28px 24px 80px;
    display:grid; grid-template-columns:300px 1fr; gap:24px;
  }
  @media(max-width:768px){
    .pp-body { grid-template-columns:1fr; }
    .pp-sidebar { order:2; }
    .pp-main    { order:1; }
  }

  /* CARD */
  .pp-card {
    background:var(--white); border:1.5px solid var(--mist);
    border-radius:20px; overflow:hidden; margin-bottom:16px;
  }
  html.dark .pp-card { background:#141414; border-color:#252525; }
  .pp-card-head {
    display:flex; justify-content:space-between; align-items:center;
    padding:18px 20px 14px; border-bottom:1px solid var(--mist);
  }
  html.dark .pp-card-head { border-color:#252525; }
  .pp-card-title {
    display:flex; align-items:center; gap:8px;
    font-size:.95rem; font-weight:700; color:var(--ink);
  }
  html.dark .pp-card-title { color:#f0f0f0; }
  .pp-card-icon { color:var(--gold); }
  .pp-card-body { padding:18px 20px; }
  .pp-edit-btn {
    background:none; border:none; cursor:pointer; color:var(--gold);
    padding:4px 8px; border-radius:6px; transition:.2s; display:flex;
  }
  .pp-edit-btn:hover { background:rgba(201,168,76,.1); }

  /* ABOUT */
  .pp-about-text { font-size:.92rem; line-height:1.8; color:var(--mid); }
  .pp-divider { height:1px; background:var(--mist); margin:16px 0; }
  html.dark .pp-divider { background:#252525; }

  /* ATTRS */
  .pp-attrs { display:flex; flex-direction:column; gap:10px; }
  .pp-attr-row { display:flex; justify-content:space-between; align-items:center; font-size:.88rem; }
  .pp-attr-key { color:var(--mid); }
  .pp-attr-val { font-weight:700; color:var(--ink); }
  html.dark .pp-attr-val { color:#e8e8e8; }

  /* LANGS */
  .pp-langs { display:flex; flex-wrap:wrap; gap:6px; }
  .pp-lang {
    font-size:.78rem; font-weight:600;
    background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.25);
    color:var(--gold); padding:4px 12px; border-radius:100px;
  }

  /* HEADSHOTS */
  .pp-headshots { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .pp-headshot {
    aspect-ratio:3/4; border-radius:12px; overflow:hidden;
    background:var(--mist); border:1.5px solid var(--mist);
    cursor:pointer; position:relative; transition:.2s;
  }
  html.dark .pp-headshot { background:#1e1e1e; border-color:#2a2a2a; }
  .pp-headshot:hover { transform:scale(1.02); border-color:var(--gold); }
  .pp-headshot img { width:100%; height:100%; object-fit:cover; display:block; }

  /* REELS */
  .pp-reels { display:flex; flex-direction:column; gap:10px; }
  .pp-reel {
    display:flex; align-items:center; gap:14px; padding:12px;
    border:1.5px solid var(--mist); border-radius:12px;
    cursor:pointer; transition:.2s; background:transparent;
  }
  html.dark .pp-reel { border-color:#2a2a2a; }
  .pp-reel:hover { border-color:var(--gold); background:rgba(201,168,76,.04); }
  .pp-reel-thumb {
    width:72px; height:52px; border-radius:8px; overflow:hidden;
    background:var(--mist); flex-shrink:0; position:relative;
  }
  html.dark .pp-reel-thumb { background:#2a2a2a; }
  .pp-reel-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
  .pp-reel-play {
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,.38); color:white;
  }
  .pp-reel-title { font-size:.9rem; font-weight:600; color:var(--ink); }
  html.dark .pp-reel-title { color:#eee; }
  .pp-reel-sub { font-size:.75rem; color:var(--mid); margin-top:2px; }

  /* CREDITS */
  .pp-credits { display:flex; flex-direction:column; }
  .pp-credit-row {
    display:grid; grid-template-columns:1fr auto; gap:12px;
    padding:14px 0; border-bottom:1px solid var(--mist); align-items:center;
  }
  html.dark .pp-credit-row { border-color:#222; }
  .pp-credit-row:last-child { border-bottom:none; }
  .pp-credit-title { font-size:.95rem; font-weight:700; color:var(--ink); }
  html.dark .pp-credit-title { color:#eee; }
  .pp-credit-sub { font-size:.82rem; color:var(--mid); margin-top:2px; }
  .pp-badge {
    font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em;
    padding:3px 10px; border-radius:100px; white-space:nowrap;
    background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.25); color:var(--gold);
  }
  .pp-badge-open {
    background:rgba(13,122,110,.1); border-color:rgba(13,122,110,.3); color:var(--teal);
  }
  html.dark .pp-badge-open { color:#4ecdc4; border-color:rgba(78,205,196,.3); background:rgba(78,205,196,.08); }
  .pp-badge-closed {
    background:rgba(192,57,43,.08); border-color:rgba(192,57,43,.25); color:var(--red);
  }

  /* CASTING CALL CARD */
  .pp-call {
    padding:16px; border:1.5px solid var(--mist); border-radius:14px;
    margin-bottom:10px; cursor:pointer; transition:.2s;
  }
  html.dark .pp-call { border-color:#2a2a2a; }
  .pp-call:hover { border-color:var(--gold); background:rgba(201,168,76,.03); }
  .pp-call-head { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }
  .pp-call-title { font-size:.95rem; font-weight:700; color:var(--ink); }
  html.dark .pp-call-title { color:#eee; }
  .pp-call-meta { display:flex; gap:14px; margin-top:8px; flex-wrap:wrap; }
  .pp-call-tag {
    font-size:.76rem; color:var(--mid);
    display:flex; align-items:center; gap:4px;
  }
  .pp-call-deadline { font-size:.76rem; color:var(--mid); margin-top:4px; }

  /* LIGHTBOX */
  .pp-lightbox {
    position:fixed; inset:0; z-index:999;
    background:rgba(0,0,0,.92);
    display:flex; align-items:center; justify-content:center; cursor:zoom-out;
  }
  .pp-lightbox img { max-width:90vw; max-height:90vh; object-fit:contain; border-radius:8px; }
  .pp-lightbox-close {
    position:absolute; top:20px; right:24px;
    background:rgba(255,255,255,.1); border:none; color:white;
    font-size:1.2rem; width:44px; height:44px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:.2s;
  }
  .pp-lightbox-close:hover { background:rgba(255,255,255,.2); }

  /* EMPTY */
  .pp-empty { text-align:center; padding:40px 20px; color:var(--mid); font-size:.9rem; }

  /* WEBSITE LINK */
  .pp-website {
    display:inline-flex; align-items:center; gap:5px;
    font-size:.82rem; color:var(--gold); font-weight:600;
    text-decoration:none; margin-top:4px;
  }
  .pp-website:hover { text-decoration:underline; }
`;

/* ═══════════════════════════════════════
   TALENT VIEW
═══════════════════════════════════════ */

const TALENT_TABS = ["Portfolio", "Credits", "About"] as const;
type TalentTab = (typeof TALENT_TABS)[number];

function TalentView({ p }: { p: Talent }) {
  const [tab, setTab] = useState<TalentTab>("Portfolio");
  const [following, setFollowing] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="pp-cover">
        <img src={p.cover} alt="Cover" />
        <div className="pp-cover-grad" />
      </div>

      <div className="pp-identity">
        <div className="pp-avatar-wrap">
          <img className="pp-avatar" src={p.avatar} alt={p.name} />
          {p.verified && <div className="pp-verified"><BadgeCheck size={14} strokeWidth={2.5} /></div>}
        </div>

        <div className="pp-info-row">
          <div>
            <div className="pp-name">
              {p.name}
              {p.premium && <span className="pp-badge-pro"><Sparkles size={11} /> Pro</span>}
            </div>
            <div className="pp-meta">
              <span className="pp-role-tag">{p.role}</span>
              <span className="pp-meta-dot">·</span>
              <span>{p.city}</span>
              <span className="pp-meta-dot">·</span>
              <span>{p.experience} experience</span>
            </div>
          </div>
          <div className="pp-actions">
            <button
              className={`pp-btn-follow${following ? " following" : ""}`}
              onClick={() => setFollowing(v => !v)}
            >
              {following ? "Following" : "Follow"}
            </button>
            <button className="pp-btn-secondary">Message</button>
            <button className="pp-btn-secondary">Shortlist</button>
          </div>
        </div>

        <div className="pp-chips">
          {p.skills.map(s => <span key={s} className="pp-chip">{s}</span>)}
        </div>

        <div className="pp-stats">
          {[
            [fmt(p.followers), "Followers"],
            [p.projects,       "Projects"],
            [p.rating,         "Rating"],
            [p.experience,     "Experience"],
          ].map(([v, l]) => (
            <div key={String(l)} className="pp-stat">
              <span className="pp-stat-val">{v}</span>
              <span className="pp-stat-lab">{l}</span>
            </div>
          ))}
        </div>

        <div className="pp-tabs">
          {TALENT_TABS.map(t => (
            <button key={t} className={`pp-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="pp-body">
        {/* SIDEBAR */}
        <aside className="pp-sidebar">
          {/* About */}
          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title"><span className="pp-card-icon"><Film size={17} /></span> About</span>
              <button className="pp-edit-btn"><Pencil size={15} /></button>
            </div>
            <div className="pp-card-body">
              <p className="pp-about-text">{p.about}</p>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title"><span className="pp-card-icon"><Ruler size={17} /></span> Physical Attributes</span>
              <button className="pp-edit-btn"><Pencil size={15} /></button>
            </div>
            <div className="pp-card-body">
              <div className="pp-attrs">
                {[["Height", p.height], ["Weight", p.weight], ["Age", `${p.age} yrs`], ["Gender", p.gender], ["Eye Color", p.eyeColor], ["Hair Color", p.hairColor], ["Skin Tone", p.skin], ["Build", p.build]].map(([k, v]) => (
                  <div className="pp-attr-row" key={k}>
                    <span className="pp-attr-key">{k}</span>
                    <span className="pp-attr-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title"><span className="pp-card-icon"><Globe size={17} /></span> Languages</span>
            </div>
            <div className="pp-card-body">
              <div className="pp-langs">{p.languages.map(l => <span key={l} className="pp-lang">{l}</span>)}</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="pp-main">
          {tab === "Portfolio" && (
            <>
              <div className="pp-card">
                <div className="pp-card-head">
                  <span className="pp-card-title"><span className="pp-card-icon"><Camera size={17} /></span> Headshots</span>
                </div>
                <div className="pp-card-body">
                  <div className="pp-headshots">
                    {p.headshots.map((src, i) => (
                      <div key={i} className="pp-headshot" onClick={() => setLightbox(src)}>
                        <img src={src} alt={`Headshot ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pp-card">
                <div className="pp-card-head">
                  <span className="pp-card-title"><span className="pp-card-icon"><Clapperboard size={17} /></span> Showreels</span>
                </div>
                <div className="pp-card-body">
                  <div className="pp-reels">
                    {p.showreels.map((r, i) => (
                      <div key={i} className="pp-reel">
                        <div className="pp-reel-thumb">
                          <img src={r.thumb} alt={r.title} />
                          <div className="pp-reel-play"><Play size={16} fill="white" /></div>
                        </div>
                        <div>
                          <div className="pp-reel-title">{r.title}</div>
                          <div className="pp-reel-sub">Click to play</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "Credits" && (
            <div className="pp-card">
              <div className="pp-card-head">
                <span className="pp-card-title"><span className="pp-card-icon"><Film size={17} /></span> Film & Television Credits</span>
              </div>
              <div className="pp-card-body">
                {p.credits.length > 0 ? (
                  <div className="pp-credits">
                    {p.credits.map((c, i) => (
                      <div key={i} className="pp-credit-row">
                        <div>
                          <div className="pp-credit-title">{c.title}</div>
                          <div className="pp-credit-sub">{c.role} · {c.year}</div>
                        </div>
                        <span className="pp-badge">{c.type}</span>
                      </div>
                    ))}
                  </div>
                ) : <div className="pp-empty">No credits added yet.</div>}
              </div>
            </div>
          )}

          {tab === "About" && (
            <div className="pp-card">
              <div className="pp-card-head">
                <span className="pp-card-title"><span className="pp-card-icon"><Sparkles size={17} /></span> Full Bio</span>
              </div>
              <div className="pp-card-body">
                <p className="pp-about-text" style={{ lineHeight: 1.9 }}>{p.about}</p>
                <div className="pp-divider" />
                <div className="pp-attrs">
                  {[["Based in", p.city], ["Experience", p.experience], ["Primary Role", p.role]].map(([k, v]) => (
                    <div className="pp-attr-row" key={k}>
                      <span className="pp-attr-key">{k}</span>
                      <span className="pp-attr-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {lightbox && (
        <div className="pp-lightbox" onClick={() => setLightbox(null)}>
          <button className="pp-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Full size" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════
   SEEKER VIEW
═══════════════════════════════════════ */

const SEEKER_TABS = ["Casting Calls", "Productions", "About"] as const;
type SeekerTab = (typeof SEEKER_TABS)[number];

function SeekerView({ p }: { p: Seeker }) {
  const [tab, setTab] = useState<SeekerTab>("Casting Calls");
  const [following, setFollowing] = useState(false);

  const open   = p.castingCalls.filter(c => c.status === "open");
  const closed = p.castingCalls.filter(c => c.status === "closed");

  return (
    <>
      <div className="pp-cover">
        <img src={p.cover} alt="Cover" />
        <div className="pp-cover-grad" />
      </div>

      <div className="pp-identity">
        <div className="pp-avatar-wrap">
          <img className="pp-avatar-sq" src={p.avatar} alt={p.name} />
          {p.verified && <div className="pp-verified"><BadgeCheck size={14} strokeWidth={2.5} /></div>}
        </div>

        <div className="pp-info-row">
          <div>
            <div className="pp-name">
              {p.name}
              {p.premium && <span className="pp-badge-pro"><Sparkles size={11} /> Pro</span>}
            </div>
            <div style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--mid)", marginTop: 4 }}>
              {p.role} · {p.company}
            </div>
            <div className="pp-meta">
              <span className="pp-seeker-tag"><Building2 size={12} /> Seeker</span>
              <span className="pp-meta-dot">·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} />{p.city}</span>
              <span className="pp-meta-dot">·</span>
              <a href={`https://${p.website}`} target="_blank" rel="noreferrer" className="pp-website">
                <Link2 size={13} />{p.website}
              </a>
            </div>
          </div>
          <div className="pp-actions">
            <button
              className={`pp-btn-follow${following ? " following" : ""}`}
              onClick={() => setFollowing(v => !v)}
            >
              {following ? "Following" : "Follow"}
            </button>
            <button className="pp-btn-secondary">Message</button>
            <button className="pp-btn-gold">Apply to Calls</button>
          </div>
        </div>

        {/* Genre chips */}
        <div className="pp-chips">
          {p.genres.map(g => <span key={g} className="pp-chip">{g}</span>)}
        </div>

        <div className="pp-stats">
          {[
            [fmt(p.followers),  "Followers"],
            [p.activeCalls,     "Active Calls"],
            [p.hiredTotal,      "Hired Total"],
            [p.rating,          "Rating"],
          ].map(([v, l]) => (
            <div key={String(l)} className="pp-stat">
              <span className="pp-stat-val">{v}</span>
              <span className="pp-stat-lab">{l}</span>
            </div>
          ))}
        </div>

        <div className="pp-tabs">
          {SEEKER_TABS.map(t => (
            <button key={t} className={`pp-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="pp-body">
        {/* SIDEBAR */}
        <aside className="pp-sidebar">
          {/* Company Info */}
          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title"><span className="pp-card-icon"><Building2 size={17} /></span> Company</span>
            </div>
            <div className="pp-card-body">
              <div className="pp-attrs">
                {[
                  ["Company",  p.company],
                  ["Industry", p.industry],
                  ["Size",     p.companySize],
                  ["Founded",  p.founded],
                  ["City",     p.city],
                ].map(([k, v]) => (
                  <div className="pp-attr-row" key={k}>
                    <span className="pp-attr-key">{k}</span>
                    <span className="pp-attr-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title"><span className="pp-card-icon"><Globe size={17} /></span> Works In</span>
            </div>
            <div className="pp-card-body">
              <div className="pp-langs">{p.languages.map(l => <span key={l} className="pp-lang">{l}</span>)}</div>
            </div>
          </div>

          {/* Quick stats sidebar */}
          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title"><span className="pp-card-icon"><Star size={17} /></span> Reputation</span>
            </div>
            <div className="pp-card-body">
              <div className="pp-attrs">
                {[
                  ["Rating",       `${p.rating} / 5`],
                  ["Total Hired",  p.hiredTotal],
                  ["Active Calls", p.activeCalls],
                ].map(([k, v]) => (
                  <div className="pp-attr-row" key={k}>
                    <span className="pp-attr-key">{k}</span>
                    <span className="pp-attr-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="pp-main">

          {tab === "Casting Calls" && (
            <>
              {/* Open */}
              {open.length > 0 && (
                <div className="pp-card">
                  <div className="pp-card-head">
                    <span className="pp-card-title"><span className="pp-card-icon"><Briefcase size={17} /></span> Open Casting Calls</span>
                    <span className="pp-badge pp-badge-open">{open.length} Open</span>
                  </div>
                  <div className="pp-card-body">
                    {open.map(c => (
                      <div key={c.id} className="pp-call">
                        <div className="pp-call-head">
                          <span className="pp-call-title">{c.title}</span>
                          <span className="pp-badge pp-badge-open">Open</span>
                        </div>
                        <div className="pp-call-meta">
                          <span className="pp-call-tag"><Users size={12} />{c.category}</span>
                          <span className="pp-call-tag"><MapPin size={12} />{c.location}</span>
                        </div>
                        <div className="pp-call-deadline">Deadline: {c.deadline}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Closed */}
              {closed.length > 0 && (
                <div className="pp-card">
                  <div className="pp-card-head">
                    <span className="pp-card-title"><span className="pp-card-icon"><Briefcase size={17} /></span> Closed Calls</span>
                  </div>
                  <div className="pp-card-body">
                    {closed.map(c => (
                      <div key={c.id} className="pp-call" style={{ opacity: 0.6 }}>
                        <div className="pp-call-head">
                          <span className="pp-call-title">{c.title}</span>
                          <span className="pp-badge pp-badge-closed">Closed</span>
                        </div>
                        <div className="pp-call-meta">
                          <span className="pp-call-tag"><Users size={12} />{c.category}</span>
                          <span className="pp-call-tag"><MapPin size={12} />{c.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {p.castingCalls.length === 0 && <div className="pp-empty">No casting calls posted yet.</div>}
            </>
          )}

          {tab === "Productions" && (
            <div className="pp-card">
              <div className="pp-card-head">
                <span className="pp-card-title"><span className="pp-card-icon"><Film size={17} /></span> Past Productions</span>
              </div>
              <div className="pp-card-body">
                {p.pastProductions.length > 0 ? (
                  <div className="pp-credits">
                    {p.pastProductions.map((prod, i) => (
                      <div key={i} className="pp-credit-row">
                        <div>
                          <div className="pp-credit-title">{prod.title}</div>
                          <div className="pp-credit-sub">{prod.role} · {prod.year}</div>
                        </div>
                        <span className="pp-badge">{prod.type}</span>
                      </div>
                    ))}
                  </div>
                ) : <div className="pp-empty">No productions listed.</div>}
              </div>
            </div>
          )}

          {tab === "About" && (
            <div className="pp-card">
              <div className="pp-card-head">
                <span className="pp-card-title"><span className="pp-card-icon"><Sparkles size={17} /></span> About {p.company}</span>
              </div>
              <div className="pp-card-body">
                <p className="pp-about-text" style={{ lineHeight: 1.9 }}>{p.about}</p>
                <div className="pp-divider" />
                <div className="pp-attrs">
                  {[
                    ["Role",     p.role],
                    ["Company",  p.company],
                    ["Founded",  p.founded],
                    ["Industry", p.industry],
                    ["City",     p.city],
                  ].map(([k, v]) => (
                    <div className="pp-attr-row" key={k}>
                      <span className="pp-attr-key">{k}</span>
                      <span className="pp-attr-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   ROOT COMPONENT
═══════════════════════════════════════ */

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug   = typeof params?.slug === "string" ? params.slug : "";
  const profile = MOCK_PROFILES[slug] ?? MOCK_PROFILES["riya-sharma"];

  return (
    <>
      <style>{STYLES}</style>
      <div className="pp">
        {profile.type === "talent"
          ? <TalentView p={profile} />
          : <SeekerView p={profile} />
        }
      </div>
    </>
  );
}