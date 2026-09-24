// js/bundle.js — СГЕНЕРИРОВАН build.js, не править вручную.
// Исходники: js/data.js, js/region.js, js/i18n.js, js/risk.js, js/ui.js, js/sections/hero.js, js/sections/drivers.js, js/sections/trend.js, js/sections/regions.js, js/sections/states.js, js/sections/history.js, js/sections/methodology.js, js/render.js, js/demo.js, js/app.js, js/share.js. Пересборка: node build.js
(function () {
'use strict';
const modules = {};
function __ci_require(name) {
  const m = modules[name];
  if (!m) throw new Error('CI module not found: ' + name);
  return m.exports;
}
const factories = [];
factories.push(["js/data.js", function (exports) {
// data.js — чтение снапшотов из window.CI_DATA (заполненного script-тегами, без fetch),
// указатель latest, схема validate. Битый/отсутствующий снапшот → «Model unavailable»
// в данных + событие ci:datastate, не падение.

const DATA_STATES = ['published', 'updating', 'delayed', 'insufficient', 'unavailable'];
const REGION_IDS = ['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa'];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const LEVELS = ['high', 'medium', 'low'];

function ciData() {
  const root = typeof window !== 'undefined' ? window : globalThis;
  return root.CI_DATA ?? null;
}

function emit(state, detail) {
  if (typeof document === 'undefined' || typeof CustomEvent === 'undefined') return;
  if (typeof document.dispatchEvent !== 'function') return;
  document.dispatchEvent(new CustomEvent('ci:datastate', { detail: { state, ...detail } }));
}

function unavailable(date, errors) {
  emit('unavailable', { date, errors });
  return {
    date: date ?? null,
    dataState: 'unavailable',
    unavailable: true,
    errors,
    global: null,
    regions: {},
    trend: [],
    drivers: [],
    sources: [],
  };
}

function latest() {
  return ciData()?.latest ?? null;
}

function listWeeks() {
  const d = ciData();
  if (!d || !d.snapshots) return [];
  return Object.keys(d.snapshots).sort();
}

// week(date?) — снапшот по дате (или latest); валидирует и отдаёт с date-меткой.
// Битый файл → синтетический снапшот { dataState: 'unavailable', unavailable: true, errors }.
function week(date) {
  const d = ciData();
  const key = date ?? d?.latest ?? null;
  if (!key || !d?.snapshots?.[key]) {
    return unavailable(key, key ? [`snapshot not found: ${key}`] : ['no CI_DATA']);
  }
  const v = validate(d.snapshots[key]);
  if (!v.ok) return unavailable(key, v.errors);
  return { ...d.snapshots[key], date: key };
}

function isIndex(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100;
}

function isDelta(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

function isLocalized(v) {
  return !!v && typeof v === 'object' && typeof v.ru === 'string' && typeof v.en === 'string';
}

function isSource(s) {
  return (
    !!s &&
    typeof s === 'object' &&
    isLocalized(s.title) &&
    typeof s.url === 'string' &&
    typeof s.domain === 'string' &&
    typeof s.date === 'string'
  );
}

// validate(snapshot) → { ok, errors[] }. Схема — контракт данных из interfaces.md.
function validate(snapshot) {
  const errors = [];
  if (!snapshot || typeof snapshot !== 'object') {
    return { ok: false, errors: ['snapshot is not an object'] };
  }
  if (typeof snapshot.published !== 'string' || !DATE_RE.test(snapshot.published)) {
    errors.push('published: required YYYY-MM-DD');
  }
  if (typeof snapshot.through !== 'string' || !DATE_RE.test(snapshot.through)) {
    errors.push('through: required YYYY-MM-DD');
  }
  if (typeof snapshot.methodology !== 'string' || !snapshot.methodology) {
    errors.push('methodology: required non-empty string');
  }
  if (!DATA_STATES.includes(snapshot.dataState)) {
    errors.push(`dataState: must be one of ${DATA_STATES.join(', ')}`);
  }
  if (!snapshot.global || !isIndex(snapshot.global.index) || !isDelta(snapshot.global.delta)) {
    errors.push('global: { index: 0..100, delta: number } required');
  }
  if (!snapshot.regions || typeof snapshot.regions !== 'object') {
    errors.push('regions: object required');
  } else {
    for (const id of REGION_IDS) {
      const r = snapshot.regions[id];
      if (!r || !isIndex(r.index) || !isDelta(r.delta)) {
        errors.push(`regions.${id}: { index: 0..100, delta: number } required`);
      }
    }
  }
  if (!Array.isArray(snapshot.trend) || snapshot.trend.length !== 12) {
    errors.push('trend: exactly 12 weekly points required');
  } else {
    snapshot.trend.forEach((p, i) => {
      if (!p || !DATE_RE.test(p.date ?? '') || !isIndex(p.value)) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required`);
      }
    });
  }
  if (!Array.isArray(snapshot.drivers) || snapshot.drivers.length !== 3) {
    errors.push('drivers: exactly 3 required');
  } else {
    snapshot.drivers.forEach((drv, i) => {
      const pfx = `drivers[${i}]`;
      if (!isLocalized(drv.observation)) errors.push(`${pfx}.observation: { ru, en } required`);
      if (!isLocalized(drv.why)) errors.push(`${pfx}.why: { ru, en } required`);
      if (!LEVELS.includes(drv.contribution)) errors.push(`${pfx}.contribution: high|medium|low`);
      if (!LEVELS.includes(drv.confidence)) errors.push(`${pfx}.confidence: high|medium|low`);
      if (drv.confidence === 'low' || drv.confidence === 'medium') {
        if (drv.confidenceNote !== undefined && !isLocalized(drv.confidenceNote)) {
          errors.push(`${pfx}.confidenceNote: { ru, en }`);
        }
      }
      if (!Array.isArray(drv.sources) || drv.sources.length < 2 || drv.sources.length > 5) {
        errors.push(`${pfx}.sources: 2..5 required`);
      } else if (!drv.sources.every(isSource)) {
        errors.push(`${pfx}.sources[]: { title:{ru,en}, url, domain, date }`);
      }
    });
  }
  if (!Array.isArray(snapshot.sources) || !snapshot.sources.every(isSource)) {
    errors.push('sources: array of { title:{ru,en}, url, domain, date }');
  }
  return { ok: errors.length === 0, errors };
}

exports["DATA_STATES"] = DATA_STATES;
exports["REGION_IDS"] = REGION_IDS;
exports["latest"] = latest;
exports["listWeeks"] = listWeeks;
exports["week"] = week;
exports["validate"] = validate;
return exports;
}]);
factories.push(["js/region.js", function (exports) {
// Справочник: 6 регионов + города для поиска (Решения по реализации п.5, п.6).
const REGIONS = [
  {
    id: 'europe',
    name: { ru: 'Европа', en: 'Europe' },
    city: { ru: 'Амстердам', en: 'Amsterdam' },
    prefixes: ['Europe/'],
  },
  {
    id: 'east-asia',
    name: { ru: 'Восточная Азия', en: 'East Asia' },
    city: { ru: 'Токио', en: 'Tokyo' },
    prefixes: [
      'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Macau', 'Asia/Taipei',
      'Asia/Seoul', 'Asia/Pyongyang', 'Asia/Singapore', 'Asia/Jakarta', 'Asia/Bangkok', 'Asia/Manila',
    ],
  },
  {
    id: 'middle-east',
    name: { ru: 'Ближний Восток', en: 'Middle East' },
    city: { ru: 'Бейрут', en: 'Beirut' },
    prefixes: [
      'Asia/Beirut', 'Asia/Damascus', 'Asia/Jerusalem', 'Asia/Riyadh', 'Asia/Dubai',
      'Asia/Qatar', 'Asia/Kuwait', 'Asia/Baghdad', 'Asia/Tehran', 'Asia/Amman',
    ],
  },
  {
    id: 'north-america',
    name: { ru: 'Северная Америка', en: 'North America' },
    city: { ru: 'Вашингтон', en: 'Washington' },
    prefixes: [
      'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
      'America/Toronto', 'America/Vancouver', 'America/Mexico_City', 'America/Halifax', 'US/', 'Canada/',
    ],
  },
  {
    id: 'south-asia',
    name: { ru: 'Южная Азия', en: 'South Asia' },
    city: { ru: 'Нью-Дели', en: 'New Delhi' },
    prefixes: ['Asia/Kolkata', 'Asia/Karachi', 'Asia/Kathmandu', 'Asia/Dhaka', 'Asia/Colombo', 'Asia/Kabul'],
  },
  {
    id: 'africa',
    name: { ru: 'Африка', en: 'Africa' },
    city: { ru: 'Найроби', en: 'Nairobi' },
    prefixes: ['Africa/'],
  },
];

const CITIES = [
  { name: { ru: 'Амстердам', en: 'Amsterdam' }, region: 'europe' },
  { name: { ru: 'Берлин', en: 'Berlin' }, region: 'europe' },
  { name: { ru: 'Париж', en: 'Paris' }, region: 'europe' },
  { name: { ru: 'Лондон', en: 'London' }, region: 'europe' },
  { name: { ru: 'Варшава', en: 'Warsaw' }, region: 'europe' },
  { name: { ru: 'Москва', en: 'Moscow' }, region: 'europe' },
  { name: { ru: 'Киев', en: 'Kyiv' }, region: 'europe' },
  { name: { ru: 'Токио', en: 'Tokyo' }, region: 'east-asia' },
  { name: { ru: 'Пекин', en: 'Beijing' }, region: 'east-asia' },
  { name: { ru: 'Шанхай', en: 'Shanghai' }, region: 'east-asia' },
  { name: { ru: 'Гонконг', en: 'Hong Kong' }, region: 'east-asia' },
  { name: { ru: 'Сеул', en: 'Seoul' }, region: 'east-asia' },
  { name: { ru: 'Тайбэй', en: 'Taipei' }, region: 'east-asia' },
  { name: { ru: 'Сингапур', en: 'Singapore' }, region: 'east-asia' },
  { name: { ru: 'Бейрут', en: 'Beirut' }, region: 'middle-east' },
  { name: { ru: 'Иерусалим', en: 'Jerusalem' }, region: 'middle-east' },
  { name: { ru: 'Дубай', en: 'Dubai' }, region: 'middle-east' },
  { name: { ru: 'Эр-Рияд', en: 'Riyadh' }, region: 'middle-east' },
  { name: { ru: 'Тегеран', en: 'Tehran' }, region: 'middle-east' },
  { name: { ru: 'Вашингтон', en: 'Washington' }, region: 'north-america' },
  { name: { ru: 'Нью-Йорк', en: 'New York' }, region: 'north-america' },
  { name: { ru: 'Лос-Анджелес', en: 'Los Angeles' }, region: 'north-america' },
  { name: { ru: 'Торонто', en: 'Toronto' }, region: 'north-america' },
  { name: { ru: 'Ванкувер', en: 'Vancouver' }, region: 'north-america' },
  { name: { ru: 'Нью-Дели', en: 'New Delhi' }, region: 'south-asia' },
  { name: { ru: 'Мумбаи', en: 'Mumbai' }, region: 'south-asia' },
  { name: { ru: 'Карачи', en: 'Karachi' }, region: 'south-asia' },
  { name: { ru: 'Катманду', en: 'Kathmandu' }, region: 'south-asia' },
  { name: { ru: 'Дакка', en: 'Dhaka' }, region: 'south-asia' },
  { name: { ru: 'Найроби', en: 'Nairobi' }, region: 'africa' },
  { name: { ru: 'Каир', en: 'Cairo' }, region: 'africa' },
  { name: { ru: 'Лагос', en: 'Lagos' }, region: 'africa' },
  { name: { ru: 'Йоханнесбург', en: 'Johannesburg' }, region: 'africa' },
  { name: { ru: 'Аккра', en: 'Accra' }, region: 'africa' },
];

const LS_KEY = 'cassandra.region';
const SS_KEY = 'cassandra.region.session';

function get(id) {
  return REGIONS.find((r) => r.id === id) ?? null;
}

// Детект по IANA-префиксам часового пояса браузера; неизвестный пояс → null.
function detect(tz) {
  if (typeof tz !== 'string' || !tz) return null;
  for (const r of REGIONS) {
    if (r.prefixes.some((p) => tz === p || tz.startsWith(p))) return r.id;
  }
  return null;
}

function storage(kind) {
  try {
    if (kind === 'local' && typeof localStorage !== 'undefined') return localStorage;
    if (kind === 'session' && typeof sessionStorage !== 'undefined') return sessionStorage;
  } catch {
    /* доступ к хранилищу может быть запрещён — считаем его отсутствующим */
  }
  return null;
}

// Выбор пользователя: localStorage (только при явном persist) → session → null.
function current() {
  const ls = storage('local');
  if (ls) {
    const v = ls.getItem(LS_KEY);
    if (v && get(v)) return v;
  }
  const ss = storage('session');
  if (ss) {
    const v = ss.getItem(SS_KEY);
    if (v && get(v)) return v;
  }
  return null;
}

// choose(id, { persist }) — persist=true пишет в localStorage, иначе выбор живёт в сессии.
// Первый визит ничего не сохраняет (persist по умолчанию false).
function choose(id, { persist = false } = {}) {
  const r = get(id);
  if (!r) return null;
  const ss = storage('session');
  if (ss) ss.setItem(SS_KEY, id);
  if (persist) {
    const ls = storage('local');
    if (ls) ls.setItem(LS_KEY, id);
  }
  return r;
}

// Поиск по справочнику городов и названиям регионов; регистронезависимый.
function search(q) {
  const s = (q ?? '').trim().toLowerCase();
  if (!s) return CITIES.map((c) => ({ ...c, regionName: get(c.region).name }));
  const out = [];
  for (const c of CITIES) {
    const region = get(c.region);
    const hay = `${c.name.ru} ${c.name.en} ${region.name.ru} ${region.name.en}`.toLowerCase();
    if (hay.includes(s)) out.push({ ...c, regionName: region.name });
  }
  return out;
}

exports["REGIONS"] = REGIONS;
exports["CITIES"] = CITIES;
exports["get"] = get;
exports["detect"] = detect;
exports["current"] = current;
exports["choose"] = choose;
exports["search"] = search;
return exports;
}]);
factories.push(["js/i18n.js", function (exports) {
// Словари RU/EN. Ни одной пользовательской строки вне словаря (§11.3).
const DICTS = {
  ru: {
    'app.title': 'Cassandra Index — индекс конфликтного риска',
    'app.description': 'Еженедельная оценка уровня и направления глобального конфликтного риска на основе открытых данных.',
    'nav.overview': 'Обзор',
    'nav.regions': 'Регионы',
    'nav.trend': 'Тренд',
    'nav.method': 'Методология',
    'nav.sources': 'История и источники',
    'nav.lang.ru': 'RU',
    'nav.lang.en': 'EN',
    'nav.label': 'Основная навигация',
    'lang.label': 'Язык / Language',
    'regions.title': 'Что это значит для моего региона?',
    'regions.yours': 'ваш регион',
    'regions.drivers': 'Главные драйверы',
    'hero.title': 'Насколько близко мир подошёл к глобальному военному конфликту?',
    'hero.subtitle': 'Это индекс состояния риска от 0 до 100, а не вероятность начала войны и не обратный отсчёт.',
    'meta.published': 'Последняя публикация',
    'meta.through': 'Данные по',
    'hero.index.of': 'из 100',
    'hero.week.change': 'за неделю',
    'status.calm': 'Спокойно',
    'status.tense': 'Напряжённо',
    'status.danger': 'Опасно',
    'status.very': 'Очень опасно',
    'status.critical': 'Критически опасно',
    'status.extreme': 'Экстремальная угроза',
    'statusLower.calm': 'спокойно',
    'statusLower.tense': 'напряжённо',
    'statusLower.danger': 'опасно',
    'statusLower.very': 'очень опасно',
    'statusLower.critical': 'критически опасно',
    'statusLower.extreme': 'экстремальная угроза',
    'region.yours': 'ВАШ РЕГИОН',
    'region.change': 'изменить',
    'region.unavailable': 'данные по региону временно недоступны',
    'region.note': 'Это контекстный региональный риск, а не прогноз атаки на этот город.',
    'region.cta': 'Узнать риск для моего региона →',
    'region.panel.title': 'Выбор региона',
    'region.panel.search': 'Город или регион',
    'region.panel.remember': 'Запомнить',
    'region.panel.remember.hint': 'Сохранит выбор в этом браузере',
    'region.panel.geolocate': 'Уточнить точнее',
    'region.panel.cancel': 'Отмена',
    'region.panel.notfound': 'Ничего не найдено — выберите регион из списка',
    'a11y.region.changed': 'Ваш регион: {city} · {region}, индекс {index} из 100',
    'a11y.lang.changed': 'Язык: русский',
    'state.published': 'Опубликовано',
    'state.updating': 'Обновляется',
    'state.delayed': 'Задержка данных',
    'state.insufficient': 'Недостаточно данных',
    'state.unavailable': 'Model unavailable',
    'history.banner': 'Архивный снапшот: опубликован {published}, данные по {through}. Значения не являются текущими.',
    'critical.title': 'Очень высокий модельный риск',
    'critical.disclaimer': 'Это модельная оценка на основе последних недельных данных. Она не означает, что официально объявлена чрезвычайная ситуация или что война началась.',
    'critical.official.title': 'Официальная информация',
    'critical.official.text': 'Следите за сообщениями компетентных органов вашего региона — служб гражданской защиты и экстренных служб. Cassandra Index не является официальным источником оповещений и не заменяет их.',
    'critical.actions.title': 'Спокойные действия',
    'critical.action.1': 'следите за официальными местными оповещениями;',
    'critical.action.2': 'ознакомьтесь с местными инструкциями на случай ЧС;',
    'critical.action.3': 'держите базовый запас;',
    'critical.action.4': 'договоритесь с близкими о способе связи.',
    'unavailable.title': 'Model unavailable',
    'unavailable.text': 'Не удалось загрузить данные текущей недели. Проверьте соединение и повторите попытку.',
    'demo.link': 'Демо-состояния',
    'demo.title': 'Демо-состояния',
    'demo.hint': 'Подмена работает только в текущей сессии и помечена «демо»; на реальные данные не влияет.',
    'demo.critical': 'Критический режим',
    'demo.delayed': 'Задержка данных',
    'demo.insufficient': 'Недостаточно данных',
    'demo.unavailable': 'Модель недоступна',
    'demo.off': 'Выключить демо',
    'demo.close': 'Закрыть',
    'demo.banner': 'Демо-состояние: {mode}',
    'data.retry': 'Повторить',
    'sources.word': '{n} {n, plural, one{источник} few{источника} many{источников} other{источников}}',
    'drivers.title': 'Что изменилось',
    'drivers.observation': 'Наблюдение',
    'drivers.why': 'Почему это важно',
    'drivers.contribution.label': 'Вклад',
    'drivers.contribution.high': 'высокий',
    'drivers.contribution.medium': 'средний',
    'drivers.contribution.low': 'низкий',
    'drivers.confidence.label': 'Уверенность',
    'drivers.confidence.high': 'высокая',
    'drivers.confidence.medium': 'средняя',
    'drivers.confidence.low': 'низкая',
    'drivers.sources.hide': 'скрыть',
    'drivers.sources.showAll': 'Показать все источники',
    'drivers.sources.hideAll': 'Свернуть список источников',
    'drivers.measures.title': 'Дополнительные измерения риска',
    'drivers.measures.direct': 'Прямое военное столкновение',
    'drivers.measures.nuclear': 'Риск применения ядерного оружия',
    'drivers.measures.level.high': 'Высокий',
    'drivers.measures.level.medium': 'Средний',
    'drivers.measures.level.low': 'Низкий',
    'drivers.measures.horizon': 'Горизонт оценки: 12 месяцев.',
    'drivers.measures.direct.def': 'Событие: открытые боевые действия между регулярными вооружёнными силами двух или более государств.',
    'drivers.measures.nuclear.def': 'Событие: применение ядерного оружия в боевой обстановке любой из сторон.',
    'drivers.measures.calibration': 'Уровни — качественные категории, а не откалиброванные вероятности: сопоставления с частотой таких событий в прошлом пока не выполнено.',
    'trend.now': 'Сейчас: {value} из 100',
    'trend.weekAgo': 'Неделю назад: {value}',
    'trend.direction.label': 'Направление',
    'trend.direction.up': 'растёт',
    'trend.direction.down': 'снижается',
    'trend.direction.flat': 'без изменений',
    'trend.points': '{n, plural, one{пункт} few{пункта} many{пунктов} other{пунктов}}',
    'trend.summary': 'За неделю индекс изменился на {week} {weekWord}; за 12 недель — на {total} {totalWord}.',
    'trend.point.aria': '{value} из 100, {date}',
    'trend.chart.label': 'График индекса за 12 недель',
    'footer.next': 'Следующая публикация: {when}',
    'disclaimer.full': 'Cassandra Index — экспериментальная оценка риска на основе открытых данных. Это не официальный прогноз правительства или международной организации. Оценка может быть ошибочной.',
    'footer.ip': 'регион определяется приблизительно по IP для отображения регионального контекста; адрес не сохраняется и не передаётся третьим лицам',
    'footer.privacy': 'Приватность',
    'share.brand': 'CASSANDRA INDEX',
    'share.button': 'Поделиться',
    'share.region': 'Ваш регион: {name} · {index} / 100',
    'share.announce': 'Карточка снапшота скачана',
    'footer.nav': 'Сервисные ссылки',
    'privacy.title': 'Политика приватности',
    'privacy.back': '← На главную',
    'privacy.storage.h': 'Что сайт хранит в вашем браузере',
    'privacy.storage.lang': 'cassandra.lang — выбранный язык интерфейса. Записывается, только когда вы сами переключаете язык.',
    'privacy.storage.region': 'cassandra.region — выбранный вами регион. Записывается, только если вы включили переключатель «Запомнить» в панели выбора региона; без него выбор живёт только до закрытия вкладки.',
    'privacy.storage.first': 'Первый визит ничего не сохраняет: до вашего явного действия localStorage остаётся пустым.',
    'privacy.region.h': 'Как определяется регион',
    'privacy.region.static': 'Текущая сборка сайта полностью статическая и работает без бэкенда: регион определяется приблизительно по часовому поясу вашего браузера. Часовой пояс не сохраняется и никуда не передаётся.',
    'privacy.region.future': 'В будущей версии с сервером регион будет определяться приблизительно по IP для отображения регионального контекста; адрес не сохраняется и не передаётся третьим лицам.',
    'privacy.geo.h': 'Точная геолокация',
    'privacy.geo.text': 'Координаты запрашиваются, только если вы нажимаете «Уточнить точнее»; автоматического запроса GPS нет. Координаты используются только на вашем устройстве, чтобы уточнить регион, и никуда не отправляются.',
    'privacy.not.h': 'Чего сайт не делает',
    'privacy.not.cookies': 'Не использует файлы cookie, счётчики аналитики, рекламные идентификаторы и сторонние виджеты.',
    'privacy.not.third': 'Не передаёт данные третьим лицам: в статической сборке данные вообще никуда не отправляются — сайт можно открыть с локального диска, не подключаясь к сети.',
    'privacy.delete.h': 'Как удалить сохранённое',
    'privacy.delete.text': 'Очистка данных сайта в настройках браузера (или удаление ключей cassandra.lang и cassandra.region из localStorage) стирает сохранённые значения. Других данных о вас у сайта нет.',
    'history.week.label': 'Неделя',
    'history.week.current': 'текущая',
    'history.index': 'Глобальный индекс',
    'history.methodology': 'Версия методологии',
    'history.methodology.note': 'Эта неделя рассчитана по версии методологии {viewed}, а текущая неделя — по версии {current}: значения могут быть несопоставимы.',
    'history.review.title': 'Разбор недели ({date}): где ошиблись, где были правы, где неопределённость',
    'history.review.wrong': 'Где ошиблись',
    'history.review.right': 'Где были правы',
    'history.review.uncertain': 'Где неопределённость',
    'history.sources.title': 'Источники недели',
    'method.measures.title': 'Что модель измеряет',
    'method.measures.1': 'Состояние риска глобального конфликта по подтверждённым открытым сигналам — включая косвенные индикаторы подготовки. Значение 0–100 — индекс аномальности относительно базовой линии мирного времени (ориентир — 2010–2019 годы): мера схожести текущей комбинации сигналов с историческими кризисами, а не прогноз будущего.',
    'method.not.title': 'Что модель не измеряет',
    'method.not.1': 'Вероятность начала войны и дату события — индекс никогда так не интерпретируется.',
    'method.not.2': 'Риск удара по конкретному городу: город в интерфейсе — только ярлык вашего региона.',
    'method.not.3': 'Сам факт тайной подготовки: косвенные сигналы — это наблюдения, а не доказательства.',
    'method.gaps.title': 'Пробелы в данных',
    'method.gaps.1': 'Покрытие источников неравномерно по регионам и типам сигналов; это влияет на уверенность в оценке.',
    'method.gaps.2': 'Для косвенных индикаторов подготовки в закрытых странах данных мало — там возможны слепые зоны.',
    'method.gaps.3': 'При плохом покрытии новое значение сжимается к предыдущему, а доля неопределённости показывается в интерфейсе отдельно.',
    'method.gaps.4': 'Наблюдаемость снижения напряжения асимметрична: подписанные договорённости запаздывают относительно реального снижения, а закрытые переговоры не видны открытым источникам до публикации.',
    'method.conflicts.title': 'Конфликты источников',
    'method.conflicts.1': 'Если независимые по происхождению сигналы противоречат друг другу, уверенность в оценке снижается, а причина показывается рядом с драйвером.',
    'method.conflicts.2': 'Независимость проверяется через генеалогию источников: перепечатка одного первоисточника — это один источник, а не два независимых подтверждения.',
    'method.conflicts.3': 'Государственные акторы способны имитировать признаки подготовки или скрывать их; правила против информационных операций и регулярные внешние ревизии снижают, но не устраняют этот риск.',
    'method.failures.title': 'Случаи отказа',
    'method.failures.1': 'Если слишком большая доля драйверов остаётся без данных, снапшот либо не публикуется, либо публикуется с пониженной уверенностью — решение фиксируется в версии методологии.',
    'method.failures.2': 'Если модель недоступна, показывается последний корректный снапшот с явной пометкой «Архивный снапшот» и его датами.',
    'method.failures.3': 'Устаревшее значение никогда не выглядит текущим: рядом всегда есть индикатор состояния данных и дата.',
    'method.fpfn.title': 'Известные ошибки оценки: ложные срабатывания и пропуски',
    'method.fpfn.1': 'Косвенные индикаторы исторически давали ложные кластеры без реальной подготовки; поэтому их уверенность ограничена, а вклад в индекс — потолком.',
    'method.fpfn.2': 'Сезонные закупки и плановые учения периодически выглядят как сигналы подготовки; сравнение идёт с сезонной линией того же календарного периода предыдущих лет.',
    'method.fpfn.3': 'Пропуски возможны там, где событие скрыто от открытых источников; конкретные разборы публикуются в разделе «История и источники».',
    'method.thresholds.title': 'Обоснование порогов',
    'method.thresholds.intro': 'Пороги состояний калибруются не абстрактной математикой, а привязкой к историческим кризисам: расчёт на прошлых данных обязан помещать известные события в заявленные диапазоны. Каждый порог имеет документированное обоснование, а его изменение происходит только через версионирование методологии.',
    'method.anchor.col.event': 'Исторический ориентир',
    'method.anchor.col.range': 'Диапазон индекса',
    'method.anchor.routine': 'Рутина 2010-х годов',
    'method.anchor.proxy': 'Санкционные войны и локальные прокси-конфликты без прямого столкновения держав',
    'method.anchor.local': 'Крым и Донбасс 2014 года; Каргил 1999 года',
    'method.anchor.conv': 'Грузия 2008 года; Йом-Кипур 1973 года; преддверие Ирака 2003 года',
    'method.anchor.full': 'Начало полномасштабной войны России и Украины 2022 года; учения Able Archer 1983 года',
    'method.anchor.extreme': 'Карибский кризис 1962 года',
    'method.version.title': 'Версия методологии',
    'method.version.text': 'Каждый недельный снапшот привязан к версии методологии. Текущая версия: {version}.',
    'method.version.note': 'Если изменение методологии влияет на сопоставимость с прошлыми неделями, интерфейс раскрывает это рядом с затронутыми данными; история не пересчитывается молча.',
    'method.open.title': 'Открытые вопросы перед продакшеном',
    'method.open.1': 'Какая статистическая интерпретация лежит в основе индекса 0–100?',
    'method.open.2': 'Откалиброваны и проверены ли на прошлых данных 12-месячные вероятности событий?',
    'method.open.3': 'Какое доказательство обосновывает каждый порог состояния?',
    'method.open.4': 'Какое минимальное покрытие источников необходимо для публикации?',
    'method.open.5': 'Что происходит, если серьёзное событие случилось между недельными публикациями?',
    'method.open.6': 'Кто владеет редакторским ревью текста критического режима и ссылок на официальные источники?',
    'method.open.7': 'Какая региональная таксономия является авторитетной?',
    'method.open.8': 'Как определяется независимость источников?',
    'method.open.9': 'Каков аудиторский след для изменённого исторического снапшота?',
    'method.open.10': 'Какие изменения методологии нарушают сопоставимость с предыдущими неделями?',
    'method.open.11': 'Геолокация по IP: какой провайдер, какая точность на страну и регион, каков уровень сервиса, какие данные логируются?',
    'method.open.12': 'Соответствие приватности: как обработка IP согласуется с GDPR, 152-ФЗ и CCPA в целевом регионе?',
    'method.open.13': 'Справочник регионов и городов: какая единая таксономия сопоставляет «город ↔ регион» и кто её владелец?',
    'method.open.14': 'Согласие на сохранение региона: показывать уведомление при первом визите или полагаться на политику?',
    'method.open.15': 'Заголовок-вопрос: как измерить, что формулировка не воспринимается как обратный отсчёт?',
    'method.open.16': 'Мультиязычность: как заголовок ведёт себя в английском и других языках без потери смысла?',
    'method.open.17': 'Источники в драйверах: какой минимальный набор полей у каждого источника (заголовок, домен, дата, URL, тип)?',
    'method.open.18': 'Порядок источников: сортировка по релевантности, дате или типу — кто принимает решение?',
    'method.open.19': 'Раскрытие списка источников: запоминать состояние между визитами или каждый раз закрывать?',
    'method.open.20': 'Интерактивный тренд на сенсорных экранах: достаточно ли показа при касании с автозакрытием, или нужна отдельная панель на мобильных?',
    'method.open.21': 'Город-представитель региона: как выбирается и кто владелец логики?',
    'method.open.22': 'Точность определения по IP: при какой уверенности показывать город-представитель, а при какой — только регион?',
    'method.open.23': 'Удаление блока уверенности из первого экрана: не снижает ли это доверие у новых посетителей?',
    'method.open.24': 'Плюрализация и склонения: поддерживает ли система перевода сложные правила без ручных исключений?',
    'method.open.25': 'Доступность подсказки на тренде: достаточно ли текстового описания точки, или нужен отдельный живой регион для скринридера?',
    'footer.disclaimer': 'Оценка риска на основе открытых данных. Не официальный прогноз.',
  },
  en: {
    'app.title': 'Cassandra Index — conflict risk index',
    'app.description': 'A weekly assessment of the level and direction of global conflict risk based on open data.',
    'nav.overview': 'Overview',
    'nav.regions': 'Regions',
    'nav.trend': 'Trend',
    'nav.method': 'Methodology',
    'nav.sources': 'History & sources',
    'nav.lang.ru': 'RU',
    'nav.lang.en': 'EN',
    'nav.label': 'Main navigation',
    'lang.label': 'Language / Язык',
    'regions.title': 'What does this mean for my region?',
    'regions.yours': 'your region',
    'regions.drivers': 'Key drivers',
    'hero.title': 'How close is the world to a global military conflict?',
    'hero.subtitle': 'This is a risk state index from 0 to 100, not a probability of war and not a countdown.',
    'meta.published': 'Last published',
    'meta.through': 'Data through',
    'hero.index.of': 'of 100',
    'hero.week.change': 'this week',
    'status.calm': 'Calm',
    'status.tense': 'Tense',
    'status.danger': 'Dangerous',
    'status.very': 'Very dangerous',
    'status.critical': 'Critically dangerous',
    'status.extreme': 'Extreme threat',
    'statusLower.calm': 'calm',
    'statusLower.tense': 'tense',
    'statusLower.danger': 'dangerous',
    'statusLower.very': 'very dangerous',
    'statusLower.critical': 'critically dangerous',
    'statusLower.extreme': 'extreme threat',
    'region.yours': 'YOUR REGION',
    'region.change': 'change',
    'region.unavailable': 'regional data is temporarily unavailable',
    'region.note': 'This is contextual regional risk, not a prediction of an attack on this city.',
    'region.cta': 'See the risk for my region →',
    'region.panel.title': 'Choose your region',
    'region.panel.search': 'City or region',
    'region.panel.remember': 'Remember',
    'region.panel.remember.hint': 'Saves your choice in this browser',
    'region.panel.geolocate': 'Refine',
    'region.panel.cancel': 'Cancel',
    'region.panel.notfound': 'No results — choose a region from the list',
    'a11y.region.changed': 'Your region: {city} · {region}, index {index} of 100',
    'a11y.lang.changed': 'Language: English',
    'state.published': 'Published',
    'state.updating': 'Updating',
    'state.delayed': 'Delayed',
    'state.insufficient': 'Insufficient data',
    'state.unavailable': 'Model unavailable',
    'history.banner': 'Historical snapshot: published {published}, data through {through}. These values are not current.',
    'critical.title': 'Very high modelled risk',
    'critical.disclaimer': 'This is a modelled assessment based on the latest weekly data. It does not mean that a state of emergency has been officially declared or that a war has started.',
    'critical.official.title': 'Official information',
    'critical.official.text': 'Follow messages from the competent authorities of your region — civil protection and emergency services. Cassandra Index is not an official alerting source and does not replace them.',
    'critical.actions.title': 'Calm actions',
    'critical.action.1': 'follow official local alerts;',
    'critical.action.2': 'read your local emergency instructions;',
    'critical.action.3': 'keep a basic supply;',
    'critical.action.4': 'agree on a way to stay in touch with your loved ones.',
    'unavailable.title': 'Model unavailable',
    'unavailable.text': 'Could not load this week’s data. Check your connection and try again.',
    'demo.link': 'Demo states',
    'demo.title': 'Demo states',
    'demo.hint': 'The override works only in the current session and is marked “demo”; it does not affect real data.',
    'demo.critical': 'Critical mode',
    'demo.delayed': 'Delayed data',
    'demo.insufficient': 'Insufficient data',
    'demo.unavailable': 'Model unavailable',
    'demo.off': 'Turn off demo',
    'demo.close': 'Close',
    'demo.banner': 'Demo state: {mode}',
    'data.retry': 'Retry',
    'sources.word': '{n} {n, plural, one{source} other{sources}}',
    'drivers.title': 'What changed',
    'drivers.observation': 'Observation',
    'drivers.why': 'Why it matters',
    'drivers.contribution.label': 'Contribution',
    'drivers.contribution.high': 'high',
    'drivers.contribution.medium': 'medium',
    'drivers.contribution.low': 'low',
    'drivers.confidence.label': 'Confidence',
    'drivers.confidence.high': 'high',
    'drivers.confidence.medium': 'medium',
    'drivers.confidence.low': 'low',
    'drivers.sources.hide': 'hide',
    'drivers.sources.showAll': 'Show all sources',
    'drivers.sources.hideAll': 'Show fewer sources',
    'drivers.measures.title': 'Additional risk dimensions',
    'drivers.measures.direct': 'Direct military confrontation',
    'drivers.measures.nuclear': 'Risk of nuclear weapons use',
    'drivers.measures.level.high': 'High',
    'drivers.measures.level.medium': 'Medium',
    'drivers.measures.level.low': 'Low',
    'drivers.measures.horizon': 'Assessment horizon: 12 months.',
    'drivers.measures.direct.def': 'Event: open hostilities between the regular armed forces of two or more states.',
    'drivers.measures.nuclear.def': 'Event: use of nuclear weapons in a combat situation by any party.',
    'drivers.measures.calibration': 'Levels are qualitative categories, not calibrated probabilities: they have not yet been benchmarked against the historical frequency of such events.',
    'trend.now': 'Now: {value} of 100',
    'trend.weekAgo': 'A week ago: {value}',
    'trend.direction.label': 'Direction',
    'trend.direction.up': 'rising',
    'trend.direction.down': 'falling',
    'trend.direction.flat': 'unchanged',
    'trend.points': '{n, plural, one{point} other{points}}',
    'trend.summary': 'Over the week the index changed by {week} {weekWord}; over 12 weeks — by {total} {totalWord}.',
    'trend.point.aria': '{value} of 100, {date}',
    'trend.chart.label': '12-week index chart',
    'history.week.label': 'Week',
    'history.week.current': 'current',
    'history.index': 'Global index',
    'history.methodology': 'Methodology version',
    'history.methodology.note': 'This week was calculated with methodology version {viewed}, while the current week uses version {current}: the values may not be comparable.',
    'history.review.title': 'Week in review ({date}): where we were wrong, where we were right, where uncertainty remains',
    'history.review.wrong': 'Where we were wrong',
    'history.review.right': 'Where we were right',
    'history.review.uncertain': 'Where uncertainty remains',
    'history.sources.title': 'Sources for this week',
    'method.measures.title': 'What the model measures',
    'method.measures.1': 'The state of global conflict risk from confirmed open signals — including shadow preparation indicators. The 0–100 value is an anomaly index relative to a peacetime baseline (reference: 2010–2019): a measure of how similar the current combination of signals is to historical crises, not a forecast of the future.',
    'method.not.title': 'What the model does not measure',
    'method.not.1': 'The probability of war starting and the date of an event — the index is never interpreted this way.',
    'method.not.2': 'The risk of a strike on a specific city: the city in the interface is only a label for your region.',
    'method.not.3': 'The very fact of covert preparation: shadow signals are observations, not proof.',
    'method.gaps.title': 'Gaps in the data',
    'method.gaps.1': 'Source coverage is uneven across regions and signal types; this affects confidence in the assessment.',
    'method.gaps.2': 'For shadow preparation indicators, data from closed countries is scarce — blind spots are possible there.',
    'method.gaps.3': 'When coverage is poor, the new value shrinks towards the previous one, and the uncertainty share is shown separately in the interface.',
    'method.gaps.4': 'Observability of de-escalation is asymmetric: signed arrangements lag the actual easing of tension, and closed negotiations are invisible to open sources until published.',
    'method.conflicts.title': 'Conflicting sources',
    'method.conflicts.1': 'When signals that are independent in origin contradict each other, confidence in the assessment is reduced, and the reason is shown next to the driver.',
    'method.conflicts.2': 'Independence is checked through source genealogy: a reprint of one primary source is one source, not two independent confirmations.',
    'method.conflicts.3': 'State actors can imitate signs of preparation or hide them; rules against information operations and regular external reviews reduce but do not eliminate this risk.',
    'method.failures.title': 'Failure cases',
    'method.failures.1': 'If too large a share of drivers lacks data, the snapshot is either not published or published with reduced confidence — the decision is recorded in the methodology version.',
    'method.failures.2': 'If the model is unavailable, the last valid snapshot is shown with an explicit “Historical snapshot” label and its dates.',
    'method.failures.3': 'A stale value never looks current: a data-state indicator and a date are always shown next to it.',
    'method.fpfn.title': 'Known assessment errors: false positives and misses',
    'method.fpfn.1': 'Shadow indicators have historically produced false clusters without real preparation; that is why their confidence is capped and their contribution to the index is bounded.',
    'method.fpfn.2': 'Seasonal procurements and routine drills periodically look like preparation signals; comparison is made against the seasonal line for the same calendar period in previous years.',
    'method.fpfn.3': 'Misses are possible where an event is hidden from open sources; specific reviews are published in the “History & sources” section.',
    'method.thresholds.title': 'Threshold justification',
    'method.thresholds.intro': 'State thresholds are calibrated not by abstract mathematics but by anchoring to historical crises: backtesting must place known events into the declared ranges. Every threshold has documented justification, and changing it happens only through methodology versioning.',
    'method.anchor.col.event': 'Historical anchor',
    'method.anchor.col.range': 'Index range',
    'method.anchor.routine': 'Routine of the 2010s',
    'method.anchor.proxy': 'Sanction wars and local proxy conflicts without direct confrontation of great powers',
    'method.anchor.local': 'Crimea and Donbas 2014; Kargil 1999',
    'method.anchor.conv': 'Georgia 2008; Yom Kippur 1973; run-up to Iraq 2003',
    'method.anchor.full': 'Start of the full-scale Russia–Ukraine war in 2022; Able Archer exercise 1983',
    'method.anchor.extreme': 'Cuban Missile Crisis 1962',
    'method.version.title': 'Methodology version',
    'method.version.text': 'Every weekly snapshot is bound to a methodology version. Current version: {version}.',
    'method.version.note': 'If a methodology change affects comparability with past weeks, the interface discloses this next to the affected data; history is never silently recalculated.',
    'method.open.title': 'Open questions before production',
    'method.open.1': 'What statistical interpretation underlies the 0–100 index?',
    'method.open.2': 'Have the 12-month event probabilities been calibrated and backtested?',
    'method.open.3': 'What evidence justifies each state threshold?',
    'method.open.4': 'What minimum source coverage is required for publication?',
    'method.open.5': 'What happens if a serious event occurs between weekly releases?',
    'method.open.6': 'Who owns the editorial review of critical-mode text and links to official sources?',
    'method.open.7': 'Which regional taxonomy is authoritative?',
    'method.open.8': 'How is source independence determined?',
    'method.open.9': 'What is the audit trail for a modified historical snapshot?',
    'method.open.10': 'Which methodology changes break comparability with previous weeks?',
    'method.open.11': 'IP geolocation: which provider, what accuracy for country and region, what service level, which data is logged?',
    'method.open.12': 'Privacy compliance: how does IP processing align with GDPR, 152-FZ and CCPA in the target region?',
    'method.open.13': 'Region and city directory: which unified taxonomy maps “city ↔ region” and who owns it?',
    'method.open.14': 'Consent for saving the region: show a notice on the first visit or rely on the policy?',
    'method.open.15': 'The headline question: how do we measure that the wording is not perceived as a countdown?',
    'method.open.16': 'Multilingual: how does the headline behave in English and other languages without losing meaning?',
    'method.open.17': 'Sources in drivers: what is the minimum field set per source (title, domain, date, URL, type)?',
    'method.open.18': 'Source ordering: sorted by relevance, date or type — who decides?',
    'method.open.19': 'Source list disclosure: remember the state between visits or collapse it every time?',
    'method.open.20': 'Interactive trend on touch screens: is tap-to-show with auto-hide enough, or is a separate panel needed on mobile?',
    'method.open.21': 'Representative city of a region: how is it chosen and who owns the logic?',
    'method.open.22': 'IP detection accuracy: at what confidence do we show the representative city, and at what — only the region?',
    'method.open.23': 'Removing the confidence block from the first screen: does this reduce trust for new visitors?',
    'method.open.24': 'Pluralization and declension: does the translation system support complex rules without manual exceptions?',
    'method.open.25': 'Trend tooltip accessibility: is a text description of each point enough, or is a separate live region needed for screen readers?',
    'footer.next': 'Next publication: {when}',
    'disclaimer.full': 'Cassandra Index is an experimental risk assessment based on open data. It is not an official forecast of any government or international organisation. The assessment may be wrong.',
    'footer.ip': 'the region is determined approximately from your IP address to show regional context; the address is not stored and is not shared with third parties',
    'footer.privacy': 'Privacy',
    'share.brand': 'CASSANDRA INDEX',
    'share.button': 'Share',
    'share.region': 'Your region: {name} · {index} / 100',
    'share.announce': 'Snapshot card downloaded',
    'footer.nav': 'Service links',
    'privacy.title': 'Privacy policy',
    'privacy.back': '← Back to the main page',
    'privacy.storage.h': 'What the site stores in your browser',
    'privacy.storage.lang': 'cassandra.lang — the interface language you selected. It is written only when you switch the language yourself.',
    'privacy.storage.region': 'cassandra.region — the region you selected. It is written only if you turn on the “Remember” toggle in the region picker; without it, your choice lives only until the tab is closed.',
    'privacy.storage.first': 'The first visit saves nothing: localStorage stays empty until you take an explicit action.',
    'privacy.region.h': 'How your region is determined',
    'privacy.region.static': 'The current build of the site is fully static and runs without a backend: the region is determined approximately from your browser’s time zone. The time zone is not stored and is not sent anywhere.',
    'privacy.region.future': 'In a future version with a server, the region will be determined approximately from your IP address to show regional context; the address will not be stored and will not be shared with third parties.',
    'privacy.geo.h': 'Precise geolocation',
    'privacy.geo.text': 'Coordinates are requested only when you click “Refine”; there is no automatic GPS request. Coordinates are used only on your device to refine the region and are never sent anywhere.',
    'privacy.not.h': 'What the site does not do',
    'privacy.not.cookies': 'It does not use cookies, analytics counters, advertising identifiers, or third-party widgets.',
    'privacy.not.third': 'It does not share data with third parties: in the static build, no data is sent anywhere at all — you can open the site from a local disk without any network connection.',
    'privacy.delete.h': 'How to delete saved data',
    'privacy.delete.text': 'Clearing the site data in your browser settings (or removing the cassandra.lang and cassandra.region keys from localStorage) erases the saved values. The site holds no other data about you.',
    'footer.disclaimer': 'Risk assessment based on open data. Not an official forecast.',
  },
};

const LANGS = ['ru', 'en'];

const LOCALES = { ru: 'ru-RU', en: 'en-US' };

// --- ICU MessageFormat (собственное подмножество, R62 / решение A3): ---
// интерполяция `{var}`, plural `{n, plural, one{…} few{…} many{…} other{…}}`,
// select `{x, select, …}`. CLDR-правила RU (one/few/many, дробные → other) и EN (one/other).
function pluralCategory(lang, n) {
  const v = Math.abs(Number(n));
  if (!Number.isFinite(v)) return 'other';
  if (lang === 'ru') {
    if (!Number.isInteger(v)) return 'other';
    const m10 = v % 10;
    const m100 = v % 100;
    if (m10 === 1 && m100 !== 11) return 'one';
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'few';
    return 'many';
  }
  return v === 1 ? 'one' : 'other';
}

// Индекс парной `{}`: вложенные фигурные скобки учитываются.
function findClose(s, open) {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// Тело plural/select: последовательность `ключ{сообщение}`; сообщения рендерятся рекурсивно.
function parseOptions(body, vars, lang) {
  const opts = {};
  let i = 0;
  while (i < body.length) {
    while (i < body.length && /\s/.test(body[i])) i++;
    const m = /^[^\s{,]+/.exec(body.slice(i));
    if (!m) break;
    const key = m[0];
    i += key.length;
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body[i] !== '{') break;
    const close = findClose(body, i);
    if (close === -1) break;
    opts[key] = renderMessage(body.slice(i + 1, close), vars, lang);
    i = close + 1;
  }
  return opts;
}

// Один блок `{…}`: `{var}` → интерполяция; `{n, plural, …}` / `{x, select, …}`.
function evalBlock(inner, vars, lang) {
  const ci1 = inner.indexOf(',');
  if (ci1 === -1) {
    const name = inner.trim();
    return vars && vars[name] !== undefined ? String(vars[name]) : `{${name}}`;
  }
  const name = inner.slice(0, ci1).trim();
  const rest = inner.slice(ci1 + 1);
  const ci2 = rest.indexOf(',');
  const type = (ci2 === -1 ? rest : rest.slice(0, ci2)).trim();
  const body = ci2 === -1 ? '' : rest.slice(ci2 + 1);
  const opts = parseOptions(body, vars, lang);
  if (type === 'plural') {
    const cat = pluralCategory(lang, vars?.[name]);
    return opts[cat] ?? opts.other ?? '';
  }
  if (type === 'select') {
    const value = vars?.[name];
    return opts[String(value)] ?? opts.other ?? '';
  }
  return `{${inner}}`;
}

function renderMessage(s, vars, lang) {
  let out = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '{') {
      const close = findClose(s, i);
      if (close === -1) return out + s.slice(i);
      out += evalBlock(s.slice(i + 1, close), vars, lang);
      i = close + 1;
    } else {
      out += s[i];
      i++;
    }
  }
  return out;
}

function t(lang, key, vars) {
  const dict = DICTS[lang] ?? DICTS.ru;
  const s = dict[key] ?? DICTS.ru[key] ?? key;
  return s.includes('{') ? renderMessage(s, vars, lang) : s;
}

// Обратная совместимость: тонкая обёртка поверх CLDR-категорий (интерфейс §швы).
// RU: forms = [one, few, many/other]; EN: forms = [one, other].
function plural(lang, n, forms) {
  const cat = pluralCategory(lang, n);
  if (lang === 'ru') return forms[cat === 'one' ? 0 : cat === 'few' ? 1 : 2];
  return cat === 'one' ? forms[0] : forms[1];
}

// «13 сентября 2026» / «13 Sep, 2026»; короткие «13.09» / «Sep 13» (§11.2).
// Собирается из formatToParts, чтобы строка не зависела от суффиксов ICU («г.» и т.п.).
function date(lang, iso, short = false) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  const locale = LOCALES[lang] ?? LOCALES.ru;
  const pad = (x) => String(x).padStart(2, '0');
  if (lang === 'ru') {
    if (short) return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;
    const parts = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).formatToParts(d);
    const get = (type) => (parts.find((p) => p.type === type) ?? {}).value ?? '';
    return `${get('day')} ${get('month')} ${get('year')}`;
  }
  if (short) {
    const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(d);
    return `${month} ${d.getDate()}`;
  }
  const parts = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).formatToParts(d);
  const get = (type) => (parts.find((p) => p.type === type) ?? {}).value ?? '';
  return `${get('day')} ${get('month')}, ${get('year')}`;
}

exports["LANGS"] = LANGS;
exports["t"] = t;
exports["plural"] = plural;
exports["date"] = date;
return exports;
}]);
factories.push(["js/risk.js", function (exports) {
// Шкала §10 (PRD): 0–20 Calm … 97–100 Extreme threat.
// Единственное место, где живут пороги.
const SCALE = [
  { max: 20, id: 'calm' },
  { max: 40, id: 'tense' },
  { max: 60, id: 'danger' },
  { max: 80, id: 'very' },
  { max: 96, id: 'critical' },
  { max: 100, id: 'extreme' },
];

const TONES = {
  calm: '--state-calm',
  tense: '--state-tense',
  danger: '--state-danger',
  very: '--state-very',
  critical: '--state-critical',
  extreme: '--state-extreme',
};

function status(index) {
  if (typeof index !== 'number' || Number.isNaN(index) || index < 0 || index > 100) return null;
  return SCALE.find((s) => index <= s.max).id;
}

function tone(statusId) {
  return TONES[statusId] ?? null;
}

// Цвет недельного изменения: рост → --state-very, снижение → --state-calm, ноль → --text-secondary.
function deltaTone(change) {
  if (typeof change !== 'number' || Number.isNaN(change)) return null;
  if (change > 0) return '--state-very';
  if (change < 0) return '--state-calm';
  return '--text-secondary';
}

exports["SCALE"] = SCALE;
exports["status"] = status;
exports["tone"] = tone;
exports["deltaTone"] = deltaTone;
return exports;
}]);
factories.push(["js/ui.js", function (exports) {
const risk = __ci_require("js/risk.js");
// js/ui.js — общие хелперы интерфейса, единый экземпляр каждого (таск 11):
// el() — DOM-фабрика секций; deltaClass() — класс тона Δ из risk.deltaTone;
// resolveLang() — язык из localStorage/navigator; parseWeekParam() — разбор ?week=.
// Модуль без побочных эффектов: безопасен для импорта из privacy.html и тестов.


// DOM-фабрика: createElement + className + textContent (конвенция проекта —
// никакого innerHTML со строками).
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Класс тона недельного изменения — из risk.deltaTone (единый каскад §12,
// пороги направления живут в risk.js, а не в знаковых ветках по месту).
const DELTA_CLASS = {
  '--state-very': 'delta--rise',
  '--state-calm': 'delta--fall',
  '--text-secondary': 'delta--same',
};

function deltaClass(change) {
  return DELTA_CLASS[risk.deltaTone(change)] ?? null;
}

const LANG_KEY = 'cassandra.lang';

// §11.1: сохранённый выбор побеждает; без сохранённого — язык браузера;
// не определён — дефолт 'ru'.
function resolveLang() {
  try {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LANG_KEY) : null;
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    /* хранилище недоступно — остаёмся на дефолте */
  }
  const nav = typeof navigator !== 'undefined' && navigator.language ? navigator.language : '';
  if (!nav) return 'ru';
  return nav.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

// Разбор ?week= из query-строки: строгий формат YYYY-MM-DD, иначе null.
// Владелец разбора — один на app.js/share.js/sections.
function parseWeekParam(search) {
  if (typeof search !== 'string' || !search) return null;
  const q = new URLSearchParams(search).get('week');
  return q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? q : null;
}

exports["el"] = el;
exports["deltaClass"] = deltaClass;
exports["LANG_KEY"] = LANG_KEY;
exports["resolveLang"] = resolveLang;
exports["parseWeekParam"] = parseWeekParam;
return exports;
}]);
factories.push(["js/sections/hero.js", function (exports) {
const { t, date } = __ci_require("js/i18n.js");
const risk = __ci_require("js/risk.js");
const region = __ci_require("js/region.js");
const { deltaClass } = __ci_require("js/ui.js");
// Секция hero (js/render.js регистрирует render как 'hero'): глобальный индекс,
// персональная строка региона, inline-панель выбора региона.
// Чистые функции (formatDelta, deltaArrow, refineRegionFromCoords) — без DOM, тестируются.


// Δ со знаком: +6 / -3 / 0 (значения не только цветом — §12).
// Не-число (null/NaN) → '0': изменение неизвестно, показываем нейтральное значение.
function formatDelta(n) {
  if (typeof n !== 'number' || Number.isFinite(n) === false) return '0';
  if (n > 0) return `+${n}`;
  if (n < 0) return `${n}`;
  return '0';
}

function deltaArrow(n) {
  if (typeof n !== 'number' || Number.isFinite(n) === false) return '→';
  if (n > 0) return '↑';
  if (n < 0) return '↓';
  return '→';
}

// Демо-маппинг координат → один из 6 регионов (без tz-базы; грубые bounding-box).
// Принятое решение — долготный: всё западнее −45° считается Северной Америкой,
// восточнее 95° — Восточной Азией; внутри — уточнение по широте.
// Координаты вне справочника → null (ничего не меняем).
const COORD_BOXES = [
  ['middle-east', 10, 45, 25, 70],
  ['europe', 36, 72, -30, 40],
  ['east-asia', -12, 55, 95, 180],
  ['south-asia', 5, 40, 60, 95],
  ['north-america', -60, 75, -180, -45],
  ['africa', -40, 37, -20, 52],
];

function refineRegionFromCoords(lat, lon) {
  if (typeof lat !== 'number' || typeof lon !== 'number') return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  for (const [id, latMin, latMax, lonMin, lonMax] of COORD_BOXES) {
    if (lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax) return id;
  }
  return null;
}

// Состояние модуля: город из автокомплита живёт в сессии модуля (сигнатуры region.js не трогаем).
let chosenCity = null;      // { name: {ru,en}, region: id } — после выбора города в поиске
let panel = null;           // построенный DOM панели (переживает перерендеры)
let panelOpen = false;
let activeOption = -1;      // активный пункт автокомплита
let current = null;         // последний appState (для синхронизации панели)
let lastTrigger = null;     // кнопка, открывшая панель (для возврата фокуса)

function setDelta(el, value) {
  if (!el) return;
  const val = el.querySelector('[data-role$="-delta-value"]') ?? el;
  val.textContent = `${deltaArrow(value)} ${formatDelta(value)}`;
  el.classList.remove('delta--rise', 'delta--fall', 'delta--same');
  const cls = deltaClass(value);
  if (cls) el.classList.add(cls);
}

// Текст статуса — всегда языком интерфейса; цвет не инлайним (контраст §12,
// тон состояния несёт левая полоса карточки региона).
function setStatus(el, index, lang, lower) {
  if (!el) return;
  const id = risk.status(index);
  el.textContent = id ? t(lang, lower ? `statusLower.${id}` : `status.${id}`) : '';
}

// ---------- Панель выбора региона ----------

function buildPanel(host, state) {
  const lang = state.lang;
  host.innerHTML = `
    <div class="picker" role="dialog" data-i18n-aria="region.panel.title" aria-label="${t(lang, 'region.panel.title')}">
      <div class="picker-chips" data-role="picker-chips"></div>
      <input class="picker-input" type="text" data-role="picker-input"
             autocomplete="off" spellcheck="false"
             placeholder="${t(lang, 'region.panel.search')}"
             data-i18n-aria="region.panel.search" data-i18n-placeholder="region.panel.search"
             aria-label="${t(lang, 'region.panel.search')}" aria-expanded="false"
             aria-controls="picker-list" role="combobox">
      <ul id="picker-list" class="picker-list" data-role="picker-list" role="listbox" hidden></ul>
      <div class="picker-row">
        <button type="button" class="picker-remember" role="switch" aria-checked="false" data-role="picker-remember">
          <span data-i18n="region.panel.remember">${t(lang, 'region.panel.remember')}</span>
        </button>
        <button type="button" class="picker-geo" data-role="picker-geo" data-i18n="region.panel.geolocate">${t(lang, 'region.panel.geolocate')}</button>
        <span class="picker-hint" data-i18n="region.panel.remember.hint">${t(lang, 'region.panel.remember.hint')}</span>
        <button type="button" class="picker-cancel" data-role="picker-cancel" data-i18n="region.panel.cancel">${t(lang, 'region.panel.cancel')}</button>
      </div>
    </div>`;
  panel = host.firstElementChild;

  const input = panel.querySelector('[data-role="picker-input"]');
  const list = panel.querySelector('[data-role="picker-list"]');

  panel.querySelector('[data-role="picker-cancel"]').addEventListener('click', () => closePanel(true));
  panel.querySelector('[data-role="picker-remember"]').addEventListener('click', (e) => {
    const sw = e.currentTarget;
    sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true'));
  });

  const geoBtn = panel.querySelector('[data-role="picker-geo"]');
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    geoBtn.addEventListener('click', () => {
      // Geolocation — только по клику; отказ: ничего не меняется, без ошибок (R51).
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const id = refineRegionFromCoords(pos.coords.latitude, pos.coords.longitude);
          if (id) pick(id, null);
        },
        () => { /* отказ/таймаут — текущий регион без изменений */ },
        { timeout: 8000 },
      );
    });
  } else {
    geoBtn.hidden = true;
  }

  input.addEventListener('input', () => renderList());
  input.addEventListener('blur', () => {
    // Тап по пункту успевает сработать раньше скрытия (mousedown → blur → click).
    setTimeout(() => {
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      activeOption = -1;
    }, 150);
  });
  input.addEventListener('keydown', (e) => {
    const options = listItems();
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (list.hidden || !options.length) return;
      e.preventDefault();
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      activeOption = (activeOption + dir + options.length) % options.length;
      paintActive(options);
    } else if (e.key === 'Enter') {
      if (list.hidden || !options.length) return;
      e.preventDefault();
      const idx = activeOption >= 0 ? activeOption : 0;
      options[idx].querySelector('button').click();
    } else if (e.key === 'Escape') {
      // Текст не теряется: список закрывается, ввод остаётся (R50).
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      activeOption = -1;
    }
  });

  renderChips(state);
}

function listItems() {
  return [...panel.querySelectorAll('[data-role="picker-list"] li[data-region]')];
}

function paintActive(options) {
  options.forEach((li, i) => {
    li.classList.toggle('is-active', i === activeOption);
    li.setAttribute('aria-selected', String(i === activeOption));
  });
  options[activeOption]?.scrollIntoView({ block: 'nearest' });
}

function renderChips(state) {
  const host = panel.querySelector('[data-role="picker-chips"]');
  host.innerHTML = '';
  for (const r of region.REGIONS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.setAttribute('aria-pressed', String(r.id === state.region));
    b.textContent = `${r.name[state.lang]} · ${r.city[state.lang]}`;
    b.addEventListener('click', () => pick(r.id, null));
    host.appendChild(b);
  }
}

function renderList() {
  const lang = current.lang;
  const input = panel.querySelector('[data-role="picker-input"]');
  const list = panel.querySelector('[data-role="picker-list"]');
  const results = region.search(input.value);
  list.innerHTML = '';
  activeOption = -1;
  if (!results.length) {
    const li = document.createElement('li');
    li.className = 'picker-empty';
    li.textContent = t(lang, 'region.panel.notfound');
    list.appendChild(li);
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    return;
  }
  results.forEach((c, i) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.dataset.region = c.region;
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = `${c.name[lang]} · ${c.regionName[lang]}`;
    b.addEventListener('click', () => pick(c.region, c));
    li.appendChild(b);
    list.appendChild(li);
    if (i === 0) activeOption = 0;
  });
  paintActive(listItems());
  list.hidden = false;
  input.setAttribute('aria-expanded', 'true');
}

function pick(id, city) {
  chosenCity = city ? { name: city.name, region: id } : null;
  const persist = panel.querySelector('[data-role="picker-remember"]').getAttribute('aria-checked') === 'true';
  closePanel(false);
  document.dispatchEvent(new CustomEvent('ci:regionchange', { detail: { id, persist } }));
}

function openPanel(state, trigger) {
  const host = document.querySelector('[data-role="region-picker"]');
  if (!host) return;
  if (!panel) buildPanel(host, state);
  lastTrigger = trigger ?? null;
  panel.parentElement.hidden = false;
  panelOpen = true;
  setTriggersExpanded(true);
  renderChips(state);
  // Полный список городов не показываем до ввода: фокус в поле, список скрыт.
  const list = panel.querySelector('[data-role="picker-list"]');
  list.hidden = true;
  panel.querySelector('[data-role="picker-input"]').setAttribute('aria-expanded', 'false');
  panel.querySelector('[data-role="picker-input"]').focus();
}

function closePanel(refocus) {
  if (!panel) return;
  panel.parentElement.hidden = true;
  panelOpen = false;
  setTriggersExpanded(false);
  if (refocus) (lastTrigger ?? document.querySelector('[data-role="region-change"]'))?.focus();
}

function setTriggersExpanded(v) {
  document.querySelectorAll('[data-role="region-change"], [data-role="region-cta"]')
    .forEach((b) => b.setAttribute('aria-expanded', String(v)));
}

// Синхронизация открытой панели после renderAll (смена языка/региона): текст ввода не трогаем.
function syncPanel(state) {
  renderChips(state);
  const input = panel.querySelector('[data-role="picker-input"]');
  const list = panel.querySelector('[data-role="picker-list"]');
  if (!list.hidden && input.value.trim()) renderList();
}

// ---------- Рендер секции ----------

function render(appState) {
  if (typeof document === 'undefined') return;
  const root = document.querySelector('#overview');
  if (!root) return;
  current = appState;
  const { lang, snapshot } = appState;
  const $ = (sel) => root.querySelector(sel);

  if (!root.dataset.heroBound) {
    root.dataset.heroBound = '1';
    $('[data-role="region-change"]').addEventListener('click', (e) => openPanel(current, e.currentTarget));
    $('[data-role="region-cta"]').addEventListener('click', (e) => openPanel(current, e.currentTarget));
  }

  // Глобальный индекс + статус + Δ + обе даты.
  const g = snapshot?.global;
  const gDelta = $('[data-role="global-delta"]');
  if (g) {
    $('[data-role="global-index"]').textContent = String(g.index);
    setStatus($('[data-role="global-status"]'), g.index, lang, false);
    setDelta(gDelta, g.delta);
    gDelta.hidden = false;
  } else {
    // Нет глобальных данных: показываем состояние явно, без прошлых чисел (§7).
    $('[data-role="global-index"]').textContent = '—';
    $('[data-role="global-status"]').textContent = t(lang, 'state.unavailable');
    gDelta.hidden = true;
  }
  if (snapshot?.published) $('[data-role="meta-published"]').textContent = date(lang, snapshot.published);
  if (snapshot?.through) $('[data-role="meta-through"]').textContent = date(lang, snapshot.through);

  // Персональная строка региона.
  const card = $('[data-role="region-card"]');
  const cta = $('[data-role="region-cta"]');
  const regId = appState.region;
  if (!regId) {
    // Нераспознанный пояс: нейтральный hero + CTA (R46.1).
    card.hidden = true;
    cta.hidden = false;
  } else {
    card.hidden = false;
    cta.hidden = true;
    const reg = region.get(regId);
    const cityName = chosenCity && chosenCity.region === regId ? chosenCity.name[lang] : reg.city[lang];
    $('[data-role="region-city"]').textContent = cityName;
    $('[data-role="region-name"]').textContent = reg.name[lang];
    const stats = $('[data-role="region-stats"]');
    const rdata = snapshot?.regions?.[regId];
    if (rdata) {
      stats.hidden = false;
      $('[data-role="region-unavailable"]').hidden = true;
      $('[data-role="region-index"]').textContent = String(rdata.index);
      setStatus($('[data-role="region-status"]'), rdata.index, lang, true);
      setDelta($('[data-role="region-delta"]'), rdata.delta);
      card.style.setProperty('--region-tone', `var(${risk.tone(risk.status(rdata.index))})`);
    } else {
      // Региональный снапшот недоступен: глобальный жив, строка — fallback (R56.1).
      stats.hidden = true;
      const un = $('[data-role="region-unavailable"]');
      un.hidden = false;
      un.textContent = t(lang, 'region.unavailable');
      card.style.setProperty('--region-tone', 'var(--text-muted)');
    }
    // Приписка — только после выбора города в поиске (История 9); чипы и геолокация — без неё.
    $('[data-role="region-note"]').hidden = !chosenCity;
  }

  if (panel && panelOpen) syncPanel(appState);
}

exports["formatDelta"] = formatDelta;
exports["deltaArrow"] = deltaArrow;
exports["refineRegionFromCoords"] = refineRegionFromCoords;
exports["render"] = render;
return exports;
}]);
factories.push(["js/sections/drivers.js", function (exports) {
const { t, date } = __ci_require("js/i18n.js");
const { el } = __ci_require("js/ui.js");
// Секция «Что изменилось» (регистрируется как 'drivers'): три драйвера недели
// по цепочке Наблюдение → Почему это важно → Уверенность → Источники (§4.3)
// + дополнительные измерения риска без процентов (R41, §4.5).
// Чистые швы (sourcesLabel, visibleSources, resolveMeasures) — без DOM, тестируются.


const LEVELS = ['high', 'medium', 'low'];

// Кнопка аккордеона: «3 источника» / «3 sources» (§4.3.1, ICU-plural §11.2).
// Склонения живут в словаре (sources.word) — целиком ICU-строка, без конкатенации.
function sourcesLabel(lang, n) {
  return t(lang, 'sources.word', { n });
}

// >5 источников: первые 5 + «Показать все источники» (§4.3.1).
function visibleSources(sources, showAll) {
  const list = Array.isArray(sources) ? sources : [];
  if (showAll || list.length <= 5) return { shown: list, remaining: 0 };
  return { shown: list.slice(0, 5), remaining: list.length - 5 };
}

// R41: уровни измерений из снапшота (snapshot.measures), дефолты — демо.
// data/ пока не отдаёт measures: пайплайн добавит поле — код подхватит без правки.
const DEFAULT_MEASURES = { direct: 'high', nuclear: 'low' };

function resolveMeasures(snapshot) {
  const m = snapshot?.measures ?? {};
  const pick = (v) => (LEVELS.includes(v) ? v : null);
  return {
    direct: pick(m.direct) ?? DEFAULT_MEASURES.direct,
    nuclear: pick(m.nuclear) ?? DEFAULT_MEASURES.nuclear,
  };
}

// Краткий пользовательский лейбл карточки (§4.3): короткое имя драйвера,
// отличное от observation. Локализованное поле данных { ru, en }; фолбэк на RU.
function driverLabel(lang, drv) {
  return drv?.label?.[lang] ?? drv?.label?.ru ?? '';
}

// Гендерные уровни: «высокий вклад» / «высокая уверенность» (§11.2).
// Экспортируется — общий компонент уверенности для карточек регионов (таск 05).
function levelLabel(lang, kind, level) {
  return t(lang, `drivers.${kind}.${level}`);
}

// Уверенность драйвера: слово с родом + строка-причина при сниженной уверенности
// (меньше данных / противоречащие сигналы / неполное покрытие — формулирует редактор снапшота).
function confidenceInfo(lang, drv) {
  const note = drv?.confidence !== 'high' ? (drv?.confidenceNote?.[lang] ?? null) : null;
  return { word: levelLabel(lang, 'confidence', drv?.confidence), note };
}

// ---------- DOM ----------

const LEVEL_TONE = {
  high: '--state-very',
  medium: '--state-danger',
  low: '--state-calm',
};

function buildSourceItem(lang, src) {
  const li = el('li', 'driver-source');
  const a = el('a', 'driver-source-link');
  a.href = src.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.append(el('span', 'driver-source-title', src.title?.[lang] ?? src.title?.ru ?? ''));
  const meta = el('span', 'driver-source-meta');
  meta.append(el('span', 'driver-source-domain', src.domain ?? ''));
  meta.append(el('span', 'driver-source-date', date(lang, src.date, true)));
  a.append(meta);
  li.append(a);
  return li;
}

// Аккордеон источников (§4.3.1) — единый builder для драйверов и регионов.
// Возвращает узлы, чтобы вызывающий сам решил, куда их вставить: карточка
// драйвера добавляет в корень, блок региона — в обёртку .region-driver-sources.
function buildSourcesAccordion(lang, sources, listId) {
  const list = el('ul', 'driver-sources');
  list.id = listId;
  const moreBtn = el('button', 'driver-sources-more', t(lang, 'drivers.sources.showAll'));
  moreBtn.type = 'button';
  moreBtn.hidden = true;

  const state = { expanded: false, showAll: false };

  const paint = () => {
    const { shown, remaining } = visibleSources(sources, state.showAll);
    list.innerHTML = '';
    for (const src of shown) list.append(buildSourceItem(lang, src));
    // Кнопка «все источники» живёт под раскрытым списком: при свёрнутом
    // аккордеоне не показываем (иначе — висящая кнопка без списка).
    moreBtn.hidden = !state.expanded || (!state.showAll && remaining === 0);
    moreBtn.textContent = state.showAll
      ? t(lang, 'drivers.sources.hideAll')
      : t(lang, 'drivers.sources.showAll');
    list.hidden = !state.expanded;
    toggle.setAttribute('aria-expanded', String(state.expanded));
    // При раскрытии label меняется: «N источников — скрыть» (§4.3.1).
    toggle.querySelector('[data-role="src-count"]').textContent = state.expanded
      ? `${sourcesLabel(lang, sources.length)} — ${t(lang, 'drivers.sources.hide')}`
      : sourcesLabel(lang, sources.length);
    toggle.classList.toggle('is-open', state.expanded);
  };

  const toggle = el('button', 'src-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', listId);
  toggle.append(el('span', 'src-toggle-label', ''));
  toggle.querySelector('.src-toggle-label').dataset.role = 'src-count';
  toggle.addEventListener('click', () => {
    state.expanded = !state.expanded;
    paint();
  });
  moreBtn.addEventListener('click', () => {
    state.showAll = !state.showAll;
    paint();
  });

  paint();
  return { toggle, list, moreBtn };
}

function buildDriverCard(lang, drv, index) {
  const card = el('article', 'driver-card');
  card.dataset.driver = String(index);

  // Карточка начинается с краткого лейбла (§4.3), затем цепочка Наблюдение → …
  card.append(el('h3', 'driver-label', driverLabel(lang, drv)));

  card.append(el('p', 'driver-overline', t(lang, 'drivers.observation')));
  card.append(el('p', 'driver-observation', drv.observation?.[lang] ?? ''));

  card.append(el('p', 'driver-overline', t(lang, 'drivers.why')));
  card.append(el('p', 'driver-why', drv.why?.[lang] ?? ''));

  // Вклад · Уверенность — словами, род согласован (§11.2); значения не только цветом.
  const metaLine = el('p', 'driver-meta');
  const contribution = el('span', 'driver-chip');
  contribution.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.contribution.label')}:`));
  contribution.append(el('span', 'driver-chip-value', levelLabel(lang, 'contribution', drv.contribution)));
  const confidence = el('span', 'driver-chip');
  confidence.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  confidence.append(el('span', 'driver-chip-value', confidenceInfo(lang, drv).word));
  metaLine.append(contribution, el('span', 'driver-meta-sep', '·'), confidence);
  card.append(metaLine);

  // Причина сниженной уверенности — строкой из данных (общий компонент confidenceInfo).
  const conf = confidenceInfo(lang, drv);
  if (conf.note) {
    card.append(el('p', 'driver-confidence-note', conf.note));
  }

  // Аккордеон источников (§4.3.1): кнопка --accent, chevron 90°, aria-expanded/aria-controls.
  const sources = Array.isArray(drv.sources) ? drv.sources : [];
  const acc = buildSourcesAccordion(lang, sources, `driver-${index}-sources`);
  card.append(acc.toggle, acc.list, acc.moreBtn);
  return card;
}

function buildMeasureRow(lang, key, level, defKey) {
  const row = el('div', 'measure');
  const head = el('button', 'measure-head');
  head.type = 'button';
  head.setAttribute('aria-expanded', 'false');
  head.setAttribute('aria-controls', `measure-${key}`);
  head.setAttribute('aria-label', `${t(lang, `drivers.measures.${key}`)} — ${t(lang, `drivers.measures.level.${level}`)}`);

  const left = el('span', 'measure-left');
  left.append(el('span', 'measure-name', t(lang, `drivers.measures.${key}`)));
  const lvl = el('span', `measure-level measure-level--${level}`);
  lvl.style.setProperty('--measure-tone', `var(${LEVEL_TONE[level]})`);
  lvl.append(el('span', 'measure-dot', ''), el('span', '', t(lang, `drivers.measures.level.${level}`)));
  left.append(lvl);
  head.append(left);

  const body = el('div', 'measure-body');
  body.id = `measure-${key}`;
  body.hidden = true;
  body.append(el('p', 'measure-line', t(lang, 'drivers.measures.horizon')));
  body.append(el('p', 'measure-line', t(lang, defKey)));
  body.append(el('p', 'measure-line measure-calibration', t(lang, 'drivers.measures.calibration')));

  head.addEventListener('click', () => {
    const open = head.getAttribute('aria-expanded') === 'true';
    head.setAttribute('aria-expanded', String(!open));
    body.hidden = open;
    head.classList.toggle('is-open', !open);
  });

  row.append(head, body);
  return row;
}

function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="drivers"]');
  if (!host) return;
  const { lang, snapshot } = appState;
  host.innerHTML = '';

  const drivers = Array.isArray(snapshot?.drivers) ? snapshot.drivers : [];
  const cards = el('div', 'drivers-list');
  drivers.forEach((drv, i) => cards.append(buildDriverCard(lang, drv, i)));
  host.append(cards);

  const measures = resolveMeasures(snapshot);
  const mHost = el('div', 'measures');
  mHost.append(el('h3', 'measures-title', t(lang, 'drivers.measures.title')));
  mHost.append(buildMeasureRow(lang, 'direct', measures.direct, 'drivers.measures.direct.def'));
  mHost.append(buildMeasureRow(lang, 'nuclear', measures.nuclear, 'drivers.measures.nuclear.def'));
  host.append(mHost);
}

exports["sourcesLabel"] = sourcesLabel;
exports["visibleSources"] = visibleSources;
exports["resolveMeasures"] = resolveMeasures;
exports["driverLabel"] = driverLabel;
exports["levelLabel"] = levelLabel;
exports["confidenceInfo"] = confidenceInfo;
exports["buildSourceItem"] = buildSourceItem;
exports["buildSourcesAccordion"] = buildSourcesAccordion;
exports["render"] = render;
return exports;
}]);
factories.push(["js/sections/trend.js", function (exports) {
const { t, date } = __ci_require("js/i18n.js");
const { el } = __ci_require("js/ui.js");
// Секция «Тренд» (регистрируется как 'trend'): интерактивный график индекса
// за 12 недель, целиком инлайн-SVG из данных снапшота (Решение п.8, История 13).
// Подпись: текущее значение, неделю назад, направление, нарративный summary.
// Чистые швы (signedDelta, arrowOf, directionOf, pointAriaLabel, summaryText,
// clampX) — без DOM, тестируются; aria-label точек вместо aria-live (§19.25).


// Δ со знаком: '+6' | '-3' | '0' (подпись и summary).
function signedDelta(n) {
  if (!Number.isFinite(n)) return '0';
  const r = Math.round(n);
  if (r > 0) return `+${r}`;
  if (r < 0) return `-${Math.abs(r)}`;
  return '0';
}

// Стрелка направления: значения не только цветом (R24).
function arrowOf(delta) {
  return delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
}

function directionOf(delta) {
  return delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
}

// aria-label точки графика: «значение, дата» на языке интерфейса (§19.25).
function pointAriaLabel(lang, point) {
  return t(lang, 'trend.point.aria', {
    value: point?.value ?? 0,
    date: date(lang, point?.date),
  });
}

// Дата вторичной строки tooltip: длинный локальный формат, совпадает с aria-label
// точки (История 13 / R36: «13 сентября 2026 / 13 Sep, 2026», не короткий «13.09»).
function tooltipDate(lang, point) {
  return date(lang, point?.date);
}

// Короткий нарративный summary: Δ за неделю и за всё окно, слово «пункт» со склонением (ICU).
function summaryText(lang, points) {
  const list = Array.isArray(points) ? points : [];
  if (list.length < 2) return '';
  const cur = list[list.length - 1].value;
  const prev = list[list.length - 2].value;
  const week = cur - prev;
  const total = cur - list[0].value;
  return t(lang, 'trend.summary', {
    week: signedDelta(week),
    weekWord: t(lang, 'trend.points', { n: Math.abs(week) }),
    total: signedDelta(total),
    totalWord: t(lang, 'trend.points', { n: Math.abs(total) }),
  });
}

// Tooltip не выходит за контейнер по X (История 13): позиция зажата с обеих сторон.
function clampX(left, width, containerWidth) {
  const max = Math.max(0, containerWidth - width);
  return Math.min(Math.max(left, 0), max);
}

// ---------- DOM ----------

const NS = 'http://www.w3.org/2000/svg';
const VIEW_W = 640;
const VIEW_H = 280;
const PAD = { top: 16, right: 14, bottom: 30, left: 34 };
const GRID = [30, 60, 90];
const TAP_HIDE_MS = 3500;

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="trend"]');
  if (!host) return;
  const { lang, snapshot } = appState;
  host.innerHTML = '';

  const points = Array.isArray(snapshot?.trend) ? snapshot.trend : [];
  if (points.length < 2) return;

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const week = last.value - prev.value;

  // Подпись: текущее, неделю назад, направление (словом и стрелкой), summary.
  const caption = el('p', 'trend-caption');
  caption.append(el('span', 'trend-caption-item', t(lang, 'trend.now', { value: last.value })));
  caption.append(el('span', 'trend-caption-item', t(lang, 'trend.weekAgo', { value: prev.value })));
  const dir = el('span', 'trend-caption-item');
  dir.append(el('span', 'trend-caption-label', `${t(lang, 'trend.direction.label')}:`));
  dir.append(el('span', 'trend-direction', `${t(lang, `trend.direction.${directionOf(week)}`)} ${arrowOf(week)}`));
  caption.append(dir);
  host.append(caption);
  host.append(el('p', 'trend-summary', summaryText(lang, points)));

  // График: контейнер + инлайн-SVG + HTML-tooltip (mono 15/600 + mono 11 muted).
  const chart = el('div', 'trend-chart');
  chart.dataset.role = 'trend-chart';
  const svg = svgEl('svg', {
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    role: 'img',
    'aria-label': t(lang, 'trend.chart.label'),
  });

  const x = (i) => PAD.left + (i / (points.length - 1)) * (VIEW_W - PAD.left - PAD.right);
  const y = (v) => PAD.top + (1 - Math.min(100, Math.max(0, v)) / 100) * (VIEW_H - PAD.top - PAD.bottom);
  const coords = points.map((p, i) => [x(i), y(p.value)]);

  // Градиентная область rgba(88,166,255,.30) → 0 (§4.4).
  const defs = svgEl('defs');
  const grad = svgEl('linearGradient', { id: 'trend-area-fill', x1: 0, y1: 0, x2: 0, y2: 1 });
  grad.append(svgEl('stop', { offset: '0%', 'stop-color': 'rgba(88,166,255,.30)' }));
  grad.append(svgEl('stop', { offset: '100%', 'stop-color': 'rgba(88,166,255,0)' }));
  defs.append(grad);
  svg.append(defs);

  // Направляющие 30/60/90 (--border-soft 1px) с подписями mono 10px.
  for (const g of GRID) {
    svg.append(svgEl('line', {
      x1: PAD.left, x2: VIEW_W - PAD.right, y1: y(g), y2: y(g),
      stroke: 'var(--border-soft)', 'stroke-width': 1,
    }));
    const label = svgEl('text', { x: PAD.left - 8, y: y(g) + 3, 'text-anchor': 'end' });
    label.setAttribute('class', 'trend-grid-label');
    label.textContent = String(g);
    svg.append(label);
  }
  svg.append(svgEl('line', {
    x1: PAD.left, x2: VIEW_W - PAD.right, y1: y(0), y2: y(0),
    stroke: 'var(--border-soft)', 'stroke-width': 1,
  }));

  // Область под линией и сама линия 2px --accent.
  const baseline = y(0);
  const area = svgEl('path', {
    d: `M ${coords[0][0]} ${baseline} ` + coords.map(([cx, cy]) => `L ${cx} ${cy}`).join(' ') + ` L ${coords[coords.length - 1][0]} ${baseline} Z`,
    fill: 'url(#trend-area-fill)',
  });
  svg.append(area);
  svg.append(svgEl('polyline', {
    points: coords.map(([cx, cy]) => `${cx},${cy}`).join(' '),
    fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2,
  }));

  // Tooltip: «N / 100» (mono 15/600, доминирует) + дата (mono 11, muted). aria-hidden —
  // данные дублируются в aria-label точек (§19.25); позиция зажата по X.
  const tooltip = el('div', 'trend-tooltip');
  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.hidden = true;
  const tipValue = el('span', 'trend-tooltip-value');
  const tipDate = el('span', 'trend-tooltip-date');
  tooltip.append(tipValue, tipDate);

  let tapTimer = null;

  const hide = () => {
    tooltip.hidden = true;
  };

  const show = (hitEl, p) => {
    tipValue.textContent = `${p.value} / 100`;
    tipDate.textContent = tooltipDate(lang, p);
    tooltip.hidden = false;
    const chartRect = chart.getBoundingClientRect();
    const r = hitEl.getBoundingClientRect();
    const left = clampX(
      r.left + r.width / 2 - chartRect.left - tooltip.offsetWidth / 2,
      tooltip.offsetWidth,
      chartRect.width
    );
    tooltip.style.left = `${Math.round(left)}px`;
    tooltip.style.top = `${Math.round(r.top - chartRect.top - tooltip.offsetHeight - 10)}px`;
  };

  // Точки: фокусируемые (tabindex=0, role=button, aria-label «значение, дата»),
  // последняя крупнее с обводкой --surface; увеличение на hover/фокус/tap — CSS.
  points.forEach((p, i) => {
    const wrap = svgEl('g');
    const hit = svgEl('circle', { cx: x(i), cy: y(p.value), r: 20, 'class': 'trend-hit' });
    const dot = svgEl('circle', {
      cx: x(i), cy: y(p.value), 'class': `trend-point${i === points.length - 1 ? ' trend-point--last' : ''}`,
    });
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', pointAriaLabel(lang, p));
    wrap.append(hit, dot);

    const activate = () => {
      dot.classList.add('is-active');
      show(dot, p);
    };
    const deactivate = () => {
      dot.classList.remove('is-active');
      hide();
    };
    wrap.addEventListener('pointerenter', activate);
    wrap.addEventListener('pointerleave', deactivate);
    // Клавиатура: focus/blur (фокус видимый — глобальный :focus-visible + рост точки).
    dot.addEventListener('focus', activate);
    dot.addEventListener('blur', deactivate);
    dot.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        hide();
        dot.blur();
      }
    });
    // Tap: показали — автоскрытие через 3.5 с (История 13).
    dot.addEventListener('click', () => {
      clearTimeout(tapTimer);
      activate();
      tapTimer = setTimeout(hide, TAP_HIDE_MS);
    });
    svg.append(wrap);
  });

  chart.append(svg, tooltip);
  host.append(chart);
}

exports["signedDelta"] = signedDelta;
exports["arrowOf"] = arrowOf;
exports["directionOf"] = directionOf;
exports["pointAriaLabel"] = pointAriaLabel;
exports["tooltipDate"] = tooltipDate;
exports["summaryText"] = summaryText;
exports["clampX"] = clampX;
exports["render"] = render;
return exports;
}]);
factories.push(["js/sections/regions.js", function (exports) {
const { t } = __ci_require("js/i18n.js");
const risk = __ci_require("js/risk.js");
const region = __ci_require("js/region.js");
const { el, deltaClass } = __ci_require("js/ui.js");
const { formatDelta, deltaArrow } = __ci_require("js/sections/hero.js");
const { confidenceInfo, levelLabel, driverLabel, buildSourcesAccordion } = __ci_require("js/sections/drivers.js");
// Секция «Что это значит для моего региона?» (регистрируется как 'regions'):
// ranked-лист всех 6 регионов по недельному изменению (§4.6, §5.1).
// Семантический ol/li — не карта: карта не может быть единственным источником
// значения. Клик/фокус раскрывает карточку: статус, Δ, драйверы, уверенность
// (с причиной при сниженной), источники — тот же аккордеон-шаблон, что в таске 03
// (переиспользуются чистые швы confidenceInfo/levelLabel и общий аккордеон
// источников buildSourcesAccordion из drivers.js — таск 11).
// Чистые швы (rankedRegions, statusLabel) — без DOM, тестируются.


// Ranked-лист: все регионы снапшота по убыванию |Δ|; при равенстве |Δ| рост выше
// снижения, дальше — порядок справочника. Битые записи пропускаем.
function rankedRegions(snapshot) {
  const regs = snapshot?.regions;
  if (!regs || typeof regs !== 'object') return [];
  const rows = [];
  for (const r of region.REGIONS) {
    const d = regs[r.id];
    if (!d || typeof d.delta !== 'number' || !Number.isFinite(d.delta)) continue;
    rows.push({ id: r.id, ...d });
  }
  const order = new Map(region.REGIONS.map((r, i) => [r.id, i]));
  rows.sort((a, b) => {
    const byAbs = Math.abs(b.delta) - Math.abs(a.delta);
    if (byAbs !== 0) return byAbs;
    if (b.delta !== a.delta) return b.delta - a.delta;
    return order.get(a.id) - order.get(b.id);
  });
  return rows;
}

// Слово статуса: нижний регистр — для встроенной строки (как в hero), верхний —
// для автономной подписи в карточке региона. Шкала §10 + словарь; вне шкалы — ''.
function statusLabel(lang, index, lower = true) {
  const id = risk.status(index);
  return id ? t(lang, `${lower ? 'statusLower' : 'status'}.${id}`) : '';
}

// ---------- DOM ----------

function deltaSpan(lang, value, extraClass = '') {
  const span = el('span', `delta ${extraClass}`.trim());
  const cls = deltaClass(value);
  if (cls) span.classList.add(cls);
  span.textContent = `${deltaArrow(value)} ${formatDelta(value)}`;
  span.setAttribute('aria-label', `${t(lang, 'hero.week.change')}: ${formatDelta(value)}`);
  return span;
}

// Источники драйвера — общий аккордеон-шаблон §4.3.1 из drivers.js (таск 11);
// регион оборачивает узлы в .region-driver-sources.
function wrapSourcesAccordion(lang, drv, uid) {
  const sources = Array.isArray(drv?.sources) ? drv.sources : [];
  const wrap = el('div', 'region-driver-sources');
  if (!sources.length) return wrap;
  const acc = buildSourcesAccordion(lang, sources, `region-src-${uid}`);
  wrap.append(acc.toggle, acc.list, acc.moreBtn);
  return wrap;
}

// Главные драйверы региона — кратко: лейбл/наблюдение, вклад и уверенность словами,
// причина при сниженной уверенности (общий компонент confidenceInfo, таск 03).
function buildDriverBlock(lang, drv, uid) {
  const block = el('div', 'region-driver');

  const label = driverLabel(lang, drv);
  if (label) block.append(el('h4', 'region-driver-label', label));
  block.append(el('p', 'region-driver-observation', drv.observation?.[lang] ?? ''));

  const meta = el('p', 'driver-meta');
  const contribution = el('span', 'driver-chip');
  contribution.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.contribution.label')}:`));
  contribution.append(el('span', 'driver-chip-value', levelLabel(lang, 'contribution', drv.contribution)));
  const conf = confidenceInfo(lang, drv);
  const confidence = el('span', 'driver-chip');
  confidence.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  confidence.append(el('span', 'driver-chip-value', conf.word));
  meta.append(contribution, el('span', 'driver-meta-sep', '·'), confidence);
  block.append(meta);
  if (conf.note) block.append(el('p', 'driver-confidence-note', conf.note));

  block.append(wrapSourcesAccordion(lang, drv, uid));
  return block;
}

// Раскрытая карточка региона (§4.6): статус, Δ, уверенность региона, драйверы, источники.
function buildDetail(lang, row, data, personal) {
  const detail = el('div', 'region-detail');

  // Статус + индекс + Δ: значения не только цветом — слова и знак рядом с тоном (§12).
  const head = el('p', 'region-detail-head');
  head.append(el('span', 'status', statusLabel(lang, row.index, false)));
  head.append(el('span', 'region-detail-index', `${row.index} ${t(lang, 'hero.index.of')}`));
  const d = deltaSpan(lang, row.delta);
  d.append(el('span', 'region-detail-week', ` ${t(lang, 'hero.week.change')}`));
  head.append(d);
  detail.append(head);

  // Уверенность по региону — словами; причина — если снапшот её отдаёт (поле
  // confidenceNote на уровне региона; демо-данные пока несут причины на драйверах —
  // они показываются ниже в блоках драйверов через тот же confidenceInfo).
  const conf = confidenceInfo(lang, data);
  const confLine = el('p', 'driver-meta');
  const chip = el('span', 'driver-chip');
  chip.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  chip.append(el('span', 'driver-chip-value', conf.word));
  confLine.append(chip);
  detail.append(confLine);
  if (conf.note) detail.append(el('p', 'driver-confidence-note', conf.note));

  // Приписка про контекстный риск — всегда в карточке (§5.1: индекс привязан к региону).
  detail.append(el('p', 'region-note', t(lang, 'region.note')));

  const drivers = Array.isArray(data?.drivers) ? data.drivers : [];
  if (drivers.length) {
    detail.append(el('h3', 'region-detail-subtitle', t(lang, 'regions.drivers')));
    drivers.forEach((drv, i) => detail.append(buildDriverBlock(lang, drv, `${row.id}-${i}`)));
  }

  return detail;
}

function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="regions"]');
  if (!host) return;
  const { lang, snapshot } = appState;
  const personal = appState.region;
  host.innerHTML = '';

  const rows = rankedRegions(snapshot);
  if (!rows.length) {
    host.append(el('p', 'region-unavailable', t(lang, 'region.unavailable')));
    return;
  }

  const list = el('ol', 'regions-list');
  rows.forEach((row, i) => {
    const li = el('li', 'region-row');
    if (row.id === personal) li.classList.add('is-personal');

    // Строка-раскрывалка: №, регион, Δ со знаком и цветом; личный регион — текстовым бейджем.
    const head = el('button', 'region-row-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    const detailId = `region-detail-${row.id}`;
    head.setAttribute('aria-controls', detailId);
    head.append(el('span', 'region-rank', String(i + 1)));
    head.append(el('span', 'region-name', region.get(row.id)?.name[lang] ?? row.id));
    if (row.id === personal) {
      // Бейдж текстом + aria — пометка не единственным полаганием на цвет (§12).
      head.append(el('span', 'region-yours', t(lang, 'regions.yours')));
      head.setAttribute('aria-label',
        `${region.get(row.id)?.name[lang] ?? row.id}, ${formatDelta(row.delta)}, ${t(lang, 'regions.yours')}`);
    }
    head.append(deltaSpan(lang, row.delta));

    const detail = buildDetail(lang, row, snapshot.regions[row.id], row.id === personal);
    detail.id = detailId;
    detail.hidden = true;

    head.addEventListener('click', () => {
      const open = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!open));
      detail.hidden = open;
      head.classList.toggle('is-open', !open);
    });

    li.append(head, detail);
    list.append(li);
  });
  host.append(list);
}

exports["rankedRegions"] = rankedRegions;
exports["statusLabel"] = statusLabel;
exports["render"] = render;
return exports;
}]);
factories.push(["js/sections/states.js", function (exports) {
const { t, date } = __ci_require("js/i18n.js");
const data = __ci_require("js/data.js");
// Секция «Состояния данных» (js/render.js регистрирует render как 'states'):
// бейдж состояния рядом с датами, баннер архивного снапшота, критический режим
// (функция данных, §6), экран «Model unavailable» с кнопкой повтора.
// Чистые швы (criticalModeOn, badgeTone, isHistorical, historyBannerText) — без DOM, тестируются.


// Критический режим: функция данных — global.index ≥81 (История 16, Решение п.10).
function criticalModeOn(snapshot) {
  const index = snapshot?.global?.index;
  return typeof index === 'number' && index >= 81;
}

// Бейдж состояния данных (§7): тон — класс-модификатор, текст всегда рядом (не только цветом).
const BADGE_TONES = {
  published: 'data-state-badge--published',
  updating: 'data-state-badge--updating',
  delayed: 'data-state-badge--delayed',
  insufficient: 'data-state-badge--insufficient',
  unavailable: 'data-state-badge--unavailable',
};

function badgeTone(dataState) {
  return BADGE_TONES[dataState] ?? BADGE_TONES.unavailable;
}

// Просмотр недели, отличной от latest — архивный снапшот (История 20 / §7).
function isHistorical(week, latestWeek) {
  return !!week && !!latestWeek && week !== latestWeek;
}

// Текст баннера архивного снапшота с датами просматриваемых данных (§7:
// устаревшее значение никогда не выглядит текущим — даты в тексте баннера).
function historyBannerText(lang, snapshot) {
  return t(lang, 'history.banner', {
    published: date(lang, snapshot.published),
    through: date(lang, snapshot.through),
  });
}

// ---------- Бейдж состояния рядом с датами публикации/покрытия ----------

function renderBadge(state) {
  const meta = document.querySelector('.hero .meta');
  if (!meta) return;
  let badge = meta.querySelector('[data-role="data-state-badge"]');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'data-state-badge';
    badge.dataset.role = 'data-state-badge';
    meta.appendChild(badge);
  }
  const dataState = state.dataState ?? 'unavailable';
  badge.textContent = t(state.lang, `state.${dataState}`);
  badge.className = `data-state-badge ${badgeTone(dataState)}`;
}

// ---------- Баннер архивного снапшота ----------

function renderHistoryBanner(state) {
  const host = document.querySelector('[data-role="history-banner"]');
  if (!host) return;
  if (!isHistorical(state.week, data.latest()) || !state.snapshot?.published) {
    host.hidden = true;
    host.textContent = '';
    return;
  }
  host.hidden = false;
  host.textContent = historyBannerText(state.lang, state.snapshot);
}

// ---------- Критический режим (§6): спокойная плашка, без §6.4 ----------

function renderCriticalPanel(state) {
  const host = document.querySelector('[data-role="critical-panel"]');
  if (!host) return;
  if (!criticalModeOn(state.snapshot)) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const lang = state.lang;
  host.hidden = false;
  host.innerHTML = `
    <section class="critical-panel" aria-labelledby="critical-title">
      <h2 id="critical-title">${t(lang, 'critical.title')}</h2>
      <p class="critical-disclaimer">${t(lang, 'critical.disclaimer')}</p>
      <h3>${t(lang, 'critical.official.title')}</h3>
      <p>${t(lang, 'critical.official.text')}</p>
      <h3>${t(lang, 'critical.actions.title')}</h3>
      <ul>
        <li>${t(lang, 'critical.action.1')}</li>
        <li>${t(lang, 'critical.action.2')}</li>
        <li>${t(lang, 'critical.action.3')}</li>
        <li>${t(lang, 'critical.action.4')}</li>
      </ul>
    </section>`;
}

// ---------- «Model unavailable»: понятный экран с кнопкой повтора, не белый экран (R63.1) ----------

function renderUnavailable(state) {
  const overlay = document.querySelector('[data-role="unavailable-overlay"]');
  if (!overlay) return;
  if (!state.unavailable) {
    overlay.hidden = true;
    overlay.innerHTML = '';
    return;
  }
  const lang = state.lang;
  overlay.innerHTML = `
    <div class="unavailable-card" role="alert">
      <h2>${t(lang, 'unavailable.title')}</h2>
      <p>${t(lang, 'unavailable.text')}</p>
      <button type="button" class="retry-btn" data-role="unavailable-retry">${t(lang, 'data.retry')}</button>
    </div>`;
  overlay.hidden = false;
  overlay.querySelector('[data-role="unavailable-retry"]')
    .addEventListener('click', () => { location.reload(); });
  overlay.querySelector('[data-role="unavailable-retry"]').focus();
}

function render(appState) {
  if (typeof document === 'undefined') return;
  renderBadge(appState);
  renderHistoryBanner(appState);
  renderCriticalPanel(appState);
  renderUnavailable(appState);
}

exports["criticalModeOn"] = criticalModeOn;
exports["badgeTone"] = badgeTone;
exports["isHistorical"] = isHistorical;
exports["historyBannerText"] = historyBannerText;
exports["render"] = render;
return exports;
}]);
factories.push(["js/sections/history.js", function (exports) {
const { t, date } = __ci_require("js/i18n.js");
const data = __ci_require("js/data.js");
const { isHistorical, historyBannerText } = __ci_require("js/sections/states.js");
const { signedDelta, arrowOf } = __ci_require("js/sections/trend.js");
const { statusLabel } = __ci_require("js/sections/regions.js");
const { deltaClass } = __ci_require("js/ui.js");
// Секция «История и источники» (регистрируется как 'history'): выбор недели из
// доступных снапшотов (≥6), просмотр старого снапшота с пометкой и датами,
// раскрытие смены версии методологии (§8.5), демо-разборы «где ошиблись / где
// были правы / где неопределённость» (§8.4), список источников недели.
// Плюс футер: «Следующая публикация» — ближайший вторник 12:00 UTC, показанный
// в локальном времени через Intl (§9, R62.1).
// Чистые швы (nextPublication, publicationLabel, methodologyNote, DEMO_REVIEWS,
// reviewFor) — без DOM, тестируются.


// Смена недели — оркестрация в app.js (владелец состояния и URL ?week=):
// секция только инициирует событие ci:weekchange {week}.

const LOCALES = { ru: 'ru-RU', en: 'en-US' };

// Ближайшая публикация — следующий вторник 12:00 UTC (§9). Возвращает момент
// времени; отображение в локальном времени — через publicationLabel.
function nextPublication(from = new Date()) {
  const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), 12, 0, 0));
  const add = (2 - d.getUTCDay() + 7) % 7; // 2 = вторник
  if (add === 0 && from.getTime() >= d.getTime()) {
    d.setUTCDate(d.getUTCDate() + 7); // вторник после 12:00 UTC — следующая неделя
  } else {
    d.setUTCDate(d.getUTCDate() + add);
  }
  return d;
}

// «вторник, 09:05» / «Tuesday, 09:05» — локальный формат через Intl (R62.1).
// Собирается из formatToParts, чтобы не зависеть от суффиксов ICU.
function publicationLabel(lang, d) {
  const locale = LOCALES[lang] ?? LOCALES.ru;
  const parts = new Intl.DateTimeFormat(locale, {
    weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(d);
  const get = (type) => (parts.find((p) => p.type === type) ?? {}).value ?? '';
  return `${get('weekday')}, ${get('hour')}:${get('minute')}`;
}

// §8.5: смена версии методологии между просматриваемой неделей и текущей
// раскрывается строкой; совпадающие или неизвестные версии — без строки.
function methodologyNote(lang, viewed, current) {
  if (!viewed || !current || viewed === current) return '';
  return t(lang, 'history.methodology.note', { viewed, current });
}

// §8.4: демо-разборы недель — где ошиблись / где были правы / где неопределённость.
const DEMO_REVIEWS = [
  {
    week: '2026-08-16',
    wrong: {
      ru: 'Неделя 16 августа: косвенные индикаторы подготовки сформировали ложный кластер — необычные госзакупки оказались плановыми сезонными закупками, а не сигналом подготовки. Вклад косвенных сигналов был ограничен потолком модели, поэтому индекс вырос меньше, чем предполагал первичный сигнал.',
      en: 'Week of 16 August: the shadow preparation indicators formed a false cluster — the unusual public procurements turned out to be routine seasonal purchases, not preparation signals. The shadow-signal ceiling limited their contribution, so the index rose less than the raw signal implied.',
    },
    right: {
      ru: 'Неделя 16 августа: рост индекса на +4 пункта корректно отразил подтверждённое наращивание военной логистики у театра — сигнал был независимо подтверждён спутниковыми снимками и двумя кластерами источников.',
      en: 'Week of 16 August: the +4 point rise correctly reflected confirmed military logistics build-up near the theatre — the signal was independently confirmed by satellite imagery and two distinct source clusters.',
    },
    uncertain: {
      ru: 'Неделя 16 августа: остаётся неопределённость вокруг транспортно-страховых сигналов: рост страховых надбавок частично идёт из аффилированных с одной из сторон кластеров, и независимого рыночного подтверждения недостаточно.',
      en: 'Week of 16 August: uncertainty remains around transport and insurance signals: the rise in insurance premiums comes partly from clusters affiliated with one of the parties, and independent market confirmation is insufficient.',
    },
  },
  {
    week: '2026-09-06',
    wrong: {
      ru: 'Неделя 6 сентября: мы недооценили скорость деэскалации — подписанная договорённость о прекращении огня снизила напряжение раньше, чем инерция индекса успела это отразить. Сдвиг был пойман только на следующей неделе.',
      en: 'Week of 6 September: we underestimated the speed of de-escalation — the signed ceasefire arrangement reduced tension faster than the index inertia could reflect it. The shift was only captured the following week.',
    },
    right: {
      ru: 'Неделя 6 сентября: пониженная уверенность по региону с неполным покрытием источников оказалась оправданной — поздняя верификация подтвердила, что часть региональных сигналов была шумом.',
      en: 'Week of 6 September: the lowered confidence for a region with incomplete source coverage proved justified — late verification confirmed that part of the regional signals was noise.',
    },
    uncertain: {
      ru: 'Неделя 6 сентября: неопределённость держится на закрытых переговорах — они принципиально не видны открытым источникам до публикации, поэтому индекс может запаздывать относительно реального снижения напряжения.',
      en: 'Week of 6 September: uncertainty comes from closed-door negotiations — they are inherently invisible to open sources until published, so the index may lag the actual easing of tension.',
    },
  },
];

function reviewFor(week) {
  return DEMO_REVIEWS.find((r) => r.week === week) ?? null;
}

// ---------- DOM ----------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function sourceItem(lang, s) {
  const title = s.title?.[lang] ?? s.title?.ru ?? '';
  return `<li class="source-row">
    <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
    <span class="source-meta">${escapeHtml(s.domain)} · ${date(lang, s.date, true)}</span>
  </li>`;
}

function renderFooter(appState) {
  const host = document.querySelector('[data-role="footer-next"]');
  if (!host) return;
  host.textContent = t(appState.lang, 'footer.next', {
    when: publicationLabel(appState.lang, nextPublication()),
  });
}

function render(appState) {
  if (typeof document === 'undefined') return;
  renderFooter(appState);
  const host = document.querySelector('[data-section="history"]');
  if (!host) return;
  const lang = appState.lang;
  const weeks = data.listWeeks();
  const week = appState.week ?? data.latest();
  const snapshot = appState.snapshot;
  const latest = data.latest();
  const historical = isHistorical(week, latest);

  const options = weeks.map((w) => {
    const label = `${date(lang, w)}${w === latest ? ` — ${t(lang, 'history.week.current')}` : ''}`;
    return `<option value="${w}"${w === week ? ' selected' : ''}>${escapeHtml(label)}</option>`;
  }).join('');

  const note = methodologyNote(lang, snapshot?.methodology, data.week(latest)?.methodology);
  const review = reviewFor(week);
  const index = snapshot?.global?.index;
  const delta = snapshot?.global?.delta;

  host.innerHTML = `
    <div class="history-controls">
      <label class="history-label" for="history-week">${t(lang, 'history.week.label')}</label>
      <select id="history-week" class="history-select" data-role="history-select">
        ${options}
      </select>
    </div>
    ${historical && snapshot?.published ? `<p class="history-banner">${escapeHtml(historyBannerText(lang, snapshot))}</p>` : ''}
    <div class="history-meta">
      <span class="meta-item"><strong>${t(lang, 'meta.published')}</strong>: ${date(lang, snapshot?.published)}</span>
      <span class="meta-item"><strong>${t(lang, 'meta.through')}</strong>: ${date(lang, snapshot?.through)}</span>
      ${typeof index === 'number' ? `<span class="meta-item"><strong>${t(lang, 'history.index')}</strong>: ${index} ${t(lang, 'hero.index.of')}
        · ${escapeHtml(statusLabel(lang, index))}
        · <span class="delta ${deltaClass(delta) ?? ''}">${arrowOf(delta)} ${signedDelta(delta)}</span>
        ${t(lang, 'hero.week.change')}</span>` : ''}
      <span class="meta-item"><strong>${t(lang, 'history.methodology')}</strong>: ${escapeHtml(snapshot?.methodology ?? '—')}</span>
    </div>
    ${note ? `<p class="history-note">${escapeHtml(note)}</p>` : ''}
    ${review ? `
    <div class="history-review">
      <h3>${t(lang, 'history.review.title', { date: date(lang, review.week) })}</h3>
      <div class="review-grid">
        <section class="review-card" aria-label="${escapeHtml(t(lang, 'history.review.wrong'))}">
          <h4>${t(lang, 'history.review.wrong')}</h4>
          <p>${escapeHtml(review.wrong[lang])}</p>
        </section>
        <section class="review-card" aria-label="${escapeHtml(t(lang, 'history.review.right'))}">
          <h4>${t(lang, 'history.review.right')}</h4>
          <p>${escapeHtml(review.right[lang])}</p>
        </section>
        <section class="review-card" aria-label="${escapeHtml(t(lang, 'history.review.uncertain'))}">
          <h4>${t(lang, 'history.review.uncertain')}</h4>
          <p>${escapeHtml(review.uncertain[lang])}</p>
        </section>
      </div>
    </div>` : ''}
    ${Array.isArray(snapshot?.sources) && snapshot.sources.length ? `
    <div class="history-sources">
      <h3>${t(lang, 'history.sources.title')}</h3>
      <ul class="source-list">
        ${snapshot.sources.map((s) => sourceItem(lang, s)).join('')}
      </ul>
    </div>` : ''}`;

  host.querySelector('[data-role="history-select"]')
    ?.addEventListener('change', (e) => {
      document.dispatchEvent(new CustomEvent('ci:weekchange', { detail: { week: e.target.value } }));
    });
}

exports["nextPublication"] = nextPublication;
exports["publicationLabel"] = publicationLabel;
exports["methodologyNote"] = methodologyNote;
exports["DEMO_REVIEWS"] = DEMO_REVIEWS;
exports["reviewFor"] = reviewFor;
exports["render"] = render;
return exports;
}]);
factories.push(["js/sections/methodology.js", function (exports) {
const { t } = __ci_require("js/i18n.js");
const risk = __ci_require("js/risk.js");
// Секция «Методология» (регистрируется как 'methodology'): что модель измеряет
// и не измеряет, пробелы в данных, конфликты источников, случаи отказа,
// известные ложные срабатывания и пропуски (PRD §8.3, методология §12);
// обоснование порогов историческими якорями и версия методологии (R66);
// открытые вопросы PRD §19 + v1.3, перенесённые документально (R85).
// Метафора часов нигде не используется (R79). Контент статичен — из словаря
// i18n; числовые параметры и формулы в публичный UI не выносятся (PRD §8.1,
// внутренние скоринги остаются в закрытой части методологии).


// Пункты списков и якоря порогов — из ключей словаря (§11.3: жёстких строк нет).
const LIST_KEYS = {
  measures: ['method.measures.1'],
  notMeasures: ['method.not.1', 'method.not.2', 'method.not.3'],
  gaps: ['method.gaps.1', 'method.gaps.2', 'method.gaps.3', 'method.gaps.4'],
  conflicts: ['method.conflicts.1', 'method.conflicts.2', 'method.conflicts.3'],
  failures: ['method.failures.1', 'method.failures.2', 'method.failures.3'],
  fpfn: ['method.fpfn.1', 'method.fpfn.2', 'method.fpfn.3'],
};

// Якоря порогов — ключи словаря в порядке risk.SCALE; сами диапазоны выводятся
// из risk.SCALE (таск 11: пороги живут только в risk.js — risk.SCALE и таблица
// не могут разойтись). Порядок ключей обязан совпадать с порядком SCALE.
const ANCHOR_KEYS = [
  'method.anchor.routine',
  'method.anchor.proxy',
  'method.anchor.local',
  'method.anchor.conv',
  'method.anchor.full',
  'method.anchor.extreme',
];

// Диапазоны шкалы из risk.SCALE: каждый следующий начинается с max+1 предыдущего.
function thresholdRanges() {
  let start = 0;
  return risk.SCALE.map((step) => {
    const range = `${start}–${step.max}`;
    start = step.max + 1;
    return range;
  });
}

const OPEN_QUESTION_COUNT = 25;

function list(lang, keys) {
  return `<ul>${keys.map((k) => `<li>${t(lang, k)}</li>`).join('')}</ul>`;
}

function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="methodology"]');
  if (!host) return;
  const lang = appState.lang;
  const version = appState.snapshot?.methodology;

  const ranges = thresholdRanges();
  const anchors = ANCHOR_KEYS.map((key, i) =>
    `<tr><td>${t(lang, key)}</td><td>${ranges[i]}</td></tr>`).join('');
  const openQuestions = Array.from({ length: OPEN_QUESTION_COUNT }, (_, i) =>
    `<li>${t(lang, `method.open.${i + 1}`)}</li>`).join('');

  host.innerHTML = `
    <div class="method-block">
      <h3>${t(lang, 'method.measures.title')}</h3>
      ${list(lang, LIST_KEYS.measures)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.not.title')}</h3>
      ${list(lang, LIST_KEYS.notMeasures)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.gaps.title')}</h3>
      ${list(lang, LIST_KEYS.gaps)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.conflicts.title')}</h3>
      ${list(lang, LIST_KEYS.conflicts)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.failures.title')}</h3>
      ${list(lang, LIST_KEYS.failures)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.fpfn.title')}</h3>
      ${list(lang, LIST_KEYS.fpfn)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.thresholds.title')}</h3>
      <p>${t(lang, 'method.thresholds.intro')}</p>
      <table class="method-table">
        <thead><tr><th>${t(lang, 'method.anchor.col.event')}</th><th>${t(lang, 'method.anchor.col.range')}</th></tr></thead>
        <tbody>${anchors}</tbody>
      </table>
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.version.title')}</h3>
      <p>${t(lang, 'method.version.text', { version: version ?? '—' })}</p>
      <p>${t(lang, 'method.version.note')}</p>
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.open.title')}</h3>
      <ol class="method-open">${openQuestions}</ol>
    </div>`;
}

exports["thresholdRanges"] = thresholdRanges;
exports["render"] = render;
return exports;
}]);
factories.push(["js/render.js", function (exports) {
const { t } = __ci_require("js/i18n.js");
const { render: heroRender } = __ci_require("js/sections/hero.js");
const { render: driversRender } = __ci_require("js/sections/drivers.js");
const { render: trendRender } = __ci_require("js/sections/trend.js");
const { render: regionsRender } = __ci_require("js/sections/regions.js");
const { render: statesRender } = __ci_require("js/sections/states.js");
const { render: historyRender } = __ci_require("js/sections/history.js");
const { render: methodologyRender } = __ci_require("js/sections/methodology.js");
// render.js — вся DOM-разметка всех секций. Скелет dispatch: таск 02 регистрирует
// рендереры секций через registerSection(); renderAll проходит по SECTIONS и вызывает
// зарегистрированные. appState: { lang, region, detected, week, snapshot, dataState }.


const SECTIONS = [
  'hero',
  'regions',
  'trend',
  'drivers',
  'states',
  'history',
  'methodology',
];

const registry = new Map();

// Секция hero — первая; остальные регистрируют свои таски.
registerSection('hero', heroRender);
registerSection('drivers', driversRender);
registerSection('trend', trendRender);
registerSection('regions', regionsRender);
registerSection('states', statesRender);
registerSection('history', historyRender);
registerSection('methodology', methodologyRender);

function registerSection(name, renderFn) {
  if (!SECTIONS.includes(name)) return false;
  registry.set(name, renderFn);
  return true;
}

// renderSection(name, appState) → true если секция отрендерена, false если рендерер
// ещё не зарегистрирован (скелет; таск 02 наполняет).
function renderSection(name, appState) {
  const fn = registry.get(name);
  if (typeof fn !== 'function') return false;
  fn(appState);
  return true;
}

function renderAll(appState) {
  const rendered = [];
  for (const name of SECTIONS) {
    if (renderSection(name, appState)) rendered.push(name);
  }
  return rendered;
}

// applyI18n(root, lang) — проставляет текст по [data-i18n] из словаря (§11.3:
// жёстких строк вне словаря нет; дефолтная RU-разметка в HTML заменяется здесь).
function applyI18n(root, lang) {
  if (!root?.querySelectorAll) return;
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(lang, key);
  });
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(lang, el.getAttribute('data-i18n-aria')));
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(lang, el.getAttribute('data-i18n-placeholder')));
  });
}

exports["SECTIONS"] = SECTIONS;
exports["registerSection"] = registerSection;
exports["renderSection"] = renderSection;
exports["renderAll"] = renderAll;
exports["applyI18n"] = applyI18n;
return exports;
}]);
factories.push(["js/demo.js", function (exports) {
const { t } = __ci_require("js/i18n.js");
// Демо-панель A01 (История 28): неприметная ссылка в футере открывает панель
// с 4 состояниями продукта. Подмена данных — только в текущей сессии, помечена
// «демо», в продакшен-потоке данных не участвует (app.js держит режим в памяти).
// Чистые швы (DEMO_MODES, applyDemo, demoModeLabel) — без DOM, тестируются.


const DEMO_MODES = ['critical', 'delayed', 'insufficient', 'unavailable'];

// Демо-значение крит-режима: внутри диапазона 81–96 §10 («Критически опасно»).
const CRITICAL_DEMO_INDEX = 85;

// applyDemo(appState, mode) → новый appState с подменёнными данными.
// Не мутирует вход: подмена — копия снапшота; null/'off' — состояние как есть.
function applyDemo(state, mode) {
  if (!mode || mode === 'off' || !DEMO_MODES.includes(mode)) return state;
  const snap = state.snapshot ?? {};
  if (mode === 'critical') {
    return {
      ...state,
      snapshot: {
        ...snap,
        global: { ...(snap.global ?? {}), index: CRITICAL_DEMO_INDEX },
      },
    };
  }
  if (mode === 'delayed' || mode === 'insufficient') {
    return {
      ...state,
      dataState: mode,
      snapshot: { ...snap, dataState: mode },
    };
  }
  // unavailable — понятный экран с кнопкой повтора (states.js), как при битом файле.
  return {
    ...state,
    dataState: 'unavailable',
    unavailable: true,
    errors: [...(state.errors ?? []), 'demo: model unavailable'],
    snapshot: {
      ...snap,
      dataState: 'unavailable',
      unavailable: true,
      global: null,
      regions: {},
      trend: [],
      drivers: [],
      sources: [],
    },
  };
}

function demoModeLabel(lang, mode) {
  return t(lang, `demo.${mode}`);
}

// ---------- DOM: панель, баннер «демо», событие ci:demo ----------

function buildPanel(host, lang, activeMode) {
  host.innerHTML = `
    <div class="demo-panel" role="dialog" aria-label="${t(lang, 'demo.title')}">
      <p class="demo-hint">${t(lang, 'demo.hint')}</p>
      <div class="demo-actions" data-role="demo-actions"></div>
      <button type="button" class="demo-close" data-role="demo-close">${t(lang, 'demo.close')}</button>
    </div>`;
  const actions = host.querySelector('[data-role="demo-actions"]');
  for (const mode of DEMO_MODES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'demo-btn';
    b.dataset.demo = mode;
    b.setAttribute('aria-pressed', String(mode === activeMode));
    b.textContent = demoModeLabel(lang, mode);
    b.addEventListener('click', () => {
      const next = mode === activeMode ? null : mode;
      document.dispatchEvent(new CustomEvent('ci:demo', { detail: { mode: next } }));
    });
    actions.appendChild(b);
  }
  const off = document.createElement('button');
  off.type = 'button';
  off.className = 'demo-btn demo-btn--off';
  off.setAttribute('aria-pressed', String(!activeMode));
  off.textContent = t(lang, 'demo.off');
  off.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('ci:demo', { detail: { mode: null } }));
  });
  actions.appendChild(off);
  host.querySelector('[data-role="demo-close"]').addEventListener('click', () => { host.hidden = true; });
}

// Панель и баннер живут вне продакшен-потока: их содержимое собирает demo.js,
// а app.js только применяет applyDemo к appState перед renderAll.
function initDemo(getLang) {
  if (typeof document === 'undefined') return;
  const link = document.querySelector('[data-role="demo-link"]');
  const panel = document.querySelector('[data-role="demo-panel"]');
  const banner = document.querySelector('[data-role="demo-banner"]');
  if (!link || !panel || !banner) return;

  let activeMode = null;

  function sync() {
    const lang = getLang();
    buildPanel(panel, lang, activeMode);
    if (activeMode) {
      banner.hidden = false;
      banner.textContent = t(lang, 'demo.banner', { mode: demoModeLabel(lang, activeMode) });
    } else {
      banner.hidden = true;
      banner.textContent = '';
    }
  }

  link.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) sync();
  });

  document.addEventListener('ci:demo', (e) => {
    activeMode = e.detail?.mode ?? null;
    sync();
  });
}

exports["DEMO_MODES"] = DEMO_MODES;
exports["CRITICAL_DEMO_INDEX"] = CRITICAL_DEMO_INDEX;
exports["applyDemo"] = applyDemo;
exports["demoModeLabel"] = demoModeLabel;
exports["initDemo"] = initDemo;
return exports;
}]);
factories.push(["js/app.js", function (exports) {
const data = __ci_require("js/data.js");
const region = __ci_require("js/region.js");
const { t } = __ci_require("js/i18n.js");
const { renderAll, applyI18n } = __ci_require("js/render.js");
const { applyDemo, initDemo } = __ci_require("js/demo.js");
const { LANG_KEY, resolveLang, parseWeekParam } = __ci_require("js/ui.js");
// app.js — оркестрация: язык, регион, неделя (?week=), data-state, первый render.
// Скелет: собирает appState и дергает renderAll; глубокая обвязка событий — таск 02+.



function saveLang(lang) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* см. resolveLang */
  }
}

function resolveWeek() {
  try {
    return parseWeekParam(location.search);
  } catch {
    /* вне браузера */
  }
  return null;
}

// appState — единый контракт между app и render:
// { lang, region (id|null), detected (id|null), week (YYYY-MM-DD|null),
//   snapshot, dataState, unavailable:boolean, errors:string[] }
// Демо-подмена (A01): режим держится в памяти сессии и применяется к копии
// состояния через applyDemo — на данные файлов и продакшен-поток не влияет.
let demoMode = null;

function currentState() {
  return applyDemo(buildState(), demoMode);
}

function buildState() {
  const lang = resolveLang();
  const tz = typeof Intl !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : null;
  const detected = region.detect(tz);
  const regionId = region.current() ?? detected;
  const weekKey = resolveWeek();
  const snapshot = data.week(weekKey ?? undefined);
  return {
    lang,
    region: regionId,
    detected,
    week: snapshot.date ?? data.latest(),
    snapshot,
    dataState: snapshot.dataState,
    unavailable: !!snapshot.unavailable,
    errors: snapshot.errors ?? [],
  };
}

function renderApp(state) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = state.lang;
    document.title = t(state.lang, 'app.title');
    document.querySelector('meta[name="description"]')
      ?.setAttribute('content', t(state.lang, 'app.description'));
    applyI18n(document, state.lang);
    document.querySelectorAll('.lang-btn').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang));
    });
  }
  return renderAll(state);
}

// aria-live: объявления скринридеру о смене региона/языка (R71).
function announce(lang, key, vars) {
  const live = document.querySelector('[data-role="a11y-live"]');
  if (live) live.textContent = t(lang, key, vars);
}

// URL ?week=: текущая неделя — без параметра, архивная — с ним (§8.6).
function navigateToWeek(week) {
  try {
    const url = new URL(location.href);
    if (week === data.latest()) {
      url.searchParams.delete('week');
    } else {
      url.searchParams.set('week', week);
    }
    history.pushState(null, '', url);
  } catch {
    /* вне браузера — состояние пересоберётся без URL */
  }
}

function init() {
  const state = buildState();
  if (typeof document !== 'undefined') {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang === 'en' ? 'en' : 'ru';
        saveLang(lang);
        announce(lang, 'a11y.lang.changed');
        renderApp({ ...currentState(), lang });
      });
    });
    // Демо-панель A01: ci:demo меняет только сессионный режим подмены.
    document.addEventListener('ci:demo', (e) => {
      demoMode = e.detail?.mode ?? null;
      renderApp(currentState());
    });
    initDemo(() => resolveLang());
    // Выбор региона из панели hero: запоминание — только по явному «Запомнить» (R49.1).
    document.addEventListener('ci:regionchange', (e) => {
      const { id, persist } = e.detail ?? {};
      if (!id || !region.get(id)) return;
      region.choose(id, { persist: !!persist });
      const next = currentState();
      renderApp(next);
      const reg = region.get(id);
      const rdata = next.snapshot?.regions?.[id];
      announce(next.lang, 'a11y.region.changed', {
        city: reg.city[next.lang],
        region: reg.name[next.lang],
        index: rdata ? rdata.index : '—',
      });
    });
    // Смена недели из секции истории: владелец состояния и URL — app.js.
    // pushState ?week= (latest — без параметра), затем полный перерендер.
    document.addEventListener('ci:weekchange', (e) => {
      const week = e.detail?.week;
      if (!week || !data.listWeeks().includes(week)) return;
      navigateToWeek(week);
      renderApp(currentState());
    });
    // Кнопки «назад/вперёд» после pushState: неделя уже в URL — пересобираем состояние.
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => renderApp(currentState()));
    }
  }
  renderApp(state);
  // «Model unavailable» / битый снапшот: состояние уже в данных (R63.1);
  // UI с кнопкой повтора — таск 06, здесь только событие.
  if (typeof document !== 'undefined') {
    document.dispatchEvent(new CustomEvent('ci:ready', { detail: state }));
  }
  return state;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

exports["resolveLang"] = resolveLang;
exports["saveLang"] = saveLang;
exports["resolveWeek"] = resolveWeek;
exports["buildState"] = buildState;
exports["renderApp"] = renderApp;
exports["init"] = init;
return exports;
}]);
factories.push(["js/share.js", function (exports) {
const { t, date } = __ci_require("js/i18n.js");
const risk = __ci_require("js/risk.js");
const region = __ci_require("js/region.js");
const data = __ci_require("js/data.js");
const { formatDelta, deltaArrow } = __ci_require("js/sections/hero.js");
const { resolveLang, parseWeekParam } = __ci_require("js/ui.js");
// js/share.js — share-карточка 1200×630 (История 21, R80): canvas → PNG → download,
// Web Share API с файловой шарой где поддерживается (Решение п.9).
// Чистые швы (cardLayout, cardColors, shareFileName) — без DOM/canvas, тестируются.
// Модуль сам биндится к [data-role="share-btn"] — app.js не правим.


const CARD_W = 1200;
const CARD_H = 630;

// Палитра карточки — HEX тех же токенов §14.4, что и у сайта (canvas не умеет var()).
const COLORS = {
  bg: '#0A0E12',
  text: '#E6EDF3',
  secondary: '#8B949E',
  muted: '#6B7280',
  accent: '#58A6FF',
  border: '#232B36',
  states: {
    calm: '#3FB950',
    tense: '#A8B06B',
    danger: '#D29922',
    very: '#D17F52',
    critical: '#F85149',
    extreme: '#A83A3A',
  },
};

function cardColors() {
  return COLORS;
}

// Тон '--state-*'/'--text-secondary' → HEX из палитры карточки.
function resolveTone(tone) {
  if (!tone) return COLORS.secondary;
  if (tone.startsWith('--state-')) return COLORS.states[tone.slice(8)] ?? COLORS.secondary;
  if (tone === '--text-secondary') return COLORS.secondary;
  return COLORS.secondary;
}

// cardLayout(lang, snapshot, regionId) → упорядоченные элементы карточки (образец R80):
// CASSANDRA INDEX / «72 / 100 · VERY DANGEROUS» / «↑ +6 THIS WEEK» /
// «Your region: Europe · 74 / 100» (только регион, без города) / дата / дисклеймер.
// Нет глобального индекса → null (карточку не собираем). Без обратного отсчёта (§79).
function cardLayout(lang, snapshot, regionId) {
  const g = snapshot?.global;
  if (!g) return null;
  const gStatus = risk.status(g.index);
  const items = [
    { kind: 'brand', text: t(lang, 'share.brand') },
    {
      kind: 'index',
      text: `${g.index} / 100`,
      status: gStatus ? t(lang, `status.${gStatus}`).toUpperCase() : '',
      tone: risk.tone(gStatus),
    },
    {
      kind: 'delta',
      text: `${deltaArrow(g.delta)} ${formatDelta(g.delta)} ${t(lang, 'hero.week.change').toUpperCase()}`,
      tone: risk.deltaTone(g.delta),
    },
  ];
  const rdata = regionId ? snapshot.regions?.[regionId] : null;
  if (rdata) {
    const reg = region.get(regionId);
    if (reg) items.push({ kind: 'region', text: t(lang, 'share.region', { name: reg.name[lang], index: rdata.index }) });
  }
  items.push({ kind: 'date', text: date(lang, snapshot.published) });
  items.push({ kind: 'disclaimer', text: t(lang, 'footer.disclaimer') });
  return items;
}

function shareFileName(week) {
  return week ? `cassandra-index-${week}.png` : 'cassandra-index.png';
}

// ---------- Canvas-часть (только браузер) ----------

function font(size, weight = 400) {
  return `${weight} ${size}px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
}

// drawCard(ctx, items, colors) — рисует layout на контексте CARD_W×CARD_H.
// Крупные контрастные элементы — читаема в маленьких превью (R80).
function drawCard(ctx, items, colors = COLORS) {
  const W = CARD_W;
  const H = CARD_H;
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, W, H);

  const byKind = Object.fromEntries(items.map((i) => [i.kind, i]));
  const pad = 72;

  // Левая цветная полоса в тоне статуса — узнаваемость в превью.
  const tone = resolveTone(byKind.index?.tone);
  ctx.fillStyle = tone;
  ctx.fillRect(0, 0, 14, H);

  ctx.textBaseline = 'alphabetic';

  // Дата — справа сверху.
  if (byKind.date) {
    ctx.font = font(30);
    ctx.fillStyle = colors.muted;
    ctx.textAlign = 'right';
    ctx.fillText(byKind.date.text, W - pad, pad + 20);
  }

  // Бренд.
  ctx.textAlign = 'left';
  ctx.font = font(32, 700);
  ctx.fillStyle = colors.accent;
  const brandText = (byKind.brand?.text ?? '').split('').join(' ');
  ctx.fillText(brandText, pad, 140);

  // Индекс — доминирующий элемент.
  let y = 350;
  if (byKind.index) {
    ctx.font = font(170, 700);
    ctx.fillStyle = colors.text;
    ctx.fillText(byKind.index.text, pad, y);
  }

  // Статус — строкой ниже, в цвете состояния.
  y = 440;
  if (byKind.index?.status) {
    ctx.font = font(56, 700);
    ctx.fillStyle = tone;
    ctx.fillText(byKind.index.status, pad, y);
  }

  // Δ за неделю — в тоне направления.
  y = 512;
  if (byKind.delta) {
    ctx.font = font(44, 700);
    ctx.fillStyle = resolveTone(byKind.delta.tone);
    ctx.fillText(byKind.delta.text, pad, y);
  }

  // Региональная строка.
  y = 572;
  if (byKind.region) {
    ctx.font = font(34);
    ctx.fillStyle = colors.secondary;
    ctx.fillText(byKind.region.text, pad, y);
  }

  // Дисклеймер — снизу, мелко, но одной строкой.
  if (byKind.disclaimer) {
    ctx.font = font(22);
    ctx.fillStyle = colors.muted;
    ctx.fillText(byKind.disclaimer.text, pad, H - 32);
  }
}

// ---------- DOM-часть: генерация, скачивание, Web Share API ----------

function currentRegion() {
  try {
    const tz = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : null;
    return region.current() ?? region.detect(tz);
  } catch {
    return region.current();
  }
}

function announce(lang) {
  const live = document.querySelector('[data-role="a11y-live"]');
  if (live) live.textContent = t(lang, 'share.announce');
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// buildCard() → Promise<Blob> — canvas 1200×630 → PNG-блоб текущего снапшота.
function buildCard() {
  const lang = resolveLang();
  const snapshot = data.week(parseWeekParam(location.search) ?? undefined);
  const items = cardLayout(lang, snapshot, currentRegion());
  if (!items) return Promise.resolve(null);
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');
  drawCard(ctx, items, COLORS);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

// shareSnapshot() — Web Share API с файловой шарой, где есть; иначе скачивание PNG.
async function shareSnapshot() {
  const week = parseWeekParam(location.search) ?? data.latest();
  const filename = shareFileName(week);
  const blob = await buildCard();
  if (!blob) return false;
  const file = new File([blob], filename, { type: 'image/png' });
  const nav = typeof navigator !== 'undefined' ? navigator : null;
  if (nav?.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: t(resolveLang(), 'share.brand') });
      announce(resolveLang());
      return true;
    } catch (err) {
      if (err && err.name === 'AbortError') return true; // пользователь отменил — не ошибка
      // иначе — фолбэк на скачивание ниже
    }
  }
  download(blob, filename);
  announce(resolveLang());
  return true;
}

// initShare() — биндит кнопку «Поделиться» (делегирование: кнопку пересоздаёт
// i18n-перерисовка, поэтому слушатель — на document). Гард на уровне модуля:
// повторный вызов и пересоздание кнопки второй слушатель не вешают.
let shareBound = false;

function initShare() {
  if (typeof document === 'undefined' || shareBound) return;
  shareBound = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('[data-role="share-btn"]');
    if (btn) shareSnapshot();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShare);
  } else {
    initShare();
  }
}

exports["CARD_W"] = CARD_W;
exports["CARD_H"] = CARD_H;
exports["cardColors"] = cardColors;
exports["cardLayout"] = cardLayout;
exports["shareFileName"] = shareFileName;
exports["drawCard"] = drawCard;
exports["buildCard"] = buildCard;
exports["shareSnapshot"] = shareSnapshot;
exports["initShare"] = initShare;
return exports;
}]);
for (const [name, factory] of factories) {
  const exports = {};
  modules[name] = { exports };
  modules[name].exports = factory(exports) || exports;
}
window.CI = {};
for (const name of Object.keys(modules)) window.CI[name] = modules[name].exports;
})();
