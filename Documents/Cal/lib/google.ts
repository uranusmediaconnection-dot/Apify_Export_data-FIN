import { google } from "googleapis";
import type { JWT } from "next-auth/jwt";

const refreshWindowSeconds = 60;

export type GoogleTokenSet = {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number;
};

export function shouldRefreshAccessToken(expiresAtSeconds?: number): boolean {
  if (!expiresAtSeconds) return true;
  return expiresAtSeconds - refreshWindowSeconds <= Math.floor(Date.now() / 1000);
}

export async function refreshGoogleAccessToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    return { ...token, error: "MissingRefreshToken" };
  }

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    grant_type: "refresh_token",
    refresh_token: token.refreshToken
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });
  const refreshed = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
    error?: string;
  };

  if (!response.ok || !refreshed.access_token) {
    return { ...token, error: refreshed.error ?? "RefreshAccessTokenError" };
  }

  return {
    ...token,
    accessToken: refreshed.access_token,
    accessTokenExpiresAt: Math.floor(Date.now() / 1000) + (refreshed.expires_in ?? 3600),
    refreshToken: refreshed.refresh_token ?? token.refreshToken,
    error: undefined
  };
}

export async function getFreshGoogleToken(token: JWT): Promise<GoogleTokenSet | null> {
  const usableToken = shouldRefreshAccessToken(token.accessTokenExpiresAt)
    ? await refreshGoogleAccessToken(token)
    : token;

  if (!usableToken.accessToken || usableToken.error) return null;

  return {
    accessToken: usableToken.accessToken,
    refreshToken: usableToken.refreshToken,
    accessTokenExpiresAt: usableToken.accessTokenExpiresAt
  };
}

export function getCalendarClient(tokens: GoogleTokenSet) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
  );

  oauth2Client.setCredentials({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
    expiry_date: tokens.accessTokenExpiresAt ? tokens.accessTokenExpiresAt * 1000 : undefined
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
}
