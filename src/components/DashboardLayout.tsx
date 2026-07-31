"use client";

import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard-container">
      <DashboardSidebar />

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}