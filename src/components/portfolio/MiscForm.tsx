import React from "react";
import { SocialLinks, PrivacyControls } from "@/types/portfolio";
import { Upload, Link2, Lock, Shield, Eye, FileText, Download } from "lucide-react";

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
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: '0 0 8px 0', fontWeight: 600 }}>Professional Assets</h3>
        <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>Manage your resume, social presence, and privacy settings.</p>
      </div>
      
      {/* Resume Section */}
      <div style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <FileText size={20} color="var(--gold)" />
          <h4 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 600 }}>Resume / CV</h4>
        </div>
        
        {resume ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                <FileText size={20} />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Resume.pdf</div>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>Uploaded</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={resume} download="Resume.pdf" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} className="hover:bg-white/20">
                <Download size={16} />
              </a>
              <button onClick={() => onResumeChange("")} style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-red-500/20">
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:border-yellow-600/50 hover:bg-yellow-900/5 group">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} className="group-hover:bg-yellow-600/20 group-hover:text-yellow-500 text-gray-400">
              <Upload size={28} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>Click to upload Resume</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>PDF format only</div>
            </div>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} style={{ display: 'none' }} />
          </label>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Social Links Section */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Link2 size={20} color="var(--gold)" />
            <h4 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 600 }}>Social Profiles</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(social).map((key) => (
              <div key={key} className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#aaa', fontWeight: 500, textTransform: 'capitalize' }}>{key}</label>
                <div style={{ position: 'relative' }}>
                  <Link2 size={14} color="#666" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input type="url" name={key} value={social[key as keyof SocialLinks]} onChange={handleSocial} style={{ ...inputStyle, paddingLeft: '36px' }} placeholder={`https://${key}.com/in/...`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Controls Section */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Shield size={20} color="var(--gold)" />
            <h4 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 600 }}>Privacy & Visibility</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(privacy).map((key) => (
              <div key={key} className="input-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', textTransform: 'capitalize', marginBottom: '4px' }}>{key}</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Control who can see this</div>
                </div>
                <div style={{ position: 'relative' }}>
                  <select name={key} value={privacy[key as keyof PrivacyControls]} onChange={handlePrivacy} style={{ ...inputStyle, width: '140px', cursor: 'pointer', appearance: 'none', paddingRight: '32px' }}>
                    <option value="Public">Public</option>
                    <option value="Recruiters Only">Recruiters Only</option>
                    <option value="Private">Private</option>
                  </select>
                  <Eye size={14} color="#666" style={{ position: 'absolute', right: '12px', top: '12px', pointerEvents: 'none' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'all 0.2s', fontSize: '0.9rem' };
