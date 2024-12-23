'use client'

import React from 'react'
import { Button, Dialog, Flex, TextField, Select, Text } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { trpc } from '@/providers/trpc'
import { useNotifications } from '@/providers/notifications'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notificationSchema, type NotificationInput } from '@/lib/schemas'
import { notificationTypes } from '@/lib/notifications'

export default function AddNotificationDialog() {
  const { addNotificationsDialogOpen, setAddNotificationsDialogOpen } = useNotifications()
  const utils = trpc.useUtils()

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<NotificationInput>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      type: 'platform_update',
    },
    mode: 'onSubmit',
  })

  const [creating, setCreating] = React.useState(false)

  const type = watch('type')
  const showPersonName =
    type === 'comment_tag' || type === 'access_granted' || type === 'join_workspace'
  const showReleaseNumber = type === 'platform_update'

  React.useEffect(() => {
    if (!showReleaseNumber) {
      setValue('releaseNumber', undefined)
    }
    if (!showPersonName) {
      setValue('personName', undefined)
    }
    clearErrors()
  }, [showPersonName, showReleaseNumber, setValue, clearErrors])

  const { mutate: createNotification } = trpc.notifications.create.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate()
      utils.notifications.unreadCount.invalidate()
      setAddNotificationsDialogOpen(false)
      reset()
    },
    onError: (error) => {
      console.log(`Error ${error}`)
      setError('root', { message: 'Error creating notification' })
    },
    onSettled: () => {
      setCreating(false)
    },
  })

  const onSubmit = (data: NotificationInput) => {
    setCreating(true)
    createNotification(data)
  }

  return (
    <Dialog.Root
      open={addNotificationsDialogOpen}
      onOpenChange={(open) => {
        setAddNotificationsDialogOpen(open)
        if (!open) {
          setCreating(false)
          reset()
        }
      }}
    >
      <Dialog.Trigger>
        <Button variant="soft" size="3">
          <PlusIcon width="20" height="20" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Add Notification</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select.Root value={field.value} onValueChange={field.onChange}>
                    <Select.Trigger />
                    <Select.Content>
                      {Object.entries(notificationTypes).map(([value, { label }]) => (
                        <Select.Item key={value} value={value}>
                          {label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  {error && (
                    <Text color="red" size="2">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />

            {showPersonName && (
              <Controller
                name="personName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField.Root>
                      <TextField.Input autoFocus={true} placeholder="Person name" {...field} />
                    </TextField.Root>
                    {error && (
                      <Text color="red" size="2">
                        {error.message}
                      </Text>
                    )}
                  </>
                )}
              />
            )}

            {showReleaseNumber && (
              <Controller
                name="releaseNumber"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField.Root>
                      <TextField.Input
                        autoFocus={true}
                        placeholder="Release number (e.g., 2.1.0)"
                        {...field}
                      />
                    </TextField.Root>
                    {error && (
                      <Text color="red" size="2">
                        {error.message}
                      </Text>
                    )}
                  </>
                )}
              />
            )}

            {errors[''] && (
              <Text color="red" size="2">
                {errors[''].message}
              </Text>
            )}

            {errors['root'] && (
              <Text color="red" size="2">
                {errors['root'].message}
              </Text>
            )}

            <Flex gap="3" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" type="button">
                  Close
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={creating}>
                Create
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
