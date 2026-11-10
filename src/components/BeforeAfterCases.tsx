import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MapPin, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import b2bBusinessCenterImg from '../assets/images/b2b_business_center_1794330463420.jpg';
import caseWarehouseImg from '../assets/images/case_warehouse_logistics_1794330464093.jpg';
import caseLuxuryResidenceImg from '../assets/images/case_luxury_residence_1794330464276.jpg';

interface BeforeAfterCasesProps {
  onOpenProposal: () => void;
}

export const BeforeAfterCases: React.FC<BeforeAfterCasesProps> = ({ onOpenProposal }) => {
  // State for interactive Before/After comparison slider
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  return (
    <section id="cases" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Реализованные проекты
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Кейсы и результаты работы на объектах ЮФО
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Только настоящие результаты сдачи объектов заказчикам. Работаем со сложными загрязнениями, деликатными материалами и сжатыми сроками.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Потяните ползунок для сравнения До / После</span>
          </div>
        </div>

        {/* Marquee Interactive Before/After Split Viewer */}
        <div className="mb-14">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 select-none cursor-ew-resize group"
          >
            {/* "AFTER" (Clean state) background */}
            <img
              src={b2bBusinessCenterImg}
              alt="После клининга: зеркальный пол и кристальный холл БЦ"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* "BEFORE" (Dirty / construction haze) overlay container with clip-path or width */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={b2bBusinessCenterImg}
                alt="До клининга: строительная пыль и помутнение"
                className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-75 brightness-75 blur-[0.6px] pointer-events-none max-w-none"
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
                referrerPolicy="no-referrer"
              />
              {/* Added grime/haze overlay simulating post-construction dust */}
              <div className="absolute inset-0 bg-stone-900/60 backdrop-sepia-[0.3]" />
              
              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-neutral-950/85 backdrop-blur-md border border-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-wider font-mono">
                ДО УБОРКИ: Строительная пыль и цементный налет
              </div>
            </div>

            {/* "AFTER" Badge */}
            <div className="absolute top-5 right-5 px-3 py-1.5 rounded-lg bg-emerald-500/90 text-neutral-950 text-xs font-extrabold uppercase tracking-wider font-mono shadow-md">
              ПОСЛЕ: Финишный зеркальный блеск
            </div>

            {/* Draggable Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Circular Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-neutral-950 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold font-mono">
                ⟷
              </div>
            </div>

            {/* Floating details at bottom */}
            <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 p-4 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 text-white max-w-md shadow-2xl pointer-events-none">
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  Объект: Атриум БЦ «Южный Пассаж»
                </span>
                <span className="text-xs text-neutral-400 font-mono tabular-nums">3 800 м²</span>
              </div>
              <p className="text-xs text-neutral-300 leading-snug">
                Глубокая роторная чистка полированного гранита, обеспыливание 4-ярусных стеклянных ограждений и витражей на высоте 18 метров.
              </p>
            </div>
          </div>
        </div>

        {/* 2 Detailed Case Cards with Real Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Case 1: Logistics Warehouse */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-colors">
            <div className="relative h-64 overflow-hidden bg-neutral-900">
              <img
                src={caseWarehouseImg}
                alt="Логистический комплекс после промышленного обеспыливания"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-xs text-white font-mono font-medium">
                Складской комплекс · 8 400 м²
              </div>
              <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-emerald-500/90 text-neutral-950 text-xs font-bold font-mono">
                Сдано за 1 смену
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ростовская область, г. Аксай</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Глубокая размывка топпинговых полов и обеспыливание ферм
                </h3>
                
                <div className="space-y-2 text-xs text-neutral-300 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-neutral-500 font-semibold min-w-16">Задача:</span>
                    <span>Подготовка терминала класса «А» к приемке федеральным ритейлером. Удаление следов резины от погрузчиков, строительной пыли со стеллажей.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-semibold min-w-16">Итог:</span>
                    <span>Задействовано 4 райдера Taski, бригада из 12 человек. Объект сдан с первого раза без замечаний аудитора.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">Смета по договору: фиксированная</span>
                <button
                  onClick={onOpenProposal}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Заказать подобный расчет</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Case 2: Luxury Residence */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-colors">
            <div className="relative h-64 overflow-hidden bg-neutral-900">
              <img
                src={caseLuxuryResidenceImg}
                alt="Пентхаус в Ростове-на-Дону после генеральной уборки"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-xs text-white font-mono font-medium">
                Пентхаус в ЖК «Чехов» · 260 м²
              </div>
              <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-emerald-500/90 text-neutral-950 text-xs font-bold font-mono">
                100% NDA
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>г. Ростов-на-Дону, Кировский район</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Послеремонтный клининг интерьеров с натуральным мрамором
                </h3>
                
                <div className="space-y-2 text-xs text-neutral-300 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-neutral-500 font-semibold min-w-16">Задача:</span>
                    <span>Деликатная очистка белого итальянского мрамора Calacatta, паркета из массива дуба, панорамных окон 3.6 м высотой без абразивов.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-semibold min-w-16">Итог:</span>
                    <span>Использована pH-нейтральная химия Kiehl, парогенераторы Menikini. Подписан постоянный контракт на абонентский уход.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">Гарантия сохранности покрытий</span>
                <button
                  onClick={onOpenProposal}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Заказать клининг премиум-жилья</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
