"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Bell, CreditCard, Home, LayoutList, Package, Settings, Wallet, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/store/auth-store"
import { useCart, cartSelectors } from "@/store/cart-store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const items = [
  { label: "Overview", href: "/dashboard/overview", icon: Home },
  { label: "Loan request", href: "/dashboard/loan-request", icon: CreditCard },
  { label: "My loans", href: "/dashboard/my-loans", icon: LayoutList },
  { label: "Transaction", href: "/dashboard/transactions", icon: LayoutList },
  { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { label: "My Order", href: "/dashboard/my-orders", icon: Package },
  { label: "Track Orders", href: "/dashboard/track-orders", icon: Bell },
  { label: "Account Settings", href: "/dashboard/account", icon: Settings },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const cartCount = useCart(cartSelectors.count)

  const initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? (user?.firstName ? "" : "U"))

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="px-2 py-1 text-sm font-semibold">KredMart</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((i) => (
                    <SidebarMenuItem key={i.href}>
                      <SidebarMenuButton asChild isActive={pathname === i.href}>
                        <Link href={i.href}>
                          <i.icon />
                          <span>{i.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-2 pb-2">
            <div className="flex items-center gap-2 px-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">{initials.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-xs text-muted-foreground truncate">{user ? user.email : "Guest"}</div>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="mt-2 bg-transparent">
              Logout
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="w-full">
          {/* Sticky dashboard header with left / center / right sections */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
            <div className="w-full px-4 md:px-6 h-14 grid grid-cols-3 items-center">
              {/* Left: Site name + sidebar trigger on mobile */}
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Link href="/" className="text-sm font-semibold tracking-tight">
                  KredMart
                </Link>
              </div>

              {/* Center: Menu (hidden on small screens) */}
              <nav className="hidden md:flex items-center justify-center gap-6">
                <Link
                  href="/"
                  className={`text-sm ${pathname === "/" ? "font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Home
                </Link>
                <Link
                  href="/store"
                  className={`text-sm ${pathname.startsWith("/store") ? "font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Store
                </Link>
              </nav>

              {/* Right: Profile, Cart, Notification, Wallet */}
              <div className="flex items-center justify-end gap-3">
                <Link href="/dashboard/account" aria-label="User profile" className="inline-flex">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-[10px]">
                      {initials.toUpperCase() || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <Link href="/cart" aria-label="Cart" className="relative inline-flex">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded bg-foreground px-1 text-[10px] font-medium text-background">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link href="/dashboard/track-orders" aria-label="Notifications" className="inline-flex">
                  <Bell className="h-5 w-5" />
                </Link>

                <Link href="/dashboard/wallet" aria-label="Wallet" className="inline-flex">
                  <Wallet className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </header>

          <div className="px-4 md:px-6 py-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
