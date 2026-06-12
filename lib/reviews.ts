export interface FeaturedReview {
  id: string
  guestName: string
  rating: number
  reviewText: string
  reviewDate: string
  source: "google" | "direct"
  category: "family" | "couple" | "business" | "cleanliness" | "location"
  isFeatured: boolean
  displayOrder: number
}

export const featuredReviews: FeaturedReview[] = [
  {
    id: "1",
    guestName: "Rajesh Kumar",
    rating: 5,
    reviewText: "Excellent stay! The rooms are clean, comfortable and the staff is very helpful. Perfect location near Beach Road. We loved the WiFi and the overall experience. Will definitely return.",
    reviewDate: "2024-11-15",
    source: "google",
    category: "family",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: "2",
    guestName: "Priya & Arjun",
    rating: 5,
    reviewText: "Perfect romantic getaway! The room was immaculate, the hotel is quiet and peaceful, and the location is ideal for exploring Vizag. Great value for money. Highly recommended for couples!",
    reviewDate: "2024-11-10",
    source: "google",
    category: "couple",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    id: "3",
    guestName: "Amit Patel",
    rating: 5,
    reviewText: "Great hotel for business travelers. Fast check-in, reliable WiFi, comfortable bed for a good night's sleep, and convenient location. The WhatsApp support was very responsive to my queries.",
    reviewDate: "2024-11-08",
    source: "google",
    category: "business",
    isFeatured: true,
    displayOrder: 3,
  },
  {
    id: "4",
    guestName: "Anjali Sharma",
    rating: 5,
    reviewText: "Cleanliness is top-notch! Every corner of the room was spotless. Daily housekeeping was efficient and professional. The bathroom is well-maintained. Outstanding hygiene standards.",
    reviewDate: "2024-11-05",
    source: "google",
    category: "cleanliness",
    isFeatured: true,
    displayOrder: 4,
  },
  {
    id: "5",
    guestName: "Vikram Singh",
    rating: 5,
    reviewText: "Amazing location! Close to Kailasagiri, Tenneti Park, and Rushikonda Beach. The staff helped us plan our sightseeing perfectly. Convenient access to all major attractions in Vizag.",
    reviewDate: "2024-11-01",
    source: "google",
    category: "location",
    isFeatured: true,
    displayOrder: 5,
  },
  {
    id: "6",
    guestName: "Meera & Rahul",
    rating: 5,
    reviewText: "Beautiful stay with family! Kids loved the spacious room. The staff was very accommodating. Quiet surroundings perfect for families. Great breakfast options nearby. Will book again!",
    reviewDate: "2024-10-28",
    source: "google",
    category: "family",
    isFeatured: true,
    displayOrder: 6,
  },
  {
    id: "7",
    guestName: "Deepak Desai",
    rating: 5,
    reviewText: "Professional service throughout. The hotel manager personally ensured my comfort during my week-long stay. Direct booking was seamless and no hidden charges. Excellent value.",
    reviewDate: "2024-10-25",
    source: "google",
    category: "business",
    isFeatured: true,
    displayOrder: 7,
  },
  {
    id: "8",
    guestName: "Neha Gupta",
    rating: 5,
    reviewText: "Fresh and clean throughout! The attention to detail is remarkable. Sanitized facilities, fresh linens, spotless bathroom. You can clearly see the commitment to cleanliness.",
    reviewDate: "2024-10-22",
    source: "google",
    category: "cleanliness",
    isFeatured: true,
    displayOrder: 8,
  },
  {
    id: "9",
    guestName: "Rohan Kulkarni",
    rating: 5,
    reviewText: "Couldn't ask for a better location! Direct access to Beach Road activities. Visakhapatnam Port, shopping areas, and restaurants all nearby. Staff also gave great local recommendations.",
    reviewDate: "2024-10-19",
    source: "google",
    category: "location",
    isFeatured: true,
    displayOrder: 9,
  },
  {
    id: "10",
    guestName: "Divya & Sanjay",
    rating: 5,
    reviewText: "Perfect honeymoon spot! The romantic ambiance, comfortable bed, and excellent service made it unforgettable. The view from the room was beautiful. Memories for a lifetime!",
    reviewDate: "2024-10-16",
    source: "google",
    category: "couple",
    isFeatured: true,
    displayOrder: 10,
  },
]

export function getRandomReviews(count: number): FeaturedReview[] {
  const shuffled = [...featuredReviews].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function getReviewsByCategory(category: FeaturedReview["category"]): FeaturedReview[] {
  return featuredReviews.filter((review) => review.category === category)
}
