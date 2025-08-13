"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import LayoutShell from "@/components/layout-shell";
import ProductsGrid from "@/components/products-grid";
import StoreBanner from "@/components/store-banner";
import StoreFloorBanner from "@/components/storefloor-banner";
import StoreSideBanner from "@/components/storeside-banner";
import {
  Smartphone,
  Laptop,
  Tv,
  BatteryCharging,
  Headphones,
  Home,
  Heart,
  Watch,
  Star,
} from "lucide-react";
import { allBrands, allCategories, products } from "@/lib/products";
import { slugifyCategory } from "@/lib/categories";

export default function StorePage() {
  const searchParams = useSearchParams();
  const q = (searchParams?.get("search") || "").toString().trim();

  const [brand, setBrand] = useState<string>("all");
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [sort, setSort] = useState<"htl" | "lth" | "none">("none");

  const filtered = useMemo(() => {
    let list: import("@/lib/products").Product[] = products.slice();
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s)
      );
    }
    if (brand !== "all") list = list.filter((p) => p.brand === brand);
    if (onlyDeals) list = list.filter((p) => p.deal);
    if (sort === "htl") list.sort((a, b) => b.price - a.price);
    if (sort === "lth") list.sort((a, b) => a.price - b.price);
    return list;
  }, [q, brand, onlyDeals, sort]);

  return (
    <LayoutShell>
      <section className="container mx-auto px-4 pt-6">
        <div className="space-y-8">
          <div>
            <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
              {/* Categories Sidebar - spans both banners */}
              <aside className="hidden md:flex md:w-[220px] min-w-[120px] rounded-lg border bg-card p-4 flex-shrink-0 flex-col justify-start mb-4 md:mb-0">
                <h2 className="mb-4 text-base font-bold text-primary uppercase tracking-wide">
                  Categories
                </h2>
                <nav aria-label="Product categories">
                  <ul className="space-y-2 text-sm">
                    {[
                      { name: "Phones and Tablets", icon: Smartphone },
                      { name: "Computing", icon: Laptop },
                      { name: "Electronics", icon: Tv },
                      { name: "Generators", icon: BatteryCharging },
                      { name: "Accessories", icon: Headphones },
                      { name: "Home & Kitchen", icon: Home },
                      { name: "Lifestyle", icon: Heart },
                      { name: "Watches", icon: Watch },
                      { name: "Premium Devices", icon: Star },
                    ].map(({ name, icon: Icon }) => (
                      <li key={name} className="flex items-center gap-2">
                        <Link
                          href={`/store/${slugifyCategory(name)}`}
                          className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        >
                          <Icon size={18} className="text-primary" />
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
              {/* Banners stacked vertically on mobile, grid on desktop */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                  <div className="rounded-lg border flex items-center justify-center md:col-span-5">
                    <StoreBanner />
                  </div>
                  <div className="flex flex-col gap-4 md:col-span-2">
                    <StoreSideBanner />
                  </div>
                </div>
                <div>
                  <StoreFloorBanner />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <ProductsGrid
              title={q ? `Search results for “${q}”` : "All Products"}
              description={
                q
                  ? undefined
                  : "Browse a curated selection of electronics, phones, audio and more."
              }
              items={filtered}
            />
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
// ...existing code...
