# SEO Maintenance Guide - Hotel Excella

## Overview
This guide documents how to maintain and improve SEO for Hotel Excella website following the implementation of phases 1-20.

## Key SEO Files & Locations

### Metadata & Schema
- Main site metadata: `/lib/seo/constants.ts`
- Schema definitions: `/lib/seo/schema.ts`
- JSON-LD component: `/components/seo/json-ld.tsx`
- Review data: `/lib/reviews.ts`

### Core Pages
- Homepage: `/app/page.tsx` (indexed)
- Rooms: `/app/rooms/page.tsx` (indexed)
- About: `/app/about-hotel-excella/page.tsx` (indexed)
- Location: `/app/location/page.tsx` (indexed)
- Contact: `/app/contact/page.tsx` (indexed)
- Amenities: `/app/amenities/page.tsx` (indexed)
- Attractions: `/app/attractions/page.tsx` (indexed)

### Legal Pages (Indexed)
- Privacy Policy: `/app/privacy-policy/page.tsx`
- Terms & Conditions: `/app/terms-conditions/page.tsx`

### Operational Pages (Noindex)
- Guest Portal: `/app/guest/page.tsx` (robots: noindex, nofollow)
- Order Food: `/app/orderfood/page.tsx` (robots: noindex, nofollow)
- Review Submission: `/app/review/page.tsx` (robots: noindex, nofollow)

## Adding New SEO Pages

### Step 1: Create Page Directory
```bash
mkdir -p app/new-page-name
```

### Step 2: Create page.tsx with Metadata
```typescript
import type { Metadata } from "next"
import { site } from "@/lib/seo/constants"

export const metadata: Metadata = {
  title: "Page Title | Hotel Excella Vizag",
  description: "Page description with target keywords...",
  keywords: "keyword1, keyword2, keyword3",
  alternates: { canonical: `${site.url}/new-page-name` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Page Title",
    description: "Description",
    url: `${site.url}/new-page-name`,
    siteName: site.name,
    images: [{ url: site.image, width: 1200, height: 630, alt: "Hotel Excella" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title",
    description: "Description",
    images: [site.image],
  },
}

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page content */}
    </div>
  )
}
```

### Step 3: Add Schema Markup
```typescript
import { JsonLd } from "@/components/seo/json-ld"

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Page Name",
  description: "Description",
  url: `${site.url}/new-page-name`,
}

// In component:
<JsonLd data={[schema]} />
```

### Step 4: Add Internal Links
- Link from homepage or relevant pages
- Add to footer quick links
- Include in navigation if it's a primary page

### Step 5: Update Sitemap
The sitemap is auto-generated from routes. Verify it includes the new page.

## Metadata Best Practices

### Title Tags
- Length: 50-60 characters
- Format: "Primary Keyword | Hotel Excella Vizag"
- Include local keyword (Vizag)

### Meta Descriptions
- Length: 150-160 characters
- Include call-to-action or benefit
- Include primary keyword naturally

### Keywords
- 3-5 relevant keywords
- Mix of short-tail and long-tail
- Local keywords always included

## Schema Markup Guidelines

### Required Schemas
1. **Organization Schema** - Company info, contact
2. **LocalBusiness Schema** - Location, hours, contact
3. **Hotel Schema** - Room types, amenities, address
4. **FAQ Schema** - For FAQ pages
5. **Breadcrumb Schema** - For navigation hierarchy

### No Duplicate Schemas
- Use `JsonLd data={[schema1, schema2]}` format
- Verify no conflicting types
- Check with Google's Rich Results Test

## Internal Linking Strategy

### Homepage Links
- Link to top destination pages
- Review carousel with "View More" CTA
- Featured attractions section

### Room Pages
- Link to attractions nearby
- Link to amenities page
- Link to booking page

### About Page
- Link to attractions
- Link to dining options
- Link to review page

## Guest Review Management

### Featured Reviews
Location: `/lib/reviews.ts`

To update reviews:
1. Open `/lib/reviews.ts`
2. Replace review entries with new Google reviews
3. Maintain balance across categories (Family, Couple, Business, Cleanliness, Location)
4. Ensure 5-star rating only
5. Rebuild: `npm run build`

### Review Carousel
- Homepage: 3 cards, auto-rotating
- About page: 10 cards, expanded view
- Component: `/components/reviews/review-carousel.tsx`

## Analytics Events

Implemented GA4 events via `/lib/analytics.ts`:

### Conversion Events
- `book_now_click` - Booking button clicks
- `whatsapp_click` - WhatsApp contact clicks
- `call_click` - Phone call clicks
- `review_click` - Review CTA clicks
- `guest_portal_open` - Guest portal access
- `food_order_click` - Food ordering clicks

### Usage
```typescript
import { analytics } from "@/lib/analytics"

// Track event
analytics.bookNowClick()
analytics.whatsappClick("location-page")
```

## Performance Monitoring

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Check Performance
```bash
npm run build
npm run lint
```

## ESLint Configuration

- Config: `/eslint.config.js` (flat config for ESLint 10+)
- Run: `pnpm lint`
- Fix issues: `pnpm lint --fix`

## Trust Signals Implementation

### Implemented Trust Elements
- Family Friendly designation on main pages
- Couple Friendly mention in descriptions
- Business Traveller positioning in amenities
- Free Wi-Fi, Smart TVs, Daily Housekeeping callouts
- Direct WhatsApp contact buttons
- 24/7 reception messaging
- Direct booking emphasis

### Placement Strategy
- Homepage hero section
- Room pages
- About page
- Amenities page
- Contact page

## Content Quality Standards

### Avoid
- AI-generated sounding copy
- Keyword stuffing (> 2% keyword density)
- Duplicate content between pages
- Weak CTAs or unclear next steps
- Generic hotel copy without local personality

### Best Practices
- Write from local Vizag hospitality perspective
- Natural keyword integration
- Clear, benefit-driven copy
- Strong CTAs with action verbs
- Local personality and voice

## Monitoring Checklist

Monthly:
- [ ] Google Search Console errors
- [ ] Broken internal links
- [ ] Mobile usability issues
- [ ] Core Web Vitals
- [ ] Indexed pages count

Quarterly:
- [ ] Content quality audit
- [ ] Competitor analysis
- [ ] Keyword ranking check
- [ ] GA4 conversion metrics
- [ ] Review response rate

## Common Issues & Solutions

### Pages Not Indexed
1. Check `robots` metadata: should be `{ index: true, follow: true }`
2. Verify in sitemap
3. Submit to Google Search Console
4. Check for redirect chains

### Low CTR in SERPs
1. Review title tag (should trigger click)
2. Improve meta description (add benefit/CTA)
3. Add schema markup for rich results
4. Ensure page loads quickly (LCP < 2.5s)

### High Bounce Rate
1. Check page load speed
2. Verify content matches title/description
3. Improve mobile responsiveness
4. Add clear CTA above fold

## Tools & Resources

- **Google Search Console**: https://search.google.com/search-console
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **Schema Validator**: https://schema.org/
- **Lighthouse**: Built into Chrome DevTools

## Support & Updates

For SEO questions or updates needed, contact the development team with details about:
- Desired keyword targets
- Page content changes
- Metadata updates
- New page requirements
