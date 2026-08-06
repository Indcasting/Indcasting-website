import React from "react";
import { Certification } from "@/types/portfolio";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

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
    onChange([...data, newCert]);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: 0 }}>Certifications</h3>
        <button onClick={handleAdd} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--gold)', border: '1px solid var(--gold)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.map((cert, index) => (
          <div key={cert.id} style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', position: 'relative' }}>
            <button onClick={() => handleRemove(cert.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
            
            <h4 style={{ margin: '0 0 16px 0', color: 'var(--dash-text-main)' }}>Certificate #{index + 1}</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Certificate Name</label>
                <input type="text" value={cert.name} onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. Best Actor Award" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Issuing Organization</label>
                <input type="text" value={cert.organization} onChange={(e) => handleUpdate(cert.id, 'organization', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. Film Academy" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Credential URL (Optional)</label>
                <input type="url" value={cert.credentialUrl} onChange={(e) => handleUpdate(cert.id, 'credentialUrl', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="https://..." />
              </div>
              <div style={{ width: '150px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Issue Date</label>
                <input type="month" value={cert.issueDate} onChange={(e) => handleUpdate(cert.id, 'issueDate', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Upload Certificate (Image)</label>
              {cert.certificateImage ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={cert.certificateImage} alt="Certificate" style={{ height: '80px', borderRadius: '8px', border: '1px solid var(--dash-border)' }} />
                  <button onClick={() => handleUpdate(cert.id, 'certificateImage', '')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Remove Image</button>
                </div>
              ) : (
                <div style={{ width: '120px', height: '80px', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
                  <ImageIcon size={24} color="var(--dash-text-muted)" />
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(cert.id, e)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
              )}
            </div>

          </div>
        ))}
        {data.length === 0 && <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>No certificates added yet.</p>}
      </div>
    </div>
  );
}
