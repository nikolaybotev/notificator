import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import superjson from 'superjson'
import { notificationSchema } from '@/lib/schemas'

const t = initTRPC.create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  notifications: router({
    list: publicProcedure.query(async () => {
      return prisma.notification.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),
    unreadCount: publicProcedure.query(async () => {
      return prisma.notification.count({
        where: {
          isRead: false,
        },
      })
    }),
    markAsRead: publicProcedure.input(z.number()).mutation(async ({ input: id }) => {
      return prisma.notification.update({
        where: { id },
        data: { isRead: true },
      })
    }),
    create: publicProcedure.input(notificationSchema).mutation(async ({ input }) => {
      return prisma.notification.create({
        data: {
          type: input.type,
          personName: input.personName,
          releaseNumber: input.releaseNumber,
          isRead: false,
        },
      })
    }),
  }),
})

export type AppRouter = typeof appRouter
