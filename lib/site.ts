// All shop details live here. Anything marked TODO still needs confirming with Pat.

export const site = {
  name: 'Value World',
  branch: 'Ballymena',
  tagline: 'Big brands. Small prices. Right on Church Street.',
  url: 'https://valueworld.co.uk',

  address: {
    line1: '155 Church Street',
    town: 'Ballymena',
    postcode: 'BT43 6DG',
    country: 'GB',
  },

  // TODO: shop phone number. Leave null until Pat confirms it; the call buttons hide while it's null.
  phone: null as string | null,
  email: 'valueworldnorthernireland@gmail.com',

  // Legal company details (Companies House). Shown in the footer and on the contact page.
  company: {
    name: 'Valueworld NI Limited',
    number: 'NI741572',
    registeredIn: 'Northern Ireland',
    registeredOffice: '155 Church Street, Ballymena, BT43 6DG, Northern Ireland',
    vatNumber: null as string | null, // TODO: add if VAT registered
  },

  // TODO: Facebook and Instagram page links.
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
  },

  // TODO: confirm the opening date and launch-day opening time.
  // While `openingSoon` is true, every page shows the opening banner.
  openingSoon: true,
  openingDate: 'Wednesday 25 November',
  // TODO: confirm the opening time. The countdown counts down to this (UK time in November = UTC).
  openingAt: '2026-11-25T09:00:00Z',

  // Photos. Put files in /public/photos/ and list them here; each section appears once it has photos.
  photos: {
    hero: null as string | null, // shop front, landscape
    band: null as string | null, // wide shot of the shop floor
    gallery: [] as { src: string; alt: string }[],
  },

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
  // ISO times for Google, matching `hours` above.
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '19:00' },
    { days: ['Sunday'], opens: '13:00', closes: '18:00' },
  ],

  mapEmbed:
    'https://maps.google.com/maps?q=155%20Church%20Street%2C%20Ballymena%20BT43%206DG&z=17&output=embed',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=155%20Church%20Street%2C%20Ballymena%20BT43%206DG',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Offers', href: '/offers/' },
  { label: 'Hours & location', href: '/opening-hours/' },
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
};

// TODO: this week's offers from Pat. While empty, the site shows a "coming soon" panel.
export const offers: Offer[] = [];
export const offersValidUntil: string | null = null;
