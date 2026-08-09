"use client";

import { Trash2, X } from "lucide-react";
import { useState } from "react";
import type { CalendarEventInput, EventColor } from "@/types/calendar";
import type { DisplayEvent } from "@/app/components/types";

const colors: EventColor[] = ["blue", "green", "purple", "orange", "red", "pink", "teal"];
const colorHex: Record<EventColor, string> = {
  blue: "#818cf8",
  green: "#34d399",
  purple: "#c084fc",
  orange: "#fb923c",
  red: "#f87171",
  pink: "#f472b6",
  teal: "#2dd4bf"
};

const toLocalInput = (iso?: string) => {
  const date = iso ? new Date(iso) : new Date();
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const getInitialFormData = (event: DisplayEvent | null, selectedDate: string) => {
  if (!event) {
    return {
      title: "",
      start: `${selectedDate}T09:00`,
      end: `${selectedDate}T10:00`,
      description: "",
      location: "",
      allDay: false,
      color: "blue" as EventColor
    };
  }

  return {
    title: event.title,
    start: toLocalInput(event.start_at),
    end: toLocalInput(event.end_at),
    description: event.description ?? "",
    location: event.location ?? "",
    allDay: event.all_day,
    color: event.color
  };
};

export function EventModal({
  event,
  selectedDate,
  onClose,
  onDelete,
  onSave
}: {
  event: DisplayEvent | null;
  selectedDate: string;
  onClose: () => void;
  onDelete: () => void;
  onSave: (event: CalendarEventInput) => void;
}) {
  const [formData, setFormData] = useState(() => getInitialFormData(event, selectedDate));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      description: formData.description,
      location: formData.location,
      start_at: new Date(formData.start).toISOString(),
      end_at: new Date(formData.end).toISOString(),
      all_day: formData.allDay,
      color: formData.color
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <form onSubmit={submit} className="glass-elevated w-full max-w-lg overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-5 py-4">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">{event ? "Edit Event" : "New Event"}</h2>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[color:var(--text-muted)] transition hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <input
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Event title"
            className="focus-ring w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] px-4 py-3 text-base font-semibold text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)]"
            required
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-xs font-semibold uppercase text-[color:var(--text-muted)]">
              Start
              <input
                type="datetime-local"
                value={formData.start}
                onChange={(e) => setFormData((prev) => ({ ...prev, start: e.target.value }))}
                className="focus-ring w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] px-3 py-2 text-sm font-medium normal-case text-[color:var(--text-primary)] outline-none"
              />
            </label>
            <label className="space-y-1 text-xs font-semibold uppercase text-[color:var(--text-muted)]">
              End
              <input
                type="datetime-local"
                value={formData.end}
                onChange={(e) => setFormData((prev) => ({ ...prev, end: e.target.value }))}
                className="focus-ring w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] px-3 py-2 text-sm font-medium normal-case text-[color:var(--text-primary)] outline-none"
              />
            </label>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] px-3 py-2 text-sm font-semibold text-[color:var(--text-secondary)]">
            <input
              type="checkbox"
              checked={formData.allDay}
              onChange={(e) => setFormData((prev) => ({ ...prev, allDay: e.target.checked }))}
              className="h-4 w-4 accent-[color:var(--accent)]"
            />
            All-day event
          </label>

          <input
            value={formData.location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="Location"
            className="focus-ring w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)]"
          />

          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            rows={3}
            className="focus-ring w-full resize-none rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)]"
          />

          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, color }))}
                className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${formData.color === color ? "scale-110" : ""}`}
                style={{
                  borderColor: formData.color === color ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                  backgroundColor: colorHex[color],
                  boxShadow: formData.color === color ? `0 0 12px ${colorHex[color]}80` : "none"
                }}
                aria-label={`Use ${color}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[color:var(--border)] bg-[color:var(--bg-secondary)] px-5 py-4">
          {event ? (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={16} />
              Delete
            </button>
          ) : (
            <span />
          )}
          <button className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
