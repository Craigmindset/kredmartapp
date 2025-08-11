"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type MerchantUser = {
  firstName: string
  lastName?: string
  email: string
  avatarUrl?: string
}

type MerchantAuthState = {
  user: MerchantUser | null
  login: (u: MerchantUser) => void
  logout: () => void
}

export const useMerchantAuth = create<MerchantAuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (u) => set({ user: u }),
      logout: () => set({ user: null }),
    }),
    { name: "kredmart-merchant-auth" },
  ),
)
