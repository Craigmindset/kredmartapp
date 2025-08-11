import type React from "react"
import { AdminRequireAuth } from "@/components/admin/admin-require-auth"
import { AdminShell } from "@/components/admin/admin-shell"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRequireAuth>
      <AdminShell>{children}</AdminShell>
    </AdminRequireAuth>
  )
}
