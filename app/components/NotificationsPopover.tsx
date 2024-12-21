'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Flex, Button, Popover } from '@radix-ui/themes'
import { BellIcon } from '@radix-ui/react-icons'
import { trpc } from '@/providers/trpc'
import { useNotifications, type Notification } from '@/providers/notifications'
import AddNotificationDialog from './AddNotificationDialog'
import ReleaseNotesDialog from './ReleaseNotesDialog'
import { useQueryClient } from '@tanstack/react-query'
import { NotificationTypeConfig } from '@/lib/notifications'

export default function NotificationsPopover() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [open, setOpen] = React.useState(false)
  const { setReleaseNotesDialogOpen, setSelectedReleaseNumber } = useNotifications()

  const { data: notifications } = trpc.notifications.list.useQuery(undefined, {
    staleTime: 1000 * 3,
    refetchInterval: 1000 * 3,
  })

  const { data: unreadCount = 0 } = trpc.notifications.unreadCount.useQuery(undefined, {
    staleTime: 1000 * 2,
    refetchInterval: 1000 * 2,
  })

  const { mutate: markAsRead } = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      // Invalidate both queries
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] })
    },
  })

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    setOpen(false)

    const config = NotificationTypeConfig[notification.type]

    if (notification.type === 'platform_update') {
      setSelectedReleaseNumber(notification.releaseNumber || '')
      setReleaseNotesDialogOpen(true)
    } else if (config.route) {
      router.push(config.route)
    }
  }

  return (
    <>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button variant="ghost" size="2" className="relative">
            <BellIcon width="20" height="20" />
            {unreadCount > 0 && (
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount > 9 ? '' : unreadCount}
              </div>
            )}
          </Button>
        </Popover.Trigger>

        <Popover.Content>
          <Flex
            direction="column"
            gap="2"
            style={{ maxWidth: '300px', maxHeight: 'calc(100vh - 120px)' }}
          >
            <div className="overflow-y-auto">
              {notifications?.map((notification) => {
                const { Icon, color, getText } = NotificationTypeConfig[notification.type]
                return (
                  <Flex
                    key={notification.id}
                    align="center"
                    gap="2"
                    className={`cursor-default p-2 ${!notification.isRead ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <Icon
                      width="32"
                      height="32"
                      className={`bg-${color} rounded-md p-2 text-white`}
                    />
                    <span className={`truncate text-sm`}>{getText(notification)}</span>
                  </Flex>
                )
              })}
            </div>

            <Flex justify="end" className="mt-2">
              <AddNotificationDialog />
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      <ReleaseNotesDialog />
    </>
  )
}
