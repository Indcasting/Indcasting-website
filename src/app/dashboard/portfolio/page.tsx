"use client";

import Link from "next/link";
import { User, Camera, Video, FileText, Settings, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

export default function PortfolioPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      
      {/* Profile Header */}
      <div className="col-span-12 dashboard-card-ui" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '160px', backgroundColor: 'var(--dash-bg-card)', borderBottom: '1px solid var(--dash-border)' }}></div>
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-60px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--dash-bg)', backgroundColor: 'var(--dash-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={48} color="var(--dash-text-muted)" />
            </div>
            <div style={{ paddingBottom: '8px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{user?.name || "Abhiroop Chatterjee"}</h2>
              <p style={{ color: 'var(--dash-text-muted)', margin: 0, textTransform: 'capitalize' }}>{user?.role === 'seeker' ? 'Casting Director' : 'Actor, Model'} | Mumbai</p>
            </div>
          </div>
          <Link href="/dashboard/settings" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(232, 169, 58, 0.1)', color: 'var(--gold)', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
            <Edit3 size={16} /> Edit Profile
          </Link>
        </div>
      </div>

      <div className="col-span-4 dashboard-card-ui" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={20} color="var(--gold)" /> About</h3>
        <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>Passionate actor with 5 years of experience in theatre and independent films. Always looking for challenging roles.</p>
        
        <div style={{ margin: '24px 0', borderTop: '1px solid var(--dash-border)' }}></div>
        
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)' }}>Physical Attributes</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Height</span> <strong>5'10"</strong></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Weight</span> <strong>160 lbs</strong></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Eye Color</span> <strong>Brown</strong></li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Hair Color</span> <strong>Black</strong></li>
        </ul>
      </div>

      <div className="col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="dashboard-card-ui" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}><Camera size={20} color="var(--gold)" /> Headshots</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--dash-bg-card)', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Photo 1</div>
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--dash-bg-card)', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Photo 2</div>
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--dash-bg-card)', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontWeight: 600, cursor: 'pointer' }}>+ Add New</div>
          </div>
        </div>

        <div className="dashboard-card-ui" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}><Video size={20} color="var(--gold)" /> Showreels</h3>
          <div style={{ width: '100%', height: '240px', backgroundColor: 'var(--dash-bg-card)', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', gap: '12px' }}>
            <Video size={32} />
            <p>Upload a video reel to showcase your talent</p>
            <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid var(--gold)', backgroundColor: 'transparent', color: 'var(--gold)', fontWeight: 600, cursor: 'pointer' }}>Upload Video</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
