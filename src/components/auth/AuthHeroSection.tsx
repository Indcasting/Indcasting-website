"use client";

export default function AuthHeroSection() {
  return (
    <div 
      style={{
        flex: 1,
        display: 'flex',
      }}
      className="auth-hero-section"
    >
      <div style={{ 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.8)), url("https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '60px',
        color: '#fff'
      }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>
          Where <span style={{ color: 'var(--gold)' }}>Talent</span><br/>Meets Opportunity.
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#eaeaea', maxWidth: '85%', lineHeight: 1.6 }}>
          Join India's premier casting platform. Connect with top directors, production houses, and the brightest rising stars in the industry.
        </p>
      </div>
    </div>
  );
}
