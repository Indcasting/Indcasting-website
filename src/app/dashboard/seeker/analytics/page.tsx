"use client";

import { TrendingUp, Users, FileText, CheckCircle, BarChart2 } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

export default function SeekerAnalytics() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--dash-text-main)' }}>Analytics & Performance</h2>
        <p style={{ color: 'var(--dash-text-muted)', marginTop: '8px', fontSize: '1.05rem' }}>Track the performance of your casting calls and applications.</p>
      </div>

      <div className="col-span-3 dashboard-card-ui" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><FileText size={20} /></div>
          <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dash-text-main)' }}>Total Applications</h3>
        </div>
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--dash-text-main)' }}>1,248</p>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#10b981' }}>+12% from last month</p>
      </div>
      
      <div className="col-span-3 dashboard-card-ui" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Users size={20} /></div>
          <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dash-text-main)' }}>Shortlisted</h3>
        </div>
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--dash-text-main)' }}>142</p>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#10b981' }}>+5% from last month</p>
      </div>

      <div className="col-span-3 dashboard-card-ui" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--dash-gold)' }}><CheckCircle size={20} /></div>
          <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dash-text-main)' }}>Hired</h3>
        </div>
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--dash-text-main)' }}>34</p>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#ef4444' }}>-2% from last month</p>
      </div>

      <div className="col-span-3 dashboard-card-ui" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}><TrendingUp size={20} /></div>
          <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dash-text-main)' }}>Conversion Rate</h3>
        </div>
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--dash-text-main)' }}>2.7%</p>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#10b981' }}>+0.4% from last month</p>
      </div>

      <div className="col-span-8">
        <DashboardCard title="Applications Over Time">
          <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '16px', paddingTop: '40px', position: 'relative' }}>
            {/* Background grid lines */}
            <div style={{ position: 'absolute', top: '40px', left: 0, right: 0, bottom: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
              {[100, 75, 50, 25, 0].map(line => (
                <div key={line} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                  <span style={{ fontSize: '11px', color: 'var(--dash-text-muted)', width: '30px', textAlign: 'right' }}>{line * 20}</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--dash-border)', opacity: 0.5 }}></div>
                </div>
              ))}
            </div>
            
            {/* Mock Chart */}
            <div style={{ display: 'flex', flex: 1, gap: '12px', height: '100%', paddingLeft: '42px', zIndex: 1 }}>
              {[30, 45, 60, 40, 80, 55, 90, 75, 65, 85, 50, 70].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }} className="chart-col">
                  <div className="chart-bar" style={{ 
                    width: '100%', 
                    maxWidth: '40px',
                    height: `${h}%`, 
                    background: i === 6 ? 'linear-gradient(180deg, var(--gold) 0%, rgba(200, 155, 60, 0.1) 100%)' : 'linear-gradient(180deg, rgba(200, 155, 60, 0.4) 0%, rgba(200, 155, 60, 0.05) 100%)',
                    borderRadius: '4px 4px 0 0',
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
                      {h * 20} Apps
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: i === 6 ? 'var(--gold)' : 'var(--dash-text-muted)' }}>{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="col-span-4">
        <DashboardCard title="Casting Performance">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>Lead Actor - Indie Film</span>
                <span style={{ fontSize: '14px', color: 'var(--dash-text-muted)' }}>45 Apps</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--dash-border)', borderRadius: '99px' }}>
                <div style={{ width: '75%', height: '100%', backgroundColor: 'var(--dash-gold)', borderRadius: '99px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>Background Dancer</span>
                <span style={{ fontSize: '14px', color: 'var(--dash-text-muted)' }}>120 Apps</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--dash-border)', borderRadius: '99px' }}>
                <div style={{ width: '90%', height: '100%', backgroundColor: '#10b981', borderRadius: '99px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>Commercial Model</span>
                <span style={{ fontSize: '14px', color: 'var(--dash-text-muted)' }}>85 Apps</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--dash-border)', borderRadius: '99px' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '99px' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
