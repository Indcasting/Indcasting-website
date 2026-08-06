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
      <div className="dashboard-header-left">
        <div className="dashboard-search-wrapper">
          <Search size={18} className="dashboard-search-icon" />
          <input 
            type="text" 
            placeholder="Search casting calls, talent..." 
            className="dashboard-search-input"
            style={{ color: 'var(--dash-text-main)', backgroundColor: 'var(--card-bg)', borderColor: 'var(--dash-border)' }}
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
          <Link href="/dashboard/portfolio" className="dashboard-header-profile">
            <div className="profile-text-wrap">
              <p className="profile-name">{user.name || "User Profile"}</p>
              <p className="profile-role">
                {user.role === 'talent' ? 'Actor / Model' : 'Casting Director'}
              </p>
            </div>
            <div className="dashboard-header-avatar">
              <UserIcon size={20} />
            </div>
          </Link>
        ) : (
          <Link href="/login" className="dashboard-header-profile">
            <div className="profile-text-wrap">
              <p className="profile-name">Log In / Sign Up</p>
              <p className="profile-role">Join IndCasting</p>
            </div>
            <div className="dashboard-header-avatar">
              <LogIn size={20} />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
