import client from './client'
import type { User } from '../types'

export const login = async (phone: string, password: string) => {
  const { data } = await client.post<{ accessToken: string; user: User }>('/auth/login', { phone, password })
  localStorage.setItem('token', data.accessToken)
  return data
}

export const logout = async () => {
  await client.post('/auth/logout').catch(() => {})
  localStorage.removeItem('token')
}

export const me = async (): Promise<User> => (await client.get('/auth/me')).data

export const updatePassword = async (userId: string, currentPassword: string, newPassword: string) =>
  (await client.patch(`/users/${userId}/password`, { currentPassword, newPassword })).data
