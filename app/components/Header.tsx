'use client'

import React from 'react'
import { Container, Flex, Link, Button, DropdownMenu } from '@radix-ui/themes'
import NextLink from 'next/link'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import NotificationsPopover from './NotificationsPopover'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/comments', label: 'Comments' },
  { href: '/chats', label: 'Chats' },
  { href: '/workspace', label: 'Workspace' },
] as const

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const isSmallScreen = useMediaQuery('(min-width: 640px)')

  // Close mobile navigation dropdown when screen size changes to sm or larger
  React.useEffect(() => {
    if (isSmallScreen) {
      setOpen(false)
    }
  }, [isSmallScreen])

  return (
    <Container size="3" className="py-4">
      <Flex gap="6" align="center" justify="between" className="h-10">
        {/* Desktop Navigation */}
        <div className="hidden h-full items-center sm:flex">
          <Flex gap="6" align="center">
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <NextLink key={href} href={href} passHref legacyBehavior>
                <Link>{label}</Link>
              </NextLink>
            ))}
          </Flex>
        </div>

        {/* Mobile Navigation */}
        <div className="flex h-full items-center sm:hidden">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger>
              <Button variant="soft" className="h-10">
                <HamburgerMenuIcon width="16" height="16" />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              {NAVIGATION_LINKS.map(({ href, label }) => (
                <DropdownMenu.Item
                  key={href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-inherit"
                >
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
