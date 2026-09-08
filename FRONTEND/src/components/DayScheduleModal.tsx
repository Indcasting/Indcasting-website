"use client";

import { X, Clock, MapPin, Video, User, Building, ExternalLink, MessageCircle, MoreVertical } from "lucide-react";
import { Audition, updateAuditionStatus } from "@/utils/auditionData";
import { useState, useEffect } from "react";

interface DayScheduleModalProps {
  date: string; // YYYY-MM-DD
  auditions: Audition[];
  userRole: "talent" | "seeker";
  onClose: () => void;
}

export default function DayScheduleModal({ date, auditions, userRole, onClose }: DayScheduleModalProps) {
  // Format date nicely
  const displayDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  
  // Sort auditions chronologically by startTime
  const parseTime = (timeStr: string) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (hours === 12) hours = 0;
    if (modifier === 'PM') hours += 12;
    return hours * 60 + minutes;
  };
  
  const sortedAuditions = [...auditions].sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));

  const getStatusColor = (status: Audition['status']) => {
    switch(status) {
      case 'Completed': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' }; // Green
      case 'Cancelled': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' }; // Red
      case 'Scheduled': return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' }; // Blue
      case 'Pending': return { bg: 'rgba(232, 169, 58, 0.1)', text: 'var(--gold)' }; // Gold
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: '#ccc' };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 99999, // Needs to be above the sidebar
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.2s ease-out'
    }}
    onClick={onClose}
    >
      <div style={{
        backgroundColor: 'var(--dash-bg)',
        border: '1px solid var(--dash-border)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ padding: '32px', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)', letterSpacing: '-0.5px' }}>
              Schedule for {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </h2>
            <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
              {displayDate}
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Body (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'var(--dash-bg)' }}>
          {sortedAuditions.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--dash-border)' }}>
                <Clock size={28} color="var(--dash-text-muted)" style={{ opacity: 0.5 }} />
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: 'var(--dash-text-main)', fontWeight: 600 }}>No auditions scheduled</h3>
                <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.95rem' }}>You have a free day today. Take a break!</p>
              </div>
            </div>
          ) : (
            sortedAuditions.map((audition) => {
              const statusColor = getStatusColor(audition.status);
              
              return (
                <div key={audition.id} style={{ 
                  backgroundColor: 'var(--dash-bg-card)', 
                  border: '1px solid var(--dash-border)', 
                  borderRadius: '20px', 
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                className="audition-modal-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {/* Highlight bar on the left */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: statusColor.text }}></div>
                  
                  {/* Top row: Times and Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--dash-surface)', color: 'var(--dash-text-main)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                        {audition.startTime}
                      </span>
                      <span style={{ color: 'var(--dash-text-muted)' }}>—</span>
                      <span style={{ color: 'var(--dash-text-muted)', fontWeight: 500, fontSize: '0.95rem' }}>
                        {audition.endTime}
                      </span>
                    </div>
                    
                    <span style={{ padding: '6px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: statusColor.bg, color: statusColor.text, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {audition.status}
                    </span>
                  </div>
                  
                  {/* Middle row: Role and Info */}
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {userRole === 'seeker' && audition.candidatePic ? (
                      <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--dash-surface)', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={audition.candidatePic} alt={audition.candidateName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--dash-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {userRole === 'seeker' ? <User size={28} color="var(--gold)" /> : <Building size={28} color="var(--gold)" />}
                      </div>
                    )}
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '1.4rem', fontWeight: 800, color: 'var(--dash-text-main)', letterSpacing: '-0.3px' }}>
                        {userRole === 'seeker' ? audition.candidateName : audition.title}
                      </h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '1rem' }}>
                          {userRole === 'seeker' ? audition.title : audition.company}
                        </span>
                        
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--dash-border)' }}></span>
                        
                        <span style={{ color: 'var(--dash-text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                          {audition.type === 'Online' ? <Video size={14} /> : <MapPin size={14} />}
                          {audition.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom row: Location and Actions */}
                  <div style={{ marginTop: '4px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '300px' }}>
                      <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Location:</span>
                      {audition.location.startsWith('http') ? (
                        <a href={audition.location} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Join Meeting <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span style={{ color: 'var(--dash-text-main)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{audition.location}</span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {userRole === 'talent' ? (
                        <>
                          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--dash-border)', background: 'transparent', color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                            <MessageCircle size={14} /> Contact
                          </button>
                          <button style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', background: 'var(--gold)', color: '#000', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                            Details
                          </button>
                        </>
                      ) : (
                        <>
                          {audition.status !== 'Cancelled' && audition.status !== 'Completed' && (
                            <button 
                              onClick={() => {
                                updateAuditionStatus(audition.id, 'Cancelled');
                              }}
                              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'transparent', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                          )}
                          {audition.status === 'Scheduled' && (
                            <button style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', background: 'var(--gold)', color: '#000', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                              Start
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
