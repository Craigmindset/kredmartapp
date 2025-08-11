"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAdminAuthStore } from "@/store/admin-auth-store"

export default function AdminSignInPage() {
  const router = useRouter()
  const signInDemo = useAdminAuthStore((s) => s.signInDemo)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Demo-only: immediately authenticate and redirect.
      // For real API integration, replace with a call like:
      // const res = await fetch("/api/admin/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // })
      // if (!res.ok) throw new Error("Invalid credentials")
      // const data = await res.json()
      // signInWithToken(data.token) // or set cookie and refresh
      signInDemo(email || "admin@demo.com")
      router.replace("/admin/dashboard")
    } catch (err: any) {
      setError(err?.message || "Unable to sign in")
    } finally {
      setLoading(false)
    }
  }

  function signInAsDemo() {
    signInDemo("admin@demo.com")
    router.replace("/admin/dashboard")
  }

  return (
    <section className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Admin Sign In</CardTitle>
          <CardDescription>Enter your credentials to access the admin console.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex items-center gap-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <Button type="button" variant="outline" onClick={signInAsDemo}>
                Demo
              </Button>
            </div>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Note: This environment uses a demo login. Replace the inline demo code with your real authentication API
            when ready.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
