"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import HeroCarousel from "@/components/ui/Herocarousel";
import { postHeroSlides } from "@/data/heroSlides";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

/* ─────────────────────────────────────────
   SEED DATA
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
const GENDERS = ["Male", "Female", "Any"];
const EXPERIENCE = ["Beginner", "Intermediate", "Expert"];
const ALL_LANGUAGES = [
  "Hindi", "English", "Tamil", "Telugu", "Bengali", "Kannada",
  "Malayalam", "Marathi", "Gujarati", "Punjabi", "Odia", "Urdu",
];
const SORT_OPTS = [
  { v: "newest", l: "Newest First" },
  { v: "oldest", l: "Oldest First" },
  { v: "budget-high", l: "Budget: High → Low" },
  { v: "budget-low", l: "Budget: Low → High" },
  { v: "company", l: "Company A–Z" },
];
const BUDGET_OPTS = [
  { v: "", l: "Any Budget" },
  { v: "0-25000", l: "Under ₹25k" },
  { v: "25000-50000", l: "₹25k – ₹50k" },
  { v: "50000-100000", l: "₹50k – ₹1L" },
  { v: "100000+", l: "₹1L+" },
];

/* ─────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────── */
function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* ─────────────────────────────────────────
   CUSTOM DROPDOWN
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
            <path d="M6 9l6 6 6-6" />
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
              <path d="M6 9l6 6 6-6" />
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
   CASTING DETAILS MODAL — neobrutalist
   No category badge. Info cells match card
   black-block style. Hard border + shadow.
───────────────────────────────────────── */
function DetailsModal({
  post,
  onClose,
}: {
  post: CastingPost;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  const infoItems: [string, string][] = [
    ["ROLE", post.category || "Casting"],
    ["LOCATION", post.location || "Not specified"],
    ["AGE", post.age || "Any"],
    ["GENDER", post.gender || "Any"],
    ["EXPERIENCE", post.experience || "Any"],
    ["LANGUAGES", post.languages || "—"],
    ["BUDGET", `₹${Number(post.budget || 0).toLocaleString("en-IN")}`],
    ...(post.deadline
      ? [["DEADLINE", fmt(post.deadline)] as [string, string]]
      : []),
  ];

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="casting-modal">
        {/* FILM STRIPE */}
        <div className="modal-slate-strip" />

        {/* CLOSE */}
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* COMPACT COVER — matches application popup */}
        <div className="casting-modal-cover" aria-hidden="true" />

        <div className="casting-modal-content">
          {/* AVATAR — matches application popup */}
          <div className="casting-modal-avatar" aria-hidden="true">
            {(post.title || post.category || "C")[0].toUpperCase()}
          </div>

          {/* STATUS */}
          <div className="modal-status-row">
            <span
              className={`post-status ${
                post.status === "Open" ? "open" : "closed"
              }`}
            >
              {post.status === "Open" ? "NOW CASTING" : "WRAPPED"}
            </span>
          </div>

          {/* KICKER */}
          <p className="modal-film-kicker">CASTING OPPORTUNITY</p>

          {/* TITLE */}
          <h2 className="modal-title">{post.title}</h2>

          {/* COMPANY */}
          <p className="modal-company">{post.company}</p>

          {/* LOCATION */}
          <div className="modal-location">
            <span>LOCATION</span>
            <strong>{post.location || "Not specified"}</strong>
          </div>

          {/* ABOUT */}
          <div className="modal-section">
            <h3>ABOUT THIS ROLE</h3>
            <p>
              {post.description ||
                "No description has been provided for this casting opportunity."}
            </p>
          </div>

          {/* INFO GRID */}
          <div className="modal-info">
            {infoItems.map(([label, value]) => (
              <div className="modal-info-item" key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>

          {/* POSTED */}
          <div className="modal-posted">
            POSTED <b>{fmt(post.createdAt)}</b>
          </div>

          {/* ACTIONS */}
          <div className="modal-actions">
            <button className="film-btn film-btn-gold" type="button">
              APPLY NOW
            </button>

            <button
              className="film-btn film-btn-outline"
              type="button"
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
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
    title: "", company: "", category: "", location: "", age: "", gender: "",
    experience: "", languages: "", budget: "", description: "", status: "Open", deadline: "",
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
        <h2 style={{ fontSize: "clamp(1.4rem,2.5vw,1.8rem)", fontWeight: 800, color: "var(--ink)" }}>
          {editing ? "Edit Casting Call" : "Post a Casting Call"}
        </h2>
        <p style={{ color: "var(--mid)", marginTop: "0.4rem" }}>
          {editing ? "Update the details below." : "Fill in the details to reach the right talent."}
        </p>
      </div>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Role / Title *</label>
          <input className={inp} placeholder="e.g. Lead Actor — Web Series" value={f.title} onChange={e => set("title", e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Company / Production *</label>
          <input className={inp} placeholder="e.g. Netflix India" value={f.company} onChange={e => set("company", e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Category *</label>
          <CustomSelect value={f.category} onChange={v => set("category", v)}
            options={[{ v: "", l: "Select category" }, ...CATEGORIES.map(c => ({ v: c, l: c }))]}
            placeholder="Select category" />
        </div>
        <div className="form-field">
          <label className="form-label">Location *</label>
          <input className={inp} placeholder="e.g. Mumbai / Remote" value={f.location} onChange={e => set("location", e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Age Range</label>
          <input className={inp} placeholder="e.g. 18-30" value={f.age} onChange={e => set("age", e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Gender</label>
          <CustomSelect value={f.gender} onChange={v => set("gender", v)}
            options={[{ v: "", l: "Any" }, ...GENDERS.map(g => ({ v: g, l: g }))]}
            placeholder="Any" />
        </div>
        <div className="form-field">
          <label className="form-label">Experience Level</label>
          <CustomSelect value={f.experience} onChange={v => set("experience", v)}
            options={[{ v: "", l: "Any" }, ...EXPERIENCE.map(x => ({ v: x, l: x }))]}
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
          <input className={inp} type="number" placeholder="e.g. 50000" value={f.budget} onChange={e => set("budget", e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Application Deadline</label>
          <input className={inp} type="date" value={f.deadline} onChange={e => set("deadline", e.target.value)} />
        </div>
        <div className="form-field form-full">
          <label className="form-label">Description</label>
          <textarea className={inp} style={{ resize: "none", height: "160px" }}
            placeholder="Describe the role, requirements, shoot details…"
            value={f.description} onChange={e => set("description", e.target.value)} />
        </div>
        {editing && (
          <div className="form-field">
            <label className="form-label">Status</label>
            <CustomSelect value={f.status} onChange={v => set("status", v as "Open" | "Closed")}
              options={[{ v: "Open", l: "Open" }, { v: "Closed", l: "Closed" }]}
              placeholder="Open" />
          </div>
        )}
        <div className="form-full form-actions">
          <button type="submit" className="btn-gold">{editing ? "Save Changes" : "Post Casting Call"}</button>
          <button type="button" className="btn-outline-sm" onClick={onCancel}>Cancel</button>
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
        <CustomSelect value={f.category} onChange={v => set("category", v)}
          options={[{ v: "", l: "Any Category" }, ...CATEGORIES.map(c => ({ v: c, l: c }))]}
          placeholder="Any Category" />

        <div className="csd-wrap">
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--mid)", pointerEvents: "none" }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <input className="hf-inp" placeholder="Location" value={f.location} style={{ paddingLeft: "38px" }}
              onChange={e => set("location", e.target.value)} />
          </div>
        </div>

        <CustomSelect value={f.gender} onChange={v => set("gender", v)}
          options={[{ v: "", l: "Any Gender" }, ...GENDERS.map(g => ({ v: g, l: g }))]}
          placeholder="Any Gender" />

        <CustomSelect value={f.experience} onChange={v => set("experience", v)}
          options={[{ v: "", l: "Any Experience" }, ...EXPERIENCE.map(x => ({ v: x, l: x }))]}
          placeholder="Any Experience" />

        <LanguageMultiSelect value={f.languages} onChange={v => set("languages", v)} />

        <div className="csd-wrap">
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--mid)", pointerEvents: "none" }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <input className="hf-inp" placeholder="Age (e.g. 25)" type="number" value={f.age}
              style={{ paddingLeft: "38px" }} onChange={e => set("age", e.target.value)} />
          </div>
        </div>

        <CustomSelect value={f.budget} onChange={v => set("budget", v)}
          options={BUDGET_OPTS} placeholder="Any Budget" />

        <CustomSelect value={f.status} onChange={v => set("status", v)}
          options={[{ v: "", l: "Any Status" }, { v: "Open", l: "Open" }, { v: "Closed", l: "Closed" }]}
          placeholder="Any Status" />

        <CustomSelect value={f.sort} onChange={v => set("sort", v)}
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
   CASTING CARD (grid) — neobrutalist
───────────────────────────────────────── */
function CastingCard({
  post, isOwn, onEdit, onDelete, onView
}: {
  post: CastingPost; isOwn: boolean;
  onEdit: (p: CastingPost) => void;
  onDelete: (id: string) => void;
  onView: (p: CastingPost) => void;
}) {
  const budget = Number(post.budget || 0);
  const statusText = post.status === "Open" ? "Now Casting" : "Wrapped";

  return (
    <div
      className={`casting-post-card${post.status === "Closed" ? " casting-closed" : ""}`}
      onClick={() => onView(post)}
    >
      <div className="casting-rail casting-rail-left" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="casting-slate-content">
        <div className="casting-clapper" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => <span key={i} />)}
        </div>

        <p className="casting-eyebrow">{statusText}</p>

        <h3 className="casting-slate-title">{post.title}</h3>

        <p className="casting-slate-sub">
          {post.company} <span>·</span> {post.location}
        </p>

        <div className="casting-slate">
          <div className="casting-slate-row">
            <label>Role</label>
            <p>{post.category || "Casting"}</p>
          </div>

          <div className="casting-slate-row">
            <label>Age</label>
            <p>{post.age || "ANY"}</p>
          </div>

          <div className="casting-slate-row">
            <label>Gender</label>
            <p>{post.gender || "ANY"}</p>
          </div>

          <div className="casting-slate-row">
            <label>Budget</label>
            <p>₹{budget.toLocaleString("en-IN")}</p>
          </div>

          {post.deadline && (
            <div className="casting-slate-row">
              <label>Deadline</label>
              <p>{fmt(post.deadline)}</p>
            </div>
          )}
        </div>

        <div className="casting-slate-footer">
          <span>PROD. <b>{post.company}</b></span>
          <span>CAT. <b>{post.category}</b></span>
        </div>

        {isOwn && (
          <div className="casting-slate-actions" onClick={e => e.stopPropagation()}>
            <button onClick={() => onEdit(post)}>Edit</button>
            <button onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        )}
      </div>

      <div className="casting-rail casting-rail-right" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CASTING LIST ROW — neobrutalist
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
    <div className={`list-row${post.status === "Closed" ? " list-row-closed" : ""}`} onClick={() => onView(post)}>
      <div className="list-film-rail" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
      </div>
      <div className="list-row-main">
        <div className="list-clapper" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => <span key={i} />)}
        </div>
        <div className="list-row-kicker">{post.status === "Open" ? "Now Casting" : "Wrapped"}</div>
        <div className="list-row-title-line">
          <div className="list-row-left">
            <span className="list-row-title">{post.title}</span>
            <span className="list-row-company">{post.company}</span>
          </div>
          <span className={`list-status ${post.status === "Open" ? "open" : "closed"}`}>{post.status}</span>
        </div>
        <div className="list-row-meta">
          <span><b>ROLE</b>{post.category || "Casting"}</span>
          <span><b>LOCATION</b>{post.location}</span>
          <span><b>AGE</b>{post.age || "Any"}</span>
          <span><b>BUDGET</b>₹{Number(post.budget || 0).toLocaleString("en-IN")}</span>
          {post.deadline && <span><b>DEADLINE</b>{fmt(post.deadline)}</span>}
        </div>
        <div className="list-row-bottom">
          <span>PROD. <b>{post.company}</b></span>
          <span>POSTED. <b>{fmt(post.createdAt)}</b></span>
          <div className="post-actions" onClick={e => e.stopPropagation()}>
            <button className="row-view-btn" onClick={() => onView(post)}>View</button>
            {isOwn && <>
              <button onClick={() => onEdit(post)}>Edit</button>
              <button onClick={() => onDelete(post.id)}>Delete</button>
            </>}
          </div>
        </div>
      </div>
      <div className="list-film-rail" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PostPage() {
  const gsapLoaded = useRef(false);
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<CastingPost[]>([]);
  const [editing, setEditing] = useState<CastingPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CastingPost | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<Filters>({
    search: "", category: "", location: "", gender: "", experience: "",
    languages: [], age: "", budget: "", status: "", sort: "newest",
  });

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (!categoryFromUrl) return;

    setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    setShowFilters(true);
  }, [searchParams]);

  useEffect(() => {
    const stored = getPosts();
    if (stored.length === 0) { savePosts(SEED); setPosts(SEED); }
    else setPosts(stored);
  }, []);

  useEffect(() => {
  if (gsapLoaded.current) return;
  gsapLoaded.current = true;

  gsap.registerPlugin(ScrollTrigger);

  // ─────────────────────────────────────────
  // PROGRESS BAR
  // ─────────────────────────────────────────
  gsap.to(".progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
    },
  });


  gsap.utils
    .toArray<Element>(".casting-post-card, .list-row")
    .forEach((el, i) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: (i % 6) * 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

  const onLoad = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("load", onLoad);

  const refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  return () => {
    window.removeEventListener("load", onLoad);
    clearTimeout(refreshTimer);

    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);

  function handleSave(post: CastingPost) {
    const updated = editing ? posts.map(p => p.id === post.id ? post : p) : [post, ...posts];
    setPosts(updated); savePosts(updated);
    setEditing(null); setShowForm(false);
  }
  function handleDelete(id: string) {
    if (!confirm("Delete this casting call?")) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated); savePosts(updated);
  }
  function handleEdit(post: CastingPost) {
    setEditing(post); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleNewPost() {
    setEditing(null); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleCancelForm() {
    setEditing(null); setShowForm(false);
  }
  const setFilter = useCallback((k: keyof Filters, v: string | string[]) => {
    setFilters(prev => ({ ...prev, [k]: v }));
  }, []);
  function resetFilters() {
    setSearch("");
    setFilters({ search: "", category: "", location: "", gender: "", experience: "", languages: [], age: "", budget: "", status: "", sort: "newest" });
  }

  const CURRENT = "current-user";
  const now = new Date();
  const totalPosts = posts.length;
  const openPosts = posts.filter(p => p.status === "Open").length;
  const closedPosts = posts.filter(p => p.status === "Closed").length;
  const thisMonth = posts.filter(p => {
    const d = new Date(p.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const filtered = posts
    .filter(p => {
      if (!search) return true;
      const t = search.toLowerCase();
      return [p.title, p.company, p.location, p.category].some(v => v.toLowerCase().includes(t));
    })
    .filter(p => !filters.category || p.category.toLowerCase() === filters.category.toLowerCase())
    .filter(p => !filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase()))
    .filter(p => !filters.gender || (p.gender ?? "").toLowerCase() === filters.gender.toLowerCase())
    .filter(p => !filters.experience || (p.experience ?? "").toLowerCase() === filters.experience.toLowerCase())
    .filter(p => {
      if (filters.languages.length === 0) return true;
      const postLangs = (p.languages ?? "").split(",").map(l => l.trim().toLowerCase());
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
      if (filters.budget.endsWith("+")) return b >= Number(filters.budget.replace("+", ""));
      const [mn, mx] = filters.budget.split("-");
      return b >= Number(mn) && b <= Number(mx);
    })
    .filter(p => !filters.status || p.status.toLowerCase() === filters.status.toLowerCase())
    .sort((a, b) => {
      if (filters.sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filters.sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (filters.sort === "budget-high") return Number(b.budget) - Number(a.budget);
      if (filters.sort === "budget-low") return Number(a.budget) - Number(b.budget);
      if (filters.sort === "company") return a.company.localeCompare(b.company);
      return 0;
    });

  return (
    <>
    <HeroCarousel slides={postHeroSlides} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "rgba(201,168,76,0.15)", zIndex: 300 }}>
        <div className="progress-bar" style={{ height: "100%", background: "var(--gold)", transformOrigin: "left", transform: "scaleX(0)" }} />
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0f0e0d; --cream: #FFFDF7; --gold: #c9a84c; --gold2: #e8c96a;
          --mist: #f0ebe0; --mid: #6b6560; --white: #ffffff;
          --card-bg: #ffffff; --input-bg: #ffffff; --input-border: #e0dbd0;
          --rad-md: 14px; --rad-lg: 22px;
          --nb-border: #0f0e0d;
        }
        html.dark {
          --ink: #f0eeea; --cream: #0b0b0b; --gold: #c9a84c; --gold2: #f1d472;
          --mist: #1e1e1e; --mid: #a8a29e; --white: #161616;
          --card-bg: #1a1a1a; --input-bg: #1a1a1a; --input-border: #2e2e2e;
          --subtle-bg: #111111; --shadow: 0 8px 32px rgba(0,0,0,0.35);
          --nb-border: #f0eeea;
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
        .btn-outline-sm { background: transparent; color: var(--ink); border: 1.5px solid var(--mist); border-radius: 100px; padding: 0.42rem 1rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .btn-outline-sm:hover { border-color: var(--gold); background: rgba(201,168,76,0.07); }

        /* ─── BASE INPUT ─── */
        .hf-inp { width: 100%; padding: 13px 16px; border: 1.5px solid var(--input-border); border-radius: var(--rad-md); font-size: 0.92rem; font-family: inherit; outline: none; background: var(--input-bg); color: var(--ink); transition: border-color 0.25s, box-shadow 0.25s; appearance: none; -webkit-appearance: none; }
        .hf-inp::placeholder { color: var(--mid); }
        .hf-inp:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }

        /* ─── CUSTOM SELECT ─── */
        .csd-wrap { position: relative; width: 100%; }
        .csd-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 13px 16px; background: var(--input-bg); border: 1.5px solid var(--input-border); border-radius: var(--rad-md); color: var(--ink); font-size: 0.92rem; font-family: inherit; cursor: pointer; transition: border-color 0.25s, box-shadow 0.25s, background 0.2s; text-align: left; }
        .csd-trigger:hover { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.06); }
        .csd-trigger.open { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; }
        .csd-placeholder { color: var(--mid); }
        .csd-val { color: var(--ink); font-weight: 600; }
        .csd-arrow { display: flex; align-items: center; color: var(--mid); transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); flex-shrink: 0; }
        .csd-arrow.up { transform: rotate(180deg); }
        .csd-count { background: var(--gold); color: #111; border-radius: 100px; padding: 1px 7px; font-size: 0.68rem; font-weight: 800; line-height: 1.6; }
        .csd-menu { position: absolute; top: calc(100% + 10px); left: 0; right: 0; background: var(--card-bg); border: 2px solid var(--gold); border-radius: 22px; z-index: 9999; max-height: 200px; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: var(--gold) transparent; }
        .csd-option { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: transparent; border: none; color: var(--ink); font-size: 0.88rem; font-family: inherit; cursor: pointer; transition: background 0.15s, color 0.15s; text-align: left; border-bottom: 1px solid var(--mist); }
        .csd-option:last-child { border-bottom: none; }
        .csd-option:hover { background: rgba(201,168,76,0.18); color: var(--ink); }
        html.dark .csd-option:hover { background: rgba(201,168,76,0.25); color: #f0eeea; }
        .csd-option.selected { background: rgba(201,168,76,0.15); color: var(--gold); font-weight: 700; }
        html.dark .csd-option.selected { background: rgba(201,168,76,0.2); color: var(--gold); }
        .csd-check { color: var(--gold); font-weight: 900; font-size: 0.85rem; }

        /* ─── LANGUAGE MULTI-SELECT ─── */
        .lang-menu { min-width: 260px; }
        .lang-menu-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid var(--mist); }
        .lang-menu-title { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--mid); }
        .lang-clear { background: none; border: none; color: var(--gold); font-size: 0.75rem; font-weight: 700; cursor: pointer; padding: 2px 6px; border-radius: 4px; transition: background 0.15s; }
        .lang-clear:hover { background: rgba(201,168,76,0.1); }
        .lang-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 12px; }
        .lang-chip { display: flex; align-items: center; gap: 6px; padding: 8px 12px; border: 1.5px solid var(--input-border); border-radius: 8px; background: var(--subtle-bg); color: var(--ink); font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s; font-family: inherit; text-align: left; }
        .lang-chip:hover { border-color: var(--gold); background: rgba(201,168,76,0.1); color: var(--ink); }
        html.dark .lang-chip:hover { color: #f0eeea; }
        .lang-chip.checked { border-color: var(--gold); background: rgba(201,168,76,0.14); color: #8b6914; }
        html.dark .lang-chip.checked { color: var(--gold); }
        .lang-tick { color: var(--gold); font-weight: 900; font-size: 0.78rem; }

        /* ─── OVERVIEW STRIP ─── */
        .overview-strip { padding: 2.5rem 6vw; background: var(--cream); border-bottom: 1px solid var(--mist); transition: background 0.35s; }

        .overview-meta{ display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }
        .overview-meta span{ width:3px; height:18px; background:var(--gold); border-radius:999px; flex-shrink:0; }
        .overview-meta small{ font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.18em; color:var(--mid); }

        .dashboard-overview { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
        .overview-card { background: var(--card-bg); border-radius: var(--rad-lg); border: 1.5px solid var(--mist); padding: 1.6rem 1.8rem; box-shadow: var(--shadow); will-change: transform; transition: background 0.35s, border-color 0.3s, box-shadow 0.3s; }
        .overview-card:hover { border-color: rgba(201,168,76,0.5); box-shadow: 0 16px 40px rgba(201,168,76,0.12); }
        .overview-card h2 { font-size: clamp(2rem,3.5vw,2.6rem); font-weight: 900; letter-spacing: -0.04em; color: var(--gold); line-height: 1; margin-bottom: 0.4rem; }
        .overview-card p{ color:var(--mid); font-size:.92rem; line-height:1.5; }

        /* ─── TOOLBAR ─── */
        .post-toolbar { padding: 2rem 6vw 0; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; justify-content: space-between; }
        .toolbar-left { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .toolbar-right { display: flex; gap: 0.6rem; align-items: center; }
        .search-input-wrap { position: relative; }
        .search-input-wrap svg { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--mid); }
        .search-input { padding: 0.62rem 1.2rem 0.62rem 2.8rem; border: 1.5px solid var(--input-border); border-radius: 100px; font-size: 0.88rem; background: var(--input-bg); color: var(--ink); outline: none; width: 340px; transition: border-color 0.25s, box-shadow 0.25s, width 0.3s ease; font-family: inherit; }
        .search-input::placeholder { color: var(--mid); }
        .search-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); width: 400px; }
        .filter-btn { display: flex; align-items: center; gap: 0.5rem; background: var(--card-bg); color: var(--ink); border: 1.5px solid var(--mist); border-radius: 100px; padding: 0.55rem 1.2rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .filter-btn:hover, .filter-btn.active { border-color: var(--gold); background: rgba(201,168,76,0.08); color: var(--ink); }
        html.dark .filter-btn:hover, html.dark .filter-btn.active { color: #f0eeea; }
        .new-post-btn { display: flex; align-items: center; gap: 0.5rem; }
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
        .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }

        /* ─── NEOBRUTALIST SHARED ─── */
        .post-status { font-size: 0.62rem; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 10px; border: 1.5px solid var(--nb-border); }
        .post-status.open { background: #d1fae5; color: #065f46; }
        .post-status.closed { background: #fee2e2; color: #991b1b; }
        html.dark .post-status.open { background: rgba(46,125,50,0.2); color: #6fcf87; }
        html.dark .post-status.closed { background: rgba(198,40,40,0.2); color: #f28b82; }

        /* ─── FILM SLATE CASTING CARD ─── */
        .casting-post-card {
          --film-card-1: #141313;
          --film-card-2: #0c0b0b;
          --film-ink: #f4f1e9;
          --film-muted: #a19b8d;
          --film-accent: #f0a70a;
          --film-line: rgba(244,241,233,0.16);
          --film-glow: rgba(240,167,10,0.06);
          --film-shadow: rgba(0,0,0,0.75);
          --film-ring: rgba(240,167,10,0.16);

          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          min-height: 0;
          display: flex;
          background:
            radial-gradient(circle at 50% 0%, var(--film-glow), transparent 55%),
            linear-gradient(180deg,var(--film-card-1) 0%,var(--film-card-2) 100%);
          border: 1px solid var(--film-ring);
          border-radius: 10px;
          box-shadow: 0 20px 42px -16px var(--film-shadow), 0 0 0 1px rgba(240,167,10,0.05);
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          transition: transform .22s ease, box-shadow .22s ease;
        }

        .casting-post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 52px -18px var(--film-shadow), 0 0 0 1px rgba(240,167,10,0.22);
        }

        .casting-post-card.casting-closed { filter: saturate(.72); }

        .casting-rail {
          width: 25px;
          min-width: 25px;
          flex-shrink: 0;
          position: relative;
          background: #090909;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px 0;
        }

        .casting-rail-left { border-right: 1px solid rgba(240,167,10,.16); }
        .casting-rail-right { border-left: 1px solid rgba(240,167,10,.16); }

        .casting-rail span {
          display: block;
          width: 13px;
          height: 15px;
          margin: 0 auto;
          background: #f4f1e9;
          border-radius: 3px;
          box-shadow: 0 0 0 1px rgba(255,255,255,.06);
        }

        .casting-slate-content {
          position: relative;
          flex: 1;
          min-width: 0;
          padding: 16px 17px 13px;
          color: var(--film-ink);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .casting-clapper {
          display: flex;
          height: 13px;
          margin: 0 -17px 13px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .casting-clapper span { flex: 1; transform: skewX(-22deg); margin: 0 -3px; }
        .casting-clapper span:nth-child(odd) { background: var(--film-ink); }
        .casting-clapper span:nth-child(even) { background: var(--film-card-2); border: 1px solid var(--film-line); border-left: none; border-right: none; }

        .casting-eyebrow {
          font-family: 'Courier Prime','Courier New',monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: var(--film-accent);
          margin: 0 0 5px;
          flex-shrink: 0;
        }

        .casting-slate-title {
          font-family: 'Bebas Neue',Impact,sans-serif;
          font-weight: 400;
          font-size: clamp(1.65rem, 2.3vw, 2.25rem);
          letter-spacing: .025em;
          line-height: .91;
          text-transform: uppercase;
          color: var(--film-ink);
          margin: 0 0 5px;
          overflow-wrap: anywhere;
          max-height: 3.8em;
          overflow: hidden;
          flex-shrink: 0;
        }

        .casting-slate-sub {
          font-family: 'Courier Prime','Courier New',monospace;
          font-size: 9px;
          color: var(--film-muted);
          margin: 0 0 9px;
          letter-spacing: .01em;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-shrink: 0;
        }

        .casting-slate-sub span { color: var(--film-accent); margin: 0 3px; }

        .casting-slate {
          border: 1px solid var(--film-line);
          border-radius: 4px;
          padding: 8px 10px 1px;
          margin-bottom: 9px;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .casting-slate-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
          padding-bottom: 5px;
          border-bottom: 1px dashed var(--film-line);
          margin-bottom: 5px;
        }

        .casting-slate-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 4px; }

        .casting-slate-row label {
          flex-shrink: 0;
          font-family: 'Courier Prime','Courier New',monospace;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--film-muted);
        }

        .casting-slate-row p {
          margin: 0;
          min-width: 0;
          text-align: right;
          font-family: 'Courier Prime','Courier New',monospace;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.1;
          color: var(--film-ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .casting-slate-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          font-family: 'Courier Prime','Courier New',monospace;
          font-size: 6.5px;
          letter-spacing: .08em;
          line-height: 1.2;
          text-transform: uppercase;
          color: var(--film-muted);
          flex-shrink: 0;
        }

        .casting-slate-footer span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .casting-slate-footer b { color: var(--film-accent); font-weight: 700; }

        .casting-slate-actions {
          display: flex;
          width: max-content;
          margin-top: 7px;
          border: 1px solid var(--film-line);
          background: rgba(0,0,0,.18);
          overflow: hidden;
          flex-shrink: 0;
        }

        .casting-slate-actions button {
          border: 0;
          border-right: 1px solid var(--film-line);
          background: transparent;
          color: var(--film-muted);
          padding: 4px 8px;
          cursor: pointer;
          font-family: 'Courier Prime','Courier New',monospace;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: background .15s,color .15s;
        }
        .casting-slate-actions button:last-child { border-right: 0; }
        .casting-slate-actions button:hover { background: var(--film-accent); color: #111; }

        /* ─── FILM LIST VIEW ─── */
        .list-row {
          --film-card-1:#141313;
          --film-card-2:#0c0b0b;
          --film-ink:#f4f1e9;
          --film-muted:#a19b8d;
          --film-accent:#f0a70a;
          --film-line:rgba(244,241,233,.16);
          display:flex;
          align-items:stretch;
          width:100%;
          min-height:145px;
          margin-bottom:12px;
          background:radial-gradient(circle at 50% 0%,rgba(240,167,10,.05),transparent 55%),linear-gradient(180deg,var(--film-card-1),var(--film-card-2));
          border:1px solid rgba(240,167,10,.18);
          border-radius:9px;
          overflow:hidden;
          cursor:pointer;
          box-shadow:0 16px 35px -18px rgba(0,0,0,.7);
          transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
        }
        .list-row:hover { transform:translateY(-3px); box-shadow:0 22px 42px -18px rgba(0,0,0,.78); border-color:rgba(240,167,10,.3); }
        .list-row-closed { filter:saturate(.72); }

        .list-film-rail {
          width:25px;
          min-width:25px;
          background:#090909;
          border-right:1px solid rgba(240,167,10,.16);
          display:flex;
          flex-direction:column;
          justify-content:space-around;
          padding:8px 0;
        }
        .list-film-rail:last-child { border-right:0; border-left:1px solid rgba(240,167,10,.16); }
        .list-film-rail span { width:13px; height:15px; margin:0 auto; background:#f4f1e9; border-radius:3px; }

        .list-row-main { flex:1; min-width:0; padding:0 18px 12px; color:var(--film-ink); }
        .list-clapper { display:flex; height:12px; margin:0 -18px 11px; overflow:hidden; }
        .list-clapper span { flex:1; transform:skewX(-22deg); margin:0 -3px; }
        .list-clapper span:nth-child(odd) { background:var(--film-ink); }
        .list-clapper span:nth-child(even) { background:var(--film-card-2); border:1px solid var(--film-line); border-left:0; border-right:0; }
        .list-row-kicker { font:700 8px/1 'Courier Prime','Courier New',monospace; letter-spacing:.24em; text-transform:uppercase; color:var(--film-accent); margin-bottom:5px; }
        .list-row-title-line { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
        .list-row-left { min-width:0; flex:1; }
        .list-row-title { display:block; color:var(--film-ink); font:400 clamp(1.35rem,2.1vw,2rem)/.95 'Bebas Neue',Impact,sans-serif; letter-spacing:.02em; text-transform:uppercase; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .list-row-company { display:block; margin-top:3px; color:var(--film-muted); font:9px/1.2 'Courier Prime','Courier New',monospace; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .list-status { padding:3px 7px; border:1px solid var(--film-line); font:700 7px/1 'Courier Prime','Courier New',monospace; letter-spacing:.1em; text-transform:uppercase; flex-shrink:0; }
        .list-status.open { color:var(--film-accent); border-color:rgba(240,167,10,.3); }
        .list-status.closed { color:#d58d84; }
        .list-row-meta { display:flex; gap:14px; flex-wrap:wrap; margin-top:10px; padding:9px 0; border-top:1px dashed var(--film-line); border-bottom:1px dashed var(--film-line); }
        .list-row-meta span { display:flex; gap:5px; align-items:baseline; color:var(--film-ink); font:9px/1.2 'Courier Prime','Courier New',monospace; }
        .list-row-meta b { color:var(--film-muted); font-size:6px; letter-spacing:.12em; }
        .list-row-bottom { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:9px; color:var(--film-muted); font:7px/1.2 'Courier Prime','Courier New',monospace; letter-spacing:.08em; text-transform:uppercase; }
        .list-row-bottom b { color:var(--film-accent); }
        .list-row-bottom .post-actions { display:flex; gap:0; margin-left:auto; border:1px solid var(--film-line); }
        .list-row-bottom .post-actions button { border:0; border-right:1px solid var(--film-line); background:transparent; color:var(--film-muted); padding:4px 8px; font:700 7px/1 'Courier Prime','Courier New',monospace; text-transform:uppercase; cursor:pointer; }
        .list-row-bottom .post-actions button:last-child { border-right:0; }
        .list-row-bottom .post-actions button:hover { background:var(--film-accent); color:#111; }

        /* ─── FILM SLATE FORM ─── */
        .post-form-section { padding:2.2rem 6vw 4rem; }
        .post-form-header { max-width:900px; margin-bottom:1rem; }
        .post-form-header h2 { font-family:'Bebas Neue',Impact,sans-serif !important; text-transform:uppercase; letter-spacing:.04em; font-weight:400 !important; font-size:clamp(2rem,4vw,3.2rem) !important; }
        .post-form-header p { font-family:'Courier Prime','Courier New',monospace; font-size:.8rem; text-transform:uppercase; letter-spacing:.08em; }
        .post-form {
          --form-bg:#11100f;
          max-width:900px;
          position:relative;
          overflow:hidden;
          background:linear-gradient(180deg,#171514 0%,#0c0b0b 100%);
          border:1px solid rgba(240,167,10,.2);
          border-radius:8px;
          padding:42px 28px 24px;
          box-shadow:0 24px 50px -22px rgba(0,0,0,.7),0 0 0 1px rgba(240,167,10,.04);
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:1rem;
        }
        .post-form::before {
          content:"";
          position:absolute;
          top:0;left:0;right:0;height:25px;
          background:repeating-linear-gradient(120deg,#f4f1e9 0 42px,#11100f 42px 84px);
          border-bottom:1px solid rgba(244,241,233,.16);
        }
        .post-form::after {
          content:"PRODUCTION SLATE";
          position:absolute;right:18px;top:31px;
          color:#f0a70a;font:700 7px 'Courier Prime','Courier New',monospace;letter-spacing:.22em;text-transform:uppercase;
        }
        .form-field { display:flex; flex-direction:column; gap:5px; }
        .form-label { font:700 .68rem 'Courier Prime','Courier New',monospace; text-transform:uppercase; letter-spacing:.13em; color:#a19b8d; }
        .form-full { grid-column:1 / 3; }
        .form-actions { display:flex; gap:.7rem; align-items:center; justify-content:flex-start; padding-top:.4rem; }
        .post-form .hf-inp { width:100%; background:#0b0b0b !important; border:1px solid rgba(244,241,233,.16) !important; border-radius:3px !important; color:#f4f1e9 !important; padding:10px 11px !important; font-family:'Courier Prime','Courier New',monospace !important; font-size:.82rem !important; outline:none; }
        .post-form .hf-inp::placeholder { color:#706b61 !important; }
        .post-form .hf-inp:focus { border-color:rgba(240,167,10,.55) !important; box-shadow:0 0 0 2px rgba(240,167,10,.08); }
        .post-form .csd-trigger { min-height:40px; background:#0b0b0b; border:1px solid rgba(244,241,233,.16); border-radius:3px; color:#f4f1e9; font-family:'Courier Prime','Courier New',monospace; }
        .post-form .csd-trigger.open,.post-form .csd-trigger:hover { border-color:rgba(240,167,10,.55); }
        .post-form .csd-menu { background:#11100f; border-color:rgba(240,167,10,.25); border-radius:3px; }
        .post-form .csd-option { color:#f4f1e9; font-family:'Courier Prime','Courier New',monospace; }
        .post-form .csd-option:hover,.post-form .csd-option.selected { background:rgba(240,167,10,.1); color:#f0a70a; }
        .post-form .lang-menu-title,.post-form .lang-clear,.post-form .lang-chip { font-family:'Courier Prime','Courier New',monospace; }
        .post-form .lang-chip { border-radius:2px; }
        .post-form .btn-gold { border-radius:3px !important; font-family:'Courier Prime','Courier New',monospace; text-transform:uppercase; letter-spacing:.08em; font-size:.72rem; }
        .post-form .btn-outline-sm { border-radius:3px !important; font-family:'Courier Prime','Courier New',monospace; text-transform:uppercase; letter-spacing:.08em; font-size:.72rem; }

        @media (max-width: 700px) {
          .casting-rail {
            width: 22px;
            min-width: 22px;
            padding: 14px 0;
          }

          .casting-rail span {
            width: 13px;
            height: 16px;
            margin: 0 auto;
          }

          .casting-slate-content {
            padding: 18px 16px 16px;
          }

          .casting-clapper {
            margin-left: -16px;
            margin-right: -16px;
          }

          .casting-slate-title {
            font-size: clamp(1.8rem, 8vw, 2.6rem);
          }

          .casting-slate {
            padding-left: 13px;
            padding-right: 13px;
          }

          .casting-slate-row {
            gap: 10px;
          }

          .casting-slate-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .casting-post-card { aspect-ratio: 1 / 1; }
          .casting-slate-title { font-size: clamp(1.5rem, 7vw, 2rem); }
          .casting-slate-row p { font-size: 9px; }
          .list-row-title { white-space: normal; }
        }

        /* ─── BALANCED FILM SLATE SIZING ─── */
        /* The card stays compact/square, but the information is readable. */
        .casting-post-card {
          aspect-ratio: 1 / 1;
        }

        .casting-slate-content {
          padding: 17px 18px 15px;
        }

        .casting-clapper {
          height: 14px;
          margin-left: -18px;
          margin-right: -18px;
          margin-bottom: 14px;
        }

        .casting-eyebrow {
          font-size: 10px;
          letter-spacing: .22em;
          margin-bottom: 7px;
        }

        .casting-slate-title {
          font-size: clamp(1.35rem, 1.65vw, 1.75rem);
          line-height: .94;
          letter-spacing: .02em;
          margin-bottom: 7px;
          max-height: 3.8em;
        }

        .casting-slate-sub {
          font-size: 11px;
          line-height: 1.35;
          margin-bottom: 11px;
        }

        .casting-slate {
          padding: 10px 12px 2px;
          margin-bottom: 11px;
        }

        .casting-slate-row {
          gap: 10px;
          padding-bottom: 7px;
          margin-bottom: 7px;
        }

        .casting-slate-row label {
          font-size: 9px;
          letter-spacing: .13em;
        }

        .casting-slate-row p {
          font-size: 13px;
          line-height: 1.2;
        }

        .casting-slate-footer {
          font-size: 8px;
          letter-spacing: .07em;
        }

        .casting-slate-actions {
          margin-top: 8px;
        }

        .casting-slate-actions button {
          padding: 5px 10px;
          font-size: 8px;
        }

        /* ─── BALANCED FILM LIST VIEW ─── */
        .list-row {
          min-height: 132px;
        }

        .list-row-main {
          padding: 0 20px 14px;
        }

        .list-clapper {
          height: 14px;
          margin-left: -20px;
          margin-right: -20px;
          margin-bottom: 12px;
        }

        .list-row-kicker {
          font-size: 9px;
          margin-bottom: 6px;
        }

        .list-row-title {
          font-size: clamp(1.25rem, 1.8vw, 1.7rem);
          line-height: .98;
          letter-spacing: .015em;
        }

        .list-row-company {
          margin-top: 4px;
          font-size: 10px;
        }

        .list-status {
          padding: 4px 9px;
          font-size: 8px;
        }

        .list-row-meta {
          gap: 16px;
          margin-top: 11px;
          padding: 10px 0;
        }

        .list-row-meta span {
          gap: 6px;
          font-size: 10px;
        }

        .list-row-meta b {
          font-size: 7px;
        }

        .list-row-bottom {
          margin-top: 10px;
          font-size: 8px;
        }

        .list-row-bottom .post-actions button {
          padding: 5px 9px;
          font-size: 8px;
        }

        @media (max-width: 700px) {
          .casting-slate-title {
            font-size: clamp(1.3rem, 7vw, 1.8rem);
          }

          .casting-slate-row label {
            font-size: 8px;
          }

          .casting-slate-row p {
            font-size: 12px;
          }

          .list-row-title {
            font-size: 1.35rem;
          }

          .list-row-meta span {
            font-size: 9px;
          }
        }


        /* ─── COMPACT APPLICATION-STYLE VIEW POPUP ─── */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0,0,0,.68);
          backdrop-filter: blur(5px);
        }

        html.dark .modal-overlay {
          background: rgba(0,0,0,.75);
        }

        .casting-modal {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 88vh;
          overflow-y: auto;
          background: var(--card-bg);
          color: var(--ink);
          border: 2px solid var(--nb-border);
          box-shadow: 8px 8px 0 var(--nb-border);
          border-radius: 0;
          padding: 0;
          animation: popIn .25s cubic-bezier(.34,1.56,.64,1);
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(.93) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .close-btn {
          position: absolute;
          z-index: 5;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #f4f1e9;
          background: #11100f;
          color: #f4f1e9;
          border-radius: 0;
          font-size: 1.25rem;
          line-height: 1;
          cursor: pointer;
        }

        .close-btn:hover {
          background: #11100f;
          color: #f4f1e9;
          border-color: #f4f1e9;
        }

        .modal-slate-strip {
          height: 26px;
          background: repeating-linear-gradient(
            120deg,
            #f4f1e9 0 42px,
            #11100f 42px 84px
          );
        }

        .casting-modal-cover {
          height: 80px;
          background: linear-gradient(135deg,#24211d,#0d0c0c);
          overflow: hidden;
        }

        .casting-modal-content {
          position: relative;
          padding: 28px;
        }

        .casting-modal-avatar {
          width: 84px;
          height: 84px;
          margin-top: -45px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid var(--card-bg);
          border-radius: 50%;
          background: #11100f;
          color: #a19b8d;
          font: 700 2.4rem/1 Impact, sans-serif;
          box-shadow: 0 0 0 2px #11100f;
        }

        .modal-status-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 8px;
        }

        .modal-film-kicker {
          margin: 0 0 6px;
          color: var(--gold);
          font: 700 10px/1 'Courier New', monospace;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .modal-title {
          margin: 0;
          color: var(--ink);
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: clamp(2rem,4vw,3rem);
          line-height: .95;
          letter-spacing: .02em;
          text-transform: uppercase;
        }

        .modal-company {
          margin: 8px 0 5px;
          color: var(--gold);
          font-weight: 800;
          font-size: .9rem;
        }

        .modal-location {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0;
          color: var(--mid);
          font-size: .85rem;
        }

        .modal-location span {
          font: 700 9px/1 'Courier New', monospace;
          letter-spacing: .12em;
          color: var(--mid);
        }

        .modal-location strong {
          color: var(--ink);
          font-size: .85rem;
        }

        .modal-section {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 2px solid var(--nb-border);
        }

        .modal-section h3 {
          margin: 0 0 .65rem;
          padding: 0;
          border: 0;
          color: var(--ink);
          font: 900 .72rem/1 'Courier New', monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .modal-section p {
          margin: 0;
          color: var(--mid);
          line-height: 1.7;
          font-size: .92rem;
        }

        .modal-info {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 6px;
          margin-top: 1.5rem;
        }

        .modal-info-item {
          min-width: 0;
          padding: 12px;
          background: #11100f;
          color: #fff;
          border-radius: 0;
        }

        html.dark .modal-info-item {
          background: #f0eeea;
          color: #0f0e0d;
        }

        .modal-info-item strong {
          display: block;
          margin-bottom: 5px;
          color: rgba(255,255,255,.55);
          font: 900 8px/1 'Courier New', monospace;
          letter-spacing: .05em;
        }

        .modal-info-item span {
          display: block;
          color: #fff;
          font: 800 13px/1.2 'Courier New', monospace;
          overflow-wrap: anywhere;
        }

        html.dark .modal-info-item strong {
          color: rgba(15,14,13,.5);
        }

        html.dark .modal-info-item span {
          color: #0f0e0d;
        }

        .modal-posted {
          margin-top: 1.2rem;
          color: var(--mid);
          font: 8px/1 'Courier New', monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .modal-posted b {
          color: var(--ink);
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 1.8rem;
          flex-wrap: wrap;
        }

        .film-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 15px;
          border-radius: 3px;
          font: 700 9px/1 'Courier New', monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .film-btn-gold {
          border: 1px solid var(--gold);
          background: var(--gold);
          color: #111;
        }

        .film-btn-outline {
          border: 1px solid var(--ink);
          background: transparent;
          color: var(--ink);
        }

        .film-btn-gold:hover {
          background: var(--gold2);
        }

        .film-btn-outline:hover {
          border-color: var(--gold);
          background: rgba(201,168,76,.07);
        }

        /* ─── MODAL RESPONSIVE ─── */

        @media (max-width: 1000px) {
          .modal-info {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 16px;
          }

          .casting-modal {
            max-height: 92vh;
            box-shadow: 6px 6px 0 var(--nb-border);
          }

          .casting-modal-content {
            padding: 22px;
          }

          .close-btn {
            right: 14px;
            top: 14px;
          }
        }

        @media (max-width: 520px) {
          .modal-info {
            grid-template-columns: 1fr 1fr;
          }

          .casting-modal-content {
            padding: 18px;
          }

          .casting-modal-avatar {
            width: 76px;
            height: 76px;
            margin-top: -40px;
            font-size: 2.1rem;
          }

          .modal-title {
            font-size: 1.8rem;
          }

          .modal-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .film-btn {
            width: 100%;
          }
        }

        /* =========================================================
   FILM-SLATE SIZING — readable, balanced, square
========================================================= */

/* ── Grid cards ── */
.posts-grid {
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.casting-post-card {
  width: 100%;
  aspect-ratio: 1 / 1;
  height: auto;
  min-height: 0;
  max-height: 440px;
  border-radius: 10px;
}

.casting-rail {
  width: 28px;
  min-width: 28px;
  padding: 14px 0;
}

.casting-rail span {
  width: 16px;
  height: 18px;
  border-radius: 3px;
}

.casting-slate-content {
  padding: 18px 20px 15px;
}

.casting-clapper {
  height: 16px;
  margin: 0 -20px 16px;
}

.casting-eyebrow {
  font-size: 10px;
  letter-spacing: .22em;
  margin-bottom: 6px;
}

.casting-slate-title {
  font-size: clamp(1.7rem, 2.4vw, 2.4rem);
  line-height: .92;
  max-height: 2.76em;
  margin-bottom: 7px;
}

.casting-slate-sub {
  font-size: 11px;
  margin-bottom: 10px;
}

.casting-slate {
  padding: 10px 12px 2px;
  margin-bottom: 10px;
}

.casting-slate-row {
  padding-bottom: 7px;
  margin-bottom: 7px;
  gap: 10px;
}

.casting-slate-row label {
  font-size: 9px;
  letter-spacing: .14em;
}

.casting-slate-row p {
  font-size: 13px;
  line-height: 1.2;
}

.casting-slate-footer {
  font-size: 8px;
  letter-spacing: .08em;
}

.casting-slate-actions {
  margin-top: 8px;
}

.casting-slate-actions button {
  padding: 5px 10px;
  font-size: 8px;
}

/* ── List rows ── */
.list-row {
  min-height: 160px;
  margin-bottom: 12px;
  border-radius: 9px;
}

.list-film-rail {
  width: 28px;
  min-width: 28px;
  padding: 10px 0;
}

.list-film-rail span {
  width: 16px;
  height: 18px;
  border-radius: 3px;
}

.list-row-main {
  padding: 0 22px 16px;
}

.list-clapper {
  height: 14px;
  margin: 0 -22px 13px;
}

.list-row-kicker {
  font-size: 9px;
  letter-spacing: .22em;
  margin-bottom: 5px;
}

.list-row-title {
  font-size: clamp(1.45rem, 2vw, 2rem);
  line-height: .96;
  letter-spacing: .02em;
}

.list-row-company {
  margin-top: 4px;
  font-size: 10px;
}

.list-status {
  padding: 4px 10px;
  font-size: 8px;
}

.list-row-meta {
  gap: 16px;
  margin-top: 10px;
  padding: 10px 0;
}

.list-row-meta span {
  font-size: 11px;
  gap: 6px;
}

.list-row-meta b {
  font-size: 7.5px;
}

.list-row-bottom {
  margin-top: 9px;
  font-size: 8px;
}

.list-row-bottom .post-actions button {
  padding: 5px 10px;
  font-size: 8px;
}

/* ── Form ── */
.post-form-section {
  padding: 1.8rem 6vw 3.5rem;
}

.post-form-header {
  max-width: 860px;
  margin-bottom: 1rem;
}

.post-form {
  max-width: 860px;
  padding: 42px 28px 24px;
  gap: 1rem;
}

.form-label {
  font-size: .66rem;
}

.post-form .hf-inp {
  padding: 10px 12px !important;
  font-size: .82rem !important;
}

.post-form .csd-trigger {
  min-height: 40px;
  font-size: .82rem;
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .posts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .casting-post-card { max-height: none; }
}

@media (max-width: 700px) {
  .posts-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .casting-post-card {
    width: min(100%, 420px);
    justify-self: center;
  }
  .casting-slate-title {
    font-size: clamp(1.6rem, 8vw, 2.2rem);
  }
  .casting-slate-row label { font-size: 8px; }
  .casting-slate-row p { font-size: 12px; }
  .list-row-title { font-size: 1.4rem; white-space: normal; }
  .list-row-meta span { font-size: 10px; }
  .casting-slate-footer { flex-direction: column; align-items: flex-start; }
}

      `}</style>

      <section className="overview-strip">

          <div className="dashboard-overview">
            <div className="overview-card">
              <div className="overview-meta"><span></span><small>THIS MONTH</small></div>
              <h2>{thisMonth}</h2>
              <p>New casting calls</p>
            </div>

            <div className="overview-card">
              <div className="overview-meta"><span></span><small>STATUS</small></div>
              <h2>{openPosts}</h2>
              <p>Currently accepting applications</p>
            </div>

            <div className="overview-card">
              <div className="overview-meta"><span></span><small>STATUS</small></div>
              <h2>{closedPosts}</h2>
              <p>Closed opportunities</p>
            </div>

            <div className="overview-card">
              <div className="overview-meta"><span></span><small>ALL TIME</small></div>
              <h2>{totalPosts}</h2>
              <p>All-time casting calls</p>
            </div>
          </div>
      </section>

        <div className="post-toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input className="search-input" placeholder="Search casting calls…" value={search}
                onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="toolbar-right">
            <button className={`filter-btn${showFilters ? " active" : ""}`} onClick={() => setShowFilters(s => !s)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5h18M6 12h12M10 19h4" />
              </svg>
              Filters {showFilters ? "▲" : "▼"}
            </button>
            <button className={`view-btn${viewMode === "grid" ? " active" : ""}`} onClick={() => setViewMode("grid")} title="Grid view">⊞</button>
            <button className={`view-btn${viewMode === "list" ? " active" : ""}`} onClick={() => setViewMode("list")} title="List view">☰</button>
          </div>
        </div>

        <div className={`filters-collapse${showFilters ? " open" : ""}`}>
          <FilterBar f={filters} set={setFilter} total={filtered.length} onReset={resetFilters} />
        </div>

        {showForm && (
          <CastingFormSection editing={editing} onSave={handleSave} onCancel={handleCancelForm} />
        )}

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

      {selectedPost && (
        <DetailsModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}