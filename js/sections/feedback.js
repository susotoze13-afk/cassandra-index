// Секция «Обратная связь» (регистрируется как 'feedback' в render.js): форма
// пожелания/замечания/вопроса с отправкой через FormSubmit AJAX на почту
// владельца. Антиспам многослойный и чисто тестируемый (без DOM):
// honeypotCheck / timingCheck / rateLimit / originAllowed / timingToken /
// validateFeedback. Ловушки (honeypot, время, rate-limit, origin, подделка
// токена) не роняют форму — показывают фейковый успех и молча не отправляют.
// Ограничение честное: инфраструктурный DDoS статического сайта на GitHub
// Pages клиентским кодом не закрывается — закрывается только злоупотребление
// самой формой; флод отправок режется rate-limit'ом с бэкоффом.
// DOM собирается только через el() (createElement + textContent), ввод
// пользователя нигде не отображается обратно в DOM.

import { t } from '../i18n.js';
import { el } from '../ui.js';

// Белый список тем и лимиты — константы модуля (единственный источник).
export const FEEDBACK_TOPICS = ['wish', 'remark', 'question'];
export const MIN_MESSAGE = 5;
export const MAX_MESSAGE = 4000;
export const TIMING_MIN_MS = 2000;
// Бэкофф повторных отправок: 1-я сразу, далее 30 с → 120 с → 300 с (4+ ждут 300 с).
export const RATE_LIMIT_STEPS_MS = [30000, 120000, 300000];

// Имена honeypot-полей — намеренно нестандартные (НЕ 'honeypot'/'email_confirm'):
// легитимный пользователь их не видит и не заполняет.
export const HONEYPOT_FIELDS = ['contact_me', 'company_site', 'site_url'];

// Транспорт — единственное место адреса в модуле (внешний HTTPS, ок с file://).
const ENDPOINT = 'https://formsubmit.co/ajax/Zasik2008@yandex.ru';
// Статический сайт: отправка только со своего origin; 'null' — file:// в браузере.
const ALLOWED_ORIGINS = ['https://cassindex.ru', 'https://www.cassindex.ru', 'null', null];

// Соль токена времени — строка в коде модуля, секретов в репозитории нет
// (токен — от простой подмены скрытого поля, не от целенаправленного обхода).
const TOKEN_SALT = 'ci-feedback-token-v1';

// Состояние rate-limit — в памяти сессии модуля (localStorage не трогаем).
const rateState = { attempts: [] };

// --- Чистые швы (без DOM, покрыты tests/feedback.test.js) ---

// Бот, заполнивший любое скрытое поле. formData — FormData или plain object.
export function honeypotCheck(formData) {
  for (const name of HONEYPOT_FIELDS) {
    const value = typeof formData?.get === 'function' ? formData.get(name) : formData?.[name];
    if (typeof value === 'string' && value !== '') return true;
  }
  return false;
}

// Ловушка времени: заполнение быстрее TIMING_MIN_MS — бот.
export function timingCheck(ms) {
  return Number.isFinite(ms) && ms >= TIMING_MIN_MS;
}

// Rate-limit повторных отправок: state {attempts:[timestamps ms]} — моменты
// успешных отправок. now прокидывается снаружи для детерминизма тестов.
// Первая отправка (attempts пуст) — сразу; далее бэкофф по RATE_LIMIT_STEPS_MS,
// шаг не выше последнего. retryAfterMs — сколько ждать от now (0 если можно).
export function rateLimit(state, now = Date.now()) {
  const attempts = Array.isArray(state?.attempts) ? state.attempts : [];
  if (attempts.length === 0) return { allowed: true, retryAfterMs: 0 };
  const wait = RATE_LIMIT_STEPS_MS[Math.min(attempts.length - 1, RATE_LIMIT_STEPS_MS.length - 1)];
  const last = attempts[attempts.length - 1];
  const retryAfterMs = Math.max(0, last + wait - now);
  return { allowed: retryAfterMs === 0, retryAfterMs };
}

// Отправка только со своего origin (список — константа модуля, шов — функция).
export function originAllowed(origin, allowedOrigins) {
  return Array.isArray(allowedOrigins) && allowedOrigins.includes(origin);
}

// Токен времени: форма показана в момент issuedAt; валиден, если с момента
// отрисовки прошло >= TIMING_MIN_MS (та же семантика, что у timingCheck).
export function timingToken(issuedAt, now) {
  return timingCheck(now - issuedAt);
}

// Валидация полей: message обязателен 5..4000 (по строке после trim), replyTo
// опционален, но если не пуст — строгий email; topic — из белого списка.
export function validateFeedback({ topic, message, replyTo } = {}) {
  const errors = {};
  if (!FEEDBACK_TOPICS.includes(topic)) errors.topic = 'topic';
  const text = typeof message === 'string' ? message.trim() : '';
  if (text.length < MIN_MESSAGE || text.length > MAX_MESSAGE) errors.message = 'length';
  if (replyTo !== undefined && replyTo !== null && String(replyTo).trim() !== '') {
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(String(replyTo).trim())) {
      errors.replyTo = 'email';
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

// --- Токен времени: подпись и проверка скрытого поля ---

function tokenHash(at) {
  const s = `${TOKEN_SALT}:${at}`;
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h + s.charCodeAt(i)) % 1000003;
  return String(h);
}

function issueToken(now) {
  return JSON.stringify({ at: now, sig: tokenHash(now) });
}

// Скрытое поле несёт {at, sig}; подделка не проходит: sig пересчитывается
// от at по соли модуля, а на прошедшее с отрисовки время действует timingToken.
function tokenValid(raw, now) {
  if (typeof raw !== 'string' || raw === '') return false;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return false;
  }
  if (typeof parsed?.at !== 'number' || parsed.sig !== tokenHash(parsed.at)) return false;
  return timingToken(parsed.at, now);
}

// --- DOM-рендер секции ---

function field(lang, { labelKey, input, hintKey = null, errorKey = null }) {
  const wrap = el('div', 'feedback-field');
  const id = `feedback-${input.name}`;
  input.id = id;
  const label = el('label', 'feedback-label', t(lang, labelKey));
  label.setAttribute('for', id);
  wrap.appendChild(label);
  wrap.appendChild(input);
  let hint = null;
  if (hintKey) {
    hint = el('p', 'feedback-hint', t(lang, hintKey));
    hint.id = `${id}-hint`;
    input.setAttribute('aria-describedby', hint.id);
    wrap.appendChild(hint);
  }
  let error = null;
  if (errorKey) {
    error = el('p', 'feedback-error');
    error.id = `${id}-error`;
    error.hidden = true;
    if (hint) input.setAttribute('aria-describedby', `${hint.id} ${error.id}`);
    else input.setAttribute('aria-describedby', error.id);
    wrap.appendChild(error);
  }
  return { wrap, input, error };
}

function honeypotNode(lang) {
  // Ловушки: visibility:hidden (не display:none — боты их всё равно «видят»),
  // из фокуса и автозаполнения, aria-hidden для скринридера.
  const wrap = el('div', 'feedback-hp');
  wrap.setAttribute('aria-hidden', 'true');
  for (const name of HONEYPOT_FIELDS) {
    const input = el('input', 'feedback-hp-input');
    input.type = 'text';
    input.name = name;
    input.tabIndex = -1;
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('aria-label', t(lang, 'feedback.hp.label'));
    wrap.appendChild(input);
  }
  return wrap;
}

// Одна отправка: сначала молчаливые ловушки (фейковый успех), затем валидация
// полей, затем fetch. Неудача fetch — честная ошибка, текст в поле сохранён.
async function send(form, ui, lang) {
  const { status, button } = ui;
  const setStatus = (key) => { status.textContent = t(lang, key); };
  const data = new FormData(form);
  button.disabled = true;
  setStatus('feedback.status.sending');
  try {
    const now = Date.now();
    const trapped = honeypotCheck(data)
      || !tokenValid(data.get('form_token'), now)
      || !rateLimit(rateState, now).allowed
      || !originAllowed(window.location.origin, ALLOWED_ORIGINS);
    if (trapped) {
      // Молчаливая нейтрализация: бот получает фейковый успех, отправки нет.
      setStatus('feedback.status.sent');
      form.reset();
      return;
    }
    const check = validateFeedback({
      topic: data.get('topic'),
      message: data.get('message'),
      replyTo: data.get('reply_to'),
    });
    if (!check.ok) {
      ui.messageError.hidden = !check.errors.message;
      if (check.errors.message) ui.messageError.textContent = t(lang, 'feedback.error.message');
      ui.messageInput.classList.toggle('feedback-input--error', Boolean(check.errors.message));
      ui.replyError.hidden = !check.errors.replyTo;
      if (check.errors.replyTo) ui.replyError.textContent = t(lang, 'feedback.error.replyTo');
      ui.replyInput.classList.toggle('feedback-input--error', Boolean(check.errors.replyTo));
      setStatus('feedback.status.invalid');
      return;
    }
    const topicLabel = t(lang, `feedback.topic.${data.get('topic')}`);
    const body = {
      _subject: t(lang, 'feedback.subject', { topic: topicLabel }),
      topic: data.get('topic'),
      message: data.get('message'),
    };
    if (String(data.get('reply_to') ?? '').trim() !== '') body.reply_to = data.get('reply_to');
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    rateState.attempts.push(Date.now());
    form.reset();
    form.querySelector('[name="form_token"]').value = issueToken(Date.now());
    setStatus('feedback.status.sent');
  } catch {
    // Сетевая ошибка / недоступность FormSubmit: текст сохранён в поле.
    setStatus('feedback.status.error');
  } finally {
    button.disabled = false;
  }
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="feedback"]');
  if (!host) return;
  const lang = appState.lang;
  host.textContent = '';

  const form = el('form', 'feedback-form');
  form.noValidate = true;

  const topicSelect = el('select', 'feedback-input');
  topicSelect.name = 'topic';
  for (const topic of FEEDBACK_TOPICS) {
    const option = el('option', '', t(lang, `feedback.topic.${topic}`));
    option.value = topic;
    topicSelect.appendChild(option);
  }
  form.appendChild(field(lang, { labelKey: 'feedback.topic.label', input: topicSelect }).wrap);

  const messageInput = el('textarea', 'feedback-input');
  messageInput.name = 'message';
  messageInput.maxLength = MAX_MESSAGE;
  messageInput.required = true;
  const message = field(lang, {
    labelKey: 'feedback.message.label',
    input: messageInput,
    hintKey: 'feedback.message.hint',
    errorKey: 'feedback.error.message',
  });
  form.appendChild(message.wrap);

  const replyInput = el('input', 'feedback-input');
  replyInput.type = 'email';
  replyInput.name = 'reply_to';
  replyInput.setAttribute('autocomplete', 'email');
  const reply = field(lang, {
    labelKey: 'feedback.reply.label',
    input: replyInput,
    errorKey: 'feedback.error.replyTo',
  });
  form.appendChild(reply.wrap);

  form.appendChild(honeypotNode(lang));

  const tokenInput = el('input');
  tokenInput.type = 'hidden';
  tokenInput.name = 'form_token';
  tokenInput.value = issueToken(Date.now());
  form.appendChild(tokenInput);

  const button = el('button', 'feedback-btn', t(lang, 'feedback.submit'));
  button.type = 'submit';
  form.appendChild(button);

  const status = el('p', 'feedback-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  form.appendChild(status);

  const ui = {
    status,
    button,
    messageInput,
    messageError: message.error,
    replyInput,
    replyError: reply.error,
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void send(form, ui, lang);
  });

  host.appendChild(form);
  // Раскрытие обработки данных — мелким текстом под формой (R05i).
  host.appendChild(el('p', 'feedback-note', t(lang, 'feedback.note')));
}
