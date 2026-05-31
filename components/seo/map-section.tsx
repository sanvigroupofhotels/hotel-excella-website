import { ExternalLink, MapPin } from "lucide-react"

export function GoogleMapSection({ title = "Find Hotel Excella on Google Maps" }: { title?: string }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="rounded-3xl border border-primary/25 bg-card p-8">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground">{title}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Use Google Maps for live routes to Hotel Excella, 386 Revenue Employees Co-operative Society Colony, Visalakshi Nagar, Visakhapatnam, Andhra Pradesh 530043.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="https://maps.app.goo.gl/C4MScoYMJLYnc3Gz6?g_st=ac" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Open in Google Maps <ExternalLink className="h-4 w-4" /></a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Hotel%20Excella%20Visalakshi%20Nagar%20Visakhapatnam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/60 px-5 py-3 text-sm font-bold text-primary">Get Directions <ExternalLink className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <iframe title="Hotel Excella Google Map" src="https://www.google.com/maps?q=Hotel%20Excella%2C%20386%20Revenue%20Employees%20Co-operative%20Society%20Colony%2C%20Visalakshi%20Nagar%2C%20Visakhapatnam%20530043&output=embed" className="h-[360px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  )
}
