import React from "react";
import { Education } from "@/types/portfolio";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: Props) {
  const handleAdd = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      specialization: "",
      startYear: "",
      endYear: "",
      score: ""
    };
    onChange([...data, newEdu]);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="portfolio-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: 0 }}>Education</h3>
        <button onClick={handleAdd} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--gold)', border: '1px solid var(--gold)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Plus size={16} /> Add Education
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.map((edu, index) => (
          <div key={edu.id} style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', position: 'relative' }}>
            <button onClick={() => handleRemove(edu.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
            
            <h4 style={{ margin: '0 0 16px 0', color: 'var(--dash-text-main)' }}>Education #{index + 1}</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Institution Name</label>
                <input type="text" value={edu.institution} onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. National School of Drama" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Degree / Certificate</label>
                <input type="text" value={edu.degree} onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. Diploma" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Specialization</label>
                <input type="text" value={edu.specialization} onChange={(e) => handleUpdate(edu.id, 'specialization', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. Acting" />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Start Year</label>
                  <input type="text" value={edu.startYear} onChange={(e) => handleUpdate(edu.id, 'startYear', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="YYYY" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>End Year</label>
                  <input type="text" value={edu.endYear} onChange={(e) => handleUpdate(edu.id, 'endYear', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="YYYY" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Score / CGPA</label>
                <input type="text" value={edu.score} onChange={(e) => handleUpdate(edu.id, 'score', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. 8.5" />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>No education added yet.</p>}
      </div>
    </div>
  );
}
