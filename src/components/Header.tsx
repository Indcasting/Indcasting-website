"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getCurrentUser());

    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    logoutUser();
    setUser(null);
    setMenuOpen(false);
    router.push("/login");
  }

  const initials = user?.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="logo-indcasting">
          INDCASTING
        </Link>

        <nav className="header-nav">
          <Link href="/membership" className="nav-link">
            Membership
          </Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Notifications">
            <BellIcon />
            <span className="icon-dot" />
          </button>

          <Link href="/messages" className="icon-btn" aria-label="Messages">
            <MessageIcon />
          </Link>

          {user ? (
            <div className="profile-menu-wrap" ref={menuRef}>
              <button className="header-avatar-btn" onClick={() => setMenuOpen((v) => !v)}>
                <span className="header-avatar">{initials || "?"}</span>
                <ChevronIcon open={menuOpen} />
              </button>

              {menuOpen && (
                <div className="profile-dropdown">
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-role">{user.role === "talent" ? "Talent" : "Seeker"}</p>

                  <Link
                    href={user.role === "talent" ? "/dashboard/talent" : "/dashboard/seeker"}
                    className="dropdown-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button className="dropdown-link dropdown-logout" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link href="/login" className="outline-btn header-btn">
                Log In
              </Link>
             <Link href="/signin" className="signup-btn header-btn">
  Sign Up
</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 21l1.5-5.5A8.38 8.38 0 0 1 3 11.5 8.5 8.5 0 0 1 11.5 3 8.38 8.38 0 0 1 21 11.5z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={open ? "rotated" : ""}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}