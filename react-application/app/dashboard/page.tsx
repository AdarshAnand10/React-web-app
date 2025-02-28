"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardHeader,
  CardBody,
  Divider,
  VStack,
} from "@chakra-ui/react"
import { useUserData } from "@/context/UserDataContext"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

// Import charts dynamically to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function DashboardPage() {
  const { userData } = useUserData()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [count, setCount] = useState(0)
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "counter-chart",
      },
      xaxis: {
        categories: Array.from({ length: 10 }, (_, i) => i.toString()),
      },
    },
    series: [
      {
        name: "Counter Value",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Load counter from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem("counter")
    if (savedCount) {
      setCount(Number.parseInt(savedCount))
    }

    // Generate random data for the chart
    const randomData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    setChartData((prev) => ({
      ...prev,
      series: [
        {
          name: "Counter Value",
          data: randomData,
        },
      ],
    }))
  }, [])

  if (!isAuthenticated) {
    return null // Will redirect in the useEffect
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Dashboard</Heading>

        <Text>Welcome to your dashboard. Here you can see your counter statistics and user profile information.</Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Card>
            <CardHeader>
              <Heading size="md">Counter</Heading>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatLabel>Current Value</StatLabel>
                <StatNumber>{count}</StatNumber>
                <StatHelpText>Updated in real-time</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">User Profile</Heading>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatLabel>Name</StatLabel>
                <StatNumber>{userData?.name || "Not set"}</StatNumber>
                <StatHelpText>User ID: {userData?.id || "Not generated"}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Authentication</Heading>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatLabel>Status</StatLabel>
                <StatNumber>{isAuthenticated ? "Logged In" : "Logged Out"}</StatNumber>
                <StatHelpText>User: {user?.email || "None"}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Divider />

        <Box>
          <Heading size="md" mb={4}>
            Counter Trend
          </Heading>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            {typeof window !== "undefined" && (
              <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
            )}
          </Box>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            User Activity
          </Heading>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            {typeof window !== "undefined" && (
              <Chart
                options={{
                  chart: {
                    id: "user-activity",
                  },
                  labels: ["Form Submissions", "Counter Interactions", "Text Edits", "Login Events"],
                }}
                series={[44, 55, 13, 33]}
                type="donut"
                height={350}
              />
            )}
          </Box>
        </Box>
      </VStack>
    </Container>
  )
}

