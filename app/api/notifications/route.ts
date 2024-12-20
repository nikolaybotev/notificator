import { prisma } from '@/lib/db'

export async function GET() {
  const notifications = await prisma.notification.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return Response.json(notifications)
} 