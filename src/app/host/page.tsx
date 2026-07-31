"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
const CATEGORIES = ["Actor","Model","Singer","Dancer","Voice Artist","Child Artist","Influencer","Anchor"];
const GENDERS    = ["Male","Female","Any"];
const EXPERIENCE = ["Beginner","Intermediate","Expert"];
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
        <p className="company" style={{ marginBottom:"1.8rem" }}>{post.company}</p>

        <div className="modal-info">
          {[
            ["📍 Location", post.location],
            ["🎂 Age Range", post.age],
            ["⚧ Gender",    post.gender ?? "Any"],
            ["🎬 Experience",post.experience ?? "Any"],
            ["🗣 Languages", post.languages ?? "—"],
            ["💰 Budget",    `₹${Number(post.budget).toLocaleString("en-IN")}`],
            ...(post.deadline ? [["📅 Deadline", fmt(post.deadline)]] : []),
            ["🗓 Posted",    fmt(post.createdAt)],
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
  title: string;
  company: string;
  category: string;
  location: string;
  age: string;
  gender: string;
  experience: string;
  languages: string;
  budget: string;
  description: string;
  status: "Open" | "Closed";
  deadline: string;
};

const blank: FormState = {
  title: "",
  company: "",
  category: "",
  location: "",
  age: "",
  gender: "",
  experience: "",
  languages: "",
  budget: "",
  description: "",
  status: "Open",
  deadline: "",
};

const [f, setF] = useState<FormState>(blank);

  useEffect(() => {
    if (editing) {
      setF({
        title:      editing.title,
        company:    editing.company,
        category:   editing.category,
        location:   editing.location,
        age:        editing.age,
        gender:     editing.gender ?? "",
        experience: editing.experience ?? "",
        languages:  editing.languages ?? "",
        budget:     editing.budget,
        description:editing.description,
        status:     editing.status,
        deadline:   editing.deadline ?? "",
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
      ...f,
      id:        editing?.id ?? uid(),
      userId:    "current-user",
      createdAt: editing?.createdAt ?? new Date().toISOString(),
    };
    onSave(post);
    setF({ ...blank });
  }

  const inp = "hf-inp";
  return (
    <section className="host-form-section">
      <div className="host-form-header">
        <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,1.8rem)", fontWeight:800, color:"var(--ink)" }}>
          {editing ? "✏️ Edit Casting Call" : "✦ Post a Casting Call"}
        </h2>
        <p style={{ color:"var(--mid)", marginTop:"0.4rem" }}>
          {editing ? "Update the details below." : "Fill in the details to reach the right talent."}
        </p>
      </div>

      <form className="host-form" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="form-field">
          <label className="form-label">Role / Title *</label>
          <input className={inp} placeholder="e.g. Lead Actor — Web Series" value={f.title} onChange={e=>set("title",e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Company / Production *</label>
          <input className={inp} placeholder="e.g. Netflix India" value={f.company} onChange={e=>set("company",e.target.value)} />
        </div>
        {/* Row 2 */}
        <div className="form-field">
          <label className="form-label">Category *</label>
          <select className={inp} value={f.category} onChange={e=>set("category",e.target.value)}>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Location *</label>
          <input className={inp} placeholder="e.g. Mumbai / Remote" value={f.location} onChange={e=>set("location",e.target.value)} />
        </div>
        {/* Row 3 */}
        <div className="form-field">
          <label className="form-label">Age Range</label>
          <input className={inp} placeholder="e.g. 18-30" value={f.age} onChange={e=>set("age",e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Gender</label>
          <select className={inp} value={f.gender} onChange={e=>set("gender",e.target.value)}>
            <option value="">Any</option>
            {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        {/* Row 4 */}
        <div className="form-field">
          <label className="form-label">Experience Level</label>
          <select className={inp} value={f.experience} onChange={e=>set("experience",e.target.value)}>
            <option value="">Any</option>
            {EXPERIENCE.map(x => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Languages</label>
          <input className={inp} placeholder="e.g. Hindi, Tamil" value={f.languages} onChange={e=>set("languages",e.target.value)} />
        </div>
        {/* Row 5 */}
        <div className="form-field">
          <label className="form-label">Budget (₹)</label>
          <input className={inp} type="number" placeholder="e.g. 50000" value={f.budget} onChange={e=>set("budget",e.target.value)} />
        </div>
        <div className="form-field date-field">
          <label className="form-label">Application Deadline</label>
          <input className={inp} type="date" value={f.deadline} onChange={e=>set("deadline",e.target.value)} />
        </div>
        {/* Textarea */}
        <div className="form-field form-full">
          <label className="form-label">Description</label>
          <textarea className={inp} style={{ resize:"none", height:"160px" }}
            placeholder="Describe the role, requirements, shoot details…"
            value={f.description} onChange={e=>set("description",e.target.value)} />
        </div>
        {/* Status (edit only) */}
        {editing && (
          <div className="form-field">
            <label className="form-label">Status</label>
            <select className={inp} value={f.status} onChange={e=>set("status",e.target.value as "Open"|"Closed")}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}
        {/* Buttons */}
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
  gender: string; experience: string; language: string;
  age: string; budget: string; status: string; sort: string;
}
function FilterBar({ f, set, total, onReset }: {
  f: Filters;
  set: (k: keyof Filters, v: string) => void;
  total: number;
  onReset: () => void;
}) {
  const inp = "hf-inp";
  const activeCount = [f.category,f.location,f.gender,f.experience,f.language,f.age,f.budget,f.status]
    .filter(Boolean).length;

  return (
    <div className="filter-bar">
      <div className="filter-grid">
        <input className={inp} placeholder="Category" list="cat-list" value={f.category}
          onChange={e=>set("category",e.target.value)} />
        <datalist id="cat-list">{CATEGORIES.map(c=><option key={c} value={c}/>)}</datalist>

        <input className={inp} placeholder="Location" value={f.location}
          onChange={e=>set("location",e.target.value)} />

        <select className={inp} value={f.gender} onChange={e=>set("gender",e.target.value)}>
          <option value="">Any Gender</option>
          {GENDERS.map(g=><option key={g} value={g}>{g}</option>)}
        </select>

        <select className={inp} value={f.experience} onChange={e=>set("experience",e.target.value)}>
          <option value="">Any Experience</option>
          {EXPERIENCE.map(x=><option key={x} value={x}>{x}</option>)}
        </select>

        <input className={inp} placeholder="Language" value={f.language}
          onChange={e=>set("language",e.target.value)} />

        <input className={inp} placeholder="Age (e.g. 25)" type="number" value={f.age}
          onChange={e=>set("age",e.target.value)} />

        <select className={inp} value={f.budget} onChange={e=>set("budget",e.target.value)}>
          {BUDGET_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>

        <select className={inp} value={f.status} onChange={e=>set("status",e.target.value)}>
          <option value="">Any Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

        <select className={inp} value={f.sort} onChange={e=>set("sort",e.target.value)}>
          {SORT_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
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
  post: CastingPost;
  isOwn: boolean;
  onEdit: (p: CastingPost) => void;
  onDelete: (id: string) => void;
  onView: (p: CastingPost) => void;
}) {
  return (
    <div className="casting-post-card" onClick={() => onView(post)} style={{ cursor:"pointer" }}>
      <div className="post-top">
        <div style={{ flex:1, minWidth:0 }}>
          <span className="card-category-tag">{post.category}</span>
          <h3 style={{ margin:"0.5rem 0 0.25rem", fontSize:"1.1rem", fontWeight:800, color:"var(--ink)" }}>{post.title}</h3>
          <p className="company-name">{post.company}</p>
        </div>
        <span className={`status ${post.status === "Open" ? "open" : "closed"}`}>{post.status}</span>
      </div>

      <div className="casting-info">
        <div><strong>📍 Location</strong><p>{post.location}</p></div>
        <div><strong>🎂 Age</strong><p>{post.age || "—"}</p></div>
        <div><strong>💰 Budget</strong><p>₹{Number(post.budget || 0).toLocaleString("en-IN")}</p></div>
      </div>

      <p className="description-preview" style={{ WebkitLineClamp:2, display:"-webkit-box", WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {post.description}
      </p>
      <small>Posted {fmt(post.createdAt)}{post.deadline ? ` · Deadline ${fmt(post.deadline)}` : ""}</small>

      {isOwn && (
        <div className="post-buttons" onClick={e => e.stopPropagation()}>
          <button className="btn-gold-sm" onClick={() => onEdit(post)}>Edit</button>
          <button className="btn-danger-sm" onClick={() => onDelete(post.id)}>Delete</button>
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
  post: CastingPost;
  isOwn: boolean;
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
          <span>📍 {post.location}</span>
          <span>🎂 {post.age || "—"}</span>
          <span>💰 ₹{Number(post.budget||0).toLocaleString("en-IN")}</span>
          <span>🗓 {fmt(post.createdAt)}</span>
        </div>
      </div>
      <div className="list-row-right" onClick={e=>e.stopPropagation()}>
        <span className={`status ${post.status==="Open"?"open":"closed"}`}>{post.status}</span>
        {isOwn && <>
          <button className="btn-gold-sm" onClick={()=>onEdit(post)}>Edit</button>
          <button className="btn-danger-sm" onClick={()=>onDelete(post.id)}>Delete</button>
        </>}
        <button className="btn-outline-sm" onClick={()=>onView(post)}>View</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function HostPage() {
  const gsapLoaded = useRef(false);

  /* ── State ── */
  const [posts,       setPosts]       = useState<CastingPost[]>([]);
  const [editing,     setEditing]     = useState<CastingPost | null>(null);
  const [selectedPost,setSelectedPost]= useState<CastingPost | null>(null);
  const [viewMode,    setViewMode]    = useState<"grid"|"list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [search,      setSearch]      = useState("");

  const [filters, setFilters] = useState<Filters>({
    search:"", category:"", location:"", gender:"", experience:"",
    language:"", age:"", budget:"", status:"", sort:"newest",
  });

  /* ── Load posts ── */
  useEffect(() => {
    const stored = getPosts();
    if (stored.length === 0) {
      savePosts(SEED);
      setPosts(SEED);
    } else {
      setPosts(stored);
    }
  }, []);

  /* ── GSAP ── */
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

      gsap.from(".dash-word", {
        y:70, opacity:0, rotateX:-40, stagger:0.065,
        duration:0.9, ease:"power4.out", delay:0.15,
        transformOrigin:"top center", transformPerspective:800,
      });
      gsap.from(".dash-sub, .dash-actions", {
        y:24, opacity:0, stagger:0.1, duration:0.8, ease:"power3.out", delay:0.5,
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

  /* ── Handlers ── */
  function handleSave(post: CastingPost) {
    const updated = editing
      ? posts.map(p => p.id === post.id ? post : p)
      : [post, ...posts];
    setPosts(updated);
    savePosts(updated);
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this casting call?")) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    savePosts(updated);
  }

  function handleEdit(post: CastingPost) {
    setEditing(post);
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  const setFilter = useCallback((k: keyof Filters, v: string) => {
    setFilters(prev => ({ ...prev, [k]: v }));
  }, []);

  function resetFilters() {
    setSearch("");
    setFilters({ search:"", category:"", location:"", gender:"", experience:"", language:"", age:"", budget:"", status:"", sort:"newest" });
  }

  /* ── Derived ── */
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
    .filter(p => !filters.language || (p.languages??"").toLowerCase().split(",").map(s=>s.trim()).some(l=>l.includes(filters.language.toLowerCase())))
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

  const allFiltered = filtered;

  /* ─────────────────────────────────────
     RENDER
  ───────────────────────────────────── */
  return (
    <>
      {/* Progress bar */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:"rgba(201,168,76,0.15)", zIndex:300 }}>
        <div className="progress-bar" style={{ height:"100%", background:"var(--gold)", transformOrigin:"left", transform:"scaleX(0)" }} />
      </div>

      <style>{`
        /* ─── RESET & ROOT ─── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink:          #0f0e0d;
          --cream:        #FFFDF7;
          --gold:         #c9a84c;
          --gold2:        #e8c96a;
          --mist:         #f0ebe0;
          --mid:          #6b6560;
          --white:        #ffffff;
          --card-bg:      #ffffff;
          --input-bg:     #ffffff;
          --input-border: #ddd;
          --subtle-bg:    #fafafa;
          --shadow:       0 8px 32px rgba(0,0,0,0.07);
          --rad-md:       14px;
          --rad-lg:       22px;
        }
        html.dark {
          --ink:          #f0eeea;
          --cream:        #0b0b0b;
          --gold:         #c9a84c;
          --gold2:        #f1d472;
          --mist:         #1e1e1e;
          --mid:          #a8a29e;
          --white:        #161616;
          --card-bg:      #1a1a1a;
          --input-bg:     #1a1a1a;
          --input-border: #2e2e2e;
          --subtle-bg:    #111111;
          --shadow:       0 8px 32px rgba(0,0,0,0.35);
        }
        body {
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
          font-family: system-ui, -apple-system, sans-serif;
          transition: background 0.35s ease, color 0.35s ease;
        }
        html.dark select { color-scheme: dark; }

        /* ─── SHARED BUTTONS ─── */
        .btn-gold {
          background: var(--gold); color: #111; border: none;
          border-radius: 100px; padding: 0.78rem 2rem;
          font-size: 0.92rem; font-weight: 700; cursor: pointer;
          position: relative; overflow: hidden; transition: background 0.2s, transform 0.2s;
        }
        .btn-gold::after { content:""; position:absolute; inset:0; background:rgba(255,255,255,0.22); transform:translateX(-100%); transition:transform 0.3s; }
        .btn-gold:hover::after { transform:translateX(0); }
        .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); }

        .btn-gold-sm {
          background: var(--gold); color: #111; border: none;
          border-radius: 100px; padding: 0.42rem 1rem;
          font-size: 0.78rem; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .btn-gold-sm:hover { background: var(--gold2); }

        .btn-outline-sm {
          background: transparent; color: var(--ink);
          border: 1.5px solid var(--mist); border-radius: 100px;
          padding: 0.42rem 1rem; font-size: 0.78rem; font-weight: 600;
          cursor: pointer; transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline-sm:hover { border-color: var(--gold); background: rgba(201,168,76,0.07); }

        .btn-danger-sm {
          background: transparent; color: #c62828;
          border: 1.5px solid rgba(198,40,40,0.3);
          border-radius: 100px; padding: 0.42rem 1rem;
          font-size: 0.78rem; font-weight: 600; cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-danger-sm:hover { background: rgba(198,40,40,0.1); border-color: #c62828; }

        /* ─── INPUTS (shared) ─── */
        .hf-inp {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid var(--input-border);
          border-radius: var(--rad-md);
          font-size: 0.92rem;
          font-family: inherit;
          outline: none;
          background: var(--input-bg);
          color: var(--ink);
          transition: border-color 0.25s, box-shadow 0.25s;
          appearance: none;
          -webkit-appearance: none;
        }
        .hf-inp::placeholder { color: var(--mid); }
        .hf-inp:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.15);
        }

        /* ─── HERO / DASHBOARD TOP ─── */
        .host-dashboard {
          min-height: 52vh;
          padding: 100px 6vw 60px;
          background: var(--cream);
          position: relative;
          overflow: hidden;
          transition: background 0.35s;
          isolation: isolate;
        }
        .host-dashboard::before {
          content: "";
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .host-dashboard::after {
          content: "";
          position: absolute; inset: 0; z-index: 0;
          background: radial-gradient(circle at 60% 40%, rgba(201,168,76,0.08), transparent 55%);
        }
        .host-dashboard > * { position: relative; z-index: 1; }

        .dashboard-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(201,168,76,0.12);
          color: var(--gold);
          border: 1px solid rgba(201,168,76,0.28);
          border-radius: 100px;
          padding: 0.35rem 1rem;
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 1rem; display: block; width: fit-content;
        }

        .dashboard-title {
          font-size: clamp(2.2rem,4.5vw,3.4rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: var(--ink);
          overflow: hidden;
          margin-bottom: 0.6rem;
        }
        .dash-word { display: inline-block; }

        .dash-sub {
          color: var(--mid);
          font-size: 1.05rem;
          line-height: 1.65;
          max-width: 480px;
          margin-bottom: 0;
        }

        .dash-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0; }

        /* ─── OVERVIEW CARDS ─── */
        .dashboard-overview {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }
        .overview-card {
          background: var(--card-bg);
          border-radius: var(--rad-lg);
          border: 1.5px solid var(--mist);
          padding: 1.6rem 1.8rem;
          box-shadow: var(--shadow);
          will-change: transform;
          transition: background 0.35s, border-color 0.3s, box-shadow 0.3s;
        }
        .overview-card:hover { border-color: rgba(201,168,76,0.5); box-shadow: 0 16px 40px rgba(201,168,76,0.12); }
        .overview-card h2 {
          font-size: clamp(2rem,3.5vw,2.6rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .overview-card p { color: var(--mid); font-size: 0.85rem; font-weight: 500; }

        /* ─── TABS + TOOLBAR ─── */
        .host-toolbar {
          padding: 0 6vw;
          margin-top: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .toolbar-left { display: flex; align-items: center; }
        .toolbar-right { display: flex; gap: 0.6rem; align-items: center; }

        .search-input-wrap {
          position: relative;
        }
        .search-input-wrap svg {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); pointer-events: none;
          color: var(--mid);
        }
        .search-input {
          padding: 0.6rem 1rem 0.6rem 2.6rem;
          border: 1.5px solid var(--input-border);
          border-radius: 100px;
          font-size: 0.88rem;
          background: var(--input-bg);
          color: var(--ink);
          outline: none;
          width: 220px;
          transition: border-color 0.25s, box-shadow 0.25s;
          font-family: inherit;
        }
        .search-input::placeholder { color: var(--mid); }
        .search-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }

        .filter-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--card-bg); color: var(--ink);
          border: 1.5px solid var(--mist); border-radius: 100px;
          padding: 0.55rem 1.2rem;
          font-size: 0.85rem; font-weight: 600; cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .filter-btn:hover, .filter-btn.active { border-color: var(--gold); background: rgba(201,168,76,0.06); }

        .view-btn {
          width: 36px; height: 36px;
          border: 1.5px solid var(--mist);
          border-radius: 8px;
          background: var(--card-bg);
          color: var(--mid);
          font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .view-btn.active, .view-btn:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.07); }

        /* ─── FILTER BAR ─── */
        .filters-collapse {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          opacity: 0;
        }
        .filters-collapse.open {
          max-height: 600px;
          opacity: 1;
        }
        .filter-bar {
          padding: 1.5rem 6vw;
          background: var(--card-bg);
          border-top: 1px solid var(--mist);
          border-bottom: 1px solid var(--mist);
          transition: background 0.35s;
        }
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .filter-footer {
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
        }
        .filter-result-count { font-size: 0.83rem; color: var(--mid); }
        .filter-reset {
          background: rgba(201,168,76,0.12); color: var(--gold);
          border: 1px solid rgba(201,168,76,0.3); border-radius: 100px;
          padding: 0.3rem 0.9rem; font-size: 0.78rem; font-weight: 700;
          cursor: pointer; transition: background 0.2s;
        }
        .filter-reset:hover { background: rgba(201,168,76,0.22); }

        /* ─── POSTS GRID / LIST ─── */
        .all-posts { padding: 2.5rem 6vw 5rem; }

        .section-heading { margin-bottom: 2rem; }
        .section-heading h2 { font-size: clamp(1.4rem,2.5vw,1.9rem); font-weight: 800; color: var(--ink); }
        .section-heading p { color: var(--mid); margin-top: 0.3rem; }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.25rem;
        }

        /* ─── CASTING CARD ─── */
        .casting-post-card {
          background: var(--card-bg);
          border-radius: var(--rad-lg);
          border: 1.5px solid var(--mist);
          padding: 1.6rem;
          box-shadow: var(--shadow);
          transition: background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.25s;
        }
        .casting-post-card:hover {
          border-color: rgba(201,168,76,0.45);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(201,168,76,0.1);
        }

        .card-category-tag {
          background: rgba(201,168,76,0.12); color: var(--gold);
          border-radius: 100px; padding: 3px 10px;
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .post-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; }
        .company-name { color: var(--gold); font-weight: 600; font-size: 0.88rem; margin-top: 3px; }

        .casting-info {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem; margin: 1rem 0;
        }
        .casting-info div {
          background: var(--subtle-bg);
          border-radius: 10px; padding: 10px 12px;
          border: 1px solid var(--mist);
        }
        .casting-info strong {
          display: block; font-size: 0.68rem;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--mid); margin-bottom: 4px;
        }
        .casting-info p { font-size: 0.85rem; font-weight: 600; color: var(--ink); margin: 0; }

        .description-preview { color: var(--mid); font-size: 0.88rem; line-height: 1.6; }
        small { display: block; margin-top: 1rem; color: var(--mid); font-size: 0.75rem; opacity: 0.8; }
        .post-buttons { display: flex; gap: 0.6rem; margin-top: 1.2rem; }

        /* STATUS BADGES */
        .status {
          padding: 5px 14px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em;
          white-space: nowrap; flex-shrink: 0;
        }
        .status.open { background: rgba(46,125,50,0.1); color: #2E7D32; }
        .status.closed { background: rgba(198,40,40,0.1); color: #C62828; }
        html.dark .status.open  { background: rgba(46,125,50,0.18); color: #6fcf87; }
        html.dark .status.closed { background: rgba(198,40,40,0.18); color: #f28b82; }

        /* ─── LIST ROW ─── */
        .list-row {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          padding: 1.2rem 1.6rem;
          background: var(--card-bg);
          border: 1.5px solid var(--mist);
          border-radius: var(--rad-md);
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .list-row:hover { border-color: rgba(201,168,76,0.4); transform: translateX(4px); }
        .list-row-left { flex: 1; min-width: 0; }
        .list-row-right { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }

        /* ─── EMPTY STATE ─── */
        .empty-state {
          text-align: center; padding: 5rem 2rem;
          background: var(--card-bg); border-radius: var(--rad-lg);
          border: 1.5px solid var(--mist);
        }
        .empty-state-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .empty-state h3 { font-size: 1.3rem; font-weight: 800; color: var(--ink); margin-bottom: 0.5rem; }
        .empty-state p { color: var(--mid); margin-bottom: 1.5rem; }

        /* ─── CASTING FORM SECTION ─── */
        .host-form-section {
          padding: 3rem 6vw 4rem;
        }
        .host-form-header { margin-bottom: 2rem; }

        .host-form {
          background: var(--card-bg);
          border: 1.5px solid var(--mist);
          border-radius: var(--rad-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          max-width: 900px;
          transition: background 0.35s;
        }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mid); }
        .form-full { grid-column: 1 / 3; }
        .form-actions { display: flex; gap: 1rem; align-items: center; justify-content: flex-start; padding-top: 0.5rem; }

        /* ─── MODAL ─── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000; padding: 24px;
        }
        html.dark .modal-overlay { background: rgba(0,0,0,0.75); }
        .casting-modal {
          background: var(--card-bg); color: var(--ink);
          width: 100%; max-width: 820px; max-height: 88vh;
          overflow-y: auto; border-radius: var(--rad-lg);
          padding: 2.5rem; position: relative;
          border: 1.5px solid var(--mist);
          box-shadow: 0 32px 80px rgba(0,0,0,0.18);
          animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        .close-btn {
          position: absolute; right: 20px; top: 18px;
          border: none; background: var(--mist); color: var(--mid);
          width: 32px; height: 32px; border-radius: 50%;
          font-size: 1.1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .close-btn:hover { background: var(--gold); color: #111; }
        .modal-badge {
          background: rgba(201,168,76,0.12); color: var(--gold);
          border-radius: 100px; padding: 4px 12px;
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
        }
        .modal-info {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin: 1.5rem 0;
        }
        .modal-info-item {
          background: var(--subtle-bg); border-radius: 10px; padding: 12px 14px;
          border: 1px solid var(--mist);
        }
        .description {
          background: var(--subtle-bg); border-radius: var(--rad-md);
          padding: 1.2rem 1.4rem; border: 1px solid var(--mist);
          color: var(--mid); font-size: 0.92rem; line-height: 1.75;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1000px) {
          .dashboard-overview { grid-template-columns: repeat(2, 1fr); }
          .filter-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .host-dashboard { padding: 80px 5vw 48px; }
          .dashboard-top  { flex-direction: column; }
          .dashboard-overview { grid-template-columns: repeat(2, 1fr); }
          .host-toolbar   { flex-direction: column; align-items: flex-start; }
          .host-form { grid-template-columns: 1fr; padding: 1.6rem; }
          .form-full { grid-column: auto; }
          .form-actions { flex-direction: column; }
          .casting-info { grid-template-columns: repeat(2, 1fr); }
          .modal-info { grid-template-columns: repeat(2, 1fr); }
          .filter-grid { grid-template-columns: 1fr 1fr; }
          .posts-grid { grid-template-columns: 1fr; }
          .list-row { flex-direction: column; align-items: flex-start; }
          .list-row-right { flex-wrap: wrap; }
        }
        @media (max-width: 520px) {
          .dashboard-overview { grid-template-columns: 1fr 1fr; }
          .filter-grid { grid-template-columns: 1fr; }
          .casting-info { grid-template-columns: 1fr; }
          .modal-info { grid-template-columns: 1fr 1fr; }
          .search-input { width: 160px; }
        }
      `}</style>

      <main>
        {/* ══════════════════════════════════════
            HERO / DASHBOARD HEADER
        ══════════════════════════════════════ */}
        <section className="host-dashboard">
          <div className="dashboard-top">
            <div>
              <span className="hero-badge">Host Dashboard</span>
              <h1 className="dashboard-title">
                {"Welcome Back 👋".split(" ").map((w, i) => (
                  <span key={i} className="dash-word">{w}&nbsp;</span>
                ))}
              </h1>
              <p className="dash-sub">
                Manage casting calls, track opportunities and discover verified talent across India.
              </p>
            </div>
            <div className="dash-actions">
              <button className="btn-gold" onClick={() => { setEditing(null); window.scrollTo({ top:999999, behavior:"smooth" }); }}>
                + Create Casting Call
              </button>
            </div>
          </div>

          <div className="dashboard-overview">
            {[
              { n: totalPosts,  label: "Total Posts"  },
              { n: openPosts,   label: "Open"         },
              { n: closedPosts, label: "Closed"       },
              { n: thisMonth,   label: "This Month"   },
            ].map(({ n, label }) => (
              <div className="overview-card" key={label}>
                <h2>{n}</h2>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            TOOLBAR
        ══════════════════════════════════════ */}
        <div className="host-toolbar">
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
            <button className={`filter-btn${showFilters ? " active" : ""}`}
              onClick={() => setShowFilters(s => !s)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5h18M6 12h12M10 19h4"/>
              </svg>
              Filters {showFilters ? "▲" : "▼"}
            </button>
            <button className={`view-btn${viewMode==="grid"?" active":""}`} onClick={()=>setViewMode("grid")} title="Grid view">⊞</button>
            <button className={`view-btn${viewMode==="list"?" active":""}`} onClick={()=>setViewMode("list")} title="List view">☰</button>
          </div>
        </div>

        {/* ── Filters collapse ── */}
        <div className={`filters-collapse${showFilters ? " open" : ""}`}>
          <FilterBar f={filters} set={setFilter} total={allFiltered.length} onReset={resetFilters} />
        </div>

        {/* ══════════════════════════════════════
            ALL CASTING CALLS
        ══════════════════════════════════════ */}
        <section className="all-posts">
          <div className="section-heading reveal">
            <h2>All Casting Calls</h2>
            <p>{allFiltered.length} opportunit{allFiltered.length !== 1 ? "ies" : "y"} available</p>
          </div>

          {allFiltered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">🔍</span>
              <h3>No results found</h3>
              <p>Try adjusting your search or filters.</p>
              <button className="btn-gold" onClick={resetFilters}>Clear Filters</button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="posts-grid">
              {allFiltered.map(post => (
                <CastingCard key={post.id} post={post}
                  isOwn={post.userId === CURRENT}
                  onEdit={handleEdit} onDelete={handleDelete}
                  onView={p => setSelectedPost(p)} />
              ))}
            </div>
          ) : (
            <div>
              {allFiltered.map(post => (
                <CastingListRow key={post.id} post={post}
                  isOwn={post.userId === CURRENT}
                  onEdit={handleEdit} onDelete={handleDelete}
                  onView={p => setSelectedPost(p)} />
              ))}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════
            INLINE EDIT FORM (only when editing)
        ══════════════════════════════════════ */}
        {editing && (
          <CastingFormSection
            editing={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        )}
      </main>

      {/* ── MODAL ── */}
      {selectedPost && (
        <DetailsModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}