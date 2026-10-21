# Project Prompt: FinPulse Micro-Lending & SME Payment Portal

## 1. Role and Project Objective

Act as a **Senior Frontend Developer, UI/UX Designer, Accessibility Specialist, and Frontend Architect**.

Design and develop a complete, polished, responsive, and professional static demo website named **FinPulse Micro-Lending & SME Payment Portal**.

This website represents a fictional financial technology platform serving Bangladesh and other emerging markets. It should demonstrate how a modern fintech company can bring together digital payments, microfinance, SME lending, and financial inclusion through a trustworthy digital experience.

The result must be a complete, functional, multi-page demo website, not merely a landing page or a collection of disconnected UI mockups.

### Technology stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Static JSON files for structured demo data where appropriate

Do not use Laravel, PHP, React, Vue, Angular, Node.js, NPM, databases, backend services, or a build process.

All data must be static. There must be no real financial transactions, actual loan disbursements, payment gateway connections, or production customer-data processing.

## 2. Business Profile

**Brand name:** FinPulse

**Project concept:** FinPulse Micro-Lending & SME Payment Portal

**Industry:** Banking, Fintech & Microfinance

**Market scope:** Bangladesh and Emerging Markets

**Primary niches and verticals:**

1. Mobile Financial Services (MFS)
2. Payment Gateways
3. Microfinance Institutions (MFI)
4. Peer-to-Peer Lending
5. SME Loan Advisory

**Target audiences:**

- Small and medium-sized business owners
- Micro and small entrepreneurs
- Retailers and local merchants
- Freelancers and service providers
- Microfinance customers
- Potential individual lenders in a hypothetical lending marketplace
- Financial institutions and fintech partners

**Brand positioning:** A digital financial services platform designed to help small businesses access financing, manage payments, and understand their financial activity.

**Suggested tagline:** "Smarter Payments. Accessible Finance. Stronger Businesses."

**Supporting message:** "Simplify business payments, explore financing opportunities, and move your business forward with digital-first financial services."

**Brand personality:** Trustworthy, transparent, accessible, secure, inclusive, modern, and business-focused.

## 3. Design Direction

Create a simple, modern, premium fintech interface inspired by professional digital banking platforms and SME financial management dashboards.

The design should communicate financial trust and clarity rather than looking like an ordinary ecommerce website.

### Visual principles

- Minimal, uncluttered layouts
- Clear typography and strong content hierarchy
- Consistent spacing and alignment
- Professional financial dashboard visuals
- Meaningful whitespace
- Restrained use of gradients and shadows
- Reusable buttons, forms, badges, cards, and section layouts
- Clear primary and secondary calls to action
- Responsive navigation and layouts
- Accessible interactive states
- Consistent iconography

### Suggested brand palette

Use CSS custom properties to define and manage the palette.

- Primary: deep navy or dark teal
- Secondary: financial green
- Accent: restrained blue
- Background: white and light neutral gray
- Main text: dark charcoal
- Supporting text: accessible slate
- Borders: subtle neutral tones
- Error, warning, and success colors: clearly distinguishable and contrast-checked

Do not communicate financial status using color alone. Every important status must also have descriptive text or an accessible icon label.

## 4. Mandatory Folder Structure

Use the following structure as the foundation. Add a file only when it has a clear purpose.

```text
finpulse-portal/
│
├── index.html
├── README.md
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── branding/
│   │   │   ├── hero/
│   │   │   ├── services/
│   │   │   ├── businesses/
│   │   │   ├── team/
│   │   │   ├── testimonials/
│   │   │   └── illustrations/
│   │   │
│   │   └── icons/
│   │
│   └── js/
│       ├── main.js
│       ├── components.js
│       ├── navigation.js
│       ├── carousel.js
│       ├── filters.js
│       ├── accordion.js
│       ├── calculator.js
│       ├── tabs.js
│       ├── forms.js
│       └── dashboard.js
│
├── jsonData/
│   ├── services.json
│   ├── loan-products.json
│   ├── payment-services.json
│   ├── business-categories.json
│   ├── testimonials.json
│   └── faqs.json
│
└── resources/
    └── views/
        ├── frontend/
        │   ├── home.html
        │   ├── about.html
        │   ├── services.html
        │   ├── digital-payments.html
        │   ├── microfinance.html
        │   ├── sme-loans.html
        │   ├── p2p-lending.html
        │   ├── loan-calculator.html
        │   ├── how-it-works.html
        │   ├── business-solutions.html
        │   ├── financial-literacy.html
        │   ├── dashboard-demo.html
        │   ├── testimonials.html
        │   ├── faq.html
        │   ├── contact.html
        │   ├── privacy-policy.html
        │   ├── terms-of-service.html
        │   └── 404.html
        │
        └── components/
            ├── header.html
            ├── footer.html
            ├── announcement-bar.html
            ├── breadcrumbs.html
            ├── section-heading.html
            ├── button.html
            ├── service-card.html
            ├── loan-product-card.html
            ├── payment-service-card.html
            ├── testimonial-card.html
            ├── statistics.html
            ├── trust-section.html
            ├── how-it-works.html
            ├── cta-section.html
            ├── faq-item.html
            ├── dashboard-summary.html
            └── contact-information.html
```

The JavaScript and JSON files listed above are organizational suggestions. Do not create unnecessary files or introduce abstractions that add complexity without improving the implementation.

### Static website architecture

This is a plain HTML, CSS, and JavaScript project.

- `index.html` is the main entry point.
- `resources/views/frontend/` contains individual page HTML files.
- `resources/views/components/` contains reusable HTML fragments.
- `public/css/style.css` contains every CSS rule.
- `public/js/` contains functionality-only JavaScript.
- `public/assets/` contains local images and icons.
- `jsonData/` contains static JSON datasets for repeated content where appropriate.

Browsers cannot directly include external HTML fragments or render JSON files into page content without a loading mechanism.

Use a lightweight, reusable JavaScript component loader for shared HTML fragments. Use `fetch()` for JSON only when a section genuinely benefits from data-driven rendering.

Serve the project through a simple local HTTP server. Do not require a backend or build step.

Keep critical page headings, introductions, navigation, and primary content in HTML wherever practical.

## 5. CSS Architecture — Strict Rules

All CSS must be written exclusively in:

`public/css/style.css`

**Inline CSS is strictly prohibited.**

Do not use:

- `style=""` attributes
- Embedded `<style>` blocks
- JavaScript-generated inline styling
- Duplicate page-specific styles scattered across HTML files

Use CSS variables, reusable component classes, and a consistent design system.

### Required `:root` foundation

```css
:root {
    /* Brand colors */
    --color-primary: #123b4a;
    --color-primary-hover: #0b2b37;
    --color-secondary: #087f5b;
    --color-accent: #2563a6;

    /* Surface colors */
    --color-background: #ffffff;
    --color-surface: #f4f7f8;
    --color-surface-raised: #ffffff;
    --color-border: #d5dfe3;

    /* Typography */
    --color-text: #17252c;
    --color-text-muted: #4b5d65;
    --font-family-base: Arial, Helvetica, sans-serif;
    --font-size-base: 1rem;
    --line-height-base: 1.6;

    /* Layout */
    --container-width: 1200px;
    --container-gutter: 1.25rem;

    /* Spacing */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;
    --space-16: 4rem;

    /* Borders */
    --radius-sm: 0.375rem;
    --radius-md: 0.75rem;
    --radius-lg: 1rem;
    --radius-pill: 999px;

    /* Shadows and motion */
    --shadow-card: 0 8px 28px rgb(18 59 74 / 8%);
    --transition-fast: 180ms ease;
}
```

These values are starting points. Refine them after checking contrast and visual consistency.

### CSS implementation requirements

1. Use mobile-first responsive design.
2. Organize CSS into labeled sections.
3. Use semantic, reusable class names.
4. Use Flexbox and Grid appropriately.
5. Use fluid typography where useful.
6. Keep breakpoints consistent.
7. Avoid unnecessary specificity and `!important`.
8. Use reusable container, grid, button, form, card, and spacing patterns.
9. Include visible keyboard-focus states.
10. Respect reduced-motion preferences.
11. Use logical properties where practical.
12. Avoid repeated declarations and unnecessary overrides.

## 6. Website Pages and Required Sections

### A. Home Page

Build a complete homepage in the following order.

1. Optional announcement bar for a demo promotion or financial-literacy message.
2. Responsive header with brand logo, navigation, and primary CTA.
3. Hero section with a strong fintech value proposition, supporting text, and clear CTA buttons.
4. Hero illustration or financial dashboard preview.
5. Trust and transparency section.
6. Key platform statistics, clearly marked as illustrative demo data.
7. Core financial services overview.
8. Digital payments and merchant collections section.
9. Microfinance and accessible financing section.
10. SME loan solutions section.
11. Peer-to-peer lending marketplace concept section.
12. How FinPulse works.
13. SME use cases and supported business categories.
14. Interactive loan repayment calculator preview.
15. Financial dashboard preview.
16. Security, privacy, and responsible-finance principles.
17. Testimonials containing fictional demo testimonials only.
18. Frequently asked questions.
19. Final conversion-focused CTA.
20. Footer with site navigation, contact placeholders, and legal links.

Keep the homepage easy to scan. Use clear section priorities rather than giving every feature the same visual weight.

### B. About Page

Include:

- Brand introduction
- Mission and vision
- Financial inclusion goals
- Core values
- Target markets
- Approach to responsible lending
- Technology and service principles
- CTA

Do not claim that the fictional platform is a licensed bank, regulated lender, or approved payment provider.

### C. Services Page

Show the five core service categories:

1. Mobile Financial Services
2. Payment Gateway and Merchant Payments
3. Microfinance Solutions
4. Peer-to-Peer Lending Marketplace
5. SME Loan Advisory

Each service card should include an icon or image, title, concise description, benefits, and an appropriate navigation link.

### D. Digital Payments Page

Include:

- Digital payment overview
- Merchant payment acceptance
- QR payment concept
- Payment collection workflows
- Transaction history interface
- Merchant settlement overview
- Payment reconciliation concept
- Payment status examples
- Supported use cases
- FAQ and CTA

All transaction data and payment interfaces must be simulated. No actual payment should be processed.

### E. Microfinance Page

Include:

- Microfinance service overview
- Target customer groups
- Small-business financing scenarios
- Repayment schedule illustration
- Application process
- Responsible borrowing guidance
- Transparency and affordability principles
- Frequently asked questions

Do not promise guaranteed loans or claim eligibility for real financial products.

### F. SME Loans Page

Include:

- SME financing overview
- Sample loan product cards
- Eligibility criteria for fictional demo products
- Illustrative loan amounts and terms
- Repayment frequency options
- Required-document checklist
- Application journey
- Responsible lending guidance
- CTA

Make clear that loan terms and eligibility examples are for demonstration only.

### G. P2P Lending Page

Present a hypothetical peer-to-peer lending marketplace.

Include:

- Marketplace overview
- Borrower and lender journeys
- Example funding opportunities
- Funding progress indicators
- Risk disclosure
- Lending-risk explanation
- Diversification and default-risk information
- Marketplace workflow
- FAQ

Clearly disclose that displayed opportunities, returns, funding progress, and borrower profiles are fictional.

Never guarantee investment returns or imply that a demo investment is a real financial product.

### H. Loan Calculator Page

Create a working, client-side loan repayment calculator.

Inputs:

- Loan amount in BDT
- Annual interest rate
- Loan term
- Repayment frequency, where supported

Outputs:

- Estimated installment
- Total estimated repayment
- Estimated interest
- Illustrative repayment summary

Requirements:

- Use vanilla JavaScript.
- Validate every input.
- Handle zero interest separately.
- Prevent invalid or negative values.
- Format amounts using the appropriate Bangladeshi Taka notation.
- Explain the assumptions behind the calculation.
- Clearly state that estimates exclude any unspecified fees and are not loan offers.

Use an appropriate amortization formula for the selected repayment schedule. Do not mix monthly rates, annual rates, and installment periods incorrectly.

### I. How It Works Page

Explain separate user journeys for:

- Merchants collecting payments
- SMEs exploring financing
- Microfinance customers reviewing repayment schedules
- Prospective marketplace lenders

Use a clear step-by-step layout with consistent cards and diagrams.

### J. Business Solutions Page

Include solutions for:

- Retailers
- Small shops
- Online merchants
- Freelancers
- Service providers
- Small distributors
- Growing SMEs

Describe the relevant business problems, possible workflows, and illustrative benefits.

### K. Financial Literacy Page

Provide helpful educational content about:

- Understanding interest rates
- Planning loan repayments
- Managing business cash flow
- Maintaining repayment discipline
- Identifying borrowing risks
- Understanding digital payment records
- Avoiding common digital financial scams

Keep explanations understandable for a broad audience in Bangladesh and emerging markets.

### L. Dashboard Demo Page

Create a visually realistic, static financial dashboard.

Include:

- Available-balance example
- Incoming payment summaries
- Outgoing payment summaries
- Illustrative loan balance
- Upcoming repayment schedule
- Recent transaction history
- Monthly cash-flow visualization
- Payment-status indicators
- Transaction filtering

Use fictional data only. Clearly label the dashboard as a demonstration and do not collect or display actual personal financial information.

Charts may be implemented with CSS or vanilla JavaScript. Avoid unnecessary charting libraries.

### M. Testimonials Page

Show fictional demo testimonials. Clearly label the section as sample content and do not fabricate real customer endorsements.

### N. FAQ Page

Include common questions about:

- Payment workflows
- Loan calculations
- Application steps
- Repayment schedules
- Data privacy
- Marketplace risk
- Demo limitations

Implement an accessible accordion with proper keyboard behavior.

### O. Contact Page

Include:

- Contact introduction
- Static email and telephone placeholders
- Office address placeholder
- Inquiry form
- Service-interest selection
- Name, email, company, and message fields
- Client-side validation
- Accessible error and success feedback

Do not claim that form submissions send emails or create real support tickets. Provide an honest demo-only submission state.

### P. Legal Pages

Create sample Privacy Policy and Terms of Service pages.

Include appropriate placeholders and mark the documents as drafts requiring legal review before any real deployment.

### Q. 404 Page

Create a polished error page with links back to the homepage and important services.

## 7. JSON Data Architecture

JSON is permitted, but it must serve a specific purpose.

Use `jsonData/` for repeated static datasets that benefit from being centrally maintained, such as:

- `services.json`
- `loan-products.json`
- `payment-services.json`
- `business-categories.json`
- `testimonials.json`
- `faqs.json`

Do not create JSON files merely to store ordinary paragraphs or every heading on every page.

### Rules

- HTML remains the primary source of page structure and essential content.
- JSON stores structured data for repeated collections.
- JavaScript loads and renders JSON only when needed.
- Do not maintain duplicate copies of the same dataset.
- Validate data before rendering it.
- Use safe DOM APIs such as `textContent` for dynamic text.
- Do not insert arbitrary JSON strings into `innerHTML`.
- Show a useful fallback when a dataset cannot be loaded.
- Ensure critical navigation and primary page content do not disappear if JSON loading fails.

Because JSON and HTML fragments use `fetch()`, document the local HTTP serving requirement.

## 8. Reusable Components and DRY Principles

Keep shared HTML fragments inside `resources/views/components/`.

Reusable components should include:

- Header and navigation
- Footer
- Announcement bar
- Breadcrumbs
- Section headings
- Buttons
- Service cards
- Loan product cards
- Payment service cards
- Testimonials
- Statistics
- CTA sections
- FAQ items
- Dashboard summaries
- Contact information

### Reuse requirements

- Give each component a clear responsibility.
- Reuse components across pages.
- Avoid repeating identical HTML structures.
- Keep component styling in the central CSS file.
- Keep interactive behavior in the relevant JavaScript modules.
- Use data-driven rendering only for appropriate repeated collections.
- Keep page-specific content in the relevant HTML files.
- Avoid excessive abstraction and unnecessary dependencies.

A lightweight component loader is acceptable for a static site. It must handle loading failures, initialization order, relative paths, and accessibility.

## 9. JavaScript Requirements

JavaScript must implement functionality, not replace HTML as the primary content authoring system.

Suggested responsibilities:

**`main.js`**
- Initialize page functionality.
- Coordinate optional shared-component initialization.
- Avoid duplicate initialization.

**`components.js`**
- Load shared HTML fragments.
- Initialize components after loading.
- Handle loading errors gracefully.

**`navigation.js`**
- Mobile navigation.
- Menu state and keyboard behavior.
- Focus management where required.

**`carousel.js`**
- Carousel and slider interactions.
- Keyboard support.
- Accessible controls.

**`filters.js`**
- Portfolio or product-category filtering.
- Search and filter interactions when required.

**`accordion.js`**
- FAQ accordion behavior.
- Correct expanded-state announcements.

**`calculator.js`**
- Loan repayment calculations.
- Input validation.
- Result formatting.

**`tabs.js`**
- Accessible tab interactions where appropriate.

**`forms.js`**
- Client-side validation.
- Accessible field errors and demo submission feedback.

**`dashboard.js`**
- Static dashboard interactions.
- Transaction filtering.
- Simple chart updates where appropriate.

Use modular, maintainable vanilla JavaScript. Avoid unnecessary global variables, duplicated event listeners, dead controls, and unnecessary DOM operations.

## 10. Image and Asset Guidelines

You may use https://imgenerate.com/ to generate professional demo visuals.

Suitable assets include:

- Fintech hero illustrations
- Digital payment concepts
- Small-business photography
- Merchant payment scenarios
- Financial dashboard mockups
- Team portraits
- Microenterprise illustrations
- SME business photography

Requirements:

- Store local images in `public/assets/images/`.
- Use descriptive filenames.
- Prefer optimized WebP or AVIF when practical.
- Add descriptive alt text to meaningful images.
- Use empty alt text for decorative images.
- Include width and height attributes where possible.
- Lazy-load below-the-fold images.
- Do not lazy-load the primary hero image when it is the main LCP asset.
- Avoid broken external image dependencies.
- Do not assume a generated image exists until it has been generated and added to the project.

## 11. Accessibility — WCAG 2.2 AAA Target

Aim for WCAG 2.2 Level AAA wherever applicable.

Accessibility must be built into the design and implementation from the beginning.

### Required practices

- Semantic HTML5 landmarks
- Correct page language and descriptive titles
- Logical heading hierarchy
- Skip-to-content link
- Complete keyboard accessibility
- Visible focus indicators
- Properly labeled form controls
- Accessible error and success messages
- Correctly synchronized ARIA states
- Accessible mobile navigation
- Keyboard-operable accordions, filters, tabs, and carousels
- No keyboard traps
- Reduced-motion support
- Sufficient text and component contrast
- Meaningful link text
- No color-only status indicators
- Appropriate touch target sizes
- Screen-reader-friendly financial data and tables

### Contrast and readability

Target the relevant AAA contrast criteria:

- Ordinary text: at least 7:1 where applicable.
- Large text: at least 4.5:1 where applicable.
- Essential UI components and graphical objects: at least 3:1 where required.

Review all actual color combinations and interactive states. Do not assume that a color palette is accessible without testing it.

Test with keyboard-only navigation, zoom, automated accessibility tools, and a screen reader where possible.

Do not claim complete AAA conformance unless all relevant success criteria have been evaluated.

## 12. Responsive Design

Follow a mobile-first approach.

Test at approximately:

- 320px
- 375px
- 768px
- 1024px
- 1440px

Ensure that:

- No unintended horizontal overflow occurs.
- Navigation remains usable on small screens.
- Cards and grids reflow naturally.
- Forms are usable on mobile.
- Tables and financial figures remain readable.
- Charts adapt to narrow screens.
- Buttons and controls have sufficient touch space.
- Images scale correctly.
- Typography remains readable at browser zoom.
- No content overlaps or becomes clipped.

Do not create separate duplicated desktop and mobile pages.

## 13. Fintech-Specific Trust and Safety

Because the website represents financial services, trust and transparency are essential.

- Clearly identify FinPulse as a fictional demo brand.
- Label all balances, loan products, repayment estimates, testimonials, and dashboard figures as illustrative.
- Do not use real customer information.
- Do not imply licensing, regulatory approval, or partnerships that have not been established.
- Do not promise guaranteed loans, profits, or investment returns.
- Include realistic risk disclosures for hypothetical lending and P2P marketplace examples.
- Do not collect bank passwords, PINs, OTPs, card security codes, or real payment credentials.
- Do not connect to real payment gateways or financial accounts.
- Do not present client-side validation as secure server-side validation.
- Clearly distinguish educational examples from financial advice and real offers.

## 14. SEO and Semantic HTML

Each page must have:

- A unique page title
- A relevant meta description
- Correct heading hierarchy
- Semantic sections and landmarks
- Descriptive internal links
- Meaningful image alternative text
- Open Graph metadata
- A suitable canonical URL placeholder
- Appropriate structured data only when factually justified

Do not invent business addresses, regulatory licenses, customer ratings, or verified financial results in structured data.

Ensure that primary content and navigation are present in HTML wherever practical.

## 15. Development Workflow

Implement the project in the following phases.

**Phase 1 — Architecture**
- Finalize the folder structure.
- Define the navigation and page relationships.
- Establish design tokens and reusable component contracts.
- Decide which repeated collections genuinely need JSON.
- Document the component-loading approach.

**Phase 2 — Design System**
- Build the header and footer.
- Establish typography, buttons, cards, forms, spacing, and focus states.
- Verify core color contrast.

**Phase 3 — Homepage**
- Implement all major homepage sections.
- Establish the visual identity.
- Verify the mobile and desktop layouts.

**Phase 4 — Remaining Pages**
- Implement all requested pages.
- Reuse components and page templates.
- Add static demo content and assets.

**Phase 5 — Functionality**
- Implement navigation, carousels, filters, accordions, loan calculations, tabs, and form validation as needed.
- Verify keyboard accessibility.
- Handle failed component or JSON loading gracefully.

**Phase 6 — Quality Assurance**
- Test every page.
- Check internal links and asset paths.
- Check responsive layouts and overflow.
- Verify calculator results.
- Check console errors.
- Test keyboard navigation and form feedback.
- Evaluate contrast and accessibility.
- Verify metadata and page titles.
- Confirm that no real financial operation can be initiated.

## 16. Final Deliverables

Provide:

1. Complete project folder structure.
2. All requested HTML pages.
3. A single centralized `public/css/style.css`.
4. Reusable JavaScript modules.
5. Reusable HTML component fragments.
6. Required JSON datasets where appropriate.
7. Generated or properly sourced image assets.
8. A README containing setup and usage instructions.
9. A list of working interactions.
10. A summary of accessibility and responsive testing.
11. A list of limitations and any remaining issues.

### Final acceptance criteria

The project is complete only when all requested pages have meaningful content, the reusable architecture works, CSS remains centralized, the website is responsive, static data is consistent, and all implemented interactions have been tested.

The website must run locally without a backend, database, Node.js, NPM, or build process.

**Final instruction:** Do not stop after creating the homepage. Deliver the complete, cohesive FinPulse demo website using senior-level frontend engineering practices. Favor clarity, reusability, realistic fintech content, accessibility, and maintainability over unnecessary complexity.