import type { CalendarEventRow } from "@/types/calendar";

export type DisplayEvent = CalendarEventRow & {
  date: string;
  startTime: string;
  endTime: string;
};
