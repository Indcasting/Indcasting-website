import { CheckCircle2, Crown, Zap } from "lucide-react";

export default function MembershipPage() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '40px 24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(232,169,58,0.1) 0%, rgba(20,20,20,1) 100%)' }}>
        <Crown size={48} color="var(--gold)" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--dash-text-main)' }}>Upgrade to Premium</h2>
        <p style={{ color: 'var(--dash-text-muted)', margin: '0 auto 24px auto', maxWidth: '600px', fontSize: '1.1rem' }}>
          Get exclusive access to top-tier casting calls, priority applications, and a featured profile.
        </p>
      </div>

      <div className="col-span-6 dashboard-card-ui" style={{ padding: '32px', position: 'relative' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Free</h3>
        <p style={{ color: 'var(--dash-text-muted)', margin: '0 0 24px 0' }}>Perfect to get started.</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--dash-text-main)', marginBottom: '24px' }}>$0<span style={{ fontSize: '1rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>/mo</span></div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--dash-text-muted)' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--dash-text-muted)" /> Basic profile</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--dash-text-muted)" /> Apply to 3 jobs/month</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}><CheckCircle2 size={18} /> No featured listing</li>
        </ul>
        <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', fontWeight: 600, cursor: 'not-allowed' }}>Current Plan</button>
      </div>

      <div className="col-span-6 dashboard-card-ui" style={{ padding: '32px', border: '2px solid var(--gold)' }}>
        <div style={{ position: 'absolute', top: '-12px', right: '24px', backgroundColor: 'var(--gold)', color: 'var(--ink)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={12} /> RECOMMENDED</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--gold)' }}>Premium</h3>
        <p style={{ color: 'var(--dash-text-muted)', margin: '0 0 24px 0' }}>For serious professionals.</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--dash-text-main)', marginBottom: '24px' }}>$19<span style={{ fontSize: '1rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>/mo</span></div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--dash-text-main)' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--gold)" /> Premium profile with video reels</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--gold)" /> Unlimited applications</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--gold)" /> Featured listing in director searches</li>
        </ul>
        <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--gold)', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer' }}>Upgrade Now</button>
      </div>

    </div>
  );
}
