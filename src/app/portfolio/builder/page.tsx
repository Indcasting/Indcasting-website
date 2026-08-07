"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { getPortfolioByUserId, saveUserPortfolio, generateSlug } from "@/utils/portfolioStorage";
import { PortfolioData } from "@/types/portfolio";
import BasicInfoForm from "@/components/portfolio/BasicInfoForm";
import SkillsForm from "@/components/portfolio/SkillsForm";
import ExperienceForm from "@/components/portfolio/ExperienceForm";
import EducationForm from "@/components/portfolio/EducationForm";
import ProjectsForm from "@/components/portfolio/ProjectsForm";
import CertificationsForm from "@/components/portfolio/CertificationsForm";
import MiscForm from "@/components/portfolio/MiscForm";
import { Save, Eye, Globe, Lock, Monitor, Smartphone, Share2, Sparkles, User, Briefcase, GraduationCap, Layout, Award, Settings, CheckCircle, RefreshCcw } from "lucide-react";

const TABS = [
  { id: "Basic Info", icon: User },
  { id: "Skills", icon: Sparkles },
  { id: "Experience", icon: Briefcase },
  { id: "Education", icon: GraduationCap },
  { id: "Projects", icon: Layout },
  { id: "Certifications", icon: Award },
  { id: "Settings", icon: Settings },
];

export default function PortfolioBuilder() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [isClient, setIsClient] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [theme, setTheme] = useState("cinematic");
  
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
    const user = getCurrentUser();
    if (!user) {
      router.push("/signup?redirect=/portfolio/builder");
      return;
    }

    const existing = getPortfolioByUserId(user.id);
    if (existing) {
      setPortfolio(existing);
    } else {
      // Create default
      const defaultPortfolio: PortfolioData = {
        userId: user.id,
        usernameSlug: generateSlug(user.name),
        isPublished: false,
        completionPercentage: 10,
        lastUpdated: new Date().toISOString(),
        basicInfo: {
          fullName: user.name,
          professionalTitle: "",
          profilePicture: "",
          coverBanner: "",
          bio: "",
          location: user.city || "",
          email: user.email,
          phone: user.phone || "",
          website: "",
          linkedin: "",
          github: "",
          portfolioUrl: ""
        },
        skills: [],
        experience: [],
        education: [],
        projects: [],
        certifications: [],
        resume: "",
        achievements: [],
        socialLinks: { linkedin: "", github: "", twitter: "", instagram: "", youtube: "", behance: "", dribbble: "", medium: "" },
        languages: [],
        interests: [],
        privacyControls: { email: "Public", phone: "Private", resume: "Public", projects: "Public", achievements: "Public", socialLinks: "Public" }
      };
      setPortfolio(defaultPortfolio);
    }
  }, [router]);

  // Auto-save logic
  useEffect(() => {
    if (!portfolio || saveStatus === "saved") return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      handleManualSave();
    }, 1500);

    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [portfolio]);

  const updatePortfolio = (updates: Partial<PortfolioData>) => {
    if (!portfolio) return;
    setPortfolio({ ...portfolio, ...updates });
    setSaveStatus("unsaved");
  };

  const handleManualSave = () => {
    if (!portfolio) return;
    setSaveStatus("saving");
    
    const updated = { 
      ...portfolio, 
      lastUpdated: new Date().toISOString(),
      completionPercentage: calculateCompletion(portfolio)
    };
    
    saveUserPortfolio(updated);
    setPortfolio(updated);
    
    setTimeout(() => {
      setSaveStatus("saved");
    }, 500);
  };

  const calculateCompletion = (data: PortfolioData) => {
    let score = 0;
    if (data.basicInfo.fullName) score += 10;
    if (data.basicInfo.bio) score += 10;
    if (data.basicInfo.profilePicture) score += 10;
    if (data.skills.length > 0) score += 15;
    if (data.experience.length > 0) score += 20;
    if (data.projects.length > 0) score += 25;
    if (data.resume) score += 10;
    return Math.min(score, 100);
  };

  if (!isClient || !portfolio) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading Studio...</p></div>;

  return (
    <div className="portfolio-studio-container">
      <style dangerouslySetInnerHTML={{__html: `
        .portfolio-studio-container {
          min-height: 100vh;
          background-color: #050505;
          color: #fff;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden; /* Prevent body scroll, handle scroll internally */
          height: 100vh;
          position: relative;
        }

        /* Ambient Studio Background */
        .portfolio-studio-container::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.05), transparent 40%),
                      radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.03), transparent 40%);
          z-index: 0; pointer-events: none;
        }

        /* Header */
        .studio-header {
          height: 72px; padding: 0 24px;
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          z-index: 10;
        }
        
        .studio-progress-ring {
          position: relative; width: 40px; height: 40px; border-radius: 50%;
          background: conic-gradient(var(--gold) ${portfolio.completionPercentage * 3.6}deg, rgba(255,255,255,0.05) 0deg);
          display: flex; align-items: center; justify-content: center;
        }
        .studio-progress-ring::after {
          content: ''; position: absolute; width: 34px; height: 34px;
          background: #0a0a0a; border-radius: 50%;
        }
        .studio-progress-value { position: relative; z-index: 2; font-size: 0.75rem; font-weight: 700; color: #fff; }

        .studio-btn {
          padding: 8px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600;
          display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
        }
        .btn-glass { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; }
        .btn-glass:hover { background: rgba(255,255,255,0.1); }
        .btn-gold { background: var(--gold); border: none; color: #000; }
        .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3); }

        /* Workspace Layout */
        .studio-workspace {
          display: flex; flex: 1; overflow: hidden; position: relative; z-index: 1;
        }

        /* Floating Nav */
        .studio-nav {
          width: 260px; padding: 32px 24px; border-right: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 8px; overflow-y: auto;
        }
        .nav-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 16px;
          border-radius: 12px; color: #888; font-size: 0.95rem; font-weight: 500;
          cursor: pointer; transition: all 0.3s ease; position: relative;
        }
        .nav-item:hover { color: #fff; background: rgba(255,255,255,0.03); }
        .nav-item.active {
          color: #fff; background: rgba(212, 175, 55, 0.1);
        }
        .nav-item.active::before {
          content: ''; position: absolute; left: 0; top: 25%; height: 50%; width: 3px;
          background: var(--gold); border-radius: 0 4px 4px 0;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        /* Center Canvas */
        .studio-canvas {
          flex: 1; padding: 40px; overflow-y: auto; scroll-behavior: smooth;
        }
        .canvas-inner { max-width: 720px; margin: 0 auto; }

        /* Right Preview Panel */
        .studio-preview {
          width: 450px; background: rgba(10,10,10,0.5); border-left: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column;
        }
        .preview-header {
          padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; justify-content: space-between; align-items: center;
        }
        .preview-container {
          flex: 1; padding: 24px; display: flex; justify-content: center; overflow-y: auto;
        }
        
        .preview-device {
          width: 100%; max-width: 100%; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; background: #000; overflow: hidden; position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5); transition: all 0.3s ease;
        }
        .preview-device.mobile {
          width: 375px; height: 812px; border-radius: 36px; border: 8px solid #222;
        }

        /* Custom Scrollbar for Studio */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        
        /* Premium Card styling for inner forms */
        .portfolio-section {
          background: rgba(25, 25, 25, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        .portfolio-section:hover {
          border-color: rgba(212, 175, 55, 0.2);
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }
      `}} />

      {/* Top Header */}
      <header className="studio-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="studio-progress-ring">
              <span className="studio-progress-value">{portfolio.completionPercentage}</span>
            </div>
            <div>
              <h1 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>My Portfolio Studio</h1>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>Profile Strength: {portfolio.completionPercentage >= 80 ? 'Exceptional' : 'Building'}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: saveStatus === 'saved' ? '#888' : '#22c55e' }}>
            {saveStatus === 'saved' ? <CheckCircle size={14} /> : <RefreshCcw size={14} className={saveStatus === 'saving' ? "animate-spin" : ""} />}
            {saveStatus === 'saved' ? 'Saved to Cloud' : saveStatus === 'saving' ? 'Saving...' : 'Unsaved Changes'}
          </div>
          
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
          
          <button onClick={() => updatePortfolio({ isPublished: !portfolio.isPublished })} className="studio-btn btn-glass">
            {portfolio.isPublished ? <Globe size={14} color="#22c55e" /> : <Lock size={14} />}
            {portfolio.isPublished ? 'Published' : 'Draft'}
          </button>
          
          <button className="studio-btn btn-glass">
            <Share2 size={14} /> Share
          </button>

          <button onClick={handleManualSave} disabled={saveStatus === 'saving'} className="studio-btn btn-gold">
            <Save size={14} /> Save Changes
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="studio-workspace">
        
        {/* Floating Navigation */}
        <nav className="studio-nav">
          <div style={{ padding: '0 16px 16px 16px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', fontWeight: 600 }}>
            Sections
          </div>
          {TABS.map(tab => (
            <div 
              key={tab.id} 
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              {tab.id}
            </div>
          ))}
        </nav>

        {/* Center Canvas */}
        <main className="studio-canvas">
          <div className="canvas-inner">
            {activeTab === "Basic Info" && <BasicInfoForm data={portfolio.basicInfo} onChange={d => updatePortfolio({ basicInfo: d })} />}
            {activeTab === "Skills" && <SkillsForm data={portfolio.skills} onChange={d => updatePortfolio({ skills: d })} />}
            {activeTab === "Experience" && <ExperienceForm data={portfolio.experience} onChange={d => updatePortfolio({ experience: d })} />}
            {activeTab === "Education" && <EducationForm data={portfolio.education} onChange={d => updatePortfolio({ education: d })} />}
            {activeTab === "Projects" && <ProjectsForm data={portfolio.projects} onChange={d => updatePortfolio({ projects: d })} />}
            {activeTab === "Certifications" && <CertificationsForm data={portfolio.certifications} onChange={d => updatePortfolio({ certifications: d })} />}
            {activeTab === "Settings" && (
              <MiscForm 
                social={portfolio.socialLinks} onSocialChange={d => updatePortfolio({ socialLinks: d })}
                privacy={portfolio.privacyControls} onPrivacyChange={d => updatePortfolio({ privacyControls: d })}
                resume={portfolio.resume} onResumeChange={d => updatePortfolio({ resume: d })}
              />
            )}
          </div>
        </main>

        {/* Right Preview Panel */}
        <aside className="studio-preview">
          <div className="preview-header">
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa' }}>Live Preview</div>
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
              <button 
                onClick={() => setPreviewMode("desktop")}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', background: previewMode === "desktop" ? 'rgba(255,255,255,0.1)' : 'transparent', color: previewMode === "desktop" ? '#fff' : '#666', cursor: 'pointer' }}
              >
                <Monitor size={16} />
              </button>
              <button 
                onClick={() => setPreviewMode("mobile")}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', background: previewMode === "mobile" ? 'rgba(255,255,255,0.1)' : 'transparent', color: previewMode === "mobile" ? '#fff' : '#666', cursor: 'pointer' }}
              >
                <Smartphone size={16} />
              </button>
            </div>
          </div>
          <div className="preview-container">
            <div className={`preview-device ${previewMode}`}>
              <LivePreview data={portfolio} theme={theme} />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

// Minimal Live Preview Component rendering inside the Studio
function LivePreview({ data, theme }: { data: PortfolioData, theme: string }) {
  const info = data.basicInfo;
  
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', color: '#fff', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Mini Cover */}
      <div style={{ height: '140px', background: info.coverBanner ? `url(${info.coverBanner}) center/cover` : 'linear-gradient(135deg, #222, #111)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-30px', left: '24px', width: '64px', height: '64px', borderRadius: '50%', background: '#333', border: '3px solid #0a0a0a', overflow: 'hidden' }}>
          {info.profilePicture ? <img src={info.profilePicture} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={32} color="#666" style={{ margin: '14px' }} />}
        </div>
      </div>
      
      <div style={{ padding: '40px 24px 24px 24px', flex: 1 }}>
        <h2 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 800 }}>{info.fullName || "Your Name"}</h2>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--gold)' }}>{info.professionalTitle || "Professional Title"}</p>
        
        <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: 1.6, marginBottom: '24px' }}>
          {info.bio || "Add a bio in the Basic Info section to let people know about you."}
        </p>

        {data.skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#666', margin: '0 0 12px 0' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {data.skills.slice(0, 5).map((s, i) => (
                <span key={i} style={{ padding: '4px 10px', background: 'rgba(212,175,55,0.1)', color: 'var(--gold)', fontSize: '0.7rem', borderRadius: '100px', border: '1px solid rgba(212,175,55,0.3)' }}>{s.name}</span>
              ))}
              {data.skills.length > 5 && <span style={{ padding: '4px 10px', color: '#666', fontSize: '0.7rem' }}>+{data.skills.length - 5} more</span>}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#666', margin: '0 0 12px 0' }}>Featured Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.projects.slice(0, 2).map((p, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#eee' }}>{p.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
