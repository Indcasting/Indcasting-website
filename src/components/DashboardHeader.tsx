"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, MessageSquare, Sun, Moon, User as UserIcon, LogIn } from "lucide-react";
import { getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

export default function DashboardHeader() {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    const theme = localStorage.getItem("theme");
    const isDarkMode = theme === "dark" || !theme;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--dash-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search casting calls, talent..." 
            style={{
              padding: '10px 16px 10px 40px',
              borderRadius: '99px',
              border: '1px solid var(--dash-border)',
              backgroundColor: 'var(--dash-bg)',
              color: 'var(--dash-text-main)',
              fontSize: '14px',
              width: '320px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div className="dashboard-header-right">
        <button onClick={toggleTheme} className="header-icon-btn" aria-label="Toggle theme">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <Link href="/messages" className="header-icon-btn">
          <MessageSquare size={20} />
        </Link>
        
        <Link href="/notifications" className="header-icon-btn">
          <Bell size={20} />
        </Link>

        <div style={{ height: '32px', width: '1px', backgroundColor: 'var(--dash-border)', margin: '0 8px' }}></div>
        
        {user ? (
          <Link href="/dashboard/portfolio" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>{user.name || "User Profile"}</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--dash-text-muted)', textTransform: 'capitalize' }}>
                {user.role === 'talent' ? 'Actor / Model' : 'Casting Director'}
              </p>
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--dash-hover-bg)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--dash-text-main)',
              border: '2px solid var(--dash-border)'
            }}>
              <UserIcon size={20} />
            </div>
          </Link>
        ) : (
          <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--dash-text-main)' }}>Log In / Sign Up</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--dash-text-muted)' }}>Join IndCasting</p>
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--dash-hover-bg)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--dash-text-main)',
              border: '2px solid var(--dash-border)'
            }}>
              <LogIn size={20} />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
