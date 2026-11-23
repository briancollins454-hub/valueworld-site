import { site, storeUrl, type Store } from './site';

// Google details for one store page.
export function storeSchema(s: Store) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: `Value World ${s.town}`,
    url: `${site.url}${storeUrl(s)}`,
    image: s.photos.hero ? `${site.url}${s.photos.hero}` : `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    priceRange: '£',
    hasMap: s.directions,
    ...(s.geo ? { geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lng } } : {}),
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    email: s.email,
    ...(s.phone ? { telephone: s.phone } : {}),
    parentOrganization: { '@type': 'Organization', name: 'Value World', legalName: s.company.name },
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.line1,
      addressLocality: s.address.town,
      postalCode: s.address.postcode,
      addressCountry: s.address.country,
    },
    openingHoursSpecification: s.hoursSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}
