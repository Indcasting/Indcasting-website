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
  Building,
  Calendar as CalendarIcon,
  ChevronDown
} from "lucide-react";
import { logoutUser, getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";
import DashboardCalendar from "./DashboardCalendar";

const talentMenuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Casting Calls", href: "/dashboard/casting-calls", icon: BriefcaseBusiness },
  { name: "My Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Portfolio", href: "/portfolio/builder", icon: User },
  { name: "Saved Jobs", href: "/dashboard/saved", icon: Star },
  { name: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Membership", href: "/membership", icon: Crown },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
];

const seekerMenuItems = [
  { name: "Dashboard", href: "/dashboard/seeker", icon: Home },
  { name: "My Casting Calls", href: "/dashboard/seeker/casting-calls", icon: BriefcaseBusiness },
  { name: "Applications", href: "/dashboard/seeker/applications", icon: FileText },
  { name: "Shortlisted Talent", href: "/dashboard/seeker/shortlisted", icon: Star },
  { name: "Auditions", href: "/dashboard/seeker/auditions", icon: Video },
  { name: "Portfolio", href: "/portfolio/builder", icon: User },
  { name: "Messages", href: "/dashboard/seeker/messages", icon: MessageCircle },
  { name: "Notifications", href: "/dashboard/seeker/notifications", icon: Bell },
  { name: "Analytics", href: "/dashboard/seeker/analytics", icon: BarChart2 },
  { name: "Membership", href: "/membership", icon: Crown },
  { name: "Company Profile", href: "/dashboard/seeker/company-profile", icon: Building },
  { name: "Settings", href: "/dashboard/seeker/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

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
              const linkNode = (
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
              
              if (item.name === "Dashboard") {
                return (
                  <div key={item.href} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {linkNode}
                    
                    <button 
                      className={`sidebar-link ${isCalendarOpen ? "active" : ""}`}
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit' }}
                    >
                      <div className="link-content">
                        <CalendarIcon className="sidebar-icon" size={20} />
                        <span>Calendar</span>
                      </div>
                      {isCalendarOpen ? (
                        <ChevronDown className="active-chevron" size={16} />
                      ) : (
                        <ChevronRight className="active-chevron" size={16} />
                      )}
                    </button>
                    
                    {isCalendarOpen && (
                      <div className="sidebar-calendar-wrapper" style={{ marginTop: '4px' }}>
                        <DashboardCalendar 
                          userRole={user?.role === 'seeker' ? 'seeker' : 'talent'} 
                          userId={user?.role === 'seeker' ? 'seeker_1' : 'talent_1'} 
                        />
                      </div>
                    )}
                  </div>
                );
              }
              
              return linkNode;
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