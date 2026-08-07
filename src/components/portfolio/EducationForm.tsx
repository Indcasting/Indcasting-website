import React, { useState } from "react";
import { Education } from "@/types/portfolio";
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = Date.now().toString();
    const newEdu: Education = {
      id: newId,
      institution: "",
      degree: "",
      specialization: "",
      startYear: "",
      endYear: "",
      score: ""
    };
    onChange([newEdu, ...data]);
    setExpandedId(newId);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="portfolio-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: '0 0 8px 0', fontWeight: 600 }}>Education & Training</h3>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>Showcase your academic background and professional training.</p>
        </div>
        <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'var(--gold)', color: '#000', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:-translate-y-1 hover:shadow-lg">
          <Plus size={18} strokeWidth={2.5} /> Add Education
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
        {/* Timeline line */}
        {data.length > 0 && <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px', background: 'rgba(212,175,55,0.2)', zIndex: 0 }} />}

        {data.map((edu, index) => {
          const isExpanded = expandedId === edu.id;
          
          return (
            <div key={edu.id} style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1, marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#111', border: '2px solid rgba(212,175,55,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <GraduationCap size={20} color="var(--gold)" />
              </div>
              
              <div style={{ flex: 1, background: isExpanded ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', border: '1px solid', borderColor: isExpanded ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s' }}>
                {/* Header (Always Visible) */}
                <div onClick={() => toggleExpand(edu.id)} style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} className="hover:bg-white/5">
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1.05rem', fontWeight: 600 }}>{edu.degree || "Degree / Certificate"}</h4>
                    <div style={{ color: '#aaa', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: 'var(--gold)' }}>{edu.institution || "Institution"}</span>
                      {edu.startYear && <span>• {edu.startYear} {edu.endYear ? `- ${edu.endYear}` : '- Present'}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={(e) => { e.stopPropagation(); handleRemove(edu.id); }} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '8px', borderRadius: '50%', transition: 'all 0.2s' }} className="hover:bg-red-500/20 hover:text-red-400">
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
                        <label style={labelStyle}>Institution Name</label>
                        <input type="text" value={edu.institution} onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)} style={inputStyle} placeholder="E.g. National School of Drama" />
                      </div>
                      <div className="input-group">
                        <label style={labelStyle}>Degree / Certificate</label>
                        <input type="text" value={edu.degree} onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)} style={inputStyle} placeholder="E.g. Diploma" />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                      <div className="input-group">
                        <label style={labelStyle}>Specialization</label>
                        <input type="text" value={edu.specialization} onChange={(e) => handleUpdate(edu.id, 'specialization', e.target.value)} style={inputStyle} placeholder="E.g. Acting" />
                      </div>
                      <div className="input-group" style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={labelStyle}>Start Year</label>
                          <input type="text" value={edu.startYear} onChange={(e) => handleUpdate(edu.id, 'startYear', e.target.value)} style={inputStyle} placeholder="YYYY" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={labelStyle}>End Year</label>
                          <input type="text" value={edu.endYear} onChange={(e) => handleUpdate(edu.id, 'endYear', e.target.value)} style={inputStyle} placeholder="YYYY" />
                        </div>
                      </div>
                      <div className="input-group">
                        <label style={labelStyle}>Score / CGPA</label>
                        <input type="text" value={edu.score} onChange={(e) => handleUpdate(edu.id, 'score', e.target.value)} style={inputStyle} placeholder="E.g. 8.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {data.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>No education history added. Click 'Add Education' to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#aaa', fontWeight: 500, letterSpacing: '0.02em' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'all 0.2s', fontSize: '0.95rem' };
