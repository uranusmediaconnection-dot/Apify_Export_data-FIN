import type { CalendarEventInput, EventColor } from "@/types/calendar";

const colors: EventColor[] = ["blue", "green", "purple", "orange", "red", "pink", "teal"];

type ValidationResult =
  | { ok: true; value: Required<CalendarEventInput> }
  | { ok: false; error: string };

const cleanOptional = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const isValidIsoDate = (value: string): boolean => !Number.isNaN(new Date(value).getTime());

export function validateEventInput(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid event payload." };
  }

  const body = input as Record<string, unknown>;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const startAt = typeof body.start_at === "string" ? body.start_at : "";
  const endAt = typeof body.end_at === "string" ? body.end_at : "";
  const requestedColor = typeof body.color === "string" ? body.color : "blue";

  if (!title) return { ok: false, error: "Title is required." };
  if (title.length > 200) return { ok: false, error: "Title must be 200 characters or fewer." };
  if (!isValidIsoDate(startAt) || !isValidIsoDate(endAt)) {
    return { ok: false, error: "Start and end must be valid ISO dates." };
  }
  if (new Date(endAt).getTime() <= new Date(startAt).getTime()) {
    return { ok: false, error: "End must be after start." };
  }
  if (!colors.includes(requestedColor as EventColor)) {
    return { ok: false, error: "Unsupported event color." };
  }

  return {
    ok: true,
    value: {
      title,
      description: cleanOptional(body.description),
      location: cleanOptional(body.location),
      start_at: new Date(startAt).toISOString(),
      end_at: new Date(endAt).toISOString(),
      all_day: Boolean(body.all_day),
      color: requestedColor as EventColor
    }
  };
}
