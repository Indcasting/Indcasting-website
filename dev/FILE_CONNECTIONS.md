# IndCasting Website - File Connections Documentation

This document explains the structure and connections between files in the IndCasting frontend application.

## Core Architecture

The application follows a Next.js 13+ App Router structure with:
- Client-side state management (localStorage, sessionStorage)
- Custom utility modules for auth, storage, caching
- Component-based UI with reusable components
- TypeScript interfaces for data modeling

## File Connection Map

### 1. Authentication System (`src/utils/auth.ts`)
**Purpose**: Handles user authentication, password hashing, and session management
**Connections**:
- Used by: `src/app/login/page.tsx`, `src/app/signup/page.tsx`, `src/components/Header.tsx`, `src/app/dashboard/seeker/page.tsx`
- Imports: `src/types/user.ts`, `src/utils/cache.ts`
- Exports: `registerUser`, `loginUser`, `getCurrentUser`, `logoutUser`, `updateUser`

### 2. Storage System (`src/utils/storage.ts`)
**Purpose**: Manages casting posts data in localStorage with caching
**Connections**:
- Used by: Casting-related components and pages
- Imports: `src/types/casting.ts`, `src/utils/cache.ts`
- Exports: `getPosts`, `savePosts`, and internal helper functions

### 3. Portfolio Storage (`src/utils/portfolioStorage.ts`)
**Purpose**: Manages portfolio data in localStorage with caching
**Connections**:
- Used by: Portfolio-related components and pages
- Imports: `src/types/portfolio.ts`, `src/utils/cache.ts`
- Exports: `getPortfolioByUserId`, `getPortfolioBySlug`, `saveUserPortfolio`, `generateSlug`

### 4. Audition Data (`src/utils/auditionData.ts`)
**Purpose**: Manages audition scheduling and status tracking
**Connections**:
- Used by: Dashboard components for seekers and talents
- Imports: `src/utils/cache.ts`
- Exports: `getAuditionsForUser`, `updateAuditionStatus`, `rescheduleAudition`

### 5. Cache Utility (`src/utils/cache.ts`)
**Purpose**: Provides client-side caching with TTL support
**Connections**:
- Used by: All storage modules (`auth.ts`, `storage.ts`, `portfolioStorage.ts`, `auditionData.ts`)
- No imports (self-contained utility)
- Exports: `set`, `get`, `remove`, `clear` functions

### 6. Security Utilities (`src/utils/security.ts`)
**Purpose**: Provides security validation functions
**Connections**:
- Used by: `src/app/login/page.tsx`, `src/app/signup/page.tsx`
- No imports (self-contained utility)
- Exports: `validateInternalPath` function

### 7. Type Definitions
**Purpose**: Define TypeScript interfaces for data structures
**Files**:
- `src/types/user.ts` - UserProfile interface
- `src/types/casting.ts` - CastingPost interface
- `src/types/portfolio.ts` - PortfolioData interface
**Connections**:
- Used by: All utility modules and components that handle corresponding data

### 8. Layout Components
**Purpose**: Provide consistent layout structure
**Files**:
- `src/app/layout.tsx` - Root layout with Header/Footer
- `src/components/Header.tsx` - Application header with navigation
- `src/components/Footer.tsx` - Application footer
**Connections**:
- `layout.tsx` imports and uses `Header` and `Footer`
- `Header.tsx` imports: `getCurrentUser`, `logoutUser` from `auth.ts`, navigation links, theme toggle
- `Header.tsx` uses: Lucide icons, GSAP for animations

### 9. Page Components
**Purpose**: Define application routes and views
**Public Pages**:
- `src/app/page.tsx` - Home page (landing page)
- `src/app/login/page.tsx` - Login page
- `src/app/signup/page.tsx` - Signup page
- `src/app/not-found.tsx` - 404 page
- `src/app/privacy/page.tsx` - Privacy policy
- `src/app/terms/page.tsx` - Terms of service

**Dashboard Pages** (Protected Routes):
- `src/app/dashboard/page.tsx` - Redirects to role-specific dashboard
- `srcapp/dashboard/layout.tsx` - Dashboard layout
- `src/app/dashboard/seeker/page.tsx` - Seeker dashboard
- `src/app/dashboard/talent/page.tsx` - Talent dashboard
- `src/app/dashboard/applications/page.tsx` - Applications view
- `src/app/dashboard/messages/page.tsx` - Messages view
- `src/app/dashboard/notifications/page.tsx` - Notifications view
- `src/app/dashboard/portfolio/page.tsx` - Portfolio management
- `src/app/dashboard/seeker/casting-calls/page.tsx` - Casting calls management
- `src/app/dashboard/seeker/auditions/page.tsx` - Audition management
- `src/app/dashboard/seeker/settings/page.tsx` - User settings
- `src/app/dashboard/seeker/shortlisted/page.tsx` - Shortlisted candidates
- `src/app/dashboard/seeker/analytics/page.tsx` - Analytics dashboard

**Public Content Pages**:
- `src/app/portfolio/[username]/page.tsx` - Public portfolio viewer
- `src/app/portfolio/builder/page.tsx` - Portfolio builder/editor
- `src/app/portfolios/page.tsx` - Portfolio directory/browse
- `src/app/post/page.tsx` - Casting posts listing
- `src/app/explore-talent/page.tsx` - Talent discovery
- `src/app/talents/[slug]/page.tsx` - Individual talent profile
- `src/app/talents/page.tsx` - Talents directory/browse
- `src/app/create-portfolio/page.tsx` - Create new portfolio
- `src/app/membership/page.tsx` - Membership information

### 10. UI Components
**Purpose**: Reusable UI elements
**Location**: `src/components/`
**Categories**:
- **Authentication**: `AuthCard.tsx`, `AuthButton.tsx`, `AuthInput.tsx`, `AuthLayout.tsx`, `AuthDivider.tsx`, `SocialLoginButtons.tsx`, `AuthHeroSection.tsx`
- **Dashboard**: `DashboardCard.tsx`, `DashboardHeader.tsx`, `DashboardLayout.tsx`, `DashboardSidebar.tsx`, `SpotlightCard.tsx`
- **Portfolio Forms**: `BasicInfoForm.tsx`, `CertificationsForm.tsx`, `EducationForm.tsx`, `ExperienceForm.tsx`, `MiscForm.tsx`, `ProjectsForm.tsx`, `SkillsForm.tsx`
- **Views**: `ApplicationsView.tsx`, `MessagesView.tsx`, `NotificationsView.tsx`
- **Modals**: `DayScheduleModal.tsx`
- **Layout**: `Header.tsx`, `Footer.tsx`
- **UI Primitives**: `ElectricBorder.tsx`, `Herocarousel.tsx`, `MagicRings.tsx`, `NeobrutalistCard.tsx`, `SplitText.tsx`

### 11. Constants
**Purpose**: Application-wide constants
**Files**:
- `src/constants/categories.ts` - Talent category definitions

## Data Flow Summary

1. **Authentication Flow**:
   - User enters credentials in `login/page.tsx` or `signup/page.tsx`
   - Form data sent to `auth.ts` functions (`loginUser`, `registerUser`)
   - `auth.ts` validates/creates user, hashes password, stores in localStorage
   - `auth.ts` returns user object to page component
   - Page component redirects to appropriate dashboard via `useRouter`
   - `Header.tsx` checks `getCurrentUser()` to show/hide auth UI

2. **Data Storage Flow**:
   - Components call storage utility functions (e.g., `getPortfolios()`)
   - Storage functions check cache first via `cache.ts`
   - If cache miss, read from localStorage
   - Data returned to component for rendering
   - When data updated, storage functions write to localStorage and clear cache

3. **Authorization Flow**:
   - Pages check user role via `getCurrentUser().role`
   - Dashboard pages redirect based on role (`talent` vs `seeker`)
   - Seeker sees seeker dashboard, talent sees talent dashboard
   - Components conditionally render based on user role

## Key Connection Patterns

1. **Utility Import Pattern**:
   ```typescript
   import { getCurrentUser, logoutUser } from "@/utils/auth";
   import { cache } from "./cache";
   import { getPosts } from "@/utils/storage";
   ```

2. **Component Import Pattern**:
   ```typescript
   import Header from "@/components/Header";
   import Footer from "@/components/Footer";
   import DashboardCard from "@/components/DashboardCard";
   import SpotlightCard from "@/components/SpotlightCard";
   ```

3. **Type Import Pattern**:
   ```typescript
   import type { UserProfile } from "@/types/user";
   import type { CastingPost } from "@/types/casting";
   import type { PortfolioData } from "@/types/portfolio";
   ```

## Security Notes (from Audit Report)

The current implementation has several security limitations documented in `dev/security-audit-report.md`:

1. **Password Storage**: Passwords are hashed but stored client-side (localStorage)
2. **Authentication**: Auth state managed client-side (no HttpOnly cookies)
3. **Authorization**: Role-based access controlled client-side (bypassable)
4. **Data Isolation**: All users share same localStorage keys (no ownership enforcement)
5. **XSS Vulnerabilities**: Unvalidated user input in hrefs and CSS url() functions
6. **Dependency Issues**: Outdated Next.js version with known vulnerabilities

## Recommended Connection Improvements

For a production implementation, consider:
1. Moving authentication to backend (Next.js API routes or external auth service)
2. Using HttpOnly, Secure, SameSite cookies for session management
3. Implementing server-side authorization checks
4. Adding proper input validation and sanitization
5. Updating dependencies to address security vulnerabilities
6. Implementing CSP and security headers in `next.config.ts`

---
*Documentation generated for developer reference to understand file connections and data flow in the IndCasting application.*