import { amenities, attractions, site } from "@/lib/seo/constants"

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
const attractionSummary = attractions.map((item) => `${item.name} (${item.distance}, ${item.driveTime})`).join(", ")
const roomLinks = "Choose the Oak Room for a queen-room style stay or the Mapple Room for a king-room style stay. Both room pages connect guests back to booking, WhatsApp, amenities, gallery, location and the attractions hub."
const brandAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`

function baseFaqs(keyword: string, audience: string): Faq[] {
  return [
    {
      question: `Is Hotel Excella suitable for guests searching for ${keyword}?`,
      answer: `Yes. Hotel Excella is a practical ${audience} stay in Visakhapatnam with clean rooms, Free WiFi, fast check-in, nearby attractions and direct booking support.`,
    },
    {
      question: "Can I book Hotel Excella directly?",
      answer: `Yes. Guests can book direct through the Book Now button or message Hotel Excella on WhatsApp at ${site.phonePrimary} for room availability and pricing.`,
    },
    {
      question: "What rooms can I compare before booking?",
      answer: "Guests can compare the Oak Room and Mapple Room. The Oak Room suits compact queen-room comfort, while the Mapple Room is positioned for guests who prefer a more spacious king-room style stay.",
    },
    {
      question: "What amenities are available at Hotel Excella?",
      answer: `Useful amenities include ${amenities.slice(0, 7).join(", ")}. The focus is comfortable accommodation and practical guest support.`,
    },
    {
      question: "Which attractions are close to Hotel Excella?",
      answer: `Nearby attractions include ${attractions.map((item) => item.name).join(", ")}. Distances are approximate and depend on traffic.`,
    },
    {
      question: "Where is Hotel Excella located?",
      answer: `Hotel Excella is located at ${brandAddress}. The hotel is positioned near the Beach Road side of Vizag and local attraction corridors.`,
    },
  ]
}

function coreSections(keyword: string, audience: string, localAngle: string, locationAdvantages: string[]): SeoLandingPage["sections"] {
  return [
    {
      heading: `Introduction: a comfortable choice for ${keyword}`,
      body: [
        `Hotel Excella, Visakhapatnam is designed for guests who want a calm, polished and practical hotel experience without losing access to Vizag's most useful local routes. For travellers searching for ${keyword}, the hotel offers the right balance of comfortable rooms, quick guest support and convenient movement toward the Beach Road side of the city. The experience is not built around exaggerated claims; it is built around clean accommodation, friendly support, sensible pricing and direct booking clarity.`,
        `${localAngle} This makes the stay useful for families, couples, business travellers, tourists and guests visiting nearby neighborhoods or institutions. Instead of choosing a noisy high-traffic pocket only for one landmark, guests can use Hotel Excella as a restful base and still keep sightseeing, dining, work meetings and local errands easy to manage.`,
      ],
    },
    {
      heading: "Why choose Hotel Excella",
      body: [
        `Guests choose Hotel Excella because the stay feels personal and independent. The hotel keeps the brand identity simple: Hotel Excella, Visakhapatnam, a value-luxury stay focused on cleanliness, comfort and convenience. The team supports direct communication through phone, WhatsApp and email, so guests can ask about room availability, arrival timing, nearby travel and booking details before they reach the property.`,
        `The hotel's strongest advantage is consistency. Rooms are designed for rest after a coastal drive, a family outing, a workday or a local visit. Fast check-in, Free WiFi, air-conditioned rooms, daily housekeeping and approachable reception support help guests spend less time solving logistics and more time on the purpose of their trip.`,
      ],
    },
    {
      heading: "Room features and room comparison",
      body: [
        `Hotel Excella currently highlights two guest-focused room options for local SEO travellers. The Oak Room is positioned as a comfortable queen-room style option for solo travellers, couples and small families who want a clean, practical room near Kailasagiri, Tenneti Park and the Beach Road side of Vizag. It is a good fit when your priority is a relaxed base with essential comfort.`,
        `The Mapple Room is positioned for guests who prefer a king-room style or deluxe-room feel in Visakhapatnam. It works well for couples, families and business travellers who want a more spacious experience while staying close to major attraction corridors. ${roomLinks}`,
      ],
    },
    {
      heading: "Amenities that support a smooth stay",
      body: [
        `Important amenities include ${amenities.join(", ")}. These features support the most common guest needs: stable connectivity, comfortable sleep, helpful local movement and a safe, family-friendly environment. The amenities are intentionally practical because many guests are in Vizag for a mix of work, family travel, temple visits, beach outings or short leisure breaks.`,
        `Hotel Excella does not position itself as a restaurant. Dining is treated as guest convenience, with nearby dining options and in-house ordering support helping guests plan meals more easily. Guests who want to explore food nearby can also review the dining options page, which lists restaurants such as Kamat, Pista House, Kailash Parbat and Sivakoto's Food Magic Restaurant with cuisine notes and map links.`,
      ],
    },
    {
      heading: "Location advantages and nearby attractions",
      body: [
        `Location matters when choosing a hotel in Vizag because traffic, sightseeing plans and arrival timings can change quickly. Hotel Excella is located at ${brandAddress}, with useful access toward Vishalakshi Nagar, Beach Road side routes and northern Vizag attractions. Key local advantages include ${locationAdvantages.join(", ")}.`,
        `Nearby attractions include ${attractionSummary}. Guests can plan a simple itinerary around Kailasagiri and Tenneti Park, add Indira Gandhi Zoological Park for families, or continue toward Rushikonda Beach and TTD Temple Rushikonda for a half-day coastal plan. The attractions hub and individual attraction pages help guests compare distances before booking.`,
      ],
    },
    {
      heading: "Direct booking benefits and CTA",
      body: [
        `Booking direct helps guests keep communication clear. You can confirm room availability, ask whether the Oak Room or Mapple Room better matches your stay, discuss arrival timing and avoid confusion before check-in. Direct booking also keeps the hotel team involved early, which is helpful for families, couples, business guests and visitors with a tight local schedule.`,
        `To plan your stay, use the Book Now CTA, contact Hotel Excella at ${site.phonePrimary}, email ${site.email}, or send a WhatsApp enquiry. Before booking, explore the rooms page, amenities, gallery, location, contact page, about page, why book direct guide, dining options and attractions hub for a complete picture of the Hotel Excella experience.`,
      ],
    },
  ]
}

function localPage(args: {
  slug: string
  keyword: string
  metaTitle: string
  description: string
  heroEyebrow: string
  heroTitle: string
  heroIntro: string
  audience: string
  localAngle: string
  advantages: string[]
}): SeoLandingPage {
  return {
    slug: args.slug,
    title: `${args.keyword} | Hotel Excella`,
    metaTitle: args.metaTitle,
    description: args.description,
    keyword: args.keyword,
    heroEyebrow: args.heroEyebrow,
    heroTitle: args.heroTitle,
    heroIntro: args.heroIntro,
    sections: coreSections(args.keyword, args.audience, args.localAngle, args.advantages),
    faqs: baseFaqs(args.keyword, args.audience),
  }
}

function attractionPage(name: string, slug: string, keyword: string, heroIntro: string): SeoLandingPage {
  const attraction = byName[name]
  return {
    ...localPage({
      slug,
      keyword,
      metaTitle: `${keyword} | Hotel Excella Vizag`,
      description: `Choose Hotel Excella for a comfortable stay in Vizag with convenient access to ${name}. Approximate distance ${attraction.distance}; typical drive time ${attraction.driveTime}.`,
      heroEyebrow: "Comfort Near the Coast",
      heroTitle: `${keyword} with Premium Value-Luxury Comfort`,
      heroIntro,
      audience: `hotel near ${name}`,
      localAngle: `${name} is approximately ${attraction.distance} from Hotel Excella, with a typical drive time of ${attraction.driveTime}.`,
      advantages: [`short local drive to ${name}`, "near Beach Road side routes", "easy access to attractions", "comfortable return base after sightseeing"],
    }),
    attractionName: name,
    distance: attraction.distance,
    driveTime: attraction.driveTime,
    travelTime: attraction.travelTime,
    faqs: [
      {
        question: `How far is ${name} from Hotel Excella?`,
        answer: `${name} is approximately ${attraction.distance} from Hotel Excella. The typical local drive time is around ${attraction.driveTime}, depending on traffic and time of day.`,
      },
      {
        question: `Is Hotel Excella a good choice for visiting ${name}?`,
        answer: `Yes. Hotel Excella is a practical choice for guests who want comfortable rooms and convenient access to ${name} while keeping the stay focused on accommodation quality and local access.`,
      },
      ...baseFaqs(keyword, `hotel near ${name}`).slice(1),
    ],
  }
}

export const seoLandingPages: SeoLandingPage[] = [
  localPage({
    slug: "hotel-near-beach-road-vizag",
    keyword: "Hotel near Beach Road Vizag",
    metaTitle: "Hotel near Beach Road Vizag | Comfortable Stay at Hotel Excella",
    description: "Hotel Excella offers a premium value-luxury stay near Beach Road in Vizag with convenient access to Tenneti Park, Kailasagiri and Rushikonda attractions.",
    heroEyebrow: "Near Beach Road",
    heroTitle: "Comfortable Stay Near Beach Road Vizag",
    heroIntro: "Choose Hotel Excella when you want premium comfort near the coast, quick access to Beach Road side attractions, and a calm stay experience in Visakhapatnam.",
    audience: "near-Beach-Road",
    localAngle: "The hotel is not presented as a beachfront or sea-view property; instead, it gives guests convenient access to Beach Road side routes and nearby attractions while preserving a quieter stay environment.",
    advantages: ["Beach Road side movement", "Tenneti Park nearby", "Kailasagiri nearby", "Rushikonda route access"],
  }),
  attractionPage("Tenneti Park", "hotel-near-tenneti-park-vizag", "Hotel near Tenneti Park Vizag", "Stay close to one of Vizag's favourite coastal parks while enjoying a calm, comfortable room at Hotel Excella."),
  attractionPage("Kailasagiri", "hotel-near-kailasagiri", "Hotel near Kailasagiri", "Plan an easy Kailasagiri visit from Hotel Excella, a premium value-luxury base with practical access to major Vizag attractions."),
  attractionPage("Rushikonda Beach", "hotel-near-rushikonda-beach", "Hotel near Rushikonda Beach", "Enjoy convenient access to Rushikonda Beach while staying at Hotel Excella, a comfortable hotel near Vizag's coastal routes."),
  attractionPage("TTD Temple Rushikonda", "hotel-near-ttd-temple-rushikonda", "Hotel near TTD Temple Rushikonda", "Keep your temple visit simple with a comfortable stay at Hotel Excella and a manageable drive toward TTD Temple Rushikonda."),
  attractionPage("Indira Gandhi Zoological Park", "hotel-near-zoo-park-vizag", "Hotel near Zoo Park Vizag", "Choose Hotel Excella for a family-friendly stay with easy local access to Indira Gandhi Zoological Park and nearby attractions."),
  attractionPage("YSR View Point", "stay-near-ysr-view-point", "Stay near YSR View Point", "Stay at Hotel Excella for convenient access to YSR View Point, Beach Road side drives and comfortable rooms in Vizag."),
  localPage({
    slug: "places-to-visit-near-hotel-excella",
    keyword: "Places to visit near Hotel Excella",
    metaTitle: "Places to Visit near Hotel Excella | Vizag Attractions",
    description: "Explore places to visit near Hotel Excella including Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park.",
    heroEyebrow: "Vizag Attractions Hub",
    heroTitle: "Places to Visit Near Hotel Excella",
    heroIntro: "Use Hotel Excella as a comfortable base for Vizag attractions near Beach Road, Kailasagiri, Tenneti Park, Rushikonda and the zoo park.",
    audience: "attractions-focused",
    localAngle: "Guests can combine viewpoints, beaches, parks and temple visits from one practical base instead of moving between multiple accommodation points during a short trip.",
    advantages: ["attraction cluster access", "family sightseeing", "coastal drives", "temple and beach routes"],
  }),
  localPage({
    slug: "hotel-in-visalakshinagar-vizag",
    keyword: "Hotel in Visalakshinagar Vizag",
    metaTitle: "Hotel in Visalakshinagar Vizag | Hotel Excella, Visakhapatnam",
    description: "Stay at Hotel Excella in Visalakshinagar, Vizag with clean rooms, direct booking, nearby attractions and convenient access to Beach Road side routes.",
    heroEyebrow: "Visalakshinagar Stay",
    heroTitle: "Hotel in Visalakshinagar Vizag for Comfortable Local Access",
    heroIntro: "Hotel Excella gives guests a calm value-luxury stay in Visalakshinagar with practical movement to Beach Road, Kailasagiri, Tenneti Park and nearby neighborhoods.",
    audience: "Visalakshinagar",
    localAngle: "The Visalakshinagar location is useful for guests who want a neighborhood stay near city routes, local errands, family visits and attraction plans.",
    advantages: ["Visalakshinagar neighborhood access", "near Beach Road side routes", "close to parks and viewpoints", "direct booking support"],
  }),
  localPage({
    slug: "couple-friendly-hotel-in-vizag",
    keyword: "Couple friendly hotel in Vizag",
    metaTitle: "Couple Friendly Hotel in Vizag | Hotel Excella",
    description: "Choose Hotel Excella for a couple-friendly stay in Vizag with comfortable rooms, privacy-focused service, nearby attractions and direct booking support.",
    heroEyebrow: "Couple-Friendly Stay",
    heroTitle: "Couple Friendly Hotel in Vizag with Calm, Comfortable Rooms",
    heroIntro: "Plan a relaxed Vizag stay with clean rooms, easy local movement, nearby coastal attractions and a discreet direct booking experience at Hotel Excella.",
    audience: "couple-friendly",
    localAngle: "Couples can plan coastal drives, viewpoints, temple visits and quiet evenings without choosing accommodation that is too far from the attractions they want to see.",
    advantages: ["calm room environment", "near coastal drives", "privacy-conscious support", "easy WhatsApp enquiry"],
  }),
  localPage({
    slug: "family-friendly-hotel-in-vizag",
    keyword: "Family friendly hotel in Vizag",
    metaTitle: "Family Friendly Hotel in Vizag | Hotel Excella",
    description: "Hotel Excella is a family-friendly hotel in Vizag with comfortable rooms, nearby zoo park, Kailasagiri, Tenneti Park and direct booking support.",
    heroEyebrow: "Family-Friendly Stay",
    heroTitle: "Family Friendly Hotel in Vizag Near Parks, Viewpoints and Beaches",
    heroIntro: "Keep your Vizag family trip practical with comfortable rooms, helpful amenities and nearby access to Kailasagiri, Tenneti Park and Indira Gandhi Zoological Park.",
    audience: "family-friendly",
    localAngle: "Families often need flexible plans, clean rooms and manageable travel times more than a single attraction-only location, and Hotel Excella supports that style of travel.",
    advantages: ["near zoo park", "near Kailasagiri", "family-friendly amenities", "comfortable rest between outings"],
  }),
  localPage({
    slug: "budget-hotel-in-vizag",
    keyword: "Budget hotel in Vizag",
    metaTitle: "Budget Hotel in Vizag | Value-Luxury Stay at Hotel Excella",
    description: "Hotel Excella offers a value-luxury budget hotel choice in Vizag with clean rooms, practical amenities, direct booking and nearby attraction access.",
    heroEyebrow: "Value-Luxury Stay",
    heroTitle: "Budget Hotel in Vizag with Practical Premium Comfort",
    heroIntro: "Book a sensible stay at Hotel Excella when you want clean rooms, useful amenities and convenient local access without overpaying for unsupported claims.",
    audience: "budget-conscious",
    localAngle: "Budget-focused guests can prioritize cleanliness, WiFi, quick check-in and local convenience while still enjoying a polished hotel experience.",
    advantages: ["value-luxury pricing", "essential amenities", "direct booking clarity", "near attractions"],
  }),
  localPage({
    slug: "business-hotel-in-vizag",
    keyword: "Business hotel in Vizag",
    metaTitle: "Business Hotel in Vizag | Hotel Excella, Visakhapatnam",
    description: "Hotel Excella is a business traveller friendly hotel in Vizag with Free WiFi, fast check-in, comfortable rooms and direct booking support.",
    heroEyebrow: "Business Traveller Friendly",
    heroTitle: "Business Hotel in Vizag for Work Trips and Restful Evenings",
    heroIntro: "Stay connected and comfortable at Hotel Excella with Free WiFi, quick support, direct booking and practical access to city routes in Visakhapatnam.",
    audience: "business-traveller friendly",
    localAngle: "Business travellers can complete work, move through the city and still keep popular attractions within reach for a short break after meetings.",
    advantages: ["Free WiFi", "fast check-in", "quiet rest base", "city route access"],
  }),
  localPage({
    slug: "hotel-near-jodugullapalem-beach",
    keyword: "Hotel near Jodugullapalem Beach",
    metaTitle: "Hotel near Jodugullapalem Beach | Hotel Excella Vizag",
    description: "Stay at Hotel Excella for comfortable rooms and convenient access to Jodugullapalem Beach, Beach Road side attractions and northern Vizag routes.",
    heroEyebrow: "Near Jodugullapalem Beach",
    heroTitle: "Hotel near Jodugullapalem Beach with Comfortable Vizag Access",
    heroIntro: "Use Hotel Excella as a restful base for Jodugullapalem Beach plans, coastal drives, Kailasagiri, Tenneti Park and Rushikonda side sightseeing.",
    audience: "Jodugullapalem Beach",
    localAngle: "Jodugullapalem Beach visitors can keep a comfortable room nearby while also staying connected to other Beach Road side attractions and dining options.",
    advantages: ["Jodugullapalem Beach access", "coastal route planning", "near Kailasagiri", "near Tenneti Park"],
  }),
  localPage({
    slug: "hotel-near-health-city-vizag",
    keyword: "Hotel near Health City Vizag",
    metaTitle: "Hotel near Health City Vizag | Hotel Excella, Visakhapatnam",
    description: "Hotel Excella offers comfortable accommodation for guests looking for a hotel near Health City Vizag with direct booking and practical local access.",
    heroEyebrow: "Near Health City Routes",
    heroTitle: "Hotel near Health City Vizag for Practical, Comfortable Stays",
    heroIntro: "Choose a calm room base at Hotel Excella when your Vizag visit includes Health City routes, local appointments, family support and nearby attraction time.",
    audience: "Health City visitor",
    localAngle: "Guests visiting Health City often need dependable accommodation, easy communication and a restful base for family members or support travellers.",
    advantages: ["Health City route access", "family support stays", "direct WhatsApp support", "clean comfortable rooms"],
  }),
  localPage({
    slug: "hotel-near-mvp-colony",
    keyword: "Hotel near MVP Colony",
    metaTitle: "Hotel near MVP Colony Vizag | Hotel Excella",
    description: "Stay at Hotel Excella for a comfortable hotel near MVP Colony with nearby attractions, clean rooms, direct booking and practical city access.",
    heroEyebrow: "Near MVP Colony",
    heroTitle: "Hotel near MVP Colony for Comfortable Vizag Stays",
    heroIntro: "Hotel Excella helps guests stay close to MVP Colony side movement while keeping Beach Road attractions and family-friendly sightseeing within reach.",
    audience: "MVP Colony",
    localAngle: "MVP Colony visitors may be in Vizag for family visits, work, events, local errands or sightseeing, so a flexible hotel base is useful.",
    advantages: ["MVP Colony side movement", "near Visalakshinagar", "near attractions", "business and family friendly"],
  }),
  localPage({
    slug: "hotel-near-gitam-university",
    keyword: "Hotel near GITAM University",
    metaTitle: "Hotel near GITAM University Vizag | Hotel Excella",
    description: "Hotel Excella is a comfortable hotel choice for guests visiting GITAM University in Vizag, with clean rooms, direct booking and nearby attractions.",
    heroEyebrow: "Near GITAM Routes",
    heroTitle: "Hotel near GITAM University for Families, Visitors and Work Trips",
    heroIntro: "Plan a comfortable stay at Hotel Excella when visiting GITAM University, Rushikonda routes, family appointments or northern Vizag attractions.",
    audience: "GITAM University visitor",
    localAngle: "University visitors often need clear booking communication, reliable rooms and practical access for campus visits, family travel, interviews or academic events.",
    advantages: ["GITAM University route access", "Rushikonda side movement", "family visitor support", "direct booking clarity"],
  }),
]

export const landingPageBySlug = new Map(seoLandingPages.map((page) => [page.slug, page]))
