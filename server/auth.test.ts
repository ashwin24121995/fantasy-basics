import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createMockContext(): { ctx: TrpcContext; cookies: CookieCall[] } {
  const cookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        cookies.push({ name, value, options });
      },
      clearCookie: (name: string, options: Record<string, unknown>) => {
        cookies.push({ name, value: "", options: { ...options, maxAge: -1 } });
      },
    } as TrpcContext["res"],
  };

  return { ctx, cookies };
}

describe("Authentication System", () => {
  const testEmail = `test-${Date.now()}@fantasybasics.com`;
  const testPassword = "TestPass123";
  const testName = "Test User Auth";

  describe("User Registration", () => {
    it("should register a new user with valid credentials", async () => {
      const { ctx, cookies } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.register({
        email: testEmail,
        password: testPassword,
        name: testName,
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(cookies.length).toBeGreaterThan(0);
      
      // Verify user was created in database
      const user = await db.getUserByEmail(testEmail);
      expect(user).toBeDefined();
      expect(user?.email).toBe(testEmail);
      expect(user?.name).toBe(testName);
      expect(user?.role).toBe("user");
      expect(user?.loginMethod).toBe("email");
    });

    it("should reject registration with duplicate email", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.register({
          email: testEmail,
          password: testPassword,
          name: "Another User",
        })
      ).rejects.toThrow("Email already registered");
    });

    it("should reject registration with invalid email", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.register({
          email: "invalid-email",
          password: testPassword,
          name: testName,
        })
      ).rejects.toThrow();
    });

    it("should reject registration with short password", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.register({
          email: `new-${Date.now()}@test.com`,
          password: "123",
          name: testName,
        })
      ).rejects.toThrow();
    });

    it("should reject registration without name", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.register({
          email: `new-${Date.now()}@test.com`,
          password: testPassword,
          name: "",
        })
      ).rejects.toThrow();
    });
  });

  describe("User Login", () => {
    it("should login with correct credentials", async () => {
      const { ctx, cookies } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.login({
        email: testEmail,
        password: testPassword,
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(cookies.length).toBeGreaterThan(0);
    });

    it("should reject login with incorrect password", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.login({
          email: testEmail,
          password: "WrongPassword123",
        })
      ).rejects.toThrow("Invalid email or password");
    });

    it("should reject login with non-existent email", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.login({
          email: "nonexistent@test.com",
          password: testPassword,
        })
      ).rejects.toThrow("Invalid email or password");
    });

    it("should reject login with invalid email format", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.login({
          email: "invalid-email",
          password: testPassword,
        })
      ).rejects.toThrow();
    });
  });

  describe("Password Security", () => {
    it("should hash passwords before storing", async () => {
      const user = await db.getUserByEmail(testEmail);

      expect(user).toBeDefined();
      expect(user?.passwordHash).toBeDefined();
      expect(user?.passwordHash).not.toBe(testPassword);
      expect(user?.passwordHash?.length).toBeGreaterThan(50); // bcrypt hashes are long
    });
  });

  describe("Database User Functions", () => {
    it("should retrieve user by email", async () => {
      const user = await db.getUserByEmail(testEmail);

      expect(user).toBeDefined();
      expect(user?.email).toBe(testEmail);
      expect(user?.name).toBe(testName);
      expect(user?.loginMethod).toBe("email");
    });

    it("should retrieve user by ID", async () => {
      const userByEmail = await db.getUserByEmail(testEmail);
      expect(userByEmail).toBeDefined();

      if (userByEmail) {
        const userById = await db.getUserById(userByEmail.id);
        expect(userById).toBeDefined();
        expect(userById?.id).toBe(userByEmail.id);
        expect(userById?.email).toBe(testEmail);
      }
    });

    it("should return undefined for non-existent email", async () => {
      const user = await db.getUserByEmail("nonexistent@test.com");
      expect(user).toBeUndefined();
    });

    it("should return undefined for non-existent ID", async () => {
      const user = await db.getUserById(999999);
      expect(user).toBeUndefined();
    });
  });

  describe("User Role Assignment", () => {
    it("should assign 'user' role by default", async () => {
      const { ctx } = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const newEmail = `role-test-${Date.now()}@test.com`;
      await caller.auth.register({
        email: newEmail,
        password: testPassword,
        name: "Role Test User",
      });

      const user = await db.getUserByEmail(newEmail);
      expect(user?.role).toBe("user");
    });
  });
});
