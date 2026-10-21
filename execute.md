# FinPulse — Execution Plan

Execution plan for `prd1.md` (FinPulse Micro-Lending & SME Payment Portal).
Project root: `finpulse-portal/` (static HTML/CSS/JS, no backend, no build step).

Status legend: `[ ]` pending · `[~]` in progress · `[x]` done

---

## 0. Non-negotiable constraints

| Constraint | Implementation decision |
|---|---|
| No framework, no build, no npm, no backend | Plain HTML + CSS + ES modules, served over a local HTTP server |
| All CSS in `public/css/style.css` | No `style=""`, no `<style>`, no JS-written inline styles (class toggles only) |
| All data fictional | Every balance/loan/testimonial/dashboard figure labelled illustrative |
| WCAG 2.2 AAA target | Semantic landmarks, skip link, focus states, keyboard-operable widgets, no colour-only status |
| Local assets only | Hand-authored SVG (branding, hero, illustrations, avatars, icon sprite) — no external image URLs |
| Critical content in HTML | Shared chrome renders progressively with an explicit fallback; page content and cards are static HTML |

---

## 1. Phase 1 — Architecture

### 1.1 Folder structure (final)

```text
finpulse-portal/
├── index.html                      # entry point → redirects to the home page
├── README.md
├── public/
│   ├── css/style.css               # the only stylesheet
│   ├── js/                         # 10 ES modules (see 1.4)
│   └── assets/
│       ├── icons/sprite.svg        # single SVG icon sprite (<use href="…#icon-x">)
│       └── images/{branding,hero,services,businesses,team,testimonials,illustrations}/
└── resources/views/
    ├── frontend/                   # 18 pages
    └── components/                 # 12 fragments
```

### 1.2 Path conventions (pages live two levels below root)

| Target | Reference from `resources/views/frontend/*.html` |
|---|---|
| Stylesheet | `../../../public/css/style.css` |
| Scripts | `../../../public/js/main.js` |
| Images | `../../../public/assets/images/…` |
| Icon sprite | `../../../public/assets/icons/sprite.svg#icon-x` |
| Sibling pages | `services.html` (same directory) |
| Entry page | `../../../index.html` |

Components are injected **into the page DOM**, so every link inside a fragment is authored relative to the *page* (e.g. `services.html`), not to the fragment file.

### 1.3 Page ↔ navigation map

| Page | Nav slot | Notes |
|---|---|---|
| `home.html` | Home | Full homepage (20 sections per PRD §6.A) |
| `services.html` | Services (dropdown parent) | 5 core services + sub-nav |
| `digital-payments.html` | Services ▸ | |
| `microfinance.html` | Services ▸ | |
| `sme-loans.html` | Services ▸ | Static loan cards + filter |
| `p2p-lending.html` | Services ▸ | Risk disclosure heavy |
| `financial-literacy.html` | Services ▸ / footer | |
| `loan-calculator.html` | Calculator | Working calculator |
| `how-it-works.html` | How it works | 4 journeys, tabs-free step cards |
| `business-solutions.html` | Solutions | Static categories + filter/search |
| `dashboard-demo.html` | Dashboard | Static dashboard, filters, tabs |
| `about.html` | About | |
| `testimonials.html` | footer | Static testimonials, labelled sample |
| `faq.html` | footer | Static FAQ + category filter |
| `contact.html` | CTA | Validated demo form |
| `privacy-policy.html` | footer (legal) | Draft disclaimer |
| `terms-of-service.html` | footer (legal) | Draft disclaimer |
| `404.html` | — | Recovery links |

Header primary nav (7 items + CTA): Home · Services ▾ · Solutions · Calculator · How it works · Dashboard · About → CTA "Contact us".
Services ▾ disclosure panel: All services · Digital payments · Microfinance · SME loans · P2P lending · Financial literacy.
Footer sitemap carries **all** pages, grouped (Services / Company / Resources / Legal).

### 1.4 JavaScript module responsibilities

| Module | Responsibility |
|---|---|
| `main.js` | Boot: load components → then init feature modules once, in order; expose nothing globally |
| `components.js` | Fragment loader (`data-component`), token/prop binding, error fallbacks, cached fetch |
| `navigation.js` | Mobile drawer (aria-expanded, ESC, focus return, scroll lock), Services disclosure menu, current-page marking |
| `carousel.js` | Generic `[data-carousel]`: prev/next/dots, keyboard, `aria-live` status, reduced-motion-aware |
| `filters.js` | Generic `[data-filter-group]`: chip groups + text search over `[data-filter-item]`, live result count |
| `accordion.js` | `[data-accordion]` button/panel pairs: roving arrow keys, Home/End, `aria-expanded`/`aria-controls`, single-open option |
| `calculator.js` | Loan math, validation, BDT formatting, schedule illustration |
| `tabs.js` | `[data-tabs]` roving tablist, `aria-selected`, panel switching |
| `forms.js` | Client-side validation, inline errors, error summary, `aria-live` demo success state |
| `dashboard.js` | Transaction filter + counts, chart bar scaling, tabs hand-off |

### 1.5 Component contracts (`resources/views/components/`)

All components are HTML fragments fetched once and cached. Props come from `data-*` attributes on the mount element; text props are bound with `textContent`/attributes, never string-concatenated into `innerHTML`.

| Fragment | Mount | Props |
|---|---|---|
| `header.html` | `data-component="header"` | `data-active="<page-key>"` |
| `announcement-bar.html` | `data-component="announcement-bar"` | — |
| `footer.html` | `data-component="footer"` | — |
| `breadcrumbs.html` | `data-component="breadcrumbs"` | `data-trail="Home:home.html\|Services:services.html\|Digital payments"` |
| `section-heading.html` | `data-component="section-heading"` | `data-eyebrow`, `data-title`, `data-lead`, `data-level`, `data-align` |
| `button.html` | `data-component="button"` | `data-label`, `data-href`, `data-variant`, `data-size` |
| `statistics.html` | `data-component="statistics"` | `data-note` |
| `trust-section.html` | `data-component="trust-section"` | — |
| `how-it-works.html` | `data-component="how-it-works"` | — |
| `cta-section.html` | `data-component="cta-section"` | `data-title`, `data-text`, `data-primary-label`, `data-primary-href`, `data-secondary-label`, `data-secondary-href` |
| `contact-information.html` | `data-component="contact-information"` | — |
| `dashboard-summary.html` | `data-component="dashboard-summary"` | — |

Card grids (services, loan products, payment services, business categories, testimonials and FAQs) are authored directly in their pages. Repeat a card's markup inside the page's existing grid/accordion wrapper so filters and accordions keep working:

```html
<div class="grid grid--3" data-filter-list>
    <article class="loan-card" data-filter-item data-categories="working-capital">…</article>
</div>
```

### 1.6 Content ownership (no duplicated datasets)

Card collections live in exactly one page each: `services.html` (service cards), `sme-loans.html` (loan products), `digital-payments.html` (payment services), `business-solutions.html` (business categories), `testimonials.html` (quotes) and `faq.html` (questions). The homepage keeps a *condensed, differently-worded* overview of each area and reuses only the six sample testimonials in its carousel. When editing shared wording, update the owning page first, then check the homepage summaries that reference it.

---

## 2. Phase 2 — Design system (`public/css/style.css`)

Labeled sections in this order:

1. `:root` tokens (PRD palette + derived accessible text tokens, fluid type scale, spacing, radii, shadows, motion, z-index)
2. Reset & base elements
3. Accessibility primitives (skip link, `:focus-visible`, `.sr-only`)
4. Layout (container, section, grid, cluster, stack)
5. Typography helpers
6. Buttons & links
7. Badges / status chips (always paired with text)
8. Header, drawer, services disclosure
9. Announcement bar, breadcrumbs
10. Hero
11. Cards (service, loan, payment, testimonial, stat, feature)
12. Trust, stats band, steps, use-case panels
13. Accordion, tabs, chips/filters, carousel
14. Forms
15. Tables & data display
16. Dashboard (KPI, CSS bar chart, transactions, repayment list)
17. Calculator
18. Prose / legal
19. CTA band, 404
20. Footer
21. Responsive breakpoints (mobile-first: 640 / 900 / 1100) + print + reduced motion

Contrast rules (measured, documented in README): body text `#17252c` ≈ 15:1, muted `#47575f` ≈ 7.5:1, links `#055f45` / `#1b4f85` ≥ 7:1, white on primary `#123b4a` ≈ 12:1. Secondary/accent fills are used for large text and UI only.

---

## 3. Phase 3 — Homepage (`home.html`)

Sections in PRD order: announcement → header → hero (LCP SVG, not lazy) → trust → statistics (demo-labelled) → services overview → digital payments → microfinance → SME loans → P2P concept → how it works → business categories → calculator preview → dashboard preview → security/principles → testimonials carousel → FAQ accordion → CTA → footer.

---

## 4. Phase 4 — Remaining pages

18 pages total, each with unique `<title>`, meta description, canonical placeholder, OG/Twitter tags, breadcrumbs (except home/404) and consistent `main`/`h1`.

## 5. Phase 5 — Functionality

All 10 modules implemented, initialized once from `main.js`, with failure-tolerant loading and keyboard support.

## 6. Phase 6 — QA

- [x] Serve locally (`php -S` or `python -m http.server`) and load all 19 documents in a real browser.
- [x] Confirm clean normal page loads, no missing local responses, and no horizontal overflow at 320/375/768/1024/1440.
- [x] Verify calculator against hand-computed values (including 0% interest).
- [x] Verify keyboard flows: skip link, drawer, disclosure, accordion, tabs, carousel, filters, form.
- [x] Verify form validation states and demo submission message.
- [x] Verify component failure fallbacks with simulated fetch failures.
- [x] Cross-check internal links and local assets resolve.

## 7. Deliverables

Site, `README.md` (setup, interactions, a11y/responsive testing notes, limitations), this plan.

---

## 8. Task checklist

### Phase 1 — Architecture
- [x] Create folder structure
- [x] Author component contracts + loader

### Phase 2 — Design system
- [x] CSS tokens, base, layout, typography
- [x] Header/footer/nav styles
- [x] Cards, forms, tables, dashboard, calculator, widgets
- [x] Responsive + reduced motion + print

### Phase 3 — Components & assets
- [x] 17 component fragments
- [x] SVG sprite + branding/hero/illustration/avatar assets

### Phase 4 — Data & scripts
- [x] Static card collections authored in HTML
- [x] 10 JS modules

### Phase 5 — Pages
- [x] `index.html`, `home.html`
- [x] `services`, `digital-payments`, `microfinance`, `sme-loans`, `p2p-lending`
- [x] `loan-calculator`, `how-it-works`, `business-solutions`, `financial-literacy`
- [x] `dashboard-demo`, `testimonials`, `faq`, `contact`
- [x] `about`, `privacy-policy`, `terms-of-service`, `404`
- [x] `README.md`

### Phase 6 — QA
- [x] Browser smoke test of all 19 documents
- [x] Console/network clean
- [x] Responsive overflow checks
- [x] Calculator + interaction verification
- [x] Update checklist + limitations
