'use client'

import React from "react"
import { Container, Flex, Link, Button, DropdownMenu } from "@radix-ui/themes"
import NextLink from "next/link"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import NotificationsPopover from "./NotificationsPopover"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/comments", label: "Comments" },
  { href: "/chats", label: "Chats" },
  { href: "/workspace", label: "Workspace" },
]

export default function Header() {
  const [open, setOpen] = React.useState(false)

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
                    <Link>{label}</Link>
                  </NextLink>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        {/* Bell Icon with Popover */}
        <NotificationsPopover />
      </Flex>
    </Container>
  )
} 