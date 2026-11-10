import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenProposal: () => void;
  onOpenCallback: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProposal, onOpenCallback }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single clean text element) */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-display">
              Чистота<span className="text-emerald-400">.161</span>
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean text nav links */}
          <nav
            aria-label="Основная навигация"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300"
          >
            <a
              href="#services"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Услуги
            </a>
            <a
              href="#b2b"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Для бизнеса
            </a>
            <a
              href="#calculator"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Калькулятор
            </a>
            <a
              href="#cases"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Кейсы
            </a>
            <a
              href="#contacts"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Контакты
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Phone contact */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:+78633091616"
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-neutral-200 hover:text-emerald-400 transition-colors py-1.5 px-3 rounded-lg hover:bg-neutral-900 border border-transparent hover:border-neutral-800"
              title="Позвонить в офис Ростов-на-Дону"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono tabular-nums">+7 (863) 309-16-16</span>
            </a>

            <button
              onClick={onOpenProposal}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] rounded-lg transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Получить КП
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drop-down nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-neutral-200">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-emerald-400 transition-colors"
            >
              Услуги клининга
            </a>
            <a
              href="#b2b"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-emerald-400 transition-colors"
            >
              Для юридических лиц (B2B)
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-emerald-400 transition-colors"
            >
              Интерактивный калькулятор
            </a>
            <a
              href="#cases"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-emerald-400 transition-colors"
            >
              Кейсы и объекты
            </a>
            <a
              href="#contacts"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-emerald-400 transition-colors"
            >
              Контакты и реквизиты
            </a>
          </nav>

          <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-2">
            <a
              href="tel:+78633091616"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-900 border border-neutral-800 text-sm font-medium text-white"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="font-mono tabular-nums">+7 (863) 309-16-16</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallback();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-sm font-semibold hover:bg-emerald-400/20 transition-colors"
            >
              Заказать обратный звонок
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
