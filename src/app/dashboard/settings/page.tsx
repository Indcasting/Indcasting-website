"use client";

import { User, Bell, Lock, Globe, CheckCircle2, Loader2, ShieldCheck, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const router = useRouter();

  // Profile Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);
  const [securitySaved, setSecuritySaved] = useState(false);
  const [securityError, setSecurityError] = useState("");

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

  const handleSaveProfile = () => {
    if (user) {
      setIsSavingProfile(true);
      setTimeout(() => {
        const updated = {
          ...user,
          name: `${firstName} ${lastName}`.trim(),
          email,
          bio,
        };
        updateUser(user.email, updated);
        setUser(updated);
        setIsSavingProfile(false);
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
      }, 1000);
    }
  };

  const handleSaveSecurity = () => {
    setSecurityError("");
    if (!currentPassword) {
      setSecurityError("Current password is required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityError("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setSecurityError("Password must be at least 8 characters");
      return;
    }
    
    setIsSavingSecurity(true);
    setTimeout(() => {
      setIsSavingSecurity(false);
      setSecuritySaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSecuritySaved(false), 3000);
    }, 1200);
  };

  const handleNotificationsClick = () => {
    if (user?.role === 'seeker') {
      router.push('/dashboard/seeker/notifications');
    } else {
      router.push('/dashboard/notifications');
    }
  };

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Settings</h2>
        <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Manage your account preferences.</p>
      </div>

      <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button 
          onClick={() => setActiveTab('profile')}
          className="dashboard-card-ui" 
          style={{ 
            padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', 
            color: activeTab === 'profile' ? 'var(--gold)' : 'var(--dash-text-muted)', 
            fontWeight: activeTab === 'profile' ? 600 : 500, 
            cursor: 'pointer', textAlign: 'left', 
            borderLeft: activeTab === 'profile' ? '4px solid var(--gold)' : '4px solid transparent',
            backgroundColor: activeTab === 'profile' ? 'rgba(232, 169, 58, 0.05)' : 'var(--dash-bg-card)',
            transition: 'all 0.2s ease'
          }}
        >
          <User size={18} /> Profile Info
        </button>
        <button 
          onClick={handleNotificationsClick}
          className="dashboard-card-ui" 
          style={{ padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dash-text-muted)', fontWeight: 500, cursor: 'pointer', textAlign: 'left', borderLeft: '4px solid transparent' }}
        >
          <Bell size={18} /> Notifications
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className="dashboard-card-ui" 
          style={{ 
            padding: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', 
            color: activeTab === 'security' ? 'var(--gold)' : 'var(--dash-text-muted)', 
            fontWeight: activeTab === 'security' ? 600 : 500, 
            cursor: 'pointer', textAlign: 'left', 
            borderLeft: activeTab === 'security' ? '4px solid var(--gold)' : '4px solid transparent',
            backgroundColor: activeTab === 'security' ? 'rgba(232, 169, 58, 0.05)' : 'var(--dash-bg-card)',
            transition: 'all 0.2s ease'
          }}
        >
          <Lock size={18} /> Security
        </button>
      </div>

      <div className="col-span-8 dashboard-card-ui" style={{ padding: '32px' }}>
        {activeTab === 'profile' ? (
          <>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '16px' }}>
                <button 
                  onClick={handleSaveProfile} 
                  disabled={isSavingProfile}
                  className="dash-btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isSavingProfile ? 0.8 : 1 }}
                >
                  {isSavingProfile ? (
                    <><Loader2 size={18} className="animate-spin" /> Saving...</>
                  ) : profileSaved ? (
                    <><CheckCircle2 size={18} /> Saved!</>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(232, 169, 58, 0.1)', color: 'var(--gold)' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>Security & Password</h3>
                <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Keep your account secure by updating your password regularly.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {securityError && (
                <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.9rem', fontWeight: 500 }}>
                  {securityError}
                </div>
              )}
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Current Password</label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ height: '1px', backgroundColor: 'var(--dash-border)', margin: '8px 0' }}></div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '16px' }}>
                <button 
                  onClick={handleSaveSecurity} 
                  disabled={isSavingSecurity}
                  className="dash-btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isSavingSecurity ? 0.8 : 1 }}
                >
                  {isSavingSecurity ? (
                    <><Loader2 size={18} className="animate-spin" /> Updating...</>
                  ) : securitySaved ? (
                    <><CheckCircle2 size={18} /> Password Updated!</>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
