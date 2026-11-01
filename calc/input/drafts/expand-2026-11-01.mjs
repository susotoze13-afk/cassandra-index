// Расширение источников недели 2026-11-01 под слепые критерии.
// Добавляет R55-записи и покрытие D1.2, D2.3, D5.4, D9.1, D9.4.
// Идемпотентно: повторный прогон не дублирует источники.
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'calc/input/2026-11-01.json';
const input = JSON.parse(readFileSync(path, 'utf8'));
const ACCESSED = '2026-11-01';

const newSources = [
  {
    id: 'yna-dprk-cluster-warhead',
    title: {
      ru: 'КНДР испытала кассетные боевые части, устанавливаемые на тактические баллистические ракеты',
      en: 'N. Korea tests cluster bomb mountable on tactical ballistic missiles',
    },
    domain: 'en.yna.co.kr',
    url: 'https://en.yna.co.kr/view/AEN20261101000451315',
    publication_date: '2026-11-01',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'A-mainstream',
    state_affiliated: false,
    origin: 'collected-in-week',
  },
  {
    id: 'cna-dprk-weapon-system',
    title: {
      ru: 'КНДР: оборонные НИИ провели испытание «крупной системы вооружений»',
      en: 'North Korea says defence research institutes tested major weapon system',
    },
    domain: 'channelnewsasia.com',
    url: 'https://www.channelnewsasia.com/east-asia/north-korea-pyongyang-defence-institutes-test-major-weapon-system-6510466',
    publication_date: '2026-11-01',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'A-mainstream',
    state_affiliated: false,
    origin: 'collected-in-week',
  },
  {
    id: 'tass-dprk-weapon-test',
    title: {
      ru: 'КНДР провела испытание для оценки мощности системы вооружений',
      en: 'North Korea held test to assess weapon system yield',
    },
    domain: 'tass.com',
    url: 'https://tass.com/world/2211447',
    publication_date: '2026-10-31',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'B-state-media',
    state_affiliated: true,
    origin: 'collected-in-week',
  },
  {
    id: 'defensenews-pentagon-cool-rhetoric',
    title: {
      ru: 'Пентагон призвал европейцев сбавить риторику в отношении России (источники)',
      en: 'Pentagon tells Europeans to cool their rhetoric on Russia, sources say',
    },
    domain: 'defensenews.com',
    url: 'https://www.defensenews.com/global/europe/2026/10/30/pentagon-tells-europeans-to-cool-their-rhetoric-on-russia-sources-say/',
    publication_date: '2026-10-30',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'A-mainstream',
    state_affiliated: false,
    origin: 'collected-in-week',
  },
  {
    id: 'kp-pentagon-baltic-rhetoric',
    title: {
      ru: '«Заткните рты про войну с Россией»: США потребовали от прибалтов помолчать',
      en: 'US demands Baltics tone down war rhetoric with Russia',
    },
    domain: 'kp.ru',
    url: 'https://www.kp.ru/daily/277829.5/5322467/?from=twall',
    publication_date: '2026-10-30',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'B-state-media',
    state_affiliated: true,
    origin: 'collected-in-week',
  },
  {
    id: 'twz-stargate-medevac',
    title: {
      ru: 'Украинский дрон StarGate начал эвакуировать раненых военных',
      en: "Ukraine's StarGate drone now evacuating wounded soldiers",
    },
    domain: 'twz.com',
    url: 'https://www.twz.com/air/ukraines-stargate-drone-now-evacuating-wounded-soldiers',
    publication_date: '2026-10-27',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'A-mainstream',
    state_affiliated: false,
    origin: 'collected-in-week',
  },
  {
    id: 'defenceua-heavy-medevac-drones',
    title: {
      ru: 'Украина разрабатывает тяжёлые дроны, способные эвакуировать раненых без GPS',
      en: 'Ukraine develops heavy drones that can evacuate wounded soldiers without GPS',
    },
    domain: 'en.defence-ua.com',
    url: 'https://en.defence-ua.com/news/ukraine_develops_heavy_drones_that_can_evacuate_wounded_soldiers_without_gps-20244.html',
    publication_date: '2026-10-27',
    accessed_date: ACCESSED,
    source_type: 'OSINT',
    cluster_id: 'C-registries',
    state_affiliated: false,
    origin: 'collected-in-week',
  },
  {
    id: 'united24-stargate-casevac',
    title: {
      ru: 'Украинские военные за неделю дважды вывезли раненых по воздуху дроном StarGate CASEVAC',
      en: 'Ukrainian troops evacuate two wounded soldiers by air with StarGate CASEVAC drone in one week',
    },
    domain: 'united24media.com',
    url: 'https://united24media.com/war-in-ukraine/ukrainian-troops-evacuate-two-wounded-soldiers-by-air-with-stargate-casevac-drone-in-one-week-23817',
    publication_date: '2026-10-26',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'B-state-media',
    state_affiliated: true,
    origin: 'collected-in-week',
  },
  {
    id: 'govuk-warsaw-defence-plan',
    title: {
      ru: 'Британия и Польша укрепляют оборону восточного фланга Европы: Варшавский оборонный план',
      en: "UK and Poland strengthen defences on Europe's Eastern flank: Warsaw Defence Plan",
    },
    domain: 'gov.uk',
    url: 'https://www.gov.uk/government/news/uk-and-poland-strengthen-defences-on-europes-eastern-flank--2',
    publication_date: '2026-10-27',
    accessed_date: ACCESSED,
    source_type: 'primary',
    cluster_id: 'C-registries',
    state_affiliated: true,
    origin: 'collected-in-week',
  },
  {
    id: 'defensenews-destinus-output',
    title: {
      ru: 'Месячный выпуск Destinus превысил довоенное годовое производство крылатых ракет в Европе',
      en: "Destinus' monthly output tops Europe's pre-war annual cruise missile production",
    },
    domain: 'defensenews.com',
    url: 'https://www.defensenews.com/global/europe/2026/10/29/destinus-monthly-output-tops-europes-pre-war-annual-cruise-missile-production/',
    publication_date: '2026-10-29',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'A-mainstream',
    state_affiliated: false,
    origin: 'collected-in-week',
  },
  {
    id: 'twz-amraam-production-boost',
    title: {
      ru: 'Япония начнёт сборку ракет AMRAAM на фоне резкого роста производства AIM-120 в США',
      en: 'Japan to assemble AMRAAM missiles as U.S. moves to dramatically boost AIM-120 production',
    },
    domain: 'twz.com',
    url: 'https://www.twz.com/air/japan-to-assemble-amraam-missiles-as-u-s-moves-to-dramatically-boost-aim-120-production',
    publication_date: '2026-10-29',
    accessed_date: ACCESSED,
    source_type: 'secondary',
    cluster_id: 'A-mainstream',
    state_affiliated: false,
    origin: 'collected-in-week',
  },
];

const byId = new Map(newSources.map((s) => [s.id, s]));
const knownUrls = new Set(input.sources.map((s) => s.url));
for (const s of newSources) {
  if (knownUrls.has(s.url)) continue;
  input.sources.push(s);
  knownUrls.add(s.url);
}

function ref(id, date) {
  const s = byId.get(id);
  return {
    url: s.url,
    date,
    cluster: s.cluster_id,
    type: s.source_type,
    state_affiliated: s.state_affiliated,
  };
}

input.criteria['D1.2'] = {
  value: 0.33,
  regions: ['eu-north-europe'],
  covered: true,
  sources: [ref('govuk-warsaw-defence-plan', '2026-10-27')],
};

input.criteria['D2.3'] = {
  events: [0.5],
  regions: ['east-asia'],
  covered: true,
  sources: [
    ref('yna-dprk-cluster-warhead', '2026-11-01'),
    ref('cna-dprk-weapon-system', '2026-11-01'),
    ref('tass-dprk-weapon-test', '2026-10-31'),
  ],
};

input.criteria['D5.4'] = {
  value: 0.33,
  regions: ['eu-north-europe'],
  covered: true,
  sources: [
    ref('defensenews-pentagon-cool-rhetoric', '2026-10-30'),
    ref('kp-pentagon-baltic-rhetoric', '2026-10-30'),
  ],
};

input.criteria['D9.1'] = {
  value: 0.33,
  regions: ['ukraine-moldova'],
  covered: true,
  sources: [
    ref('twz-stargate-medevac', '2026-10-27'),
    ref('defenceua-heavy-medevac-drones', '2026-10-27'),
    ref('united24-stargate-casevac', '2026-10-26'),
  ],
};

input.criteria['D9.4'] = {
  value: 0.33,
  regions: ['eu-north-europe', 'east-asia'],
  covered: true,
  sources: [
    ref('govuk-warsaw-defence-plan', '2026-10-27'),
    ref('defensenews-destinus-output', '2026-10-29'),
    ref('twz-amraam-production-boost', '2026-10-29'),
  ],
};

for (const id of ['D1.2', 'D2.3', 'D5.4', 'D9.1', 'D9.4']) delete input.blindReasons[id];

writeFileSync(path, JSON.stringify(input, null, 2) + '\n', 'utf8');
const covered = Object.values(input.criteria).filter((c) => c && c.covered === true).length;
console.log(`sources=${input.sources.length} covered=${covered}/46 blind=${Object.keys(input.blindReasons).length}`);
console.log('blind:', Object.keys(input.blindReasons).join(', '));
