import React, { useState } from 'react';
import { X, Printer, Send, ShieldCheck, Check, Building2, Download, FileText } from 'lucide-react';
import { LeadSubmissionPayload } from '../types';
import { formatRubles } from '../utils/calculator';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (payload: LeadSubmissionPayload) => Promise<boolean>;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, onSubmitLead }) => {
  const [company, setCompany] = useState('');
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [objectType, setObjectType] = useState('Бизнес-центр / Офисный комплекс');
  const [area, setArea] = useState<number>(650);
  const [cleaningFrequency, setCleaningFrequency] = useState('Ежедневное комплексное обслуживание');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Commercial estimate formula
  const ratePerM2 = 65;
  const monthlyCost = Math.round(area * ratePerM2);
  const vatCost = Math.round(monthlyCost * 1.2);
  const proposalNumber = `КП-161/${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleSendProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !phone.trim()) {
      alert('Пожалуйста, укажите имя контактного лица и телефон.');
      return;
    }

    setIsSubmitting(true);
    try {
      const ok = await onSubmitLead({
        name: recipient.trim(),
        phone: phone.trim(),
        company: company.trim() || 'Юридическое лицо',
        email: email.trim() || undefined,
        segment: 'b2b',
        propertyType: objectType,
        cleaningType: cleaningFrequency,
        area: area,
        estimatedTotal: monthlyCost,
        comment: `Запрос официального коммерческого предложения ${proposalNumber}`,
        source: 'Генератор коммерческого предложения (КП)',
      });

      if (ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 id="proposal-modal-title" className="text-sm font-bold text-white">
                Интерактивный генератор коммерческого предложения (КП)
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                Документ {proposalNumber} от {currentDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-200 transition-colors cursor-pointer"
              title="Печать или сохранение в PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Печать / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable body with two panels: configuration & preview */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-neutral-900">
          {/* Left Config Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4 bg-neutral-950/70 p-5 rounded-xl border border-neutral-800/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
              Параметры для КП
            </span>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Организация
              </label>
              <input
                type="text"
                placeholder="ООО «Ростов-Девелопмент»"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Контактное лицо <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Алексей Николаевич"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Телефон <span className="text-emerald-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+7 (999) 000-00-00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="office@rostov-dev.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Площадь объекта (м²)
              </label>
              <input
                type="number"
                min={50}
                max={50000}
                value={area}
                onChange={(e) => setArea(Number(e.target.value) || 50)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-400 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Формат обслуживания
              </label>
              <select
                value={cleaningFrequency}
                onChange={(e) => setCleaningFrequency(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Ежедневное комплексное обслуживание">Ежедневный клининг (утро/ночь)</option>
                <option value="Генеральная уборка раз в квартал">Генеральная глубокая уборка</option>
                <option value="Послеремонтный клининг под ключ">После ремонта и строительства</option>
                <option value="Выделенный постоянный персонал (аутстаффинг)">Выделенные клинеры в штат</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSendProposal}
                disabled={isSubmitting || isSubmitted}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-neutral-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>КП отправлено в Telegram</span>
                  </>
                ) : isSubmitting ? (
                  <span>Отправка КП...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Зафиксировать и отправить</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Formal Proposal Document Simulation (8 cols) */}
          <div className="lg:col-span-8 bg-neutral-950 p-6 sm:p-8 rounded-xl border border-neutral-800 text-neutral-200 font-sans shadow-inner">
            {/* Proposal Formal Letterhead */}
            <div className="border-b border-neutral-800 pb-5 mb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="text-base font-extrabold text-white tracking-tight font-display">
                  ООО «Чистота.161»
                </div>
                <div className="text-[11px] text-neutral-400 leading-tight mt-0.5">
                  Профессиональный клининг коммерческой и элитной недвижимости<br />
                  ИНН 6164319842 · ОГРН 1186196024810 · г. Ростов-на-Дону
                </div>
              </div>

              <div className="text-left sm:text-right text-[11px] text-neutral-400 font-mono">
                <div>Рег. № {proposalNumber}</div>
                <div>Дата: {currentDate}</div>
                <div className="text-emerald-400 font-medium">Срок действия: 30 дней</div>
              </div>
            </div>

            {/* Recipient Addressee Block */}
            <div className="mb-5 text-xs bg-neutral-900/50 p-3.5 rounded-lg border border-neutral-800/80">
              <span className="text-neutral-400 block text-[10px] uppercase tracking-wider font-mono">
                Кому:
              </span>
              <div className="font-semibold text-white">
                {company || 'Руководству компании'}
              </div>
              <div className="text-neutral-300">
                Вниманию: {recipient || 'Уполномоченного представителя заказчика'} {phone ? `(${phone})` : ''}
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-3 mb-6 text-xs text-neutral-300 leading-relaxed">
              <p>
                Уважаемый(ая) <strong className="text-white">{recipient || 'партнер'}</strong>!
              </p>
              <p>
                Клининговая компания «Чистота.161» предлагает комплексное профессиональное обслуживание объекта площадью <strong className="text-emerald-400 font-mono tabular-nums">{area} м²</strong> в формате «{cleaningFrequency}».
              </p>
            </div>

            {/* Scope of works table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px] font-mono">
                    <th className="py-2 pr-2">№</th>
                    <th className="py-2 px-2">Услуга / Регламент</th>
                    <th className="py-2 px-2">Ед. изм.</th>
                    <th className="py-2 pl-2 text-right">Стоимость</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-xs">
                  <tr>
                    <td className="py-2.5 pr-2 text-neutral-500 font-mono">01</td>
                    <td className="py-2.5 px-2 font-medium text-white">
                      Комплексный клининг объекта ({objectType})
                      <div className="text-[11px] text-neutral-400">
                        Включая технологическую карту, химию Kiehl и парк техники Kärcher/Cleanfix
                      </div>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-neutral-400">{area} м²</td>
                    <td className="py-2.5 pl-2 text-right font-mono tabular-nums text-white">
                      {formatRubles(monthlyCost)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-2 text-neutral-500 font-mono">02</td>
                    <td className="py-2.5 px-2 font-medium text-white">
                      Персональный супервайзер и аудит качества
                      <div className="text-[11px] text-neutral-400">
                        Контроль по чек-листу, регламент доступа, ведение журнала работ
                      </div>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-neutral-400">Включено</td>
                    <td className="py-2.5 pl-2 text-right font-mono text-emerald-400">
                      0 ₽ (Бесплатно)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-2 text-neutral-500 font-mono">03</td>
                    <td className="py-2.5 px-2 font-medium text-white">
                      Страхование ответственности
                      <div className="text-[11px] text-neutral-400">
                        Покрытие рисков повреждения имущества на 10 000 000 ₽
                      </div>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-neutral-400">Полис</td>
                    <td className="py-2.5 pl-2 text-right font-mono text-emerald-400">
                      Включено в договор
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Row */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs mb-5">
              <div>
                <span className="text-neutral-400 text-[11px] block">Итого ориентировочный бюджет:</span>
                <span className="text-xs text-neutral-400 font-mono">С НДС 20%: {formatRubles(vatCost)}</span>
              </div>
              <div className="text-xl font-extrabold text-white font-mono tabular-nums">
                {formatRubles(monthlyCost)}
              </div>
            </div>

            {/* Signature & Seal representation */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Фиксация сметы по договору · Гарантия по NDA</span>
              </div>
              <div className="font-mono text-[11px] text-neutral-500">
                ООО «Чистота.161»
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
