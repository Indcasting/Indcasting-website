"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Trash2, ChevronRight, Star, X, CheckCircle } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Supporting Actor", company: "Greenlight Prod.", location: "Mumbai", date: "Oct 25", type: "Full-Time" },
    { id: 2, title: "Print Model", company: "Style Mag", location: "Delhi", date: "Oct 30", type: "Freelance" }
  ]);

  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleDelete = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleApplyClick = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setApplied(false);
  };

  const submitApplication = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      setTimeout(() => {
        setSelectedJob(null);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '60px' }}>
      
      {/* Premium Header */}
      <div className="col-span-12" style={{ padding: '32px 0 16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)', letterSpacing: '-1px' }}>Saved Jobs</h2>
        <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '1.1rem' }}>Manage the casting calls you've bookmarked for later.</p>
      </div>

      {/* Unified List Container */}
      <div className="col-span-12 dashboard-card-ui" style={{ overflow: 'hidden', padding: 0, border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
        {jobs.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <Star size={64} color="var(--dash-border)" style={{ margin: '0 auto 24px auto', opacity: 0.3 }} />
            <h3 style={{ color: 'var(--dash-text-main)', fontSize: '1.4rem', marginBottom: '8px', fontWeight: 700 }}>No saved jobs</h3>
            <p style={{ color: 'var(--dash-text-muted)', fontSize: '1.05rem' }}>You haven't bookmarked any casting calls yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {jobs.map((job, index) => (
              <ElectricBorder
                key={job.id}
                color="var(--gold)"
                speed={2}
                chaos={0.2}
                borderRadius={0}
                className="hover-only"
                style={{ display: 'block' }}
              >
              <div 
                style={{ 
                  padding: '28px 32px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  transition: 'all 0.3s ease',
                  borderBottom: index < jobs.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  backgroundColor: 'rgba(255,255,255,0)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.paddingLeft = '36px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                  e.currentTarget.style.paddingLeft = '32px';
                }}
              >
                <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '56px', height: '56px', borderRadius: '16px', 
                    background: 'linear-gradient(135deg, rgba(232, 169, 58, 0.2) 0%, rgba(232, 169, 58, 0.05) 100%)',
                    border: '1px solid rgba(232, 169, 58, 0.2)',
                    boxShadow: '0 0 20px rgba(232, 169, 58, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    <Star size={26} color="var(--gold)" fill="var(--gold)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--dash-text-main)', letterSpacing: '-0.3px' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.95rem' }}>{job.company}</span>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--dash-border)' }}></span>
                      <span style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} /> {job.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Added</span>
                    <span style={{ color: 'var(--dash-text-main)', fontSize: '1.05rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} color="var(--gold)" /> {job.date}
                    </span>
                  </div>
                  
                  <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
                  
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button 
                      className="dash-btn-primary" 
                      style={{ padding: '10px 28px', fontSize: '0.95rem', boxShadow: '0 8px 16px rgba(201,168,76,0.2)' }}
                      onClick={() => handleApplyClick(job)}
                    >
                      Apply
                    </button>
                    <button 
                      className="dash-btn-outline" 
                      style={{ 
                        padding: '10px', 
                        cursor: 'pointer', 
                        transition: 'all 0.2s ease',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: 'var(--dash-text-muted)',
                        backgroundColor: 'rgba(255,255,255,0.02)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                        e.currentTarget.style.color = '#ef4444';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                        e.currentTarget.style.color = 'var(--dash-text-muted)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                      onClick={() => handleDelete(job.id)}
                      title="Remove from Saved"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
              </ElectricBorder>
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {selectedJob && (
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
        onClick={() => !isApplying && !applied && setSelectedJob(null)}
        >
          <div style={{
            backgroundColor: 'var(--dash-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={e => e.stopPropagation()}
          >
            {applied ? (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 24px auto' }} />
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--dash-text-main)' }}>Application Sent!</h2>
                <p style={{ color: 'var(--dash-text-muted)', fontSize: '1.05rem', margin: 0 }}>
                  Your application for {selectedJob.title} has been successfully submitted to {selectedJob.company}.
                </p>
              </div>
            ) : (
              <>
                <div style={{ padding: '32px 32px 24px 32px', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Apply for Role</h2>
                    <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.95rem' }}>
                      {selectedJob.title} at {selectedJob.company}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    style={{ background: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div style={{ padding: '32px' }}>
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '12px' }}>
                    Quick Pitch / Cover Letter
                  </label>
                  <textarea 
                    placeholder="Tell the casting director why you're a great fit for this role..."
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--dash-border)',
                      backgroundColor: 'var(--dash-bg-card)',
                      color: 'var(--dash-text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                  <p style={{ fontSize: '0.8rem', color: 'var(--dash-text-muted)', marginTop: '8px' }}>
                    Your profile and portfolio will be attached automatically.
                  </p>
                </div>

                <div style={{ padding: '24px 32px', borderTop: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'flex-end', gap: '16px', backgroundColor: 'var(--dash-bg-card)' }}>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    style={{ padding: '12px 24px', borderRadius: '999px', border: '1.5px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={submitApplication}
                    disabled={isApplying}
                    style={{ 
                      padding: '12px 24px', 
                      borderRadius: '999px', 
                      border: 'none', 
                      backgroundColor: 'var(--gold)', 
                      color: '#000', 
                      fontWeight: 700, 
                      cursor: isApplying ? 'not-allowed' : 'pointer', 
                      boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)',
                      opacity: isApplying ? 0.8 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {isApplying ? (
                      <>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', animation: 'spin 1s linear infinite' }} />
                        Submitting...
                      </>
                    ) : 'Submit Application'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Add keyframes for animation in inline style just for the spinner if it's not defined globally */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
