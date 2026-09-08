"use client";

import { CheckCircle2, Crown, Building } from "lucide-react";

export default function SeekerMembership() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '40px 24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(232,169,58,0.1) 0%, rgba(20,20,20,1) 100%)' }}>
        <Crown size={48} color="var(--gold)" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--dash-text-main)' }}>Enterprise Plans for Casting Directors</h2>
        <p style={{ color: 'var(--dash-text-muted)', margin: '0 auto 24px auto', maxWidth: '600px', fontSize: '1.1rem' }}>
          Scale your casting process with powerful tools, unlimited active calls, and advanced analytics.
        </p>
      </div>

      <div className="col-span-6 dashboard-card-ui" style={{ padding: '32px', position: 'relative' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Basic Tier</h3>
        <p style={{ color: 'var(--dash-text-muted)', margin: '0 0 24px 0' }}>For independent directors.</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--dash-text-main)', marginBottom: '24px' }}>$49<span style={{ fontSize: '1rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>/mo</span></div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--dash-text-muted)' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--dash-text-muted)" /> 3 Active Casting Calls</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--dash-text-muted)" /> Standard Support</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}><CheckCircle2 size={18} /> No ATS Integration</li>
        </ul>
        <button className="dash-btn-outline" style={{ width: '100%', opacity: 0.7, cursor: 'not-allowed' }} disabled>Current Plan</button>
      </div>

      <div className="col-span-6 dashboard-card-ui" style={{ padding: '32px', border: '2px solid var(--gold)' }}>
        <div style={{ position: 'absolute', top: '-12px', right: '24px', backgroundColor: 'var(--gold)', color: 'var(--ink)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Building size={12} /> ENTERPRISE</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--gold)' }}>Studio Premium</h3>
        <p style={{ color: 'var(--dash-text-muted)', margin: '0 0 24px 0' }}>For production houses and agencies.</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--dash-text-main)', marginBottom: '24px' }}>$199<span style={{ fontSize: '1rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>/mo</span></div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--dash-text-main)' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--gold)" /> Unlimited Casting Calls</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--gold)" /> Advanced ATS & Filtering</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--gold)" /> API Access & CRM Integration</li>
        </ul>
        <button className="dash-btn-primary" style={{ width: '100%' }}>Upgrade Now</button>
      </div>

    </div>
  );
}
