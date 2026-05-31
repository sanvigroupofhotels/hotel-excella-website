import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { RoomSeoPage } from "@/components/seo/room-page"
import { pageMetadata } from "@/lib/seo/site"

const room = { name: "Oak Room", path: "/rooms/oak-room", bed: "queen", h1: "Oak Room - Queen Room in Vizag", keywords: ["Queen Room Vizag", "Deluxe Room Visakhapatnam", "Family Room Near Beach Road"], intro: "The Oak Room at Hotel Excella is a comfortable queen room in Vizag for guests who want a deluxe room near Beach Road with easy access to Tenneti Park, Kailasagiri and Rushikonda Beach." }
export const metadata: Metadata = pageMetadata({ title: "Oak Room | Queen Room Vizag Near Beach Road", description: "Book the Oak Room at Hotel Excella, a queen room and deluxe room in Visakhapatnam ideal for families near Beach Road and Vizag attractions.", path: room.path })
export default function Page(){return <div className="min-h-screen bg-background"><Header/><main className="pt-20"><RoomSeoPage room={room}/></main><Footer/><StickyCTA/></div>}
