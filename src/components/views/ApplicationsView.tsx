"use client";

import { useState } from "react";
import { ChevronRight, FileText, CheckCircle, Clock, XCircle, Search, Filter, Grid, LayoutList, Maximize, LayoutGrid } from "lucide-react";

type ViewMode = "tile" | "extra_large" | "details" | "small_icons";

const applicationsData = [
  { id: 1, title: 'Lead Female Actor', studio: 'Star Studios', location: 'Mumbai', status: 'Pending', time: 'Applied 2 days ago' },
  { id: 2, title: 'Fashion Model', studio: 'Elite Fashion', location: 'Delhi', status: 'Accepted', time: 'Applied 1 week ago' },
  { id: 3, title: 'Music Video Dancer', studio: 'Rhythm Productions', location: 'Bengaluru', status: 'Rejected', time: 'Applied 2 weeks ago' }
];

export default function ApplicationsView() {
  const [viewMode, setViewMode] = useState<ViewMode>("tile");

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
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em', color: 'var(--dash-text-main)' }}>
            My Applications
          </h2>
          <p style={{ color: 'var(--dash-text-muted)', marginTop: '8px', fontSize: '1.05rem' }}>
            Track every audition and casting application you've submitted.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* View Mode Toggles */}
          <div style={{ display: 'flex', backgroundColor: 'var(--dash-bg)', padding: '4px', borderRadius: '8px', border: '1px solid var(--dash-border)' }}>
            <button 
              onClick={() => setViewMode("tile")}
              style={{ background: viewMode === "tile" ? 'var(--dash-bg-card)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "tile" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Tile View"
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("extra_large")}
              style={{ background: viewMode === "extra_large" ? 'var(--dash-bg-card)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "extra_large" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Extra Large View"
            >
              <Maximize size={18} />
            </button>
            <button 
              onClick={() => setViewMode("details")}
              style={{ background: viewMode === "details" ? 'var(--dash-bg-card)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "details" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Details View"
            >
              <LayoutList size={18} />
            </button>
            <button 
              onClick={() => setViewMode("small_icons")}
              style={{ background: viewMode === "small_icons" ? 'var(--dash-bg-card)' : 'transparent', border: 'none', padding: '8px', borderRadius: '6px', color: viewMode === "small_icons" ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer' }}
              title="Small Icons View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search applications..." 
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
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '12px 20px', borderRadius: '999px', 
            border: '1.5px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', 
            color: 'var(--dash-text-main)', fontWeight: 600, cursor: 'pointer',
            transition: 'border-color 0.3s ease, background-color 0.3s ease'
          }}
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Applications Container */}
      <div style={{ display: viewMode === 'details' ? 'flex' : 'grid', ...getGridStyle() }}>
        {applicationsData.map(app => {
          const colors = getStatusColor(app.status);
          
          if (viewMode === 'details') {
            return (
              <div key={app.id} className="cat-card dashboard-card-ui" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={20} color="var(--gold)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{app.title}</h3>
                    <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>{app.studio} <span style={{ opacity: 0.6, marginLeft: '8px' }}>📍 {app.location}</span></p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)', minWidth: '130px' }}>{app.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: colors.bg, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: '100px', justifyContent: 'center' }}>
                    {getStatusIcon(app.status)} {app.status}
                  </span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    View <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          }

          const isSmall = viewMode === 'small_icons';
          const isLarge = viewMode === 'extra_large';

          return (
            <div key={app.id} className="cat-card dashboard-card-ui" style={{ padding: isLarge ? '32px' : isSmall ? '16px' : '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isSmall ? '12px' : '20px' }}>
                <div style={{ width: isLarge ? '64px' : isSmall ? '36px' : '48px', height: isLarge ? '64px' : isSmall ? '36px' : '48px', borderRadius: '12px', backgroundColor: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={isLarge ? 32 : isSmall ? 18 : 24} color="var(--gold)" />
                </div>
                <span style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', 
                  padding: isSmall ? '4px 8px' : '6px 12px', borderRadius: '100px', fontSize: isSmall ? '0.65rem' : '0.75rem', 
                  fontWeight: 700, backgroundColor: colors.bg, color: colors.text,
                  textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>
                  {getStatusIcon(app.status)} {!isSmall && app.status}
                </span>
              </div>
              <h3 style={{ fontSize: isLarge ? '1.5rem' : isSmall ? '1.05rem' : '1.2rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>{app.title}</h3>
              <p style={{ color: 'var(--dash-text-muted)', fontSize: isSmall ? '0.85rem' : '0.95rem', margin: '0 0 4px 0', fontWeight: 500 }}>{app.studio}</p>
              {!isSmall && <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.85rem', margin: '0 0 24px 0', opacity: 0.8 }}>📍 {app.location}</p>}
              
              <div style={{ borderTop: '1px solid var(--dash-border)', paddingTop: '16px', marginTop: isSmall ? '16px' : 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {!isSmall && <span style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>{app.time}</span>}
                <button style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.9rem', marginLeft: isSmall ? 'auto' : 0 }}>
                  View <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
