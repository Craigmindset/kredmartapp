export type Product = {
  id: string
  title: string
  price: number
  image: string
  images?: string[]
  brand: string
  category: string
  description: string
  specs: string[]
  label?: "Hot Deal" | "New" | "Sale"
  deal?: boolean
}

export const products: Product[] = [
  {
    id: "p-1",
    title: "Smartphone X Pro",
    price: 799,
    brand: "AcmePhone",
    category: "Phones",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Powerful flagship smartphone with stunning display and long-lasting battery life.",
    specs: ["6.7' OLED 120Hz", "8GB RAM", "256GB Storage", "5000mAh"],
    label: "Hot Deal",
    deal: true,
  },
  {
    id: "p-2",
    title: "Noise-Canceling Headphones",
    price: 199,
    brand: "SoundMax",
    category: "Audio",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Immersive over-ear headphones with adaptive noise cancelation and crystal clear audio.",
    specs: ["ANC", "Bluetooth 5.3", "30h Battery", "USB-C Fast Charge"],
    label: "Sale",
    deal: true,
  },
  {
    id: "p-3",
    title: "4K Ultra HD TV 55”",
    price: 599,
    brand: "VisioLux",
    category: "TV",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Cinematic 4K HDR picture with smart OS and voice control.",
    specs: ["55” 4K HDR", "Dolby Vision/Atmos", "120Hz", "Wi‑Fi 6"],
    deal: true,
  },
  {
    id: "p-4",
    title: "Gaming Laptop 15",
    price: 1299,
    brand: "NitroTech",
    category: "Computers",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "High performance laptop for gaming and content creation.",
    specs: ["RTX 4070", "16GB RAM", "1TB NVMe", "QHD 165Hz"],
    label: "New",
  },
  {
    id: "p-5",
    title: "Smartwatch Active",
    price: 249,
    brand: "AcmeWatch",
    category: "Wearables",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Track your health with GPS, heart-rate monitor and 7-day battery life.",
    specs: ["GPS", "SpO2", "Water-Resistant", "7-day Battery"],
    deal: true,
  },
  {
    id: "p-6",
    title: "Bluetooth Speaker Mini",
    price: 79,
    brand: "SoundMax",
    category: "Audio",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Compact speaker with deep bass and waterproof design.",
    specs: ["IP67", "12h Battery", "USB‑C", "Stereo Pair"],
  },
  {
    id: "p-7",
    title: "Wireless Earbuds Pro",
    price: 149,
    brand: "AcmeAudio",
    category: "Audio",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Active noise canceling with transparency mode and low latency.",
    specs: ["ANC", "Transparency", "Wireless Charging", "BT 5.3"],
    deal: true,
  },
  {
    id: "p-8",
    title: "Mirrorless Camera 24MP",
    price: 899,
    brand: "Photonix",
    category: "Cameras",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Lightweight body with 4K video, fast autofocus and dual pixel.",
    specs: ["24MP", "4K/60", "IBIS", "Fast AF"],
  },
  {
    id: "p-9",
    title: "Mechanical Keyboard TKL",
    price: 129,
    brand: "KeyForge",
    category: "Accessories",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Hot-swappable switches, PBT keycaps and RGB underglow.",
    specs: ["Hot-swap", "PBT", "USB‑C", "RGB"],
  },
  {
    id: "p-10",
    title: "Robot Vacuum",
    price: 349,
    brand: "CleanBot",
    category: "Home",
    image: "/placeholder.svg?height=600&width=800",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    description: "Smart mapping, powerful suction and auto dock recharging.",
    specs: ["LiDAR", "APP Control", "120min", "Auto Dock"],
    label: "Hot Deal",
    deal: true,
  },
]

export const allBrands = Array.from(new Set(products.map((p) => p.brand))).sort()
export const allCategories = Array.from(new Set(products.map((p) => p.category))).sort()
