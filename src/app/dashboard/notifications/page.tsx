"use client";

import NotificationsView from "@/components/views/NotificationsView";

export default function DashboardNotificationsPage() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12">
        <NotificationsView />
      </div>
    </div>
  );
}
