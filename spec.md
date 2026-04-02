# Aura Wellness — 14-Page Digital Wellness Website

## Current State
Blank Caffeine project with React + Vite frontend. No pages, no components, no backend logic needed.
The app only requires a frontend — all state lives in localStorage, no ICP backend calls.

## Requested Changes (Diff)

### Add
- 14 complete HTML pages as static files served from the Vite/Caffeine frontend
- `src/frontend/public/styles.css` — shared CSS (design tokens, nav, footer, global components)
- `src/frontend/public/main.js` — shared JS utilities (cursor, theme toggle, page loader, page transitions, IntersectionObserver animations, footer particles)
- `src/frontend/public/index.js` — Home page JS
- `src/frontend/public/mind.js` — Mind page JS
- `src/frontend/public/body.js` — Body page JS
- `src/frontend/public/sleep.js` — Sleep page JS
- `src/frontend/public/nutrition.js` — Nutrition page JS
- `src/frontend/public/community.js` — Community page JS
- `src/frontend/public/dashboard.js` — Dashboard page JS
- `src/frontend/public/blog.js` — Blog page JS
- `src/frontend/public/consult.js` — Consult page JS
- `src/frontend/public/faq.js` — FAQ page JS
- `src/frontend/public/reviews.js` — Reviews page JS
- `src/frontend/public/login.js` — Login page JS
- `src/frontend/public/newsletter.js` — Newsletter page JS
- `src/frontend/public/admin.js` — Admin page JS
- Static HTML pages 2-14 in `src/frontend/public/`: mind.html, body.html, sleep.html, nutrition.html, community.html, dashboard.html, blog.html, blog-post.html, consult.html, faq.html, reviews.html, login.html, newsletter.html, admin.html
- Home page replaces `src/frontend/index.html` (Vite entry point)
- `src/frontend/src/main.tsx` modified to be a no-op (React mounts nothing so the static HTML works)

### Modify
- `src/frontend/index.html` — Replace with full home page HTML (Aura Wellness index)
- `src/frontend/src/main.tsx` — Make React a no-op so static HTML is not disrupted

### Remove
- `src/frontend/src/App.tsx` — Not needed (remove or empty)
- `src/frontend/src/index.css` — Replaced by public/styles.css

## Implementation Plan

### Architecture Notes
- All 14 HTML files share `<link rel="stylesheet" href="/styles.css">` and `<script src="/main.js">` 
- Page-specific `<script src="/pageX.js">` added at bottom of each page
- GSAP loaded via CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js` and ScrollTrigger
- Google Fonts: Poppins + Inter via `<link>` in every `<head>`
- `src/frontend/index.html` IS the home page — Vite injects a React script but main.tsx is a no-op
- Pages 2-14 go in `src/frontend/public/` — served as `/mind.html`, `/body.html`, etc.

### Design Tokens (CSS custom properties in :root)
```
--c-primary: #1A2E35
--c-accent: #7B68EE
--c-cream: #F5E6C8
--c-success: #2ECC71
--c-dark-bg: #0D1B22
--c-mid: #1E3A45
--c-text: #E8F4F8
--c-muted: #8BA8B5
```
Light theme via `[data-theme="light"]` selector swaps vars.

### Global Components (implemented in styles.css + main.js)
1. **Navbar** — glassmorphism, animated gradient logo, nav links, login pill, theme toggle, hamburger mobile menu, active link sliding underline
2. **Custom cursor** — 20px lavender glowing orb, lerp lag, desktop only
3. **Page loader** — breathing SVG circle + "Aura" text, fades out after load (first visit only via localStorage)
4. **Page transitions** — GSAP fade+slide between pages
5. **Footer** — 4-col grid, animated SVG wave, newsletter mini-form linking to newsletter.html, particles canvas
6. **IntersectionObserver** — `.animate-on-scroll` class triggers entrance animations
7. **prefers-reduced-motion** — all GSAP + CSS animations wrapped
8. **Dark/light toggle** — `localStorage.getItem('theme')`, applied to `document.documentElement.dataset.theme`

### Page 1 — Home (src/frontend/index.html + public/index.js)
- Video hero with autoplay muted loop fallback to aurora canvas animation
- GSAP staggered headline words, CTA buttons, scroll indicator
- Video control bar (frosted glass pill)
- Stats ticker marquee
- Wellness pillars cards (Mind/Body/Sleep) with SVG icons
- Animated counters (IntersectionObserver)
- Featured articles horizontal scroll
- Today's tip (localStorage daily rotation)
- Full-width CTA banner

### Page 2 — Mind (public/mind.html + public/mind.js)
- Neural network canvas background
- Stress meter (input range, red→green gradient)
- Affirmation flip cards (CSS 3D transform)
- 4-7-8 breathing widget (animated circle)
- Quote carousel
- Consult CTA, 3 blog post cards, Review FAB, newsletter bar

### Page 3 — Body (public/body.html + public/body.js)
- SVG human silhouette with clickable zones + tooltips
- Masonry workout grid
- Drag-and-drop planner
- BMI calculator with ring chart
- Consult CTA, 3 blog post cards, Review FAB, newsletter bar

### Page 4 — Sleep (public/sleep.html + public/sleep.js)
- Starfield canvas background
- Moon phase SVG tracker
- Sleep cycle line chart (GSAP on scroll)
- Interactive hygiene checklist (localStorage)
- Ambient sound player UI (animated waveform)
- Consult CTA, 3 blog cards, Review FAB, newsletter bar

### Page 5 — Nutrition (public/nutrition.html + public/nutrition.js)
- Animated food wheel SVG
- Macro calculator with ring charts
- Recipe card grid with heart animation
- Water intake tracker
- Consult CTA, 3 blog cards, Review FAB, newsletter bar

### Page 6 — Community (public/community.html + public/community.js)
- Live member pulse grid
- Challenge cards with countdown
- Activity ticker
- Leaderboard bar chart (GSAP)
- Community feed with like/comment/share
- Review FAB, newsletter bar

### Page 7 — Dashboard (public/dashboard.html + public/dashboard.js)
- Wellness score ring chart
- Metric sparkline cards
- Activity heatmap
- Radial goal rings
- Confetti on milestone
- Mood check-in widget (localStorage)
- Review FAB, newsletter bar

### Page 8 — Blog (public/blog.html + blog-post.html + public/blog.js)
- Gradient hero with search + live filter
- Category pill nav with sliding indicator
- Featured post card
- 9 pre-populated masonry cards
- Sticky sidebar
- blog-post.html: parallax hero, reading progress bar, drop cap, author bio, comments UI, share
- Review FAB, newsletter bar

### Page 9 — Consult (public/consult.html + public/consult.js)
- Split hero with SVG doctor illustration
- Specialty filter pills
- 9 doctor cards with pulse dot, ratings, Book Now
- 3-step booking modal with confetti on confirm
- How it works timeline
- 3 testimonials, FAQ accordion
- Review FAB, newsletter bar

### Page 10 — FAQ (public/faq.html + public/faq.js)
- Animated question mark SVG hero with live search
- 5 category tabs, 10 questions each (50 total) as accordions
- Was this helpful thumbs up/down
- 3 contact option cards
- Popular FAQs row
- Review FAB, newsletter bar

### Page 11 — Reviews (public/reviews.html + public/reviews.js)
- 4.8 rating hero with confetti canvas
- Animated rating breakdown bars
- Category ratings scroll
- Filter bar
- 12 review cards with expand + helpful counter
- Feedback form with star rating + drag-drop photo
- Video testimonial lightbox
- Trust badges
- Review FAB, newsletter bar

### Page 12 — Login (public/login.html + public/login.js)
- Split: particle network left panel, auth form right
- Login/Signup tab switcher
- Login: floating labels, password toggle, remember me, social login
- Signup: name, email, password strength, DOB, gender, terms
- Forgot password inline transition
- Progress bar

### Page 13 — Newsletter (public/newsletter.html + public/newsletter.js)
- Morphing blob hero, preferences tiles, frequency pills
- Confetti + checkmark on submit
- What You'll Receive grid
- Sample newsletter mockup
- Social proof row

### Page 14 — Admin (public/admin.html + public/admin.js)
- Password gate: "aura2024"
- Subscriber table (localStorage)
- Add/remove subscriber
- Export CSV
- Stats cards + growth chart (canvas)
- Broadcast composer
