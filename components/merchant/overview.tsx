"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sales (30d)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₦0</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">0</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">0</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Your merchant dashboard is ready. Use the sidebar to manage inventory, upload products, track orders, view
          transactions, and more.
        </CardContent>
      </Card>
    </div>
  )
}
