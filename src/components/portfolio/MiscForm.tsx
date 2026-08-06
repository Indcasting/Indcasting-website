import React from "react";
import { SocialLinks, PrivacyControls } from "@/types/portfolio";
import { Upload } from "lucide-react";

interface Props {
  social: SocialLinks;
  onSocialChange: (data: SocialLinks) => void;
  privacy: PrivacyControls;
  onPrivacyChange: (data: PrivacyControls) => void;
  resume: string;
  onResumeChange: (base64: string) => void;
}

export default function MiscForm({ social, onSocialChange, privacy, onPrivacyChange, resume, onResumeChange }: Props) {
  
  const handleSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSocialChange({ ...social, [e.target.name]: e.target.value });
  };

  const handlePrivacy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPrivacyChange({ ...privacy, [e.target.name]: e.target.value as any });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        onResumeChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="portfolio-section">
      
      {/* Resume Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '16px' }}>Resume</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1, padding: '20px', border: '1px dashed var(--dash-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative' }}>
            <Upload size={32} color="var(--dash-text-muted)" />
            <span style={{ color: 'var(--dash-text-main)' }}>{resume ? "Resume Uploaded (PDF)" : "Upload Resume (PDF Only)"}</span>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
          </div>
          {resume && (
            <button onClick={() => onResumeChange("")} style={{ padding: '8px 16px', background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer' }}>
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '16px' }}>Social Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {Object.keys(social).map((key) => (
            <div key={key}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)', textTransform: 'capitalize' }}>{key}</label>
              <input type="url" name={key} value={social[key as keyof SocialLinks]} onChange={handleSocial} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder={`https://${key}.com/...`} />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Controls Section */}
      <div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '16px' }}>Privacy Controls</h3>
        <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Control who can see specific parts of your portfolio.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {Object.keys(privacy).map((key) => (
            <div key={key}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)', textTransform: 'capitalize' }}>{key} Visibility</label>
              <select name={key} value={privacy[key as keyof PrivacyControls]} onChange={handlePrivacy} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }}>
                <option value="Public">Public</option>
                <option value="Recruiters Only">Recruiters Only</option>
                <option value="Private">Private</option>
              </select>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
