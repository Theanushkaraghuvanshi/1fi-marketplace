/**
 * Formats amounts in Indian Rupee notation (e.g. ₹1,19,900).
 */
export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absolute = Math.abs(rounded).toString();

  let lastThree = absolute.slice(-3);
  const otherNumbers = absolute.slice(0, -3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }

  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/** Rebuild no-cost EMI amount for a given price and tenure. */
export function calculateNoCostEmi(price: number, months: number): number {
  if (months <= 0) return price;
  return Math.round(price / months);
}
