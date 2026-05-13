import { describe, expect, it } from "vitest";
import { validateEventInput } from "@/lib/calendar-validation";

describe("validateEventInput", () => {
  it("accepts a complete timed event", () => {
    const result = validateEventInput({
      title: "Planning",
      start_at: "2026-05-13T09:00:00.000Z",
      end_at: "2026-05-13T10:00:00.000Z",
      color: "teal"
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.title).toBe("Planning");
      expect(result.value.color).toBe("teal");
    }
  });

  it("rejects an event ending before it starts", () => {
    const result = validateEventInput({
      title: "Broken",
      start_at: "2026-05-13T10:00:00.000Z",
      end_at: "2026-05-13T09:00:00.000Z"
    });

    expect(result.ok).toBe(false);
  });
});
