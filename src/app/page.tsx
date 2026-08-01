"use client";

import { useEffect, useRef } from "react";
import "../components/ui/fonts.css";
import "../components/ui/theme.css";

declare global {
  interface Window {
    gsap: {
      registerPlugin: (...args: unknown[]) => void;
      from: (targets: unknown, vars: Record<string, unknown>) => void;
      fromTo: (targets: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => void;
      to: (targets: unknown, vars: Record<string, unknown>) => void;
      set: (targets: unknown, vars: Record<string, unknown>) => void;
      utils: { toArray: <T = Element>(targets: string) => T[] };
      context: (fn: () => void, scope?: Element | null) => { revert: () => void };
    };
    ScrollTrigger: {
      getAll: () => Array<{ kill: (revert?: boolean) => void }>;
      create: (vars: Record<string, unknown>) => unknown;
      refresh: () => void;
    };
  }
}

interface StepItem     { n: string; h: string; p: string }
interface CategoryItem { label: string; count: string; desc: string; color: string }
interface PillarItem   { id: string; label: string; heading: string; body: string }

const PILLARS: PillarItem[] = [
  { id: "01", label: "Dignity by Design",        heading: "Zero tolerance, enforced by AI",        body: "AI-led moderation scans every interaction. Protection against solicitation, grooming, and exploitation is built into the platform's core — not bolted on after." },
  { id: "02", label: "Merit Over Middlemen",      heading: "Structured access. No backroom deals.", body: "Searchable skill profiles and subscription-based, auditable access replace opaque networks. No commissions. No informal gatekeepers." },
  { id: "03", label: "India-First",               heading: "Every region. Every language.",         body: "From freshers to veterans, from metros to tier-3 cities — IndCasting is pan-India digital infrastructure built for vernacular India." },
  { id: "04", label: "Technology with Governance",heading: "AI that explains itself.",              body: "Explainable algorithms and human-in-the-loop escalation mean every decision can be audited. Technology that amplifies ethics, not just efficiency." },
];

const CATEGORIES: CategoryItem[] = [
  { label: "Actors",        count: "12,400+", desc: "Film, television, OTT, theatre and commercial artists.",        color: "#c9a84c" },
  { label: "Models",        count: "8,200+",  desc: "Fashion, lifestyle, commercial and print modelling talent.",     color: "#8b6914" },
  { label: "Singers",       count: "4,100+",  desc: "Playback, live performers, independent musicians and bands.",    color: "#c9a84c" },
  { label: "Dancers",       count: "3,800+",  desc: "Classical, hip-hop, freestyle and choreographed performers.",    color: "#8b6914" },
  { label: "Voice Artists", count: "2,600+",  desc: "Dubbing, narration, audiobooks, radio and animation voices.",   color: "#c9a84c" },
  { label: "Child Artists", count: "1,900+",  desc: "Verified young performers for films, TV and advertisements.",    color: "#8b6914" },
  { label: "Influencers",   count: "5,500+",  desc: "Creators across Instagram, YouTube and digital campaigns.",      color: "#c9a84c" },
  { label: "Anchors",       count: "1,200+",  desc: "Event hosts, presenters, emcees and television anchors.",       color: "#8b6914" },
];

const STEPS: StepItem[] = [
  { n: "01", h: "Build your portfolio", p: "Upload headshots, audition reels, experience and skills to craft a professional, searchable profile." },
  { n: "02", h: "Get discovered",       p: "Casting directors use smart filters — role, look, age, language, city — to shortlist the right fit." },
  { n: "03", h: "Connect and work",     p: "Message directly, schedule auditions and lock in projects across film, OTT, ads and music videos." },
];

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";
const VIDEO_FADE = 0.5;

function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload  = () => resolve();
    s.onerror = () => reject(new Error(`Failed: ${src}`));
    document.head.appendChild(s);
  });
}

const CARD_PIN_TOP = 100;

export default function Home() {
  const heroRef    = useRef<HTMLElement>(null);
  const tilesRef   = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const rafRef     = useRef<number | null>(null);
  const gsapLoaded = useRef<boolean>(false);
  const gsapCtxRef = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;
    video.currentTime = 0;
    video.play().catch(() => {});

    const tick = () => {
      if (!video || isNaN(video.duration) || video.duration === 0) {
        video.style.opacity = "0";
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const t   = video.currentTime;
      const dur = video.duration;

      if (t < VIDEO_FADE) {
        video.style.opacity = String(t / VIDEO_FADE);
      } else if (t >= dur - VIDEO_FADE) {
        video.style.opacity = String(Math.max(0, (dur - t) / VIDEO_FADE));
      } else {
        video.style.opacity = "1";
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("ended", onEnded);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("ended", onEnded);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    (async (): Promise<void> => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      gsapCtxRef.current = gsap.context(() => {

        gsap.to(".progress-bar", {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0 },
        });

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const scrambleEl = document.querySelector<HTMLElement>(".hero-scramble");
        if (scrambleEl) {
          const original = scrambleEl.textContent ?? "";
          let frame = 0; const totalFrames = 28;
          const scramble = (): void => {
            scrambleEl.textContent = original.split("").map((ch, i) => {
              if (ch === " ") return " ";
              if (i < (frame / totalFrames) * original.length) return original[i];
              return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            frame++;
            if (frame <= totalFrames) requestAnimationFrame(scramble);
            else scrambleEl.textContent = original;
          };
          setTimeout(scramble, 400);
        }

        const columns = tilesRef.current?.querySelectorAll<HTMLElement>(".tile-col");
        if (columns) {
          const distances = [180, -180, 180, -180];
          columns.forEach((col, i) => {
            gsap.fromTo(col, { y: -distances[i] * 0.5 }, {
              y: distances[i] * 0.5, ease: "none",
              scrollTrigger: { trigger: tilesRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
            });
          });
        }

        gsap.utils.toArray<HTMLElement>(".tile img").forEach((img) => {
          gsap.fromTo(img, { scale: 1.15, y: -30 }, {
            scale: 1, y: 30, ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 2.5 },
          });
        });

        const eyebrow = document.querySelector<HTMLElement>(".tiles-eyebrow");
        if (eyebrow) {
          const text = eyebrow.textContent ?? "";
          eyebrow.innerHTML = text.split("").map(c => c === " " ? " " : `<span class="e-ch">${c}</span>`).join("");
          gsap.from(".e-ch", {
            opacity: 0, y: 10, stagger: 0.025, duration: 0.4, ease: "power2.out",
            scrollTrigger: { trigger: eyebrow, start: "top 90%" },
          });
        }

        gsap.utils.toArray<Element>(".step").forEach((step, i) => {
          gsap.from(step, {
            x: i % 2 === 0 ? -60 : 60, opacity: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%", toggleActions: "play none none none" },
          });
        });

        document.querySelectorAll<HTMLElement>(".step-num").forEach((el) => {
          const orig = el.textContent ?? "";
          ScrollTrigger.create({
            trigger: el, start: "top 88%",
            onEnter: () => {
              el.style.opacity = "0";
              let f = 0;
              const tick = (): void => {
                el.style.opacity = "1";
                el.textContent = String(Math.floor(Math.random() * 99)).padStart(2, "0");
                f++;
                if (f < 18) requestAnimationFrame(tick);
                else el.textContent = orig;
              };
              tick();
            },
          });
        });

        gsap.from(".pillars-headline", {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".pillars-section", start: "top 82%", toggleActions: "play none none none" },
        });

        gsap.utils.toArray<HTMLElement>(".pillar-bar").forEach((bar) => {
          gsap.fromTo(bar, { scaleY: 0 }, {
            scaleY: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: bar.closest(".pillar-row"), start: "top 85%", toggleActions: "play none none none" },
          });
        });

        const pillarCards = gsap.utils.toArray<HTMLElement>(".pillar-row");
        const TOTAL = pillarCards.length;

        pillarCards.forEach((card, i) => {
          gsap.set(card, { zIndex: i + 1 });
        });

        pillarCards.forEach((card, i) => {
          const isLast = i === TOTAL - 1;

          ScrollTrigger.create({
            trigger: card,
            start: `top ${CARD_PIN_TOP}px`,
            end: isLast
              ? `+=${card.offsetHeight + 400}`
              : () => {
                  const next = pillarCards[i + 1];
                  return `+=${next.offsetHeight + 60}`;
                },
            pin: true,
            pinSpacing: !isLast,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          if (!isLast) {
            const next = pillarCards[i + 1];
            gsap.to(card, {
              scale: 0.96, y: -18, opacity: 0.72, ease: "none",
              scrollTrigger: {
                trigger: next,
                start: `top ${CARD_PIN_TOP + 60}px`,
                end: `top ${CARD_PIN_TOP}px`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
          }
        });

        const ctaH2 = document.querySelector<HTMLElement>(".cta-headline");
        if (ctaH2) {
          gsap.from(".cta-headline > *", {
            y: 100, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power4.out",
            scrollTrigger: { trigger: ".cta-section", start: "top 82%" },
          });
        }

        gsap.utils.toArray<HTMLElement>(".cta-orb").forEach((orb, i) => {
          gsap.to(orb, {
            y: i % 2 === 0 ? -60 : 60, x: i % 3 === 0 ? -30 : 30, ease: "none",
            scrollTrigger: { trigger: ".cta-section", start: "top bottom", end: "bottom top", scrub: 2 },
          });
          gsap.from(orb, {
            scale: 0, opacity: 0, duration: 1.2, delay: i * 0.15, ease: "elastic.out(1,0.6)",
            scrollTrigger: { trigger: ".cta-section", start: "top 80%", toggleActions: "play none none none" },
          });
        });

        gsap.from(".cta-sub, .cta-label", {
          y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 78%", toggleActions: "play none none none" },
        });

        document.querySelectorAll<HTMLElement>(".cta-btns button").forEach((btn) => {
          btn.addEventListener("mousemove", (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.3, ease: "power2.out" });
          });
          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
          });
        });

        gsap.to(".cta-ring",   { rotation: 360,  duration: 18, ease: "none", repeat: -1 });
        gsap.to(".cta-ring-2", { rotation: -360, duration: 26, ease: "none", repeat: -1 });

        gsap.utils.toArray<Element>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          });
        });

      });
    })();

    return () => {
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
    };
  }, []);

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "rgba(201,168,76,0.15)", zIndex: 200 }}>
        <div className="progress-bar" style={{ height: "100%", background: "var(--gold)", transformOrigin: "left", transform: "scaleX(0)" }} />
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0f0e0d;
          --cream: #FFFDF7;
          --gold: #c9a84c;
          --gold2: #e8c96a;
          --mist: #f0ebe0;
          --mid: #6b6560;
          --white: #ffffff;
          --radius-md: 14px;
          --radius-lg: 24px;
        }
        html.dark {
          --ink: #f6f6f6;
          --cream: #0b0b0b;
          --gold: #c9a84c;
          --gold2: #f1d472;
          --mist: #1c1c1c;
          --mid: #b8b8b8;
          --white: #161616;
        }
        body {
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
          font-family: system-ui, sans-serif;
          transition: background .35s ease, color .35s ease;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        /* Video fills the entire hero */
        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          z-index: 0;
        }

        /* Dark overlay so text is readable */
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background:
            linear-gradient(to bottom,
              rgba(0,0,0,0.50) 0%,
              rgba(0,0,0,0.25) 35%,
              rgba(0,0,0,0.25) 65%,
              rgba(0,0,0,0.65) 100%
            ),
            radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.50) 100%);
          pointer-events: none;
        }

        /* Content sits above video + overlay */
        .hero-content {
          position: relative;
          z-index: 20;
          max-width: 900px;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-scramble {
          display: block;
          margin-bottom: 1.2rem;
          font-size: .82rem;
          font-family: monospace;
          letter-spacing: .14em;
          color:#f1d472;
          text-shadow:
          0 2px 10px rgba(0,0,0,.65),
          0 0 18px rgba(0,0,0,.35);
          opacity: .9;
        }
        .hero-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .7rem;
          margin-bottom: 1.8rem;
          font-size: .9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .08em;
          color:rgba(255,255,255,.98);
          text-shadow:0 2px 8px rgba(0,0,0,.45);
        }
        .hero-eyebrow::before,
        .hero-eyebrow::after { content: ""; width: 28px; height: 1px; background:rgba(255,255,255,.7); }
        .hero-title{
    color:#fff;
    font-family:"Instrument Serif", Georgia, serif;
    font-size:clamp(3rem,6vw,5.2rem);
    font-weight:400;
    line-height:1;
    letter-spacing:-0.03em;
    margin-bottom:1.6rem;

    text-shadow:
        0 2px 10px rgba(0,0,0,.45),
        0 8px 30px rgba(0,0,0,.55),
        0 0 60px rgba(0,0,0,.35);
}
        .hero-word { display: inline-block; }
        .hero-sub {
          color:rgba(255,255,255,.94);
          text-shadow:0 2px 12px rgba(0,0,0,.55);
          font-size: 1.08rem;
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 2.8rem;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          position: relative; overflow: hidden;
          background: var(--gold); color: #111;
          border: none; border-radius: 999px;
          padding: .95rem 2.4rem; font-size: .95rem; font-weight: 700;
          cursor: pointer; transition: .3s;
        }
        .btn-primary::after {
          content: ""; position: absolute; inset: 0;
          background: rgba(255,255,255,.25);
          transform: translateX(-100%); transition: transform .35s ease;
        }
        .btn-primary:hover::after { transform: translateX(0); }
        .btn-primary:hover { background: var(--gold2); }
        .btn-outline {
          background: transparent; color: #fff;
          border: 2px solid rgba(255,255,255,0.6); border-radius: 999px;
          padding: .95rem 2.4rem; font-size: .95rem; font-weight: 600;
          cursor: pointer; transition: .3s;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.12); border-color: #fff; }

        /* ── CATEGORIES ── */
        .categories-section { background: var(--cream); transition: background .35s; padding: 100px 0 90px; overflow: visible; }
        .cat-scroll-header { padding: 0 4vw 3rem; display: flex; justify-content: space-between; align-items: flex-end; }
        .section-label { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 0.5rem; }
        .cat-title { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; }
        .cat-scroll-hint { font-size: 0.78rem; color: var(--mid); letter-spacing: 0.06em; }
        .cat-marquee-wrap {
          overflow: hidden; padding: 20px 0 30px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .cat-track { display: flex; gap: 1.5rem; width: max-content; animation: catMarquee 28s linear infinite; }
        .cat-track:hover { animation-play-state: paused; }
        @keyframes catMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cat-card {
          width: 380px; min-width: 380px; min-height: 250px; padding: 34px;
          display: flex; flex-direction: column; justify-content: space-between;
          border-radius: 26px; background: var(--white); border: 1px solid var(--mist);
          position: relative; overflow: hidden; flex-shrink: 0; cursor: pointer;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }
        .cat-card:hover { transform: translateY(-8px); border-color: var(--gold); box-shadow: 0 18px 40px rgba(201,168,76,.18); }
        .cat-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .cat-card-label { font-size: 1.55rem; font-weight: 800; color: var(--ink); margin-bottom: 10px; }
        .cat-card-count { font-size: .9rem; color: var(--gold); font-weight: 700; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 18px; }
        .cat-card-desc { color: var(--mid); line-height: 1.7; font-size: .95rem; flex: 1; }
        .cat-card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; }
        .cat-card-arrow {
          width: 46px; height: 46px; display: flex; align-items: center; justify-content: center;
          border-radius: 50%; background: var(--mist); color: var(--ink);
          font-size: 20px; font-weight: 700; transition: .3s;
        }
        .cat-card:hover .cat-card-arrow { background: var(--gold); color: #111; }

        /* ── TILES ── */
        .tiles-section { padding: 40px 4vw 20px; overflow: hidden; }
        .tiles-eyebrow { text-align: center; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mid); margin-bottom: 2.5rem; }
        .tiles-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; align-items: start; min-height: 1100px; }
        .tile-col { display: flex; flex-direction: column; gap: 16px; will-change: transform; }
        .tile { border-radius: var(--radius-md); overflow: hidden; position: relative; background: var(--mist); }
        .tile img { width: 100%; display: block; object-fit: cover; object-position: center; will-change: transform; }
        .tile-overlay {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem;
          background: linear-gradient(to top, rgba(0,0,0,.82), transparent); color: var(--white);
        }
        .tile-overlay h4 { font-size: 0.9rem; font-weight: 700; }
        .tile-overlay p  { font-size: 0.75rem; opacity: 0.8; }
        html.dark .tile-overlay, html.dark .tile-overlay h4 { color: #fff; }
        html.dark .tile-overlay p { color: rgba(255,255,255,0.9); }
        .tile-tag {
          position: absolute; top: 12px; left: 12px;
          background: var(--gold); color: var(--ink); border-radius: 100px;
          padding: 3px 10px; font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        /* ── HOW IT WORKS ── */
        .how-section { padding: 40px 4vw 100px; }
        .how-title { font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.5rem; }
        .how-sub { color: var(--mid); margin-bottom: 3.5rem; font-size: 1rem; }
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; border: 1.5px solid var(--mist); }
        .step { padding: 2.5rem; border: 1.5px solid var(--mist); background: var(--cream); transition: .35s; position: relative; }
        .step::after {
          content: attr(data-n); position: absolute; bottom: -1rem; right: 1rem;
          font-size: 7rem; font-weight: 900; color: var(--gold); opacity: 0.04;
          line-height: 1; pointer-events: none; user-select: none;
        }
        .step:hover { background: rgba(201,168,76,0.04); box-shadow: 0 0 0 1.5px var(--gold); }
        .step-num { font-size: 3rem; font-weight: 900; color: var(--gold); opacity: 0.35; line-height: 1; margin-bottom: 1.2rem; }
        .step h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .step p  { color: var(--mid); font-size: 0.9rem; line-height: 1.65; }

        /* ── PILLARS ── */
        .pillars-section { padding: 120px 0 0; background: var(--cream); position: relative; overflow: visible; }
        .pillars-section::before {
          content: ""; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.055) 1px, transparent 1px);
          background-size: 52px 52px; pointer-events: none;
        }
        html.dark .pillars-section { background: #0b0b0b; }
        .pillars-top { width: 100%; max-width: 1100px; margin: 0 auto 5rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.8rem; }
        .pillars-headline { font-size: clamp(2.8rem,6vw,5.4rem); line-height: 1.04; font-weight: 900; letter-spacing: -0.04em; color: var(--ink); margin: 0; max-width: 900px; }
        .pillars-headline em { display: block; color: var(--gold); font-style: normal; }
        html.dark .pillars-headline { color: #fff; }
        .pillars-sub { max-width: 640px; margin: 0 auto; text-align: center; font-size: 1.1rem; line-height: 1.75; color: var(--mid); }
        .pillars-cards { width: min(1100px,90vw); margin: 0 auto; padding-bottom: 130vh; }
        .pillar-row {
          min-height: 520px; padding: 60px;
          border-radius: 28px; background: var(--white); border: 1px solid var(--mist);
          display: flex; flex-direction: column; justify-content: center; gap: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,.08); position: relative;
          transform-origin: top center; will-change: transform, opacity;
          backface-visibility: hidden; margin-bottom: 24px;
        }
        .pillar-row:last-child { margin-bottom: 0; }
        .pillar-row:hover { background: rgba(201,168,76,0.04); }
        .pillar-row::after {
          content: ""; position: absolute; left: 0; right: 0;
          height: 1px; background: linear-gradient(to right, var(--gold), transparent);
          opacity: 0; top: 0; transition: opacity .3s;
        }
        .pillar-row:hover::after { opacity: 0.6; }
        html.dark .pillars-section .pillar-row { border-color: #2a2a2a; }
        .pillar-bar { position: absolute; top: 0; left: 0; width: 2px; height: 100%; background: var(--gold); transform-origin: top center; transform: scaleY(0); }
        .pillar-id { font-size: 0.68rem; font-family: monospace; letter-spacing: 0.14em; color: var(--gold); margin-bottom: 1.6rem; display: block; opacity: 0.8; }
        .pillar-label { font-size: 1rem; letter-spacing: .12em; }
        .pillar-heading { font-size: clamp(1.8rem,3vw,3rem); line-height: 1.2; font-weight: 800; }
        .pillar-body { max-width: 700px; font-size: 1.15rem; line-height: 1.8; color: var(--mid); }

        /* ── CTA ── */
        .cta-section {
          background: var(--cream); border-top: 1px solid var(--mist);
          transition: background .35s, border-color .35s;
          position: relative; padding: 100px 4vw 120px; overflow: hidden;
        }
        .cta-section::before {
          content: ""; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.07) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none;
        }
        .cta-orb { position: absolute; border-radius: 50%; background: radial-gradient(circle,rgba(201,168,76,0.18) 0%,transparent 70%); pointer-events: none; will-change: transform; }
        .cta-orb-1 { width: 500px; height: 500px; top: -120px; left: -140px; }
        .cta-orb-2 { width: 360px; height: 360px; bottom: -80px; right: -80px; }
        .cta-orb-3 { width: 220px; height: 220px; top: 35%; left: 58%; }
        .cta-ring, .cta-ring-2 { position: absolute; border-radius: 50%; pointer-events: none; border: 1px solid rgba(201,168,76,0.18); top: 50%; left: 50%; transform-origin: center; }
        .cta-ring   { width: 620px; height: 620px; margin: -310px 0 0 -310px; }
        .cta-ring-2 { width: 940px; height: 940px; margin: -470px 0 0 -470px; border-color: rgba(201,168,76,0.09); }
        .cta-inner-wrap { position: relative; z-index: 2; max-width: 780px; margin: 0 auto; text-align: center; }
        .cta-label {
          display: inline-flex; align-items: center; gap: .7rem; margin-bottom: 2rem;
          color: var(--gold); font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .16em;
        }
        .cta-label::before, .cta-label::after { content: ""; width: 34px; height: 1px; background: var(--gold); opacity: .6; }
        .cta-headline { font-size: clamp(2.8rem,6vw,5rem); font-weight: 900; line-height: 1.05; letter-spacing: -.025em; color: var(--ink); text-align: center; margin-bottom: 1.8rem; }
        .cta-last-line { display: block; text-align: center; width: 100%; }
        .cta-headline em { color: var(--gold); font-style: normal; }
        .cta-sub { max-width: 500px; margin: 0 auto 3rem; color: var(--mid); font-size: 1.05rem; line-height: 1.7; }
        .cta-btns { display: flex; justify-content: center; align-items: center; gap: 1.25rem; flex-wrap: wrap; margin-top: .5rem; }
        .cta-btn-gold {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 220px; height: 58px; padding: 0 2.6rem;
          border: none; border-radius: 999px; background: var(--gold); color: #111;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          position: relative; overflow: hidden; transition: all .3s ease;
          box-shadow: 0 10px 30px rgba(201,168,76,.30);
        }
        .cta-btn-gold::after { content: ""; position: absolute; inset: 0; background: rgba(255,255,255,.25); transform: translateX(-100%); transition: transform .35s ease; }
        .cta-btn-gold:hover::after { transform: translateX(0); }
        .cta-btn-gold:hover { background: var(--gold2); transform: translateY(-2px); }
        .cta-btn-outline {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 220px; height: 58px; padding: 0 2.6rem;
          background: transparent; color: var(--ink); border: 2px solid var(--ink);
          border-radius: 999px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all .3s ease;
        }
        .cta-btn-outline:hover { background: var(--ink); color: var(--cream); transform: translateY(-2px); }
        html.dark .cta-btn-outline { color: #fff; border-color: #fff; }
        html.dark .cta-btn-outline:hover { background: #fff; color: #111; }
        .cta-ticker { margin-top: 4rem; overflow: hidden; border-top: 1px solid rgba(201,168,76,.25); padding-top: 1.4rem; position: relative; z-index: 2; }
        .cta-ticker-track { display: flex; gap: 3rem; width: max-content; animation: ctaTicker 20s linear infinite; }
        .cta-ticker-item { display: flex; align-items: center; gap: 1rem; white-space: nowrap; font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--mid); }
        .cta-ticker-item em { color: var(--gold); font-style: normal; }
        .cta-ticker-item::after { content: "✦"; color: var(--gold); font-size: .45rem; opacity: .7; }
        @keyframes ctaTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .tiles-grid { grid-template-columns: repeat(2,1fr); }
          .cat-card { width: 240px; min-width: 240px; }
          .steps-grid { grid-template-columns: 1fr; }
          .pillar-row { padding: 40px 28px; min-height: auto; }
          .pillar-heading { font-size: 1.8rem; }
        }
        @media (max-width: 540px) {
          .tiles-grid { grid-template-columns: repeat(2,1fr); }
          .cat-card { width: 200px; min-width: 200px; }
        }

        html.dark .tile { background: #181818; }
        html.dark .step { background: #111; }
        html.dark .cta-section::before { opacity: .45; }
        html.dark .cta-ring { border-color: rgba(201,168,76,.14); }
        html.dark .cta-ring-2 { border-color: rgba(201,168,76,.08); }

        @media (prefers-reduced-motion: reduce) {
          .cat-track { animation: none; }
        }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>

          {/* Video — absolute, fills 100% of .hero */}
          <video
            ref={videoRef}
            className="hero-video"
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          {/* Dark overlay for legibility */}
          <div className="hero-overlay" />

          {/* Text content — z-index 2, centred */}
          <div className="hero-content">
            <span className="hero-scramble aethera-fade-rise">INDCASTING.IN — SINCE 2026</span>
            <p className="hero-eyebrow aethera-fade-rise">India&apos;s Premium Casting Platform</p>
            <h1 className="hero-title aethera-fade-rise-delay">
              {"Discover the Right Talent for Every Story.".split(" ").map((word, i) => (
                <span key={i} className="hero-word">{word}&nbsp;</span>
              ))}
            </h1>
            <p className="hero-sub aethera-fade-rise-delay-2">
              IndCasting connects actors, models, dancers, singers, voice artists
              and creators with casting directors and production houses through a
              secure, professional platform.
            </p>
            <div className="hero-btns aethera-fade-rise-delay-2">
              <button className="btn-primary">Explore Talent</button>
              <button className="btn-outline">Join as Talent</button>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="categories-section">
          <div className="cat-scroll-header reveal">
            <div>
              <span className="section-label">Explore by discipline</span>
              <h2 className="cat-title">Browse talent categories</h2>
            </div>
            <span className="cat-scroll-hint">Hover to pause</span>
          </div>
          <div className="cat-marquee-wrap">
            <div className="cat-track">
              {[...CATEGORIES, ...CATEGORIES].map(({ label, count, desc }: CategoryItem, i: number) => (
                <div className="cat-card" key={`${label}-${i}`}>
                  <div className="cat-card-top">
                    <span className="cat-card-count">{count} Artists</span>
                  </div>
                  <div>
                    <h3 className="cat-card-label">{label}</h3>
                    <p className="cat-card-desc">{desc}</p>
                  </div>
                  <div className="cat-card-footer">
                    <span>Explore Category</span>
                    <span className="cat-card-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TILE SCROLL ── */}
        <section className="tiles-section" ref={tilesRef}>
          <div className="tiles-grid">
            <div className="tile-col">
              <div className="tile"><img src="images/img1.jpg"   alt="Actor"  style={{ height: "280px" }} /><div className="tile-overlay"><h4>Riya Sharma</h4><p>Actor · Mumbai</p></div><span className="tile-tag">Actor</span></div>
              <div className="tile"><img src="images/img12.jpg"  alt="Model"  style={{ height: "200px" }} /><div className="tile-overlay"><h4>Rahul Bose</h4><p>Model · Mumbai</p></div><span className="tile-tag">Model</span></div>
              <div className="tile"><img src="images/img_2.png"  alt="Singer" style={{ height: "240px" }} /><div className="tile-overlay"><h4>Megha Singh</h4><p>Singer · Jaipur</p></div><span className="tile-tag">Singer</span></div>
            </div>
            <div className="tile-col">
              <div className="tile"><img src="images/img_7.png"  alt="Model"  style={{ height: "240px" }} /><div className="tile-overlay"><h4>Arjun Mehta</h4><p>Model · Delhi</p></div><span className="tile-tag">Model</span></div>
              <div className="tile"><img src="images/img3.jpg"   alt="Actor"  style={{ height: "300px" }} /><div className="tile-overlay"><h4>Priya Nair</h4><p>Actor · Chennai</p></div><span className="tile-tag">Actor</span></div>
              <div className="tile"><img src="images/img_8.png"  alt="Anchor" style={{ height: "200px" }} /><div className="tile-overlay"><h4>Dev Khanna</h4><p>Anchor · Pune</p></div><span className="tile-tag">Anchor</span></div>
            </div>
            <div className="tile-col">
              <div className="tile"><img src="images/img5.jpg"   alt="Singer" style={{ height: "260px" }} /><div className="tile-overlay"><h4>Ananya Roy</h4><p>Singer · Kolkata</p></div><span className="tile-tag">Singer</span></div>
              <div className="tile"><img src="images/img_10.png" alt="Actor"  style={{ height: "220px" }} /><div className="tile-overlay"><h4>Vikram Patel</h4><p>Actor · Ahmedabad</p></div><span className="tile-tag">Actor</span></div>
              <div className="tile"><img src="images/img11.jpg"  alt="Dancer" style={{ height: "250px" }} /><div className="tile-overlay"><h4>Aarav Menon</h4><p>Dancer · Bengaluru</p></div><span className="tile-tag">Dancer</span></div>
            </div>
            <div className="tile-col">
              <div className="tile"><img src="images/img4.jpg"   alt="Influencer"   style={{ height: "300px" }} /><div className="tile-overlay"><h4>Neha Kapoor</h4><p>Influencer · Hyderabad</p></div><span className="tile-tag">Influencer</span></div>
              <div className="tile"><img src="images/img9.jpg"   alt="Voice Artist" style={{ height: "200px" }} /><div className="tile-overlay"><h4>Rohan Das</h4><p>Voice Artist · Delhi</p></div><span className="tile-tag">Voice</span></div>
              <div className="tile"><img src="images/img_6.png"  alt="Model"        style={{ height: "260px" }} /><div className="tile-overlay"><h4>Kavya Reddy</h4><p>Model · Chennai</p></div><span className="tile-tag">Model</span></div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="how-section">
          <h2 className="how-title reveal">How IndCasting works</h2>
          <p className="how-sub reveal">Three steps from profile to production.</p>
          <div className="steps-grid">
            {STEPS.map(({ n, h, p }: StepItem) => (
              <div className="step" key={n} data-n={n}>
                <div className="step-num">{n}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section className="pillars-section" ref={pillarsRef}>
          <div className="pillars-top">
            <h2 className="pillars-headline">
              The platform is built on<br /><em>four non-negotiables.</em>
            </h2>
            <p className="pillars-sub">
              India&apos;s entertainment industry is producing content at unprecedented scale.
              The infrastructure for talent discovery hasn&apos;t kept pace — until now.
            </p>
          </div>
          <div className="pillars-cards">
            {PILLARS.map(({ id, label, heading, body }: PillarItem) => (
              <div className="pillar-row" key={id}>
                <div className="pillar-bar" />
                <span className="pillar-id">PILLAR — {id}</span>
                <span className="pillar-label">{label}</span>
                <p className="pillar-heading">{heading}</p>
                <p className="pillar-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-orb cta-orb-1" />
          <div className="cta-orb cta-orb-2" />
          <div className="cta-orb cta-orb-3" />
          <div className="cta-ring" />
          <div className="cta-ring-2" />
          <div className="cta-inner-wrap">
            <span className="cta-label">Start your journey</span>
            <h2 className="cta-headline">
              Your next <br />
              opportunity <br />
              <span className="cta-last-line"><em>starts here.</em></span>
            </h2>
            <p className="cta-sub">
              Join thousands of artists and casting professionals building
              careers and projects on IndCasting every day.
            </p>
            <div className="cta-btns">
              <button className="cta-btn-gold">Join as Talent</button>
              <button className="cta-btn-outline">Hire Talent</button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}