import React from "react";
import { BasicInfo } from "@/types/portfolio";
import { Camera, Image as ImageIcon } from "lucide-react";

interface Props {
  data: BasicInfo;
  onChange: (data: BasicInfo) => void;
}

export default function BasicInfoForm({ data, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "profilePicture" | "coverBanner") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="portfolio-section">
      <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--gold)' }}>Basic Information</h3>
      
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-main)', fontSize: '0.9rem' }}>Cover Banner</label>
          <div style={{ height: '120px', backgroundColor: 'var(--dash-bg)', borderRadius: '8px', border: '1px dashed var(--dash-border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data.coverBanner ? (
              <img src={data.coverBanner} alt="Cover Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <ImageIcon size={32} color="var(--dash-text-muted)" />
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "coverBanner")} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
          </div>
        </div>
        
        <div style={{ width: '120px', flexShrink: 0 }}>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-main)', fontSize: '0.9rem' }}>Profile Picture</label>
          <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--dash-bg)', borderRadius: '50%', border: '1px dashed var(--dash-border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data.profilePicture ? (
              <img src={data.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Camera size={32} color="var(--dash-text-muted)" />
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "profilePicture")} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Full Name</label>
          <input type="text" name="fullName" value={data.fullName} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. Jane Doe" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Professional Title</label>
          <input type="text" name="professionalTitle" value={data.professionalTitle} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. Senior Fashion Model" />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Bio / About Me</label>
        <textarea name="bio" value={data.bio} onChange={handleChange} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', resize: 'vertical' }} placeholder="Tell us about yourself..."></textarea>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Location</label>
          <input type="text" name="location" value={data.location} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. Mumbai, India" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Email</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. jane@example.com" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Phone Number</label>
          <input type="tel" name="phone" value={data.phone} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="+91 9876543210" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Website / Portfolio URL</label>
          <input type="url" name="website" value={data.website} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="https://janedoe.com" />
        </div>
      </div>
    </div>
  );
}
