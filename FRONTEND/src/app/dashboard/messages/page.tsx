"use client";

import MessagesView from "@/components/views/MessagesView";

export default function DashboardMessagesPage() {
  return (
    <div className="dashboard-grid" style={{ paddingBottom: '40px' }}>
      <div className="col-span-12">
        <MessagesView />
      </div>
    </div>
  );
}
