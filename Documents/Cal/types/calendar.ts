export type EventColor = "blue" | "green" | "purple" | "orange" | "red" | "pink" | "teal";

export type CalendarEventInput = {
  title: string;
  description?: string | null;
  location?: string | null;
  start_at: string;
  end_at: string;
  all_day?: boolean;
  color?: EventColor;
};

export type CalendarEventRow = CalendarEventInput & {
  id: string;
  user_id: string;
  google_event_id: string | null;
  google_status: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  all_day: boolean;
  color: EventColor;
};

export type CalendarSyncStateRow = {
  user_id: string;
  calendar_id: string;
  next_sync_token: string | null;
  last_synced_at: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};
