"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = "", style, ...props }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={() => { setIsFocused(true); setOpacity(1); }}
        onBlur={() => { setIsFocused(false); setOpacity(0); }}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className={`spotlight-wrapper ${className}`}
        style={style}
        {...props}
      >
        <div
          className="spotlight-effect"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--spotlight-color), transparent 40%)`,
          }}
        />
        <div className="spotlight-content">
          {children}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .spotlight-wrapper {
          position: relative;
          border-radius: inherit;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 1;
        }
        
        .spotlight-wrapper:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15), 0 8px 12px -6px rgba(0, 0, 0, 0.1);
        }

        .spotlight-effect {
          pointer-events: none;
          position: absolute;
          inset: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          z-index: -1;
        }

        .spotlight-content {
          position: relative;
          z-index: 2;
          height: 100%;
          border-radius: inherit;
        }

        /* Light Mode Default */
        :root, html.light {
          --spotlight-color: rgba(212, 175, 55, 0.08);
        }

        /* Dark Mode */
        html.dark {
          --spotlight-color: rgba(212, 175, 55, 0.12);
        }

        /* Touch Devices - Disable spotlight, keep hover shadow via base CSS (or OS defaults) */
        @media (hover: none) and (pointer: coarse) {
          .spotlight-effect {
            display: none !important;
          }
        }

        /* Accessibility - Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .spotlight-effect {
            display: none !important;
          }
          .spotlight-wrapper {
            transition: none !important;
            transform: none !important;
          }
        }
        `
      }} />
    </>
  );
}
