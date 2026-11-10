import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCleaningEstimate, formatRubles } from './calculator';

test('calculates B2B office post-renovation cleaning correctly', () => {
  const result = calculateCleaningEstimate({
    segment: 'b2b',
    propertyType: 'office',
    cleaningType: 'post_renovation',
    area: 300,
    addons: [],
  });

  // 300 * 160 = 48,000 руб
  assert.equal(result.baseRatePerM2, 160);
  assert.equal(result.basePrice, 48000);
  assert.equal(result.totalPrice, 48000);
  assert.equal(result.discountPercent, 0);
  assert.ok(result.recommendedCleaners >= 2);
});

test('applies volume discount for large facilities >= 1200 m²', () => {
  const result = calculateCleaningEstimate({
    segment: 'b2b',
    propertyType: 'warehouse',
    cleaningType: 'general',
    area: 1500,
    addons: [],
  });

  // 1500 * 50 = 75,000, 10% discount = 7,500, total = 67,500
  assert.equal(result.discountPercent, 10);
  assert.equal(result.subtotal, 75000);
  assert.equal(result.totalPrice, 67500);
});

test('enforces minimum order threshold for B2C orders', () => {
  const result = calculateCleaningEstimate({
    segment: 'b2c',
    propertyType: 'apartment',
    cleaningType: 'support',
    area: 30, // 30 * 80 = 2400 < 7000 min order
    addons: [],
  });

  assert.equal(result.basePrice, 7000);
  assert.equal(result.totalPrice, 7000);
});

test('adds optional services correctly and calculates VAT', () => {
  const result = calculateCleaningEstimate({
    segment: 'b2b',
    propertyType: 'office',
    cleaningType: 'general',
    area: 200,
    addons: ['carpet_furniture'],
  });

  // 200 * 110 = 22,000 + 6,500 = 28,500
  assert.equal(result.basePrice, 22000);
  assert.equal(result.addonsPrice, 6500);
  assert.equal(result.totalPrice, 28500);
  assert.equal(result.priceWithVat, Math.round(28500 * 1.2));
});

test('formatRubles formats Russian rubles properly', () => {
  const formatted = formatRubles(50000);
  assert.match(formatted, /50\s*000/);
});
