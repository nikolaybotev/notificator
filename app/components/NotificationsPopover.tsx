'use client'

import React from "react"
import { useRouter } from "next/navigation"
import { Flex, Button, Popover, Dialog, TextField, AlertDialog } from "@radix-ui/themes"
import { BellIcon, PersonIcon, PlusIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import AddNotificationDialog from "./AddNotificationDialog"
import ReleaseNotesDialog from "./ReleaseNotesDialog"
import { trpc } from '@/providers/trpc'

type Notification = {
  id: number
  type: 'platform_update' | 'comment_tag' | 'access_granted' | 'join_workspace'
  isRead: boolean
  personName?: string
  releaseNumber?: string
}

type Props = {
  unreadCount: number
  notifications: Notification[]
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  onNotificationRead: (id: number) => void
}

export default function NotificationsPopover({ 
  unreadCount, 
  dialogOpen, 
  setDialogOpen,
  onNotificationRead 
}: Props) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [selectedRelease, setSelectedRelease] = React.useState<string>('')

  const { data: notifications } = trpc.notifications.list.useQuery()
  const utils = trpc.useUtils()
  const { mutate: markAsRead } = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate()
    }
  })

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    setOpen(false)

    switch (notification.type) {
      case 'platform_update':
        setSelectedRelease(notification.releaseNumber || '')
        setAlertOpen(true)
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
          text: `New features - see what's new in ${notification.releaseNumber}`
        }
      case 'comment_tag':
        return {
          icon: <PersonIcon width="16" height="16" />,
          text: `${notification.personName} tagged you in a comment`
        }
      case 'access_granted':
        return {
          icon: <PersonIcon width="16" height="16" />,
          text: `${notification.personName} shared a chat with you`
        }
      case 'join_workspace':
        return {
          icon: <PersonIcon width="16" height="16" />,
          text: `${notification.personName} joined your workspace`
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
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {unreadCount > 9 ? '' : unreadCount}
              </div>
            )}
          </Button>
        </Popover.Trigger>

        <Popover.Content>
          <Flex direction="column" gap="2" style={{ maxWidth: '300px' }}>
            {notifications?.map((notification) => {
              const { icon, text } = getNotificationContent(notification)
              return (
                <Flex key={notification.id} 
                  align="center" 
                  gap="2" 
                  className={`p-2 cursor-default ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {icon}
                  <span className="text-sm truncate">{text}</span>
                </Flex>
              )
            })}

            <Flex justify="end" className="border-t pt-2 mt-2">
              <AddNotificationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      <ReleaseNotesDialog 
        open={alertOpen}
        onOpenChange={setAlertOpen}
        releaseNumber={selectedRelease}
      />
    </>
  )
} 