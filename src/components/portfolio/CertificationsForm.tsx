import React from "react";
import { Certification } from "@/types/portfolio";
import { Plus, Trash2, Image as ImageIcon, Award, ExternalLink } from "lucide-react";

interface Props {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsForm({ data, onChange }: Props) {
  const handleAdd = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      organization: "",
      issueDate: "",
      credentialId: "",
      credentialUrl: "",
      certificateImage: ""
    };
    onChange([newCert, ...data]);
  };

  const handleUpdate = (id: string, field: keyof Certification, value: string) => {
    onChange(data.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(c => c.id !== id));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate(id, 'certificateImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="portfolio-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: '0 0 8px 0', fontWeight: 600 }}>Awards & Certifications</h3>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>Highlight your achievements and credentials.</p>
        </div>
        <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'var(--gold)', color: '#000', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:-translate-y-1 hover:shadow-lg">
          <Plus size={18} strokeWidth={2.5} /> Add Certificate
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {data.map((cert) => (
          <div key={cert.id} style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative', transition: 'all 0.3s' }} className="hover:border-yellow-600/50 hover:shadow-2xl hover:shadow-yellow-900/10 group">
            
            {/* Top Bar with Icon and Remove */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to right, rgba(212,175,55,0.05), transparent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)' }}>
                <Award size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Credential</span>
              </div>
              <button onClick={() => handleRemove(cert.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0, transition: 'all 0.2s', padding: '4px' }} className="group-hover:opacity-100 hover:bg-red-500/20 rounded-full">
                <Trash2 size={16} />
              </button>
            </div>
            
            {/* Image Preview / Upload Area */}
            <div style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                {cert.certificateImage ? (
                  <img src={cert.certificateImage} alt="Certificate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon size={24} color="rgba(255,255,255,0.2)" />
                )}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(cert.id, e)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} title="Upload Certificate Image" />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="text" 
                  value={cert.name} 
                  onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)} 
                  style={{ ...inputStyle, padding: '8px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', borderRadius: 0, fontSize: '1.05rem', fontWeight: 600, color: '#fff' }} 
                  placeholder="Certificate Name" 
                  className="focus:border-yellow-600 focus:bg-black/20"
                />
                <input 
                  type="text" 
                  value={cert.organization} 
                  onChange={(e) => handleUpdate(cert.id, 'organization', e.target.value)} 
                  style={{ ...inputStyle, padding: '8px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', borderRadius: 0, fontSize: '0.9rem' }} 
                  placeholder="Issuing Organization" 
                  className="focus:border-yellow-600 focus:bg-black/20"
                />
              </div>
            </div>

            <div style={{ padding: '0 20px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Issue Date</label>
                <input type="month" value={cert.issueDate} onChange={(e) => handleUpdate(cert.id, 'issueDate', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ position: 'relative' }}>
                <label style={labelStyle}>URL (Optional)</label>
                <ExternalLink size={14} color="#666" style={{ position: 'absolute', left: '10px', bottom: '11px' }} />
                <input type="url" value={cert.credentialUrl} onChange={(e) => handleUpdate(cert.id, 'credentialUrl', e.target.value)} style={{ ...inputStyle, paddingLeft: '32px' }} placeholder="https://..." />
              </div>
            </div>
            
          </div>
        ))}
        {data.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <Award size={48} color="rgba(255,255,255,0.1)" style={{ margin: '0 auto 16px auto' }} />
            <p style={{ color: '#888', fontSize: '1rem', margin: '0 0 8px 0' }}>No credentials added yet.</p>
            <p style={{ color: '#555', fontSize: '0.85rem', margin: 0 }}>Add certifications to build trust and authority.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.8rem', color: '#888', fontWeight: 500, letterSpacing: '0.02em' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'all 0.2s', fontSize: '0.9rem' };
