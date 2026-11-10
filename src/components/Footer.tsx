import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800 pb-20 md:pb-12 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-display">
                Чистота<span className="text-emerald-400">.161</span>
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed text-xs max-w-sm">
              Профессиональный клининг коммерческой и премиальной недвижимости в Ростове-на-Дону и области. Официальный договор с НДС, строгое соблюдение NDA, немецкая химия и оборудование.
            </p>

            <div className="text-[11px] text-neutral-400 space-y-1 font-mono">
              <div>ООО «Чистота.161» · ОГРН 1186196024810</div>
              <div>ИНН 6164319842 · КПП 616401001</div>
            </div>
          </div>

          {/* Col 2: Services Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Услуги
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Клининг бизнес-центров и офисов
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Уборка складов и логистических парков
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Клининг производственных помещений
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Уборка после ремонта и строительства
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Генеральная уборка премиум-квартир
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Клининг загородных резиденций
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: B2B Standards (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Стандарты
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#b2b" className="hover:text-emerald-400 transition-colors">
                  Работа по NDA
                </a>
              </li>
              <li>
                <a href="#b2b" className="hover:text-emerald-400 transition-colors">
                  Безналичный расчет с НДС
                </a>
              </li>
              <li>
                <a href="#b2b" className="hover:text-emerald-400 transition-colors">
                  ЭДО Диадок и СБИС
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-emerald-400 transition-colors">
                  Чек-лист из 85 пунктов
                </a>
              </li>
              <li>
                <a href="#b2b" className="hover:text-emerald-400 transition-colors">
                  Страхование 10 млн ₽
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Direct Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Связь с нами
            </div>
            <div className="space-y-2 text-xs">
              <a href="tel:+78633091616" className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono tabular-nums">+7 (863) 309-16-16</span>
              </a>

              <a href="mailto:b2b@chistota161.ru" className="flex items-center gap-2 text-neutral-300 hover:text-emerald-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>b2b@chistota161.ru</span>
              </a>

              <div className="flex items-start gap-2 text-neutral-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>г. Ростов-на-Дону, ул. Большая Садовая, 103, БЦ «Садовая Plaza»</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © 2018–{new Date().getFullYear()} ООО «Чистота.161». Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Политика конфиденциальности</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Пользовательское соглашение</span>
            <span aria-hidden="true">·</span>
            <span>ГОСТ Р 51870-2014</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
