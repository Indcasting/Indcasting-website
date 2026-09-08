"use client";

import NotificationsView from "@/components/views/NotificationsView";

export default function NotificationsPage() {
  return (
    <div className="notification-page" style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <NotificationsView />
      </div>
    </div>
  );
}