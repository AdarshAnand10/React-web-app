"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Heading,
  Text,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  HStack,
  Icon,
} from "@chakra-ui/react"
import { FaGoogle } from "react-icons/fa"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useSpring, animated } from "@react-spring/web"

const AnimatedBox = animated(Box)

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const { login, signup, loginWithGoogle } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 120, friction: 14 },
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(email, password, name)
      toast({
        title: "Account created",
        description: "Your account has been successfully created",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please check your information and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.md" py={10}>
      <AnimatedBox style={fadeIn}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center">Authentication</Heading>

          <Button
            leftIcon={<Icon as={FaGoogle} />}
            colorScheme="red"
            variant="outline"
            onClick={handleGoogleLogin}
            size="lg"
            w="full"
            maxW="400px"
            mx="auto"
          >
            Sign in with Google
          </Button>

          <HStack>
            <Divider />
            <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
              OR
            </Text>
            <Divider />
          </HStack>

          <Tabs isFitted variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box as="form" onSubmit={handleLogin} p={6} borderWidth="1px" borderRadius="lg">
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                    </FormControl>

                    <Button mt={4} colorScheme="blue" type="submit">
                      Login
                    </Button>
                  </VStack>
                </Box>
              </TabPanel>

              <TabPanel>
                <Box as="form" onSubmit={handleSignup} p={6} borderWidth="1px" borderRadius="lg">
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                    </FormControl>

                    <Button mt={4} colorScheme="blue" type="submit">
                      Sign Up
                    </Button>
                  </VStack>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            This is a mock authentication system for demonstration purposes.
          </Text>
        </VStack>
      </AnimatedBox>
    </Container>
  )
}

