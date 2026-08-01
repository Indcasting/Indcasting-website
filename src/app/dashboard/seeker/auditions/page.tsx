"use client";

import { useState } from "react";
import { Calendar, PlusCircle, Video, MapPin, Clock, X } from "lucide-react";

export default function SeekerAuditions() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const auditions = [
    { id: 1, role: "Lead Actor", candidate: "Aria Sharma", date: "Oct 15, 2026", time: "10:00 AM", type: "In-Person", loc: "Studio A, Mumbai", status: "Upcoming" },
    { id: 2, role: "Voice Artist", candidate: "Karan Patel", date: "Oct 15, 2026", time: "2:30 PM", type: "Remote", loc: "Zoom", status: "Upcoming" },
    { id: 3, role: "Dancer", candidate: "Neha Singh", date: "Oct 14, 2026", time: "11:00 AM", type: "In-Person", loc: "Dance Hall", status: "Completed" }
  ];

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>Auditions Calendar</h2>
          <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Schedule and manage your casting auditions.</p>
        </div>
        <button 
          onClick={() => setIsScheduleModalOpen(true)}
          className="dash-btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
        >
          <PlusCircle size={18} /> Schedule Audition
        </button>
      </div>

      <div className="col-span-12 dashboard-card-ui">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {auditions.map((aud, i) => (
            <div key={aud.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderBottom: i !== auditions.length - 1 ? '1px solid var(--dash-border)' : 'none' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: aud.status === 'Completed' ? 'var(--dash-hover-bg)' : 'rgba(212, 175, 55, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: aud.status === 'Completed' ? 'var(--dash-text-muted)' : 'var(--dash-gold)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1 }}>15</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Oct</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{aud.role}</h3>
                  <p style={{ color: 'var(--dash-text-main)', margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 500 }}>Candidate: {aud.candidate}</p>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--dash-text-muted)', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {aud.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {aud.type === 'Remote' ? <Video size={14} /> : <MapPin size={14} />} {aud.type} ({aud.loc})
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: aud.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: aud.status === 'Completed' ? '#10b981' : '#3b82f6' }}>
                  {aud.status}
                </span>
                <button 
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="dash-btn-outline" 
                  style={{ padding: '8px 16px', borderRadius: '8px' }}
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div 
          onClick={() => setIsScheduleModalOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '420px', padding: '32px', borderRadius: '24px',
              backgroundColor: 'var(--dash-surface)', border: '1px solid var(--dash-border)',
              position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <button 
              onClick={() => setIsScheduleModalOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--dash-text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dash-text-main)', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar color="var(--gold)" size={24} /> Select Date
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--dash-text-muted)', marginBottom: '8px', fontWeight: 600 }}>Audition Date</label>
                <input 
                  type="date" 
                  style={{ 
                    width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid var(--dash-border)', 
                    backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', colorScheme: 'dark', fontSize: '1rem', outline: 'none'
                  }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--dash-text-muted)', marginBottom: '8px', fontWeight: 600 }}>Audition Time</label>
                <input 
                  type="time" 
                  style={{ 
                    width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid var(--dash-border)', 
                    backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', colorScheme: 'dark', fontSize: '1rem', outline: 'none'
                  }} 
                />
              </div>
              
              <button 
                onClick={() => {
                  alert("Audition scheduled successfully!");
                  setIsScheduleModalOpen(false);
                }}
                className="dash-btn-primary" 
                style={{ width: '100%', padding: '16px', marginTop: '8px', borderRadius: '12px', fontWeight: 700, fontSize: '1.05rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                <Clock size={18} /> Confirm Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
