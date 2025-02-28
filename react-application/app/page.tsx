"use client"

import { Box, Heading, Text, Button, VStack, Container, useColorModeValue } from "@chakra-ui/react"
import { useSpring, animated } from "@react-spring/web"
import { useRouter } from "next/navigation"

const AnimatedBox = animated(Box)

export default function Home() {
  const router = useRouter()

  const props = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 120, friction: 14 },
  })

  const bg = useColorModeValue("gray.50", "gray.900")

  return (
    <Container maxW="container.xl" py={10}>
      <AnimatedBox style={props}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h1" size="2xl">
            React Application
          </Heading>
          <Text fontSize="xl">A comprehensive application with Counter, User Form, and Rich Text Editor</Text>
          <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
            <Button colorScheme="blue" size="lg" onClick={() => router.push("/counter")}>
              Counter
            </Button>
            <Button colorScheme="green" size="lg" onClick={() => router.push("/user-form")}>
              User Form
            </Button>
            <Button colorScheme="purple" size="lg" onClick={() => router.push("/rich-text")}>
              Rich Text Editor
            </Button>
            <Button colorScheme="orange" size="lg" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
          </Box>
        </VStack>
      </AnimatedBox>
    </Container>
  )
}

