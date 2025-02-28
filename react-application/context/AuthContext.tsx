"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call an authentication API
    // For demo purposes, we'll just simulate a successful login
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (email && password) {
          const newUser = {
            id: "user-" + Math.random().toString(36).substr(2, 9),
            email,
            displayName: email.split("@")[0],
          }

          setUser(newUser)
          setIsAuthenticated(true)
          localStorage.setItem("user", JSON.stringify(newUser))
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  // Mock signup function
  const signup = async (email: string, password: string, name: string) => {
    // In a real app, this would call an authentication API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const newUser = {
            id: "user-" + Math.random().toString(36).substr(2, 9),
            email,
            displayName: name,
          }

          setUser(newUser)
          setIsAuthenticated(true)
          localStorage.setItem("user", JSON.stringify(newUser))
          resolve()
        } else {
          reject(new Error("Invalid information"))
        }
      }, 1000)
    })
  }

  // Mock Google login
  const loginWithGoogle = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: "google-user-" + Math.random().toString(36).substr(2, 9),
          email: "user@example.com",
          displayName: "Google User",
          photoURL: "https://bit.ly/broken-link",
        }

        setUser(newUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(newUser))
        resolve()
      }, 1000)
    })
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

