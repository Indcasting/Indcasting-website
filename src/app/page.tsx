<<<<<<< HEAD
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
=======
"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gsap: {
      registerPlugin: (...args: unknown[]) => void;
      from: (targets: unknown, vars: Record<string, unknown>) => void;
      fromTo: (targets: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => void;
      to: (targets: unknown, vars: Record<string, unknown>) => void;
      set: (targets: unknown, vars: Record<string, unknown>) => void;
      utils: { toArray: <T = Element>(targets: string) => T[] };
      quickTo: (target: unknown, prop: string, vars: Record<string, unknown>) => (val: number) => void;
    };
    ScrollTrigger: {
      getAll: () => Array<{ kill: () => void }>;
      create: (vars: Record<string, unknown>) => void;
    };
  }
}

interface WhyItem     { icon: string; label: string }
interface StatItem    { n: string; l: string; num: number }
interface StepItem    { n: string; h: string; p: string }
interface CategoryItem{ label: string; emoji: string; count: string; color: string }

const WHY: WhyItem[] = [
  { icon: "✦", label: "Verified talent profiles" },
  { icon: "✦", label: "Privacy-controlled portfolios" },
  { icon: "✦", label: "Smart search & filters" },
  { icon: "✦", label: "Direct messaging" },
  { icon: "✦", label: "Fast shortlisting tools" },
  { icon: "✦", label: "Multiple membership plans" },
];

const CATEGORIES: CategoryItem[] = [
  { label: "Actors",        emoji: "🎭", count: "12,400+", color: "#c9a84c" },
  { label: "Models",        emoji: "✦",  count: "8,200+",  color: "#8b6914" },
  { label: "Singers",       emoji: "🎵", count: "4,100+",  color: "#c9a84c" },
  { label: "Dancers",       emoji: "🩰", count: "3,800+",  color: "#8b6914" },
  { label: "Voice Artists", emoji: "🎙", count: "2,600+",  color: "#c9a84c" },
  { label: "Child Artists", emoji: "⭐", count: "1,900+",  color: "#8b6914" },
  { label: "Influencers",   emoji: "📱", count: "5,500+",  color: "#c9a84c" },
  { label: "Anchors",       emoji: "🎤", count: "1,200+",  color: "#8b6914" },
];

const HERO_STATS: StatItem[] = [
  { n: "40,000+", l: "Registered artists",      num: 40000 },
  { n: "1,200+",  l: "Casting projects posted",  num: 1200  },
  { n: "350+",    l: "Production houses",         num: 350   },
];

const STEPS: StepItem[] = [
  { n: "01", h: "Build your portfolio", p: "Upload headshots, audition reels, experience and skills to craft a professional, searchable profile." },
  { n: "02", h: "Get discovered",       p: "Casting directors use smart filters — role, look, age, language, city — to shortlist the right fit." },
  { n: "03", h: "Connect and work",     p: "Message directly, schedule auditions and lock in projects across film, OTT, ads and music videos." },
];

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
>>>>>>> 83b8488ff8916d518dfc46f901d15cbd87f0f516

export default function Home() {
  const heroRef    = useRef<HTMLElement>(null);
  const tilesRef   = useRef<HTMLElement>(null);
  const catRef     = useRef<HTMLElement>(null);
  const gsapLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    (async (): Promise<void> => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      /* ── SCROLL PROGRESS ── */
      gsap.to(".progress-bar", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0 },
      });

      /* ── HERO SCRAMBLE ── */
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

      /* ── HERO WORDS ── */
      gsap.from(".hero-word", {
        y: 80, opacity: 0, rotateX: -40, stagger: 0.07,
        duration: 1, ease: "power4.out", delay: 0.15,
        transformOrigin: "top center", transformPerspective: 800,
      });
      gsap.from(".hero-eyebrow", { x: -30, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.05 });
      gsap.from(".hero-sub, .hero-btns", { y: 24, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.6 });

      /* ── STAT COUNTERS ── */
      document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target ?? "0", 10);
        const suffix = el.dataset.suffix ?? "";
        ScrollTrigger.create({
          trigger: el, start: "top 85%",
          onEnter: () => {
            let cur = 0;
            const step = Math.ceil(target / 60);
            const tick = (): void => {
              cur = Math.min(cur + step, target);
              el.textContent = cur.toLocaleString("en-IN") + suffix;
              if (cur < target) requestAnimationFrame(tick);
            };
            tick();
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card, i) => {
        gsap.to(card, { y: -20, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.25 });
      });

      /* ── TILE SCROLL
         Change 1: all columns start at marginTop:0 in JSX.
         We give alternating vertical offsets via GSAP fromTo
         so they begin visually level and diverge as you scroll.
      ── */
      const columns = tilesRef.current?.querySelectorAll<HTMLElement>(".tile-col");
      if (columns) {
        // Even columns travel downward, odd columns travel upward — equal magnitude
        const distances = [180, -180, 180, -180];
        columns.forEach((col, i) => {
          gsap.fromTo(col,
            { y: -distances[i] * 0.5 },   // start offset (half, so midpoint = 0)
            {
              y: distances[i] * 0.5,        // end offset
              ease: "none",
              scrollTrigger: {
                trigger: tilesRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              },
            }
          );
        });
      }

      gsap.utils.toArray<HTMLElement>(".tile img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.15, y: -30 }, {
          scale: 1, y: 30, ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 2.5 },
        });
      });

      /* Tiles eyebrow character reveal */
      const eyebrow = document.querySelector<HTMLElement>(".tiles-eyebrow");
      if (eyebrow) {
        const text = eyebrow.textContent ?? "";
        eyebrow.innerHTML = text.split("").map(c => c === " " ? " " : `<span class="e-ch">${c}</span>`).join("");
        gsap.from(".e-ch", {
          opacity: 0, y: 10, stagger: 0.025, duration: 0.4, ease: "power2.out",
          scrollTrigger: { trigger: eyebrow, start: "top 90%" },
        });
      }

      /* ── CATEGORIES — horizontal scroll (Change 2) ── */
      const catTrack = catRef.current?.querySelector<HTMLElement>(".cat-track");
      if (catTrack && catRef.current) {
        const totalWidth = catTrack.scrollWidth - catRef.current.offsetWidth;
        gsap.to(catTrack, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: catRef.current,
            start: "top top",
            end: () => `+=${totalWidth + 200}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      /* Category card 3D tilt */
      document.querySelectorAll<HTMLElement>(".cat-card").forEach((card) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width  - 0.5;
          const y = (e.clientY - r.top)  / r.height - 0.5;
          gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, duration: 0.3, ease: "power2.out", transformPerspective: 800 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
        });
      });

      /* ── HOW IT WORKS ── */
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

      /* ── WHY SECTION ── */
      gsap.utils.toArray<HTMLElement>(".why-list li").forEach((li, i) => {
        gsap.from(li, {
          x: 50, opacity: 0, duration: 0.6, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: li, start: "top 88%", toggleActions: "play none none none" },
        });
      });
      gsap.from(".why-title", {
        clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power4.inOut",
        scrollTrigger: { trigger: ".why-title", start: "top 85%", toggleActions: "play none none none" },
      });

      /* ── CTA — artsy (Change 5) ── */
      // Headline masked word reveal
      const ctaH2 = document.querySelector<HTMLElement>(".cta-headline");
      if (ctaH2) {
        const words = (ctaH2.textContent ?? "").split(" ");
        ctaH2.innerHTML = words.map(w =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="cta-inner" style="display:inline-block;">${w}</span></span>`
        ).join(" ");
        gsap.from(".cta-inner", {
          y: "110%", duration: 0.9, stagger: 0.08, ease: "power4.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 82%", toggleActions: "play none none none" },
        });
      }

      // Floating gold orbs parallax
      gsap.utils.toArray<HTMLElement>(".cta-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -60 : 60,
          x: i % 3 === 0 ? -30 : 30,
          ease: "none",
          scrollTrigger: { trigger: ".cta-section", start: "top bottom", end: "bottom top", scrub: 2 },
        });
        // Also animate on entrance
        gsap.from(orb, {
          scale: 0, opacity: 0, duration: 1.2, delay: i * 0.15, ease: "elastic.out(1,0.6)",
          scrollTrigger: { trigger: ".cta-section", start: "top 80%", toggleActions: "play none none none" },
        });
      });

      // CTA sub + label slide up
      gsap.from(".cta-sub, .cta-label", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 78%", toggleActions: "play none none none" },
      });

      // Magnetic CTA buttons
      document.querySelectorAll<HTMLElement>(".cta-btns button").forEach((btn) => {
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const bx = (e.clientX - r.left - r.width  / 2) * 0.4;
          const by = (e.clientY - r.top  - r.height / 2) * 0.4;
          gsap.to(btn, { x: bx, y: by, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
        });
      });

      // Rotating ring
      gsap.to(".cta-ring", {
        rotation: 360, duration: 18, ease: "none", repeat: -1,
      });
      gsap.to(".cta-ring-2", {
        rotation: -360, duration: 26, ease: "none", repeat: -1,
      });

      /* ── GENERIC REVEALS ── */
      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

    })();

    return () => { window.ScrollTrigger?.getAll?.()?.forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:"rgba(201,168,76,0.15)", zIndex:200 }}>
        <div className="progress-bar" style={{ height:"100%", background:"var(--gold)", transformOrigin:"left", transform:"scaleX(0)" }} />
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink:  #0f0e0d; --cream: #FFFDF7; --gold: #c9a84c; --gold2: #e8c96a;
          --mist: #f0ebe0; --mid:  #6b6560; --white: #ffffff;
          --radius-md: 14px; --radius-lg: 24px;
        }
        body { background: var(--cream); color: var(--ink); overflow-x: hidden; font-family: system-ui, sans-serif; }

        /* ── HERO ── */
        .hero {
          min-height: 100svh; padding: 120px 4vw 80px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gold); font-weight: 600; margin-bottom: 1.5rem;
        }
        .hero-eyebrow::before { content:""; display:block; width:28px; height:1px; background:var(--gold); }
        .hero-title {
          font-size: clamp(2.6rem, 5vw, 4.2rem); font-weight: 800; line-height: 1.06;
          letter-spacing: -0.03em; margin-bottom: 1.5rem; overflow: hidden; perspective: 800px;
        }
        .hero-word { display: inline-block; transform-style: preserve-3d; }
        .hero-scramble {
          display: block; font-size: 0.78rem; font-family: monospace;
          color: var(--gold); letter-spacing: 0.1em; margin-bottom: 1rem; opacity: 0.7;
        }
        .hero-sub { font-size: 1.05rem; color: var(--mid); line-height: 1.7; max-width: 460px; margin-bottom: 2.5rem; }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          background: var(--gold); color: var(--ink); border: none; border-radius: 100px;
          padding: 0.85rem 2.2rem; font-size: 0.95rem; font-weight: 700;
          position: relative; overflow: hidden; transition: background .2s; cursor: pointer;
        }
        .btn-primary::after {
          content:""; position:absolute; inset:0; background:rgba(255,255,255,0.25);
          transform:translateX(-100%); transition:transform .3s ease;
        }
        .btn-primary:hover::after { transform:translateX(0); }
        .btn-primary:hover { background: var(--gold2); }
        .btn-outline {
          background: transparent; color: var(--ink); border: 1.5px solid var(--ink);
          border-radius: 100px; padding: 0.85rem 2.2rem; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; transition: background .15s, color .15s;
        }
        .btn-outline:hover { background: var(--ink); color: var(--white); }

        .stat-card {
          background: rgba(255,255,255,0.5); border-radius: 12px;
          padding: 1.2rem 1.6rem; border-left: 3px solid var(--gold);
          backdrop-filter: blur(8px);
        }
        .stat-num { font-size: clamp(2rem,4vw,2.6rem); font-weight:900; letter-spacing:-0.04em; line-height:1; }

        /* ── TILES ──
           Change 1: no marginTop offsets — columns start level.
           GSAP drives the parallax divergence from centre.
        ── */
        .tiles-section { padding: 40px 4vw 60px; overflow: hidden; }
        .tiles-eyebrow {
          text-align: center; font-size: 0.72rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--mid); margin-bottom: 2.5rem;
        }
        .tiles-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 16px; align-items: start; min-height: 1100px;
        }
        .tile-col { display: flex; flex-direction: column; gap: 16px; will-change: transform; }
        .tile { border-radius: var(--radius-md); overflow: hidden; position: relative; background: var(--mist); }
        .tile img { width: 100%; display: block; object-fit: cover; object-position: center; will-change: transform; }
        .tile-overlay {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem;
          background: linear-gradient(to top, rgba(15,14,13,0.7) 0%, transparent 100%);
          color: var(--white);
        }
        .tile-overlay h4 { font-size: 0.9rem; font-weight: 700; }
        .tile-overlay p  { font-size: 0.75rem; opacity: 0.8; }
        .tile-tag {
          position: absolute; top: 12px; left: 12px; background: var(--gold); color: var(--ink);
          border-radius: 100px; padding: 3px 10px; font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        /* ── CATEGORIES — horizontal scroll (Change 2) ── */
        .categories-section {
          overflow: hidden;
          background: #FFF9EE;
        }
        .cat-scroll-header {
          padding: 80px 4vw 3rem;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .section-label { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 0.5rem; }
        .cat-title { font-size: clamp(1.8rem,3vw,2.6rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; }
        .cat-scroll-hint { font-size: 0.78rem; color: var(--mid); letter-spacing: 0.06em; }
        .cat-track-wrap { padding: 0 4vw 80px; overflow: visible; }
        .cat-track {
          display: flex; gap: 1.25rem; width: max-content;
        }
        .cat-card {
          flex-shrink: 0; width: 220px;
          position: relative; border-radius: 18px; padding: 2rem 1.6rem 1.8rem;
          background: var(--white); border: 1.5px solid var(--mist); cursor: pointer;
          will-change: transform; transition: border-color .2s, box-shadow .2s;
          transform-style: preserve-3d;
        }
        .cat-card:hover { border-color: var(--gold); box-shadow: 0 16px 48px rgba(201,168,76,0.18); }
        .cat-card::before {
          content: ""; display: block; position: absolute; top: 0; left: 1.6rem; right: 1.6rem;
          height: 2px; background: var(--gold); border-radius: 0 0 4px 4px;
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cat-card:hover::before { transform: scaleX(1); }
        .cat-emoji { font-size: 2rem; line-height: 1; margin-bottom: 1rem; display: block; transition: transform .4s cubic-bezier(0.34,1.56,0.64,1); }
        .cat-card:hover .cat-emoji { transform: translateY(-4px) scale(1.12); }
        .cat-card-label { font-size: 1.05rem; font-weight: 700; letter-spacing: -0.01em; color: var(--ink); display: block; margin-bottom: 0.35rem; }
        .cat-card-count { font-size: 0.78rem; color: var(--mid); display: block; margin-bottom: 1.2rem; }
        .cat-card-arrow {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%; background: var(--mist);
          font-size: 0.85rem; color: var(--ink);
          transition: background .2s, transform .3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cat-card:hover .cat-card-arrow { background: var(--gold); transform: translateX(4px); }

        /* ── HOW IT WORKS ── */
        .how-section { padding: 100px 4vw; }
        .how-title { font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.5rem; }
        .how-sub { color: var(--mid); margin-bottom: 3.5rem; font-size: 1rem; }
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; border: 1.5px solid var(--mist); }
        .step {
          padding: 2.5rem; border: 1.5px solid var(--mist);
          transition: background .3s, box-shadow .3s; position: relative; overflow: hidden;
        }
        .step::after {
          content: attr(data-n); position: absolute; bottom: -1rem; right: 1rem;
          font-size: 7rem; font-weight: 900; color: var(--gold); opacity: 0.04;
          line-height: 1; pointer-events: none; user-select: none;
        }
        .step:hover { background: rgba(201,168,76,0.04); box-shadow: 0 0 0 1.5px var(--gold); }
        .step-num { font-size: 3rem; font-weight: 900; color: var(--gold); opacity: 0.35; line-height: 1; margin-bottom: 1.2rem; }
        .step h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .step p  { color: var(--mid); font-size: 0.9rem; line-height: 1.65; }

        /* ── WHY ── */
        .why-section {
          background: var(--cream); color: var(--ink); padding: 100px 4vw;
          display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
        }
        .why-left {
          display: flex; flex-direction: column; justify-content: center; align-self: center;
        }
        .why-title {
          font-size: clamp(2rem,3.5vw,3rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
        }
        .why-title em { color: var(--gold); font-style: normal; }
        .why-body { color: var(--mid); margin-top: 1rem; line-height: 1.7; }
        .why-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .why-list li {
          display: flex; align-items: center; gap: 1rem; font-size: 0.95rem; color: var(--ink);
          border-bottom: 1px solid #ddd6ca; padding-bottom: 1rem;
          position: relative; overflow: hidden;
        }
        .why-list li::after {
          content: ""; position: absolute; left: 0; bottom: 0; height: 1px;
          width: 0; background: var(--gold); transition: width .5s ease;
        }
        .why-list li:hover::after { width: 100%; }
        .why-list li span { color: var(--gold); font-size: 0.75rem; }

<<<<<<< HEAD
  <Link href="/explore-talent" className="gold-btn">
    Explore Talent
</Link>

  <Link href="/signup" className="purple-btn">
    Join as Talent
</Link>
=======
        /* ── CTA — artsy warm ── */
        .cta-section {
          padding: 140px 4vw 160px;
          text-align: center;
          background: #FFFBF0;
          position: relative;
          overflow: hidden;
          border-top: 1.5px solid #f0e8cc;
        }

        /* Decorative background grid */
        .cta-section::before {
          content: "";
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
>>>>>>> 83b8488ff8916d518dfc46f901d15cbd87f0f516

        /* Floating orbs */
        .cta-orb {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%);
          pointer-events: none; will-change: transform;
        }
        .cta-orb-1 { width: 500px; height: 500px; top: -120px; left: -140px; }
        .cta-orb-2 { width: 360px; height: 360px; bottom: -80px; right: -80px; }
        .cta-orb-3 { width: 220px; height: 220px; top: 35%; left: 58%; }

        /* Rotating rings */
        .cta-ring, .cta-ring-2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          border: 1px solid rgba(201,168,76,0.18);
          top: 50%; left: 50%; transform-origin: center;
        }
        .cta-ring   { width: 620px; height: 620px; margin: -310px 0 0 -310px; }
        .cta-ring-2 { width: 940px; height: 940px; margin: -470px 0 0 -470px; border-color: rgba(201,168,76,0.09); }

        /* CTA content */
        .cta-inner-wrap {
          position: relative; z-index: 2;
          max-width: 780px; margin: 0 auto;
        }
        .cta-label {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--gold); font-weight: 700; margin-bottom: 2rem;
        }
        .cta-label::before, .cta-label::after {
          content: ""; display: block; width: 32px; height: 1px; background: var(--gold); opacity: 0.6;
        }
        .cta-headline {
          font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 900;
          letter-spacing: -0.04em; line-height: 1.04;
          color: var(--ink); margin-bottom: 1.8rem;
        }
        .cta-headline em { color: var(--gold); font-style: normal; }
        .cta-sub {
          color: var(--mid); max-width: 480px; margin: 0 auto 3rem;
          font-size: 1rem; line-height: 1.7;
        }
        .cta-btns {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
        }
        .cta-btn-gold {
          background: var(--gold); color: var(--ink); border: none;
          border-radius: 100px; padding: 1rem 2.6rem; font-size: 1rem; font-weight: 700;
          cursor: pointer; position: relative; overflow: hidden; transition: background .2s;
          box-shadow: 0 8px 28px rgba(201,168,76,0.35);
        }
        .cta-btn-gold::after {
          content: ""; position: absolute; inset: 0; background: rgba(255,255,255,0.25);
          transform: translateX(-100%); transition: transform .3s ease;
        }
        .cta-btn-gold:hover::after { transform: translateX(0); }
        .cta-btn-gold:hover { background: var(--gold2); }
        .cta-btn-outline {
          background: transparent; color: var(--ink);
          border: 1.5px solid rgba(15,14,13,0.25);
          border-radius: 100px; padding: 1rem 2.6rem; font-size: 1rem; font-weight: 600;
          cursor: pointer; transition: background .2s, border-color .2s;
        }
        .cta-btn-outline:hover { background: rgba(15,14,13,0.06); border-color: var(--ink); }

        /* Ticker */
        .cta-ticker {
          margin-top: 4rem;
          overflow: hidden;
          border-top: 1px solid rgba(201,168,76,0.25);
          padding-top: 1.4rem;
          position: relative; z-index: 2;
        }
        .cta-ticker-track {
          display: flex; gap: 3rem; width: max-content;
          animation: ctaTicker 20s linear infinite;
        }
        .cta-ticker-item {
          white-space: nowrap; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(15,14,13,0.3); display: flex; align-items: center; gap: 1rem;
        }
        .cta-ticker-item em { color: var(--gold); font-style: normal; }
        .cta-ticker-item::after { content: "✦"; color: var(--gold); font-size: 0.45rem; opacity: 0.7; }
        @keyframes ctaTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero-image { display: none; }
          .tiles-grid { grid-template-columns: repeat(2,1fr); }
          .cat-card { width: 180px; }
          .steps-grid { grid-template-columns: 1fr; }
          .why-section { grid-template-columns: 1fr; gap: 3rem; }
        }
        @media (max-width: 540px) {
          .tiles-grid { grid-template-columns: repeat(2,1fr); }
          .cat-card { width: 160px; }
        }
      `}</style>

      <main>

<<<<<<< HEAD


      {/* HOW IT WORKS */}

      <section className="section">

        <h2 className="section-title">
          How IndCasting Works
        </h2>

        <div className="card-container">

         <Link href="/create-portfolio" className="card portfolio-card">

  <h3>🎭</h3>

  <h4>Create Your Portfolio</h4>

  <p>
    Upload headshots, audition videos,
    experience, skills and achievements
    to build a professional profile.
  </p>

</Link>
          <div className="card">
=======
        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div>
            <span className="hero-scramble">INDCASTING.IN — SINCE 2026</span>
            <p className="hero-eyebrow">India&apos;s Premium Casting Platform</p>
            <h1 className="hero-title">
              {"Discover the Right Talent for Every Story.".split(" ").map((word, i) => (
                <span key={i} className="hero-word">{word}&nbsp;</span>
              ))}
            </h1>
            <p className="hero-sub">
              IndCasting connects actors, models, dancers, singers, voice artists
              and creators with casting directors and production houses through a
              secure, professional platform.
            </p>
            <div className="hero-btns">
              <button className="btn-primary">Explore Talent</button>
              <button className="btn-outline">Join as Talent</button>
            </div>
          </div>

          <div className="hero-image" style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
            {HERO_STATS.map(({ n, l, num }: StatItem) => (
              <div className="stat-card" key={l}>
                <div className="stat-num" data-target={num} data-suffix="+">{n}</div>
                <div style={{ color:"var(--mid)", fontSize:"0.88rem", marginTop:"0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
>>>>>>> 83b8488ff8916d518dfc46f901d15cbd87f0f516

        {/* ── TILE SCROLL ── Change 1: no marginTop on any column ── */}
        <section className="tiles-section" ref={tilesRef}>
          <div className="tiles-grid">

            <div className="tile-col">
              <div className="tile"><img src="images/img1.jpg"   alt="Actor"  style={{height:"280px"}} /><div className="tile-overlay"><h4>Riya Sharma</h4><p>Actor · Mumbai</p></div><span className="tile-tag">Actor</span></div>
              <div className="tile"><img src="images/img12.jpg"  alt="Model"  style={{height:"200px"}} /><div className="tile-overlay"><h4>Rahul Bose</h4><p>Model · Mumbai</p></div><span className="tile-tag">Model</span></div>
              <div className="tile"><img src="images/img_2.png"  alt="Singer" style={{height:"240px"}} /><div className="tile-overlay"><h4>Megha Singh</h4><p>Singer · Jaipur</p></div><span className="tile-tag">Singer</span></div>
            </div>

            <div className="tile-col">
              <div className="tile"><img src="images/img_7.png"  alt="Model"  style={{height:"240px"}} /><div className="tile-overlay"><h4>Arjun Mehta</h4><p>Model · Delhi</p></div><span className="tile-tag">Model</span></div>
              <div className="tile"><img src="images/img3.jpg"   alt="Actor"  style={{height:"300px"}} /><div className="tile-overlay"><h4>Priya Nair</h4><p>Actor · Chennai</p></div><span className="tile-tag">Actor</span></div>
              <div className="tile"><img src="images/img8.png"   alt="Anchor" style={{height:"200px"}} /><div className="tile-overlay"><h4>Dev Khanna</h4><p>Anchor · Pune</p></div><span className="tile-tag">Anchor</span></div>
            </div>

            <div className="tile-col">
              <div className="tile"><img src="images/img5.jpg"   alt="Singer" style={{height:"260px"}} /><div className="tile-overlay"><h4>Ananya Roy</h4><p>Singer · Kolkata</p></div><span className="tile-tag">Singer</span></div>
              <div className="tile"><img src="images/img_10.png" alt="Actor"  style={{height:"220px"}} /><div className="tile-overlay"><h4>Vikram Patel</h4><p>Actor · Ahmedabad</p></div><span className="tile-tag">Actor</span></div>
              <div className="tile"><img src="images/img11.jpg"  alt="Dancer" style={{height:"250px"}} /><div className="tile-overlay"><h4>Aarav Menon</h4><p>Dancer · Bengaluru</p></div><span className="tile-tag">Dancer</span></div>
            </div>

            <div className="tile-col">
              <div className="tile"><img src="images/img4.jpg"   alt="Influencer"   style={{height:"300px"}} /><div className="tile-overlay"><h4>Neha Kapoor</h4><p>Influencer · Hyderabad</p></div><span className="tile-tag">Influencer</span></div>
              <div className="tile"><img src="images/img9.jpg"   alt="Voice Artist" style={{height:"200px"}} /><div className="tile-overlay"><h4>Rohan Das</h4><p>Voice Artist · Delhi</p></div><span className="tile-tag">Voice</span></div>
              <div className="tile"><img src="images/img_6.png"  alt="Model"        style={{height:"260px"}} /><div className="tile-overlay"><h4>Kavya Reddy</h4><p>Model · Chennai</p></div><span className="tile-tag">Model</span></div>
            </div>

          </div>
        </section>

        {/* ── CATEGORIES — horizontal scroll (Changes 2 & 3) ── */}
        <section className="categories-section" ref={catRef}>
          <div className="cat-scroll-header reveal">
            <div>
              <span className="section-label">Explore by discipline</span>
              <h2 className="cat-title">Browse talent categories</h2>
            </div>
            <span className="cat-scroll-hint">← drag to scroll →</span>
          </div>
          <div className="cat-track-wrap">
            <div className="cat-track">
              {CATEGORIES.map(({ label, emoji, count }: CategoryItem) => (
                <div className="cat-card" key={label}>
                  <span className="cat-emoji" role="img" aria-label={label}>{emoji}</span>
                  <span className="cat-card-label">{label}</span>
                  <span className="cat-card-count">{count} artists</span>
                  <span className="cat-card-arrow">→</span>
                </div>
              ))}
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

        {/* ── WHY INDCASTING ── */}
        <section className="why-section">
          <div className="why-left">
            <h2 className="why-title">
              Why the industry trusts <em>IndCasting</em>
            </h2>
            <p className="why-body reveal">
              Built for the pace of Indian entertainment — from national OTT releases
              to regional ad shoots. Every feature is designed to save time and
              reduce the gap between talent and opportunity.
            </p>
          </div>
          <ul className="why-list">
            {WHY.map(({ icon, label }: WhyItem) => (
              <li key={label}><span>{icon}</span>{label}</li>
            ))}
          </ul>
        </section>

        {/* ── CTA — artsy (Change 5) ── */}
        <section className="cta-section">

          {/* Decorative orbs */}
          <div className="cta-orb cta-orb-1" />
          <div className="cta-orb cta-orb-2" />
          <div className="cta-orb cta-orb-3" />

          {/* Rotating rings */}
          <div className="cta-ring" />
          <div className="cta-ring-2" />

          <div className="cta-inner-wrap">
            <span className="cta-label">Start your journey</span>

            <h2 className="cta-headline">
              Your next<br />
              opportunity<br />
              <em>starts here.</em>
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

          {/* Bottom ticker */}
          <div className="cta-ticker">
            <div className="cta-ticker-track">
              {["Actors", "Models", "Singers", "Dancers", "Voice Artists", "Influencers", "Anchors", "Child Artists",
                "Actors", "Models", "Singers", "Dancers", "Voice Artists", "Influencers", "Anchors", "Child Artists"].map((t, i) => (
                <span className="cta-ticker-item" key={i}>{t}</span>
              ))}
            </div>
          </div>

        </section>

      </main>
    </>
  );
}
