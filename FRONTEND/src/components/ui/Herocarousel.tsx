"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface HeroSlide {
  image: string;
  title: string;
  description: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Safety check.
   * Prevents the carousel from crashing if slides are temporarily
   * undefined or empty while the page is loading.
   */
  const safeSlides = Array.isArray(slides) ? slides : [];

  const slideCount = safeSlides.length;

  /*
   * Keep activeIndex valid if the supplied slide array changes.
   */
  useEffect(() => {
    if (slideCount === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((current) =>
      current >= slideCount ? 0 : current
    );
  }, [slideCount]);

  /*
   * Preload all carousel images.
   */
  useEffect(() => {
    safeSlides.forEach(({ image }) => {
      if (!image) return;

      const img = new Image();
      img.src = image;
    });
  }, [safeSlides]);

  /*
   * Mobile detection.
   */
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
    };

    check();

    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  /*
   * Navigate between slides.
   */
  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (slideCount <= 1 || isAnimating) return;

      setIsAnimating(true);

      setActiveIndex((previous) => {
        if (direction === "next") {
          return (previous + 1) % slideCount;
        }

        return (previous - 1 + slideCount) % slideCount;
      });

      timerRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [slideCount, isAnimating]
  );

  /*
   * Auto advance every 4 seconds.
   */
  useEffect(() => {
    if (slideCount <= 1) return;

    const id = setInterval(() => {
      navigate("next");
    }, 4000);

    return () => {
      clearInterval(id);
    };
  }, [navigate, slideCount]);

  /*
   * Cleanup animation timer.
   */
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  /*
   * Nothing to render if there are no slides.
   */
  if (slideCount === 0) {
    return null;
  }

  const activeSlide = safeSlides[activeIndex];

  /*
   * Calculate carousel positions.

   * For 3 slides:
   *   center = active
   *   left   = previous
   *   right  = next
   *
   * For 4+ slides:
   *   back   = slide behind the center
   */
  const center = activeIndex;

  const left =
    (activeIndex - 1 + slideCount) % slideCount;

  const right =
    (activeIndex + 1) % slideCount;

  const back =
    slideCount > 3
      ? (activeIndex + 2) % slideCount
      : -1;

  const TRANSITION =
    "transform 650ms cubic-bezier(0.4,0,0.2,1), " +
    "filter 650ms cubic-bezier(0.4,0,0.2,1), " +
    "opacity 650ms cubic-bezier(0.4,0,0.2,1), " +
    "left 650ms cubic-bezier(0.4,0,0.2,1)";

  /*
   * Defines the visual position of each slide.
   */
  function roleStyle(
    role: "center" | "left" | "right" | "back"
  ): React.CSSProperties {
    const base: React.CSSProperties = {
      position: "absolute",
      aspectRatio: "0.6 / 1",
      transition: TRANSITION,
      willChange: "transform, filter, opacity",
    };

    /*
     * CENTER
     */
    if (role === "center") {
      return {
        ...base,
        transform: `translateX(-50%) scale(${
          isMobile ? 1.18 : 1.55
        })`,
        filter: "none",
        opacity: 1,
        zIndex: 20,
        left: "50%",
        height: isMobile ? "60%" : "82%",
        bottom: isMobile ? "22%" : "4%",
      };
    }

    /*
     * LEFT
     */
    if (role === "left") {
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "18%" : "28%",
        height: isMobile ? "16%" : "28%",
        bottom: isMobile ? "32%" : "12%",
      };
    }

    /*
     * RIGHT
     */
    if (role === "right") {
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "82%" : "72%",
        height: isMobile ? "16%" : "28%",
        bottom: isMobile ? "32%" : "12%",
      };
    }

    /*
     * BACK
     */
    return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 0.45,
      zIndex: 5,
      left: "50%",
      height: isMobile ? "13%" : "22%",
      bottom: isMobile ? "32%" : "12%",
    };
  }

  /*
   * Assign every slide its current visual role.
   */
  const roleMap: Record<
    number,
    "center" | "left" | "right" | "back"
  > = {
    [center]: "center",
    [left]: "left",
    [right]: "right",
  };

  if (back !== -1) {
    roleMap[back] = "back";
  }

  /*
   * Use the active slide image as a subtle background.
   */
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#111111",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "620px",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #151515 0%, #24211c 55%, #111111 100%)",
        }}
      >
        {/* ------------------------------------------------
            ACTIVE IMAGE BACKGROUND
        ------------------------------------------------ */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={activeSlide.image}
            alt=""
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "blur(22px)",
              transform: "scale(1.12)",
              opacity: 0.28,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.65) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.65) 100%)",
            }}
          />
        </div>

        {/* ------------------------------------------------
            GRAIN
        ------------------------------------------------ */}
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

        {/* ------------------------------------------------
            GHOST TITLE
        ------------------------------------------------ */}
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
            top: "12%",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(60px, 18vw, 230px)",
              fontWeight: 900,
              color: "white",
              opacity: 0.12,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {activeSlide.title}
          </span>
        </div>

        {/* ------------------------------------------------
            CAROUSEL
        ------------------------------------------------ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
          }}
        >
          {safeSlides.map((slide, index) => {
            const role = roleMap[index];

            /*
             * Hide slides that are not one of the visible
             * carousel positions.
             */
            if (!role) {
              return (
                <div
                  key={index}
                  style={{
                    ...roleStyle("back"),
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                >
                  <img
                    src={slide.image}
                    alt=""
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
              );
            }

            return (
              <div
                key={index}
                style={{
                  ...roleStyle(role),
                  pointerEvents:
                    role === "center" ? "auto" : "none",
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    display: "block",
                    borderRadius: "4px",
                    userSelect: "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------
            BOTTOM LEFT CONTENT
        ------------------------------------------------ */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? 24 : 80,
            left: isMobile ? 16 : 96,
            zIndex: 60,
            maxWidth: isMobile ? 300 : 420,
          }}
        >
          <p
            style={{
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: `0 0 ${isMobile ? 8 : 12}px`,
              fontSize: isMobile ? 16 : 22,
              color: "white",
              opacity: 0.95,
            }}
          >
            {activeSlide.title}
          </p>

          {!isMobile && (
            <p
              style={{
                fontSize: 14,
                color: "white",
                opacity: 0.85,
                lineHeight: 1.6,
                margin: "0 0 20px",
                maxWidth: 400,
              }}
            >
              {activeSlide.description}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            {(["prev", "next"] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => navigate(direction)}
                aria-label={
                  direction === "prev"
                    ? "Previous slide"
                    : "Next slide"
                }
                style={{
                  width: isMobile ? 48 : 64,
                  height: isMobile ? 48 : 64,
                  borderRadius: "50%",
                  background: "transparent",
                  border: "2px solid white",
                  color: "white",
                  cursor:
                    slideCount > 1
                      ? "pointer"
                      : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition:
                    "transform 150ms, background-color 150ms",
                  flexShrink: 0,
                  opacity: slideCount > 1 ? 1 : 0.45,
                }}
                onMouseEnter={(event) => {
                  if (slideCount <= 1) return;

                  event.currentTarget.style.transform =
                    "scale(1.08)";

                  event.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "scale(1)";

                  event.currentTarget.style.backgroundColor =
                    "transparent";
                }}
              >
                {direction === "prev" ? (
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------
            DOT INDICATORS
        ------------------------------------------------ */}
        {slideCount > 1 && (
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
            {safeSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (isAnimating || index === activeIndex) {
                    return;
                  }

                  setActiveIndex(index);
                  setIsAnimating(true);

                  if (timerRef.current) {
                    clearTimeout(timerRef.current);
                  }

                  timerRef.current = setTimeout(() => {
                    setIsAnimating(false);
                  }, 650);
                }}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width:
                    index === activeIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background:
                    index === activeIndex
                      ? "white"
                      : "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                  padding: 0,
                  transition:
                    "width 400ms cubic-bezier(0.4,0,0.2,1), background 300ms",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}