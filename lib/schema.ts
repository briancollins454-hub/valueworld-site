import { site, storeUrl, type Store } from './site';

// Google details for one store page.
export function storeSchema(s: Store) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: `Value World ${s.town}`,
    url: `${site.url}${storeUrl(s)}`,
    image: `${site.url}/logo.png`,
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
