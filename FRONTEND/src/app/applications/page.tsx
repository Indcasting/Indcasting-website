"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  FolderKanban,
  ExternalLink,
  Filter,
  Grid2X2,
  List,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroCarousel from "@/components/ui/Herocarousel";
import { talentHeroSlides } from "@/data/heroSlides";
import { PortfolioData } from "@/types/portfolio";

/* ─────────────────────────────────────────
   TYPES / CONSTANTS
───────────────────────────────────────── */

type ViewMode = "grid" | "list";

const CATEGORIES = [
  "Actors",
  "Models",
  "Voice Artists",
  "Dancers",
  "Singers",
  "Photographers",
  "Directors",
  "Editors",
  "Cinematographers",
  "Choreographers",
];


/* Temporary demo profiles for development. These are rendered alongside
   real published portfolios and do not depend on localStorage. */
const DEMO_PORTFOLIOS = [
  {
    userId: "demo-arjun-mehta",
    usernameSlug: "arjun-mehta",
    isPublished: true,
    completionPercentage: 94,
    basicInfo: {
      fullName: "Arjun Mehta",
      professionalTitle: "Lead Actor",
      location: "Mumbai, Maharashtra",
      bio: "Versatile screen actor with experience across films, commercials and digital productions.",
      profileImage: "",
      coverBanner: "",
    },
    skills: [
      { id: "demo-arjun-s1", name: "Acting" },
      { id: "demo-arjun-s2", name: "Drama" },
      { id: "demo-arjun-s3", name: "Screen Performance" },
    ],
    experience: [
      {
        id: "demo-arjun-e1",
        role: "Lead Actor",
        company: "Independent Productions",
      },
      {
        id: "demo-arjun-e2",
        role: "Commercial Actor",
        company: "Brand Films",
      },
    ],
    projects: [],
    certifications: [],
  },
  {
    userId: "demo-isha-kapoor",
    usernameSlug: "isha-kapoor",
    isPublished: true,
    completionPercentage: 91,
    basicInfo: {
      fullName: "Isha Kapoor",
      professionalTitle: "Fashion Model",
      location: "Delhi, India",
      bio: "Fashion and commercial model available for campaigns, editorials and brand shoots.",
      profileImage: "",
      coverBanner: "",
    },
    skills: [
      { id: "demo-isha-s1", name: "Modeling" },
      { id: "demo-isha-s2", name: "Fashion" },
      { id: "demo-isha-s3", name: "Commercial" },
    ],
    experience: [
      {
        id: "demo-isha-e1",
        role: "Fashion Model",
        company: "Editorial Studios",
      },
    ],
    projects: [],
    certifications: [],
  },
  {
    userId: "demo-rohan-iyer",
    usernameSlug: "rohan-iyer",
    isPublished: true,
    completionPercentage: 88,
    basicInfo: {
      fullName: "Rohan Iyer",
      professionalTitle: "Voice Artist",
      location: "Bangalore, India",
      bio: "Voice artist specializing in commercials, narration, animation and character voices.",
      profileImage: "",
      coverBanner: "",
    },
    skills: [
      { id: "demo-rohan-s1", name: "Voice Acting" },
      { id: "demo-rohan-s2", name: "Narration" },
      { id: "demo-rohan-s3", name: "Dubbing" },
    ],
    experience: [
      {
        id: "demo-rohan-e1",
        role: "Voice Artist",
        company: "Audio Works",
      },
    ],
    projects: [],
    certifications: [],
  },
  {
    userId: "demo-sana-rao",
    usernameSlug: "sana-rao",
    isPublished: true,
    completionPercentage: 96,
    basicInfo: {
      fullName: "Sana Rao",
      professionalTitle: "Professional Dancer",
      location: "Mumbai, India",
      bio: "Trained dancer available for music videos, films, stage productions and commercial work.",
      profileImage: "",
      coverBanner: "",
    },
    skills: [
      { id: "demo-sana-s1", name: "Dance" },
      { id: "demo-sana-s2", name: "Choreography" },
      { id: "demo-sana-s3", name: "Stage Performance" },
    ],
    experience: [
      {
        id: "demo-sana-e1",
        role: "Dancer",
        company: "Stage Productions",
      },
    ],
    projects: [],
    certifications: [],
  },
  {
    userId: "demo-kabir-singh",
    usernameSlug: "kabir-singh",
    isPublished: true,
    completionPercentage: 90,
    basicInfo: {
      fullName: "Kabir Singh",
      professionalTitle: "Cinematographer",
      location: "Pune, India",
      bio: "Cinematographer focused on narrative films, music videos and commercial productions.",
      profileImage: "",
      coverBanner: "",
    },
    skills: [
      { id: "demo-kabir-s1", name: "Cinematography" },
      { id: "demo-kabir-s2", name: "Camera" },
      { id: "demo-kabir-s3", name: "Lighting" },
    ],
    experience: [
      {
        id: "demo-kabir-e1",
        role: "Cinematographer",
        company: "Frame House",
      },
    ],
    projects: [],
    certifications: [],
  },
  {
    userId: "demo-meera-nair",
    usernameSlug: "meera-nair",
    isPublished: true,
    completionPercentage: 93,
    basicInfo: {
      fullName: "Meera Nair",
      professionalTitle: "Film Editor",
      location: "Chennai, India",
      bio: "Film editor working across short films, advertisements, music videos and digital content.",
      profileImage: "",
      coverBanner: "",
    },
    skills: [
      { id: "demo-meera-s1", name: "Video Editing" },
      { id: "demo-meera-s2", name: "Premiere Pro" },
      { id: "demo-meera-s3", name: "DaVinci Resolve" },
    ],
    experience: [
      {
        id: "demo-meera-e1",
        role: "Film Editor",
        company: "Post House",
      },
    ],
    projects: [],
    certifications: [],
  },
] as unknown as PortfolioData[];

function getAllPublicPortfolios(): PortfolioData[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem("indcasting_portfolios") || "[]";
    const portfolios = JSON.parse(data) as PortfolioData[];
    return portfolios.filter((p) => p.isPublished);
  } catch (error) {
    console.error("Failed to parse portfolios from localStorage", error);
    return [];
  }
}

/* ─────────────────────────────────────────
   DETAILS MODAL
───────────────────────────────────────── */

function ApplicationDetailsModal({
  portfolio,
  onClose,
}: {
  portfolio: PortfolioData;
  onClose: () => void;
}) {
  const { basicInfo, skills, experience, projects, certifications } =
    portfolio;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const esc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      className="application-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="application-modal">
        <button className="application-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-slate-strip" />

        <div className="application-modal-cover">
          {basicInfo.coverBanner && (
            <img src={basicInfo.coverBanner} alt="" />
          )}
        </div>

        <div className="application-modal-content">
          <div className="application-avatar">
            {basicInfo.fullName?.[0] || "?"}
          </div>

          <p className="film-kicker">TALENT APPLICATION</p>

          <h2>{basicInfo.fullName || "Unnamed Portfolio"}</h2>

          <p className="application-modal-title">
            {basicInfo.professionalTitle || "Professional Title"}
          </p>

          {basicInfo.location && (
            <p className="application-modal-location">
              <MapPin size={14} />
              {basicInfo.location}
            </p>
          )}

          {basicInfo.bio && (
            <div className="application-modal-section">
              <h3>ABOUT</h3>
              <p>{basicInfo.bio}</p>
            </div>
          )}

          <div className="application-info-grid">
            <div>
              <strong>EXPERIENCE</strong>
              <span>{experience.length} {experience.length === 1 ? "ROLE" : "ROLES"}</span>
            </div>
            <div>
              <strong>PROJECTS</strong>
              <span>{projects.length}</span>
            </div>
            <div>
              <strong>SKILLS</strong>
              <span>{skills.length}</span>
            </div>
            <div>
              <strong>CERTIFICATIONS</strong>
              <span>{certifications.length}</span>
            </div>
          </div>

          {skills.length > 0 && (
            <div className="application-modal-section">
              <h3>SKILLS</h3>
              <div className="skill-tags">
                {skills.map((skill) => (
                  <span key={skill.id}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-actions">
            <Link
              href={`/portfolio/${portfolio.usernameSlug}`}
              className="film-btn film-btn-gold"
              onClick={onClose}
            >
              VIEW FULL PORTFOLIO
            </Link>

            <button className="film-btn film-btn-outline" onClick={onClose}>
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   GRID CARD — SAME FILM-SLATE LANGUAGE AS POST
───────────────────────────────────────── */

function ApplicationCard({
  portfolio,
  onView,
}: {
  portfolio: PortfolioData;
  onView: (portfolio: PortfolioData) => void;
}) {
  const { basicInfo, skills, experience, projects } = portfolio;

  return (
    <div
      className="application-card"
      onClick={() => onView(portfolio)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onView(portfolio);
      }}
    >
      <div className="application-film-rail" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="application-slate-content">
        <div className="application-clapper" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <p className="film-kicker">TALENT APPLICATION</p>

        <div className="application-card-heading">
          <div>
            <h3>{basicInfo.fullName || "Unnamed Portfolio"}</h3>
            <p className="application-title">
              {basicInfo.professionalTitle || "Professional Title"}
            </p>
          </div>

          <span className="published-stamp">PUBLISHED</span>
        </div>

        {basicInfo.location && (
          <p className="application-location">
            <MapPin size={12} />
            {basicInfo.location}
          </p>
        )}

        <div className="application-slate">
          <div className="application-slate-row">
            <label>ROLE</label>
            <p>{basicInfo.professionalTitle || "Talent"}</p>
          </div>

          <div className="application-slate-row">
            <label>SKILLS</label>
            <p>
              {skills.length > 0
                ? skills.slice(0, 2).map((s) => s.name).join(" · ")
                : "Available"}
            </p>
          </div>

          <div className="application-slate-row">
            <label>EXPERIENCE</label>
            <p>{experience.length} {experience.length === 1 ? "ROLE" : "ROLES"}</p>
          </div>

          <div className="application-slate-row">
            <label>PROJECTS</label>
            <p>{projects.length}</p>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="application-tags">
            {skills.slice(0, 4).map((skill) => (
              <span key={skill.id}>{skill.name}</span>
            ))}
            {skills.length > 4 && <span>+{skills.length - 4}</span>}
          </div>
        )}

        <div className="application-card-footer">
          <span>
            PROFILE. <b>{portfolio.usernameSlug || "TALENT"}</b>
          </span>
          <span>
            COMPLETION. <b>{portfolio.completionPercentage || 0}%</b>
          </span>
        </div>
      </div>

      <div className="application-film-rail" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   LIST ROW — SAME FILM-SLATE LANGUAGE AS POST
───────────────────────────────────────── */

function ApplicationListRow({
  portfolio,
  onView,
}: {
  portfolio: PortfolioData;
  onView: (portfolio: PortfolioData) => void;
}) {
  const { basicInfo, skills, experience, projects } = portfolio;

  return (
    <div
      className="application-list-row"
      onClick={() => onView(portfolio)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onView(portfolio);
      }}
    >
      <div className="application-list-rail" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="application-list-main">
        <div className="application-list-clapper" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="film-kicker">TALENT APPLICATION</div>

        <div className="application-list-title-line">
          <div>
            <span className="application-list-title">
              {basicInfo.fullName || "Unnamed Portfolio"}
            </span>
            <span className="application-list-company">
              {basicInfo.professionalTitle || "Professional Title"}
            </span>
          </div>

          <span className="published-stamp">PUBLISHED</span>
        </div>

        <div className="application-list-meta">
          <span>
            <b>ROLE</b>
            {basicInfo.professionalTitle || "Talent"}
          </span>

          <span>
            <b>LOCATION</b>
            {basicInfo.location || "Not specified"}
          </span>

          <span>
            <b>EXPERIENCE</b>
            {experience.length} roles
          </span>

          <span>
            <b>PROJECTS</b>
            {projects.length}
          </span>

          <span>
            <b>COMPLETION</b>
            {portfolio.completionPercentage || 0}%
          </span>
        </div>

        <div className="application-list-bottom">
          <span>
            SKILLS. <b>{skills.slice(0, 3).map((s) => s.name).join(" · ") || "—"}</b>
          </span>

          <div className="application-actions" onClick={(event) => event.stopPropagation()}>
            <button className="row-view-btn" onClick={() => onView(portfolio)}>
              VIEW
            </button>

            <Link
              href={`/portfolio/${portfolio.usernameSlug}`}
              onClick={(event) => event.stopPropagation()}
            >
              PORTFOLIO
            </Link>
          </div>
        </div>
      </div>

      <div className="application-list-rail" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */

export default function ApplicationsPage() {
  const gsapLoaded = useRef(false);

  const [allPortfolios, setAllPortfolios] =
    useState<PortfolioData[]>(DEMO_PORTFOLIOS);
  const [filteredPortfolios, setFilteredPortfolios] =
    useState<PortfolioData[]>(DEMO_PORTFOLIOS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioData | null>(null);

  useEffect(() => {
    const realPortfolios = getAllPublicPortfolios();

    // Keep the demo profiles visible until real published portfolios exist.
    // Real portfolios are appended without duplicating any demo user IDs.
    const combined = [
      ...DEMO_PORTFOLIOS,
      ...realPortfolios.filter(
        (real) => !DEMO_PORTFOLIOS.some((demo) => demo.userId === real.userId)
      ),
    ];

    setAllPortfolios(combined);
    setFilteredPortfolios(combined);
  }, []);

  useEffect(() => {
    let results = [...allPortfolios];

    const query = search.trim().toLowerCase();

    if (query) {
      results = results.filter((portfolio) => {
        const { basicInfo, skills, experience } = portfolio;

        const values = [
          basicInfo.fullName,
          portfolio.usernameSlug,
          basicInfo.professionalTitle,
          basicInfo.location,
          basicInfo.bio,
          ...skills.map((skill) => skill.name),
          ...experience.flatMap((item) => [item.role, item.company]),
        ];

        return values.some((value) =>
          value?.toLowerCase().includes(query)
        );
      });
    }

    if (category) {
      const normalized = category.toLowerCase().replace(/s$/, "");

      results = results.filter((portfolio) => {
        const title = portfolio.basicInfo.professionalTitle?.toLowerCase() || "";
        const skills = portfolio.skills.map((skill) =>
          skill.name.toLowerCase()
        );

        return title.includes(normalized) ||
          skills.some((skill) => skill.includes(normalized));
      });
    }

    setFilteredPortfolios(results);
  }, [allPortfolios, search, category]);

  useEffect(() => {
  if (gsapLoaded.current) return;

  gsapLoaded.current = true;
  gsap.registerPlugin(ScrollTrigger);

  // Keep only the top scroll progress animation.
  // Do NOT animate the application cards because
  // opacity: 0 can make them disappear on initial render.
  gsap.to(".applications-progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
    },
  });

  const onLoad = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("load", onLoad);

  const refreshTimer = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  return () => {
    window.removeEventListener("load", onLoad);
    window.clearTimeout(refreshTimer);

    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });
  };
}, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setCategory("");
  }, []);

  const totalApplications = allPortfolios.length;
  const visibleApplications = filteredPortfolios.length;
  const completeProfiles = allPortfolios.filter(
    (portfolio) => (portfolio.completionPercentage || 0) >= 80
  ).length;
  const totalProjects = allPortfolios.reduce(
    (sum, portfolio) => sum + portfolio.projects.length,
    0
  );

  return (
    <>
      <div className="applications-progress">
        <div className="applications-progress-bar" />
      </div>

      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        :root {
          --app-ink: #0f0e0d;
          --app-cream: #fffdf7;
          --app-gold: #c9a84c;
          --app-gold-bright: #f0a70a;
          --app-gold-2: #e8c96a;
          --app-mist: #f0ebe0;
          --app-mid: #6b6560;
          --app-white: #ffffff;
          --app-card: #ffffff;
          --app-border: #e0dbd0;
          --app-film: #141313;
          --app-film-2: #0c0b0b;
          --app-film-ink: #f4f1e9;
          --app-film-muted: #a19b8d;
          --app-line: rgba(244,241,233,.16);
        }

        html.dark {
          --app-ink: #f0eeea;
          --app-cream: #0b0b0b;
          --app-mist: #1e1e1e;
          --app-mid: #a8a29e;
          --app-white: #161616;
          --app-card: #1a1a1a;
          --app-border: #2e2e2e;
        }

        body {
          overflow-x: hidden;
        }

        .applications-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(201,168,76,.15);
          z-index: 3000;
        }

        .applications-progress-bar {
          height: 100%;
          width: 100%;
          background: var(--app-gold);
          transform-origin: left;
          transform: scaleX(0);
        }

        .applications-page {
          min-height: 100vh;
          background: var(--app-cream);
          color: var(--app-ink);
          transition: background .35s ease, color .35s ease;
        }

        /* ─── OVERVIEW ─── */

        .applications-overview {
          padding: 2.5rem 6vw;
          background: var(--app-cream);
          border-bottom: 1px solid var(--app-mist);
        }

        .application-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }

        .application-stat-card {
          background: var(--app-card);
          border: 1.5px solid var(--app-mist);
          border-radius: 22px;
          padding: 1.6rem 1.8rem;
          box-shadow: 0 8px 32px rgba(0,0,0,.06);
          transition: border-color .25s, transform .25s, box-shadow .25s;
        }

        .application-stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(201,168,76,.5);
          box-shadow: 0 16px 40px rgba(201,168,76,.12);
        }

        .application-stat-meta {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-bottom: 1rem;
        }

        .application-stat-meta span {
          width: 3px;
          height: 18px;
          background: var(--app-gold);
          border-radius: 999px;
        }

        .application-stat-meta small {
          font-size: .72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .18em;
          color: var(--app-mid);
        }

        .application-stat-card h2 {
          font-size: clamp(2rem,3.5vw,2.6rem);
          font-weight: 900;
          letter-spacing: -.04em;
          color: var(--app-gold);
          line-height: 1;
          margin: 0 0 .4rem;
        }

        .application-stat-card p {
          color: var(--app-mid);
          font-size: .92rem;
          line-height: 1.5;
          margin: 0;
        }

        /* ─── TOOLBAR ─── */

        .applications-toolbar {
          padding: 2rem 6vw 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .applications-toolbar-left,
        .applications-toolbar-right {
          display: flex;
          align-items: center;
          gap: .7rem;
          flex-wrap: wrap;
        }

        .applications-search-wrap {
          position: relative;
        }

        .applications-search-wrap svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--app-mid);
        }

        .applications-search {
          width: 340px;
          padding: .62rem 1.2rem .62rem 2.8rem;
          border: 1.5px solid var(--app-border);
          border-radius: 100px;
          font-size: .88rem;
          font-family: inherit;
          background: var(--app-card);
          color: var(--app-ink);
          outline: none;
          transition: border-color .25s, box-shadow .25s, width .3s ease;
        }

        .applications-search::placeholder {
          color: var(--app-mid);
        }

        .applications-search:focus {
          width: 400px;
          border-color: var(--app-gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,.15);
        }

        .application-filter-btn,
        .application-view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          background: var(--app-card);
          color: var(--app-ink);
          border: 1.5px solid var(--app-mist);
          cursor: pointer;
          transition: border-color .2s, color .2s, background .2s;
        }

        .application-filter-btn {
          border-radius: 100px;
          padding: .55rem 1.2rem;
          font-size: .85rem;
          font-weight: 600;
        }

        .application-filter-btn:hover,
        .application-filter-btn.active {
          border-color: var(--app-gold);
          background: rgba(201,168,76,.08);
        }

        .application-view-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
        }

        .application-view-btn.active,
        .application-view-btn:hover {
          border-color: var(--app-gold);
          color: var(--app-gold);
          background: rgba(201,168,76,.07);
        }

        /* ─── FILTER BAR ─── */

        .applications-filter-collapse {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height .45s cubic-bezier(.4,0,.2,1), opacity .3s ease;
        }

        .applications-filter-collapse.open {
          max-height: 500px;
          opacity: 1;
          overflow: visible;
        }

        .applications-filter-bar {
          position: relative;
          z-index: 50;
          margin-top: 1.5rem;
          padding: 1.5rem 6vw;
          background: var(--app-card);
          border-top: 1px solid var(--app-mist);
          border-bottom: 1px solid var(--app-mist);
        }

        .application-category-grid {
          display: flex;
          flex-wrap: wrap;
          gap: .55rem;
        }

        .application-category {
          padding: .45rem .85rem;
          border: 1px solid var(--app-mist);
          border-radius: 100px;
          background: transparent;
          color: var(--app-ink);
          font-size: .76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
        }

        .application-category:hover,
        .application-category.active {
          border-color: var(--app-gold);
          background: var(--app-gold);
          color: #111;
        }

        .application-filter-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .application-result-count {
          color: var(--app-mid);
          font-size: .82rem;
        }

        .application-clear {
          border: 1px solid rgba(201,168,76,.3);
          border-radius: 100px;
          background: rgba(201,168,76,.12);
          color: var(--app-gold);
          padding: .3rem .9rem;
          font-size: .78rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* ─── RESULTS ─── */

        .applications-results {
          padding: 2.5rem 6vw 5rem;
        }

        .applications-heading {
          margin-bottom: 2rem;
        }

        .applications-heading h2 {
          margin: 0;
          color: var(--app-ink);
          font-size: clamp(1.4rem,2.5vw,1.9rem);
          font-weight: 800;
        }

        .applications-heading p {
          color: var(--app-mid);
          margin: .3rem 0 0;
        }

        .applications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        /* ─── FILM SLATE CARD ─── */

        .application-card {
          --film-card-1: #141313;
          --film-card-2: #0c0b0b;
          --film-ink: #f4f1e9;
          --film-muted: #a19b8d;
          --film-accent: #f0a70a;
          --film-line: rgba(244,241,233,.16);

          position: relative;
          display: flex;
          min-width: 0;
          aspect-ratio: 1 / 1;
          max-height: 440px;
          overflow: hidden;
          background: linear-gradient(180deg,var(--film-card-1),var(--film-card-2));
          border: 1px solid rgba(240,167,10,.18);
          border-radius: 10px;
          box-shadow: 0 24px 50px -22px rgba(0,0,0,.7);
          cursor: pointer;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }

        .application-card:hover {
          transform: translateY(-5px);
          border-color: rgba(240,167,10,.45);
          box-shadow: 0 28px 55px -22px rgba(0,0,0,.8);
        }

        .application-film-rail,
        .application-list-rail {
          width: 28px;
          min-width: 28px;
          padding: 14px 0;
          background: #11100f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .application-film-rail span,
        .application-list-rail span {
          display: block;
          width: 16px;
          height: 18px;
          border-radius: 3px;
          background: #e9e4d9;
          opacity: .95;
        }

        .application-slate-content {
          min-width: 0;
          flex: 1;
          padding: 18px 20px 15px;
          color: var(--film-ink);
          overflow: hidden;
        }

        .application-clapper,
        .application-list-clapper {
          height: 16px;
          margin: 0 -20px 16px;
          background: repeating-linear-gradient(
            120deg,
            #f4f1e9 0 42px,
            #11100f 42px 84px
          );
          border-bottom: 1px solid rgba(244,241,233,.16);
        }

        .film-kicker {
          margin: 0 0 6px;
          color: var(--film-accent);
          font: 700 10px/1 'Courier New', monospace;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .application-card-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .application-card-heading h3 {
          margin: 0;
          color: var(--film-ink);
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: clamp(1.7rem,2.4vw,2.4rem);
          line-height: .92;
          letter-spacing: .02em;
          text-transform: uppercase;
          max-height: 2.76em;
          overflow: hidden;
        }

        .application-title {
          margin: 6px 0 0;
          color: var(--film-muted);
          font: 11px/1.35 'Courier New', monospace;
        }

        .published-stamp {
          flex-shrink: 0;
          padding: 4px 7px;
          border: 1px solid rgba(240,167,10,.45);
          color: var(--film-accent);
          font: 700 7px/1 'Courier New', monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .application-location {
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 9px 0 10px;
          color: var(--film-muted);
          font: 10px/1.3 'Courier New', monospace;
        }

        .application-slate {
          padding: 10px 12px 2px;
          margin-bottom: 10px;
          background: rgba(255,255,255,.025);
          border: 1px solid var(--film-line);
        }

        .application-slate-row {
          display: grid;
          grid-template-columns: 78px 1fr;
          gap: 10px;
          align-items: baseline;
          padding-bottom: 7px;
          margin-bottom: 7px;
          border-bottom: 1px solid var(--film-line);
        }

        .application-slate-row:last-child {
          border-bottom: 0;
        }

        .application-slate-row label {
          color: var(--film-muted);
          font: 700 9px/1 'Courier New', monospace;
          letter-spacing: .14em;
        }

        .application-slate-row p {
          min-width: 0;
          margin: 0;
          overflow: hidden;
          color: var(--film-ink);
          font: 13px/1.2 'Courier New', monospace;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-transform: uppercase;
        }

        .application-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 10px;
        }

        .application-tags span {
          padding: 4px 7px;
          border: 1px solid rgba(240,167,10,.3);
          border-radius: 2px;
          color: #e8c96a;
          background: rgba(240,167,10,.06);
          font: 8px/1 'Courier New', monospace;
          text-transform: uppercase;
        }

        .application-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          color: var(--film-muted);
          font: 8px/1 'Courier New', monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .application-card-footer b {
          color: var(--film-ink);
        }

        /* ─── LIST ─── */

        .application-list-row {
          display: flex;
          min-height: 160px;
          margin-bottom: 12px;
          overflow: hidden;
          background: linear-gradient(180deg,#141313,#0c0b0b);
          border: 1px solid rgba(240,167,10,.18);
          border-radius: 9px;
          color: #f4f1e9;
          cursor: pointer;
          transition: transform .2s, border-color .2s;
        }

        .application-list-row:hover {
          transform: translateX(3px);
          border-color: rgba(240,167,10,.45);
        }

        .application-list-main {
          min-width: 0;
          flex: 1;
          padding: 0 22px 16px;
        }

        .application-list-clapper {
          height: 14px;
          margin: 0 -22px 13px;
        }

        .application-list-title-line {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .application-list-title {
          display: block;
          color: #f4f1e9;
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: clamp(1.45rem,2vw,2rem);
          line-height: .96;
          letter-spacing: .02em;
          text-transform: uppercase;
        }

        .application-list-company {
          display: block;
          margin-top: 4px;
          color: #a19b8d;
          font: 10px/1.2 'Courier New', monospace;
        }

        .application-list-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 10px;
          padding: 10px 0;
          border-top: 1px solid rgba(244,241,233,.12);
          border-bottom: 1px solid rgba(244,241,233,.12);
        }

        .application-list-meta span {
          display: flex;
          gap: 6px;
          color: #f4f1e9;
          font: 11px/1.2 'Courier New', monospace;
        }

        .application-list-meta b {
          color: #a19b8d;
          font-size: 7.5px;
        }

        .application-list-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 9px;
          color: #a19b8d;
          font: 8px/1 'Courier New', monospace;
          text-transform: uppercase;
        }

        .application-list-bottom b {
          color: #f4f1e9;
        }

        .application-actions {
          display: flex;
          gap: 0;
          align-items: center;
        }

        .application-actions button,
        .application-actions a {
          padding: 5px 10px;
          border: 1px solid rgba(244,241,233,.16);
          border-right: 0;
          background: transparent;
          color: #f4f1e9;
          font: 700 8px/1 'Courier New', monospace;
          text-decoration: none;
          cursor: pointer;
        }

        .application-actions button:last-child,
        .application-actions a:last-child {
          border-right: 1px solid rgba(244,241,233,.16);
        }

        .application-actions button:hover,
        .application-actions a:hover {
          background: #f0a70a;
          color: #111;
        }

        /* ─── EMPTY STATE ─── */

        .applications-empty {
          padding: 70px 40px;
          text-align: center;
          background: var(--app-card);
          border: 1px dashed var(--app-mist);
          border-radius: 14px;
        }

        .applications-empty-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          margin-bottom: 14px;
          border: 1px solid var(--app-mist);
          border-radius: 50%;
          color: var(--app-gold);
        }

        .applications-empty h3 {
          margin: 0 0 8px;
          font-size: 1.5rem;
        }

        .applications-empty p {
          margin: 0 0 20px;
          color: var(--app-mid);
        }

        /* ─── BUTTONS ─── */

        .film-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 15px;
          border-radius: 3px;
          font: 700 9px/1 'Courier New', monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
        }

        .film-btn-gold {
          border: 1px solid var(--app-gold-bright);
          background: var(--app-gold-bright);
          color: #111;
        }

        .film-btn-outline {
          border: 1px solid var(--app-ink);
          background: transparent;
          color: var(--app-ink);
        }

        /* ─── MODAL ─── */

        .application-modal-overlay {
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

        .application-modal {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 88vh;
          overflow-y: auto;
          background: var(--app-card);
          color: var(--app-ink);
          border: 2px solid var(--app-ink);
          box-shadow: 8px 8px 0 var(--app-ink);
          animation: applicationPop .25s cubic-bezier(.34,1.56,.64,1);
        }

        @keyframes applicationPop {
          from { opacity: 0; transform: scale(.93) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .application-close {
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
          cursor: pointer;
        }

        .modal-slate-strip {
          height: 26px;
          background: repeating-linear-gradient(
            120deg,
            #f4f1e9 0 42px,
            #11100f 42px 84px
          );
        }

        .application-modal-cover {
          height: 80px;
          background: linear-gradient(135deg,#24211d,#0d0c0c);
          overflow: hidden;
        }

        .application-modal-cover img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .application-modal-content {
          position: relative;
          padding: 28px;
        }

        .application-avatar {
          width: 84px;
          height: 84px;
          margin-top: -45px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid var(--app-card);
          border-radius: 50%;
          background: #11100f;
          color: #a19b8d;
          font: 700 2.4rem/1 Impact, sans-serif;
          box-shadow: 0 0 0 2px #11100f;
        }

        .application-modal-content h2 {
          margin: 0;
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: clamp(2rem,4vw,3rem);
          line-height: .95;
          text-transform: uppercase;
        }

        .application-modal-title {
          margin: 8px 0 5px;
          color: var(--app-gold);
          font-weight: 800;
        }

        .application-modal-location {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--app-mid);
          font-size: .85rem;
        }

        .application-modal-section {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 2px solid var(--app-ink);
        }

        .application-modal-section h3 {
          margin: 0 0 .65rem;
          font: 900 .72rem/1 'Courier New', monospace;
          letter-spacing: .12em;
        }

        .application-modal-section p {
          margin: 0;
          color: var(--app-mid);
          line-height: 1.7;
        }

        .application-info-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 6px;
          margin-top: 1.5rem;
        }

        .application-info-grid > div {
          padding: 12px;
          background: #11100f;
          color: #fff;
        }

        .application-info-grid strong {
          display: block;
          margin-bottom: 5px;
          color: rgba(255,255,255,.55);
          font: 900 8px/1 'Courier New', monospace;
        }

        .application-info-grid span {
          font: 800 13px/1.2 'Courier New', monospace;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skill-tags span {
          padding: 5px 8px;
          border: 1px solid var(--app-gold);
          color: var(--app-gold);
          font: 700 9px/1 'Courier New', monospace;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 1.8rem;
          flex-wrap: wrap;
        }

        /* ─── RESPONSIVE ─── */

        @media (max-width: 1100px) {
          .application-stat-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .applications-grid {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }
        }

        @media (max-width: 760px) {
          .applications-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .applications-search {
            width: min(100%, 420px);
          }

          .applications-search:focus {
            width: min(100%, 420px);
          }

          .applications-toolbar-left,
          .applications-toolbar-right {
            width: 100%;
          }

          .applications-grid {
            grid-template-columns: 1fr;
          }

          .application-card {
            width: min(100%, 420px);
            justify-self: center;
          }

          .application-list-meta {
            gap: 10px;
          }

          .application-list-bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .application-actions {
            width: 100%;
          }
        }

        @media (max-width: 560px) {
          .application-stat-grid {
            grid-template-columns: 1fr 1fr;
          }

          .applications-overview,
          .applications-results {
            padding-left: 5vw;
            padding-right: 5vw;
          }

          .applications-toolbar {
            padding-left: 5vw;
            padding-right: 5vw;
          }

          .application-info-grid {
            grid-template-columns: 1fr 1fr;
          }

          .application-card-heading {
            display: block;
          }

          .published-stamp {
            display: inline-block;
            margin-top: 8px;
          }

          .application-modal-content {
            padding: 22px;
          }
        }
      `}</style>

      <main className="applications-page">
        <HeroCarousel slides={talentHeroSlides} />

        <section className="applications-overview">
          <div className="application-stat-grid">
            <div className="application-stat-card">
              <div className="application-stat-meta">
                <span />
                <small>DIRECTORY</small>
              </div>
              <h2>{totalApplications}</h2>
              <p>Published talent applications</p>
            </div>

            <div className="application-stat-card">
              <div className="application-stat-meta">
                <span />
                <small>RESULTS</small>
              </div>
              <h2>{visibleApplications}</h2>
              <p>Applications matching your search</p>
            </div>

            <div className="application-stat-card">
              <div className="application-stat-meta">
                <span />
                <small>PROFILE STATUS</small>
              </div>
              <h2>{completeProfiles}</h2>
              <p>Profiles with 80%+ completion</p>
            </div>

            <div className="application-stat-card">
              <div className="application-stat-meta">
                <span />
                <small>PORTFOLIO DATA</small>
              </div>
              <h2>{totalProjects}</h2>
              <p>Total projects represented</p>
            </div>
          </div>
        </section>

        <div className="applications-toolbar">
          <div className="applications-toolbar-left">
            <div className="applications-search-wrap">
              <Search size={15} />
              <input
                className="applications-search"
                placeholder="Search talent, skills, experience…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <button
              className={`application-filter-btn${showFilters ? " active" : ""}`}
              onClick={() => setShowFilters((value) => !value)}
            >
              <Filter size={15} />
              Filters {showFilters ? "▲" : "▼"}
            </button>
          </div>

          <div className="applications-toolbar-right">
            <button
              className={`application-view-btn${viewMode === "grid" ? " active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <Grid2X2 size={16} />
            </button>

            <button
              className={`application-view-btn${viewMode === "list" ? " active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <List size={17} />
            </button>
          </div>
        </div>

        <div className={`applications-filter-collapse${showFilters ? " open" : ""}`}>
          <section className="applications-filter-bar">
            <div className="application-category-grid">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  className={`application-category${category === item ? " active" : ""}`}
                  onClick={() =>
                    setCategory((current) => (current === item ? "" : item))
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="application-filter-footer">
              <span className="application-result-count">
                {filteredPortfolios.length} result
                {filteredPortfolios.length !== 1 ? "s" : ""}
              </span>

              {(search || category) && (
                <button className="application-clear" onClick={resetFilters}>
                  Clear filters ×
                </button>
              )}
            </div>
          </section>
        </div>

        <section className="applications-results">
          <div className="applications-heading applications-reveal">
            <h2>All Talent Applications</h2>
            <p>
              {filteredPortfolios.length} application
              {filteredPortfolios.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {filteredPortfolios.length === 0 ? (
            <div className="applications-empty">
              <span className="applications-empty-icon">
                <Search size={25} />
              </span>
              <h3>No applications found</h3>
              <p>Try adjusting your search or category filter.</p>
              <button className="film-btn film-btn-gold" onClick={resetFilters}>
                CLEAR FILTERS
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="applications-grid">
              {filteredPortfolios.map((portfolio) => (
                <ApplicationCard
                  key={portfolio.userId}
                  portfolio={portfolio}
                  onView={setSelectedPortfolio}
                />
              ))}
            </div>
          ) : (
            <div>
              {filteredPortfolios.map((portfolio) => (
                <ApplicationListRow
                  key={portfolio.userId}
                  portfolio={portfolio}
                  onView={setSelectedPortfolio}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedPortfolio && (
        <ApplicationDetailsModal
          portfolio={selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
        />
      )}
    </>
  );
}