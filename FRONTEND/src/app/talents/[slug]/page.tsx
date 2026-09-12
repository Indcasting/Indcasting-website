"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Camera,
  Clapperboard,
  BadgeCheck,
  Play,
  Sparkles,
  Globe,
  Film,
  Ruler,
  Briefcase,
  Link2,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";

/* ═══════════════════════════════════════
   API INTERFACE
══════════════════════════════════════ */

interface ApiTalent {
  id: string;
  name: string;
  region: string | null;
  experience: string | null;
  primarySkill: string | null;
  skill: string | null;
  bio: string | null;
  tags: string[];
  avatarUrl: string | null;
  verified: boolean;
  available: boolean;
  language: string | null;
  instagram: string | null;
  youtube: string | null;
  website: string | null;
  portfolio: string | null;
  joinedDate: string | null;
  createdAt: string;
}

/* ═══════════════════════════════════════
   FRONTEND PROFILE INTERFACE
══════════════════════════════════════ */

interface Talent {
  id: string;
  name: string;
  role: string;
  city: string;
  experience: string;
  languages: string[];
  about: string;

  height: string;
  weight: string;
  age: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  skin: string;
  build: string;

  followers: string;
  projects: string;
  rating: string;

  avatar: string;
  cover: string;

  headshots: string[];
  showreels: {
    title: string;
    thumb: string;
    url: string;
  }[];

  skills: string[];

  credits: {
    title: string;
    role: string;
    year: string;
    type: string;
  }[];

  verified: boolean;
  premium: boolean;

  instagram: string | null;
  youtube: string | null;
  website: string | null;
  portfolio: string | null;
}

/* ═══════════════════════════════════════
   STYLES
══════════════════════════════════════ */

const STYLES = `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --ink: #0f0e0d;
    --cream: #FFFDF7;
    --gold: #c9a84c;
    --gold2: #e8c96a;
    --mist: #f0ebe0;
    --mid: #6b6560;
    --white: #ffffff;
    --teal: #0d7a6e;
    --red: #c0392b;
  }

  html.dark {
    --ink: #f6f6f6;
    --cream: #0b0b0b;
    --mist: #1c1c1c;
    --mid: #b8b8b8;
    --white: #141414;
  }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: system-ui, sans-serif;
    overflow-x: hidden;
  }

  .pp {
    min-height: 100vh;
    background: var(--cream);
  }

  /* ═══════════════════════════════════════
     TOP BAR
  ═══════════════════════════════════════ */

  .pp-topbar {
    max-width: 1100px;
    margin: 0 auto;
    padding: 18px 24px;
  }

  .pp-back {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: none;
    background: transparent;
    color: var(--mid);
    font-size: .86rem;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 0;
    transition: .2s;
  }

  .pp-back:hover {
    color: var(--gold);
  }

  /* ═══════════════════════════════════════
     COVER
  ═══════════════════════════════════════ */

  .pp-cover {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background:
      linear-gradient(
        135deg,
        #1a1208 0%,
        #2d2010 50%,
        #1a1208 100%
      );
  }

  .pp-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    opacity: .55;
  }

  .pp-cover-grad {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to bottom,
        rgba(0,0,0,.1) 0%,
        rgba(0,0,0,.55) 100%
      );
  }

  /* ═══════════════════════════════════════
     IDENTITY
  ═══════════════════════════════════════ */

  .pp-identity {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .pp-avatar-wrap {
    position: absolute;
    top: -75px;
    left: 24px;
  }

  .pp-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid var(--cream);
    object-fit: cover;
    display: block;
    box-shadow: 0 4px 20px rgba(0,0,0,.25);
    background: var(--mist);
  }

  .pp-verified {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--gold);
    border: 2px solid var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
  }

  .pp-info-row {
    padding-top: 90px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
  }

  .pp-name {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(1.9rem, 3.5vw, 2.9rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .pp-badge-pro {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: linear-gradient(
      135deg,
      var(--gold),
      var(--gold2)
    );
    color: #111;
    font-size: .6rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .1em;
    padding: 3px 8px;
    border-radius: 100px;
  }

  .pp-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-top: 8px;
    font-size: .88rem;
    color: var(--mid);
  }

  .pp-meta-dot {
    color: var(--mist);
  }

  .pp-role-tag {
    display: inline-flex;
    align-items: center;
    background: rgba(201,168,76,.12);
    border: 1px solid rgba(201,168,76,.3);
    color: var(--gold);
    font-size: .75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    padding: 3px 10px;
    border-radius: 100px;
  }

  .pp-availability {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: .76rem;
    font-weight: 700;
  }

  .pp-availability-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--teal);
  }

  .pp-availability.unavailable .pp-availability-dot {
    background: var(--red);
  }

  /* ═══════════════════════════════════════
     ACTIONS
  ═══════════════════════════════════════ */

  .pp-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  .pp-btn-follow,
  .pp-btn-secondary,
  .pp-btn-gold {
    padding: 11px 22px;
    border-radius: 999px;
    font-size: .9rem;
    cursor: pointer;
    transition: .2s;
  }

  .pp-btn-follow {
    padding-left: 30px;
    padding-right: 30px;
    font-weight: 700;
    border: 2px solid var(--ink);
    background: var(--ink);
    color: var(--cream);
  }

  .pp-btn-follow.following {
    background: transparent;
    color: var(--ink);
  }

  html.dark .pp-btn-follow {
    border-color: #fff;
    background: #fff;
    color: #111;
  }

  html.dark .pp-btn-follow.following {
    background: transparent;
    color: #fff;
  }

  .pp-btn-secondary {
    font-weight: 600;
    border: 1.5px solid var(--mist);
    background: transparent;
    color: var(--ink);
  }

  .pp-btn-secondary:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  html.dark .pp-btn-secondary {
    border-color: #333;
    color: #ddd;
  }

  .pp-btn-gold {
    font-weight: 700;
    border: 2px solid var(--gold);
    background: var(--gold);
    color: #111;
  }

  .pp-btn-gold:hover {
    background: var(--gold2);
  }

  /* ═══════════════════════════════════════
     CHIPS
  ═══════════════════════════════════════ */

  .pp-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 18px 0;
  }

  .pp-chip {
    font-size: .78rem;
    font-weight: 600;
    padding: 5px 14px;
    border-radius: 100px;
    background: var(--mist);
    color: var(--mid);
    border: 1px solid transparent;
    transition: .2s;
  }

  html.dark .pp-chip {
    background: #1e1e1e;
  }

  .pp-chip:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  /* ═══════════════════════════════════════
     STATS
  ═══════════════════════════════════════ */

  .pp-stats {
    display: flex;
    gap: 36px;
    padding: 20px 0 0;
    border-top: 1px solid var(--mist);
    margin-top: 4px;
    flex-wrap: wrap;
  }

  html.dark .pp-stats {
    border-color: #222;
  }

  .pp-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pp-stat-val {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -.03em;
  }

  html.dark .pp-stat-val {
    color: #eee;
  }

  .pp-stat-lab {
    font-size: .72rem;
    color: var(--mid);
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  /* ═══════════════════════════════════════
     TABS
  ═══════════════════════════════════════ */

  .pp-tabs {
    display: flex;
    border-bottom: 1px solid var(--mist);
    margin-top: 18px;
  }

  html.dark .pp-tabs {
    border-color: #222;
  }

  .pp-tab {
    padding: 14px 24px;
    font-size: .88rem;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--mid);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: .2s;
  }

  .pp-tab:hover {
    color: var(--gold);
  }

  .pp-tab.active {
    color: var(--ink);
    border-bottom-color: var(--gold);
  }

  html.dark .pp-tab.active {
    color: #fff;
  }

  /* ═══════════════════════════════════════
     BODY GRID
  ═══════════════════════════════════════ */

  .pp-body {
    max-width: 1100px;
    margin: 0 auto;
    padding: 28px 24px 80px;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 24px;
  }

  @media (max-width: 768px) {
    .pp-body {
      grid-template-columns: 1fr;
    }

    .pp-sidebar {
      order: 2;
    }

    .pp-main {
      order: 1;
    }

    .pp-avatar-wrap {
      left: 20px;
    }

    .pp-avatar {
      width: 125px;
      height: 125px;
    }

    .pp-info-row {
      padding-top: 75px;
    }

    .pp-actions {
      width: 100%;
    }

    .pp-actions button {
      flex: 1;
    }

    .pp-tab {
      padding-left: 14px;
      padding-right: 14px;
    }
  }

  /* ═══════════════════════════════════════
     CARDS
  ═══════════════════════════════════════ */

  .pp-card {
    background: var(--white);
    border: 1.5px solid var(--mist);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  html.dark .pp-card {
    background: #141414;
    border-color: #252525;
  }

  .pp-card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px 14px;
    border-bottom: 1px solid var(--mist);
  }

  html.dark .pp-card-head {
    border-color: #252525;
  }

  .pp-card-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: .95rem;
    font-weight: 700;
    color: var(--ink);
  }

  html.dark .pp-card-title {
    color: #f0f0f0;
  }

  .pp-card-icon {
    color: var(--gold);
  }

  .pp-card-body {
    padding: 18px 20px;
  }

  /* ═══════════════════════════════════════
     ABOUT
  ═══════════════════════════════════════ */

  .pp-about-text {
    font-size: .92rem;
    line-height: 1.8;
    color: var(--mid);
  }

  .pp-divider {
    height: 1px;
    background: var(--mist);
    margin: 18px 0;
  }

  html.dark .pp-divider {
    background: #252525;
  }

  /* ═══════════════════════════════════════
     ATTRIBUTES
  ═══════════════════════════════════════ */

  .pp-attrs {
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .pp-attr-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    font-size: .88rem;
  }

  .pp-attr-key {
    color: var(--mid);
  }

  .pp-attr-val {
    font-weight: 700;
    color: var(--ink);
    text-align: right;
  }

  html.dark .pp-attr-val {
    color: #e8e8e8;
  }

  /* ═══════════════════════════════════════
     LANGUAGES
  ═══════════════════════════════════════ */

  .pp-langs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .pp-lang {
    font-size: .78rem;
    font-weight: 600;
    background: rgba(201,168,76,.1);
    border: 1px solid rgba(201,168,76,.25);
    color: var(--gold);
    padding: 4px 12px;
    border-radius: 100px;
  }

  /* ═══════════════════════════════════════
     HEADSHOTS
  ═══════════════════════════════════════ */

  .pp-headshots {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .pp-headshot {
    aspect-ratio: 3 / 4;
    border-radius: 12px;
    overflow: hidden;
    background: var(--mist);
    border: 1.5px solid var(--mist);
    cursor: pointer;
    position: relative;
    transition: .2s;
  }

  html.dark .pp-headshot {
    background: #1e1e1e;
    border-color: #2a2a2a;
  }

  .pp-headshot:hover {
    transform: scale(1.02);
    border-color: var(--gold);
  }

  .pp-headshot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ═══════════════════════════════════════
     REELS
  ═══════════════════════════════════════ */

  .pp-reels {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pp-reel {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px;
    border: 1.5px solid var(--mist);
    border-radius: 12px;
    transition: .2s;
    background: transparent;
  }

  html.dark .pp-reel {
    border-color: #2a2a2a;
  }

  .pp-reel:hover {
    border-color: var(--gold);
    background: rgba(201,168,76,.04);
  }

  .pp-reel-thumb {
    width: 72px;
    height: 52px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--mist);
    flex-shrink: 0;
    position: relative;
  }

  html.dark .pp-reel-thumb {
    background: #2a2a2a;
  }

  .pp-reel-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .pp-reel-play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.38);
    color: white;
  }

  .pp-reel-title {
    font-size: .9rem;
    font-weight: 600;
    color: var(--ink);
  }

  html.dark .pp-reel-title {
    color: #eee;
  }

  .pp-reel-sub {
    font-size: .75rem;
    color: var(--mid);
    margin-top: 2px;
  }

  /* ═══════════════════════════════════════
     CREDITS
  ═══════════════════════════════════════ */

  .pp-credits {
    display: flex;
    flex-direction: column;
  }

  .pp-credit-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid var(--mist);
    align-items: center;
  }

  html.dark .pp-credit-row {
    border-color: #222;
  }

  .pp-credit-row:last-child {
    border-bottom: none;
  }

  .pp-credit-title {
    font-size: .95rem;
    font-weight: 700;
    color: var(--ink);
  }

  html.dark .pp-credit-title {
    color: #eee;
  }

  .pp-credit-sub {
    font-size: .82rem;
    color: var(--mid);
    margin-top: 2px;
  }

  .pp-badge {
    font-size: .7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    padding: 3px 10px;
    border-radius: 100px;
    white-space: nowrap;
    background: rgba(201,168,76,.1);
    border: 1px solid rgba(201,168,76,.25);
    color: var(--gold);
  }

  /* ═══════════════════════════════════════
     LINKS
  ═══════════════════════════════════════ */

  .pp-links {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .pp-link {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px 12px;
    border: 1px solid var(--mist);
    border-radius: 10px;
    color: var(--mid);
    text-decoration: none;
    font-size: .84rem;
    font-weight: 600;
    transition: .2s;
    overflow: hidden;
  }

  .pp-link:hover {
    color: var(--gold);
    border-color: var(--gold);
  }

  .pp-link span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ═══════════════════════════════════════
     EMPTY
  ═══════════════════════════════════════ */

  .pp-empty {
    text-align: center;
    padding: 42px 20px;
    color: var(--mid);
    font-size: .9rem;
    border: 1px dashed var(--mist);
    border-radius: 12px;
  }

  /* ═══════════════════════════════════════
     LIGHTBOX
  ═══════════════════════════════════════ */

  .pp-lightbox {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0,0,0,.92);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
  }

  .pp-lightbox img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }

  .pp-lightbox-close {
    position: absolute;
    top: 20px;
    right: 24px;
    background: rgba(255,255,255,.1);
    border: none;
    color: white;
    font-size: 1.2rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .pp-lightbox-close:hover {
    background: rgba(255,255,255,.2);
  }

  /* ═══════════════════════════════════════
     LOADING / ERROR
  ═══════════════════════════════════════ */

  .pp-state {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 40px 24px;
    text-align: center;
  }

  .pp-state-title {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 2.2rem;
    color: var(--ink);
  }

  .pp-state-text {
    color: var(--mid);
    font-size: .92rem;
    max-width: 480px;
    line-height: 1.7;
  }

  .pp-spinner {
    width: 38px;
    height: 38px;
    border: 3px solid var(--mist);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: pp-spin .8s linear infinite;
  }

  @keyframes pp-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/* ═══════════════════════════════════════
   TABS
══════════════════════════════════════ */

const TALENT_TABS = [
  "Portfolio",
  "Credits",
  "About",
] as const;

type TalentTab = (typeof TALENT_TABS)[number];

/* ═══════════════════════════════════════
   TALENT VIEW
══════════════════════════════════════ */

function TalentView({ p }: { p: Talent }) {
  const router = useRouter();

  const [tab, setTab] = useState<TalentTab>("Portfolio");
  const [following, setFollowing] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const externalUrl = (url: string | null) => {
    if (!url) return null;

    if (
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return url;
    }

    return `https://${url}`;
  };

  return (
    <>
      {/* BACK BUTTON */}

      <div className="pp-topbar">
        <button
          className="pp-back"
          onClick={() => router.push("/talents")}
        >
          <ChevronLeft size={17} />
          Back to Talent Directory
        </button>
      </div>

      {/* COVER */}

      <div className="pp-cover">
        <img
          src={p.cover}
          alt={`${p.name} cover`}
        />

        <div className="pp-cover-grad" />
      </div>

      {/* IDENTITY */}

      <div className="pp-identity">
        <div className="pp-avatar-wrap">
          <img
            className="pp-avatar"
            src={p.avatar}
            alt={p.name}
          />

          {p.verified && (
            <div className="pp-verified">
              <BadgeCheck
                size={15}
                strokeWidth={2.5}
              />
            </div>
          )}
        </div>

        <div className="pp-info-row">
          <div>
            <div className="pp-name">
              {p.name}

              {p.premium && (
                <span className="pp-badge-pro">
                  <Sparkles size={11} />
                  Pro
                </span>
              )}
            </div>

            <div className="pp-meta">
              <span className="pp-role-tag">
                {p.role}
              </span>

              <span className="pp-meta-dot">
                ·
              </span>

              <span>
                {p.city}
              </span>

              <span className="pp-meta-dot">
                ·
              </span>

              <span>
                {p.experience} experience
              </span>

              <span className="pp-meta-dot">
                ·
              </span>

              <span
                className={`pp-availability ${
                  !p.id ? "unavailable" : ""
                }`}
              >
                <span className="pp-availability-dot" />
                {p.id ? "Profile active" : "Unavailable"}
              </span>
            </div>
          </div>

          <div className="pp-actions">
            <button
              className={`pp-btn-follow${
                following ? " following" : ""
              }`}
              onClick={() =>
                setFollowing((v) => !v)
              }
            >
              {following ? "Following" : "Follow"}
            </button>

            <button className="pp-btn-secondary">
              Message
            </button>

            <button className="pp-btn-secondary">
              Shortlist
            </button>
          </div>
        </div>

        {/* SKILLS */}

        <div className="pp-chips">
          {p.skills.map((skill) => (
            <span
              key={skill}
              className="pp-chip"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* STATS */}

        <div className="pp-stats">
          {[
            [p.followers, "Followers"],
            [p.projects, "Projects"],
            [p.rating, "Rating"],
            [p.experience, "Experience"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="pp-stat"
            >
              <span className="pp-stat-val">
                {value}
              </span>

              <span className="pp-stat-lab">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* TABS */}

        <div className="pp-tabs">
          {TALENT_TABS.map((t) => (
            <button
              key={t}
              className={`pp-tab${
                tab === t ? " active" : ""
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* BODY */}

      <div className="pp-body">

        {/* ═══════════════════════════════════
            SIDEBAR
        ═══════════════════════════════════ */}

        <aside className="pp-sidebar">

          {/* ABOUT */}

          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title">
                <span className="pp-card-icon">
                  <Film size={17} />
                </span>
                About
              </span>
            </div>

            <div className="pp-card-body">
              <p className="pp-about-text">
                {p.about}
              </p>
            </div>
          </div>

          {/* EXPERIENCE */}

          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title">
                <span className="pp-card-icon">
                  <Briefcase size={17} />
                </span>
                Professional Info
              </span>
            </div>

            <div className="pp-card-body">
              <div className="pp-attrs">

                <div className="pp-attr-row">
                  <span className="pp-attr-key">
                    Primary Role
                  </span>

                  <span className="pp-attr-val">
                    {p.role}
                  </span>
                </div>

                <div className="pp-attr-row">
                  <span className="pp-attr-key">
                    Experience
                  </span>

                  <span className="pp-attr-val">
                    {p.experience}
                  </span>
                </div>

                <div className="pp-attr-row">
                  <span className="pp-attr-key">
                    Location
                  </span>

                  <span className="pp-attr-val">
                    {p.city}
                  </span>
                </div>

                <div className="pp-attr-row">
                  <span className="pp-attr-key">
                    Status
                  </span>

                  <span className="pp-attr-val">
                    {p.id ? "Active" : "Unavailable"}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* PHYSICAL ATTRIBUTES */}

          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title">
                <span className="pp-card-icon">
                  <Ruler size={17} />
                </span>
                Physical Attributes
              </span>
            </div>

            <div className="pp-card-body">
              <div className="pp-attrs">

                {[
                  ["Height", p.height],
                  ["Weight", p.weight],
                  ["Age", p.age],
                  ["Gender", p.gender],
                  ["Eye Color", p.eyeColor],
                  ["Hair Color", p.hairColor],
                  ["Skin Tone", p.skin],
                  ["Build", p.build],
                ].map(([key, value]) => (
                  <div
                    className="pp-attr-row"
                    key={key}
                  >
                    <span className="pp-attr-key">
                      {key}
                    </span>

                    <span className="pp-attr-val">
                      {value}
                    </span>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* LANGUAGES */}

          <div className="pp-card">
            <div className="pp-card-head">
              <span className="pp-card-title">
                <span className="pp-card-icon">
                  <Globe size={17} />
                </span>
                Languages
              </span>
            </div>

            <div className="pp-card-body">
              {p.languages.length > 0 ? (
                <div className="pp-langs">
                  {p.languages.map(
                    (language) => (
                      <span
                        key={language}
                        className="pp-lang"
                      >
                        {language}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <div className="pp-empty">
                  No languages added yet.
                </div>
              )}
            </div>
          </div>

          {/* SOCIAL LINKS */}

          {(p.instagram ||
            p.youtube ||
            p.website ||
            p.portfolio) && (
            <div className="pp-card">
              <div className="pp-card-head">
                <span className="pp-card-title">
                  <span className="pp-card-icon">
                    <Link2 size={17} />
                  </span>
                  Links
                </span>
              </div>

              <div className="pp-card-body">
                <div className="pp-links">

                  {p.instagram && (
                    <a
                      href={externalUrl(
                        p.instagram
                      ) || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="pp-link"
                    >
                      <span
  style={{
    fontSize: "14px",
    fontWeight: 800,
  }}
>
  IG
</span>
                      <span>
                        Instagram
                      </span>
                      <ExternalLink
                        size={13}
                        style={{
                          marginLeft: "auto",
                        }}
                      />
                    </a>
                  )}

                  {p.youtube && (
                    <a
                      href={externalUrl(
                        p.youtube
                      ) || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="pp-link"
                    >
                      <span
  style={{
    fontSize: "14px",
    fontWeight: 800,
  }}
>
  YT
</span>
                      <span>
                        YouTube
                      </span>
                      <ExternalLink
                        size={13}
                        style={{
                          marginLeft: "auto",
                        }}
                      />
                    </a>
                  )}

                  {p.website && (
                    <a
                      href={externalUrl(
                        p.website
                      ) || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="pp-link"
                    >
                      <Globe size={16} />
                      <span>
                        Website
                      </span>
                      <ExternalLink
                        size={13}
                        style={{
                          marginLeft: "auto",
                        }}
                      />
                    </a>
                  )}

                  {p.portfolio && (
                    <a
                      href={externalUrl(
                        p.portfolio
                      ) || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="pp-link"
                    >
                      <Briefcase size={16} />
                      <span>
                        Portfolio
                      </span>
                      <ExternalLink
                        size={13}
                        style={{
                          marginLeft: "auto",
                        }}
                      />
                    </a>
                  )}

                </div>
              </div>
            </div>
          )}

        </aside>

        {/* ═══════════════════════════════════
            MAIN
        ═══════════════════════════════════ */}

        <main className="pp-main">

          {/* PORTFOLIO TAB */}

          {tab === "Portfolio" && (
            <>

              {/* HEADSHOTS */}

              <div className="pp-card">
                <div className="pp-card-head">
                  <span className="pp-card-title">
                    <span className="pp-card-icon">
                      <Camera size={17} />
                    </span>
                    Headshots
                  </span>
                </div>

                <div className="pp-card-body">

                  {p.headshots.length > 0 ? (
                    <div className="pp-headshots">
                      {p.headshots.map(
                        (src, index) => (
                          <div
                            key={index}
                            className="pp-headshot"
                            onClick={() =>
                              setLightbox(src)
                            }
                          >
                            <img
                              src={src}
                              alt={`Headshot ${
                                index + 1
                              }`}
                            />
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="pp-empty">
                      No headshots added yet.
                    </div>
                  )}

                </div>
              </div>

              {/* SHOWREELS */}

              <div className="pp-card">
                <div className="pp-card-head">
                  <span className="pp-card-title">
                    <span className="pp-card-icon">
                      <Clapperboard
                        size={17}
                      />
                    </span>
                    Showreels
                  </span>
                </div>

                <div className="pp-card-body">

                  {p.showreels.length > 0 ? (
                    <div className="pp-reels">

                      {p.showreels.map(
                        (reel, index) => (
                          <a
                            key={index}
                            href={
                              reel.url === "#"
                                ? undefined
                                : reel.url
                            }
                            target={
                              reel.url === "#"
                                ? undefined
                                : "_blank"
                            }
                            rel="noreferrer"
                            className="pp-reel"
                            style={{
                              textDecoration:
                                "none",
                              color: "inherit",
                            }}
                          >
                            <div className="pp-reel-thumb">
                              <img
                                src={reel.thumb}
                                alt={reel.title}
                              />

                              <div className="pp-reel-play">
                                <Play
                                  size={16}
                                  fill="white"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="pp-reel-title">
                                {reel.title}
                              </div>

                              <div className="pp-reel-sub">
                                Click to play
                              </div>
                            </div>
                          </a>
                        )
                      )}

                    </div>
                  ) : (
                    <div className="pp-empty">
                      No showreels added yet.
                    </div>
                  )}

                </div>
              </div>

            </>
          )}

          {/* CREDITS TAB */}

          {tab === "Credits" && (
            <div className="pp-card">

              <div className="pp-card-head">
                <span className="pp-card-title">
                  <span className="pp-card-icon">
                    <Film size={17} />
                  </span>
                  Film & Television Credits
                </span>
              </div>

              <div className="pp-card-body">

                {p.credits.length > 0 ? (
                  <div className="pp-credits">

                    {p.credits.map(
                      (credit, index) => (
                        <div
                          key={index}
                          className="pp-credit-row"
                        >
                          <div>
                            <div className="pp-credit-title">
                              {credit.title}
                            </div>

                            <div className="pp-credit-sub">
                              {credit.role}
                              {" · "}
                              {credit.year}
                            </div>
                          </div>

                          <span className="pp-badge">
                            {credit.type}
                          </span>
                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <div className="pp-empty">
                    No credits added yet.
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ABOUT TAB */}

          {tab === "About" && (
            <div className="pp-card">

              <div className="pp-card-head">
                <span className="pp-card-title">
                  <span className="pp-card-icon">
                    <Sparkles size={17} />
                  </span>
                  Full Bio
                </span>
              </div>

              <div className="pp-card-body">

                <p
                  className="pp-about-text"
                  style={{
                    lineHeight: 1.9,
                  }}
                >
                  {p.about}
                </p>

                <div className="pp-divider" />

                <div className="pp-attrs">

                  {[
                    ["Based in", p.city],
                    [
                      "Experience",
                      p.experience,
                    ],
                    [
                      "Primary Role",
                      p.role,
                    ],
                  ].map(
                    ([key, value]) => (
                      <div
                        className="pp-attr-row"
                        key={key}
                      >
                        <span className="pp-attr-key">
                          {key}
                        </span>

                        <span className="pp-attr-val">
                          {value}
                        </span>
                      </div>
                    )
                  )}

                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* LIGHTBOX */}

      {lightbox && (
        <div
          className="pp-lightbox"
          onClick={() =>
            setLightbox(null)
          }
        >
          <button
            className="pp-lightbox-close"
            onClick={() =>
              setLightbox(null)
            }
          >
            ✕
          </button>

          <img
            src={lightbox}
            alt="Full size"
            onClick={(event) =>
              event.stopPropagation()
            }
          />
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════ */

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();

  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : "";

  const [profile, setProfile] =
    useState<Talent | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:4000/talent-profiles/${slug}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "Talent profile not found"
            );
          }

          throw new Error(
            "Unable to load talent profile"
          );
        }

        const data: ApiTalent =
          await response.json();

        /*
         * Convert the backend User object
         * into the format expected by the
         * existing profile UI.
         */
        const talent: Talent = {
          id: data.id,

          name: data.name,

          role:
            data.primarySkill ||
            data.skill ||
            "Creative Professional",

          city:
            data.region ||
            "Location not specified",

          experience:
            data.experience ||
            "Experience not specified",

          languages:
            data.language
              ? [data.language]
              : [],

          about:
            data.bio ||
            "This talent has not added a bio yet.",

          /*
           * These fields do not currently exist
           * in the /talent-profiles API.
           *
           * We deliberately do NOT invent values.
           */
          height: "Not provided",
          weight: "Not provided",
          age: "Not provided",
          gender: "Not provided",
          eyeColor: "Not provided",
          hairColor: "Not provided",
          skin: "Not provided",
          build: "Not provided",

          followers: "—",
          projects: "—",
          rating: "—",

          /*
           * Real profile picture from database.
           * Local fallback only if no image exists.
           */
          avatar:
            data.avatarUrl ||
            "/images/img1.jpg",

          /*
           * Cover images are not currently
           * returned by the talent API.
           */
          cover: "/images/img3.jpg",

          /*
           * Portfolio/media data will be
           * connected in the next phase.
           */
          headshots: [],

          showreels: [],

          /*
           * Use the real database tags.
           */
          skills:
            data.tags &&
            data.tags.length > 0
              ? data.tags
              : [
                  data.primarySkill ||
                    data.skill ||
                    "Professional",
                ],

          credits: [],

          verified: data.verified,

          premium: false,

          instagram: data.instagram,

          youtube: data.youtube,

          website: data.website,

          portfolio: data.portfolio,
        };

        setProfile(talent);
      } catch (err) {
        console.error(
          "Failed to load talent profile:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load talent profile"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [slug]);

  /* ═══════════════════════════════════════
     LOADING STATE
  ═══════════════════════════════════════ */

  if (loading) {
    return (
      <>
        <style>{STYLES}</style>

        <div className="pp">
          <div className="pp-state">

            <div className="pp-spinner" />

            <div className="pp-state-title">
              Loading profile
            </div>

            <p className="pp-state-text">
              Fetching the talent profile
              from the database...
            </p>

          </div>
        </div>
      </>
    );
  }

  /* ═══════════════════════════════════════
     ERROR STATE
  ═══════════════════════════════════════ */

  if (error || !profile) {
    return (
      <>
        <style>{STYLES}</style>

        <div className="pp">
          <div className="pp-state">

            <div className="pp-state-title">
              {error ||
                "Talent profile not found"}
            </div>

            <p className="pp-state-text">
              We couldn't find the talent
              profile you're looking for.
            </p>

            <button
              className="pp-btn-secondary"
              onClick={() =>
                router.push("/talents")
              }
            >
              <ChevronLeft
                size={16}
                style={{
                  verticalAlign: "middle",
                  marginRight: 5,
                }}
              />
              Back to Talent Directory
            </button>

          </div>
        </div>
      </>
    );
  }

  /* ═══════════════════════════════════════
     REAL PROFILE
  ═══════════════════════════════════════ */

  return (
    <>
      <style>{STYLES}</style>

      <div className="pp">
        <TalentView p={profile} />
      </div>
    </>
  );
}