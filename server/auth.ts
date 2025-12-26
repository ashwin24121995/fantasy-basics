import { eq } from "drizzle-orm";
import { users, InsertUser, User } from "../drizzle/schema";
import { getDb } from "./db";
import { hashPassword, verifyPassword, validatePassword, validateEmail } from "./_core/password";

// ============================================
// AUTH FUNCTIONS
// ============================================

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
}

/**
 * Register a new user with email and password
 */
export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string; userId?: number }> {
  const { name, email, password } = params;

  // Validate email format
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // Validate password strength
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { success: false, error: passwordValidation.error };
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { success: false, error: "Email already registered" };
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const db = await getDb();
  if (!db) {
    return { success: false, error: "Database not available" };
  }

  try {
    const result = await db.insert(users).values({
      name,
      email,
      passwordHash,
      loginMethod: "email",
      role: "user",
      isAgeVerified: false,
      isRestricted: false,
    });

    return { 
      success: true, 
      userId: Number((result as any).insertId)
    };
  } catch (error) {
    console.error("[Auth] Registration error:", error);
    return { success: false, error: "Failed to create user account" };
  }
}

/**
 * Login user with email and password
 */
export async function loginUser(params: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string; user?: User }> {
  const { email, password } = params;

  // Get user by email
  const user = await getUserByEmail(email);
  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  // Check if user has password hash (email/password login)
  if (!user.passwordHash) {
    return { success: false, error: "This account uses a different login method" };
  }

  // Verify password
  const isPasswordValid = await verifyPassword(password, user.passwordHash);
  if (!isPasswordValid) {
    return { success: false, error: "Invalid email or password" };
  }

  // Update last signed in timestamp
  const db = await getDb();
  if (db) {
    try {
      await db
        .update(users)
        .set({ lastSignedIn: new Date() })
        .where(eq(users.id, user.id));
    } catch (error) {
      console.error("[Auth] Failed to update lastSignedIn:", error);
    }
  }

  return { success: true, user };
}
