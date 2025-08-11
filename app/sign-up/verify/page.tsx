"use client"

import type React from "react"

import LayoutShell from "@/components/layout-shell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/store/auth-store"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { StepProgress } from "@/components/step-progress"

export default function VerifyPage() {
  const [code, setCode] = useState("")
  const { setVerified } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setLoading(false)
    if (code === "111111") {
      setVerified(true)
      router.push("/sign-up?step=password")
    }
  }

  return (
    <LayoutShell>
      <section className="relative">
        <img
          src="/images/login-bg.jpg"
          alt="Background"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="grid min-h-[calc(100svh-64px)] items-center gap-8 md:grid-cols-2">
            <div className="max-w-xl py-10 text-white">
              <div className="mb-10 inline-flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                  <div className="h-5 w-5 rounded-full bg-white" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">KredMart</span>
              </div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {"Verify your account"}
              </h1>
              <p className="mt-4 max-w-md text-sm/6 text-white/85">
                {"Enter the 6-digit code sent to your email/phone to continue."}
              </p>
            </div>

            <div className="flex w-full items-center justify-center py-10">
              <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg backdrop-blur-md md:p-8">
                <StepProgress current={2} total={3} />
                <div className="text-xs font-medium text-muted-foreground">{"VERIFICATION"}</div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">{"Enter Code"}</h2>

                <form onSubmit={onVerify} className="mt-6 space-y-4">
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="Enter 111111"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <Button type="submit" className="h-11 w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  )
}
