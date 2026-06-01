import { attractions } from "@/lib/seo/constants"

export type Faq = { question: string; answer: string }
export type SeoLandingPage = {
  slug: string
  title: string
  metaTitle: string
  description: string
  keyword: string
  heroEyebrow: string
  heroTitle: string
  heroIntro: string
  attractionName?: string
  distance?: string
  driveTime?: string
  travelTime?: string
  sections: { heading: string; body: string[] }[]
  faqs: Faq[]
}

const byName = Object.fromEntries(attractions.map((item) => [item.name, item]))

function attractionPage(name: string, slug: string, keyword: string, heroIntro: string): SeoLandingPage {
  const attraction = byName[name]
  return {
    slug,
    title: `${keyword} | Hotel Excella`,
    metaTitle: `${keyword} | Hotel Excella Vizag`,
    description: `Choose Hotel Excella for a comfortable stay in Vizag with convenient access to ${name}. Approximate distance ${attraction.distance}; typical drive time ${attraction.driveTime}.`,
    keyword,
    heroEyebrow: "Comfort Near the Coast",
    heroTitle: `${keyword} with Premium Value-Luxury Comfort`,
    heroIntro,
    attractionName: name,
    distance: attraction.distance,
    driveTime: attraction.driveTime,
    travelTime: attraction.travelTime,
    sections: [
      {
        heading: `A convenient hotel choice near ${name}`,
        body: [
          `Hotel Excella is designed for travellers who want a calm, polished and practical base in Visakhapatnam without changing the purpose of their trip around long commutes. If you are searching for ${keyword}, the hotel places you within a short local drive of ${name} while still keeping you close to the broader Beach Road side of the city. The positioning is especially useful for families, couples, business travellers and guests who prefer clean rooms, quick check-in, dependable WiFi and a value-luxury experience over unnecessary complexity.`,
          `The advantage is comfort near the coast: you can plan your day around Vizag attractions, return to a restful room, and keep your itinerary flexible. Guests often combine ${name} with Kailasagiri, Tenneti Park, Rushikonda Beach, YSR View Point and the Indira Gandhi Zoological Park depending on how much time they have in the city.`,
        ],
      },
      {
        heading: "Distance, drive time and local travel planning",
        body: [
          `${name} is approximately ${attraction.distance} from Hotel Excella, with a typical local drive time of ${attraction.driveTime}. Actual travel time can vary with Beach Road traffic, weekends, public holidays and weather. For the smoothest experience, plan early mornings for sightseeing, keep extra time during sunset hours, and confirm cab or auto availability before leaving during peak tourist seasons.`,
          `The location works well for guests who want to see more than one attraction in a single outing. A relaxed route can include a short visit to ${name}, a coastal drive along Beach Road, and a second stop at Kailasagiri or Tenneti Park. If you are travelling with children or senior family members, keeping Hotel Excella as your base helps reduce tiring cross-city movement and lets you return for rest between plans.`,
        ],
      },
      {
        heading: "Who this stay works best for",
        body: [
          `Families appreciate the straightforward access to popular attractions, comfortable rooms and practical amenities. Couples can plan an easy Vizag break with coastal sightseeing and relaxed evenings. Business travellers get a quieter stay with WiFi and quick access to important city routes. Leisure guests can use the hotel as a central base for beaches, viewpoints, temples and nature stops without choosing a crowded attraction-only location.`,
          `Hotel Excella's preferred messaging is simple: comfortable stay in Vizag, convenient access to Vizag attractions, and a premium value-luxury experience near Beach Road. This makes it suitable for guests who care about cleanliness, location, service and sensible pricing rather than exaggerated claims.`,
        ],
      },
      {
        heading: "Suggested nearby attractions itinerary",
        body: [
          `Start with ${name} when it is the main reason for your visit, then add nearby attractions based on your travel pace. Tenneti Park is approximately ${byName["Tenneti Park"].distance}, Kailasagiri is approximately ${byName["Kailasagiri"].distance}, Rushikonda Beach is approximately ${byName["Rushikonda Beach"].distance}, TTD Temple Rushikonda is approximately ${byName["TTD Temple Rushikonda"].distance}, YSR View Point is approximately ${byName["YSR View Point"].distance}, and Indira Gandhi Zoological Park is approximately ${byName["Indira Gandhi Zoological Park"].distance} from the hotel.`,
          `For short stays, choose two or three places and avoid rushing. For a weekend trip, reserve one morning for viewpoints and parks, one afternoon for Rushikonda side attractions, and one evening for a relaxed coastal drive. Hotel Excella keeps the plan manageable because the hotel is close enough to major northern Vizag attractions while still offering a restful stay experience.`,
        ],
      },
    ],
    faqs: [
      {
        question: `How far is ${name} from Hotel Excella?`,
        answer: `${name} is approximately ${attraction.distance} from Hotel Excella. The typical local drive time is around ${attraction.driveTime}, depending on traffic and the time of day.`,
      },
      {
        question: `Is Hotel Excella a good choice for visiting ${name}?`,
        answer: `Yes. Hotel Excella is a practical choice for guests who want comfortable rooms and convenient access to ${name} while keeping the stay focused on comfortable accommodation and local access.`,
      },
      {
        question: "Is Hotel Excella suitable for families?",
        answer: "Yes. Hotel Excella is family-friendly, with comfortable rooms, WiFi, quick check-in and easy access to attractions such as Kailasagiri, Tenneti Park and the zoo park.",
      },
      {
        question: "What other attractions are near Hotel Excella?",
        answer: "Nearby attractions include Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park.",
      },
    ],
  }
}

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "hotel-near-beach-road-vizag",
    title: "Hotel near Beach Road Vizag | Hotel Excella",
    metaTitle: "Hotel near Beach Road Vizag | Comfortable Stay at Hotel Excella",
    description:
      "Hotel Excella offers a premium value-luxury stay near Beach Road in Vizag with convenient access to Tenneti Park, Kailasagiri and Rushikonda attractions.",
    keyword: "Hotel near Beach Road Vizag",
    heroEyebrow: "Near Beach Road",
    heroTitle: "Comfortable Stay Near Beach Road Vizag",
    heroIntro:
      "Choose Hotel Excella when you want premium comfort near the coast, quick access to Beach Road side attractions, and a calm stay experience in Visakhapatnam.",
    sections: [
      {
        heading: "A premium value-luxury stay near Beach Road",
        body: [
          "Hotel Excella is a smart choice for travellers searching for a hotel near Beach Road Vizag without relying on exaggerated location claims. The hotel focuses on comfort near the coast: clean rooms, reliable amenities, warm service and convenient movement to Vizag's well-known coastal attractions. This positioning is ideal for guests who want the Beach Road side of the city within easy reach while still enjoying a restful hotel environment.",
          "The location is especially helpful for short city breaks, family visits, couple trips and business travel that includes leisure time. Guests can plan mornings around Tenneti Park or Kailasagiri, spend an afternoon toward Rushikonda Beach or TTD Temple Rushikonda, and return to Hotel Excella for a comfortable evening. Food ordering is mentioned only as an in-house guest convenience through the guest food ordering flow.",
        ],
      },
      {
        heading: "Distances from Hotel Excella to popular Vizag attractions",
        body: [
          "Approximate local distances help guests plan realistic itineraries. Tenneti Park is about 1.2 km away with a 4–6 minute drive. Kailasagiri is about 1.8 km away with a 6–9 minute drive. Indira Gandhi Zoological Park is about 2.4 km away with a 7–10 minute drive. YSR View Point is about 3.0 km away with an 8–12 minute drive. Rushikonda Beach is about 6.5 km away with a 14–20 minute drive, while TTD Temple Rushikonda is about 7.2 km away with a 16–22 minute drive.",
          "These travel times are approximate and can change with traffic, weekends, weather and local events. Still, Hotel Excella works well as a base because several attractions sit within a manageable local radius. Guests who prefer a relaxed pace can visit one major attraction in the morning and another in the evening instead of packing the day too tightly.",
        ],
      },
      {
        heading: "Who should book this location",
        body: [
          "Families benefit from a stay that is close to parks, viewpoints and the zoo without being in an overly crowded tourist pocket. Couples can enjoy coastal drives and scenic stops while keeping accommodation practical and comfortable. Business travellers can stay connected with WiFi and use the location for quick city movement. Guests visiting Vizag for temple visits, beach outings or sightseeing can use Hotel Excella as a dependable base.",
          "The preferred experience is value-luxury: premium comfort, sensible access and straightforward hospitality. If your goal is a clean, comfortable stay in Vizag near Beach Road attractions, Hotel Excella is designed around that need.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Hotel Excella near Beach Road Vizag?",
        answer:
          "Yes. Hotel Excella is positioned for convenient access to the Beach Road side of Vizag and nearby attractions such as Tenneti Park and Kailasagiri.",
      },
      {
        question: "What is Hotel Excella's location advantage?",
        answer:
          "Hotel Excella offers comfort near the coast with convenient access to Beach Road side attractions in Vizag.",
      },
      {
        question: "What attractions are close to Hotel Excella?",
        answer:
          "Nearby attractions include Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park.",
      },
      {
        question: "Does Hotel Excella suit family trips?",
        answer:
          "Yes. The hotel is suitable for families looking for comfortable rooms and convenient access to parks, viewpoints, beaches and other tourist places in Vizag.",
      },
    ],
  },
  attractionPage(
    "Tenneti Park",
    "hotel-near-tenneti-park-vizag",
    "Hotel near Tenneti Park Vizag",
    "Stay close to one of Vizag's favourite coastal parks while enjoying a calm, comfortable room at Hotel Excella."
  ),
  attractionPage(
    "Kailasagiri",
    "hotel-near-kailasagiri",
    "Hotel near Kailasagiri",
    "Plan an easy Kailasagiri visit from Hotel Excella, a premium value-luxury base with practical access to major Vizag attractions."
  ),
  attractionPage(
    "Rushikonda Beach",
    "hotel-near-rushikonda-beach",
    "Hotel near Rushikonda Beach",
    "Enjoy convenient access to Rushikonda Beach while staying at Hotel Excella, a comfortable hotel near Vizag's coastal routes."
  ),
  attractionPage(
    "TTD Temple Rushikonda",
    "hotel-near-ttd-temple-rushikonda",
    "Hotel near TTD Temple Rushikonda",
    "Keep your temple visit simple with a comfortable stay at Hotel Excella and a manageable drive toward TTD Temple Rushikonda."
  ),
  attractionPage(
    "Indira Gandhi Zoological Park",
    "hotel-near-zoo-park-vizag",
    "Hotel near Zoo Park Vizag",
    "Choose Hotel Excella for a family-friendly stay with easy local access to Indira Gandhi Zoological Park and nearby attractions."
  ),
  attractionPage(
    "YSR View Point",
    "stay-near-ysr-view-point",
    "Stay near YSR View Point",
    "Stay at Hotel Excella for convenient access to YSR View Point, Beach Road side drives and comfortable rooms in Vizag."
  ),
  {
    slug: "places-to-visit-near-hotel-excella",
    title: "Places to Visit near Hotel Excella | Vizag Attractions Guide",
    metaTitle: "Places to Visit near Hotel Excella | Vizag Attractions",
    description:
      "Explore places to visit near Hotel Excella including Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park.",
    keyword: "Places to visit near Hotel Excella",
    heroEyebrow: "Vizag Attractions Hub",
    heroTitle: "Places to Visit Near Hotel Excella",
    heroIntro:
      "Use Hotel Excella as a comfortable base for Vizag attractions near Beach Road, Kailasagiri, Tenneti Park, Rushikonda and the zoo park.",
    sections: [
      {
        heading: "Plan a practical Vizag sightseeing stay",
        body: [
          "Hotel Excella is well suited for guests who want to explore Vizag without turning every outing into a long commute. The hotel offers a comfortable stay near the coast and convenient access to a cluster of popular attractions: Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park. This makes it a strong choice for family trips, couple-friendly stays, short leisure breaks and business travel with sightseeing time.",
          "The hotel's strength is the ability to combine premium comfort with a sensible location near the attractions travellers actually want to visit. You can start early for viewpoints, return for rest, and step out again for a relaxed evening drive along the Beach Road side of Vizag.",
        ],
      },
      {
        heading: "Attractions, distances and travel times",
        body: [
          "Tenneti Park is approximately 1.2 km away and usually takes 4–6 minutes by car. Kailasagiri is approximately 1.8 km away and usually takes 6–9 minutes by car. Indira Gandhi Zoological Park is approximately 2.4 km away and usually takes 7–10 minutes by car. YSR View Point is approximately 3.0 km away and usually takes 8–12 minutes by car. Rushikonda Beach is approximately 6.5 km away and usually takes 14–20 minutes by car. TTD Temple Rushikonda is approximately 7.2 km away and usually takes 16–22 minutes by car.",
          "These figures are approximate, but they are useful for building a day plan. Guests with children may prefer the zoo park and Kailasagiri route. Couples may prefer Tenneti Park, YSR View Point and a coastal drive. Devotional travellers can combine TTD Temple Rushikonda with Rushikonda Beach and return to Hotel Excella for rest.",
        ],
      },
      {
        heading: "Suggested itinerary from Hotel Excella",
        body: [
          "For a one-day plan, begin with Kailasagiri in the morning, continue to Tenneti Park for a short break, return to the hotel, and then visit YSR View Point or Rushikonda Beach later in the day. For a two-day trip, keep the first day for Kailasagiri, Tenneti Park and the zoo park, then reserve the second day for Rushikonda Beach and TTD Temple Rushikonda. This pacing keeps travel comfortable rather than rushed.",
          "Hotel Excella's value-luxury experience supports this style of travel: comfortable rooms, Free WiFi, fast check-in, family-friendly and couple-friendly stays, and easy access to local points of interest. Guests can also use the Order Food page as a convenience during their stay, with food ordering treated only as a guest convenience.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the best places to visit near Hotel Excella?",
        answer:
          "Popular nearby places include Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park.",
      },
      {
        question: "How far is Kailasagiri from Hotel Excella?",
        answer: "Kailasagiri is approximately 1.8 km from Hotel Excella, with a typical drive time of 6–9 minutes.",
      },
      {
        question: "How far is Rushikonda Beach from Hotel Excella?",
        answer: "Rushikonda Beach is approximately 6.5 km from Hotel Excella, with a typical drive time of 14–20 minutes.",
      },
      {
        question: "Is Hotel Excella suitable for tourist attraction visits in Vizag?",
        answer:
          "Yes. Hotel Excella is a practical base for guests who want comfortable accommodation and convenient access to major Vizag attractions.",
      },
    ],
  },
]

export const landingPageBySlug = new Map(seoLandingPages.map((page) => [page.slug, page]))
