"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("dashboardSelectedDate");
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    if (saved) {
      setSelectedDate(saved);
    } else {
      setSelectedDate(todayStr);
    }
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setSelectedDate(dateStr);
    localStorage.setItem("dashboardSelectedDate", dateStr);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // Generate blank spaces for the first row
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="sidebar-calendar">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={handlePrevMonth} aria-label="Previous Month">
          <ChevronLeft size={16} />
        </button>
        <span className="calendar-month-year">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button className="calendar-nav-btn" onClick={handleNextMonth} aria-label="Next Month">
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="calendar-grid">
        {weekDays.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="calendar-cell empty"></div>
        ))}
        
        {days.map((day) => {
          const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
          const isSelected = selectedDate === dateStr;
          const isToday = todayStr === dateStr;
          
          return (
            <button
              key={day}
              className={`calendar-cell day ${isSelected ? "selected" : ""} ${isToday && !isSelected ? "today" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleDateClick(day);
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
