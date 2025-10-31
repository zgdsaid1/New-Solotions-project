import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

export interface JwtPayload {
  userId: string
  email: string
}

export const generateToken = (payload: JwtPayload): string => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  // @ts-ignore - expiresIn type compatibility issue
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}