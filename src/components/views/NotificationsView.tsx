"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  BriefcaseBusiness,
  MessageCircle,
  CalendarDays,
  UserRound,
  Star,
  FileText,
  Clock3,
  ChevronRight,
  Settings2,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type NotificationType =
  | "application"
  | "message"
  | "casting"
  | "audition"
  | "profile"
  | "system";

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  group: "Today" | "Yesterday" | "Earlier";
  read: boolean;
};

/* =========================================================
   MOCK DATA
========================================================= */

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "application",
    title: "Application viewed",
    description:
      "Rahul Kapoor viewed your application for Lead Actress — Hindi Feature Film.",
    time: "10 min ago",
    group: "Today",
    read: false,
  },
  {
    id: 2,
    type: "message",
    title: "New message from Rahul Kapoor",
    description:
      "We would like to schedule your audition for next week.",
    time: "24 min ago",
    group: "Today",
    read: false,
  },
  {
    id: 3,
    type: "audition",
    title: "Audition scheduled",
    description:
      "Your audition for Mumbai Nights has been scheduled for 14 Aug 2026 at 11:00 AM.",
    time: "1 hr ago",
    group: "Today",
    read: false,
  },
  {
    id: 4,
    type: "casting",
    title: "New casting call matches your profile",
    description:
      "Lead Actor — Drama Web Series is looking for talent with your experience.",
    time: "3 hrs ago",
    group: "Today",
    read: true,
  },
  {
    id: 5,
    type: "profile",
    title: "Your profile was shortlisted",
    description:
      "Your profile has been shortlisted for an upcoming fashion campaign.",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "message",
    title: "New message from Sneha Agarwal",
    description:
      "Please send across your updated showreel.",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
  },
  {
    id: 7,
    type: "application",
    title: "Application submitted successfully",
    description:
      "Your application for Female Model — Fashion Campaign has been submitted.",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
  },
  {
    id: 8,
    type: "casting",
    title: "New casting call posted",
    description:
      "A new Dancer opportunity has been posted in Mumbai.",
    time: "3 days ago",
    group: "Earlier",
    read: true,
  },
  {
    id: 9,
    type: "profile",
    title: "Profile completeness reminder",
    description:
      "Add more portfolio images and credits to improve your profile visibility.",
    time: "5 days ago",
    group: "Earlier",
    read: true,
  },
];

/* =========================================================
   STYLES
========================================================= */

const STYLES = `
  * {
    box-sizing: border-box;
  }

  .notifications-page {
    min-height: calc(100vh - 80px);
    background: var(--cream);
    color: var(--ink);
    padding: 34px 40px 70px;
    font-family:
      Inter,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  html.dark .notifications-page {
    --ink: #f4f4f4;
    --cream: #0b0b0b;
    --white: #141414;
    --mist: #292929;
    --mid: #a8a8a8;
    --gold: #c9a84c;
  }

  /* =====================================================
     PAGE WRAPPER
  ===================================================== */

  .notifications-container {
    width: min(1080px, 100%);
    margin: 0 auto;
  }

  /* =====================================================
     HEADER
  ===================================================== */

  .notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 30px;
    margin-bottom: 30px;
  }

  .notifications-header-left {
    min-width: 0;
  }

  .notifications-eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--gold);
    font-size: .68rem;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
    margin-bottom: 9px;
  }

  .notifications-title {
    margin: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -.02em;
  }

  .notifications-subtitle {
    margin: 10px 0 0;
    color: var(--mid);
    font-size: .88rem;
    line-height: 1.6;
    max-width: 600px;
  }

  .notifications-header-action {
    flex-shrink: 0;
  }

  .mark-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 42px;
    padding: 0 16px;
    border: 1px solid var(--mist);
    border-radius: 10px;
    background: transparent;
    color: var(--ink);
    font-family: inherit;
    font-size: .76rem;
    font-weight: 700;
    cursor: pointer;
    transition: .2s ease;
  }

  .mark-all-btn:hover {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(201,168,76,.05);
  }

  /* =====================================================
     SUMMARY
  ===================================================== */

  .notifications-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--mist);
  }

  .notification-count {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--mid);
    font-size: .76rem;
    font-weight: 600;
  }

  .notification-count-number {
    min-width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 7px;
    border-radius: 999px;
    background: var(--gold);
    color: #111;
    font-size: .66rem;
    font-weight: 800;
  }

  /* =====================================================
     FILTERS
  ===================================================== */

  .notification-filters {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
  }

  .notification-filter {
    height: 35px;
    padding: 0 13px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: var(--mid);
    font-family: inherit;
    font-size: .7rem;
    font-weight: 700;
    cursor: pointer;
    transition: .2s ease;
  }

  .notification-filter:hover {
    color: var(--ink);
    background: rgba(201,168,76,.06);
  }

  .notification-filter.active {
    background: var(--ink);
    color: var(--cream);
  }

  html.dark .notification-filter.active {
    background: #f2f2f2;
    color: #111;
  }

  /* =====================================================
     NOTIFICATION LIST
  ===================================================== */

  .notifications-content {
    border: 1px solid var(--mist);
    border-radius: 18px;
    overflow: hidden;
    background: var(--white);
  }

  html.dark .notifications-content {
    background: #111;
    border-color: #282828;
  }

  .notification-group {
    border-bottom: 1px solid var(--mist);
  }

  .notification-group:last-child {
    border-bottom: none;
  }

  .notification-group-title {
    padding: 17px 22px 12px;
    color: var(--mid);
    font-size: .65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .1em;
  }

  /* =====================================================
     NOTIFICATION ITEM
  ===================================================== */

  .notification-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    width: 100%;
    padding: 18px 22px;
    border: none;
    border-top: 1px solid rgba(201,168,76,.04);
    background: transparent;
    color: var(--ink);
    text-align: left;
    transition:
      background .2s ease,
      padding-left .2s ease;
  }

  .notification-item:hover {
    background: rgba(201,168,76,.035);
  }

  .notification-item.unread {
    background: rgba(201,168,76,.045);
  }

  .notification-item.unread:hover {
    background: rgba(201,168,76,.07);
  }

  .notification-item.unread::before {
    content: "";
    position: absolute;
    left: 0;
    top: 14px;
    bottom: 14px;
    width: 3px;
    border-radius: 0 4px 4px 0;
    background: var(--gold);
  }

  /* =====================================================
     ICON
  ===================================================== */

  .notification-icon {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--mist);
    border-radius: 11px;
    background: var(--cream);
    color: var(--mid);
  }

  html.dark .notification-icon {
    background: #181818;
    border-color: #2c2c2c;
  }

  .notification-item.unread .notification-icon {
    border-color: rgba(201,168,76,.35);
    color: var(--gold);
    background: rgba(201,168,76,.08);
  }

  /* =====================================================
     CONTENT
  ===================================================== */

  .notification-main {
    min-width: 0;
    flex: 1;
  }

  .notification-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }

  .notification-title {
    margin: 0;
    color: var(--ink);
    font-size: .84rem;
    font-weight: 750;
    line-height: 1.35;
  }

  .notification-item:not(.unread) .notification-title {
    font-weight: 650;
  }

  .notification-time {
    flex-shrink: 0;
    color: var(--mid);
    font-size: .65rem;
    white-space: nowrap;
  }

  .notification-description {
    margin: 5px 0 0;
    max-width: 720px;
    color: var(--mid);
    font-size: .75rem;
    line-height: 1.65;
  }

  /* =====================================================
     ACTIONS
  ===================================================== */

  .notification-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 6px;
    flex-shrink: 0;
  }

  .notification-action {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: var(--mid);
    cursor: pointer;
    transition: .2s ease;
  }

  .notification-action:hover {
    border-color: var(--mist);
    background: var(--cream);
    color: var(--ink);
  }

  .notification-action.delete:hover {
    color: #c0392b;
    border-color: rgba(192,57,43,.2);
    background: rgba(192,57,43,.05);
  }

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  .notifications-empty {
    padding: 80px 30px;
    text-align: center;
  }

  .notifications-empty-icon {
    width: 66px;
    height: 66px;
    margin: 0 auto 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--mist);
    border-radius: 18px;
    background: var(--cream);
    color: var(--gold);
  }

  .notifications-empty h2 {
    margin: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 1.8rem;
    font-weight: 400;
  }

  .notifications-empty p {
    max-width: 360px;
    margin: 8px auto 0;
    color: var(--mid);
    font-size: .76rem;
    line-height: 1.65;
  }

  /* =====================================================
     FOOTER NOTE
  ===================================================== */

  .notifications-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 20px;
    color: var(--mid);
    font-size: .64rem;
  }

  .notifications-footer svg {
    color: var(--gold);
  }

  /* =====================================================
     RESPONSIVE
  ===================================================== */

  @media (max-width: 700px) {
    .notifications-page {
      padding: 24px 16px 50px;
    }

    .notifications-header {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 24px;
    }

    .notifications-header-action {
      width: 100%;
    }

    .mark-all-btn {
      width: 100%;
      justify-content: center;
    }

    .notifications-summary {
      align-items: flex-start;
      flex-direction: column;
      gap: 14px;
    }

    .notification-filters {
      width: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;
      padding-bottom: 2px;
      scrollbar-width: none;
    }

    .notification-filters::-webkit-scrollbar {
      display: none;
    }

    .notification-filter {
      flex-shrink: 0;
    }

    .notification-item {
      padding: 16px;
      gap: 12px;
    }

    .notification-item.unread::before {
      top: 12px;
      bottom: 12px;
    }

    .notification-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
    }

    .notification-top {
      gap: 8px;
    }

    .notification-description {
      font-size: .72rem;
    }

    .notification-actions {
      margin-left: 0;
    }

    .notification-action {
      width: 29px;
      height: 29px;
    }
  }

  @media (max-width: 480px) {
    .notifications-title {
      font-size: 2.3rem;
    }

    .notification-time {
      font-size: .58rem;
    }

    .notification-action.delete {
      display: none;
    }
  }
`;

/* =========================================================
   HELPERS
========================================================= */

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "application":
      return <FileText size={18} />;

    case "message":
      return <MessageCircle size={18} />;

    case "casting":
      return <BriefcaseBusiness size={18} />;

    case "audition":
      return <CalendarDays size={18} />;

    case "profile":
      return <UserRound size={18} />;

    case "system":
      return <Settings2 size={18} />;

    default:
      return <Bell size={18} />;
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS
  );

  const [filter, setFilter] = useState<
    "all" | "unread" | NotificationType
  >("all");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (filter === "all") {
        return true;
      }

      if (filter === "unread") {
        return !notification.read;
      }

      return notification.type === filter;
    });
  }, [notifications, filter]);

  const groupedNotifications = useMemo(() => {
    const groups: Record<string, Notification[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    filteredNotifications.forEach((notification) => {
      groups[notification.group].push(notification);
    });

    return groups;
  }, [filteredNotifications]);

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "application", label: "Applications" },
    { id: "message", label: "Messages" },
    { id: "casting", label: "Casting Calls" },
  ] as const;

  const hasNotifications = filteredNotifications.length > 0;

  return (
    <>
      <style>{STYLES}</style>

      <main className="notifications-page">
        <div className="notifications-container">

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="notifications-header">
            <div className="notifications-header-left">

              <div className="notifications-eyebrow">
                <Bell size={14} />
                Activity Center
              </div>

              <h1 className="notifications-title">
                Notifications
              </h1>

              <p className="notifications-subtitle">
                Stay updated on applications, casting opportunities,
                messages, auditions and activity on your profile.
              </p>

            </div>

            <div className="notifications-header-action">
              <button
                className="mark-all-btn"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck size={16} />
                Mark all as read
              </button>
            </div>
          </header>

          {/* =================================================
              SUMMARY + FILTERS
          ================================================= */}

          <section className="notifications-summary">

            <div className="notification-count">
              {unreadCount > 0 ? (
                <>
                  <span className="notification-count-number">
                    {unreadCount}
                  </span>

                  <span>
                    unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </span>
                </>
              ) : (
                <span>You're all caught up</span>
              )}
            </div>

            <div className="notification-filters">

              {filters.map((item) => (
                <button
                  key={item.id}
                  className={`notification-filter ${
                    filter === item.id ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilter(
                      item.id as
                        | "all"
                        | "unread"
                        | NotificationType
                    )
                  }
                >
                  {item.label}
                </button>
              ))}

            </div>

          </section>

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {hasNotifications ? (
            <section className="notifications-content">

              {Object.entries(groupedNotifications).map(
                ([group, items]) => {

                  if (items.length === 0) {
                    return null;
                  }

                  return (
                    <div
                      key={group}
                      className="notification-group"
                    >

                      <div className="notification-group-title">
                        {group}
                      </div>

                      {items.map((notification) => (

                        <article
                          key={notification.id}
                          className={`notification-item ${
                            !notification.read ? "unread" : ""
                          }`}
                        >

                          {/* ICON */}

                          <div className="notification-icon">
                            {getNotificationIcon(
                              notification.type
                            )}
                          </div>

                          {/* CONTENT */}

                          <div className="notification-main">

                            <div className="notification-top">

                              <h3 className="notification-title">
                                {notification.title}
                              </h3>

                              <span className="notification-time">
                                {notification.time}
                              </span>

                            </div>

                            <p className="notification-description">
                              {notification.description}
                            </p>

                          </div>

                          {/* ACTIONS */}

                          <div className="notification-actions">

                            {!notification.read && (
                              <button
                                className="notification-action"
                                title="Mark as read"
                                onClick={() =>
                                  markAsRead(notification.id)
                                }
                              >
                                <Check size={15} />
                              </button>
                            )}

                            <button
                              className="notification-action delete"
                              title="Delete notification"
                              onClick={() =>
                                deleteNotification(
                                  notification.id
                                )
                              }
                            >
                              <Trash2 size={14} />
                            </button>

                            <button
                              className="notification-action"
                              title="View"
                            >
                              <ChevronRight size={15} />
                            </button>

                          </div>

                        </article>

                      ))}

                    </div>
                  );
                }
              )}

            </section>
          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <section className="notifications-content">

              <div className="notifications-empty">

                <div className="notifications-empty-icon">
                  <Bell size={27} />
                </div>

                <h2>
                  {filter === "unread"
                    ? "You're all caught up"
                    : "No notifications"}
                </h2>

                <p>
                  {filter === "unread"
                    ? "There are no unread notifications at the moment. We'll let you know when something needs your attention."
                    : "Notifications related to your casting activity will appear here."}
                </p>

              </div>

            </section>

          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="notifications-footer">
            <Clock3 size={13} />
            Notifications are updated as activity happens
          </div>

        </div>
      </main>
    </>
  );
}