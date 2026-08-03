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

## Contributors
- Abhiroop - Lead Developer & UI/UX Designer

## License
This project is proprietary and confidential. All rights reserved by IndCasting.


---

# Indcasting Comprehensive Architecture & Documentation

## 1. Project Overview
- **Project Name:** Indcasting
- **One-line Description:** A premium networking platform connecting actors, models, dancers, and creators with casting directors and production houses.
- **Purpose:** To facilitate high-end talent discovery, casting call management, and professional portfolio showcasing tailored for both talents and seekers.
- **Tech Stack:** Next.js (App Router), React 19, TypeScript, Vanilla CSS, GSAP, Three.js, Lucide React.
- **Main Features:** Dual-role dashboards (Talent vs. Seeker), dynamic portfolio management, seamless casting call posting/filtering, interactive multi-view modes, real-time application tracking, and an intelligent local storage-based session synchronization.

---

## 2. Directory Structure
```text
src/
├── app/
│   ├── create-portfolio/
│   ├── dashboard/
│   │   ├── applications/
│   │   ├── casting-calls/
│   │   ├── help/
│   │   ├── membership/
│   │   ├── messages/
│   │   ├── notifications/
│   │   ├── portfolio/
│   │   ├── saved/
│   │   ├── seeker/
│   │   │   ├── analytics/
│   │   │   ├── applications/
│   │   │   ├── auditions/
│   │   │   ├── casting-calls/
│   │   │   ├── company-profile/
│   │   │   ├── membership/
│   │   │   ├── messages/
│   │   │   ├── notifications/
│   │   │   ├── settings/
│   │   │   └── shortlisted/
│   │   ├── settings/
│   │   └── talent/
│   ├── explore-talent/
│   ├── login/
│   ├── membership/
│   ├── messages/
│   ├── notifications/
│   ├── portfolios/
│   ├── post/
│   ├── privacy/
│   ├── signup/
│   ├── talents/
│   ├── terms/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── fonts.css
│   │   ├── Herocarousel.tsx
│   │   ├── MagicRings.tsx
│   │   ├── ScrollStack.tsx
│   │   ├── SplitText.tsx
│   │   └── theme.css
│   ├── views/
│   │   ├── ApplicationsView.tsx
│   │   ├── MessagesView.tsx
│   │   └── NotificationsView.tsx
│   ├── DashboardCard.tsx
│   ├── DashboardHeader.tsx
│   ├── DashboardLayout.tsx
│   ├── DashboardSidebar.tsx
│   ├── FilterBar.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── Portfolioform.tsx
│   ├── ProfileCompletion.tsx
│   ├── QuickActions.tsx
│   ├── RecentApplications.tsx
│   ├── RecommendedCasting.tsx
│   └── UpcomingAuditions.tsx
├── constants/
│   └── categories.ts
├── types/
│   ├── casting.ts
│   ├── lenis.d.ts
│   └── user.ts
└── utils/
    ├── auth.ts
    └── storage.ts
```

---

## 3. Core Foundation Files

### `utils/auth.ts`
- **Purpose:** Manages user authentication, registration, session state, and session synchronization leveraging Local Storage.
- **Exports:** `getUsers`, `registerUser`, `loginUser`, `getCurrentUser`, `logoutUser`, `updateUser`
- **Used by:** Dashboards, Layouts, Login/Signup, Header, Messages, Settings.
- **Dependencies:** `@/types/user`

### `utils/storage.ts`
- **Purpose:** Acts as a mock backend for casting calls and posts, handling persistence via Local Storage.
- **Exports:** `getPosts`, `savePosts`, `addPost`, `deletePost`, `updatePost`
- **Used by:** Casting Call pages, Post pages, Dashboard Seeker views.
- **Dependencies:** `@/types/casting`

### `types/user.ts`
- **Purpose:** Defines the data structure for users.
- **Exports:** `UserProfile` interface
- **Used by:** `utils/auth.ts`, Dashboards, Settings, Sidebar, Header.

### `types/casting.ts`
- **Purpose:** Defines the data structure for casting posts and roles.
- **Exports:** `CastingPost` interface
- **Used by:** `utils/storage.ts`, Casting Calls components.

### `constants/categories.ts`
- **Purpose:** Centralized repository for casting and talent categories (e.g., Actor, Model, Dancer).
- **Exports:** `CATEGORIES`
- **Used by:** `FilterBar`, Post creation.

### `app/globals.css`
- **Purpose:** Establishes the global design system, CSS variables (colors, fonts, radii), utility classes, and light/dark mode theming logic.
- **Used by:** Global `layout.tsx`

---

## 4. Layout Architecture

### `app/layout.tsx` (Root Layout)
- **Wraps:** The entire application.
- **Components Included:** `Header`, `Footer`, Next.js Fonts.
- **Purpose:** Injects global styles, global navigation, and core document structure.

### `app/dashboard/layout.tsx` (Dashboard Layout)
- **Wraps:** All routes under `/dashboard/*`.
- **Components Included:** `DashboardSidebar`.
- **Purpose:** Provides a persistent, dual-role sidebar and nested navigation layout specific to logged-in users. 
- **Note:** Individual dashboards often incorporate `DashboardHeader` manually or through nested wrappers.

---

## 5. Routing

- **`/` (Home):** Main landing page showcasing platform value, using GSAP/Three.js components.
- **`/login` & `/signup`:** Authentication routes relying on `auth.ts`.
- **`/dashboard`:** Smart redirect route routing to either `/dashboard/talent` or `/dashboard/seeker` based on the user's role.
- **`/dashboard/talent`:** Hub for actors/models featuring `ProfileCompletion`, `RecentApplications`, and `RecommendedCasting`.
- **`/dashboard/seeker`:** Hub for casting directors featuring analytics, `QuickActions`, and active casting call metrics.
- **`/dashboard/applications` & `/dashboard/seeker/applications`:** Injects the highly encapsulated `ApplicationsView`.
- **`/dashboard/messages` & `/dashboard/seeker/messages`:** Injects the `MessagesView`.
- **`/dashboard/notifications` & `/dashboard/seeker/notifications`:** Injects the `NotificationsView`.
- **`/dashboard/casting-calls` & `/dashboard/seeker/casting-calls`:** Browsing and management of jobs.
- **`/dashboard/portfolio` & `/dashboard/seeker/company-profile`:** User profile settings and portfolio display.
- **`/membership` & `/dashboard/membership`:** Tiered subscription plan displays.
- **`/post`:** Page for seekers to create new casting calls dynamically.

---

## 6. Components

### Shared UI Components
- **`Header.tsx`:** Global top navigation, handles user session state dynamically, provides theme toggling and search.
- **`Footer.tsx`:** Standard platform footer links.
- **`DashboardSidebar.tsx`:** Responsive, role-aware sidebar navigation for the dashboard.
- **`DashboardHeader.tsx`:** Page-level header inside dashboards displaying breadcrumbs and quick actions.
- **`DashboardCard.tsx`:** A highly reusable wrapper for statistical cards and widgets.

### Specialized Views
- **`ApplicationsView.tsx`:** Handles complex multi-layout viewing (Tile, Grid, List) for job applications. 
- **`MessagesView.tsx`:** Interface for direct user-to-user communication.
- **`NotificationsView.tsx`:** Aggregated alert center for user activity.

### Premium Visual Components (`components/ui/`)
- **`Herocarousel.tsx`:** High-end hero slider component.
- **`MagicRings.tsx`:** Three.js powered interactive background graphic.
- **`ScrollStack.tsx`:** Lenis-powered smooth scrolling stack effect.
- **`SplitText.tsx`:** GSAP-based advanced typography animation component.

---

## 7. Feature Modules

- **Authentication Module:** Powered by `login/page.tsx`, `signup/page.tsx`, and `utils/auth.ts`. Handles role selection (Talent vs Seeker) and localStorage persistence.
- **Talent Dashboard:** Encompasses `/dashboard/talent/*`. Focuses on application tracking, saved jobs, and profile completion.
- **Seeker Dashboard:** Encompasses `/dashboard/seeker/*`. Focuses on analytics, shortlisted talents, audition scheduling, and company profiling.
- **Casting Management:** Powered by `utils/storage.ts` and `/post/page.tsx`. Allows seekers to draft and publish casting calls.
- **Membership:** Reusable visually distinct pricing tiers displayed both globally (`/membership`) and internally (`/dashboard/membership`).

---

## 8. Utilities

- **`auth.ts`:**
  - *Helper Methods:* `getCurrentUser()` reads current session; `loginUser()` validates and stores active session; `logoutUser()` purges session.
  - *Storage Keys:* Relies on `'users'` and `'currentUser'` inside `localStorage`.
- **`storage.ts`:**
  - *Helper Methods:* CRUD operations for casting calls (`getPosts`, `addPost`, etc.)
  - *Storage Keys:* Relies on `'casting_posts'`.

---

## 9. Types & Interfaces

- **`UserProfile` (`types/user.ts`):** Defines `id`, `name`, `email`, `role`, `avatar`, and nested stats/preferences. Imported globally across views and utils.
- **`CastingPost` (`types/casting.ts`):** Defines `id`, `title`, `roleType`, `location`, `description`. Used by seeker dashboards and storage utils.
- **`Lenis` (`types/lenis.d.ts`):** TypeScript ambient declaration for the Lenis smooth scroll library.

---

## 10. Constants

- **`CATEGORIES` (`constants/categories.ts`):** An array of standard industry roles (Actor, Director, Model, Dancer, Voice Artist) to standardize filtering and job posting.

---

## 11. API Layer

- **Current Implementation:** There is no traditional backend API route (e.g., Node.js/Express) currently implemented.
- **Data Flow:** All "API" interactions are heavily mocked using `localStorage` through `utils/auth.ts` and `utils/storage.ts`. Data is retrieved client-side on component mount using React `useEffect`.

---

## 12. State Management

- **React State (`useState` & `useEffect`):** Primarily handles UI toggles, modal visibility, layout view modes (grid vs list), and form inputs.
- **Local Storage:** Acts as the primary database for persistence across reloads. Both User sessions and Casting Post data flow directly from local storage into React state upon component hydration.

---

## 13. Dependency Graph (Core Flow)

```text
app/layout.tsx
 ├── globals.css
 ├── components/Header.tsx
 │    └── utils/auth.ts (Session Fetching)
 ├── (Pages / App Router)
 │    ├── app/dashboard/layout.tsx
 │    │    └── components/DashboardSidebar.tsx
 │    └── app/dashboard/talent/page.tsx
 │         ├── components/DashboardCard.tsx
 │         ├── components/ProfileCompletion.tsx
 │         └── utils/auth.ts
 └── components/Footer.tsx
```

---

## 14. Reusable Components Map

| Component | Used In |
| --- | --- |
| `DashboardCard` | Seeker Analytics, Talent Dashboard, Company Profile |
| `ApplicationsView`| `/talents`, `/dashboard/applications`, `/dashboard/seeker/applications` |
| `MessagesView` | `/messages`, `/dashboard/messages`, `/dashboard/seeker/messages` |
| `NotificationsView`| `/notifications`, `/dashboard/notifications`, `/dashboard/seeker/notifications`|

---

## 15. Empty / Placeholder Files

The following files were detected as currently empty, unfinished, or acting as placeholders:
- `src/components/Navbar.tsx` (Empty wrapper)
- `src/components/Portfolioform.tsx` (Empty wrapper)
- `src/components/QuickActions.tsx` (Empty wrapper)
- `src/app/portfolios/page.tsx` (Placeholder route)

---

## 16. Architecture Notes

- **Routing Logic:** Heavily utilizes Next.js 13+ App Router features. Dashboards are split logically by role (`/seeker/` vs standard dashboard paths).
- **Authentication Flow:** Client-side heavy. The application trusts the `currentUser` object in local storage. Protected routes do not currently use Next.js Middleware; they rely on client-side redirection via `useEffect` and `next/navigation` hooks.
- **Reusable UI Strategy:** The project successfully encapsulates distinct functional views (like Messages and Applications) into `components/views/` so they can be injected into multiple different routing contexts without code duplication.

---

## 17. Technologies

| Category | Technology |
| --- | --- |
| **Framework** | Next.js 16.2.10 (App Router) |
| **Language** | TypeScript |
| **UI Library** | React 19.2.4 |
| **Styling** | Vanilla CSS (Variables, Flexbox, Grid) |
| **Icons** | lucide-react |
| **Animations** | GSAP, Three.js, Lenis |
| **State Management**| React Hooks + LocalStorage |
| **Package Manager** | npm |

---

## 18. Future Improvements

1. **Next.js Middleware:** Implement server-side route protection using `middleware.ts` to prevent layout flashing on protected routes before client-side hydration kicks in.
2. **Backend Integration:** Replace `utils/auth.ts` and `utils/storage.ts` with real API routes (`/api/auth`, `/api/posts`) interacting with a database (e.g., PostgreSQL/Prisma).
3. **Global State Manager:** As the app scales, local storage fetching inside multiple components (Header, Sidebar, Dashboard) may cause de-sync issues. Introducing Zustand or React Context for a global `UserSessionContext` would drastically simplify data flow.
4. **Cleanup Placeholders:** Remove or implement the empty files (`Navbar.tsx`, `QuickActions.tsx`) to keep the codebase clean.
