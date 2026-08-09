"use client";

import { Calendar, Clock, LayoutGrid, ListFilter } from "lucide-react";
import type { DisplayEvent } from "@/app/components/types";

const todayStr = () => new Date().toISOString().slice(0, 10);

export function StatsBar({ events }: { events: DisplayEvent[] }) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const stats = [
    { label: "Total Events", value: events.length, icon: Calendar, className: "from-indigo-500 to-purple-500" },
    { label: "Today", value: events.filter((event) => event.date === todayStr()).length, icon: Clock, className: "from-emerald-500 to-teal-500" },
    {
      label: "This Week",
      value: events.filter((event) => {
        const d = new Date(`${event.date}T00:00:00`);
        return d >= startOfWeek && d <= endOfWeek;
      }).length,
      icon: ListFilter,
      className: "from-violet-500 to-fuchsia-500"
    },
    {
      label: "This Month",
      value: events.filter((event) => {
        const d = new Date(`${event.date}T00:00:00`);
        return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
      }).length,
      icon: LayoutGrid,
      className: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <div className="grid gap-4 border-b border-[color:var(--border)] bg-[color:var(--bg-secondary)] px-6 py-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex items-center gap-4 rounded-2xl bg-[color:var(--bg-tertiary)] p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white ${stat.className}`}>
              <Icon size={19} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[color:var(--text-primary)]">{stat.value}</p>
              <p className="text-xs font-semibold uppercase text-[color:var(--text-muted)]">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
