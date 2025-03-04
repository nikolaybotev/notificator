import React from 'react'
import { Heading, Container } from '@radix-ui/themes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workspace',
  description: 'Manage your workspace settings and members',
}

export default function WorkspacePage() {
  return (
    <Container size="3" className="py-20">
      <Heading size="9" className="tracking-tight">
        Workspace
      </Heading>
    </Container>
  )
}
