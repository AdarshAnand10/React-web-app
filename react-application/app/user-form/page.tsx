"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react"
import { useUserData } from "@/context/UserDataContext"
import { v4 as uuidv4 } from "uuid"

interface UserFormData {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

const initialFormData: UserFormData = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
}

export default function UserFormPage() {
  const { userData, setUserData } = useUserData()
  const [formData, setFormData] = useState<UserFormData>(initialFormData)
  const [isDirty, setIsDirty] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // Load user data from context on component mount
  useEffect(() => {
    if (userData) {
      setFormData(userData)
    }
  }, [userData])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setIsDirty(true)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate ID if it doesn't exist
    const dataToSave = formData.id ? formData : { ...formData, id: uuidv4() }

    // Save to context and localStorage
    setUserData(dataToSave)
    localStorage.setItem("userData", JSON.stringify(dataToSave))

    setIsDirty(false)

    toast({
      title: "User data saved",
      description: "We've saved your user information",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  // Handle beforeunload event to show browser confirmation dialog
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isDirty])

  // Handle navigation within the app
  const handleNavigation = useCallback(() => {
    if (isDirty) {
      onOpen()
      return
    }
  }, [isDirty, onOpen])

  useEffect(() => {
    // This would be used with a router to intercept navigation
    // For Next.js App Router, you'd need to use the router events
    // This is a simplified version
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" && isDirty) {
        e.preventDefault()
        handleNavigation()
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [isDirty, handleNavigation])

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>User Data Form</Heading>

        {isDirty && (
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Unsaved changes!</AlertTitle>
            <AlertDescription>You have unsaved changes. Please save your data before leaving.</AlertDescription>
          </Alert>
        )}

        <Box as="form" onSubmit={handleSubmit} p={6} borderWidth="1px" borderRadius="lg">
          <VStack spacing={4} align="stretch">
            {formData.id && (
              <FormControl isReadOnly>
                <FormLabel>User ID</FormLabel>
                <Input value={formData.id} />
              </FormControl>
            )}

            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" />
            </FormControl>

            <Button mt={4} colorScheme="blue" type="submit" isDisabled={!isDirty}>
              Save User Data
            </Button>
          </VStack>
        </Box>

        <Text fontSize="sm" color="gray.500">
          Your data will be saved to local storage. A unique ID will be generated for new users.
        </Text>
      </VStack>

      {/* Unsaved Changes Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unsaved Changes</ModalHeader>
          <ModalBody>You have unsaved changes. Would you like to save them before leaving?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Discard Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

