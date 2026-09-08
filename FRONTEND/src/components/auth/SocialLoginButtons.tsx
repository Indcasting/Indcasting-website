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

    </div>
  );
}
