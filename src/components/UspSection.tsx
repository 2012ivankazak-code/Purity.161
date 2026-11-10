import React from 'react';
import { ShieldCheck, FileCheck, Calculator, History, CheckCircle, Scale, FileText } from 'lucide-react';

interface UspSectionProps {
  onOpenProposal: () => void;
}

export const UspSection: React.FC<UspSectionProps> = ({ onOpenProposal }) => {
  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Стандарты и гарантии
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Почему корпоративные клиенты и владельцы премиальной недвижимости доверяют нам
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Мы понимаем ценность безопасности, времени и репутации. Каждый процесс регламентирован и юридически защищен.
          </p>
        </div>

        {/* 4 Core Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Pillar 1: Confidentiality & NDA (Large Col-span 7) */}
          <div className="lg:col-span-7 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                  БЕЗОПАСНОСТЬ 100%
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Полная конфиденциальность и официальный NDA
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                При работе в головных офисах банков, IT-компаний, закрытых складах и частных резиденциях мы подписываем соглашение о неразглашении конфиденциальной информации с четкими финансовыми гарантиями.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300 mb-6">
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                  <div className="font-semibold text-white mb-1">Проверка СБ</div>
                  Каждый клинер проходит проверку по базам МВД и службы безопасности перед выходом на объект.
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                  <div className="font-semibold text-white mb-1">Запрет на фото/видео</div>
                  Персонал оставляет смартфоны в сейф-боксах либо камеры заклеиваются номерными пломбами.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Юридическая ответственность ООО «Чистота.161»</span>
              <span className="text-emerald-400 font-medium">Штраф за утечку до 5 000 000 ₽</span>
            </div>
          </div>

          {/* Pillar 2: Fixed Estimate (Col-span 5) */}
          <div className="lg:col-span-5 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">
                  ФИКСИРОВАННАЯ ЦЕНА
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Смета не меняется в процессе работ
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Сумма, зафиксированная в договоре и приложении со спецификацией, является окончательной. Никаких «дополнительных часов», «сложных пятен» или скрытых наценок постфактум.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Бесплатный выезд технолога для точного замера</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Детализация расходов на химию и амортизацию</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Оплата только после подписания акта сдачи-приемки</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
              <span>Чек-лист приемки</span>
              <span className="text-white font-medium">85 контролируемых точек</span>
            </div>
          </div>

          {/* Pillar 3: Official B2B Contracts & EDMS (Col-span 5) */}
          <div className="lg:col-span-5 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">
                  ДОКУМЕНТООБОРОТ
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Официальный договор и закрывающие документы
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                Работаем по безналичному расчету с НДС 20% и без НДС. Моментальный обмен актами и УПД через Диадок, СБИС или курьерской доставкой день в день.
              </p>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5 text-xs text-neutral-300 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Электронный документооборот:</span>
                  <span className="text-white font-medium">Диадок, СБИС, 1С-ЭДО</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Налоговый режим:</span>
                  <span className="text-white font-medium">ОСНО с НДС / УСН</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Сроки закрытия актов:</span>
                  <span className="text-emerald-400 font-medium">В течение 24 часов</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenProposal}
              className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Запросить типовой контракт и реквизиты</span>
            </button>
          </div>

          {/* Pillar 4: 8 Years on Market & Experience (Col-span 7) */}
          <div className="lg:col-span-7 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <History className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                  ОПЫТ 2018–2026
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                8 лет на рынке и 2 700+ реализованных объектов
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Мы начинали с обслуживания локальных офисов в центре Ростова, а сегодня управляем чистотой крупнейших индустриальных парков, логистических хабов ЮФО и престижных жилых комплексов.
              </p>

              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    45 000+
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">м² убираем ежедневно</div>
                </div>

                <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    98.4%
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">клиентов продлевают договор</div>
                </div>

                <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    14 мин
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">среднее время ответа техподдержки</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Собственный парк техники</span>
              <span className="text-neutral-300">Cleanfix, Taski, Unger, Kärcher</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
