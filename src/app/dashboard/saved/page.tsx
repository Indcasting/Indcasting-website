"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Clock, ChevronRight, X, Briefcase, Film, Flame, Star, Sparkles, Filter, IndianRupee, LayoutGrid, List, Bookmark, Users, Globe, PlayCircle, Share2, Trash2, CheckCircle, Info } from "lucide-react";
import Link from "next/link";

export default function SavedJobsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const filterOptions = ["All", "Actors", "Models", "Voice Artists", "Dancers", "Singers", "Photographers", "Directors"];
  const [filterType, setFilterType] = useState("All");
  const [hoveredJobId, setHoveredJobId] = useState<number | null>(null);
  
  const [selectedApplyJob, setSelectedApplyJob] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  // Extended mock data for the UI
  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: "Lead Actor for Indie Feature", 
      company: "Moonlight Studios", 
      location: "Mumbai, India", 
      savedDate: "Today, 10:30 AM",
      timelineGroup: "Today",
      type: "Full-Time", 
      description: "We are looking for a charismatic lead actor for an upcoming indie feature film. The role requires strong emotional range and a background in dramatic acting.",
      genre: "Drama / Thriller",
      experience: "Advanced",
      gender: "Male",
      ageRange: "25 - 35",
      language: "Hindi, English",
      compensation: "₹5,00,000",
      deadline: "Closing Today",
      deadlineColor: "#ef4444",
      verified: true,
      category: "Actors",
      cardType: "featured",
      status: "Pending",
      director: "Aisha Khan"
    },
    { 
      id: 2, 
      title: "High-Fashion Commercial Model", 
      company: "Vogue India", 
      location: "Bengaluru, India", 
      savedDate: "Yesterday, 4:15 PM",
      timelineGroup: "This Week",
      type: "Part-Time", 
      description: "Casting models for a high-end fashion commercial. Diverse looks and strong on-camera presence required.",
      genre: "Commercial",
      experience: "Expert",
      gender: "Female",
      ageRange: "20 - 28",
      language: "English",
      compensation: "₹50,000/shoot",
      deadline: "⏳ 2 Days Left",
      deadlineColor: "#f59e0b",
      verified: true,
      category: "Models",
      cardType: "tall",
      status: "Not Applied",
      director: "Vikram Singh"
    },
    { 
      id: 3, 
      title: "Versatile Voiceover Artist", 
      company: "AudioVerse Studios", 
      location: "Remote", 
      savedDate: "Oct 25, 2023",
      timelineGroup: "This Month",
      type: "Freelance", 
      description: "Seeking a versatile voiceover artist for a series of animated shorts. The ideal candidate will have a professional home studio setup.",
      genre: "Animation",
      experience: "Intermediate",
      gender: "Any",
      ageRange: "18 - 50",
      language: "English",
      compensation: "₹5,000/hr",
      deadline: "⏳ 5 Days Left",
      deadlineColor: "#3b82f6",
      verified: true,
      category: "Voice Artists",
      cardType: "regular",
      status: "Not Applied",
      director: "Sarah Jenkins"
    },
    { 
      id: 4, 
      title: "Senior Cinematographer", 
      company: "LensCraft Media", 
      location: "Mumbai, India", 
      savedDate: "Oct 20, 2023",
      timelineGroup: "Earlier",
      type: "Full-Time", 
      description: "Looking for a visionary cinematographer to lead camera operations on an upcoming sci-fi feature.",
      genre: "Sci-Fi Film",
      experience: "Expert",
      gender: "Any",
      ageRange: "30+",
      language: "English",
      compensation: "₹8,00,000",
      deadline: "Expired",
      deadlineColor: "#6b7280",
      verified: true,
      category: "Directors",
      cardType: "wide",
      status: "Not Applied",
      director: "Rohan Desai"
    }
  ]);

  const handleDelete = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleApplyClick = (job: any) => {
    setSelectedApplyJob(job);
    setApplied(false);
  };

  const submitApplication = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      setTimeout(() => {
        setSelectedApplyJob(null);
      }, 1500);
    }, 1000);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || job.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const timelineGroups = ["Today", "This Week", "This Month", "Earlier"];

  return (
    <div className="collection-container">
      <style dangerouslySetInnerHTML={{__html: `
        .collection-container {
          padding: 20px 0 80px 0;
          color: #f1f1f1;
          position: relative;
          min-height: 100vh;
        }
        
        /* Cinematic Background */
        .collection-container::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 70% 10%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 40%),
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
          z-index: -1;
          pointer-events: none;
        }

        /* Hero Header */
        .collection-hero {
          margin-bottom: 48px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .collection-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0 0 8px 0;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff 0%, #aaa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .collection-subtitle {
          font-size: 1.15rem;
          color: #888;
          max-width: 600px;
          line-height: 1.6;
        }

        /* Stats Row */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stat-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2));
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .stat-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
        }
        .stat-label {
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-top: 4px;
        }

        /* Floating Search Panel */
        .floating-controls {
          position: sticky;
          top: 80px;
          z-index: 100;
          margin-bottom: 40px;
          background: rgba(15, 15, 15, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 16px 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .search-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .search-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 12px 20px;
          transition: all 0.3s ease;
        }
        .search-input-wrapper:focus-within {
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1rem;
          outline: none;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }

        .view-toggle {
          display: flex;
          background: rgba(0,0,0,0.4);
          border-radius: 12px;
          padding: 4px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .view-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #888;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.3s ease;
        }
        .view-btn.active {
          background: rgba(255,255,255,0.1);
          color: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .filter-chips {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .filter-chips::-webkit-scrollbar { display: none; }
        .chip {
          padding: 8px 20px;
          border-radius: 100px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          color: #aaa;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .chip:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .chip.active {
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
          color: var(--gold);
        }

        /* Masonry Grid */
        .masonry-grid {
          column-count: 1;
          column-gap: 24px;
        }
        @media (min-width: 1024px) {
          .masonry-grid { column-count: 2; }
        }

        /* Timeline Layout */
        .timeline-group {
          margin-bottom: 48px;
          break-inside: avoid;
        }
        .timeline-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .timeline-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .timeline-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent);
        }

        /* Premium Layered Casting Card */
        .layered-card {
          background: #0a0a0a;
          background: linear-gradient(145deg, #171717, #090909);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          break-inside: avoid;
          margin-bottom: 24px;
          z-index: 1;
        }
        
        /* Shimmer Effect */
        .layered-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
          transform: skewX(-20deg);
          transition: 0.5s;
          z-index: 2;
          pointer-events: none;
        }
        
        .layered-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 60px rgba(212, 175, 55, 0.08);
        }
        .layered-card:hover::before { left: 150%; }
        
        /* Bookmark Ribbon */
        .bookmark-ribbon {
          position: absolute;
          top: -4px; right: 32px;
          background: linear-gradient(135deg, var(--gold), #d4af37);
          padding: 12px 16px 16px 16px;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 10px 20px rgba(212,175,55,0.3);
          z-index: 10;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          transition: all 0.3s ease;
        }
        .bookmark-ribbon::after {
          content: ''; position: absolute;
          top: 0; right: -8px;
          border-top: 8px solid transparent;
          border-left: 8px solid #9e7f1e;
        }
        .layered-card:hover .bookmark-ribbon {
          padding-bottom: 24px;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
          z-index: 3;
          position: relative;
        }
        .company-logo {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #222, #111);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.4s ease;
        }
        .layered-card:hover .company-logo {
          transform: rotate(5deg) scale(1.05);
          border-color: rgba(212, 175, 55, 0.3);
        }
        
        .card-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 6px 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .card-company {
          font-size: 1.05rem;
          color: #aaa;
          display: flex; align-items: center; gap: 6px;
        }

        .metadata-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
          padding: 24px;
          background: rgba(0,0,0,0.2);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.03);
          z-index: 3;
          position: relative;
        }
        .meta-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.9rem; color: #888;
        }
        .meta-item strong { color: #ddd; font-weight: 600; }

        .deadline-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 8px;
          font-size: 0.85rem; font-weight: 700;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .card-actions {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05);
          z-index: 30; position: relative;
        }

        .btn-text {
          background: none; border: none;
          font-size: 0.9rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          position: relative; transition: all 0.3s ease;
        }
        
        .btn-apply {
          color: var(--gold);
        }
        .btn-apply::after {
          content: ''; position: absolute; bottom: -6px; left: 0; width: 0; height: 2px;
          background: var(--gold); transition: width 0.3s ease;
        }
        .btn-apply:hover::after { width: 100%; }
        .btn-apply:hover { text-shadow: 0 0 10px rgba(212, 175, 55, 0.4); }
        .btn-apply:hover svg { transform: translateX(4px); }
        
        .btn-remove {
          color: #666;
        }
        .btn-remove:hover { color: #ef4444; }

        /* Quick Preview Hover State */
        .quick-preview {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(10,10,10,0.95); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px); z-index: 20;
          padding: 40px; display: flex; flex-direction: column; justify-content: center;
          opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .layered-card:hover .quick-preview {
          opacity: 1; pointer-events: auto;
        }

        /* Empty State */
        .empty-state {
          padding: 100px 20px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          background: linear-gradient(145deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2));
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 32px;
        }

        /* Modals inherit cinematic style from casting-calls */
        .cine-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px); z-index: 9999; display: flex;
          align-items: center; justify-content: center; padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }
        .cine-modal-content {
          background-color: #111; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; width: 100%; max-width: 500px;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8); position: relative;
          overflow: hidden; display: flex; flex-direction: column;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />

      {/* Hero Header */}
      <div className="collection-hero">
        <div>
          <h1 className="collection-title">My Casting Collection</h1>
          <p className="collection-subtitle">
            Your personally curated opportunities. Track, organize, and apply before deadlines.
          </p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <Bookmark size={24} color="#3b82f6" />
            </div>
            <div>
              <div className="stat-value">{jobs.length}</div>
              <div className="stat-label">Saved Roles</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
              <Clock size={24} color="var(--gold)" />
            </div>
            <div>
              <div className="stat-value">{jobs.filter(j => j.status === 'Pending').length}</div>
              <div className="stat-label">Applications Pending</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <Flame size={24} color="#ef4444" />
            </div>
            <div>
              <div className="stat-value">{jobs.filter(j => j.deadline.includes('Left') || j.deadline === 'Closing Today').length}</div>
              <div className="stat-label">Expiring Soon</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              <PlayCircle size={24} color="#22c55e" />
            </div>
            <div>
              <div className="stat-value">2</div>
              <div className="stat-label">Active Productions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Control Panel */}
      <div className="floating-controls">
        <div className="search-row">
          <div className="search-input-wrapper">
            <Search size={20} color="rgba(255,255,255,0.4)" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search your collection..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={18} /> Grid
            </button>
            <button 
              className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              <List size={18} /> Timeline
            </button>
          </div>
        </div>
        
        <div className="filter-chips">
          {filterOptions.map(opt => (
            <button 
              key={opt}
              className={`chip ${filterType === opt ? 'active' : ''}`}
              onClick={() => setFilterType(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {jobs.length === 0 ? (
        <div className="empty-state">
          <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--gold)', opacity: 0.1, borderRadius: '50%', filter: 'blur(30px)' }}></div>
            <Bookmark size={64} color="var(--gold)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 16px 0', color: '#fff' }}>No Castings Saved</h2>
          <p style={{ fontSize: '1.1rem', color: '#888', maxWidth: '400px', marginBottom: '32px' }}>
            You haven't added any casting opportunities to your collection yet. Start exploring to find your next role.
          </p>
          <Link href="/dashboard/casting-calls" style={{ background: 'var(--gold)', color: '#000', padding: '16px 32px', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(212,175,55,0.3)' }}>
            <Sparkles size={18} /> Explore Casting Calls
          </Link>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="masonry-grid">
              {filteredJobs.map(job => (
                <CastingCard key={job.id} job={job} handleApplyClick={handleApplyClick} handleDelete={handleDelete} setHoveredJobId={setHoveredJobId} hoveredJobId={hoveredJobId} />
              ))}
            </div>
          ) : (
            <div>
              {timelineGroups.map(group => {
                const groupJobs = filteredJobs.filter(j => j.timelineGroup === group);
                if (groupJobs.length === 0) return null;
                return (
                  <div key={group} className="timeline-group">
                    <div className="timeline-header">
                      <div className="timeline-title">{group}</div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="masonry-grid">
                      {groupJobs.map(job => (
                        <CastingCard key={job.id} job={job} handleApplyClick={handleApplyClick} handleDelete={handleDelete} setHoveredJobId={setHoveredJobId} hoveredJobId={hoveredJobId} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Apply Modal */}
      {selectedApplyJob && (
        <div className="cine-modal-overlay" onClick={() => !isApplying && !applied && setSelectedApplyJob(null)}>
          <div className="cine-modal-content" onClick={e => e.stopPropagation()}>
            {applied ? (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 24px auto' }} />
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px 0', color: '#fff' }}>Application Sent!</h2>
                <p style={{ color: '#aaa', fontSize: '1.05rem', margin: 0 }}>
                  Your application for {selectedApplyJob.title} has been successfully submitted to {selectedApplyJob.company}.
                </p>
              </div>
            ) : (
              <>
                <div style={{ padding: '32px 32px 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff' }}>Apply for Role</h2>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '0.95rem' }}>
                      {selectedApplyJob.title} at {selectedApplyJob.company}
                    </p>
                  </div>
                  <button onClick={() => setSelectedApplyJob(null)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', cursor: 'pointer' }}>
                    <X size={18} />
                  </button>
                </div>
                
                <div style={{ padding: '32px' }}>
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: '#eee', marginBottom: '12px' }}>
                    Quick Pitch / Cover Letter
                  </label>
                  <textarea 
                    placeholder="Tell the casting director why you're a great fit for this role..."
                    style={{
                      width: '100%', minHeight: '120px', padding: '16px', borderRadius: '12px',
                      border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)',
                      color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '16px', background: 'rgba(0,0,0,0.2)' }}>
                  <button onClick={() => setSelectedApplyJob(null)} style={{ background: 'none', border: 'none', color: '#aaa', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button 
                    onClick={submitApplication}
                    disabled={isApplying}
                    style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: isApplying ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)', opacity: isApplying ? 0.8 : 1 }}
                  >
                    {isApplying ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponent for the individual casting cards
function CastingCard({ job, handleApplyClick, handleDelete, setHoveredJobId, hoveredJobId }: any) {
  const isHovered = hoveredJobId === job.id;

  return (
    <div 
      className="layered-card"
      onMouseEnter={() => setHoveredJobId(job.id)}
      onMouseLeave={() => setHoveredJobId(null)}
    >
      <div className="bookmark-ribbon">
        <Bookmark size={20} color="#000" fill="#000" />
      </div>

      <div className="card-header">
        <div className="company-logo">
          <Film size={28} color="var(--gold)" />
        </div>
        <div style={{ paddingRight: '40px' }}>
          <h3 className="card-title">{job.title}</h3>
          <div className="card-company">
            {job.company} {job.verified && <CheckCircle size={14} color="#22c55e" />}
          </div>
        </div>
      </div>

      <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>

      <div className="metadata-grid">
        <div className="meta-item"><MapPin size={16} color="var(--gold)" /> <span>{job.location}</span></div>
        <div className="meta-item"><IndianRupee size={16} color="#22c55e" /> <strong>{job.compensation}</strong></div>
        <div className="meta-item"><Briefcase size={16} /> <span>{job.experience}</span></div>
        <div className="meta-item"><Languages size={16} /> <span>{job.language}</span></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="deadline-badge" style={{ color: job.deadlineColor, borderColor: 'rgba(255,255,255,0.08)' }}>
          <Clock size={14} /> {job.deadline}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
          Saved {job.savedDate}
        </div>
      </div>

      <div className="card-actions">
        <button 
          className="btn-text btn-apply" 
          onClick={() => handleApplyClick(job)}
        >
          Apply Now <ChevronRight size={16} style={{ transition: 'transform 0.3s' }} />
        </button>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <button className="btn-text" style={{ color: '#888' }}>
            <Share2 size={16} />
          </button>
          <button 
            className="btn-text btn-remove" 
            onClick={() => handleDelete(job.id)}
            title="Remove from Collection"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Subtle Hover Quick Preview Info */}
      <div className="quick-preview" style={{ opacity: isHovered ? 1 : 0, pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="company-logo" style={{ margin: '0 auto 16px auto', transform: isHovered ? 'scale(1.2)' : 'scale(1)' }}>
            <Film size={32} color="var(--gold)" />
          </div>
          <h4 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 8px 0' }}>{job.title}</h4>
          <p style={{ color: '#aaa', margin: 0 }}>Directed by {job.director}</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '16px' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>Genre</p>
            <p style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{job.genre}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>Role Type</p>
            <p style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{job.type}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>Age Range</p>
            <p style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{job.ageRange}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>Status</p>
            <p style={{ color: '#fff', margin: 0, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: job.status === 'Pending' ? '#f59e0b' : '#3b82f6' }}></span>
              {job.status}
            </p>
          </div>
        </div>
        
        {/* We keep the preview above the card content, but below the action buttons (z-index 30) */}
      </div>
    </div>
  );
}
