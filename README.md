# IndCasting - India's Premium Casting Platform

IndCasting is a modern, responsive web application built with **Next.js**, **React**, and **TypeScript**. It serves as a premium networking platform connecting actors, models, dancers, and creators with casting directors and production houses.

## 🚀 Recent Updates & Features (July 2026)

### 🎨 Premium Dashboard UI Redesign
- **Unified Aesthetic**: Completely overhauled the dashboard layout to align perfectly with the premium, high-end feel of the homepage.
- **Glassmorphism**: Implemented a sleek, translucent dashboard sidebar and top header utilizing backdrop-blur effects.
- **Signature Styling**: Added the signature gold glowing grid background beneath all dashboard elements for a deeply immersive UI.
- **Enhanced Typography**: Upgraded text sizing, weights, and component rounded corners across all metric cards to convey a state-of-the-art aesthetic.

### 🌓 Perfected Light & Dark Modes
- Fixed legacy CSS rules that were causing headers and texts to remain dark and invisible when Light Mode was active.
- Ensured seamless, automatic color adaptation (`var(--dash-text-main)`) for all dashboard titles, including **Messages** and **Notifications**.

### ⚙️ Interactive & Dynamic User State
- **Settings Integration**: Fully wired up the `/dashboard/settings` page. Users can now successfully edit and save their profile information (Name, Email, Bio), complete with a visual success confirmation.
- **Dynamic Session Rendering**: Replaced hardcoded dummy data. The main Talent Dashboard greeting (`Welcome back, [Name]`) and the Portfolio page now actively fetch and display the real logged-in user's data from `localStorage`/session.

### 📱 Applications Dashboard: Multi-View Modes
- Refactored the Applications view into a dynamic data array.
- Built an interactive view-mode toggle group featuring four unique layouts:
  1. **Tile (Default)**: A standard, responsive 3-column grid.
  2. **Extra Large**: A bold, high-visibility single-column layout with massive icons.
  3. **Details**: A highly compressed, horizontal list layout for rapid scanning.
  4. **Small Icons**: A dense grid minimizing padding to maximize data density.
- Integrated `lucide-react` icons (Grid, Maximize, LayoutList, LayoutGrid) to serve as elegant UI toggles for these modes.

## 🔌 Architecture & Data Connections
- **Authentication & Sessions (`utils/auth.ts`)**: 
  - Manages all user data and login sessions securely. 
  - Simulates a backend connection by actively interfacing with `localStorage` and `sessionStorage` (saving preferences across sessions).
  - Provides the `getCurrentUser()` and `updateUser()` hooks that power all the personalized dashboard areas (Talent page, Settings, Portfolio).
- **Component Architecture**: 
  - Modular Next.js Page structures (`src/app/dashboard/...`) connected to reusable visual components (`src/components/...`).
  - E.g., `ApplicationsView.tsx`, `MessagesView.tsx`, and `NotificationsView.tsx` are fully isolated, self-contained view modules that plug dynamically into their respective pages.
- **Global Design System (`globals.css`)**: 
  - Uses CSS custom properties (variables) as a single source of truth for themes. 
  - Allows instant, synchronized shifting between Light and Dark themes (`.light` and `.dark` html classes) natively across every single component.

## 💻 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: React 19
- **Styling**: Vanilla CSS (CSS Variables, Grid, Flexbox, Glassmorphism)
- **Icons**: `lucide-react`
- **Animations**: GSAP
- **State/Auth**: LocalStorage Session Simulation (`utils/auth.ts`)

## 🛠️ Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
