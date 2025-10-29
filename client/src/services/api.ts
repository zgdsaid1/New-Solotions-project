import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/api'

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Token management
let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Types
export interface User {
  id: string
  email: string
  name: string
  createdAt?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  name: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

// API functions
export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/user/profile')
    return response.data
  },

  updateProfile: async (data: { name: string }): Promise<{ message: string; user: User }> => {
    const response = await api.put('/user/profile', data)
    return response.data
  },
}

export default api