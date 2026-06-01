import { attractions, amenities } from "@/lib/seo/constants"
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
        heading: "A queen room in Vizag for relaxed stays",
        body: [
          "The Oak Room at Hotel Excella is a comfortable choice for travellers searching for a Queen Room Vizag option that balances premium comfort with value-luxury practicality. It suits couples, solo travellers and small families who want a clean, restful room after visiting Vizag's coastal attractions. The focus is on a straightforward stay experience: comfortable bedding, air conditioning, Free WiFi, daily housekeeping and quick guest support.",
          "Guests looking for a family room in Vizag often need more than a bed; they need a location that makes sightseeing easier. Hotel Excella is positioned near the Beach Road side of the city, with Kailasagiri approximately 1.8 km away, Tenneti Park approximately 1.2 km away and Indira Gandhi Zoological Park approximately 2.4 km away. This helps families plan outings without spending the whole day in transit.",
        ],
      },
      {
        heading: "Amenities and nearby attractions",
        body: [
          `Oak Room guests can expect practical amenities including ${amenities.slice(0, 6).join(", ")}. The room is a strong fit for guests who want comfort near the coast rather than exaggerated location claims. Hotel Excella's location keeps you close to attractions while preserving a calm place to return to after sightseeing.`,
          `Nearby places include ${attractions.map((item) => `${item.name} (${item.distance}, ${item.driveTime})`).join(", ")}. For a short trip, combine Kailasagiri and Tenneti Park in one outing. For a family itinerary, add the zoo park or plan Rushikonda Beach for a separate half-day visit.`,
        ],
      },
      {
        heading: "Best suited for families, couples and business travellers",
        body: [
          "The Oak Room works well for families seeking a comfortable base, couples planning a Vizag break, and business travellers who want WiFi and fast check-in. It is also useful for visitors searching for a hotel room near Kailasagiri because the attraction is only a short local drive away. The room experience supports the broader Hotel Excella promise: comfortable stay in Vizag with convenient access to attractions.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the Oak Room a queen room in Vizag?",
        answer: "Yes. The Oak Room is positioned as a comfortable queen room option at Hotel Excella in Vizag.",
      },
      {
        question: "Is the Oak Room suitable for families?",
        answer: "Yes. The Oak Room suits small families looking for a clean, comfortable stay near Kailasagiri and other Vizag attractions.",
      },
      {
        question: "How far is Kailasagiri from Hotel Excella?",
        answer: "Kailasagiri is approximately 1.8 km from Hotel Excella, with a typical local drive time of 6–9 minutes.",
      },
      {
        question: "Can I book the Oak Room directly?",
        answer: "Yes. Use the Book Now CTA or WhatsApp Hotel Excella to check room availability and pricing.",
      },
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
        heading: "A king room in Vizag with premium comfort",
        body: [
          "The Mapple Room at Hotel Excella is suited for travellers searching for a King Room Vizag or Deluxe Room Visakhapatnam option near the city's coastal attraction corridor. It provides a more spacious feel for couples, families and business travellers who want a polished stay without unnecessary claims. The room is ideal when you want premium comfort near Beach Road, focused on convenient Beach Road side access.",
          "Hotel Excella's positioning helps Mapple Room guests move efficiently around Vizag. Tenneti Park is approximately 1.2 km away, Kailasagiri is approximately 1.8 km away, Indira Gandhi Zoological Park is approximately 2.4 km away, YSR View Point is approximately 3.0 km away, Rushikonda Beach is approximately 6.5 km away, and TTD Temple Rushikonda is approximately 7.2 km away. These distances make the room practical for both short stays and attraction-focused weekends.",
        ],
      },
      {
        heading: "Amenities for a deluxe stay experience",
        body: [
          `Guests booking the Mapple Room can expect helpful amenities including ${amenities.join(", ")}. The room supports guests who want clean interiors, comfortable bedding, convenient connectivity and reliable service. It is also a strong option for business travellers who need WiFi and fast check-in while staying close to the Beach Road side of Vizag.`,
          "For couples, the Mapple Room offers a calm and comfortable base for coastal drives, temple visits and relaxed sightseeing. For families, it keeps popular parks, viewpoints and the zoo within practical driving distance. For work trips, it offers a better balance between accessibility and rest than a crowded tourist-only location.",
        ],
      },
      {
        heading: "Premium room near Beach Road attractions",
        body: [
          "If your priority is a premium room near Beach Road, the Mapple Room fits the Hotel Excella experience: comfortable stay in Vizag, convenient access to attractions and a value-luxury approach. Book direct to check availability, or use WhatsApp for room pricing and trip-specific questions before arrival.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the Mapple Room a king room in Vizag?",
        answer: "Yes. The Mapple Room is positioned as a king room option at Hotel Excella with premium comfort.",
      },
      {
        question: "Is the Mapple Room near Beach Road?",
        answer: "Hotel Excella offers convenient access to the Beach Road side of Vizag and nearby attractions such as Tenneti Park and Kailasagiri.",
      },
      {
        question: "Is the Mapple Room suitable for business travellers?",
        answer: "Yes. The Mapple Room is business traveller friendly with WiFi, fast check-in and a comfortable stay environment.",
      },
      {
        question: "How can I check Mapple Room availability?",
        answer: "Use the Book Now CTA or WhatsApp Hotel Excella to check current room availability and pricing.",
      },
    ],
  },
]

export const roomPageBySlug = new Map(roomSeoPages.map((page) => [page.slug, page]))
