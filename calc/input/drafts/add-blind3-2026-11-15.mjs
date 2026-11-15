// Третий добор недели 2026-11-15: закрытие последних четырёх критериев.
// D5.4 — реальный сигнал деэскалации риторики; D2.4, D6.4, D8.4 — измеренные
// нули: в окне нет положительного события, критерий закрыт наблюдением, а не
// оставлен слепым. Раскрытие — в driverConfidence и docs/backfill.
// Идемпотентен: источники по URL не дублируются, покрытые критерии пропускаются.
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = 'C:/Users/1/Projects/Cassandra Index';
const INPUT = ROOT + '/calc/input/2026-11-15.json';
const ACCESSED = '2026-11-15';

// id, title.ru, title.en, domain, url, date, cluster, state_affiliated, source_type
const SOURCES = [
  // --- D2.4 (измеренный ноль): перевооружение РВСН вместо объявления готовности ---
  ['eadaily-yars-silo', 'Очередную «Ярс» загрузили в шахтную пусковую установку', 'The Yars ballistic missile was loaded into a silo launcher', 'eadaily.com', 'https://eadaily.com/en/news/2026/11/12/the-yars-ballistic-missile-was-loaded-into-a-silo-launcher', '2026-11-12', 'A-mainstream', false, 'secondary'],
  ['izvestia-yars-silo', 'Минобороны показало загрузку комплекса «Ярс» в пусковую установку', 'The Ministry of Defense of the Russian Federation showed footage of loading the Yars complex into the launcher', 'iz.ru', 'https://iz.ru/en/node/2200263', '2026-11-12', 'B-state-media', true, 'secondary'],

  // --- D5.4 снижение военной риторики ---
  ['ap-trump-war-effectively-over', 'Трамп: война с Ираном «фактически завершена» в военном смысле', "Trump after meeting with Qatari PM says he believes war with Iran is militarily 'effectively over'", 'apnews.com', 'https://apnews.com/article/iran-us-war-trump-qatar-c38770b168faf5e094e96c1e1e212cff', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['aa-trump-no-resume-war', 'Трамп не хочет возобновлять войну с Ираном «пока что»', "Trump does not want to resume war with Iran 'for now': Report", 'aa.com.tr', 'https://www.aa.com.tr/en/us-israel-iran-war/trump-does-not-want-to-resume-war-with-iran-for-now-report/4124824', '2026-11-13', 'B-state-media', true, 'secondary'],

  // --- D6.4 (измеренный ноль): мобилизационные меры продолжаются, отмены нет ---
  ['eutoday-moscow-conscription-raids', 'Рейды по призыву в Москве обнажают кадровую проблему Кремля', "Moscow's Conscription Raids Expose the Kremlin's Growing Manpower Dilemma", 'eutoday.net', 'https://eutoday.net/russia-conscription-raids-moscow-mobilisation-crisis/', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['izvestia-mobilization-torture', 'Мирошник рассказал об отправке противников мобилизации в Украине в пыточные камеры', 'Miroshnik told about sending opponents of mobilization in Ukraine to torture chambers', 'iz.ru', 'https://iz.ru/en/node/2201811', '2026-11-14', 'B-state-media', true, 'secondary'],
];

const byId = Object.fromEntries(SOURCES.map((s) => [s[0], s]));
const critSrc = (ids) => ids.map((id) => {
  const s = byId[id];
  if (!s) throw new Error('нет источника ' + id);
  return { url: s[4], date: s[5], cluster: s[6], type: s[8], state_affiliated: s[7] };
});

const input = JSON.parse(readFileSync(INPUT, 'utf8'));
const byUrl = new Map(input.sources.map((s) => [s.url, s]));
const bySourceId = new Map(input.sources.map((s) => [s.id, s]));

const refById = (id) => {
  const s = byId[id] || bySourceId.get(id);
  if (!s) throw new Error('нет источника ' + id);
  const url = s[4] || s.url;
  const date = s[5] || s.publication_date;
  const cluster = s[6] || s.cluster_id;
  const state = s[7] !== undefined ? s[7] : s.state_affiliated;
  const type = s[8] || s.source_type;
  return { url, date, cluster, type, state_affiliated: state };
};

const CRITERIA = {
  // Измеренный ноль: в окне — перевооружение РВСН, а не объявление особого
  // режима готовности; положительного сигнала нет (D2.3 — отдельный критерий).
  'D2.4': {
    value: 0,
    covered: true,
    sources: [refById('eadaily-yars-silo'), refById('izvestia-yars-silo')],
  },
  // Реальный сигнал: официальная военная риторика снижается (A + B).
  'D5.4': {
    value: 0.33,
    covered: true,
    regions: ['north-america', 'middle-east'],
    sources: [refById('ap-trump-war-effectively-over'), refById('aa-trump-no-resume-war')],
  },
  // Измеренный ноль: рейды с повестками и принудительная мобилизация
  // продолжаются, отмены действующих мер в окне нет.
  'D6.4': {
    value: 0,
    covered: true,
    sources: [refById('eutoday-moscow-conscription-raids'), refById('izvestia-mobilization-torture')],
  },
  // Измеренный ноль по независимому счётчику инцидентов Д1–Д5:
  // 25 → 25 → 25 → 30 (10-25…11-15), снижения нет; режимы нарушались.
  'D8.4': {
    value: 0,
    covered: true,
    sources: [refById('guardian-nasser-hospital'), refById('aa-houthi-taiz')],
  },
};

const CONF = {
  D2: {
    level: 'high',
    reason: 'Покрыто 5 из 5: смена доктрины (D2.2 = 1) — призыв высшего клерикального органа Ирана пересмотреть доктрину; технические сигналы (D2.3 = 0.2) — тревога МАГАТЭ по неинспектированному объекту и загрузка «Ярса» в шахтную ПУ; публичные угрозы (D2.1 = 0.33) перенесены из прошлой недели; отход от риторики (D2.5 = 0.33) — анонс ядерных переговоров Трампа, Путина и Си. Публичного повышения готовности ядерных сил (D2.4) нет: в окне — перевооружение РВСН и заявления Минобороны о боевых возможностях, это технический сигнал D2.3, поэтому D2.4 измерен нулём.',
  },
  D5: {
    level: 'high',
    reason: 'Покрыто 4 из 4: риторика на верхней оценке (D5.1 = 1.0) — угрозы базам США в Европе, угрозы убить Трампа, угроза Армении; кибероперации (D5.2 = 0.4) — взлом во Франции, сеть из семи человек, бюллетень CISA; дезинформация (D5.3 = 0.33) — взаимно исключающие версии удара по радиолокатору в Бахрейне; снижение военной риторики (D5.4 = 0.33) — Трамп объявил войну «фактически завершённой» и не хочет возобновлять удары «пока что», Вашингтон переходит к экономическому давлению (A + B).',
  },
  D6: {
    level: 'medium',
    reason: 'Покрыто 4 из 4: военная переориентация экономики (D6.3 = 1) — бюджет Ирана без нефтяных доходов и нормирование бензина; эвакуация населения (D6.2 = 0.67) — 64 тыс. из Нигерии в Нигер, 340 тыс. перемещённых в Йемене, зимняя помощь Газе; режим ЧП (D6.1 = 0.33) — Гватемала ввела 30-дневное ЧП в Сакапе и Исабале. Отмены мобилизационных мер (D6.4 = 0) нет: в окне рейды с военными повестками в Москве и сообщения о принудительной мобилизации в Украине — меры продолжаются, а не отменяются.',
  },
  D8: {
    level: 'medium',
    reason: 'Покрыто 4 из 4: прекращение огня (D8.1 = 1.0) — перемирие Таиланд—Камбоджа соблюдается; мирные договорённости (D8.2 = 0.33) — объявленный саммит и посредничество Кушнера без подписанного документа; наблюдение и верификация (D8.3 = 0.33) — Совет Безопасности и призывы ООН. Снижения интенсивности (D8.4 = 0) нет: независимый счётчик уникальных инцидентов Д1–Д5 даёт 25 → 25 → 25 → 30 за 10-25…11-15, а режимы нарушались — удар по больнице «Насер» в Газе и атаки хуситов в Таизе.',
  },
};

if (byUrl.has('https://iz.ru/en/node/2200263')) {
  // уже добавлено — ничего не меняем, скрипт идемпотентен
}

let addedSources = 0;
for (const s of SOURCES) {
  const [id, ru, en, domain, url, date, cluster, state, type] = s;
  if (byUrl.has(url)) continue;
  if (input.sources.some((x) => x.id === id)) throw new Error('дубль id источника: ' + id);
  input.sources.push({
    id,
    title: { ru, en },
    domain,
    url,
    publication_date: date,
    accessed_date: ACCESSED,
    source_type: type,
    cluster_id: cluster,
    state_affiliated: state,
    origin: 'collected-in-week',
  });
  byUrl.set(url, s);
  addedSources++;
}

const before = Object.entries(input.criteria).filter(([, c]) => c && c.covered).length;
let addedCriteria = 0;
for (const [id, entry] of Object.entries(CRITERIA)) {
  if (input.criteria[id] && input.criteria[id].covered === true) continue;
  input.criteria[id] = entry;
  delete input.blindReasons[id];
  addedCriteria++;
}
for (const [k, v] of Object.entries(CONF)) input.driverConfidence[k] = v;

const after = Object.entries(input.criteria).filter(([, c]) => c && c.covered).length;
writeFileSync(INPUT, JSON.stringify(input, null, 2) + '\n', 'utf8');
console.log(`источников: +${addedSources} (всего ${input.sources.length})`);
console.log(`критериев покрыто: ${before} → ${after}; blindReasons: ${Object.keys(input.blindReasons).length}`);
