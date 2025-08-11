import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function RevenueAdminPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Revenue
        </CardTitle>
        <CardDescription>
          Detailed revenue analytics, charts, and financial reports will be displayed here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
          <p className="text-muted-foreground">Revenue dashboard coming soon.</p>
        </div>
      </CardContent>
    </Card>
  )
}
