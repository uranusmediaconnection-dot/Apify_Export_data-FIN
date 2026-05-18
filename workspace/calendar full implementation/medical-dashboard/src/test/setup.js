import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock crypto for UUIDs
Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid',
  },
});
