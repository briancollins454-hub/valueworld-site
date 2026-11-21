// All site content lives here. Anything marked TODO still needs confirming with Pat.
//
// To add a store: copy the Ballymena entry in `stores`, change its details, add its photos
// under /public/photos/<slug>/. The store page, stores list, footer and Google details update themselves.

export type Hours = { day: string; open: string; close: string }[];

export type Store = {
  slug: string; // used in the web address: /stores/<slug>/
  town: string;
  status: 'open' | 'opening-soon' | 'coming-soon';
  openingDate?: string; // shown in words, e.g. 'Wednesday 25 November'
  openingAt?: string; // the countdown target, ISO time (UK time in winter = UTC)
  address: { line1: string; town: string; postcode: string; country: 'GB' | 'IE' };
  landmark?: string;
  phone: string | null;
  email: string;
  hours: Hours;
  hoursSchema: { days: string[]; opens: string; closes: string }[];
  mapEmbed: string;
  directions: string;
  photos: { hero: string | null; band: string | null; gallery: { src: string; alt: string }[] };
  // The company that runs this store, shown on its page and in the footer.
  company: { name: string; number: string; registeredIn: string; registeredOffice: string; vatNumber: string | null };
};

const valueworldNI = {
  name: 'Valueworld NI Limited',
  number: 'NI741572',
  registeredIn: 'Northern Ireland',
  registeredOffice: '155 Church Street, Ballymena, BT43 6DG, Northern Ireland',
  vatNumber: null as string | null, // TODO: add if VAT registered
};

export const stores: Store[] = [
  {
    slug: 'ballymena',
    town: 'Ballymena',
    status: 'opening-soon', // switch to 'open' after opening day
    openingDate: 'Wednesday 25 November',
    openingAt: '2026-11-25T09:00:00Z', // TODO: confirm opening time
    address: { line1: '155 Church Street', town: 'Ballymena', postcode: 'BT43 6DG', country: 'GB' },
    landmark: 'In the old Bank of Ireland building, beside the bandstand.',
    phone: null, // TODO: shop phone number
    email: 'valueworldnorthernireland@gmail.com',
    // TODO: confirm hours. These are the hours in the opening plan, not yet confirmed.
    hours: [
      { day: 'Monday', open: '7am', close: '7pm' },
      { day: 'Tuesday', open: '7am', close: '7pm' },
      { day: 'Wednesday', open: '7am', close: '7pm' },
      { day: 'Thursday', open: '7am', close: '7pm' },
      { day: 'Friday', open: '7am', close: '7pm' },
      { day: 'Saturday', open: '7am', close: '7pm' },
      { day: 'Sunday', open: '1pm', close: '6pm' },
    ],
    hoursSchema: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '19:00' },
      { days: ['Sunday'], opens: '13:00', closes: '18:00' },
    ],
    mapEmbed: 'https://maps.google.com/maps?q=155%20Church%20Street%2C%20Ballymena%20BT43%206DG&z=17&output=embed',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=155%20Church%20Street%2C%20Ballymena%20BT43%206DG',
    photos: { hero: null, band: null, gallery: [] },
    company: valueworldNI,
  },
];

export const site = {
  name: 'Value World',
  tagline: 'Big brands. Small prices.',
  url: 'https://valueworld.co.uk',
  email: 'valueworldnorthernireland@gmail.com',
  // The company that runs this website (shown in the footer).
  company: valueworldNI,
  // TODO: Facebook and Instagram page links.
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
  },
  // Brand photos for the home page (best shots from any store). Each section appears once it has photos.
  photos: {
    hero: null as string | null,
    band: null as string | null,
    gallery: [] as { src: string; alt: string }[],
  },
  comingSoonNote: 'More stores coming soon.',
};

// The next store to open (drives the countdown and opening banner), if any.
export const nextOpening = stores.find((s) => s.status === 'opening-soon' && s.openingAt) ?? null;
export const storeUrl = (s: Store) => `/stores/${s.slug}/`;
export const shortDate = (d: string) => d.replace('Wednesday', 'Wed').replace('Thursday', 'Thu').replace('Saturday', 'Sat').replace('November', 'Nov').replace('December', 'Dec');

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Offers', href: '/offers/' },
  { label: 'Stores', href: '/stores/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

// The departments, grouped the same way as the shop floor.
export const departments = [
  { key: 'coffee', name: 'Hot food & coffee', blurb: 'Fresh coffee from the bean and hot food to go.' },
  { key: 'chilled', name: 'Drinks & chilled', blurb: 'Cold drinks, ice and chilled favourites.' },
  { key: 'household', name: 'Household & cleaning', blurb: 'Everything for the kitchen, the wash and the cupboard.' },
  { key: 'beauty', name: 'Health & beauty', blurb: 'Toiletries and everyday essentials for less.' },
  { key: 'toys', name: 'Toys', blurb: 'A whole section of toys and games.' },
  { key: 'stationery', name: 'Art & stationery', blurb: 'School, office and craft supplies.' },
  { key: 'cards', name: 'Cards & gifts', blurb: 'Cards for every occasion.' },
  { key: 'sweets', name: 'Sweets & snacks', blurb: 'Treats for the walk home.' },
] as const;

export type Offer = {
  name: string;
  price: string;
  was?: string;
  badge?: 'New in' | 'This week only' | 'Opening offer';
  image?: string; // path under /public/offers/
  note?: string;
  stores?: string[]; // store slugs; leave out for offers in every store
};

// TODO: offers from Pat. While empty, the site shows a "coming soon" panel.
export const offers: Offer[] = [];
export const offersValidUntil: string | null = null;

// Holding page: while true, every address shows a single "opening soon" page instead of the full site.
// The full site still builds on Vercel preview links (set NEXT_PUBLIC_FULL_SITE=1 there).
// To go live, set this to false (or set NEXT_PUBLIC_FULL_SITE=1 for production) and redeploy.
export const holding = process.env.NEXT_PUBLIC_FULL_SITE !== '1';
