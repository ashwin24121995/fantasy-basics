import { Request, Response } from "express";
import * as jose from "jose";
import { ENV } from "./env";
import type { User } from "../../drizzle/schema";
import { getUserByEmail } from "../db";

const COOKIE_NAME = "auth_token";
const secret = new TextEncoder().encode(ENV.jwtSecret);

export async function createAuthToken(user: User): Promise<string> {
  const token = await new jose.SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);
  return token;
}

export async function verifyAuthToken(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}

export async function authenticateRequest(req: Request): Promise<User | null> {
  // Check Authorization header first (for localStorage-based auth)
  let token = req.cookies?.[COOKIE_NAME];
  
  // If no cookie, check Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }
  
  if (!token) return null;

  const payload = await verifyAuthToken(token);
  if (!payload) return null;

  const user = await getUserByEmail(payload.email);
  return user || null;
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: ENV.isProduction,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(COOKIE_NAME);
}
