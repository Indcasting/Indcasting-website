import React from "react";
import { Project } from "@/types/portfolio";
import { Plus, Trash2, Image as ImageIcon, Star, ExternalLink, Code } from "lucide-react";

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
    onChange([newProject, ...data]);
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
          // Setting the first image as the main cover for the Behance style
          handleUpdate(id, 'images', [reader.result as string, ...project.images.slice(1)]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="portfolio-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', margin: '0 0 8px 0', fontWeight: 600 }}>Portfolio & Projects</h3>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>Showcase your best work with stunning visual galleries.</p>
        </div>
        <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'var(--gold)', color: '#000', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:-translate-y-1 hover:shadow-lg">
          <Plus size={18} strokeWidth={2.5} /> Create Project
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {data.map((project, index) => {
          const coverImage = project.images[0];
          
          return (
            <div key={project.id} style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }} className="hover:border-yellow-600/50 hover:shadow-2xl hover:shadow-yellow-900/10 group">
              
              {/* Cover Image Area */}
              <div style={{ height: '220px', background: coverImage ? `url(${coverImage}) center/cover` : 'rgba(0,0,0,0.5)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!coverImage && (
                  <div style={{ color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                    <ImageIcon size={48} style={{ margin: '0 auto 8px auto' }} />
                    <span style={{ fontSize: '0.85rem' }}>Add Cover Image</span>
                  </div>
                )}
                
                {/* Floating Actions */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', opacity: coverImage ? 0 : 1, transition: 'opacity 0.2s' }} className="group-hover:opacity-100">
                  <button onClick={() => handleUpdate(project.id, 'featured', !project.featured)} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', color: project.featured ? 'var(--gold)' : '#fff', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-black">
                    <Star size={16} fill={project.featured ? "var(--gold)" : "none"} />
                  </button>
                  <button onClick={() => handleRemove(project.id)} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-red-500/20">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Upload Overlay */}
                <label style={{ position: 'absolute', inset: 0, cursor: 'pointer', opacity: 0 }} title="Upload Cover Image">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(project.id, e)} style={{ display: 'none' }} />
                </label>
              </div>

              {/* Editable Details */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="text" 
                  value={project.title} 
                  onChange={(e) => handleUpdate(project.id, 'title', e.target.value)} 
                  style={{ ...inputStyle, fontSize: '1.1rem', fontWeight: 600, padding: '8px 12px', background: 'transparent', border: '1px solid transparent', borderBottomColor: 'rgba(255,255,255,0.1)' }} 
                  className="focus:border-yellow-600 focus:bg-black/20"
                  placeholder="Project Title" 
                />
                
                <textarea 
                  value={project.description} 
                  onChange={(e) => handleUpdate(project.id, 'description', e.target.value)} 
                  rows={3} 
                  style={{ ...inputStyle, fontSize: '0.9rem', padding: '12px', resize: 'vertical' }} 
                  placeholder="Describe the project, your role, and the impact..."
                ></textarea>

                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <ExternalLink size={14} color="#666" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                    <input type="url" value={project.liveDemoLink} onChange={(e) => handleUpdate(project.id, 'liveDemoLink', e.target.value)} style={{ ...inputStyle, paddingLeft: '36px', fontSize: '0.85rem' }} placeholder="Live Link" />
                  </div>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Code size={14} color="#666" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                    <input type="url" value={project.githubLink} onChange={(e) => handleUpdate(project.id, 'githubLink', e.target.value)} style={{ ...inputStyle, paddingLeft: '36px', fontSize: '0.85rem' }} placeholder="Repository" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {data.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <ImageIcon size={48} color="rgba(255,255,255,0.1)" style={{ margin: '0 auto 16px auto' }} />
            <p style={{ color: '#888', fontSize: '1rem', margin: '0 0 8px 0' }}>Your portfolio is empty.</p>
            <p style={{ color: '#555', fontSize: '0.85rem', margin: 0 }}>Create a new project to start building your gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'all 0.2s' };
