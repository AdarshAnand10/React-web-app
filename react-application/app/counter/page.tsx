"use client"

import { useState, useEffect } from "react"
import { Box, Button, VStack, Text, HStack, Container, Heading } from "@chakra-ui/react"
import { useSpring, animated } from "@react-spring/web"
import { bezier } from "@react-spring/web"

const AnimatedBox = animated(Box)

export default function CounterPage() {
  const [count, setCount] = useState(0)

  // Load count from localStorage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem("counter")
    if (savedCount) {
      setCount(Number.parseInt(savedCount))
    }
  }, [])

  // Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("counter", count.toString())
  }, [count])

  // Calculate background height based on count
  const maxHeight = 300 // Maximum height in pixels
  const maxCount = 50 // Count at which we reach max height
  const heightPercentage = Math.min(count / maxCount, 1) * 100

  // Bezier curve for smoother animation
  const easingFunction = bezier(0.25, 0.1, 0.25, 1)

  const backgroundProps = useSpring({
    height: `${heightPercentage}%`,
    backgroundColor: `rgba(66, 153, 225, ${heightPercentage / 100})`,
    config: {
      duration: 500,
      easing: (t) => easingFunction(t),
    },
  })

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => Math.max(0, prev - 1))
  const reset = () => setCount(0)

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="center">
        <Heading>Counter Component</Heading>

        <Box
          position="relative"
          w="100%"
          h="300px"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
        >
          <AnimatedBox position="absolute" bottom="0" left="0" width="100%" style={backgroundProps} />

          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            zIndex="1"
          >
            <Text fontSize="6xl" fontWeight="bold">
              {count}
            </Text>

            <HStack spacing={4} mt={4}>
              <Button colorScheme="blue" onClick={increment}>
                Increment
              </Button>
              <Button colorScheme="yellow" onClick={decrement}>
                Decrement
              </Button>
              <Button colorScheme="red" onClick={reset}>
                Reset
              </Button>
            </HStack>
          </Box>
        </Box>

        <Text>
          The background color and height increase as the counter increases. Reset will set the counter and background
          to zero.
        </Text>
      </VStack>
    </Container>
  )
}

