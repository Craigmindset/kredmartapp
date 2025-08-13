"use client";

import type React from "react";

import LayoutShell from "@/components/layout-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-store";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    // Set user with actual login email
    setUser({
      firstName: "Kred",
      lastName: "User",
      email,
      phone: "+1 555 000 0000",
    });
    router.push("/dashboard/overview");
  }

  return (
    <LayoutShell showFooter={false}>
      {/* Full-bleed background with leafy texture under content */}
      <section className="relative ">
        <img
          src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/young-african-ladies-viewing-something-their-mobile-phones-while-carrying-shopping-bags.png"
          alt="Background"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="grid min-h-[calc(100svh-64px)] items-center gap-8 md:grid-cols-2">
            {/* Left: Brand + Headline over background */}
            <div className="hidden md:block text-white max-w-xl py-10">
              <div className="mb-10 inline-flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                  <div className="h-5 w-5 rounded-full bg-white" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">
                  KredMart
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight whitespace-pre-line">
                {`Finance Shopping\n| When Needed`}
              </h1>

              <p className="mt-4 text-sm/6 text-white/85 max-w-md">
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                }
              </p>

              {/* Simple progress indicators to echo the design */}
            </div>

            {/* Right: Auth Card */}
            <div className="flex w-full items-center justify-center py-4 sm:py-6 md:py-8 mt-0 sm:-mt-16 md:-mt-24">
              <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg backdrop-blur-md md:p-8">
                <div className="text-xs font-medium text-muted-foreground">
                  {"WELCOME BACK"}
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                  {"Log In to your Account"}
                </h2>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  {/* Email */}
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      {"Email"}
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="johnsondoe@nomail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password with show/hide */}
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="block text-sm font-medium">
                        {"Password"}
                      </label>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        className="pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="mt-1 flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox
                        checked={remember}
                        onCheckedChange={(v) => setRemember(Boolean(v))}
                      />
                      <span>{"Remember me"}</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      {"Forgot Password?"}
                    </Link>
                  </div>

                  {/* Continue */}
                  <Button
                    type="submit"
                    className="mt-2 w-full h-11"
                    disabled={loading}
                  >
                    {loading ? "Continuing..." : "CONTINUE"}
                  </Button>

                  {/* Or separator */}
                  <div className="mt-4 flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {"Or"}
                    </span>
                    <Separator className="flex-1" />
                  </div>

                  {/* Google button (placeholder) */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 bg-transparent"
                  >
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[10px]">
                      {"G"}
                    </span>
                    {"Log In with Google"}
                  </Button>
                </form>

                {/* Footer link */}
                <div className="mt-6 text-center text-xs text-muted-foreground">
                  {"New User? "}
                  <Link href="/sign-up" className="font-semibold underline">
                    {"SIGN UP HERE"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
