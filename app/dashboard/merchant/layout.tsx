import type React from "react"
import MerchantRequireAuth from "@/components/merchant/merchant-require-auth"
import MerchantShell from "@/components/merchant/merchant-shell"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MerchantRequireAuth>
      <MerchantShell>{children}</MerchantShell>
    </MerchantRequireAuth>
  )
}
