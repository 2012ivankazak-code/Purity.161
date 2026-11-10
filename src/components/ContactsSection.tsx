import React, { useState } from 'react';
import { Phone, MessageSquare, Send, MapPin, Clock, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { LeadSubmissionPayload } from '../types';

interface ContactsSectionProps {
  onSubmitLead: (lead: LeadSubmissionPayload) => Promise<boolean>;
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ onSubmitLead }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Пожалуйста, укажите имя и контактный телефон.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const ok = await onSubmitLead({
        name: name.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        comment: comment.trim() || undefined,
        segment: company.trim() ? 'b2b' : 'b2c',
        source: 'Контакты — Форма обратной связи',
      });

      if (ok) {
        setIsSuccess(true);
        setName('');
        setPhone('');
        setCompany('');
        setComment('');
      } else {
        setErrorMsg('Не удалось отправить заявку. Пожалуйста, позвоните нам напрямую.');
      }
    } catch (err) {
      setErrorMsg('Ошибка соединения. Пожалуйста, позвоните по телефону +7 (863) 309-16-16.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                Прямая связь
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                Контакты и офис в Ростове-на-Дону
              </h2>
              <p className="text-neutral-400 text-sm mt-3">
                Работаем 24/7 без выходных. Оперативно направляем дежурного инженера-технолога для замера и расчета сметы по всей Ростовской области.
              </p>
            </div>

            {/* Contacts Cards */}
            <div className="space-y-4">
              {/* Phone 1 */}
              <a
                href="tel:+78633091616"
                className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Многоканальный офис (круглосуточно)</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums">
                    +7 (863) 309-16-16
                  </div>
                </div>
              </a>

              {/* Direct messengers buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://t.me/chistota161_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-sky-500/40 hover:bg-neutral-850 text-white text-xs font-semibold transition-all group"
                >
                  <Send className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>Telegram</span>
                </a>

                <a
                  href="https://wa.me/79001610011?text=Здравствуйте!%20Хочу%20рассчитать%20стоимость%20клининга%20в%20Чистота.161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/40 hover:bg-neutral-850 text-white text-xs font-semibold transition-all group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Address & Meta details */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Центральный офис:</span>
                    <span>344006, г. Ростов-на-Дону, ул. Большая Садовая, 103, БЦ «Садовая Plaza», офис 412</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Режим работы:</span>
                    <span>Прием заявок 24/7, ночные выездные смены без перерывов</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Корпоративная почта:</span>
                    <a href="mailto:b2b@chistota161.ru" className="text-emerald-400 hover:underline">
                      b2b@chistota161.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block mb-1">
                Экспресс-заявка
              </span>
              <h3 className="text-xl font-bold text-white">
                Заказать бесплатный выезд инженера и расчет сметы
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Инженер приедет с лазерным дальномером, образцами химии и составит фиксированную спецификацию.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Заявка успешно принята!</h4>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Уведомление отправлено в Telegram дежурному супервайзеру. Мы перезвоним вам в течение 10 минут для согласования удобного времени замера.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer transition-colors"
                >
                  Отправить еще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Ваше имя <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Александрович"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Телефон для связи <span className="text-emerald-400">*</span>
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
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Название компании или объект (опционально)
                  </label>
                  <input
                    type="text"
                    placeholder="ООO «РостовЛогистик», БЦ или Коттедж"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Опишите задачу или параметры объекта
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Например: Офис 450 м², требуется генеральная уборка после ремонта до конца недели."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-neutral-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <span>
                      {isSubmitting ? 'Отправка заявки...' : 'Вызвать инженера на бесплатный замер'}
                    </span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ. Конфиденциальность гарантируется.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
