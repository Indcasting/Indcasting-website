"use client";

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
  MapPin,
  UserRound,
  Briefcase,
  Save,
  X,
  Plus,
  Upload,
  ExternalLink,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface Credit {
  title: string;
  role: string;
  year: string;
  type: string;
}

interface Showreel {
  title: string;
  thumb: string;
}

interface Profile {
  name: string;
  role: string;
  city: string;
  experience: string;
  about: string;

  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  age: string;
  gender: string;
  skin: string;
  build: string;

  followers: string;
  projects: string;
  rating: string;

  avatar: string;
  cover: string;

  languages: string[];
  skills: string[];

  headshots: string[];
  showreels: Showreel[];
  credits: Credit[];

  verified: boolean;
  premium: boolean;
}

/* =========================================================
   INITIAL DATA
========================================================= */

const initialProfile: Profile = {
  name: "Riya Sharma",
  role: "Actor",
  city: "Mumbai",
  experience: "5 years",

  about:
    "Passionate actor with 5 years of experience in theatre and independent films. Always looking for challenging roles that push creative boundaries and tell meaningful stories.",

  height: "5'6\"",
  weight: "52 kg",
  eyeColor: "Brown",
  hairColor: "Black",
  age: "26",
  gender: "Female",
  skin: "Wheatish",
  build: "Slim",

  followers: "12.4k",
  projects: "34",
  rating: "4.8",

  avatar: "/images/img1.jpg",
  cover: "/images/img3.jpg",

  languages: ["Hindi", "English", "Marathi"],

  skills: [
    "Method Acting",
    "Stage Combat",
    "Improv",
    "Voice Modulation",
    "Dance",
  ],

  headshots: [
    "/images/img1.jpg",
    "/images/img3.jpg",
    "/images/img5.jpg",
  ],

  showreels: [
    {
      title: "Drama Reel 2025",
      thumb: "/images/img_2.png",
    },
    {
      title: "Commercial Reel",
      thumb: "/images/img_7.png",
    },
  ],

  credits: [
    {
      title: "Mumbai Nights",
      role: "Lead",
      year: "2024",
      type: "OTT Series",
    },
    {
      title: "Broken Threads",
      role: "Supporting",
      year: "2023",
      type: "Feature Film",
    },
    {
      title: "Zindagi Ek Safar",
      role: "Guest",
      year: "2023",
      type: "TV Show",
    },
    {
      title: "The Last Letter",
      role: "Lead",
      year: "2022",
      type: "Short Film",
    },
  ],

  verified: true,
  premium: true,
};

/* =========================================================
   STYLES
========================================================= */

const STYLES = `
  * {
    box-sizing: border-box;
  }

  .portfolio-page {
    --ink: #11100f;
    --cream: #fffdf7;
    --gold: #c9a84c;
    --gold-light: #e8c96a;
    --mist: #e8e2d8;
    --mid: #706a63;
    --white: #ffffff;

    min-height: 100vh;
    background: var(--cream);
    color: var(--ink);
    font-family: Inter, system-ui, sans-serif;
    overflow-x: hidden;
  }

  html.dark .portfolio-page {
    --ink: #f5f5f5;
    --cream: #0b0b0b;
    --mist: #292929;
    --mid: #aaa;
    --white: #141414;
  }

  /* =====================================================
     COVER
  ===================================================== */

  .portfolio-cover {
    position: relative;
    width: 100%;
    height: 330px;
    overflow: hidden;

    background:
      linear-gradient(
        135deg,
        #171108,
        #382713 50%,
        #171108
      );
  }

  .portfolio-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    opacity: .58;
  }

  .portfolio-cover-overlay {
    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        to bottom,
        rgba(0,0,0,.05),
        rgba(0,0,0,.72)
      );
  }

  .cover-edit {
    position: absolute;
    right: 30px;
    bottom: 25px;

    display: flex;
    align-items: center;
    gap: 8px;

    padding: 10px 17px;

    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.3);

    background: rgba(0,0,0,.42);
    backdrop-filter: blur(12px);

    color: white;

    font-size: .78rem;
    font-weight: 600;

    cursor: pointer;
  }

  .cover-edit:hover {
    background: rgba(0,0,0,.65);
  }

  /* =====================================================
     PROFILE IDENTITY
  ===================================================== */

  .portfolio-identity {
    max-width: 1120px;
    margin: 0 auto;

    padding: 0 28px;
  }

  .avatar-container {
    position: relative;

    width: fit-content;

    margin-top: -78px;

    z-index: 10;
  }

  .portfolio-avatar {
    width: 154px;
    height: 154px;

    display: block;

    object-fit: cover;

    border-radius: 50%;
    border: 5px solid var(--cream);

    box-shadow:
      0 12px 35px rgba(0,0,0,.28);
  }

  .avatar-edit {
    position: absolute;

    right: 5px;
    bottom: 8px;

    width: 38px;
    height: 38px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    border: 3px solid var(--cream);

    background: var(--ink);
    color: var(--cream);

    cursor: pointer;
  }

  html.dark .avatar-edit {
    background: white;
    color: #111;
  }

  .verified-badge {
    position: absolute;

    left: 7px;
    bottom: 10px;

    width: 27px;
    height: 27px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: var(--gold);
    color: #111;

    border: 2px solid var(--cream);
  }

  .identity-row {
    padding-top: 28px;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    gap: 30px;
    flex-wrap: wrap;
  }

  .profile-name {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 11px;

    font-family: "Instrument Serif", Georgia, serif;

    font-size: clamp(2.1rem, 4vw, 3.1rem);

    font-weight: 400;
    line-height: 1.1;
  }

  .pro-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;

    padding: 4px 9px;

    border-radius: 999px;

    background:
      linear-gradient(
        135deg,
        var(--gold),
        var(--gold-light)
      );

    color: #111;

    font-family: Inter, sans-serif;

    font-size: .61rem;
    font-weight: 800;

    text-transform: uppercase;
    letter-spacing: .1em;
  }

  .profile-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    gap: 9px;

    margin-top: 9px;

    color: var(--mid);

    font-size: .87rem;
  }

  .role-tag {
    padding: 5px 12px;

    border-radius: 999px;

    color: var(--gold);

    background: rgba(201,168,76,.1);

    border: 1px solid rgba(201,168,76,.3);

    font-size: .72rem;
    font-weight: 700;

    text-transform: uppercase;
    letter-spacing: .08em;
  }

  .identity-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .profile-action {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    padding: 11px 19px;

    border-radius: 999px;

    border: 1px solid var(--mist);

    background: transparent;
    color: var(--ink);

    font-size: .81rem;
    font-weight: 700;

    cursor: pointer;

    transition: .2s ease;
  }

  .profile-action:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  .profile-action.primary {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--cream);
  }

  html.dark .profile-action.primary {
    background: white;
    border-color: white;
    color: #111;
  }

  /* =====================================================
     SKILLS
  ===================================================== */

  .skills-row {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;

    padding: 26px 0;
  }

  .skill-chip {
    padding: 7px 14px;

    border-radius: 999px;

    background: var(--mist);
    color: var(--mid);

    font-size: .75rem;
    font-weight: 600;

    border: 1px solid transparent;
  }

  .skill-chip:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  .edit-skills {
    display: inline-flex;
    align-items: center;
    gap: 5px;

    border: 1px dashed var(--gold);

    background: transparent;

    color: var(--gold);

    cursor: pointer;
  }

  /* =====================================================
     STATS
  ===================================================== */

  .profile-stats {
    display: flex;
    flex-wrap: wrap;

    gap: 48px;

    padding: 22px 0 28px;

    border-top: 1px solid var(--mist);
  }

  .profile-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .profile-stat-value {
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: -.03em;
  }

  .profile-stat-label {
    color: var(--mid);

    font-size: .68rem;
    text-transform: uppercase;
    letter-spacing: .09em;
  }

  /* =====================================================
     BODY
  ===================================================== */

  .portfolio-body {
    max-width: 1120px;
    margin: 0 auto;

    padding: 42px 28px 110px;

    display: grid;
    grid-template-columns: 300px minmax(0,1fr);

    gap: 36px;
  }

  @media(max-width: 820px) {
    .portfolio-body {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }

  /* =====================================================
     CARDS
  ===================================================== */

  .portfolio-card {
    background: var(--white);

    border: 1px solid var(--mist);
    border-radius: 22px;

    overflow: hidden;

    margin-bottom: 28px;

    transition:
      border-color .25s ease,
      box-shadow .25s ease;
  }

  .portfolio-card:hover {
    border-color: rgba(201,168,76,.32);

    box-shadow:
      0 14px 38px rgba(0,0,0,.055);
  }

  html.dark .portfolio-card {
    background: #141414;
  }

  html.dark .portfolio-card:hover {
    box-shadow:
      0 14px 38px rgba(0,0,0,.28);
  }

  .card-header {
    min-height: 64px;

    padding: 17px 22px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid var(--mist);
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 9px;

    font-size: .94rem;
    font-weight: 700;
  }

  .card-title svg {
    color: var(--gold);
  }

  .card-body {
    padding: 24px;
  }

  .edit-section {
    display: inline-flex;
    align-items: center;
    gap: 5px;

    border: none;

    background: transparent;
    color: var(--gold);

    font-size: .74rem;
    font-weight: 700;

    cursor: pointer;
  }

  .edit-section:hover {
    opacity: .7;
  }

  /* =====================================================
     ABOUT
  ===================================================== */

  .about-text {
    color: var(--mid);

    font-size: .91rem;

    line-height: 1.9;
  }

  /* =====================================================
     ATTRIBUTES
  ===================================================== */

  .attributes {
    display: flex;
    flex-direction: column;

    gap: 13px;
  }

  .attribute-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    font-size: .84rem;
  }

  .attribute-key {
    color: var(--mid);
  }

  .attribute-value {
    text-align: right;
    font-weight: 700;
  }

  /* =====================================================
     LANGUAGES
  ===================================================== */

  .languages {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .language-chip {
    padding: 6px 12px;

    border-radius: 999px;

    color: var(--gold);

    background: rgba(201,168,76,.1);

    border: 1px solid rgba(201,168,76,.25);

    font-size: .75rem;
    font-weight: 600;
  }

  /* =====================================================
     MEDIA SECTION
  ===================================================== */

  .media-section {
    margin-bottom: 34px;
  }

  .media-section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    gap: 20px;

    margin-bottom: 18px;
  }

  .media-section-heading h2 {
    margin: 0;

    font-family: "Instrument Serif", Georgia, serif;

    font-size: 1.65rem;
    font-weight: 400;
  }

  .media-section-heading p {
    margin-top: 5px;

    color: var(--mid);

    font-size: .78rem;
    line-height: 1.5;
  }

  .add-media-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    padding: 10px 16px;

    border-radius: 999px;

    border: 1px solid var(--mist);

    background: transparent;
    color: var(--ink);

    font-size: .77rem;
    font-weight: 700;

    cursor: pointer;

    white-space: nowrap;

    transition: .2s ease;
  }

  .add-media-btn:hover {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(201,168,76,.05);
  }

  /* =====================================================
     HEADSHOTS
  ===================================================== */

  .headshots {
    display: grid;

    grid-template-columns:
      repeat(3, minmax(0,1fr));

    gap: 16px;
  }

  .headshot {
    position: relative;

    aspect-ratio: 3 / 4;

    overflow: hidden;

    border-radius: 16px;

    background: var(--mist);

    border: 1px solid var(--mist);

    cursor: pointer;

    transition:
      transform .3s ease,
      border-color .3s ease;
  }

  .headshot:hover {
    transform: translateY(-5px);

    border-color: var(--gold);
  }

  .headshot img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;

    transition: transform .4s ease;
  }

  .headshot:hover img {
    transform: scale(1.05);
  }

  .headshot-overlay {
    position: absolute;
    inset: 0;

    display: flex;
    align-items: flex-end;

    padding: 15px;

    opacity: 0;

    background:
      linear-gradient(
        to top,
        rgba(0,0,0,.7),
        transparent 65%
      );

    transition: .25s ease;
  }

  .headshot:hover .headshot-overlay {
    opacity: 1;
  }

  .headshot-overlay span {
    color: white;

    font-size: .72rem;
    font-weight: 600;
  }

  /* ADD PHOTO CARD */

  .add-photo-card {
    aspect-ratio: 3 / 4;

    border-radius: 16px;

    border: 1px dashed rgba(201,168,76,.6);

    background:
      linear-gradient(
        135deg,
        rgba(201,168,76,.04),
        transparent
      );

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 9px;

    color: var(--gold);

    cursor: pointer;

    transition: .25s ease;
  }

  .add-photo-card:hover {
    background: rgba(201,168,76,.08);

    border-color: var(--gold);

    transform: translateY(-3px);
  }

  .add-photo-card strong {
    font-size: .82rem;
  }

  .add-photo-card span {
    color: var(--mid);

    font-size: .7rem;
  }

  /* =====================================================
     SHOWREELS
  ===================================================== */

  .showreels {
    display: flex;
    flex-direction: column;

    gap: 14px;
  }

  .showreel {
    display: flex;
    align-items: center;

    gap: 16px;

    padding: 13px;

    border: 1px solid var(--mist);

    border-radius: 15px;

    transition: .2s ease;
  }

  .showreel:hover {
    border-color: var(--gold);

    background: rgba(201,168,76,.035);
  }

  .reel-thumb {
    position: relative;

    width: 105px;
    height: 67px;

    flex-shrink: 0;

    overflow: hidden;

    border-radius: 10px;

    background: var(--mist);
  }

  .reel-thumb img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  .reel-play {
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0,0,0,.35);

    color: white;
  }

  .reel-info {
    flex: 1;
  }

  .reel-title {
    font-size: .88rem;
    font-weight: 700;
  }

  .reel-subtitle {
    margin-top: 4px;

    color: var(--mid);

    font-size: .72rem;
  }

  .reel-actions {
    display: flex;
    gap: 7px;
  }

  .small-action {
    width: 34px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    border: 1px solid var(--mist);

    background: transparent;
    color: var(--mid);

    cursor: pointer;
  }

  .small-action:hover {
    color: var(--gold);
    border-color: var(--gold);
  }

  /* ADD REEL */

  .add-reel-card {
    min-height: 105px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 12px;

    border: 1px dashed rgba(201,168,76,.6);

    border-radius: 15px;

    background:
      linear-gradient(
        135deg,
        rgba(201,168,76,.04),
        transparent
      );

    color: var(--gold);

    cursor: pointer;

    transition: .25s ease;
  }

  .add-reel-card:hover {
    border-color: var(--gold);

    background: rgba(201,168,76,.08);
  }

  .add-reel-card strong {
    font-size: .82rem;
  }

  .add-reel-card span {
    display: block;

    margin-top: 3px;

    color: var(--mid);

    font-size: .7rem;
  }

  /* =====================================================
     CREDITS
  ===================================================== */

  .credits {
    display: flex;
    flex-direction: column;
  }

  .credit {
    display: grid;

    grid-template-columns: 1fr auto;

    gap: 15px;

    padding: 17px 0;

    border-bottom: 1px solid var(--mist);
  }

  .credit:last-child {
    border-bottom: none;
  }

  .credit-title {
    font-size: .9rem;
    font-weight: 700;
  }

  .credit-meta {
    margin-top: 4px;

    color: var(--mid);

    font-size: .76rem;
  }

  .credit-type {
    align-self: center;

    padding: 5px 10px;

    border-radius: 999px;

    color: var(--gold);

    background: rgba(201,168,76,.1);

    border: 1px solid rgba(201,168,76,.25);

    font-size: .66rem;
    font-weight: 700;

    text-transform: uppercase;

    white-space: nowrap;
  }

  /* =====================================================
     EMPTY MEDIA
  ===================================================== */

  .empty-media {
    padding: 35px;

    border: 1px dashed var(--mist);

    border-radius: 16px;

    text-align: center;

    color: var(--mid);
  }

  /* =====================================================
     MODAL
  ===================================================== */

  .modal-backdrop {
    position: fixed;
    inset: 0;

    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background: rgba(0,0,0,.68);

    backdrop-filter: blur(8px);
  }

  .edit-modal {
    width: min(570px,100%);

    max-height: 90vh;

    overflow-y: auto;

    background: var(--white);

    border: 1px solid var(--mist);

    border-radius: 22px;

    box-shadow:
      0 30px 80px rgba(0,0,0,.3);
  }

  .modal-header {
    position: sticky;
    top: 0;

    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 18px 20px;

    background: var(--white);

    border-bottom: 1px solid var(--mist);
  }

  .modal-header h2 {
    margin: 0;

    font-size: 1rem;
  }

  .close-modal {
    width: 34px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    border: 1px solid var(--mist);

    background: transparent;
    color: var(--ink);

    cursor: pointer;
  }

  .modal-content {
    padding: 22px;
  }

  .field {
    margin-bottom: 17px;
  }

  .field label {
    display: block;

    margin-bottom: 7px;

    color: var(--mid);

    font-size: .72rem;
    font-weight: 700;

    text-transform: uppercase;
    letter-spacing: .07em;
  }

  .field input,
  .field textarea {
    width: 100%;

    padding: 11px 13px;

    border: 1px solid var(--mist);

    border-radius: 10px;

    background: transparent;
    color: var(--ink);

    font-family: inherit;
    font-size: .86rem;

    outline: none;
  }

  .field textarea {
    min-height: 120px;

    resize: vertical;
  }

  .field input:focus,
  .field textarea:focus {
    border-color: var(--gold);

    box-shadow:
      0 0 0 3px rgba(201,168,76,.1);
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;

    gap: 9px;

    padding: 16px 20px;

    border-top: 1px solid var(--mist);
  }

  /* =====================================================
     LIGHTBOX
  ===================================================== */

  .lightbox {
    position: fixed;
    inset: 0;

    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 30px;

    background: rgba(0,0,0,.92);

    cursor: zoom-out;
  }

  .lightbox img {
    max-width: 90vw;
    max-height: 90vh;

    object-fit: contain;

    border-radius: 10px;
  }

  .lightbox-close {
    position: absolute;

    top: 20px;
    right: 22px;

    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    border: 1px solid rgba(255,255,255,.2);

    background: rgba(255,255,255,.08);

    color: white;

    cursor: pointer;
  }

  /* =====================================================
     RESPONSIVE
  ===================================================== */

  @media(max-width: 600px) {

    .portfolio-cover {
      height: 230px;
    }

    .portfolio-identity {
      padding: 0 18px;
    }

    .portfolio-body {
      padding: 30px 18px 70px;
    }

    .portfolio-avatar {
      width: 125px;
      height: 125px;
    }

    .identity-row {
      padding-top: 22px;
    }

    .identity-actions {
      width: 100%;
    }

    .profile-action {
      flex: 1;
      justify-content: center;
    }

    .profile-stats {
      gap: 25px;
    }

    .headshots {
      grid-template-columns: repeat(2,1fr);
    }

    .media-section-header {
      align-items: flex-start;
      flex-direction: column;
    }

    .add-media-btn {
      width: 100%;
      justify-content: center;
    }

    .showreel {
      align-items: flex-start;
    }

    .reel-actions {
      display: none;
    }
  }
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function PortfolioPage() {
  const [profile, setProfile] =
    useState<Profile>(initialProfile);

  const [editSection, setEditSection] =
    useState<
      | "profile"
      | "about"
      | "attributes"
      | "skills"
      | "languages"
      | "credits"
      | null
    >(null);

  const [draft, setDraft] = useState<any>(null);

  const [lightbox, setLightbox] =
    useState<string | null>(null);

  /* =====================================================
     EDITOR
  ===================================================== */

  const openEditor = (
    section:
      | "profile"
      | "about"
      | "attributes"
      | "skills"
      | "languages"
      | "credits"
  ) => {
    setEditSection(section);

    if (section === "profile") {
      setDraft({
        name: profile.name,
        role: profile.role,
        city: profile.city,
        experience: profile.experience,
      });
    }

    if (section === "about") {
      setDraft({
        about: profile.about,
      });
    }

    if (section === "attributes") {
      setDraft({
        height: profile.height,
        weight: profile.weight,
        age: profile.age,
        gender: profile.gender,
        eyeColor: profile.eyeColor,
        hairColor: profile.hairColor,
        skin: profile.skin,
        build: profile.build,
      });
    }

    if (section === "skills") {
      setDraft({
        skills: profile.skills.join(", "),
      });
    }

    if (section === "languages") {
      setDraft({
        languages:
          profile.languages.join(", "),
      });
    }

    if (section === "credits") {
      setDraft({
        credits: profile.credits
          .map(
            (credit) =>
              `${credit.title} | ${credit.role} | ${credit.year} | ${credit.type}`
          )
          .join("\n"),
      });
    }
  };

  const closeEditor = () => {
    setEditSection(null);
    setDraft(null);
  };

  const saveEditor = () => {
    if (!draft) return;

    setProfile((previous) => {
      const updated = {
        ...previous,
      };

      if (editSection === "profile") {
        updated.name = draft.name;
        updated.role = draft.role;
        updated.city = draft.city;
        updated.experience =
          draft.experience;
      }

      if (editSection === "about") {
        updated.about = draft.about;
      }

      if (editSection === "attributes") {
        updated.height = draft.height;
        updated.weight = draft.weight;
        updated.age = draft.age;
        updated.gender = draft.gender;
        updated.eyeColor = draft.eyeColor;
        updated.hairColor = draft.hairColor;
        updated.skin = draft.skin;
        updated.build = draft.build;
      }

      if (editSection === "skills") {
        updated.skills = draft.skills
          .split(",")
          .map((item: string) =>
            item.trim()
          )
          .filter(Boolean);
      }

      if (editSection === "languages") {
        updated.languages =
          draft.languages
            .split(",")
            .map((item: string) =>
              item.trim()
            )
            .filter(Boolean);
      }

      if (editSection === "credits") {
        updated.credits =
          draft.credits
            .split("\n")
            .map((line: string) => {
              const [
                title,
                role,
                year,
                type,
              ] = line
                .split("|")
                .map((item: string) =>
                  item.trim()
                );

              return {
                title:
                  title || "Untitled",
                role: role || "",
                year: year || "",
                type: type || "",
              };
            })
            .filter(
              (credit: Credit) =>
                credit.title
            );
      }

      return updated;
    });

    closeEditor();
  };

  /* =====================================================
     ADD PHOTO
  ===================================================== */

  const handleAddPhoto = () => {
    const input =
      document.createElement("input");

    input.type = "file";
    input.accept =
      "image/png,image/jpeg,image/webp";

    input.onchange = () => {
      const file =
        input.files?.[0];

      if (!file) return;

      const imageUrl =
        URL.createObjectURL(file);

      setProfile((previous) => ({
        ...previous,
        headshots: [
          ...previous.headshots,
          imageUrl,
        ],
      }));
    };

    input.click();
  };

  /* =====================================================
     ADD REEL
  ===================================================== */

  const handleAddReel = () => {
    const input =
      document.createElement("input");

    input.type = "file";
    input.accept =
      "video/mp4,video/webm,video/quicktime";

    input.onchange = () => {
      const file =
        input.files?.[0];

      if (!file) return;

      const videoUrl =
        URL.createObjectURL(file);

      setProfile((previous) => ({
        ...previous,
        showreels: [
          ...previous.showreels,
          {
            title:
              file.name.replace(
                /\.[^/.]+$/,
                ""
              ),
            thumb:
              "/images/img_2.png",
          },
        ],
      }));

      console.log(
        "Selected reel:",
        videoUrl
      );
    };

    input.click();
  };

  return (
    <>
      <style>{STYLES}</style>

      <div className="portfolio-page">

        {/* =================================================
            COVER
        ================================================= */}

        <section className="portfolio-cover">

          <img
            src={profile.cover}
            alt="Profile cover"
          />

          <div className="portfolio-cover-overlay" />

          <button className="cover-edit">
            <Camera size={14} />
            Change Cover
          </button>

        </section>

        {/* =================================================
            IDENTITY
        ================================================= */}

        <section className="portfolio-identity">

          <div className="avatar-container">

            <img
              className="portfolio-avatar"
              src={profile.avatar}
              alt={profile.name}
            />

            <button className="avatar-edit">
              <Pencil size={15} />
            </button>

            {profile.verified && (
              <div className="verified-badge">
                <BadgeCheck
                  size={14}
                  strokeWidth={2.5}
                />
              </div>
            )}

          </div>

          <div className="identity-row">

            <div>

              <div className="profile-name">

                {profile.name}

                {profile.premium && (
                  <span className="pro-badge">
                    <Sparkles size={10} />
                    Pro
                  </span>
                )}

              </div>

              <div className="profile-meta">

                <span className="role-tag">
                  {profile.role}
                </span>

                <span>•</span>

                <span>
                  <MapPin
                    size={13}
                    style={{
                      verticalAlign:
                        "middle",
                      marginRight: 3,
                    }}
                  />

                  {profile.city}
                </span>

                <span>•</span>

                <span>
                  {profile.experience}{" "}
                  experience
                </span>

              </div>

            </div>

            <div className="identity-actions">

              <button
                className="profile-action"
                onClick={() =>
                  openEditor("profile")
                }
              >
                <Pencil size={14} />
                Edit Profile
              </button>

              <button className="profile-action primary">
                <ExternalLink size={14} />
                Public Profile
              </button>

            </div>

          </div>

          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="skills-row">

            {profile.skills.map(
              (skill) => (
                <span
                  className="skill-chip"
                  key={skill}
                >
                  {skill}
                </span>
              )
            )}

            <button
              className="skill-chip edit-skills"
              onClick={() =>
                openEditor("skills")
              }
            >
              <Pencil size={11} />
              Edit Skills
            </button>

          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="profile-stats">

            <div className="profile-stat">
              <span className="profile-stat-value">
                {profile.followers}
              </span>

              <span className="profile-stat-label">
                Followers
              </span>
            </div>

            <div className="profile-stat">
              <span className="profile-stat-value">
                {profile.projects}
              </span>

              <span className="profile-stat-label">
                Projects
              </span>
            </div>

            <div className="profile-stat">
              <span className="profile-stat-value">
                {profile.rating}
              </span>

              <span className="profile-stat-label">
                Rating
              </span>
            </div>

            <div className="profile-stat">
              <span className="profile-stat-value">
                {profile.experience}
              </span>

              <span className="profile-stat-label">
                Experience
              </span>
            </div>

          </div>

        </section>

        {/* =================================================
            MAIN BODY
        ================================================= */}

        <main className="portfolio-body">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside>

            {/* ABOUT */}

            <section className="portfolio-card">

              <div className="card-header">

                <div className="card-title">
                  <Film size={17} />
                  About
                </div>

                <button
                  className="edit-section"
                  onClick={() =>
                    openEditor("about")
                  }
                >
                  <Pencil size={14} />
                  Edit
                </button>

              </div>

              <div className="card-body">

                <p className="about-text">
                  {profile.about}
                </p>

              </div>

            </section>

            {/* PHYSICAL ATTRIBUTES */}

            <section className="portfolio-card">

              <div className="card-header">

                <div className="card-title">
                  <Ruler size={17} />
                  Physical Attributes
                </div>

                <button
                  className="edit-section"
                  onClick={() =>
                    openEditor(
                      "attributes"
                    )
                  }
                >
                  <Pencil size={14} />
                  Edit
                </button>

              </div>

              <div className="card-body">

                <div className="attributes">

                  {[
                    [
                      "Height",
                      profile.height,
                    ],
                    [
                      "Weight",
                      profile.weight,
                    ],
                    [
                      "Age",
                      `${profile.age} yrs`,
                    ],
                    [
                      "Gender",
                      profile.gender,
                    ],
                    [
                      "Eye Color",
                      profile.eyeColor,
                    ],
                    [
                      "Hair Color",
                      profile.hairColor,
                    ],
                    [
                      "Skin Tone",
                      profile.skin,
                    ],
                    [
                      "Build",
                      profile.build,
                    ],
                  ].map(
                    ([key, value]) => (
                      <div
                        className="attribute-row"
                        key={key}
                      >
                        <span className="attribute-key">
                          {key}
                        </span>

                        <span className="attribute-value">
                          {value}
                        </span>
                      </div>
                    )
                  )}

                </div>

              </div>

            </section>

            {/* LANGUAGES */}

            <section className="portfolio-card">

              <div className="card-header">

                <div className="card-title">
                  <Globe size={17} />
                  Languages
                </div>

                <button
                  className="edit-section"
                  onClick={() =>
                    openEditor(
                      "languages"
                    )
                  }
                >
                  <Pencil size={14} />
                  Edit
                </button>

              </div>

              <div className="card-body">

                <div className="languages">

                  {profile.languages.map(
                    (language) => (
                      <span
                        className="language-chip"
                        key={language}
                      >
                        {language}
                      </span>
                    )
                  )}

                </div>

              </div>

            </section>

          </aside>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div>

            {/* =================================================
                HEADSHOTS
            ================================================= */}

            <section className="media-section">

              <div className="media-section-header">

                <div className="media-section-heading">

                  <h2>
                    Headshots
                  </h2>

                  <p>
                    Showcase your strongest
                    professional images.
                  </p>

                </div>

                <button
                  className="add-media-btn"
                  onClick={
                    handleAddPhoto
                  }
                >
                  <Plus size={14} />
                  Add Photo
                </button>

              </div>

              <div className="headshots">

                {profile.headshots.map(
                  (image, index) => (
                    <div
                      className="headshot"
                      key={`${image}-${index}`}
                      onClick={() =>
                        setLightbox(image)
                      }
                    >

                      <img
                        src={image}
                        alt={`Headshot ${
                          index + 1
                        }`}
                      />

                      <div className="headshot-overlay">
                        <span>
                          View image
                        </span>
                      </div>

                    </div>
                  )
                )}

                {/* ALWAYS AVAILABLE ADD CARD */}

                <button
                  className="add-photo-card"
                  onClick={
                    handleAddPhoto
                  }
                >
                  <Upload size={20} />

                  <strong>
                    Add Photo
                  </strong>

                  <span>
                    JPG, PNG or WebP
                  </span>
                </button>

              </div>

            </section>

            {/* =================================================
                SHOWREELS
            ================================================= */}

            <section className="media-section">

              <div className="media-section-header">

                <div className="media-section-heading">

                  <h2>
                    Showreels
                  </h2>

                  <p>
                    Add videos that represent
                    your work and range.
                  </p>

                </div>

                <button
                  className="add-media-btn"
                  onClick={
                    handleAddReel
                  }
                >
                  <Plus size={14} />
                  Add Reel
                </button>

              </div>

              <div className="showreels">

                {profile.showreels.map(
                  (reel, index) => (
                    <div
                      className="showreel"
                      key={`${reel.title}-${index}`}
                    >

                      <div className="reel-thumb">

                        <img
                          src={reel.thumb}
                          alt={reel.title}
                        />

                        <div className="reel-play">
                          <Play
                            size={17}
                            fill="white"
                          />
                        </div>

                      </div>

                      <div className="reel-info">

                        <div className="reel-title">
                          {reel.title}
                        </div>

                        <div className="reel-subtitle">
                          Showreel
                        </div>

                      </div>

                      <div className="reel-actions">

                        <button className="small-action">
                          <Pencil size={14} />
                        </button>

                        <button className="small-action">
                          <X size={14} />
                        </button>

                      </div>

                    </div>
                  )
                )}

                {/* ADD REEL */}

                <button
                  className="add-reel-card"
                  onClick={
                    handleAddReel
                  }
                >
                  <Plus size={20} />

                  <div>
                    <strong>
                      Add a showreel
                    </strong>

                    <span>
                      MP4, WebM or MOV
                    </span>
                  </div>

                </button>

              </div>

            </section>

            {/* =================================================
                CREDITS
            ================================================= */}

            <section className="media-section">

              <div className="media-section-header">

                <div className="media-section-heading">

                  <h2>
                    Credits
                  </h2>

                  <p>
                    Your film, television,
                    OTT and other professional
                    work.
                  </p>

                </div>

                <button
                  className="add-media-btn"
                  onClick={() =>
                    openEditor("credits")
                  }
                >
                  <Pencil size={14} />
                  Manage Credits
                </button>

              </div>

              <div className="portfolio-card">

                <div className="card-body">

                  <div className="credits">

                    {profile.credits.map(
                      (
                        credit,
                        index
                      ) => (
                        <div
                          className="credit"
                          key={`${credit.title}-${index}`}
                        >

                          <div>

                            <div className="credit-title">
                              {credit.title}
                            </div>

                            <div className="credit-meta">
                              {credit.role}
                              {" · "}
                              {credit.year}
                            </div>

                          </div>

                          <span className="credit-type">
                            {credit.type}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            </section>

          </div>

        </main>

        {/* =================================================
            EDIT MODAL
        ================================================= */}

        {editSection && (
          <div
            className="modal-backdrop"
            onClick={
              closeEditor
            }
          >

            <div
              className="edit-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <h2>
                  {editSection ===
                    "profile" &&
                    "Edit Profile"}

                  {editSection ===
                    "about" &&
                    "Edit About"}

                  {editSection ===
                    "attributes" &&
                    "Edit Physical Attributes"}

                  {editSection ===
                    "skills" &&
                    "Edit Skills"}

                  {editSection ===
                    "languages" &&
                    "Edit Languages"}

                  {editSection ===
                    "credits" &&
                    "Edit Credits"}
                </h2>

                <button
                  className="close-modal"
                  onClick={
                    closeEditor
                  }
                >
                  <X size={16} />
                </button>

              </div>

              <div className="modal-content">

                {editSection ===
                  "profile" && (
                  <>
                    <div className="field">
                      <label>
                        Name
                      </label>

                      <input
                        value={
                          draft?.name ||
                          ""
                        }
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            name:
                              e.target
                                .value,
                          })
                        }
                      />
                    </div>

                    <div className="field">
                      <label>
                        Role
                      </label>

                      <input
                        value={
                          draft?.role ||
                          ""
                        }
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            role:
                              e.target
                                .value,
                          })
                        }
                      />
                    </div>

                    <div className="field">
                      <label>
                        City
                      </label>

                      <input
                        value={
                          draft?.city ||
                          ""
                        }
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            city:
                              e.target
                                .value,
                          })
                        }
                      />
                    </div>

                    <div className="field">
                      <label>
                        Experience
                      </label>

                      <input
                        value={
                          draft?.experience ||
                          ""
                        }
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            experience:
                              e.target
                                .value,
                          })
                        }
                      />
                    </div>
                  </>
                )}

                {editSection ===
                  "about" && (
                  <div className="field">
                    <label>
                      About
                    </label>

                    <textarea
                      value={
                        draft?.about ||
                        ""
                      }
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          about:
                            e.target
                              .value,
                        })
                      }
                    />
                  </div>
                )}

                {editSection ===
                  "attributes" && (
                  <>
                    {[
                      [
                        "height",
                        "Height",
                      ],
                      [
                        "weight",
                        "Weight",
                      ],
                      [
                        "age",
                        "Age",
                      ],
                      [
                        "gender",
                        "Gender",
                      ],
                      [
                        "eyeColor",
                        "Eye Color",
                      ],
                      [
                        "hairColor",
                        "Hair Color",
                      ],
                      [
                        "skin",
                        "Skin Tone",
                      ],
                      [
                        "build",
                        "Build",
                      ],
                    ].map(
                      ([
                        key,
                        label,
                      ]) => (
                        <div
                          className="field"
                          key={key}
                        >
                          <label>
                            {label}
                          </label>

                          <input
                            value={
                              draft?.[
                                key
                              ] || ""
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                [key]:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </div>
                      )
                    )}
                  </>
                )}

                {editSection ===
                  "skills" && (
                  <div className="field">
                    <label>
                      Skills — separate
                      with commas
                    </label>

                    <textarea
                      value={
                        draft?.skills ||
                        ""
                      }
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          skills:
                            e.target
                              .value,
                        })
                      }
                    />
                  </div>
                )}

                {editSection ===
                  "languages" && (
                  <div className="field">
                    <label>
                      Languages —
                      separate with
                      commas
                    </label>

                    <textarea
                      value={
                        draft?.languages ||
                        ""
                      }
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          languages:
                            e.target
                              .value,
                        })
                      }
                    />
                  </div>
                )}

                {editSection ===
                  "credits" && (
                  <div className="field">
                    <label>
                      One credit per
                      line:
                      Title | Role |
                      Year | Type
                    </label>

                    <textarea
                      style={{
                        minHeight: 240,
                      }}
                      value={
                        draft?.credits ||
                        ""
                      }
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          credits:
                            e.target
                              .value,
                        })
                      }
                    />
                  </div>
                )}

              </div>

              <div className="modal-footer">

                <button
                  className="add-media-btn"
                  onClick={
                    closeEditor
                  }
                >
                  Cancel
                </button>

                <button
                  className="profile-action primary"
                  onClick={
                    saveEditor
                  }
                >
                  <Save size={14} />
                  Save Changes
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            LIGHTBOX
        ================================================= */}

        {lightbox && (
          <div
            className="lightbox"
            onClick={() =>
              setLightbox(null)
            }
          >

            <button
              className="lightbox-close"
              onClick={() =>
                setLightbox(null)
              }
            >
              <X size={18} />
            </button>

            <img
              src={lightbox}
              alt="Full size"
              onClick={(e) =>
                e.stopPropagation()
              }
            />

          </div>
        )}

      </div>
    </>
  );
}