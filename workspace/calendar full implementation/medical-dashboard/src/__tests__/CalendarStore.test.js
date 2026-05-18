import { describe, it, expect, beforeEach } from 'vitest';
import useCalendarStore from '../store/useCalendarStore';

describe('CalendarStore', () => {
  beforeEach(() => {
    useCalendarStore.getState().clearLogs();
    // Reset state if needed (Zustand doesn't auto-reset in tests)
  });

  it('should initialize with current date and month view', () => {
    const state = useCalendarStore.getState();
    expect(state.view).toBe('month');
    expect(state.currentDate).toBeInstanceOf(Date);
  });

  it('should update view mode', () => {
    const { setView } = useCalendarStore.getState();
    setView('week');
    expect(useCalendarStore.getState().view).toBe('week');
  });

  it('should add an event and create a log', () => {
    const { addEvent } = useCalendarStore.getState();
    const event = { title: 'Test Appointment', date: new Date() };
    
    addEvent(event);
    
    const state = useCalendarStore.getState();
    expect(state.events).toHaveLength(1);
    expect(state.events[0].title).toBe('Test Appointment');
    expect(state.logs).toHaveLength(1);
    expect(state.logs[0].message).toContain('Event added');
  });

  it('should delete an event', () => {
    const { addEvent, deleteEvent } = useCalendarStore.getState();
    addEvent({ title: 'To Delete' });
    const eventId = useCalendarStore.getState().events[0].id;
    
    deleteEvent(eventId);
    
    expect(useCalendarStore.getState().events).toHaveLength(0);
  });
});
