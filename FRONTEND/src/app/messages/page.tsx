"use client";

import MessagesView from "@/components/views/MessagesView";

export default function MessagesPage() {
  return (
    <div className="messages-page" style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <MessagesView />
      </div>
    </div>
  );
}