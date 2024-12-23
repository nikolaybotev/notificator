import React from 'react'
import { Container, Heading, Text, Flex } from '@radix-ui/themes'

export default function Home() {
  return (
    <main>
      <Container size="3" className="py-20">
        <Flex direction="column" gap="4" align="center" className="text-center">
          <Heading size="9" className="tracking-tight">
            Welcome to Notificator
          </Heading>
          <Text size="5" className="text-gray-500">
            A modern web application built with Next.js and Radix UI
          </Text>
        </Flex>
      </Container>
    </main>
  )
}
