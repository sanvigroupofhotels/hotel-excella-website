"use client"
import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ROOM_TARIFF, CHARGES } from "@/lib/crm-types"

export default function CreateQuote(){
 const [roomType,setRoomType]=useState<"OAK"|"MAPPLE">("OAK")
 const [breakfast,setBreakfast]=useState(true)
 const [nights,setNights]=useState(1)
 const [extraAdults,setExtraAdults]=useState(0)
 const [extraBreakfastCount,setExtraBreakfastCount]=useState(0)
 const [driver,setDriver]=useState(false)
 const [discount,setDiscount]=useState(0)
 const totals=useMemo(()=>{const room=ROOM_TARIFF[roomType][breakfast?"withBreakfast":"withoutBreakfast"]*nights;const extraAdult=extraAdults*CHARGES.extraAdult*nights;const extraBreakfast=breakfast?0:extraBreakfastCount*CHARGES.extraBreakfast*nights;const driverCharge=driver?CHARGES.driver*nights:0;const sub=room+extraAdult+extraBreakfast+driverCharge;const taxes=sub*0.12;const total=sub+taxes-discount;return {room,extraAdult,extraBreakfast,driverCharge,taxes,total}},[roomType,breakfast,nights,extraAdults,extraBreakfastCount,driver,discount])
 return <main className="p-6 grid lg:grid-cols-2 gap-6"><Card className="p-5 space-y-4"><h1 className="font-serif text-3xl">Generate Quote</h1><div><Label>Room Type</Label><Select value={roomType} onValueChange={(v)=>setRoomType(v as "OAK"|"MAPPLE")}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="OAK">Queen Executive (Oak)</SelectItem><SelectItem value="MAPPLE">King Executive (Mapple)</SelectItem></SelectContent></Select></div><div className="flex items-center justify-between"><Label>With Breakfast</Label><Switch checked={breakfast} onCheckedChange={setBreakfast}/></div><div className="grid grid-cols-2 gap-3"><div><Label>Nights</Label><Input type="number" value={nights} onChange={e=>setNights(Number(e.target.value||1))}/></div><div><Label>Extra Adults</Label><Input type="number" value={extraAdults} onChange={e=>setExtraAdults(Number(e.target.value||0))}/></div><div><Label>Extra Breakfast</Label><Input type="number" disabled={breakfast} value={extraBreakfastCount} onChange={e=>setExtraBreakfastCount(Number(e.target.value||0))}/></div><div><Label>Discount</Label><Input type="number" value={discount} onChange={e=>setDiscount(Number(e.target.value||0))}/></div></div><div className="flex items-center justify-between"><Label>Driver Accommodation</Label><Switch checked={driver} onCheckedChange={setDriver}/></div></Card><Card className="p-5"><h2 className="font-serif text-2xl">Live Quote Preview</h2><ul className="mt-4 space-y-2 text-sm"><li>Room Tariff: ₹{totals.room}</li><li>Extra Adults: ₹{totals.extraAdult}</li><li>Extra Breakfast: ₹{totals.extraBreakfast}</li><li>Driver Charges: ₹{totals.driverCharge}</li><li>Taxes: ₹{totals.taxes.toFixed(0)}</li><li className="text-lg text-gold font-semibold">Grand Total: ₹{totals.total.toFixed(0)}</li></ul></Card></main>
}
