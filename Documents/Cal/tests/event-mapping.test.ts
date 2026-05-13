import { describe, expect, it } from "vitest";
import { mapGoogleEventToDbEvent, toGoogleEventRequest } from "@/lib/event-mapping";

describe("event mapping", () => {
  it("maps Google all-day events into database event rows", () => {
    const mapped = mapGoogleEventToDbEvent(
      {
        id: "abc123",
        summary: "Holiday",
        status: "confirmed",
        start: { date: "2026-05-13" },
        end: { date: "2026-05-14" }
      },
      "user_1"
    );

    expect(mapped).toMatchObject({
      id: "google_abc123",
      user_id: "user_1",
      google_event_id: "abc123",
      title: "Holiday",
      all_day: true
    });
  });

  it("creates the correct Google request body for timed events", () => {
    const request = toGoogleEventRequest({
      title: "Demo",
      description: "Review",
      location: "Office",
      start_at: "2026-05-13T09:00:00.000Z",
      end_at: "2026-05-13T10:00:00.000Z",
      all_day: false,
      color: "blue"
    });

    expect(request).toMatchObject({
      summary: "Demo",
      description: "Review",
      location: "Office",
      start: { dateTime: "2026-05-13T09:00:00.000Z", timeZone: "UTC" },
      end: { dateTime: "2026-05-13T10:00:00.000Z", timeZone: "UTC" }
    });
  });
});
