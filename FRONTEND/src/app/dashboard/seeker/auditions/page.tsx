"use client";

import { useState } from "react";
import { 
  Calendar, PlusCircle, Video, MapPin, Clock, X, Search, 
  Users, User, Target, CheckCircle, ChevronRight, MessageSquare, 
  Film, Filter, LayoutGrid, List, Columns, Edit2, Play, Activity, Share2
} from "lucide-react";
import Link from "next/link";

export default function SeekerAuditions() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  // Extended Mock Data for Audition Studio
  const [auditions, setAuditions] = useState([
    { 
      id: 1, 
      role: "Lead Actor", 
      production: "Indie Feature Film",
      candidate: "Aria Sharma", 
      avatar: "https://i.pravatar.cc/150?u=aria",
      date: "Oct 15, 2026", 
      time: "10:00 AM", 
      duration: "45 mins",
      type: "In-Person", 
      loc: "Studio A, Mumbai", 
      status: "Ready",
      experience: "Advanced",
      rating: 4.8
    },
    { 
      id: 2, 
      role: "Voice Artist", 
      production: "Animation Series",
      candidate: "Karan Patel", 
      avatar: "https://i.pravatar.cc/150?u=karan",
      date: "Oct 15, 2026", 
      time: "2:30 PM", 
      duration: "30 mins",
      type: "Remote", 
      loc: "Zoom", 
      status: "Waiting",
      experience: "Intermediate",
      rating: 4.2
    },
    { 
      id: 3, 
      role: "Dancer", 
      production: "Music Video",
      candidate: "Neha Singh", 
      avatar: "https://i.pravatar.cc/150?u=neha",
      date: "Oct 14, 2026", 
      time: "11:00 AM", 
      duration: "60 mins",
      type: "In-Person", 
      loc: "Dance Hall, Delhi", 
      status: "Completed",
      experience: "Professional",
      rating: 4.9
    },
    { 
      id: 4, 
      role: "Supporting Actor", 
      production: "Indie Feature Film",
      candidate: "Rahul Verma", 
      avatar: "https://i.pravatar.cc/150?u=rahul",
      date: "Oct 15, 2026", 
      time: "4:00 PM", 
      duration: "30 mins",
      type: "Remote", 
      loc: "Google Meet", 
      status: "Live",
      experience: "Beginner",
      rating: 3.5
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "timeline" | "kanban">("grid");
  const filterOptions = ["All", "Actors", "Models", "Voice Artists", "Dancers"];
  const [filterType, setFilterType] = useState("All");

  const filteredAuditions = auditions.filter(aud => {
    const matchesSearch = aud.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          aud.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusVisuals = (status: string) => {
    switch (status) {
      case "Ready": return { color: "#10b981", bg: "rgba(16,185,129,0.1)", dot: "animate-pulse" };
      case "Waiting": return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", dot: "" };
      case "Live": return { color: "#3b82f6", bg: "rgba(59,130,246,0.15)", dot: "animate-ping" };
      case "Reviewing": return { color: "#a855f7", bg: "rgba(168,85,247,0.1)", dot: "" };
      case "Completed": return { color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "" };
      case "Cancelled": return { color: "#ef4444", bg: "rgba(239,68,68,0.1)", dot: "" };
      default: return { color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "" };
    }
  };

  const kanbanColumns = ["Ready", "Waiting", "Live", "Completed"];

  return (
    <div className="aud-container">
      <style dangerouslySetInnerHTML={{__html: `
        .aud-container {
          padding: 20px 0 80px 0;
          color: var(--dash-text-main, #000);
          position: relative;
          min-height: 100vh;
        }
        
        /* Cinematic Background */
        .aud-container::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 40%),
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
          z-index: -1;
          pointer-events: none;
        }

        /* Hero Header */
        .aud-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .aud-title {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 8px 0;
          letter-spacing: -0.03em;
          color: var(--dash-text-main, #fff);
        }
        .aud-subtitle {
          font-size: 1.1rem;
          color: var(--dash-text-muted, #888);
          max-width: 500px;
          line-height: 1.6;
        }

        /* Stats Row */
        .aud-stats {
          display: flex;
          gap: 16px;
        }
        .aud-stat-card {
          background: var(--dash-surface, linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3)));
          border: 1px solid var(--dash-border, rgba(255,255,255,0.05));
          border-radius: 16px;
          padding: 20px;
          min-width: 150px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex; flex-direction: column; gap: 8px;
        }
        .aud-stat-val { font-size: 1.8rem; font-weight: 800; color: var(--dash-text-main, #fff); line-height: 1; }
        .aud-stat-label { font-size: 0.8rem; color: var(--dash-text-muted, #888); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: flex; alignItems: center; gap: 6px; }

        /* Floating Controls */
        .aud-controls {
          position: sticky; top: 80px; z-index: 100; margin-bottom: 40px;
          background: var(--dash-surface, rgba(15, 15, 15, 0.75)); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--dash-border, rgba(255, 255, 255, 0.08)); border-radius: 20px;
          padding: 16px 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          display: flex; flex-direction: column; gap: 20px;
        }
        .aud-search-row { display: flex; align-items: center; gap: 16px; }
        .aud-search-wrap {
          flex: 1; display: flex; align-items: center; gap: 12px;
          background: var(--dash-surface, rgba(0,0,0,0.4)); border: 1px solid var(--dash-border, rgba(255,255,255,0.1));
          border-radius: 12px; padding: 12px 20px; transition: all 0.3s ease;
        }
        .aud-search-wrap:focus-within { border-color: rgba(212, 175, 55, 0.4); box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1); }
        .aud-search-input { flex: 1; background: transparent; border: none; color: var(--dash-text-main, #fff); font-size: 1rem; outline: none; }
        
        .aud-view-toggle { display: flex; background: var(--dash-surface, rgba(0,0,0,0.5)); border-radius: 10px; padding: 4px; border: 1px solid var(--dash-border, rgba(255,255,255,0.05)); }
        .aud-view-btn { padding: 8px 16px; border-radius: 6px; border: none; background: transparent; color: var(--dash-text-muted, #888); font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .aud-view-btn.active { background: var(--dash-hover-bg, rgba(255,255,255,0.1)); color: var(--dash-text-main, #fff); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

        .aud-filter-chips { display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; }
        .aud-filter-chips::-webkit-scrollbar { display: none; }
        .aud-chip { padding: 8px 20px; border-radius: 100px; background: var(--dash-surface, rgba(255,255,255,0.03)); border: 1px solid var(--dash-border, rgba(255,255,255,0.1)); color: var(--dash-text-muted, #aaa); font-size: 0.85rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.3s; }
        .aud-chip:hover { background: var(--dash-hover-bg, rgba(255,255,255,0.08)); color: var(--dash-text-main, #fff); }
        .aud-chip.active { background: rgba(212, 175, 55, 0.15); border-color: rgba(212, 175, 55, 0.5); color: var(--gold); }

        /* Dashboard Layout */
        .aud-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }
        @media (max-width: 1024px) { .aud-layout { grid-template-columns: 1fr; } }

        /* Grid View */
        .aud-grid { display: flex; flex-direction: column; gap: 24px; }

        /* Kanban View */
        .aud-kanban { display: flex; gap: 24px; overflow-x: auto; padding-bottom: 24px; }
        .aud-kanban-col { min-width: 320px; flex: 1; background: var(--dash-surface, rgba(0,0,0,0.2)); border-radius: 24px; padding: 20px; border: 1px solid var(--dash-border, rgba(255,255,255,0.03)); }
        .aud-kanban-header { font-size: 1rem; font-weight: 700; color: var(--dash-text-main, #fff); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Timeline View */
        .aud-timeline { display: flex; flex-direction: column; gap: 0; padding-left: 20px; position: relative; }
        .aud-timeline::before { content: ''; position: absolute; left: 24px; top: 0; bottom: 0; width: 2px; background: var(--dash-border, rgba(255,255,255,0.05)); }
        .timeline-item { display: flex; gap: 32px; position: relative; padding-bottom: 40px; }
        .timeline-time { width: 100px; font-weight: 700; color: var(--dash-text-muted, #aaa); text-align: right; margin-top: 4px; }
        .timeline-dot { position: absolute; left: -2px; top: 8px; width: 10px; height: 10px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 10px var(--gold); }
        .timeline-content { flex: 1; }

        /* Audition Card */
        .aud-card {
          background: var(--dash-surface, linear-gradient(145deg, #161616, #0a0a0a));
          border: 2px solid var(--dash-border, rgba(255,255,255,0.06));
          border-radius: 20px;
          padding: 24px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .aud-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px 0px var(--gold, #c9a84c);
          border-color: var(--gold, #c9a84c);
        }
        
        .aud-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .aud-avatar-wrap { display: flex; gap: 16px; align-items: center; }
        .aud-avatar { width: 56px; height: 56px; border-radius: 14px; background: var(--dash-surface, #222); border: 1px solid var(--dash-border, rgba(255,255,255,0.1)); overflow: hidden; }
        .aud-avatar img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .aud-card:hover .aud-avatar img { transform: scale(1.1); }
        
        .aud-name { font-size: 1.3rem; font-weight: 800; color: var(--dash-text-main, #fff); margin: 0 0 4px 0; letter-spacing: -0.01em; }
        .aud-role { font-size: 0.95rem; color: var(--dash-text-muted, #888); display: flex; align-items: center; gap: 6px; }
        
        .aud-status-badge {
          display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 100px;
          font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }

        .aud-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px 0; border-top: 1px solid var(--dash-border, rgba(255,255,255,0.05)); border-bottom: 1px solid var(--dash-border, rgba(255,255,255,0.05)); margin-bottom: 20px; }
        .meta-col { display: flex; flex-direction: column; gap: 4px; }
        .meta-lbl { font-size: 0.8rem; color: var(--dash-text-muted, #666); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; }
        .meta-val { font-size: 0.95rem; color: var(--dash-text-main, #eee); font-weight: 500; display: flex; align-items: center; gap: 6px; }
        .meta-lbl { font-size: 0.75rem; color: #666; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
        .meta-val { font-size: 0.95rem; color: #eee; font-weight: 500; display: flex; align-items: center; gap: 6px; }

        .aud-actions { display: flex; justify-content: space-between; align-items: center; }
        .action-icon-group { display: flex; gap: 8px; }
        .icon-btn { width: 36px; height: 36px; border-radius: 10px; background: var(--dash-surface, rgba(255,255,255,0.03)); border: 1px solid var(--dash-border, rgba(255,255,255,0.05)); color: var(--dash-text-muted, #aaa); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .icon-btn:hover { background: var(--dash-hover-bg, rgba(255,255,255,0.1)); color: var(--dash-text-main, #fff); }
        
        .btn-start { background: rgba(59, 130, 246, 0.15); color: #3b82f6; padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(59, 130, 246, 0.3); font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
        .btn-start:hover { background: #3b82f6; color: #fff; box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4); transform: translateY(-2px); }

        /* Insights Sidebar */
        .insights-panel { background: var(--dash-surface, rgba(0,0,0,0.3)); border: 1px solid var(--dash-border, rgba(255,255,255,0.05)); border-radius: 24px; padding: 24px; height: fit-content; position: sticky; top: 230px; }
        .insights-header { font-size: 1.1rem; font-weight: 800; color: var(--dash-text-main, #fff); margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px; }
        .insight-block { margin-bottom: 24px; }
        .insight-lbl { font-size: 0.8rem; color: var(--dash-text-muted, #888); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 12px; }
        .insight-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--dash-border, rgba(255,255,255,0.03)); }
        .insight-item:last-child { border-bottom: none; }
        .insight-time { font-size: 0.85rem; color: var(--gold); font-weight: 700; width: 60px; }
        .insight-info { flex: 1; }
        .insight-title { font-size: 0.9rem; color: var(--dash-text-main, #fff); font-weight: 600; }
        .insight-desc { font-size: 0.8rem; color: var(--dash-text-muted, #888); }
        
        /* Modals */
        .cine-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 9999; display: flex; alignItems: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease-out; }
        .cine-modal-content { background-color: var(--dash-surface, #111); border: 1px solid var(--dash-border, rgba(255,255,255,0.1)); border-radius: 24px; width: 100%; max-width: 480px; box-shadow: 0 40px 80px rgba(0,0,0,0.8); overflow: hidden; display: flex; flex-direction: column; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />

      {/* Premium Hero */}
      <div className="aud-hero">
        <div>
          <h1 className="aud-title">Audition Studio</h1>
          <p className="aud-subtitle">Schedule, organize, monitor, and evaluate every audition from one intelligent production workspace.</p>
        </div>
        
        <div className="aud-stats">
          <div className="aud-stat-card">
            <span className="aud-stat-label"><Calendar size={14} color="var(--gold)" /> Today's</span>
            <span className="aud-stat-val">3</span>
          </div>
          <div className="aud-stat-card">
            <span className="aud-stat-label"><Activity size={14} color="#3b82f6" /> Upcoming</span>
            <span className="aud-stat-val">12</span>
          </div>
          <div className="aud-stat-card">
            <span className="aud-stat-label"><CheckCircle size={14} color="#10b981" /> Completed</span>
            <span className="aud-stat-val">45</span>
          </div>
        </div>
      </div>

      {/* Floating Control Bar */}
      <div className="aud-controls">
        <div className="aud-search-row">
          <div className="aud-search-wrap">
            <Search size={20} color="rgba(255,255,255,0.4)" />
            <input 
              type="text" 
              className="aud-search-input" 
              placeholder="Search candidates, roles, or dates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="aud-view-toggle">
            <button className={`aud-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              <LayoutGrid size={16} /> Grid
            </button>
            <button className={`aud-view-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}>
              <List size={16} /> Timeline
            </button>
            <button className={`aud-view-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}>
              <Columns size={16} /> Kanban
            </button>
          </div>

          <button 
            style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s', boxShadow: '0 8px 16px rgba(212,175,55,0.2)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <PlusCircle size={18} /> Schedule Audition
          </button>
        </div>
        
        <div className="aud-filter-chips">
          {filterOptions.map(opt => (
            <button key={opt} className={`aud-chip ${filterType === opt ? 'active' : ''}`} onClick={() => setFilterType(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="aud-layout">
        
        {/* Left Column: Auditions */}
        <div>
          {filteredAuditions.length === 0 ? (
            <div style={{ padding: '80px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <Video size={64} color="var(--gold)" style={{ margin: '0 auto 24px auto', opacity: 0.5 }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>No auditions scheduled</h2>
              <p style={{ color: '#888', marginBottom: '24px' }}>Schedule your first audition and start discovering exceptional talent.</p>
              <button 
                onClick={() => setIsScheduleModalOpen(true)}
                style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '14px 28px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <PlusCircle size={18} /> Schedule Audition
              </button>
            </div>
          ) : (
            viewMode === 'grid' ? (
              <div className="aud-grid">
                {filteredAuditions.map(aud => <AuditionCard key={aud.id} aud={aud} getStatusVisuals={getStatusVisuals} setIsScheduleModalOpen={setIsScheduleModalOpen} />)}
              </div>
            ) : viewMode === 'timeline' ? (
              <div className="aud-timeline">
                {filteredAuditions.map(aud => (
                  <div key={aud.id} className="timeline-item">
                    <div className="timeline-time">{aud.time}</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <AuditionCard aud={aud} getStatusVisuals={getStatusVisuals} setIsScheduleModalOpen={setIsScheduleModalOpen} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="aud-kanban">
                {kanbanColumns.map(col => (
                  <div key={col} className="aud-kanban-col">
                    <div className="aud-kanban-header">
                      {col} <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                        {filteredAuditions.filter(a => a.status === col).length}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {filteredAuditions.filter(a => a.status === col).map(aud => (
                        <AuditionCard key={aud.id} aud={aud} getStatusVisuals={getStatusVisuals} setIsScheduleModalOpen={setIsScheduleModalOpen} isCompact />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Right Column: Insights Sidebar */}
        {viewMode !== 'kanban' && (
          <div className="insights-panel">
            <h3 className="insights-header"><Activity size={18} color="var(--gold)" /> Today's Timeline</h3>
            
            <div className="insight-block">
              <div className="insight-lbl">Morning Block</div>
              <div className="insight-item">
                <div className="insight-time">10:00</div>
                <div className="insight-info">
                  <div className="insight-title">Aria Sharma</div>
                  <div className="insight-desc">Lead Actor (45m)</div>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-time">11:00</div>
                <div className="insight-info">
                  <div className="insight-title">Neha Singh</div>
                  <div className="insight-desc">Dancer (60m)</div>
                </div>
              </div>
            </div>

            <div className="insight-block">
              <div className="insight-lbl">Pending Evaluations</div>
              <div className="insight-item" style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <div className="insight-info">
                  <div className="insight-title" style={{ color: '#f59e0b' }}>3 Evaluations Pending</div>
                  <div className="insight-desc" style={{ marginTop: '4px' }}>Please submit your feedback for yesterday's casting calls.</div>
                  <button style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginTop: '8px', cursor: 'pointer' }}>Review Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Modal (Redesigned) */}
      {isScheduleModalOpen && (
        <div className="cine-modal-overlay" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="cine-modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff' }}>Schedule Audition</h2>
              <button onClick={() => setIsScheduleModalOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Select Candidate</label>
                <select style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                  <option>Aria Sharma - Lead Actor</option>
                  <option>Rahul Verma - Supporting Actor</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Date</label>
                  <input type="date" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', colorScheme: 'dark', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Time</label>
                  <input type="time" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', colorScheme: 'dark', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Format</label>
                  <select style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                    <option>Remote (Zoom)</option>
                    <option>Remote (Google Meet)</option>
                    <option>In-Person</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Duration</label>
                  <select style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                    <option>15 mins</option>
                    <option>30 mins</option>
                    <option>45 mins</option>
                    <option>60 mins</option>
                  </select>
                </div>
              </div>
              <div style={{ padding: '24px 0 0 0', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                <button onClick={() => setIsScheduleModalOpen(false)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button onClick={() => { alert("Audition scheduled successfully!"); setIsScheduleModalOpen(false); }} style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer' }}>Confirm Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponent for Audition Cards
function AuditionCard({ aud, getStatusVisuals, setIsScheduleModalOpen, isCompact = false }: any) {
  const statusVis = getStatusVisuals(aud.status);

  if (isCompact) {
    return (
      <div className="aud-card" style={{ padding: '16px', marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div className="aud-avatar" style={{ width: '40px', height: '40px' }}>
            <img src={aud.avatar} alt={aud.candidate} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>{aud.candidate}</h4>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>{aud.role}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#aaa', marginBottom: '12px' }}>
          <Clock size={12} color="var(--gold)" /> {aud.time} ({aud.duration})
        </div>
        <button className="btn-start" style={{ width: '100%', justifyContent: 'center', padding: '8px' }} onClick={() => alert(`Starting audition session with ${aud.candidate}`)}>
          {aud.status === 'Ready' || aud.status === 'Waiting' ? 'Start' : 'Details'}
        </button>
      </div>
    );
  }

  return (
    <div className="aud-card">
      <div className="aud-header">
        <div className="aud-avatar-wrap">
          <div className="aud-avatar">
            <img src={aud.avatar} alt={aud.candidate} />
          </div>
          <div>
            <h3 className="aud-name">{aud.candidate}</h3>
            <div className="aud-role"><Film size={14} /> {aud.role} • {aud.production}</div>
          </div>
        </div>
        
        <div className="aud-status-badge" style={{ background: statusVis.bg, color: statusVis.color, border: `1px solid ${statusVis.color}40` }}>
          <div className={`status-dot ${statusVis.dot}`} style={{ background: statusVis.color }}></div>
          {aud.status}
        </div>
      </div>

      <div className="aud-meta">
        <div className="meta-col">
          <span className="meta-lbl">Schedule</span>
          <span className="meta-val"><Clock size={14} color="var(--gold)" /> {aud.date} • {aud.time}</span>
        </div>
        <div className="meta-col">
          <span className="meta-lbl">Location / Format</span>
          <span className="meta-val">
            {aud.type === 'Remote' ? <Video size={14} color="#3b82f6" /> : <MapPin size={14} color="#ef4444" />} 
            {aud.loc}
          </span>
        </div>
        <div className="meta-col">
          <span className="meta-lbl">Experience</span>
          <span className="meta-val"><Target size={14} color="#10b981" /> {aud.experience}</span>
        </div>
      </div>

      <div className="aud-actions">
        <button className="btn-start" onClick={() => alert(`Starting audition session with ${aud.candidate}`)}>
          <Play size={16} fill="currentColor" /> Start Audition
        </button>
        <div className="action-icon-group">
          <button className="icon-btn" title="View Profile" onClick={() => alert(`Viewing profile for ${aud.candidate}`)}><User size={16} /></button>
          <button className="icon-btn" title="Reschedule" onClick={() => setIsScheduleModalOpen(true)}><Calendar size={16} /></button>
          <button className="icon-btn" title="Leave Feedback" onClick={() => alert(`Opening feedback form for ${aud.candidate}`)}><MessageSquare size={16} /></button>
          <button className="icon-btn" title="Share" onClick={() => alert(`Link copied to clipboard!`)}><Share2 size={16} /></button>
        </div>
      </div>
    </div>
  );
}
