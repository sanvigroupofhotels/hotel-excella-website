"use client"
import { useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ROOM_TARIFFS, EXTRA_ADULT_CHARGE, DRIVER_CHARGE, EXTRA_BREAKFAST_CHARGE } from "@/lib/quote-config"

export default function QuoteForm() {
  const [form, setForm] = useState<any>({guest_name:"",phone:"",email:"",source:"Direct",checkin:"",checkout:"",guests:2,room_type:"oak",breakfast_included:true,extra_adults:0,driver_count:0,extra_breakfast_count:0,early_checkin:0,late_checkout:0,discount:0,notes:""})
  const nights = useMemo(()=> form.checkin && form.checkout ? Math.max(1, Math.ceil((new Date(form.checkout).getTime()-new Date(form.checkin).getTime())/86400000)) : 1,[form.checkin,form.checkout])
  const baseRate = form.breakfast_included ? ROOM_TARIFFS[form.room_type as "oak"|"maple"].withBreakfast : ROOM_TARIFFS[form.room_type as "oak"|"maple"].withoutBreakfast
  const roomTariff = baseRate * nights
  const extraAdultCharge = form.extra_adults * EXTRA_ADULT_CHARGE * nights
  const driverCharge = form.driver_count * DRIVER_CHARGE * nights
  const extraBreakfastCharge = form.breakfast_included ? 0 : form.extra_breakfast_count * EXTRA_BREAKFAST_CHARGE * nights
  const surcharge = (form.early_checkin<0 ? baseRate : form.early_checkin) + (form.late_checkout<0 ? baseRate : form.late_checkout)
  const subTotal = roomTariff + extraAdultCharge + driverCharge + extraBreakfastCharge + surcharge
  const taxes = Math.round(subTotal * 0.12)
  const total = subTotal + taxes - Number(form.discount||0)

  const save = async () => {
    const supabase = createClient()
    const payload = { ...form, nights, room_tariff: roomTariff, extra_adult_charge: extraAdultCharge, driver_charge: driverCharge, extra_breakfast_charge: extraBreakfastCharge, taxes, total_amount: total, status: "Pending", quote_reference: `EXQ-${Date.now().toString().slice(-8)}` }
    const { data, error } = await supabase.from("quotes").insert(payload).select().single()
    if (error) return alert(error.message)
    await supabase.from("quote_activities").insert({ quote_id: data.id, action: "quote_created", metadata: payload })
    location.href = `/quotes/${data.id}`
  }

  return <div className="grid gap-6 lg:grid-cols-2"><div className="space-y-3">{['guest_name','phone','email','source','checkin','checkout'].map(k => <input key={k} className="w-full rounded border p-2 bg-black/20" placeholder={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} />)}<select className="w-full rounded border p-2" value={form.room_type} onChange={e=>setForm({...form,room_type:e.target.value})}><option value='oak'>Queen Executive (Oak)</option><option value='maple'>King Executive (Maple)</option></select><label className="block"><input type='checkbox' checked={form.breakfast_included} onChange={e=>setForm({...form,breakfast_included:e.target.checked})}/> Breakfast included</label><button onClick={save} className="px-4 py-2 bg-amber-500 rounded">Create Quote</button></div><div className="rounded-2xl border p-6 bg-zinc-950 text-zinc-100"><h3 className="text-xl mb-2">Live Preview</h3><p>{ROOM_TARIFFS[form.room_type as "oak"|"maple"].label}</p><p>Nights: {nights}</p><p>Standard Check-in: 1:00 PM & Later</p><p>Standard Check-out: 11:00 AM & Earlier</p><p>Subtotal: ₹{subTotal}</p><p>Taxes: ₹{taxes}</p><p className="text-2xl text-amber-400">Total: ₹{total}</p></div></div>
}
