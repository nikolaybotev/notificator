'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Flex, Button, Popover } from '@radix-ui/themes'
import { BellIcon } from '@radix-ui/react-icons'
import { trpc } from '@/providers/trpc'
import { type Notification } from '@/lib/schemas'
import { useNotifications } from '@/providers/notifications'
import AddNotificationDialog from './AddNotificationDialog'
import ReleaseNotesDialog from './ReleaseNotesDialog'
import NotificationsList from './NotificationsList'
import { notificationTypes } from '@/lib/notifications'
import { notificationQueryConfig } from '@/lib/notifications'

export default function NotificationsPopover() {
  const router = useRouter()
  const utils = trpc.useUtils()
  const [open, setOpen] = React.useState(false)
  const { setReleaseNotesDialogOpen, setSelectedReleaseNumber } = useNotifications()

  const { data: unreadCount = 0 } = trpc.notifications.unreadCount.useQuery(undefined, {
    staleTime: notificationQueryConfig.unreadStaleTime,
    refetchInterval: notificationQueryConfig.unreadRefetchInterval,
  })

  const { mutate: markAsRead } = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.unreadCount.invalidate()
      utils.notifications.list.invalidate()
    },
  })

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    setOpen(false)

    const { route } = notificationTypes[notification.type]

    if (notification.type === 'platform_update') {
      setSelectedReleaseNumber(notification.releaseNumber || '')
      setReleaseNotesDialogOpen(true)
    } else if (route) {
      router.push(route)
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
            style={{
              maxWidth: 'calc(min(360px, 100dvw - 60px))',
              maxHeight: 'calc(100dvh - 120px)',
            }}
          >
            <NotificationsList onNotificationClick={handleNotificationClick} />

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
