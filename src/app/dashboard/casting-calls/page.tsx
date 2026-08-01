"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Calendar, Clock, ChevronRight, X, Briefcase, FileText, CheckCircle, Info } from "lucide-react";

export default function CastingCallsPage() {
  const jobs = [
    { id: 1, title: "Lead Actor for Indie Film", company: "Moonlight Studios", location: "Mumbai, India", date: "Oct 25", type: "Full-Time", description: "We are looking for a charismatic lead actor for an upcoming indie feature film. The role requires strong emotional range and a background in dramatic acting." },
    { id: 2, title: "Voiceover Artist", company: "AudioVerse", location: "Remote", date: "Nov 2", type: "Freelance", description: "Seeking a versatile voiceover artist for a series of animated shorts. The ideal candidate will have a professional home studio setup." },
    { id: 3, title: "Background Dancers", company: "Rhythm Prod", location: "Delhi, India", date: "Oct 28", type: "Contract", description: "Looking for energetic background dancers for a music video shoot. Styles include hip-hop and contemporary." },
    { id: 4, title: "Commercial Model", company: "Vogue India", location: "Bengaluru, India", date: "Nov 5", type: "Part-Time", description: "Casting models for a high-end fashion commercial. Diverse looks and strong on-camera presence required." }
  ];

  const [selectedDetailsJob, setSelectedDetailsJob] = useState<typeof jobs[0] | null>(null);
  const [selectedApplyJob, setSelectedApplyJob] = useState<typeof jobs[0] | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleDetailsClick = (job: typeof jobs[0]) => {
    setSelectedDetailsJob(job);
  };

  const handleApplyClick = (job: typeof jobs[0]) => {
    setSelectedDetailsJob(null);
    setSelectedApplyJob(job);
    setApplied(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || job.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const submitApplication = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      setTimeout(() => {
        setSelectedApplyJob(null);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      {/* Header and Search */}
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Active Casting Calls</h2>
          <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Find your next big role from top casting directors.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '12px 20px 12px 44px', borderRadius: '8px', border: '1px solid var(--dash-border)',
                backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none'
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', 
                borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', 
                color: 'var(--dash-text-main)', cursor: 'pointer'
              }}
            >
              <Filter size={18} /> {filterType === "All" ? "Filter" : filterType}
            </button>
            {isFilterOpen && (
              <div style={{ position: 'absolute', top: '110%', right: 0, backgroundColor: 'var(--dash-bg)', border: '1px solid var(--dash-border)', borderRadius: '12px', padding: '8px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)', zIndex: 50, minWidth: '150px' }}>
                {["All", "Full-Time", "Part-Time", "Freelance", "Contract"].map(type => (
                  <button 
                    key={type}
                    onClick={() => { setFilterType(type); setIsFilterOpen(false); }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '10px 12px', background: filterType === type ? 'var(--dash-bg-card)' : 'transparent', border: 'none', color: 'var(--dash-text-main)', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} 
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cards */}
      {filteredJobs.length === 0 ? (
        <div className="col-span-12 dashboard-card-ui" style={{ padding: '40px', textAlign: 'center', color: 'var(--dash-text-muted)' }}>
          <p>No casting calls match your search criteria.</p>
        </div>
      ) : (
        filteredJobs.map((job) => (
        <div key={job.id} className="col-span-6 dashboard-card-ui" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{job.title}</h3>
              <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontWeight: 500 }}>{job.company}</p>
            </div>
            <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(232, 169, 58, 0.1)', color: 'var(--gold)' }}>
              {job.type}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {job.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={16} /> Deadline: {job.date}</span>
          </div>
          
          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--dash-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              className="dash-btn-primary" 
              style={{ padding: '8px 24px' }}
              onClick={() => handleApplyClick(job)}
            >
              Apply Now
            </button>
            <button 
              style={{ background: 'none', border: 'none', color: 'var(--dash-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--dash-text-muted)'}
              onClick={() => handleDetailsClick(job)}
            >
              Details <ChevronRight size={16} />
            </button>
          </div>
        </div>
        ))
      )}

      {/* Details Modal */}
      {selectedDetailsJob && (
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
        onClick={() => setSelectedDetailsJob(null)}
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
                <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(232, 169, 58, 0.1)', color: 'var(--gold)', display: 'inline-block', marginBottom: '12px' }}>
                  {selectedDetailsJob.type}
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>{selectedDetailsJob.title}</h2>
                <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                  {selectedDetailsJob.company}
                </p>
              </div>
              <button 
                onClick={() => setSelectedDetailsJob(null)}
                style={{ background: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '32px', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'var(--dash-bg-card)', color: 'var(--dash-text-muted)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>Location</p>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main)' }}>{selectedDetailsJob.location}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'var(--dash-bg-card)', color: 'var(--dash-text-muted)' }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>Deadline</p>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main)' }}>{selectedDetailsJob.date}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Info size={18} color="var(--gold)" /> Role Description
                </h3>
                <div style={{ backgroundColor: 'var(--dash-bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
                  <p style={{ margin: 0, color: 'var(--dash-text-muted)', lineHeight: 1.6 }}>
                    {selectedDetailsJob.description}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'flex-end', gap: '16px', backgroundColor: 'var(--dash-bg-card)' }}>
              <button 
                onClick={() => setSelectedDetailsJob(null)}
                style={{ padding: '12px 24px', borderRadius: '999px', border: '1.5px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
              <button 
                onClick={() => handleApplyClick(selectedDetailsJob)}
                style={{ padding: '12px 32px', borderRadius: '999px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)' }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {selectedApplyJob && (
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
        onClick={() => !isApplying && !applied && setSelectedApplyJob(null)}
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
                  Your application for {selectedApplyJob.title} has been successfully submitted to {selectedApplyJob.company}.
                </p>
              </div>
            ) : (
              <>
                <div style={{ padding: '32px 32px 24px 32px', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Apply for Role</h2>
                    <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.95rem' }}>
                      {selectedApplyJob.title} at {selectedApplyJob.company}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedApplyJob(null)}
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
                    onClick={() => setSelectedApplyJob(null)}
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
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
