export const site = {
  name: "Hotel Excella",
  brandName: "Hotel Excella, Visakhapatnam",
  url: "https://hotelexcella.in",
  bookingUrl: "https://hotelexcella.in/prebook",
  whatsappNumber: "+91 9985908131",
  whatsappUrl:
    "https://wa.me/919985908131?text=Hello%20Hotel%20Excella%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability.",
  phonePrimary: "+91 9985908131",
  phonePrimaryHref: "tel:+919985908131",
  email: "hotelexcellaoperations@gmail.com",
  address: {
    street: "386 Revenue Employs Co-operative Society Colony, Vishalakshi Nagar",
    locality: "Visakhapatnam",
    region: "Andhra Pradesh",
    postalCode: "530043",
    country: "IN",
    formatted:
      "386 Revenue Employs Co-operative Society Colony, Vishalakshi Nagar, Visakhapatnam, Andhra Pradesh 530043, India",
  },
  geo: {
    latitude: 17.7609,
    longitude: 83.3429,
  },
  image:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
  logo:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qq8Cvn8rVABsuUvFcXt0Nc1n64vZlL.png",
  social: {
    instagram: "https://www.instagram.com/hotelexcella_vizag?igsh=MWNnNjBvbDFkdnBodA==",
    linkedin: "https://www.linkedin.com/company/sanvigroupofhotels-vizag/",
    facebook: "https://www.facebook.com/profile.php?id=61565499310023&mibextid=rS40aB7S9Ucbxw6v",
  },
}

export const sameAs = [site.social.instagram, site.social.linkedin, site.social.facebook] as const

export const attractions = [
  {
    name: "Tenneti Park",
    slug: "hotel-near-tenneti-park-vizag",
    distance: "1.2 km",
    driveTime: "4–6 minutes",
    travelTime: "4–6 minutes by car",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
    description:
      "A landscaped coastal park known for open lawns, viewpoints and relaxed evening walks near Beach Road.",
  },
  {
    name: "Kailasagiri",
    slug: "hotel-near-kailasagiri",
    distance: "1.8 km",
    driveTime: "6–9 minutes",
    travelTime: "6–9 minutes by car",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lobby-nEEo9EQvawS3OCTf8VMen4Ct2sycAS.jpg",
    description:
      "A hilltop attraction with panoramic city and coastline views, ropeway access and family-friendly viewpoints.",
  },
  {
    name: "Rushikonda Beach",
    slug: "hotel-near-rushikonda-beach",
    distance: "6.5 km",
    driveTime: "14–20 minutes",
    travelTime: "14–20 minutes by car",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room1-gwtPWoLoADzaldmYrRdj4539Sv4Zli.jpg",
    description:
      "One of Vizag's most visited beaches, popular for sunrise visits and coastal drives.",
  },
  {
    name: "TTD Temple Rushikonda",
    slug: "hotel-near-ttd-temple-rushikonda",
    distance: "7.2 km",
    driveTime: "16–22 minutes",
    travelTime: "16–22 minutes by car",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room2-UfQMHpyryUBdNLST83IpWIvfh3PizR.jpg",
    description:
      "A peaceful temple stop near Rushikonda that many guests include in a half-day coastal itinerary.",
  },
  {
    name: "YSR View Point",
    slug: "stay-near-ysr-view-point",
    distance: "3.0 km",
    driveTime: "8–12 minutes",
    travelTime: "8–12 minutes by car",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dining-cjkV0vqP1I6CQ10QQEYvazUmhUKlTX.jpg",
    description:
      "A scenic viewpoint suited for quick photo stops and relaxed drives around the Beach Road side of Vizag.",
  },
  {
    name: "Indira Gandhi Zoological Park",
    slug: "hotel-near-zoo-park-vizag",
    distance: "2.4 km",
    driveTime: "7–10 minutes",
    travelTime: "7–10 minutes by car",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
    description:
      "A large zoological park set near the Eastern Ghats, ideal for families planning a nature-focused outing.",
  },
] as const

export const nearbyRestaurants = [
  {
    name: "Kamat",
    distance: "About 1.5 km",
    cuisine: "South Indian and vegetarian meals",
    description: "A familiar option for breakfast, thalis and dependable vegetarian food near the hotel side of Vizag.",
  },
  {
    name: "Pista House",
    distance: "About 2.0 km",
    cuisine: "Biryani, Indian and bakery favourites",
    description: "Useful for guests who want popular Indian comfort food, quick takeaways or a casual family meal.",
  },
  {
    name: "Kailash Parbat",
    distance: "About 2.5 km",
    cuisine: "North Indian, chaat and vegetarian dining",
    description: "A good choice for families looking for vegetarian North Indian dishes and snack-style meals.",
  },
] as const

export const amenities = [
  "Free WiFi",
  "Air-conditioned rooms",
  "Fast check-in",
  "Daily housekeeping",
  "24/7 reception support",
  "Comfortable bedding",
  "Family-friendly stay",
  "Business traveller friendly",
]

export const whyChooseItems = [
  "Walking distance to Beach Road",
  "Near Kailasagiri",
  "Near Tenneti Park",
  "Near Rushikonda Beach",
  "Family-friendly stay",
  "Business traveller friendly",
  "Free WiFi",
  "Fast check-in",
  "Comfortable stay in Visakhapatnam",
]
