import Link from "next/link"
import { publicLinks } from "@/lib/seo/site"

export function InternalLinks() {
  return (
    <nav aria-label="Helpful hotel links" className="rounded-2xl border border-primary/20 bg-card p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Plan your stay</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {publicLinks.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:border-primary hover:text-primary">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
