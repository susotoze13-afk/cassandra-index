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
// Словарь RU (сайт одноязычный; EN удалён — прогон 2026-10-03-ru-only-ui-tweaks).
// Ни одной пользовательской строки вне словаря (§11.3).
// Экспорт — для теста лексики (контент-ревью, PRD §11.5): сканер читает словарь напрямую.
const DICTS = {
  ru: {
    'app.title': 'Cassandra Index — индекс конфликтного риска',
    'app.description': 'Еженедельная оценка уровня и направления глобального конфликтного риска на основе открытых данных.',
    'nav.overview': 'Обзор',
    'nav.regions': 'Регионы',
    'nav.trend': 'Тренд',
    'nav.method': 'Методология',
    'nav.sources': 'История и источники',
    'nav.label': 'Основная навигация',
    'regions.title': 'Что это значит для моего региона?',
    'regions.yours': 'ваш регион',
    'regions.drivers': 'Главные драйверы',
    'hero.title': 'Индекс риска глобального военного конфликта',
    'hero.index.label': 'Мировой индекс',
    'hero.subtitle': 'Индекс состояния риска по шкале от 0 до 100, рассчитываемый еженедельно по открытым данным: уровень и направление изменения риска.',
    'hero.legal.disclaimer': 'Оценка состояния, а не прогноз даты.',
    'hero.preliminary': 'Предварительная оценка — неполное покрытие источников',
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
    'state.published': 'Опубликовано',
    'state.updating': 'Обновляется',
    'state.delayed': 'Задержка данных',
    'state.insufficient': 'Недостаточно данных',
    'state.unavailable': 'Model unavailable',
    'history.banner': 'Архивный снапшот: опубликован {published}, данные по {through}. Значения не являются текущими.',
    'quality.label': 'Качество данных',
    'quality.level.high': 'Высокое',
    'quality.level.medium': 'Среднее',
    'quality.level.low': 'Низкое',
    'quality.badge': 'Качество данных: {level}',
    'quality.badge.aria': 'Качество данных: {level}. Подробнее о расчёте.',
    'quality.modal.title': 'Качество данных',
    'quality.modal.q': 'Доля веса драйверов с данными (q): {pct}%',
    'quality.modal.nullWeight': 'Доля без данных: {pct}%',
    'quality.modal.coverage': 'Драйверов с данными: {covered} из {total}',
    'quality.modal.explained': 'q — доля веса драйверов, закрытая данными. Чем ниже q, тем сильнее новое значение сжимается к предыдущему опубликованному.',
    'quality.modal.incomplete': 'Неполное покрытие источников.',
    'quality.modal.reduced': 'Публикация с пониженной уверенностью из-за неполного покрытия.',
    'quality.modal.insufficient': 'Неделя не опубликована: покрытие данных ниже порога публикации.',
    'quality.modal.close': 'Закрыть',
    'a11y.quality.opened': 'Открыт диалог «Качество данных».',
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
    'sources.type.primary': 'первичный',
    'sources.type.OSINT': 'OSINT',
    'sources.type.secondary': 'вторичный',
    'sources.sort.tooltip': 'Сортировка: тип (primary → OSINT → secondary) → дата → алфавит',
    'sources.affiliated': 'государственная принадлежность',
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
    'drivers.measures.calibration': 'Уровни — качественные категории: сопоставления с частотой таких событий в прошлом пока не выполнено, численная калибровка не проводилась.',
    'trend.now': 'Сейчас: {value} из 100',
    'trend.now.na': 'Сейчас: не опубликовано',
    'trend.weekAgo': 'Неделю назад: {value}',
    'trend.weekAgo.na': 'Неделю назад: не опубликовано',
    'trend.direction.label': 'Направление',
    'trend.direction.up': 'растёт',
    'trend.direction.down': 'снижается',
    'trend.direction.flat': 'без изменений',
    'trend.points': '{n, plural, one{пункт} few{пункта} many{пунктов} other{пунктов}}',
    'trend.summary': 'За неделю индекс изменился на {week} {weekWord}; за 12 недель — на {total} {totalWord}.',
    'trend.summary.v2': 'За неделю индекс изменился на {week} {weekWord}; за {weeks} {weeksWord} методологии 2.0 — на {total} {totalWord}.',
    'trend.weeks': '{n, plural, one{неделю} few{недели} many{недель} other{недель}}',
    'trend.point.aria': 'Дата: {date}, Индекс: {value}, Состояние: {state}',
    'trend.point.na': 'не опубликовано',
    'trend.state.na': '—',
    'trend.chart.label': 'График индекса за 12 недель',
    'trend.sheet.close': 'Закрыть',
    'trend.sheet.delta': 'Изменение за неделю: {value}',
    'trend.sheet.methodology': 'Методология недели: v{version}',
    'trend.break.mark': 'Смена методологии v{from} → v{to}',
    'trend.break.note': 'Дальше методология обновлена до v{to}: значения до и после могут быть несопоставимы.',
    'trend.table.caption': 'Таблица: индекс за 12 недель',
    'trend.table.date': 'Дата',
    'trend.table.index': 'Индекс',
    'trend.table.state': 'Состояние',
    'footer.next': 'Следующая публикация: {when}',
    'disclaimer.full': 'Cassandra Index — экспериментальная оценка риска на основе открытых данных. Это не официальный прогноз правительства или международной организации. Оценка может быть ошибочной.',
    'footer.ip': 'регион определяется приблизительно по часовому поясу вашего браузера — только после вашего согласия; IP-адрес не используется, не сохраняется и не передаётся третьим лицам',
    'region.toast.text': 'Мы можем определить ваш регион приблизительно по часовому поясу браузера, чтобы показать региональный контекст. IP-адрес не используется и не сохраняется.',
    'region.toast.change': 'Изменить',
    'region.toast.accept': 'Согласен',
    'region.toast.dismiss': 'Закрыть',
    'footer.privacy': 'Приватность',
    'share.brand': 'CASSANDRA INDEX',
    'share.button': 'Поделиться',
    'share.region': 'Ваш регион: {name} · {index} / 100',
    'share.announce': 'Карточка снапшота скачана',
    'footer.nav': 'Сервисные ссылки',
    'privacy.title': 'Политика приватности',
    'privacy.back': '← На главную',
    'privacy.storage.h': 'Что сайт хранит в вашем браузере',
    'privacy.delete.text': 'Очистка данных сайта в настройках браузера (или удаление ключей cassandra.region и cassandra.region.consent из localStorage) стирает сохранённые значения. После удаления cassandra.region.consent сайт снова спросит согласие при следующем визите. Других данных о вас у сайта нет.',
    'privacy.storage.region': 'cassandra.region — выбранный вами регион. Записывается, только если вы включили переключатель «Запомнить» в панели выбора региона; без него выбор живёт только до закрытия вкладки.',
    'privacy.storage.consent': 'cassandra.region.consent — ваш ответ на вопрос об автоматическом определении региона: статус (granted/denied), время ответа и, при отказе, срок повторного запроса (denied_until, 30 дней). Записывается, только когда вы отвечаете на уведомление на главной странице.',
    'privacy.storage.first': 'До согласия ничего не сохраняется: до вашего явного действия localStorage остаётся пустым, регион не определяется, показывается только глобальный индекс.',
    'privacy.region.h': 'Как определяется регион',
    'privacy.region.static': 'Сайт полностью статический и работает без бэкенда. Регион определяется приблизительно по часовому поясу вашего браузера — и только после вашего согласия: до согласия регион не определяется и не сохраняется. Часовой пояс не сохраняется и никуда не передаётся.',
    'privacy.region.future': 'В будущей версии с сервером (edge-слой) определение будет происходить на сервере: сырой IP-адрес не будет попадать в инфраструктуру сайта, в приложение уйдёт только код региона. Для юрисдикций вне EU/UK и России — opt-out (автоопределение с возможностью отключить), для EU/UK и России сохраняется opt-in.',
    'privacy.consent.h': 'Согласие на определение региона (region_consent)',
    'privacy.consent.text': 'При первом визите показывается неблокирующее уведомление с кнопками «Изменить» (открывает выбор региона вручную), «Согласен» и «Закрыть». «Согласен» разрешает определение по часовому поясу и запоминает ответ с меткой времени; «Закрыть» фиксирует отказ — повторный запрос возможен не раньше чем через 30 дней. Ответ не привязан к IP-адресу и не покидает ваш браузер.',
    'privacy.edge.h': 'Модель «edge/браузер» и сырой IP',
    'privacy.edge.text': 'Сырой IP-адрес никогда не попадает в инфраструктуру сайта. В статической сборке определение выполняется в браузере (часовой пояс) и только после согласия; больше сайт ничего не узнаёт о вашем местоположении. При появлении бэкенда геолокация выполняется на edge-сервере, в приложение уходит только код региона; сырой IP не логируется (хэш с солью, хранение 24 часа — протокол в docs/governance.md).',
    'privacy.laws.h': 'Применимое право',
    'privacy.ccpa.h': 'CCPA (Калифорния)',
    'privacy.ccpa.text': 'IP-адрес и идентификаторы устройства относятся к персональной информации. Сайт уведомляет о сборе при первом визите (toast согласия), предоставляет право на отказ («Закрыть» фиксирует отказ на 30 дней), а раскрытие о передаче третьим лицам — пустое: сайт ничего не передаёт.',
    'privacy.gdpr.h': 'GDPR (EU/UK)',
    'privacy.gdpr.text': 'Определение региона после согласия опирается на законный интерес — ст. 6(1)(f) GDPR с учётом Recital 30: обработка минимальна (производный код региона, без сырого IP), без передачи третьим лицам, с возможностью отказа в любой момент и удалением записи согласия в настройках браузера.',
    'privacy.fz.h': '152-ФЗ (Россия)',
    'privacy.fz.text': 'С 2026 года IP-адреса, cookie-идентификаторы и геоданные относятся к персональным данным; их хранение подлежит локализации на территории РФ. Геолокация на зарубежном edge-сервере может нарушать требование локализации — перед запуском edge-слоя обязательна юридическая экспертиза (открытый вопрос зафиксирован в docs/governance.md).',
    'privacy.geo.h': 'Точная геолокация',
    'privacy.geo.text': 'Координаты запрашиваются, только если вы нажимаете «Уточнить точнее»; автоматического запроса GPS нет. Координаты используются только на вашем устройстве, чтобы уточнить регион, и никуда не отправляются.',
    'privacy.not.h': 'Чего сайт не делает',
    'privacy.not.cookies': 'Не использует файлы cookie, счётчики аналитики, рекламные идентификаторы и сторонние виджеты.',
    'privacy.not.third': 'Не передаёт данные третьим лицам: в статической сборке данные вообще никуда не отправляются — сайт можно открыть с локального диска, не подключаясь к сети.',
    'privacy.delete.h': 'Как удалить сохранённое',
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
    'method.criteria.title': 'Полный перечень критериев',
    'method.criteria.intro': 'Индекс собирается из 45 критериев, сгруппированных по 9 драйверам. Ниже — что именно наблюдает модель по каждому критерию; правила расчёта, шкалы и пороги в публичный интерфейс не выносятся.',
    'method.criteria.driver.d1': 'Д1. Военная активность',
    'method.criteria.driver.d2': 'Д2. Ядерная сигнальная активность',
    'method.criteria.driver.d3': 'Д3. Дипломатическая эскалация и деэскалация',
    'method.criteria.driver.d4': 'Д4. Экономические индикаторы конфликта',
    'method.criteria.driver.d5': 'Д5. Информационная и киберсфера',
    'method.criteria.driver.d6': 'Д6. Мобилизация общества',
    'method.criteria.driver.d7': 'Д7. Распространение и вовлечение третьих сторон',
    'method.criteria.driver.d8': 'Д8. Подтверждённые деэскалирующие исходы',
    'method.criteria.driver.d9': 'Д9. Косвенные индикаторы подготовки',
    'method.not.title': 'Что модель не измеряет',
    'method.not.1': 'Начало войны и дату события — индекс никогда так не интерпретируется.',
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
    'footer.disclaimer': 'Оценка риска на основе открытых данных. Не официальный прогноз.',
  },
};

const LANGS = ['ru'];

const LOCALES = { ru: 'ru-RU' };

// --- ICU MessageFormat (собственное подмножество, R62 / решение A3): ---
// интерполяция `{var}`, plural `{n, plural, one{…} few{…} many{…} other{…}}`,
// select `{x, select, …}`. CLDR-правила RU (one/few/many, дробные → other).
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
// RU: forms = [one, few, many/other].
function plural(lang, n, forms) {
  const cat = pluralCategory(lang, n);
  if (lang === 'ru') return forms[cat === 'one' ? 0 : cat === 'few' ? 1 : 2];
  return cat === 'one' ? forms[0] : forms[1];
}

// «13 сентября 2026»; короткие «13.09» (§11.2).
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

exports["DICTS"] = DICTS;
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
// resolveLang() — всегда 'ru' (сайт одноязычный); parseWeekParam() — разбор ?week=;
// createToast() — неблокирующий toast (role=status, кнопки-действия, a11y).
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

// Сайт одноязычный (русский); сигнатура сохранена для вызывающего кода.
function resolveLang() {
  return 'ru';
}

// Разбор ?week= из query-строки: строгий формат YYYY-MM-DD, иначе null.
// Владелец разбора — один на app.js/share.js/sections.
function parseWeekParam(search) {
  if (typeof search !== 'string' || !search) return null;
  const q = new URLSearchParams(search).get('week');
  return q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? q : null;
}

// Неблокирующий toast: role=status + aria-live polite, фокус не воруется,
// кнопки-действия с доступными именами (сторона вызывающего кода — монтирование
// и обработчики). actions: [{ label, onClick, className? }]; dismiss: {label, onClick}.
// Возвращает корневой элемент (не прикреплён к документу).
function createToast({ text, actions = [], dismiss = null }) {
  const node = document.createElement('div');
  node.className = 'toast';
  node.setAttribute('role', 'status');
  node.setAttribute('aria-live', 'polite');
  const body = document.createElement('p');
  body.className = 'toast-text';
  body.textContent = text;
  node.appendChild(body);
  const controls = document.createElement('div');
  controls.className = 'toast-actions';
  for (const a of actions) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = a.className ?? 'toast-btn';
    b.textContent = a.label;
    b.addEventListener('click', a.onClick);
    controls.appendChild(b);
  }
  if (dismiss) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'toast-close';
    b.setAttribute('aria-label', dismiss.label);
    b.textContent = '×';
    b.addEventListener('click', dismiss.onClick);
    controls.appendChild(b);
  }
  node.appendChild(controls);
  return node;
}

exports["el"] = el;
exports["deltaClass"] = deltaClass;
exports["resolveLang"] = resolveLang;
exports["parseWeekParam"] = parseWeekParam;
exports["createToast"] = createToast;
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
