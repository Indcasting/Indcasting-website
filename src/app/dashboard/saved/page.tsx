import { Search, MapPin, Calendar, Trash2, ChevronRight, Star } from "lucide-react";

export default function SavedJobsPage() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Saved Jobs</h2>
          <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Casting calls you've bookmarked for later.</p>
        </div>
      </div>

      {[
        { title: "Supporting Actor", company: "Greenlight Prod.", location: "Mumbai", date: "Oct 25", type: "Full-Time" },
        { title: "Print Model", company: "Style Mag", location: "Delhi", date: "Oct 30", type: "Freelance" }
      ].map((job, idx) => (
        <div key={idx} className="col-span-12 dashboard-card-ui" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(232, 169, 58, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={24} color="var(--gold)" fill="var(--gold)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{job.title}</h3>
              <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.9rem', display: 'flex', gap: '16px' }}>
                <span>{job.company}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {job.location}</span>
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {job.date}</span>
            <button style={{ padding: '8px 24px', borderRadius: '6px', border: 'none', backgroundColor: 'var(--gold)', color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
            <button style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-muted)', cursor: 'pointer' }}><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
