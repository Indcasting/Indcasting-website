"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BriefcaseBusiness,
  FileText,
  User,
  Star,
  MessageCircle,
  Bell,
  Crown,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard/talent", icon: Home },
  { name: "Casting Calls", href: "/dashboard/casting-calls", icon: BriefcaseBusiness },
  { name: "Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: User },
  { name: "Saved", href: "/dashboard/saved", icon: Star },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Membership", href: "/membership", icon: Crown },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">IC</div>
          <div className="logo-text">
            <h2>IndCasting</h2>
            <p>Talent Portal</p>
          </div>
        </div>
      </div>

      <div className="sidebar-scrollable">
        <div className="sidebar-nav-group">
          <p className="nav-group-title">Main Menu</p>
          <nav className="sidebar-nav">
            {menuItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <div className="link-content">
                    <Icon className="sidebar-icon" size={20} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="active-chevron" size={16} />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-nav-group">
          <p className="nav-group-title">Account</p>
          <nav className="sidebar-nav">
            {menuItems.slice(5).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <div className="link-content">
                    <Icon className="sidebar-icon" size={20} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="active-chevron" size={16} />}
                </Link>
              );
            })}
            
            <Link
              href="/dashboard/settings"
              className={`sidebar-link ${pathname === "/dashboard/settings" ? "active" : ""}`}
            >
              <div className="link-content">
                <Settings className="sidebar-icon" size={20} />
                <span>Settings</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={18} className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}