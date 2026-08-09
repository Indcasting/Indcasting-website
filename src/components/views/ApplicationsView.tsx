"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Clock, MessageSquare, Heart, PlayCircle, FileText, ChevronRight, X, MapPin, Calendar, Briefcase } from "lucide-react";
import NeobrutalistCard from "@/components/ui/NeobrutalistCard";

const applicationsData = [
  { 
    id: 1, 
    title: 'Lead Female Actor', 
    studio: 'Indie Film Project', 
    location: 'Mumbai', 
    status: 'Pending', 
    time: '2 days ago',
    candidateName: 'Aria Sharma',
    professionalTitle: 'Lead Actor',
    experience: '4 Years',
    coverLetter: "Award-winning lead actor known for powerful dramatic performances and extensive training in classical dance. Highly adaptable and takes direction well.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop',
  },
  { 
    id: 2, 
    title: 'Cinematographer', 
    studio: 'Indie Film Project', 
    location: 'Delhi', 
    status: 'Shortlisted', 
    time: '1 week ago',
    candidateName: 'Rohani Das',
    professionalTitle: 'Cinematographer',
    experience: '5 Years',
    coverLetter: "Award-winning DoP with a distinct visual style. Shot 3 feature films and numerous high-end commercials. Specialized in low-light and natural lighting.",
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop',
  },
  { 
    id: 3, 
    title: 'Music Video Dancer', 
    studio: 'Rhythm Productions', 
    location: 'Bengaluru', 
    status: 'Rejected', 
    time: '2 weeks ago',
    candidateName: 'Kabir Khan',
    professionalTitle: 'Professional Dancer',
    experience: '6 Years',
    coverLetter: "Dance is my life. I have choreographed and performed in over 15 music videos. Rhythm Productions has always produced great work, and I'd love to be part of it.",
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop',
  }
];

export default function ApplicationsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [apps, setApps] = useState(applicationsData);
  const [selectedApp, setSelectedApp] = useState<typeof applicationsData[0] | null>(null);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id: number, newStatus: string) => {
    setApps(apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: '#10b981' };
      case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: '#ef4444' };
      case 'Shortlisted': return { bg: 'rgba(201, 168, 76, 0.1)', text: '#10b981', border: '#10b981' }; // Changed to match "Spotlight" green
      default: return { bg: 'rgba(255, 255, 255, 0.05)', text: '#ccc', border: '#666' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return <CheckCircle size={12} />;
      case 'Rejected': return <XCircle size={12} />;
      case 'Shortlisted': return <CheckCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div style={{ width: '100%', fontFamily: 'var(--font-inter), sans-serif', padding: '24px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <Heart size={24} color="#c9a84c" />
           <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff' }}>Application Queue</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px 16px 10px 40px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: '#111',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                width: '240px'
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: '#111', color: '#ccc', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
            >
              <Filter size={16} /> {filterStatus === "All" ? "Filter" : filterStatus}
            </button>
            {isFilterOpen && (
              <div style={{ position: 'absolute', top: '50px', right: 0, backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '8px', zIndex: 50, minWidth: '150px' }}>
                {["All", "Pending", "Shortlisted", "Accepted", "Rejected"].map(status => (
                  <button 
                    key={status}
                    onClick={() => { setFilterStatus(status); setIsFilterOpen(false); }}
                    style={{ width: '100%', padding: '10px 12px', background: filterStatus === status ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', color: '#fff', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} 
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GRID OF CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '32px' }}>
        {filteredApps.map(app => {
          const colors = getStatusColor(app.status);
          
          return (
            <NeobrutalistCard
              key={app.id}
              image={
                <>
                  <img src={app.avatar} alt={app.candidateName} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(17,17,17,0) 0%, rgba(17,17,17,0.4) 80%, rgba(17,17,17,1) 100%)' }} />
                </>
              }
              tags={
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '100px', border: `1px solid ${colors.border}`, backgroundColor: 'transparent', color: colors.text, fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {getStatusIcon(app.status)} {app.status}
                </div>
              }
              title={app.candidateName}
              subtitle={app.professionalTitle}
              content={app.coverLetter}
              actions={
                <>
                  <button 
                    onClick={() => setSelectedApp(app)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 16px', borderRadius: '10px', border: '2px solid var(--dash-border, #333)', backgroundColor: 'transparent', color: 'var(--dash-text-main, #fff)', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s ease', boxShadow: '2px 2px 0px 0px var(--dash-border, #333)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-1px, -1px)'; e.currentTarget.style.boxShadow = '3px 3px 0px 0px var(--gold, #c9a84c)'; e.currentTarget.style.borderColor = 'var(--gold, #c9a84c)'; e.currentTarget.style.color = 'var(--gold, #c9a84c)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '2px 2px 0px 0px var(--dash-border, #333)'; e.currentTarget.style.borderColor = 'var(--dash-border, #333)'; e.currentTarget.style.color = 'var(--dash-text-main, #fff)' }}
                  >
                    <PlayCircle size={16} /> View Application
                  </button>
                  
                  <button 
                    style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px', border: '2px solid var(--dash-border, #333)', backgroundColor: 'transparent', color: 'var(--dash-text-main, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '2px 2px 0px 0px var(--dash-border, #333)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-1px, -1px)'; e.currentTarget.style.boxShadow = '3px 3px 0px 0px var(--gold, #c9a84c)'; e.currentTarget.style.borderColor = 'var(--gold, #c9a84c)'; e.currentTarget.style.color = 'var(--gold, #c9a84c)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '2px 2px 0px 0px var(--dash-border, #333)'; e.currentTarget.style.borderColor = 'var(--dash-border, #333)'; e.currentTarget.style.color = 'var(--dash-text-main, #fff)' }}
                    title="Message"
                  >
                    <MessageSquare size={16} />
                  </button>
                  
                  <button 
                    onClick={() => updateStatus(app.id, app.status === 'Shortlisted' ? 'Pending' : 'Shortlisted')}
                    style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px', border: '2px solid var(--dash-border, #333)', backgroundColor: 'transparent', color: app.status === 'Shortlisted' ? 'var(--gold, #c9a84c)' : 'var(--dash-text-main, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '2px 2px 0px 0px var(--dash-border, #333)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-1px, -1px)'; e.currentTarget.style.boxShadow = '3px 3px 0px 0px var(--gold, #c9a84c)'; e.currentTarget.style.borderColor = 'var(--gold, #c9a84c)'; e.currentTarget.style.color = 'var(--gold, #c9a84c)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '2px 2px 0px 0px var(--dash-border, #333)'; e.currentTarget.style.borderColor = 'var(--dash-border, #333)'; e.currentTarget.style.color = app.status === 'Shortlisted' ? 'var(--gold, #c9a84c)' : 'var(--dash-text-main, #fff)' }}
                    title={app.status === 'Shortlisted' ? "Remove from Shortlist" : "Shortlist"}
                  >
                    <Heart size={16} fill={app.status === 'Shortlisted' ? 'var(--gold, #c9a84c)' : 'none'} />
                  </button>
                </>
              }
            />
          );
        })}
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelectedApp(null)}>
          <div style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff' }}>{selectedApp.candidateName}</h2>
                <p style={{ color: '#c9a84c', fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>{selectedApp.professionalTitle}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ padding: '32px', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Location</p><p style={{ margin: 0, fontWeight: 600, color: '#ddd' }}>{selectedApp.location}</p></div>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Experience</p><p style={{ margin: 0, fontWeight: 600, color: '#ddd' }}>{selectedApp.experience}</p></div>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Applied For</p><p style={{ margin: 0, fontWeight: 600, color: '#ddd' }}>{selectedApp.title}</p></div>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Applied On</p><p style={{ margin: 0, fontWeight: 600, color: '#ddd' }}>{selectedApp.time}</p></div>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', color: '#fff' }}>Cover Letter / Pitch</h3>
                <p style={{ color: '#888', lineHeight: 1.6, margin: 0 }}>"{selectedApp.coverLetter}"</p>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => { updateStatus(selectedApp.id, 'Accepted'); setSelectedApp(null); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#10b981', color: '#000', fontWeight: 700, cursor: 'pointer' }}>Accept</button>
                <button onClick={() => { updateStatus(selectedApp.id, 'Rejected'); setSelectedApp(null); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #ef4444', backgroundColor: 'transparent', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}>Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
