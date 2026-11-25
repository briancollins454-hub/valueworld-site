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
  geo?: { lat: number; lng: number }; // map pin for Google
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
    openingDate: 'Friday 27 November',
    openingAt: '2026-11-27T07:00:00Z', // doors open 7am (UK time = UTC in winter)
    address: { line1: '155 Church Street', town: 'Ballymena', postcode: 'BT43 6DG', country: 'GB' },
    landmark: 'In the old Bank of Ireland building, beside the bandstand.',
    geo: { lat: 54.8663938, lng: -6.2734897 },
    phone: null, // TODO: shop phone number
    email: 'valueworldnorthernireland@gmail.com',
    // Confirmed by Pat: Mon to Sat 7am to 7pm, Sunday 1pm to 6pm.
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
    photos: { hero: '/photos/ballymena/front.jpg', band: null, gallery: [] },
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
    band: '/photos/ballymena/front.jpg' as string | null,
    gallery: [] as { src: string; alt: string }[],
  },
  comingSoonNote: 'More stores coming soon.',
};

// The next store to open (drives the countdown and opening banner), if any.
export const nextOpening = stores.find((s) => s.status === 'opening-soon' && s.openingAt) ?? null;
export const storeUrl = (s: Store) => `/stores/${s.slug}/`;
export const shortDate = (d: string) => d.replace('Wednesday', 'Wed').replace('Friday', 'Fri').replace('Thursday', 'Thu').replace('Saturday', 'Sat').replace('November', 'Nov').replace('December', 'Dec');

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Our shops', href: '/shops/' },
  { label: 'Offers', href: '/offers/' },
  { label: 'Stores', href: '/stores/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

// The seven shops inside every Value World, in Pat's order. Each gets its own page at /shops/<slug>/.
export type Shop = {
  slug: string;
  name: string;
  tagline: string; // short line on the tile
  blurb: string; // intro on the shop's page
  items: string[]; // what you'll find
  seoTitle: string; // Google title (town is added)
};

export const shops: Shop[] = [
  {
    slug: 'grocery',
    name: 'Grocery',
    tagline: 'The weekly shop for less.',
    blurb: 'Big-brand food cupboard favourites at prices that make the weekly shop go further.',
    items: ['Food cupboard', 'Cereals and breakfast', 'Tins and jars', 'Pasta, rice and sauces', 'Soft drinks and juice', 'Family-size packs'],
    seoTitle: 'Grocery Shop',
  },
  {
    slug: 'non-grocery',
    name: 'Non Grocery',
    tagline: 'Household, cleaning and toiletries.',
    blurb: 'Everything for the home: cleaning, laundry, kitchenware and toiletries, with the brands you already use.',
    items: ['Cleaning and laundry', 'Kitchenware and cookware', 'Toiletries', 'Health and beauty', 'Storage and home', 'Paper and kitchen roll'],
    seoTitle: 'Household and Cleaning Shop',
  },
  {
    slug: 'toys',
    name: 'Toys',
    tagline: 'A whole shop of toys and games.',
    blurb: 'A full toy shop under our roof, from pocket-money treats to birthday and Christmas presents.',
    items: ['Toys and games', 'Dolls and plush', 'Pocket-money toys', 'Outdoor and active play', 'Arts and crafts kits', 'Christmas gifts'],
    seoTitle: 'Toy Shop',
  },
  {
    slug: 'poundshop',
    name: 'Poundshop',
    tagline: 'Pound shop bargains, every day.',
    blurb: 'Our pound shop is packed with everyday bits and bobs at pound shop prices.',
    items: ['Household bits', 'Kitchen gadgets', 'Party bits', 'Seasonal lines', 'Everyday odds and ends'],
    seoTitle: 'Pound Shop',
  },
  {
    slug: 'stationery',
    name: 'Stationery',
    tagline: 'School, office and craft.',
    blurb: 'Everything for school, the office and the craft table, all in one place.',
    items: ['School supplies', 'Pens, pencils and paper', 'Office essentials', 'Art and craft', 'Folders and filing', 'Notebooks and diaries'],
    seoTitle: 'Stationery Shop',
  },
  {
    slug: 'convenience',
    name: 'Convenience',
    tagline: 'Hot food, coffee and treats to go.',
    blurb: 'Grab and go: hot food freshly cooked every day, fresh coffee, ice cream, sweets and cold drinks.',
    items: ['Hot food to go', 'Fresh coffee', 'Ice cream', 'Sweets and snacks', 'Cold drinks', 'Phone accessories'],
    seoTitle: 'Convenience Store and Hot Food',
  },
  {
    slug: 'card-and-gift',
    name: 'Card and Gift Shop',
    tagline: 'Cards, wrap and gifts for every occasion.',
    blurb: 'Cards for every occasion, plus gift wrap, bags, balloons and party bits to go with them.',
    items: ['Cards for every occasion', 'Gift wrap and bags', 'Balloons and party', 'Gifts', 'Christmas cards and wrap'],
    seoTitle: 'Card and Gift Shop',
  },
];

export const shopUrl = (s: Shop) => `/shops/${s.slug}/`;
export const departments = shops; // older name, kept so nothing breaks

export type Offer = {
  name: string;
  price: string;
  was?: string;
  badge?: 'New in' | 'This week only' | 'Opening offer';
  image?: string; // path under /public/offers/
  note?: string;
  stores?: string[]; // store slugs; leave out for offers in every store
  shop?: string; // which of the seven shops it belongs to (shop slug)
};

// Hot food prices from the in-store sign. Add more offers from Pat here.
export const offers: Offer[] = [
  { name: 'Hot food snack pot', price: '£3.99', badge: 'New in', shop: 'convenience', note: 'Freshly cooked every day. Pick your pot, fill it up, add your sauce.' },
  { name: 'Hot food lunch pot', price: '£4.99', badge: 'New in', shop: 'convenience', note: 'Freshly cooked every day. Pick your pot, fill it up, add your sauce.' },
  { name: 'Hot food sharing pot', price: '£6.99', badge: 'New in', shop: 'convenience', note: 'Freshly cooked every day. Pick your pot, fill it up, add your sauce.' },
];
export const offersValidUntil: string | null = null;

// Holding page: while true, every address shows a single "opening soon" page instead of the full site.
// The full site still builds on Vercel preview links (set NEXT_PUBLIC_FULL_SITE=1 there).
// To go live, set this to false (or set NEXT_PUBLIC_FULL_SITE=1 for production) and redeploy.
export const holding = process.env.NEXT_PUBLIC_FULL_SITE !== '1';
