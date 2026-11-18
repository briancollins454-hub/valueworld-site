# Value World Ballymena website

Five-page static site (Next.js, static export) for Value World, 155 Church Street, Ballymena.
Built by The Supports Desk.

## Editing content

All shop details are in `lib/site.ts`: address, phone, email, social links, opening date, hours, offers.
Search for `TODO` to find what still needs confirming.

## Still needed from Pat

- [ ] Logo file (SVG or large PNG) and exact brand colours (`tailwind.config.js` → `brand`, `sun`)
- [ ] Shop phone number (`site.phone`; call buttons appear once it's set)
- [ ] Confirmed opening hours (`site.hours` and `site.hoursSchema`)
- [ ] Opening date and launch-day time (`site.openingDate`; set `openingSoon: false` after opening)
- [ ] Facebook and Instagram links (`site.social`)
- [ ] Photos: shop front (home hero), team, shop floor, toy section (about page)
- [ ] Opening offers: name, price, photo, badge (`offers` array; photos in `public/offers/`)
- [ ] A few lines for the About page in Pat's own words

## Deploy

Vercel (Supports Desk Pro team). Build command `next build`, output is static (`out/`).
Domains: valueworld.co.uk as main, valueworld.ie redirecting to it.
Contact form: set `NEXT_PUBLIC_WEB3FORMS_KEY` to a Web3Forms access key created with the shop's email.
