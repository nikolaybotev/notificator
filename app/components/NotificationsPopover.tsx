'use client'

import React from "react"
import { Flex, Button, Popover, Dialog, TextField } from "@radix-ui/themes"
import { BellIcon, PersonIcon, PlusIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import AddNotificationDialog from "./AddNotificationDialog"

type Notification = {
  id: number
  text: string
  type: 'user' | 'system'
  isRead: boolean
}

type Props = {
  unreadCount: number
  notifications: Notification[]
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export default function NotificationsPopover({ unreadCount, notifications, dialogOpen, setDialogOpen }: Props) {
  return (
    <Popover.Root>
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
          {notifications.map((notification) => (
            <Flex key={notification.id} 
              align="center" 
              gap="2" 
              className={`p-2 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
            >
              {notification.type === 'user' ? (
                <PersonIcon width="16" height="16" />
              ) : (
                <InfoCircledIcon width="16" height="16" />
              )}
              <span className="text-sm truncate">{notification.text}</span>
            </Flex>
          ))}

          <Flex justify="end" className="border-t pt-2 mt-2">
            <AddNotificationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
} 