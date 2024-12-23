import React from 'react'
import { Heading, Container } from '@radix-ui/themes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chats',
  description: 'View and manage your shared chats',
}

export default function ChatsPage() {
  return (
    <Container size="3" className="py-20">
      <Heading size="9" className="tracking-tight">
        Chats
      </Heading>
    </Container>
  )
}
