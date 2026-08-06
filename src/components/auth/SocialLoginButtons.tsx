"use client";

import React from "react";

export default function SocialLoginButtons() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <button style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        width: '100%',
        padding: '14px',
        borderRadius: '12px',
        border: '1px solid var(--input-border)',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--ink)',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card-bg)'}
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
        Continue with Google
      </button>
      
      <button style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        width: '100%',
        padding: '14px',
        borderRadius: '12px',
        border: '1px solid var(--input-border)',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--ink)',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card-bg)'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.4 5.4 0 0 0-.1 3.8A5.5 5.5 0 0 0 2 8.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
        </svg>
        Continue with GitHub
      </button>
    </div>
  );
}
