"use client";

import type { DisplayEvent } from "@/app/components/types";

const colors = {
  blue: "#3B82F6",
  green: "#10B981",
  purple: "#8B5CF6",
  orange: "#F59E0B",
  red: "#EF4444",
  pink: "#EC4899",
  teal: "#14B8A6"
};

const formatTime = (timeStr: string) => {
  const [h, m] = timeStr.split(":");
  const hour = Number.parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
};

export function EventCard({
  event,
  onClick,
  compact = false
}: {
  event: DisplayEvent;
  onClick: (event: DisplayEvent) => void;
  compact?: boolean;
}) {
  const bgColor = colors[event.color] || colors.blue;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      className={`w-full rounded-md border-l-[3px] px-3 py-2 text-left transition hover:scale-[1.01] ${
        compact ? "px-2 py-1" : ""
      }`}
      style={{ borderLeftColor: bgColor, backgroundColor: `${bgColor}20` }}
    >
      <div className={`truncate font-semibold text-zinc-100 ${compact ? "text-[10px]" : "text-sm"}`}>{event.title}</div>
      {!compact && (
        <div className="mt-1 truncate text-xs text-zinc-400">
          {event.all_day ? "All day" : `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
        </div>
      )}
    </button>
  );
}
