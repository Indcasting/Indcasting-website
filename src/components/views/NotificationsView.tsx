"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export default function NotificationsView() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id:1,
      title:"Welcome to IndCasting!",
      description:"Your account has been created successfully.",
      time:"Just Now",
      read:false
    },
    {
      id:2,
      title:"New Casting Call",
      description:"A Fashion Shoot has been posted near you.",
      time:"10 minutes ago",
      read:false
    },
    {
      id:3,
      title:"Membership",
      description:"Upgrade to Premium for unlimited applications.",
      time:"Yesterday",
      read:true
    }
  ]);

  useEffect(()=>{
    const user=getCurrentUser();
    if(!user){
      router.push("/login");
      return;
    }
  },[router]);

  function markAllRead(){
    const updated=notifications.map(notification=>({
      ...notification,
      read:true
    }));
    setNotifications(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasUnreadNotifications', 'false');
      window.dispatchEvent(new Event('notifications-read'));
    }
  }

  return(
    <div className="notification-container dashboard-card-ui" style={{ padding: '24px', margin: 0 }}>
      <div className="notification-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'var(--dash-text-main)' }}>Notifications</h2>
        <button onClick={markAllRead} style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid var(--dash-border)',
          backgroundColor: 'transparent',
          color: 'var(--dash-text-main)',
          cursor: 'pointer'
        }}>
          Mark All Read
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {notifications.map(notification=>(
          <div
            key={notification.id}
            className={`notification-card ${notification.read ? "read" : ""}`}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--dash-border)',
              backgroundColor: notification.read ? 'var(--dash-bg)' : 'rgba(232, 169, 58, 0.05)',
              borderLeft: notification.read ? '1px solid var(--dash-border)' : '4px solid var(--gold)'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 8px 0', color: 'var(--dash-text-main)' }}>{notification.title}</h3>
            <p style={{ margin: '0 0 12px 0', color: 'var(--dash-text-muted)' }}>{notification.description}</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
