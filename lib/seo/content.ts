export type Faq = { question: string; answer: string }

export type Attraction = {
  name: string
  slug: string
  distance: string
  time: string
  driveTime: string
  description: string
}

export const coreFaqs: Faq[] = [
  { question: "Is Hotel Excella near Beach Road?", answer: "Yes. Hotel Excella is near Beach Road with convenient access to Tenneti Park, Kailasagiri, Rushikonda Beach and key Vizag attractions. It is not positioned as a beachfront, sea-view or beach-view hotel." },
  { question: "How far is Rushikonda Beach from Hotel Excella?", answer: "Rushikonda Beach is approximately 7 km from Hotel Excella, with an approximate drive time of 15–20 minutes depending on traffic." },
  { question: "Is Hotel Excella family friendly?", answer: "Yes. Hotel Excella is suitable for families looking for clean rooms, practical comfort, guest assistance and easy access to Vizag attractions." },
  { question: "Is Hotel Excella suitable for business travellers?", answer: "Yes. Business travellers choose Hotel Excella for WiFi, fast check-in, direct booking support, comfortable rooms and responsive assistance." },
  { question: "Which attractions are nearby?", answer: "Nearby attractions include Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park." },
  { question: "Does Hotel Excella offer food ordering?", answer: "Yes. In-house guests can use the Guest Services Portal for convenient in-room food ordering. Meals are delivered to rooms through trusted restaurant partners; Hotel Excella is not positioned as a destination restaurant." },
  { question: "Does the hotel provide WiFi?", answer: "Yes. Free WiFi is available for guests, making the stay convenient for families, couples and business travellers." },
  { question: "Is breakfast available?", answer: "Breakfast options may be available depending on the booking plan. Guests can confirm current breakfast options while booking or at reception." },
]

export const attractions: Attraction[] = [
  { name: "Tenneti Park", slug: "/hotel-near-tenneti-park-vizag", distance: "Approx. 1.5 km", time: "5–8 minutes", driveTime: "Approx. 5–8 min drive", description: "A scenic coastal park suited for sunrise visits, evening walks and relaxed family outings near Beach Road." },
  { name: "Kailasagiri", slug: "/hotel-near-kailasagiri", distance: "Approx. 3 km", time: "8–12 minutes", driveTime: "Approx. 8–12 min drive", description: "A landmark hilltop attraction with panoramic city views, ropeway access and family-friendly leisure." },
  { name: "Rushikonda Beach", slug: "/hotel-near-rushikonda-beach", distance: "Approx. 7 km", time: "15–20 minutes", driveTime: "Approx. 15–20 min drive", description: "One of Vizag’s best-known beaches for coastal drives, beach time and casual outings." },
  { name: "TTD Temple Rushikonda", slug: "/hotel-near-ttd-temple-rushikonda", distance: "Approx. 7 km", time: "15–20 minutes", driveTime: "Approx. 15–20 min drive", description: "A peaceful temple stop near Rushikonda that guests often combine with beach and viewpoint visits." },
  { name: "YSR View Point", slug: "/stay-near-ysr-view-point", distance: "Approx. 5 km", time: "12–15 minutes", driveTime: "Approx. 12–15 min drive", description: "A popular viewpoint for guests planning a relaxed coastal sightseeing route." },
  { name: "Indira Gandhi Zoological Park", slug: "/hotel-near-zoo-park-vizag", distance: "Approx. 4 km", time: "10–15 minutes", driveTime: "Approx. 10–15 min drive", description: "A major family attraction in Vizag with green surroundings and a half-day outing option." },
]

export const trustIndicators = [
  "Family Friendly",
  "Couple Friendly",
  "Business Traveller Friendly",
  "Near Major Attractions",
  "Free WiFi",
  "Guest Services Portal",
  "Quick Guest Assistance",
]

export const whyChooseItems = [
  "Near Beach Road",
  "Convenient Access to Kailasagiri",
  "Near Tenneti Park",
  "Near Rushikonda Beach",
  "Family-Friendly Stay",
  "Couple-Friendly Stay",
  "Business Traveller Friendly",
  "Fast Check-In",
  "Premium Comfort",
  "Value-Luxury Experience",
  "Guest Services Portal",
]

export const roomComparison = [
  { room: "Oak Room", bedType: "Queen bed", roomType: "Comfort queen room", occupancy: "Best for 1–2 guests", breakfast: "Breakfast options can be confirmed while booking", bestFor: "Couples, solo travellers and compact family stays", features: "Free WiFi, air conditioning, daily housekeeping, clean modern layout" },
  { room: "Mapple Room", bedType: "King bed", roomType: "Premium king room", occupancy: "Best for 2 guests", breakfast: "Breakfast options can be confirmed while booking", bestFor: "Couples, business travellers and guests preferring extra comfort", features: "Free WiFi, air conditioning, premium bedding, daily housekeeping" },
]

export const reviewSnippets = [
  { quote: "Clean rooms, quick help from the team and a convenient location for visiting Vizag attractions.", guest: "Family guest" },
  { quote: "Good value-luxury feel with comfortable rooms and easy WhatsApp support before arrival.", guest: "Direct booking guest" },
  { quote: "A calm stay near Beach Road access without confusing beachfront claims.", guest: "Couple traveller" },
]

export const landingPages = [
  {
    slug: "hotel-near-beach-road-vizag",
    title: "Hotel Near Beach Road Vizag | Hotel Excella",
    h1: "Hotel Near Beach Road Vizag",
    focus: "Beach Road",
    description: "Book Hotel Excella for a comfortable stay near Beach Road Vizag, Tenneti Park, Kailasagiri and Rushikonda with direct booking support.",
    intro: "Hotel Excella is a premium value-luxury stay near Beach Road in Visakhapatnam for guests who want coastal access without misleading beachfront or sea-view claims. The hotel is an ideal base for exploring Vizag’s beach corridor, viewpoints, temples and family attractions.",
  },
  {
    slug: "hotel-near-tenneti-park-vizag",
    title: "Hotel Near Tenneti Park Vizag | Hotel Excella",
    h1: "Hotel Near Tenneti Park Vizag",
    focus: "Tenneti Park",
    description: "Stay near Tenneti Park Vizag at Hotel Excella, a comfortable hotel with easy access to Beach Road, Kailasagiri and Rushikonda Beach.",
    intro: "If your Vizag itinerary includes Tenneti Park, Beach Road and coastal sightseeing, Hotel Excella offers a polished and practical base nearby. Guests can plan sunrise visits, evening drives and family outings while returning to a calm, comfortable room.",
  },
  {
    slug: "hotel-near-kailasagiri",
    title: "Hotel Near Kailasagiri Vizag | Hotel Excella",
    h1: "Hotel Near Kailasagiri",
    focus: "Kailasagiri",
    description: "Choose Hotel Excella near Kailasagiri for clean rooms, premium comfort, quick attraction access and direct booking in Visakhapatnam.",
    intro: "Kailasagiri is one of Visakhapatnam’s most visited landmarks, and Hotel Excella gives guests convenient access to the hilltop attraction, nearby Beach Road routes and family-friendly experiences across the city.",
  },
  {
    slug: "hotel-near-rushikonda-beach",
    title: "Hotel Near Rushikonda Beach | Hotel Excella Vizag",
    h1: "Hotel Near Rushikonda Beach",
    focus: "Rushikonda Beach",
    description: "Hotel Excella is a comfortable stay near Rushikonda Beach with easy access to TTD Temple Rushikonda, Beach Road and Kailasagiri.",
    intro: "For travellers planning beach time at Rushikonda and sightseeing around north Vizag, Hotel Excella offers a convenient location, direct booking support and a refined stay experience near the coastal corridor.",
  },
  {
    slug: "hotel-near-ttd-temple-rushikonda",
    title: "Hotel Near TTD Temple Rushikonda | Hotel Excella",
    h1: "Hotel Near TTD Temple Rushikonda",
    focus: "TTD Temple Rushikonda",
    description: "Stay near TTD Temple Rushikonda at Hotel Excella with comfortable rooms and easy access to Rushikonda Beach.",
    intro: "Hotel Excella is a convenient choice for guests visiting TTD Temple Rushikonda and combining the visit with Rushikonda Beach, YSR View Point and other coastal attractions in Visakhapatnam.",
  },
  {
    slug: "hotel-near-zoo-park-vizag",
    title: "Hotel Near Zoo Park Vizag | Hotel Excella",
    h1: "Hotel Near Zoo Park Vizag",
    focus: "Indira Gandhi Zoological Park",
    description: "Book Hotel Excella near Indira Gandhi Zoological Park Vizag for a family-friendly stay close to Kailasagiri, Tenneti Park and Beach Road.",
    intro: "Families visiting Indira Gandhi Zoological Park can use Hotel Excella as a comfortable base near Vizag’s green and coastal attractions. The location works well for relaxed sightseeing, direct room support and convenient guest services.",
  },
  {
    slug: "stay-near-ysr-view-point",
    title: "Stay Near YSR View Point Vizag | Hotel Excella",
    h1: "Stay Near YSR View Point",
    focus: "YSR View Point",
    description: "Hotel Excella offers a comfortable stay near YSR View Point, Rushikonda, Kailasagiri and Beach Road in Visakhapatnam.",
    intro: "YSR View Point is a favourite stop for guests exploring Vizag’s coastal side. Hotel Excella makes the route simple with comfortable rooms, smooth direct booking support and access to Beach Road, Kailasagiri and Rushikonda.",
  },
  {
    slug: "places-to-visit-near-hotel-excella",
    title: "Places to Visit Near Hotel Excella Vizag",
    h1: "Places to Visit Near Hotel Excella",
    focus: "nearby Vizag attractions",
    description: "Explore places to visit near Hotel Excella including Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple, Zoo Park and YSR View Point.",
    intro: "Hotel Excella is well placed for travellers who want a comfortable stay near many of Visakhapatnam’s most loved attractions. From coastal parks and hilltop viewpoints to temples, beaches and family outings, guests can plan a balanced Vizag itinerary from the hotel.",
  },
]
