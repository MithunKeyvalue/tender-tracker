import bcrypt from "bcrypt";
import { database } from "database/context";
import { users } from "database/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const SALT_ROUNDS = 10;
const SESSION_COOKIE_NAME = "session";
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export interface Session {
  token: string;
  userId: string;
  expiresAt: Date;
}

// In-memory session store (in production, use Redis or database)
const sessions = new Map<string, Session>();

export function createSession(userId: string): Session {
  const token = generateSessionToken();
  const session: Session = {
    token,
    userId,
    expiresAt: new Date(Date.now() + SESSION_EXPIRY),
  };
  sessions.set(token, session);
  return session;
}

export function getSession(token: string): Session | null {
  const session = sessions.get(token);
  if (!session) return null;
  
  if (session.expiresAt < new Date()) {
    sessions.delete(token);
    return null;
  }
  
  return session;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

export async function getUserById(userId: string) {
  const db = database();
  const user = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
      isActive: users.isActive,
      emailVerified: users.emailVerified,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
    
  return user[0] || null;
}

export async function getUserByEmail(email: string) {
  const db = database();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
    
  return user[0] || null;
}

export function getSessionFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith(`${SESSION_COOKIE_NAME}=`));
  
  if (!sessionCookie) return null;
  
  return sessionCookie.split('=')[1];
}

export function createSessionCookie(token: string): string {
  return `${SESSION_COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${SESSION_EXPIRY / 1000}; SameSite=Lax`;
}

export function createLogoutCookie(): string {
  return `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

export async function requireAuth(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const sessionToken = getSessionFromCookie(cookieHeader);
  
  if (!sessionToken) {
    throw new Response("Unauthorized", { status: 401 });
  }
  
  const session = getSession(sessionToken);
  if (!session) {
    throw new Response("Unauthorized", { status: 401 });
  }
  
  const user = await getUserById(session.userId);
  if (!user || !user.isActive) {
    throw new Response("Unauthorized", { status: 401 });
  }
  
  return { user, session };
}