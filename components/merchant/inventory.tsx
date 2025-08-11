"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Inventory() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Inventory</CardTitle>
        <Button asChild variant="outline" className="bg-transparent">
          <a href="/dashboard/merchant/product-upload">Add Product</a>
        </Button>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        No products found. Click “Add Product” to upload your first item.
      </CardContent>
    </Card>
  )
}
