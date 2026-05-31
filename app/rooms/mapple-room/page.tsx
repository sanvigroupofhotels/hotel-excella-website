import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { RoomSeoPage } from "@/components/seo/room-page"
import { pageMetadata } from "@/lib/seo/site"

const room = { name: "Mapple Room", path: "/rooms/mapple-room", bed: "king", h1: "Mapple Room - King Size Room in Vizag", keywords: ["King Size Room Vizag", "Deluxe King Room Visakhapatnam", "Premium Stay Near Kailasagiri"], intro: "The Mapple Room at Hotel Excella is a premium king size room in Vizag for guests who want deluxe comfort near Kailasagiri, Beach Road, Rushikonda Beach and key Visakhapatnam attractions." }
export const metadata: Metadata = pageMetadata({ title: "Mapple Room | King Size Room Vizag Near Kailasagiri", description: "Book the Mapple Room at Hotel Excella, a deluxe king room in Visakhapatnam for premium stays near Kailasagiri and Beach Road.", path: room.path })
export default function Page(){return <div className="min-h-screen bg-background"><Header/><main className="pt-20"><RoomSeoPage room={room}/></main><Footer/><StickyCTA/></div>}
