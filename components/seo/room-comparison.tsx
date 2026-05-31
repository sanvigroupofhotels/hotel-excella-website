import { roomComparison } from "@/lib/seo/content"

const fields = [
  ["Bed Type", "bedType"],
  ["Room Type", "roomType"],
  ["Occupancy", "occupancy"],
  ["Breakfast Options", "breakfast"],
  ["Best For", "bestFor"],
  ["Key Features", "features"],
] as const

export function RoomComparisonSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Room comparison</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">Compare Oak Room and Mapple Room</h2>
          <p className="mt-4 text-muted-foreground">Choose the room that best matches your stay purpose, comfort preference and occupancy needs.</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid bg-primary/10 text-sm font-bold text-foreground md:grid-cols-[0.8fr_1fr_1fr]">
            <div className="p-4">Feature</div>
            {roomComparison.map((room) => <div key={room.room} className="border-t border-border p-4 md:border-l md:border-t-0">{room.room}</div>)}
          </div>
          {fields.map(([label, key]) => (
            <div key={label} className="grid border-t border-border text-sm md:grid-cols-[0.8fr_1fr_1fr]">
              <div className="bg-background p-4 font-semibold text-foreground">{label}</div>
              {roomComparison.map((room) => <div key={room.room} className="border-t border-border p-4 text-muted-foreground md:border-l md:border-t-0">{room[key]}</div>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
