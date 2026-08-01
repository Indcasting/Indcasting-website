"use client";

import Link from "next/link";
import { User, Camera, Video, FileText, Settings, Edit3, X, UploadCloud, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

export default function PortfolioPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState("Passionate actor with 5 years of experience in theatre and independent films. Always looking for challenging roles.");
  
  // Physical Attributes State
  const [isEditingAttributes, setIsEditingAttributes] = useState(false);
  const [attributes, setAttributes] = useState({
    height: "5'10\"",
    weight: "160 lbs",
    eyeColor: "Brown",
    hairColor: "Black"
  });

  // Upload Modals State
  const [isHeadshotModalOpen, setIsHeadshotModalOpen] = useState(false);
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = (type: 'headshot' | 'showreel') => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        if (type === 'headshot') setIsHeadshotModalOpen(false);
        if (type === 'showreel') setIsShowreelModalOpen(false);
      }, 1500);
    }, 2000);
  };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="var(--gold)" /> About
          </h3>
          {!isEditingAbout && (
            <button 
              onClick={() => setIsEditingAbout(true)}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              title="Edit About"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>
        
        {isEditingAbout ? (
          <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
            <textarea 
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid var(--gold)',
                backgroundColor: 'var(--dash-bg)',
                color: 'var(--dash-text-main)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                marginBottom: '12px',
                boxShadow: '0 0 0 2px rgba(232, 169, 58, 0.1)'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                onClick={() => setIsEditingAbout(false)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--dash-border)', background: 'transparent', color: 'var(--dash-text-main)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditingAbout(false)}
                style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: 'var(--gold)', color: '#000', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--dash-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
            {aboutText}
          </p>
        )}
        
        <div style={{ margin: '24px 0', borderTop: '1px solid var(--dash-border)' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--dash-text-main)' }}>Physical Attributes</h3>
          {!isEditingAttributes && (
            <button 
              onClick={() => setIsEditingAttributes(true)}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              title="Edit Attributes"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>
        
        {isEditingAttributes ? (
          <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {Object.keys(attributes).map((key) => (
                <li key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--dash-text-muted)', fontSize: '0.95rem', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <input 
                    type="text" 
                    value={attributes[key as keyof typeof attributes]}
                    onChange={(e) => setAttributes({...attributes, [key]: e.target.value})}
                    style={{ 
                      width: '120px', 
                      padding: '6px 8px', 
                      borderRadius: '4px', 
                      border: '1px solid var(--gold)', 
                      backgroundColor: 'var(--dash-bg)', 
                      color: 'var(--dash-text-main)',
                      fontSize: '0.9rem',
                      textAlign: 'right'
                    }}
                  />
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                onClick={() => setIsEditingAttributes(false)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--dash-border)', background: 'transparent', color: 'var(--dash-text-main)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditingAttributes(false)}
                style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: 'var(--gold)', color: '#000', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Height</span> <strong>{attributes.height}</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Weight</span> <strong>{attributes.weight}</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Eye Color</span> <strong>{attributes.eyeColor}</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Hair Color</span> <strong>{attributes.hairColor}</strong></li>
          </ul>
        )}
      </div>

      <div className="col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="dashboard-card-ui" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}><Camera size={20} color="var(--gold)" /> Headshots</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--dash-bg-card)', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Photo 1</div>
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--dash-bg-card)', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Photo 2</div>
            <div 
              onClick={() => setIsHeadshotModalOpen(true)}
              style={{ aspectRatio: '3/4', backgroundColor: 'var(--dash-hover-bg)', borderRadius: '8px', border: '1px dashed var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s' }}
            >
              + Add New
            </div>
          </div>
        </div>

        <div className="dashboard-card-ui" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--dash-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}><Video size={20} color="var(--gold)" /> Showreels</h3>
          <div style={{ width: '100%', height: '240px', backgroundColor: 'var(--dash-bg-card)', borderRadius: '8px', border: '1px dashed var(--dash-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--dash-text-muted)', gap: '12px' }}>
            <Video size={32} />
            <p>Upload a video reel to showcase your talent</p>
            <button 
              onClick={() => setIsShowreelModalOpen(true)}
              className="dash-btn-outline" 
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              Upload Video
            </button>
          </div>
        </div>
      </div>
      
      {/* Headshot Upload Modal */}
      {isHeadshotModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={() => !isUploading && setIsHeadshotModalOpen(false)}
        >
          <div style={{
            backgroundColor: 'var(--dash-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--dash-text-main)' }}>Upload Headshot</h2>
              {!isUploading && !uploadSuccess && (
                <button 
                  onClick={() => setIsHeadshotModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--dash-text-muted)', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              {uploadSuccess ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px 0', animation: 'fadeIn 0.3s ease-out' }}>
                  <CheckCircle size={64} color="#10b981" />
                  <h3 style={{ margin: 0, color: 'var(--dash-text-main)', fontSize: '1.5rem', fontWeight: 700 }}>Upload Successful!</h3>
                  <p style={{ margin: 0, color: 'var(--dash-text-muted)' }}>Your headshot has been added to your portfolio.</p>
                </div>
              ) : (
                <>
                  <div style={{ 
                    width: '100%', 
                    height: '200px', 
                    border: '2px dashed var(--dash-border)', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px',
                    backgroundColor: 'var(--dash-bg-card)',
                    cursor: 'pointer'
                  }}>
                    <UploadCloud size={48} color="var(--dash-text-muted)" />
                    <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.95rem' }}>Drag and drop or click to browse</p>
                    <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.8rem', opacity: 0.7 }}>JPG, PNG up to 10MB</p>
                  </div>
                  <button 
                    onClick={() => handleUpload('headshot')}
                    disabled={isUploading}
                    style={{ 
                      width: '100%', 
                      padding: '14px', 
                      borderRadius: '12px', 
                      border: 'none', 
                      backgroundColor: 'var(--gold)', 
                      color: '#000', 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: isUploading ? 0.8 : 1
                    }}
                  >
                    {isUploading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Uploading...</> : 'Upload File'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Showreel Upload Modal */}
      {isShowreelModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={() => !isUploading && setIsShowreelModalOpen(false)}
        >
          <div style={{
            backgroundColor: 'var(--dash-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--dash-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--dash-text-main)' }}>Add Showreel</h2>
              {!isUploading && !uploadSuccess && (
                <button 
                  onClick={() => setIsShowreelModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--dash-text-muted)', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {uploadSuccess ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px 0', animation: 'fadeIn 0.3s ease-out' }}>
                  <CheckCircle size={64} color="#10b981" />
                  <h3 style={{ margin: 0, color: 'var(--dash-text-main)', fontSize: '1.5rem', fontWeight: 700 }}>Showreel Added!</h3>
                  <p style={{ margin: 0, color: 'var(--dash-text-muted)' }}>Your showreel is now visible on your profile.</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--dash-text-main)', fontWeight: 500 }}>YouTube or Vimeo Link</label>
                    <input 
                      type="text" 
                      placeholder="https://youtube.com/watch?v=..."
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid var(--dash-border)',
                        backgroundColor: 'var(--dash-bg-card)',
                        color: 'var(--dash-text-main)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--dash-border)' }}></div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--dash-text-muted)' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--dash-border)' }}></div>
                  </div>
                  
                  <div style={{ 
                    width: '100%', 
                    padding: '32px 20px', 
                    border: '2px dashed var(--dash-border)', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px',
                    backgroundColor: 'var(--dash-bg-card)',
                    cursor: 'pointer'
                  }}>
                    <UploadCloud size={32} color="var(--dash-text-muted)" />
                    <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.95rem' }}>Upload Video File (MP4, up to 100MB)</p>
                  </div>

                  <button 
                    onClick={() => handleUpload('showreel')}
                    disabled={isUploading}
                    style={{ 
                      width: '100%', 
                      padding: '14px', 
                      borderRadius: '12px', 
                      border: 'none', 
                      backgroundColor: 'var(--gold)', 
                      color: '#000', 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: isUploading ? 0.8 : 1,
                      marginTop: '8px'
                    }}
                  >
                    {isUploading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</> : 'Save Showreel'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
