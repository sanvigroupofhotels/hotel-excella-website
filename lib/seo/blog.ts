import type { Faq } from "@/lib/seo/content"

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  hero: string
  sections: { heading: string; body: string[] }[]
  faqs: Faq[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-places-to-visit-in-vizag",
    title: "Best Places to Visit in Vizag",
    description: "Plan a comfortable Vizag trip with Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple, YSR View Point and the Zoo Park near Hotel Excella.",
    date: "2026-05-31",
    readingTime: "5 min read",
    hero: "Comfortable Vizag sightseeing near Beach Road",
    sections: [
      { heading: "Build a simple coastal itinerary", body: ["Vizag works best when guests group nearby attractions instead of rushing across the city. Hotel Excella is positioned for convenient access to Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach and family attractions around the north coastal corridor.", "Start with Tenneti Park and Kailasagiri for views, continue toward Rushikonda Beach and TTD Temple Rushikonda, then reserve time for Indira Gandhi Zoological Park if you are travelling with children."] },
      { heading: "Stay near attractions, not misleading claims", body: ["Hotel Excella is not promoted as a beachfront or sea-view hotel. The value is practical: premium comfort, direct booking support, fast assistance and a location that keeps major Vizag experiences within a comfortable drive."] },
    ],
    faqs: [
      { question: "What are the best places to visit near Hotel Excella?", answer: "Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park are key nearby attractions." },
      { question: "Is Hotel Excella good for a family Vizag trip?", answer: "Yes. The hotel is family friendly and offers comfortable rooms near major attractions." },
    ],
  },
  {
    slug: "family-trip-guide-to-vizag",
    title: "Family Trip Guide to Vizag",
    description: "A family-friendly Vizag guide covering attractions, room comfort, direct booking, WiFi and practical travel planning near Hotel Excella.",
    date: "2026-05-31",
    readingTime: "4 min read",
    hero: "Family-friendly stay planning in Vizag",
    sections: [
      { heading: "Choose a calm base", body: ["Families usually need clean rooms, quick check-in, WiFi, guest assistance and easy access to attractions. Hotel Excella is designed around those practical needs while staying close to Tenneti Park, Kailasagiri and Rushikonda Beach routes."] },
      { heading: "Plan attractions by drive time", body: ["Keep mornings for parks, viewpoints or the zoo, and evenings for Beach Road access or Rushikonda. Approximate drive times from Hotel Excella range from about 5–20 minutes for the main attraction cluster depending on traffic."] },
    ],
    faqs: [
      { question: "Is Hotel Excella family friendly?", answer: "Yes. Hotel Excella is suitable for families seeking comfortable rooms, WiFi, guest support and convenient attraction access." },
      { question: "Which room should families choose?", answer: "Oak Room works well for compact family stays, while Mapple Room is better when guests prefer a king bed and extra comfort." },
    ],
  },
  {
    slug: "things-to-do-near-hotel-excella",
    title: "Things to Do Near Hotel Excella",
    description: "Explore nearby things to do from Hotel Excella including Beach Road access, Tenneti Park, Kailasagiri, Rushikonda Beach and Zoo Park.",
    date: "2026-05-31",
    readingTime: "4 min read",
    hero: "Things to do near Hotel Excella",
    sections: [
      { heading: "Short-drive sightseeing", body: ["Guests can plan Tenneti Park, Kailasagiri, YSR View Point and Indira Gandhi Zoological Park as short-drive experiences from Hotel Excella. Rushikonda Beach and TTD Temple Rushikonda are also convenient for a coastal half-day plan."] },
      { heading: "Use the Guest Services Portal", body: ["The Guest Services Portal supports WiFi details, reception assistance, checkout support, guest reviews and convenient in-room food ordering through trusted restaurant partners."] },
    ],
    faqs: [
      { question: "What can guests do near Hotel Excella?", answer: "Guests can visit Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park." },
      { question: "Can guests order food to the room?", answer: "Yes. In-room food ordering is available through the Guest Services Portal and fulfilled through trusted restaurant partners." },
    ],
  },
  {
    slug: "kailasagiri-travel-guide",
    title: "Kailasagiri Travel Guide",
    description: "Plan a Kailasagiri visit from Hotel Excella with distance, drive time, family tips and nearby attractions around Beach Road Vizag.",
    date: "2026-05-31",
    readingTime: "4 min read",
    hero: "Kailasagiri visit from Hotel Excella",
    sections: [
      { heading: "How far is Kailasagiri?", body: ["Kailasagiri is approximately 3 km from Hotel Excella, with an approximate 8–12 minute drive depending on traffic and route conditions."] },
      { heading: "Who should visit", body: ["Kailasagiri is especially useful for families, couples and first-time Vizag visitors who want views, a relaxed walk and easy pairing with Tenneti Park or Beach Road access."] },
    ],
    faqs: [
      { question: "How far is Kailasagiri from Hotel Excella?", answer: "Kailasagiri is approximately 3 km from Hotel Excella, with an approximate 8–12 minute drive." },
      { question: "Is Hotel Excella suitable for families visiting Kailasagiri?", answer: "Yes. Hotel Excella is family friendly and offers comfortable rooms close to Kailasagiri access routes." },
    ],
  },
  {
    slug: "rushikonda-beach-travel-guide",
    title: "Rushikonda Beach Travel Guide",
    description: "Plan a Rushikonda Beach visit from Hotel Excella with approximate distance, drive time, room tips and nearby temple access.",
    date: "2026-05-31",
    readingTime: "4 min read",
    hero: "Rushikonda Beach travel planning",
    sections: [
      { heading: "How far is Rushikonda Beach?", body: ["Rushikonda Beach is approximately 7 km from Hotel Excella, with an approximate 15–20 minute drive depending on traffic. The hotel is near the coastal corridor but is not a beachfront or sea-view hotel."] },
      { heading: "Pair it with TTD Temple Rushikonda", body: ["Guests often combine Rushikonda Beach with TTD Temple Rushikonda and YSR View Point for a practical half-day coastal itinerary."] },
    ],
    faqs: [
      { question: "How far is Rushikonda Beach from Hotel Excella?", answer: "Rushikonda Beach is approximately 7 km away, with an approximate 15–20 minute drive." },
      { question: "Is Hotel Excella beachfront?", answer: "No. Hotel Excella is not beachfront or sea-view; it offers convenient access to Rushikonda Beach and other Vizag attractions." },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
