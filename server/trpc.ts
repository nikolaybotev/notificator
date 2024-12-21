import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import superjson from 'superjson'

const t = initTRPC.create({
  transformer: superjson
})

export const router = t.router
export const publicProcedure = t.procedure

const notificationInput = z.object({
  type: z.enum(['platform_update', 'comment_tag', 'access_granted', 'join_workspace']),
  personName: z.string().optional(),
  releaseNumber: z.string().optional()
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