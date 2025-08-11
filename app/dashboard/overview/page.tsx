"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/store/wallet-store"
import { useOrders, type Order } from "@/store/orders-store"
import { useLoans, type Loan } from "@/store/loans-store"
import { formatMoneyColon, formatNaira } from "@/lib/currency"

function recentOrders(orders: Order[], limit = 5) {
  return orders
    .slice()
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit)
}

function recentLoans(loans: Loan[], limit = 5) {
  const withDate = loans.map((l, idx) => ({
    ...l,
    _date: l.startDate ? new Date(l.startDate).getTime() : Date.now() - idx * 1000,
  }))
  return withDate.sort((a, b) => (b._date as number) - (a._date as number)).slice(0, limit)
}

export default function OverviewPage() {
  const balance = useWallet((s) => s.balance)
  const currency = useWallet((s) => s.currency)

  const orders = useOrders((s) => s.orders)
  const seedOrders = useOrders((s) => s.seedDemo)

  const loans = useLoans((s) => s.loans)
  const seedLoans = useLoans((s) => s.seedDemo)

  const [tab, setTab] = useState<"orders" | "loans">("orders")

  const ordersList = useMemo(() => recentOrders(orders, 5), [orders])
  const loansList = useMemo(() => recentLoans(loans, 5), [loans])

  return (
    <div className="space-y-6">
      {/* Top KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatMoneyColon(balance, currency)}</div>
            <div className="text-sm text-muted-foreground">Current available balance</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{orders.length}</div>
            <div className="text-sm text-muted-foreground">All-time orders</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Request</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold">{loans.length}</div>
              <div className="text-sm text-muted-foreground">All-time loan applications</div>
            </div>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/dashboard/loan-request">New Request</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions with filter */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <CardTitle>Recent Activity</CardTitle>
            <div className="text-xs text-muted-foreground">Filter between orders and loans</div>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/dashboard/my-orders">View Orders</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/dashboard/my-loans">View Loans</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-4">
              {ordersList.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No orders found.{" "}
                  <button onClick={seedOrders} className="underline">
                    Load demo orders
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Delivery Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ordersList.map((o) => {
                        const first = o.items[0]
                        const more = o.items.length - 1
                        return (
                          <TableRow key={o.id}>
                            <TableCell className="font-medium">{o.id}</TableCell>
                            <TableCell className="max-w-[360px]">
                              <div className="flex items-center gap-3">
                                <img
                                  src={first.image || "/placeholder.svg?height=56&width=56"}
                                  alt={first.title}
                                  className="h-9 w-9 rounded object-cover"
                                />
                                <div className="truncate text-sm">
                                  {first.title}
                                  {more > 0 ? ` (+${more} more)` : ""}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{o.paymentStatus}</TableCell>
                            <TableCell className="text-sm">{o.paymentMethod}</TableCell>
                            <TableCell className="text-sm">{o.delivery}</TableCell>
                            <TableCell>
                              <Button asChild size="sm" variant="outline" className="bg-transparent">
                                <Link href="/dashboard/my-orders">View transaction</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="loans" className="mt-4">
              {loansList.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No loans found.{" "}
                  <button onClick={seedLoans} className="underline">
                    Load demo loans
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead className="text-right">Loan Amount</TableHead>
                        <TableHead className="text-right">Repayment Amount</TableHead>
                        <TableHead className="text-right">Interest</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loansList.map((l) => (
                        <TableRow key={l.id}>
                          <TableCell className="font-medium">{l.id}</TableCell>
                          <TableCell>{l.provider}</TableCell>
                          <TableCell className="text-right">{formatNaira(l.loanAmount)}</TableCell>
                          <TableCell className="text-right">{formatNaira(l.repaymentAmount)}</TableCell>
                          <TableCell className="text-right">{l.interestRate}%</TableCell>
                          <TableCell className="text-sm">{l.status}</TableCell>
                          <TableCell>
                            <Button asChild size="sm" variant="outline" className="bg-transparent">
                              <Link href="/dashboard/my-loans">View transaction</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
