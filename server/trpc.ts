import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import superjson from 'superjson'

const t = initTRPC.create({
  transformer: superjson
})

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  notifications: router({
    list: publicProcedure.query(async () => {
      return prisma.notification.findMany({
        orderBy: {
          createdAt: 'desc'
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
      })
  })
})

export type AppRouter = typeof appRouter 