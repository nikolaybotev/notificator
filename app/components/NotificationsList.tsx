'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { type Notification } from '@/lib/schemas'
import { notificationTypes } from '@/lib/notifications'
import { useInView } from 'react-intersection-observer'
import { trpc } from '@/providers/trpc'
import { UpdateIcon } from '@radix-ui/react-icons'

type Props = {
  onNotificationClick: (notification: Notification) => void
}

export default function NotificationsList({ onNotificationClick }: Props) {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = trpc.notifications.list.useInfiniteQuery(
    {
      limit: 10
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 1000 * 3,
      refetchInterval: 1000 * 3,
    }
  )

  const notifications = React.useMemo(() => {
    return data?.pages.flatMap(page => page.items) ?? []
  }, [data])

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="overflow-y-auto">
      {isLoading && (
        <Flex justify="center" py="4">
          <UpdateIcon className="h-4 w-4 animate-spin" />
        </Flex>
      )}

      {notifications.map((notification) => {
        const { Icon, color, getText } = notificationTypes[notification.type]
        return (
          <Flex
            key={notification.id}
            align="center"
            gap="2"
            className={`cursor-default p-2 ${!notification.isRead ? 'bg-blue-100 dark:bg-blue-950' : ''}`}
            onClick={() => onNotificationClick(notification)}
          >
            <Icon width="32" height="32" className={`bg-${color} rounded-md p-2 text-white`} />
            <span className="truncate text-sm">{getText(notification)}</span>
          </Flex>
        )
      })}

      {hasNextPage && (
        <div ref={ref} className="h-8 w-full">
          {isFetchingNextPage && (
            <Flex justify="center" py="2">
              <UpdateIcon className="h-4 w-4 animate-spin" />
            </Flex>
          )}
        </div>
      )}
    </div>
  )
} 