"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import HeroCarousel from "@/components/ui/Herocarousel";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface CastingPost {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  age: string;
  gender?: string;
  experience?: string;
  languages?: string;
  budget: string;
  description: string;
  status: "Open" | "Closed";
  userId: string;
  createdAt: string;
  deadline?: string;
}

/* ─────────────────────────────────────────
   LOCAL-STORAGE HELPERS
───────────────────────────────────────── */
function getPosts(): CastingPost[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("castingPosts") ?? "[]"); }
  catch { return []; }
}
function savePosts(posts: CastingPost[]): void {
  localStorage.setItem("castingPosts", JSON.stringify(posts));
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed: ${src}`));
    document.head.appendChild(s);
  });
}

/* ─────────────────────────────────────────
   SEED DATA (demo posts)
───────────────────────────────────────── */
const SEED: CastingPost[] = [
  {
    id: "seed-1", title: "Lead Actor — Drama Web Series", company: "Hotstar Originals",
    category: "Actor", location: "Mumbai", age: "25-35", gender: "Male",
    experience: "Intermediate", languages: "Hindi, English", budget: "80000",
    description: "Looking for a lead actor for a 10-episode drama series set in modern Delhi. Must have strong emotive range and prior OTT experience.",
    status: "Open", userId: "other-user", createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), deadline: "2025-08-30",
  },
  {
    id: "seed-2", title: "Female Model — Fashion Campaign", company: "Lakme India",
    category: "Model", location: "Delhi", age: "18-28", gender: "Female",
    experience: "Beginner", languages: "Hindi", budget: "45000",
    description: "Seeking fresh faces for our upcoming autumn collection shoot. Portfolio and comp card required.",
    status: "Open", userId: "other-user", createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), deadline: "2025-07-25",
  },
  {
    id: "seed-3", title: "Voice Artist — Animated Series", company: "Toonz Media",
    category: "Voice Artist", location: "Remote", age: "20-40", gender: "Any",
    experience: "Intermediate", languages: "Tamil, Telugu", budget: "30000",
    description: "Require voice artists for character dubbing in an animated kids' series. South Indian language proficiency mandatory.",
    status: "Closed", userId: "current-user", createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: "seed-4", title: "Dancer — Bollywood Music Video", company: "T-Series",
    category: "Dancer", location: "Mumbai", age: "18-30", gender: "Female",
    experience: "Expert", languages: "Hindi", budget: "55000",
    description: "High-energy Bollywood choreography for an upcoming music video. Classical or contemporary background preferred.",
    status: "Open", userId: "current-user", createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), deadline: "2025-08-05",
  },
];

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const CATEGORIES = [
  "Actor", "Actress", "Model", "Child Artist", "Senior Artist", "Background Artist",
  "Singer", "Musician", "Dancer", "Choreographer", "Voice Artist", "Dub Artist",
  "Anchor", "Host", "Influencer", "Content Creator", "Comedian", "Stand-up Artist",
  "Theatre Artist", "Mimicry Artist", "RJ", "VJ", "Fitness Model", "Fashion Model",
  "Print Model", "Runway Model", "Character Artist", "Lead Role", "Supporting Role",
  "Negative Role", "Casting Assistant", "Makeup Artist", "Hair Stylist", "Costume Designer",
  "Photographer", "Cinematographer", "Editor", "Video Creator", "Script Writer",
  "Director", "Assistant Director", "Production Crew", "Spot Boy", "Light Technician",
  "Camera Operator", "Stunt Performer", "Action Choreographer",
];
const GENDERS    = ["Male","Female","Any"];
const EXPERIENCE = ["Beginner","Intermediate","Expert"];
const ALL_LANGUAGES = [
  "Hindi","English","Tamil","Telugu","Bengali","Kannada",
  "Malayalam","Marathi","Gujarati","Punjabi","Odia","Urdu",
];
const SORT_OPTS  = [
  { v: "newest",      l: "Newest First" },
  { v: "oldest",      l: "Oldest First" },
  { v: "budget-high", l: "Budget: High → Low" },
  { v: "budget-low",  l: "Budget: Low → High" },
  { v: "company",     l: "Company A–Z" },
];
const BUDGET_OPTS = [
  { v: "",             l: "Any Budget" },
  { v: "0-25000",      l: "Under ₹25k" },
  { v: "25000-50000",  l: "₹25k – ₹50k" },
  { v: "50000-100000", l: "₹50k – ₹1L" },
  { v: "100000+",      l: "₹1L+" },
];

/* ─────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────── */
function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
}

/* ─────────────────────────────────────────
   CUSTOM DROPDOWN COMPONENT
───────────────────────────────────────── */
function CustomSelect({
  value, onChange, options, placeholder
}: {
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find(o => o.v === value);

  return (
    <div className="csd-wrap" ref={ref}>
      <button type="button" className={`csd-trigger${open ? " open" : ""}`} onClick={() => setOpen(o => !o)}>
        <span className={selected ? "csd-val" : "csd-placeholder"}>
          {selected ? selected.l : placeholder}
        </span>
        <span className={`csd-arrow${open ? " up" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="csd-menu">
          {options.map(o => (
            <button
              key={o.v}
              type="button"
              className={`csd-option${o.v === value ? " selected" : ""}`}
              onClick={() => { onChange(o.v); setOpen(false); }}
            >
              {o.l}
              {o.v === value && <span className="csd-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MULTI-SELECT LANGUAGE DROPDOWN
───────────────────────────────────────── */
function LanguageMultiSelect({
  value, onChange
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function toggle(lang: string) {
    if (value.includes(lang)) {
      onChange(value.filter(l => l !== lang));
    } else {
      onChange([...value, lang]);
    }
  }

  const label = value.length === 0
    ? "Any Language"
    : value.length === 1
      ? value[0]
      : `${value[0]} +${value.length - 1}`;

  return (
    <div className="csd-wrap" ref={ref}>
      <button type="button" className={`csd-trigger${open ? " open" : ""}`} onClick={() => setOpen(o => !o)}>
        <span className={value.length === 0 ? "csd-placeholder" : "csd-val"}>{label}</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {value.length > 0 && <span className="csd-count">{value.length}</span>}
          <span className={`csd-arrow${open ? " up" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </span>
        </span>
      </button>
      {open && (
        <div className="csd-menu lang-menu">
          <div className="lang-menu-header">
            <span className="lang-menu-title">Select Languages</span>
            {value.length > 0 && (
              <button type="button" className="lang-clear" onClick={() => onChange([])}>Clear all</button>
            )}
          </div>
          <div className="lang-grid">
            {ALL_LANGUAGES.map(lang => {
              const checked = value.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  className={`lang-chip${checked ? " checked" : ""}`}
                  onClick={() => toggle(lang)}
                >
                  {checked && <span className="lang-tick">✓</span>}
                  {lang}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   CASTING DETAILS MODAL
───────────────────────────────────────── */
function DetailsModal({ post, onClose }: { post: CastingPost; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="casting-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <span className="modal-badge">{post.category}</span>
        <h2 style={{ margin:"1rem 0 0.4rem", fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:900, color:"var(--ink)" }}>{post.title}</h2>
        <p style={{ marginBottom:"1.8rem", color:"var(--gold)", fontWeight:600 }}>{post.company}</p>
        <div className="modal-info">
          {[
            ["Location", post.location],
["Age Range", post.age],
["Gender", post.gender ?? "Any"],
["Experience", post.experience ?? "Any"],
["Languages", post.languages ?? "—"],
["Budget", `₹${Number(post.budget).toLocaleString("en-IN")}`],
...(post.deadline ? [["Deadline", fmt(post.deadline)]] : []),
["Posted", fmt(post.createdAt)],
          ].map(([k, v]) => (
            <div className="modal-info-item" key={k}>
              <strong style={{ fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--mid)", display:"block", marginBottom:"4px" }}>{k}</strong>
              <span style={{ fontWeight:600, color:"var(--ink)" }}>{v}</span>
            </div>
          ))}
        </div>
        <h3 style={{ marginBottom:"0.6rem", fontSize:"0.9rem", fontWeight:700, color:"var(--ink)" }}>About this role</h3>
        <div className="description">{post.description}</div>
        <div style={{ display:"flex", gap:"1rem", marginTop:"2rem", flexWrap:"wrap" }}>
          <button className="btn-gold">Apply Now</button>
          <button className="btn-outline-sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CASTING FORM
───────────────────────────────────────── */
function CastingFormSection({
  editing, onSave, onCancel
}: {
  editing: CastingPost | null;
  onSave: (p: CastingPost) => void;
  onCancel: () => void;
}) {
  type FormState = {
    title: string; company: string; category: string; location: string;
    age: string; gender: string; experience: string; languages: string;
    budget: string; description: string; status: "Open" | "Closed"; deadline: string;
  };
  const blank: FormState = {
    title:"", company:"", category:"", location:"", age:"", gender:"",
    experience:"", languages:"", budget:"", description:"", status:"Open", deadline:"",
  };
  const [f, setF] = useState<FormState>(blank);

  useEffect(() => {
    if (editing) {
      setF({
        title: editing.title, company: editing.company, category: editing.category,
        location: editing.location, age: editing.age, gender: editing.gender ?? "",
        experience: editing.experience ?? "", languages: editing.languages ?? "",
        budget: editing.budget, description: editing.description,
        status: editing.status, deadline: editing.deadline ?? "",
      });
    } else {
      setF({ ...blank });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.title || !f.company || !f.category || !f.location) {
      alert("Please fill in Title, Company, Category, and Location."); return;
    }
    const post: CastingPost = {
      ...f, id: editing?.id ?? uid(), userId: "current-user",
      createdAt: editing?.createdAt ?? new Date().toISOString(),
    };
    onSave(post);
    setF({ ...blank });
  }

  const inp = "hf-inp";
  return (
    <section className="post-form-section">
      <div className="post-form-header">
        <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,1.8rem)", fontWeight:800, color:"var(--ink)" }}>
          {editing ? "Edit Casting Call" : "✦ Post a Casting Call"}
        </h2>
        <p style={{ color:"var(--mid)", marginTop:"0.4rem" }}>
          {editing ? "Update the details below." : "Fill in the details to reach the right talent."}
        </p>
      </div>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Role / Title *</label>
          <input className={inp} placeholder="e.g. Lead Actor — Web Series" value={f.title} onChange={e=>set("title",e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Company / Production *</label>
          <input className={inp} placeholder="e.g. Netflix India" value={f.company} onChange={e=>set("company",e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Category *</label>
          <CustomSelect value={f.category} onChange={v=>set("category",v)}
            options={[{v:"",l:"Select category"},...CATEGORIES.map(c=>({v:c,l:c}))]}
            placeholder="Select category" />
        </div>
        <div className="form-field">
          <label className="form-label">Location *</label>
          <input className={inp} placeholder="e.g. Mumbai / Remote" value={f.location} onChange={e=>set("location",e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Age Range</label>
          <input className={inp} placeholder="e.g. 18-30" value={f.age} onChange={e=>set("age",e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Gender</label>
          <CustomSelect value={f.gender} onChange={v=>set("gender",v)}
            options={[{v:"",l:"Any"},...GENDERS.map(g=>({v:g,l:g}))]}
            placeholder="Any" />
        </div>
        <div className="form-field">
          <label className="form-label">Experience Level</label>
          <CustomSelect value={f.experience} onChange={v=>set("experience",v)}
            options={[{v:"",l:"Any"},...EXPERIENCE.map(x=>({v:x,l:x}))]}
            placeholder="Any" />
        </div>
        <div className="form-field">
          <label className="form-label">Languages</label>
          <LanguageMultiSelect
            value={f.languages ? f.languages.split(", ").filter(Boolean) : []}
            onChange={langs => set("languages", langs.join(", "))}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Budget (₹)</label>
          <input className={inp} type="number" placeholder="e.g. 50000" value={f.budget} onChange={e=>set("budget",e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Application Deadline</label>
          <input className={inp} type="date" value={f.deadline} onChange={e=>set("deadline",e.target.value)} />
        </div>
        <div className="form-field form-full">
          <label className="form-label">Description</label>
          <textarea className={inp} style={{ resize:"none", height:"160px" }}
            placeholder="Describe the role, requirements, shoot details…"
            value={f.description} onChange={e=>set("description",e.target.value)} />
        </div>
        {editing && (
          <div className="form-field">
            <label className="form-label">Status</label>
            <CustomSelect value={f.status} onChange={v=>set("status",v as "Open"|"Closed")}
              options={[{v:"Open",l:"Open"},{v:"Closed",l:"Closed"}]}
              placeholder="Open" />
          </div>
        )}
        <div className="form-full form-actions">
          <button type="submit" className="btn-gold">{editing ? "Save Changes" : "Post Casting Call"}</button>
          {editing && <button type="button" className="btn-outline-sm" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </section>
  );
}

/* ─────────────────────────────────────────
   FILTER BAR
───────────────────────────────────────── */
interface Filters {
  search: string; category: string; location: string;
  gender: string; experience: string; languages: string[];
  age: string; budget: string; status: string; sort: string;
}

function FilterBar({ f, set, total, onReset }: {
  f: Filters;
  set: (k: keyof Filters, v: string | string[]) => void;
  total: number;
  onReset: () => void;
}) {
  const activeCount = [f.category, f.location, f.gender, f.experience, f.age, f.budget, f.status]
    .filter(Boolean).length + (f.languages.length > 0 ? 1 : 0);

  return (
    <div className="filter-bar">
      <div className="filter-grid">
        <CustomSelect value={f.category} onChange={v=>set("category",v)}
          options={[{v:"",l:"Any Category"},...CATEGORIES.map(c=>({v:c,l:c}))]}
          placeholder="Any Category" />

        <div className="csd-wrap">
          <div style={{ position:"relative" }}>
            <svg style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--mid)", pointerEvents:"none" }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <input className="hf-inp" placeholder="Location" value={f.location} style={{ paddingLeft:"38px" }}
              onChange={e=>set("location", e.target.value)} />
          </div>
        </div>

        <CustomSelect value={f.gender} onChange={v=>set("gender",v)}
          options={[{v:"",l:"Any Gender"},...GENDERS.map(g=>({v:g,l:g}))]}
          placeholder="Any Gender" />

        <CustomSelect value={f.experience} onChange={v=>set("experience",v)}
          options={[{v:"",l:"Any Experience"},...EXPERIENCE.map(x=>({v:x,l:x}))]}
          placeholder="Any Experience" />

        <LanguageMultiSelect value={f.languages} onChange={v=>set("languages",v)} />

        <div className="csd-wrap">
          <div style={{ position:"relative" }}>
            <svg style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--mid)", pointerEvents:"none" }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <input className="hf-inp" placeholder="Age (e.g. 25)" type="number" value={f.age}
              style={{ paddingLeft:"38px" }} onChange={e=>set("age", e.target.value)} />
          </div>
        </div>

        <CustomSelect value={f.budget} onChange={v=>set("budget",v)}
          options={BUDGET_OPTS} placeholder="Any Budget" />

        <CustomSelect value={f.status} onChange={v=>set("status",v)}
          options={[{v:"",l:"Any Status"},{v:"Open",l:"Open"},{v:"Closed",l:"Closed"}]}
          placeholder="Any Status" />

        <CustomSelect value={f.sort} onChange={v=>set("sort",v)}
          options={SORT_OPTS} placeholder="Sort by" />
      </div>

      <div className="filter-footer">
        <span className="filter-result-count">{total} result{total !== 1 ? "s" : ""}</span>
        {activeCount > 0 && (
          <button className="filter-reset" onClick={onReset}>
            Clear {activeCount} filter{activeCount !== 1 ? "s" : ""} ×
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CASTING CARD (grid)
───────────────────────────────────────── */
function CastingCard({
  post, isOwn, onEdit, onDelete, onView
}: {
  post: CastingPost; isOwn: boolean;
  onEdit: (p: CastingPost) => void;
  onDelete: (id: string) => void;
  onView: (p: CastingPost) => void;
}) {
  return (
    <div className="casting-post-card" onClick={() => onView(post)} style={{ cursor:"pointer" }}>
      <div className="post-top">
  <div className="post-meta">
    <span className="post-category">
      {post.category}
    </span>

    <span className={`post-status ${post.status === "Open" ? "open" : "closed"}`}>
      {post.status}
    </span>
  </div>

  <div style={{ marginTop: "14px" }}>
    <h3
      style={{
        fontSize: "1.85rem",
        fontWeight: 800,
        color: "var(--ink)",
        lineHeight: 1.2,
        marginBottom: "6px",
      }}
    >
      {post.title}
    </h3>

    <p className="company-name">
      {post.company}
    </p>
  </div>
</div>
      <div className="casting-info">
        <div><strong>Location</strong><p>{post.location}</p></div>
        <div><strong>Age</strong><p>{post.age || "—"}</p></div>
        <div><strong>Budget</strong><p>₹{Number(post.budget || 0).toLocaleString("en-IN")}</p></div>
      </div>
      <p className="description-preview" style={{ WebkitLineClamp:2, display:"-webkit-box", WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {post.description}
      </p>
      <small>Posted {fmt(post.createdAt)}{post.deadline ? ` · Deadline ${fmt(post.deadline)}` : ""}</small>
      {isOwn && (
  <div className="post-actions" onClick={e => e.stopPropagation()}>
    <button onClick={() => onEdit(post)}>
      Edit
    </button>

    <button onClick={() => onDelete(post.id)}>
      Delete
    </button>
  </div>
)}
    </div>
  );
}

/* ─────────────────────────────────────────
   CASTING LIST ROW
───────────────────────────────────────── */
function CastingListRow({
  post, isOwn, onEdit, onDelete, onView
}: {
  post: CastingPost; isOwn: boolean;
  onEdit: (p: CastingPost) => void;
  onDelete: (id: string) => void;
  onView: (p: CastingPost) => void;
}) {
  return (
    <div className="list-row" onClick={() => onView(post)}>
      <div className="list-row-left">
        <span className="card-category-tag">{post.category}</span>
        <div style={{ marginTop:"0.4rem" }}>
          <span style={{ fontWeight:800, color:"var(--ink)", fontSize:"1rem" }}>{post.title}</span>
          <span style={{ color:"var(--mid)", fontSize:"0.85rem", marginLeft:"0.6rem" }}>{post.company}</span>
        </div>
        <div style={{ display:"flex", gap:"1rem", marginTop:"0.3rem", fontSize:"0.8rem", color:"var(--mid)", flexWrap:"wrap" }}>
          <span> {post.location}</span>
          <span>{post.age || "—"}</span>
          <span> ₹{Number(post.budget||0).toLocaleString("en-IN")}</span>
          <span>{fmt(post.createdAt)}</span>
        </div>
      </div>
      <div className="list-row-right" onClick={e=>e.stopPropagation()}>
        <span className={`status ${post.status==="Open"?"open":"closed"}`}>{post.status}</span>
        {isOwn && (
  <div className="post-actions">
    <button onClick={() => onEdit(post)}>
      Edit
    </button>

    <button onClick={() => onDelete(post.id)}>
      Delete
    </button>
  </div>
)}
        <button className="btn-outline-sm" onClick={()=>onView(post)}>View</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PostPage() {
  const gsapLoaded = useRef(false);

  const [posts,        setPosts]        = useState<CastingPost[]>([]);
  const [editing,      setEditing]      = useState<CastingPost | null>(null);
  const [selectedPost, setSelectedPost] = useState<CastingPost | null>(null);
  const [viewMode,     setViewMode]     = useState<"grid"|"list">("grid");
  const [showFilters,  setShowFilters]  = useState(false);
  const [search,       setSearch]       = useState("");

  const [filters, setFilters] = useState<Filters>({
    search:"", category:"", location:"", gender:"", experience:"",
    languages:[], age:"", budget:"", status:"", sort:"newest",
  });

  useEffect(() => {
    const stored = getPosts();
    if (stored.length === 0) { savePosts(SEED); setPosts(SEED); }
    else setPosts(stored);
  }, []);

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;
    (async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".progress-bar", {
        scaleX:1, ease:"none",
        scrollTrigger:{ trigger:"body", start:"top top", end:"bottom bottom", scrub:0 },
      });
      gsap.utils.toArray<HTMLElement>(".overview-card").forEach((card, i) => {
        gsap.from(card, {
          y:40, opacity:0, scale:0.92, duration:0.6, delay:i*0.1, ease:"power3.out",
          scrollTrigger:{ trigger:".dashboard-overview", start:"top 85%", toggleActions:"play none none none" },
        });
      });
      gsap.utils.toArray<Element>(".casting-post-card, .list-row").forEach((el, i) => {
        gsap.from(el, {
          y:30, opacity:0, duration:0.5, delay:(i%6)*0.07, ease:"power2.out",
          scrollTrigger:{ trigger:el, start:"top 88%", toggleActions:"play none none none" },
        });
      });
      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        gsap.from(el, {
          y:40, opacity:0, duration:0.8, ease:"power2.out",
          scrollTrigger:{ trigger:el, start:"top 88%", toggleActions:"play none none none" },
        });
      });
    })();
    return () => { window.ScrollTrigger?.getAll?.()?.forEach(t => t.kill()); };
  }, []);

  function handleSave(post: CastingPost) {
    const updated = editing ? posts.map(p => p.id === post.id ? post : p) : [post, ...posts];
    setPosts(updated); savePosts(updated); setEditing(null);
  }
  function handleDelete(id: string) {
    if (!confirm("Delete this casting call?")) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated); savePosts(updated);
  }
  function handleEdit(post: CastingPost) {
    setEditing(post); window.scrollTo({ top:0, behavior:"smooth" });
  }
  const setFilter = useCallback((k: keyof Filters, v: string | string[]) => {
    setFilters(prev => ({ ...prev, [k]: v }));
  }, []);
  function resetFilters() {
    setSearch("");
    setFilters({ search:"", category:"", location:"", gender:"", experience:"", languages:[], age:"", budget:"", status:"", sort:"newest" });
  }

  const CURRENT = "current-user";
  const now = new Date();
  const totalPosts  = posts.length;
  const openPosts   = posts.filter(p => p.status === "Open").length;
  const closedPosts = posts.filter(p => p.status === "Closed").length;
  const thisMonth   = posts.filter(p => {
    const d = new Date(p.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const filtered = posts
    .filter(p => {
      if (!search) return true;
      const t = search.toLowerCase();
      return [p.title,p.company,p.location,p.category].some(v => v.toLowerCase().includes(t));
    })
    .filter(p => !filters.category || p.category.toLowerCase() === filters.category.toLowerCase())
    .filter(p => !filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase()))
    .filter(p => !filters.gender   || (p.gender??"").toLowerCase() === filters.gender.toLowerCase())
    .filter(p => !filters.experience || (p.experience??"").toLowerCase() === filters.experience.toLowerCase())
    .filter(p => {
      if (filters.languages.length === 0) return true;
      const postLangs = (p.languages??"").split(",").map(l=>l.trim().toLowerCase());
      return filters.languages.some(l => postLangs.includes(l.toLowerCase()));
    })
    .filter(p => {
      if (!filters.age) return true;
      const n = Number(filters.age);
      const nums = p.age.match(/\d+/g);
      if (!nums) return false;
      if (nums.length === 1) return n === Number(nums[0]);
      return n >= Number(nums[0]) && n <= Number(nums[1]);
    })
    .filter(p => {
      if (!filters.budget) return true;
      const b = Number(p.budget);
      if (filters.budget.endsWith("+")) return b >= Number(filters.budget.replace("+",""));
      const [mn,mx] = filters.budget.split("-");
      return b >= Number(mn) && b <= Number(mx);
    })
    .filter(p => !filters.status || p.status.toLowerCase() === filters.status.toLowerCase())
    .sort((a,b) => {
      if (filters.sort === "newest")      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filters.sort === "oldest")      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (filters.sort === "budget-high") return Number(b.budget) - Number(a.budget);
      if (filters.sort === "budget-low")  return Number(a.budget) - Number(b.budget);
      if (filters.sort === "company")     return a.company.localeCompare(b.company);
      return 0;
    });

  return (
    <>
      {/* Scroll progress */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:"rgba(201,168,76,0.15)", zIndex:300 }}>
        <div className="progress-bar" style={{ height:"100%", background:"var(--gold)", transformOrigin:"left", transform:"scaleX(0)" }} />
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0f0e0d; --cream: #FFFDF7; --gold: #c9a84c; --gold2: #e8c96a;
          --mist: #f0ebe0; --mid: #6b6560; --white: #ffffff;
          --card-bg: #ffffff; --input-bg: #ffffff; --input-border: #e0dbd0;
          --subtle-bg: #fafaf7; --shadow: 0 8px 32px rgba(0,0,0,0.07);
          --rad-md: 14px; --rad-lg: 22px;
        }
        html.dark {
          --ink: #f0eeea; --cream: #0b0b0b; --gold: #c9a84c; --gold2: #f1d472;
          --mist: #1e1e1e; --mid: #a8a29e; --white: #161616;
          --card-bg: #1a1a1a; --input-bg: #1a1a1a; --input-border: #2e2e2e;
          --subtle-bg: #111111; --shadow: 0 8px 32px rgba(0,0,0,0.35);
        }
        body {
          background: var(--cream); color: var(--ink); overflow-x: hidden;
          font-family: system-ui, -apple-system, sans-serif;
          transition: background 0.35s ease, color 0.35s ease;
        }

        /* ─── BUTTONS ─── */
        .btn-gold { background: var(--gold); color: #111; border: none; border-radius: 100px; padding: 0.78rem 2rem; font-size: 0.92rem; font-weight: 700; cursor: pointer; position: relative; overflow: hidden; transition: background 0.2s, transform 0.2s; }
        .btn-gold::after { content:""; position:absolute; inset:0; background:rgba(255,255,255,0.22); transform:translateX(-100%); transition:transform 0.3s; }
        .btn-gold:hover::after { transform:translateX(0); }
        .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); }
        .btn-gold-sm { background: var(--gold); color: #111; border: none; border-radius: 100px; padding: 0.42rem 1rem; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .btn-gold-sm:hover { background: var(--gold2); }
        .btn-outline-sm { background: transparent; color: var(--ink); border: 1.5px solid var(--mist); border-radius: 100px; padding: 0.42rem 1rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .btn-outline-sm:hover { border-color: var(--gold); background: rgba(201,168,76,0.07); }
        .btn-danger-sm { background: transparent; color: #c62828; border: 1.5px solid rgba(198,40,40,0.3); border-radius: 100px; padding: 0.42rem 1rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
        .btn-danger-sm:hover { background: rgba(198,40,40,0.1); border-color: #c62828; }

        /* ─── BASE INPUT ─── */
        .hf-inp { width: 100%; padding: 13px 16px; border: 1.5px solid var(--input-border); border-radius: var(--rad-md); font-size: 0.92rem; font-family: inherit; outline: none; background: var(--input-bg); color: var(--ink); transition: border-color 0.25s, box-shadow 0.25s; appearance: none; -webkit-appearance: none; }
        .hf-inp::placeholder { color: var(--mid); }
        .hf-inp:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }

        /* ─── CUSTOM SELECT ─── */
        .csd-wrap { position: relative; width: 100%; }
        .csd-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 13px 16px; background: var(--input-bg); border: 1.5px solid var(--input-border); border-radius: var(--rad-md); color: var(--ink); font-size: 0.92rem; font-family: inherit; cursor: pointer; transition: border-color 0.25s, box-shadow 0.25s, background 0.2s; text-align: left; }
        .csd-trigger:hover { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.03); }
        .csd-trigger.open { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; }
        .csd-placeholder { color: var(--mid); }
        .csd-val { color: var(--ink); font-weight: 600; }
        .csd-arrow { display: flex; align-items: center; color: var(--mid); transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); flex-shrink: 0; }
        .csd-arrow.up { transform: rotate(180deg); }
        .csd-count { background: var(--gold); color: #111; border-radius: 100px; padding: 1px 7px; font-size: 0.68rem; font-weight: 800; line-height: 1.6; }
        .csd-menu { position: absolute; top: calc(100% + 10px); left: 0; right: 0; background: var(--card-bg); border: 2px solid var(--gold); border-radius: 22px; z-index: 9999; max-height: 200px; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: var(--gold) transparent; }
        @keyframes csdIn { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .csd-option { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: transparent; border: none; color: var(--ink); font-size: 0.88rem; font-family: inherit; cursor: pointer; transition: background 0.15s; text-align: left; border-bottom: 1px solid var(--mist); }
        .csd-option:last-child { border-bottom: none; }
        .csd-option:hover { background: rgba(201,168,76,0.08); }
        .csd-option.selected { background: rgba(201,168,76,0.12); color: var(--gold); font-weight: 700; }
        .csd-check { color: var(--gold); font-weight: 900; font-size: 0.85rem; }

        /* ─── LANGUAGE MULTI-SELECT ─── */
        .lang-menu { min-width: 260px; }
        .lang-menu-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid var(--mist); }
        .lang-menu-title { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--mid); }
        .lang-clear { background: none; border: none; color: var(--gold); font-size: 0.75rem; font-weight: 700; cursor: pointer; padding: 2px 6px; border-radius: 4px; transition: background 0.15s; }
        .lang-clear:hover { background: rgba(201,168,76,0.1); }
        .lang-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 12px; }
        .lang-chip { display: flex; align-items: center; gap: 6px; padding: 8px 12px; border: 1.5px solid var(--input-border); border-radius: 8px; background: var(--subtle-bg); color: var(--ink); font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s; font-family: inherit; text-align: left; }
        .lang-chip:hover { border-color: var(--gold); background: rgba(201,168,76,0.06); }
        .lang-chip.checked { border-color: var(--gold); background: rgba(201,168,76,0.14); color: #8b6914; }
        html.dark .lang-chip.checked { color: var(--gold); }
        .lang-tick { color: var(--gold); font-weight: 900; font-size: 0.78rem; }

        /* ─── OVERVIEW STRIP (below hero) ─── */
        .overview-strip {
          padding: 2.5rem 6vw;
          background: var(--cream);
          border-bottom: 1px solid var(--mist);
          transition: background 0.35s;
        }
        .dashboard-overview { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
        .overview-card { background: var(--card-bg); border-radius: var(--rad-lg); border: 1.5px solid var(--mist); padding: 1.6rem 1.8rem; box-shadow: var(--shadow); will-change: transform; transition: background 0.35s, border-color 0.3s, box-shadow 0.3s; }
        .overview-card:hover { border-color: rgba(201,168,76,0.5); box-shadow: 0 16px 40px rgba(201,168,76,0.12); }
        .overview-card h2 { font-size: clamp(2rem,3.5vw,2.6rem); font-weight: 900; letter-spacing: -0.04em; color: var(--gold); line-height: 1; margin-bottom: 0.4rem; }
        .overview-card p { color: var(--mid); font-size: 0.85rem; font-weight: 500; }

        /* ─── TOOLBAR ─── */
        .post-toolbar { padding: 2rem 6vw 0; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; justify-content: space-between; }
        .toolbar-left { display: flex; align-items: center; }
        .toolbar-right { display: flex; gap: 0.6rem; align-items: center; }
        .search-input-wrap { position: relative; }
        .search-input-wrap svg { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--mid); }
        .search-input { padding: 0.62rem 1.2rem 0.62rem 2.8rem; border: 1.5px solid var(--input-border); border-radius: 100px; font-size: 0.88rem; background: var(--input-bg); color: var(--ink); outline: none; width: 340px; transition: border-color 0.25s, box-shadow 0.25s, width 0.3s ease; font-family: inherit; }
        .search-input::placeholder { color: var(--mid); }
        .search-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); width: 400px; }
        .filter-btn { display: flex; align-items: center; gap: 0.5rem; background: var(--card-bg); color: var(--ink); border: 1.5px solid var(--mist); border-radius: 100px; padding: 0.55rem 1.2rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .filter-btn:hover, .filter-btn.active { border-color: var(--gold); background: rgba(201,168,76,0.06); }
        .view-btn { width: 36px; height: 36px; border: 1.5px solid var(--mist); border-radius: 8px; background: var(--card-bg); color: var(--mid); font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .view-btn.active, .view-btn:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.07); }

        /* ─── FILTER BAR ─── */
        .filters-collapse { max-height: 0; overflow: hidden; transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; opacity: 0; }
        .filters-collapse.open { max-height: 700px; overflow: visible; opacity: 1; }
        .filter-bar { position: relative; z-index: 50; overflow: visible; padding: 1.5rem 6vw; background: var(--card-bg); border-top: 1px solid var(--mist); border-bottom: 1px solid var(--mist); transition: background 0.35s; }
        .filter-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem; margin-bottom: 1rem; }
        .filter-footer { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .filter-result-count { font-size: 0.83rem; color: var(--mid); }
        .filter-reset { background: rgba(201,168,76,0.12); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); border-radius: 100px; padding: 0.3rem 0.9rem; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .filter-reset:hover { background: rgba(201,168,76,0.22); }

        /* ─── POSTS GRID / LIST ─── */
        .all-posts { padding: 2.5rem 6vw 5rem; }
        .section-heading { margin-bottom: 2rem; }
        .section-heading h2 { font-size: clamp(1.4rem,2.5vw,1.9rem); font-weight: 800; color: var(--ink); }
        .section-heading p { color: var(--mid); margin-top: 0.3rem; }
        .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem; }

        /* ─── CASTING CARD ─── */
        .casting-post-card { background: var(--card-bg); border-radius: var(--rad-lg); border: 1.5px solid var(--mist); padding: 1.6rem; box-shadow: var(--shadow); transition: background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.25s; }
        .casting-post-card:hover { border-color: rgba(201,168,76,0.45); transform: translateY(-4px); box-shadow: 0 20px 48px rgba(201,168,76,0.1); }
        .card-category-tag{
    background: rgba(201,168,76,0.12);
    color: var(--gold);
    border-radius:100px;
    padding:3px 10px;
    font-size:.68rem;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:.06em;
}

.status{
    padding:5px 14px;
    border-radius:100px;
    font-size:.72rem;
    font-weight:700;
    letter-spacing:.04em;
}

.post-meta{
    display:flex;
    align-items:center;
    justify-content:space-between;

    padding-bottom:14px;
    margin-bottom:16px;

    border-bottom:1px solid var(--mist);
}

.post-category{
    font-size:.74rem;
    font-weight:700;

    letter-spacing:.18em;
    text-transform:uppercase;

    color:var(--gold);
}

.post-status{
    font-size:.74rem;
    font-weight:700;

    letter-spacing:.16em;
    text-transform:uppercase;
}

.post-status.open{
    color:#2E7D32;
}

.post-status.closed{
    color:#C62828;
}
        .post-top{
    display:block;
    margin-bottom:1.5rem;
}
        .company-name { color: var(--gold); font-weight: 600; font-size: 0.88rem; margin-top: 3px; }
        .casting-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 1rem 0; }
        .casting-info div { background: var(--subtle-bg); border-radius: 10px; padding: 10px 12px; border: 1px solid var(--mist); }
        .casting-info strong { display: block; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mid); margin-bottom: 4px; }
        .casting-info p { font-size: 0.85rem; font-weight: 600; color: var(--ink); margin: 0; }
        .description-preview { color: var(--mid); font-size: 0.88rem; line-height: 1.6; }
        small { display: block; margin-top: 1rem; color: var(--mid); font-size: 0.75rem; opacity: 0.8; }
        .post-actions{
    display:flex;
    width:max-content;

    border:1px solid var(--mist);
    border-radius:14px;

    overflow:hidden;

    margin-top:1.2rem;

    background:var(--card-bg);

    transition:.25s;
}

.post-actions:hover{
    border-color:rgba(201,168,76,.45);
    box-shadow:0 8px 24px rgba(201,168,76,.12);
}

.post-actions button{

    border:none;
    background:transparent;

    padding:.75rem 1.25rem;

    cursor:pointer;

    font-size:.82rem;
    font-weight:600;

    color:var(--ink);

    transition:.25s;
}

.post-actions button:first-child{

    border-right:1px solid var(--mist);

}

.post-actions button:hover{

    background:rgba(201,168,76,.08);
    color:var(--gold);

}
        .status { padding: 5px 14px; border-radius: 100px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; white-space: nowrap; flex-shrink: 0; }
        .status.open { background: rgba(46,125,50,0.1); color: #2E7D32; }
        .status.closed { background: rgba(198,40,40,0.1); color: #C62828; }
        html.dark .status.open { background: rgba(46,125,50,0.18); color: #6fcf87; }
        html.dark .status.closed { background: rgba(198,40,40,0.18); color: #f28b82; }

        /* ─── LIST ROW ─── */
        .list-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.2rem 1.6rem; background: var(--card-bg); border: 1.5px solid var(--mist); border-radius: var(--rad-md); margin-bottom: 0.75rem; cursor: pointer; transition: border-color 0.2s, background 0.2s, transform 0.2s; }
        .list-row:hover { border-color: rgba(201,168,76,0.4); transform: translateX(4px); }
        .list-row-left { flex: 1; min-width: 0; }
        .list-row-right { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }

        /* ─── EMPTY STATE ─── */
        .empty-state { text-align: center; padding: 5rem 2rem; background: var(--card-bg); border-radius: var(--rad-lg); border: 1.5px solid var(--mist); }
        .empty-state-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .empty-state h3 { font-size: 1.3rem; font-weight: 800; color: var(--ink); margin-bottom: 0.5rem; }
        .empty-state p { color: var(--mid); margin-bottom: 1.5rem; }

        /* ─── FORM ─── */
        .post-form-section { padding: 3rem 6vw 4rem; }
        .post-form-header { margin-bottom: 2rem; }
        .post-form { background: var(--card-bg); border: 1.5px solid var(--mist); border-radius: var(--rad-lg); padding: 2.5rem; box-shadow: var(--shadow); display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; max-width: 900px; transition: background 0.35s; }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mid); }
        .form-full { grid-column: 1 / 3; }
        .form-actions { display: flex; gap: 1rem; align-items: center; justify-content: flex-start; padding-top: 0.5rem; }

        /* ─── MODAL ─── */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 24px; }
        html.dark .modal-overlay { background: rgba(0,0,0,0.75); }
        .casting-modal { background: var(--card-bg); color: var(--ink); width: 100%; max-width: 820px; max-height: 88vh; overflow-y: auto; border-radius: var(--rad-lg); padding: 2.5rem; position: relative; border: 1.5px solid var(--mist); box-shadow: 0 32px 80px rgba(0,0,0,0.18); animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes popIn { from { opacity: 0; transform: scale(0.88) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .close-btn { position: absolute; right: 20px; top: 18px; border: none; background: var(--mist); color: var(--mid); width: 32px; height: 32px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, color 0.2s; }
        .close-btn:hover { background: var(--gold); color: #111; }
        .modal-badge { background: rgba(201,168,76,0.12); color: var(--gold); border-radius: 100px; padding: 4px 12px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
        .modal-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0; }
        .modal-info-item { background: var(--subtle-bg); border-radius: 10px; padding: 12px 14px; border: 1px solid var(--mist); }
        .description { background: var(--subtle-bg); border-radius: var(--rad-md); padding: 1.2rem 1.4rem; border: 1px solid var(--mist); color: var(--mid); font-size: 0.92rem; line-height: 1.75; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1000px) { .dashboard-overview { grid-template-columns: repeat(2, 1fr); } .filter-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .post-toolbar { flex-direction: column; align-items: flex-start; }
          .post-form { grid-template-columns: 1fr; padding: 1.6rem; }
          .form-full { grid-column: auto; }
          .form-actions { flex-direction: column; }
          .casting-info { grid-template-columns: repeat(2, 1fr); }
          .modal-info { grid-template-columns: repeat(2, 1fr); }
          .filter-grid { grid-template-columns: 1fr 1fr; }
          .posts-grid { grid-template-columns: 1fr; }
          .list-row { flex-direction: column; align-items: flex-start; }
          .list-row-right { flex-wrap: wrap; }
          .search-input { width: 260px; }
          .search-input:focus { width: 300px; }
        }
        @media (max-width: 520px) {
          .dashboard-overview { grid-template-columns: 1fr 1fr; }
          .filter-grid { grid-template-columns: 1fr; }
          .casting-info { grid-template-columns: 1fr; }
          .modal-info { grid-template-columns: 1fr 1fr; }
          .search-input { width: 200px; }
          .search-input:focus { width: 220px; }
        }
      `}</style>

      <main>

        {/* ── HERO CAROUSEL (full-viewport) ── */}
        <HeroCarousel />

        {/* ── OVERVIEW STATS STRIP ── */}
        <div className="overview-strip">
          <div className="dashboard-overview">
            {[
              { n: totalPosts,  label: "Total Posts"  },
              { n: openPosts,   label: "Open"         },
              { n: closedPosts, label: "Closed"       },
              { n: thisMonth,   label: "This Month"   },
            ].map(({ n, label }) => (
              <div className="overview-card" key={label}><h2>{n}</h2><p>{label}</p></div>
            ))}
          </div>
        </div>

        {/* ── TOOLBAR ── */}
        <div className="post-toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input className="search-input" placeholder="Search casting calls…" value={search}
                onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="toolbar-right">
            <button className={`filter-btn${showFilters ? " active" : ""}`} onClick={() => setShowFilters(s => !s)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5h18M6 12h12M10 19h4"/>
              </svg>
              Filters {showFilters ? "▲" : "▼"}
            </button>
            <button className={`view-btn${viewMode==="grid"?" active":""}`} onClick={()=>setViewMode("grid")} title="Grid view">⊞</button>
            <button className={`view-btn${viewMode==="list"?" active":""}`} onClick={()=>setViewMode("list")} title="List view">☰</button>
          </div>
        </div>

        {/* ── FILTER COLLAPSE ── */}
        <div className={`filters-collapse${showFilters ? " open" : ""}`}>
          <FilterBar f={filters} set={setFilter} total={filtered.length} onReset={resetFilters} />
        </div>

        {/* ── ALL CASTING CALLS ── */}
        <section className="all-posts">
          <div className="section-heading reveal">
            <h2>All Casting Calls</h2>
            <p>{filtered.length} opportunit{filtered.length !== 1 ? "ies" : "y"} available</p>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">🔍</span>
              <h3>No results found</h3>
              <p>Try adjusting your search or filters.</p>
              <button className="btn-gold" onClick={resetFilters}>Clear Filters</button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="posts-grid">
              {filtered.map(post => (
                <CastingCard key={post.id} post={post}
                  isOwn={post.userId === CURRENT}
                  onEdit={handleEdit} onDelete={handleDelete}
                  onView={p => setSelectedPost(p)} />
              ))}
            </div>
          ) : (
            <div>
              {filtered.map(post => (
                <CastingListRow key={post.id} post={post}
                  isOwn={post.userId === CURRENT}
                  onEdit={handleEdit} onDelete={handleDelete}
                  onView={p => setSelectedPost(p)} />
              ))}
            </div>
          )}
        </section>

        {/* ── INLINE EDIT FORM ── */}
        {editing && (
          <CastingFormSection editing={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
        )}

      </main>

      {selectedPost && (
        <DetailsModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}