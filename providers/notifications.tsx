'use client'

import React, { createContext, useContext, useState } from 'react'

export type Notification = {
  id: number
  type: 'platform_update' | 'comment_tag' | 'access_granted' | 'join_workspace'
  isRead: boolean
  personName?: string
  releaseNumber?: string
}

type NotificationsContextType = {
  addNotificationsDialogOpen: boolean
  setAddNotificationsDialogOpen: (open: boolean) => void
  releaseNotesDialogOpen: boolean
  setReleaseNotesDialogOpen: (open: boolean) => void
  selectedReleaseNumber: string
  setSelectedReleaseNumber: (version: string) => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [addNotificationsDialogOpen, setAddNotificationsDialogOpen] = useState(false)
  const [releaseNotesDialogOpen, setReleaseNotesDialogOpen] = useState(false)
  const [selectedReleaseNumber, setSelectedReleaseNumber] = useState('')

  return (
    <NotificationsContext.Provider
      value={{
        addNotificationsDialogOpen,
        setAddNotificationsDialogOpen,
        releaseNotesDialogOpen,
        setReleaseNotesDialogOpen,
        selectedReleaseNumber,
        setSelectedReleaseNumber,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}
