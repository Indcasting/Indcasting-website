"use client";

import { User, Bell, Lock, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      const names = currentUser.name.split(" ");
      setFirstName(names[0] || "");
      setLastName(names.slice(1).join(" ") || "");
      setEmail(currentUser.email);
      setBio(currentUser.bio || "Passionate actor with 5 years of experience in theatre and independent films...");
    }
  }, []);

  const handleSave = () => {
    if (user) {
      const updated = {
        ...user,
        name: `${firstName} ${lastName}`.trim(),
        email,
        bio,
      };
      updateUser(user.email, updated);
      setUser(updated);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    }
  };

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Settings</h2>
        <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Manage your account preferences.</p>
      </div>

      <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button className="dashboard-card-ui" style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--gold)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', borderLeft: '4px solid var(--gold)' }}>
          <User size={18} /> Profile Info
        </button>
        <button className="dashboard-card-ui" style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dash-text-muted)', fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}>
          <Bell size={18} /> Notifications
        </button>
        <button className="dashboard-card-ui" style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dash-text-muted)', fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}>
          <Lock size={18} /> Security
        </button>
      </div>

      <div className="col-span-8 dashboard-card-ui" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 24px 0', color: 'var(--dash-text-main)' }}>Profile Information</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Bio</label>
            <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none', resize: 'vertical' }}></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            {savedMessage ? <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Profile saved successfully!</span> : <span></span>}
            <button onClick={handleSave} style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--gold)', color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}>Save Changes</button>
          </div>
        </div>
      </div>

    </div>
  );
}
