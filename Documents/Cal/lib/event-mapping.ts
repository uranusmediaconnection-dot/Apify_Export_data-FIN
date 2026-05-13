import type { calendar_v3 } from "googleapis";
import type { CalendarEventInput, CalendarEventRow, EventColor } from "@/types/calendar";

const googleColorMap: Record<string, EventColor> = {
  "1": "blue",
  "2": "green",
  "3": "purple",
  "4": "red",
  "5": "orange",
  "6": "orange",
  "7": "teal",
  "8": "blue",
  "9": "blue",
  "10": "green",
  "11": "red"
};

const toIsoFromGoogleDate = (value?: string | null): string => {
  if (!value) return new Date().toISOString();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T00:00:00.000Z`;
  return new Date(value).toISOString();
};

export function mapGoogleEventToDbEvent(
  event: calendar_v3.Schema$Event,
  userId: string
): Omit<CalendarEventRow, "created_at" | "updated_at"> {
  const googleId = event.id ?? crypto.randomUUID();
  const allDay = Boolean(event.start?.date && !event.start.dateTime);
  const deleted = event.status === "cancelled";
  const startAt = toIsoFromGoogleDate(event.start?.dateTime ?? event.start?.date);
  const endAt = toIsoFromGoogleDate(event.end?.dateTime ?? event.end?.date);

  return {
    id: `google_${googleId}`,
    user_id: userId,
    google_event_id: googleId,
    google_status: event.status ?? null,
    title: event.summary || "Untitled Event",
    description: event.description ?? null,
    location: event.location ?? null,
    start_at: startAt,
    end_at: endAt,
    all_day: allDay,
    color: event.colorId ? googleColorMap[event.colorId] ?? "blue" : "blue",
    deleted_at: deleted ? new Date().toISOString() : null
  };
}

export function toGoogleEventRequest(input: CalendarEventInput): calendar_v3.Schema$Event {
  const description = input.description ?? undefined;
  const location = input.location ?? undefined;

  if (input.all_day) {
    return {
      summary: input.title,
      description,
      location,
      start: { date: input.start_at.slice(0, 10) },
      end: { date: input.end_at.slice(0, 10) }
    };
  }

  return {
    summary: input.title,
    description,
    location,
    start: { dateTime: input.start_at, timeZone: "UTC" },
    end: { dateTime: input.end_at, timeZone: "UTC" }
  };
}

export function toDisplayEvent(event: CalendarEventRow) {
  const start = new Date(event.start_at);
  const end = new Date(event.end_at);

  return {
    ...event,
    date: event.start_at.slice(0, 10),
    startTime: start.toISOString().slice(11, 16),
    endTime: end.toISOString().slice(11, 16)
  };
}
