"use client";

import { User, Bell, Lock, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";

export default function SeekerSettings() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.email);
      setPassword(currentUser.password || "");
    }
  }, []);

  const handleSave = () => {
    if (user) {
      const updated = {
        ...user,
        email,
        password,
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
        <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Manage your account preferences and security.</p>
      </div>

      <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button onClick={() => router.push('/dashboard/seeker/company-profile')} className="dashboard-card-ui" style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dash-text-muted)', fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}>
          <Building size={18} /> Company Profile
        </button>
        <button className="dashboard-card-ui" style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dash-text-muted)', fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}>
          <Bell size={18} /> Notifications
        </button>
        <button className="dashboard-card-ui" style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--gold)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', borderLeft: '4px solid var(--gold)' }}>
          <Lock size={18} /> Security
        </button>
      </div>

      <div className="col-span-8 dashboard-card-ui" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 24px 0', color: 'var(--dash-text-main)' }}>Security Settings</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Account Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            {savedMessage ? <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Settings saved successfully!</span> : <span></span>}
            <button onClick={handleSave} className="dash-btn-primary">Update Security</button>
          </div>

          <div style={{ borderTop: '1px solid var(--dash-border)', marginTop: '24px', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0', color: '#ef4444' }}>Danger Zone</h3>
            <p style={{ color: 'var(--dash-text-muted)', margin: '0 0 16px 0', fontSize: '0.9rem' }}>Once you delete your account, there is no going back. Please be certain.</p>
            <button style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ef4444', backgroundColor: 'transparent', color: '#ef4444', fontWeight: 600, cursor: 'pointer' }}>Delete Account</button>
          </div>
        </div>
      </div>

    </div>
  );
}
