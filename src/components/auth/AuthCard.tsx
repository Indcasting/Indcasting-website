"use client";

import React from "react";
import Link from "next/link";
import { Camera } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkHref: string;
}

export default function AuthCard({ title, subtitle, children, bottomText, bottomLinkText, bottomLinkHref }: AuthCardProps) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>
      
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--ink)', marginBottom: '24px' }}>
            <Camera size={28} color="var(--gold)" />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>IndCasting</span>
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>{title}</h1>
          <p style={{ color: 'var(--mid)', fontSize: '1.05rem' }}>{subtitle}</p>
        </div>

        {children}

        <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--mid)', fontSize: '0.95rem' }}>
          {bottomText}{' '}
          <Link href={bottomLinkHref} style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
            {bottomLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
