'use client'

import React from "react"
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddNotificationDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
  )
} 