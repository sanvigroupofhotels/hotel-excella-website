import { amenities, attractions } from "@/lib/seo/constants"
import type { Faq } from "@/lib/seo/landing-pages"

export type RoomSeoPage = {
  slug: string
  roomName: string
  targetKeywords: string[]
  title: string
  metaTitle: string
  description: string
  intro: string
  image: string
  content: { heading: string; body: string[] }[]
  faqs: Faq[]
}

const attractionList = attractions.map((item) => `${item.name} (${item.distance}, ${item.driveTime})`).join(", ")
const amenityList = amenities.join(", ")

export const roomSeoPages: RoomSeoPage[] = [
  {
    slug: "oak-room",
    roomName: "Oak Room",
    targetKeywords: ["Queen Room Vizag", "Family Room Vizag", "Hotel Room Near Kailasagiri"],
    title: "Oak Room at Hotel Excella",
    metaTitle: "Oak Room | Queen Room Vizag near Kailasagiri | Hotel Excella",
    description:
      "Explore the Oak Room at Hotel Excella, a comfortable queen room in Vizag suited for families, couples and guests visiting Kailasagiri and nearby attractions.",
    intro:
      "The Oak Room is designed for guests who want a comfortable queen room in Vizag with practical amenities, calm interiors and convenient access to Kailasagiri, Tenneti Park and Beach Road side attractions.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room1-gwtPWoLoADzaldmYrRdj4539Sv4Zli.jpg",
    content: [
      {
        heading: "Why choose the Oak Room",
        body: [
          "The Oak Room at Hotel Excella is a comfortable choice for travellers searching for a Queen Room Vizag option that balances premium comfort with value-luxury practicality. It suits couples, solo travellers and small families who want a clean, restful room after visiting Vizag's coastal attractions. The focus is on a straightforward stay experience: comfortable bedding, air conditioning, Free WiFi, daily housekeeping and quick guest support.",
          "Guests looking for a family room in Vizag often need more than a bed; they need a location that makes sightseeing easier. Hotel Excella is positioned near the Beach Road side of the city, with Kailasagiri approximately 1.8 km away, Tenneti Park approximately 1.2 km away and Indira Gandhi Zoological Park approximately 2.4 km away. This helps families plan outings without spending the whole day in transit.",
        ],
      },
      {
        heading: "Room features and amenities",
        body: [
          `Oak Room guests can expect practical amenities including ${amenityList}. The room is a strong fit for guests who want comfort near the coast rather than exaggerated location claims. Hotel Excella's location keeps you close to attractions while preserving a calm place to return to after sightseeing.`,
          "The room is especially useful for guests who prefer a clean, compact and restful stay. If your plan includes short local drives, family outings, temple visits or work travel, the Oak Room gives you the essentials without unnecessary complexity.",
        ],
      },
      {
        heading: "Oak Room vs Mapple Room comparison",
        body: [
          "Choose the Oak Room when you want a queen-room style stay with practical comfort, easy booking and a room that supports solo travel, couple trips or small family visits. It is the better fit when your priority is clean accommodation, local convenience and sensible value.",
          "Choose the Mapple Room when you prefer a king-room style or deluxe-room feel with a more spacious experience. Both rooms connect naturally to the Hotel Excella stay promise: comfortable rooms, direct booking support, WhatsApp assistance, nearby attractions and a value-luxury stay near Beach Road side routes.",
        ],
      },
      {
        heading: "Nearby attractions from the Oak Room",
        body: [
          `Nearby places include ${attractionList}. For a short trip, combine Kailasagiri and Tenneti Park in one outing. For a family itinerary, add the zoo park or plan Rushikonda Beach for a separate half-day visit.`,
          "The Oak Room works well as a rest point between plans. Families can return after the zoo or park, couples can plan a coastal drive and business travellers can use the room as a calm base after work while still keeping popular sights within reach.",
        ],
      },
      {
        heading: "Direct booking and WhatsApp CTA",
        body: [
          "Book the Oak Room directly through Hotel Excella to confirm availability, understand current pricing and ask whether this room matches your travel purpose. Direct booking is useful when guests need clarity before arrival, especially for family trips, early check-in questions or short leisure stays.",
          "Use the Book Now button or WhatsApp Hotel Excella to ask about the Oak Room. You can also explore the rooms hub, amenities, gallery, location, contact page, attractions hub, dining options and why book direct page before confirming your stay.",
        ],
      },
    ],
    faqs: [
      { question: "Is the Oak Room a queen room in Vizag?", answer: "Yes. The Oak Room is positioned as a comfortable queen room option at Hotel Excella in Vizag." },
      { question: "Is the Oak Room suitable for families?", answer: "Yes. The Oak Room suits small families looking for a clean, comfortable stay near Kailasagiri and other Vizag attractions." },
      { question: "How far is Kailasagiri from Hotel Excella?", answer: "Kailasagiri is approximately 1.8 km from Hotel Excella, with a typical local drive time of 6–9 minutes." },
      { question: "What is the difference between the Oak Room and Mapple Room?", answer: "The Oak Room is positioned for queen-room style practical comfort, while the Mapple Room is positioned for guests who prefer a more spacious king-room style stay." },
      { question: "Can I book the Oak Room directly?", answer: "Yes. Use the Book Now CTA or WhatsApp Hotel Excella to check Oak Room availability and pricing." },
      { question: "What attractions are near the Oak Room at Hotel Excella?", answer: "Nearby attractions include Tenneti Park, Kailasagiri, Indira Gandhi Zoological Park, YSR View Point, Rushikonda Beach and TTD Temple Rushikonda." },
    ],
  },
  {
    slug: "mapple-room",
    roomName: "Mapple Room",
    targetKeywords: ["King Room Vizag", "Deluxe Room Visakhapatnam", "Premium Room Near Beach Road"],
    title: "Mapple Room at Hotel Excella",
    metaTitle: "Mapple Room | King Room Vizag near Beach Road | Hotel Excella",
    description:
      "Explore the Mapple Room at Hotel Excella, a premium king room in Vizag for guests seeking a deluxe room near Beach Road side attractions.",
    intro:
      "The Mapple Room is crafted for guests who prefer a spacious king room in Vizag with premium comfort, quick access to Beach Road side attractions and a value-luxury stay experience.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room2-UfQMHpyryUBdNLST83IpWIvfh3PizR.jpg",
    content: [
      {
        heading: "Why choose the Mapple Room",
        body: [
          "The Mapple Room at Hotel Excella is suited for travellers searching for a King Room Vizag or Deluxe Room Visakhapatnam option near the city's coastal attraction corridor. It provides a more spacious feel for couples, families and business travellers who want a polished stay without unnecessary claims. The room is ideal when you want premium comfort near Beach Road, focused on convenient Beach Road side access.",
          "Hotel Excella's positioning helps Mapple Room guests move efficiently around Vizag. Tenneti Park is approximately 1.2 km away, Kailasagiri is approximately 1.8 km away, Indira Gandhi Zoological Park is approximately 2.4 km away, YSR View Point is approximately 3.0 km away, Rushikonda Beach is approximately 6.5 km away, and TTD Temple Rushikonda is approximately 7.2 km away.",
        ],
      },
      {
        heading: "Room features and deluxe amenities",
        body: [
          `Guests booking the Mapple Room can expect helpful amenities including ${amenityList}. The room supports guests who want clean interiors, comfortable bedding, convenient connectivity and reliable service. It is also a strong option for business travellers who need WiFi and fast check-in while staying close to the Beach Road side of Vizag.`,
          "For couples, the Mapple Room offers a calm and comfortable base for coastal drives, temple visits and relaxed sightseeing. For families, it keeps popular parks, viewpoints and the zoo within practical driving distance. For work trips, it offers a better balance between accessibility and rest than a crowded tourist-only location.",
        ],
      },
      {
        heading: "Mapple Room vs Oak Room comparison",
        body: [
          "Choose the Mapple Room when you want a king-room style or deluxe-room feel with a stronger sense of space and premium comfort. It is especially suitable for couples, families and business travellers who want a polished room near Beach Road side routes.",
          "Choose the Oak Room when you prefer queen-room style practicality with compact comfort and sensible value. Both rooms include the Hotel Excella advantages guests care about: clean accommodation, direct booking, WhatsApp support, nearby attractions, amenities, gallery, location and contact information.",
        ],
      },
      {
        heading: "Nearby attractions from the Mapple Room",
        body: [
          `Nearby places include ${attractionList}. Guests can plan Tenneti Park and Kailasagiri as a short local outing, add YSR View Point for a scenic drive, or reserve Rushikonda Beach and TTD Temple Rushikonda for a half-day coastal route.`,
          "The Mapple Room supports flexible itineraries. It works for a one-night business trip, a family weekend, a couple-friendly coastal stay or a tourist plan that combines beaches, viewpoints and parks without changing hotels.",
        ],
      },
      {
        heading: "Direct booking and WhatsApp CTA",
        body: [
          "Book the Mapple Room directly to confirm availability, current pricing and suitability for your stay. Direct communication helps guests decide between the Oak Room and Mapple Room before arrival and keeps check-in questions clear.",
          "Use the Book Now CTA or WhatsApp Hotel Excella for Mapple Room availability. Guests can also review the rooms hub, amenities, gallery, location, contact page, dining options, attractions hub and why book direct page before confirming the stay.",
        ],
      },
    ],
    faqs: [
      { question: "Is the Mapple Room a king room in Vizag?", answer: "Yes. The Mapple Room is positioned as a king room option at Hotel Excella with premium comfort." },
      { question: "Is the Mapple Room near Beach Road?", answer: "Hotel Excella offers convenient access to the Beach Road side of Vizag and nearby attractions such as Tenneti Park and Kailasagiri." },
      { question: "Is the Mapple Room suitable for business travellers?", answer: "Yes. The Mapple Room is business traveller friendly with WiFi, fast check-in and a comfortable stay environment." },
      { question: "What is the difference between the Mapple Room and Oak Room?", answer: "The Mapple Room is positioned for king-room style premium comfort, while the Oak Room is positioned for queen-room style practical comfort and value." },
      { question: "How can I check Mapple Room availability?", answer: "Use the Book Now CTA or WhatsApp Hotel Excella to check current Mapple Room availability and pricing." },
      { question: "What attractions are near the Mapple Room at Hotel Excella?", answer: "Nearby attractions include Tenneti Park, Kailasagiri, Indira Gandhi Zoological Park, YSR View Point, Rushikonda Beach and TTD Temple Rushikonda." },
    ],
  },
]

export const roomPageBySlug = new Map(roomSeoPages.map((page) => [page.slug, page]))
