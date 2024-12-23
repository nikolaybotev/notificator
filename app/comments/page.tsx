import React from 'react'
import { Heading, Container } from '@radix-ui/themes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comments',
  description: 'View comments and mentions',
}

export default function CommentsPage() {
  return (
    <Container size="3" className="py-20">
      <Heading size="9" className="tracking-tight">
        Comments
      </Heading>
    </Container>
  )
}
