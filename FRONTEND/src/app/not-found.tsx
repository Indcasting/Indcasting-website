/**
 * IndCasting — 404 Not Found Page
 *
 * Stack: React + TypeScript + Tailwind CSS (v3) + shadcn/ui tokens
 *
 * Drop this file into your src/app/ or src/pages/ directory.
 * Add the Google Fonts import to your index.html or globals.css:
 *
 *   <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500&display=swap" rel="stylesheet">
 *
 * CSS variables below override shadcn defaults — add them to your
 * globals.css :root block instead of the <style> tag here if preferred.
 */

"use client";

import { useRouter } from "next/navigation";

/* ─── CSS injected once at module level (avoids a separate .css file) ─── */
const STYLES = `

  :root {
    --font-display: 'Instrument Serif', serif;
    --font-body:    'Inter', sans-serif;

    --background:        201 100% 13%;
    --foreground:        0 0% 100%;
    --muted-foreground:  240 4% 66%;
    --primary:           0 0% 100%;
    --primary-foreground:0 0% 4%;
    --secondary:         0 0% 10%;
    --muted:             0 0% 10%;
    --accent:            0 0% 10%;
    --border:            0 0% 18%;
    --input:             0 0% 18%;
  }

  .not-found-root {
    font-family: var(--font-body);
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }

  /* ── Liquid glass ── */
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .liquid-glass:hover {
    transform: scale(1.03);
  }
  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255,255,255,0.45)  0%,
      rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0)    40%,
      rgba(255,255,255,0)    60%,
      rgba(255,255,255,0.15) 80%,
      rgba(255,255,255,0.45) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* ── Fade-rise animations ── */
  @keyframes fade-rise {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .animate-fade-rise {
    animation: fade-rise 0.8s ease-out both;
  }
  .animate-fade-rise-delay {
    animation: fade-rise 0.8s ease-out 0.2s both;
  }
  .animate-fade-rise-delay-2 {
    animation: fade-rise 0.8s ease-out 0.4s both;
  }
  .animate-fade-rise-delay-3 {
    animation: fade-rise 0.8s ease-out 0.6s both;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-rise,
    .animate-fade-rise-delay,
    .animate-fade-rise-delay-2,
    .animate-fade-rise-delay-3 {
      animation: none;
      opacity: 1;
    }
  }
`;

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

/* ─── Destination links ─── */
const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Post",      href: "/post" },
] as const;

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      {/* Inject styles once */}
      <style>{STYLES}</style>

      <div
        className="not-found-root"
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        {/* ── Background video ── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Subtle dark scrim so text is always legible without destroying the video */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.52) 100%)",
            zIndex: 1,
          }}
        />

        

        {/* ── Hero / 404 content ── */}
        <main
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "150px 24px 160px",
          }}
        >
          {/* 404 eyebrow */}
          <p
  className="animate-fade-rise"
  style={{
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#D4AF37",
    marginBottom: "2rem",
  }}
>
404 • PAGE NOT FOUND
</p>

          <div
  aria-hidden="true"
  className="animate-fade-rise"
  style={{
    position: "absolute",

    top: "43%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    fontSize: "clamp(12rem, 28vw, 22rem)",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-0.08em",

    color: "rgba(255,255,255,0.12)",
    textShadow: "0 0 80px rgba(255,255,255,.06)",

    pointerEvents: "none",
    userSelect: "none",

    zIndex: 2,
  }}
>
  404
</div>

          {/* Main headline */}
          <h1
            className="animate-fade-rise"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-2.46px",
              fontWeight: 400,
              maxWidth: "900px",
              margin: "0 auto",
              color: "#fff",
textShadow:
  "0 6px 25px rgba(0,0,0,.45), 0 0 40px rgba(0,0,0,.25)",
            }}
          >
            This page{" "}
            <em className="not-italic" style={{ color: "hsl(var(--muted-foreground))" }}>
              wandered
            </em>{" "}
            off
            <br />
            into the{" "}
            <em className="not-italic" style={{ color: "hsl(var(--muted-foreground))" }}>
              silence.
            </em>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-rise-delay"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.75,
              color: "hsl(var(--muted-foreground))",
              maxWidth: "560px",
              marginTop: "2rem",
            }}
          >
            The page you're looking for doesn't exist or has been moved. Let's
            get you back somewhere that does.
          </p>

          {/* ── Destination buttons ── */}
          <div
            className="animate-fade-rise-delay-2"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            {/* Primary: Home */}
            <button
              className="liquid-glass"
              onClick={() => router.push("/")}
              style={{
                borderRadius: "9999px",
                padding: "18px 52px",
                fontSize: "1rem",
                color: "hsl(var(--foreground))",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Go Home
            </button>

            {/* Secondary: Dashboard */}
            <button
              className="liquid-glass"
              onClick={() => router.push("/dashboard")}
              style={{
                borderRadius: "9999px",
                padding: "18px 40px",
                fontSize: "1rem",
                color: "hsl(var(--foreground))",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
              }}
            >
              Dashboard
            </button>

            {/* Secondary: Post */}
            <button
              className="liquid-glass"
              onClick={() => router.push("/post")}
              style={{
                borderRadius: "9999px",
                padding: "18px 40px",
                fontSize: "1rem",
                color: "hsl(var(--foreground))",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
              }}
            >
              Browse Posts
            </button>
          </div>

        </main>
      </div>
    </>
  );
}