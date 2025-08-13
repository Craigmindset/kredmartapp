import Link from "next/link";
import { appFontClass } from "@/lib/fonts";

export default function SiteFooter() {
  return (
    <footer className={`border-t  bg-black text-white ${appFontClass}`}>
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex flex-row flex-wrap sm:gap-2 justify-center">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">
              Quick Links
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link
                  href="/store"
                  className="hover:text-white transition-colors"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="hover:text-white transition-colors"
                >
                  KredMart Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">Support</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link
                  href="/help"
                  className="hover:text-white transition-colors"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-white transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">
              Contact us
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Email: support@kredmart.com</li>
              <li>Phone: +23480000000</li>
              <li>Chat: Mon‑Fri 9am‑5pm</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">Media</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Brand Assets
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-xs text-gray-400">
          {"© "}
          {new Date().getFullYear()}
          {" KredMart. All rights reserved."}
        </div>
      </div>
    </footer>
  );
}
