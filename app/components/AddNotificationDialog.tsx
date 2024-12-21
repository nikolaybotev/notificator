'use client'

import React from "react"
import { Button, Dialog, Flex, TextField, Select, Text } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { trpc } from '@/providers/trpc'
import { useNotifications } from '@/providers/notifications'

const NOTIFICATION_TYPES = [
  { value: 'platform_update', label: 'Platform Update' },
  { value: 'comment_tag', label: 'Comment Tag' },
  { value: 'access_granted', label: 'Access Granted' },
  { value: 'join_workspace', label: 'Join Workspace' }
] as const

export default function AddNotificationDialog() {
  const { addNotificationsDialogOpen, setAddNotificationsDialogOpen } = useNotifications()
  const [type, setType] = React.useState<typeof NOTIFICATION_TYPES[number]['value']>('platform_update')

  const showPersonName = type === 'comment_tag' || type === 'access_granted' || type === 'join_workspace'
  const showReleaseNumber = type === 'platform_update'

  const [personName, setPersonName] = React.useState('')
  const [releaseNumber, setReleaseNumber] = React.useState('')
  const utils = trpc.useUtils()

  const [error, setError] = React.useState('')

  const { mutate: createNotification } = trpc.notifications.create.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate()
      utils.notifications.unreadCount.invalidate()
      setAddNotificationsDialogOpen(false)
      setPersonName('')
      setReleaseNumber('')
      setError('')
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const handleSubmit = () => {
    if (!personName && !releaseNumber) return

    createNotification({
      type,
      ...(showReleaseNumber ? { releaseNumber } : {}),
      ...(showPersonName ? { personName } : {})
    })
  }

  return (
    <Dialog.Root open={addNotificationsDialogOpen} onOpenChange={setAddNotificationsDialogOpen}>
      <Dialog.Trigger>
        <Button variant="soft" size="1">
          <PlusIcon width="16" height="16" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Add Notification</Dialog.Title>
        <Flex direction="column" gap="3">
          <Select.Root 
            value={type} 
            onValueChange={(value) => setType(value as typeof type)}
          >
            <Select.Trigger />
            <Select.Content>
              {NOTIFICATION_TYPES.map(({ value, label }) => (
                <Select.Item key={value} value={value}>
                  {label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          {showPersonName && (
            <TextField.Root>
              <TextField.Input placeholder="Person name" value={personName}
              onChange={(e) => setPersonName(e.target.value)} />
            </TextField.Root>
          )}

          {showReleaseNumber && (
            <TextField.Root>
              <TextField.Input 
                placeholder="Release number (e.g., 2.1.0)" 
                value={releaseNumber}
                onChange={(e) => {
                  setError('')
                  setReleaseNumber(e.target.value)
                }} 
              />
            </TextField.Root>
          )}

          {error && (
            <Text color="red" size="2">
              {error}
            </Text>
          )}

          <Flex gap="3" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Close
              </Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>Create</Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
} 