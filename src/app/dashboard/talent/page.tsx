"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type CastingCall = {
  id: number;
  category: string;
  title: string;
  role: string;
  location: string;
  budget: string;
  deadline: string;
  match: number;
};

type Activity = {
  id: number;
  type: string;
  title: string;
  company: string;
  time: string;
};

const CASTING_CALLS: CastingCall[] = [
  {
    id: 1,
    category: "OTT SERIES",
    title: "The Last Summer",
    role: "Supporting Actor",
    location: "Mumbai",
    budget: "₹30K – ₹50K",
    deadline: "2 days left",
    match: 94,
  },
  {
    id: 2,
    category: "COMMERCIAL",
    title: "Summer Campaign",
    role: "Female Model",
    location: "Delhi",
    budget: "₹20K – ₹35K",
    deadline: "5 days left",
    match: 89,
  },
  {
    id: 3,
    category: "WEB SERIES",
    title: "Between Two Worlds",
    role: "Lead Actor",
    location: "Mumbai",
    budget: "₹45K – ₹70K",
    deadline: "7 days left",
    match: 86,
  },
  {
    id: 4,
    category: "FASHION",
    title: "Autumn Collection",
    role: "Editorial Model",
    location: "Bengaluru",
    budget: "₹25K – ₹40K",
    deadline: "9 days left",
    match: 82,
  },
];

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: "SHORTLISTED",
    title: "The Last Summer",
    company: "Northstar Studios",
    time: "Today · 10:42 AM",
  },
  {
    id: 2,
    type: "APPLICATION",
    title: "Summer Campaign",
    company: "Framehouse Media",
    time: "Yesterday · 4:18 PM",
  },
  {
    id: 3,
    type: "PROFILE VIEW",
    title: "Your profile was viewed",
    company: "Blue Door Productions",
    time: "Yesterday · 1:06 PM",
  },
  {
    id: 4,
    type: "APPLICATION",
    title: "Between Two Worlds",
    company: "Indie Motion",
    time: "3 days ago",
  },
];

const STATS = [
  { value: 14, label: "Applications" },
  { value: 7, label: "Profile Views" },
  { value: 3, label: "Shortlisted" },
  { value: 2, label: "Messages" },
];

export default function TalentDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [profileStrength] = useState(82);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [userName, setUserName] = useState("Aahana");

  const statsRef = useRef<HTMLDivElement>(null);

  /*
   * ---------------------------------------------------------
   * THEME
   * Uses the same html.dark system as your existing header.
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const updateTheme = () => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /*
   * ---------------------------------------------------------
   * USER NAME
   * Tries to read the logged-in user's name from localStorage.
   * Falls back to Aahana.
   * ---------------------------------------------------------
   */
  useEffect(() => {
    try {
      const possibleKeys = [
        "user",
        "currentUser",
        "loggedInUser",
        "indcastingUser",
      ];

      for (const key of possibleKeys) {
        const saved = localStorage.getItem(key);

        if (!saved) continue;

        try {
          const parsed = JSON.parse(saved);

          if (parsed?.name) {
            setUserName(parsed.name.split(" ")[0]);
            break;
          }
        } catch {
          if (saved.trim()) {
            setUserName(saved.trim().split(" ")[0]);
            break;
          }
        }
      }
    } catch {
      // Keep fallback name.
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * STAT COUNT-UP
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const element = statsRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const duration = 900;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const eased = 1 - Math.pow(1 - progress, 3);

          setAnimatedStats(
            STATS.map((stat) => Math.round(stat.value * eased))
          );

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /*
   * ---------------------------------------------------------
   * MAGNETIC BUTTON EFFECT
   * ---------------------------------------------------------
   */
  const handleMagneticMove = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    const x =
      (event.clientX - rect.left - rect.width / 2) * 0.12;

    const y =
      (event.clientY - rect.top - rect.height / 2) * 0.12;

    element.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMagneticLeave = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <>
      <style>{`
        /* =====================================================
           ROOT
        ===================================================== */

        .talent-dashboard {
          --td-bg: #fffdf7;
          --td-surface: #ffffff;
          --td-surface-soft: #f7f4ec;
          --td-text: #11100f;
          --td-muted: #77716a;
          --td-border: #e7e1d5;
          --td-gold: #c9a84c;
          --td-gold-dark: #a98732;
          --td-shadow: rgba(20, 18, 12, 0.07);

          min-height: 100vh;
          background: var(--td-bg);
          color: var(--td-text);
          transition:
            background 0.35s ease,
            color 0.35s ease;
          overflow-x: hidden;
        }

        .talent-dashboard.dark {
          --td-bg: #0b0b0b;
          --td-surface: #141414;
          --td-surface-soft: #181818;
          --td-text: #f3f1ec;
          --td-muted: #98938b;
          --td-border: #292929;
          --td-gold: #d4af37;
          --td-gold-dark: #b99126;
          --td-shadow: rgba(0, 0, 0, 0.35);
        }

        .td-container {
          width: min(1380px, calc(100% - 64px));
          margin: 0 auto;
        }

        /* =====================================================
           AMBIENT BACKGROUND
        ===================================================== */

        .td-ambient {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .td-ambient::before {
          content: "";
          position: absolute;
          width: 650px;
          height: 650px;
          top: -300px;
          right: -180px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(201,168,76,0.13) 0%,
              rgba(201,168,76,0.045) 35%,
              transparent 70%
            );
          filter: blur(20px);
          animation: ambientFloat 12s ease-in-out infinite alternate;
        }

        .td-ambient::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          left: -250px;
          bottom: 5%;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(201,168,76,0.07) 0%,
              transparent 70%
            );
          filter: blur(25px);
          animation: ambientFloatReverse 15s ease-in-out infinite alternate;
        }

        @keyframes ambientFloat {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-45px, 30px, 0);
          }
        }

        @keyframes ambientFloatReverse {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(35px, -25px, 0);
          }
        }

        /* =====================================================
           MAIN CONTENT
        ===================================================== */

        .td-main {
          position: relative;
          z-index: 2;
          padding-top: 110px;
          padding-bottom: 90px;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .td-hero {
          position: relative;
          min-height: 270px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 50px;
          padding: 42px 0 48px;
        }

        .td-hero::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: var(--td-border);
        }

        .td-eyebrow {
          margin: 0 0 18px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--td-gold);
          animation: revealLeft 0.8s ease both;
        }

        .td-hero-title {
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -0.045em;
          animation: revealUp 0.9s 0.08s ease both;
        }

        .td-hero-title span {
          color: var(--td-muted);
          font-style: italic;
        }

        .td-hero-description {
          max-width: 510px;
          margin: 22px 0 0;
          color: var(--td-muted);
          font-size: 15px;
          line-height: 1.75;
          animation: revealUp 0.9s 0.18s ease both;
        }

        .td-profile-strength {
          width: 260px;
          flex-shrink: 0;
          padding: 25px 0 3px;
          animation: revealRight 0.9s 0.15s ease both;
        }

        .td-profile-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 13px;
        }

        .td-profile-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--td-muted);
        }

        .td-profile-number {
          font-size: 35px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.04em;
        }

        .td-progress {
          height: 3px;
          width: 100%;
          background: var(--td-border);
          overflow: hidden;
        }

        .td-progress-fill {
          height: 100%;
          width: ${profileStrength}%;
          background: var(--td-gold);
          transform-origin: left;
          animation: progressReveal 1.2s 0.5s cubic-bezier(.22,1,.36,1) both;
        }

        .td-profile-link {
          display: inline-block;
          margin-top: 14px;
          color: var(--td-text);
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          border-bottom: 1px solid var(--td-text);
          padding-bottom: 2px;
          transition:
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .td-profile-link:hover {
          color: var(--td-gold);
          border-color: var(--td-gold);
        }

        /* =====================================================
           MONTHLY STATS
        ===================================================== */

        .td-section {
          padding-top: 58px;
        }

        .td-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .td-section-kicker {
          margin: 0 0 7px;
          color: var(--td-gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .td-section-title {
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 38px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.025em;
        }

        .td-section-note {
          color: var(--td-muted);
          font-size: 12px;
        }

        .td-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--td-border);
          border-bottom: 1px solid var(--td-border);
        }

        .td-stat {
          position: relative;
          padding: 28px 30px 30px 0;
          border-right: 1px solid var(--td-border);
          overflow: hidden;
        }

        .td-stat:not(:first-child) {
          padding-left: 30px;
        }

        .td-stat:last-child {
          border-right: none;
        }

        .td-stat::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: var(--td-gold);
          transition: width 0.45s cubic-bezier(.22,1,.36,1);
        }

        .td-stat:hover::after {
          width: 100%;
        }

        .td-stat-number {
          display: block;
          margin-bottom: 8px;
          font-size: clamp(42px, 5vw, 64px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 400;
        }

        .td-stat-label {
          color: var(--td-muted);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* =====================================================
           SPOTLIGHT CARDS
        ===================================================== */

        .td-casting-list {
          display: grid;
          gap: 12px;
        }

        .td-casting-card {
          --mouse-x: 50%;
          --mouse-y: 50%;

          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 110px minmax(220px, 1fr) 160px 130px 120px;
          align-items: center;
          min-height: 150px;
          padding: 25px 28px;
          border: 1px solid var(--td-border);
          border-radius: 22px;
          background: var(--td-surface);
          text-decoration: none;
          color: var(--td-text);
          transition:
            transform 0.4s cubic-bezier(.22,1,.36,1),
            border-color 0.3s ease,
            box-shadow 0.4s ease;
          animation: cardReveal 0.8s both;
        }

        .td-casting-card:nth-child(1) {
          animation-delay: 0.05s;
        }

        .td-casting-card:nth-child(2) {
          animation-delay: 0.12s;
        }

        .td-casting-card:nth-child(3) {
          animation-delay: 0.19s;
        }

        .td-casting-card:nth-child(4) {
          animation-delay: 0.26s;
        }

        .td-casting-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(
              350px circle at var(--mouse-x) var(--mouse-y),
              rgba(201,168,76,0.12),
              transparent 65%
            );
          transition: opacity 0.3s ease;
        }

        .td-casting-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,168,76,0.5);
          box-shadow:
            0 18px 45px var(--td-shadow),
            0 0 0 1px rgba(201,168,76,0.05);
        }

        .td-casting-card:hover::before {
          opacity: 1;
        }

        .td-card-category {
          position: relative;
          z-index: 1;
          align-self: start;
          padding-top: 4px;
          color: var(--td-gold);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .td-card-title-block {
          position: relative;
          z-index: 1;
        }

        .td-card-title {
          margin: 0 0 7px;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 31px;
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .td-card-role {
          margin: 0;
          color: var(--td-muted);
          font-size: 13px;
        }

        .td-card-location {
          position: relative;
          z-index: 1;
        }

        .td-card-small-label {
          display: block;
          margin-bottom: 6px;
          color: var(--td-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .td-card-value {
          font-size: 13px;
          font-weight: 500;
        }

        .td-card-budget {
          position: relative;
          z-index: 1;
        }

        .td-card-match {
          position: relative;
          z-index: 1;
          text-align: right;
        }

        .td-match-number {
          display: block;
          margin-bottom: 7px;
          color: var(--td-gold);
          font-size: 18px;
          font-weight: 500;
        }

        .td-match-label {
          display: block;
          color: var(--td-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .td-card-apply {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 13px;
          color: var(--td-text);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition:
            gap 0.3s ease,
            color 0.3s ease;
        }

        .td-casting-card:hover .td-card-apply {
          gap: 14px;
          color: var(--td-gold);
        }

        /* =====================================================
           RECOMMENDED
        ===================================================== */

        .td-recommendations {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .td-recommendation {
          position: relative;
          min-height: 125px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          border: 1px solid var(--td-border);
          border-radius: 18px;
          background: var(--td-surface);
          text-decoration: none;
          color: var(--td-text);
          overflow: hidden;
          transition:
            transform 0.35s cubic-bezier(.22,1,.36,1),
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .td-recommendation::before {
          content: "";
          position: absolute;
          top: -50px;
          right: -50px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: rgba(201,168,76,0.08);
          filter: blur(18px);
          transition: transform 0.4s ease;
        }

        .td-recommendation:hover {
          transform: translateY(-5px);
          border-color: rgba(201,168,76,0.4);
        }

        .td-recommendation:hover::before {
          transform: scale(1.5);
        }

        .td-recommendation-number {
          position: absolute;
          top: 18px;
          right: 18px;
          color: var(--td-muted);
          font-size: 10px;
        }

        .td-recommendation-title {
          position: relative;
          z-index: 1;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 25px;
        }

        .td-recommendation-sub {
          position: relative;
          z-index: 1;
          margin-top: 5px;
          color: var(--td-muted);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* =====================================================
           ACTIVITY
        ===================================================== */

        .td-bottom-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 70px;
        }

        .td-activity {
          border-top: 1px solid var(--td-border);
        }

        .td-activity-item {
          position: relative;
          display: grid;
          grid-template-columns: 14px 1fr auto;
          gap: 18px;
          align-items: start;
          padding: 23px 0;
          border-bottom: 1px solid var(--td-border);
          animation: revealUp 0.6s both;
        }

        .td-activity-dot {
          width: 7px;
          height: 7px;
          margin-top: 6px;
          border-radius: 50%;
          background: var(--td-gold);
          box-shadow: 0 0 0 5px rgba(201,168,76,0.08);
        }

        .td-activity-type {
          margin-bottom: 5px;
          color: var(--td-gold);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .td-activity-title {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
        }

        .td-activity-company {
          margin-top: 4px;
          color: var(--td-muted);
          font-size: 12px;
        }

        .td-activity-time {
          color: var(--td-muted);
          font-size: 10px;
          white-space: nowrap;
        }

        /* =====================================================
           QUICK ACTIONS
        ===================================================== */

        .td-actions {
          border-top: 1px solid var(--td-border);
        }

        .td-action {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 67px;
          border-bottom: 1px solid var(--td-border);
          color: var(--td-text);
          text-decoration: none;
          transition:
            color 0.3s ease,
            padding 0.35s ease;
        }

        .td-action::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 1px;
          background: var(--td-gold);
          transition: width 0.4s cubic-bezier(.22,1,.36,1);
        }

        .td-action:hover {
          padding-left: 8px;
          color: var(--td-gold);
        }

        .td-action:hover::after {
          width: 100%;
        }

        .td-action-title {
          font-size: 13px;
          font-weight: 600;
        }

        .td-action-arrow {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .td-action:hover .td-action-arrow {
          transform: translateX(5px);
        }

        /* =====================================================
           CTA
        ===================================================== */

        .td-cta {
          position: relative;
          overflow: hidden;
          margin-top: 70px;
          padding: 55px 60px;
          border: 1px solid var(--td-border);
          border-radius: 28px;
          background:
            linear-gradient(
              115deg,
              var(--td-surface) 0%,
              var(--td-surface-soft) 100%
            );
        }

        .td-cta::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          right: -100px;
          top: -130px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(201,168,76,0.13),
              transparent 68%
            );
          filter: blur(15px);
        }

        .td-cta-content {
          position: relative;
          z-index: 1;
          max-width: 680px;
        }

        .td-cta-title {
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .td-cta-text {
          margin: 15px 0 25px;
          color: var(--td-muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .td-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 170px;
          padding: 14px 22px;
          border-radius: 999px;
          background: var(--td-text);
          color: var(--td-bg);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }

        .td-cta-button:hover {
          background: var(--td-gold);
          color: #111;
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes revealUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes revealLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes revealRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressReveal {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {
          .td-casting-card {
            grid-template-columns:
              100px
              minmax(180px, 1fr)
              130px
              120px;
          }

          .td-card-match {
            display: none;
          }

          .td-recommendations {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 850px) {
          .td-container {
            width: min(100% - 36px, 700px);
          }

          .td-main {
            padding-top: 92px;
          }

          .td-hero {
            min-height: auto;
            align-items: flex-start;
            flex-direction: column;
            padding: 35px 0 40px;
          }

          .td-profile-strength {
            width: 100%;
          }

          .td-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .td-stat:nth-child(2) {
            border-right: none;
          }

          .td-stat:nth-child(3),
          .td-stat:nth-child(4) {
            border-top: 1px solid var(--td-border);
          }

          .td-casting-card {
            grid-template-columns: 1fr auto;
            gap: 20px;
          }

          .td-card-category {
            grid-column: 1 / -1;
          }

          .td-card-location,
          .td-card-budget {
            display: none;
          }

          .td-card-match {
            display: block;
            grid-column: 2;
            grid-row: 2;
          }

          .td-card-title-block {
            grid-column: 1;
            grid-row: 2;
          }

          .td-card-match .td-card-apply {
            display: none;
          }

          .td-bottom-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .td-cta {
            padding: 42px 30px;
          }
        }

        @media (max-width: 560px) {
          .td-container {
            width: calc(100% - 28px);
          }

          .td-hero-title {
            font-size: 52px;
          }

          .td-section-title {
            font-size: 32px;
          }

          .td-section-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .td-stats {
            grid-template-columns: 1fr 1fr;
          }

          .td-stat {
            padding: 22px 16px;
          }

          .td-stat:not(:first-child) {
            padding-left: 16px;
          }

          .td-stat-number {
            font-size: 42px;
          }

          .td-recommendations {
            grid-template-columns: 1fr 1fr;
          }

          .td-recommendation {
            min-height: 110px;
          }

          .td-casting-card {
            padding: 21px;
            border-radius: 18px;
          }

          .td-card-title {
            font-size: 27px;
          }

          .td-activity-item {
            grid-template-columns: 10px 1fr;
          }

          .td-activity-time {
            grid-column: 2;
          }

          .td-cta {
            margin-top: 55px;
            padding: 35px 24px;
            border-radius: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .td-ambient::before,
          .td-ambient::after,
          .td-eyebrow,
          .td-hero-title,
          .td-hero-description,
          .td-profile-strength,
          .td-progress-fill,
          .td-casting-card,
          .td-activity-item {
            animation: none !important;
          }

          .td-casting-card,
          .td-action,
          .td-recommendation {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className={`talent-dashboard ${darkMode ? "dark" : ""}`}
      >
        {/* Ambient background */}
        <div className="td-ambient" aria-hidden="true" />

        <main className="td-main">
          <div className="td-container">

            {/* =================================================
                HERO
            ================================================= */}

            <section className="td-hero">
              <div>
                <p className="td-eyebrow">
                  Talent Dashboard
                </p>

                <h1 className="td-hero-title">
                  Good afternoon,{" "}
                  <span>{userName}.</span>
                </h1>

                <p className="td-hero-description">
                  Your talent profile is getting noticed.
                  Explore new opportunities, keep track of
                  your applications, and stay ready for what
                  comes next.
                </p>
              </div>

              <div className="td-profile-strength">
                <div className="td-profile-top">
                  <span className="td-profile-label">
                    Profile strength
                  </span>

                  <span className="td-profile-number">
                    {profileStrength}%
                  </span>
                </div>

                <div className="td-progress">
                  <div className="td-progress-fill" />
                </div>

                <Link
                  href="/profile"
                  className="td-profile-link"
                >
                  Complete profile
                </Link>
              </div>
            </section>

            {/* =================================================
                MONTHLY STATS
            ================================================= */}

            <section className="td-section">
              <div className="td-section-heading">
                <div>
                  <p className="td-section-kicker">
                    Your activity
                  </p>

                  <h2 className="td-section-title">
                    This month
                  </h2>
                </div>

                <span className="td-section-note">
                  August 2026
                </span>
              </div>

              <div
                className="td-stats"
                ref={statsRef}
              >
                {STATS.map((stat, index) => (
                  <div
                    className="td-stat"
                    key={stat.label}
                  >
                    <span className="td-stat-number">
                      {animatedStats[index]}
                    </span>

                    <span className="td-stat-label">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* =================================================
                OPPORTUNITIES
            ================================================= */}

            <section className="td-section">
              <div className="td-section-heading">
                <div>
                  <p className="td-section-kicker">
                    Matched to your profile
                  </p>

                  <h2 className="td-section-title">
                    Opportunities
                  </h2>
                </div>

                <Link
                  href="/post"
                  className="td-profile-link"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  View all
                </Link>
              </div>

              <div className="td-casting-list">
                {CASTING_CALLS.map((call) => (
                  <Link
                    href={`/post/${call.id}`}
                    className="td-casting-card"
                    key={call.id}
                    onMouseMove={(event) => {
                      const rect =
                        event.currentTarget.getBoundingClientRect();

                      const x =
                        ((event.clientX - rect.left) /
                          rect.width) *
                        100;

                      const y =
                        ((event.clientY - rect.top) /
                          rect.height) *
                        100;

                      event.currentTarget.style.setProperty(
                        "--mouse-x",
                        `${x}%`
                      );

                      event.currentTarget.style.setProperty(
                        "--mouse-y",
                        `${y}%`
                      );
                    }}
                  >
                    <div className="td-card-category">
                      {call.category}
                    </div>

                    <div className="td-card-title-block">
                      <h3 className="td-card-title">
                        {call.title}
                      </h3>

                      <p className="td-card-role">
                        {call.role}
                      </p>

                      <span className="td-card-apply">
                        View opportunity →
                      </span>
                    </div>

                    <div className="td-card-location">
                      <span className="td-card-small-label">
                        Location
                      </span>

                      <span className="td-card-value">
                        {call.location}
                      </span>
                    </div>

                    <div className="td-card-budget">
                      <span className="td-card-small-label">
                        Budget
                      </span>

                      <span className="td-card-value">
                        {call.budget}
                      </span>
                    </div>

                    <div className="td-card-match">
                      <span className="td-match-number">
                        {call.match}%
                      </span>

                      <span className="td-match-label">
                        Profile match
                      </span>

                      <span
                        className="td-card-small-label"
                        style={{ marginTop: "10px" }}
                      >
                        {call.deadline}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* =================================================
                RECOMMENDED
            ================================================= */}

            <section className="td-section">
              <div className="td-section-heading">
                <div>
                  <p className="td-section-kicker">
                    Based on your profile
                  </p>

                  <h2 className="td-section-title">
                    Recommended for you
                  </h2>
                </div>
              </div>

              <div className="td-recommendations">
                {[
                  ["01", "Actor", "Film & OTT"],
                  ["02", "Model", "Fashion & Commercial"],
                  ["03", "Voice Artist", "Audio & Digital"],
                  ["04", "Commercial", "Brand Campaigns"],
                  ["05", "OTT", "Series & Streaming"],
                ].map(([number, title, subtitle]) => (
                  <Link
                    href="/post"
                    className="td-recommendation"
                    key={number}
                  >
                    <span className="td-recommendation-number">
                      {number}
                    </span>

                    <span className="td-recommendation-title">
                      {title}
                    </span>

                    <span className="td-recommendation-sub">
                      {subtitle}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* =================================================
                ACTIVITY + ACTIONS
            ================================================= */}

            <section className="td-section">
              <div className="td-bottom-grid">

                {/* Activity */}

                <div>
                  <div className="td-section-heading">
                    <div>
                      <p className="td-section-kicker">
                        Recent activity
                      </p>

                      <h2 className="td-section-title">
                        Application activity
                      </h2>
                    </div>
                  </div>

                  <div className="td-activity">
                    {ACTIVITIES.map((activity, index) => (
                      <div
                        className="td-activity-item"
                        key={activity.id}
                        style={{
                          animationDelay:
                            `${index * 0.08}s`,
                        }}
                      >
                        <span className="td-activity-dot" />

                        <div>
                          <div className="td-activity-type">
                            {activity.type}
                          </div>

                          <p className="td-activity-title">
                            {activity.title}
                          </p>

                          <div className="td-activity-company">
                            {activity.company}
                          </div>
                        </div>

                        <span className="td-activity-time">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}

                <div>
                  <div className="td-section-heading">
                    <div>
                      <p className="td-section-kicker">
                        Get things done
                      </p>

                      <h2 className="td-section-title">
                        Quick actions
                      </h2>
                    </div>
                  </div>

                  <div className="td-actions">
                    <Link
                      href="/profile"
                      className="td-action"
                    >
                      <span className="td-action-title">
                        Edit your profile
                      </span>

                      <span className="td-action-arrow">
                        →
                      </span>
                    </Link>

                    <Link
                      href="/post"
                      className="td-action"
                    >
                      <span className="td-action-title">
                        Explore casting calls
                      </span>

                      <span className="td-action-arrow">
                        →
                      </span>
                    </Link>

                    <Link
                      href="/messages"
                      className="td-action"
                    >
                      <span className="td-action-title">
                        View messages
                      </span>

                      <span className="td-action-arrow">
                        →
                      </span>
                    </Link>

                    <Link
                      href="/profile"
                      className="td-action"
                    >
                      <span className="td-action-title">
                        Update availability
                      </span>

                      <span className="td-action-arrow">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

              </div>
            </section>

            {/* =================================================
                BOTTOM CTA
            ================================================= */}

            <section className="td-cta">
              <div className="td-cta-content">
                <h2 className="td-cta-title">
                  Make your next opportunity
                  <br />
                  easier to find.
                </h2>

                <p className="td-cta-text">
                  Keep your profile current, showcase your
                  strongest work, and make sure you're visible
                  when the right casting call arrives.
                </p>

                <Link
                  href="/profile"
                  className="td-cta-button"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  Improve your profile
                </Link>
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
}