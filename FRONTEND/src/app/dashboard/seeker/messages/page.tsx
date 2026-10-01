"use client";

import MessagesView from "@/components/views/MessagesView";

export default function SeekerMessagesPage() {
  return (
    <div className="dashboard-grid" style={{ paddingTop: '56px', paddingBottom: '40px' }}>
      <div className="col-span-12">
        <MessagesView />
      </div>
    </div>
  );
}
