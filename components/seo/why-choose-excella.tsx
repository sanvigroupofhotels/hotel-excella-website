import { CheckCircle2 } from "lucide-react"
import { whyChooseItems } from "@/lib/seo/constants"

export function WhyChooseExcella() {
  return (
    <section className="rounded-3xl border border-primary/20 bg-card/80 p-6 shadow-2xl shadow-black/20 md:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Why Choose Hotel Excella</p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
          Comfort Near the Coast with Convenient Access to Vizag Attractions
        </h2>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseItems.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-4">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
