import { Search, Filter, MapPin, Calendar, Clock, ChevronRight } from "lucide-react";

export default function CastingCallsPage() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      {/* Header and Search */}
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Active Casting Calls</h2>
          <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Find your next big role from top casting directors.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search roles..." 
              style={{
                padding: '12px 20px 12px 44px', borderRadius: '8px', border: '1px solid var(--dash-border)',
                backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none'
              }}
            />
          </div>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', 
            borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', 
            color: 'var(--dash-text-main)', cursor: 'pointer'
          }}>
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Cards */}
      {[
        { title: "Lead Actor for Indie Film", company: "Moonlight Studios", location: "Mumbai, India", date: "Oct 25", type: "Full-Time" },
        { title: "Voiceover Artist", company: "AudioVerse", location: "Remote", date: "Nov 2", type: "Freelance" },
        { title: "Background Dancers", company: "Rhythm Prod", location: "Delhi, India", date: "Oct 28", type: "Contract" },
        { title: "Commercial Model", company: "Vogue India", location: "Bengaluru, India", date: "Nov 5", type: "Part-Time" }
      ].map((job, idx) => (
        <div key={idx} className="col-span-6 dashboard-card-ui" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{job.title}</h3>
              <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontWeight: 500 }}>{job.company}</p>
            </div>
            <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(232, 169, 58, 0.1)', color: 'var(--gold)' }}>
              {job.type}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {job.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={16} /> Deadline: {job.date}</span>
          </div>
          
          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--dash-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ padding: '8px 24px', borderRadius: '6px', border: 'none', backgroundColor: 'var(--gold)', color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}>
              Apply Now
            </button>
            <button style={{ background: 'none', border: 'none', color: 'var(--dash-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              Details <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
