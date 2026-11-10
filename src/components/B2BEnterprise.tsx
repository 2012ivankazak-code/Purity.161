import React from 'react';
import { UserCheck, Moon, FileSpreadsheet, ShieldAlert, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import b2bBusinessCenterImg from '../assets/images/b2b_business_center_1794330463420.jpg';

interface B2BEnterpriseProps {
  onOpenProposal: () => void;
  onOpenCallback: () => void;
}

export const B2BEnterprise: React.FC<B2BEnterpriseProps> = ({ onOpenProposal, onOpenCallback }) => {
  return (
    <section id="b2b" className="py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Корпоративный сектор
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Комплексный B2B-аутсорсинг чистоты для бизнеса
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Снимаем с управляющих БЦ, директоров по логистике и офис-менеджеров всю головную боль: от подбора персонала до обеспечения моющими средствами.
            </p>
          </div>

          <button
            onClick={onOpenProposal}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap self-start lg:self-auto cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Сформировать КП для руководства</span>
          </button>
        </div>

        {/* Feature Split with Modern Business Center Architectural Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Architectural Business Center Photo */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 relative min-h-[380px] group">
            <img
              src={b2bBusinessCenterImg}
              alt="Бизнес-центр премиум-класса в Ростове-на-Дону"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                Обслуживаемые локации
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Бизнес-центры и офисы класса A/B+
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Индивидуальные регламенты для представительских холлов, лифтовых шахт, атриумов и режимных кабинетов руководства.
              </p>
            </div>
          </div>

          {/* 4 Enterprise Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 mb-4">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Персональный менеджер 24/7
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  За вашим объектом закрепляется ведущий аккаунт-менеджер и полевой супервайзер. Любые внештатные вопросы решаются в течение 15 минут в едином чате.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] text-emerald-400 font-medium">
                Единое контактное лицо без автоответчиков
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 mb-4">
                  <Moon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Ночные и дежурные смены
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Мы работаем тогда, когда вам удобно. Ночной клининг позволяет сотрудникам вашего офиса или склада начинать рабочий день в идеально свежем помещении.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] text-emerald-400 font-medium">
                Бесшумное профессиональное оборудование
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 mb-4">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Прозрачный безналичный расчет
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Работа с НДС 20% или УСН. Полный пакет бухгалтерской отчетности: акты КС-2/КС-3, детальные реестры отработанных часов, счета-фактуры через Диадок/СБИС.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] text-emerald-400 font-medium">
                Возможность постоплаты по договору
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 mb-4">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Страхование на 10 000 000 ₽
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Гражданская ответственность компании застрахована в ведущей страховой компании РФ. Вы защищены от любых непредвиденных рисков и повреждений имущества.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] text-emerald-400 font-medium">
                Финансовые гарантии в договоре
              </div>
            </div>
          </div>
        </div>

        {/* Process of B2B partnership 4-step banner */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 lg:p-8">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Регламент взаимодействия
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
            Как мы начинаем работу с новым юридическим лицом
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center border border-emerald-500/30">
                  1
                </span>
                <span className="text-sm font-bold text-white">Выезд инженера</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Бесплатный осмотр объекта в течение 24 часов. Оценка площадей, типов покрытий и составление технической карты.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center border border-emerald-500/30">
                  2
                </span>
                <span className="text-sm font-bold text-white">Смета и КП</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Расчет нескольких вариантов обслуживания (эконом, стандарт, премиум) с фиксацией цен и графика выходов.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center border border-emerald-500/30">
                  3
                </span>
                <span className="text-sm font-bold text-white">Договор и NDA</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Согласование договора с вашей юридической службой, подписание соглашения о конфиденциальности и SLA.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center border border-emerald-500/30">
                  4
                </span>
                <span className="text-sm font-bold text-white">Старт и контроль</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Завоз техники и химии, инструктаж бригады, тестовый выход и постоянный аудит старшим супервайзером.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
