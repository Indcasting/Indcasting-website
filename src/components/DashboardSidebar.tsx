"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  ChevronRight,
  Video,
  BarChart2,
  Building
} from "lucide-react";
import { logoutUser, getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

const talentMenuItems = [
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

const seekerMenuItems = [
  { name: "Dashboard", href: "/dashboard/seeker", icon: Home },
  { name: "My Casting Calls", href: "/dashboard/seeker/casting-calls", icon: BriefcaseBusiness },
  { name: "Applications", href: "/dashboard/seeker/applications", icon: FileText },
  { name: "Shortlisted Talent", href: "/dashboard/seeker/shortlisted", icon: Star },
  { name: "Auditions", href: "/dashboard/seeker/auditions", icon: Video },
  { name: "Messages", href: "/dashboard/seeker/messages", icon: MessageCircle },
  { name: "Notifications", href: "/dashboard/seeker/notifications", icon: Bell },
  { name: "Analytics", href: "/dashboard/seeker/analytics", icon: BarChart2 },
  { name: "Membership", href: "/dashboard/seeker/membership", icon: Crown },
  { name: "Company Profile", href: "/dashboard/seeker/company-profile", icon: Building },
  { name: "Settings", href: "/dashboard/seeker/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const menuItems = user?.role === "seeker" ? seekerMenuItems : talentMenuItems;
  
  // Divide menu items into groups. For Seeker, we'll put the last 3 in "Account"
  // For Talent, the last 5 in "Account"
  const splitIndex = user?.role === "seeker" ? 8 : 5;
  const mainItems = menuItems.slice(0, splitIndex);
  const accountItems = menuItems.slice(splitIndex);

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-scrollable">
        <div className="sidebar-nav-group">
          <p className="nav-group-title">Main Menu</p>
          <nav className="sidebar-nav">
            {mainItems.map((item) => {
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
            {accountItems.map((item) => {
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