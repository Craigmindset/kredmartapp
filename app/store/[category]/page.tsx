"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import LayoutShell from "@/components/layout-shell"
import HeroSlider from "@/components/hero-slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"
import { getCategoryFromSlug } from "@/lib/categories"

const BRAND_OPTIONS = [
  "Apple",
  "Samsung",
  "Panasonic",
  "Hisense",
  "Dell",
  "HP",
  "TCL",
  "JVC",
  "Polystar",
  "Haier",
  "Binatone",
  "Sony",
  "Infinix",
  "Techno",
  "Lenovo",
] as const

export default function CategoryPage() {
  const params = useParams<{ category: string }>()
  const slug = params.category
  const category = getCategoryFromSlug(slug)

  const router = useRouter()
  const qs = useSearchParams()
  const q = (qs.get("search") || "").toString().trim()

  const [brand, setBrand] = useState<string | "all">("all")
  const [onlyDeals, setOnlyDeals] = useState(false)
  const [sort, setSort] = useState<"htl" | "lth" | "none">("none")

  const list = useMemo(() => {
    let list = products.filter((p) => p.category === category)
    if (q) {
      const s = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s),
      )
    }
    if (brand !== "all") list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
    if (onlyDeals) list = list.filter((p) => p.deal)
    if (sort === "htl") list.sort((a, b) => b.price - a.price)
    if (sort === "lth") list.sort((a, b) => a.price - b.price)
    return list
  }, [category, q, brand, onlyDeals, sort])

  const resetFilters = () => {
    setBrand("all")
    setOnlyDeals(false)
    setSort("none")
  }

  if (!category) {
    if (typeof window !== "undefined") router.replace("/store")
    return null
  }

  return (
    <LayoutShell>
      <section className="container mx-auto px-4 pt-6">
        {/* Hero: 60% slider, 40% static image */}
        <div className="grid gap-4 md:grid-cols-10">
          <div className="md:col-span-6 rounded-lg border bg-card">
            <HeroSlider />
          </div>
          <div className="md:col-span-4 rounded-lg border bg-card p-3">
            <img
              src={"/placeholder.svg?height=340&width=600&query=" + encodeURIComponent(category + " promo")}
              alt={category + " promotion"}
              className="h-[340px] w-full rounded-md object-cover"
            />
          </div>
        </div>

        {/* Breadcrumb / heading */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <Link href="/store" className="text-muted-foreground hover:underline">
            Store
          </Link>
          <span>{">"}</span>
          <span className="font-medium">{category}</span>
          {q && (
            <>
              <span>{">"}</span>
              <span className="text-muted-foreground">Search: “{q}”</span>
            </>
          )}
        </div>

        {/* Content with filters */}
        <div className="mt-4 grid gap-4 md:grid-cols-10">
          {/* Left filter panel */}
          <aside className="md:col-span-2 rounded-lg border bg-card p-4 h-fit sticky top-[72px]">
            <h4 className="mb-3 text-sm font-semibold">Filter</h4>

            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Brand</div>
              <Select onValueChange={(v) => setBrand(v)} value={brand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All brands</SelectItem>
                  {BRAND_OPTIONS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <Switch id="deals" checked={onlyDeals} onCheckedChange={(v) => setOnlyDeals(Boolean(v))} />
              <Label htmlFor="deals" className="text-sm">
                Deals only
              </Label>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Pricing</div>
              <Select onValueChange={(v: "htl" | "lth" | "none") => setSort(v)} value={sort}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Default</SelectItem>
                  <SelectItem value="lth">Low to High</SelectItem>
                  <SelectItem value="htl">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={resetFilters}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              Reset Filters
            </button>
          </aside>

          {/* Products */}
          <div className="md:col-span-8">
            <div className="mb-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{category}</h2>
              {q && <p className="text-sm text-muted-foreground">Showing results for “{q}”</p>}
            </div>
            {/* 5 per row on desktop, 3 per row on mobile */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              {list.length === 0 && (
                <div className="col-span-3 md:col-span-5 text-sm text-muted-foreground">No products found.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  )
}
