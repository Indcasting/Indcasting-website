"use client";

import { useState } from "react";
import { PlusCircle, Search, Filter, MoreVertical, MapPin, Users, Calendar, Play, Pause, Copy, Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SeekerCastingCalls() {
  const router = useRouter();
  const [calls, setCalls] = useState([
    { id: 1, title: "Lead Actor - Indie Film", category: "Film", apps: 45, deadline: "Oct 25", status: "Active", location: "Mumbai", date: "Oct 1" },
    { id: 2, title: "Background Dancer", category: "Music Video", apps: 120, deadline: "Oct 20", status: "Active", location: "Delhi", date: "Sep 28" },
    { id: 3, title: "Commercial Model", category: "Advertising", apps: 85, deadline: "Oct 15", status: "Paused", location: "Bengaluru", date: "Sep 20" },
    { id: 4, title: "Voice Actor", category: "Animation", apps: 32, deadline: "Oct 10", status: "Closed", location: "Remote", date: "Sep 15" }
  ]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' };
      case "Paused": return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280' };
    }
  };

  const filteredCalls = calls.filter(call => 
    call.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    call.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12 dashboard-card-ui" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>My Casting Calls</h2>
          <p style={{ color: 'var(--dash-text-muted)', margin: 0 }}>Manage your job postings and track applications.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search calls..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '12px 20px 12px 44px', borderRadius: '8px', border: '1px solid var(--dash-border)',
                backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none'
              }}
            />
          </div>
          <button className="dash-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
            <PlusCircle size={18} /> Create New
          </button>
        </div>
      </div>

      {filteredCalls.map(call => {
        const statusColors = getStatusColor(call.status);
        return (
          <div key={call.id} className="col-span-12 dashboard-card-ui" style={{ padding: '24px', position: 'relative', zIndex: activeMenu === call.id ? 20 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flex: 1 }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px' }}>🎬</span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--dash-text-main)' }}>{call.title}</h3>
                    <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: statusColors.bg, color: statusColors.text, textTransform: 'uppercase' }}>
                      {call.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', color: 'var(--dash-text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {call.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={16} /> Deadline: {call.deadline}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={16} /> {call.apps} Applications</span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                <button onClick={() => router.push('/dashboard/seeker/applications')} className="dash-btn-outline" style={{ padding: '8px 20px', borderRadius: '8px' }}>
                  View Applications
                </button>
                <button 
                  onClick={() => setActiveMenu(activeMenu === call.id ? null : call.id)}
                  style={{ background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-main)', cursor: 'pointer' }}
                >
                  <MoreVertical size={18} />
                </button>

                {activeMenu === call.id && (
                  <div style={{ position: 'absolute', top: '44px', right: 0, backgroundColor: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', padding: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', zIndex: 10, minWidth: '180px' }}>
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'transparent', border: 'none', color: 'var(--dash-text-main)', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} className="hover-bg-card"><Edit2 size={16} /> Edit</button>
                    {call.status === 'Active' ? (
                      <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'transparent', border: 'none', color: '#f59e0b', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} className="hover-bg-card"><Pause size={16} /> Pause</button>
                    ) : (
                      <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'transparent', border: 'none', color: '#10b981', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} className="hover-bg-card"><Play size={16} /> Resume</button>
                    )}
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'transparent', border: 'none', color: 'var(--dash-text-main)', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} className="hover-bg-card"><Copy size={16} /> Duplicate</button>
                    <div style={{ height: '1px', backgroundColor: 'var(--dash-border)', margin: '4px 0' }}></div>
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'transparent', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} className="hover-bg-card"><Trash2 size={16} /> Delete</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
