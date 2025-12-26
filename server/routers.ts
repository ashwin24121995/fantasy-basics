import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { updateUserProfile, getUserById } from "./db";
import { isStateRestricted, calculateAge, MINIMUM_AGE, INDIAN_STATES } from "../shared/constants";
import { matchRouter } from "./matchRouter";
import { contestRouter } from "./contestRouter";
import { teamRouter } from "./teamRouter";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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
});

export type AppRouter = typeof appRouter;
