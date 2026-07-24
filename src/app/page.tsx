"use client";

import { useEffect, useRef } from "react";

// ── GSAP globals augmentation ─────────────────────────────────────────────────
declare global {
  interface Window {
    gsap: {
      registerPlugin: (...args: unknown[]) => void;
      from: (targets: unknown, vars: Record<string, unknown>) => void;
      fromTo: (
        targets: unknown,
        fromVars: Record<string, unknown>,
        toVars: Record<string, unknown>
      ) => void;
      utils: {
        toArray: <T = Element>(targets: string) => T[];
      };
    };
    ScrollTrigger: {
      getAll: () => Array<{ kill: () => void }>;
    };
  }
}

// ── Data types ────────────────────────────────────────────────────────────────
interface TalentItem {
  name: string;
  role: string;
  city: string;
  img: string;
}

interface CastingCall {
  tag: string;
  title: string;
  desc: string;
  loc: string;
}

interface WhyItem {
  icon: string;
  label: string;
}

interface StatItem {
  n: string;
  l: string;
}

interface StepItem {
  n: string;
  h: string;
  p: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TALENT: TalentItem[] = [
  { name: "Riya Sharma",  role: "Actor",        city: "Mumbai",    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80" },
  { name: "Arjun Mehta",  role: "Model",        city: "Delhi",     img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Ananya Roy",   role: "Singer",       city: "Kolkata",   img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
  { name: "Karan Patel",  role: "Dancer",       city: "Bengaluru", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
  { name: "Priya Nair",   role: "Voice Artist", city: "Chennai",   img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { name: "Dev Khanna",   role: "Anchor",       city: "Pune",      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
];

const CASTING_CALLS: CastingCall[] = [
  { tag: "Film",        title: "Lead Female Actor",    desc: "Romantic drama, female 20–28, shoot starts September.", loc: "Mumbai" },
  { tag: "Ad",          title: "Fashion Models",        desc: "Premium clothing campaign, male & female, all looks.",  loc: "Delhi" },
  { tag: "Music Video", title: "Contemporary Dancers", desc: "Upcoming label release, 4 slots open, paid.",           loc: "Bengaluru" },
];

const WHY: WhyItem[] = [
  { icon: "✦", label: "Verified talent profiles" },
  { icon: "✦", label: "Privacy-controlled portfolios" },
  { icon: "✦", label: "Smart search & filters" },
  { icon: "✦", label: "Direct messaging" },
  { icon: "✦", label: "Fast shortlisting tools" },
  { icon: "✦", label: "Multiple membership plans" },
];

const CATEGORIES: string[] = [
  "Actors", "Models", "Singers", "Dancers",
  "Voice Artists", "Child Artists", "Influencers", "Anchors",
];

const HERO_STATS: StatItem[] = [
  { n: "40,000+", l: "Registered artists" },
  { n: "1,200+",  l: "Casting projects posted" },
  { n: "350+",    l: "Production houses" },
];

const STEPS: StepItem[] = [
  { n: "01", h: "Build your portfolio", p: "Upload headshots, audition reels, experience and skills to craft a professional, searchable profile." },
  { n: "02", h: "Get discovered",       p: "Casting directors use smart filters — role, look, age, language, city — to shortlist the right fit." },
  { n: "03", h: "Connect and work",     p: "Message directly, schedule auditions and lock in projects across film, OTT, ads and music videos." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(s);
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef    = useRef<HTMLElement>(null);
  const tilesRef   = useRef<HTMLElement>(null);
  const gsapLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    (async (): Promise<void> => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      // Premium Parallax
const columns = tilesRef.current?.querySelectorAll<HTMLElement>(".tile-col");

if (columns) {
  const distances = [-320, 220, -180, 280];

  columns.forEach((col, i) => {
    gsap.fromTo(
      col,
      {
        y: distances[i] * -0.25,
      },
      {
        y: distances[i],
        ease: "none",
        scrollTrigger: {
          trigger: tilesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 3,
        },
      }
    );
  });
}

gsap.utils.toArray<HTMLElement>(".tile img").forEach((img, index) => {
  gsap.fromTo(
    img,
    {
      scale: 1.18,
      y: -40,
    },
    {
      scale: 1,
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: 2.5,
      },
    }
  );
});

      // Hero title word stagger
      gsap.from(".hero-word", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      // Section reveals on scroll
      gsap.utils.toArray<Element>(".reveal").forEach((el: Element) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Talent cards stagger
      gsap.utils.toArray<Element>(".talent-stagger").forEach((group: Element) => {
        const cards = group.querySelectorAll(".t-card");
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });
    })();

    return () => {
      window.ScrollTrigger?.getAll?.()?.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:       #0f0e0d;
          --cream:     #f5f2ec;
          --gold:      #c9a84c;
          --gold2:     #e8c96a;
          --ruby:      #8b1a3a;
          --mist:      #e8e4dc;
          --mid:       #6b6560;
          --white:     #ffffff;
          --radius-sm: 6px;
          --radius-md: 14px;
          --radius-lg: 24px;
        }

        body { background: var(--cream); color: var(--ink); }

        /* ── HERO ── */
        .hero {
          min-height: 100svh; padding: 120px 4vw 80px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center;
          position: relative; overflow: hidden;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gold); font-weight: 600; margin-bottom: 1.5rem;
        }
        .hero-eyebrow::before { content: ""; display: block; width: 28px; height: 1px; background: var(--gold); }
        .hero-title {
          font-size: clamp(2.6rem, 5vw, 4.2rem);
          font-weight: 800; line-height: 1.06;
          letter-spacing: -0.03em; color: var(--ink);
          margin-bottom: 1.5rem; overflow: hidden;
        }
        .hero-word { display: inline-block; }
        .hero-sub { font-size: 1.05rem; color: var(--mid); line-height: 1.7; max-width: 460px; margin-bottom: 2.5rem; }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          background: var(--gold); color: var(--ink);
          border: none; border-radius: 100px;
          padding: 0.8rem 2rem; font-size: 0.95rem; font-weight: 700;
          cursor: pointer; transition: background .2s;
        }
        .btn-primary:hover { background: var(--gold2); }
        .btn-outline {
          background: transparent; color: var(--ink);
          border: 1.5px solid var(--ink); border-radius: 100px;
          padding: 0.8rem 2rem; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; transition: background .15s;
        }
        .btn-outline:hover { background: var(--mist); }

        /* ── TILE GRID (TileScroll effect) ── */
        .tiles-section { padding: 40px 4vw 250px; overflow: hidden; }
        .tiles-eyebrow {
          text-align: center;
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--mid); margin-bottom: 2.5rem;
        }
        .tiles-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; align-items: start; min-height:1200px;
        }
        .tile-col { display: flex; flex-direction: column; gap: 16px; will-change: transform; }
        .tile { border-radius: var(--radius-md); overflow: hidden; position: relative; background: var(--mist); }
        .tile img { width: 100%; height:100%; display: block; object-fit: cover; object-position:center; will-change:transform; transition: transform 0.5s ease; }
        .tile{ background: transparent;
    overflow:hidden;
}

.tile img{
    transition:none;
    will-change:transform;
}
        .tile-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(15,14,13,0.7) 0%, transparent 100%);
          color: var(--white);
        }
        .tile-overlay h4 { font-size: 0.9rem; font-weight: 700; }
        .tile-overlay p  { font-size: 0.75rem; opacity: 0.8; }
        .tile-tag {
          position: absolute; top: 12px; left: 12px;
          background: var(--gold); color: var(--ink);
          border-radius: 100px; padding: 3px 10px;
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
        }

        /* ── CATEGORIES ── */
        .categories-section { var(--cream); color: var(--ink); padding: 80px 4vw; }
        .section-label {
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 2.5rem; display: block;
        }
        .cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; border: 1px solid #d9d2c6; background: #d9d2c6; }
        .cat-cell {
          padding: 1.6rem 1.4rem; border: 1px solid rgba(255,255,255,0.08);
          font-size: 1.05rem; font-weight: 600;
          cursor: pointer; transition: background .2s, color .2s;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .cat-cell::before { content: "→"; color: var(--gold); font-size: 0.9rem; }
        .cat-cell:hover { background: rgba(201,168,76,0.12); color: var(--gold); }

        /* ── HOW IT WORKS ── */
        .how-section { padding: 100px 4vw; }
        .how-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.5rem; }
        .how-sub { color: var(--mid); margin-bottom: 3.5rem; font-size: 1rem; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; border: 1.5px solid var(--mist); }
        .step { padding: 2.5rem; border: 1.5px solid var(--mist); }
        .step-num { font-size: 3rem; font-weight: 900; color: var(--gold); opacity: 0.35; line-height: 1; margin-bottom: 1.2rem; font-variant-numeric: tabular-nums; }
        .step h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .step p  { color: var(--mid); font-size: 0.9rem; line-height: 1.65; }

        /* ── FEATURED TALENT ── */
        .talent-section { padding: 100px 4vw; background: var(--mist); }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .section-header h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -0.025em; }
        .see-all { font-size: 0.875rem; color: var(--mid); text-decoration: none; display: flex; align-items: center; gap: 0.3rem; }
        .see-all:hover { color: var(--ink); }
        .talent-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .t-card { background: var(--white); border-radius: var(--radius-lg); overflow: hidden; }
        .t-card-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
        .t-card-body { padding: 1.2rem 1.4rem; }
        .t-card-body h3 { font-size: 1rem; font-weight: 700; }
        .t-card-body .t-role { color: var(--mid); font-size: 0.85rem; margin: 0.2rem 0; }
        .t-card-body .t-city { font-size: 0.75rem; color: var(--gold); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }

        /* ── CASTING CALLS ── */
        .casting-section { padding: 100px 4vw; }
        .casting-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; }
        .c-card {
          border: 1.5px solid var(--mist); border-radius: var(--radius-md);
          padding: 2rem; display: flex; flex-direction: column; gap: 0.8rem;
          transition: border-color .2s, transform .2s;
        }
        .c-card:hover { border-color: var(--gold); transform: translateY(-3px); }
        .c-tag {
          display: inline-block;
          background: rgba(201,168,76,0.15); color: #8a6a1a;
          border-radius: 100px; padding: 3px 12px;
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.06em; width: fit-content;
        }
        .c-card h3 { font-size: 1.05rem; font-weight: 700; }
        .c-card p  { color: var(--mid); font-size: 0.88rem; line-height: 1.6; flex: 1; }
        .c-loc { font-size: 0.8rem; color: var(--mid); }
        .btn-ghost {
          background: transparent; color: var(--ink);
          border: 1px solid var(--ink); border-radius: 100px;
          padding: 0.5rem 1.2rem; font-size: 0.82rem; font-weight: 600;
          cursor: pointer; width: fit-content; transition: background .15s;
        }
        .btn-ghost:hover { background: var(--ink); color: var(--white); }

        /* ── WHY ── */
        .why-section {
          background: #f9f7f2; color: var(--ink);
          padding: 100px 4vw;
          display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
        }
        .why-title { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; }
        .why-title em { color: var(--gold); font-style: normal; }
        .why-body { color: var(--mid); margin-top: 1rem; line-height: 1.7; }
        .why-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .why-list li {
          display: flex; align-items: center; gap: 1rem;
          font-size: 0.95rem; color: var(--ink);
          border-bottom: 1px solid #ddd6ca; padding-bottom: 1rem;
        }
        .why-list li span { color: var(--gold); font-size: 0.75rem; }

        /* ── CTA ── */
        .cta-section { padding: 120px 4vw; text-align: center; border-top: 1.5px solid var(--mist); }
        .cta-section h2 {
          font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900;
          letter-spacing: -0.035em; line-height: 1.05;
          max-width: 700px; margin: 0 auto 1.5rem;
        }
        .cta-section p { color: var(--mid); max-width: 500px; margin: 0 auto 2.5rem; }
        .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* ── FOOTER ── */
        footer {
          background: var(--ink); color: rgba(255,255,255,0.4);
          padding: 2.5rem 4vw; display: flex;
          justify-content: space-between; align-items: center;
          font-size: 0.82rem;
        }
        footer a { color: rgba(255,255,255,0.4); text-decoration: none; }
        footer a:hover { color: var(--white); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero-image { display: none; }
          .tiles-grid { grid-template-columns: repeat(2, 1fr); }
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: 1fr; }
          .talent-row { grid-template-columns: repeat(2, 1fr); }
          .casting-grid { grid-template-columns: 1fr; }
          .why-section { grid-template-columns: 1fr; gap: 3rem; }
          nav .nav-links { display: none; }
        }

        @media (max-width: 540px) {
          .tiles-grid { grid-template-columns: repeat(2, 1fr); }
          .talent-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div>
            <p className="hero-eyebrow">India&apos;s Premium Casting Platform</p>
            <h1 className="hero-title">
              {"Discover the Right Talent for Every Story.".split(" ").map(
                (word: string, i: number) => (
                  <span key={i} className="hero-word">{word}&nbsp;</span>
                )
              )}
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

          {/* Hero stats sidebar */}
          <div className="hero-image" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {HERO_STATS.map(({ n, l }: StatItem) => (
              <div key={l} style={{ borderLeft: "3px solid var(--gold)", paddingLeft: "1.5rem" }}>
                <div style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {n}
                </div>
                <div style={{ color: "var(--mid)", fontSize: "0.9rem", marginTop: "0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TILE SCROLL SECTION ── */}
        <section className="tiles-section" ref={tilesRef}>
          <p className="tiles-eyebrow">Talent across every genre — scroll to explore</p>
          <div className="tiles-grid">

            {/* Column 1 — starts lower */}
            <div className="tile-col" style={{ marginTop: "80px" }}>
              <div className="tile">
                <img src="images/img1.jpg" alt="Actor" style={{ height: "280px" }} />
                <div className="tile-overlay"><h4>Riya Sharma</h4><p>Actor · Mumbai</p></div>
                <span className="tile-tag">Actor</span>
              </div>
              <div className="tile">
                <img src="images/img12.jpg" alt="Model" style={{ height: "200px" }} />
                <div className="tile-overlay"><h4>Rahul Bose</h4><p>Model · Mumbai</p></div>
                <span className="tile-tag">Model</span>
              </div>
              <div className="tile">
                <img src="images/img2.jpg" alt="Singer" style={{ height: "240px" }} />
                <div className="tile-overlay"><h4>Megha Singh</h4><p>Singer · Jaipur</p></div>
                <span className="tile-tag">Singer</span>
              </div>
            </div>

            {/* Column 2 — default */}
            <div className="tile-col">
              <div className="tile">
                <img src="images/img7.jpg" alt="Model" style={{ height: "240px" }} />
                <div className="tile-overlay"><h4>Arjun Mehta</h4><p>Model · Delhi</p></div>
                <span className="tile-tag">Model</span>
              </div>
              <div className="tile">
                <img src="images/img3.jpg" alt="Actor" style={{ height: "300px" }} />
                <div className="tile-overlay"><h4>Priya Nair</h4><p>Actor · Chennai</p></div>
                <span className="tile-tag">Actor</span>
              </div>
              <div className="tile">
                <img src="images/img8.png" alt="Anchor" style={{ height: "200px" }} />
                <div className="tile-overlay"><h4>Dev Khanna</h4><p>Anchor · Pune</p></div>
                <span className="tile-tag">Anchor</span>
              </div>
            </div>

            {/* Column 3 — starts higher */}
            <div className="tile-col" style={{ marginTop: "-40px" }}>
              <div className="tile">
                <img src="images/img5.jpg" alt="Singer" style={{ height: "260px" }} />
                <div className="tile-overlay"><h4>Ananya Roy</h4><p>Singer · Kolkata</p></div>
                <span className="tile-tag">Singer</span>
              </div>
              <div className="tile">
                <img src="images/img10.jpg" alt="Actor" style={{ height: "220px" }} />
                <div className="tile-overlay"><h4>Vikram Patel</h4><p>Actor · Ahmedabad</p></div>
                <span className="tile-tag">Actor</span>
              </div>
              <div className="tile">
                <img src="images/img11.jpg" alt="Dancer" style={{ height: "250px" }} />
                <div className="tile-overlay"><h4>Aarav Menon</h4><p>Dancer · Bengaluru</p></div>
                <span className="tile-tag">Dancer</span>
              </div>
            </div>

            {/* Column 4 — starts even lower */}
            <div className="tile-col" style={{ marginTop: "120px" }}>
              <div className="tile">
                <img src="images/img4.jpg" alt="Influencer" style={{ height: "300px" }} />
                <div className="tile-overlay"><h4>Neha Kapoor</h4><p>Influencer · Hyderabad</p></div>
                <span className="tile-tag">Influencer</span>
              </div>
              <div className="tile">
                <img src="images/img9.jpg" alt="Voice Artist" style={{ height: "200px" }} />
                <div className="tile-overlay"><h4>Rohan Das</h4><p>Voice Artist · Delhi</p></div>
                <span className="tile-tag">Voice</span>
              </div>
              <div className="tile">
                <img src="images/img6.jpg" alt="Model" style={{ height: "260px" }} />
                <div className="tile-overlay"><h4>Kavya Reddy</h4><p>Model · Chennai</p></div>
                <span className="tile-tag">Model</span>
              </div>
            </div>

          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="categories-section">
          <span className="section-label reveal">Browse by category</span>
          <div className="cat-grid reveal">
            {CATEGORIES.map((c: string) => (
              <div className="cat-cell" key={c}>{c}</div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="how-section">
          <h2 className="how-title reveal">How IndCasting works</h2>
          <p className="how-sub reveal">Three steps from profile to production.</p>
          <div className="steps-grid">
            {STEPS.map(({ n, h, p }: StepItem) => (
              <div className="step reveal" key={n}>
                <div className="step-num">{n}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CASTING CALLS ── */}
        <section className="casting-section">
          <span className="section-label reveal">Open right now</span>
          <h2
            className="reveal"
            style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.025em" }}
          >
            Latest casting calls
          </h2>
          <div className="casting-grid">
            {CASTING_CALLS.map(({ tag, title, desc, loc }: CastingCall) => (
              <div className="c-card reveal" key={title}>
                <span className="c-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <p className="c-loc">📍 {loc}</p>
                <button className="btn-ghost">View details</button>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY INDCASTING ── */}
        <section className="why-section">
          <div>
            <h2 className="why-title reveal">
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
              <li key={label} className="reveal">
                <span>{icon}</span>{label}
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <h2 className="reveal">Your next opportunity starts here.</h2>
          <p className="reveal">
            Join thousands of artists and casting professionals building
            careers and projects on IndCasting.
          </p>
          <div className="cta-btns reveal">
            <button className="btn-primary">Join as Talent</button>
            <button className="btn-outline">Hire Talent</button>
          </div>
        </section>

      </main>

      <footer>
        <span>© 2025 IndCasting. All rights reserved.</span>
        <span style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </span>
      </footer>
    </>
  );
}