import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Shield, FileText } from 'lucide-react';
import { LeadSubmissionPayload } from '../types';
import { formatRubles } from '../utils/calculator';

interface CrmLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (payload: LeadSubmissionPayload) => Promise<boolean>;
  prefillData?: {
    segment?: 'b2b' | 'b2c';
    propertyType?: string;
    cleaningType?: string;
    area?: number;
    addons?: string[];
    totalPrice?: number;
    priceWithVat?: number;
    recommendedCleaners?: number;
    estimatedHours?: number;
  } | null;
}

export const CrmLeadModal: React.FC<CrmLeadModalProps> = ({
  isOpen,
  onClose,
  onSubmitLead,
  prefillData,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [assignedLeadId, setAssignedLeadId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Пожалуйста, заполните обязательные поля: имя и телефон.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const ok = await onSubmitLead({
        name: name.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        email: email.trim() || undefined,
        comment: comment.trim() || undefined,
        segment: prefillData?.segment || (company.trim() ? 'b2b' : 'b2c'),
        propertyType: prefillData?.propertyType,
        cleaningType: prefillData?.cleaningType,
        area: prefillData?.area,
        addons: prefillData?.addons,
        estimatedTotal: prefillData?.totalPrice,
        source: prefillData ? 'Калькулятор сметы (Фиксация расчета)' : 'Модальное окно обратного звонка',
      });

      if (ok) {
        setIsSuccess(true);
        setAssignedLeadId(`RU-${Math.floor(100000 + Math.random() * 900000)}`);
      } else {
        setErrorMsg('Ошибка при регистрации заявки. Попробуйте еще раз или позвоните нам.');
      }
    } catch (err) {
      setErrorMsg('Не удалось связаться с сервером. Пожалуйста, позвоните нам.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setCompany('');
    setEmail('');
    setComment('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Закрыть окно"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Расчет зафиксирован в CRM!</h3>
              <p className="text-xs font-mono text-emerald-400">Номер заявки: {assignedLeadId}</p>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
              Заявка автоматически передана дежурному инженеру-технологу в Telegram. Мы свяжемся с вами в течение 10 минут для подтверждения параметров и выезда.
            </p>

            {prefillData && prefillData.totalPrice && (
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Объект:</span>
                  <span className="text-white font-medium">{prefillData.propertyType}, {prefillData.area} м²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Услуга:</span>
                  <span className="text-white font-medium">{prefillData.cleaningType}</span>
                </div>
                <div className="flex justify-between font-bold pt-1 border-t border-neutral-800">
                  <span className="text-neutral-300">Зафиксированная сумма:</span>
                  <span className="text-emerald-400 font-mono tabular-nums">{formatRubles(prefillData.totalPrice)}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleClose}
              className="w-full py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-bold transition-all cursor-pointer"
            >
              Закрыть окно
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Фиксация сметы и условий</span>
              </div>
              <h3 id="crm-modal-title" className="text-xl font-bold text-white">
                {prefillData ? 'Зафиксировать расчет стоимости' : 'Заказать обратный звонок'}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {prefillData
                  ? 'Закрепим рассчитанную ставку за вашим объектом и согласуем бесплатный замер инженера.'
                  : 'Оставьте контакты, и дежурный специалист перезвонит вам в течение 10 минут.'}
              </p>
            </div>

            {/* Prefill quick summary badge if came from calculator */}
            {prefillData && prefillData.totalPrice && (
              <div className="p-3 mb-5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="text-neutral-400">{prefillData.propertyType} · {prefillData.area} м²</div>
                  <div className="text-[11px] text-neutral-500">{prefillData.cleaningType}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-400">Смета</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                    {formatRubles(prefillData.totalPrice)}
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Имя и отчество <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Константин Викторович"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
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
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Организация / Компания
                  </label>
                  <input
                    type="text"
                    placeholder="ООО «РостовСити»"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email для сметы
                  </label>
                  <input
                    type="email"
                    placeholder="director@company.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Пожелания к выезду инженера
                </label>
                <textarea
                  rows={2}
                  placeholder="Удобное время звонка, пропускной режим, детали объекта..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-neutral-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  {isSubmitting ? 'Регистрация заявки...' : 'Зафиксировать условия и вызвать замерщика'}
                </button>
              </div>

              <p className="text-[10px] text-neutral-500 text-center leading-normal">
                Защита по Федеральному закону № 152-ФЗ. Информация не передается третьим лицам.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
