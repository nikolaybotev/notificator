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
    list: publicProcedure
      .input(
        z.object({
          cursor: z.number().optional(),
          limit: z.number().min(1).max(50).default(10),
        })
      )
      .query(async ({ input }) => {
        const { cursor, limit } = input
        
        const items = await prisma.notification.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            id: 'desc',
          },
        })

        let nextCursor: typeof cursor | undefined = undefined
        if (items.length > limit) {
          const nextItem = items.pop()
          nextCursor = nextItem!.id
        }

        return {
          items,
          nextCursor,
        }
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
