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
    'state.historical': 'Архивный снапшот',
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
    'sources.word': 'источник;источника;источников',
    'sources.count': '{n} источников',
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
    'trend.points': 'пункт;пункта;пунктов',
    'trend.summary': 'За неделю индекс изменился на {week} {weekWord}; за 12 недель — на {total} {totalWord}.',
    'trend.point.aria': '{value} из 100, {date}',
    'trend.chart.label': 'График индекса за 12 недель',
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
    'state.historical': 'Historical snapshot',
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
    'sources.word': 'source;sources',
    'sources.count': '{n} sources',
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
    'trend.points': 'point;points',
    'trend.summary': 'Over the week the index changed by {week} {weekWord}; over 12 weeks — by {total} {totalWord}.',
    'trend.point.aria': '{value} of 100, {date}',
    'trend.chart.label': '12-week index chart',
    'footer.disclaimer': 'Risk assessment based on open data. Not an official forecast.',
  },
};

export const LANGS = ['ru', 'en'];

const LOCALES = { ru: 'ru-RU', en: 'en-US' };

export function t(lang, key, vars) {
  const dict = DICTS[lang] ?? DICTS.ru;
  let s = dict[key] ?? DICTS.ru[key] ?? key;
  if (vars) {
    for (const k of Object.keys(vars)) {
      s = s.replaceAll(`{${k}}`, String(vars[k]));
    }
  }
  return s;
}

// RU: правило 1 / 2–4 / 5+ (§11.2, закрывает открытый вопрос §19.24).
// forms = ['источник', 'источника', 'источников']; EN: forms = ['source', 'sources'].
export function plural(lang, n, forms) {
  n = Math.abs(Number(n));
  if (lang === 'ru') {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return forms[0];
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
    return forms[2];
  }
  return n === 1 ? forms[0] : forms[1];
}

// «13 сентября 2026» / «13 Sep, 2026»; короткие «13.09» / «Sep 13» (§11.2).
// Собирается из formatToParts, чтобы строка не зависела от суффиксов ICU («г.» и т.п.).
export function date(lang, iso, short = false) {
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
