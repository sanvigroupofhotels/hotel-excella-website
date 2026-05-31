import { Star } from "lucide-react"
import { reviewSnippets } from "@/lib/seo/content"

export function ReviewSnippets({ title = "Guest review highlights" }: { title?: string }) {
  return (
    <section className="border-y border-border bg-card/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Trust signals</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviewSnippets.map((review) => (
            <figure key={review.quote} className="rounded-2xl border border-border bg-background p-6">
              <div className="flex gap-1 text-primary" aria-label="5 star review">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 leading-7 text-muted-foreground">“{review.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-foreground">— {review.guest}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
