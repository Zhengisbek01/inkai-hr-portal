import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'
import { login as apiLogin, logout as apiLogout } from '../api/auth'

interface AuthStore {
  user: User | null
  theme: 'dark' | 'light'
  loading: boolean
  login:    (phone: string, password: string) => Promise<void>
  logout:   () => Promise<void>
  setUser:  (u: User) => void
  setTheme: (t: 'dark' | 'light') => void
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      theme: 'dark',
      loading: false,
      login: async (phone, password) => {
        set({ loading: true })
        try {
          const { user } = await apiLogin(phone, password)
          set({ user, theme: (user.theme as any) || 'dark' })
        } finally {
          set({ loading: false })
        }
      },
      logout: async () => {
        await apiLogout()
        set({ user: null })
      },
      setUser:  (user)  => set({ user }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'inkai_auth', partialize: (s) => ({ user: s.user, theme: s.theme }) }
  )
)
