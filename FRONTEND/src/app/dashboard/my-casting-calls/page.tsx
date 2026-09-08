"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

/* =========================================================
   TYPES
========================================================= */

interface Application {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  shootDate: string;
  budget: string;
  appliedDate: string;
  deadline?: string;
  status: "Applied" | "Shortlisted" | "Selected" | "Rejected" | "Withdrawn";
  castingStatus: "Open" | "Closed";
  description: string;
  experience?: string;
  languages?: string;
  age?: string;
}

/* =========================================================
   SEED APPLICATIONS

   Replace these with your actual application data later.
========================================================= */

const SEED_APPLICATIONS: Application[] = [
  {
    id: "application-1",
    title: "Lead Actor — Drama Web Series",
    company: "Hotstar Originals",
    category: "Actor",
    location: "Mumbai",
    shootDate: "2026-08-24",
    budget: "80000",
    appliedDate: "2026-08-05",
    deadline: "2026-08-15",
    status: "Shortlisted",
    castingStatus: "Open",
    description:
      "Looking for a lead actor for a 10-episode drama series set in modern Delhi. Strong emotive range and prior OTT experience preferred.",
    experience: "Intermediate",
    languages: "Hindi, English",
    age: "25-35",
  },
  {
    id: "application-2",
    title: "Female Model — Fashion Campaign",
    company: "Lakme India",
    category: "Model",
    location: "Delhi",
    shootDate: "2026-08-30",
    budget: "45000",
    appliedDate: "2026-08-03",
    deadline: "2026-08-18",
    status: "Applied",
    castingStatus: "Open",
    description:
      "Seeking fresh faces for the upcoming autumn collection campaign. Portfolio and comp card required.",
    experience: "Beginner",
    languages: "Hindi",
    age: "18-28",
  },
  {
    id: "application-3",
    title: "Dancer — Bollywood Music Video",
    company: "T-Series",
    category: "Dancer",
    location: "Mumbai",
    shootDate: "2026-08-21",
    budget: "55000",
    appliedDate: "2026-08-01",
    deadline: "2026-08-10",
    status: "Selected",
    castingStatus: "Closed",
    description:
      "High-energy Bollywood choreography for an upcoming music video. Classical or contemporary background preferred.",
    experience: "Expert",
    languages: "Hindi",
    age: "18-30",
  },
  {
    id: "application-4",
    title: "Voice Artist — Animated Series",
    company: "Toonz Media",
    category: "Voice Artist",
    location: "Remote",
    shootDate: "2026-09-02",
    budget: "30000",
    appliedDate: "2026-07-28",
    deadline: "2026-08-05",
    status: "Rejected",
    castingStatus: "Closed",
    description:
      "Voice artists required for character dubbing in an animated children's series. South Indian language proficiency preferred.",
    experience: "Intermediate",
    languages: "Tamil, Telugu",
    age: "20-40",
  },
  {
    id: "application-5",
    title: "Supporting Actor — Feature Film",
    company: "Blue Frame Productions",
    category: "Actor",
    location: "Hyderabad",
    shootDate: "2026-09-12",
    budget: "65000",
    appliedDate: "2026-07-25",
    deadline: "2026-08-20",
    status: "Applied",
    castingStatus: "Open",
    description:
      "Supporting role for an upcoming feature film. Theatre experience and strong dialogue delivery are preferred.",
    experience: "Intermediate",
    languages: "Hindi, English, Telugu",
    age: "22-35",
  },
  {
    id: "application-6",
    title: "Fashion Campaign — Autumn Collection",
    company: "Urban Vogue",
    category: "Fashion Model",
    location: "Delhi",
    shootDate: "2026-09-06",
    budget: "40000",
    appliedDate: "2026-07-20",
    deadline: "2026-08-12",
    status: "Withdrawn",
    castingStatus: "Open",
    description:
      "Looking for fashion models for an editorial and digital campaign.",
    experience: "Beginner",
    languages: "Hindi, English",
    age: "18-28",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function fmtDate(value: string) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getBudget(value: string) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

/* =========================================================
   CUSTOM SELECT
========================================================= */

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div className="mac-select-wrap" ref={ref}>
      <button
        type="button"
        className={`mac-select-trigger${open ? " open" : ""}`}
        onClick={() => setOpen((previous) => !previous)}
      >
        <span className={selected ? "mac-select-value" : "mac-select-placeholder"}>
          {selected ? selected.label : placeholder}
        </span>

        <span className={`mac-select-arrow${open ? " up" : ""}`}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="mac-select-menu">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`mac-select-option${
                option.value === value ? " selected" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>

              {option.value === value && (
                <span className="mac-select-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FILTERS
========================================================= */

interface Filters {
  status: string;
  category: string;
  castingStatus: string;
  location: string;
  sort: string;
}

function FilterBar({
  filters,
  setFilter,
  total,
  onReset,
}: {
  filters: Filters;
  setFilter: (
    key: keyof Filters,
    value: string
  ) => void;
  total: number;
  onReset: () => void;
}) {
  const activeCount = [
    filters.status,
    filters.category,
    filters.castingStatus,
    filters.location,
  ].filter(Boolean).length;

  return (
    <div className="mac-filter-bar">
      <div className="mac-filter-grid">

        <CustomSelect
          value={filters.status}
          onChange={(value) => setFilter("status", value)}
          options={[
            { value: "", label: "Any Application Status" },
            { value: "Applied", label: "Applied" },
            { value: "Shortlisted", label: "Shortlisted" },
            { value: "Selected", label: "Selected" },
            { value: "Rejected", label: "Rejected" },
            { value: "Withdrawn", label: "Withdrawn" },
          ]}
          placeholder="Application Status"
        />

        <CustomSelect
          value={filters.category}
          onChange={(value) => setFilter("category", value)}
          options={[
            { value: "", label: "Any Category" },
            { value: "Actor", label: "Actor" },
            { value: "Model", label: "Model" },
            { value: "Fashion Model", label: "Fashion Model" },
            { value: "Dancer", label: "Dancer" },
            { value: "Voice Artist", label: "Voice Artist" },
          ]}
          placeholder="Category"
        />

        <CustomSelect
          value={filters.castingStatus}
          onChange={(value) => setFilter("castingStatus", value)}
          options={[
            { value: "", label: "Any Casting Status" },
            { value: "Open", label: "Open" },
            { value: "Closed", label: "Closed" },
          ]}
          placeholder="Casting Status"
        />

        <div className="mac-input-wrap">
          <input
            className="mac-input"
            placeholder="Location"
            value={filters.location}
            onChange={(event) =>
              setFilter("location", event.target.value)
            }
          />
        </div>

        <CustomSelect
          value={filters.sort}
          onChange={(value) => setFilter("sort", value)}
          options={[
            { value: "newest", label: "Newest Applications" },
            { value: "oldest", label: "Oldest Applications" },
            { value: "budget-high", label: "Budget: High → Low" },
            { value: "budget-low", label: "Budget: Low → High" },
            { value: "shoot-date", label: "Shoot Date" },
          ]}
          placeholder="Sort by"
        />

      </div>

      <div className="mac-filter-footer">
        <span className="mac-result-count">
          {total} application{total !== 1 ? "s" : ""}
        </span>

        {activeCount > 0 && (
          <button
            type="button"
            className="mac-filter-reset"
            onClick={onReset}
          >
            Clear {activeCount} filter{activeCount !== 1 ? "s" : ""} ×
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================================================
    APPLICATION MODAL — film-slate style matching Casting Calls
========================================================= */
function ApplicationModal({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const infoItems: [string, string][] = [
    ["ROLE", application.category || "Casting"],
    ["LOCATION", application.location || "Not specified"],
    ["AGE", application.age || "Any"],
    ["GENDER", application.gender || "Any"],
    ["EXPERIENCE", application.experience || "Any"],
    ["LANGUAGES", application.languages || "—"],
    ["BUDGET", getBudget(application.budget)],
    ...(application.deadline ? [["DEADLINE", fmtDate(application.deadline)] as [string, string]] : []),
  ];

  return createPortal(
    <>
    <div className="modal-overlay" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="casting-modal">
        <div className="modal-slate-strip" />
        <button type="button" className="close-btn" onClick={onClose} aria-label="Close">×</button>
        <div className="casting-modal-cover" aria-hidden="true" />

        <div className="casting-modal-content">
          <div className="casting-modal-avatar" aria-hidden="true">
            {(application.title || application.category || "C")[0].toUpperCase()}
          </div>

          <div className="modal-status-row">
            <span className={`post-status ${application.castingStatus === "Open" ? "open" : "closed"}`}>
              {application.castingStatus === "Open" ? "NOW CASTING" : "WRAPPED"}
            </span>
          </div>

          <p className="modal-film-kicker">CASTING OPPORTUNITY</p>
          <h2 className="modal-title">{application.title}</h2>
          <p className="modal-company">{application.company}</p>

          <div className="modal-location">
            <span>LOCATION</span>
            <strong>{application.location || "Not specified"}</strong>
          </div>

          <div className="modal-section">
            <h3>ABOUT THIS ROLE</h3>
            <p>{application.description || "No description has been provided for this casting opportunity."}</p>
          </div>

          <div className="modal-info">
            {infoItems.map(([label, value]) => (
              <div className="modal-info-item" key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="modal-posted">
            APPLIED <b>{fmtDate(application.appliedDate)}</b>
          </div>

          <div className="modal-actions">
            <button className="film-btn film-btn-gold" type="button">APPLY NOW</button>
            <button className="film-btn film-btn-outline" type="button" onClick={onClose}>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
    </>,
    document.body
  );
}

/* =========================================================
    GRID CARD — film slate style matching Casting Calls
========================================================= */
function ApplicationCard({
  application,
  onView,
}: {
  application: Application;
  onView: (application: Application) => void;
}) {
  const budget = Number(application.budget || 0);
  const statusText =
    application.castingStatus === "Open" ? "Now Casting" : "Wrapped";

  return (
    <div
      className={`casting-post-card${
        application.castingStatus === "Closed" ? " casting-closed" : ""
      }`}
      onClick={() => onView(application)}
    >
      <div className="casting-rail casting-rail-left" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => <span key={index} />)}
      </div>

      <div className="casting-slate-content">
        <div className="casting-clapper" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, index) => <span key={index} />)}
        </div>

        <p className="casting-eyebrow">{statusText}</p>

        <h3 className="casting-slate-title">{application.title}</h3>

        <p className="casting-slate-sub">
          {application.company} <span>·</span> {application.location}
        </p>

        <div className="casting-slate">
          <div className="casting-slate-row"><label>Role</label><p>{application.category || "Casting"}</p></div>
          <div className="casting-slate-row"><label>Age</label><p>{application.age || "ANY"}</p></div>
          <div className="casting-slate-row"><label>Gender</label><p>{application.gender || "ANY"}</p></div>
          <div className="casting-slate-row"><label>Budget</label><p>₹{budget.toLocaleString("en-IN")}</p></div>
          {application.deadline && (
            <div className="casting-slate-row"><label>Deadline</label><p>{fmtDate(application.deadline)}</p></div>
          )}
        </div>

        <div className="casting-slate-footer">
          <span>PROD. <b>{application.company}</b></span>
          <span>CAT. <b>{application.category}</b></span>
        </div>
      </div>

      <div className="casting-rail casting-rail-right" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => <span key={index} />)}
      </div>
    </div>
  );
}

/* =========================================================
    LIST ROW
========================================================= */

function ApplicationListRow({
  application,
  onView,
}: {
  application: Application;
  onView: (application: Application) => void;
}) {
  const statusText =
    application.castingStatus === "Open" ? "Now Casting" : "Wrapped";

  return (
    <div
      className={`list-row${
        application.castingStatus === "Closed" ? " list-row-closed" : ""
      }`}
      onClick={() => onView(application)}
    >
      <div className="list-film-rail" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="list-row-main">
        <div className="list-clapper" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="list-row-kicker">
          {statusText}
        </div>

        <div className="list-row-title-line">
          <div className="list-row-left">
            <span className="list-row-title">
              {application.title}
            </span>

            <span className="list-row-company">
              {application.company}
            </span>
          </div>

          <span
            className={`list-status ${
              application.castingStatus === "Open" ? "open" : "closed"
            }`}
          >
            {application.castingStatus}
          </span>
        </div>

        <div className="list-row-meta">
          <span>
            <b>ROLE</b>
            {application.category || "Casting"}
          </span>

          <span>
            <b>LOCATION</b>
            {application.location || "Not specified"}
          </span>

          <span>
            <b>AGE</b>
            {application.age || "Any"}
          </span>

          <span>
            <b>BUDGET</b>
            {getBudget(application.budget)}
          </span>

          {application.deadline && (
            <span>
              <b>DEADLINE</b>
              {fmtDate(application.deadline)}
            </span>
          )}
        </div>

        <div className="list-row-bottom">
          <span>
            PROD. <b>{application.company}</b>
          </span>

          <span>
            APPLIED. <b>{fmtDate(application.appliedDate)}</b>
          </span>

          <div
            className="post-actions"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="row-view-btn"
              onClick={() => onView(application)}
            >
              View
            </button>
          </div>
        </div>
      </div>

      <div className="list-film-rail" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function MyCastingCallsPage() {
  const [applications, setApplications] =
    useState<Application[]>(SEED_APPLICATIONS);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [viewMode, setViewMode] =
    useState<"grid" | "list">("grid");

  const [showFilters, setShowFilters] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [filters, setFilters] = useState<Filters>({
    status: "",
    category: "",
    castingStatus: "",
    location: "",
    sort: "newest",
  });

  const setFilter = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((previous) => ({
        ...previous,
        [key]: value,
      }));
    },
    []
  );

  const resetFilters = () => {
    setSearch("");

    setFilters({
      status: "",
      category: "",
      castingStatus: "",
      location: "",
      sort: "newest",
    });
  };

  /* =======================================================
     LOAD APPLICATIONS

     If you already have an "applications" localStorage
     object, it will be used automatically.
  ======================================================= */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("talentApplications");

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setApplications(parsed);
        }
      }
    } catch {
      setApplications(SEED_APPLICATIONS);
    }
  }, []);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalApplications = applications.length;

  const shortlisted = applications.filter(
    (application) =>
      application.status === "Shortlisted"
  ).length;

  const selected = applications.filter(
    (application) =>
      application.status === "Selected"
  ).length;

  const pending = applications.filter(
    (application) =>
      application.status === "Applied"
  ).length;

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredApplications = applications
    .filter((application) => {

      if (!search.trim()) {
        return true;
      }

      const term = search.toLowerCase();

      return [
        application.title,
        application.company,
        application.category,
        application.location,
      ].some((value) =>
        value.toLowerCase().includes(term)
      );
    })

    .filter(
      (application) =>
        !filters.status ||
        application.status === filters.status
    )

    .filter(
      (application) =>
        !filters.category ||
        application.category.toLowerCase() ===
          filters.category.toLowerCase()
    )

    .filter(
      (application) =>
        !filters.castingStatus ||
        application.castingStatus ===
          filters.castingStatus
    )

    .filter(
      (application) =>
        !filters.location ||
        application.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
    )

    .sort((a, b) => {

      if (filters.sort === "newest") {
        return (
          new Date(b.appliedDate).getTime() -
          new Date(a.appliedDate).getTime()
        );
      }

      if (filters.sort === "oldest") {
        return (
          new Date(a.appliedDate).getTime() -
          new Date(b.appliedDate).getTime()
        );
      }

      if (filters.sort === "budget-high") {
        return (
          Number(b.budget) -
          Number(a.budget)
        );
      }

      if (filters.sort === "budget-low") {
        return (
          Number(a.budget) -
          Number(b.budget)
        );
      }

      if (filters.sort === "shoot-date") {
        return (
          new Date(a.shootDate).getTime() -
          new Date(b.shootDate).getTime()
        );
      }

      return 0;
    });

  return (
    <>
      <style>{`

        /* =====================================================
           VARIABLES
        ===================================================== */

        :root {
          --mac-ink: #0f0e0d;
          --mac-cream: #fffdf7;
          --mac-gold: #c9a84c;
          --mac-gold2: #e8c96a;
          --mac-mid: #6b6560;
          --mac-mist: #f0ebe0;
          --mac-card: #ffffff;
          --mac-input: #ffffff;
          --mac-input-border: #e0dbd0;
          --mac-shadow: 0 8px 32px rgba(0,0,0,0.08);
          --mac-border: #0f0e0d;
          --ink: var(--mac-ink);
          --cream: var(--mac-cream);
          --gold: var(--mac-gold);
          --gold2: var(--mac-gold2);
          --mid: var(--mac-mid);
          --mist: var(--mac-mist);
          --card-bg: var(--mac-card);
          --nb-border: #0f0e0d;
        }

        html.dark {
          --mac-ink: #f0eeea;
          --mac-cream: #0b0b0b;
          --mac-gold: #c9a84c;
          --mac-gold2: #f1d472;
          --mac-mid: #a8a29e;
          --mac-mist: #1e1e1e;
          --mac-card: #1a1a1a;
          --mac-input: #1a1a1a;
          --mac-input-border: #2e2e2e;
          --mac-shadow: 0 8px 32px rgba(0,0,0,0.35);
          --mac-border: #f0eeea;
          --nb-border: #f0eeea;
        }

        /* =====================================================
           PAGE
        ===================================================== */

        .mac-page {
          min-height: 100vh;
          background: var(--mac-cream);
          color: var(--mac-ink);
          transition:
            background 0.35s ease,
            color 0.35s ease;
          font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .mac-page *,
        .mac-page *::before,
        .mac-page *::after {
          box-sizing: border-box;
        }

        /* =====================================================
           PROGRESS
        ===================================================== */

        .mac-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(201,168,76,0.15);
          z-index: 300;
        }

        .mac-progress-inner {
          width: 100%;
          height: 100%;
          background: var(--mac-gold);
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .mac-header {
          padding: 4rem 6vw 2.5rem;
          border-bottom: 1px solid var(--mac-mist);
        }

        .mac-header-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .mac-header-label span {
          width: 3px;
          height: 18px;
          background: var(--mac-gold);
          border-radius: 999px;
        }

        .mac-header-label small {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--mac-mid);
        }

        .mac-header h1 {
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: var(--mac-ink);
        }

        .mac-header p {
          margin-top: 0.75rem;
          color: var(--mac-mid);
          font-size: 0.95rem;
        }

        /* =====================================================
           OVERVIEW
        ===================================================== */

        .mac-overview {
          padding: 2.5rem 6vw;
          border-bottom: 1px solid var(--mac-mist);
        }

        .mac-overview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }

        .mac-overview-card {
          background: var(--mac-card);
          border: 1.5px solid var(--mac-mist);
          border-radius: 22px;
          padding: 1.5rem 1.7rem;
          box-shadow: var(--mac-shadow);
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .mac-overview-card:hover {
          transform: translateY(-3px);
          border-color: rgba(201,168,76,0.5);
          box-shadow:
            0 16px 40px rgba(201,168,76,0.12);
        }

        .mac-overview-meta {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }

        .mac-overview-meta span {
          width: 3px;
          height: 16px;
          background: var(--mac-gold);
          border-radius: 999px;
        }

        .mac-overview-meta small {
          margin: 0;
          color: var(--mac-mid);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .mac-overview-card h2 {
          font-size: clamp(2rem, 3vw, 2.6rem);
          line-height: 1;
          color: var(--mac-gold);
          font-weight: 900;
          margin-bottom: 0.45rem;
        }

        .mac-overview-card p {
          color: var(--mac-mid);
          font-size: 0.9rem;
        }

        /* =====================================================
           TOOLBAR
        ===================================================== */

        .mac-toolbar {
          padding: 2rem 6vw 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .mac-toolbar-left {
          display: flex;
          align-items: center;
        }

        .mac-toolbar-right {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .mac-search-wrap {
          position: relative;
        }

        .mac-search {
          width: 340px;
          padding: 0.72rem 1.2rem;
          border: 1.5px solid var(--mac-input-border);
          border-radius: 100px;
          background: var(--mac-input);
          color: var(--mac-ink);
          outline: none;
          font-family: inherit;
          font-size: 0.88rem;
          transition:
            width 0.3s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .mac-search::placeholder {
          color: var(--mac-mid);
        }

        .mac-search:focus {
          width: 400px;
          border-color: var(--mac-gold);
          box-shadow:
            0 0 0 3px rgba(201,168,76,0.15);
        }

        .mac-filter-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.62rem 1.2rem;
          border: 1.5px solid var(--mac-mist);
          border-radius: 100px;
          background: var(--mac-card);
          color: var(--mac-ink);
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition:
            border-color 0.2s,
            background 0.2s,
            color 0.2s;
        }

        .mac-filter-button:hover,
        .mac-filter-button.active {
          border-color: var(--mac-gold);
          background: rgba(201,168,76,0.08);
          color: var(--mac-ink);
        }

        html.dark .mac-filter-button:hover,
        html.dark .mac-filter-button.active {
          color: #f0eeea;
        }

        .mac-view-button-toggle {
          width: 38px;
          height: 38px;
          border: 1.5px solid var(--mac-mist);
          border-radius: 8px;
          background: var(--mac-card);
          color: var(--mac-mid);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            border-color 0.2s,
            color 0.2s,
            background 0.2s;
        }

        .mac-view-button-toggle:hover,
        .mac-view-button-toggle.active {
          border-color: var(--mac-gold);
          color: var(--mac-gold);
          background: rgba(201,168,76,0.07);
        }

        /* =====================================================
           FILTERS
        ===================================================== */

        .mac-filters-collapse {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition:
            max-height 0.45s cubic-bezier(0.4,0,0.2,1),
            opacity 0.3s ease;
        }

        .mac-filters-collapse.open {
          max-height: 400px;
          overflow: visible;
          opacity: 1;
        }

        .mac-filter-bar {
          position: relative;
          z-index: 50;
          padding: 1.5rem 6vw;
          margin-top: 1.5rem;
          background: var(--mac-card);
          border-top: 1px solid var(--mac-mist);
          border-bottom: 1px solid var(--mac-mist);
        }

        .mac-filter-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .mac-filter-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .mac-result-count {
          color: var(--mac-mid);
          font-size: 0.83rem;
        }

        .mac-filter-reset {
          padding: 0.3rem 0.9rem;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 100px;
          background: rgba(201,168,76,0.12);
          color: var(--mac-gold);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .mac-filter-reset:hover {
          background: rgba(201,168,76,0.22);
        }

        /* =====================================================
           INPUTS
        ===================================================== */

        .mac-input-wrap {
          width: 100%;
        }

        .mac-input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid var(--mac-input-border);
          border-radius: 14px;
          background: var(--mac-input);
          color: var(--mac-ink);
          outline: none;
          font-family: inherit;
          font-size: 0.92rem;
          transition:
            border-color 0.25s,
            box-shadow 0.25s;
        }

        .mac-input::placeholder {
          color: var(--mac-mid);
        }

        .mac-input:focus {
          border-color: var(--mac-gold);
          box-shadow:
            0 0 0 3px rgba(201,168,76,0.15);
        }

        /* =====================================================
           SELECT
        ===================================================== */

        .mac-select-wrap {
          position: relative;
          width: 100%;
        }

        .mac-select-trigger {
          width: 100%;
          min-height: 47px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 13px 16px;
          border: 1.5px solid var(--mac-input-border);
          border-radius: 14px;
          background: var(--mac-input);
          color: var(--mac-ink);
          font-family: inherit;
          font-size: 0.92rem;
          cursor: pointer;
          text-align: left;
        }

        .mac-select-trigger:hover {
          border-color: rgba(201,168,76,0.5);
          background: rgba(201,168,76,0.06);
        }

        .mac-select-trigger.open {
          border-color: var(--mac-gold);
          box-shadow:
            0 0 0 3px rgba(201,168,76,0.15);
        }

        .mac-select-placeholder {
          color: var(--mac-mid);
        }

        .mac-select-value {
          color: var(--mac-ink);
          font-weight: 600;
        }

        .mac-select-arrow {
          display: flex;
          align-items: center;
          color: var(--mac-mid);
          transition: transform 0.25s ease;
        }

        .mac-select-arrow.up {
          transform: rotate(180deg);
        }

        .mac-select-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          max-height: 220px;
          overflow-y: auto;
          background: var(--mac-card);
          border: 2px solid var(--mac-gold);
          border-radius: 16px;
          z-index: 9999;
        }

        .mac-select-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          border: none;
          border-bottom: 1px solid var(--mac-mist);
          background: transparent;
          color: var(--mac-ink);
          font-family: inherit;
          font-size: 0.88rem;
          cursor: pointer;
          text-align: left;
        }

        .mac-select-option:last-child {
          border-bottom: none;
        }

        .mac-select-option:hover {
          background: rgba(201,168,76,0.18);
        }

        html.dark .mac-select-option:hover {
          color: #f0eeea;
          background: rgba(201,168,76,0.25);
        }

        .mac-select-option.selected {
          background: rgba(201,168,76,0.15);
          color: var(--mac-gold);
          font-weight: 800;
        }

        .mac-select-check {
          color: var(--mac-gold);
          font-weight: 900;
        }

        /* =====================================================
           APPLICATIONS SECTION
        ===================================================== */

        .mac-applications {
          padding: 2.5rem 6vw 5rem;
        }

        .mac-section-heading {
          margin-bottom: 2rem;
        }

        .mac-section-heading h2 {
          color: var(--mac-ink);
          font-size: clamp(1.4rem,2.5vw,1.9rem);
          font-weight: 800;
        }

        .mac-section-heading p {
          margin-top: 0.3rem;
          color: var(--mac-mid);
        }

        .mac-grid {
          display: grid;
          grid-template-columns:
            repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .mac-application-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: max-content;
          padding: 4px 10px;
          border: 1.5px solid var(--mac-border);
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .mac-application-status.applied {
          background: #fef3c7;
          color: #92400e;
        }

        .mac-application-status.shortlisted {
          background: #dbeafe;
          color: #1e40af;
        }

        .mac-application-status.selected {
          background: #d1fae5;
          color: #065f46;
        }

        .mac-application-status.rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .mac-application-status.withdrawn {
          background: #e5e7eb;
          color: #374151;
        }

        html.dark .mac-application-status.applied {
          background: rgba(201,168,76,0.18);
          color: #f1d472;
        }

        html.dark .mac-application-status.shortlisted {
          background: rgba(59,130,246,0.18);
          color: #93c5fd;
        }

        html.dark .mac-application-status.selected {
          background: rgba(46,125,50,0.2);
          color: #6fcf87;
        }

        html.dark .mac-application-status.rejected {
          background: rgba(198,40,40,0.2);
          color: #f28b82;
        }

        html.dark .mac-application-status.withdrawn {
          background: rgba(156,163,175,0.15);
          color: #d1d5db;
        }

        .mac-casting-status {
          display: inline-flex;
          padding: 4px 10px;
          border: 1.5px solid var(--mac-border);
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .mac-casting-status.open {
          background: #d1fae5;
          color: #065f46;
        }

        .mac-casting-status.closed {
          background: #fee2e2;
          color: #991b1b;
        }

        html.dark .mac-casting-status.open {
          background: rgba(46,125,50,0.2);
          color: #6fcf87;
        }

        html.dark .mac-casting-status.closed {
          background: rgba(198,40,40,0.2);
          color: #f28b82;
        }

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


        /* =====================================================
           LIST — exact film-slate style used by post/page.tsx
        ===================================================== */

        .list-row {
          --film-card-1: #141313;
          --film-card-2: #0c0b0b;
          --film-ink: #f4f1e9;
          --film-muted: #a19b8d;
          --film-accent: #f0a70a;
          --film-line: rgba(244,241,233,.16);

          display: flex;
          align-items: stretch;
          width: 100%;
          min-height: 160px;
          margin-bottom: 12px;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(240,167,10,.05),
              transparent 55%
            ),
            linear-gradient(
              180deg,
              var(--film-card-1),
              var(--film-card-2)
            );
          border: 1px solid rgba(240,167,10,.18);
          border-radius: 9px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 16px 35px -18px rgba(0,0,0,.7);
          transition:
            transform .2s ease,
            box-shadow .2s ease,
            border-color .2s ease;
        }

        .list-row:hover {
          transform: translateY(-3px);
          box-shadow: 0 22px 42px -18px rgba(0,0,0,.78);
          border-color: rgba(240,167,10,.3);
        }

        .list-row-closed {
          filter: saturate(.72);
        }

        .list-film-rail {
          width: 28px;
          min-width: 28px;
          background: #090909;
          border-right: 1px solid rgba(240,167,10,.16);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 10px 0;
        }

        .list-film-rail:last-child {
          border-right: 0;
          border-left: 1px solid rgba(240,167,10,.16);
        }

        .list-film-rail span {
          display: block;
          width: 16px;
          height: 18px;
          margin: 0 auto;
          background: #f4f1e9;
          border-radius: 3px;
          box-shadow: 0 0 0 1px rgba(255,255,255,.06);
        }

        .list-row-main {
          flex: 1;
          min-width: 0;
          padding: 0 22px 16px;
          color: var(--film-ink);
        }

        .list-clapper {
          display: flex;
          height: 14px;
          margin: 0 -22px 13px;
          overflow: hidden;
        }

        .list-clapper span {
          flex: 1;
          transform: skewX(-22deg);
          margin: 0 -3px;
        }

        .list-clapper span:nth-child(odd) {
          background: var(--film-ink);
        }

        .list-clapper span:nth-child(even) {
          background: var(--film-card-2);
          border: 1px solid var(--film-line);
          border-left: 0;
          border-right: 0;
        }

        .list-row-kicker {
          font:
            700 9px/1
            'Courier Prime',
            'Courier New',
            monospace;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--film-accent);
          margin-bottom: 5px;
        }

        .list-row-title-line {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .list-row-left {
          min-width: 0;
          flex: 1;
        }

        .list-row-title {
          display: block;
          color: var(--film-ink);
          font:
            400 clamp(1.45rem, 2vw, 2rem)/.96
            'Bebas Neue',
            Impact,
            sans-serif;
          letter-spacing: .02em;
          text-transform: uppercase;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .list-row-company {
          display: block;
          margin-top: 4px;
          color: var(--film-muted);
          font:
            10px/1.2
            'Courier Prime',
            'Courier New',
            monospace;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .list-status {
          padding: 4px 10px;
          border: 1px solid var(--film-line);
          font:
            700 8px/1
            'Courier Prime',
            'Courier New',
            monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .list-status.open {
          color: var(--film-accent);
          border-color: rgba(240,167,10,.3);
        }

        .list-status.closed {
          color: #d58d84;
        }

        .list-row-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 10px;
          padding: 10px 0;
          border-top: 1px dashed var(--film-line);
          border-bottom: 1px dashed var(--film-line);
        }

        .list-row-meta span {
          display: flex;
          gap: 6px;
          align-items: baseline;
          color: var(--film-ink);
          font:
            11px/1.2
            'Courier Prime',
            'Courier New',
            monospace;
        }

        .list-row-meta b {
          color: var(--film-muted);
          font-size: 7.5px;
          letter-spacing: .12em;
        }

        .list-row-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 9px;
          color: var(--film-muted);
          font:
            8px/1.2
            'Courier Prime',
            'Courier New',
            monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .list-row-bottom b {
          color: var(--film-accent);
        }

        .list-row-bottom .post-actions {
          display: flex;
          gap: 0;
          margin-left: auto;
          border: 1px solid var(--film-line);
        }

        .list-row-bottom .post-actions button {
          border: 0;
          border-right: 1px solid var(--film-line);
          background: transparent;
          color: var(--film-muted);
          padding: 5px 10px;
          font:
            700 8px/1
            'Courier Prime',
            'Courier New',
            monospace;
          text-transform: uppercase;
          cursor: pointer;
        }

        .list-row-bottom .post-actions button:last-child {
          border-right: 0;
        }

        .list-row-bottom .post-actions button:hover {
          background: var(--film-accent);
          color: #111;
        }

        @media (max-width: 700px) {
          .list-row {
            min-height: 0;
          }

          .list-row-main {
            padding: 0 16px 14px;
          }

          .list-clapper {
            margin-left: -16px;
            margin-right: -16px;
            margin-bottom: 11px;
          }

          .list-row-title {
            font-size: 1.35rem;
          }

          .list-row-meta {
            gap: 10px;
          }

          .list-row-meta span {
            font-size: 9px;
          }

          .list-row-bottom {
            flex-wrap: wrap;
          }

          .list-row-bottom .post-actions {
            width: 100%;
            margin-left: 0;
          }

          .list-film-rail {
            width: 22px;
            min-width: 22px;
          }

          .list-film-rail span {
            width: 13px;
            height: 15px;
          }
        }

        /* =====================================================
           EMPTY
        ===================================================== */

        .mac-empty {
          padding: 5rem 2rem;
          text-align: center;
          background: var(--mac-card);
          border: 1.5px solid var(--mac-mist);
          border-radius: 22px;
        }

        .mac-empty h3 {
          margin-bottom: 0.5rem;
          color: var(--mac-ink);
          font-size: 1.3rem;
          font-weight: 800;
        }

        .mac-empty p {
          margin-bottom: 1.5rem;
          color: var(--mac-mid);
        }

        .mac-clear-button {
          padding: 0.78rem 2rem;
          border: none;
          border-radius: 100px;
          background: var(--mac-gold);
          color: #111;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 800;
          cursor: pointer;
        }

        .mac-clear-button:hover {
          background: var(--mac-gold2);
        }

        /* =====================================================
           MODAL — exact Casting Calls film-slate popup
        ===================================================== */
/* ─── COMPACT APPLICATION-STYLE VIEW POPUP ─── */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
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
          z-index: 1;
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

        
        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1000px) {
          .mac-overview-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .mac-filter-grid {
            grid-template-columns: repeat(3,1fr);
          }

          .mac-modal-info {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media (max-width: 768px) {
          .mac-toolbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .mac-toolbar-right {
            width: 100%;
            flex-wrap: wrap;
          }

          .mac-search {
            width: 280px;
          }

          .mac-search:focus {
            width: 320px;
          }

          .mac-filter-grid {
            grid-template-columns: 1fr 1fr;
          }

          .mac-grid {
            grid-template-columns: 1fr;
          }

          .mac-list-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .mac-list-right {
            width: 100%;
            flex-wrap: wrap;
          }

          .mac-casting-info {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media (max-width: 520px) {
          .mac-overview-grid {
            grid-template-columns: 1fr 1fr;
          }

          .mac-filter-grid {
            grid-template-columns: 1fr;
          }

          .mac-casting-info {
            grid-template-columns: 1fr;
          }

          .mac-modal-info {
            grid-template-columns: 1fr 1fr;
          }

          .mac-search {
            width: 220px;
          }

          .mac-search:focus {
            width: 250px;
          }

          .mac-header {
            padding-left: 5vw;
            padding-right: 5vw;
          }

          .mac-overview,
          .mac-applications {
            padding-left: 5vw;
            padding-right: 5vw;
          }
        }

      `}</style>

      <main className="mac-page">

        {/* ===================================================
            PROGRESS BAR
        =================================================== */}

        <div className="mac-progress">
          <div className="mac-progress-inner" />
        </div>

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="mac-header">

          <div className="mac-header-label">
            <span />
            <small>Talent Dashboard</small>
          </div>

          <h1>
            My Casting Calls
          </h1>

          <p>
            Track every casting opportunity you have applied to.
          </p>

        </header>

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        <section className="mac-overview">

          <div className="mac-overview-grid">

            <div className="mac-overview-card">
              <div className="mac-overview-meta">
                <span />
                <small>ALL APPLICATIONS</small>
              </div>

              <h2>{totalApplications}</h2>

              <p>
                Casting calls applied to
              </p>
            </div>

            <div className="mac-overview-card">
              <div className="mac-overview-meta">
                <span />
                <small>SHORTLISTED</small>
              </div>

              <h2>{shortlisted}</h2>

              <p>
                Applications shortlisted
              </p>
            </div>

            <div className="mac-overview-card">
              <div className="mac-overview-meta">
                <span />
                <small>SELECTED</small>
              </div>

              <h2>{selected}</h2>

              <p>
                Successful applications
              </p>
            </div>

            <div className="mac-overview-card">
              <div className="mac-overview-meta">
                <span />
                <small>AWAITING RESPONSE</small>
              </div>

              <h2>{pending}</h2>

              <p>
                Applications awaiting response
              </p>
            </div>

          </div>

        </section>

        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="mac-toolbar">

          <div className="mac-toolbar-left">

            <div className="mac-search-wrap">

              <input
                className="mac-search"
                placeholder="Search my casting calls..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

          </div>

          <div className="mac-toolbar-right">

            <button
              type="button"
              className={`mac-filter-button${
                showFilters ? " active" : ""
              }`}
              onClick={() =>
                setShowFilters((previous) => !previous)
              }
            >
              Filters {showFilters ? "▲" : "▼"}
            </button>

            <button
              type="button"
              className={`mac-view-button-toggle${
                viewMode === "grid" ? " active" : ""
              }`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              ⊞
            </button>

            <button
              type="button"
              className={`mac-view-button-toggle${
                viewMode === "list" ? " active" : ""
              }`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              ☰
            </button>

          </div>

        </div>

        {/* ===================================================
            FILTER PANEL
        =================================================== */}

        <div
          className={`mac-filters-collapse${
            showFilters ? " open" : ""
          }`}
        >
          <FilterBar
            filters={filters}
            setFilter={setFilter}
            total={filteredApplications.length}
            onReset={resetFilters}
          />
        </div>

        {/* ===================================================
            APPLICATIONS
        =================================================== */}

        <section className="mac-applications">

          <div className="mac-section-heading">

            <h2>
              My Applications
            </h2>

            <p>
              {filteredApplications.length} application
              {filteredApplications.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          {filteredApplications.length === 0 ? (

            <div className="mac-empty">

              <h3>
                No applications found
              </h3>

              <p>
                Try adjusting your search or filters.
              </p>

              <button
                type="button"
                className="mac-clear-button"
                onClick={resetFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : viewMode === "grid" ? (

            <div className="mac-grid">

              {filteredApplications.map(
                (application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    onView={setSelectedApplication}
                  />
                )
              )}

            </div>

          ) : (

            <div>

              {filteredApplications.map(
                (application) => (
                  <ApplicationListRow
                    key={application.id}
                    application={application}
                    onView={setSelectedApplication}
                  />
                )
              )}

            </div>

          )}

        </section>

        {/* ===================================================
            MODAL
        =================================================== */}

        {selectedApplication && (
          <ApplicationModal
            application={selectedApplication}
            onClose={() =>
              setSelectedApplication(null)
            }
          />
        )}

      </main>
    </>
  );
}