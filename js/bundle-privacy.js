// js/bundle-privacy.js — СГЕНЕРИРОВАН build.js, не править вручную.
// Исходники: js/i18n.js, js/risk.js, js/ui.js. Пересборка: node build.js
(function () {
'use strict';
const modules = {};
function __ci_require(name) {
  const m = modules[name];
  if (!m) throw new Error('CI module not found: ' + name);
  return m.exports;
}
const factories = [];
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
    'sources.word': 'источник;источника;источников',
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
    'sources.word': 'source;sources',
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

function t(lang, key, vars) {
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
function plural(lang, n, forms) {
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
for (const [name, factory] of factories) {
  const exports = {};
  modules[name] = { exports };
  modules[name].exports = factory(exports) || exports;
}
window.CI = {};
for (const name of Object.keys(modules)) window.CI[name] = modules[name].exports;
})();
