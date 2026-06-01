import { attractions } from "@/lib/seo/constants"
import type { Faq } from "@/lib/seo/landing-pages"

export type BlogPost = {
  slug: string
  title: string
  metaTitle: string
  description: string
  excerpt: string
  date: string
  sections: { heading: string; body: string[] }[]
  faqs: Faq[]
}

const attractionSummary = attractions.map((item) => `${item.name} (${item.distance}, ${item.travelTime})`).join(", ")

function post(slug: string, title: string, focus: string, angle: string): BlogPost {
  return {
    slug,
    title,
    metaTitle: `${title} | Hotel Excella, Visakhapatnam`,
    description: `${angle} Plan your Vizag stay from Hotel Excella, Visakhapatnam with practical local tips, internal links and direct enquiry support.`,
    excerpt: angle,
    date: "2026-06-01",
    sections: [
      {
        heading: `How to plan ${focus}`,
        body: [
          `${title} starts with choosing a comfortable base. Hotel Excella, Visakhapatnam is located in Vishalakshi Nagar, approximately 200 meters walking distance to Beach Road. It is not directly on the beach or sea-facing; it is a practical stay option with convenient access to major attractions, restaurants and local transport.`,
          `For sightseeing, keep the day flexible. Nearby places include ${attractionSummary}. Start early during weekends and keep buffer time for traffic around Beach Road and popular viewpoints.`,
        ],
      },
      {
        heading: "Suggested local itinerary from Hotel Excella",
        body: [
          "A short trip can combine Tenneti Park and Kailasagiri in one outing. A longer coastal-side plan can include Rushikonda Beach, TTD Temple Rushikonda and YSR View Point. Families with children can reserve a separate half-day for Indira Gandhi Zoological Park.",
          "Guests can compare rooms on the Rooms page, read the Oak Room and Mapple Room pages, then use WhatsApp to enquire directly about availability. For dining, the restaurants guide covers Kamat, Pista House and Kailash Parbat near Hotel Excella.",
        ],
      },
      {
        heading: "Why Hotel Excella works for this trip",
        body: [
          "The hotel is suitable for families, tourists and business travelers who want a clean, comfortable stay in Visakhapatnam without exaggerated location claims. The focus is simple: reliable rooms, responsive communication and convenient access to tourist destinations.",
          "Use internal guides for places to visit near Hotel Excella, restaurants near Hotel Excella and why to book direct when you want faster support or personalized assistance.",
        ],
      },
    ],
    faqs: [
      { question: `Is Hotel Excella a good base for ${focus}?`, answer: "Yes. Hotel Excella, Visakhapatnam is a practical base for local sightseeing because it is near Beach Road and offers convenient access to major attractions." },
      { question: "How do I enquire about room availability?", answer: "Use the WhatsApp buttons on the website or call +91 9985908131 to contact Hotel Excella directly." },
      { question: "Is Hotel Excella directly on the beach or sea-facing?", answer: "No. Hotel Excella is not directly on the beach or sea-facing. It is located in Vishalakshi Nagar, approximately 200 meters walking distance to Beach Road." },
    ],
  }
}

export const blogPosts: BlogPost[] = [
  post("best-places-to-visit-in-vizag", "Best Places to Visit in Vizag", "the best places to visit in Vizag", "Explore parks, viewpoints, beaches, temples and family-friendly attractions near Hotel Excella."),
  post("kailasagiri-travel-guide", "Kailasagiri Travel Guide", "a Kailasagiri visit", "Plan a smooth trip to Kailasagiri with distance, timing and nearby attraction ideas."),
  post("rushikonda-beach-guide", "Rushikonda Beach Guide", "a Rushikonda Beach outing", "Use this practical Rushikonda Beach guide for a relaxed coastal-side plan from the hotel."),
  post("family-vacation-in-vizag", "Family Vacation in Vizag", "a family vacation in Vizag", "Build a family-friendly itinerary around clean rooms, easy routes and balanced sightseeing."),
  post("things-to-do-near-beach-road", "Things to Do Near Beach Road", "things to do near Beach Road", "Find nearby parks, viewpoints, food stops and easy half-day plans near Beach Road."),
  post("weekend-trip-to-vizag", "Weekend Trip to Vizag", "a weekend trip to Vizag", "Plan a two-day Vizag itinerary with nearby attractions and direct hotel enquiry support."),
  post("vizag-tourist-attractions", "Vizag Tourist Attractions", "Vizag tourist attractions", "Compare major tourist attractions near Hotel Excella with approximate travel times."),
  post("restaurants-near-beach-road", "Restaurants Near Beach Road", "restaurants near Beach Road", "Find dining ideas near the Beach Road side of Vizag, including options close to Hotel Excella."),
  post("family-travel-guide-to-vizag", "Family Travel Guide to Vizag", "family travel in Vizag", "A family-first guide covering attractions, travel pacing and comfortable stay planning."),
  post("local-sightseeing-near-hotel-excella", "Local Sightseeing Near Hotel Excella", "local sightseeing near Hotel Excella", "Use Hotel Excella as a practical base for local sightseeing around northern Vizag."),
]

export const blogPostBySlug = new Map(blogPosts.map((post) => [post.slug, post]))
