"use client";

import { useState, useEffect } from "react";
import { BriefcaseBusiness, Users, Star, Video, MessageSquare, TrendingUp, ChevronRight, Activity, PlusCircle, Calendar } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";

export default function SeekerDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      {/* Header Section */}
      <div className="col-span-12" style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: 'var(--dash-text-main)' }}>
            Welcome back, {user?.name ? user.name.split(" ")[0] : "Director"}!
          </h1>
          <p style={{ color: 'var(--dash-text-muted)', marginTop: '4px', fontSize: '15px' }}>
            Here is what's happening with your casting calls today.
          </p>
        </div>
        <button 
          className="dash-btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
          onClick={() => router.push('/dashboard/seeker/casting-calls')}
        >
          <PlusCircle size={20} />
          Create Casting Call
        </button>
      </div>

      {/* Mini Stats Row - First 4 */}
      <div className="col-span-3 dashboard-card-ui" 
           style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
           onClick={() => router.push('/dashboard/seeker/casting-calls')}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <BriefcaseBusiness size={24} />
          </div>
          <div className="stat-content">
            <h3>8</h3>
            <p>Active Calls</p>
          </div>
        </div>
      </div>

      <div className="col-span-3 dashboard-card-ui"
           style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
           onClick={() => router.push('/dashboard/seeker/applications')}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>142</h3>
            <p>Total Applications</p>
          </div>
        </div>
      </div>

      <div className="col-span-3 dashboard-card-ui"
           style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
           onClick={() => router.push('/dashboard/seeker/shortlisted')}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: 'var(--dash-gold)', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
            <Star size={24} />
          </div>
          <div className="stat-content">
            <h3>24</h3>
            <p>Shortlisted</p>
          </div>
        </div>
      </div>

      <div className="col-span-3 dashboard-card-ui"
           style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
           onClick={() => router.push('/dashboard/seeker/auditions')}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
            <Video size={24} />
          </div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Scheduled Auditions</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="col-span-8">
        
        {/* Performance Chart / Hiring Analytics */}
        <DashboardCard 
          title="Applications Received (Last 7 Days)" 
          action={
            <button 
              onClick={() => router.push('/dashboard/seeker/analytics')}
              style={{ background: 'none', border: 'none', color: 'var(--dash-gold)', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
            >
              View Analytics
            </button>
          }
        >
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '16px', paddingTop: '20px' }}>
            {/* Mock Chart */}
            {[20, 35, 25, 45, 60, 40, 75].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${h}%`, 
                  backgroundColor: i === 6 ? 'var(--dash-gold)' : 'var(--dash-border)',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.3s ease'
                }}></div>
                <span style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div style={{ marginTop: '24px' }}>
          <DashboardCard title="Recent Applications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: "Aria Sharma", role: "Lead Actor", time: "2 hours ago", status: "New", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
                { name: "Rahul Verma", role: "Supporting Role", time: "5 hours ago", status: "Reviewed", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
                { name: "Neha Singh", role: "Fashion Model", time: "1 day ago", status: "Shortlisted", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" }
              ].map((app, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--dash-border)', borderRadius: '12px', cursor: 'pointer', transition: 'background 0.2s ease' }} className="hover-bg-card">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--dash-hover-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <UserPlaceholder size={24} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--dash-text-main)' }}>{app.name}</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--dash-text-muted)' }}>Applied for: <strong>{app.role}</strong> • {app.time}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ padding: '6px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, color: app.color, backgroundColor: app.bg }}>
                      {app.status}
                    </span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dash-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => router.push('/dashboard/seeker/applications')}
              style={{ marginTop: '16px', width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dash-hover-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              View All Applications
            </button>
          </DashboardCard>
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <DashboardCard title="Upcoming Auditions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { role: "Commercial Lead", candidate: "Aria Sharma", time: "Today, 2:00 PM" },
              { role: "Fashion Shoot", candidate: "Neha Singh", time: "Tomorrow, 10:30 AM" },
              { role: "Supporting Actor", candidate: "Rahul Verma", time: "Thursday, 4:00 PM" }
            ].map((aud, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingBottom: i !== 2 ? '16px' : '0', borderBottom: i !== 2 ? '1px solid var(--dash-border)' : 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={18} color="var(--dash-gold)" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>{aud.role}</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--dash-text-main)' }}>with {aud.candidate}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--dash-text-muted)' }}>{aud.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => router.push('/dashboard/seeker/auditions')}
            style={{ marginTop: '16px', width: '100%', padding: '10px', background: 'transparent', border: '1px solid var(--dash-border)', borderRadius: '8px', color: 'var(--dash-text-main)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dash-hover-bg)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Manage Schedule
          </button>
        </DashboardCard>

        <DashboardCard title="Quick Actions">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button 
              onClick={() => router.push('/dashboard/seeker/casting-calls')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--dash-hover-bg)'; e.currentTarget.style.borderColor = '#3b82f6'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--dash-surface)'; e.currentTarget.style.borderColor = 'var(--dash-border)'; }}
            >
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <PlusCircle size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Post Job</span>
            </button>
            <button 
              onClick={() => router.push('/messages')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--dash-hover-bg)'; e.currentTarget.style.borderColor = '#8b5cf6'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--dash-surface)'; e.currentTarget.style.borderColor = 'var(--dash-border)'; }}
            >
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                <MessageSquare size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Messages (3)</span>
            </button>
            <button 
              onClick={() => router.push('/dashboard/seeker/company-profile')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--dash-hover-bg)'; e.currentTarget.style.borderColor = '#10b981'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--dash-surface)'; e.currentTarget.style.borderColor = 'var(--dash-border)'; }}
            >
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Activity size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Update Profile</span>
            </button>
            <button 
              onClick={() => router.push('/dashboard/seeker/shortlisted')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--dash-hover-bg)'; e.currentTarget.style.borderColor = 'var(--dash-gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--dash-surface)'; e.currentTarget.style.borderColor = 'var(--dash-border)'; }}
            >
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--dash-gold)' }}>
                <Star size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Shortlisted</span>
            </button>
          </div>
        </DashboardCard>

      </div>
    </div>
  );
}

function UserPlaceholder({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--dash-text-muted)' }}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
