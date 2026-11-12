const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

export function formatPrice(price) {
  return priceFormatter.format(price);
}
