"use client";

import { useState } from "react";
import { ChevronRight, FileText, CheckCircle, Clock, XCircle, Search, Filter, Grid, LayoutList, Maximize, LayoutGrid, X, Calendar, MapPin, Briefcase } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

type ViewMode = "tile" | "extra_large" | "details" | "small_icons";

const applicationsData = [
  { id: 1, title: 'Lead Female Actor', studio: 'Star Studios', location: 'Mumbai', status: 'Pending', time: 'Applied 2 days ago' },
  { id: 2, title: 'Fashion Model', studio: 'Elite Fashion', location: 'Delhi', status: 'Accepted', time: 'Applied 1 week ago' },
  { id: 3, title: 'Music Video Dancer', studio: 'Rhythm Productions', location: 'Bengaluru', status: 'Rejected', time: 'Applied 2 weeks ago' }
];

export default function ApplicationsView() {
  const [viewMode, setViewMode] = useState<ViewMode>("tile");
  const [selectedApp, setSelectedApp] = useState<typeof applicationsData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredApps = applicationsData.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.studio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return <CheckCircle size={14} />;
      case 'Rejected': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' };
      case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' };
      default: return { bg: 'rgba(232, 169, 58, 0.1)', text: '#e8a93a' };
    }
  };

  // Helper for layout styles based on view mode
  const getGridStyle = () => {
    switch (viewMode) {
      case "extra_large":
        return { gridTemplateColumns: '1fr', gap: '32px' };
      case "details":
        return { display: 'flex', flexDirection: 'column' as const, gap: '16px' };
      case "small_icons":
        return { gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' };
      case "tile":
      default:
        return { gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' };
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header Area */}
      <div style={{ padding: '32px 0 16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)', letterSpacing: '-1px' }}>
            Talents
          </h2>
          <p style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '1.1rem' }}>
            Review incoming talents and discover the right fit for your projects.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* View Mode Toggles */}
          <div style={{ display: 'flex', backgroundColor: 'var(--dash-bg)', padding: '4px', borderRadius: '8px', border: '1px solid var(--dash-border)' }}>
            <button 
              onClick={() => setViewMode("tile")}
              style={{ background: viewMode === "tile" ? 'var(--dash-surface)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "tile" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Tile View"
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("extra_large")}
              style={{ background: viewMode === "extra_large" ? 'var(--dash-surface)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "extra_large" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Extra Large View"
            >
              <Maximize size={18} />
            </button>
            <button 
              onClick={() => setViewMode("details")}
              style={{ background: viewMode === "details" ? 'var(--dash-surface)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "details" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Details View"
            >
              <LayoutList size={18} />
            </button>
            <button 
              onClick={() => setViewMode("small_icons")}
              style={{ background: viewMode === "small_icons" ? 'var(--dash-surface)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "small_icons" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Small Icons View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search talents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '12px 20px 12px 44px',
                borderRadius: '999px',
                border: '1.5px solid var(--dash-border)',
                backgroundColor: 'var(--dash-bg)',
                color: 'var(--dash-text-main)',
                fontSize: '0.95rem',
                outline: 'none',
                minWidth: '240px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                padding: '12px 20px', borderRadius: '999px', 
                border: '1.5px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', 
                color: 'var(--dash-text-main)', fontWeight: 600, cursor: 'pointer',
                transition: 'border-color 0.3s ease, background-color 0.3s ease'
              }}
            >
              <Filter size={18} />
              <span>{filterStatus === "All" ? "Filter" : filterStatus}</span>
            </button>
            {isFilterOpen && (
              <div style={{ position: 'absolute', top: '50px', right: 0, backgroundColor: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '12px', padding: '8px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)', zIndex: 50, minWidth: '150px' }}>
                {["All", "Pending", "Accepted", "Rejected"].map(status => (
                  <button 
                    key={status}
                    onClick={() => { setFilterStatus(status); setIsFilterOpen(false); }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '10px 12px', background: filterStatus === status ? 'var(--dash-bg)' : 'transparent', border: 'none', color: 'var(--dash-text-main)', textAlign: 'left', cursor: 'pointer', borderRadius: '6px' }} 
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applications Container */}
      <div style={{ display: viewMode === 'details' ? 'flex' : 'grid', ...getGridStyle() }}>
        {filteredApps.map(app => {
          const colors = getStatusColor(app.status);
          
          if (viewMode === 'details') {
            return (
              <ElectricBorder
                key={app.id}
                color={colors.text}
                speed={2}
                chaos={0.2}
                borderRadius={16}
                className="hover-only"
                style={{ display: 'block' }}
              >
                <div 
                  style={{ 
                    padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
                    background: 'linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg, ${colors.bg.replace('0.1', '0.2')} 0%, ${colors.bg.replace('0.1', '0.05')} 100%)`, border: `1px solid ${colors.bg.replace('0.1', '0.2')}`, boxShadow: `0 0 15px ${colors.bg.replace('0.1', '0.1')}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={22} color={colors.text} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--dash-text-main)', letterSpacing: '-0.3px' }}>{app.title}</h3>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.95rem' }}>{app.studio}</span>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--dash-border)' }}></span>
                        <span style={{ color: 'var(--dash-text-muted)', margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} /> {app.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Time</span>
                      <span style={{ color: 'var(--dash-text-main)', fontSize: '1.05rem', fontWeight: 500 }}>{app.time}</span>
                    </div>
                    
                    <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
                    
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, backgroundColor: colors.bg, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: '110px', justifyContent: 'center' }}>
                      {getStatusIcon(app.status)} {app.status}
                    </span>
                    <button 
                      onClick={() => setSelectedApp(app)}
                      style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.95rem', padding: '8px', transition: 'transform 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      View <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </ElectricBorder>
            );
          }

          const isSmall = viewMode === 'small_icons';
          const isLarge = viewMode === 'extra_large';

          return (
            <ElectricBorder
              key={app.id}
              color={colors.text}
              speed={2}
              chaos={0.2}
              borderRadius={24}
              className="hover-only"
              style={{ display: 'block', height: '100%' }}
            >
              <div 
                style={{ 
                  padding: isLarge ? '40px' : isSmall ? '20px' : '32px',
                  background: 'linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isSmall ? '16px' : '28px' }}>
                  <div style={{ 
                    width: isLarge ? '72px' : isSmall ? '40px' : '56px', 
                    height: isLarge ? '72px' : isSmall ? '40px' : '56px', 
                    borderRadius: isSmall ? '10px' : '16px', 
                    background: `linear-gradient(135deg, ${colors.bg.replace('0.1', '0.2')} 0%, ${colors.bg.replace('0.1', '0.05')} 100%)`, 
                    border: `1px solid ${colors.bg.replace('0.1', '0.2')}`, 
                    boxShadow: `0 0 15px ${colors.bg.replace('0.1', '0.1')}`, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    <FileText size={isLarge ? 32 : isSmall ? 18 : 26} color={colors.text} />
                  </div>
                  <span style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    padding: isSmall ? '4px 10px' : '8px 16px', borderRadius: '100px', fontSize: isSmall ? '0.7rem' : '0.8rem', 
                    fontWeight: 700, backgroundColor: colors.bg, color: colors.text,
                    textTransform: 'uppercase', letterSpacing: '0.06em'
                  }}>
                    {getStatusIcon(app.status)} {!isSmall && app.status}
                  </span>
                </div>
                
                <h3 style={{ fontSize: isLarge ? '1.75rem' : isSmall ? '1.15rem' : '1.35rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)', letterSpacing: '-0.3px' }}>{app.title}</h3>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: isSmall ? '0.9rem' : '1rem' }}>{app.studio}</span>
                </div>
                
                {!isSmall && (
                  <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.95rem', margin: '0 0 32px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} /> {app.location}
                  </p>
                )}
                
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {!isSmall && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Applied</span>
                      <span style={{ color: 'var(--dash-text-main)', fontSize: '1rem', fontWeight: 500 }}>{app.time.replace('Applied ', '')}</span>
                    </div>
                  )}
                  <button 
                    onClick={() => setSelectedApp(app)}
                    style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.95rem', marginLeft: isSmall ? 'auto' : 0, transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    View <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </ElectricBorder>
          );
        })}
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
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
        onClick={() => setSelectedApp(null)}
        >
          <div style={{
            backgroundColor: 'var(--dash-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '32px 32px 24px 32px', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={24} color="var(--gold)" />
                  </div>
                  <span style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', 
                    fontWeight: 700, backgroundColor: getStatusColor(selectedApp.status).bg, color: getStatusColor(selectedApp.status).text,
                    textTransform: 'uppercase', letterSpacing: '0.06em'
                  }}>
                    {getStatusIcon(selectedApp.status)} {selectedApp.status}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>{selectedApp.title}</h2>
                <p style={{ color: 'var(--gold)', fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>{selectedApp.studio}</p>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                style={{ background: 'var(--dash-surface)', border: '1px solid var(--dash-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'var(--dash-surface)', color: 'var(--dash-text-muted)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>Location</p>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main)' }}>{selectedApp.location}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'var(--dash-surface)', color: 'var(--dash-text-muted)' }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--dash-text-muted)', fontWeight: 500 }}>Applied On</p>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--dash-text-main)' }}>{selectedApp.time.replace('Applied ', '')}</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={18} color="var(--gold)" /> Role Description
                </h3>
                <div style={{ backgroundColor: 'var(--dash-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
                  <p style={{ margin: '0 0 16px 0', color: 'var(--dash-text-muted)', lineHeight: 1.6 }}>
                    We are looking for an experienced and passionate individual to join our team as a <strong>{selectedApp.title}</strong>. 
                    You will be working closely with our creative directors to bring our vision to life.
                  </p>
                  <p style={{ margin: 0, color: 'var(--dash-text-muted)', lineHeight: 1.6 }}>
                    The ideal candidate should have prior experience in similar roles and be available for the entire duration of the shoot in {selectedApp.location}.
                  </p>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="var(--gold)" /> Your Submitted Cover Letter
                </h3>
                <div style={{ backgroundColor: 'var(--dash-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
                  <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
                    "Dear Casting Team at {selectedApp.studio},<br/><br/>
                    I am writing to express my strong interest in the {selectedApp.title} role. With my background in performance and dedication to the craft, I believe I would be an excellent fit for this project. I am based in {selectedApp.location} and ready to bring my best to your production.<br/><br/>
                    Thank you for considering my application."
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'flex-end', gap: '16px', backgroundColor: 'var(--dash-surface)', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
              <button 
                onClick={() => setSelectedApp(null)}
                style={{ padding: '12px 24px', borderRadius: '999px', border: '1.5px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dash-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Close
              </button>
              <button 
                style={{ padding: '12px 24px', borderRadius: '999px', border: 'none', backgroundColor: 'var(--gold)', color: '#000', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Message Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
