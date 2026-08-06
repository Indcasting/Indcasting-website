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
import { Save, Eye, Globe, Lock } from "lucide-react";

const TABS = ["Basic Info", "Skills", "Experience", "Education", "Projects", "Certifications", "Settings"];

export default function PortfolioBuilder() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [isClient, setIsClient] = useState(false);
  
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  if (!isClient || !portfolio) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading...</p></div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', paddingTop: '120px' }}>
      
      {/* Top Bar */}
      <div style={{ borderBottom: '1px solid var(--dash-border)', padding: isScrolled ? '8px 40px' : '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', position: 'sticky', top: '90px', zIndex: 100, transition: 'all 0.35s ease' }}>
        <div>
          <h1 style={{ fontSize: isScrolled ? '1.2rem' : '1.5rem', margin: '0 0 4px 0', transition: 'font-size 0.3s ease' }}>Portfolio Builder</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: isScrolled ? '0.75rem' : '0.85rem', color: 'var(--dash-text-muted)', transition: 'font-size 0.3s ease' }}>
            <span>Completion: <strong style={{ color: portfolio.completionPercentage >= 80 ? '#22c55e' : 'var(--gold)' }}>{portfolio.completionPercentage}%</strong></span>
            <span>•</span>
            <span>{saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Unsaved changes'}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => updatePortfolio({ isPublished: !portfolio.isPublished })} style={{ padding: '8px 16px', borderRadius: '8px', border: portfolio.isPublished ? '1px solid #22c55e' : '1px solid var(--dash-border)', backgroundColor: 'transparent', color: portfolio.isPublished ? '#22c55e' : 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            {portfolio.isPublished ? <Globe size={16} /> : <Lock size={16} />}
            {portfolio.isPublished ? 'Published' : 'Draft'}
          </button>
          
          {portfolio.isPublished && (
            <button onClick={() => router.push(`/portfolio/${portfolio.usernameSlug}`)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Eye size={16} /> View Public
            </button>
          )}

          <button onClick={handleManualSave} disabled={saveStatus === 'saving'} style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Save size={16} /> {saveStatus === 'saving' ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', gap: '40px' }}>
        
        {/* Sidebar Tabs */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '160px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: activeTab === tab ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === tab ? '3px solid var(--gold)' : '3px solid transparent',
                  color: activeTab === tab ? 'var(--gold)' : 'var(--dash-text-muted)',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  borderRadius: '0 8px 8px 0',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', border: '1px solid var(--dash-border)', padding: '32px' }}>
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

      </div>
    </div>
  );
}
