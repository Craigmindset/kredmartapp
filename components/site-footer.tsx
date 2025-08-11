import Link from "next/link"
import { appFontClass } from "@/lib/fonts"

export default function SiteFooter() {
  return (
    <footer className={`border-t bg-background ${appFontClass}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:underline">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:underline">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@kredmart.example</li>
              <li>Phone: +1 (555) 123‑4567</li>
              <li>Chat: Mon‑Fri 9am‑5pm</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Media</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:underline">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Brand Assets
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-xs text-muted-foreground">
          {"© "}
          {new Date().getFullYear()}
          {" KredMart. All rights reserved."}
        </div>
      </div>
    </footer>
  )
}
