"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Clock, ChevronRight, X, Briefcase, FileText, CheckCircle, Info, Bookmark, Eye, Users, Film, Languages, Flame, Star, Sparkles, Filter, IndianRupee, Plus } from "lucide-react";

export default function CastingCallsPage() {
  const filterOptions = ["All", "Actors", "Models", "Voice Artists", "Dancers", "Singers", "Photographers", "Directors"];
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  
  const [selectedDetailsJob, setSelectedDetailsJob] = useState<any>(null);
  const [selectedApplyJob, setSelectedApplyJob] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);

  const jobs = [
    { 
      id: 1, 
      title: "Lead Actor for Indie Feature", 
      company: "Moonlight Studios", 
      location: "Mumbai, India", 
      date: "Oct 25", 
      type: "Full-Time", 
      description: "We are looking for a charismatic lead actor for an upcoming indie feature film. The role requires strong emotional range and a background in dramatic acting. Expect intense rehearsals and a dedicated team aiming for festival circuits.",
      genre: "Drama / Thriller",
      experience: "Advanced",
      gender: "Male",
      ageRange: "25 - 35",
      language: "Hindi, English",
      compensation: "₹5,00,000",
      applicants: 142,
      views: 3400,
      postedTime: "2 hours ago",
      verified: true,
      cardType: "featured",
      category: "Actors",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      id: 2, 
      title: "Versatile Voiceover Artist", 
      company: "AudioVerse Studios", 
      location: "Remote", 
      date: "Nov 2", 
      type: "Freelance", 
      description: "Seeking a versatile voiceover artist for a series of animated shorts. The ideal candidate will have a professional home studio setup.",
      genre: "Animation",
      experience: "Intermediate",
      gender: "Any",
      ageRange: "18 - 50",
      language: "English",
      compensation: "₹5,000/hr",
      applicants: 89,
      views: 1205,
      postedTime: "5 hours ago",
      verified: true,
      category: "Voice Artists",
      cardType: "regular"
    },
    { 
      id: 3, 
      title: "Hip-Hop Background Dancers", 
      company: "Rhythm Prod", 
      location: "Delhi, India", 
      date: "Oct 28", 
      type: "Contract", 
      description: "Looking for energetic background dancers for a high-profile music video shoot. Must excel in hip-hop and contemporary styles.",
      genre: "Music Video",
      experience: "Intermediate",
      gender: "Any",
      ageRange: "18 - 30",
      language: "Any",
      compensation: "₹15,000/day",
      applicants: 234,
      views: 5600,
      postedTime: "1 day ago",
      verified: true,
      category: "Dancers",
      cardType: "tall"
    },
    { 
      id: 4, 
      title: "High-Fashion Commercial Model", 
      company: "Vogue India", 
      location: "Bengaluru, India", 
      date: "Nov 5", 
      type: "Part-Time", 
      description: "Casting models for a high-end fashion commercial. Diverse looks and strong on-camera presence required. Prior experience with luxury brands is a plus.",
      genre: "Commercial",
      experience: "Expert",
      gender: "Female",
      ageRange: "20 - 28",
      language: "English",
      compensation: "₹50,000/shoot",
      applicants: 412,
      views: 8900,
      postedTime: "2 days ago",
      verified: true,
      category: "Models",
      cardType: "wide"
    },
    { 
      id: 5, 
      title: "Supporting Role: Comedic Sidekick", 
      company: "Laugh Riot Films", 
      location: "Hyderabad, India", 
      date: "Oct 30", 
      type: "Contract", 
      description: "Need a talented comedic actor with great timing for a web series. Improv experience is highly valued.",
      genre: "Comedy Web Series",
      experience: "Beginner",
      gender: "Any",
      ageRange: "20 - 40",
      language: "Telugu, English",
      compensation: "₹20,000/ep",
      applicants: 156,
      views: 2100,
      postedTime: "3 days ago",
      verified: false,
      category: "Actors",
      cardType: "regular"
    },
    { 
      id: 6, 
      title: "Senior Cinematographer", 
      company: "LensCraft Media", 
      location: "Mumbai, India", 
      date: "Nov 15", 
      type: "Full-Time", 
      description: "Looking for a visionary cinematographer to lead camera operations on an upcoming sci-fi feature. Extensive experience with RED and ARRI systems required.",
      genre: "Sci-Fi Film",
      experience: "Expert",
      gender: "Any",
      ageRange: "30+",
      language: "English",
      compensation: "₹8,00,000",
      applicants: 45,
      views: 3200,
      postedTime: "4 days ago",
      verified: true,
      category: "Directors",
      cardType: "tall"
    },
  ];

  const handleDetailsClick = (job: any) => setSelectedDetailsJob(job);
  
  const handleApplyClick = (job: any) => {
    setSelectedDetailsJob(null);
    setSelectedApplyJob(job);
    setApplied(false);
  };
  
  const toggleBookmark = (e: any, id: number) => {
    e.stopPropagation();
    setBookmarkedJobs(prev => prev.includes(id) ? prev.filter(jId => jId !== id) : [...prev, id]);
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

  const featuredJob = filteredJobs.find(j => j.cardType === 'featured');
  const masonryJobs = featuredJob ? filteredJobs.filter(j => j.id !== featuredJob.id) : filteredJobs;

  const renderBadge = (text: string, icon?: React.ReactNode) => (
    <div className="cine-badge">
      {icon} {text}
    </div>
  );

  return (
    <div className="cine-container">
      <style dangerouslySetInnerHTML={{__html: `
        .cine-container {
          padding: 20px 0 80px 0;
          color: #f1f1f1;
          position: relative;
          min-height: 100vh;
        }
        .cine-container::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 60%),
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
          z-index: -1;
          pointer-events: none;
        }
        
        /* Floating Search */
        .cine-search-panel {
          position: sticky;
          top: 80px;
          z-index: 100;
          margin: 0 auto 40px auto;
          background: rgba(15, 15, 15, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cine-search-panel:focus-within {
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.2);
          border-color: rgba(212,175,55,0.2);
        }
        .cine-search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1.1rem;
          outline: none;
          padding: 8px 0;
        }
        .cine-search-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        
        /* Filter Chips */
        .cine-filters {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 20px;
          margin-bottom: 20px;
          scrollbar-width: none;
        }
        .cine-filters::-webkit-scrollbar {
          display: none;
        }
        .cine-chip {
          padding: 10px 20px;
          border-radius: 100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #aaa;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cine-chip:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }
        .cine-chip.active {
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
          color: var(--gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }
        
        /* Cinematic Card */
        .cine-card {
          background: linear-gradient(145deg, #151515, #0a0a0a);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          break-inside: avoid;
          margin-bottom: 24px;
        }
        .cine-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
          transform: skewX(-20deg);
          transition: 0.5s;
        }
        .cine-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 40px rgba(212, 175, 55, 0.05);
        }
        .cine-card:hover::before {
          left: 150%;
        }
        .cine-card:hover .cine-logo {
          transform: scale(1.05) rotate(2deg);
        }
        
        .cine-logo {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: #222;
          display: flex; align-items: center; justify-content: center;
          color: var(--gold);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.4s ease;
        }
        
        .cine-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        
        .cine-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
          margin: 12px 0 6px 0;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }
        
        .cine-company {
          font-size: 1rem;
          color: #aaa;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .cine-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 24px 0;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .cine-meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: #888;
        }
        .cine-meta-item strong {
          color: #ccc;
          font-weight: 500;
        }
        
        .cine-badge {
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          color: #ccc;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .cine-actions {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
        }
        
        .cine-link {
          background: none; border: none;
          color: #aaa;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          position: relative;
          display: flex; align-items: center; gap: 6px;
          transition: color 0.3s ease;
        }
        .cine-link::after {
          content: ''; position: absolute;
          bottom: -4px; left: 0; width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .cine-link:hover { color: var(--gold); }
        .cine-link:hover::after { width: 100%; }
        
        .cine-apply-btn {
          background: none; border: none;
          color: var(--gold);
          font-size: 0.9rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.3s ease;
        }
        .cine-apply-btn:hover {
          color: #fff;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }
        .cine-apply-btn:hover svg {
          transform: translateX(4px);
        }
        .cine-apply-btn svg { transition: transform 0.3s ease; }

        /* Masonry Layout */
        .cine-masonry {
          column-count: 1;
          column-gap: 24px;
        }
        @media (min-width: 768px) {
          .cine-masonry { column-count: 2; }
        }
        @media (min-width: 1024px) {
          .cine-masonry { column-count: 3; }
        }
        
        /* Hero Card */
        .cine-hero {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 40px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .cine-hero-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-size: cover;
          background-position: center;
          z-index: 1;
        }
        .cine-hero-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to top, #050505 0%, rgba(5,5,5,0.8) 40%, rgba(5,5,5,0.2) 100%);
          z-index: 2;
        }
        .cine-hero-content {
          position: relative;
          z-index: 3;
          max-width: 800px;
        }

        /* Modal Styles */
        .cine-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px); z-index: 9999; display: flex;
          align-items: center; justify-content: center; padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }
        .cine-modal-content {
          background-color: #111; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; width: 100%; max-width: 700px;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8); position: relative;
          overflow: hidden; display: flex; flex-direction: column;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />

      {/* Floating Search Panel */}
      <div className="cine-search-panel">
        <Search size={22} color="rgba(255,255,255,0.5)" />
        <input 
          type="text" 
          className="cine-search-input" 
          placeholder="Search roles, companies, keywords..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        <button style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s ease' }}>
          <Plus size={18} /> Add Casting Call
        </button>
      </div>

      {/* Premium Filter Chips */}
      <div className="cine-filters">
        {filterOptions.map(opt => (
          <button 
            key={opt}
            className={`cine-chip ${filterType === opt ? 'active' : ''}`}
            onClick={() => setFilterType(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Featured Cinematic Hero */}
      {featuredJob && (
        <div className="cine-hero">
          <div className="cine-hero-bg" style={{ backgroundImage: `url(${featuredJob.image || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop'})` }}></div>
          <div className="cine-hero-overlay"></div>
          
          <div className="cine-hero-content">
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div className="cine-badge" style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--gold)', borderColor: 'rgba(212,175,55,0.5)', border: '1px solid' }}>
                <Flame size={14} /> Trending
              </div>
              <div className="cine-badge"><Star size={14} /> {featuredJob.type}</div>
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff' }}>
              {featuredJob.title}
            </h1>
            
            <div className="cine-company" style={{ fontSize: '1.2rem', marginBottom: '24px', color: '#ccc' }}>
              <Film size={20} /> {featuredJob.company}
              {featuredJob.verified && <CheckCircle size={18} color="#22c55e" style={{ marginLeft: '4px' }}/>}
            </div>
            
            <p style={{ fontSize: '1.1rem', color: '#aaa', lineHeight: 1.6, marginBottom: '32px', maxWidth: '600px' }}>
              {featuredJob.description}
            </p>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <button 
                onClick={() => handleApplyClick(featuredJob)}
                style={{ background: 'var(--gold)', color: '#000', border: 'none', padding: '16px 32px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Apply Now <ChevronRight size={20} />
              </button>
              <button 
                className="cine-link"
                onClick={() => handleDetailsClick(featuredJob)}
                style={{ fontSize: '1.1rem', color: '#fff' }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Masonry Grid */}
      {masonryJobs.length === 0 && !featuredJob ? (
        <div style={{ padding: '80px 20px', textAlign: 'center', color: '#666' }}>
          <Sparkles size={48} style={{ margin: '0 auto 20px auto', opacity: 0.2 }} />
          <p style={{ fontSize: '1.2rem' }}>No casting calls found for your criteria.</p>
        </div>
      ) : (
        <div className="cine-masonry">
          {masonryJobs.map((job) => (
            <div key={job.id} className="cine-card">
              <div className="cine-card-header">
                <div className="cine-logo">
                  <Film size={24} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {renderBadge(job.type)}
                  <button 
                    onClick={(e) => toggleBookmark(e, job.id)}
                    style={{ background: bookmarkedJobs.includes(job.id) ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.05)', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: bookmarkedJobs.includes(job.id) ? 'var(--gold)' : '#888', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <Bookmark size={16} fill={bookmarkedJobs.includes(job.id) ? 'var(--gold)' : 'none'} />
                  </button>
                </div>
              </div>
              
              <h3 className="cine-title">{job.title}</h3>
              <div className="cine-company">
                {job.company} {job.verified && <CheckCircle size={14} color="#22c55e" />}
              </div>
              
              <div className="cine-meta-grid">
                <div className="cine-meta-item">
                  <MapPin size={16} color="var(--gold)" />
                  <span>{job.location}</span>
                </div>
                <div className="cine-meta-item">
                  <IndianRupee size={16} color="#22c55e" />
                  <span><strong>{job.compensation}</strong></span>
                </div>
                <div className="cine-meta-item">
                  <Briefcase size={16} />
                  <span>{job.experience}</span>
                </div>
                <div className="cine-meta-item">
                  <Users size={16} />
                  <span>{job.applicants} applicants</span>
                </div>
                <div className="cine-meta-item">
                  <Calendar size={16} />
                  <span>{job.date}</span>
                </div>
                <div className="cine-meta-item">
                  <Eye size={16} />
                  <span>{job.views} views</span>
                </div>
              </div>
              
              <div className="cine-actions">
                <button className="cine-link" onClick={() => handleDetailsClick(job)}>
                  → View Details
                </button>
                <button className="cine-apply-btn" onClick={() => handleApplyClick(job)}>
                  Apply Now <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal (Kept clean and premium) */}
      {selectedDetailsJob && (
        <div className="cine-modal-overlay" onClick={() => setSelectedDetailsJob(null)}>
          <div className="cine-modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="cine-badge" style={{ marginBottom: '16px' }}>{selectedDetailsJob.type}</div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff', letterSpacing: '-0.02em' }}>{selectedDetailsJob.title}</h2>
                  <p style={{ color: '#aaa', margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Film size={18} /> {selectedDetailsJob.company}
                    {selectedDetailsJob.verified && <CheckCircle size={16} color="#22c55e" />}
                  </p>
                </div>
                <button onClick={() => setSelectedDetailsJob(null)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div style={{ padding: '40px', flex: 1, overflowY: 'auto', maxHeight: '50vh' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</p>
                  <p style={{ color: '#eee', fontWeight: 600, margin: 0 }}>{selectedDetailsJob.location}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Compensation</p>
                  <p style={{ color: '#22c55e', fontWeight: 600, margin: 0 }}>{selectedDetailsJob.compensation}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deadline</p>
                  <p style={{ color: '#eee', fontWeight: 600, margin: 0 }}>{selectedDetailsJob.date}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Genre</p>
                  <p style={{ color: '#eee', fontWeight: 600, margin: 0 }}>{selectedDetailsJob.genre}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Languages</p>
                  <p style={{ color: '#eee', fontWeight: 600, margin: 0 }}>{selectedDetailsJob.language}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Age Range</p>
                  <p style={{ color: '#eee', fontWeight: 600, margin: 0 }}>{selectedDetailsJob.ageRange}</p>
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>Role Description</h3>
              <p style={{ color: '#aaa', lineHeight: 1.8, margin: 0, fontSize: '1.05rem' }}>
                {selectedDetailsJob.description}
              </p>
            </div>

            <div style={{ padding: '24px 40px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '16px', background: 'rgba(0,0,0,0.2)' }}>
              <button className="cine-link" onClick={() => setSelectedDetailsJob(null)}>Close</button>
              <button 
                onClick={() => handleApplyClick(selectedDetailsJob)}
                style={{ padding: '12px 32px', borderRadius: '100px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)' }}
              >
                Apply for Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {selectedApplyJob && (
        <div className="cine-modal-overlay" onClick={() => !isApplying && !applied && setSelectedApplyJob(null)}>
          <div className="cine-modal-content" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
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
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '8px' }}>
                    Your profile and portfolio will be attached automatically.
                  </p>
                </div>

                <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '16px', background: 'rgba(0,0,0,0.2)' }}>
                  <button className="cine-link" onClick={() => setSelectedApplyJob(null)}>Cancel</button>
                  <button 
                    onClick={submitApplication}
                    disabled={isApplying}
                    style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: isApplying ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)', opacity: isApplying ? 0.8 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}
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
