"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function Wallet() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">₦0</div>
        <div className="text-sm text-muted-foreground">Available balance</div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="bg-transparent">
            Add ₦5,000
          </Button>
          <Button disabled>Withdraw (soon)</Button>
        </div>
        <Separator className="my-6" />
        <div className="text-sm text-muted-foreground">Wallet transactions will appear here.</div>
      </CardContent>
    </Card>
  )
}
