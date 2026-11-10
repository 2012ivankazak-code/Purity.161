import React, { useState, useMemo } from 'react';
import {
  Building2,
  Warehouse,
  Factory,
  Sparkles,
  Home,
  CheckSquare,
  Square,
  Users,
  Clock,
  ArrowRight,
  Calculator as CalcIcon,
  HelpCircle,
} from 'lucide-react';
import {
  calculateCleaningEstimate,
  formatRubles,
  ADDONS_CATALOG,
  SegmentType,
  PropertyTypeId,
  CleaningTypeId,
} from '../utils/calculator';

interface CalculatorSectionProps {
  onFixEstimate: (estimateData: {
    segment: SegmentType;
    propertyType: string;
    cleaningType: string;
    area: number;
    addons: string[];
    totalPrice: number;
    priceWithVat: number;
    recommendedCleaners: number;
    estimatedHours: number;
  }) => void;
  initialPropertyType?: PropertyTypeId;
  initialCleaningType?: CleaningTypeId;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onFixEstimate,
  initialPropertyType = 'office',
  initialCleaningType = 'general',
}) => {
  const [segment, setSegment] = useState<SegmentType>('b2b');
  const [propertyType, setPropertyType] = useState<PropertyTypeId>(initialPropertyType);
  const [cleaningType, setCleaningType] = useState<CleaningTypeId>(initialCleaningType);
  const [area, setArea] = useState<number>(300);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['window_facade']);

  // Sync segment if propertyType changes
  const handlePropertyTypeChange = (type: PropertyTypeId) => {
    setPropertyType(type);
    if (type === 'apartment' || type === 'cottage') {
      setSegment('b2c');
    } else {
      setSegment('b2b');
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculation = useMemo(() => {
    return calculateCleaningEstimate({
      segment,
      propertyType,
      cleaningType,
      area,
      addons: selectedAddons,
    });
  }, [segment, propertyType, cleaningType, area, selectedAddons]);

  const propertyOptions: { id: PropertyTypeId; label: string; segment: SegmentType; icon: React.ReactNode }[] = [
    { id: 'office', label: 'Офис / Бизнес-центр', segment: 'b2b', icon: <Building2 className="w-4 h-4" /> },
    { id: 'warehouse', label: 'Склад / Логистика', segment: 'b2b', icon: <Warehouse className="w-4 h-4" /> },
    { id: 'production', label: 'Производство / Цех', segment: 'b2b', icon: <Factory className="w-4 h-4" /> },
    { id: 'apartment', label: 'Премиум квартира', segment: 'b2c', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'cottage', label: 'Коттедж / Резиденция', segment: 'b2c', icon: <Home className="w-4 h-4" /> },
  ];

  const cleaningOptions: { id: CleaningTypeId; label: string; desc: string }[] = [
    {
      id: 'support',
      label: 'Поддерживающая уборка',
      desc: 'Ежедневная или еженедельная очистка контактных поверхностей и санзон',
    },
    {
      id: 'general',
      label: 'Генеральный клининг',
      desc: 'Глубокая очистка всех поверхностей от пола до потолка, удаление сложных загрязнений',
    },
    {
      id: 'post_renovation',
      label: 'После ремонта / стройки',
      desc: 'Удаление строительной пыли, краски, затирки, подготовка к вводу в эксплуатацию',
    },
    {
      id: 'industrial_disinfection',
      label: 'Обеспыливание и дезинфекция',
      desc: 'Специальная промышленная обработка высотных конструкций и оборудования',
    },
  ];

  const propertyLabels: Record<PropertyTypeId, string> = {
    office: 'Офис / БЦ',
    warehouse: 'Склад / Терминал',
    production: 'Производство',
    apartment: 'Премиум квартира',
    cottage: 'Коттедж',
  };

  const cleaningLabels: Record<CleaningTypeId, string> = {
    support: 'Поддерживающая уборка',
    general: 'Генеральная уборка',
    post_renovation: 'Клининг после ремонта',
    industrial_disinfection: 'Обеспыливание и дезинфекция',
  };

  const handleFixEstimateClick = () => {
    onFixEstimate({
      segment,
      propertyType: propertyLabels[propertyType],
      cleaningType: cleaningLabels[cleaningType],
      area,
      addons: selectedAddons,
      totalPrice: calculation.totalPrice,
      priceWithVat: calculation.priceWithVat,
      recommendedCleaners: calculation.recommendedCleaners,
      estimatedHours: calculation.estimatedHours,
    });
  };

  return (
    <section id="calculator" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CalcIcon className="w-4 h-4" />
            <span>Интерактивный расчет сметы</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Рассчитайте предварительную стоимость клининга за 30 секунд
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Выберите параметры вашего объекта. Итоговая смета фиксируется в официальном договоре и не меняется в процессе работ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Input Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            {/* Step 1: Segment Toggle */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                1. Категория объекта
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-neutral-950 border border-neutral-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setSegment('b2b');
                    if (propertyType === 'apartment' || propertyType === 'cottage') {
                      setPropertyType('office');
                    }
                  }}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    segment === 'b2b'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Юридические лица (B2B)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSegment('b2c');
                    if (propertyType !== 'apartment' && propertyType !== 'cottage') {
                      setPropertyType('apartment');
                    }
                  }}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    segment === 'b2c'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Частные клиенты (B2C Премиум)
                </button>
              </div>
            </div>

            {/* Step 2: Property Type Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                2. Тип помещения
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {propertyOptions
                  .filter((opt) => (segment === 'b2b' ? opt.segment === 'b2b' : opt.segment === 'b2c'))
                  .map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handlePropertyTypeChange(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        propertyType === opt.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white'
                          : 'border-neutral-800 bg-neutral-950/70 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-emerald-400">{opt.icon}</div>
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Step 3: Cleaning Type Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                3. Вид клининга
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cleaningOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCleaningType(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      cleaningType === opt.id
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-neutral-800 bg-neutral-950/70 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${cleaningType === opt.id ? 'text-emerald-300' : 'text-white'}`}>
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Area Slider & Quick Presets */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  4. Общая площадь объекта
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={20}
                    max={20000}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value) || 20)}
                    className="w-24 px-2.5 py-1 text-sm font-mono font-bold text-right text-emerald-400 bg-neutral-950 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500 tabular-nums"
                  />
                  <span className="text-xs text-neutral-400 font-mono">м²</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={30}
                max={segment === 'b2b' ? 5000 : 800}
                step={segment === 'b2b' ? 50 : 10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />

              {/* Area Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                <span className="text-[11px] text-neutral-400">Быстрый выбор:</span>
                {[
                  ...(segment === 'b2b'
                    ? [150, 350, 800, 1500, 3000]
                    : [65, 120, 250, 450, 750]),
                ].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setArea(val)}
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] tabular-nums transition-colors cursor-pointer ${
                      area === val
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {val} м²
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Optional Addons */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                5. Дополнительные опции
              </label>
              <div className="space-y-2">
                {ADDONS_CATALOG.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isChecked
                          ? 'border-emerald-500/50 bg-emerald-500/5 text-white'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-600 shrink-0" />
                        )}
                        <span className="text-xs font-medium">{addon.name}</span>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono tabular-nums whitespace-nowrap">
                        +{addon.pricePerUnit} ₽/{addon.unit}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column / Live Breakdown & Total (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
                  Расчет сметы
                </span>
                <h3 className="text-lg font-bold text-white">Предварительная смета</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-400 block font-mono">Объект</span>
                <span className="text-xs font-bold text-white font-mono tabular-nums">
                  {area} м²
                </span>
              </div>
            </div>

            {/* Breakdown lines */}
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Базовая ставка ({propertyLabels[propertyType]}):</span>
                <span className="font-mono tabular-nums text-white">
                  {calculation.baseRatePerM2} ₽ / м²
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Стоимость базового клининга:</span>
                <span className="font-mono tabular-nums text-white">
                  {formatRubles(calculation.basePrice)}
                </span>
              </div>

              {calculation.addonsPrice > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Дополнительные опции:</span>
                  <span className="font-mono tabular-nums text-emerald-400">
                    +{formatRubles(calculation.addonsPrice)}
                  </span>
                </div>
              )}

              {calculation.discountPercent > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                  <span>Скидка за объем ({calculation.discountPercent}%):</span>
                  <span className="font-mono tabular-nums">
                    -{formatRubles(calculation.discountAmount)}
                  </span>
                </div>
              )}
            </div>

            {/* Crew size & Duration estimations */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Состав бригады</span>
                </div>
                <div className="text-base font-bold text-white font-mono tabular-nums">
                  {calculation.recommendedCleaners} клинера
                </div>
                <div className="text-[10px] text-neutral-500">+ 1 супервайзер</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Время работ</span>
                </div>
                <div className="text-base font-bold text-white font-mono tabular-nums">
                  ~{calculation.estimatedHours} часов
                </div>
                <div className="text-[10px] text-neutral-500">Возможна ночь</div>
              </div>
            </div>

            {/* Total Block */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  Итоговая смета:
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {formatRubles(calculation.totalPrice)}
                </span>
              </div>

              {segment === 'b2b' && (
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-6 font-mono">
                  <span>В т.ч. НДС 20%:</span>
                  <span>{formatRubles(calculation.priceWithVat)}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleFixEstimateClick}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Зафиксировать расчет и вызвать технолога</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-start gap-2 text-[11px] text-neutral-400 leading-snug">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Выезд инженера-технолога для осмотра объекта и контрольного замера по Ростову-на-Дону — бесплатный и ни к чему не обязывает.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
