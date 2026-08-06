export function formatCurrency(price: number): string {
  return `৳${price.toLocaleString('en-BD')}`
}
