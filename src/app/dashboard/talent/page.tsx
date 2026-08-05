"use client";

import { FileText, Calendar, Video, MessageSquare, TrendingUp, ChevronRight, X, BarChart2, Users, Eye } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";

export default function TalentDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  // Modal States
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAuditionsModalOpen, setIsAuditionsModalOpen] = useState(false);
  const [selectedAppModal, setSelectedAppModal] = useState<{role: string, prod: string, status: string, color: string, bg: string} | null>(null);

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
      <div className="col-span-3" onClick={() => router.push('/dashboard/applications')}>
        <div className="stat-card" style={{ cursor: 'pointer' }}>
          <div className="stat-icon-wrapper" style={{ color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Applications</p>
          </div>
        </div>
      </div>

      <div className="col-span-3" onClick={() => setIsAuditionsModalOpen(true)}>
        <div className="stat-card" style={{ cursor: 'pointer' }}>
          <div className="stat-icon-wrapper" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <Video size={24} />
          </div>
          <div className="stat-content">
            <h3>4</h3>
            <p>Upcoming Auditions</p>
          </div>
        </div>
      </div>

      <div className="col-span-3" onClick={() => router.push('/dashboard/messages')}>
        <div className="stat-card" style={{ cursor: 'pointer' }}>
          <div className="stat-icon-wrapper" style={{ color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>5</h3>
            <p>New Messages</p>
          </div>
        </div>
      </div>

      <div className="col-span-3" onClick={() => router.push('/dashboard/portfolio')}>
        <div className="stat-card" style={{ cursor: 'pointer' }}>
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
          action={
            <button 
              onClick={() => setIsReportModalOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--dash-gold)', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
            >
              View Full Report
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
              {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', height: '100%', justifyContent: 'flex-end' }} className="chart-col">
                  <div className="chart-bar" style={{ 
                    width: '100%', 
                    maxWidth: '48px',
                    height: `${h}%`, 
                    background: i === 5 ? 'linear-gradient(180deg, var(--gold) 0%, rgba(200, 155, 60, 0.1) 100%)' : 'linear-gradient(180deg, rgba(200, 155, 60, 0.4) 0%, rgba(200, 155, 60, 0.05) 100%)',
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
                      {h} Views
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: i === 5 ? 'var(--gold)' : 'var(--dash-text-muted)' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
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
                    <button 
                      onClick={() => setSelectedAppModal(app)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dash-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                    >
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
            <button className="dash-btn-outline" style={{ marginTop: '8px', width: '100%', padding: '10px' }}>
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

      {/* ----------------- Modals ----------------- */}

      {/* Full Report Modal */}
      {isReportModalOpen && (
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
        onClick={() => setIsReportModalOpen(false)}
        >
          <div style={{
            backgroundColor: 'var(--dash-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '700px',
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
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Performance Report</h2>
                <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                  Detailed analytics for the past 30 days
                </p>
              </div>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                style={{ background: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div style={{ padding: '24px', backgroundColor: 'var(--dash-bg-card)', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Eye size={20} /></div>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dash-text-main)' }}>Profile Views</h3>
                </div>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--dash-text-main)' }}>1,248</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>+12% this week</p>
              </div>
              <div style={{ padding: '24px', backgroundColor: 'var(--dash-bg-card)', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Users size={20} /></div>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dash-text-main)' }}>Casting Matches</h3>
                </div>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--dash-text-main)' }}>34</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>+5 new roles</p>
              </div>
              <div style={{ padding: '24px', backgroundColor: 'var(--dash-bg-card)', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--dash-gold)' }}><BarChart2 size={20} /></div>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dash-text-main)' }}>Callback Rate</h3>
                </div>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--dash-text-main)' }}>28%</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>-2% this week</p>
              </div>
            </div>
            
            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'var(--dash-bg-card)' }}>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                style={{ padding: '12px 32px', borderRadius: '999px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)' }}
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Auditions Modal */}
      {isAuditionsModalOpen && (
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
        onClick={() => setIsAuditionsModalOpen(false)}
        >
          <div style={{
            backgroundColor: 'var(--dash-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '600px',
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
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Upcoming Auditions</h2>
                <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                  You have 4 auditions scheduled this week.
                </p>
              </div>
              <button 
                onClick={() => setIsAuditionsModalOpen(false)}
                style={{ background: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '50vh', overflowY: 'auto' }}>
              {[
                { role: "Commercial Lead", time: "Tomorrow, 10:00 AM", studio: "Silver Screen Ads", type: "In-Person", location: "Mumbai Studio 4" },
                { role: "Fashion Shoot", time: "Friday, 2:30 PM", studio: "Vogue India", type: "In-Person", location: "Bandra West" },
                { role: "Voice Actor", time: "Saturday, 11:00 AM", studio: "AudioVerse", type: "Remote", location: "Zoom Link Sent" },
                { role: "Extra", time: "Sunday, 6:00 AM", studio: "Epic Films", type: "In-Person", location: "Film City Set C" }
              ].map((aud, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: 'var(--dash-bg-card)', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Calendar size={24} color="var(--dash-gold)" />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--dash-text-main)' }}>{aud.role}</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--dash-text-muted)' }}>{aud.studio} • {aud.time}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ padding: '6px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: aud.type === 'Remote' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: aud.type === 'Remote' ? '#3b82f6' : '#10b981', display: 'inline-block', marginBottom: '8px' }}>
                      {aud.type}
                    </span>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{aud.location}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'var(--dash-bg-card)' }}>
              <button 
                onClick={() => setIsAuditionsModalOpen(false)}
                style={{ padding: '12px 32px', borderRadius: '999px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Tracking Modal */}
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
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>{selectedAppModal.role}</h2>
                <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>
                  {selectedAppModal.prod}
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
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: 'var(--dash-text-main)' }}>Application Submitted</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>Oct 12, 2026</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedAppModal.status === 'In Review' || selectedAppModal.status === 'Shortlisted' ? 'var(--gold)' : (selectedAppModal.status === 'Rejected' ? '#ef4444' : 'var(--dash-border)'), marginTop: '4px', border: '3px solid var(--dash-bg)', marginLeft: '-5px' }}></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: selectedAppModal.status === 'In Review' || selectedAppModal.status === 'Shortlisted' || selectedAppModal.status === 'Rejected' ? 'var(--dash-text-main)' : 'var(--dash-text-muted)' }}>Review in Progress</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>Casting directors are reviewing your profile.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedAppModal.status === 'Shortlisted' ? '#10b981' : (selectedAppModal.status === 'Rejected' ? '#ef4444' : 'var(--dash-border)'), marginTop: '4px', border: '3px solid var(--dash-bg)', marginLeft: '-5px' }}></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: selectedAppModal.status === 'Shortlisted' || selectedAppModal.status === 'Rejected' ? 'var(--dash-text-main)' : 'var(--dash-text-muted)' }}>
                      {selectedAppModal.status === 'Shortlisted' ? 'Shortlisted for Audition' : (selectedAppModal.status === 'Rejected' ? 'Application Declined' : 'Final Decision')}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>
                      {selectedAppModal.status === 'Shortlisted' ? 'Check your messages for the schedule.' : (selectedAppModal.status === 'Rejected' ? 'Keep applying for other roles!' : 'Pending.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'var(--dash-bg-card)' }}>
              <button 
                onClick={() => setSelectedAppModal(null)}
                style={{ padding: '12px 32px', borderRadius: '999px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)' }}
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