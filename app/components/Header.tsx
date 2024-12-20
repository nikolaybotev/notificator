'use client'

import React from "react"
import { Container, Flex, Link, Button, DropdownMenu, Popover, Dialog, TextField } from "@radix-ui/themes"
import NextLink from "next/link"
import { HamburgerMenuIcon, BellIcon, PersonIcon, PlusIcon, InfoCircledIcon } from "@radix-ui/react-icons"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/comments", label: "Comments" },
  { href: "/chats", label: "Chats" },
  { href: "/workspace", label: "Workspace" },
]

type Notification = {
  id: number
  text: string
  type: 'user' | 'system'
  isRead: boolean
}

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<Notification[]>([
    { id: 1, text: "John commented on your post", type: 'user', isRead: false },
    { id: 2, text: "System maintenance scheduled", type: 'system', isRead: true },
    { id: 3, text: "New feature available", type: 'system', isRead: false },
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <Container size="3" className="py-4">
      <Flex gap="6" align="center" justify="between" className="h-10">
        {/* Desktop Navigation */}
        <div className="hidden sm:flex h-full items-center">
          <Flex gap="6" align="center">
            {LINKS.map(({ href, label }) => (
              <NextLink key={href} href={href} passHref legacyBehavior>
                <Link>{label}</Link>
              </NextLink>
            ))}
          </Flex>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden h-full flex items-center">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger>
              <Button variant="soft" className="h-10">
                <HamburgerMenuIcon width="16" height="16" />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              {LINKS.map(({ href, label }) => (
                <DropdownMenu.Item key={href} onClick={() => setOpen(false)} className="hover:bg-inherit">
                  <NextLink href={href} passHref legacyBehavior>
                    <Link>
                      {label}
                    </Link>
                  </NextLink>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        {/* Bell Icon with Popover */}
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
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                  <Dialog.Trigger>
                    <Button variant="soft" size="1">
                      <PlusIcon width="16" height="16" />
                    </Button>
                  </Dialog.Trigger>

                  <Dialog.Content>
                    <Dialog.Title>Add Notification</Dialog.Title>
                    <Flex direction="column" gap="3">
                      <TextField.Root>
                        <TextField.Input placeholder="Notification text..." />
                      </TextField.Root>
                      <Flex gap="3" justify="end">
                        <Dialog.Close>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Button>Add</Button>
                      </Flex>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Container>
  )
} 