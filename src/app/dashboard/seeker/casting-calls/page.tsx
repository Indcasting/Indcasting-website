"use client";

import { useState } from "react";
import { PlusCircle, Search, Filter, MoreVertical, MapPin, Users, Calendar, Play, Pause, Copy, Edit2, Trash2, X, Film, Activity, Clock, CheckCircle, Flame, Sparkles, LayoutGrid, List, Columns, MessageSquare, ChevronRight, BarChart2, Star, Target } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SeekerCastingCalls() {
  const router = useRouter();
  
  // Extended mock data for Production Control Center
  const [calls, setCalls] = useState([
    { 
      id: 1, 
      title: "Lead Actor - Indie Film", 
      company: "Moonlight Studios",
      category: "Actors",
      genre: "Drama / Thriller",
      location: "Mumbai, India", 
      apps: 145, 
      reviewed: 120,
      shortlisted: 18,
      auditions: 5,
      deadline: "Closing Today", 
      deadlineColor: "#ef4444",
      status: "Live", 
      date: "Oct 1",
      experience: "Advanced",
      ageRange: "25 - 35",
      gender: "Male",
      language: "Hindi, English",
      compensation: "₹5,00,000",
      completionPercentage: 82
    },
    { 
      id: 2, 
      title: "Background Dancers", 
      company: "Rhythm Prod",
      category: "Dancers",
      genre: "Music Video",
      location: "Delhi, India", 
      apps: 420, 
      reviewed: 150,
      shortlisted: 45,
      auditions: 12,
      deadline: "Oct 20", 
      deadlineColor: "#f59e0b",
      status: "Reviewing", 
      date: "Sep 28",
      experience: "Intermediate",
      ageRange: "18 - 30",
      gender: "Any",
      language: "Any",
      compensation: "₹15,000/day",
      completionPercentage: 35
    },
    { 
      id: 3, 
      title: "Commercial Model", 
      company: "Vogue India",
      category: "Models",
      genre: "Advertising",
      location: "Bengaluru, India", 
      apps: 85, 
      reviewed: 85,
      shortlisted: 5,
      auditions: 5,
      deadline: "Oct 15", 
      deadlineColor: "#6b7280",
      status: "Auditions", 
      date: "Sep 20",
      experience: "Expert",
      ageRange: "20 - 28",
      gender: "Female",
      language: "English",
      compensation: "₹50,000/shoot",
      completionPercentage: 100
    },
    { 
      id: 4, 
      title: "Versatile Voice Actor", 
      company: "AudioVerse",
      category: "Voice Artists",
      genre: "Animation",
      location: "Remote", 
      apps: 320, 
      reviewed: 320,
      shortlisted: 20,
      auditions: 0,
      deadline: "Oct 10", 
      deadlineColor: "#6b7280",
      status: "Closed", 
      date: "Sep 15",
      experience: "Intermediate",
      ageRange: "18 - 50",
      gender: "Any",
      language: "English",
      compensation: "₹5,000/hr",
      completionPercentage: 100
    }
  ]);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "kanban">("grid");
  const filterOptions = ["All", "Actors", "Models", "Voice Artists", "Dancers", "Singers"];
  const [filterType, setFilterType] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Form State
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory || !newLocation || !newDeadline) return;
    
    const newJob = {
      id: calls.length + 1,
      title: newTitle,
      company: "Your Production",
      category: newCategory,
      genre: "TBD",
      location: newLocation,
      apps: 0, reviewed: 0, shortlisted: 0, auditions: 0,
      deadline: newDeadline, deadlineColor: "#10b981",
      status: "Live", date: "Just now",
      experience: "TBD", ageRange: "Any", gender: "Any", language: "Any", compensation: "TBD",
      completionPercentage: 0
    };
    
    setCalls([newJob, ...calls]);
    setIsCreating(false);
    setNewTitle(""); setNewCategory(""); setNewLocation(""); setNewDeadline("");
  };

  const getStatusVisuals = (status: string) => {
    switch (status) {
      case "Live": return { color: "#10b981", bg: "rgba(16,185,129,0.1)", dot: "animate-pulse" };
      case "Reviewing": return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", dot: "" };
      case "Auditions": return { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", dot: "" };
      case "Shortlisting": return { color: "#a855f7", bg: "rgba(168,85,247,0.1)", dot: "" };
      case "Closed": return { color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "" };
      default: return { color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "" };
    }
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          call.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || call.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalApps = calls.reduce((acc, curr) => acc + curr.apps, 0);
  const totalShortlisted = calls.reduce((acc, curr) => acc + curr.shortlisted, 0);
  const totalAuditions = calls.reduce((acc, curr) => acc + curr.auditions, 0);

  const kanbanColumns = ["Live", "Reviewing", "Auditions", "Closed"];

  return (
    <div className="pcc-container">
      <style dangerouslySetInnerHTML={{__html: `
        .pcc-container {
          padding: 20px 0 80px 0;
          color: #f1f1f1;
          position: relative;
          min-height: 100vh;
        }
        
        /* Cinematic Background */
        .pcc-container::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 40%),
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
          z-index: -1;
          pointer-events: none;
        }

        /* Hero Header */
        .pcc-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .pcc-title {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 8px 0;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff 0%, #aaa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .pcc-subtitle {
          font-size: 1.1rem;
          color: #888;
          max-width: 500px;
          line-height: 1.6;
        }

        /* Stats Row */
        .pcc-stats {
          display: flex;
          gap: 16px;
        }
        .pcc-stat-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3));
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 20px;
          min-width: 160px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex; flex-direction: column; gap: 8px;
        }
        .pcc-stat-val { font-size: 1.8rem; font-weight: 800; color: #fff; line-height: 1; }
        .pcc-stat-label { font-size: 0.8rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: flex; alignItems: center; gap: 6px; }

        /* Floating Controls */
        .pcc-controls {
          position: sticky; top: 80px; z-index: 100; margin-bottom: 40px;
          background: rgba(15, 15, 15, 0.75); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px;
          padding: 16px 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          display: flex; flex-direction: column; gap: 20px;
        }
        .pcc-search-row { display: flex; align-items: center; gap: 16px; }
        .pcc-search-wrap {
          flex: 1; display: flex; align-items: center; gap: 12px;
          background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 12px 20px; transition: all 0.3s ease;
        }
        .pcc-search-wrap:focus-within { border-color: rgba(212, 175, 55, 0.4); box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1); }
        .pcc-search-input { flex: 1; background: transparent; border: none; color: #fff; font-size: 1rem; outline: none; }
        
        .pcc-view-toggle { display: flex; background: rgba(0,0,0,0.5); border-radius: 10px; padding: 4px; border: 1px solid rgba(255,255,255,0.05); }
        .pcc-view-btn { padding: 8px 16px; border-radius: 6px; border: none; background: transparent; color: #888; font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .pcc-view-btn.active { background: rgba(255,255,255,0.1); color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

        .pcc-filter-chips { display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; }
        .pcc-filter-chips::-webkit-scrollbar { display: none; }
        .pcc-chip { padding: 8px 20px; border-radius: 100px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #aaa; font-size: 0.85rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.3s; }
        .pcc-chip:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .pcc-chip.active { background: rgba(212, 175, 55, 0.15); border-color: rgba(212, 175, 55, 0.5); color: var(--gold); }

        /* Dashboard Layout */
        .pcc-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }
        @media (max-width: 1024px) { .pcc-layout { grid-template-columns: 1fr; } }

        /* Grid View */
        .pcc-grid { display: flex; flex-direction: column; gap: 24px; }

        /* Kanban View */
        .pcc-kanban { display: flex; gap: 24px; overflow-x: auto; padding-bottom: 24px; }
        .pcc-kanban-col { min-width: 350px; flex: 1; background: rgba(0,0,0,0.2); border-radius: 24px; padding: 20px; border: 1px solid rgba(255,255,255,0.03); }
        .pcc-kanban-header { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Production Card */
        .prod-card {
          background: linear-gradient(145deg, #181818, #0a0a0a);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          overflow: hidden;
        }
        .prod-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .prod-card::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent);
          transform: skewX(-20deg); transition: 0.5s; pointer-events: none;
        }
        .prod-card:hover::after { left: 150%; }

        .prod-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .prod-logo-wrap { display: flex; gap: 16px; align-items: center; }
        .prod-logo { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); }
        .prod-card:hover .prod-logo { transform: rotate(5deg) scale(1.05); border-color: rgba(212,175,55,0.3); }
        
        .prod-title { font-size: 1.4rem; font-weight: 800; color: #fff; margin: 0 0 4px 0; letter-spacing: -0.01em; }
        .prod-company { font-size: 0.95rem; color: #888; }
        
        .prod-status-badge {
          display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 100px;
          font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }

        .prod-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px; }
        .meta-col { display: flex; flex-direction: column; gap: 4px; }
        .meta-lbl { font-size: 0.8rem; color: #666; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; }
        .meta-val { font-size: 0.95rem; color: #eee; font-weight: 500; display: flex; align-items: center; gap: 6px; }

        /* Metric Bar */
        .metric-wrap { margin-bottom: 12px; }
        .metric-top { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px; }
        .metric-bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .metric-bar-fill { height: 100%; background: var(--gold); border-radius: 10px; transition: width 1s ease; }

        .prod-actions { display: flex; justify-content: space-between; align-items: center; }
        .action-btn { background: none; border: none; color: #aaa; font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
        .action-btn:hover { color: #fff; }
        
        .btn-view-apps { background: rgba(212, 175, 55, 0.1); color: var(--gold); padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2); }
        .btn-view-apps:hover { background: var(--gold); color: #000; box-shadow: 0 5px 15px rgba(212,175,55,0.3); transform: translateY(-2px); }

        /* Quick Actions Overlay (Appears on hover in top right) */
        .quick-actions { position: absolute; top: 24px; right: 24px; display: flex; gap: 8px; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease; }
        .prod-card:hover .quick-actions { opacity: 1; transform: translateY(0); }
        .qa-btn { width: 36px; height: 36px; border-radius: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; transition: all 0.2s; }
        .qa-btn:hover { background: rgba(255,255,255,0.1); }
        .qa-btn.delete:hover { background: rgba(239, 68, 68, 0.2); color: #ef4444; border-color: rgba(239, 68, 68, 0.4); }

        /* Insights Sidebar */
        .insights-panel { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 24px; height: fit-content; position: sticky; top: 230px; }
        .insights-header { font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px; }
        .insight-block { margin-bottom: 24px; }
        .insight-lbl { font-size: 0.8rem; color: #888; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 12px; }
        .insight-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); margin-bottom: 8px; transition: background 0.2s; }
        .insight-item:hover { background: rgba(255,255,255,0.05); }
        .insight-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(212, 175, 55, 0.1); display: flex; align-items: center; justify-content: center; color: var(--gold); }
        
        /* Modals */
        .cine-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 9999; display: flex; alignItems: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease-out; }
        .cine-modal-content { background-color: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; width: 100%; max-width: 600px; box-shadow: 0 40px 80px rgba(0,0,0,0.8); overflow: hidden; display: flex; flex-direction: column; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />

      {/* Premium Hero */}
      <div className="pcc-hero">
        <div>
          <h1 className="pcc-title">My Productions</h1>
          <p className="pcc-subtitle">Manage your active casting projects, monitor applications, and organize auditions from one cinematic workspace.</p>
        </div>
        
        <div className="pcc-stats">
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Film size={14} /> Total Productions</span>
            <span className="pcc-stat-val">{calls.length}</span>
          </div>
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Users size={14} /> Applicants</span>
            <span className="pcc-stat-val">{totalApps}</span>
          </div>
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Target size={14} /> Shortlisted</span>
            <span className="pcc-stat-val">{totalShortlisted}</span>
          </div>
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Calendar size={14} /> Auditions</span>
            <span className="pcc-stat-val">{totalAuditions}</span>
          </div>
        </div>
      </div>

      {/* Floating Control Bar */}
      <div className="pcc-controls">
        <div className="pcc-search-row">
          <div className="pcc-search-wrap">
            <Search size={20} color="rgba(255,255,255,0.4)" />
            <input 
              type="text" 
              className="pcc-search-input" 
              placeholder="Search productions, roles, or locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="pcc-view-toggle">
            <button className={`pcc-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              <LayoutGrid size={16} /> Editorial
            </button>
            <button className={`pcc-view-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}>
              <Columns size={16} /> Kanban
            </button>
          </div>

          <button 
            style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s', boxShadow: '0 8px 16px rgba(212,175,55,0.2)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => setIsCreating(true)}
          >
            <PlusCircle size={18} /> New Casting Call
          </button>
        </div>
        
        <div className="pcc-filter-chips">
          {filterOptions.map(opt => (
            <button key={opt} className={`pcc-chip ${filterType === opt ? 'active' : ''}`} onClick={() => setFilterType(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="pcc-layout">
        
        {/* Left Column: Productions */}
        <div>
          {filteredCalls.length === 0 ? (
            <div style={{ padding: '80px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <Film size={64} color="var(--gold)" style={{ margin: '0 auto 24px auto', opacity: 0.5 }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>You haven't launched a production yet</h2>
              <p style={{ color: '#888', marginBottom: '24px' }}>Create a casting call and start discovering exceptional talent.</p>
              <button 
                onClick={() => setIsCreating(true)}
                style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '14px 28px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <PlusCircle size={18} /> Create Your First Casting Call
              </button>
            </div>
          ) : (
            viewMode === 'grid' ? (
              <div className="pcc-grid">
                {filteredCalls.map(call => <ProductionCard key={call.id} call={call} getStatusVisuals={getStatusVisuals} router={router} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />)}
              </div>
            ) : (
              <div className="pcc-kanban">
                {kanbanColumns.map(col => (
                  <div key={col} className="pcc-kanban-col">
                    <div className="pcc-kanban-header">
                      {col} <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                        {filteredCalls.filter(c => c.status === col).length}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {filteredCalls.filter(c => c.status === col).map(call => (
                        <ProductionCard key={call.id} call={call} getStatusVisuals={getStatusVisuals} router={router} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} isCompact />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Right Column: Insights Sidebar */}
        {viewMode === 'grid' && (
          <div className="insights-panel">
            <h3 className="insights-header"><Sparkles size={18} color="var(--gold)" /> Platform Insights</h3>
            
            <div className="insight-block">
              <div className="insight-lbl">Today's Auditions</div>
              <div className="insight-item">
                <div className="insight-icon"><Play size={16} /></div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Lead Actor Reading</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>2:00 PM via Zoom</div>
                </div>
              </div>
            </div>

            <div className="insight-block">
              <div className="insight-lbl">Action Required</div>
              <div className="insight-item" style={{ borderLeft: '3px solid #ef4444' }}>
                <div className="insight-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Clock size={16} /></div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Lead Actor Deadline</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Closing Today</div>
                </div>
              </div>
            </div>

            <div className="insight-block">
              <div className="insight-lbl">Recent Applications</div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Users size={16} /></div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>+12 New Applicants</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Background Dancers</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal (Placeholder for UI) */}
      {isCreating && (
        <div className="cine-modal-overlay" onClick={() => setIsCreating(false)}>
          <div className="cine-modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff' }}>Launch New Production</h2>
              <button onClick={() => setIsCreating(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateNew} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Role Title</label>
                <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Lead Actor" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Category</label>
                <select required value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                  <option value="" disabled>Select category</option>
                  {filterOptions.filter(o => o !== "All").map(opt => <option key={opt} value={opt} style={{ color: '#000' }}>{opt}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Location</label>
                  <input required type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="e.g. Mumbai" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Deadline</label>
                  <input required type="text" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} placeholder="e.g. Nov 15" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                </div>
              </div>
              <div style={{ padding: '24px 0 0 0', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                <button type="button" onClick={() => setIsCreating(false)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer' }}>Create Casting Call</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponent for Production Cards
function ProductionCard({ call, getStatusVisuals, router, hoveredCard, setHoveredCard, isCompact = false }: any) {
  const statusVis = getStatusVisuals(call.status);
  const isHovered = hoveredCard === call.id;

  if (isCompact) {
    // Kanban simplified view
    return (
      <div 
        className="prod-card" 
        style={{ padding: '16px', marginBottom: 0 }}
        onMouseEnter={() => setHoveredCard(call.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>{call.title}</h4>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '12px' }}>{call.genre}</div>
        
        <div className="metric-wrap" style={{ marginBottom: '16px' }}>
          <div className="metric-top">
            <span style={{ color: '#aaa' }}>Completion</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{call.completionPercentage}%</span>
          </div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${call.completionPercentage}%`, background: statusVis.color }}></div>
          </div>
        </div>
        
        <button 
          className="btn-view-apps" 
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          onClick={() => router.push('/dashboard/seeker/applications')}
        >
          View Apps ({call.apps})
        </button>
      </div>
    );
  }

  // Full Editorial Grid View
  return (
    <div 
      className="prod-card"
      onMouseEnter={() => setHoveredCard(call.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Quick Actions (Hover) */}
      <div className="quick-actions">
        <button className="qa-btn" title="Edit Casting"><Edit2 size={16} /></button>
        <button className="qa-btn" title="View Analytics"><BarChart2 size={16} /></button>
        <button className="qa-btn" title="Duplicate"><Copy size={16} /></button>
        <button className="qa-btn delete" title="Close/Delete"><Trash2 size={16} /></button>
      </div>

      <div className="prod-header">
        <div className="prod-logo-wrap">
          <div className="prod-logo"><Film size={24} color="var(--gold)" /></div>
          <div>
            <h3 className="prod-title">{call.title}</h3>
            <div className="prod-company">{call.genre} • {call.company}</div>
          </div>
        </div>
        
        <div className="prod-status-badge" style={{ background: statusVis.bg, color: statusVis.color, border: `1px solid ${statusVis.color}40` }}>
          <div className={`status-dot ${statusVis.dot}`} style={{ background: statusVis.color }}></div>
          {call.status}
        </div>
      </div>

      <div className="prod-meta">
        <div className="meta-col">
          <span className="meta-lbl">Location</span>
          <span className="meta-val"><MapPin size={14} color="var(--gold)" /> {call.location}</span>
        </div>
        <div className="meta-col">
          <span className="meta-lbl">Role Type</span>
          <span className="meta-val"><Star size={14} color="#3b82f6" /> {call.category}</span>
        </div>
        <div className="meta-col">
          <span className="meta-lbl">Deadline</span>
          <span className="meta-val" style={{ color: call.deadlineColor }}><Clock size={14} /> {call.deadline}</span>
        </div>
      </div>

      {/* Analytics Visualization */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Applications</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{call.apps}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Reviewed</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{call.reviewed}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Shortlisted</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{call.shortlisted}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Auditions</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{call.auditions}</div>
        </div>
      </div>

      <div className="metric-wrap" style={{ marginBottom: '24px' }}>
        <div className="metric-top">
          <span style={{ color: '#aaa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Pipeline Completion</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>{call.completionPercentage}%</span>
        </div>
        <div className="metric-bar-bg">
          <div className="metric-bar-fill" style={{ width: `${call.completionPercentage}%`, background: 'linear-gradient(90deg, #d4af37, #fef3c7)' }}></div>
        </div>
      </div>

      <div className="prod-actions">
        <button 
          className="btn-view-apps action-btn"
          onClick={() => router.push('/dashboard/seeker/applications')}
        >
          View Applications <ChevronRight size={16} />
        </button>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="action-btn"><Calendar size={16} /> Manage Auditions</button>
        </div>
      </div>
    </div>
  );
}
