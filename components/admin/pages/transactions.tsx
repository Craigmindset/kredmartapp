"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Search, Download, MoreHorizontal, Send } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- MOCK DATA ---
const mockOrdersData = Array.from({ length: 50 }, (_, i) => ({
  transactionId: `TRN${1000 + i}`,
  orderId: `ORD${2000 + i}`,
  merchant: `Merchant ${String.fromCharCode(65 + (i % 5))}`,
  username: `user${i + 1}`,
  productName: `Vintage T-Shirt ${i + 1}`,
  qty: (i % 5) + 1,
  paymentStatus: i % 3 === 0 ? "Paid" : i % 3 === 1 ? "Pending" : "Failed",
  paymentMethod: i % 3 === 0 ? "Wallet" : i % 3 === 1 ? "BNPL" : "Card",
  deliveryStatus: i % 3 === 0 ? "Delivered" : i % 3 === 1 ? "Shipped" : "Processing",
}))

const mockLoansData = Array.from({ length: 30 }, (_, i) => ({
  loanId: `LOAN${3000 + i}`,
  applicantName: `Applicant ${i + 1}`,
  provider: `Provider ${String.fromCharCode(65 + (i % 3))}`,
  loanAmount: 5000 + i * 100,
  repaymentAmount: 5500 + i * 110,
  interest: "10%",
  status: i % 4 === 0 ? "Approved" : i % 4 === 1 ? "Pending" : i % 4 === 2 ? "Rejected" : "Disbursed",
}))

const mockMerchantsData = Array.from({ length: 40 }, (_, i) => ({
  transactionId: `TRNM${4000 + i}`,
  merchantId: `MERCH${5000 + (i % 4)}`,
  merchantName: `Merchant ${String.fromCharCode(65 + (i % 4))}`,
  productSold: `Smartwatch Series ${i + 1}`,
  category: `Electronics`,
  amount: 100 + i * 10,
  transactionDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
  settleStatus: i % 4 === 0 ? "Paid" : i % 4 === 1 ? "Unpaid" : i % 4 === 2 ? "Pending" : "Dispute",
}))

const mockWalletsData = Array.from({ length: 60 }, (_, i) => ({
  transactionId: `TRNW${6000 + i}`,
  username: `user${i + 1}`,
  transactionType: i % 4 === 0 ? "Airtime" : i % 4 === 1 ? "Data" : i % 4 === 2 ? "Purchase" : "Funding",
  amount: 50 + i * 5,
  date: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toLocaleString(),
  status: i % 3 === 0 ? "Success" : i % 3 === 1 ? "Failed" : "Pending",
}))

const loanProviders = ["All", "Provider A", "Provider B", "Provider C"]
const merchantNames = ["All", "Merchant A", "Merchant B", "Merchant C", "Merchant D"]
const ITEMS_PER_PAGE = 20

// --- TABLE COMPONENTS ---

const OrdersTable = ({ data, searchQuery, currentPage }) => {
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.orderId.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [data, searchQuery],
  )

  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Merchant</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Delivery</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.map((order) => (
          <TableRow key={order.transactionId}>
            <TableCell>{order.transactionId}</TableCell>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.merchant}</TableCell>
            <TableCell>{order.username}</TableCell>
            <TableCell>{order.productName}</TableCell>
            <TableCell>{order.qty}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.paymentStatus === "Paid"
                    ? "success"
                    : order.paymentStatus === "Pending"
                      ? "warning"
                      : "destructive"
                }
              >
                {order.paymentStatus}
              </Badge>
              <div className="text-xs text-muted-foreground">{order.paymentMethod}</div>
            </TableCell>
            <TableCell>
              <Badge variant={order.deliveryStatus === "Delivered" ? "success" : "outline"}>
                {order.deliveryStatus}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => alert(`Resending receipt for ${order.orderId}`)}>
                    Resend Receipt
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert(`Downloading receipt for ${order.orderId}`)}>
                    Download Receipt
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const LoansTable = ({ data, searchQuery, currentPage }) => {
  const [providerFilter, setProviderFilter] = useState("All")
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          (providerFilter === "All" || item.provider === providerFilter) &&
          item.loanId.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [data, searchQuery, providerFilter],
  )

  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div>
      <div className="my-4">
        <Select value={providerFilter} onValueChange={setProviderFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by provider..." />
          </SelectTrigger>
          <SelectContent>
            {loanProviders.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loan ID</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Repayment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((loan) => (
            <TableRow key={loan.loanId}>
              <TableCell>{loan.loanId}</TableCell>
              <TableCell>{loan.applicantName}</TableCell>
              <TableCell>{loan.provider}</TableCell>
              <TableCell>${loan.loanAmount.toFixed(2)}</TableCell>
              <TableCell>${loan.repaymentAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    loan.status === "Approved" || loan.status === "Disbursed"
                      ? "success"
                      : loan.status === "Pending"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {loan.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Broadcast</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => alert(`Broadcast sent to ${loan.applicantName}`)}>
                            To this user
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Broadcast sent to all users with loans from ${loan.provider}`)}
                          >
                            To all users
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const MerchantsTable = ({ data, searchQuery, currentPage, onFilterByMerchant }) => {
  const [merchantFilter, setMerchantFilter] = useState("All")
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          (merchantFilter === "All" || item.merchantName === merchantFilter) &&
          (item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.merchantId.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [data, searchQuery, merchantFilter],
  )

  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div>
      <div className="my-4">
        <Select value={merchantFilter} onValueChange={setMerchantFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by merchant..." />
          </SelectTrigger>
          <SelectContent>
            {merchantNames.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Product Sold</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Settle Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((merchant) => (
            <TableRow key={merchant.transactionId}>
              <TableCell>{merchant.transactionId}</TableCell>
              <TableCell>
                <div>{merchant.merchantName}</div>
                <div className="text-xs text-muted-foreground">{merchant.merchantId}</div>
              </TableCell>
              <TableCell>
                <div>{merchant.productSold}</div>
                <div className="text-xs text-muted-foreground">{merchant.category}</div>
              </TableCell>
              <TableCell>${merchant.amount.toFixed(2)}</TableCell>
              <TableCell>{merchant.transactionDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    merchant.settleStatus === "Paid"
                      ? "success"
                      : merchant.settleStatus === "Pending"
                        ? "warning"
                        : merchant.settleStatus === "Unpaid"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {merchant.settleStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onFilterByMerchant(merchant.merchantId)}>
                  View Merchant
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const WalletsTable = ({ data, searchQuery, currentPage }) => {
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.username.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [data, searchQuery],
  )

  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.map((wallet) => (
          <TableRow key={wallet.transactionId}>
            <TableCell>{wallet.transactionId}</TableCell>
            <TableCell>{wallet.username}</TableCell>
            <TableCell>{wallet.transactionType}</TableCell>
            <TableCell>${wallet.amount.toFixed(2)}</TableCell>
            <TableCell>{wallet.date}</TableCell>
            <TableCell>
              <Badge
                variant={
                  wallet.status === "Success" ? "success" : wallet.status === "Pending" ? "warning" : "destructive"
                }
              >
                {wallet.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// --- MAIN COMPONENT ---

export default function TransactionsAdminPage() {
  const [activeTab, setActiveTab] = useState("orders")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [merchantIdFilter, setMerchantIdFilter] = useState<string | null>(null)

  const handleDownloadStatement = () => {
    // For a real implementation, you would use a library like `react-csv` or `jspdf`
    // to generate a downloadable file from the currently filtered data.
    // The file would be stamped with the current date and a "KREDMART" logo/watermark.
    alert("Statement download initiated. This would generate a CSV/PDF of the current view.")
  }

  const handleFilterByMerchant = (merchantId: string) => {
    setActiveTab("merchants")
    setSearchQuery(merchantId)
    alert(`Filtering all transactions for Merchant ID: ${merchantId}`)
  }

  const dataMap = {
    orders: mockOrdersData,
    loans: mockLoansData,
    merchants: mockMerchantsData,
    wallets: mockWalletsData,
  }

  const totalPages = Math.ceil((dataMap[activeTab]?.length || 0) / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Search, filter, and manage all transactions across the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Transaction, Merchant, or Order ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <Button onClick={handleDownloadStatement} className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setCurrentPage(1)
          setSearchQuery("")
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
        </TabsList>

        <Card className="mt-4">
          <CardContent className="p-0">
            <TabsContent value="orders" className="m-0">
              <OrdersTable data={mockOrdersData} searchQuery={searchQuery} currentPage={currentPage} />
            </TabsContent>
            <TabsContent value="loans" className="m-0">
              <LoansTable data={mockLoansData} searchQuery={searchQuery} currentPage={currentPage} />
            </TabsContent>
            <TabsContent value="merchants" className="m-0">
              <MerchantsTable
                data={mockMerchantsData}
                searchQuery={searchQuery}
                currentPage={currentPage}
                onFilterByMerchant={handleFilterByMerchant}
              />
            </TabsContent>
            <TabsContent value="wallets" className="m-0">
              <WalletsTable data={mockWalletsData} searchQuery={searchQuery} currentPage={currentPage} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((p) => Math.max(1, p - 1))
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(i + 1)
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
