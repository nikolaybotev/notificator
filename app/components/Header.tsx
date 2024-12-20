'use client'

import React from "react"
import { Container, Flex, Link, Button, DropdownMenu } from "@radix-ui/themes"
import NextLink from "next/link"
import { HamburgerMenuIcon, BellIcon } from "@radix-ui/react-icons"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/comments", label: "Comments" },
  { href: "/chats", label: "Chats" },
  { href: "/workspace", label: "Workspace" },
]

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const unreadCount = 3 // You can make this dynamic later

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

        {/* Bell Icon with notification badge */}
        <Button variant="ghost" size="2" className="relative">
          <BellIcon width="20" height="20" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {unreadCount > 9 ? '' : unreadCount}
            </div>
          )}
        </Button>

      </Flex>
    </Container>
  )
} 