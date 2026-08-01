"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import { Plus, ChevronDown, Bell, MessageSquare, Moon, Sun, ChevronRight } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hasUnreadNotifications');
      if (saved === 'false') {
        setHasUnreadNotifications(false);
      }
      const handleNotificationsRead = () => setHasUnreadNotifications(false);
      window.addEventListener('notifications-read', handleNotificationsRead);
      return () => window.removeEventListener('notifications-read', handleNotificationsRead);
    }
  }, []);

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
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (createMenuRef.current && !createMenuRef.current.contains(e.target as Node)) setCreateMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setDarkMode(true);
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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

  const generateBreadcrumbs = () => {
    if (!pathname || pathname === '/' || pathname === '/login' || pathname === '/signup') return null;
    const paths = pathname.split('/').filter(Boolean);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dash-text-muted)', fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap' }}>
        {paths.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {i > 0 && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
            <span style={{ textTransform: 'capitalize', color: i === paths.length - 1 ? 'var(--dash-text-main)' : 'inherit' }}>
              {p.replace(/-/g, ' ')}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner" style={{ flexWrap: 'wrap' }}>
        
        {/* Left Section: Logo & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" className="logo-indcasting">INDCASTING</Link>
          <div className="hide-on-mobile">{generateBreadcrumbs()}</div>
        </div>


        {/* Right Section: Actions */}
        <div className="header-actions" style={{ gap: '16px', flexShrink: 0 }}>
          
          {/* Quick Create Dropdown */}
          <div className="profile-menu-wrap" ref={createMenuRef}>
            <button className="signup-btn header-btn" onClick={() => setCreateMenuOpen(!createMenuOpen)} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={16} /> <span className="hide-on-mobile">Create</span> <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: createMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {createMenuOpen && (
              <div className="profile-dropdown" style={{ minWidth: '180px', top: '120%' }}>
                <Link href="/dashboard/seeker/casting-calls" className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Create Casting Call</Link>
                <Link href="/dashboard/portfolio" className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Create Portfolio</Link>
                <Link href="/dashboard/seeker/auditions" className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Schedule Audition</Link>
                <Link href="/talents" className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Invite Talent</Link>
              </div>
            )}
          </div>


          <Link href="/messages" className="icon-btn" aria-label="Messages">
            <MessageSquare size={20} />
          </Link>
          
          <Link href="/notifications" className="icon-btn" aria-label="Notifications" style={{ position: 'relative' }}>
            <Bell size={20} />
            {hasUnreadNotifications && <span className="icon-dot" style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>}
          </Link>
          
          <Link href="/talents" className="nav-link hide-on-mobile" style={{ fontSize: '15px' }}>
            Talents
          </Link>
          <Link href="/membership" className="nav-link hide-on-mobile" style={{ fontSize: '15px' }}>
            Membership
          </Link>

          <button className="theme-toggle" aria-label="Toggle Theme" onClick={() => setDarkMode(!darkMode)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile Dropdown */}
          {user ? (
            <div className="profile-menu-wrap" ref={menuRef}>
              <button className="header-avatar-btn" onClick={() => setMenuOpen((v) => !v)}>
                <span className="header-avatar">{initials || "?"}</span>
                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {menuOpen && (
                <div className="profile-dropdown" style={{ minWidth: '200px', top: '120%' }}>
                  <div style={{ padding: '0 16px 12px 16px', borderBottom: '1px solid rgba(200,155,60,0.2)', marginBottom: '8px' }}>
                    <p className="dropdown-name" style={{ margin: '0 0 4px 0', color: '#111' }}>{user.name}</p>
                  </div>
                  <Link href={user.role === "talent" ? "/dashboard/talent" : "/dashboard/seeker"} className="dropdown-link" onClick={() => setMenuOpen(false)}>
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
              <Link href="/login" className="outline-btn header-btn">Log In</Link>
              <Link href="/signup" className="signup-btn header-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .hide-on-mobile {
            display: none !important;
          }
          .header-inner {
            gap: 12px !important;
          }
        }
      `}} />
    </header>
  );
}