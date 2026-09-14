"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  MapPin,
  Link2,
  Star,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface Skill {
  id?: string;
  name: string;
  proficiency?: string;
}

interface Experience {
  id?: string;
  company?: string;
  role?: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface Education {
  id?: string;
  institution?: string;
  degree?: string;
  specialization?: string;
  startYear?: string | number;
  endYear?: string | number;
  score?: string;
}

interface Project {
  id?: string;
  title?: string;
  description?: string;
  images?: string[];
  githubLink?: string;
  liveDemoLink?: string;
}

interface Certification {
  id?: string;
  name?: string;
  organization?: string;
  issueDate?: string;
}

interface Language {
  id?: string;
  name: string;
  proficiency?: string;
}

interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  behance?: string;
  dribbble?: string;
  medium?: string;
}

interface PublicPortfolio {
  id: string;
  userId: string;
  usernameSlug: string;

  isPublished: boolean;
  completionPercentage: number;
  lastUpdated?: string;

  fullName: string;
  professionalTitle: string;

  profilePictureUrl?: string | null;
  coverBannerUrl?: string | null;

  bio?: string | null;
  location?: string | null;

  email?: string | null;
  phone?: string | null;

  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolioUrl?: string | null;
  resumeUrl?: string | null;

  visibility?: string;
  privacyEmail?: string;
  privacyPhone?: string;
  privacyResume?: string;
  privacyProjects?: string;
  privacyAchievements?: string;
  privacySocialLinks?: string;

  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  achievements: unknown[];
  languages: Language[];

  socialLinks?: SocialLinks | null;
  interests: string[];

  /* Optional physical attributes.
     These will display if your backend eventually supplies them. */
  height?: string | null;
  weight?: string | null;
  age?: number | null;
  gender?: string | null;
  eyeColor?: string | null;
  hairColor?: string | null;
  skinTone?: string | null;
  build?: string | null;

  /* Optional showcase media if your backend supplies them */
  headshots?: string[];
  showreels?: {
    id?: string;
    title: string;
    thumbnailUrl?: string;
    thumb?: string;
    url?: string;
  }[];

  credits?: {
    id?: string;
    title: string;
    role?: string;
    year?: string | number;
    type?: string;
  }[];
}

/* =========================================================
   HELPERS
========================================================= */

function safeString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function formatNumber(value: number): string {
  if (value >= 1000) {
    return (
      (value / 1000).toFixed(1).replace(".0", "") + "k"
    );
  }

  return String(value);
}

function safeExternalUrl(value?: string | null): string {
  if (!value) return "";

  try {
    const url = new URL(
      value.startsWith("http") ? value : `https://${value}`
    );

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function mapPortfolio(data: any): PublicPortfolio {
  const rawSkills = Array.isArray(data.skills)
    ? data.skills
    : [];

  const rawExperiences = Array.isArray(data.experiences)
    ? data.experiences
    : [];

  const rawEducation = Array.isArray(data.education)
    ? data.education
    : [];

  const rawProjects = Array.isArray(data.projects)
    ? data.projects
    : [];

  const rawCertifications = Array.isArray(
    data.certifications
  )
    ? data.certifications
    : [];

  const rawAchievements = Array.isArray(
    data.achievements
  )
    ? data.achievements
    : [];

  const rawLanguages = Array.isArray(data.languages)
    ? data.languages
    : [];

  const rawInterests = Array.isArray(data.interests)
    ? data.interests
    : [];

  const skills: Skill[] = rawSkills.map(
    (skill: any, index: number) => ({
      id:
        safeString(skill.id) ||
        `skill-${index}`,
      name:
        safeString(skill.name) ||
        safeString(skill.title) ||
        "",
      proficiency: safeString(skill.proficiency),
    })
  );

  const experiences: Experience[] =
    rawExperiences.map(
      (experience: any, index: number) => ({
        id:
          safeString(experience.id) ||
          `experience-${index}`,
        company: safeString(experience.company),
        role: safeString(experience.role),
        employmentType: safeString(
          experience.employmentType
        ),
        startDate: safeString(
          experience.startDate
        ),
        endDate: safeString(
          experience.endDate
        ),
        description: safeString(
          experience.description
        ),
      })
    );

  const education: Education[] =
    rawEducation.map(
      (item: any, index: number) => ({
        id:
          safeString(item.id) ||
          `education-${index}`,
        institution: safeString(
          item.institution
        ),
        degree: safeString(item.degree),
        specialization: safeString(
          item.specialization
        ),
        startYear:
          item.startYear ?? "",
        endYear:
          item.endYear ?? "",
        score: safeString(item.score),
      })
    );

  const projects: Project[] =
    rawProjects.map(
      (project: any, index: number) => ({
        id:
          safeString(project.id) ||
          `project-${index}`,
        title: safeString(project.title),
        description: safeString(
          project.description
        ),
        images: Array.isArray(project.images)
          ? project.images
          : [],
        githubLink: safeString(
          project.githubLink
        ),
        liveDemoLink: safeString(
          project.liveDemoLink
        ),
      })
    );

  const certifications: Certification[] =
    rawCertifications.map(
      (cert: any, index: number) => ({
        id:
          safeString(cert.id) ||
          `certification-${index}`,
        name: safeString(cert.name),
        organization: safeString(
          cert.organization
        ),
        issueDate: safeString(
          cert.issueDate
        ),
      })
    );

  const languages: Language[] =
    rawLanguages.map(
      (language: any, index: number) => ({
        id:
          safeString(language.id) ||
          `language-${index}`,
        name: safeString(language.name),
        proficiency: safeString(
          language.proficiency
        ),
      })
    );

  const showreels = Array.isArray(
    data.showreels
  )
    ? data.showreels.map(
        (reel: any, index: number) => ({
          id:
            safeString(reel.id) ||
            `reel-${index}`,
          title:
            safeString(reel.title) ||
            `Showreel ${index + 1}`,
          thumbnailUrl: safeString(
            reel.thumbnailUrl
          ),
          thumb: safeString(reel.thumb),
          url: safeString(reel.url),
        })
      )
    : [];

  const credits = Array.isArray(
    data.credits
  )
    ? data.credits.map(
        (credit: any, index: number) => ({
          id:
            safeString(credit.id) ||
            `credit-${index}`,
          title:
            safeString(credit.title) ||
            safeString(credit.projectTitle),
          role: safeString(credit.role),
          year:
            credit.year ??
            safeString(credit.year),
          type: safeString(credit.type),
        })
      )
    : [];

  return {
    id: safeString(data.id),
    userId: safeString(data.userId),
    usernameSlug: safeString(
      data.usernameSlug
    ),

    isPublished:
      data.isPublished === true,

    completionPercentage:
      Number(data.completionPercentage) || 0,

    lastUpdated:
      safeString(data.lastUpdated),

    fullName:
      safeString(data.fullName) ||
      "Unnamed Talent",

    professionalTitle:
      safeString(data.professionalTitle) ||
      "Creative Professional",

    profilePictureUrl:
      data.profilePictureUrl || null,

    coverBannerUrl:
      data.coverBannerUrl || null,

    bio:
      data.bio || "",

    location:
      data.location || "",

    email:
      data.email || null,

    phone:
      data.phone || null,

    website:
      data.website || null,

    linkedin:
      data.linkedin || null,

    github:
      data.github || null,

    portfolioUrl:
      data.portfolioUrl || null,

    resumeUrl:
      data.resumeUrl || null,

    visibility:
      data.visibility || "Public",

    privacyEmail:
      data.privacyEmail || "Public",

    privacyPhone:
      data.privacyPhone || "Public",

    privacyResume:
      data.privacyResume || "Public",

    privacyProjects:
      data.privacyProjects || "Public",

    privacyAchievements:
      data.privacyAchievements || "Public",

    privacySocialLinks:
      data.privacySocialLinks || "Public",

    skills,
    experiences,
    education,
    projects,
    certifications,
    achievements:
      rawAchievements,

    languages,

    socialLinks:
      data.socialLinks || null,

    interests:
      rawInterests.map((item: any) =>
        typeof item === "string"
          ? item
          : safeString(item.name)
      ).filter(Boolean),

    height:
      data.height || null,

    weight:
      data.weight || null,

    age:
      typeof data.age === "number"
        ? data.age
        : null,

    gender:
      data.gender || null,

    eyeColor:
      data.eyeColor || null,

    hairColor:
      data.hairColor || null,

    skinTone:
      data.skinTone ||
      data.skin ||
      null,

    build:
      data.build || null,

    headshots:
      Array.isArray(data.headshots)
        ? data.headshots
        : [],

    showreels,

    credits,
  };
}

/* =========================================================
   STYLES
   Same visual language as dashboard portfolio.
========================================================= */

const STYLES = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --ink: #f6f6f6;
    --cream: #0b0b0b;
    --mist: #1c1c1c;
    --mid: #b8b8b8;
    --white: #141414;
    --gold: #c9a84c;
    --gold2: #e8c96a;
    --teal: #4ecdc4;
  }

  html,
  body {
    background: #0b0b0b;
    color: var(--ink);
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
    overflow-x: hidden;
  }

  .public-portfolio {
    min-height: 100vh;
    background: #0b0b0b;
    color: #f6f6f6;
  }

  

  /* =====================================================
     COVER
  ===================================================== */

  .pp-cover {
    position: relative;

    width: 100%;
    height: 280px;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 50% 20%,
        #251b0b 0%,
        #100e0a 45%,
        #080808 100%
      );
  }

  .pp-cover img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center top;

    opacity: 0.52;
  }

  .pp-cover-grad {
    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.45) 55%,
        rgba(11, 11, 11, 1) 100%
      );
  }

  /* =====================================================
     IDENTITY
  ===================================================== */

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

    border: 4px solid #0b0b0b;

    object-fit: cover;

    display: block;

    background: #181818;

    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.5),
      0 0 0 1px #292929;
  }

  .pp-avatar-placeholder {
    width: 150px;
    height: 150px;

    border-radius: 50%;

    border: 4px solid #0b0b0b;

    background:
      radial-gradient(
        circle at 40% 35%,
        #3a321f,
        #16130e 60%,
        #0d0d0d
      );

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--gold);

    font-family: Georgia, serif;
    font-size: 3.6rem;

    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.5),
      0 0 0 1px #292929;
  }

  .pp-verified {
    position: absolute;

    bottom: 4px;
    right: 4px;

    width: 27px;
    height: 27px;

    border-radius: 50%;

    background: var(--gold);

    border: 2px solid #0b0b0b;

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
    gap: 18px;
  }

  .pp-name {
    font-family:
      "Instrument Serif",
      Georgia,
      serif;

    font-size: clamp(1.9rem, 3.5vw, 2.9rem);

    font-weight: 400;

    line-height: 1.1;

    color: #f5f5f5;

    display: flex;
    align-items: center;

    gap: 10px;

    flex-wrap: wrap;
  }

  .pp-badge-pro {
    display: inline-flex;
    align-items: center;
    gap: 4px;

    background:
      linear-gradient(
        135deg,
        var(--gold),
        var(--gold2)
      );

    color: #111;

    font-size: 0.6rem;
    font-weight: 800;

    text-transform: uppercase;
    letter-spacing: 0.1em;

    padding: 4px 9px;

    border-radius: 100px;
  }

  .pp-meta {
    display: flex;

    flex-wrap: wrap;

    gap: 9px;

    align-items: center;

    margin-top: 8px;

    font-size: 0.88rem;

    color: var(--mid);
  }

  .pp-meta-dot {
    color: #444;
  }

  .pp-role-tag {
    display: inline-flex;

    align-items: center;

    background: rgba(201, 168, 76, 0.12);

    border: 1px solid rgba(201, 168, 76, 0.3);

    color: var(--gold);

    font-size: 0.75rem;

    font-weight: 700;

    text-transform: uppercase;

    letter-spacing: 0.08em;

    padding: 4px 11px;

    border-radius: 100px;
  }

  /* =====================================================
     ACTIONS
  ===================================================== */

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

    font-size: 0.88rem;

    font-weight: 700;

    cursor: pointer;

    transition: 0.2s ease;
  }

  .pp-btn-follow {
    border: 2px solid #eee;

    background: #eee;

    color: #111;
  }

  .pp-btn-follow.following {
    background: transparent;
    color: #eee;
  }

  .pp-btn-follow:hover {
    transform: translateY(-1px);
  }

  .pp-btn-secondary {
    border: 1.5px solid #333;

    background: transparent;

    color: #ddd;
  }

  .pp-btn-secondary:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  .pp-btn-gold {
    border: 2px solid var(--gold);

    background: var(--gold);

    color: #111;
  }

  .pp-btn-gold:hover {
    background: var(--gold2);
  }

  /* =====================================================
     CHIPS
  ===================================================== */

  .pp-chips {
    display: flex;

    flex-wrap: wrap;

    gap: 8px;

    padding: 15px 0;
  }

  .pp-chip {
    font-size: 0.78rem;

    font-weight: 600;

    padding: 6px 14px;

    border-radius: 100px;

    background: #1e1e1e;

    color: #b8b8b8;

    border: 1px solid transparent;

    transition: 0.2s;
  }

  .pp-chip:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  /* =====================================================
     STATS
  ===================================================== */

  .pp-stats {
    display: flex;

    gap: 38px;

    padding: 20px 0 0;

    border-top: 1px solid #222;

    margin-top: 12px;

    flex-wrap: wrap;
  }

  .pp-stat {
    display: flex;

    flex-direction: column;

    gap: 3px;
  }

  .pp-stat-val {
    font-size: 1.3rem;

    font-weight: 800;

    color: #eee;

    letter-spacing: -0.03em;
  }

  .pp-stat-lab {
    font-size: 0.7rem;

    color: #888;

    text-transform: uppercase;

    letter-spacing: 0.08em;
  }

  /* =====================================================
     TABS
  ===================================================== */

  .pp-tabs {
    display: flex;

    border-bottom: 1px solid #222;

    margin-top: 12px;
  }

  .pp-tab {
    padding: 14px 24px;

    font-size: 0.88rem;

    font-weight: 600;

    background: none;

    border: none;

    cursor: pointer;

    color: #888;

    border-bottom: 2px solid transparent;

    margin-bottom: -1px;

    transition: 0.2s;
  }

  .pp-tab:hover {
    color: #ddd;
  }

  .pp-tab.active {
    color: #fff;

    border-bottom-color: var(--gold);
  }

  /* =====================================================
     BODY
  ===================================================== */

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

    .pp-info-row {
      padding-top: 90px;
    }

    .pp-actions {
      width: 100%;
    }
  }

  /* =====================================================
     CARDS
  ===================================================== */

  .pp-card {
    background: #141414;

    border: 1.5px solid #252525;

    border-radius: 20px;

    overflow: hidden;

    margin-bottom: 16px;
  }

  .pp-card-head {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 18px 20px 14px;

    border-bottom: 1px solid #252525;
  }

  .pp-card-title {
    display: flex;

    align-items: center;

    gap: 8px;

    font-size: 0.95rem;

    font-weight: 700;

    color: #f0f0f0;
  }

  .pp-card-icon {
    color: var(--gold);

    display: inline-flex;
  }

  .pp-card-body {
    padding: 18px 20px;
  }

  /* =====================================================
     ABOUT
  ===================================================== */

  .pp-about-text {
    font-size: 0.92rem;

    line-height: 1.8;

    color: #aaa;
  }

  .pp-divider {
    height: 1px;

    background: #252525;

    margin: 16px 0;
  }

  /* =====================================================
     ATTRIBUTES
  ===================================================== */

  .pp-attrs {
    display: flex;

    flex-direction: column;

    gap: 10px;
  }

  .pp-attr-row {
    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 16px;

    font-size: 0.88rem;
  }

  .pp-attr-key {
    color: #888;
  }

  .pp-attr-val {
    font-weight: 700;

    color: #e8e8e8;

    text-align: right;
  }

  /* =====================================================
     LANGUAGES
  ===================================================== */

  .pp-langs {
    display: flex;

    flex-wrap: wrap;

    gap: 6px;
  }

  .pp-lang {
    font-size: 0.78rem;

    font-weight: 600;

    background: rgba(201, 168, 76, 0.1);

    border: 1px solid rgba(201, 168, 76, 0.25);

    color: var(--gold);

    padding: 4px 12px;

    border-radius: 100px;
  }

  /* =====================================================
     HEADSHOTS
  ===================================================== */

  .pp-headshots {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 10px;
  }

  .pp-headshot {
    aspect-ratio: 3 / 4;

    border-radius: 12px;

    overflow: hidden;

    background: #1e1e1e;

    border: 1.5px solid #2a2a2a;

    cursor: pointer;

    position: relative;

    transition: 0.2s;
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

  .pp-empty-headshot {
    aspect-ratio: 3 / 4;

    border-radius: 12px;

    border: 1px dashed #333;

    display: flex;

    align-items: center;

    justify-content: center;

    color: #555;

    font-size: 0.78rem;

    text-align: center;

    padding: 15px;
  }

  /* =====================================================
     REELS
  ===================================================== */

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

    border: 1.5px solid #2a2a2a;

    border-radius: 12px;

    cursor: pointer;

    transition: 0.2s;

    background: transparent;
  }

  .pp-reel:hover {
    border-color: var(--gold);

    background: rgba(201, 168, 76, 0.04);
  }

  .pp-reel-thumb {
    width: 72px;
    height: 52px;

    border-radius: 8px;

    overflow: hidden;

    background: #2a2a2a;

    flex-shrink: 0;

    position: relative;
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

    background: rgba(0, 0, 0, 0.38);

    color: white;
  }

  .pp-reel-title {
    font-size: 0.9rem;

    font-weight: 600;

    color: #eee;
  }

  .pp-reel-sub {
    font-size: 0.75rem;

    color: #777;

    margin-top: 2px;
  }

  /* =====================================================
     CREDITS
  ===================================================== */

  .pp-credits {
    display: flex;

    flex-direction: column;
  }

  .pp-credit-row {
    display: grid;

    grid-template-columns: 1fr auto;

    gap: 12px;

    padding: 14px 0;

    border-bottom: 1px solid #222;

    align-items: center;
  }

  .pp-credit-row:last-child {
    border-bottom: none;
  }

  .pp-credit-title {
    font-size: 0.95rem;

    font-weight: 700;

    color: #eee;
  }

  .pp-credit-sub {
    font-size: 0.82rem;

    color: #888;

    margin-top: 2px;
  }

  .pp-badge {
    font-size: 0.7rem;

    font-weight: 700;

    text-transform: uppercase;

    letter-spacing: 0.08em;

    padding: 3px 10px;

    border-radius: 100px;

    white-space: nowrap;

    background: rgba(201, 168, 76, 0.1);

    border: 1px solid rgba(201, 168, 76, 0.25);

    color: var(--gold);
  }

  /* =====================================================
     PROJECTS
  ===================================================== */

  .pp-projects {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 14px;
  }

  .pp-project {
    border: 1px solid #292929;

    border-radius: 14px;

    overflow: hidden;

    background: #111;

    transition: 0.2s;
  }

  .pp-project:hover {
    border-color: var(--gold);
  }

  .pp-project-image {
    width: 100%;

    height: 180px;

    background: #1b1b1b;

    overflow: hidden;
  }

  .pp-project-image img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  .pp-project-content {
    padding: 16px;
  }

  .pp-project-title {
    font-size: 1rem;

    font-weight: 700;

    color: #eee;

    margin-bottom: 7px;
  }

  .pp-project-description {
    font-size: 0.82rem;

    line-height: 1.6;

    color: #888;
  }

  .pp-project-links {
    display: flex;

    gap: 12px;

    margin-top: 13px;
  }

  .pp-project-links a {
    display: inline-flex;

    align-items: center;

    gap: 5px;

    font-size: 0.78rem;

    color: var(--gold);

    text-decoration: none;
  }

  .pp-project-links a:hover {
    text-decoration: underline;
  }

  /* =====================================================
     LIGHTBOX
  ===================================================== */

  .pp-lightbox {
    position: fixed;

    inset: 0;

    z-index: 999;

    background: rgba(0, 0, 0, 0.94);

    display: flex;

    align-items: center;

    justify-content: center;

    cursor: zoom-out;

    padding: 30px;
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

    background: rgba(255, 255, 255, 0.1);

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

  /* =====================================================
     EMPTY
  ===================================================== */

  .pp-empty {
    text-align: center;

    padding: 40px 20px;

    color: #777;

    font-size: 0.9rem;
  }

  /* =====================================================
     CONTACT
  ===================================================== */

  .pp-contact-links {
    display: flex;

    flex-direction: column;

    gap: 11px;
  }

  .pp-contact-link {
    display: flex;

    align-items: center;

    gap: 9px;

    color: #aaa;

    font-size: 0.84rem;

    text-decoration: none;

    word-break: break-word;
  }

  .pp-contact-link:hover {
    color: var(--gold);
  }

  @media (max-width: 600px) {
    .pp-headshots {
      grid-template-columns: repeat(2, 1fr);
    }

    .pp-projects {
      grid-template-columns: 1fr;
    }

    .pp-stats {
      gap: 24px;
    }

    .pp-avatar,
    .pp-avatar-placeholder {
      width: 125px;
      height: 125px;
    }

    .pp-avatar-wrap {
      top: -62px;
    }

    .pp-cover {
      height: 230px;
    }

    .pp-topbar {
      padding: 10px 14px;
    }
  }
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function PublicPortfolioPage() {
  const params = useParams();
  const router = useRouter();

  const username =
    typeof params?.username === "string"
      ? params.username
      : "";

  const [portfolio, setPortfolio] =
    useState<PublicPortfolio | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [following, setFollowing] =
    useState(false);

  const [tab, setTab] = useState<
    "Portfolio" | "Credits" | "About"
  >("Portfolio");

  const [lightbox, setLightbox] =
    useState<string | null>(null);

  /* =====================================================
     FETCH REAL BACKEND DATA
  ===================================================== */

  useEffect(() => {
    if (!username) {
      setIsLoading(false);
      return;
    }

    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:4000/portfolio/public/${encodeURIComponent(
            username
          )}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "This portfolio could not be found."
            );
          }

          throw new Error(
            `Portfolio request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        const mapped = mapPortfolio(data);

        setPortfolio(mapped);
      } catch (err) {
        console.error(
          "Failed to load public portfolio:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load portfolio."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <>
        <style>{STYLES}</style>

        <div
          className="public-portfolio"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border:
                  "3px solid rgba(201,168,76,.2)",
                borderTopColor:
                  "var(--gold)",
                animation:
                  "portfolioSpin 0.8s linear infinite",
                margin: "0 auto 18px",
              }}
            />

            <p
              style={{
                color: "#999",
                fontSize: ".9rem",
              }}
            >
              Loading portfolio...
            </p>
          </div>
        </div>

        <style>
          {`
            @keyframes portfolioSpin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </>
    );
  }

  /* =====================================================
     ERROR / NOT FOUND
  ===================================================== */

  if (!portfolio || error) {
    return (
      <>
        <style>{STYLES}</style>

        <div
          className="public-portfolio"
          style={{
            minHeight: "100vh",
          }}
        >

          <div
            style={{
              minHeight:
                "calc(100vh - 65px)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              padding: "40px 20px",

              textAlign: "center",
            }}
          >
            <div>
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  margin: "0 auto 22px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background:
                    "rgba(201,168,76,.08)",

                  border:
                    "1px solid rgba(201,168,76,.25)",

                  color: "var(--gold)",
                }}
              >
                <Film size={28} />
              </div>

              <h1
                style={{
                  fontFamily:
                    '"Instrument Serif", Georgia, serif',

                  fontSize: "2.4rem",

                  fontWeight: 400,

                  marginBottom: 10,

                  color: "#eee",
                }}
              >
                Portfolio Not Found
              </h1>

              <p
                style={{
                  color: "#777",
                  maxWidth: 450,
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                {error ||
                  "This portfolio does not exist or is not currently published."}
              </p>

              <button
                className="pp-btn-gold"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* =====================================================
     DATA
  ===================================================== */

  const skills = portfolio.skills;

  const languages = portfolio.languages;

  const experiences =
    portfolio.experiences;

  const projects = portfolio.projects;

  const certifications =
    portfolio.certifications;

  const headshots =
    portfolio.headshots || [];

  const showreels =
    portfolio.showreels || [];

  const credits =
    portfolio.credits || [];

  const social =
    portfolio.socialLinks || {};

  const experienceCount =
    experiences.length;

  const projectCount =
    projects.length;

  const skillCount =
    skills.length;

  const rating =
    portfolio.completionPercentage > 0
      ? `${(
          portfolio.completionPercentage /
          20
        ).toFixed(1)}`
      : "—";

  /* =====================================================
     PRIVACY
  ===================================================== */

  const emailVisible =
    portfolio.privacyEmail !==
    "Private";

  const phoneVisible =
    portfolio.privacyPhone !==
    "Private";

  const resumeVisible =
    portfolio.privacyResume !==
    "Private";

  const projectsVisible =
    portfolio.privacyProjects !==
    "Private";

  /* =====================================================
     SKILLS
  ===================================================== */

  const displaySkills =
    skills.length > 0
      ? skills
      : portfolio.interests.map(
          (interest, index) => ({
            id: `interest-${index}`,
            name: interest,
          })
        );

  /* =====================================================
     SOCIAL LINKS
  ===================================================== */

  const socialLinks = [
    {
      key: "linkedin",
      value:
        social.linkedin ||
        portfolio.linkedin,
      label: "LinkedIn",
    },

    {
      key: "github",
      value:
        social.github ||
        portfolio.github,
      label: "GitHub",
    },

    {
      key: "instagram",
      value: social.instagram,
      label: "Instagram",
    },

    {
      key: "youtube",
      value: social.youtube,
      label: "YouTube",
    },
  ].filter(
    (item) => Boolean(item.value)
  );

  return (
    <>
      <style>{STYLES}</style>

      <div className="public-portfolio">

        {/* =================================================
            COVER
        ================================================= */}

        <div className="pp-cover">

          {portfolio.coverBannerUrl ? (
            <img
              src={portfolio.coverBannerUrl}
              alt=""
            />
          ) : null}

          <div className="pp-cover-grad" />

        </div>

        {/* =================================================
            IDENTITY
        ================================================= */}

        <div className="pp-identity">

          <div className="pp-avatar-wrap">

            {portfolio.profilePictureUrl ? (
              <img
                className="pp-avatar"
                src={
                  portfolio.profilePictureUrl
                }
                alt={
                  portfolio.fullName
                }
              />
            ) : (
              <div className="pp-avatar-placeholder">
                {portfolio.fullName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            )}

            {portfolio.isPublished && (
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

                {portfolio.fullName}

                {portfolio.completionPercentage >=
                  80 && (
                  <span className="pp-badge-pro">
                    <Sparkles size={11} />
                    Pro
                  </span>
                )}

              </div>

              <div className="pp-meta">

                <span className="pp-role-tag">
                  {portfolio.professionalTitle}
                </span>

                {portfolio.location && (
                  <>
                    <span className="pp-meta-dot">
                      ·
                    </span>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <MapPin size={13} />

                      {
                        portfolio.location
                      }
                    </span>
                  </>
                )}

                {experienceCount >
                  0 && (
                  <>
                    <span className="pp-meta-dot">
                      ·
                    </span>

                    <span>
                      {experienceCount}{" "}
                      {experienceCount ===
                      1
                        ? "role"
                        : "roles"}
                    </span>
                  </>
                )}

              </div>

            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="pp-actions">

              <button
                className={`pp-btn-follow${
                  following
                    ? " following"
                    : ""
                }`}
                onClick={() =>
                  setFollowing(
                    (value) => !value
                  )
                }
              >
                {following
                  ? "Following"
                  : "Follow"}
              </button>

              {emailVisible &&
                portfolio.email && (
                  <a
                    className="pp-btn-secondary"
                    href={`mailto:${portfolio.email}`}
                    style={{
                      textDecoration:
                        "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <Mail size={15} />
                    Message
                  </a>
                )}

              <button
                className="pp-btn-secondary"
                onClick={() =>
                  window.print()
                }
              >
                Save Profile
              </button>

            </div>

          </div>

          {/* =================================================
              SKILL CHIPS
          ================================================= */}

          {displaySkills.length >
            0 && (
            <div className="pp-chips">

              {displaySkills
                .slice(0, 10)
                .map((skill) => (
                  <span
                    key={
                      skill.id ||
                      skill.name
                    }
                    className="pp-chip"
                  >
                    {skill.name}
                  </span>
                ))}

            </div>
          )}

          {/* =================================================
              STATS
          ================================================= */}

          <div className="pp-stats">

            <div className="pp-stat">
              <span className="pp-stat-val">
                {experienceCount}
              </span>

              <span className="pp-stat-lab">
                Experience
              </span>
            </div>

            <div className="pp-stat">
              <span className="pp-stat-val">
                {projectCount}
              </span>

              <span className="pp-stat-lab">
                Projects
              </span>
            </div>

            <div className="pp-stat">
              <span className="pp-stat-val">
                {skillCount}
              </span>

              <span className="pp-stat-lab">
                Skills
              </span>
            </div>

            <div className="pp-stat">
              <span className="pp-stat-val">
                {rating}
              </span>

              <span className="pp-stat-lab">
                Profile Score
              </span>
            </div>

          </div>

          {/* =================================================
              TABS
          ================================================= */}

          <div className="pp-tabs">

            {(
              [
                "Portfolio",
                "Credits",
                "About",
              ] as const
            ).map((item) => (
              <button
                key={item}
                className={`pp-tab${
                  tab === item
                    ? " active"
                    : ""
                }`}
                onClick={() =>
                  setTab(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="pp-body">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="pp-sidebar">

            {/* =================================================
                ABOUT
            ================================================= */}

            {portfolio.bio && (
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
                    {portfolio.bio}
                  </p>

                </div>

              </div>
            )}

            {/* =================================================
                PHYSICAL ATTRIBUTES
            ================================================= */}

            {(portfolio.height ||
              portfolio.weight ||
              portfolio.age ||
              portfolio.gender ||
              portfolio.eyeColor ||
              portfolio.hairColor ||
              portfolio.skinTone ||
              portfolio.build) && (
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

                    {portfolio.height && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Height
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.height
                          }
                        </span>
                      </div>
                    )}

                    {portfolio.weight && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Weight
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.weight
                          }
                        </span>
                      </div>
                    )}

                    {portfolio.age && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Age
                        </span>

                        <span className="pp-attr-val">
                          {portfolio.age} yrs
                        </span>
                      </div>
                    )}

                    {portfolio.gender && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Gender
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.gender
                          }
                        </span>
                      </div>
                    )}

                    {portfolio.eyeColor && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Eye Color
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.eyeColor
                          }
                        </span>
                      </div>
                    )}

                    {portfolio.hairColor && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Hair Color
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.hairColor
                          }
                        </span>
                      </div>
                    )}

                    {portfolio.skinTone && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Skin Tone
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.skinTone
                          }
                        </span>
                      </div>
                    )}

                    {portfolio.build && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Build
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.build
                          }
                        </span>
                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* =================================================
                LANGUAGES
            ================================================= */}

            {languages.length >
              0 && (
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

                  <div className="pp-langs">

                    {languages.map(
                      (language) => (
                        <span
                          key={
                            language.id ||
                            language.name
                          }
                          className="pp-lang"
                        >
                          {
                            language.name
                          }
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* =================================================
                CONTACT
            ================================================= */}

            {(emailVisible &&
              portfolio.email) ||
            (phoneVisible &&
              portfolio.phone) ||
            portfolio.website ||
            socialLinks.length >
              0 ? (
              <div className="pp-card">

                <div className="pp-card-head">

                  <span className="pp-card-title">

                    <span className="pp-card-icon">
                      <Link2 size={17} />
                    </span>

                    Connect

                  </span>

                </div>

                <div className="pp-card-body">

                  <div className="pp-contact-links">

                    {emailVisible &&
                      portfolio.email && (
                        <a
                          className="pp-contact-link"
                          href={`mailto:${portfolio.email}`}
                        >
                          <Mail size={15} />

                          {
                            portfolio.email
                          }
                        </a>
                      )}

                    {phoneVisible &&
                      portfolio.phone && (
                        <a
                          className="pp-contact-link"
                          href={`tel:${portfolio.phone}`}
                        >
                          <Phone size={15} />

                          {
                            portfolio.phone
                          }
                        </a>
                      )}

                    {portfolio.website && (
                      <a
                        className="pp-contact-link"
                        href={safeExternalUrl(
                          portfolio.website
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink
                          size={15}
                        />

                        Website
                      </a>
                    )}

                    {socialLinks.map(
                      ({
                        key,
                        value,
                        label,
                      }) => {
                        const url =
                          safeExternalUrl(
                            value
                          );

                        if (!url)
                          return null;

                        return (
                          <a
                            key={key}
                            className="pp-contact-link"
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                          >

                            {label}
                          </a>
                        );
                      }
                    )}

                  </div>

                </div>

              </div>
            ) : null}

          </aside>

          {/* =================================================
              MAIN
          ================================================= */}

          <main className="pp-main">

            {/* =================================================
                PORTFOLIO TAB
            ================================================= */}

            {tab ===
              "Portfolio" && (
              <>

                {/* =================================================
                    HEADSHOTS
                ================================================= */}

                {(headshots.length >
                  0 ||
                  portfolio.profilePictureUrl) && (
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

                      <div className="pp-headshots">

                        {headshots.length >
                        0 ? (
                          headshots.map(
                            (
                              src,
                              index
                            ) => (
                              <div
                                key={`${src}-${index}`}
                                className="pp-headshot"
                                onClick={() =>
                                  setLightbox(
                                    src
                                  )
                                }
                              >
                                <img
                                  src={src}
                                  alt={`Headshot ${
                                    index +
                                    1
                                  }`}
                                />
                              </div>
                            )
                          )
                        ) : portfolio.profilePictureUrl ? (
                          <div
                            className="pp-headshot"
                            onClick={() =>
                              setLightbox(
                                portfolio.profilePictureUrl!
                              )
                            }
                          >
                            <img
                              src={
                                portfolio.profilePictureUrl
                              }
                              alt={
                                portfolio.fullName
                              }
                            />
                          </div>
                        ) : null}

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                    SHOWREELS
                ================================================= */}

                {showreels.length >
                  0 && (
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

                      <div className="pp-reels">

                        {showreels.map(
                          (
                            reel,
                            index
                          ) => {
                            const thumbnail =
                              reel.thumbnailUrl ||
                              reel.thumb;

                            return (
                              <div
                                key={
                                  reel.id ||
                                  index
                                }
                                className="pp-reel"
                                onClick={() => {
                                  if (
                                    reel.url
                                  ) {
                                    const url =
                                      safeExternalUrl(
                                        reel.url
                                      );

                                    if (
                                      url
                                    ) {
                                      window.open(
                                        url,
                                        "_blank",
                                        "noopener,noreferrer"
                                      );
                                    }
                                  }
                                }}
                              >

                                <div className="pp-reel-thumb">

                                  {thumbnail && (
                                    <img
                                      src={
                                        thumbnail
                                      }
                                      alt={
                                        reel.title
                                      }
                                    />
                                  )}

                                  <div className="pp-reel-play">

                                    <Play
                                      size={
                                        16
                                      }
                                      fill="white"
                                    />

                                  </div>

                                </div>

                                <div>

                                  <div className="pp-reel-title">
                                    {
                                      reel.title
                                    }
                                  </div>

                                  <div className="pp-reel-sub">
                                    {reel.url
                                      ? "Click to play"
                                      : "Showreel"}
                                  </div>

                                </div>

                              </div>
                            );
                          }
                        )}

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                    EXPERIENCE
                ================================================= */}

                {experiences.length >
                  0 && (
                  <div className="pp-card">

                    <div className="pp-card-head">

                      <span className="pp-card-title">

                        <span className="pp-card-icon">
                          <Briefcase
                            size={17}
                          />
                        </span>

                        Experience

                      </span>

                    </div>

                    <div className="pp-card-body">

                      <div className="pp-credits">

                        {experiences.map(
                          (
                            experience,
                            index
                          ) => (
                            <div
                              key={
                                experience.id ||
                                index
                              }
                              className="pp-credit-row"
                            >

                              <div>

                                <div className="pp-credit-title">
                                  {
                                    experience.role ||
                                    "Professional Role"
                                  }
                                </div>

                                <div className="pp-credit-sub">

                                  {
                                    experience.company ||
                                    ""
                                  }

                                  {experience
                                    .startDate && (
                                    <>
                                      {" "}
                                      ·{" "}
                                      {
                                        experience.startDate
                                      }
                                    </>
                                  )}

                                  {experience
                                    .endDate && (
                                    <>
                                      {" "}
                                      –{" "}
                                      {
                                        experience.endDate
                                      }
                                    </>
                                  )}

                                </div>

                                {experience.description && (
                                  <div
                                    style={{
                                      marginTop:
                                        8,
                                      fontSize:
                                        ".8rem",
                                      color:
                                        "#777",
                                      lineHeight:
                                        1.6,
                                    }}
                                  >
                                    {
                                      experience.description
                                    }
                                  </div>
                                )}

                              </div>

                              {experience.employmentType && (
                                <span className="pp-badge">
                                  {
                                    experience.employmentType
                                  }
                                </span>
                              )}

                            </div>
                          )
                        )}

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                    PROJECTS
                ================================================= */}

                {projectsVisible &&
                  projects.length >
                    0 && (
                  <div className="pp-card">

                    <div className="pp-card-head">

                      <span className="pp-card-title">

                        <span className="pp-card-icon">
                          <Film size={17} />
                        </span>

                        Projects

                      </span>

                    </div>

                    <div className="pp-card-body">

                      <div className="pp-projects">

                        {projects.map(
                          (
                            project,
                            index
                          ) => (
                            <div
                              key={
                                project.id ||
                                index
                              }
                              className="pp-project"
                            >

                              {project
                                .images &&
                                project
                                  .images[0] && (
                                  <div className="pp-project-image">

                                    <img
                                      src={
                                        project
                                          .images[0]
                                      }
                                      alt={
                                        project.title ||
                                        "Project"
                                      }
                                    />

                                  </div>
                                )}

                              <div className="pp-project-content">

                                <div className="pp-project-title">
                                  {
                                    project.title
                                  }
                                </div>

                                {project.description && (
                                  <div className="pp-project-description">
                                    {
                                      project.description
                                    }
                                  </div>
                                )}

                                {(project.githubLink ||
                                  project.liveDemoLink) && (
                                  <div className="pp-project-links">

                                    {project.githubLink && (
                                      <a
                                        href={safeExternalUrl(
                                          project.githubLink
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                      
                                        GitHub
                                      </a>
                                    )}

                                    {project.liveDemoLink && (
                                      <a
                                        href={safeExternalUrl(
                                          project.liveDemoLink
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <ExternalLink
                                          size={
                                            14
                                          }
                                        />
                                        Live
                                      </a>
                                    )}

                                  </div>
                                )}

                              </div>

                            </div>
                          )
                        )}

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                    EDUCATION
                ================================================= */}

                {portfolio.education
                  .length >
                  0 && (
                  <div className="pp-card">

                    <div className="pp-card-head">

                      <span className="pp-card-title">

                        <span className="pp-card-icon">
                          <Briefcase
                            size={17}
                          />
                        </span>

                        Education

                      </span>

                    </div>

                    <div className="pp-card-body">

                      <div className="pp-credits">

                        {portfolio.education.map(
                          (
                            education,
                            index
                          ) => (
                            <div
                              key={
                                education.id ||
                                index
                              }
                              className="pp-credit-row"
                            >

                              <div>

                                <div className="pp-credit-title">
                                  {
                                    education.degree
                                  }

                                  {education
                                    .specialization &&
                                    ` — ${education.specialization}`}
                                </div>

                                <div className="pp-credit-sub">
                                  {
                                    education.institution
                                  }

                                  {education
                                    .startYear && (
                                    <>
                                      {" "}
                                      ·{" "}
                                      {
                                        education.startYear
                                      }
                                    </>
                                  )}

                                  {education
                                    .endYear && (
                                    <>
                                      {" "}
                                      –{" "}
                                      {
                                        education.endYear
                                      }
                                    </>
                                  )}
                                </div>

                              </div>

                              {education.score && (
                                <span className="pp-badge">
                                  {
                                    education.score
                                  }
                                </span>
                              )}

                            </div>
                          )
                        )}

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                    CERTIFICATIONS
                ================================================= */}

                {certifications.length >
                  0 && (
                  <div className="pp-card">

                    <div className="pp-card-head">

                      <span className="pp-card-title">

                        <span className="pp-card-icon">
                          <Star
                            size={17}
                          />
                        </span>

                        Certifications

                      </span>

                    </div>

                    <div className="pp-card-body">

                      <div className="pp-credits">

                        {certifications.map(
                          (
                            certification,
                            index
                          ) => (
                            <div
                              key={
                                certification.id ||
                                index
                              }
                              className="pp-credit-row"
                            >

                              <div>

                                <div className="pp-credit-title">
                                  {
                                    certification.name
                                  }
                                </div>

                                <div className="pp-credit-sub">
                                  {
                                    certification.organization
                                  }

                                  {certification
                                    .issueDate &&
                                    ` · ${certification.issueDate}`}
                                </div>

                              </div>

                              <span className="pp-badge">
                                Certified
                              </span>

                            </div>
                          )
                        )}

                      </div>

                    </div>

                  </div>
                )}

              </>
            )}

            {/* =================================================
                CREDITS TAB
            ================================================= */}

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

                  {credits.length >
                  0 ? (
                    <div className="pp-credits">

                      {credits.map(
                        (
                          credit,
                          index
                        ) => (
                          <div
                            key={
                              credit.id ||
                              index
                            }
                            className="pp-credit-row"
                          >

                            <div>

                              <div className="pp-credit-title">
                                {
                                  credit.title
                                }
                              </div>

                              <div className="pp-credit-sub">

                                {
                                  credit.role ||
                                  ""
                                }

                                {credit.year &&
                                  ` · ${credit.year}`}

                              </div>

                            </div>

                            {credit.type && (
                              <span className="pp-badge">
                                {
                                  credit.type
                                }
                              </span>
                            )}

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

            {/* =================================================
                ABOUT TAB
            ================================================= */}

            {tab === "About" && (
              <div className="pp-card">

                <div className="pp-card-head">

                  <span className="pp-card-title">

                    <span className="pp-card-icon">
                      <Sparkles
                        size={17}
                      />
                    </span>

                    Full Bio

                  </span>

                </div>

                <div className="pp-card-body">

                  {portfolio.bio ? (
                    <p
                      className="pp-about-text"
                      style={{
                        lineHeight: 1.9,
                      }}
                    >
                      {
                        portfolio.bio
                      }
                    </p>
                  ) : (
                    <div className="pp-empty">
                      No biography added yet.
                    </div>
                  )}

                  <div className="pp-divider" />

                  <div className="pp-attrs">

                    <div className="pp-attr-row">
                      <span className="pp-attr-key">
                        Name
                      </span>

                      <span className="pp-attr-val">
                        {
                          portfolio.fullName
                        }
                      </span>
                    </div>

                    <div className="pp-attr-row">
                      <span className="pp-attr-key">
                        Primary Role
                      </span>

                      <span className="pp-attr-val">
                        {
                          portfolio.professionalTitle
                        }
                      </span>
                    </div>

                    {portfolio.location && (
                      <div className="pp-attr-row">
                        <span className="pp-attr-key">
                          Based in
                        </span>

                        <span className="pp-attr-val">
                          {
                            portfolio.location
                          }
                        </span>
                      </div>
                    )}

                    <div className="pp-attr-row">
                      <span className="pp-attr-key">
                        Profile Completion
                      </span>

                      <span className="pp-attr-val">
                        {
                          portfolio.completionPercentage
                        }%
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </main>

        </div>

        {/* =================================================
            LIGHTBOX
        ================================================= */}

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
              ×
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

      </div>
    </>
  );
}