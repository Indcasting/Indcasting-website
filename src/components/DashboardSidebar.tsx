"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react";
import { logoutUser } from "@/utils/auth";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Casting Calls", href: "/dashboard/casting-calls", icon: BriefcaseBusiness },
  { name: "My Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: User },
  { name: "Saved Jobs", href: "/dashboard/saved", icon: Star },
  { name: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Membership", href: "/dashboard/membership", icon: Crown },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="sidebar-logo">
            <div className="logo-icon">IC</div>
            <div className="logo-text">
              <h2>IndCasting</h2>
              <p>Talent Portal</p>
            </div>
          </div>
        </Link>
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
          </nav>
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}