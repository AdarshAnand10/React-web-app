"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react"
import { useUserData } from "@/context/UserDataContext"
import dynamic from "next/dynamic"

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function RichTextPage() {
  const { userData } = useUserData()
  const [editorContent, setEditorContent] = useState("")

  // Modules for the Quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  }

  // Generate HTML content from user data
  useEffect(() => {
    if (userData) {
      const content = `
        <h1>${userData.name || "No Name"}</h1>
        <p><strong>Email:</strong> ${userData.email || "No Email"}</p>
        <p><strong>Phone:</strong> ${userData.phone || "No Phone"}</p>
        <p><strong>Address:</strong> ${userData.address || "No Address"}</p>
        <p><strong>ID:</strong> ${userData.id || "No ID"}</p>
      `
      setEditorContent(content)
    }
  }, [userData])

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Rich Text Editor</Heading>

        <Text>This page displays your user data in a rich text editor. You can edit and format the content.</Text>

        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>User Data Visualization</Tab>
            <Tab>Free Editor</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                {userData ? (
                  <Box>
                    <Heading size="md" mb={4}>
                      User Data
                    </Heading>
                    <ReactQuill value={editorContent} onChange={setEditorContent} modules={modules} theme="snow" />
                  </Box>
                ) : (
                  <Text>No user data available. Please fill out the user form first.</Text>
                )}
              </Box>
            </TabPanel>

            <TabPanel>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <Heading size="md" mb={4}>
                  Free Text Editor
                </Heading>
                <ReactQuill value={editorContent} onChange={setEditorContent} modules={modules} theme="snow" />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Divider />

        <Box>
          <Heading size="md" mb={4}>
            Preview
          </Heading>
          <Box borderWidth="1px" borderRadius="lg" p={4} dangerouslySetInnerHTML={{ __html: editorContent }} />
        </Box>
      </VStack>
    </Container>
  )
}

