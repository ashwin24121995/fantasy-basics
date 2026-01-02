import { getSessionCookieOptions } from "./_core/cookies";

import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { updateUserProfile, getUserById } from "./db";
import { registerUser, loginUser } from "./auth";
import { createAuthToken } from "./_core/simpleAuth";
import { COOKIE_NAME } from "./_core/cookies";
import { isStateRestricted, calculateAge, MINIMUM_AGE, INDIAN_STATES } from "../shared/constants";
import { matchRouter } from "./matchRouter";
import { contestRouter } from "./contestRouter";
import { teamRouter } from "./teamRouter";
import { submitContactForm } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    register: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email format"),
          password: z.string().min(8, "Password must be at least 8 characters"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await registerUser(input);
        
        if (!result.success) {
          throw new Error(result.error || "Registration failed");
        }

        // Get the newly created user
        const user = await getUserById(result.userId!);
        if (!user) {
          throw new Error("Failed to retrieve user after registration");
        }

        // Create JWT token using simpleAuth (consistent with authentication middleware)
        const token = await createAuthToken(user);

        // Set cookie (for backward compatibility)
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

        // Return token in response for localStorage storage
        return { success: true, token, user };
      }),

    login: publicProcedure
      .input(
        z.object({
          email: z.string().email("Invalid email format"),
          password: z.string().min(1, "Password is required"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await loginUser(input);
        
        if (!result.success) {
          throw new Error(result.error || "Login failed");
        }

        // Create JWT token using simpleAuth (consistent with authentication middleware)
        const token = await createAuthToken(result.user!);

        // Set cookie (for backward compatibility)
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

        // Return token in response for localStorage storage
        return { success: true, user: result.user, token };
      }),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Match data from Cricket API
  matches: matchRouter,

  // Contest management
  contests: contestRouter,

  // Team management
  teams: teamRouter,

  // User profile management
  user: router({
    // Get current user profile
    profile: protectedProcedure.query(async ({ ctx }) => {
      return ctx.user;
    }),

    // Complete profile with age verification and state selection
    completeProfile: protectedProcedure
      .input(
        z.object({
          dateOfBirth: z.string(), // ISO date string
          state: z.enum([...INDIAN_STATES] as [string, ...string[]]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const dateOfBirth = new Date(input.dateOfBirth);
        const age = calculateAge(dateOfBirth);

        // Check age requirement
        if (age < MINIMUM_AGE) {
          throw new Error(`You must be at least ${MINIMUM_AGE} years old to use this platform.`);
        }

        // Check state restriction
        const isRestricted = isStateRestricted(input.state);
        if (isRestricted) {
          throw new Error(
            `Sorry, fantasy sports are not available in ${input.state} due to state regulations.`
          );
        }

        // Update user profile
        await updateUserProfile(ctx.user.id, {
          dateOfBirth,
          age,
          state: input.state,
          isAgeVerified: true,
          isRestricted: false,
        });

        // Return updated user
        const updatedUser = await getUserById(ctx.user.id);
        return updatedUser;
      }),

    // Check if profile is complete
    isProfileComplete: protectedProcedure.query(({ ctx }) => {
      return {
        isComplete: ctx.user.isAgeVerified && ctx.user.state !== null,
        needsAgeVerification: !ctx.user.isAgeVerified,
        needsStateSelection: ctx.user.state === null,
      };
    }),
  }),

  // Contact form submission
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          subject: z.string().min(5, "Subject must be at least 5 characters"),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Submit contact form to database
        const submission = await submitContactForm({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
          userId: ctx.user?.id || null,
        });

        return {
          success: true,
          submissionId: submission.id,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
