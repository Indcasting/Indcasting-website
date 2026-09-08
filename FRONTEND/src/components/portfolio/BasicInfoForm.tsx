import React from "react";
import { BasicInfo } from "@/types/portfolio";
import { Camera, Image as ImageIcon, MapPin, Mail, Phone, Link2 } from "lucide-react";

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
    <div className="portfolio-section" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Cover Banner Area */}
      <div style={{ height: '220px', background: data.coverBanner ? `url(${data.coverBanner}) center/cover` : 'linear-gradient(to right, rgba(212,175,55,0.1), rgba(0,0,0,0.5))', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {!data.coverBanner && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
            <div style={{ textAlign: 'center' }}>
              <ImageIcon size={48} style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '0.85rem' }}>Upload Cover Image</div>
            </div>
          </div>
        )}
        <label style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }} className="hover:bg-opacity-80">
          <Camera size={16} /> Edit Cover
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "coverBanner")} style={{ display: 'none' }} />
        </label>

        {/* Floating Avatar */}
        <div style={{ position: 'absolute', bottom: '-40px', left: '40px', width: '100px', height: '100px', borderRadius: '50%', background: '#111', border: '4px solid #1a1a1a', overflow: 'hidden', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {data.profilePicture ? (
            <img src={data.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <UserIconPlaceholder />
          )}
          <label style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'opacity 0.2s' }} className="hover:opacity-100" onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}>
            <Camera size={24} color="#fff" />
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "profilePicture")} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      <div style={{ padding: '60px 40px 40px 40px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--gold)', fontWeight: 600 }}>Personal Identity</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div className="input-group">
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="fullName" value={data.fullName} onChange={handleChange} style={inputStyle} placeholder="E.g. Jane Doe" />
          </div>
          <div className="input-group">
            <label style={labelStyle}>Professional Title</label>
            <input type="text" name="professionalTitle" value={data.professionalTitle} onChange={handleChange} style={inputStyle} placeholder="E.g. Lead Actor & Voice Artist" />
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Bio / About Me</label>
          <textarea name="bio" value={data.bio} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Craft a compelling story about your professional journey..."></textarea>
        </div>

        <h3 style={{ fontSize: '1.2rem', margin: '32px 0 24px 0', color: 'var(--gold)', fontWeight: 600 }}>Contact & Links</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="input-group relative">
            <label style={labelStyle}>Location</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={16} color="#666" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input type="text" name="location" value={data.location} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '40px' }} placeholder="E.g. Mumbai, India" />
            </div>
          </div>
          
          <div className="input-group relative">
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#666" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input type="email" name="email" value={data.email} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '40px' }} placeholder="jane@example.com" />
            </div>
          </div>
          
          <div className="input-group relative">
            <label style={labelStyle}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} color="#666" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input type="tel" name="phone" value={data.phone} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '40px' }} placeholder="+91 9876543210" />
            </div>
          </div>

          <div className="input-group relative">
            <label style={labelStyle}>Portfolio / Website</label>
            <div style={{ position: 'relative' }}>
              <Link2 size={16} color="#666" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input type="url" name="website" value={data.website} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '40px' }} placeholder="https://yourwebsite.com" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#aaa', fontWeight: 500, letterSpacing: '0.02em' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'all 0.2s', fontSize: '0.95rem' };

function UserIconPlaceholder() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
