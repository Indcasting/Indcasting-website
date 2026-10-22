"use client";

import { useEffect, useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Clock, MessageSquare, Heart, PlayCircle, FileText, ChevronRight, X, MapPin, Calendar, Briefcase } from "lucide-react";
import NeobrutalistCard from "@/components/ui/NeobrutalistCard";

type ApiApplication = {
  id: string;
  status?: string | null;
  coverNote?: string | null;
  createdAt?: string;
  job?: {
    id?: string;
    title?: string | null;
    company?: string | null;
    location?: string | null;
  } | null;
  talent?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    skill?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
  } | null;
};

type ApplicationViewModel = {
  id: string;
  title: string;
  studio: string;
  location: string;
  status: string;
  time: string;
  candidateName: string;
  professionalTitle: string;
  experience: string;
  coverLetter: string;
  avatar: string;
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
const fallbackAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop";

function displayStatus(status?: string | null) {
  switch ((status || "pending").toLowerCase()) {
    case "shortlisted": return "Shortlisted";
    case "accepted": return "Accepted";
    case "rejected": return "Rejected";
    default: return "Pending";
  }
}

function relativeTime(dateString?: string) {
  if (!dateString) return "Date unavailable";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  if (weeks < 5) return `${weeks} weeks ago`;
  return date.toLocaleDateString();
}

function mapApplication(application: ApiApplication): ApplicationViewModel {
  return {
    id: application.id,
    title: application.job?.title || "Casting call",
    studio: application.job?.company || "Production company",
    location: application.job?.location || "Location not specified",
    status: displayStatus(application.status),
    time: relativeTime(application.createdAt),
    candidateName: application.talent?.name || "Unnamed applicant",
    professionalTitle: application.talent?.skill || "Talent applicant",
    experience: "Not specified",
    coverLetter: application.coverNote?.trim() || application.talent?.bio?.trim() || "No cover letter or pitch was provided.",
    avatar: application.talent?.avatarUrl || fallbackAvatar,
  };
}

export default function ApplicationsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [apps, setApps] = useState<ApplicationViewModel[]>([]);
  const [selectedApp, setSelectedApp] = useState<ApplicationViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadApplications() {
      setIsLoading(true);
      setLoadError("");
      try {
        const response = await fetch(`${API_URL}/applications/received`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Please log in with your seeker account to view received applications.");
          }
          throw new Error(`Could not load applications (HTTP ${response.status}).`);
        }
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error("The server returned an unexpected applications response.");
        if (!cancelled) setApps((data as ApiApplication[]).map(mapApplication));
      } catch (error) {
        if (!cancelled) setLoadError(error instanceof Error ? error.message : "Could not load applications.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadApplications();
    return () => { cancelled = true; };
  }, []);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const updateStatus = async (id: string, newStatus: string) => {
    const apiStatus: Record<string, string> = {
      Pending: "pending",
      Shortlisted: "shortlisted",
      Accepted: "accepted",
      Rejected: "rejected",
    };
    const status = apiStatus[newStatus];
    if (!status) return;

    setActionError("");
    setUpdatingId(id);
    try {
      const response = await fetch(`${API_URL}/applications/${encodeURIComponent(id)}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        let message = `Could not update application (HTTP ${response.status}).`;
        try {
          const body = await response.json();
          if (typeof body?.message === "string") message = body.message;
        } catch { /* Keep the HTTP error message. */ }
        throw new Error(message);
      }
      const updated = await response.json();
      const savedStatus = displayStatus(updated?.status || status);
      setApps(current => current.map(app => app.id === id ? { ...app, status: savedStatus } : app));
      setSelectedApp(current => current?.id === id ? { ...current, status: savedStatus } : current);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not update application status.");
    } finally {
      setUpdatingId(null);
    }
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
           <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--dash-text-main, #fff)' }}>Application Queue</h2>
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
                width: '300px', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid var(--dash-border, #333)', backgroundColor: 'var(--dash-surface, #111)', color: 'var(--dash-text-main, #fff)', fontSize: '0.95rem'
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--dash-border, #333)', backgroundColor: 'var(--dash-surface, #111)', color: 'var(--dash-text-main, #fff)', cursor: 'pointer', fontWeight: 600 }}
            >
              <Filter size={16} /> {filterStatus === "All" ? "Filter" : filterStatus}
            </button>
            {isFilterOpen && (
              <div style={{ position: 'absolute', top: '50px', right: 0, backgroundColor: 'var(--dash-surface, #1a1a1a)', border: '1px solid var(--dash-border, rgba(255,255,255,0.1))', borderRadius: '12px', padding: '8px', zIndex: 50, minWidth: '150px' }}>
                {["All", "Pending", "Shortlisted", "Accepted", "Rejected"].map(status => (
                  <button 
                    key={status} 
                    onClick={() => { setFilterStatus(status); setIsFilterOpen(false); }} 
                    style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'transparent', border: 'none', color: status === filterStatus ? '#c9a84c' : 'var(--dash-text-main, #ccc)', cursor: 'pointer', fontWeight: status === filterStatus ? 700 : 500 }} 
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--dash-border, rgba(255,255,255,0.05))'} 
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loadError && <div role="alert" style={{ marginBottom: '20px', padding: '14px 16px', borderRadius: '12px', border: '1px solid #ef4444', color: '#ef4444', background: 'rgba(239,68,68,0.08)' }}>{loadError}</div>}
      {actionError && <div role="alert" style={{ marginBottom: '20px', padding: '14px 16px', borderRadius: '12px', border: '1px solid #ef4444', color: '#ef4444', background: 'rgba(239,68,68,0.08)' }}>{actionError}</div>}

      {/* GRID OF CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '32px' }}>
        {isLoading ? <div style={{ color: 'var(--dash-text-main, #ddd)', padding: '24px' }}>Loading applications…</div> : filteredApps.length === 0 ? <div style={{ color: 'var(--dash-text-main, #ddd)', padding: '24px', border: '1px dashed var(--dash-border, #333)', borderRadius: '16px' }}>{loadError ? 'Applications could not be loaded.' : searchQuery || filterStatus !== 'All' ? 'No applications match your search or filter.' : 'No applications have been received yet.'}</div> : filteredApps.map(app => {
          const colors = getStatusColor(app.status);
          
          return (
            <NeobrutalistCard
              key={app.id}
              image={
                <>
                  <img src={app.avatar} alt={app.candidateName} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, transparent 0%, var(--dash-surface, rgba(17,17,17,0.4)) 80%, var(--dash-surface, rgba(17,17,17,1)) 100%)' }} />
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
                    disabled={updatingId === app.id}
                    onClick={() => void updateStatus(app.id, app.status === 'Shortlisted' ? 'Pending' : 'Shortlisted')}
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
          <div style={{ backgroundColor: 'var(--dash-surface, #111)', border: '1px solid var(--dash-border, rgba(255,255,255,0.1))', borderRadius: '24px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main, #fff)' }}>{selectedApp.candidateName}</h2>
                <p style={{ color: '#c9a84c', fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>{selectedApp.professionalTitle}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ padding: '32px', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Location</p><p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main, #ddd)' }}>{selectedApp.location}</p></div>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Experience</p><p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main, #ddd)' }}>{selectedApp.experience}</p></div>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Applied For</p><p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main, #ddd)' }}>{selectedApp.title}</p></div>
                <div><p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Applied On</p><p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main, #ddd)' }}>{selectedApp.time}</p></div>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main, #fff)' }}>Cover Letter / Pitch</h3>
                <p style={{ color: '#888', lineHeight: 1.6, margin: 0 }}>"{selectedApp.coverLetter}"</p>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button disabled={updatingId === selectedApp.id} onClick={() => void updateStatus(selectedApp.id, 'Accepted')} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#10b981', color: '#000', fontWeight: 700, cursor: 'pointer' }}>Accept</button>
                <button disabled={updatingId === selectedApp.id} onClick={() => void updateStatus(selectedApp.id, 'Rejected')} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #ef4444', backgroundColor: 'transparent', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}>Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
