"use client";

import { FileText, Calendar, Video, MessageSquare, TrendingUp, ChevronRight } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

export default function TalentDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      {/* Header Section */}
      <div className="col-span-12" style={{ marginBottom: '8px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: 'var(--dash-text-main)' }}>
          Welcome back, {user?.name ? user.name.split(" ")[0] : "Abhiroop"}!
        </h1>
        <p style={{ color: 'var(--dash-text-muted)', marginTop: '4px', fontSize: '15px' }}>
          Here is what's happening with your casting applications today.
        </p>
      </div>

      {/* Mini Stats Row */}
      <div className="col-span-3 dashboard-card-ui">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Applications</p>
          </div>
        </div>
      </div>

      <div className="col-span-3 dashboard-card-ui">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <Video size={24} />
          </div>
          <div className="stat-content">
            <h3>4</h3>
            <p>Upcoming Auditions</p>
          </div>
        </div>
      </div>

      <div className="col-span-3 dashboard-card-ui">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>5</h3>
            <p>New Messages</p>
          </div>
        </div>
      </div>

      <div className="col-span-3 dashboard-card-ui">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ color: 'var(--dash-gold)', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>89%</h3>
            <p>Profile Strength</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="col-span-8">
        <DashboardCard 
          title="Performance Analytics" 
          action={<button style={{ background: 'none', border: 'none', color: 'var(--dash-gold)', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>View Full Report</button>}
        >
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '16px', paddingTop: '20px' }}>
            {/* Mock Chart */}
            {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${h}%`, 
                  backgroundColor: i === 5 ? 'var(--dash-gold)' : 'var(--dash-border)',
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
                { role: "Lead Actor", prod: "Dream Studio", status: "In Review", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
                { role: "Fashion Model", prod: "Elite Models", status: "Shortlisted", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
                { role: "Background Dancer", prod: "Rhythm Productions", status: "Rejected", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" }
              ].map((app, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--dash-border)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--dash-hover-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Video size={20} color="var(--dash-text-muted)" />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--dash-text-main)' }}>{app.role}</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--dash-text-muted)' }}>{app.prod}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ padding: '6px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, color: app.color, backgroundColor: app.bg }}>
                      {app.status}
                    </span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dash-text-muted)' }}>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <DashboardCard title="Profile Completion">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--dash-text-main)', fontWeight: 500 }}>89% Complete</span>
              <span style={{ fontSize: '12px', color: 'var(--dash-gold)' }}>Excellent</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--dash-border)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '89%', height: '100%', backgroundColor: 'var(--dash-gold)', borderRadius: '99px' }}></div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--dash-text-muted)', margin: 0, marginTop: '8px' }}>
              Add a showreel to increase your chances of being cast by 40%.
            </p>
            <button style={{ marginTop: '8px', width: '100%', padding: '10px', backgroundColor: 'var(--dash-hover-bg)', color: 'var(--dash-text-main)', border: '1px solid var(--dash-border)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Update Profile
            </button>
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming Auditions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { role: "Commercial Lead", time: "Tomorrow, 10:00 AM" },
              { role: "Fashion Shoot", time: "Friday, 2:30 PM" }
            ].map((aud, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={18} color="var(--dash-gold)" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>{aud.role}</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--dash-text-muted)' }}>{aud.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

      </div>
    </div>
  );
}