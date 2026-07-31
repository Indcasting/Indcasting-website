"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="is-dashboard dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main-wrapper">
        <DashboardHeader />
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
