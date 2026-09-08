import React, { useState } from "react";
import { Experience } from "@/types/portfolio";
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase } from "lucide-react";

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = Date.now().toString();
    const newExp: Experience = {
      id: newId,
      company: "",
      role: "",
      employmentType: "Full-time",
      startDate: "",
      endDate: "",
      description: ""
    };
    onChange([newExp, ...data]);
    setExpandedId(newId);
  };

  const handleUpdate = (id: string, field: keyof Experience, value: string) => {
    onChange(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="portfolio-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: '0 0 8px 0', fontWeight: 600 }}>Professional Experience</h3>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>Detail your past roles to build a comprehensive timeline of your career.</p>
        </div>
        <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'var(--gold)', color: '#000', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:-translate-y-1 hover:shadow-lg">
          <Plus size={18} strokeWidth={2.5} /> Add Role
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
        {/* Timeline line */}
        {data.length > 0 && <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px', background: 'rgba(212,175,55,0.2)', zIndex: 0 }} />}

        {data.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          
          return (
            <div key={exp.id} style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1, marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#111', border: '2px solid rgba(212,175,55,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <Briefcase size={20} color="var(--gold)" />
              </div>
              
              <div style={{ flex: 1, background: isExpanded ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', border: '1px solid', borderColor: isExpanded ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s' }}>
                {/* Header (Always Visible) */}
                <div onClick={() => toggleExpand(exp.id)} style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} className="hover:bg-white/5">
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1.05rem', fontWeight: 600 }}>{exp.role || "Role / Title"}</h4>
                    <div style={{ color: '#aaa', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: 'var(--gold)' }}>{exp.company || "Company"}</span>
                      {exp.startDate && <span>• {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={(e) => { e.stopPropagation(); handleRemove(exp.id); }} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '8px', borderRadius: '50%', transition: 'all 0.2s' }} className="hover:bg-red-500/20 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                    {isExpanded ? <ChevronUp size={20} color="#888" /> : <ChevronDown size={20} color="#888" />}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="input-group">
                        <label style={labelStyle}>Company / Production</label>
                        <input type="text" value={exp.company} onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)} style={inputStyle} placeholder="Company Name" />
                      </div>
                      <div className="input-group">
                        <label style={labelStyle}>Role / Title</label>
                        <input type="text" value={exp.role} onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)} style={inputStyle} placeholder="e.g. Lead Actor" />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="input-group">
                        <label style={labelStyle}>Employment Type</label>
                        <select value={exp.employmentType} onChange={(e) => handleUpdate(exp.id, 'employmentType', e.target.value)} style={inputStyle}>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Freelance">Freelance</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label style={labelStyle}>Start Date</label>
                        <input type="month" value={exp.startDate} onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)} style={inputStyle} />
                      </div>
                      <div className="input-group">
                        <label style={labelStyle}>End Date</label>
                        <input type="month" value={exp.endDate} onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)} style={inputStyle} />
                      </div>
                    </div>

                    <div className="input-group">
                      <label style={labelStyle}>Description & Achievements</label>
                      <textarea value={exp.description} onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your responsibilities and achievements..."></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {data.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>No experience history added. Click 'Add Role' to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#aaa', fontWeight: 500, letterSpacing: '0.02em' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'all 0.2s', fontSize: '0.95rem' };
