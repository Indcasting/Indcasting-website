"use client";

import ApplicationsView from "@/components/views/ApplicationsView";

export default function DashboardApplicationsPage() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12">
        <ApplicationsView />
      </div>
    </div>
  );
}
