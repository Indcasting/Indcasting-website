"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  X,
} from "lucide-react";

import { logoutUser, getCurrentUser } from "@/utils/auth";
import { UserProfile } from "@/types/user";

const talentMenuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Calendar",
    href: "/dashboard/Calendar",
    icon: CalendarIcon,
  },
  {
    name: "My Casting Calls",
    href: "/dashboard/my-casting-calls",
    icon: BriefcaseBusiness,
  },
  {
    name: "Portfolio",
    href: "/dashboard/portfolio",
    icon: User,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "Membership",
    href: "/membership",
    icon: Crown,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Help Center",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
];

const seekerMenuItems = [
  {
    name: "Dashboard",
    href: "/dashboard/seeker",
    icon: Home,
  },
  {
    name: "My Casting Calls",
    href: "/dashboard/seeker/casting-calls",
    icon: BriefcaseBusiness,
  },
  {
    name: "Applications",
    href: "/dashboard/seeker/applications",
    icon: FileText,
  },
  {
    name: "Shortlisted Talent",
    href: "/dashboard/seeker/shortlisted",
    icon: Star,
  },
  {
    name: "Auditions",
    href: "/dashboard/seeker/auditions",
    icon: Video,
  },
  {
    name: "Portfolio",
    href: "/portfolio/builder",
    icon: User,
  },
  {
    name: "Messages",
    href: "/dashboard/seeker/messages",
    icon: MessageCircle,
  },
  {
    name: "Notifications",
    href: "/dashboard/seeker/notifications",
    icon: Bell,
  },
  {
    name: "Analytics",
    href: "/dashboard/seeker/analytics",
    icon: BarChart2,
  },
  {
    name: "Membership",
    href: "/membership",
    icon: Crown,
  },
  {
    name: "Company Profile",
    href: "/dashboard/seeker/company-profile",
    icon: Building,
  },
  {
    name: "Settings",
    href: "/dashboard/seeker/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);

  // Sidebar open/closed state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const menuItems =
    user?.role === "seeker"
      ? seekerMenuItems
      : talentMenuItems;

  const splitIndex =
    user?.role === "seeker" ? 8 : 6;

  const mainItems = menuItems.slice(
    0,
    splitIndex
  );

  const accountItems = menuItems.slice(
    splitIndex
  );

  /*
   * When sidebar is closed, return only the toggle button.
   * This keeps the sidebar component in the layout without
   * completely removing it from the page.
   */
  if (!isSidebarOpen) {
    return (
      <button
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
        title="Open sidebar"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,

          width: "42px",
          height: "42px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "12px",

          border: "1px solid rgba(201,168,76,0.25)",

          background:
            "rgba(255,255,255,0.85)",

          color: "#111",

          cursor: "pointer",

          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",

          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",

          transition:
            "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "scale(1.06)";

          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(201,168,76,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "scale(1)";

          e.currentTarget.style.boxShadow =
            "0 8px 25px rgba(0,0,0,0.08)";
        }}
      >
        <ChevronRight size={20} />
      </button>
    );
  }

  return (
    <aside
      className="dashboard-sidebar"
      style={{
        position: "relative",
      }}
    >

      {/* =====================================================
          SIDEBAR HEADER
      ===================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 18px 10px",
        }}
      >
        {/* Optional sidebar title */}
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--mid, #777)",
          }}
        >
          Menu
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
          title="Close sidebar"
          style={{
            width: "34px",
            height: "34px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "10px",

            border:
              "1px solid rgba(128,128,128,0.18)",

            background:
              "rgba(128,128,128,0.06)",

            color: "inherit",

            cursor: "pointer",

            transition:
              "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "rotate(90deg)";

            e.currentTarget.style.background =
              "rgba(201,168,76,0.12)";

            e.currentTarget.style.borderColor =
              "rgba(201,168,76,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "rotate(0deg)";

            e.currentTarget.style.background =
              "rgba(128,128,128,0.06)";

            e.currentTarget.style.borderColor =
              "rgba(128,128,128,0.18)";
          }}
        >
          <X size={17} />
        </button>
      </div>

      {/* =====================================================
          SIDEBAR CONTENT
      ===================================================== */}

      <div className="sidebar-content">

        {/* =================================================
            MAIN MENU
        ================================================= */}

        <div className="sidebar-nav-group">

          <p className="nav-group-title">
            Main Menu
          </p>

          <nav className="sidebar-nav">

            {mainItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${
                    isActive ? "active" : ""
                  }`}
                >

                  <div className="link-content">

                    <Icon
                      className="sidebar-icon"
                      size={20}
                    />

                    <span>
                      {item.name}
                    </span>

                  </div>

                  {isActive && (
                    <ChevronRight
                      className="active-chevron"
                      size={16}
                    />
                  )}

                </Link>
              );
            })}

          </nav>

        </div>

        {/* =================================================
            ACCOUNT
        ================================================= */}

        <div className="sidebar-nav-group">

          <p className="nav-group-title">
            Account
          </p>

          <nav className="sidebar-nav">

            {accountItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${
                    isActive ? "active" : ""
                  }`}
                >

                  <div className="link-content">

                    <Icon
                      className="sidebar-icon"
                      size={20}
                    />

                    <span>
                      {item.name}
                    </span>

                  </div>

                  {isActive && (
                    <ChevronRight
                      className="active-chevron"
                      size={16}
                    />
                  )}

                </Link>
              );
            })}

          </nav>

        </div>

      </div>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut
            size={18}
            className="sidebar-icon"
          />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}