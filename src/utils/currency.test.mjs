import assert from 'node:assert/strict';
import test from 'node:test';

/**
 * Mirrors src/utils/currency.ts formatINR for a lightweight Node test
 * without requiring a React Native / Metro test runner.
 */
function formatINR(amount) {
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

function calculateNoCostEmi(price, months) {
  if (months <= 0) return price;
  return Math.round(price / months);
}

test('formats Indian currency with grouping', () => {
  assert.equal(formatINR(119900), '₹1,19,900');
  assert.equal(formatINR(999), '₹999');
  assert.equal(formatINR(1000), '₹1,000');
  assert.equal(formatINR(100000), '₹1,00,000');
});

test('calculates no-cost EMI without inventing interest', () => {
  assert.equal(calculateNoCostEmi(12000, 3), 4000);
  assert.equal(calculateNoCostEmi(119900, 12), 9992);
});
