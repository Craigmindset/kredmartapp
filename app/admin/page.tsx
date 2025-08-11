"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAdminAuthStore } from "@/store/admin-auth-store";

export default function AdminSignInPage() {
  const router = useRouter();
  const signInDemo = useAdminAuthStore((s) => s.signInDemo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
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
      signInDemo(email || "admin@demo.com");
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  function signInAsDemo() {
    signInDemo("admin@demo.com");
    router.replace("/admin/dashboard");
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10">
      <img
        src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/merchant.jpg"
        alt="Background"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <Card className="w-full max-w-md relative z-10">
        <CardHeader>
          <CardTitle className="text-xl text-center">Admin Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin console.
          </CardDescription>
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
          <a
            href="/"
            className="mt-4 text-xs text-muted-foreground underline text-center block"
          >
            Go Home
          </a>
        </CardContent>
      </Card>
    </section>
  );
}
