"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { Audition, getAuditionsForUser } from "@/utils/auditionData";
import DayScheduleModal from "./DayScheduleModal";

interface DashboardCalendarProps {
  userId?: string;
  userRole?: "talent" | "seeker";
}

export default function DashboardCalendar({ userId = "talent_1", userRole = "talent" }: DashboardCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [auditions, setAuditions] = useState<Audition[]>([]);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState("");

  const loadAuditions = () => {
    const data = getAuditionsForUser(userId, userRole);
    setAuditions(data);
  };

  useEffect(() => {
    loadAuditions();
    window.addEventListener("auditionsUpdated", loadAuditions);
    return () => window.removeEventListener("auditionsUpdated", loadAuditions);
  }, [userId, userRole]);

  useEffect(() => {
    const saved = localStorage.getItem("dashboardSelectedDate");
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    if (saved) {
      setSelectedDate(saved);
      setCurrentDate(new Date(saved));
    } else {
      setSelectedDate(todayStr);
    }
  }, []);

  const handlePrev = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(currentDate.getDate() - 7);
      setCurrentDate(prevWeek);
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      setCurrentDate(nextWeek);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    localStorage.setItem("dashboardSelectedDate", dateStr);
    
    setModalDate(dateStr);
    setIsModalOpen(true);
  };

  const getAuditionsForDate = (dateStr: string) => {
    return auditions.filter(a => a.date === dateStr);
  };

  // Find next upcoming audition
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const upcomingAuditions = auditions.filter(a => a.date >= todayStr && (a.status === 'Pending' || a.status === 'Scheduled')).sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.startTime.localeCompare(b.startTime); // simple string sort
  });
  
  const nextAudition = upcomingAuditions.length > 0 ? upcomingAuditions[0] : null;

  // Render logic
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  // Generating days to display
  let displayDays: { day: number, month: number, year: number, isCurrentMonth: boolean, dateStr: string }[] = [];
  
  if (viewMode === "month") {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    
    // Previous month blanks
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    // Standardizing month formatting for string parsing (JS Date sets months 0-indexed)
    // The dateStr needs format YYYY-MM-DD
    const prevMonthStr = currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
    const prevMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      displayDays.push({
        day, month: prevMonthStr - 1, year: prevMonthYear, isCurrentMonth: false,
        dateStr: `${prevMonthYear}-${String(prevMonthStr).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      displayDays.push({
        day: i, month: currentDate.getMonth(), year: currentDate.getFullYear(), isCurrentMonth: true,
        dateStr: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      });
    }
  } else {
    // Week view
    const currentDayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      displayDays.push({
        day: d.getDate(), month: d.getMonth(), year: d.getFullYear(), isCurrentMonth: d.getMonth() === currentDate.getMonth(),
        dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      });
    }
  }

  return (
    <>
      <div className="sidebar-calendar" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--dash-surface)', borderRadius: '16px', border: '1px solid var(--dash-border)' }}>
        
        {/* Next Upcoming Audition Card */}
        {nextAudition && (
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--dash-bg)', border: '1px solid var(--dash-border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: 'var(--gold)' }}></div>
            <p style={{ margin: '0 0 4px 0', fontSize: '0.75rem', color: 'var(--dash-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Next Upcoming</p>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: 'var(--dash-text-main)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userRole === 'seeker' ? nextAudition.candidateName : nextAudition.title}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--dash-text-muted)' }}>
              <Clock size={12} color="var(--gold)" />
              <span>{new Date(nextAudition.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {nextAudition.startTime}</span>
            </div>
          </div>
        )}

        {/* Calendar Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dash-text-main)' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')} style={{ background: 'transparent', border: '1px solid var(--dash-border)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem', color: 'var(--dash-text-muted)', cursor: 'pointer' }}>
              {viewMode === 'month' ? 'Week' : 'Month'}
            </button>
            <button onClick={handleToday} style={{ background: 'transparent', border: '1px solid var(--dash-border)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem', color: 'var(--dash-text-muted)', cursor: 'pointer' }}>
              Today
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handlePrev} style={{ background: 'transparent', border: 'none', color: 'var(--dash-text-muted)', cursor: 'pointer', padding: '4px' }}>
            <ChevronLeft size={16} />
          </button>
          <div className="calendar-grid" style={{ flex: 1, margin: '0 8px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {weekDays.map((day) => (
              <div key={day} className="calendar-weekday" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--dash-text-muted)', textAlign: 'center', marginBottom: '8px' }}>
                {day}
              </div>
            ))}
            
            {displayDays.map((d, i) => {
              const isSelected = selectedDate === d.dateStr;
              const isToday = todayStr === d.dateStr;
              const dayAuditions = getAuditionsForDate(d.dateStr);
              const hasAuditions = dayAuditions.length > 0;
              
              return (
                <button
                  key={`${i}-${d.dateStr}`}
                  onClick={() => handleDateClick(d.dateStr)}
                  title={`${dayAuditions.length} audition(s) scheduled`}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isSelected ? 'var(--gold)' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: isSelected ? '#000' : (isToday ? 'var(--gold)' : (d.isCurrentMonth ? 'var(--dash-text-main)' : 'var(--dash-text-muted)')),
                    fontWeight: isSelected || isToday ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    opacity: d.isCurrentMonth ? 1 : 0.4,
                    transition: 'all 0.2s ease',
                    padding: 0
                  }}
                  onMouseEnter={(e) => { if(!isSelected) e.currentTarget.style.backgroundColor = 'var(--dash-bg)'; }}
                  onMouseLeave={(e) => { if(!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {d.day}
                  
                  {/* Indicator Dot */}
                  {hasAuditions && (
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#000' : (dayAuditions.some(a => a.status === 'Cancelled') ? '#ef4444' : 'var(--gold)')
                    }}></div>
                  )}
                </button>
              );
            })}
          </div>
          <button onClick={handleNext} style={{ background: 'transparent', border: 'none', color: 'var(--dash-text-muted)', cursor: 'pointer', padding: '4px' }}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <DayScheduleModal 
          date={modalDate} 
          auditions={getAuditionsForDate(modalDate)} 
          userRole={userRole} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
