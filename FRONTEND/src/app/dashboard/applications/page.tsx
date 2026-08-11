"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Clock, ChevronRight, X, Briefcase, Film, Flame, Star, Sparkles, Filter, IndianRupee, LayoutGrid, List, Bookmark, Users, Globe, PlayCircle, Share2, Trash2, CheckCircle, Info, Languages, Plus } from "lucide-react";
import Link from "next/link";
import NeobrutalistCard from "@/components/ui/NeobrutalistCard";

export default function ApplicationsPage() {
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
      director: "Aisha Khan",
      responsibilities: ["Lead the primary narrative arc", "Participate in promotional tours", "Attend script reading and workshops"],
      requiredSkills: ["Method Acting", "Improvisation", "Emotional Range"],
      preferredSkills: ["Action/Stunts", "Singing"],
      workingHours: "12-hour shifts during shoot",
      contractDuration: "4 Months",
      openings: 1,
      height: "5'8\" - 6'2\"",
      portfolioRequired: true,
      resumeRequired: true,
      companyRating: 4.8,
      projectsCompleted: 14,
      followers: "12.4K",
      faqs: [
        { q: "Is travel covered?", a: "Yes, travel and accommodation are fully covered." },
        { q: "When do shoots begin?", a: "Shooting is scheduled to begin in mid-November." }
      ]
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
      director: "Vikram Singh",
      responsibilities: ["Feature in print and digital campaigns", "Work with renowned stylists", "Attend brand events"],
      requiredSkills: ["Posing", "Runway Walk", "Expressive Facial Control"],
      preferredSkills: ["Dance Background"],
      workingHours: "8-hour shoot days",
      contractDuration: "3 Days",
      openings: 3,
      height: "5'7\"+",
      portfolioRequired: true,
      resumeRequired: false,
      companyRating: 4.9,
      projectsCompleted: 120,
      followers: "2.1M",
      faqs: [
        { q: "Will wardrobe be provided?", a: "Yes, all wardrobe and styling will be handled by our team." }
      ]
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
      director: "Sarah Jenkins",
      responsibilities: ["Record high-quality character voices", "Deliver multiple takes for different emotional tones"],
      requiredSkills: ["Voice Modulation", "Accents", "Audio Editing basics"],
      preferredSkills: ["Character Design knowledge"],
      workingHours: "Flexible",
      contractDuration: "Ongoing",
      openings: 2,
      height: "Any",
      portfolioRequired: true,
      resumeRequired: true,
      companyRating: 4.5,
      projectsCompleted: 85,
      followers: "8.5K",
      faqs: []
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
      director: "Rohan Desai",
      responsibilities: ["Design visual style", "Lead camera and lighting departments", "Collaborate with VFX supervisors"],
      requiredSkills: ["Arri Alexa operation", "Lighting Design", "Color Theory"],
      preferredSkills: ["VFX Integration", "Drone Operation"],
      workingHours: "14-hour days on set",
      contractDuration: "6 Months",
      openings: 1,
      height: "Any",
      portfolioRequired: true,
      resumeRequired: true,
      companyRating: 4.7,
      projectsCompleted: 24,
      followers: "15K",
      faqs: []
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

        .cine-view-toggle {
          display: flex;
          background: rgba(0,0,0,0.4);
          border-radius: 12px;
          padding: 4px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .cine-view-btn {
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
        .cine-view-btn.active {
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
          cursor: pointer;
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
          box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 60px rgba(212, 175, 55, 0.2);
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
          align-items: center; justify-content: flex-end; /* Drawer on right */
          animation: fadeIn 0.3s ease-out;
        }
        .cine-drawer-content {
          background-color: #0a0a0a; border-left: 1px solid rgba(212, 175, 55, 0.3);
          width: 100%; max-width: 600px; height: 100%;
          box-shadow: -20px 0 80px rgba(0, 0, 0, 0.9); position: relative;
          display: flex; flex-direction: column;
          animation: slideInRight 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        @media (max-width: 768px) {
          .cine-modal-overlay { align-items: flex-end; }
          .cine-drawer-content {
            border-left: none; border-top: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 24px 24px 0 0; max-width: 100%; height: 90vh;
            animation: slideInUp 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
        }
        
        .drawer-header {
          padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; justify-content: space-between; align-items: flex-start;
          background: linear-gradient(180deg, #111, #0a0a0a);
        }
        .drawer-body {
          flex: 1; overflow-y: auto; padding: 32px;
          display: flex; flex-direction: column; gap: 40px;
        }
        .drawer-body::-webkit-scrollbar { width: 8px; }
        .drawer-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        
        .drawer-section-title {
          font-size: 1.2rem; font-weight: 700; color: #fff; margin: 0 0 16px 0;
          text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 10px;
        }
        .drawer-section-title::before { content: ''; width: 4px; height: 16px; background: var(--gold); border-radius: 2px; }
        
        .drawer-pill-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .drawer-pill {
          padding: 6px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px; font-size: 0.85rem; color: #ccc;
        }
        
        .drawer-accordion {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; margin-bottom: 12px; overflow: hidden;
        }
        .drawer-accordion-header {
          padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; font-weight: 600; color: #eee;
        }
        .drawer-accordion-content {
          padding: 0 20px 20px 20px; color: #aaa; font-size: 0.95rem; line-height: 1.6;
        }
        
        .drawer-action-bar {
          padding: 20px 32px; background: rgba(10,10,10,0.9); backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between;
          align-items: center; gap: 16px;
        }
        
        .file-upload-btn {
          display: flex; align-items: center; gap: 12px; padding: 12px 16px;
          background: rgba(0,0,0,0.4); border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 12px; color: #ccc; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;
        }
        .file-upload-btn:hover { border-color: var(--gold); color: #fff; }
        
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

      `}} />

      {/* Hero Header */}
      <div className="collection-hero">
        <div>
          <h1 className="collection-title">My Applications</h1>
          <p className="collection-subtitle">
            Track and manage all your active and past casting applications.
          </p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <Bookmark size={24} color="#3b82f6" />
            </div>
            <div>
              <div className="stat-value">{jobs.length}</div>
              <div className="stat-label">Total Applications</div>
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
          <div className="cine-view-toggle">
            <button 
              className={`cine-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={18} /> Grid
            </button>
            <button 
              className={`cine-view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
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
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 16px 0', color: '#fff' }}>No Applications Yet</h2>
          <p style={{ fontSize: '1.1rem', color: '#888', maxWidth: '400px', marginBottom: '32px' }}>
            You haven't applied to any casting opportunities yet. Start exploring to find your next role.
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

      {/* Side Drawer for Job Details */}
      {selectedApplyJob && (
        <JobDrawer 
          job={selectedApplyJob} 
          onClose={() => !isApplying && !applied && setSelectedApplyJob(null)}
          isApplying={isApplying}
          applied={applied}
          submitApplication={submitApplication}
        />
      )}


    </div>
  );
}

// Subcomponent for the individual casting cards
function CastingCard({ job, handleApplyClick, handleDelete, setHoveredJobId, hoveredJobId }: any) {
  const isHovered = hoveredJobId === job.id;

  return (
    <NeobrutalistCard
      onClick={() => handleApplyClick(job)}
      tags={
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '100px', border: '1px solid var(--gold, #c9a84c)', backgroundColor: 'transparent', color: 'var(--gold, #c9a84c)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          <Bookmark size={12} fill="currentColor" /> Saved {job.savedDate}
        </div>
      }
      title={
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ padding: '8px', border: '2px solid var(--dash-border, #333)', borderRadius: '12px', flexShrink: 0, boxShadow: '2px 2px 0px 0px var(--dash-border, #333)' }}>
            <Film size={24} color="var(--gold, #c9a84c)" />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: 800, color: 'var(--dash-text-main, #fff)', lineHeight: 1.2 }}>{job.title}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#888', marginTop: '4px', fontWeight: 600 }}>
              {job.company} {job.verified && <CheckCircle size={14} color="#22c55e" />}
            </span>
          </div>
        </div>
      }
      metadata={
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Location</span>
            <span style={{ fontSize: '0.9rem', color: '#ccc', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color="var(--gold, #c9a84c)" /> {job.location}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Compensation</span>
            <span style={{ fontSize: '0.9rem', color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><IndianRupee size={14} /> {job.compensation}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Experience</span>
            <span style={{ fontSize: '0.9rem', color: '#ccc', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}><Briefcase size={14} color="#888" /> {job.experience}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Deadline</span>
            <span style={{ fontSize: '0.9rem', color: job.deadlineColor || '#ccc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {job.deadline}</span>
          </div>
        </>
      }
      content={job.description}
      actions={
        <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
          <button 
            style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px', border: '2px solid var(--dash-border, #333)', backgroundColor: 'transparent', color: 'var(--dash-text-main, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '2px 2px 0px 0px var(--dash-border, #333)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-1px, -1px)'; e.currentTarget.style.boxShadow = '3px 3px 0px 0px var(--gold, #c9a84c)'; e.currentTarget.style.borderColor = 'var(--gold, #c9a84c)'; e.currentTarget.style.color = 'var(--gold, #c9a84c)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '2px 2px 0px 0px var(--dash-border, #333)'; e.currentTarget.style.borderColor = 'var(--dash-border, #333)'; e.currentTarget.style.color = 'var(--dash-text-main, #fff)' }}
            title="Share"
          >
            <Share2 size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}
            style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px', border: '2px solid var(--dash-border, #333)', backgroundColor: 'transparent', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '2px 2px 0px 0px var(--dash-border, #333)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-1px, -1px)'; e.currentTarget.style.boxShadow = '3px 3px 0px 0px #ef4444'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '2px 2px 0px 0px var(--dash-border, #333)'; e.currentTarget.style.borderColor = 'var(--dash-border, #333)'; e.currentTarget.style.color = '#ef4444' }}
            title="Remove from Collection"
          >
            <Trash2 size={16} />
          </button>
        </div>
      }
    />
  );
}

function JobDrawer({ job, onClose, isApplying, applied, submitApplication }: any) {
  const [expandedSection, setExpandedSection] = useState<string | null>("Project Description");
  const [files, setFiles] = useState({ resume: null, portfolio: null, showreel: null, other: null });

  const toggleSection = (name: string) => {
    setExpandedSection(prev => prev === name ? null : name);
  };

  return (
    <div className="cine-modal-overlay" onClick={onClose}>
      <div className="cine-drawer-content" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff' }}>{job.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '0.95rem' }}>
              <Film size={16} /> {job.company}
              {job.verified && <CheckCircle size={14} color="#22c55e" />}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {applied ? (
          <div className="drawer-body" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 24px auto' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 16px 0', color: '#fff' }}>Application Submitted Successfully</h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '400px' }}>
              Your application for {job.title} has been sent to {job.company}. Good luck!
            </p>
            <p style={{ color: '#666', marginTop: '24px', fontSize: '0.9rem' }}>
              Submitted on {new Date().toLocaleString()}
            </p>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              {/* Overview */}
              <section>
                <h3 className="drawer-section-title">Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Employment Type</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.type}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Category</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.category}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Production Type</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.genre}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Compensation</strong><p style={{ color: '#22c55e', margin: '4px 0 0 0', fontWeight: 600 }}>{job.compensation}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Location</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.location}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Deadline</strong><p style={{ color: job.deadlineColor, margin: '4px 0 0 0', fontWeight: 600 }}>{job.deadline}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Experience required</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.experience}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Languages required</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.language}</p></div>
                </div>
              </section>

              {/* About the Role */}
              <section>
                <h3 className="drawer-section-title">About the Role</h3>
                <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>{job.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  {job.responsibilities && (
                    <div>
                      <strong style={{ color: '#eee', display: 'block', marginBottom: '8px' }}>Responsibilities</strong>
                      <ul style={{ color: '#aaa', paddingLeft: '20px', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                        {job.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                  {job.requiredSkills && (
                    <div>
                      <strong style={{ color: '#eee', display: 'block', marginBottom: '8px' }}>Required Skills</strong>
                      <div className="drawer-pill-grid">
                        {job.requiredSkills.map((s: string, i: number) => <span key={i} className="drawer-pill">{s}</span>)}
                      </div>
                    </div>
                  )}
                  {job.preferredSkills && (
                    <div>
                      <strong style={{ color: '#eee', display: 'block', marginBottom: '8px' }}>Preferred Skills</strong>
                      <div className="drawer-pill-grid">
                        {job.preferredSkills.map((s: string, i: number) => <span key={i} className="drawer-pill">{s}</span>)}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '32px', marginTop: '12px' }}>
                    <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Working Hours</strong><p style={{ color: '#eee', margin: '4px 0 0 0', fontSize: '0.95rem' }}>{job.workingHours || "N/A"}</p></div>
                    <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Contract Duration</strong><p style={{ color: '#eee', margin: '4px 0 0 0', fontSize: '0.95rem' }}>{job.contractDuration || "N/A"}</p></div>
                    <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Openings</strong><p style={{ color: '#eee', margin: '4px 0 0 0', fontSize: '0.95rem' }}>{job.openings || "1"}</p></div>
                  </div>
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="drawer-section-title">Requirements</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Age Criteria</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.ageRange}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Gender Preference</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.gender}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Height</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.height || "Any"}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Experience Level</strong><p style={{ color: '#fff', margin: '4px 0 0 0' }}>{job.experience}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Portfolio Required</strong><p style={{ color: job.portfolioRequired ? '#22c55e' : '#aaa', margin: '4px 0 0 0' }}>{job.portfolioRequired ? "Yes" : "No"}</p></div>
                  <div><strong style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>Resume Required</strong><p style={{ color: job.resumeRequired ? '#22c55e' : '#aaa', margin: '4px 0 0 0' }}>{job.resumeRequired ? "Yes" : "No"}</p></div>
                </div>
              </section>

              {/* More Details (Accordion) */}
              <section>
                <h3 className="drawer-section-title">More Details</h3>
                {["Project Description", "Casting Director Notes", "Shooting Schedule", "Audition Process", "Compensation Details", "Benefits", "FAQs"].map((title) => {
                  const isExpanded = expandedSection === title;
                  let content = "Detailed information for this section is currently unavailable.";
                  if (title === "Project Description") content = job.description;
                  if (title === "FAQs" && job.faqs && job.faqs.length > 0) {
                    content = job.faqs.map((f: any) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
                  }
                  
                  return (
                    <div key={title} className="drawer-accordion">
                      <div className="drawer-accordion-header" onClick={() => toggleSection(title)}>
                        {title}
                        <ChevronRight size={18} style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                      </div>
                      {isExpanded && (
                        <div className="drawer-accordion-content" style={{ whiteSpace: 'pre-line' }}>
                          {content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>

              {/* Company Section */}
              <section>
                <h3 className="drawer-section-title">Company Profile</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="company-logo" style={{ width: 80, height: 80, borderRadius: 20 }}>
                    <Globe size={40} color="var(--gold)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {job.company} {job.verified && <CheckCircle size={16} color="#22c55e" />}
                    </h4>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#aaa' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} color="#f59e0b" fill="#f59e0b" /> {job.companyRating || "4.5"} Rating</span>
                      <span>{job.projectsCompleted || 0} Projects</span>
                      <span>{job.followers || "0"} Followers</span>
                    </div>
                    <button style={{ marginTop: '12px', background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', padding: 0 }}>
                      View Company Profile →
                    </button>
                  </div>
                </div>
              </section>
              
              {/* Related Castings */}
              <section>
                <h3 className="drawer-section-title">Similar Opportunities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                      <div>
                        <h5 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '1rem' }}>Similar Role {i}</h5>
                        <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Another Company • Mumbai</p>
                      </div>
                      <ChevronRight size={18} color="#aaa" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Application Section */}
              <section id="application-section">
                <h3 className="drawer-section-title">Apply for this Casting Call</h3>
                <div style={{ background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.05), transparent)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '32px', borderRadius: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: '#eee', marginBottom: '12px' }}>
                    Cover Letter / Application Message
                  </label>
                  <textarea 
                    placeholder="Introduce yourself and explain why you're the right fit for this role..."
                    style={{
                      width: '100%', minHeight: '160px', padding: '16px', borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)',
                      color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical',
                      fontFamily: 'inherit', marginBottom: '24px'
                    }}
                  />
                  
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: '#eee', marginBottom: '12px' }}>
                    Required Documents
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <label className="file-upload-btn">
                      <input type="file" style={{ display: 'none' }} onChange={(e) => setFiles({...files, resume: e.target.value as any})} />
                      <Briefcase size={20} /> {files.resume ? "Resume Uploaded" : "Upload Resume"}
                    </label>
                    <label className="file-upload-btn">
                      <input type="file" style={{ display: 'none' }} onChange={(e) => setFiles({...files, portfolio: e.target.value as any})} />
                      <Film size={20} /> {files.portfolio ? "Portfolio Uploaded" : "Upload Portfolio"}
                    </label>
                    <label className="file-upload-btn">
                      <input type="file" style={{ display: 'none' }} onChange={(e) => setFiles({...files, showreel: e.target.value as any})} />
                      <PlayCircle size={20} /> {files.showreel ? "Showreel Uploaded" : "Upload Showreel"}
                    </label>
                    <label className="file-upload-btn">
                      <input type="file" style={{ display: 'none' }} onChange={(e) => setFiles({...files, other: e.target.value as any})} />
                      <Plus size={20} /> {files.other ? "File Uploaded" : "Upload Additional Files"}
                    </label>
                  </div>
                  
                  <button 
                    onClick={submitApplication}
                    disabled={isApplying}
                    style={{ 
                      width: '100%', padding: '16px', borderRadius: '12px', border: 'none', 
                      backgroundColor: 'var(--gold)', color: '#000', fontSize: '1.1rem', fontWeight: 700, 
                      cursor: isApplying ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)', 
                      opacity: isApplying ? 0.8 : 1, transition: 'all 0.3s' 
                    }}
                  >
                    {isApplying ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </section>

            </div>

            <div className="drawer-action-bar">
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-text" style={{ color: '#fff', fontSize: '1.2rem', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} title="Share">
                  <Share2 size={20} />
                </button>
                <button className="btn-text" style={{ color: '#fff', fontSize: '1.2rem', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} title="Save">
                  <Bookmark size={20} fill="#fff" />
                </button>
                <button className="btn-text" style={{ color: '#ef4444', fontSize: '1.2rem', padding: '8px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }} title="Report">
                  <Info size={20} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px 20px', borderRadius: '100px', fontWeight: 600, cursor: 'pointer' }}>
                  Contact Recruiter
                </button>
                <button 
                  onClick={() => document.getElementById('application-section')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)' }}>
                  Submit Application
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
