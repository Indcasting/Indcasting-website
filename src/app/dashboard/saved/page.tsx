"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Trash2, ChevronRight, Star, X, CheckCircle } from "lucide-react";

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
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Saved Jobs</h2>
          <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Casting calls you've bookmarked for later.</p>
        </div>
      </div>

      {jobs.length === 0 && (
        <div className="col-span-12 dashboard-card-ui" style={{ padding: '48px', textAlign: 'center' }}>
          <Star size={48} color="var(--dash-border)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
          <h3 style={{ color: 'var(--dash-text-main)', fontSize: '1.2rem', marginBottom: '8px' }}>No saved jobs</h3>
          <p style={{ color: 'var(--dash-text-muted)' }}>You haven't bookmarked any casting calls yet.</p>
        </div>
      )}

      {jobs.map((job) => (
        <div key={job.id} className="col-span-12 dashboard-card-ui" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(232, 169, 58, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={24} color="var(--gold)" fill="var(--gold)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{job.title}</h3>
              <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.9rem', display: 'flex', gap: '16px' }}>
                <span>{job.company}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {job.location}</span>
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {job.date}</span>
            <button 
              className="dash-btn-primary" 
              style={{ padding: '8px 24px' }}
              onClick={() => handleApplyClick(job)}
            >
              Apply
            </button>
            <button 
              className="dash-btn-outline" 
              style={{ padding: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.borderColor = 'var(--dash-border)';
              }}
              onClick={() => handleDelete(job.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

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
