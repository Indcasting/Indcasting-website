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
  
  // For the prototype: if no user is logged in but we are on a dashboard route, mock a user
  const displayUser = user || (pathname.startsWith('/dashboard') ? {
    name: pathname.includes('/seeker') ? "Casting Director" : "Abhiroop",
    email: "demo@example.com",
    password: "password",
    role: pathname.includes('/seeker') ? "seeker" : "talent"
  } as UserProfile : null);
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
  }, [pathname]);

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

  const initials = displayUser?.name
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
        {paths.map((p, i) => {
          const href = "/" + paths.slice(0, i + 1).join('/');
          const isLast = i === paths.length - 1;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
              {isLast ? (
                <span style={{ textTransform: 'capitalize', color: 'var(--dash-text-main)' }}>
                  {p.replace(/-/g, ' ')}
                </span>
              ) : (
                <Link 
                  href={href} 
                  style={{ textTransform: 'capitalize', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                >
                  {p.replace(/-/g, ' ')}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div 
        className="header-inner" 
        style={{ 
          maxWidth: '100%', 
          padding: '16px 24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'nowrap',
          position: 'relative'
        }}
      >
        
        {/* Left Section: Logo & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img src="/brand/icon-gold.svg" alt="IndCasting Logo" width={32} height={32} />
            <span className="logo-indcasting">INDCASTING</span>
          </Link>
          <div className="hide-on-mobile">{generateBreadcrumbs()}</div>
        </div>


        {/* Center Section: Navigation */}
        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Link href={displayUser ? "/post" : "/signup?redirect=/post"} className="nav-link" style={{ fontSize: '15px' }}>
            Post
          </Link>
          <Link href="/talents" className="nav-link" style={{ fontSize: '15px' }}>
            Talents
          </Link>
          <Link href="/membership" className="nav-link" style={{ fontSize: '15px' }}>
            Membership
          </Link>
        </div>

        {/* Right Section: Actions */}
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>

          {displayUser && (
            <>
              <Link href="/messages" className="icon-btn" aria-label="Messages" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={20} />
              </Link>
              
              <Link href="/notifications" className="icon-btn" aria-label="Notifications" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={20} />
                {hasUnreadNotifications && <span className="icon-dot" style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>}
              </Link>
            </>
          )}

          <button className="theme-toggle icon-btn" aria-label="Toggle Theme" onClick={() => setDarkMode(!darkMode)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Quick Create Dropdown */}
          {displayUser && (
            <div className="profile-menu-wrap" ref={createMenuRef}>
              <button className="signup-btn header-btn" onClick={() => setCreateMenuOpen(!createMenuOpen)} style={{ padding: '0 16px', height: '42px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', margin: 0, boxSizing: 'border-box' }}>
                <Plus size={14} /> <span className="hide-on-mobile">Create</span> <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: createMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {createMenuOpen && (
                <div className="profile-dropdown" style={{ minWidth: '180px', top: 'calc(100% + 8px)' }}>
                  <Link href={displayUser ? "/dashboard/seeker/casting-calls" : "/signup"} className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Create Casting Call</Link>
                  <Link href={displayUser ? "/dashboard/portfolio" : "/signup"} className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Create Portfolio</Link>
                  <Link href={displayUser ? "/dashboard/seeker/auditions" : "/signup"} className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Schedule Audition</Link>
                  <Link href={displayUser ? "/talents" : "/signup"} className="dropdown-link" onClick={() => setCreateMenuOpen(false)}>Invite Talent</Link>
                </div>
              )}
            </div>
          )}

          {/* Profile Dropdown */}
          {displayUser ? (
            <div className="profile-menu-wrap" ref={menuRef}>
              <button className="header-avatar-btn" onClick={() => setMenuOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '42px', padding: '0', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <span className="header-avatar" style={{ margin: 0 }}>{initials || "?"}</span>
                <ChevronDown size={14} style={{ color: 'var(--dash-text-muted)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {menuOpen && (
                <div className="profile-dropdown" style={{ minWidth: '200px', top: 'calc(100% + 8px)', right: 0 }}>
                  <div style={{ padding: '0 16px 12px 16px', borderBottom: '1px solid rgba(200,155,60,0.2)', marginBottom: '8px' }}>
                    <p className="dropdown-name" style={{ margin: '0 0 4px 0', color: '#111' }}>{displayUser.name}</p>
                  </div>
                  <Link href={displayUser.role === "talent" ? "/dashboard/talent" : "/dashboard/seeker"} className="dropdown-link" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button className="dropdown-link dropdown-logout" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons" style={{ display: 'flex', gap: '8px', marginLeft: 'auto', marginRight: '-16px' }}>
              <Link href="/login" className="signup-btn header-btn" style={{ padding: '0 12px', height: '32px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>Log In</Link>
              <Link href="/signup" className="signup-btn header-btn" style={{ padding: '0 12px', height: '32px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>Sign Up</Link>
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
            padding: 16px !important;
          }
          .header-actions {
            gap: 12px !important;
          }
        }
      `}} />
    </header>
  );
}