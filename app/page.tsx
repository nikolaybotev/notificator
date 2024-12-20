import React from "react"
import { Container, Heading, Text, Button, Flex } from "@radix-ui/themes"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function Home() {
  return (
    <main>
      <Container size="3" className="py-20">
        <Flex direction="column" gap="4" align="center" className="text-center">
          <Heading size="9" className="tracking-tight">
            Welcome to Next.js 14
          </Heading>
          <Text size="5" className="text-gray-500">
            A modern web application built with Next.js and Radix UI
          </Text>
          <Flex gap="4" mt="4">
            <Button size="3">
              Get Started
              <ArrowRightIcon />
            </Button>
            <Button size="3" variant="soft">
              Documentation
            </Button>
          </Flex>
        </Flex>
      </Container>
    </main>
  )
} 