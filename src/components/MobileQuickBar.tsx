import React from 'react';
import { Phone, MessageSquare, Send, Calculator } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenCallback: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenCallback }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2 flex items-center justify-around gap-2 shadow-2xl h-14">
      {/* 1. Direct Call */}
      <a
        href="tel:+78633091616"
        className="flex-1 flex flex-col items-center justify-center py-1 text-neutral-300 hover:text-emerald-400 active:text-emerald-300 transition-colors"
      >
        <Phone className="w-4 h-4 text-emerald-400 mb-0.5" />
        <span className="text-[10px] font-medium leading-none">Позвонить</span>
      </a>

      {/* 2. WhatsApp */}
      <a
        href="https://wa.me/79001610011?text=Здравствуйте!%20Хочу%20рассчитать%20стоимость%20клининга%20в%20Чистота.161"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1 text-neutral-300 hover:text-emerald-400 active:text-emerald-300 transition-colors"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
        <span className="text-[10px] font-medium leading-none">WhatsApp</span>
      </a>

      {/* 3. Telegram */}
      <a
        href="https://t.me/chistota161_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1 text-neutral-300 hover:text-sky-400 active:text-sky-300 transition-colors"
      >
        <Send className="w-4 h-4 text-sky-400 mb-0.5" />
        <span className="text-[10px] font-medium leading-none">Telegram</span>
      </a>

      {/* 4. Calculator Quick Scroll */}
      <a
        href="#calculator"
        className="flex-1 flex flex-col items-center justify-center py-1 text-neutral-300 hover:text-emerald-400 active:text-emerald-300 transition-colors"
      >
        <Calculator className="w-4 h-4 text-emerald-400 mb-0.5" />
        <span className="text-[10px] font-medium leading-none">Расчет сметы</span>
      </a>
    </div>
  );
};
