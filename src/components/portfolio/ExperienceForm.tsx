import React from "react";
import { Experience } from "@/types/portfolio";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: Props) {
  const handleAdd = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      employmentType: "Full-time",
      startDate: "",
      endDate: "",
      description: ""
    };
    onChange([...data, newExp]);
  };

  const handleUpdate = (id: string, field: keyof Experience, value: string) => {
    onChange(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  return (
    <div className="portfolio-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: 0 }}>Experience</h3>
        <button onClick={handleAdd} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--gold)', border: '1px solid var(--gold)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.map((exp, index) => (
          <div key={exp.id} style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', position: 'relative' }}>
            <button onClick={() => handleRemove(exp.id)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
            
            <h4 style={{ margin: '0 0 16px 0', color: 'var(--dash-text-main)' }}>Experience #{index + 1}</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Company / Production</label>
                <input type="text" value={exp.company} onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="Company Name" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Role / Title</label>
                <input type="text" value={exp.role} onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="e.g. Lead Actor" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Employment Type</label>
                <select value={exp.employmentType} onChange={(e) => handleUpdate(exp.id, 'employmentType', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Start Date</label>
                <input type="month" value={exp.startDate} onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>End Date</label>
                <input type="month" value={exp.endDate} onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Description</label>
              <textarea value={exp.description} onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', resize: 'vertical' }} placeholder="Describe your responsibilities and achievements..."></textarea>
            </div>
          </div>
        ))}
        {data.length === 0 && <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>No experience added yet.</p>}
      </div>
    </div>
  );
}
