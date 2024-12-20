'use client'

import React from "react"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  releaseNumber: string
}

export default function ReleaseNotesDialog({ open, onOpenChange, releaseNumber }: Props) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content>
        <AlertDialog.Title>{releaseNumber}</AlertDialog.Title>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
} 