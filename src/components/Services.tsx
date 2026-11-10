import React, { useState } from 'react';
import { Building2, Warehouse, Factory, Sparkles, Home, Construction, Check, ArrowRight } from 'lucide-react';
import { PropertyTypeId } from '../utils/calculator';

interface ServicesProps {
  onSelectServiceForCalc: (propertyType: PropertyTypeId, cleaningType: any) => void;
  onOpenProposal: () => void;
}

interface ServiceCardData {
  id: PropertyTypeId;
  segment: 'b2b' | 'b2c';
  title: string;
  badge: string;
  icon: React.ReactNode;
  priceNote: string;
  description: string;
  bullets: string[];
  equipment: string;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForCalc, onOpenProposal }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'b2b' | 'b2c'>('all');

  const services: ServiceCardData[] = [
    {
      id: 'office',
      segment: 'b2b',
      title: 'Бизнес-центры и офисы класса A/B+',
      badge: 'B2B Приоритет',
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      priceNote: 'от 55 ₽ / м²',
      description: 'Комплексное контрактное обслуживание офисных пространств, переговорных, входных групп и санитарных зон. Работа в ночное время без помех для сотрудников.',
      bullets: [
        'Ежедневная утренняя или вечерняя уборка',
        'Обеспыливание оргтехники антистатиками',
        'Глубокая чистка ковролина и мягкой мебели',
        'Комплектация расходными материалами Tork / Katrin',
      ],
      equipment: 'Поломоечные машины Cleanfix, химия Buzil & Kiehl (Германия)',
    },
    {
      id: 'warehouse',
      segment: 'b2b',
      title: 'Склады и логистические комплексы',
      badge: 'B2B Промышленный',
      icon: <Warehouse className="w-5 h-5 text-emerald-400" />,
      priceNote: 'от 25 ₽ / м²',
      description: 'Механизированная уборка складских терминалов высокой площади (до 50 000+ м²). Удаление следов погрузчиков, обеспыливание стеллажей и металлоконструкций.',
      bullets: [
        'Роторная и райдерная чистка топпинговых полов',
        'Очистка ферм и балок на высоте до 16 метров (допуск к высотным работам)',
        'Удаление следов резины от шин погрузчиков и ричтраков',
        'Срочная сдача объекта перед инвентаризацией',
      ],
      equipment: 'Райдеры Taski Swingo, промышленные пылесосы Kärcher IVC',
    },
    {
      id: 'production',
      segment: 'b2b',
      title: 'Производственные площадки и цеха',
      badge: 'B2B Индустриальный',
      icon: <Factory className="w-5 h-5 text-emerald-400" />,
      priceNote: 'от 35 ₽ / м²',
      description: 'Специализированная уборка производств с соблюдением норм СанПиН, ХАССП и техники безопасности. Очистка технологических линий и технических помещений.',
      bullets: [
        'Обезжиривание промышленного оборудования',
        'Очистка систем вентиляции и вытяжных зонтов',
        'Дезинфекция по стандартам пищевой и фармацевтической отрасли',
        'Утилизация производственных отходов с документами',
      ],
      equipment: 'Парогенераторы Menikini, щелочные и кислотные очистители Prochem',
    },
    {
      id: 'office',
      segment: 'b2b',
      title: 'Клининг после ремонта и строительства',
      badge: 'B2B & B2C',
      icon: <Construction className="w-5 h-5 text-emerald-400" />,
      priceNote: 'от 85 ₽ / м²',
      description: 'Финишная подготовка коммерческих и жилых объектов к открытию или заселению. Полное удаление строительной пыли, эпоксидной затирки, следов клея и краски.',
      bullets: [
        'Многоступенчатое обеспыливание стен и потолков',
        'Деликатное удаление краски, герметика и цементных пятен',
        'Мойка остекления от скотча и защитных пленок без царапин',
        'Фиксация сдачи объекта по чек-листу из 85 пунктов',
      ],
      equipment: 'Промышленные экстракторы Kärcher Puzzi, скребки Unger',
    },
    {
      id: 'apartment',
      segment: 'b2c',
      title: 'Генеральная уборка премиум-квартир',
      badge: 'Премиум B2C',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      priceNote: 'от 120 ₽ / м²',
      description: 'Глубокий клининг квартир и пентхаусов с бережным отношением к авторским интерьерам: натуральному мрамору, паркету ценных пород, латуни и шелку.',
      bullets: [
        'Мытье светильников и хрустальных люстр',
        'Обработка парогенератором плиточных швов и сантехники',
        'Удаление жирового налета со всей встроенной кухонной техники',
        'Эко-химия без резких запахов, безопасная для детей и питомцев',
      ],
      equipment: 'Немецкая бесфосфатная химия Kiehl, микрофибра Vileda Professional',
    },
    {
      id: 'cottage',
      segment: 'b2c',
      title: 'Уборка коттеджей и загородных резиденций',
      badge: 'Премиум B2C',
      icon: <Home className="w-5 h-5 text-emerald-400" />,
      priceNote: 'от 115 ₽ / м²',
      description: 'Комплексный уход за домами большой площади (от 200 до 2 000+ м²). Включает террасы, сауны, SPA-зоны, лестничные марши и витражные фасады.',
      bullets: [
        'Мойка фасадных витражей и панорамных террас',
        'Чистка каминных порталов от сажи и копоти',
        'Дезинфекция банных комплексов и бассейнов',
        'Бригада клинеров под контролем постоянного бригадира-технолога',
      ],
      equipment: 'Высотные штанги Unger nLite до 12м, роторы Cleanfix',
    },
  ];

  const filteredServices = services.filter((svc) => {
    if (activeFilter === 'all') return true;
    return svc.segment === activeFilter;
  });

  return (
    <section id="services" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Направления деятельности
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Комплексные услуги профессионального клининга
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Специализируемся на сложных масштабируемых проектах. Персонал с допусками, немецкая техника и сертифицированная химия премиум-класса.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Все услуги
            </button>
            <button
              onClick={() => setActiveFilter('b2b')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'b2b'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Для бизнеса (B2B)
            </button>
            <button
              onClick={() => setActiveFilter('b2c')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'b2c'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Премиум жилье (B2C)
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <div
              key={`${service.title}-${idx}`}
              className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 group shadow-sm"
            >
              <div>
                {/* Header row of card */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 font-medium block">
                      {service.badge}
                    </span>
                    <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                      {service.priceNote}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment Footer & CTA */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="text-[11px] text-neutral-400 mb-4 line-clamp-1">
                  <span className="text-neutral-400 font-medium">Оснащение: </span>
                  {service.equipment}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const cleaningKind = service.title.includes('ремонт') ? 'post_renovation' : 'general';
                      onSelectServiceForCalc(service.id, cleaningKind);
                    }}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Рассчитать смету</span>
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                  </button>

                  <button
                    onClick={onOpenProposal}
                    className="py-2 px-3 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Запросить КП
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
