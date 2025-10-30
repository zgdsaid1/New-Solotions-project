// In-memory user storage for demo purposes when MongoDB is unavailable
interface InMemoryUser {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
}

const users: InMemoryUser[] = []

export const inMemoryUserStore = {
  findByEmail: (email: string): InMemoryUser | undefined => {
    return users.find(user => user.email === email)
  },
  
  create: (userData: { email: string; name: string; password: string }): InMemoryUser => {
    const user: InMemoryUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      password: userData.password,
      createdAt: new Date()
    }
    users.push(user)
    return user
  },
  
  findById: (id: string): InMemoryUser | undefined => {
    return users.find(user => user.id === id)
  },
  
  updateById: (id: string, updates: Partial<InMemoryUser>): InMemoryUser | undefined => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return undefined
    
    users[userIndex] = { ...users[userIndex], ...updates }
    return users[userIndex]
  }
}