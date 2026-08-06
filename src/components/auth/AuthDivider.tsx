"use client";

export default function AuthDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--input-border)' }}></div>
      <span style={{ color: 'var(--mid)', fontSize: '0.85rem', fontWeight: 600 }}>OR</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--input-border)' }}></div>
    </div>
  );
}
