"use client";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="is-dashboard dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main-wrapper">
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
