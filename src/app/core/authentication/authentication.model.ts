import { User } from '@core/dto'

export interface SessionStorage {
  user: User
}

export interface AuthenticationResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  refreshToken: string
}

export interface LoginContext {
  username: string
  password: string
  remember?: boolean
}
