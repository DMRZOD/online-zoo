# Online Zoo

A virtual zoo platform where users can watch live animal webcams, explore an interactive world map of zoos, adopt animals, and support wildlife through donations.

**Live:** [online-zoo-damir.vercel.app](https://online-zoo-damir.vercel.app/)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Motion (Framer Motion)
- **Maps:** Leaflet + React-Leaflet
- **i18n:** next-intl (English, Russian, Spanish)
- **Linting:** ESLint + Husky + Commitlint

## Features

- **Landing page** — hero section, about, donation CTA, pets carousel, feed, reviews, care tips
- **Live webcams** — sidebar with 28 animals, embedded YouTube live feeds, pet info and donation
- **Interactive map** — world map with clickable zoo markers and modal info
- **Meet the animals** — filterable animal grid with detailed info cards
- **Adoption system** — multi-step flow: choose animal, select tier, fill details, payment, downloadable certificate
- **Donation popup** — 3-step donation process with amount selection
- **Authentication** — sign-in and registration forms with API integration
- **Contact form** — validated contact form
- **Dark mode** — full dark theme support
- **Responsive design** — mobile-first, optimized for all screen sizes
- **Blur loading** — progressive image loading with blur-up effect
- **Mega menu** — dropdown navigation with animal categories

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/[locale]/              # Pages (i18n routing)
  ├── page.tsx             # Landing page
  ├── webcams/             # Live webcams
  ├── map/                 # Interactive map
  ├── meet-the-animals/    # Animal gallery
  ├── adoption/            # Adoption flow
  ├── contact/             # Contact form
  ├── sign-in/             # Login
  └── register/            # Registration
components/                # React components by feature
  ├── layout/              # Header, footer, mega menu
  ├── landing/             # Landing page sections
  ├── animals/             # Webcam page components
  ├── meet-the-animals/    # Animal grid components
  ├── adoption/            # Adoption flow steps
  ├── donation/            # Donation popup system
  ├── cards/               # Reusable card components
  ├── slider/              # Carousel components
  ├── map/                 # Map components
  ├── auth/                # Auth forms
  ├── contact/             # Contact form
  ├── theme/               # Dark mode & language toggles
  └── ui/                  # Base UI components (shadcn)
i18n/                      # Internationalization config & translations
lib/                       # Utilities, API client, constants
data/                      # Animal metadata (28 animals)
public/                    # Static assets (icons, images)
```

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic deployments.
