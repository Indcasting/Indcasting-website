"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import { Bell, Menu, X, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────
   NAV LINKS config
───────────────────────────────────────── */
const NAV_LINKS_PUBLIC = [
  { label: "Home",         href: "/" },
  { label: "Posts",        href: "/post" },
  { label: "Applications", href: "/applications" },
  { label: "Membership",   href: "/membership" },
];

const NAV_LINKS_AUTHED = [
  { label: "Home",         href: "/" },
  { label: "Posts",        href: "/post" },
  { label: "Applications", href: "/applications" },
  { label: "Messages",     href: "/messages" },
  { label: "Membership",   href: "/membership" },
];

/* ── Contrast / half-circle theme icon — no emoji, no lucide Sun/Moon ── */
function ContrastIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1.75 A6.25 6.25 0 0 1 8 14.25 Z" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   HEADER
───────────────────────────────────────── */
export default function Header() {
  const router   = useRouter();
  const pathname = usePathname() || "";

  const [scrolled,    setScrolled]    = useState(false);
  const [user,        setUser]        = useState<UserProfile | null>(null);
  const [darkMode,    setDarkMode]    = useState(true);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unread,      setUnread]      = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);

  const displayUser = user || (
    pathname.startsWith("/dashboard")
      ? ({
          name:  pathname.includes("/seeker") ? "Casting Director" : "Aahana",
          email: "demo@indcasting.in",
          password: "",
          role:  pathname.includes("/seeker") ? "seeker" : "talent",
        } as UserProfile)
      : null
  );

  const NAV_LINKS = displayUser ? NAV_LINKS_AUTHED : NAV_LINKS_PUBLIC;

  const initials = displayUser?.name
    .split(" ").filter(Boolean).map(n => n[0]).slice(0, 2).join("").toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setUser(getCurrentUser()); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved !== "light";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("hasUnreadNotifications");
    if (saved === "false") setUnread(false);
    const handler = () => setUnread(false);
    window.addEventListener("notifications-read", handler);
    return () => window.removeEventListener("notifications-read", handler);
  }, []);

  function handleLogout() {
    logoutUser();
    setUser(null);
    setProfileOpen(false);
    router.push("/login");
  }

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <style>{`
        /* ─── tokens ─── */
        :root {
          --gold:   #c9a84c;
          --gold-10: rgba(201,168,76,0.10);
          --gold-18: rgba(201,168,76,0.18);
          --gold-28: rgba(201,168,76,0.28);
          --ink:    #0f0e0d;
          --ink-50: rgba(15,14,13,0.50);
          --cream:  #FFFDF7;
        }
        html.dark {
          --ink:    #e8e4dc;
          --ink-50: rgba(232,228,220,0.45);
          --cream:  #0b0b0b;
        }

        /* ─── header shell ─── */
        .ic-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          height: 60px;
          display: flex;
          align-items: center;
          background: transparent;
          transition: background 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .ic-header.scrolled {
          background: rgba(255,253,247,0.90);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom-color: var(--gold-18);
        }
        html.dark .ic-header.scrolled {
          background: rgba(11,11,11,0.90);
        }

        /* ─── inner ─── */
        .ic-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 0;
          height: 100%;
        }

        /* ─── logo ─── */
        .ic-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: auto;
        }
        .ic-logo img {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }
        .ic-logo-text {
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink);
          transition: color 0.3s;
        }

        /* ─── center nav ─── */
        .ic-nav {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0;
        }
        .ic-nav-link {
          position: relative;
          padding: 6px 13px;
          font-size: 0.84rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--ink-50);
          text-decoration: none;
          border-radius: 6px;
          transition: color 0.18s;
          white-space: nowrap;
        }
        .ic-nav-link:hover {
          color: var(--ink);
        }
        .ic-nav-link.active {
          color: var(--ink);
          font-weight: 600;
        }
        /* active: a short gold rule beneath the text only, not full pill */
        .ic-nav-link.active::after {
          content: "";
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 2px;
          background: var(--gold);
          border-radius: 999px;
        }

        /* ─── right cluster ─── */
        .ic-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: auto;
        }

        /* ─── ghost icon button ─── */
        .ic-ghost {
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          border-radius: 8px;
          color: var(--ink-50);
          cursor: pointer;
          text-decoration: none;
          transition: color 0.18s, background 0.18s;
          flex-shrink: 0;
        }
        .ic-ghost:hover {
          color: var(--ink);
          background: var(--gold-10);
        }

        /* notif dot */
        .ic-dot {
          position: absolute;
          top: 8px; right: 8px;
          width: 6px; height: 6px;
          background: #e5484d;
          border-radius: 50%;
          border: 1.5px solid var(--cream);
        }

        /* ─── thin rule between notif and theme ─── */
        .ic-rule {
          width: 1px;
          height: 18px;
          background: var(--gold-18);
          margin: 0 6px;
          flex-shrink: 0;
        }

        /* ─── sign in button ─── */
        .ic-signin {
          margin-left: 8px;
          padding: 0 16px;
          height: 34px;
          border: 1.5px solid var(--gold-28);
          border-radius: 7px;
          background: transparent;
          color: var(--ink);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0;
          transition: border-color 0.18s, background 0.18s, color 0.18s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ic-signin:hover {
          border-color: var(--gold);
          background: var(--gold-10);
          color: var(--gold);
        }

        /* ─── avatar button ─── */
        .ic-profile-wrap { position: relative; margin-left: 8px; }
        .ic-avatar-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 3px 9px 3px 3px;
          border: 1px solid var(--gold-28);
          border-radius: 999px;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.18s, background 0.18s;
        }
        .ic-avatar-btn:hover {
          border-color: var(--gold);
          background: var(--gold-10);
        }
        .ic-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--gold);
          color: #111;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ic-avatar-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--ink);
          max-width: 96px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ic-avatar-chevron {
          color: var(--ink-50);
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .ic-avatar-chevron.open { transform: rotate(180deg); }

        /* ─── dropdown ─── */
        .ic-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 196px;
          background: var(--cream);
          border: 1px solid var(--gold-18);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
          overflow: hidden;
          z-index: 100;
          animation: dropIn 0.16s cubic-bezier(0.22,1,0.36,1);
        }
        html.dark .ic-dropdown {
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .ic-dd-header {
          padding: 13px 15px 11px;
          border-bottom: 1px solid var(--gold-10);
        }
        .ic-dd-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
        }
        .ic-dd-role {
          margin-top: 2px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--gold);
        }
        .ic-dd-link {
          display: block;
          padding: 9px 15px;
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background 0.14s, color 0.14s;
          line-height: 1;
        }
        .ic-dd-link:hover {
          background: var(--gold-10);
          color: var(--gold);
        }
        .ic-dd-link.danger { color: #c62828; }
        html.dark .ic-dd-link.danger { color: #f28b82; }
        .ic-dd-link.danger:hover { background: rgba(197,40,40,0.07); }
        .ic-dd-sep {
          height: 1px;
          background: var(--gold-10);
          margin: 3px 0;
        }

        /* ─── hamburger ─── */
        .ic-hamburger {
          display: none;
          width: 36px; height: 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--gold-28);
          border-radius: 7px;
          background: transparent;
          color: var(--ink-50);
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
          flex-shrink: 0;
          margin-left: 6px;
        }
        .ic-hamburger:hover {
          background: var(--gold-10);
          border-color: var(--gold);
          color: var(--ink);
        }

        /* ─── mobile drawer ─── */
        .ic-drawer {
          position: fixed;
          inset: 0;
          z-index: 998;
        }
        .ic-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.38);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .ic-panel {
          position: absolute;
          top: 0; right: 0;
          width: min(320px, 88vw);
          height: 100%;
          background: var(--cream);
          border-left: 1px solid var(--gold-18);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          animation: slideIn 0.22s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .ic-panel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid var(--gold-10);
        }
        .ic-panel-nav {
          padding: 10px 10px 0;
          flex: 1;
        }
        .ic-panel-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 12px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--ink-50);
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.14s, color 0.14s;
          margin-bottom: 1px;
        }
        .ic-panel-link:hover,
        .ic-panel-link.active {
          background: var(--gold-10);
          color: var(--ink);
        }
        .ic-panel-link.active {
          font-weight: 600;
        }
        .ic-panel-link .pdot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0;
          transition: opacity 0.16s;
          flex-shrink: 0;
        }
        .ic-panel-link.active .pdot { opacity: 1; }

        .ic-panel-sep {
          height: 1px;
          background: var(--gold-10);
          margin: 8px 10px;
        }
        .ic-panel-footer {
          padding: 8px 10px 28px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ic-panel-utils {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0 2px 4px;
        }
        .ic-panel-signin {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          border: 1.5px solid var(--gold-28);
          border-radius: 8px;
          background: transparent;
          color: var(--ink);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.18s, background 0.18s, color 0.18s;
          margin-top: 4px;
        }
        .ic-panel-signin:hover {
          border-color: var(--gold);
          background: var(--gold-10);
          color: var(--gold);
        }

        /* ─── breakpoints ─── */
        @media (max-width: 880px) {
          .ic-nav { display: none; }
          .ic-hamburger { display: flex; }
          .ic-avatar-name,
          .ic-avatar-chevron { display: none; }
          .ic-avatar-btn { padding: 3px; border-radius: 50%; }
        }
        @media (max-width: 580px) {
          .ic-inner { padding: 0 16px; }
        }

        /* ─── reduced motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .ic-header, .ic-nav-link, .ic-ghost,
          .ic-signin, .ic-avatar-btn { transition: none; }
          .ic-dropdown { animation: none; }
          .ic-panel { animation: none; }
        }
      `}</style>

      {/* ─── HEADER ─── */}
      <header className={`ic-header${scrolled ? " scrolled" : ""}`}>
        <div className="ic-inner">

          {/* Logo */}
          <Link href="/" className="ic-logo">
            <img src="/brand/icon-gold.svg" alt="IndCasting" />
            <span className="ic-logo-text">IndCasting</span>
          </Link>

          {/* Nav */}
          <nav className="ic-nav">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`ic-nav-link${isActive(href) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ic-actions">

            {displayUser && (
              <Link href="/notifications" className="ic-ghost" aria-label="Notifications">
                <Bell size={17} strokeWidth={1.75} />
                {unread && <span className="ic-dot" />}
              </Link>
            )}

            {displayUser && <div className="ic-rule" />}

            <button className="ic-ghost" onClick={toggleTheme} aria-label="Toggle theme">
              <ContrastIcon size={16} />
            </button>

            {!displayUser && <div className="ic-rule" />}

            {/* Logged-out */}
            {!displayUser && (
              <Link href="/signup" className="ic-signin">Sign In</Link>
            )}

            {/* Logged-in avatar */}
            {displayUser && (
              <div className="ic-profile-wrap" ref={profileRef}>
                <button
                  className="ic-avatar-btn"
                  onClick={() => setProfileOpen(v => !v)}
                  aria-label="Profile menu"
                >
                  <span className="ic-avatar">{initials || "?"}</span>
                  <span className="ic-avatar-name">{displayUser.name}</span>
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    className={`ic-avatar-chevron${profileOpen ? " open" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="ic-dropdown">
                    <div className="ic-dd-header">
                      <div className="ic-dd-name">{displayUser.name}</div>
                      <div className="ic-dd-role">{displayUser.role}</div>
                    </div>
                    <Link
                      href={displayUser.role === "talent" ? "/dashboard/talent" : "/dashboard/seeker"}
                      className="ic-dd-link"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link href="/dashboard/portfolio" className="ic-dd-link" onClick={() => setProfileOpen(false)}>
                      My Portfolio
                    </Link>
                    <Link href="/dashboard/settings" className="ic-dd-link" onClick={() => setProfileOpen(false)}>
                      Settings
                    </Link>
                    <div className="ic-dd-sep" />
                    <button className="ic-dd-link danger" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger */}
            <button className="ic-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={18} strokeWidth={1.75} />
            </button>

          </div>
        </div>
      </header>

      {/* ─── MOBILE DRAWER ─── */}
      {mobileOpen && (
        <div className="ic-drawer">
          <div className="ic-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="ic-panel">

            <div className="ic-panel-top">
              <Link href="/" className="ic-logo" onClick={() => setMobileOpen(false)}>
                <img src="/brand/icon-gold.svg" alt="IndCasting" width={24} height={24} />
                <span className="ic-logo-text" style={{ fontSize: "0.74rem" }}>IndCasting</span>
              </Link>
              <button className="ic-ghost" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <nav className="ic-panel-nav">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`ic-panel-link${isActive(href) ? " active" : ""}`}
                >
                  {label}
                  <span className="pdot" />
                </Link>
              ))}
            </nav>

            <div className="ic-panel-sep" />

            <div className="ic-panel-footer">
              <div className="ic-panel-utils">
                {displayUser && (
                  <Link
                    href="/notifications"
                    className="ic-ghost"
                    aria-label="Notifications"
                    onClick={() => setMobileOpen(false)}
                    style={{ position: "relative" }}
                  >
                    <Bell size={17} strokeWidth={1.75} />
                    {unread && <span className="ic-dot" />}
                  </Link>
                )}
                <button className="ic-ghost" onClick={toggleTheme} aria-label="Toggle theme">
                  <ContrastIcon size={16} />
                </button>
              </div>

              {!displayUser ? (
                <Link href="/signup" className="ic-panel-signin" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
              ) : (
                <>
                  <Link
                    href={displayUser.role === "talent" ? "/dashboard/talent" : "/dashboard/seeker"}
                    className="ic-panel-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard <span className="pdot" />
                  </Link>
                  <Link href="/dashboard/portfolio" className="ic-panel-link" onClick={() => setMobileOpen(false)}>
                    My Portfolio <span className="pdot" />
                  </Link>
                  <div className="ic-panel-sep" style={{ margin: "4px 0" }} />
                  <button
                    className="ic-panel-link"
                    onClick={handleLogout}
                    style={{ color: "#c62828", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", width: "100%" }}
                  >
                    Log Out <span className="pdot" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}