import { HelpCircle, Mail, Phone, ChevronDown } from "lucide-react";

export default function HelpCenterPage() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '40px 24px', textAlign: 'center' }}>
        <HelpCircle size={48} color="var(--gold)" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--dash-text-main)' }}>How can we help?</h2>
        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
          <input type="text" placeholder="Search for answers..." style={{ width: '100%', padding: '16px 20px', borderRadius: '100px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none', fontSize: '1rem' }} />
        </div>
      </div>

      <div className="col-span-8 dashboard-card-ui" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 24px 0', color: 'var(--dash-text-main)' }}>Frequently Asked Questions</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            "How do I apply for a casting call?",
            "Can I update my application after submitting?",
            "How does the Premium membership work?",
            "Who can see my portfolio?"
          ].map((q, i) => (
            <div key={i} style={{ border: '1px solid var(--dash-border)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ color: 'var(--dash-text-main)', fontWeight: 500 }}>{q}</span>
              <ChevronDown size={18} color="var(--dash-text-muted)" />
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="dashboard-card-ui" style={{ padding: '24px', textAlign: 'center' }}>
          <Mail size={32} color="var(--gold)" style={{ margin: '0 auto 16px auto' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Email Support</h4>
          <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', margin: '0 0 16px 0' }}>Get a response within 24 hours.</p>
          <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--gold)', backgroundColor: 'transparent', color: 'var(--gold)', fontWeight: 600, cursor: 'pointer' }}>Contact Us</button>
        </div>
        <div className="dashboard-card-ui" style={{ padding: '24px', textAlign: 'center' }}>
          <Phone size={32} color="var(--gold)" style={{ margin: '0 auto 16px auto' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Phone Support</h4>
          <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', margin: '0 0 16px 0' }}>Available Mon-Fri, 9am - 5pm.</p>
          <a href="#" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>+1 (800) 123-4567</a>
        </div>
      </div>

    </div>
  );
}
