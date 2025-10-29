import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, authApi, setAuthToken } from '../services/api'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, name: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // In a real app, you might want to store token in localStorage/sessionStorage
        // For this example, we'll keep it in memory only
        setIsLoading(false)
      } catch (error) {
        console.error('Auth initialization error:', error)
        setIsLoading(false)
      }
    }
    
    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.login({ email, password })
      
      setToken(response.token)
      setUser(response.user)
      setAuthToken(response.token)
      
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const register = async (email: string, name: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.register({ email, name, password })
      
      setToken(response.token)
      setUser(response.user)
      setAuthToken(response.token)
      
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setAuthToken(null)
  }

  const updateProfile = async (name: string) => {
    try {
      const response = await authApi.updateProfile({ name })
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}