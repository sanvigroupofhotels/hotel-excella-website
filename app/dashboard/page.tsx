"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
const kpis=["Total Quotes","Converted","Pending","Negotiating","Revenue Pipeline","Conversion Rate","Upcoming Follow-ups","Overdue Follow-ups","Total Expected Revenue"]
export default function Dashboard(){return <main className="p-6 space-y-6"><div className="flex justify-between"><h1 className="font-serif text-4xl">Reservations CRM Dashboard</h1><div className="space-x-2"><Button asChild><Link href='/quotes/create'>Create Quote</Link></Button><Button variant='outline' asChild><Link href='/quotes/history'>History</Link></Button></div></div><div className="grid md:grid-cols-3 gap-4">{kpis.map(k=><Card key={k} className="p-4 border-gold/40"><p className="text-sm text-muted-foreground">{k}</p><p className="text-2xl font-semibold mt-2">—</p></Card>)}</div></main>}
