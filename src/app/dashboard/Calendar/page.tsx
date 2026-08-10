"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

type EventType =
  | "AUDITION"
  | "CALLBACK"
  | "SHOOT"
  | "AVAILABILITY"
  | "MEETING";

interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  type: EventType;
  time: string;
  location: string;
  company: string;
  description: string;
}

const EVENTS: CalendarEvent[] = [
  {
    id: 1,
    date: "2026-08-10",
    title: "The Last Summer",
    type: "AUDITION",
    time: "10:30 AM",
    location: "Mumbai",
    company: "Northstar Studios",
    description:
      "Supporting actor audition for an upcoming OTT series.",
  },
  {
    id: 2,
    date: "2026-08-12",
    title: "Summer Campaign",
    type: "CALLBACK",
    time: "2:00 PM",
    location: "Delhi",
    company: "Framehouse Media",
    description:
      "Callback round for the upcoming summer commercial.",
  },
  {
    id: 3,
    date: "2026-08-14",
    title: "Profile Shoot",
    type: "SHOOT",
    time: "11:00 AM",
    location: "Mumbai",
    company: "IndCasting Studio",
    description:
      "Updated portfolio and headshot session.",
  },
  {
    id: 4,
    date: "2026-08-17",
    title: "Between Two Worlds",
    type: "AUDITION",
    time: "4:30 PM",
    location: "Mumbai",
    company: "Indie Motion",
    description:
      "Lead actor audition for a new web series.",
  },
  {
    id: 5,
    date: "2026-08-19",
    title: "Casting Discussion",
    type: "MEETING",
    time: "12:00 PM",
    location: "Online",
    company: "Blue Door Productions",
    description:
      "Initial discussion regarding upcoming casting opportunities.",
  },
  {
    id: 6,
    date: "2026-08-21",
    title: "Autumn Collection",
    type: "SHOOT",
    time: "9:00 AM",
    location: "Bengaluru",
    company: "Mode House",
    description:
      "Editorial fashion shoot for the autumn collection.",
  },
  {
    id: 7,
    date: "2026-08-24",
    title: "Available for Casting",
    type: "AVAILABILITY",
    time: "All day",
    location: "Mumbai",
    company: "Personal",
    description:
      "You have marked yourself as available for casting.",
  },
  {
    id: 8,
    date: "2026-08-27",
    title: "Commercial Audition",
    type: "AUDITION",
    time: "3:30 PM",
    location: "Delhi",
    company: "Pixel Films",
    description:
      "Audition for a national brand commercial.",
  },
];

const EVENT_STYLES: Record<
  EventType,
  {
    label: string;
    className: string;
  }
> = {
  AUDITION: {
    label: "Audition",
    className: "calendar-event-audition",
  },
  CALLBACK: {
    label: "Callback",
    className: "calendar-event-callback",
  },
  SHOOT: {
    label: "Shoot",
    className: "calendar-event-shoot",
  },
  AVAILABILITY: {
    label: "Available",
    className: "calendar-event-availability",
  },
  MEETING: {
    label: "Meeting",
    className: "calendar-event-meeting",
  },
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function TalentCalendarPage() {

      const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const dark =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");

      setIsDarkMode(dark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(7);
  const [currentYear, setCurrentYear] = useState(2026);

  const [selectedDate, setSelectedDate] = useState(
    "2026-08-10"
  );

  const [activeFilter, setActiveFilter] =
    useState<EventType | "ALL">("ALL");

  const [showAddModal, setShowAddModal] = useState(false);

  const daysInMonth = getDaysInMonth(
    currentYear,
    currentMonth
  );

  const firstDay = getFirstDayOfMonth(
    currentYear,
    currentMonth
  );

  const calendarDays = useMemo(() => {
    const days: Array<number | null> = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  }, [firstDay, daysInMonth]);

  const selectedEvents = EVENTS.filter(
    (event) =>
      event.date === selectedDate &&
      (activeFilter === "ALL" ||
        event.type === activeFilter)
  );

  const monthEvents = EVENTS.filter((event) => {
    const date = new Date(event.date);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear &&
      (activeFilter === "ALL" ||
        event.type === activeFilter)
    );
  });

  const auditionsThisMonth = EVENTS.filter(
    (event) =>
      event.type === "AUDITION" &&
      new Date(event.date).getMonth() === currentMonth
  ).length;

  const shootsThisMonth = EVENTS.filter(
    (event) =>
      event.type === "SHOOT" &&
      new Date(event.date).getMonth() === currentMonth
  ).length;

  const callbacksThisMonth = EVENTS.filter(
    (event) =>
      event.type === "CALLBACK" &&
      new Date(event.date).getMonth() === currentMonth
  ).length;

  function goPreviousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  }

  function goNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  }

  function goToday() {
    const now = new Date();

    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setSelectedDate(formatDate(now));
  }

  function selectDay(day: number) {
    const selected = new Date(
      currentYear,
      currentMonth,
      day
    );

    setSelectedDate(formatDate(selected));
  }

  function getEventsForDay(day: number) {
    const date = formatDate(
      new Date(currentYear, currentMonth, day)
    );

    return EVENTS.filter(
      (event) =>
        event.date === date &&
        (activeFilter === "ALL" ||
          event.type === activeFilter)
    );
  }

  const selectedDateObject = new Date(`${selectedDate}T12:00:00`);

  return (
    <>
      <style>{`
        /* =====================================================
           ROOT
        ===================================================== */

        .talent-calendar {
          --calendar-bg: #fffdf7;
          --calendar-surface: #ffffff;
          --calendar-soft: #f7f4ec;
          --calendar-text: #11100f;
          --calendar-muted: #77716a;
          --calendar-border: #e6dfd2;
          --calendar-gold: #c9a84c;
          --calendar-gold-light: rgba(201,168,76,0.12);
          --calendar-shadow: rgba(20,18,12,0.07);

          min-height: 100vh;
          background: var(--calendar-bg);
          color: var(--calendar-text);
          transition:
            background .35s ease,
            color .35s ease;
          overflow-x: hidden;
        }

        .talent-calendar.dark {
          --calendar-bg: #0b0b0b;
          --calendar-surface: #141414;
          --calendar-soft: #191919;
          --calendar-text: #f3f1ec;
          --calendar-muted: #98938b;
          --calendar-border: #292929;
          --calendar-gold: #d4af37;
          --calendar-gold-light: rgba(212,175,55,0.12);
          --calendar-shadow: rgba(0,0,0,.35);
        }

        .calendar-container {
          width: min(1380px, calc(100% - 64px));
          margin: 0 auto;
        }

        /* =====================================================
           AMBIENT BACKGROUND
        ===================================================== */

        .calendar-ambient {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .calendar-ambient::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          right: -250px;
          top: 80px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(201,168,76,.11),
              transparent 68%
            );
          filter: blur(25px);
          animation: calendarGlow 12s ease-in-out infinite alternate;
        }

        @keyframes calendarGlow {
          from {
            transform: translate3d(0,0,0);
          }
          to {
            transform: translate3d(-60px,35px,0);
          }
        }

        /* =====================================================
           PAGE
        ===================================================== */

        .calendar-main {
          position: relative;
          z-index: 2;
          padding-top: 110px;
          padding-bottom: 90px;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .calendar-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          padding: 42px 0 48px;
          border-bottom: 1px solid var(--calendar-border);
        }

        .calendar-kicker {
          margin: 0 0 16px;
          color: var(--calendar-gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          animation: calendarRevealLeft .8s ease both;
        }

        .calendar-title {
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: clamp(52px, 7vw, 92px);
          font-weight: 400;
          line-height: .9;
          letter-spacing: -.045em;
          animation: calendarRevealUp .9s .05s ease both;
        }

        .calendar-title em {
          color: var(--calendar-muted);
          font-style: italic;
        }

        .calendar-description {
          max-width: 560px;
          margin: 22px 0 0;
          color: var(--calendar-muted);
          font-size: 15px;
          line-height: 1.75;
          animation: calendarRevealUp .9s .12s ease both;
        }

        .calendar-add-button {
          border: none;
          border-radius: 999px;
          padding: 14px 22px;
          background: var(--calendar-text);
          color: var(--calendar-bg);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            transform .25s ease,
            background .25s ease,
            color .25s ease;
          white-space: nowrap;
          animation: calendarRevealRight .8s .15s ease both;
        }

        .calendar-add-button:hover {
          transform: translateY(-3px);
          background: var(--calendar-gold);
          color: #111;
        }

        /* =====================================================
           MONTH STATS
        ===================================================== */

        .calendar-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          margin-top: 40px;
          border-top: 1px solid var(--calendar-border);
          border-bottom: 1px solid var(--calendar-border);
        }

        .calendar-stat {
          padding: 22px 28px 24px 0;
          border-right: 1px solid var(--calendar-border);
        }

        .calendar-stat:not(:first-child) {
          padding-left: 28px;
        }

        .calendar-stat:last-child {
          border-right: none;
        }

        .calendar-stat-number {
          display: block;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: -.05em;
          line-height: 1;
          margin-bottom: 7px;
        }

        .calendar-stat-label {
          color: var(--calendar-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        /* =====================================================
           TOOLBAR
        ===================================================== */

        .calendar-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 55px;
          margin-bottom: 18px;
        }

        .calendar-month-navigation {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .calendar-month-title {
          min-width: 220px;
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 34px;
          font-weight: 400;
          letter-spacing: -.02em;
        }

        .calendar-nav-button {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--calendar-border);
          border-radius: 50%;
          background: var(--calendar-surface);
          color: var(--calendar-text);
          cursor: pointer;
          font-size: 17px;
          transition:
            transform .25s ease,
            border-color .25s ease,
            background .25s ease;
        }

        .calendar-nav-button:hover {
          transform: translateY(-2px);
          border-color: var(--calendar-gold);
          background: var(--calendar-gold-light);
        }

        .calendar-today-button {
          border: 1px solid var(--calendar-border);
          background: transparent;
          color: var(--calendar-text);
          border-radius: 999px;
          padding: 9px 16px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .25s ease;
        }

        .calendar-today-button:hover {
          border-color: var(--calendar-gold);
          color: var(--calendar-gold);
        }

        /* =====================================================
           FILTERS
        ===================================================== */

        .calendar-filters {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .calendar-filter {
          border: 1px solid var(--calendar-border);
          background: transparent;
          color: var(--calendar-muted);
          border-radius: 999px;
          padding: 8px 13px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            background .25s ease,
            border-color .25s ease,
            color .25s ease,
            transform .25s ease;
        }

        .calendar-filter:hover {
          transform: translateY(-2px);
          border-color: var(--calendar-gold);
          color: var(--calendar-text);
        }

        .calendar-filter.active {
          background: var(--calendar-text);
          border-color: var(--calendar-text);
          color: var(--calendar-bg);
        }

        /* =====================================================
           CALENDAR GRID
        ===================================================== */

        .calendar-wrapper {
          border: 1px solid var(--calendar-border);
          border-radius: 24px;
          overflow: hidden;
          background: var(--calendar-surface);
          box-shadow: 0 18px 55px var(--calendar-shadow);
          animation: calendarRevealUp .8s .15s ease both;
        }

        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-bottom: 1px solid var(--calendar-border);
          background: var(--calendar-soft);
        }

        .calendar-weekday {
          padding: 14px 15px;
          color: var(--calendar-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }

        .calendar-day {
          position: relative;
          min-height: 145px;
          padding: 12px;
          border-right: 1px solid var(--calendar-border);
          border-bottom: 1px solid var(--calendar-border);
          background: var(--calendar-surface);
          cursor: pointer;
          transition:
            background .25s ease,
            box-shadow .25s ease;
        }

        .calendar-day:nth-child(7n) {
          border-right: none;
        }

        .calendar-day:hover {
          background:
            radial-gradient(
              circle at 80% 20%,
              var(--calendar-gold-light),
              transparent 50%
            );
        }

        .calendar-day.empty {
          background: var(--calendar-soft);
          opacity: .55;
          cursor: default;
        }

        .calendar-day.selected {
          box-shadow:
            inset 0 0 0 1.5px var(--calendar-gold);
          z-index: 2;
        }

        .calendar-day-number {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 27px;
          height: 27px;
          margin-bottom: 8px;
          font-size: 11px;
          font-weight: 600;
        }

        .calendar-day.today
        .calendar-day-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          justify-content: center;
          background: var(--calendar-gold);
          color: #111;
        }

        .calendar-day-events {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .calendar-mini-event {
          position: relative;
          overflow: hidden;
          padding: 6px 7px;
          border-radius: 7px;
          font-size: 9px;
          line-height: 1.25;
          font-weight: 600;
          transition:
            transform .2s ease,
            filter .2s ease;
        }

        .calendar-mini-event:hover {
          transform: translateX(2px);
          filter: brightness(1.06);
        }

        .calendar-event-audition {
          background: rgba(201,168,76,.16);
          color: #987722;
          border-left: 2px solid #c9a84c;
        }

        .calendar-event-callback {
          background: rgba(74,118,170,.13);
          color: #3d6d9d;
          border-left: 2px solid #4a76aa;
        }

        .calendar-event-shoot {
          background: rgba(115,92,148,.13);
          color: #735c94;
          border-left: 2px solid #735c94;
        }

        .calendar-event-availability {
          background: rgba(60,139,103,.13);
          color: #3d8a66;
          border-left: 2px solid #3d8a66;
        }

        .calendar-event-meeting {
          background: rgba(160,93,76,.13);
          color: #9a5d4b;
          border-left: 2px solid #9a5d4b;
        }

        .dark .calendar-event-audition {
          color: #e3c75d;
        }

        .dark .calendar-event-callback {
          color: #82acd5;
        }

        .dark .calendar-event-shoot {
          color: #b39acd;
        }

        .dark .calendar-event-availability {
          color: #75bd9b;
        }

        .dark .calendar-event-meeting {
          color: #cf8b78;
        }

        .calendar-event-time {
          display: block;
          opacity: .65;
          margin-top: 3px;
          font-size: 8px;
        }

        /* =====================================================
           SELECTED DAY / AGENDA
        ===================================================== */

        .calendar-agenda {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 70px;
          margin-top: 70px;
        }

        .calendar-agenda-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .calendar-agenda-title {
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: -.025em;
        }

        .calendar-agenda-date {
          color: var(--calendar-muted);
          font-size: 11px;
        }

        .calendar-event-list {
          border-top: 1px solid var(--calendar-border);
        }

        .calendar-agenda-event {
          display: grid;
          grid-template-columns: 100px 1fr auto;
          align-items: start;
          gap: 22px;
          padding: 24px 0;
          border-bottom: 1px solid var(--calendar-border);
          animation: calendarRevealUp .45s ease both;
        }

        .calendar-agenda-time {
          color: var(--calendar-gold);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .06em;
        }

        .calendar-agenda-event-title {
          margin: 0 0 5px;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 26px;
          font-weight: 400;
        }

        .calendar-agenda-company {
          margin: 0;
          color: var(--calendar-muted);
          font-size: 12px;
        }

        .calendar-agenda-meta {
          text-align: right;
        }

        .calendar-agenda-type {
          color: var(--calendar-gold);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .calendar-agenda-location {
          margin-top: 7px;
          color: var(--calendar-muted);
          font-size: 10px;
        }

        .calendar-empty {
          padding: 45px 0;
          border-top: 1px solid var(--calendar-border);
          border-bottom: 1px solid var(--calendar-border);
          color: var(--calendar-muted);
          font-size: 13px;
        }

        /* =====================================================
           UPCOMING SIDE PANEL
        ===================================================== */

        .calendar-upcoming {
          border-top: 1px solid var(--calendar-border);
        }

        .calendar-upcoming-item {
          position: relative;
          padding: 20px 0;
          border-bottom: 1px solid var(--calendar-border);
          transition: padding-left .3s ease;
        }

        .calendar-upcoming-item:hover {
          padding-left: 8px;
        }

        .calendar-upcoming-date {
          margin-bottom: 6px;
          color: var(--calendar-gold);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .calendar-upcoming-title {
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 25px;
          font-weight: 400;
        }

        .calendar-upcoming-info {
          margin-top: 6px;
          color: var(--calendar-muted);
          font-size: 10px;
          line-height: 1.6;
        }

        /* =====================================================
           MODAL
        ===================================================== */

        .calendar-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0,0,0,.58);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .calendar-modal {
          width: min(520px, 100%);
          border: 1px solid var(--calendar-border);
          border-radius: 24px;
          background: var(--calendar-surface);
          color: var(--calendar-text);
          padding: 32px;
          box-shadow: 0 30px 100px rgba(0,0,0,.3);
          animation: modalIn .35s cubic-bezier(.22,1,.36,1) both;
        }

        .calendar-modal-top {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .calendar-modal-title {
          margin: 0;
          font-family:
            "Instrument Serif",
            Georgia,
            serif;
          font-size: 36px;
          font-weight: 400;
        }

        .calendar-modal-close {
          width: 34px;
          height: 34px;
          border: 1px solid var(--calendar-border);
          border-radius: 50%;
          background: transparent;
          color: var(--calendar-text);
          cursor: pointer;
          font-size: 17px;
        }

        .calendar-modal-field {
          margin-bottom: 17px;
        }

        .calendar-modal-field label {
          display: block;
          margin-bottom: 7px;
          color: var(--calendar-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .calendar-modal-field input,
        .calendar-modal-field select {
          width: 100%;
          border: 1px solid var(--calendar-border);
          border-radius: 10px;
          background: var(--calendar-soft);
          color: var(--calendar-text);
          padding: 12px;
          font: inherit;
          outline: none;
        }

        .calendar-modal-field input:focus,
        .calendar-modal-field select:focus {
          border-color: var(--calendar-gold);
        }

        .calendar-modal-submit {
          width: 100%;
          margin-top: 8px;
          padding: 13px;
          border: none;
          border-radius: 999px;
          background: var(--calendar-text);
          color: var(--calendar-bg);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes calendarRevealUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes calendarRevealLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes calendarRevealRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1000px) {
          .calendar-day {
            min-height: 120px;
          }

          .calendar-agenda {
            grid-template-columns: 1fr;
            gap: 55px;
          }
        }

        @media (max-width: 800px) {
          .calendar-container {
            width: calc(100% - 32px);
          }

          .calendar-hero {
            align-items: flex-start;
            flex-direction: column;
          }

          .calendar-stats {
            grid-template-columns: 1fr 1fr 1fr;
          }

          .calendar-day {
            min-height: 105px;
            padding: 8px;
          }

          .calendar-mini-event {
            font-size: 8px;
          }

          .calendar-event-time {
            display: none;
          }

          .calendar-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
          .calendar-main {
            padding-top: 90px;
          }

          .calendar-container {
            width: calc(100% - 24px);
          }

          .calendar-title {
            font-size: 54px;
          }

          .calendar-stats {
            grid-template-columns: 1fr;
          }

          .calendar-stat {
            border-right: none;
            border-bottom: 1px solid var(--calendar-border);
            padding: 18px 0;
          }

          .calendar-stat:not(:first-child) {
            padding-left: 0;
          }

          .calendar-stat:last-child {
            border-bottom: none;
          }

          .calendar-month-title {
            min-width: 170px;
            font-size: 29px;
          }

          .calendar-weekday {
            padding: 10px 4px;
            text-align: center;
            font-size: 7px;
          }

          .calendar-day {
            min-height: 80px;
            padding: 5px;
          }

          .calendar-day-number {
            width: 23px;
            height: 23px;
            margin-bottom: 4px;
            font-size: 9px;
          }

          .calendar-day.today
          .calendar-day-number {
            width: 23px;
            height: 23px;
          }

          .calendar-mini-event {
            padding: 4px;
            font-size: 7px;
          }

          .calendar-mini-event span {
            display: none;
          }

          .calendar-agenda-event {
            grid-template-columns: 70px 1fr;
            gap: 12px;
          }

          .calendar-agenda-meta {
            grid-column: 2;
            text-align: left;
          }

          .calendar-agenda-event-title {
            font-size: 23px;
          }

          .calendar-modal {
            padding: 25px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .calendar-ambient::before,
          .calendar-kicker,
          .calendar-title,
          .calendar-description,
          .calendar-add-button,
          .calendar-wrapper,
          .calendar-agenda-event {
            animation: none !important;
          }

          * {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className={`talent-calendar ${isDarkMode ? "dark" : ""}`}>
        <div
          className="calendar-ambient"
          aria-hidden="true"
        />

        <main className="calendar-main">
          <div className="calendar-container">

            {/* =================================================
                HEADER
            ================================================= */}

            <section className="calendar-hero">
              <div>
                <p className="calendar-kicker">
                  Talent workspace
                </p>

                <h1 className="calendar-title">
                  Your <em>calendar.</em>
                </h1>

                <p className="calendar-description">
                  Keep auditions, callbacks, shoots and
                  availability in one place. Stay prepared
                  for every opportunity.
                </p>
              </div>

              <button
                className="calendar-add-button"
                onClick={() => setShowAddModal(true)}
              >
                Add event
              </button>
            </section>

            {/* =================================================
                STATS
            ================================================= */}

            <section className="calendar-stats">
              <div className="calendar-stat">
                <span className="calendar-stat-number">
                  {auditionsThisMonth}
                </span>

                <span className="calendar-stat-label">
                  Auditions this month
                </span>
              </div>

              <div className="calendar-stat">
                <span className="calendar-stat-number">
                  {callbacksThisMonth}
                </span>

                <span className="calendar-stat-label">
                  Callbacks this month
                </span>
              </div>

              <div className="calendar-stat">
                <span className="calendar-stat-number">
                  {shootsThisMonth}
                </span>

                <span className="calendar-stat-label">
                  Shoots this month
                </span>
              </div>
            </section>

            {/* =================================================
                CALENDAR TOOLBAR
            ================================================= */}

            <section>
              <div className="calendar-toolbar">

                <div className="calendar-month-navigation">
                  <button
                    className="calendar-nav-button"
                    onClick={goPreviousMonth}
                    aria-label="Previous month"
                  >
                    ←
                  </button>

                  <h2 className="calendar-month-title">
                    {MONTHS[currentMonth]}{" "}
                    {currentYear}
                  </h2>

                  <button
                    className="calendar-nav-button"
                    onClick={goNextMonth}
                    aria-label="Next month"
                  >
                    →
                  </button>
                </div>

                <button
                  className="calendar-today-button"
                  onClick={goToday}
                >
                  Today
                </button>
              </div>

              {/* FILTERS */}

              <div className="calendar-filters">
                {(
                  [
                    "ALL",
                    "AUDITION",
                    "CALLBACK",
                    "SHOOT",
                    "MEETING",
                    "AVAILABILITY",
                  ] as const
                ).map((filter) => (
                  <button
                    key={filter}
                    className={`calendar-filter ${
                      activeFilter === filter
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveFilter(filter)
                    }
                  >
                    {filter === "ALL"
                      ? "All"
                      : EVENT_STYLES[filter].label}
                  </button>
                ))}
              </div>

              {/* =================================================
                  CALENDAR
              ================================================= */}

              <div className="calendar-wrapper">

                <div className="calendar-weekdays">
                  {WEEKDAYS.map((day) => (
                    <div
                      className="calendar-weekday"
                      key={day}
                    >
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>

                <div className="calendar-days">
                  {calendarDays.map((day, index) => {

                    if (day === null) {
                      return (
                        <div
                          className="calendar-day empty"
                          key={`empty-${index}`}
                        />
                      );
                    }

                    const dateString = formatDate(
                      new Date(
                        currentYear,
                        currentMonth,
                        day
                      )
                    );

                    const dayEvents =
                      getEventsForDay(day);

                    const isSelected =
                      selectedDate === dateString;

                    const isToday =
                      formatDate(today) === dateString;

                    return (
                      <div
                        className={`calendar-day ${
                          isSelected
                            ? "selected"
                            : ""
                        } ${
                          isToday
                            ? "today"
                            : ""
                        }`}
                        key={dateString}
                        onClick={() =>
                          selectDay(day)
                        }
                      >
                        <div className="calendar-day-number">
                          {day}
                        </div>

                        <div className="calendar-day-events">
                          {dayEvents
                            .slice(0, 3)
                            .map((event) => (
                              <div
                                className={`calendar-mini-event ${
                                  EVENT_STYLES[
                                    event.type
                                  ].className
                                }`}
                                key={event.id}
                              >
                                {event.title}

                                <span className="calendar-event-time">
                                  {event.time}
                                </span>
                              </div>
                            ))}

                          {dayEvents.length > 3 && (
                            <div
                              style={{
                                color:
                                  "var(--calendar-muted)",
                                fontSize: "8px",
                              }}
                            >
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* =================================================
                AGENDA
            ================================================= */}

            <section className="calendar-agenda">

              <div>
                <div className="calendar-agenda-header">
                  <div>
                    <p className="calendar-kicker">
                      Selected day
                    </p>

                    <h2 className="calendar-agenda-title">
                      {selectedDateObject.toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        }
                      )}
                    </h2>
                  </div>
                </div>

                {selectedEvents.length > 0 ? (
                  <div className="calendar-event-list">
                    {selectedEvents.map(
                      (event, index) => (
                        <div
                          className="calendar-agenda-event"
                          key={event.id}
                          style={{
                            animationDelay:
                              `${index * 0.08}s`,
                          }}
                        >
                          <div className="calendar-agenda-time">
                            {event.time}
                          </div>

                          <div>
                            <h3 className="calendar-agenda-event-title">
                              {event.title}
                            </h3>

                            <p className="calendar-agenda-company">
                              {event.company}
                            </p>

                            <p
                              className="calendar-agenda-company"
                              style={{
                                marginTop: "7px",
                              }}
                            >
                              {event.description}
                            </p>
                          </div>

                          <div className="calendar-agenda-meta">
                            <div className="calendar-agenda-type">
                              {
                                EVENT_STYLES[
                                  event.type
                                ].label
                              }
                            </div>

                            <div className="calendar-agenda-location">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="calendar-empty">
                    Nothing scheduled for this day.
                    <br />
                    Use this space to keep yourself
                    available for new opportunities.
                  </div>
                )}
              </div>

              {/* =================================================
                  UPCOMING
              ================================================= */}

              <div>
                <div className="calendar-agenda-header">
                  <div>
                    <p className="calendar-kicker">
                      Coming up
                    </p>

                    <h2 className="calendar-agenda-title">
                      Next events
                    </h2>
                  </div>
                </div>

                <div className="calendar-upcoming">
                  {monthEvents
                    .filter(
                      (event) =>
                        event.date >= selectedDate
                    )
                    .slice(0, 4)
                    .map((event) => (
                      <div
                        className="calendar-upcoming-item"
                        key={event.id}
                      >
                        <div className="calendar-upcoming-date">
                          {new Date(
                            `${event.date}T12:00:00`
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </div>

                        <h3 className="calendar-upcoming-title">
                          {event.title}
                        </h3>

                        <div className="calendar-upcoming-info">
                          {event.time}
                          <br />
                          {event.location} ·{" "}
                          {event.company}
                        </div>
                      </div>
                    ))}

                  {monthEvents.length === 0 && (
                    <div className="calendar-empty">
                      No upcoming events.
                    </div>
                  )}
                </div>
              </div>

            </section>

          </div>
        </main>

        {/* =====================================================
            ADD EVENT MODAL
        ===================================================== */}

        {showAddModal && (
          <div
            className="calendar-modal-overlay"
            onClick={(event) => {
              if (
                event.target === event.currentTarget
              ) {
                setShowAddModal(false);
              }
            }}
          >
            <div className="calendar-modal">

              <div className="calendar-modal-top">
                <h2 className="calendar-modal-title">
                  Add to calendar
                </h2>

                <button
                  className="calendar-modal-close"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="calendar-modal-field">
                <label>
                  Event title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Audition for web series"
                />
              </div>

              <div className="calendar-modal-field">
                <label>
                  Date
                </label>

                <input
                  type="date"
                  defaultValue={selectedDate}
                />
              </div>

              <div className="calendar-modal-field">
                <label>
                  Time
                </label>

                <input
                  type="time"
                  defaultValue="10:00"
                />
              </div>

              <div className="calendar-modal-field">
                <label>
                  Event type
                </label>

                <select defaultValue="AUDITION">
                  <option value="AUDITION">
                    Audition
                  </option>

                  <option value="CALLBACK">
                    Callback
                  </option>

                  <option value="SHOOT">
                    Shoot
                  </option>

                  <option value="MEETING">
                    Meeting
                  </option>

                  <option value="AVAILABILITY">
                    Availability
                  </option>
                </select>
              </div>

              <button
                className="calendar-modal-submit"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                Save event
              </button>

            </div>
          </div>
        )}
      </div>
    </>
  );
}