"use client";

import { useEffect, useRef, useState } from "react";
import MagicRings from "@/components/ui/MagicRings";


interface Plan {
  id: string; name: string; price: string; priceNum: number | null;
  sub: string; features: string[]; cta: string; featured: boolean;
}
interface Testimonial { quote: string; name: string; role: string; stars: number }
interface FaqItem { q: string; a: string }
interface CompareRow { feature: string; basic: boolean; pro: boolean; seeker: boolean }

const PLANS: Plan[] = [
  {
    id: "basic", name: "Talent Basic", price: "Free", priceNum: null,
    sub: "Perfect for beginners finding their footing.",
    features: ["Create Portfolio", "Upload Headshots", "Apply to Casting Calls", "Limited Messages"],
    cta: "Get Started", featured: false,
  },
  {
    id: "pro", name: "Talent Pro", price: "₹299", priceNum: 299,
    sub: "Grow your acting career with full access.",
    features: ["Unlimited Applications", "Unlimited Messaging", "Featured Portfolio", "Priority Search Ranking", "Profile Insights"],
    cta: "Upgrade Now", featured: true,
  },
  {
    id: "seeker", name: "Seeker Premium", price: "₹999", priceNum: 999,
    sub: "Built for serious casting professionals.",
    features: ["Unlimited Casting Calls", "Advanced Talent Filters", "Unlimited Messaging", "Priority Support", "Shortlist Management"],
    cta: "Choose Plan", featured: false,
  },
];

const TESTIMONIALS: Testimonial[] = [
  { quote: "Within two weeks of joining IndCasting Pro, I received three audition invitations from production houses I'd never connected with before.", name: "Riya Sharma", role: "Actor · Mumbai", stars: 5 },
  { quote: "The advanced search filters helped us shortlist 150+ actors in one afternoon. Saved our casting team countless hours.", name: "Rahul Kapoor", role: "Casting Director", stars: 5 },
  { quote: "The premium badge increased profile visits significantly. I booked two commercials through IndCasting.", name: "Ananya Roy", role: "Model · Delhi", stars: 5 },
  { quote: "Finally a platform that understands the Indian entertainment industry. The smart filters are genuinely world-class.", name: "Vikram Mehta", role: "Film Director", stars: 5 },
  { quote: "I landed my first OTT role through IndCasting Pro within 3 weeks. The priority ranking really works.", name: "Priya Nair", role: "Actor · Chennai", stars: 5 },
  { quote: "As a casting agency we run 30+ projects a year. IndCasting Seeker pays for itself in the first week.", name: "Sneha Agarwal", role: "Casting Agency · Mumbai", stars: 5 },
  { quote: "The direct messaging feature made it so easy to coordinate auditions without going through middlemen.", name: "Karan Patel", role: "Dancer · Bengaluru", stars: 5 },
  { quote: "Profile insights showed me exactly what casting directors search for. Completely changed how I presented myself.", name: "Dev Khanna", role: "Voice Artist · Pune", stars: 5 },
];

const FAQ: FaqItem[] = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your membership whenever you like with no hidden fees or penalties." },
  { q: "Can I upgrade later?", a: "Absolutely. Upgrade whenever your requirements grow — your billing adjusts from the next cycle." },
  { q: "Who should buy Seeker Premium?", a: "Casting directors, agencies, filmmakers and production houses looking to source talent at scale." },
  { q: "Is there a free trial for Pro?", a: "Yes, new users get a 7-day free trial of Talent Pro with no credit card required." },
];

const COMPARE: CompareRow[] = [
  { feature: "Create Portfolio",        basic: true,  pro: true,  seeker: true  },
  { feature: "Unlimited Applications",  basic: false, pro: true,  seeker: true  },
  { feature: "Unlimited Messaging",     basic: false, pro: true,  seeker: true  },
  { feature: "Featured Portfolio",      basic: false, pro: true,  seeker: false },
  { feature: "Priority Search",         basic: false, pro: true,  seeker: true  },
  { feature: "Create Casting Calls",    basic: false, pro: false, seeker: true  },
  { feature: "Advanced Talent Filters", basic: false, pro: false, seeker: true  },
  { feature: "Priority Support",        basic: false, pro: true,  seeker: true  },
];

function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed: ${src}`));
    document.head.appendChild(s);
  });
}

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display:"flex", gap:"2px" }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color:"var(--gold)", fontSize:"0.75rem" }}>★</span>
      ))}
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={`plan-card${plan.featured ? " plan-featured" : ""}`}>
      {plan.featured && (
        <div className="plan-popular-bar">
          Most Popular
        </div>
      )}

      <div className="plan-top">
        <span className="plan-name">{plan.name}</span>

        <div className="plan-price-wrap">
          <span className="plan-price">{plan.price}</span>

          {plan.priceNum && (
            <span className="plan-per">/mo</span>
          )}
        </div>

        <p className="plan-sub">{plan.sub}</p>
      </div>

      <button className="plan-cta">
        {plan.cta}
      </button>

      <div className="plan-toggle">
        <span>See what's included</span>

        <span className="plan-chevron">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="plan-features-wrap">
        <ul className="plan-features">
          {plan.features.map((f, i) => (
            <li
              key={f}
              style={{ "--fi": i } as React.CSSProperties}
            >
              <span className="plan-check">✦</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default function Membership() {
  const gsapLoaded = useRef<boolean>(false);
  const [dark, setDark] = useState(false);

  // Sync dark class with state
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Read saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const toggleDark = () => {
    setDark((v) => {
      localStorage.setItem("theme", !v ? "dark" : "light");
      return !v;
    });
  };

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    (async (): Promise<void> => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".progress-bar", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0 },
      });

      const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const badge = document.querySelector<HTMLElement>(".badge-scramble");
      if (badge) {
        const orig = badge.textContent ?? "";
        let f = 0; const total = 24;
        const go = (): void => {
          badge.textContent = orig.split("").map((ch, idx) => {
            if (ch === " " || ch === "✨") return ch;
            if (idx < (f / total) * orig.length) return orig[idx];
            return charSet[Math.floor(Math.random() * charSet.length)];
          }).join("");
          f++;
          if (f <= total) requestAnimationFrame(go);
          else badge.textContent = orig;
        };
        setTimeout(go, 300);
      }

      gsap.from(".m-hero-word", {
        y: 80, opacity: 0, rotateX: -45, stagger: 0.065,
        duration: 1, ease: "power4.out", delay: 0.2,
        transformOrigin: "top center", transformPerspective: 800,
      });
      gsap.from(".m-hero-sub, .m-hero-btns", {
        y: 28, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.7,
      });

      const heroImg = document.querySelector<HTMLElement>(".m-hero-img");
      if (heroImg) {
        gsap.from(heroImg, { x: 60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.3 });
        gsap.to(heroImg,   { y: -18, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.3 });
      }

      gsap.utils.toArray<HTMLElement>(".plan-card").forEach((el, i) => {
        gsap.from(el, {
          y: 60, opacity: 0, scale: 0.94,
          rotateZ: i === 1 ? 0 : i === 0 ? -1.5 : 1.5,
          duration: 0.75, delay: i * 0.12, ease: "power3.out",
          transformPerspective: 900,
          scrollTrigger: { trigger: ".plans-grid", start: "top 80%", toggleActions: "play none none none" },
        });
      });

      gsap.from(".compare-head", {
        y: -30, opacity: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".compare-table", start: "top 88%", toggleActions: "play none none none" },
      });
      document.querySelectorAll<HTMLElement>(".compare-row").forEach((row, i) => {
        gsap.from(row, {
          x: -50, opacity: 0, duration: 0.45, delay: i * 0.055, ease: "power2.out",
          scrollTrigger: { trigger: ".compare-table", start: "top 82%", toggleActions: "play none none none" },
        });
      });

      gsap.from(".testi-row-1, .testi-row-2", {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: ".testi-section", start: "top 80%", toggleActions: "play none none none" },
      });

      document.querySelectorAll<HTMLElement>(".faq-item").forEach((item, i) => {
        gsap.from(item, {
          y: 30, opacity: 0, duration: 0.55, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 84%", toggleActions: "play none none none" },
        });
        const qEl  = item.querySelector<HTMLElement>(".faq-q");
        const aEl  = item.querySelector<HTMLElement>(".faq-a");
        const icon = item.querySelector<HTMLElement>(".faq-icon");
        if (!qEl || !aEl || !icon) return;
        aEl.style.height   = "0px";
        aEl.style.overflow = "hidden";
        aEl.style.opacity  = "0";
        qEl.addEventListener("click", () => {
          const isOpen = item.classList.contains("faq-open");
          document.querySelectorAll<HTMLElement>(".faq-item.faq-open").forEach((other) => {
            other.classList.remove("faq-open");
            const oa = other.querySelector<HTMLElement>(".faq-a");
            const oi = other.querySelector<HTMLElement>(".faq-icon");
            if (oa) gsap.to(oa, { height: 0, opacity: 0, duration: 0.35, ease: "power2.in" });
            if (oi) gsap.to(oi, { rotation: 0, duration: 0.3 });
          });
          if (!isOpen) {
            item.classList.add("faq-open");
            aEl.style.height = "auto";
            const naturalH = aEl.scrollHeight;
            aEl.style.height = "0px";
            gsap.to(aEl,  { height: naturalH, opacity: 1, duration: 0.4, ease: "power2.out" });
            gsap.to(icon, { rotation: 45, duration: 0.3 });
          }
        });
      });

      gsap.utils.toArray<Element>(".section-title").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      const upgradeBtn = document.querySelector<HTMLElement>(".upgrade-btn");
      if (upgradeBtn) {
        upgradeBtn.addEventListener("mousemove", (e: MouseEvent) => {
          const r = upgradeBtn.getBoundingClientRect();
          const bx = (e.clientX - r.left - r.width  / 2) * 0.4;
          const by = (e.clientY - r.top  - r.height / 2) * 0.4;
          gsap.to(upgradeBtn, { x: bx, y: by, duration: 0.3, ease: "power2.out" });
        });
        upgradeBtn.addEventListener("mouseleave", () => {
          gsap.to(upgradeBtn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
        });
        gsap.from(upgradeBtn, {
          scale: 0.8, opacity: 0, duration: 0.8, ease: "elastic.out(1,0.5)",
          scrollTrigger: { trigger: ".upgrade-section", start: "top 85%", toggleActions: "play none none none" },
        });
      }

    })();

    return () => { window.ScrollTrigger?.getAll?.()?.forEach((t) => t.kill()); };
  }, []);

  const ROW1 = [...TESTIMONIALS.slice(0, 4), ...TESTIMONIALS.slice(0, 4)];
  const ROW2 = [...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(4)];

  return (
    <>
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:"rgba(201,168,76,0.15)", zIndex:200 }}>
        <div className="progress-bar" style={{ height:"100%", background:"var(--gold)", transformOrigin:"left", transform:"scaleX(0)" }} />
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        style={{
          position: "fixed", top: "1rem", right: "1rem", zIndex: 300,
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(15,14,13,0.06)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(15,14,13,0.12)"}`,
          borderRadius: "100px", padding: "0.45rem 1rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.78rem", fontWeight: 600,
          color: dark ? "#fff" : "var(--ink)",
          cursor: "pointer", backdropFilter: "blur(10px)",
          transition: "all .3s ease",
        }}
      >
        <span style={{ fontSize: "1rem" }}>{dark ? "☀️" : "🌙"}</span>
        {dark ? "Light" : "Dark"}
      </button>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:    #0f0e0d;
          --cream:  #FFFDF7;
          --gold:   #c9a84c;
          --gold2:  #e8c96a;
          --mist:   #f0ebe0;
          --mid:    #6b6560;
          --white:  #ffffff;
          --rad-md: 14px;
          --rad-lg: 24px;
        }

        /* ── DARK MODE ── */
        html.dark {
          --ink:   #f6f6f6;
          --cream: #0b0b0b;
          --gold:  #c9a84c;
          --gold2: #f1d472;
          --mist:  #1c1c1c;
          --mid:   #b8b8b8;
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
        .m-hero{

    position:relative;

    min-height:100vh;

    overflow:hidden;

    display:flex;

    justify-content:center;

    align-items:center;

    text-align:center;

    background:var(--cream);

    transition:
        background .35s ease;

}

html.dark .m-hero{

    background:#090909;

}

    .hero-rings{

    position:absolute;

    inset:0;

    z-index:0;

    transform:translateY(-8%);

}
    .hero-overlay{

    position:absolute;

    inset:0;

    z-index:1;

    pointer-events:none;

    transition:background .35s ease;

}

/* LIGHT */

html:not(.dark) .hero-overlay{

    background:

        radial-gradient(

            circle at center,

            rgba(255,255,255,.15),

            rgba(255,253,247,.55)

        );

}

/* DARK */

html.dark .hero-overlay{

    background:

        radial-gradient(

            circle at center,

            rgba(0,0,0,.18),

            rgba(0,0,0,.78)

        );

}

html:not(.dark) .m-hero{

    background:

        radial-gradient(
            circle at top,
            #ffffff 0%,
            #fdf9ef 45%,
            #f7f1e4 100%
        );

}

}
        .hero-content{
    position:relative;
    z-index:2;

    width:min(1200px,90vw);

    display:flex;
    flex-direction:column;
    align-items:center;
}

        html.dark .m-hero { background: #090909; }
        html.dark .m-hero::before {
          background-image:
            linear-gradient(rgba(201,168,76,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,.07) 1px, transparent 1px);
        }

        .m-hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(201,168,76,0.12); color: var(--gold);
          border: 1px solid rgba(201,168,76,0.3); border-radius: 100px;
          padding: 0.4rem 1rem; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 1.5rem; width: fit-content;
        }
        .m-hero-title{

    font-size:clamp(3.8rem,7vw,6.8rem);

    font-weight:900;

    line-height:1.08;

    letter-spacing:-0.055em;

    margin-bottom:2rem;

    max-width:1100px;

    color:var(--ink);

    text-align:center;

    text-wrap:balance;

    transition:color .35s;

}
        .m-hero-title em{

    color:var(--gold);

    font-style:normal;

    text-shadow:
        0 0 18px rgba(201,168,76,.18);

}
        .m-hero-word { display: inline-block; }
        .m-hero-sub{

    max-width:760px;

    margin:0 auto 3rem;

    font-size:1.28rem;

    line-height:1.75;

    font-weight:400;

    color:var(--mid);

    opacity:.92;

}
        .m-hero-btns{

    display:flex;

    justify-content:center;

    gap:1rem;

    flex-wrap:wrap;

}
        .m-hero-img  { width: 100%; max-width: 500px; border-radius: 24px; will-change: transform; display: block; }

        .btn-gold {
          background: var(--gold); color: var(--ink); border: none; border-radius: 100px;
          padding: 0.85rem 2.2rem; font-size: 0.95rem; font-weight: 700; cursor: pointer;
          position: relative; overflow: hidden; transition: background .2s;
        }
        .btn-gold::after { content: ""; position: absolute; inset: 0; background: rgba(255,255,255,0.25); transform: translateX(-100%); transition: transform .3s ease; }
        .btn-gold:hover::after { transform: translateX(0); }
        .btn-gold:hover { background: var(--gold2); color:#111;}

        .btn-ink {
          background: transparent; color: var(--ink); border: 1.5px solid var(--ink);
          border-radius: 100px; padding: 0.85rem 2.2rem; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; transition: background .15s, color .15s, border-color .35s;
        }
        .btn-ink:hover { background: var(--ink); color: var(--cream); }
        html.dark .btn-ink { color: var(--ink); border-color: var(--ink); }
        html.dark .btn-ink:hover{
    background: var(--ink);
    color: #111;
    border-color: var(--ink);
}

        .magic-rings-container{
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    overflow:hidden;
    pointer-events:none;
}

.magic-rings-container canvas{
    width:100% !important;
    height:100% !important;
    display:block;
    pointer-events:none;
}

        /* ── PRICING ── */
        .pricing-section {
          padding: 100px 4vw;
          background: var(--cream);
          transition: background .35s;
        }
        .section-title {
          font-size: clamp(1.8rem,3vw,2.6rem); font-weight: 800;
          letter-spacing: -0.025em; margin-bottom: 3rem; text-align: center;
          color: var(--ink); transition: color .35s;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1.25rem;
          align-items: start;
        }

        .plan-card {
  border-radius: 22px;
  border: 1.5px solid var(--mist);
  background: var(--white);
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  transition: border-color .25s, box-shadow .25s, background .35s;
  cursor: default;
}

.plan-card:hover{

    transform:translateY(-8px);

    border-color:var(--gold);

    box-shadow:
        0 20px 55px rgba(201,168,76,.16);

}

        html.dark .plan-card {
          background: #141414;
          border-color: #2a2a2a;
        }
        html.dark .plan-card:hover {
          border-color: rgba(201,168,76,0.45);
          box-shadow: 0 16px 48px rgba(201,168,76,0.1);
        }

        /* Featured card stays dark in both modes */
        .plan-card.plan-featured {
          background: #0f0e0d;
          border-color: var(--gold);
          box-shadow: 0 20px 60px rgba(15,14,13,0.18);
        }
        .plan-card.plan-featured:hover {
          box-shadow: 0 28px 72px rgba(15,14,13,0.26);
        }
        html.dark .plan-card.plan-featured {
          background: #0f0e0d;
          border-color: var(--gold);
        }

        .plan-popular-bar {
          background: var(--gold); color: #111;
          text-align: center; font-size: 0.65rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 0;
        }

        .plan-top { padding:2.4rem 2.4rem 1.5rem; }
        .plan-name {
          display: block; font-size: 0.78rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--gold); margin-bottom: 1.3rem;
        }
        .plan-price-wrap { display: flex; align-items: baseline; gap: 4px; margin-bottom: 1.1rem; }
        .plan-price {
          font-size: clamp(2rem,3.5vw,2.8rem); font-weight: 900;
          letter-spacing: -0.04em; line-height: 1;
          color: var(--ink); transition: color .35s;
        }
        html.dark .plan-price { color: var(--ink); }
        .plan-card.plan-featured .plan-price { color: #ffffff; }
        .plan-per { font-size: 0.8rem; font-weight: 500; color: var(--mid); }
        .plan-card.plan-featured .plan-per { color: rgba(255,255,255,0.4); }
        .plan-sub { font-size: 1.25rem; color: var(--mid); line-height: 1.5; margin-top:.8rem; margin-bottom:2rem;}
        .plan-card.plan-featured .plan-sub { color: rgba(255,255,255,0.45); }

        .plan-cta {
          display: block; width: calc(100% - 3.6rem); margin: 0 1.8rem 1.2rem;
          border-radius: 100px; padding: 0.78rem 0;
          font-size: 0.9rem; font-weight: 700; cursor: pointer; text-align: center;
          border: 1.5px solid var(--ink); background: transparent; color: var(--ink);
          transition: background .2s, color .2s, border-color .35s;
        }
        .plan-cta:hover { background: var(--ink); color: var(--cream); }
        html.dark .plan-cta { border-color: var(--ink); color: var(--ink); }
        html.dark .plan-cta:hover { background: var(--ink); color: var(--cream); }
        .plan-card.plan-featured .plan-cta {
          background: var(--gold); border-color: var(--gold); color: #111;
        }
        .plan-card.plan-featured .plan-cta:hover { background: var(--gold2); border-color: var(--gold2); }

        .plan-toggle{

    margin-top:auto;

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:1.25rem 2.4rem;

    border-top:1px solid var(--mist);

    color:var(--mid);

    font-weight:600;

}
        html.dark .plan-toggle { border-top-color: #2a2a2a; }
        .plan-card.plan-featured .plan-toggle { border-top-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.45); }
        .plan-toggle:hover { background: rgba(201,168,76,0.06); color: var(--ink); }
        .plan-card.plan-featured .plan-toggle:hover { background: rgba(255,255,255,0.06); color: #fff; }

        .plan-chevron {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--mist); color: var(--mid); flex-shrink: 0;
          transition: transform .35s cubic-bezier(0.34,1.56,0.64,1), background .2s, color .2s;
        }
        html.dark .plan-chevron { background: #2a2a2a; color: #888; }
        .plan-card.plan-featured .plan-chevron { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); }
        .plan-card:hover .plan-chevron{

    transform:rotate(180deg);

    background:var(--gold);

    color:#111;

}
        .plan-features-wrap{

    max-height:0;

    opacity:0;

    overflow:hidden;

    transition:
        max-height .45s ease,
        opacity .35s ease;

}

.plan-card:hover .plan-features-wrap{

    max-height:600px;

    opacity:1;

}
        .plan-features {
          list-style: none; padding: 1.4rem 2.4rem 2rem;
          border-top: 1px solid var(--mist);
          display: flex; flex-direction: column; gap: 1rem;
        }
        html.dark .plan-features { border-top-color: #2a2a2a; }
        .plan-card.plan-featured .plan-features { border-top-color: rgba(255,255,255,0.1); }
        .plan-features li{

    opacity:0;

    transform:translateY(10px);

    transition:
        opacity .35s,
        transform .35s;

}

.plan-card:hover .plan-features li{

    opacity:1;

    transform:none;

}

.plan-card:hover .plan-features li:nth-child(1){transition-delay:.05s;}
.plan-card:hover .plan-features li:nth-child(2){transition-delay:.10s;}
.plan-card:hover .plan-features li:nth-child(3){transition-delay:.15s;}
.plan-card:hover .plan-features li:nth-child(4){transition-delay:.20s;}
.plan-card:hover .plan-features li:nth-child(5){transition-delay:.25s;}
.plan-card:hover .plan-features li:nth-child(6){transition-delay:.30s;}
        .plan-card.plan-featured .plan-features li { color: rgba(255,255,255,0.82); }

        /* ── COMPARE TABLE ── */
        .compare-section {
          padding: 80px 4vw 100px;
          background: var(--cream);
          transition: background .35s;
        }
        .compare-table { overflow-x: auto; border-radius: 18px; border: 1.5px solid var(--mist); transition: border-color .35s; }
        table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
        .compare-head th {
          padding: 1.2rem 1.5rem; text-align: center;
          font-size: 0.78rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; background: var(--ink); color: var(--white);
          transition: background .35s, color .35s;
        }
        html.dark .compare-head th { background: #111; color: #fff; }
        .compare-head th:first-child { text-align: left; border-radius: 16px 0 0 0; }
        .compare-head th:last-child  { border-radius: 0 16px 0 0; }
        .compare-head .col-pro { color: var(--gold); }
        .compare-row td {
          padding: 1rem 1.5rem; border-bottom: 1px solid var(--mist);
          text-align: center; vertical-align: middle;
          color: var(--ink); transition: color .35s, background .35s, border-color .35s;
        }
        .compare-row td:first-child { text-align: left; font-weight: 500; }
        .compare-row:last-child td { border-bottom: none; }
        .compare-row:nth-child(even) td { background: rgba(232,228,220,0.3); }
        html.dark .compare-row:nth-child(even) td { background: rgba(255,255,255,0.03); }
        .cell-yes { color: #2a9d5c; font-size: 1.05rem; font-weight: 700; }
        .cell-no  { color: #e03434; font-size: 1rem; font-weight: 700; }

        /* ─────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────── */

.testi-section{
    padding:100px 0;
    background:var(--cream);
    overflow:hidden;
    transition:
        background .35s ease,
        color .35s ease;
}

html.dark .testi-section{
    background:#0b0b0b;
}

/* Heading */

.testi-header{
    padding:0 4vw 3rem;
    text-align:center;
}

.testi-header .section-title{
    color:var(--ink);
    transition:color .35s;
}

html.dark .testi-header .section-title{
    color:#fff;
}

/* Rows */

.testi-rows{
    display:flex;
    flex-direction:column;
    gap:1.25rem;
}

.testi-row{
    display:flex;
    gap:1.25rem;
    width:max-content;
}

.testi-row-1{
    animation:marqueeL 35s linear infinite;
}

.testi-row-2{
    animation:marqueeR 40s linear infinite;
}

.testi-rows:hover .testi-row-1,
.testi-rows:hover .testi-row-2{
    animation-play-state:paused;
}

@keyframes marqueeL{
    from{transform:translateX(0);}
    to{transform:translateX(-50%);}
}

@keyframes marqueeR{
    from{transform:translateX(-50%);}
    to{transform:translateX(0);}
}

/* Cards */

.testi-card{

    flex-shrink:0;

    width:320px;

    border-radius:20px;

    padding:1.7rem 1.8rem;

    background:var(--white);

    border:1.5px solid var(--mist);

    display:flex;
    flex-direction:column;
    gap:1rem;

    cursor:default;

    transition:
        transform .3s ease,
        border-color .3s ease,
        background .3s ease,
        box-shadow .3s ease;
}

.testi-card:hover{

    transform:translateY(-8px);

    border-color:var(--gold);

    box-shadow:
        0 18px 40px rgba(201,168,76,.15);

}

/* Quote */

.testi-quote{

    flex:1;

    font-size:.92rem;

    line-height:1.8;

    color:var(--mid);

}

/* Footer */

.testi-footer{

    display:flex;

    flex-direction:column;

    gap:.35rem;

}

.testi-name{

    font-size:.95rem;

    font-weight:700;

    color:var(--ink);

}

.testi-role{

    font-size:.74rem;

    color:var(--gold);

    font-weight:700;

    text-transform:uppercase;

    letter-spacing:.08em;

}

/* Stars */

.testi-stars{

    color:var(--gold);

    font-size:.9rem;

    letter-spacing:2px;

}

/* -------------------------
   DARK MODE
-------------------------- */

html.dark .testi-card{

    background:#171717;

    border-color:#2c2c2c;

    box-shadow:none;

}

html.dark .testi-card:hover{

    border-color:var(--gold);

    background:#1d1d1d;

    box-shadow:
        0 20px 45px rgba(0,0,0,.45);

}

html.dark .testi-quote{

    color:#bdbdbd;

}

html.dark .testi-name{

    color:#f5f5f5;

}

html.dark .testi-role{

    color:var(--gold);

}
        /* ================= FAQ ================= */

.faq-section{
    padding:50px 4vw;
    background:var(--cream);
    transition:background .35s ease;
}

.faq-list{
    margin-top:1rem;
    border:1.5px solid var(--mist);
    border-radius:22px;
    overflow:hidden;

    background:var(--white);

    transition:
        background .35s,
        border-color .35s;
}

.faq-item{
    background:var(--white);
    border-bottom:1px solid var(--mist);

    transition:
        background .35s,
        border-color .35s;
}

.faq-item:last-child{
    border-bottom:none;
}

.faq-q{
    width:100%;

    display:flex;
    justify-content:space-between;
    align-items:center;

    padding:1.2rem 1.5rem;

    background:transparent;
    border:none;

    text-align:left;

    font-size:1.1rem;
    font-weight:700;

    color:var(--ink);

    cursor:pointer;

    transition:
        background .3s,
        color .35s;
}

.faq-q span:first-child{
    color:inherit;
}

.faq-q:hover{
    background:rgba(201,168,76,.08);
}

.faq-a{
    padding:0 1.5rem 1.2rem;

    color:var(--mid);

    font-size:1.1rem;
    line-height:1.8;

    overflow:hidden;

    transition:color .35s;
}

.faq-icon{
    width:34px;
    height:34px;

    border-radius:50%;

    display:flex;
    justify-content:center;
    align-items:center;

    background:var(--mist);

    color:var(--ink);

    font-size:1.15rem;
    font-weight:700;

    flex-shrink:0;

    transition:.35s;
}

.faq-item.faq-open .faq-icon{
    background:var(--gold);
    color:#111;
}

/* ================= DARK MODE ================= */

html.dark .faq-section{
    background:#0b0b0b;
}

html.dark .faq-list{
    background:#121212;
    border-color:#2b2b2b;
}

html.dark .faq-item{
    background:#121212;
    border-bottom:1px solid #2b2b2b;
}

html.dark .faq-q{
    color:#f5f5f5;
}

html.dark .faq-q span{
    color:#f5f5f5;
}

html.dark .faq-q:hover{
    background:rgba(201,168,76,.08);
}

html.dark .faq-a{
    color:#b8b8b8;
}

html.dark .faq-icon{
    background:#2b2b2b;
    color:#f5f5f5;
}

html.dark .faq-item.faq-open .faq-icon{
    background:var(--gold);
    color:#111;
}

        /* ─────────────────────────────────────
   FINAL UPGRADE CTA
───────────────────────────────────── */

.upgrade-section{

    position:relative;

    overflow:hidden;

    padding:140px 4vw;

    background:var(--cream);

    border-top:1px solid rgba(201,168,76,.15);

    transition:
        background .35s ease,
        border-color .35s ease;

}

html.dark .upgrade-section{

    background:#0b0b0b;

}

/* Background Grid */

.upgrade-section::before{

    content:"";

    position:absolute;

    inset:0;

    background-image:
        linear-gradient(rgba(201,168,76,.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,.05) 1px, transparent 1px);

    background-size:60px 60px;

    pointer-events:none;

}

html.dark .upgrade-section::before{

    opacity:.45;

}

/* Gold Glow */

.upgrade-section::after{

    content:"";

    position:absolute;

    width:700px;
    height:700px;

    left:50%;
    bottom:-350px;

    transform:translateX(-50%);

    background:
        radial-gradient(circle,
            rgba(201,168,76,.16) 0%,
            rgba(201,168,76,.08) 35%,
            transparent 75%);

    pointer-events:none;

}

/* CTA Card */

.upgrade-inner{

    position:relative;

    z-index:2;

    max-width:900px;

    margin:auto;

    padding:70px 80px;

    border-radius:34px;

    border:1px solid rgba(201,168,76,.16);

    background:rgba(255,255,255,.04);

    backdrop-filter:blur(14px);

    text-align:center;

}

html.dark .upgrade-inner{

    background:rgba(255,255,255,.03);

}

/* Label */

.upgrade-label{

    display:inline-flex;

    align-items:center;

    gap:16px;

    font-size:.78rem;

    letter-spacing:.22em;

    text-transform:uppercase;

    font-weight:800;

    color:var(--gold);

    margin-bottom:26px;

}

.upgrade-label::before,
.upgrade-label::after{

    content:"";

    width:56px;

    height:1px;

    background:var(--gold);

    opacity:.4;

}

/* Heading */

.upgrade-title{

    font-size:clamp(2.4rem,4vw,4rem);

    font-weight:800;

    line-height:1.12;

    letter-spacing:-.04em;

    color:var(--ink);

    margin-bottom:24px;

}

html.dark .upgrade-title{

    color:#fff;

}

/* Description */

.upgrade-tagline{

    max-width:620px;

    margin:0 auto 42px;

    font-size:1.22rem;

    line-height:1.8;

    color:var(--mid);

}

html.dark .upgrade-tagline{

    color:#bcbcbc;

}

/* Stats */

.upgrade-stats{

    display:flex;

    justify-content:center;

    gap:42px;

    margin-bottom:50px;

    flex-wrap:wrap;

}

.upgrade-stat{

    display:flex;

    flex-direction:column;

    align-items:center;

}

.upgrade-stat strong{

    font-size:1.5rem;

    color:var(--gold);

}

.upgrade-stat span{

    margin-top:6px;

    font-size:.9rem;

    color:var(--mid);

}

/* Button */

.upgrade-btn{

    display:inline-flex;

    align-items:center;

    justify-content:center;

    gap:14px;

    padding:1.2rem 3.6rem;

    border:none;

    border-radius:999px;

    background:var(--gold);

    color:#111;

    font-size:1.15rem;

    font-weight:800;

    cursor:pointer;

    position:relative;

    overflow:hidden;

    transition:
        transform .3s ease,
        background .3s ease,
        box-shadow .3s ease;

    box-shadow:
        0 18px 50px rgba(201,168,76,.28);

}

.upgrade-btn:hover{

    background:var(--gold2);

    transform:translateY(-4px);

    box-shadow:
        0 28px 70px rgba(201,168,76,.36);

}

.upgrade-btn::before{

    content:"";

    position:absolute;

    inset:0;

    background:
        linear-gradient(
            120deg,
            transparent 20%,
            rgba(255,255,255,.35) 50%,
            transparent 80%
        );

    transform:translateX(-120%);

    transition:transform .6s ease;

}

.upgrade-btn:hover::before{

    transform:translateX(120%);

}

.upgrade-btn-arrow{

    font-size:1.3rem;

    transition:transform .3s ease;

}

.upgrade-btn:hover .upgrade-btn-arrow{

    transform:translateX(6px);

}

/* Mobile */

@media(max-width:768px){

    .upgrade-section{

        padding:100px 24px;

    }

    .upgrade-inner{

        padding:50px 28px;

    }

    .upgrade-stats{

        gap:24px;

    }

}

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .m-hero { grid-template-columns: 1fr; }
          .m-hero-img { display: none; }
          .plans-grid { grid-template-columns: 1fr; }
          .testi-card { width: 270px; }
        }
        @media (max-width: 540px) {
          .testi-card { width: 240px; }
          .plans-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="m-hero">

    <div className="hero-rings">

        <MagicRings
            color={dark ? "#C9A84C" : "#C49A2E"}
            colorTwo={dark ? "#F5E6A8" : "#F2D98C"}

            ringCount={8}
            speed={0.35}

            attenuation={16}

            lineThickness={2}

            baseRadius={0.48}

            radiusStep={0.11}

            scaleRate={0.05}

            opacity={dark ? 0.65 : 0.7}

            blur={dark ? 1.2 : 0.5}

            noiseAmount={0.03}

            rotation={-8}

            ringGap={1.8}

            fadeIn={0.85}

            fadeOut={0.8}

            mouseInfluence={0.05}

            hoverScale={1.05}

            parallax={0.02}

            followMouse={false}

            clickBurst={false}
        />

    </div>

    <div className="hero-overlay"></div>

    <div className="hero-content">

        <div className="m-hero-badge">
            <span className="badge-scramble">
                ✨ Premium Membership
            </span>
        </div>

        <h1 className="m-hero-title">
            {"Unlock Your Full Casting Potential".split(" ").map((w, i) => (
                <span key={i} className="m-hero-word">
                    {w === "Potential" ? <em>{w}</em> : w}&nbsp;
                </span>
            ))}
        </h1>

        <p className="m-hero-sub">
            Whether you're an aspiring artist or a casting professional,
            our premium memberships provide better visibility,
            unlimited connections,
            and powerful casting tools.
        </p>

        <div className="m-hero-btns">
            <button className="btn-gold">
                Join as Talent
            </button>

            <button className="btn-ink">
                Hire Talent
            </button>
        </div>

    </div>

</section>

        {/* ── PRICING ── */}
        <section className="pricing-section">
          <h2 className="section-title">Choose Your Membership</h2>
          <div className="plans-grid">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* ── COMPARE TABLE ── */}
        <section className="compare-section">
          <h2 className="section-title">Compare Plans</h2>
          <div className="compare-table">
            <table>
              <thead>
                <tr className="compare-head">
                  <th>Features</th>
                  <th>Talent Basic</th>
                  <th className="col-pro">Talent Pro ✦</th>
                  <th>Seeker Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(({ feature, basic, pro, seeker }) => (
                  <tr className="compare-row" key={feature}>
                    <td>{feature}</td>
                    <td><span className={basic  ? "cell-yes" : "cell-no"}>{basic  ? "✔" : "✖"}</span></td>
                    <td><span className={pro    ? "cell-yes" : "cell-no"}>{pro    ? "✔" : "✖"}</span></td>
                    <td><span className={seeker ? "cell-yes" : "cell-no"}>{seeker ? "✔" : "✖"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testi-section">
          <div className="testi-header">
            <h2 className="section-title">Loved by Artists &amp; Casting Professionals</h2>
          </div>
          <div className="testi-rows">
            <div className="testi-row testi-row-1">
              {ROW1.map((t, i) => (
                <div className="testi-card" key={i}>
                  <Stars n={t.stars} />
                  <p className="testi-quote">{t.quote}</p>
                  <div className="testi-footer">
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testi-row testi-row-2">
              {ROW2.map((t, i) => (
                <div className="testi-card" key={i}>
                  <Stars n={t.stars} />
                  <p className="testi-quote">{t.quote}</p>
                  <div className="testi-footer">
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQ.map(({ q, a }) => (
              <div className="faq-item" key={q}>
                <button className="faq-q">
                  <span>{q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">{a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── UPGRADE ── */}
        <section className="upgrade-section">
          <div className="upgrade-inner">
            <div className="upgrade-label">Start today</div>
            <p className="upgrade-tagline">
              Join thousands of artists and casting professionals<br />
              building careers on IndCasting.
            </p>
            <button className="upgrade-btn">
              Upgrade Now
              <span className="upgrade-btn-arrow">→</span>
            </button>
          </div>
        </section>

      </main>
    </>
  );
}