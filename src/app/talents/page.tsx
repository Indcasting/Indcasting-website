"use client";

import { useState } from "react";
import { 
  Search, CheckCircle, MapPin, Star, Users, Briefcase, 
  Video, Film, Mic, Camera, Navigation, MessageSquare, 
  Heart, Share2, PlayCircle, Filter, Sparkles, Award
} from "lucide-react";
import Link from "next/link";
import DashboardCardWrapper from "@/components/DashboardCardWrapper";

// 1. Extended Mock Data
const MOCK_TALENTS = [
  {
    id: "t1",
    name: "Aria Sharma",
    profession: "Lead Actor",
    location: "Mumbai, Maharashtra",
    experience: "8 Years",
    rating: 4.9,
    fee: "₹50k/day",
    verified: true,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    languages: ["English", "Hindi", "Marathi"],
    skills: ["Method Acting", "Dance", "Action"],
    projects: 24,
    followers: "12.4k",
    responseTime: "2 hrs",
    bio: "Award-winning lead actor known for powerful dramatic performances and extensive training in classical dance."
  },
  {
    id: "t2",
    name: "Kabir Singh",
    profession: "Fashion Model",
    location: "Delhi, NCR",
    experience: "4 Years",
    rating: 4.7,
    fee: "₹30k/day",
    verified: true,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    languages: ["English", "Hindi"],
    skills: ["Runway", "Editorial", "Commercial"],
    projects: 45,
    followers: "8.2k",
    responseTime: "1 hr",
    bio: "High-fashion runway model with international experience in Milan and Paris fashion weeks."
  },
  {
    id: "t3",
    name: "Meera Reddy",
    profession: "Voice Artist",
    location: "Bengaluru, Karnataka",
    experience: "12 Years",
    rating: 5.0,
    fee: "₹20k/proj",
    verified: true,
    available: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    languages: ["English", "Hindi", "Telugu", "Tamil"],
    skills: ["Dubbing", "Audiobooks", "Commercials"],
    projects: 120,
    followers: "3.1k",
    responseTime: "4 hrs",
    bio: "Versatile voice artist specializing in multilingual animation dubbing and premium brand commercials."
  },
  {
    id: "t4",
    name: "Rohan Das",
    profession: "Cinematographer",
    location: "Mumbai, Maharashtra",
    experience: "10 Years",
    rating: 4.8,
    fee: "₹1L/day",
    verified: true,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    languages: ["English", "Bengali"],
    skills: ["RED", "ARRI", "Steadicam", "Lighting"],
    projects: 18,
    followers: "15k",
    responseTime: "24 hrs",
    bio: "Award-winning DoP with a distinct visual style. Shot 3 feature films and numerous high-end commercials."
  },
  {
    id: "t5",
    name: "Zoya Khan",
    profession: "Makeup Artist",
    location: "Mumbai, Maharashtra",
    experience: "6 Years",
    rating: 4.9,
    fee: "₹25k/day",
    verified: false,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
    languages: ["English", "Hindi", "Urdu"],
    skills: ["Prosthetics", "Bridal", "Editorial"],
    projects: 80,
    followers: "45k",
    responseTime: "1 hr",
    bio: "Celebrity makeup artist. Specializes in advanced prosthetics and high-fashion editorial looks."
  },
  {
    id: "t6",
    name: "Vikram Malhotra",
    profession: "Director",
    location: "Pune, Maharashtra",
    experience: "15 Years",
    rating: 5.0,
    fee: "₹2L/day",
    verified: true,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    languages: ["English", "Hindi"],
    skills: ["Feature Films", "Ad Films", "Scripting"],
    projects: 12,
    followers: "8k",
    responseTime: "12 hrs",
    bio: "Critically acclaimed director known for gritty, realistic storytelling and strong actor performances."
  }
];

const CATEGORIES = ["All", "Actors", "Models", "Voice Artists", "Dancers", "Singers", "Photographers", "Editors", "Directors", "Makeup Artists", "Writers"];

export default function TalentDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTalents = MOCK_TALENTS.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          talent.skills.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || talent.profession.includes(activeCategory.slice(0, -1)); // simple plural trim hack for mock
    return matchesSearch && matchesCategory;
  });

  const featuredTalents = MOCK_TALENTS.filter(t => t.featured);

  return (
    <div className="talent-container">
      <style dangerouslySetInnerHTML={{__html: `
        .talent-container {
          min-height: 100vh;
          background-color: #090909;
          color: #fff;
          font-family: var(--font-inter), sans-serif;
          position: relative;
          padding-bottom: 120px;
          overflow-x: hidden;
        }

        /* Cinematic Background */
        .talent-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 100vh;
          background: radial-gradient(circle at 70% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 30% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
          z-index: 0;
          pointer-events: none;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          z-index: 10;
          padding: 160px 5vw 80px 5vw;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          flex-wrap: wrap;
        }
        .hero-content {
          max-width: 600px;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff 0%, #aaa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.1rem;
          color: #888;
          line-height: 1.6;
          font-weight: 400;
        }
        
        .hero-stats {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .stat-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3));
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 24px;
          min-width: 140px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; flex-direction: column; gap: 8px;
        }
        .stat-val { font-size: 2rem; font-weight: 800; color: #fff; line-height: 1; }
        .stat-label { font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: flex; align-items: center; gap: 6px; }

        /* Discovery Panel */
        .discovery-panel {
          position: sticky;
          top: 80px;
          z-index: 100;
          margin: 0 5vw 60px 5vw;
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .search-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .search-bar {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 16px 24px;
          transition: all 0.3s ease;
        }
        .search-bar:focus-within {
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1.1rem;
          outline: none;
        }
        
        .filter-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 16px 24px;
          border-radius: 16px;
          font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover { background: rgba(255,255,255,0.1); }

        .category-chips {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .category-chips::-webkit-scrollbar { display: none; }
        .chip {
          padding: 10px 24px;
          border-radius: 100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: #aaa;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .chip:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          transform: translateY(-2px);
        }
        .chip.active {
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
          color: var(--gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
        }

        /* Content Area */
        .content-area {
          position: relative;
          z-index: 10;
          padding: 0 5vw;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Editorial Masonry Grid */
        .talent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }

        /* Handcrafted Profile Card */
        .profile-card {
          /* background, border, etc. now handled by DashboardCardWrapper */
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .card-image-wrap {
          position: relative;
          height: 340px;
          overflow: hidden;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .profile-card:hover .card-image {
          transform: scale(1.05);
        }
        .card-image-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 150px;
          background: linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0) 100%);
        }

        .badges-top {
          position: absolute;
          top: 16px; left: 16px; right: 16px;
          display: flex;
          justify-content: space-between;
          z-index: 2;
        }
        .badge {
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          display: flex; align-items: center; gap: 6px;
        }
        .badge-verified { color: #10b981; border-color: rgba(16,185,129,0.3); }
        
        .card-content {
          padding: 0 24px 24px 24px;
          position: relative;
          z-index: 2;
          margin-top: -40px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .card-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        }
        .card-prof {
          color: var(--gold);
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0 0 16px 0;
          display: flex; align-items: center; gap: 6px;
        }

        .card-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .meta-item { display: flex; flex-direction: column; gap: 4px; }
        .meta-lbl { font-size: 0.75rem; color: #666; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
        .meta-val { font-size: 0.9rem; color: #ccc; font-weight: 500; display: flex; align-items: center; gap: 6px; }

        .card-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
          flex: 1;
        }
        .skill-tag {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #888;
        }

        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .btn-primary {
          background: rgba(212, 175, 55, 0.1);
          color: var(--gold);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: var(--gold);
          color: #000;
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }
        
        .action-icons { display: flex; gap: 8px; }
        .icon-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          color: #aaa;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

        /* Featured Spotlight */
        .featured-carousel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }
        .featured-card {
          display: flex;
          position: relative;
        }
        .featured-img { width: 240px; }
        .featured-img img { width: 100%; height: 100%; object-fit: cover; }
        .featured-content { padding: 32px; flex: 1; display: flex; flex-direction: column; justify-content: center; }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .discovery-panel { margin: 0 20px 40px 20px; padding: 16px; }
          .search-row { flex-direction: column; }
          .search-bar { width: 100%; }
          .filter-btn { width: 100%; justify-content: center; }
          .talent-grid { grid-template-columns: 1fr; }
          .featured-carousel { grid-template-columns: 1fr; }
          .featured-card { flex-direction: column; }
          .featured-img { width: 100%; height: 300px; }
        }
      `}} />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Exceptional Talent</h1>
          <p className="hero-subtitle">Explore verified actors, models, voice artists, directors, and creative professionals for your next masterpiece.</p>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label"><Users size={14} color="var(--gold)" /> Total Talent</span>
            <span className="stat-val">12k+</span>
          </div>
          <div className="stat-card">
            <span className="stat-label"><CheckCircle size={14} color="#10b981" /> Verified</span>
            <span className="stat-val">4.5k</span>
          </div>
          <div className="stat-card">
            <span className="stat-label"><Sparkles size={14} color="#a855f7" /> Featured</span>
            <span className="stat-val">128</span>
          </div>
        </div>
      </div>

      {/* Discovery Panel */}
      <div className="discovery-panel">
        <div className="search-row">
          <div className="search-bar">
            <Search size={22} color="var(--gold)" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by name, skill, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <Filter size={18} /> Advanced Filters
          </button>
        </div>
        <div className="category-chips">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="content-area">
        
        {/* Featured Talents Section (Only show if 'All' or matches) */}
        {activeCategory === "All" && searchQuery === "" && (
          <div style={{ marginBottom: '60px' }}>
            <h2 className="section-title"><Award color="var(--gold)" /> Featured Professionals</h2>
            <div className="featured-carousel">
              {featuredTalents.map(talent => (
                <DashboardCardWrapper key={talent.id} className="featured-card">
                  <div className="featured-img">
                    <img src={talent.image} alt={talent.name} />
                  </div>
                  <div className="featured-content">
                    <div className="badge badge-verified" style={{ width: 'fit-content', marginBottom: '16px' }}>
                      <CheckCircle size={12} /> Spotlight
                    </div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px 0' }}>{talent.name}</h3>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, margin: '0 0 16px 0' }}>{talent.profession}</p>
                    <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>{talent.bio}</p>
                    
                    <div className="card-actions" style={{ borderTop: 'none', padding: 0 }}>
                      <button className="btn-primary" onClick={() => alert(`Navigating to ${talent.name}'s portfolio`)}>
                        <PlayCircle size={18} /> View Portfolio
                      </button>
                      <div className="action-icons">
                        <button className="icon-btn" title="Message"><MessageSquare size={18} /></button>
                        <button className="icon-btn" title="Save"><Heart size={18} /></button>
                      </div>
                    </div>
                  </div>
                </DashboardCardWrapper>
              ))}
            </div>
          </div>
        )}

        <h2 className="section-title">Explore Directory</h2>

        {filteredTalents.length === 0 ? (
          <div style={{ padding: '100px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <Search size={64} color="var(--gold)" style={{ margin: '0 auto 24px auto', opacity: 0.5 }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>No talent matches your search.</h2>
            <p style={{ color: '#888', marginBottom: '32px', fontSize: '1.1rem' }}>Try adjusting your filters or explore featured professionals.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
              style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '14px 28px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="talent-grid">
            {filteredTalents.map(talent => (
              <DashboardCardWrapper key={talent.id} className="profile-card">
                <div className="card-image-wrap">
                  <div className="badges-top">
                    {talent.verified && (
                      <div className="badge badge-verified"><CheckCircle size={12} /> Verified</div>
                    )}
                    <div className="badge" style={{ background: talent.available ? 'rgba(16,185,129,0.8)' : 'rgba(0,0,0,0.6)' }}>
                      {talent.available ? 'Available' : 'Busy'}
                    </div>
                  </div>
                  <img src={talent.image} alt={talent.name} className="card-image" />
                  <div className="card-image-overlay"></div>
                </div>
                
                <div className="card-content">
                  <h3 className="card-name">{talent.name}</h3>
                  <div className="card-prof"><Star size={14} fill="currentColor" /> {talent.profession} • {talent.rating}</div>
                  
                  <div className="card-meta">
                    <div className="meta-item">
                      <span className="meta-lbl">Location</span>
                      <span className="meta-val"><MapPin size={14} color="#888" /> {talent.location.split(',')[0]}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-lbl">Experience</span>
                      <span className="meta-val"><Briefcase size={14} color="#888" /> {talent.experience}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-lbl">Expected Fee</span>
                      <span className="meta-val" style={{ color: '#10b981' }}>{talent.fee}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-lbl">Languages</span>
                      <span className="meta-val">{talent.languages.slice(0,2).join(', ')}</span>
                    </div>
                  </div>

                  <div className="card-skills">
                    {talent.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <button className="btn-primary" onClick={() => alert(`Navigating to ${talent.name}'s portfolio`)}>
                      View Profile
                    </button>
                    <div className="action-icons">
                      <button className="icon-btn" title="Message" onClick={() => alert(`Messaging ${talent.name}`)}><MessageSquare size={16} /></button>
                      <button className="icon-btn" title="Save" onClick={() => alert(`${talent.name} saved to shortlist!`)}><Heart size={16} /></button>
                      <button className="icon-btn" title="Share" onClick={() => alert(`Link copied!`)}><Share2 size={16} /></button>
                    </div>
                  </div>
                </div>
              </DashboardCardWrapper>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}