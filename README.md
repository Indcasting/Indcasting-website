# IndCasting - India's Premium Casting Platform

## Overview
IndCasting is a modern, responsive web application built with **Next.js**, **React**, and **TypeScript**. It serves as a premium networking platform connecting actors, models, dancers, and creators with casting directors and production houses. Designed with a high-end aesthetic, it provides distinct user experiences tailored for both aspiring talents and industry professionals.

## Features

### Existing Features (July 2026)
- **Premium Dashboard UI Redesign**: Unified aesthetic aligning perfectly with the premium, high-end feel of the homepage.
- **Glassmorphism Integration**: Sleek, translucent dashboard sidebar and top header utilizing backdrop-blur effects.
- **Signature Styling**: Distinctive gold glowing grid background beneath all dashboard elements for a deeply immersive UI.
- **Enhanced Typography**: Upgraded text sizing, weights, and component rounded corners across all metric cards.
- **Dynamic Session Rendering**: Active fetching and display of real logged-in user data from `localStorage`/session storage for greetings and portfolio views.
- **Interactive Multi-View Modes**: Applications view toggles between Tile, Extra Large, Details, and Small Icons layouts.

### Newly Added Features (August 2026)
- **Dual-Role Dashboards**: Fully implemented, distinct dashboards for both **Talents** (actors/models) and **Seekers** (Casting Directors/Production Houses).
- **Global Header**: Rebuilt main navigation header featuring dynamic breadcrumbs, a global `Ctrl+K` search bar, and a "+ Create" quick-action dropdown.
- **Smart User Synchronization**: Intelligent syncing across the Sidebar and Header with the active user session on every route change, preventing stale data and SSR mismatches.
- **Intelligent Fallbacks**: Dynamic mock fallbacks (e.g., "Abhiroop" or "Casting Director") for prototype testing when local storage is cleared.
- **Micro-Interactions**: Improved hover states, such as icon buttons seamlessly shifting to a crisp, high-contrast dark color (`#111`) over premium gold backgrounds.
- **Transparent Bleed Fixes**: Solved transparency overlapping issues in dark mode dropdown menus (like the Casting Call filter dropdown) using strict solid surface background variables.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Variables, Grid, Flexbox, Glassmorphism)
- **Icons**: `lucide-react`
- **Animations**: GSAP
- **State/Auth**: LocalStorage Session Simulation

## Project Architecture
- **Component Architecture**: Modular Next.js Page structures (`src/app/dashboard/...`) tightly connected to reusable visual components (`src/components/...`).
- **Isolated View Modules**: Highly encapsulated views (e.g., `ApplicationsView`, `MessagesView`) that plug dynamically into their respective pages.
- **Global Design System (`globals.css`)**: Uses CSS custom properties (variables) as a single source of truth for all theming and components.

## Folder Structure
```text
src/
├── app/
│   ├── dashboard/
│   │   ├── seeker/       # Seeker-specific pages (Analytics, Casting Calls, etc.)
│   │   ├── talent/       # Talent-specific dashboard views
│   │   ├── layout.tsx    # Shared dashboard layout
│   ├── globals.css       # Global design tokens and styles
│   └── page.tsx          # Main landing page
├── components/           # Reusable UI components (Sidebar, Header, Cards)
│   └── views/            # Isolated module views
├── types/                # TypeScript type definitions
└── utils/
    └── auth.ts           # Authentication and session management logic
```

## Installation

First, install dependencies:
```bash
npm install
```

## Running the Project

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screenshots / UI Preview
*(Add your project screenshots or GIFs here to showcase the stunning premium UI, dashboard layouts, and light/dark modes.)*

## Dashboard Features

### Talent Dashboard
Designed specifically for actors and models to manage their professional journey.
- **Personalized Welcome**: Dynamic greeting fetching the actual user's name.
- **Application Tracking**: A dedicated view to track the status of all submitted casting applications.
- **Saved Jobs**: A bookmarking system to keep track of interesting roles.
- **Portfolio Management**: Tools to showcase headshots, showreels, and personal details.

### Seeker Dashboard
Built exclusively for Casting Directors and Production Houses to manage talent acquisition.
- **Casting Calls Management**: Search and role filtering (Full-Time, Part-Time, Freelance, Contract) with real-time empty states.
- **Dynamic Quick Create**: A beautiful "Create New" modal that allows seekers to instantly publish new casting calls without reloading the page.
- **Shortlisted Talent**: Quickly view and manage top candidates for open roles.
- **Analytics Overview**: High-level insights on casting call performance and application metrics.

## Authentication
Authentication is managed via the `utils/auth.ts` module:
- Secures all user data and login sessions.
- Simulates a robust backend connection by interacting directly with `localStorage` and `sessionStorage`.
- Exposes `getCurrentUser()` and `updateUser()` hooks that power all personalized dashboard areas.

## Theme Support
The platform relies on a sophisticated, variable-based vanilla CSS architecture allowing instant switching across every component.

- **Dark Mode**: Features deep blacks, rich gold accents, and subtle glassmorphic overlays. Overlapping transparency issues are strictly managed with solid surface fallbacks.
- **Light Mode**: Perfected text visibility and contrast rules ensuring that headers and nested elements gracefully adapt without getting lost against lighter backgrounds.

## Core Modules
- **Portfolio**: Real-time rendering of the logged-in user's profile and media.
- **Applications**: Interactive multi-view modes (Tile, Extra Large, Details, Small Icons) powered by `lucide-react`.
- **Casting Calls**: End-to-end job creation, filtering, and application tracking.
- **Membership**: Subscription tiers for premium networking and highlighted profiles.
- **Notifications**: Real-time alerts seamlessly synced across the global header.
- **Messages**: Direct messaging interface for talent-seeker communications.
- **Analytics**: (Seeker only) Data visualization of job posting engagement.
- **Company Profile**: (Seeker only) Professional production house branding and details.

## Future Enhancements
- Full backend integration (Node.js/PostgreSQL) replacing the `localStorage` simulation.
- Real-time WebSockets for the messaging and notification systems.
- Advanced media uploading (video compression and streaming) for talent showreels.
- AI-driven talent matching and recommendations for Casting Directors.

## License
This project is proprietary and confidential. All rights reserved by IndCasting.
