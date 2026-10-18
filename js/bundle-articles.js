// js/bundle-articles.js — СГЕНЕРИРОВАН build.js, не править вручную.
// Исходники: js/i18n.js, js/criteria.js, js/data.js, js/article.js. Пересборка: node build.js
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
    'nav.howto': 'Как читать индекс',
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
    'region.background': 'Индекс отражает глобальный фон; региональных данных недостаточно',
    'region.note': 'Это контекстный региональный риск, а не прогноз атаки на этот город.',
    'region.cta': 'Узнать риск для моего региона →',
    'region.panel.title': 'Выбор региона',
    'region.panel.search': 'Город или регион',
    'region.panel.remember': 'Запомнить',
    'region.panel.remember.hint': 'Сохранит выбор в этом браузере',
    'region.panel.geolocate': 'Уточнить точнее',
    'region.panel.cancel': 'Отмена',
    'region.panel.notfound': 'Ничего не найдено — выберите регион из списка',
    'region.panel.broad': 'Уточните запрос — показаны первые совпадения',
    'region.panel.noregion': 'регион не определён',
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
    'quality.modal.sensitive': 'Неделя чувствительна к выбору источников: исключение одного домена или кластера меняет индекс более чем на 5 пунктов.',
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
    'sources.quote.label': 'Цитата',
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
    'trend.summary.v2': 'За неделю индекс изменился на {week} {weekWord}; за {weeks} {weeksWord} методологии {version} — на {total} {totalWord}.',
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
    'footer.geo': '© GeoNames, CC BY 4.0',
    'disclaimer.full': 'Cassandra Index — экспериментальная оценка риска на основе открытых данных. Это не официальный прогноз правительства или международной организации. Оценка может быть ошибочной.',
    'footer.ip': 'регион определяется приблизительно по часовому поясу вашего браузера — только после вашего согласия; для этого IP-адрес не используется и не сохраняется. Если вы разрешите аналитику, включается cookie-less аналитика Cloudflare Web Analytics — подробности в политике приватности',
    'region.toast.text': 'Мы можем определить ваш регион приблизительно по часовому поясу браузера, чтобы показать региональный контекст. IP-адрес не используется и не сохраняется.',
    'region.toast.change': 'Изменить',
    'region.toast.accept': 'Согласен',
    'region.toast.dismiss': 'Закрыть',
    'region.toast.stale': 'Этот регион больше не входит в текущую сетку — выберите регион из списка.',
    'analytics.banner.text': 'Разрешить сбор статистики посещений? Сайт использует cookie-less аналитику Cloudflare Web Analytics, чтобы понимать, сколько людей его открывает. Счётчик подключится только с вашего согласия — без него аналитика не работает.',
    'analytics.banner.accept': 'Разрешить',
    'analytics.banner.decline': 'Не разрешать',
    'footer.privacy': 'Приватность',
    'footer.howto': 'Как читать индекс',
    'footer.compare': 'Сравнение с другими индексами',
    'footer.digest': 'Дайджест',
    'footer.changelog': 'История изменений',
    'footer.data': 'Данные (JSON)',
    'share.brand': 'CASSANDRA INDEX',
    'share.button': 'Поделиться',
    'share.region': 'Ваш регион: {name} · {index} / 100',
    'share.announce': 'Карточка снапшота скачана',
    // Витрина доверия (ADR 0033 §1, фаза 1): пять фактов строки и детали раскрытия.
    'trust.title': 'На чём стоит индекс',
    'trust.na': 'н/д',
    'trust.fact.criteria': '{n} {n, plural, one{критерий} few{критерия} many{критериев} other{критериев}}',
    'trust.fact.sources': '{n} {n, plural, one{источник} few{источника} many{источников} other{источников}}',
    'trust.fact.clusters': '{n} {n, plural, one{независимый кластер} few{независимых кластера} many{независимых кластеров} other{независимых кластеров}}',
    'trust.fact.blind': '{n} {n, plural, one{слепой регион} few{слепых региона} many{слепых регионов} other{слепых регионов}}',
    'trust.fact.methodology': 'методология {version}',
    'trust.details.clusters': 'Источники по кластерам',
    'trust.cluster.A-mainstream': 'Мейнстрим-агентства (A)',
    'trust.cluster.B-state-media': 'Гос/госфинансируемые СМИ (B)',
    'trust.cluster.C-registries': 'Аналитические реестры (C)',
    'trust.cluster.D-satellite-osint': 'Спутниковые OSINT (D)',
    'trust.cluster.E-field-osint': 'Полевые OSINT (E)',
    'trust.cluster.F-financial': 'Финансовые данные (F)',
    'trust.details.affiliated': '{count} из {total} — гос/госфинансируемые, помечены честно',
    'trust.details.quotes': 'С цитатой: {n} из {total}',
    'trust.details.quotedSources': 'Источники с цитатами',
    'trust.details.coverage': 'не покрыто {n} {n, plural, one{критерий} few{критерия} many{критериев} other{критериев}} — нет подтверждающих сигналов в окне недели',
    'trust.details.coverage.na': 'Покрытие критериев: н/д',
    'trust.details.coverage.drivers': 'Непокрытые критерии по драйверам',
    'trust.details.coverage.driver': '{title} — {n} из {total}: {ids}',
    'trust.details.coverage.all': 'Все критерии покрыты в окне недели',
    'trust.details.sensitivity': 'Чувствительность индекса: {delta} п.п. — максимальный сдвиг при исключении одного домена',
    'trust.details.sensitivity.na': 'Чувствительность индекса: н/д',
    'trust.details.sensitive': 'индекс чувствителен к одному из доменов (Δ {delta} п.п.)',
    // Косвенные предвестники (Д9) — публичный слой §4.3.6, ADR 0047. R07–R11:
    // процент целым числом, число сигналящих подгрупп, обе оговорки. Без цифр в
    // подписи: подпись — про смысл, а не про конкретное число.
    'precursor.title': 'Косвенные предвестники (Д9)',
    'precursor.value': '{value} %',
    'precursor.signals': '{n} {n, plural, one{сигналящая подгруппа} few{сигналящие подгруппы} many{сигналящих подгрупп} other{сигналящих подгрупп}} из {total}',
    'precursor.none': 'сигналов нет',
    'precursor.note': 'доля сигналов Д9, не сравнимо с индексом',
    'precursor.disclaimer': 'Косвенные индикаторы, не подтверждено прямыми наблюдениями.',
    'footer.nav': 'Сервисные ссылки',
    'feedback.title': 'Обратная связь',
    'feedback.topic.label': 'Тема',
    'feedback.topic.wish': 'Пожелание',
    'feedback.topic.remark': 'Замечание',
    'feedback.topic.question': 'Вопрос',
    'feedback.topic.digest': 'Подписка на дайджест',
    'feedback.message.label': 'Сообщение',
    'feedback.message.hint': 'От 5 до 4000 символов',
    'feedback.reply.label': 'Ваш email для ответа (необязательно)',
    'feedback.submit': 'Отправить',
    'feedback.hp.label': 'Не заполняйте это поле',
    'feedback.status.sending': 'Отправляем…',
    'feedback.status.sent': 'Отправлено. Спасибо!',
    'feedback.status.invalid': 'Проверьте выделенные поля',
    'feedback.status.error': 'Не удалось отправить, текст сохранён — попробуйте ещё раз',
    'feedback.error.message': 'Напишите от 5 до 4000 символов',
    'feedback.error.replyTo': 'Похоже, это не email',
    'feedback.subject': 'Cassandra Index — обратная связь: {topic}',
    'feedback.note': 'Сообщение и ваш адрес (если указан) передаются через сервис FormSubmit владельцу сайта на почту.',
    'privacy.feedback.h': 'Форма обратной связи',
    'privacy.feedback.text': 'Если вы пишете через форму обратной связи на главной странице, текст сообщения и указанный вами обратный адрес передаются через сервис FormSubmit (formsubmit.co) на почту владельцу сайта. Сайт сам ничего не хранит: отправка идёт напрямую из вашего браузера во внешний сервис. Адрес получателя виден в коде страницы — на статическом сайте его нельзя скрыть.',
    'privacy.analytics.h': 'Аналитика посещений (Cloudflare Web Analytics)',
    'privacy.analytics.text': 'На главной странице используется Cloudflare Web Analytics — cookie-less аналитика: она не ставит cookie, не отслеживает вас между сайтами и не сохраняет персональные данные. Учитываются только адрес страницы, источник перехода, примерная страна, тип устройства и скорость загрузки. Счётчик подключается только после вашего согласия: до него никакие данные не отправляются. Отказаться можно в любой момент, очистив данные сайта в браузере.',
    'privacy.title': 'Политика приватности',
    'privacy.back': '← На главную',
    'privacy.storage.h': 'Что сайт хранит в вашем браузере',
    'privacy.delete.text': 'Очистка данных сайта в настройках браузера (или удаление ключей cassandra.region, cassandra.region.consent и cassandra.analytics.consent из localStorage) стирает сохранённые значения. После удаления cassandra.region.consent сайт снова спросит согласие о регионе при следующем визите, а после удаления cassandra.analytics.consent — снова предложит аналитику. Других данных о вас у сайта нет.',
    'privacy.storage.region': 'cassandra.region — выбранный вами регион. Записывается, только если вы включили переключатель «Запомнить» в панели выбора региона; без него выбор живёт только до закрытия вкладки.',
    'privacy.storage.consent': 'cassandra.region.consent — ваш ответ на вопрос об автоматическом определении региона: статус (granted/denied), время ответа и, при отказе, срок повторного запроса (denied_until, 30 дней). Записывается, только когда вы отвечаете на уведомление на главной странице.',
    'privacy.storage.analytics': 'cassandra.analytics.consent — ваш ответ на предложение включить аналитику: статус (granted/denied) и время ответа. Записывается, только когда вы отвечаете на баннер аналитики; отказ сохраняется, пока вы не очистите данные сайта.',
    'privacy.storage.first': 'До согласия ничего не сохраняется: до вашего явного действия localStorage остаётся пустым, регион не определяется, показывается только глобальный индекс.',
    'privacy.region.h': 'Как определяется регион',
    'privacy.region.static': 'Сайт полностью статический и работает без бэкенда. Регион определяется приблизительно по часовому поясу вашего браузера — и только после вашего согласия: до согласия регион не определяется и не сохраняется. Часовой пояс не сохраняется и никуда не передаётся.',
    'privacy.region.future': 'В будущей версии с сервером (edge-слой) определение будет происходить на сервере: сырой IP-адрес не будет попадать в инфраструктуру сайта, в приложение уйдёт только код региона. Для юрисдикций вне EU/UK и России — opt-out (автоопределение с возможностью отключить), для EU/UK и России сохраняется opt-in.',
    'privacy.consent.h': 'Согласие на определение региона (region_consent)',
    'privacy.consent.text': 'При первом визите показывается неблокирующее уведомление с кнопками «Изменить» (открывает выбор региона вручную), «Согласен» и «Закрыть». «Согласен» разрешает определение по часовому поясу и запоминает ответ с меткой времени; «Закрыть» фиксирует отказ — повторный запрос возможен не раньше чем через 30 дней. Ответ не привязан к IP-адресу и не покидает ваш браузер.',
    'privacy.edge.h': 'Модель «edge/браузер» и сырой IP',
    'privacy.edge.text': 'Сырой IP-адрес не попадает в инфраструктуру сайта: регион определяется в браузере (часовой пояс) и только после согласия. Отдельно, если вы разрешите аналитику, технические данные запроса получает сервис Cloudflare Web Analytics, который не использует cookie и не сохраняет персональные данные. При появлении бэкенда геолокация выполняется на edge-сервере, в приложение уходит только код региона; сырой IP не логируется (хэш с солью, хранение 24 часа — протокол в docs/governance.md).',
    'privacy.laws.h': 'Применимое право',
    'privacy.ccpa.h': 'CCPA (Калифорния)',
    'privacy.ccpa.text': 'IP-адрес и идентификаторы устройства относятся к персональной информации. Сайт уведомляет о сборе при первом визите (уведомление о регионе и баннер аналитики), предоставляет право на отказ: «Закрыть» откладывает вопрос о регионе на 30 дней, отказ от аналитики сохраняется. Передача данных третьим лицам ограничена cookie-less аналитикой Cloudflare Web Analytics (только с вашего согласия) и формой обратной связи.',
    'privacy.gdpr.h': 'GDPR (EU/UK)',
    'privacy.gdpr.text': 'Определение региона после согласия опирается на законный интерес — ст. 6(1)(f) GDPR с учётом Recital 30: обработка минимальна (производный код региона, без сырого IP). Аналитика Cloudflare Web Analytics включается только по вашему явному согласию, не использует cookie и отключается очисткой данных сайта в браузере.',
    'privacy.fz.h': '152-ФЗ (Россия)',
    'privacy.fz.text': 'С 2026 года IP-адреса, cookie-идентификаторы и геоданные относятся к персональным данным; их хранение подлежит локализации на территории РФ. Геолокация на зарубежном edge-сервере может нарушать требование локализации — перед запуском edge-слоя обязательна юридическая экспертиза (открытый вопрос зафиксирован в docs/governance.md).',
    'privacy.geo.h': 'Точная геолокация',
    'privacy.geo.text': 'Координаты запрашиваются, только если вы нажимаете «Уточнить точнее»; автоматического запроса GPS нет. Координаты используются только на вашем устройстве, чтобы уточнить регион, и никуда не отправляются.',
    'privacy.geodata.h': 'Справочник городов и стран',
    'privacy.geodata.text': 'Для поиска города или страны панель выбора региона использует статический справочник на основе данных GeoNames. Справочник подгружается, только когда вы открываете панель выбора региона. Данные GeoNames предоставлены по лицензии Creative Commons Attribution 4.0:',
    'privacy.not.h': 'Чего сайт не делает',
    'privacy.not.cookies': 'Не использует файлы cookie и сторонние виджеты, кроме cookie-less аналитики Cloudflare Web Analytics — она подключается только с вашего согласия.',
    'privacy.not.third': 'Данные передаются третьим лицам только в двух случаях: отправка сообщения через форму обратной связи и cookie-less аналитика Cloudflare Web Analytics (подключается только с вашего согласия) — оба описаны выше. Без согласия сайт можно открыть с локального диска, не подключаясь к сети.',
    'privacy.delete.h': 'Как удалить сохранённое',
    'history.week.label': 'Неделя',
    'history.week.current': 'текущая',
    'history.index': 'Глобальный индекс',
    'history.methodology': 'Версия методологии',
    'history.methodology.note': 'Эта неделя рассчитана по версии методологии {viewed}, а текущая неделя — по версии {current}: значения могут быть несопоставимы.',
    'history.taxonomy.note': 'Региональная сетка обновлена с {date}: набор регионов отличается от текущего, значения по регионам несопоставимы.',
    'history.review.title': 'Разбор недели ({date}): где ошиблись, где были правы, где неопределённость',
    'history.review.wrong': 'Где ошиблись',
    'history.review.right': 'Где были правы',
    'history.review.uncertain': 'Где неопределённость',
    'history.sources.title': 'Источники недели',
    'method.definition.title': 'Что такое «глобальный военный конфликт»',
    'method.definition.1': 'Конфликт — это поведение двух и более субъектов (индивидов или групп), направленное на распределение или перераспределение спорных ресурсов между ними (Ильясов Ф. Н. Причины и типология этнических конфликтов // Социальные исследования. 2017. № 2). Конфликт шире войны: он может идти в дипломатической, экономической, информационной или иной форме.',
    'method.definition.2': 'Война — не отдельное явление рядом с конфликтом, а форма его проявления: переход конфликта в силовую форму, когда стороны применяют вооружённое насилие, добиваясь перераспределения спорных ресурсов. Война — наиболее острая стадия конфликта, и далеко не каждый конфликт до неё доходит.',
    'method.definition.3': 'Глобальный военный конфликт — это война, которая охватывает несколько регионов мира сразу (по таксономии проекта — не менее двух) и в которую напрямую втянуты крупные державы — государства, способные вести самостоятельную военную кампанию за пределами своего региона. Отдельная война или несколько локальных конфликтов — ещё не глобальный конфликт: им недостаёт ни охвата, ни прямого участия держав.',
    'method.definition.4': 'Слово «глобальный» в названии индекса означает охват: модель собирает сигналы по всему миру и по всем девяти направлениям сразу. Оно не означает, что все страны уже воюют.',
    'method.definition.5': 'Индекс не устанавливает факт войны и не имеет отметки, после которой объявляет глобальный конфликт начавшимся: он показывает, насколько текущая комбинация сигналов похожа на опасные периоды прошлого. Поэтому состояния «Опасно», «Очень опасно» и «Критически опасно» описывают уровень риска, а не подтверждают, что конфликт перешёл в войну, тем более — что эта война стала глобальной. Границы между состояниями — шкала публикации уровней риска, а не критерий отнесения конфликта к глобальным. Факт войны устанавливают по событиям: кто с кем воюет, на скольких театрах и какие государства вовлечены напрямую.',
    'method.measures.title': 'Что модель измеряет',
    'method.measures.1': 'Состояние риска глобального конфликта по подтверждённым открытым сигналам — включая косвенные индикаторы подготовки. Значение 0–100 — индекс аномальности относительно базовой линии мирного времени (ориентир — 2010–2019 годы): мера схожести текущей комбинации сигналов с историческими кризисами, а не прогноз будущего.',
    // R04, ADR 0045/0047: что шкала доказывает и чего не доказывает — те же
    // 3–4 предложения, что в журнале калибровки (раздел «Интервальность»).
    'method.scale.title': 'Что доказывает шкала',
    'method.scale.intro': 'Шкала индекса порядковая: число упорядочивает недели по уровню риска, а границы состояний прокалиброваны на исторических эпизодах и модельных якорях. Расстояние между числами — не измеренная величина, а соглашение модели: отрезок от 40 до 60 не означает то же изменение, что от 80 до 100. Читать имеет смысл положение недели относительно границ состояний и направление движения, а не разность двух значений. По той же логике публикуется слой предвестников: он показывает долю сигналов Д9 и не складывается с индексом.',
    'method.criteria.title': 'Полный перечень критериев',
    'method.criteria.intro': 'Индекс собирается из 46 критериев, сгруппированных по 9 драйверам. Ниже — что именно наблюдает модель по каждому критерию, какая у него шкала и в какую сторону он двигает оценку. Формулы агрегации, веса и пороги в публичный интерфейс не выносятся.',
    'method.criteria.driver.d1': 'Д1. Военная активность',
    'method.criteria.driver.d2': 'Д2. Ядерная сигнальная активность',
    'method.criteria.driver.d3': 'Д3. Дипломатическая эскалация и деэскалация',
    'method.criteria.driver.d4': 'Д4. Экономические индикаторы конфликта',
    'method.criteria.driver.d5': 'Д5. Информационная и киберсфера',
    'method.criteria.driver.d6': 'Д6. Мобилизация общества',
    'method.criteria.driver.d7': 'Д7. Распространение и вовлечение третьих сторон',
    'method.criteria.driver.d8': 'Д8. Подтверждённые деэскалирующие исходы',
    'method.criteria.driver.d9': 'Д9. Косвенные индикаторы подготовки',
    // Шкала и направление критерия — публичны (ADR 0045); подписи только здесь.
    'method.criteria.dir.esc': 'эскалационная',
    'method.criteria.dir.deesc': 'деэскалационная',
    'method.criteria.scale.count': 'счётная шкала',
    'method.criteria.scale.ordinal': 'порядковая шкала',
    'method.criteria.scale.binary': 'бинарная шкала',
    'method.not.title': 'Что модель не измеряет',
    'method.not.1': 'Начало войны и дату события — индекс никогда так не интерпретируется.',
    'method.not.2': 'Риск удара по конкретному городу: город в интерфейсе — только ярлык вашего региона.',
    'method.not.3': 'Сам факт тайной подготовки: косвенные сигналы — это наблюдения, а не доказательства.',
    'method.gaps.title': 'Пробелы в данных',
    'method.gaps.1': 'Покрытие источников неравномерно по регионам и типам сигналов; это влияет на уверенность в оценке.',
    'method.gaps.2': 'Для косвенных индикаторов подготовки в закрытых странах данных мало — там возможны слепые зоны.',
    'method.gaps.3': 'При плохом покрытии новое значение сжимается к предыдущему, а доля неопределённости показывается в интерфейсе отдельно.',
    'method.gaps.4': 'Наблюдаемость снижения напряжения асимметрична: подписанные договорённости запаздывают относительно реального снижения, а закрытые переговоры не видны открытым источникам до публикации.',
    'method.gaps.5': 'Репрезентативной выборки мирового инфополя нет: полный обход всех открытых источников по мощностям недоступен, покрытие — дисциплинированный обход по фиксированным критериям, а не полный учёт. Это граница метода, а не изъян отдельной недели.',
    'method.sources.title': 'Как выбираются источники',
    'method.sources.1': 'Отбор: 46 критериев фиксированы заранее и не подгоняются под результат. Источник закрывает критерий по правилу независимости — минимум два независимых кластера происхождения либо один первичный источник. Входные сигналы каждой недели публикуются открыто: ссылки, даты и классификация каждого источника.',
    'method.sources.2': 'Проверка: ссылки источников проверяются автоматически перед публикацией — неделя с битой ссылкой не выходит. Выбор источников проходит чек-лист красной команды из семи вопросов, итоги фиксируются в журнале аудита.',
    'method.sources.3': 'Устойчивость: чувствительность считается по каждому домену и кластеру недели — по очереди исключаем каждый источник и измеряем изменение индекса. Если наибольшее изменение превышает 5 пунктов, это раскрывается рядом с данными недели.',
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
    'footer.article': 'Разбор недели',
    // Рубрика «Разбор недели» (articles.html, ADR 0037): хром страницы; проза выпуска — данные, не словарь.
    'article.meta.through': 'Данные по',
    'article.meta.methodology': 'Методология {version}',
    'article.sources.title': 'Источники',
    'article.empty': 'Выпуск за эту неделю ещё не подготовлен.',
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

// Формат подписей осей графиков: «12 июл» (RU) / «Jul 12» (EN) — день и
// сокращённый месяц без точки (ICU отдаёт «июл.» — точка срезается, §11.2).
function axisDate(lang, iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  const locale = LOCALES[lang] ?? LOCALES.ru;
  const parts = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).formatToParts(d);
  const get = (type) => (parts.find((p) => p.type === type) ?? {}).value ?? '';
  const month = get('month').replace(/\.$/, '');
  return lang === 'ru' ? `${get('day')} ${month}` : `${month} ${get('day')}`;
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
exports["axisDate"] = axisDate;
exports["date"] = date;
return exports;
}]);
factories.push(["js/criteria.js", function (exports) {
// Статический список 46 критериев D1.1–D9.7 для раздела «Методология» (R05).
// Данные по METHODOLOGY.md §4: сжатые названия и описания наблюдаемого сигнала,
// тип шкалы (scale: count|ordinal|binary) и направление (dir: esc|deesc, ADR 0045).
// Формулы агрегации, веса, CAP и пороги в публичный UI не выносятся — эта граница
// раскрытия зафиксирована в ADR 0045. Порядок позиций совпадает с engine.CRITERIA
// (calc/engine.js); рассинхрон страхует тест-паритет tests/methodology-criteria.test.js.
// Сайт не импортирует calc/ (конвенция) — список дублируется здесь намеренно.

const CRITERIA_LIST = [
  {
    id: 'D1.1',
    driver: 'D1',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Перемещения войск и военных колонн', en: 'Troop and military column movements' },
    desc: {
      ru: 'Наземные переброски, железнодорожные эшелоны и морские перевозки войск вблизи театра военных действий или границ.',
      en: 'Ground transfers, railway echelons and sealifts of troops near the theatre of operations or borders.',
    },
  },
  {
    id: 'D1.2',
    driver: 'D1',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Учения необычного масштаба', en: 'Exercises of unusual scale' },
    desc: {
      ru: 'Анонсированные и фактические учения, необычные по масштабу, близости к границе или одновременности на нескольких фронтах.',
      en: 'Announced and actual exercises unusual in scale, proximity to borders, or simultaneity across several fronts.',
    },
  },
  {
    id: 'D1.3',
    driver: 'D1',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Наращивание военной логистики', en: 'Military logistics build-up' },
    desc: {
      ru: 'Склады боеприпасов, топливные резервы, развёртывание полевых госпиталей, мостов и переправ.',
      en: 'Ammunition depots, fuel reserves, and deployment of field hospitals, bridges and crossings.',
    },
  },
  {
    id: 'D1.4',
    driver: 'D1',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Актуальные боевые действия', en: 'Active hostilities' },
    desc: {
      ru: 'Обстрелы, авиаудары, пограничные инциденты и попытки прорыва; вторжение или открытие нового театра учитываются как наиболее тяжёлые события.',
      en: 'Shelling, airstrikes, border incidents and breakthrough attempts; an invasion or a new theatre counts among the most severe events.',
    },
  },
  {
    id: 'D1.5',
    driver: 'D1',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Развёртывание стратегических систем', en: 'Deployment of strategic systems' },
    desc: {
      ru: 'Переброска ПВО, надводных групп, подводных сил и ядерной инфраструктуры; ядерная риторика учитывается отдельным драйвером.',
      en: 'Deployment of air defence, surface groups, submarines and nuclear infrastructure; nuclear rhetoric is tracked by a separate driver.',
    },
  },
  {
    id: 'D1.6',
    driver: 'D1',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Разведение сил', en: 'Drawdown of forces' },
    desc: {
      ru: 'Подтверждённое разведение войск, вывод из позиций и сокращение активности.',
      en: 'Confirmed troop drawdowns, withdrawal from positions and reduced activity.',
    },
  },
  {
    id: 'D2.1',
    driver: 'D2',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Публичные ядерные угрозы', en: 'Public nuclear threats' },
    desc: {
      ru: 'Явные заявления о применении ядерного оружия на уровне глав государств и министров обороны или иностранных дел.',
      en: 'Explicit statements about nuclear weapons use by heads of state and ministers of defence or foreign affairs.',
    },
  },
  {
    id: 'D2.2',
    driver: 'D2',
    scale: 'binary',
    dir: 'esc',
    name: { ru: 'Смена доктрины и договоров', en: 'Doctrine and treaty shifts' },
    desc: {
      ru: 'Изменения ядерной доктрины, выход из договоров по контролю над вооружениями, приостановка участия в механизмах уведомления.',
      en: 'Changes to nuclear doctrine, withdrawal from arms-control treaties, suspension of notification mechanisms.',
    },
  },
  {
    id: 'D2.3',
    driver: 'D2',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Технические ядерные сигналы', en: 'Technical nuclear signals' },
    desc: {
      ru: 'Учения стратегических сил, подвижки ракетных комплексов, подготовка полигонов, смена режима дежурств.',
      en: 'Strategic force exercises, movements of missile systems, test-site preparations, changes in duty rotations.',
    },
  },
  {
    id: 'D2.4',
    driver: 'D2',
    scale: 'binary',
    dir: 'esc',
    name: { ru: 'Повышение готовности ядерных сил', en: 'Raised nuclear readiness' },
    desc: {
      ru: 'Публичные заявления о переводе ядерных сил на особый режим.',
      en: 'Public announcements of moving nuclear forces to a special readiness regime.',
    },
  },
  {
    id: 'D2.5',
    driver: 'D2',
    scale: 'binary',
    dir: 'deesc',
    name: { ru: 'Отход от ядерной риторики', en: 'Step back from nuclear rhetoric' },
    desc: {
      ru: 'Отказ от ядерных угроз, подтверждённое возвращение сил к штатному режиму, восстановление договорных механизмов.',
      en: 'Renunciation of nuclear threats, confirmed return of forces to normal posture, restoration of treaty mechanisms.',
    },
  },
  {
    id: 'D3.1',
    driver: 'D3',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Разрыв дипломатических отношений', en: 'Breakdown of diplomatic relations' },
    desc: {
      ru: 'Разрыв или понижение отношений, массовая высылка дипломатов, закрытие посольств.',
      en: 'Rupture or downgrading of relations, mass expulsions of diplomats, embassy closures.',
    },
  },
  {
    id: 'D3.2',
    driver: 'D3',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Ультиматумы', en: 'Ultimatums' },
    desc: {
      ru: 'Публично заявленные несовместимые требования сторон конфликта.',
      en: 'Publicly stated incompatible demands by the parties to the conflict.',
    },
  },
  {
    id: 'D3.3',
    driver: 'D3',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Санкции и международно-правовые решения', en: 'Sanctions and legal measures' },
    desc: {
      ru: 'Новые пакеты санкций, резолюции, признание сторон конфликта террористическими и подобные решения.',
      en: 'New sanctions packages, resolutions, designations of parties as terrorist and similar measures.',
    },
  },
  {
    id: 'D3.4',
    driver: 'D3',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Переговоры и посредничество', en: 'Talks and mediation' },
    desc: {
      ru: 'Возобновление или запуск переговоров, посредничество третьих стран и организаций.',
      en: 'Resumption or launch of negotiations, mediation by third countries and organisations.',
    },
  },
  {
    id: 'D3.5',
    driver: 'D3',
    scale: 'count',
    dir: 'deesc',
    name: { ru: 'Гуманитарные договорённости', en: 'Humanitarian arrangements' },
    desc: {
      ru: 'Договорённости о коридорах, обменах пленными и доступе инспекций.',
      en: 'Arrangements on corridors, prisoner exchanges and inspection access.',
    },
  },
  {
    id: 'D4.1',
    driver: 'D4',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Новые санкции и контрсанкции', en: 'New sanctions and countersanctions' },
    desc: {
      ru: 'Ограничения на экспорт энергоносителей и критичных товаров; само решение об ограничениях учитывается дипломатическим драйвером.',
      en: 'Restrictions on exports of energy and critical goods; the decision itself is tracked by the diplomatic driver.',
    },
  },
  {
    id: 'D4.2',
    driver: 'D4',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Военные расходы', en: 'Military spending' },
    desc: {
      ru: 'Экстренные бюджетные ассигнования и переход экономики на военные рельсы по открытым бюджетам и официальным решениям.',
      en: 'Emergency budget allocations and a shift of the economy onto a war footing, per open budgets and official decisions.',
    },
  },
  {
    id: 'D4.3',
    driver: 'D4',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Разрыв цепочек поставок', en: 'Supply chain disruption' },
    desc: {
      ru: 'Перебои с критичными ресурсами: редкие металлы, микроэлектроника, компоненты оборонной промышленности.',
      en: 'Disruptions in critical resources: rare metals, microelectronics, defence industry components.',
    },
  },
  {
    id: 'D4.4',
    driver: 'D4',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Конфискации и блокировка торговли', en: 'Asset seizures and trade blockage' },
    desc: {
      ru: 'Конфискации и национализация активов конфликтующих сторон, блокировка торговых путей.',
      en: 'Seizures and nationalisation of the parties’ assets, blockage of trade routes.',
    },
  },
  {
    id: 'D4.5',
    driver: 'D4',
    scale: 'count',
    dir: 'deesc',
    name: { ru: 'Снятие экономических ограничений', en: 'Easing of economic restrictions' },
    desc: {
      ru: 'Отмена ограничений, восстановление торговых связей, гуманитарные экономические исключения.',
      en: 'Lifting of restrictions, restoration of trade ties, humanitarian economic exemptions.',
    },
  },
  {
    id: 'D4.6',
    driver: 'D4',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Стресс на финансовых и сырьевых рынках', en: 'Financial and commodity market stress' },
    desc: {
      ru: 'Сырьевые биржи, рынки облигаций и ценных бумаг реагируют на эскалацию раньше других сигналов: обвал индексов, скачки цен на нефть и золото, разрыв кредитных спредов.',
      en: 'Commodity exchanges, bond and equity markets react to escalation earlier than other signals: index sell-offs, spikes in oil and gold prices, widening credit spreads.',
    },
  },
  {
    id: 'D5.1',
    driver: 'D5',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Эскалация военной риторики', en: 'Escalation of war rhetoric' },
    desc: {
      ru: 'Переход к языку неизбежности и дегуманизации противника в официальных государственных СМИ и заявлениях.',
      en: 'A shift to the language of inevitability and dehumanisation of the enemy in official state media and statements.',
    },
  },
  {
    id: 'D5.2',
    driver: 'D5',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Кибероперации', en: 'Cyber operations' },
    desc: {
      ru: 'Подтверждённые атаки на критическую инфраструктуру — энергетику, связь, транспорт, госорганы — с атрибуцией конфликтующей стороной.',
      en: 'Confirmed attacks on critical infrastructure — power, communications, transport, government — attributed to a party to the conflict.',
    },
  },
  {
    id: 'D5.3',
    driver: 'D5',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Дезинформационные кампании', en: 'Disinformation campaigns' },
    desc: {
      ru: 'Координированные кампании, разворачиваемые в преддверии военных действий, по отчётам проверенных аналитических центров.',
      en: 'Coordinated campaigns rolled out ahead of hostilities, per reports of vetted analytical centres.',
    },
  },
  {
    id: 'D5.4',
    driver: 'D5',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Снижение пропаганды', en: 'Easing of propaganda' },
    desc: {
      ru: 'Снижение уровня военной пропаганды, закрытие каналов разжигания, публичные опровержения эскалационных нарративов.',
      en: 'Lower levels of war propaganda, closure of incitement channels, public denials of escalatory narratives.',
    },
  },
  {
    id: 'D6.1',
    driver: 'D6',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Военное положение и мобилизация', en: 'Martial law and mobilisation' },
    desc: {
      ru: 'Введение или расширение военного положения, мобилизационные законы, скрытая мобилизация по подтверждённым данным.',
      en: 'Introduction or expansion of martial law, mobilisation laws, covert mobilisation per confirmed data.',
    },
  },
  {
    id: 'D6.2',
    driver: 'D6',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Эвакуация населения', en: 'Evacuation of population' },
    desc: {
      ru: 'Эвакуация из приграничных и прифронтовых зон, создание убежищ, учения гражданской обороны необычного масштаба.',
      en: 'Evacuation from border and frontline areas, construction of shelters, civil defence drills of unusual scale.',
    },
  },
  {
    id: 'D6.3',
    driver: 'D6',
    scale: 'binary',
    dir: 'esc',
    name: { ru: 'Военная переориентация экономики', en: 'Military reorientation of the economy' },
    desc: {
      ru: 'Военные госзаказы, ограничение выезда для военнообязанных.',
      en: 'Military state orders, exit restrictions for military-age citizens.',
    },
  },
  {
    id: 'D6.4',
    driver: 'D6',
    scale: 'binary',
    dir: 'deesc',
    name: { ru: 'Отмена мобилизационных мер', en: 'Rollback of mobilisation measures' },
    desc: {
      ru: 'Отмена мобилизационных мер, возвращение гражданских режимов, возвращение эвакуированных.',
      en: 'Cancellation of mobilisation measures, return of civilian regimes and of evacuees.',
    },
  },
  {
    id: 'D7.1',
    driver: 'D7',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Вовлечение новых государств', en: 'Entry of new states' },
    desc: {
      ru: 'Прямое военное вовлечение новых государств: ввод войск, поставки оружия с эскалационным эффектом, базирование.',
      en: 'Direct military entry of new states: troop deployments, arms deliveries with an escalatory effect, basing.',
    },
  },
  {
    id: 'D7.2',
    driver: 'D7',
    scale: 'count',
    dir: 'esc',
    name: { ru: 'Атаки за пределами театра', en: 'Attacks beyond the theatre' },
    desc: {
      ru: 'Атаки на объекты за пределами основного театра: торговые суда, трубопроводы, дипмиссии, инфраструктура третьих стран.',
      en: 'Attacks on objects outside the main theatre: merchant ships, pipelines, diplomatic missions, third countries’ infrastructure.',
    },
  },
  {
    id: 'D7.3',
    driver: 'D7',
    scale: 'binary',
    dir: 'esc',
    name: { ru: 'Новые фронты', en: 'New fronts' },
    desc: {
      ru: 'Открытие новых фронтов или театров в соседних регионах.',
      en: 'Opening of new fronts or theatres in neighbouring regions.',
    },
  },
  {
    id: 'D7.4',
    driver: 'D7',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Выход третьих сторон', en: 'Withdrawal of third parties' },
    desc: {
      ru: 'Выход третьих сторон из конфликта, прекращение поставок, закрытие базирования.',
      en: 'Withdrawal of third parties from the conflict, cessation of supplies, closure of basing.',
    },
  },
  {
    id: 'D8.1',
    driver: 'D8',
    scale: 'binary',
    dir: 'deesc',
    name: { ru: 'Прекращение огня', en: 'Ceasefire' },
    desc: {
      ru: 'Прекращение огня или перемирие, соблюдаемое в течение всего окна без нарушений.',
      en: 'A ceasefire or truce observed throughout the window without violations.',
    },
  },
  {
    id: 'D8.2',
    driver: 'D8',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Мирные договорённости', en: 'Peace arrangements' },
    desc: {
      ru: 'Подписанные мирные договорённости, разведение сил и тяжёлого вооружения по верифицируемым схемам.',
      en: 'Signed peace arrangements, verified drawdown schemes for forces and heavy weapons.',
    },
  },
  {
    id: 'D8.3',
    driver: 'D8',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Наблюдение и верификация', en: 'Monitoring and verification' },
    desc: {
      ru: 'Международное наблюдение: миссии, инспекции, мониторинг соблюдения режимов.',
      en: 'International monitoring: missions, inspections, verification of compliance.',
    },
  },
  {
    id: 'D8.4',
    driver: 'D8',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Снижение интенсивности событий', en: 'Sustained drop in event intensity' },
    desc: {
      ru: 'Устойчивое снижение числа эскалационных инцидентов на протяжении нескольких недель подряд без нарушения режимов.',
      en: 'A sustained decline in the number of escalation incidents over several consecutive weeks without regime violations.',
    },
  },
  {
    id: 'D9.1',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Медицинская подготовка', en: 'Medical preparation' },
    desc: {
      ru: 'Необычные закупки препаратов для лечения ранений, запасы крови и плазмы, расширение коечного фонда, ускоренная подготовка военных медиков.',
      en: 'Unusual procurements of wound-care medicines, blood and plasma stockpiles, expansion of hospital bed capacity, accelerated training of military medics.',
    },
  },
  {
    id: 'D9.2',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Финансовая изоляция', en: 'Financial isolation' },
    desc: {
      ru: 'Капитальные ограничения, отзыв активов из-за рубежа, приостановка выплат по внешнему долгу, военные займы, запреты на экспорт продовольствия и топлива.',
      en: 'Capital controls, repatriation of assets from abroad, suspension of external debt payments, war loans, bans on food and fuel exports.',
    },
  },
  {
    id: 'D9.3',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Транспорт и страхование', en: 'Transport and insurance' },
    desc: {
      ru: 'Рост военных страховых надбавок, отзыв страхового покрытия, массовая отмена авиарейсов, закрытие воздушного пространства, военные приоритеты на железных дорогах, изъятие подвижного состава.',
      en: 'Rising war-risk insurance premiums, withdrawal of coverage, mass flight cancellations, airspace closures, military priorities on railways, requisition of rolling stock.',
    },
  },
  {
    id: 'D9.4',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Стратегическое накопление', en: 'Strategic stockpiling' },
    desc: {
      ru: 'Аномальные закупки в госрезервы, круглосуточные режимы предприятий оборонной промышленности, мобилизационные заказы гражданским заводам, накопление топлива вблизи театра.',
      en: 'Abnormal state reserve purchases, round-the-clock shifts at defence plants, mobilisation orders to civilian factories, fuel stockpiling near the theatre.',
    },
  },
  {
    id: 'D9.5',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Кадровые и мобилизационные меры', en: 'Personnel and mobilisation measures' },
    desc: {
      ru: 'Изменение возраста и категорий призыва, расширение списков военнообязанных, ограничения выезда для отдельных категорий специалистов, изменения законов о военной службе без объявления мобилизации.',
      en: 'Changes to draft age and categories, expanded military registers, exit restrictions for select categories of specialists, changes to military service laws without declared mobilisation.',
    },
  },
  {
    id: 'D9.6a',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Информационный суверенитет', en: 'Information sovereignty' },
    desc: {
      ru: 'Усиление цензуры и фильтрации интернета, учения на автономность от глобальной сети, замена импортного ПО и оборудования в критичных отраслях, «подогревка» госСМИ и военно-патриотические кампании, постановка помех спутниковой навигации.',
      en: 'Tighter censorship and internet filtering, drills for autonomy from the global network, replacement of imported software and equipment in critical sectors, stoking of state media and military-patriotic campaigns, satellite navigation jamming.',
    },
  },
  {
    id: 'D9.6b',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'esc',
    name: { ru: 'Эвакуация элит и активов', en: 'Evacuation of elites and assets' },
    desc: {
      ru: 'Вывоз семей дипломатов и чиновников, отзыв студентов и специалистов из-за рубежа, эвакуация музейных ценностей и архивов, перебазирование командных пунктов и правительственных резервов.',
      en: 'Evacuation of diplomats’ and officials’ families, recall of students and specialists from abroad, removal of museum collections and archives, relocation of command posts and government reserves.',
    },
  },
  {
    id: 'D9.7',
    driver: 'D9',
    scale: 'ordinal',
    dir: 'deesc',
    name: { ru: 'Снятие «тихих» мер', en: 'Lifting of quiet measures' },
    desc: {
      ru: 'Отмена капитального контроля, возвращение дипломатических семей, возобновление публикации статистики, возврат предприятий к гражданским режимам, возвращение эвакуированных коллекций.',
      en: 'Lifting of capital controls, return of diplomats’ families, resumption of statistics publication, return of plants to civilian regimes, return of evacuated collections.',
    },
  },
];

exports["CRITERIA_LIST"] = CRITERIA_LIST;
return exports;
}]);
factories.push(["js/data.js", function (exports) {
const { CRITERIA_LIST } = __ci_require("js/criteria.js");
// data.js — чтение снапшотов из window.CI_DATA (заполненного script-тегами, без fetch),
// указатель latest, схема validate. Битый/отсутствующий снапшот → «Model unavailable»
// в данных + событие ci:datastate, не падение.

// Статический перечень 46 критериев — для проверки id в coverageCriteria.uncovered
// (ADR 0045). Импорт сайтовый (criteria.js без зависимостей), calc/ не читается.

const CRITERIA_IDS = new Set(CRITERIA_LIST.map((c) => c.id));

const DATA_STATES = ['published', 'updating', 'delayed', 'insufficient', 'unavailable'];

// Наборы регионов по версии таксономии (ADR 0028). Порядок id — канонический
// (совпадает с порядком регионов в data/regions/reference.json и в js/region.js;
// пин-тест фиксирует тройное равенство). '1.0' — легаси-шестёрка, '2.0' — текущая
// двенадцатка.
const REGION_TAXONOMIES = {
  '1.0': ['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa'],
  '2.0': [
    'russia-belarus', 'ukraine-moldova', 'baltic', 'balkans', 'eu-north-europe',
    'south-caucasus', 'central-asia', 'east-asia', 'middle-east', 'north-america',
    'south-asia', 'africa',
  ],
};

// Резолвер набора id по версии снапшота; отсутствие/неизвестная версия = '1.0'
// (старые недели поля не несут).
function regionIdsFor(taxonomy = '1.0') {
  return REGION_TAXONOMIES[taxonomy] ?? REGION_TAXONOMIES['1.0'];
}

// Версия текущего набора и дата переключения (неделя пилота). REGION_IDS —
// псевдоним текущего набора (CURRENT_TAXONOMY, двенадцать id) для обратной
// совместимости: контракт и расчёт недели ходят через regionIdsFor(версию
// недели), а дефолт движка (engine.validate/regionalSignals) — текущий набор.
const CURRENT_TAXONOMY = '2.0';
const TAXONOMY_V2_FROM = '2026-10-18';
const REGION_IDS = REGION_TAXONOMIES[CURRENT_TAXONOMY];

// Число подгрупп Д9 (§4.3.8) — единственный источник числа на сайте: отсюда
// его берут контракт снапшота (validateQuality ниже), секция precursor
// (js/sections/precursor.js) и подпись «из N» (i18n-ключ precursor.signals
// получает его плейсхолдером {total}). Сайт не читает calc/, поэтому зеркало
// движка (calc/engine.js D9_SUBGROUPS.length) — паритет пинит
// tests/precursor-ui.test.js: смена числа в движке даёт красный тест,
// а не тихую ложь в подписи.
const PRECURSOR_SUBGROUPS = 8;

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
  if (!s || typeof s !== 'object') return false;
  if (!isLocalized(s.title) || typeof s.url !== 'string' || typeof s.domain !== 'string') {
    return false;
  }
  // quotes (R05i) — опциональное поле: список {criterion, text} с непустыми
  // строками. Отсутствие — норма (недели без цитат); битая форма — ошибка.
  if (s.quotes !== undefined && !isQuotes(s.quotes)) return false;
  // Легаси-схема демо-недель: скалярная дата публикации.
  if (typeof s.date === 'string') return true;
  // Полная схема ingestion (R55): обязательные поля новой записи.
  return (
    typeof s.id === 'string' &&
    typeof s.publication_date === 'string' &&
    typeof s.accessed_date === 'string' &&
    ['primary', 'secondary', 'OSINT'].includes(s.source_type) &&
    typeof s.cluster_id === 'string' &&
    typeof s.state_affiliated === 'boolean'
  );
}

function isQuotes(v) {
  if (!Array.isArray(v)) return false;
  return v.every(
    (q) =>
      !!q && typeof q === 'object' && !Array.isArray(q) &&
      typeof q.criterion === 'string' && q.criterion.trim() !== '' &&
      typeof q.text === 'string' && q.text.trim() !== ''
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
  // global: null допускается только при insufficient/unavailable; неделя
  // insufficient обязана иметь global:null (публикация запрещена, R11–R13).
  const nullGlobalAllowed = snapshot.dataState === 'insufficient' || snapshot.dataState === 'unavailable';
  if (snapshot.global === null || snapshot.global === undefined) {
    if (!nullGlobalAllowed) {
      errors.push('global: null allowed only when dataState is insufficient or unavailable');
    }
  } else if (!isIndex(snapshot.global.index) || !isDelta(snapshot.global.delta)) {
    errors.push('global: { index: 0..100, delta: number } required');
  }
  if (!snapshot.regions || typeof snapshot.regions !== 'object') {
    errors.push('regions: object required');
  } else {
    // Набор регионов — по версии снапшота: поле regions_taxonomy опционально
    // (старые недели его не несут = '1.0'); если есть — '1.0'|'2.0'.
    const taxonomy = snapshot.regions_taxonomy ?? '1.0';
    if (!Object.prototype.hasOwnProperty.call(REGION_TAXONOMIES, taxonomy)) {
      errors.push("regions_taxonomy: must be one of 1.0, 2.0 (or absent = '1.0')");
    }
    for (const id of regionIdsFor(taxonomy)) {
      const r = snapshot.regions[id];
      if (!r || !isIndex(r.index) || !isDelta(r.delta)) {
        errors.push(`regions.${id}: { index: 0..100, delta: number } required`);
        continue;
      }
      // Фоновый регион (нет региональных данных, индекс = глобальный фон):
      // опционально, отсутствие = false (обратная совместимость со старыми
      // снапшотами); сайт при true не подаёт дельту как региональную.
      if (r.background !== undefined && typeof r.background !== 'boolean') {
        errors.push(`regions.${id}.background: boolean`);
      }
    }
  }
  if (!Array.isArray(snapshot.trend) || snapshot.trend.length !== 12) {
    errors.push('trend: exactly 12 weekly points required');
  } else {
    snapshot.trend.forEach((p, i) => {
      if (!p || !DATE_RE.test(p.date ?? '')) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required`);
        return;
      }
      // Точка может нести methodology (версия снапшота недели точки);
      // value:null — только с methodology: неделя не опубликована.
      if (p.methodology !== undefined && typeof p.methodology !== 'string') {
        errors.push(`trend[${i}]: methodology must be a string`);
      }
      const nullPoint = p.value === null && typeof p.methodology === 'string' && p.methodology !== '';
      if (!isIndex(p.value) && !nullPoint) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required (value:null only with methodology)`);
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
  validateQuality(snapshot, errors);
  return { ok: errors.length === 0, errors };
}

// Опциональные поля качества публикации (таск 05): q, nullWeight, confidence,
// coverage, preview, recalc, incompleteCoverage; sensitivity (таск 02, R02) —
// метрика чувствительности недели в п.п. Старые снапшоты без них —
// валидны. Неделя insufficient обязана нести полное описание непубликации.
const CONFIDENCES = ['full', 'reduced', 'none'];

function isUnitInterval(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1;
}

function validateQuality(snapshot, errors) {
  if (snapshot.q !== undefined && !isUnitInterval(snapshot.q)) {
    errors.push('q: number 0..1');
  }
  if (snapshot.nullWeight !== undefined && !isUnitInterval(snapshot.nullWeight)) {
    errors.push('nullWeight: number 0..1');
  }
  if (snapshot.confidence !== undefined && !CONFIDENCES.includes(snapshot.confidence)) {
    errors.push(`confidence: must be one of ${CONFIDENCES.join(', ')}`);
  }
  if (snapshot.coverage !== undefined) {
    const c = snapshot.coverage;
    const ok =
      !!c && typeof c === 'object' &&
      Number.isInteger(c.coveredDrivers) && c.coveredDrivers >= 0 &&
      Number.isInteger(c.totalDrivers) && c.totalDrivers > 0;
    if (!ok) errors.push('coverage: { coveredDrivers: int >= 0, totalDrivers: int > 0 }');
  }
  // Покрытие критериев недели (R05/R06/R18, ADR 0045): { covered: int >= 0,
  // total: int > 0, covered <= total, uncovered?: string[] }. Поле опционально —
  // недели, записанные до правки, валидны. uncovered, если есть, перечисляет
  // ровно total − covered известных id без дублей.
  if (snapshot.coverageCriteria !== undefined) {
    const cc = snapshot.coverageCriteria;
    let ok =
      !!cc && typeof cc === 'object' && !Array.isArray(cc) &&
      Number.isInteger(cc.covered) && cc.covered >= 0 &&
      Number.isInteger(cc.total) && cc.total > 0 &&
      cc.covered <= cc.total;
    if (ok && cc.uncovered !== undefined) {
      ok =
        Array.isArray(cc.uncovered) &&
        cc.uncovered.every((id) => typeof id === 'string' && CRITERIA_IDS.has(id)) &&
        new Set(cc.uncovered).size === cc.uncovered.length &&
        cc.uncovered.length === cc.total - cc.covered;
    }
    if (!ok) {
      errors.push('coverageCriteria: { covered: int >= 0, total: int > 0, covered <= total, uncovered?: string[] }');
    }
  }
  if (snapshot.preview !== undefined) {
    const p = snapshot.preview;
    if (!p || !isIndex(p.index) || !isDelta(p.internal)) {
      errors.push('preview: { index: 0..100, internal: number }');
    }
  }
  if (snapshot.recalc !== undefined) {
    const r = snapshot.recalc;
    const ok =
      !!r && typeof r === 'object' &&
      typeof r.at === 'string' && !Number.isNaN(Date.parse(r.at)) &&
      typeof r.reason === 'string' && r.reason !== '' &&
      (r.previous === null || isIndex(r.previous)) &&
      typeof r.methodologyBefore === 'string' && r.methodologyBefore !== '' &&
      typeof r.methodologyAfter === 'string' && r.methodologyAfter !== '' &&
      typeof r.approvedBy === 'string' && r.approvedBy !== '';
    if (!ok) errors.push('recalc: { at: ISO datetime, reason, previous: 0..100|null, methodologyBefore, methodologyAfter, approvedBy }');
  }
  if (snapshot.incompleteCoverage !== undefined && typeof snapshot.incompleteCoverage !== 'boolean') {
    errors.push('incompleteCoverage: boolean');
  }
  // Метрика чувствительности недели (R02): max|ΔI| leave-one-out в п.п.
  // (одно десятичное, ≥ 0); поле опционально — недели до внедрения его не несут.
  if (
    snapshot.sensitivity !== undefined &&
    (typeof snapshot.sensitivity !== 'number' || !Number.isFinite(snapshot.sensitivity) ||
      snapshot.sensitivity < 0 || snapshot.sensitivity > 100)
  ) {
    errors.push('sensitivity: number 0..100 (percentage points)');
  }

  // Публичный слой Д9 (§4.3.6, R07/R12): { value: int 0..100,
  // signalingSubgroups: int 0..PRECURSOR_SUBGROUPS }. Поле опционально — недели
  // до внедрения и непересчитанная история 08-30…10-18 валидны без него; лишние
  // ключи игнорируются, битая форма — ошибка контракта. Верхняя граница — из
  // единственного источника PRECURSOR_SUBGROUPS (паритет с движком в тесте).
  if (snapshot.precursor !== undefined) {
    const p = snapshot.precursor;
    const ok =
      !!p && typeof p === 'object' && !Array.isArray(p) &&
      Number.isInteger(p.value) && p.value >= 0 && p.value <= 100 &&
      Number.isInteger(p.signalingSubgroups) && p.signalingSubgroups >= 0 &&
      p.signalingSubgroups <= PRECURSOR_SUBGROUPS;
    if (!ok) {
      errors.push(
        `precursor: { value: int 0..100, signalingSubgroups: int 0..${PRECURSOR_SUBGROUPS} }`,
      );
    }
  }

  // Рубрика «Разбор недели» (ADR 0037): выпуск как отдельная часть набора недели,
  // НЕ входит в week.js — главная его не грузит (отсутствие валидно, forward-only).
  // Полный контракт и ворота (лексика/числа/источники) — js/article.js; здесь только
  // лёгкая проверка формы, чтобы битый article.js не рисовался как валидный.
  if (snapshot.article !== undefined) {
    const a = snapshot.article;
    const ok =
      !!a && typeof a === 'object' && !Array.isArray(a) &&
      typeof a.week === 'string' && a.week !== '' &&
      typeof a.title === 'string' && a.title !== '' &&
      Array.isArray(a.blocks);
    if (!ok) errors.push('article: { week: string, title: string, blocks: array } required');
  }

  if (snapshot.dataState === 'insufficient') {
    if (snapshot.global !== null) {
      errors.push('insufficient: global must be null (publication blocked)');
    }
    if (!isUnitInterval(snapshot.q)) errors.push('insufficient: q (0..1) required');
    if (!isUnitInterval(snapshot.nullWeight)) errors.push('insufficient: nullWeight (0..1) required');
    if (snapshot.confidence !== 'none') errors.push("insufficient: confidence must be 'none'");
    if (snapshot.coverage === undefined) errors.push('insufficient: coverage required');
    if (snapshot.preview === undefined) errors.push('insufficient: preview { index, internal } required');
  }
}

exports["DATA_STATES"] = DATA_STATES;
exports["REGION_TAXONOMIES"] = REGION_TAXONOMIES;
exports["regionIdsFor"] = regionIdsFor;
exports["CURRENT_TAXONOMY"] = CURRENT_TAXONOMY;
exports["TAXONOMY_V2_FROM"] = TAXONOMY_V2_FROM;
exports["REGION_IDS"] = REGION_IDS;
exports["PRECURSOR_SUBGROUPS"] = PRECURSOR_SUBGROUPS;
exports["latest"] = latest;
exports["listWeeks"] = listWeeks;
exports["week"] = week;
exports["validate"] = validate;
return exports;
}]);
factories.push(["js/article.js", function (exports) {
const { t, date } = __ci_require("js/i18n.js");
const data = __ci_require("js/data.js");
// js/article.js — страница рубрики «Разбор недели» (articles.html, ADR 0037).
// Читает контейнер выпуска из снапшота (snapshot.article, загружен из
// data/<week>/article.js поверх week.js) и рендерит его клиентски. Чистые швы —
// validateArticle / articleRefs / лексический ворот / согласованность чисел /
// подмножество источников — без DOM, тестируются. Никакого innerHTML — только
// createElement + textContent. Числа индекса/дельты берутся из снапшота, а не из
// прозы (второго источника правды нет): ворота сверяют прозу со снапшотом.


// Лексический ворот (ADR 0006 + avoid-список PRD §11.5). Дублирует FORBIDDEN из
// article-build.js (там он CommonJS и на сборочный момент; здесь — сайтовый шов,
// тестируемый). Менять список — в обоих местах.
const FORBIDDEN = [
  'прогноз', 'вероятн', 'предсказ', 'до войны', 'на грани', 'на пороге',
  'индекс эскалации', 'обратный отсчёт', 'дельта', 'триггер', 'baseline',
  'пайплайн', 'Brier', 'z-score', 'NLP-триггер', 'шаг к',
];

// ---------- Чистые швы ----------

// articleOf(snapshot) → контейнер выпуска | null (нет/битая форма).
function articleOf(snapshot) {
  const a = snapshot && typeof snapshot === 'object' ? snapshot.article : null;
  if (!a || typeof a !== 'object' || Array.isArray(a)) return null;
  if (typeof a.title !== 'string' || a.title === '') return null;
  return a;
}

// validateArticle(article) → errors[] (контракт ADR 0037 §14). Пусто = валиден.
function validateArticle(article) {
  const errors = [];
  if (!article || typeof article !== 'object' || Array.isArray(article)) {
    return ['article is not an object'];
  }
  if (typeof article.week !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(article.week)) {
    errors.push('week: required YYYY-MM-DD');
  }
  if (typeof article.title !== 'string' || article.title === '') errors.push('title: required');
  if (typeof article.dek !== 'string') errors.push('dek: required string');
  if (typeof article.disclaimer !== 'string') errors.push('disclaimer: required string');
  if (article.featured_region !== null && typeof article.featured_region !== 'string') {
    errors.push('featured_region: string|null');
  }
  if (!Array.isArray(article.blocks)) {
    errors.push('blocks: array required');
  } else {
    article.blocks.forEach((b, i) => {
      const e = blockErrors(b, `blocks[${i}]`);
      if (e) errors.push(e);
    });
  }
  const s = article.summary;
  if (!s || typeof s !== 'object' || !Number.isInteger(s.index) || !Number.isFinite(s.delta)) {
    errors.push('summary: { index: int, delta: number } required');
  }
  if (!Array.isArray(article.regionRows) || !article.regionRows.every(
    (r) => r && Number.isInteger(r.index) && Number.isFinite(r.delta),
  )) {
    errors.push('regionRows: array of { index, delta } required');
  }
  return errors;
}

function blockErrors(b, prefix) {
  if (!b || typeof b !== 'object') return `${prefix}: object`;
  if (b.t === 'h') {
    return typeof b.text === 'string' && (b.level === 2 || b.level === 3) ? null : `${prefix}: heading`;
  }
  if (b.t === 'p') return segErrors(b.seg, prefix);
  if (b.t === 'ul') {
    if (!Array.isArray(b.items) || !b.items.every((it) => segErrors(it.seg, prefix) === null)) {
      return `${prefix}: items[].seg`;
    }
    return null;
  }
  if (b.t === 'table') {
    const hd = Array.isArray(b.head) && b.head.every((c) => segErrors(c.seg, prefix) === null);
    const rw = Array.isArray(b.rows) && b.rows.every((r) => Array.isArray(r) && r.every((c) => segErrors(c.seg, prefix) === null));
    return hd && rw ? null : `${prefix}: table`;
  }
  if (b.t === 'hr') return null;
  return `${prefix}: unknown block type ${b.t}`;
}

function segErrors(seg, prefix) {
  if (!Array.isArray(seg) || !seg.every((s) => {
    if (!s || typeof s !== 'object') return false;
    if (s.t === 'text' || s.t === 'strong') return typeof s.v === 'string';
    if (s.t === 'link') return typeof s.v === 'string' && typeof s.ref === 'string';
    return false;
  })) {
    return `${prefix}: seg`;
  }
  return null;
}

// articleRefs(article) → массив уникальных r55:id в порядке первого появления.
function articleRefs(article) {
  const refs = [];
  const seen = new Set();
  for (const b of article?.blocks ?? []) {
    for (const seg of blockSegments(b)) {
      if (seg.t === 'link' && typeof seg.ref === 'string' && !seen.has(seg.ref)) {
        seen.add(seg.ref);
        refs.push(seg.ref);
      }
    }
  }
  return refs;
}

function blockSegments(b) {
  if (!b) return [];
  if (b.t === 'p') return b.seg ?? [];
  if (b.t === 'ul') return (b.items ?? []).flatMap((it) => it.seg ?? []);
  if (b.t === 'table') {
    return [...(b.head ?? []), ...(b.rows ?? []).flat()].flatMap((c) => c.seg ?? []);
  }
  return [];
}

// Скан текста (title/dek/blocks; disclaimer — штатное «не прогноз», не сканируется).
function lexiconViolations(article) {
  const hay = [article?.title ?? '', article?.dek ?? '']
    .concat((article?.blocks ?? []).flatMap((b) => blockText(b)))
    .join('\n')
    .toLowerCase();
  return FORBIDDEN.filter((w) => hay.includes(w.toLowerCase()));
}

function blockText(b) {
  if (!b) return [];
  if (b.t === 'p') return [segsText(b.seg)];
  if (b.t === 'ul') return (b.items ?? []).map((it) => segsText(it.seg));
  if (b.t === 'h') return [b.text ?? ''];
  if (b.t === 'table') {
    return [...(b.head ?? []), ...(b.rows ?? []).flat()].map((c) => segsText(c.seg));
  }
  return [];
}
function segsText(seg) {
  return (seg ?? []).map((s) => s.v ?? '').join('');
}

// Согласованность чисел прозы со снапшотом (ADR 0037 §10б): global index/delta/покрытие
// и пары {index, delta} региональных строк обязаны совпасть со снапшотом.
function checkArticleNumbers(article, snapshot) {
  const mismatches = [];
  if (!article?.summary || !snapshot?.global) return { ok: false, mismatches: ['no summary/global'] };
  const s = article.summary;
  if (s.index !== snapshot.global.index) mismatches.push(`index ${s.index} ≠ ${snapshot.global.index}`);
  if (s.delta !== snapshot.global.delta) mismatches.push(`delta ${s.delta} ≠ ${snapshot.global.delta}`);
  if (snapshot.coverageCriteria) {
    if (s.covered !== snapshot.coverageCriteria.covered || s.total !== snapshot.coverageCriteria.total) {
      mismatches.push(`coverage ${s.covered}/${s.total} ≠ ${snapshot.coverageCriteria.covered}/${snapshot.coverageCriteria.total}`);
    }
  }
  const regs = Object.values(snapshot.regions ?? {});
  for (const r of article.regionRows ?? []) {
    const found = regs.some((x) => x.index === r.index && x.delta === r.delta);
    if (!found) mismatches.push(`region ${r.index}/${r.delta} not in snapshot`);
  }
  return { ok: mismatches.length === 0, mismatches };
}

// Подмножество источников (ADR 0037 §10в): каждый r55:id прозы обязан быть в
// снапшоте недели.
function checkArticleSources(article, snapshot) {
  const ids = new Set((snapshot?.sources ?? []).map((s) => s.id));
  const missing = articleRefs(article)
    .map((ref) => ref.replace(/^r55:/, ''))
    .filter((id) => !ids.has(id));
  return { ok: missing.length === 0, missing };
}

// auditArticle(article, snapshot) → сводка всех ворот.
function auditArticle(article, snapshot) {
  return {
    contract: validateArticle(article),
    lexicon: lexiconViolations(article),
    numbers: checkArticleNumbers(article, snapshot),
    sources: checkArticleSources(article, snapshot),
  };
}

// ---------- DOM ----------

function resolveRef(ref, snapshot) {
  const id = (ref ?? '').replace(/^r55:/, '');
  const src = (snapshot?.sources ?? []).find((s) => s.id === id);
  return src || null;
}

function sourceLabel(src) {
  if (!src) return '';
  const t = src.title;
  if (t && typeof t === 'object') return t.ru || t.en || '';
  return typeof t === 'string' ? t : '';
}

function appendSegments(parent, segs, snapshot) {
  for (const s of segs ?? []) {
    if (s.t === 'strong') {
      const el = document.createElement('strong');
      el.textContent = s.v;
      parent.appendChild(el);
    } else if (s.t === 'link') {
      const src = resolveRef(s.ref, snapshot);
      if (src && typeof src.url === 'string') {
        const a = document.createElement('a');
        a.href = src.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = s.v;
        parent.appendChild(a);
      } else {
        parent.appendChild(document.createTextNode(s.v));
      }
    } else {
      parent.appendChild(document.createTextNode(s.v));
    }
  }
}

function renderBlocks(host, article, snapshot) {
  for (const b of article.blocks) {
    if (b.t === 'h') {
      const el = document.createElement(b.level === 3 ? 'h3' : 'h2');
      el.textContent = b.text;
      host.appendChild(el);
    } else if (b.t === 'p') {
      const el = document.createElement('p');
      appendSegments(el, b.seg, snapshot);
      host.appendChild(el);
    } else if (b.t === 'ul') {
      const ul = document.createElement('ul');
      for (const it of b.items) {
        const li = document.createElement('li');
        appendSegments(li, it.seg, snapshot);
        ul.appendChild(li);
      }
      host.appendChild(ul);
    } else if (b.t === 'table') {
      const tbl = document.createElement('table');
      const thead = document.createElement('thead');
      const trh = document.createElement('tr');
      for (const c of b.head) {
        const th = document.createElement('th');
        th.scope = 'col';
        appendSegments(th, c.seg, snapshot);
        trh.appendChild(th);
      }
      thead.appendChild(trh);
      tbl.appendChild(thead);
      const tbody = document.createElement('tbody');
      for (const row of b.rows) {
        const tr = document.createElement('tr');
        for (const c of row) {
          const td = document.createElement('td');
          appendSegments(td, c.seg, snapshot);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      tbl.appendChild(tbody);
      host.appendChild(tbl);
    } else if (b.t === 'hr') {
      host.appendChild(document.createElement('hr'));
    }
  }
}

function renderSources(host, article, snapshot, lang) {
  const refs = articleRefs(article);
  if (!refs.length) return;
  const wrap = document.createElement('section');
  wrap.className = 'article-sources';
  const h = document.createElement('h2');
  h.textContent = t(lang, 'article.sources.title');
  wrap.appendChild(h);
  const ol = document.createElement('ol');
  for (const ref of refs) {
    const src = resolveRef(ref, snapshot);
    const li = document.createElement('li');
    if (src && typeof src.url === 'string') {
      const a = document.createElement('a');
      a.href = src.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = sourceLabel(src) || src.url;
      li.appendChild(a);
    } else {
      li.textContent = ref;
    }
    ol.appendChild(li);
  }
  wrap.appendChild(ol);
  host.appendChild(wrap);
}

function renderArticle(host, snapshot, article, lang) {
  host.textContent = '';
  const articleEl = document.createElement('article');
  articleEl.className = 'article';

  const title = document.createElement('h1');
  title.textContent = article.title;
  articleEl.appendChild(title);

  if (article.dek) {
    const dek = document.createElement('p');
    dek.className = 'article-dek';
    dek.textContent = article.dek;
    articleEl.appendChild(dek);
  }

  const meta = document.createElement('p');
  meta.className = 'article-meta';
  meta.textContent = `${t(lang, 'article.meta.through')} ${date(lang, snapshot.date ?? snapshot.published)} · ${t(lang, 'article.meta.methodology', { version: article.methodology ?? snapshot.methodology })}`;
  articleEl.appendChild(meta);

  if (article.disclaimer) {
    const disc = document.createElement('blockquote');
    disc.className = 'article-disclaimer';
    disc.textContent = article.disclaimer;
    articleEl.appendChild(disc);
  }

  const body = document.createElement('div');
  body.className = 'article-body';
  renderBlocks(body, article, snapshot);
  articleEl.appendChild(body);

  renderSources(articleEl, article, snapshot, lang);
  host.appendChild(articleEl);
}

function resolveArticleWeek() {
  let weeks = [];
  try {
    if (typeof window !== 'undefined' && Array.isArray(window.CI_ARTICLES)) {
      weeks = [...window.CI_ARTICLES].sort();
    }
  } catch { /* вне браузера */ }
  const q = (() => {
    try { return new URL(location.href).searchParams.get('week'); } catch { return null; }
  })();
  if (q && weeks.includes(q)) return q;
  return weeks[weeks.length - 1] ?? null;
}

function init() {
  if (typeof document === 'undefined') return;
  const lang = 'ru';
  const host = document.querySelector('[data-role="article"]');
  if (!host) return;
  const week = resolveArticleWeek();
  const snapshot = data.week(week ?? undefined);
  const article = articleOf(snapshot);
  if (!article) {
    const p = document.createElement('p');
    p.className = 'article-empty';
    p.textContent = t(lang, 'article.empty');
    host.appendChild(p);
    return;
  }
  renderArticle(host, snapshot, article, lang);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

exports["FORBIDDEN"] = FORBIDDEN;
exports["articleOf"] = articleOf;
exports["validateArticle"] = validateArticle;
exports["articleRefs"] = articleRefs;
exports["lexiconViolations"] = lexiconViolations;
exports["checkArticleNumbers"] = checkArticleNumbers;
exports["checkArticleSources"] = checkArticleSources;
exports["auditArticle"] = auditArticle;
exports["renderArticle"] = renderArticle;
exports["init"] = init;
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
