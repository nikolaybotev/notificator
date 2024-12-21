import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import superjson from 'superjson'

const t = initTRPC.create({
  transformer: superjson
})

export const router = t.router
export const publicProcedure = t.procedure

/**
 * Regular expression for validating Semantic Versioning (SemVer) format.
 * 
 * Format: MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
 * - MAJOR, MINOR, PATCH: non-negative integers without leading zeros
 * - PRERELEASE: optional, dot-separated identifiers (alphanumeric and hyphens)
 * - BUILD: optional metadata (alphanumeric and hyphens)
 * 
 * Examples:
 * - Valid: 2.1.0, 1.0.0-alpha, 1.0.0-beta.11, 2.1.0+build.123
 * - Invalid: 2.1, 02.1.0, 2.1.0., 2.1.0-
 */
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

const notificationInput = z.object({
  type: z.enum(['platform_update', 'comment_tag', 'access_granted', 'join_workspace']),
  personName: z.string().optional(),
  releaseNumber: z.string()
    .regex(semverRegex, 'Must be a valid semantic version (e.g., 2.1.0)')
    .optional()
}).refine(data => {
  if (data.type === 'platform_update') {
    return data.releaseNumber != null && data.personName == null;
  }
  return data.personName != null && data.releaseNumber == null;
}, "Invalid data for notification type");

export const appRouter = router({
  notifications: router({
    list: publicProcedure.query(async () => {
      return prisma.notification.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
    }),
    unreadCount: publicProcedure.query(async () => {
      return prisma.notification.count({
        where: {
          isRead: false
        }
      })
    }),
    markAsRead: publicProcedure
      .input(z.number())
      .mutation(async ({ input: id }) => {
        return prisma.notification.update({
          where: { id },
          data: { isRead: true }
        })
      }),
    create: publicProcedure
      .input(notificationInput)
      .mutation(async ({ input }) => {
        return prisma.notification.create({
          data: {
            type: input.type,
            personName: input.personName,
            releaseNumber: input.releaseNumber,
            isRead: false
          }
        })
      })
  })
})

export type AppRouter = typeof appRouter 