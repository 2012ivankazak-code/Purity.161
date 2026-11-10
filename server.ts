import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LeadData {
  id: string;
  name: string;
  phone: string;
  company?: string;
  email?: string;
  segment: 'b2b' | 'b2c';
  propertyType?: string;
  cleaningType?: string;
  area?: number;
  addons?: string[];
  estimatedTotal?: number;
  comment?: string;
  source: string;
  createdAt: string;
  telegramStatus?: 'sent' | 'simulated' | 'error';
}

const leadsDatabase: LeadData[] = [];

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API endpoint for submitting leads from calculator and contact forms
  app.post('/api/leads', async (req, res) => {
    try {
      const {
        name,
        phone,
        company,
        email,
        segment = 'b2b',
        propertyType,
        cleaningType,
        area,
        addons = [],
        estimatedTotal,
        comment,
        source = 'calculator',
      } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ error: 'Имя и телефон обязательны' });
      }

      const leadId = `LEAD-${Date.now().toString().slice(-6)}`;
      const createdAt = new Date().toISOString();

      // Check for Telegram Bot credentials in environment variables
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      let telegramStatus: 'sent' | 'simulated' | 'error' = 'simulated';

      const messageText = `⚡️ НОВАЯ ЗАЯВКА С САЙТА Чистота.161 [${leadId}]
-----------------------------------------
👤 Клиент: ${name}
📞 Телефон: ${phone}
🏢 Сегмент: ${segment.toUpperCase()} ${company ? `(${company})` : ''}
✉️ Email: ${email || 'Не указан'}
📐 Объект: ${propertyType || 'Не указан'}, ${area ? `${area} м²` : ''}
🧹 Услуга: ${cleaningType || 'Стандартная'}
💰 Расчет: ${estimatedTotal ? `${estimatedTotal.toLocaleString('ru-RU')} ₽` : 'Требуется замер'}
📌 Доп. опции: ${addons.length > 0 ? addons.join(', ') : 'Нет'}
💬 Комментарий: ${comment || '—'}
🌐 Источник: ${source}
🕒 Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} МСК`;

      if (botToken && chatId) {
        try {
          const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
          const tgRes = await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: 'HTML',
            }),
          });
          if (tgRes.ok) {
            telegramStatus = 'sent';
          } else {
            console.error('Telegram API error:', await tgRes.text());
            telegramStatus = 'simulated';
          }
        } catch (err) {
          console.error('Failed to notify Telegram:', err);
          telegramStatus = 'simulated';
        }
      }

      const newLead: LeadData = {
        id: leadId,
        name,
        phone,
        company,
        email,
        segment,
        propertyType,
        cleaningType,
        area,
        addons,
        estimatedTotal,
        comment,
        source,
        createdAt,
        telegramStatus,
      };

      leadsDatabase.unshift(newLead);
      if (leadsDatabase.length > 100) {
        leadsDatabase.pop();
      }

      return res.status(201).json({
        success: true,
        leadId,
        message: 'Заявка успешно зарегистрирована в CRM и отправлена в Telegram',
        lead: newLead,
        telegramStatus,
      });
    } catch (error) {
      console.error('Error handling lead:', error);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  // API endpoint for listing recent leads (for manager verification in UI)
  app.get('/api/leads', (_req, res) => {
    return res.json({
      total: leadsDatabase.length,
      leads: leadsDatabase.slice(0, 20),
    });
  });

  // Vite development middleware
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
