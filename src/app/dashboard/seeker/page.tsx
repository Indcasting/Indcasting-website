"use client";

import { useState, useEffect } from "react";
import { BriefcaseBusiness, Users, Star, Video, MessageSquare, TrendingUp, ChevronRight, Activity, PlusCircle, Calendar, X } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import SpotlightCard from "@/components/SpotlightCard";
import { getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";

export default function SeekerDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  
  const [selectedAppModal, setSelectedAppModal] = useState<{name: string, role: string, time: string, status: string, color: string, bg: string} | null>(null);

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
      <div className="col-span-3" onClick={() => router.push('/dashboard/seeker/casting-calls')}>
        <SpotlightCard className="stat-card" style={{ cursor: 'pointer', justifyContent: 'center' }}>
          <div className="stat-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>8</h3>
            <p>Active Calls</p>
          </div>
        </SpotlightCard>
      </div>

      <div className="col-span-3" onClick={() => router.push('/talents')}>
        <SpotlightCard className="stat-card" style={{ cursor: 'pointer', justifyContent: 'center' }}>
          <div className="stat-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>142</h3>
            <p>Total Applications</p>
          </div>
        </SpotlightCard>
      </div>

      <div className="col-span-3" onClick={() => router.push('/dashboard/seeker/shortlisted')}>
        <SpotlightCard className="stat-card" style={{ cursor: 'pointer', justifyContent: 'center' }}>
          <div className="stat-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>24</h3>
            <p>Shortlisted</p>
          </div>
        </SpotlightCard>
      </div>

      <div className="col-span-3" onClick={() => router.push('/dashboard/seeker/auditions')}>
        <SpotlightCard className="stat-card" style={{ cursor: 'pointer', justifyContent: 'center' }}>
          <div className="stat-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>12</h3>
            <p>Scheduled Auditions</p>
          </div>
        </SpotlightCard>
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
          <div style={{ height: '260px', display: 'flex', alignItems: 'flex-end', gap: '16px', paddingTop: '40px', position: 'relative' }}>
            {/* Background grid lines */}
            <div style={{ position: 'absolute', top: '40px', left: 0, right: 0, bottom: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
              {[100, 75, 50, 25, 0].map(line => (
                <div key={line} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                  <span style={{ fontSize: '11px', color: 'var(--dash-text-muted)', width: '30px', textAlign: 'right' }}>{line}</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--dash-border)', opacity: 0.5 }}></div>
                </div>
              ))}
            </div>
            
            {/* Mock Chart */}
            <div style={{ display: 'flex', flex: 1, gap: '16px', height: '100%', paddingLeft: '42px', zIndex: 1 }}>
              {[20, 35, 25, 45, 60, 40, 75].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', height: '100%', justifyContent: 'flex-end' }} className="chart-col">
                  <div className="chart-bar" style={{ 
                    width: '100%', 
                    maxWidth: '48px',
                    height: `${h}%`, 
                    background: i === 6 ? 'linear-gradient(180deg, var(--gold) 0%, rgba(200, 155, 60, 0.1) 100%)' : 'linear-gradient(180deg, rgba(200, 155, 60, 0.4) 0%, rgba(200, 155, 60, 0.05) 100%)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    cursor: 'pointer'
                  }}>
                    <div className="chart-tooltip" style={{
                      position: 'absolute', top: '-34px', left: '50%', transform: 'translateX(-50%)',
                      background: 'var(--dash-text-main)', color: 'var(--dash-bg)', padding: '4px 10px', borderRadius: '6px',
                      fontSize: '12px', fontWeight: 700, opacity: 0, transition: 'all 0.2s ease',
                      pointerEvents: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      {h} Applications
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: i === 6 ? 'var(--gold)' : 'var(--dash-text-muted)' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
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
                <SpotlightCard key={i} onClick={() => setSelectedAppModal(app)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--dash-border)', borderRadius: '12px', cursor: 'pointer' }}>
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
                </SpotlightCard>
              ))}
            </div>
            <button 
              onClick={() => router.push('/talents')}
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
              <SpotlightCard key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', borderBottom: i !== 2 ? '1px solid var(--dash-border)' : 'none', borderRadius: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={18} color="var(--dash-gold)" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>{aud.role}</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--dash-text-main)' }}>with {aud.candidate}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--dash-text-muted)' }}>{aud.time}</p>
                </div>
              </SpotlightCard>
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
            <SpotlightCard className="dash-quick-action" onClick={() => router.push('/dashboard/seeker/casting-calls')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer' }}>
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <PlusCircle size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Post Job</span>
            </SpotlightCard>
            <SpotlightCard className="dash-quick-action" onClick={() => router.push('/messages')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer' }}>
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                <MessageSquare size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Messages (3)</span>
            </SpotlightCard>
            <SpotlightCard className="dash-quick-action" onClick={() => router.push('/dashboard/seeker/company-profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer' }}>
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Activity size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Update Profile</span>
            </SpotlightCard>
            <SpotlightCard className="dash-quick-action" onClick={() => router.push('/dashboard/seeker/shortlisted')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', color: 'var(--dash-text-main)', cursor: 'pointer' }}>
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--dash-gold)' }}>
                <Star size={20} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Shortlisted</span>
            </SpotlightCard>
          </div>
        </DashboardCard>

      </div>

      {/* Application Review Modal */}
      {selectedAppModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={() => setSelectedAppModal(null)}
        >
          <div style={{
            backgroundColor: 'var(--dash-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '32px 32px 24px 32px', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: selectedAppModal.bg, color: selectedAppModal.color, display: 'inline-block', marginBottom: '12px' }}>
                  {selectedAppModal.status}
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>{selectedAppModal.name}</h2>
                <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>
                  Applied for: <strong style={{ color: 'var(--dash-text-main)' }}>{selectedAppModal.role}</strong>
                </p>
              </div>
              <button 
                onClick={() => setSelectedAppModal(null)}
                style={{ background: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div style={{ padding: '32px' }}>
              <div style={{ position: 'relative', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Timeline Line */}
                <div style={{ position: 'absolute', left: '5px', top: '8px', bottom: '8px', width: '2px', backgroundColor: 'var(--dash-border)', zIndex: 0 }}></div>
                
                {/* Step 1 */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--gold)', marginTop: '4px', border: '3px solid var(--dash-bg)', marginLeft: '-5px' }}></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: 'var(--dash-text-main)' }}>Application Received</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{selectedAppModal.time}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedAppModal.status === 'Reviewed' || selectedAppModal.status === 'Shortlisted' ? 'var(--gold)' : 'var(--dash-border)', marginTop: '4px', border: '3px solid var(--dash-bg)', marginLeft: '-5px' }}></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: selectedAppModal.status === 'Reviewed' || selectedAppModal.status === 'Shortlisted' ? 'var(--dash-text-main)' : 'var(--dash-text-muted)' }}>Review in Progress</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{selectedAppModal.status === 'Reviewed' || selectedAppModal.status === 'Shortlisted' ? 'You have reviewed this profile.' : 'Pending review.'}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedAppModal.status === 'Shortlisted' ? '#10b981' : 'var(--dash-border)', marginTop: '4px', border: '3px solid var(--dash-bg)', marginLeft: '-5px' }}></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: selectedAppModal.status === 'Shortlisted' ? 'var(--dash-text-main)' : 'var(--dash-text-muted)' }}>
                      Shortlisted
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>
                      {selectedAppModal.status === 'Shortlisted' ? 'Candidate added to shortlist.' : 'No final decision yet.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: 'var(--dash-bg-card)' }}>
              <button 
                style={{ padding: '10px 24px', borderRadius: '999px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', fontWeight: 600, cursor: 'pointer' }}
              >
                View Full Profile
              </button>
              <button 
                onClick={() => setSelectedAppModal(null)}
                style={{ padding: '10px 24px', borderRadius: '999px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .chart-col:hover .chart-bar {
          filter: brightness(1.2);
        }
        .chart-col:hover .chart-tooltip {
          opacity: 1 !important;
          top: -40px !important;
        }
      `}} />
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
