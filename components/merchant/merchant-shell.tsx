"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Boxes,
  CreditCard,
  Home,
  ImagePlus,
  LayoutList,
  LogOut,
  PackageSearch,
  Settings,
  Wallet,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMerchantAuth } from "@/store/merchant-auth-store"
import { Separator } from "@/components/ui/separator"

const links = [
  { label: "Overview", href: "/dashboard/merchant/overview", icon: Home },
  { label: "Transactions", href: "/dashboard/merchant/transactions", icon: LayoutList },
  { label: "Inventory", href: "/dashboard/merchant/inventory", icon: Boxes },
  { label: "Product Upload", href: "/dashboard/merchant/product-upload", icon: ImagePlus },
  { label: "Wallet", href: "/dashboard/merchant/wallet", icon: Wallet },
  { label: "Track Order", href: "/dashboard/merchant/track-order", icon: PackageSearch },
  { label: "Account Settings", href: "/dashboard/merchant/account", icon: Settings },
]

export default function MerchantShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useMerchantAuth()
  const initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? (user?.firstName ? "" : "U"))

  const onLogout = () => {
    logout()
    router.replace("/admindesk")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Merchant</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {links.map((i) => (
                    <SidebarMenuItem key={i.href}>
                      <SidebarMenuButton asChild isActive={pathname === i.href}>
                        <Link href={i.href}>
                          <i.icon />
                          <span>{i.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {/* Logout */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={onLogout}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 data-[active=true]:bg-rose-50 data-[active=true]:text-rose-700"
                    >
                      <LogOut />
                      <span>Log Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-2 pb-2">
            <div className="flex items-center gap-2 px-2">
              <Avatar className="h-7 w-7">
                {user?.avatarUrl ? <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt="Merchant" /> : null}
                <AvatarFallback className="text-[10px]">{initials.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="truncate text-xs text-muted-foreground">{user?.email ?? "Merchant"}</div>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="w-full">
          {/* Header with Wallet, Notifications, Profile */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
            <div className="grid h-14 w-full grid-cols-3 items-center px-4 md:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <span className="text-sm font-semibold tracking-tight">Merchant</span>
              </div>
              <div className="hidden items-center justify-center md:flex">
                <span className="text-sm text-muted-foreground">Manage your store and orders</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" className="bg-transparent" size="sm" asChild>
                  <Link href="/dashboard/merchant/wallet">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Wallet
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild aria-label="Notifications">
                  <Link href="/dashboard/merchant/track-order">
                    <Bell className="h-5 w-5" />
                  </Link>
                </Button>
                <Separator orientation="vertical" className="mx-1 hidden h-5 md:block" />
                <Link href="/dashboard/merchant/account" className="inline-flex">
                  <Avatar className="h-7 w-7">
                    {user?.avatarUrl ? <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt="Merchant" /> : null}
                    <AvatarFallback className="text-[10px]">{initials.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
