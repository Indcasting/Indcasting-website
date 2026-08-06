import React, { useState } from "react";
import { Skill } from "@/types/portfolio";
import { Plus, X } from "lucide-react";

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: Props) {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProficiency, setNewSkillProficiency] = useState<Skill["proficiency"]>("Intermediate");

  const handleAdd = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      proficiency: newSkillProficiency
    };
    onChange([...data, newSkill]);
    setNewSkillName("");
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(s => s.id !== id));
  };

  return (
    <div className="portfolio-section">
      <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--gold)' }}>Skills</h3>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Skill Name</label>
          <input 
            type="text" 
            value={newSkillName} 
            onChange={(e) => setNewSkillName(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} 
            placeholder="E.g. Acting, Dancing, Video Editing" 
          />
        </div>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Proficiency</label>
          <select 
            value={newSkillProficiency} 
            onChange={(e) => setNewSkillProficiency(e.target.value as Skill["proficiency"])}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <button onClick={handleAdd} style={{ padding: '12px 20px', borderRadius: '8px', backgroundColor: 'var(--gold)', color: '#000', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Plus size={18} /> Add
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {data.map(skill => (
          <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', backgroundColor: 'rgba(232, 169, 58, 0.1)', border: '1px solid rgba(232, 169, 58, 0.3)' }}>
            <div>
              <span style={{ color: 'var(--dash-text-main)', fontWeight: 'bold' }}>{skill.name}</span>
              <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.8rem', marginLeft: '6px' }}>({skill.proficiency})</span>
            </div>
            <button onClick={() => handleRemove(skill.id)} style={{ background: 'none', border: 'none', color: 'var(--dash-text-muted)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}>
              <X size={14} />
            </button>
          </div>
        ))}
        {data.length === 0 && <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem' }}>No skills added yet.</p>}
      </div>
    </div>
  );
}
