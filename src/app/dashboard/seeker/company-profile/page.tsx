"use client";

import { useState } from "react";
import { Building, MapPin, Globe, CheckCircle, Camera } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--dash-text-main)' }}>Company Profile</h2>
          <p style={{ color: 'var(--dash-text-muted)', marginTop: '8px', fontSize: '1.05rem' }}>Manage how talents see your production house.</p>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className={isEditing ? "dash-btn-outline" : "dash-btn-primary"} style={{ padding: '10px 24px', borderRadius: '8px' }}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="col-span-4 dashboard-card-ui" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '24px', backgroundColor: 'var(--dash-hover-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Building size={48} color="var(--dash-gold)" />
          </div>
          {isEditing && (
            <button style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--dash-gold)', color: '#000', border: '4px solid var(--dash-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={18} />
            </button>
          )}
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Star Studios <CheckCircle size={18} color="#10b981" />
        </h3>
        <p style={{ color: 'var(--dash-text-muted)', margin: '0 0 16px 0', fontWeight: 500 }}>Film & Advertising Production</p>
        
        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--dash-border)', margin: '16px 0' }}></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dash-text-main)', fontSize: '0.95rem' }}>
            <MapPin size={18} color="var(--dash-text-muted)" /> Mumbai, India
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dash-text-main)', fontSize: '0.95rem' }}>
            <Globe size={18} color="var(--dash-text-muted)" /> www.starstudios.com
          </div>
        </div>
      </div>

      <div className="col-span-8">
        <DashboardCard title="About Company">
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '8px' }}>Company Name</label>
                <input type="text" defaultValue="Star Studios" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '8px' }}>Industry</label>
                  <input type="text" defaultValue="Film & Advertising Production" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '8px' }}>Location</label>
                  <input type="text" defaultValue="Mumbai, India" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '8px' }}>Description</label>
                <textarea defaultValue="Star Studios is a premier production house based in Mumbai..." style={{ width: '100%', minHeight: '120px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button onClick={() => setIsEditing(false)} className="dash-btn-outline" style={{ padding: '10px 24px', borderRadius: '8px' }}>Cancel</button>
                <button onClick={() => setIsEditing(false)} className="dash-btn-primary" style={{ padding: '10px 24px', borderRadius: '8px' }}>Save Changes</button>
              </div>
            </div>
          ) : (
            <div style={{ lineHeight: 1.6, color: 'var(--dash-text-muted)' }}>
              <p>Star Studios is a premier production house based in Mumbai. We specialize in creating high-quality indie films, commercial advertisements, and music videos. Our team is dedicated to discovering new talent and bringing unique stories to life.</p>
              <p>Founded in 2018, we have worked with some of the biggest brands in the country and our films have been featured in international festivals. We are always on the lookout for passionate actors, models, and voice artists to join our projects.</p>
            </div>
          )}
        </DashboardCard>
      </div>
    </div>
  );
}
