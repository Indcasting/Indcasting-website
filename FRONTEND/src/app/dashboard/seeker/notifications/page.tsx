"use client";

import NotificationsView from "@/components/views/NotificationsView";

export default function SeekerNotificationsPage() {
  return (
    <div className="dashboard-grid" style={{ paddingTop: '56px', paddingBottom: '40px' }}>
      <div className="col-span-12">
        <NotificationsView />
      </div>
    </div>
  );
}
