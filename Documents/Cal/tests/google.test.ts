import { describe, expect, it } from "vitest";
import { shouldRefreshAccessToken } from "@/lib/google";

describe("shouldRefreshAccessToken", () => {
  it("treats NextAuth expires_at values as seconds", () => {
    const expiresInFiveMinutesSeconds = Math.floor(Date.now() / 1000) + 300;

    expect(shouldRefreshAccessToken(expiresInFiveMinutesSeconds)).toBe(false);
  });

  it("refreshes tokens near expiry", () => {
    const expiresInTenSeconds = Math.floor(Date.now() / 1000) + 10;

    expect(shouldRefreshAccessToken(expiresInTenSeconds)).toBe(true);
  });
});
