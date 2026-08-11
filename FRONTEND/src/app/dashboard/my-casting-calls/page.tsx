"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
   APPLICATION MODAL
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
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="mac-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="mac-modal">

        <button
          type="button"
          className="mac-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="mac-modal-status-row">
          <span
            className={`mac-application-status ${application.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {application.status}
          </span>

          <span
            className={`mac-casting-status ${
              application.castingStatus === "Open"
                ? "open"
                : "closed"
            }`}
          >
            {application.castingStatus}
          </span>
        </div>

        <h2 className="mac-modal-title">
          {application.title}
        </h2>

        <p className="mac-modal-company">
          {application.company}
        </p>

        <div className="mac-modal-info">

          <div>
            <strong>Category</strong>
            <p>{application.category}</p>
          </div>

          <div>
            <strong>Location</strong>
            <p>{application.location}</p>
          </div>

          <div>
            <strong>Shoot Date</strong>
            <p>{fmtDate(application.shootDate)}</p>
          </div>

          <div>
            <strong>Budget</strong>
            <p>{getBudget(application.budget)}</p>
          </div>

          <div>
            <strong>Applied</strong>
            <p>{fmtDate(application.appliedDate)}</p>
          </div>

          <div>
            <strong>Deadline</strong>
            <p>{fmtDate(application.deadline || "")}</p>
          </div>

          <div>
            <strong>Experience</strong>
            <p>{application.experience || "Any"}</p>
          </div>

          <div>
            <strong>Languages</strong>
            <p>{application.languages || "Any"}</p>
          </div>

        </div>

        <h3 className="mac-modal-heading">
          About this role
        </h3>

        <div className="mac-modal-description">
          {application.description}
        </div>

        <div className="mac-modal-actions">
          <button
            type="button"
            className="mac-btn-outline"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

/* =========================================================
   GRID CARD
========================================================= */

function ApplicationCard({
  application,
  onView,
}: {
  application: Application;
  onView: (application: Application) => void;
}) {
  return (
    <div
      className="mac-application-card"
      onClick={() => onView(application)}
    >

      <div className="mac-card-top">

        <div className="mac-card-status-row">

          <span
            className={`mac-application-status ${application.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {application.status}
          </span>

          <span
            className={`mac-casting-status ${
              application.castingStatus === "Open"
                ? "open"
                : "closed"
            }`}
          >
            {application.castingStatus}
          </span>

        </div>

        <div className="mac-card-title-area">

          <h3>
            {application.title}
          </h3>

          <p>
            {application.company}
          </p>

        </div>

      </div>

      <div className="mac-casting-info">

        <div>
          <strong>Category</strong>
          <p>{application.category}</p>
        </div>

        <div>
          <strong>Location</strong>
          <p>{application.location}</p>
        </div>

        <div>
          <strong>Budget</strong>
          <p>{getBudget(application.budget)}</p>
        </div>

      </div>

      <p className="mac-description">
        {application.description}
      </p>

      <small className="mac-meta">
        Applied {fmtDate(application.appliedDate)}
        {application.deadline
          ? ` · Deadline ${fmtDate(application.deadline)}`
          : ""}
      </small>

      <div
        className="mac-card-actions"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="mac-view-button"
          onClick={() => onView(application)}
        >
          View Application
        </button>
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
  return (
    <div
      className="mac-list-row"
      onClick={() => onView(application)}
    >

      <div className="mac-list-left">

        <div className="mac-list-title">
          <span>
            {application.title}
          </span>

          <span className="mac-list-company">
            {application.company}
          </span>
        </div>

        <div className="mac-list-meta">

          <span>{application.category}</span>

          <span>{application.location}</span>

          <span>
            {getBudget(application.budget)}
          </span>

          <span>
            Applied {fmtDate(application.appliedDate)}
          </span>

        </div>

      </div>

      <div
        className="mac-list-right"
        onClick={(event) => event.stopPropagation()}
      >

        <span
          className={`mac-application-status ${application.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {application.status}
        </span>

        <button
          type="button"
          className="mac-row-view"
          onClick={() => onView(application)}
        >
          View
        </button>

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

        /* =====================================================
           CARD
        ===================================================== */

        .mac-application-card {
          position: relative;
          background: var(--mac-card);
          border: 2.5px solid var(--mac-border);
          border-radius: 0;
          padding: 1.5rem;
          box-shadow: 4px 4px 0 var(--mac-border);
          cursor: pointer;
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .mac-application-card:hover {
          transform: translate(-2px,-2px);
          box-shadow: 6px 6px 0 var(--mac-border);
        }

        .mac-card-status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--mac-border);
        }

        .mac-card-title-area {
          margin-top: 14px;
        }

        .mac-card-title-area h3 {
          color: var(--mac-ink);
          font-size: 1.35rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .mac-card-title-area p {
          color: var(--mac-gold);
          font-size: 0.85rem;
          font-weight: 700;
        }

        /* =====================================================
           INFO BLOCKS
        ===================================================== */

        .mac-casting-info {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .mac-casting-info div {
          background: #0f0e0d;
          padding: 8px 10px;
        }

        html.dark .mac-casting-info div {
          background: #f0eeea;
        }

        .mac-casting-info strong {
          display: block;
          margin-bottom: 3px;
          color: rgba(255,255,255,0.5);
          font-size: 0.58rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        html.dark .mac-casting-info strong {
          color: rgba(15,14,13,0.5);
        }

        .mac-casting-info p {
          margin: 0;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 800;
        }

        html.dark .mac-casting-info p {
          color: #0f0e0d;
        }

        .mac-description {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: var(--mac-mid);
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .mac-meta {
          display: block;
          margin-top: 0.6rem;
          margin-bottom: 1rem;
          color: var(--mac-mid);
          font-size: 0.72rem;
          font-weight: 600;
        }

        /* =====================================================
           CARD ACTION
        ===================================================== */

        .mac-card-actions {
          display: flex;
          width: max-content;
          border: 2px solid var(--mac-border);
          overflow: hidden;
        }

        .mac-view-button {
          padding: 7px 16px;
          border: none;
          background: #fef3c7;
          color: #92400e;
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            background 0.15s,
            color 0.15s;
        }

        html.dark .mac-view-button {
          background: rgba(201,168,76,0.15);
          color: var(--mac-gold);
        }

        .mac-view-button:hover {
          background: var(--mac-gold);
          color: #111;
        }

        /* =====================================================
           LIST
        ===================================================== */

        .mac-list-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.2rem 1.6rem;
          margin-bottom: 0.6rem;
          background: var(--mac-card);
          border: 2.5px solid var(--mac-border);
          border-radius: 0;
          box-shadow: 3px 3px 0 var(--mac-border);
          cursor: pointer;
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .mac-list-row:hover {
          transform: translate(-2px,-2px);
          box-shadow: 5px 5px 0 var(--mac-border);
        }

        .mac-list-left {
          flex: 1;
          min-width: 0;
        }

        .mac-list-title {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .mac-list-title > span:first-child {
          color: var(--mac-ink);
          font-size: 1rem;
          font-weight: 800;
        }

        .mac-list-company {
          color: var(--mac-mid);
          font-size: 0.85rem;
        }

        .mac-list-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.3rem;
          color: var(--mac-mid);
          font-size: 0.8rem;
        }

        .mac-list-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .mac-row-view {
          padding: 7px 14px;
          border: 2px solid var(--mac-border);
          background: transparent;
          color: var(--mac-ink);
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            background 0.15s,
            color 0.15s;
        }

        .mac-row-view:hover {
          background: var(--mac-gold);
          color: #111;
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
           MODAL
        ===================================================== */

        .mac-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
        }

        html.dark .mac-modal-overlay {
          background: rgba(0,0,0,0.75);
        }

        .mac-modal {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 88vh;
          overflow-y: auto;
          padding: 4.5rem 2.5rem 2.5rem;
          background: var(--mac-card);
          color: var(--mac-ink);
          border: 2.5px solid var(--mac-border);
          border-radius: 0;
          box-shadow: 8px 8px 0 var(--mac-border);
          animation: mac-pop-in 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes mac-pop-in {
          from {
            opacity: 0;
            transform: scale(0.93) translateY(16px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .mac-close-btn {
          position: absolute;
          top: 18px;
          right: 20px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--mac-border);
          background: transparent;
          color: var(--mac-ink);
          font-size: 1.1rem;
          cursor: pointer;
        }

        .mac-close-btn:hover {
          background: var(--mac-gold);
          color: #111;
        }

        .mac-modal-status-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .mac-modal-title {
          margin-bottom: 6px;
          color: var(--mac-ink);
          font-size: clamp(1.4rem,3vw,1.9rem);
          font-weight: 900;
          line-height: 1.2;
        }

        .mac-modal-company {
          margin-bottom: 1.5rem;
          color: var(--mac-gold);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .mac-modal-info {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 0.5rem;
          margin: 1.5rem 0;
        }

        .mac-modal-info div {
          padding: 10px 12px;
          background: #0f0e0d;
        }

        html.dark .mac-modal-info div {
          background: #f0eeea;
        }

        .mac-modal-info strong {
          display: block;
          margin-bottom: 4px;
          color: rgba(255,255,255,0.5);
          font-size: 0.58rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        html.dark .mac-modal-info strong {
          color: rgba(15,14,13,0.5);
        }

        .mac-modal-info p {
          margin: 0;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 800;
        }

        html.dark .mac-modal-info p {
          color: #0f0e0d;
        }

        .mac-modal-heading {
          margin-bottom: 0.6rem;
          padding-top: 1.2rem;
          border-top: 2px solid var(--mac-border);
          color: var(--mac-mid);
          font-size: 0.82rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .mac-modal-description {
          color: var(--mac-mid);
          font-size: 0.92rem;
          line-height: 1.75;
        }

        .mac-modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .mac-btn-outline {
          padding: 0.55rem 1.2rem;
          border: 1.5px solid var(--mac-mist);
          border-radius: 100px;
          background: transparent;
          color: var(--mac-ink);
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }

        .mac-btn-outline:hover {
          border-color: var(--mac-gold);
          background: rgba(201,168,76,0.07);
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