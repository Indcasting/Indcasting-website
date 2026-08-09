"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPortfolioBySlug } from "@/utils/portfolioStorage";
import { PortfolioData } from "@/types/portfolio";
import { validateUrl } from "@/utils/security";
import { Mail, Phone, MapPin, ExternalLink, Download, Award, Briefcase, GraduationCap, CheckCircle, Globe, Link2, Camera, MessageSquare, PlayCircle, Code } from "lucide-react";
import Header from "@/components/Header";

export default function PublicPortfolioPage() {
  const { username } = useParams();
  const router = useRouter();
  
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof username === "string") {
      const data = getPortfolioBySlug(username);
      if (data) {
        setPortfolio(data);
      }
      setIsLoading(false);
    }
  }, [username]);

  if (isLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading Portfolio...</p></div>;
  }

  if (!portfolio) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '16px' }}>Portfolio Not Found</h1>
        <p style={{ color: 'var(--dash-text-muted)', marginBottom: '32px' }}>This portfolio either doesn't exist or is currently private.</p>
        <button onClick={() => router.push("/")} style={{ padding: '12px 24px', backgroundColor: 'var(--gold)', color: '#000', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Return Home</button>
      </div>
    );
  }

  const { basicInfo, skills, experience, projects, education, certifications, socialLinks, privacyControls, resume } = portfolio;

  // Simple privacy check
  const isVisible = (control: keyof typeof privacyControls) => {
    const val = privacyControls[control];
    if (val === "Private") return false;
    // For Recruiter Only, in a real app we'd check if currentUser.role === 'seeker'. We'll assume Public for display here unless Private.
    return true; 
  };

  return (
    <div style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)', minHeight: '100vh' }}>
      <Header />
      
      {/* Hero / Banner */}
      <div style={{ paddingTop: '70px', position: 'relative' }}>
        <div style={{ width: '100%', height: '350px', backgroundColor: '#111', backgroundImage: basicInfo.coverBanner ? `url(${basicInfo.coverBanner})` : 'linear-gradient(45deg, #111, #222)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1), transparent)' }}></div>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', position: 'relative', marginTop: '-120px' }}>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '6px solid var(--cream)', backgroundColor: '#333', overflow: 'hidden', flexShrink: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              {basicInfo.profilePicture ? (
                <img src={basicInfo.profilePicture} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: '#666' }}>{basicInfo.fullName?.[0]}</div>
              )}
            </div>
            
            <div style={{ flex: 1, paddingBottom: '16px' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{basicInfo.fullName}</h1>
              <p style={{ fontSize: '1.4rem', color: 'var(--gold)', margin: '0 0 16px 0', fontWeight: 600 }}>{basicInfo.professionalTitle}</p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: '#ccc', fontSize: '0.95rem' }}>
                {basicInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {basicInfo.location}</span>}
                {basicInfo.email && isVisible('email') && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={16} /> {basicInfo.email}</span>}
                {basicInfo.phone && isVisible('phone') && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={16} /> {basicInfo.phone}</span>}
              </div>
            </div>
            
            <div style={{ paddingBottom: '16px', display: 'flex', gap: '12px' }}>
              <button style={{ padding: '12px 24px', backgroundColor: 'var(--gold)', color: '#000', borderRadius: '30px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} /> Contact
              </button>
              {resume && isVisible('resume') && (
                <a href={resume} download={`${basicInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`} style={{ padding: '12px 24px', backgroundColor: 'transparent', color: 'var(--ink)', border: '2px solid var(--ink)', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Download size={18} /> Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          
          {/* About */}
          {basicInfo.bio && (
            <section>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', display: 'inline-block' }}>About Me</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--mid)', whiteSpace: 'pre-wrap' }}>{basicInfo.bio}</p>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && isVisible('projects') && (
            <section>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', display: 'inline-block' }}>Featured Projects</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                {projects.map(p => (
                  <div key={p.id} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--input-border)', backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    {p.images && p.images[0] && (
                      <div style={{ width: '100%', height: '200px', backgroundImage: `url(${p.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    )}
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{p.title}</h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {p.githubLink && <a href={validateUrl(p.githubLink)} target="_blank" rel="noreferrer" style={{ color: 'var(--mid)' }}><Code size={20} /></a>}
                          {p.liveDemoLink && <a href={validateUrl(p.liveDemoLink)} target="_blank" rel="noreferrer" style={{ color: 'var(--mid)' }}><ExternalLink size={20} /></a>}
                        </div>
                      </div>
                      <p style={{ color: 'var(--mid)', lineHeight: 1.6, marginBottom: '16px' }}>{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', display: 'inline-block' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0' }}>{exp.role}</h3>
                      <p style={{ color: 'var(--gold)', fontWeight: 600, margin: '0 0 8px 0' }}>{exp.company}</p>
                      <p style={{ fontSize: '0.9rem', color: '#888', margin: '0 0 12px 0' }}>{exp.startDate} - {exp.endDate || 'Present'} • {exp.employmentType}</p>
                      <p style={{ color: 'var(--mid)', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', display: 'inline-block' }}>Education</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0' }}>{edu.institution}</h3>
                      <p style={{ color: 'var(--gold)', fontWeight: 600, margin: '0 0 4px 0' }}>{edu.degree} in {edu.specialization}</p>
                      <p style={{ fontSize: '0.9rem', color: '#888', margin: '0 0 0 0' }}>{edu.startYear} - {edu.endYear} {edu.score && `• Score: ${edu.score}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--input-border)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 16px 0' }}>Top Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {skills.map(skill => (
                  <span key={skill.id} style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 600, border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Socials */}
          {isVisible('socialLinks') && Object.values(socialLinks).some(val => val) && (
            <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--input-border)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 16px 0' }}>Connect</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {socialLinks.linkedin && <a href={validateUrl(socialLinks.linkedin)} target="_blank" rel="noreferrer" style={{ color: 'var(--ink)' }} title="LinkedIn"><Briefcase size={24} /></a>}
                {socialLinks.github && <a href={validateUrl(socialLinks.github)} target="_blank" rel="noreferrer" style={{ color: 'var(--ink)' }} title="GitHub"><Code size={24} /></a>}
                {socialLinks.twitter && <a href={validateUrl(socialLinks.twitter)} target="_blank" rel="noreferrer" style={{ color: 'var(--ink)' }} title="Twitter / X"><MessageSquare size={24} /></a>}
                {socialLinks.instagram && <a href={validateUrl(socialLinks.instagram)} target="_blank" rel="noreferrer" style={{ color: 'var(--ink)' }} title="Instagram"><Camera size={24} /></a>}
                {socialLinks.youtube && <a href={validateUrl(socialLinks.youtube)} target="_blank" rel="noreferrer" style={{ color: 'var(--ink)' }} title="YouTube"><PlayCircle size={24} /></a>}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--input-border)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 16px 0' }}>Certifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {certifications.map(cert => (
                  <div key={cert.id} style={{ display: 'flex', gap: '12px' }}>
                    <Award size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 600 }}>{cert.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--mid)' }}>{cert.organization} • {cert.issueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
      
    </div>
  );
}
