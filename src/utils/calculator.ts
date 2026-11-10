/**
 * Pure calculation logic for Чистота.161 cleaning cost estimation.
 * Follows commercial B2B and premium B2C cleaning industry standards in Southern Federal District (Rostov-on-Don).
 */

export type SegmentType = 'b2b' | 'b2c';

export type PropertyTypeId = 'office' | 'warehouse' | 'production' | 'apartment' | 'cottage';

export type CleaningTypeId = 'support' | 'general' | 'post_renovation' | 'industrial_disinfection';

export interface AddonOption {
  id: string;
  name: string;
  unit: string;
  pricePerUnit: number; // or flat
  isAreaBased?: boolean;
}

export interface CalculationInput {
  segment: SegmentType;
  propertyType: PropertyTypeId;
  cleaningType: CleaningTypeId;
  area: number; // m²
  addons: string[]; // addon IDs
}

export interface CalculationResult {
  area: number;
  baseRatePerM2: number;
  basePrice: number;
  addonsPrice: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalPrice: number;
  priceWithVat: number; // For B2B closed reporting
  recommendedCleaners: number;
  estimatedHours: number;
  isCustomQuote: boolean;
}

export const ADDONS_CATALOG: AddonOption[] = [
  {
    id: 'window_facade',
    name: 'Мойка панорамного остекления и фасадов',
    unit: 'м²',
    pricePerUnit: 120,
    isAreaBased: true,
  },
  {
    id: 'rotor_floor',
    name: 'Глубокая роторная размывка полов (керамогранит/бетон)',
    unit: 'м²',
    pricePerUnit: 80,
    isAreaBased: true,
  },
  {
    id: 'carpet_furniture',
    name: 'Экстракторная химчистка мебели и ковровых покрытий',
    unit: 'комплекс',
    pricePerUnit: 6500,
    isAreaBased: false,
  },
  {
    id: 'ozonation',
    name: 'Озонирование и устранение запахов (пром. генератор)',
    unit: 'услуга',
    pricePerUnit: 4500,
    isAreaBased: false,
  },
  {
    id: 'waste_removal',
    name: 'Сбор и вывоз строительного мусора (ПУХТО/Газель)',
    unit: 'рейс',
    pricePerUnit: 9000,
    isAreaBased: false,
  },
];

// Base rates in rubles per m²
const BASE_RATES: Record<PropertyTypeId, Record<CleaningTypeId, number>> = {
  office: {
    support: 55,
    general: 110,
    post_renovation: 160,
    industrial_disinfection: 90,
  },
  warehouse: {
    support: 25,
    general: 50,
    post_renovation: 85,
    industrial_disinfection: 45,
  },
  production: {
    support: 35,
    general: 75,
    post_renovation: 125,
    industrial_disinfection: 70,
  },
  apartment: {
    support: 80,
    general: 150,
    post_renovation: 220,
    industrial_disinfection: 120,
  },
  cottage: {
    support: 75,
    general: 140,
    post_renovation: 210,
    industrial_disinfection: 115,
  },
};

export function calculateCleaningEstimate(input: CalculationInput): CalculationResult {
  const { propertyType, cleaningType, area, addons } = input;
  const safeArea = Math.max(20, Math.min(50000, Number(area) || 100));

  const propertyRates = BASE_RATES[propertyType] || BASE_RATES.office;
  const baseRatePerM2 = propertyRates[cleaningType] || 100;

  // Base price
  let basePrice = Math.round(safeArea * baseRatePerM2);

  // Minimum order thresholds
  const minOrder = input.segment === 'b2b' ? 12000 : 7000;
  if (basePrice < minOrder) {
    basePrice = minOrder;
  }

  // Addons price
  let addonsPrice = 0;
  for (const addonId of addons) {
    const item = ADDONS_CATALOG.find((a) => a.id === addonId);
    if (!item) continue;
    if (item.isAreaBased) {
      // Typically window facade or floor scrubbing covers 30-50% of total footprint or proportional
      const effectiveArea = Math.min(safeArea, Math.round(safeArea * 0.4));
      addonsPrice += Math.round(effectiveArea * item.pricePerUnit);
    } else {
      addonsPrice += item.pricePerUnit;
    }
  }

  const subtotal = basePrice + addonsPrice;

  // Volume scale discounts for commercial scale
  let discountPercent = 0;
  if (safeArea >= 3000) {
    discountPercent = 15;
  } else if (safeArea >= 1200) {
    discountPercent = 10;
  } else if (safeArea >= 500) {
    discountPercent = 5;
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalPrice = subtotal - discountAmount;
  const priceWithVat = Math.round(totalPrice * 1.2); // 20% VAT in Russia

  // Team calculation
  // Typically 1 cleaner covers ~150-250 m² in general cleaning per 8h shift, or 500 m² for warehousing
  const m2PerCleaner = propertyType === 'warehouse' ? 450 : propertyType === 'production' ? 300 : 150;
  const recommendedCleaners = Math.max(2, Math.min(30, Math.ceil(safeArea / m2PerCleaner)));

  // Estimated hours
  const baseHours = cleaningType === 'post_renovation' ? 8 : cleaningType === 'general' ? 6 : 4;
  const estimatedHours = safeArea > 2000 ? Math.min(12, baseHours + 2) : baseHours;

  const isCustomQuote = safeArea >= 5000;

  return {
    area: safeArea,
    baseRatePerM2,
    basePrice,
    addonsPrice,
    subtotal,
    discountPercent,
    discountAmount,
    totalPrice,
    priceWithVat,
    recommendedCleaners,
    estimatedHours,
    isCustomQuote,
  };
}

export function formatRubles(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(amount);
}
