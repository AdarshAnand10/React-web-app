"use client"

import type React from "react"

import { ChakraProvider, Box } from "@chakra-ui/react"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/context/AuthContext"
import { UserDataProvider } from "@/context/UserDataContext"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <UserDataProvider>
        <ChakraProvider>
          <Box minH="100vh">
            <Navbar />
            <Box as="main" p={4}>
              {children}
            </Box>
          </Box>
        </ChakraProvider>
      </UserDataProvider>
    </AuthProvider>
  )
}

