// Статический список 45 критериев D1.1–D9.7 для раздела «Методология» (R05).
// Данные по METHODOLOGY.md §4: сжатые названия и описания наблюдаемого сигнала,
// без формул, шкал и порогов — расчётная часть методологии в публичный UI не
// выносится. Порядок позиций совпадает с engine.CRITERIA (calc/engine.js);
// рассинхрон страхует тест-паритет tests/methodology-criteria.test.js.
// Сайт не импортирует calc/ (конвенция) — список дублируется здесь намеренно.

export const CRITERIA_LIST = [
  {
    id: 'D1.1',
    driver: 'D1',
    name: { ru: 'Перемещения войск и военных колонн', en: 'Troop and military column movements' },
    desc: {
      ru: 'Наземные переброски, железнодорожные эшелоны и морские перевозки войск вблизи театра военных действий или границ.',
      en: 'Ground transfers, railway echelons and sealifts of troops near the theatre of operations or borders.',
    },
  },
  {
    id: 'D1.2',
    driver: 'D1',
    name: { ru: 'Учения необычного масштаба', en: 'Exercises of unusual scale' },
    desc: {
      ru: 'Анонсированные и фактические учения, необычные по масштабу, близости к границе или одновременности на нескольких фронтах.',
      en: 'Announced and actual exercises unusual in scale, proximity to borders, or simultaneity across several fronts.',
    },
  },
  {
    id: 'D1.3',
    driver: 'D1',
    name: { ru: 'Наращивание военной логистики', en: 'Military logistics build-up' },
    desc: {
      ru: 'Склады боеприпасов, топливные резервы, развёртывание полевых госпиталей, мостов и переправ.',
      en: 'Ammunition depots, fuel reserves, and deployment of field hospitals, bridges and crossings.',
    },
  },
  {
    id: 'D1.4',
    driver: 'D1',
    name: { ru: 'Актуальные боевые действия', en: 'Active hostilities' },
    desc: {
      ru: 'Обстрелы, авиаудары, пограничные инциденты и попытки прорыва; вторжение или открытие нового театра учитываются как наиболее тяжёлые события.',
      en: 'Shelling, airstrikes, border incidents and breakthrough attempts; an invasion or a new theatre counts among the most severe events.',
    },
  },
  {
    id: 'D1.5',
    driver: 'D1',
    name: { ru: 'Развёртывание стратегических систем', en: 'Deployment of strategic systems' },
    desc: {
      ru: 'Переброска ПВО, надводных групп, подводных сил и ядерной инфраструктуры; ядерная риторика учитывается отдельным драйвером.',
      en: 'Deployment of air defence, surface groups, submarines and nuclear infrastructure; nuclear rhetoric is tracked by a separate driver.',
    },
  },
  {
    id: 'D1.6',
    driver: 'D1',
    name: { ru: 'Разведение сил', en: 'Drawdown of forces' },
    desc: {
      ru: 'Подтверждённое разведение войск, вывод из позиций и сокращение активности.',
      en: 'Confirmed troop drawdowns, withdrawal from positions and reduced activity.',
    },
  },
  {
    id: 'D2.1',
    driver: 'D2',
    name: { ru: 'Публичные ядерные угрозы', en: 'Public nuclear threats' },
    desc: {
      ru: 'Явные заявления о применении ядерного оружия на уровне глав государств и министров обороны или иностранных дел.',
      en: 'Explicit statements about nuclear weapons use by heads of state and ministers of defence or foreign affairs.',
    },
  },
  {
    id: 'D2.2',
    driver: 'D2',
    name: { ru: 'Смена доктрины и договоров', en: 'Doctrine and treaty shifts' },
    desc: {
      ru: 'Изменения ядерной доктрины, выход из договоров по контролю над вооружениями, приостановка участия в механизмах уведомления.',
      en: 'Changes to nuclear doctrine, withdrawal from arms-control treaties, suspension of notification mechanisms.',
    },
  },
  {
    id: 'D2.3',
    driver: 'D2',
    name: { ru: 'Технические ядерные сигналы', en: 'Technical nuclear signals' },
    desc: {
      ru: 'Учения стратегических сил, подвижки ракетных комплексов, подготовка полигонов, смена режима дежурств.',
      en: 'Strategic force exercises, movements of missile systems, test-site preparations, changes in duty rotations.',
    },
  },
  {
    id: 'D2.4',
    driver: 'D2',
    name: { ru: 'Повышение готовности ядерных сил', en: 'Raised nuclear readiness' },
    desc: {
      ru: 'Публичные заявления о переводе ядерных сил на особый режим.',
      en: 'Public announcements of moving nuclear forces to a special readiness regime.',
    },
  },
  {
    id: 'D2.5',
    driver: 'D2',
    name: { ru: 'Отход от ядерной риторики', en: 'Step back from nuclear rhetoric' },
    desc: {
      ru: 'Отказ от ядерных угроз, подтверждённое возвращение сил к штатному режиму, восстановление договорных механизмов.',
      en: 'Renunciation of nuclear threats, confirmed return of forces to normal posture, restoration of treaty mechanisms.',
    },
  },
  {
    id: 'D3.1',
    driver: 'D3',
    name: { ru: 'Разрыв дипломатических отношений', en: 'Breakdown of diplomatic relations' },
    desc: {
      ru: 'Разрыв или понижение отношений, массовая высылка дипломатов, закрытие посольств.',
      en: 'Rupture or downgrading of relations, mass expulsions of diplomats, embassy closures.',
    },
  },
  {
    id: 'D3.2',
    driver: 'D3',
    name: { ru: 'Ультиматумы', en: 'Ultimatums' },
    desc: {
      ru: 'Публично заявленные несовместимые требования сторон конфликта.',
      en: 'Publicly stated incompatible demands by the parties to the conflict.',
    },
  },
  {
    id: 'D3.3',
    driver: 'D3',
    name: { ru: 'Санкции и международно-правовые решения', en: 'Sanctions and legal measures' },
    desc: {
      ru: 'Новые пакеты санкций, резолюции, признание сторон конфликта террористическими и подобные решения.',
      en: 'New sanctions packages, resolutions, designations of parties as terrorist and similar measures.',
    },
  },
  {
    id: 'D3.4',
    driver: 'D3',
    name: { ru: 'Переговоры и посредничество', en: 'Talks and mediation' },
    desc: {
      ru: 'Возобновление или запуск переговоров, посредничество третьих стран и организаций.',
      en: 'Resumption or launch of negotiations, mediation by third countries and organisations.',
    },
  },
  {
    id: 'D3.5',
    driver: 'D3',
    name: { ru: 'Гуманитарные договорённости', en: 'Humanitarian arrangements' },
    desc: {
      ru: 'Договорённости о коридорах, обменах пленными и доступе инспекций.',
      en: 'Arrangements on corridors, prisoner exchanges and inspection access.',
    },
  },
  {
    id: 'D4.1',
    driver: 'D4',
    name: { ru: 'Новые санкции и контрсанкции', en: 'New sanctions and countersanctions' },
    desc: {
      ru: 'Ограничения на экспорт энергоносителей и критичных товаров; само решение об ограничениях учитывается дипломатическим драйвером.',
      en: 'Restrictions on exports of energy and critical goods; the decision itself is tracked by the diplomatic driver.',
    },
  },
  {
    id: 'D4.2',
    driver: 'D4',
    name: { ru: 'Военные расходы', en: 'Military spending' },
    desc: {
      ru: 'Экстренные бюджетные ассигнования и переход экономики на военные рельсы по открытым бюджетам и официальным решениям.',
      en: 'Emergency budget allocations and a shift of the economy onto a war footing, per open budgets and official decisions.',
    },
  },
  {
    id: 'D4.3',
    driver: 'D4',
    name: { ru: 'Разрыв цепочек поставок', en: 'Supply chain disruption' },
    desc: {
      ru: 'Перебои с критичными ресурсами: редкие металлы, микроэлектроника, компоненты оборонной промышленности.',
      en: 'Disruptions in critical resources: rare metals, microelectronics, defence industry components.',
    },
  },
  {
    id: 'D4.4',
    driver: 'D4',
    name: { ru: 'Конфискации и блокировка торговли', en: 'Asset seizures and trade blockage' },
    desc: {
      ru: 'Конфискации и национализация активов конфликтующих сторон, блокировка торговых путей.',
      en: 'Seizures and nationalisation of the parties’ assets, blockage of trade routes.',
    },
  },
  {
    id: 'D4.5',
    driver: 'D4',
    name: { ru: 'Снятие экономических ограничений', en: 'Easing of economic restrictions' },
    desc: {
      ru: 'Отмена ограничений, восстановление торговых связей, гуманитарные экономические исключения.',
      en: 'Lifting of restrictions, restoration of trade ties, humanitarian economic exemptions.',
    },
  },
  {
    id: 'D5.1',
    driver: 'D5',
    name: { ru: 'Эскалация военной риторики', en: 'Escalation of war rhetoric' },
    desc: {
      ru: 'Переход к языку неизбежности и дегуманизации противника в официальных государственных СМИ и заявлениях.',
      en: 'A shift to the language of inevitability and dehumanisation of the enemy in official state media and statements.',
    },
  },
  {
    id: 'D5.2',
    driver: 'D5',
    name: { ru: 'Кибероперации', en: 'Cyber operations' },
    desc: {
      ru: 'Подтверждённые атаки на критическую инфраструктуру — энергетику, связь, транспорт, госорганы — с атрибуцией конфликтующей стороной.',
      en: 'Confirmed attacks on critical infrastructure — power, communications, transport, government — attributed to a party to the conflict.',
    },
  },
  {
    id: 'D5.3',
    driver: 'D5',
    name: { ru: 'Дезинформационные кампании', en: 'Disinformation campaigns' },
    desc: {
      ru: 'Координированные кампании, разворачиваемые в преддверии военных действий, по отчётам проверенных аналитических центров.',
      en: 'Coordinated campaigns rolled out ahead of hostilities, per reports of vetted analytical centres.',
    },
  },
  {
    id: 'D5.4',
    driver: 'D5',
    name: { ru: 'Снижение пропаганды', en: 'Easing of propaganda' },
    desc: {
      ru: 'Снижение уровня военной пропаганды, закрытие каналов разжигания, публичные опровержения эскалационных нарративов.',
      en: 'Lower levels of war propaganda, closure of incitement channels, public denials of escalatory narratives.',
    },
  },
  {
    id: 'D6.1',
    driver: 'D6',
    name: { ru: 'Военное положение и мобилизация', en: 'Martial law and mobilisation' },
    desc: {
      ru: 'Введение или расширение военного положения, мобилизационные законы, скрытая мобилизация по подтверждённым данным.',
      en: 'Introduction or expansion of martial law, mobilisation laws, covert mobilisation per confirmed data.',
    },
  },
  {
    id: 'D6.2',
    driver: 'D6',
    name: { ru: 'Эвакуация населения', en: 'Evacuation of population' },
    desc: {
      ru: 'Эвакуация из приграничных и прифронтовых зон, создание убежищ, учения гражданской обороны необычного масштаба.',
      en: 'Evacuation from border and frontline areas, construction of shelters, civil defence drills of unusual scale.',
    },
  },
  {
    id: 'D6.3',
    driver: 'D6',
    name: { ru: 'Военная переориентация экономики', en: 'Military reorientation of the economy' },
    desc: {
      ru: 'Военные госзаказы, ограничение выезда для военнообязанных.',
      en: 'Military state orders, exit restrictions for military-age citizens.',
    },
  },
  {
    id: 'D6.4',
    driver: 'D6',
    name: { ru: 'Отмена мобилизационных мер', en: 'Rollback of mobilisation measures' },
    desc: {
      ru: 'Отмена мобилизационных мер, возвращение гражданских режимов, возвращение эвакуированных.',
      en: 'Cancellation of mobilisation measures, return of civilian regimes and of evacuees.',
    },
  },
  {
    id: 'D7.1',
    driver: 'D7',
    name: { ru: 'Вовлечение новых государств', en: 'Entry of new states' },
    desc: {
      ru: 'Прямое военное вовлечение новых государств: ввод войск, поставки оружия с эскалационным эффектом, базирование.',
      en: 'Direct military entry of new states: troop deployments, arms deliveries with an escalatory effect, basing.',
    },
  },
  {
    id: 'D7.2',
    driver: 'D7',
    name: { ru: 'Атаки за пределами театра', en: 'Attacks beyond the theatre' },
    desc: {
      ru: 'Атаки на объекты за пределами основного театра: торговые суда, трубопроводы, дипмиссии, инфраструктура третьих стран.',
      en: 'Attacks on objects outside the main theatre: merchant ships, pipelines, diplomatic missions, third countries’ infrastructure.',
    },
  },
  {
    id: 'D7.3',
    driver: 'D7',
    name: { ru: 'Новые фронты', en: 'New fronts' },
    desc: {
      ru: 'Открытие новых фронтов или театров в соседних регионах.',
      en: 'Opening of new fronts or theatres in neighbouring regions.',
    },
  },
  {
    id: 'D7.4',
    driver: 'D7',
    name: { ru: 'Выход третьих сторон', en: 'Withdrawal of third parties' },
    desc: {
      ru: 'Выход третьих сторон из конфликта, прекращение поставок, закрытие базирования.',
      en: 'Withdrawal of third parties from the conflict, cessation of supplies, closure of basing.',
    },
  },
  {
    id: 'D8.1',
    driver: 'D8',
    name: { ru: 'Прекращение огня', en: 'Ceasefire' },
    desc: {
      ru: 'Прекращение огня или перемирие, соблюдаемое в течение всего окна без нарушений.',
      en: 'A ceasefire or truce observed throughout the window without violations.',
    },
  },
  {
    id: 'D8.2',
    driver: 'D8',
    name: { ru: 'Мирные договорённости', en: 'Peace arrangements' },
    desc: {
      ru: 'Подписанные мирные договорённости, разведение сил и тяжёлого вооружения по верифицируемым схемам.',
      en: 'Signed peace arrangements, verified drawdown schemes for forces and heavy weapons.',
    },
  },
  {
    id: 'D8.3',
    driver: 'D8',
    name: { ru: 'Наблюдение и верификация', en: 'Monitoring and verification' },
    desc: {
      ru: 'Международное наблюдение: миссии, инспекции, мониторинг соблюдения режимов.',
      en: 'International monitoring: missions, inspections, verification of compliance.',
    },
  },
  {
    id: 'D8.4',
    driver: 'D8',
    name: { ru: 'Снижение интенсивности событий', en: 'Sustained drop in event intensity' },
    desc: {
      ru: 'Устойчивое снижение числа эскалационных инцидентов на протяжении нескольких недель подряд без нарушения режимов.',
      en: 'A sustained decline in the number of escalation incidents over several consecutive weeks without regime violations.',
    },
  },
  {
    id: 'D9.1',
    driver: 'D9',
    name: { ru: 'Медицинская подготовка', en: 'Medical preparation' },
    desc: {
      ru: 'Необычные закупки препаратов для лечения ранений, запасы крови и плазмы, расширение коечного фонда, ускоренная подготовка военных медиков.',
      en: 'Unusual procurements of wound-care medicines, blood and plasma stockpiles, expansion of hospital bed capacity, accelerated training of military medics.',
    },
  },
  {
    id: 'D9.2',
    driver: 'D9',
    name: { ru: 'Финансовая изоляция', en: 'Financial isolation' },
    desc: {
      ru: 'Капитальные ограничения, отзыв активов из-за рубежа, приостановка выплат по внешнему долгу, военные займы, запреты на экспорт продовольствия и топлива.',
      en: 'Capital controls, repatriation of assets from abroad, suspension of external debt payments, war loans, bans on food and fuel exports.',
    },
  },
  {
    id: 'D9.3',
    driver: 'D9',
    name: { ru: 'Транспорт и страхование', en: 'Transport and insurance' },
    desc: {
      ru: 'Рост военных страховых надбавок, отзыв страхового покрытия, массовая отмена авиарейсов, закрытие воздушного пространства, военные приоритеты на железных дорогах, изъятие подвижного состава.',
      en: 'Rising war-risk insurance premiums, withdrawal of coverage, mass flight cancellations, airspace closures, military priorities on railways, requisition of rolling stock.',
    },
  },
  {
    id: 'D9.4',
    driver: 'D9',
    name: { ru: 'Стратегическое накопление', en: 'Strategic stockpiling' },
    desc: {
      ru: 'Аномальные закупки в госрезервы, круглосуточные режимы предприятий оборонной промышленности, мобилизационные заказы гражданским заводам, накопление топлива вблизи театра.',
      en: 'Abnormal state reserve purchases, round-the-clock shifts at defence plants, mobilisation orders to civilian factories, fuel stockpiling near the theatre.',
    },
  },
  {
    id: 'D9.5',
    driver: 'D9',
    name: { ru: 'Кадровые и мобилизационные меры', en: 'Personnel and mobilisation measures' },
    desc: {
      ru: 'Изменение возраста и категорий призыва, расширение списков военнообязанных, ограничения выезда для отдельных категорий специалистов, изменения законов о военной службе без объявления мобилизации.',
      en: 'Changes to draft age and categories, expanded military registers, exit restrictions for select categories of specialists, changes to military service laws without declared mobilisation.',
    },
  },
  {
    id: 'D9.6a',
    driver: 'D9',
    name: { ru: 'Информационный суверенитет', en: 'Information sovereignty' },
    desc: {
      ru: 'Усиление цензуры и фильтрации интернета, учения на автономность от глобальной сети, замена импортного ПО и оборудования в критичных отраслях, «подогревка» госСМИ и военно-патриотические кампании, постановка помех спутниковой навигации.',
      en: 'Tighter censorship and internet filtering, drills for autonomy from the global network, replacement of imported software and equipment in critical sectors, stoking of state media and military-patriotic campaigns, satellite navigation jamming.',
    },
  },
  {
    id: 'D9.6b',
    driver: 'D9',
    name: { ru: 'Эвакуация элит и активов', en: 'Evacuation of elites and assets' },
    desc: {
      ru: 'Вывоз семей дипломатов и чиновников, отзыв студентов и специалистов из-за рубежа, эвакуация музейных ценностей и архивов, перебазирование командных пунктов и правительственных резервов.',
      en: 'Evacuation of diplomats’ and officials’ families, recall of students and specialists from abroad, removal of museum collections and archives, relocation of command posts and government reserves.',
    },
  },
  {
    id: 'D9.7',
    driver: 'D9',
    name: { ru: 'Снятие «тихих» мер', en: 'Lifting of quiet measures' },
    desc: {
      ru: 'Отмена капитального контроля, возвращение дипломатических семей, возобновление публикации статистики, возврат предприятий к гражданским режимам, возвращение эвакуированных коллекций.',
      en: 'Lifting of capital controls, return of diplomats’ families, resumption of statistics publication, return of plants to civilian regimes, return of evacuated collections.',
    },
  },
];
