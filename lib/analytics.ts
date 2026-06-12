// GA4 Event Tracking Helper for Hotel Excella

interface GA4EventParams {
  page_location?: string
  page_title?: string
  [key: string]: any
}

/**
 * Track custom GA4 events
 * Requires gtag to be available in window
 */
export const trackEvent = (eventName: string, params?: GA4EventParams) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    const eventParams = {
      page_location: window.location.href,
      page_title: document.title,
      ...params,
    }
    ;(window as any).gtag("event", eventName, eventParams)
  }
}

// Predefined event tracking functions
export const analytics = {
  // Conversion events
  bookNowClick: () => trackEvent("book_now_click"),
  whatsappClick: (page?: string) => trackEvent("whatsapp_click", { page }),
  callClick: (page?: string) => trackEvent("call_click", { page }),
  reviewClick: () => trackEvent("review_click"),
  guestPortalOpen: () => trackEvent("guest_portal_open"),
  foodOrderClick: () => trackEvent("food_order_click"),

  // Engagement events
  reviewCarouselView: (count?: number) =>
    trackEvent("review_carousel_view", { review_count: count }),
  roomCardClick: (roomName?: string) =>
    trackEvent("room_card_click", { room_name: roomName }),
  attractionCardClick: (attractionName?: string) =>
    trackEvent("attraction_card_click", { attraction_name: attractionName }),
  ctaButtonClick: (ctaText?: string) =>
    trackEvent("cta_button_click", { cta_text: ctaText }),

  // Page events
  pageView: (pageName?: string) =>
    trackEvent("page_view_custom", { page_name: pageName }),

  // Navigation events
  navigationDropdownOpen: () => trackEvent("navigation_dropdown_open"),
  mobileMenuOpen: () => trackEvent("mobile_menu_open"),
}

export default analytics
