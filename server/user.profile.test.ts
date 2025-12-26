import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userOverrides?: Partial<AuthenticatedUser>): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    dateOfBirth: null,
    age: null,
    isAgeVerified: false,
    state: null,
    isRestricted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...userOverrides,
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("user.isProfileComplete", () => {
  it("returns incomplete status for new user without age verification", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.user.isProfileComplete();

    expect(result).toEqual({
      isComplete: false,
      needsAgeVerification: true,
      needsStateSelection: true,
    });
  });

  it("returns incomplete status for user with age but no state", async () => {
    const ctx = createAuthContext({
      isAgeVerified: true,
      age: 25,
      dateOfBirth: new Date("1999-01-01"),
      state: null,
    });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.user.isProfileComplete();

    expect(result).toEqual({
      isComplete: false,
      needsAgeVerification: false,
      needsStateSelection: true,
    });
  });

  it("returns complete status for fully verified user", async () => {
    const ctx = createAuthContext({
      isAgeVerified: true,
      age: 25,
      dateOfBirth: new Date("1999-01-01"),
      state: "Karnataka",
    });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.user.isProfileComplete();

    expect(result).toEqual({
      isComplete: true,
      needsAgeVerification: false,
      needsStateSelection: false,
    });
  });
});

describe("user.completeProfile", () => {
  it("rejects users under 18 years old", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Date of birth for someone who is 17 years old
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 17);

    await expect(
      caller.user.completeProfile({
        dateOfBirth: dob.toISOString(),
        state: "Karnataka",
      })
    ).rejects.toThrow("You must be at least 18 years old");
  });

  it("rejects users from restricted states", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Date of birth for someone who is 25 years old
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    await expect(
      caller.user.completeProfile({
        dateOfBirth: dob.toISOString(),
        state: "Telangana",
      })
    ).rejects.toThrow("Sorry, fantasy sports are not available in Telangana");
  });

  it("rejects users from Andhra Pradesh", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    await expect(
      caller.user.completeProfile({
        dateOfBirth: dob.toISOString(),
        state: "Andhra Pradesh",
      })
    ).rejects.toThrow("Sorry, fantasy sports are not available in Andhra Pradesh");
  });

  it("rejects users from Assam", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    await expect(
      caller.user.completeProfile({
        dateOfBirth: dob.toISOString(),
        state: "Assam",
      })
    ).rejects.toThrow("Sorry, fantasy sports are not available in Assam");
  });

  it("rejects users from Odisha", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    await expect(
      caller.user.completeProfile({
        dateOfBirth: dob.toISOString(),
        state: "Odisha",
      })
    ).rejects.toThrow("Sorry, fantasy sports are not available in Odisha");
  });

  it("accepts users who are exactly 18 years old", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Date of birth for someone who is exactly 18 years old
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 18);

    // This should not throw
    const result = await caller.user.completeProfile({
      dateOfBirth: dob.toISOString(),
      state: "Karnataka",
    });

    expect(result).toBeDefined();
  });

  it("accepts users from non-restricted states", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    // This should not throw for Karnataka (non-restricted state)
    const result = await caller.user.completeProfile({
      dateOfBirth: dob.toISOString(),
      state: "Karnataka",
    });

    expect(result).toBeDefined();
  });
});

describe("user.profile", () => {
  it("returns current user profile", async () => {
    const ctx = createAuthContext({
      name: "John Doe",
      email: "john@example.com",
    });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.user.profile();

    expect(result.name).toBe("John Doe");
    expect(result.email).toBe("john@example.com");
    expect(result.id).toBe(1);
  });
});
