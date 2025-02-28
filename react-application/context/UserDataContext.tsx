"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

interface UserDataContextType {
  userData: UserData | null
  setUserData: (data: UserData) => void
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  return <UserDataContext.Provider value={{ userData, setUserData }}>{children}</UserDataContext.Provider>
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider")
  }
  return context
}

