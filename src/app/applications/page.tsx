"use client";

import { useEffect, useState } from "react";
import ApplicationsView from "@/components/views/ApplicationsView";

export default function ApplicationsPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--cream)', color: 'var(--ink)', transition: 'background-color 0.35s ease, color 0.35s ease', paddingTop: '140px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4vw' }}>
        <ApplicationsView />
      </div>
    </div>
  );
}