import React from "react";
import { Project } from "@/types/portfolio";
import { Plus, Trash2, Image as ImageIcon, Video, Star } from "lucide-react";

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: Props) {
  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: [],
      githubLink: "",
      liveDemoLink: "",
      images: [],
      video: "",
      featured: false
    };
    onChange([...data, newProject]);
  };

  const handleUpdate = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(p => p.id !== id));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const project = data.find(p => p.id === id);
        if (project) {
          handleUpdate(id, 'images', [...project.images, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="portfolio-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: 0 }}>Projects</h3>
        <button onClick={handleAdd} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--gold)', border: '1px solid var(--gold)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.map((project, index) => (
          <div key={project.id} style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '8px' }}>
              <button onClick={() => handleUpdate(project.id, 'featured', !project.featured)} style={{ background: 'none', border: 'none', color: project.featured ? 'var(--gold)' : 'var(--dash-text-muted)', cursor: 'pointer', padding: '4px' }} title="Toggle Featured">
                <Star size={18} fill={project.featured ? "var(--gold)" : "none"} />
              </button>
              <button onClick={() => handleRemove(project.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                <Trash2 size={18} />
              </button>
            </div>
            
            <h4 style={{ margin: '0 0 16px 0', color: 'var(--dash-text-main)' }}>Project #{index + 1}</h4>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Project Title</label>
              <input type="text" value={project.title} onChange={(e) => handleUpdate(project.id, 'title', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="E.g. E-Commerce App" />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Description</label>
              <textarea value={project.description} onChange={(e) => handleUpdate(project.id, 'description', e.target.value)} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)', resize: 'vertical' }} placeholder="What is this project about?"></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>GitHub/Code Link</label>
                <input type="url" value={project.githubLink} onChange={(e) => handleUpdate(project.id, 'githubLink', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="https://github.com/..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Live Demo Link</label>
                <input type="url" value={project.liveDemoLink} onChange={(e) => handleUpdate(project.id, 'liveDemoLink', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--dash-border)', backgroundColor: 'transparent', color: 'var(--dash-text-main)' }} placeholder="https://..." />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dash-text-main)' }}>Media (Images)</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {project.images.map((img, i) => (
                  <div key={i} style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', position: 'relative', border: '1px solid var(--dash-border)' }}>
                    <img src={img} alt={`Project media ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                <div style={{ width: '80px', height: '80px', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
                  <ImageIcon size={24} color="var(--dash-text-muted)" />
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(project.id, e)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
              </div>
            </div>

          </div>
        ))}
        {data.length === 0 && <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>No projects added yet.</p>}
      </div>
    </div>
  );
}
