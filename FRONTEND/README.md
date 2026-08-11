# IndCasting — Source Code Structure & File Connection Map

**Project:** IndCasting — India's casting platform connecting talent with casting directors  
**Stack:** Next.js (App Router) · TypeScript · Tailwind / CSS Variables · Lucide Icons · GSAP · Three.js

---

## Directory Overview

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (wraps all pages)
│   ├── page.tsx            # Home page (landing)
│   ├── globals.css         # Global CSS (imported by layout)
│   ├── page.module.css     # (empty)
│   ├── login/
│   ├── signup/
│   ├── membership/
│   ├── post/
│   ├── portfolios/
│   ├── talents/
│   ├── explore-talent/
│   ├── create-portfolio/
│   ├── notifications/
│   ├── messages/
│   ├── privacy/
│   ├── terms/
│   └── dashboard/
│       ├── layout.tsx      # Dashboard shell layout
│       ├── page.tsx        # Auth redirect logic
│       ├── talent/
│       ├── seeker/
│       ├── casting-calls/
│       ├── applications/
│       ├── portfolio/
│       ├── messages/
│       ├── notifications/
│       ├── saved/
│       ├── settings/
│       ├── membership/
│       └── help/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── DashboardSidebar.tsx
│   ├── DashboardHeader.tsx
│   ├── DashboardLayout.tsx
│   ├── DashboardCard.tsx
│   ├── FilterBar.tsx
│   ├── RecommendedCasting.tsx
│   ├── RecentApplications.tsx
│   ├── ProfileCompletion.tsx
│   ├── UpcomingAuditions.tsx
│   ├── Portfolioform.tsx   # (empty)
│   ├── Navbar.tsx          # (empty)
│   ├── QuickActions.tsx    # (empty)
│   ├── views/
│   │   ├── MessagesView.tsx
│   │   ├── NotificationsView.tsx
│   │   └── ApplicationsView.tsx
│   └── ui/
│       ├── SplitText.tsx
│       ├── ScrollStack.tsx
│       ├── Herocarousel.tsx
│       ├── MagicRings.tsx
│       ├── fonts.css
│       └── theme.css
├── utils/
│   ├── auth.ts
│   └── storage.ts
├── types/
│   ├── user.ts
│   ├── casting.ts
│   └── lenis.d.ts
└── constants/
    └── categories.ts
```

---

## Core Foundation Files

These are consumed by many other files and have no dependencies on the rest of the codebase.

### `types/user.ts`
Defines `UserProfile` interface: `id`, `name`, `email`, `password`, `phone`, `city`, `role ("talent" | "seeker")`, `bio`.  
**Used by:** `utils/auth.ts`, `components/Header.tsx`, `components/DashboardSidebar.tsx`, `components/DashboardHeader.tsx`, `app/dashboard/talent/page.tsx`, `app/dashboard/seeker/page.tsx`, `app/dashboard/portfolio/page.tsx`, `app/dashboard/settings/page.tsx`, `app/dashboard/seeker/settings/page.tsx`

### `types/casting.ts`
Defines `CastingPost` interface: `id`, `userId`, `company`, `title`, `category`, `role`, `gender`, `age`, `height`, `languages`, `experience`, `location`, etc.  
**Used by:** `utils/storage.ts`, `app/post/page.tsx`

### `types/lenis.d.ts`
Type declarations for the Lenis smooth scroll library.  
**Used by:** `components/ui/ScrollStack.tsx`

### `constants/categories.ts`
Exports `CATEGORIES` — an array of casting category strings (Feature Film, OTT Series, Fashion Shoot, etc.).  
**Used by:** `components/FilterBar.tsx`

### `utils/auth.ts`
Handles all authentication using `localStorage`. Imports `UserProfile` from `types/user.ts`.  
Exports: `getUsers`, `registerUser`, `loginUser`, `logoutUser`, `getCurrentUser`, `updateUser`.  
**Used by:** `components/Header.tsx`, `components/DashboardSidebar.tsx`, `components/DashboardHeader.tsx`, `components/views/MessagesView.tsx`, `components/views/NotificationsView.tsx`, `app/login/page.tsx`, `app/dashboard/talent/page.tsx`, `app/dashboard/seeker/page.tsx`, `app/dashboard/portfolio/page.tsx`, `app/dashboard/settings/page.tsx`, `app/dashboard/seeker/settings/page.tsx`

### `utils/storage.ts`
Handles `CastingPost` CRUD in `localStorage`. Imports `CastingPost` from `types/casting.ts`.  
Exports: `getPosts`, `savePosts`, `addPost`.  
**Used by:** `app/post/page.tsx`

---

## Layout & Global Styles

### `app/globals.css`
Global stylesheet — CSS custom properties, resets, and shared utility classes used across the whole app.  
**Imported by:** `app/layout.tsx`

### `components/ui/fonts.css`
Custom font-face declarations (Instrument Serif, etc.).  
**Imported by:** `app/page.tsx`

### `components/ui/theme.css`
CSS variables for theming (light/dark mode tokens).  
**Imported by:** `app/page.tsx`

---

## App Router Layouts

### `app/layout.tsx` — **Root Layout**
Wraps every page in the app.  
**Imports:**
- `app/globals.css`
- `components/Header.tsx`
- `components/Footer.tsx`

Every page in `app/` is a child of this layout. The `Header` and `Footer` appear on all public-facing pages.

### `app/dashboard/layout.tsx` — **Dashboard Shell**
Wraps all `/dashboard/*` routes. Overrides the root layout's padding/footer for the dashboard.  
**Imports:**
- `components/DashboardSidebar.tsx`

All pages under `app/dashboard/` (including `seeker/` sub-routes) are wrapped in this layout.

---

## Pages & Their Connections

### `app/page.tsx` — Home / Landing Page
The main marketing page. Self-contained with inline styles and GSAP animations loaded via CDN script tags.  
**Imports:**
- `components/ui/fonts.css`
- `components/ui/theme.css`

No component imports — all UI is built inline. Uses GSAP ScrollTrigger for scroll animations, a looping hero video, parallax tile grid, stacked pillar cards, and a marquee category strip.

---

### `app/login/page.tsx`
Login form. Redirects to role-specific dashboard on success.  
**Imports:**
- `utils/auth.ts` → `loginUser`, `getCurrentUser`

---

### `app/signup/page.tsx`
Registration form. Handles both `talent` and `seeker` roles.  
**Imports:**
- `utils/auth.ts` → `registerUser`

---

### `app/membership/page.tsx`
Public membership/pricing page with plan comparison table and FAQ.  
**Imports:**
- `components/ui/MagicRings.tsx` — decorative Three.js ring animation in the hero

---

### `app/post/page.tsx`
Casting call post creation page. Largest page file (~55KB).  
**Imports:**
- `components/ui/Herocarousel.tsx` — hero carousel at the top of the page
- `utils/storage.ts` → `getPosts`, `savePosts`, `addPost` — persists casting posts to `localStorage`
- Internally references `types/casting.ts` shape via the `CastingPost` interface defined inline

---

### `app/notifications/page.tsx`
Public notifications page.  
**Imports:**
- `components/views/NotificationsView.tsx`

---

### `app/messages/page.tsx`
Public messages page.  
**Imports:**
- `components/views/MessagesView.tsx`

---

### `app/talents/page.tsx`
Talent browse/listing page (reuses the applications view component).  
**Imports:**
- `components/views/ApplicationsView.tsx`

---

### `app/portfolios/page.tsx`
Placeholder portfolios page — currently renders a bare heading with no component imports.

### `app/explore-talent/page.tsx`
Placeholder explore page — no component imports.

### `app/create-portfolio/page.tsx`
Portfolio creation form — no external component imports, uses local state only.

### `app/privacy/page.tsx` & `app/terms/page.tsx`
Static legal pages — no component imports, fully self-contained.

---

## Dashboard Pages

All dashboard pages are wrapped by `app/dashboard/layout.tsx` (which provides the sidebar).

### `app/dashboard/page.tsx` — Auth Redirect
Reads `currentUser` from localStorage and redirects to `/dashboard/talent` or `/dashboard/seeker`. No component imports.

---

### Talent Dashboard (`/dashboard/talent/*`)

| Page | File | Imports |
|------|------|---------|
| Main | `app/dashboard/talent/page.tsx` | `DashboardCard`, `utils/auth.ts` → `getCurrentUser`, `types/user.ts` → `UserProfile` |
| Casting Calls | `app/dashboard/casting-calls/page.tsx` | None (self-contained) |
| Applications | `app/dashboard/applications/page.tsx` | `components/views/ApplicationsView.tsx` |
| Portfolio | `app/dashboard/portfolio/page.tsx` | `utils/auth.ts` → `getCurrentUser`, `types/user.ts` → `UserProfile` |
| Messages | `app/dashboard/messages/page.tsx` | `components/views/MessagesView.tsx` |
| Notifications | `app/dashboard/notifications/page.tsx` | `components/views/NotificationsView.tsx` |
| Saved | `app/dashboard/saved/page.tsx` | None (self-contained) |
| Settings | `app/dashboard/settings/page.tsx` | `utils/auth.ts` → `getCurrentUser`, `updateUser`; `types/user.ts` → `UserProfile` |
| Membership | `app/dashboard/membership/page.tsx` | None (self-contained) |
| Help | `app/dashboard/help/page.tsx` | None (self-contained) |

---

### Seeker Dashboard (`/dashboard/seeker/*`)

| Page | File | Imports |
|------|------|---------|
| Main | `app/dashboard/seeker/page.tsx` | `DashboardCard`, `utils/auth.ts` → `getCurrentUser`, `types/user.ts` → `UserProfile` |
| Casting Calls | `app/dashboard/seeker/casting-calls/page.tsx` | None (self-contained) |
| Applications | `app/dashboard/seeker/applications/page.tsx` | `components/views/ApplicationsView.tsx` |
| Messages | `app/dashboard/seeker/messages/page.tsx` | `components/views/MessagesView.tsx` |
| Notifications | `app/dashboard/seeker/notifications/page.tsx` | `components/views/NotificationsView.tsx` |
| Settings | `app/dashboard/seeker/settings/page.tsx` | `utils/auth.ts` → `getCurrentUser`, `updateUser`; `types/user.ts` → `UserProfile` |
| Membership | `app/dashboard/seeker/membership/page.tsx` | None (self-contained) |
| Analytics | `app/dashboard/seeker/analytics/page.tsx` | `components/DashboardCard.tsx` |
| Shortlisted | `app/dashboard/seeker/shortlisted/page.tsx` | None (self-contained) |
| Auditions | `app/dashboard/seeker/auditions/page.tsx` | None (self-contained) |
| Company Profile | `app/dashboard/seeker/company-profile/page.tsx` | `components/DashboardCard.tsx` |

---

## Components & Their Connections

### `components/Header.tsx`
Global site header with nav, dark mode toggle, user menu, and notification/message icons.  
**Imports:**
- `utils/auth.ts` → `getCurrentUser`, `logoutUser`
- `types/user.ts` → `UserProfile`
- `lucide-react` (Plus, ChevronDown, Bell, MessageSquare, Moon, Sun, ChevronRight)

**Used by:** `app/layout.tsx` (rendered on every public page)

---

### `components/Footer.tsx`
Global footer with links to Home, Portfolios, Membership, Privacy, Terms.  
**Imports:** `next/link` only  
**Used by:** `app/layout.tsx`

---

### `components/DashboardSidebar.tsx`
The collapsible left sidebar for the dashboard. Renders different menu items depending on user role (`talent` vs `seeker`).  
**Imports:**
- `utils/auth.ts` → `getCurrentUser`, `logoutUser`
- `types/user.ts` → `UserProfile`
- `lucide-react` (Home, BriefcaseBusiness, FileText, User, Star, MessageCircle, Bell, Crown, Settings, HelpCircle, LogOut, ChevronRight, Video, BarChart2, Building)

**Used by:** `app/dashboard/layout.tsx`, `components/DashboardLayout.tsx`

---

### `components/DashboardHeader.tsx`
Secondary header for the dashboard area (search, bell, messages, theme toggle).  
**Imports:**
- `utils/auth.ts` → `getCurrentUser`
- `types/user.ts` → `UserProfile`
- `lucide-react` (Search, Bell, MessageSquare, Sun, Moon, User, LogIn)

**Used by:** _(available for dashboard pages — currently the sidebar-only layout is used instead)_

---

### `components/DashboardLayout.tsx`
Component-level layout wrapper that composes `DashboardSidebar` + a main content area.  
**Imports:**
- `components/DashboardSidebar.tsx`

> Note: The actual Next.js route layout (`app/dashboard/layout.tsx`) does the same job. This component-level version exists as an alternative wrapper.

---

### `components/DashboardCard.tsx`
Reusable card shell with a title bar and optional action slot. Pure UI, no imports.  
**Used by:** `app/dashboard/talent/page.tsx`, `app/dashboard/seeker/page.tsx`, `app/dashboard/seeker/analytics/page.tsx`, `app/dashboard/seeker/company-profile/page.tsx`

---

### `components/FilterBar.tsx`
Search and filter bar for casting call listings.  
**Imports:**
- `constants/categories.ts` → `CATEGORIES`

**Used by:** _(available for explore / cast-call listing pages)_

---

### `components/RecommendedCasting.tsx`
Widget showing recommended casting calls with hardcoded mock data.  
**Imports:** `lucide-react` (MapPin, Clock) only  
**Used by:** _(available as a widget for the talent dashboard)_

---

### `components/RecentApplications.tsx`
Widget showing recent application statuses with hardcoded mock data.  
No imports beyond React.  
**Used by:** _(available as a widget for the talent dashboard)_

---

### `components/ProfileCompletion.tsx`
Progress bar card showing profile completion percentage.  
**Imports:** `lucide-react` (CheckCircle2) only  
**Used by:** _(available as a widget for the talent dashboard)_

---

### `components/UpcomingAuditions.tsx`
Widget showing upcoming auditions with hardcoded mock data.  
No external imports.  
**Used by:** _(available as a widget for the talent dashboard)_

---

## View Components (`components/views/`)

Reusable full-page view components used across both public routes and dashboard routes.

### `components/views/MessagesView.tsx`
Chat-style messaging UI.  
**Imports:**
- `utils/auth.ts` → `getCurrentUser`

**Used by:**
- `app/messages/page.tsx` (public route)
- `app/dashboard/messages/page.tsx`
- `app/dashboard/seeker/messages/page.tsx`

---

### `components/views/NotificationsView.tsx`
Notification list with read/unread state.  
**Imports:**
- `utils/auth.ts` → `getCurrentUser`

**Used by:**
- `app/notifications/page.tsx` (public route)
- `app/dashboard/notifications/page.tsx`
- `app/dashboard/seeker/notifications/page.tsx`

---

### `components/views/ApplicationsView.tsx`
Full-featured applications list with search, filter, and multi-view modes (tile, grid, list, extra-large).  
No external utility/auth imports — uses hardcoded mock data.  
**Imports:** `lucide-react` only

**Used by:**
- `app/talents/page.tsx` (public route — used as talent browser)
- `app/dashboard/applications/page.tsx`
- `app/dashboard/seeker/applications/page.tsx`

---

## UI Utility Components (`components/ui/`)

### `components/ui/MagicRings.tsx`
Animated WebGL ring effect built with Three.js. Accepts props for color, opacity, ring count, rotation, etc.  
**Imports:** `three`  
**Used by:** `app/membership/page.tsx`

### `components/ui/Herocarousel.tsx`
Auto-advancing image carousel with colored panel backgrounds and grain texture overlay. Self-contained.  
**Used by:** `app/post/page.tsx`

### `components/ui/SplitText.tsx`
GSAP-powered text split-and-animate component. Uses `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText`, and `@gsap/react`.  
**Used by:** _(available for any page that needs animated text reveals)_

### `components/ui/ScrollStack.tsx`
Scroll-driven stacking card animation using Lenis smooth scroll.  
**Imports:** `lenis`, `types/lenis.d.ts`  
**Used by:** _(available for any page needing a stacked scroll effect)_

---

## Full Dependency Graph (who imports what)

```
app/layout.tsx
  └── components/Header.tsx
        └── utils/auth.ts → types/user.ts
  └── components/Footer.tsx
  └── app/globals.css

app/page.tsx
  └── components/ui/fonts.css
  └── components/ui/theme.css

app/dashboard/layout.tsx
  └── components/DashboardSidebar.tsx
        └── utils/auth.ts → types/user.ts

app/login/page.tsx
  └── utils/auth.ts → types/user.ts

app/signup/page.tsx
  └── utils/auth.ts

app/membership/page.tsx
  └── components/ui/MagicRings.tsx
        └── three

app/post/page.tsx
  └── components/ui/Herocarousel.tsx
  └── utils/storage.ts → types/casting.ts

app/notifications/page.tsx
  └── components/views/NotificationsView.tsx
        └── utils/auth.ts

app/messages/page.tsx
  └── components/views/MessagesView.tsx
        └── utils/auth.ts

app/talents/page.tsx
  └── components/views/ApplicationsView.tsx

app/dashboard/talent/page.tsx
  └── components/DashboardCard.tsx
  └── utils/auth.ts → types/user.ts

app/dashboard/seeker/page.tsx
  └── components/DashboardCard.tsx
  └── utils/auth.ts → types/user.ts

app/dashboard/applications/page.tsx
  └── components/views/ApplicationsView.tsx

app/dashboard/messages/page.tsx
  └── components/views/MessagesView.tsx

app/dashboard/notifications/page.tsx
  └── components/views/NotificationsView.tsx

app/dashboard/portfolio/page.tsx
  └── utils/auth.ts → types/user.ts

app/dashboard/settings/page.tsx
  └── utils/auth.ts → types/user.ts

app/dashboard/seeker/applications/page.tsx
  └── components/views/ApplicationsView.tsx

app/dashboard/seeker/messages/page.tsx
  └── components/views/MessagesView.tsx

app/dashboard/seeker/notifications/page.tsx
  └── components/views/NotificationsView.tsx

app/dashboard/seeker/settings/page.tsx
  └── utils/auth.ts → types/user.ts

app/dashboard/seeker/analytics/page.tsx
  └── components/DashboardCard.tsx

app/dashboard/seeker/company-profile/page.tsx
  └── components/DashboardCard.tsx

components/DashboardLayout.tsx
  └── components/DashboardSidebar.tsx

components/DashboardHeader.tsx
  └── utils/auth.ts → types/user.ts

components/FilterBar.tsx
  └── constants/categories.ts

components/ui/ScrollStack.tsx
  └── lenis  (types/lenis.d.ts)

utils/auth.ts
  └── types/user.ts

utils/storage.ts
  └── types/casting.ts
```

---

## Empty / Placeholder Files

These files exist in the source but currently have no content or are not yet implemented:

| File | Status |
|------|--------|
| `components/Navbar.tsx` | Empty |
| `components/QuickActions.tsx` | Empty |
| `components/Portfolioform.tsx` | Empty |
| `app/portfolios/page.tsx` | Placeholder (renders `<h1>Portfolios</h1>`) |
| `app/explore-talent/page.tsx` | Placeholder (static text, no components) |
| `app/page.module.css` | Empty |
| `app/post/page.module.css` | Empty |

---

## Notes

- **Auth is localStorage-only.** All user sessions (`indcasting_current_user`) and registered users (`indcasting_users`) are stored in the browser. There is no backend API wired up yet.
- **`DashboardCard` is the only truly reusable UI primitive** — everything else is either a full-page view or a single-purpose widget.
- **Three view components** (`MessagesView`, `NotificationsView`, `ApplicationsView`) are each reused in three places: a public route, a talent dashboard route, and a seeker dashboard route.
- **`app/dashboard/page.tsx`** acts purely as a router — it reads the user's role from localStorage and immediately redirects to the correct dashboard. It renders nothing visible.
- **GSAP is loaded via CDN** on `app/page.tsx` rather than as an npm package (except in `components/ui/SplitText.tsx` where it is imported as a module).
