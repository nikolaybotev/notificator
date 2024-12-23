'use client'

import { useEffect } from 'react'
import { trpc } from '@/providers/trpc'
import { notificationQueryConfig } from '@/lib/notifications'

export default function NotificationsPrefetch() {
  const utils = trpc.useUtils()
  
  useEffect(() => {
    utils.notifications.list.prefetchInfinite({
      limit: notificationQueryConfig.pageSize
    })
  }, [utils])

  return null
} 