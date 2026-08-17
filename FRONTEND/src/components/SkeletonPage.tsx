"use client";

import { useEffect, useState } from "react";

/**
 * SkeletonPage
 *
 * Drop-in skeleton loader for the IndCasting home page.
 * Mirrors every section of page.tsx exactly:
 *   Header space → Hero → Categories → Tiles → How it works → Pillars → CTA
 *
 * Usage in page.tsx:
 *   import SkeletonPage from "@/components/SkeletonPage";
 *   ...
 *   {isSkeletonLoading && <SkeletonPage />}
 *
 * Or with fade-out (current pattern):
 *   <SkeletonPage visible={isSkeletonLoading} />
 */

interface SkeletonPageProps {
  /** When false the skeleton fades out and becomes inert. Default: true */
  visible?: boolean;
}

export default function SkeletonPage({ visible = true }: SkeletonPageProps) {
  return (
    <>
      <style>{SKELETON_CSS}</style>

      <div
        className={`sk-root${visible ? "" : " sk-hidden"}`}
        aria-hidden={!visible}
        role="presentation"
      >
        {/* ── HEADER SPACE ── */}
        <div className="sk-header-bar" />

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="sk-hero">
          <div className="sk-hero-bg sk-shine" />
          <div className="sk-hero-content">
            {/* INDCASTING.IN — SINCE 2026  (monospace scramble line) */}
            <div className="sk-hero-kicker sk-shine" />
            {/* India's Premium Casting Platform */}
            <div className="sk-hero-eyebrow sk-shine" />
            {/* Main headline */}
            <div className="sk-hero-title sk-shine" />
            {/* Sub paragraph */}
            <div className="sk-hero-sub sk-shine" />
            {/* Buttons */}
            <div className="sk-hero-btns">
              <div className="sk-btn sk-btn--gold sk-shine" />
              <div className="sk-btn sk-shine" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CATEGORIES (marquee)
        ══════════════════════════════════════════ */}
        <section className="sk-section sk-section--categories">
          <div className="sk-section-head">
            <div>
              <div className="sk-label sk-shine" />
              <div className="sk-heading sk-shine" />
            </div>
            <div className="sk-hint sk-shine" />
          </div>

          {/* Horizontal scrolling film-reel cards */}
          <div className="sk-cat-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="sk-cat-card" key={i}>
                {/* Film strip top */}
                <div className="sk-film-strip sk-film-strip--top" />
                <div className="sk-cat-count sk-shine" />
                <div className="sk-cat-title sk-shine" />
                <div className="sk-cat-desc sk-shine" />
                <div className="sk-cat-footer">
                  <div className="sk-cat-footer-text sk-shine" />
                  <div className="sk-cat-arrow sk-shine" />
                </div>
                {/* Film strip bottom */}
                <div className="sk-film-strip sk-film-strip--bottom" />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TILE SCROLL (4-column parallax grid)
        ══════════════════════════════════════════ */}
        <section className="sk-section sk-section--tiles">
          <div className="sk-tiles-grid">
            {[
              [280, 200, 240],
              [240, 300, 200],
              [260, 220, 250],
              [300, 200, 260],
            ].map((heights, col) => (
              <div className="sk-tile-col" key={col}>
                {heights.map((h, row) => (
                  <div
                    className="sk-tile sk-shine"
                    key={row}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            HOW IT WORKS (3 steps)
        ══════════════════════════════════════════ */}
        <section className="sk-section sk-section--how">
          <div className="sk-how-header">
            <div className="sk-how-title sk-shine" />
            <div className="sk-how-sub sk-shine" />
          </div>
          <div className="sk-steps-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="sk-step" key={i}>
                <div className="sk-step-num sk-shine" />
                <div className="sk-step-title sk-shine" />
                <div className="sk-step-text sk-shine" />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PILLARS (stacked pin cards)
        ══════════════════════════════════════════ */}
        <section className="sk-section sk-section--pillars">
          {/* Intro block */}
          <div className="sk-pillars-intro">
            <div className="sk-pillar-label sk-shine" />
            <div className="sk-pillar-headline sk-shine" />
            <div className="sk-pillar-sub sk-shine" />
          </div>

          {/* 4 pillar cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="sk-pillar-card" key={i}>
              {/* Gold left bar */}
              <div className="sk-pillar-bar" />
              <div className="sk-pillar-id sk-shine" />
              <div className="sk-pillar-name sk-shine" />
              <div className="sk-pillar-title sk-shine" />
              <div className="sk-pillar-body sk-shine" />
            </div>
          ))}
        </section>

        {/* ══════════════════════════════════════════
            CTA
        ══════════════════════════════════════════ */}
        <section className="sk-section sk-section--cta">
          {/* Decorative orbs */}
          <div className="sk-orb sk-orb--1" />
          <div className="sk-orb sk-orb--2" />
          <div className="sk-orb sk-orb--3" />

          <div className="sk-cta-inner">
            <div className="sk-cta-label sk-shine" />
            <div className="sk-cta-title sk-shine" />
            <div className="sk-cta-sub sk-shine" />
            <div className="sk-cta-btns">
              <div className="sk-btn sk-btn--gold sk-btn--lg sk-shine" />
              <div className="sk-btn sk-btn--lg sk-shine" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   STYLES
   Uses the same CSS custom-properties as theme.css / page.tsx
   so it inherits light/dark toggling automatically.
───────────────────────────────────────────────────────────── */
const SKELETON_CSS = `
/* ── Mount / unmount ── */
.sk-root {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--cream, #FFFDF7);
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 1;
  visibility: visible;
  transition: opacity .45s ease, visibility .45s ease;
}
.sk-root.sk-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* ── Shimmer ── */
.sk-shine {
  position: relative;
  overflow: hidden;
  background: var(--mist, #f0ebe0);
  border-radius: 4px;
}
.sk-shine::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,.62) 45%,
    transparent 100%
  );
  animation: skShimmer 1.6s infinite;
}
html.dark .sk-shine {
  background: #1e1e1e;
}
html.dark .sk-shine::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,.06) 45%,
    transparent 100%
  );
}
@keyframes skShimmer {
  100% { transform: translateX(100%); }
}
@media (prefers-reduced-motion: reduce) {
  .sk-shine::after { animation: none; }
}

/* ══════════════════════════════════════════
   HEADER BAR
══════════════════════════════════════════ */
.sk-header-bar {
  height: 60px;
  border-bottom: 1px solid var(--mist, #f0ebe0);
  background: var(--cream, #FFFDF7);
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
.sk-hero {
  position: relative;
  height: calc(100vh - 60px);
  min-height: 560px;
  overflow: hidden;
  background: #111009;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sk-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 40%, rgba(201,168,76,.10), transparent 35%),
    linear-gradient(135deg, #27231c 0%, #11100f 50%, #242019 100%);
  border-radius: 0;
  /* Override the sk-shine background so the dark gradient shows */
  background-color: #11100f !important;
}
.sk-hero-content {
  position: relative;
  z-index: 2;
  width: min(900px, 90vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
}
.sk-hero-kicker {
  width: 200px;
  height: 11px;
  background: rgba(201,168,76,.30) !important;
  border-radius: 3px;
  margin-bottom: 24px;
}
.sk-hero-kicker::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent) !important; }

.sk-hero-eyebrow {
  width: 270px;
  height: 13px;
  background: rgba(255,255,255,.14) !important;
  border-radius: 3px;
  margin-bottom: 28px;
}
.sk-hero-eyebrow::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent) !important; }

.sk-hero-title {
  width: min(680px, 82vw);
  height: clamp(56px, 7vw, 88px);
  background: rgba(255,255,255,.16) !important;
  border-radius: 6px;
  margin-bottom: 26px;
}
.sk-hero-title::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent) !important; }

.sk-hero-sub {
  width: min(540px, 74vw);
  height: 54px;
  background: rgba(255,255,255,.10) !important;
  border-radius: 5px;
  margin-bottom: 36px;
}
.sk-hero-sub::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,.10), transparent) !important; }

.sk-hero-btns {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Shared button skeleton ── */
.sk-btn {
  width: 150px;
  height: 46px;
  border-radius: 999px;
  background: rgba(255,255,255,.13) !important;
}
.sk-btn::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,.13), transparent) !important; }
.sk-btn--gold {
  background: rgba(201,168,76,.38) !important;
}
.sk-btn--gold::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent) !important; }
.sk-btn--lg {
  width: 200px;
  height: 56px;
}

/* ══════════════════════════════════════════
   SHARED SECTION WRAPPER
══════════════════════════════════════════ */
.sk-section {
  background: var(--cream, #FFFDF7);
  padding: 90px 4vw;
}
html.dark .sk-section {
  background: #0b0b0b;
}

/* ── Section head (label + heading + hint) ── */
.sk-section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 36px;
}
.sk-label  { width: 155px; height: 10px; margin-bottom: 12px; }
.sk-heading{ width: 300px; height: 38px; }
.sk-hint   { width: 100px; height: 10px; }

/* ══════════════════════════════════════════
   CATEGORIES — film-reel card row
══════════════════════════════════════════ */
.sk-section--categories {
  padding: 90px 0;
  overflow: hidden;
}
.sk-section--categories .sk-section-head {
  padding: 0 4vw;
}
.sk-cat-track {
  display: flex;
  gap: 1.5rem;
  padding: 16px 4vw 28px;
  overflow: hidden;
  /* Fade mask matching cat-marquee-wrap */
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}
.sk-cat-card {
  flex: 0 0 420px;
  min-height: 290px;
  border: 3px solid var(--ink, #0f0e0d);
  border-radius: 2px;
  background: var(--white, #ffffff);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 54px 44px 50px;
  box-shadow:
    0 8px 0 rgba(15,14,13,.09),
    0 16px 32px rgba(0,0,0,.07);
}
html.dark .sk-cat-card {
  background: #161616;
  border-color: #f6f6f6;
}

/* Film strip top / bottom */
.sk-film-strip {
  position: absolute;
  left: 0;
  right: 0;
  height: 34px;
  background-color: var(--ink, #0f0e0d);
  background-image: repeating-linear-gradient(
    to right,
    transparent 0px,
    transparent 8px,
    var(--cream, #FFFDF7) 8px,
    var(--cream, #FFFDF7) 18px,
    transparent 18px,
    transparent 30px
  );
  background-position: center;
  background-size: 30px 14px;
  background-repeat: repeat-x;
  z-index: 2;
}
html.dark .sk-film-strip {
  background-color: #f6f6f6;
  background-image: repeating-linear-gradient(
    to right,
    transparent 0px,
    transparent 8px,
    #161616 8px,
    #161616 18px,
    transparent 18px,
    transparent 30px
  );
}
.sk-film-strip--top    { top: 0;    border-bottom: 2px solid var(--ink, #0f0e0d); }
.sk-film-strip--bottom { bottom: 0; border-top:    2px solid var(--ink, #0f0e0d); }
html.dark .sk-film-strip--top    { border-bottom-color: #f6f6f6; }
html.dark .sk-film-strip--bottom { border-top-color:    #f6f6f6; }

/* Card internals */
.sk-cat-count  { width: 110px; height: 10px; margin-bottom: 32px; }
.sk-cat-title  { width: 70%;   height: 34px; margin-bottom: 16px; }
.sk-cat-desc   { width: 90%;   height: 44px; }
.sk-cat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  position: relative;
  z-index: 3;
}
.sk-cat-footer-text { width: 120px; height: 10px; }
.sk-cat-arrow       { width: 42px;  height: 42px; border-radius: 50%; }

/* ══════════════════════════════════════════
   TILES — 4-column parallax grid
══════════════════════════════════════════ */
.sk-section--tiles {
  padding: 40px 4vw 8px;
  overflow: hidden;
}
.sk-tiles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-items: start;
}
.sk-tile-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sk-tile {
  border-radius: 14px;
  width: 100%;
}

/* ══════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════ */
.sk-section--how {
  padding: 10px 4vw 100px;
}
.sk-how-header {
  margin-bottom: 3.5rem;
}
.sk-how-title { width: 320px; max-width: 80vw; height: 38px; margin-bottom: 14px; }
.sk-how-sub   { width: 260px; max-width: 70vw; height: 14px; }

.sk-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  border: 1.5px solid var(--mist, #f0ebe0);
}
.sk-step {
  min-height: 260px;
  padding: 40px;
  border: 1.5px solid var(--mist, #f0ebe0);
  background: var(--cream, #FFFDF7);
}
html.dark .sk-step {
  background: #111;
  border-color: #222;
}
.sk-step-num   { width: 72px;  height: 46px; margin-bottom: 24px; }
.sk-step-title { width: 65%;   height: 18px; margin-bottom: 18px; }
.sk-step-text  { width: 90%;   height: 46px; }

/* ══════════════════════════════════════════
   PILLARS
══════════════════════════════════════════ */
.sk-section--pillars {
  padding: 110px 0 0;
  background: var(--cream, #FFFDF7);
  /* Subtle gold grid bg matching pillars-section */
  background-image:
    linear-gradient(rgba(201,168,76,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,.05) 1px, transparent 1px);
  background-size: 52px 52px;
}
html.dark .sk-section--pillars {
  background-color: #0b0b0b;
}

.sk-pillars-intro {
  width: min(850px, 90vw);
  margin: 0 auto 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.sk-pillar-label    { width: 200px; height: 12px; }
.sk-pillar-headline { width: min(700px, 80vw); height: 100px; border-radius: 6px; }
.sk-pillar-sub      { width: min(560px, 72vw); height: 44px; }

.sk-pillar-card {
  position: relative;
  width: min(1100px, 90vw);
  min-height: 420px;
  margin: 0 auto 24px;
  border-radius: 28px;
  background: var(--white, #ffffff);
  border: 1px solid var(--mist, #f0ebe0);
  box-shadow: 0 20px 50px rgba(0,0,0,.07);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  overflow: hidden;
}
html.dark .sk-pillar-card {
  background: #141414;
  border-color: #2a2a2a;
}

/* Animated gold left accent bar */
.sk-pillar-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--gold, #c9a84c);
  opacity: .5;
  border-radius: 2px 0 0 2px;
}

.sk-pillar-id    { width: 110px; height: 10px; }
.sk-pillar-name  { width: 180px; height: 15px; }
.sk-pillar-title { width: 68%;   height: 42px; border-radius: 5px; }
.sk-pillar-body  { width: 82%;   height: 56px; }

/* ══════════════════════════════════════════
   CTA
══════════════════════════════════════════ */
.sk-section--cta {
  position: relative;
  min-height: 520px;
  padding: 100px 4vw 130px;
  border-top: 1px solid var(--mist, #f0ebe0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* Gold grid */
  background-image:
    linear-gradient(rgba(201,168,76,.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,.07) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Decorative orbs */
.sk-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,.14) 0%, transparent 70%);
  pointer-events: none;
}
.sk-orb--1 { width: 500px; height: 500px; top: -120px;  left: -140px; }
.sk-orb--2 { width: 360px; height: 360px; bottom: -80px; right: -80px; }
.sk-orb--3 { width: 220px; height: 220px; top: 35%;      left: 58%;    }

.sk-cta-inner {
  position: relative;
  z-index: 2;
  width: min(780px, 90vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.sk-cta-label {
  width: 160px;
  height: 10px;
  margin-bottom: 30px;
}
.sk-cta-title {
  width: min(540px, 80vw);
  height: 180px;
  border-radius: 6px;
  margin-bottom: 28px;
}
.sk-cta-sub {
  width: min(480px, 78vw);
  height: 46px;
  margin-bottom: 36px;
}
.sk-cta-btns {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width: 900px) {
  .sk-tiles-grid { grid-template-columns: repeat(2, 1fr); }
  .sk-steps-grid { grid-template-columns: 1fr; }

  .sk-cat-card    { flex-basis: 260px; min-height: 250px; padding: 48px 28px 44px; }
  .sk-pillar-card { padding: 40px 28px; min-height: auto; }
  .sk-pillar-headline { height: 70px; }
  .sk-pillar-title    { height: 32px; }
}
@media (max-width: 540px) {
  .sk-tiles-grid  { grid-template-columns: repeat(2, 1fr); }
  .sk-cat-card    { flex-basis: 200px; min-height: 220px; }
  .sk-section-head  { flex-direction: column; align-items: flex-start; }
  .sk-cta-btns    { flex-direction: column; align-items: center; }
}
`;