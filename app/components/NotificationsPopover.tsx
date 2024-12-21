'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Flex, Button, Popover } from '@radix-ui/themes'
import { BellIcon, PersonIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { trpc } from '@/providers/trpc'
import { useNotifications, type Notification } from '@/providers/notifications'
import AddNotificationDialog from './AddNotificationDialog'
import ReleaseNotesDialog from './ReleaseNotesDialog'
import { useQueryClient } from '@tanstack/react-query'

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

    switch (notification.type) {
      case 'platform_update':
        setSelectedReleaseNumber(notification.releaseNumber || '')
        setReleaseNotesDialogOpen(true)
        break
      case 'comment_tag':
        router.push('/comments')
        break
      case 'access_granted':
        router.push('/chats')
        break
      case 'join_workspace':
        router.push('/workspace')
        break
    }
  }

  const getNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case 'platform_update':
        return {
          icon: <InfoCircledIcon width="16" height="16" />,
          text: `New features - see what's new`,
        }
      case 'comment_tag':
        return {
          icon: <PersonIcon width="16" height="16" />,
          text: `${notification.personName} tagged you in a comment`,
        }
      case 'access_granted':
        return {
          icon: <PersonIcon width="16" height="16" />,
          text: `${notification.personName} shared a chat with you`,
        }
      case 'join_workspace':
        return {
          icon: <PersonIcon width="16" height="16" />,
          text: `${notification.personName} joined your workspace`,
        }
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
                const { icon, text } = getNotificationContent(notification)
                return (
                  <Flex
                    key={notification.id}
                    align="center"
                    gap="2"
                    className={`cursor-default p-2 ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {icon}
                    <span className="truncate text-sm">{text}</span>
                  </Flex>
                )
              })}
            </div>

            <Flex justify="end" className="mt-2 border-t pt-2">
              <AddNotificationDialog />
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      <ReleaseNotesDialog />
    </>
  )
}
