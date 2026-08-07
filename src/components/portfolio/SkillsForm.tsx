import React, { useState, useRef } from "react";
import { Skill } from "@/types/portfolio";
import { Plus, X, GripVertical } from "lucide-react";

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: Props) {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProficiency, setNewSkillProficiency] = useState<Skill["proficiency"]>("Intermediate");
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

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

  const handleSort = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const _data = [...data];
      const draggedItemContent = _data.splice(dragItem.current, 1)[0];
      _data.splice(dragOverItem.current, 0, draggedItemContent);
      onChange(_data);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="portfolio-section">
      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--gold)', fontWeight: 600 }}>Professional Skills</h3>
      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '24px' }}>Add your key skills and reorder them by dragging the handles.</p>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'flex-end', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Skill Name</label>
          <input 
            type="text" 
            value={newSkillName} 
            onChange={(e) => setNewSkillName(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            style={inputStyle} 
            placeholder="E.g. Acting, Dancing, Video Editing" 
          />
        </div>
        <div style={{ width: '180px' }}>
          <label style={labelStyle}>Proficiency</label>
          <select 
            value={newSkillProficiency} 
            onChange={(e) => setNewSkillProficiency(e.target.value as Skill["proficiency"])}
            style={inputStyle}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <button onClick={handleAdd} style={{ padding: '14px 24px', borderRadius: '12px', backgroundColor: 'var(--gold)', color: '#000', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:-translate-y-1 hover:shadow-lg">
          <Plus size={18} strokeWidth={2.5} /> Add Skill
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {data.map((skill, index) => (
          <div 
            key={skill.id} 
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(212,175,55,0.05)', 
              border: '1px solid rgba(212,175,55,0.2)', cursor: 'grab', transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            className="hover:border-yellow-600 hover:bg-yellow-900/10 group"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <GripVertical size={16} color="#666" style={{ cursor: 'grab' }} className="group-hover:text-yellow-600" />
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</div>
                <div style={{ color: 'var(--gold)', fontSize: '0.75rem', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{skill.proficiency}</div>
              </div>
            </div>
            <button onClick={() => handleRemove(skill.id)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '28px', height: '28px', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} className="hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30">
              <X size={14} />
            </button>
          </div>
        ))}
        {data.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>No skills added yet. Add your first skill above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#aaa', fontWeight: 500, letterSpacing: '0.02em' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'all 0.2s', fontSize: '0.95rem' };
