"use client";

import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--cream)', paddingTop: '80px' }}>
      {children}
      {/* Required CSS for media query to hide image on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .auth-hero-section {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}
