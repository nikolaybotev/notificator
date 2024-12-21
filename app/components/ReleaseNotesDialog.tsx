'use client'

import React from "react"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useNotifications } from '@/providers/notifications'

export default function ReleaseNotesDialog() {
  const { releaseNotesDialogOpen, setReleaseNotesDialogOpen, selectedReleaseNumber } = useNotifications()

  return (
    <AlertDialog.Root open={releaseNotesDialogOpen} onOpenChange={setReleaseNotesDialogOpen}>
      <AlertDialog.Content>
        <AlertDialog.Title>{selectedReleaseNumber}</AlertDialog.Title>

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