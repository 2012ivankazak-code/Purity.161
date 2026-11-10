import React from 'react';
import { ArrowRight, FileText, CheckCircle2, Shield, Lock, Award, Clock } from 'lucide-react';

interface HeroProps {
  onOpenProposal: () => void;
  onOpenCallback: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProposal, onOpenCallback }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-800 bg-neutral-950">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Offer & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed editorial kicker with subtle separators */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-emerald-400 mb-4 tracking-wider uppercase">
              <span>Ростов-на-Дону и область</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>B2B & Премиум B2C</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>С 2018 года</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.12] mb-6 [text-wrap:balance]">
              Профессиональный клининг для бизнеса и премиальной недвижимости.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                С гарантией конфиденциальности.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Обслуживание бизнес-центров класса A/B+, складов, производств и элитных загородных резиденций. 
              Работа по строгому NDA, официальный договор с НДС и фиксированная смета без скрытых доплат.
            </p>

            {/* Primary & Secondary Action Block */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Рассчитать стоимость</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenProposal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 active:scale-[0.98] rounded-xl transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Получить коммерческое предложение</span>
              </button>
            </div>

            {/* Key trust bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Соглашение о неразглашении (NDA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Безналичный расчет с НДС / без НДС</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Страхование ответственности до 10 млн ₽</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Branded Specialist Photography */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-full min-h-[460px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_cleaning_specialist_1794330461905.jpg"
                alt="Специалист клининговой компании Чистота.161 в фирменной форме"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Subtle gradient overlay at bottom for legible badge context */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* Informational verified badge inside photography */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 text-white shadow-xl">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                      Штатный персонал
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">Проверено СБ</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Все клинеры официально трудоустроены, имеют медкнижки, гражданство РФ и проходят строгий инструктаж по безопасности.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-metric strip below Hero */}
        <div className="mt-14 pt-8 border-t border-neutral-800/90 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              8 лет
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 mt-1">
              Безупречной работы на рынке Ростова и РО
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums tracking-tight">
              2 700+
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 mt-1">
              Успешно сданных объектов без замечаний
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              100%
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 mt-1">
              Конфиденциальность и работа по NDA
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              0 ₽
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 mt-1">
              Скрытых доплат: фиксируем смету в договоре
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
