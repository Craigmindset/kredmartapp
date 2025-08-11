"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useMerchantAuth } from "@/store/merchant-auth-store"

export default function MerchantRequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const user = useMerchantAuth((s) => s.user)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated((useMerchantAuth as any).persist?.hasHydrated?.() ?? false)
    const unsub = (useMerchantAuth as any).persist?.onFinishHydration?.(() => setHydrated(true))
    return () => {
      if (typeof unsub === "function") unsub()
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (!user) {
      const next = pathname || "/dashboard/merchant"
      router.replace(`/admindesk?next=${encodeURIComponent(next)}`)
    }
  }, [hydrated, user, router, pathname])

  if (!hydrated) return null
  if (!user) return null
  return <>{children}</>
}
