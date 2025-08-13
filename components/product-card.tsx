"use client"

import { useState } from "react"
import { Eye, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useCart } from "@/store/cart-store"
import { useToast } from "@/hooks/use-toast"
import { formatNaira } from "@/lib/currency"

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [fly, setFly] = useState(false)
  const add = useCart((s) => s.add)
  const { toast } = useToast()

  const onAdd = (q = 1) => {
    add(product, q)
    toast({ title: "Added to cart", description: product.title })
  setFly(true)
  setTimeout(() => setFly(false), 900)
  }

  return (
    <>
      <div className="group relative rounded-lg border bg-card">
        <div className="relative">
          {product.label && (
            <Badge
              className={`absolute left-2 top-2 z-10 ${["Hot Deal", "Sales"].includes(product.label) ? "bg-red-600 text-white" : ""}`}
              variant={ ["Hot Deal", "Sales"].includes(product.label) ? undefined : "secondary" }
            >
              {product.label}
            </Badge>
          )}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={300}
            className="h-48 w-full rounded-t-lg object-cover cursor-pointer"
            onClick={() => onAdd(1)}
          />
          {/* Show buttons always on mobile, on hover for desktop */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 sm:hidden">
            <Button size="icon" variant="secondary" onClick={() => onAdd(1)} aria-label="Add to cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="secondary" onClick={() => setOpen(true)} aria-label="Preview">
              <Eye className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/30 sm:group-hover:flex">
            <Button size="icon" variant="secondary" onClick={() => onAdd(1)} aria-label="Add to cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="secondary" onClick={() => setOpen(true)} aria-label="Preview">
              <Eye className="h-5 w-5" />
            </Button>
          </div>
          {/* ...existing code... */}
        </div>
        <div className="p-3">
          <div className="text-sm text-muted-foreground">{product.brand}</div>
          <div className="line-clamp-1 font-medium">{product.title}</div>
          <div className="mt-1 font-semibold">{formatNaira(product.price)}</div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{product.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Image
                src={product.images?.[0] ?? product.image}
                alt={product.title + " main"}
                width={600}
                height={400}
                className="h-64 w-full rounded-md object-cover"
              />
              <div className="grid grid-cols-3 gap-2">
                {(product.images ?? [product.image]).slice(0, 3).map((img, i) => (
                  <Image
                    key={i}
                    src={img || "/placeholder.svg"}
                    alt={"Gallery " + (i + 1)}
                    width={200}
                    height={120}
                    className="h-20 w-full rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">{product.description}</p>
              <div>
                <h4 className="mb-2 text-sm font-medium">Specifications</h4>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                  {product.specs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Qty</span>
                <Input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                  className="w-20"
                />
              </div>
              <div className="relative w-full">
                <Button className="w-full" onClick={() => onAdd(qty)}>
                  {"Add to cart — " + formatNaira(qty * product.price)}
                </Button>
                {/* Animated basket icon on mobile, only in modal */}
                <span
                  className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none
                    ${fly ? 'animate-basket-fly' : 'opacity-0'}
                    sm:hidden`}
                  style={{ transition: 'opacity 0.2s' }}
                >
                  <ShoppingCart className="h-8 w-8 text-[#466cf4] drop-shadow-lg" />
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
// Tailwind CSS animation (add to your global CSS if not present)
// @layer utilities {
//   @keyframes basket-fly {
//     0% { opacity: 1; transform: translate(-50%,-50%) scale(1) rotate(0deg); }
//     60% { opacity: 1; transform: translate(-50%,-120%) scale(1.2) rotate(-20deg); }
//     100% { opacity: 0; transform: translate(-50%,-220%) scale(0.7) rotate(-40deg); }
//   }
//   .animate-basket-fly {
//     animation: basket-fly 0.9s cubic-bezier(.4,1.7,.7,1) both;
//   }
// }
