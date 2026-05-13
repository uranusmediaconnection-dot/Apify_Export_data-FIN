"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { DisplayEvent } from "@/app/components/types";

const monthNames = [
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
  "December"
];

const dayStr = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function MiniCalendar({
  currentDate,
  selectedDate,
  events,
  onDateSelect
}: {
  currentDate: Date;
  selectedDate: string;
  events: DisplayEvent[];
  onDateSelect: (date: string) => void;
}) {
  const [miniMonth, setMiniMonth] = useState(currentDate.getMonth());
  const [miniYear, setMiniYear] = useState(currentDate.getFullYear());

  const days = useMemo(() => {
    const daysInMonth = new Date(miniYear, miniMonth + 1, 0).getDate();
    const firstDay = new Date(miniYear, miniMonth, 1).getDay();
    const prevMonthDays = new Date(miniYear, miniMonth, 0).getDate();
    const cells: Array<{ day: number; dateStr: string; other: boolean }> = [];

    for (let i = firstDay - 1; i >= 0; i -= 1) {
      const d = new Date(miniYear, miniMonth - 1, prevMonthDays - i);
      cells.push({ day: prevMonthDays - i, dateStr: dayStr(d), other: true });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const d = new Date(miniYear, miniMonth, day);
      cells.push({ day, dateStr: dayStr(d), other: false });
    }
    const remaining = 42 - cells.length;
    for (let day = 1; day <= remaining; day += 1) {
      const d = new Date(miniYear, miniMonth + 1, day);
      cells.push({ day, dateStr: dayStr(d), other: true });
    }

    return cells;
  }, [miniMonth, miniYear]);

  const navigate = (dir: number) => {
    const next = new Date(miniYear, miniMonth + dir, 1);
    setMiniMonth(next.getMonth());
    setMiniYear(next.getFullYear());
  };

  const today = dayStr(new Date());

  return (
    <section className="border-b border-[color:var(--border)] px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[color:var(--text-primary)]">
          {monthNames[miniMonth]} {miniYear}
        </h3>
        <div className="flex gap-1">
          <button onClick={() => navigate(-1)} className="focus-ring rounded-lg p-1.5 text-[color:var(--text-secondary)] transition hover:bg-white/10">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => navigate(1)} className="focus-ring rounded-lg p-1.5 text-[color:var(--text-secondary)] transition hover:bg-white/10">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-semibold uppercase text-[color:var(--text-muted)]">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isToday = day.dateStr === today;
          const isSelected = day.dateStr === selectedDate;
          const hasEvents = events.some((event) => event.date === day.dateStr);

          return (
            <button
              key={day.dateStr}
              onClick={() => onDateSelect(day.dateStr)}
              className={`relative flex h-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                isSelected
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md"
                  : isToday
                    ? "bg-indigo-500/15 text-indigo-300"
                    : day.other
                      ? "text-zinc-600 hover:bg-white/5"
                      : "text-[color:var(--text-secondary)] hover:bg-white/10"
              }`}
            >
              {day.day}
              {hasEvents && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${isSelected ? "bg-white/90" : "bg-indigo-400"}`} />}
            </button>
          );
        })}
      </div>
    </section>
  );
}
