"use client";

import { useState } from "react";
import { Search, MapPin, Star, MessageSquare, ExternalLink, UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ShortlistedTalent() {
  const router = useRouter();
  const [talent, setTalent] = useState([
    { id: 1, name: "Aria Sharma", role: "Actor", exp: "5 Years", loc: "Mumbai", rating: 4.8 },
    { id: 2, name: "Rahul Verma", role: "Model", exp: "2 Years", loc: "Delhi", rating: 4.5 },
    { id: 3, name: "Neha Singh", role: "Dancer", exp: "8 Years", loc: "Bengaluru", rating: 4.9 },
    { id: 4, name: "Karan Patel", role: "Voice Artist", exp: "4 Years", loc: "Remote", rating: 4.7 }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTalent = talent.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessage = (name: string) => {
    // Navigate to messages
    router.push(`/messages`);
  };

  const handleShare = (name: string) => {
    // Mock sharing by copying a dummy link
    navigator.clipboard.writeText(`https://indcasting.com/talent/${name.replace(/\s+/g, '-').toLowerCase()}`);
    alert(`Link for ${name}'s profile copied to clipboard!`);
  };

  const handleRemove = (id: number) => {
    // Remove talent from shortlisted
    setTalent(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--dash-text-main)' }}>Shortlisted Talent</h2>
          <p style={{ color: 'var(--dash-text-muted)', marginTop: '8px', fontSize: '1.05rem' }}>Review and manage your top candidates.</p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dash-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search talent..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '12px 20px 12px 44px', borderRadius: '999px', border: '1.5px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', color: 'var(--dash-text-main)', outline: 'none' }} 
          />
        </div>
      </div>

      {filteredTalent.map(t => (
        <div key={t.id} className="col-span-3 dashboard-card-ui" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--dash-hover-bg)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ fontSize: '32px' }}>👤</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--dash-text-main)' }}>{t.name}</h3>
          <p style={{ color: 'var(--dash-gold)', margin: '0 0 8px 0', fontWeight: 600, fontSize: '0.95rem' }}>{t.role}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--dash-text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
            <MapPin size={14} /> {t.loc} • {t.exp}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '4px 12px', borderRadius: '100px', color: 'var(--dash-gold)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '24px' }}>
            <Star size={16} fill="currentColor" /> {t.rating}
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <button onClick={() => handleMessage(t.name)} style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--dash-gold)', color: '#000', fontWeight: 600, cursor: 'pointer' }}>
              <MessageSquare size={16} /> Message
            </button>
            <button onClick={() => handleShare(t.name)} style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', cursor: 'pointer' }}>
              <ExternalLink size={16} />
            </button>
            <button onClick={() => handleRemove(t.id)} style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', cursor: 'pointer' }}>
              <UserMinus size={16} />
            </button>
          </div>
        </div>
      ))}

      {filteredTalent.length === 0 && (
        <div className="col-span-12" style={{ padding: '60px 0', textAlign: 'center', color: 'var(--dash-text-muted)' }}>
          <p>No shortlisted talent found matching your search.</p>
        </div>
      )}
    </div>
  );
}
