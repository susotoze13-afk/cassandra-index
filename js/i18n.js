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
    'region.yours': 'ВАШ РЕГИОН',
    'region.change': 'изменить',
    'region.unavailable': 'данные по региону временно недоступны',
    'state.published': 'Опубликовано',
    'state.updating': 'Обновляется',
    'state.delayed': 'Задержка данных',
    'state.insufficient': 'Недостаточно данных',
    'state.unavailable': 'Model unavailable',
    'data.retry': 'Повторить',
    'sources.word': 'источник;источника;источников',
    'sources.count': '{n} источников',
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
    'hero.title': 'How close has the world come to a global military conflict?',
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
    'region.yours': 'YOUR REGION',
    'region.change': 'change',
    'region.unavailable': 'regional data is temporarily unavailable',
    'state.published': 'Published',
    'state.updating': 'Updating',
    'state.delayed': 'Delayed',
    'state.insufficient': 'Insufficient data',
    'state.unavailable': 'Model unavailable',
    'data.retry': 'Retry',
    'sources.word': 'source;sources',
    'sources.count': '{n} sources',
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
