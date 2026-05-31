import { CheckCircle } from "lucide-react"
import { whyChooseItems } from "@/lib/seo/content"

export function WhyChooseHotelExcella() {
  return (
    <section className="border-y border-border bg-card/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Why choose us</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">Why Guests Choose Hotel Excella</h2>
          <p className="mt-4 text-muted-foreground">Premium comfort, honest local positioning and convenient access to Vizag’s major attractions.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 text-sm font-semibold text-foreground">
              <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
