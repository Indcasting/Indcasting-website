"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const IMAGES = [
  { src: "images/actor.png" , bg: "#F4845F", panel: "#F79B7F" },
  { src: "images/singer.png", bg: "#6BBF7A", panel: "#85CC92" },
  { src: "images/dancer.png", bg: "#E882B4", panel: "#ED9DC4" },
  { src: "images/comedian.png", bg: "#6EB5FF", panel: "#8DC4FF" },
];

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload images
  useEffect(() => {
    IMAGES.forEach(({ src }) => { const img = new Image(); img.src = src; });
  }, []);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigate = useCallback((dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4);
    timerRef.current = setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => navigate("next"), 4000);
    return () => clearInterval(id);
  }, [navigate]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const center = activeIndex;
  const left   = (activeIndex + 3) % 4;
  const right  = (activeIndex + 1) % 4;
  const back   = (activeIndex + 2) % 4;

  const TRANSITION = "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)";

  function roleStyle(role: "center" | "left" | "right" | "back"): React.CSSProperties {
    const base: React.CSSProperties = {
      position: "absolute",
      aspectRatio: "0.6 / 1",
      transition: TRANSITION,
      willChange: "transform, filter, opacity",
    };
    if (role === "center") return {
      ...base,
      transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
      filter: "none",
      opacity: 1,
      zIndex: 20,
      left: "50%",
      height: isMobile ? "60%" : "92%",
      bottom: isMobile ? "22%" : 0,
    };
    if (role === "left") return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(2px)",
      opacity: 0.85,
      zIndex: 10,
      left: isMobile ? "20%" : "30%",
      height: isMobile ? "16%" : "28%",
      bottom: isMobile ? "32%" : "12%",
    };
    if (role === "right") return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(2px)",
      opacity: 0.85,
      zIndex: 10,
      left: isMobile ? "80%" : "70%",
      height: isMobile ? "16%" : "28%",
      bottom: isMobile ? "32%" : "12%",
    };
    // back
    return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 1,
      zIndex: 5,
      left: "50%",
      height: isMobile ? "13%" : "22%",
      bottom: isMobile ? "32%" : "12%",
    };
  }

  const roleMap: Record<number, "center" | "left" | "right" | "back"> = {
    [center]: "center",
    [left]:   "left",
    [right]:  "right",
    [back]:   "back",
  };

  return (
    <div
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

        {/* Grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            backgroundImage: GRAIN_SVG,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            opacity: 0.4,
          }}
        />

        {/* Ghost text */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            insetInline: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 2,
            top: "18%",
          }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(60px, 28vw, 270px)",
              fontWeight: 900,
              color: "white",
              opacity: 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            DISCOVER
          </span>
        </div>

        {/* Carousel */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          {IMAGES.map((img, i) => (
            <div key={i} style={roleStyle(roleMap[i])}>
              <img
                src={img.src}
                alt={`Character ${i + 1}`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom-left: title + description + nav buttons */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? 24 : 80,
            left: isMobile ? 16 : 96,
            zIndex: 60,
            maxWidth: 320,
          }}
        >
          <p
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              marginBottom: isMobile ? 8 : 12,
              fontSize: isMobile ? 16 : 22,
              color: "white",
              opacity: 0.95,
              margin: `0 0 ${isMobile ? 8 : 12}px`,
            }}
          >
            TRENDING TALENT
          </p>
          {!isMobile && (
            <p
              style={{
                fontSize: 14,
                color: "white",
                opacity: 0.85,
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              Explore featured portfolios, creative showcases and casting opportunities from talented artists across film, television, OTT and digital media.
            </p>
          )}
          <div style={{ display: "flex", gap: 12 }}>
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => navigate(dir)}
                aria-label={dir === "prev" ? "Previous character" : "Next character"}
                style={{
                  width: isMobile ? 48 : 64,
                  height: isMobile ? 48 : 64,
                  borderRadius: "50%",
                  background: "transparent",
                  border: "2px solid white",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 150ms, background-color 150ms",
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                }}
              >
                {/* Arrow icons as inline SVG */}
                {dir === "prev" ? (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        

        {/* Dot indicators */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? 24 : 36,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            display: "flex",
            gap: 8,
          }}
        >
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => !isAnimating && (setActiveIndex(i), setIsAnimating(true), setTimeout(() => setIsAnimating(false), 650))}
              aria-label={`Go to character ${i + 1}`}
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === activeIndex ? "white" : "rgba(255,255,255,0.45)",
                cursor: "pointer",
                padding: 0,
                transition: "width 400ms cubic-bezier(0.4,0,0.2,1), background 300ms",
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}