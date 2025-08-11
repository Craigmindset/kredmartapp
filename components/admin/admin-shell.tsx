"use client";

import type React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader as ShadSidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Store,
  Users,
  Boxes,
  Package,
  Upload,
  CreditCard,
  ListOrdered,
  Truck,
  Wrench,
  UserCog,
  LogOut,
  Wallet,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuthStore } from "@/store/admin-auth-store";

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/admin/dashboard/overview",
    icon: LayoutDashboard,
  },
  { title: "Merchant", href: "/admin/dashboard/merchant", icon: Store },
  { title: "Users", href: "/admin/dashboard/users", icon: Users },
  { title: "Inventory", href: "/admin/dashboard/inventory", icon: Boxes },
  { title: "Products", href: "/admin/dashboard/products", icon: Package },
  {
    title: "Product Upload",
    href: "/admin/dashboard/product-upload",
    icon: Upload,
  },
  {
    title: "Transactions",
    href: "/admin/dashboard/transactions",
    icon: CreditCard,
  },
  { title: "Revenue", href: "/admin/dashboard/revenue", icon: TrendingUp },
  {
    title: "All Orders",
    href: "/admin/dashboard/all-orders",
    icon: ListOrdered,
  },
  { title: "Track Orders", href: "/admin/dashboard/track-orders", icon: Truck },
  {
    title: "Site Manager",
    href: "/admin/dashboard/site-manager",
    icon: Wrench,
  },
  { title: "Account", href: "/admin/dashboard/account", icon: UserCog },
];

function Header() {
  const router = useRouter();
  const admin = useAdminAuthStore((s) => s.admin);
  const signOut = useAdminAuthStore((s) => s.signOut);

  return (
    <header className="flex h-14 shrink-0 items-center border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <nav className="flex-1 flex justify-center">
        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/" className="text-base font-medium hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/store"
              className="text-base font-medium hover:underline"
            >
              Store
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Wallet">
          <Wallet className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Broadcast">
          <Megaphone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Profile">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs">
              {admin?.name
                ?.split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "AD"}
            </AvatarFallback>
          </Avatar>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Logout"
          onClick={() => {
            signOut();
            router.replace("/admin");
          }}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const signOut = useAdminAuthStore((s) => s.signOut);

  return (
    <SidebarProvider>
      <Sidebar className="bg-sidebar text-sidebar-foreground">
        <ShadSidebarHeader>
          <div className="px-2 py-1.5 text-sm font-semibold">Admin Console</div>
        </ShadSidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => {
                      signOut();
                      router.replace("/admin");
                    }}
                    tooltip="Logout"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className={cn("flex-1 p-4")}>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
