import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { getFreshGoogleToken } from "@/lib/google";

export async function getRouteAuth(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return null;

  const googleToken = await getFreshGoogleToken(token);
  if (!googleToken) return null;

  return {
    session,
    userId: session.user.id,
    googleToken
  };
}
