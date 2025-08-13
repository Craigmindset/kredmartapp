"use client";

import Link from "next/link";

import type React from "react";

import LayoutShell from "@/components/layout-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-store";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { StepProgress } from "@/components/step-progress";

export default function SignUpPage() {
  const params = useSearchParams();
  const step = params.get("step");
  const router = useRouter();
  const { signupDraft, setSignupDraft, verified, setVerified } = useAuth();
  const [loading, setLoading] = useState(false);

  // Password step state
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password validation: 8+ chars, 1 uppercase, 1 special char
  const passwordValid =
    password.length === 8 &&
    /[A-Z]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirm && password.length > 0;

  useEffect(() => {
    if (step === "password" && !verified) {
      router.push("/sign-up");
    }
  }, [step, verified, router]);

  const onStart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    router.push("/sign-up/verify");
  };

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    // After account creation, send user to /login (alias to /sign-in)
    router.push("/login");
  };

  return (
    <LayoutShell showFooter={false}>
      <section className="relative">
        <img
          src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/young-african-ladies-viewing-something-their-mobile-phones-while-carrying-shopping-bags.png"
          alt="Background"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="grid min-h-[calc(100svh-64px)] items-center gap-8 md:grid-cols-2">
            {/* Left: Brand + Headline */}
            <div
              className={
                step === "password"
                  ? "hidden md:block max-w-xl py-10 text-white"
                  : "max-w-xl py-10 text-white"
              }
            >
              <div className="mb-10 inline-flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                  <div className="h-5 w-5 rounded-full bg-white" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">
                  KredMart
                </span>
              </div>

              <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                Empowered to
                <br />
                Shop More
              </h1>
              <p className="mt-4 max-w-md text-sm/6 text-white/85">
                {
                  "Unlock access to top-tier premium loan providers, enjoy exclusive deals, and take advantage of special offers , all in one place on KredMart. Experience faster approvals, better rates, and unbeatable shopping perks tailored just for you."
                }
              </p>
            </div>

            {/* Right: Sign Up Card */}
            <div className="flex w-full items-center justify-center py-10">
              <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg backdrop-blur-md md:p-8">
                {step === "password" ? (
                  <>
                    <StepProgress current={3} total={3} />
                    <div className="text-xs font-medium text-muted-foreground">
                      {"FINAL STEP"}
                    </div>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                      {"Create your password"}
                    </h2>

                    <form onSubmit={onCreate} className="mt-6 space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          {"Password"}
                        </label>
                        <div className="relative flex items-center">
                          <Input
                            type={showPwd ? "text" : "password"}
                            value={password}
                            minLength={8}
                            maxLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter 8 character password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPwd((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex w-8 h-8 items-center justify-center text-muted-foreground"
                            aria-label={
                              showPwd ? "Hide password" : "Show password"
                            }
                          >
                            {showPwd ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <div className="mt-1 text-[10px] text-muted-foreground">
                          Password must be exactly 8 characters, contain at
                          least one uppercase letter and one special character.
                        </div>
                        {!passwordValid && password.length > 0 && (
                          <div className="text-xs text-red-500">
                            Password does not meet requirements.
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          {"Confirm Password"}
                        </label>
                        <div className="relative">
                          <Input
                            type={showConfirm ? "text" : "password"}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            placeholder="Re-enter your password"
                            className="pr-10"
                          />
                          {confirm.length > 0 && !passwordsMatch && (
                            <div className="text-xs text-red-500">
                              Passwords do not match.
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground"
                            aria-label={
                              showConfirm ? "Hide password" : "Show password"
                            }
                          >
                            {showConfirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="mt-2 h-11 w-full"
                        disabled={loading || !passwordValid || !passwordsMatch}
                      >
                        {loading ? "Creating..." : "CREATE ACCOUNT"}
                      </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                      {"Already have an account? "}
                      <Link href="/sign-in" className="font-semibold underline">
                        {"Log in"}
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <StepProgress current={1} total={3} />
                    <div className="text-xs font-medium text-muted-foreground">
                      {"GET STARTED"}
                    </div>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                      {"Create account"}
                    </h2>

                    <form onSubmit={onStart} className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm font-medium">
                            {"First Name"}
                          </label>
                          <Input
                            required
                            defaultValue={signupDraft?.firstName}
                            onChange={(e) =>
                              setSignupDraft({
                                ...signupDraft,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium">
                            {"Last Name"}
                          </label>
                          <Input
                            required
                            defaultValue={signupDraft?.lastName}
                            onChange={(e) =>
                              setSignupDraft({
                                ...signupDraft,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          {"Email"}
                        </label>
                        <Input
                          type="email"
                          required
                          defaultValue={signupDraft?.email}
                          onChange={(e) =>
                            setSignupDraft({
                              ...signupDraft,
                              email: e.target.value,
                            })
                          }
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          {"Phone number"}
                        </label>
                        <Input
                          type="tel"
                          required
                          maxLength={11}
                          pattern="[0-9]{11}"
                          inputMode="numeric"
                          value={signupDraft?.phone || ""}
                          onChange={(e) => {
                            // Only allow digits and max 11 chars
                            const val = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 11);
                            setSignupDraft({
                              ...signupDraft,
                              phone: val,
                            });
                          }}
                          placeholder="08000000000"
                        />
                      </div>

                      <Button
                        className="mt-2 h-11 w-full"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Redirecting..." : "Verify Email & Phone"}
                      </Button>

                      <div className="mt-4 flex items-center gap-3">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">
                          {"Or"}
                        </span>
                        <Separator className="flex-1" />
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full bg-transparent"
                      >
                        <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[10px]">
                          {"G"}
                        </span>
                        {"Sign up with Google"}
                      </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                      {"Already have an account? "}
                      <Link href="/sign-in" className="font-semibold underline">
                        {"Log in"}
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
