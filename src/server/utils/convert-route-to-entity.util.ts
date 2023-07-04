const mapping: Record<string, string> = {
  carts: 'cart',
  'cart-items': 'cart_item',
  certificates: 'certificate',
  organizations: 'organization',
  reviews: 'review',
  users: 'user',
  workshops: 'workshop',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
