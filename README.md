# FinPulse demo portal

FinPulse is a fictional, static fintech demonstration for Bangladesh and other
emerging markets. It shows sample digital-payment workflows, microfinance and
SME-loan concepts, a client-side repayment calculator, a sample dashboard, and
financial-literacy content. It does not offer financial services or process
payments, applications, or investments.

## Run locally

The site uses ES modules and `fetch()` for shared HTML fragments. All page
content — including the card collections — is authored directly in HTML. Open it
through a local HTTP server rather than directly as a `file://` URL. From the
`finpulse-portal` directory, run either:

```powershell
php -S 127.0.0.1:8000
```

or:

```powershell
python -m http.server 8000
```

Then open <http://127.0.0.1:8000/>. The root `index.html` forwards to the
homepage. No package installation, build step, backend, or database is needed.

## Images and licensing

Section and card photography lives in `public/assets/images/photos/` and comes
from Unsplash, used under the Unsplash License (free for commercial use, no
attribution required). Every file, its photographer, and its source page are
listed in [IMAGE-CREDITS.md](./IMAGE-CREDITS.md). Photos are stored locally
rather than hot-linked, so the pages do not depend on a third-party server.

Logo marks, the home page hero interface mock, and the testimonial avatars stay
as vector illustrations: the testimonials are fictional, and putting a real
person's face beside a made-up quotation would imply an endorsement that person
never gave.

## Pages and interactions
The portal includes the homepage, service and solution pages, loan calculator,
dashboard demo, FAQs, testimonials, contact form, company information, legal
drafts, and a 404 page. Shared header/footer fragments are loaded by the
vanilla JavaScript modules in `public/js/`; page sections and cards are static
markup, so every page reads correctly even if a script fails.

Interactive examples include responsive navigation, accordions, tabs, carousel
controls, collection filters, the loan repayment calculator, dashboard
transaction filters, and client-side form validation with a demo-only
confirmation. Displayed amounts, products, dashboard activity, and testimonials
are fictional examples.

## Accessibility and responsive notes

The site includes semantic page landmarks, skip links, visible keyboard focus,
keyboard-operable controls, labelled sample financial data, and reduced-motion
styles. The layout is mobile-first and is intended to reflow at 320, 375, 768,
1024, and 1440 CSS pixels. These measures do not constitute a claim of complete
WCAG 2.2 AAA conformance; a full assistive-technology and contrast audit has
not been completed.

## Limitations

- The brand, contact details, user stories, testimonials, products, transaction
  records, metrics, and balances are fictional.
- The calculator is an educational estimate and excludes unspecified fees; it
  is not an offer or financial advice.
- Forms only validate in the browser and show a demonstration response. They do
  not send or store information.
- No account, payment, lending, settlement, or investment service is connected.
- Legal pages are drafts for the demonstration, not legal advice.

## Verification

The 19 site documents (the entry point and 18 frontend pages) were opened in a
browser. No horizontal overflow was found at 320, 375, 768, 1024, or 1440 CSS
pixels. Normal page loads produced no console errors or missing local
responses, and direct page/component references resolve.

The interactive checks covered the calculator's default example and zero-rate
case, invalid and successful form submissions, keyboard use of the skip link,
drawer, disclosure, accordion, tabs, carousel, filters, and form, plus simulated
fetch failures for shared components to check their fallbacks.

To repeat the checks after changing the site, serve it over HTTP and test these
interactions and viewport sizes again.
