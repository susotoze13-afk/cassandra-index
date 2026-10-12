# Предлагаемые региональные источники: africa и south-asia (таск 01)

Дата подготовки: 2026-10-12. Автор: агент-исполнитель таска 01.
Область: только `calc/input/2026-*.json` (7 недель цепочки 08-30 … 10-11).
Пересчёт (`--write`) НЕ выполнялся — требуется утверждение пользователя (до таска 02).

## Что сделано

Во входы 7 недель добавлены новые R55-записи (top-level `sources`) по регионам
**africa** и **south-asia** и региональная атрибуция `regions[]` на принимаемых
драйверах. Статус по каждому допустимому драйверу (Д1, Д3, Д5, Д6, Д7, Д8, D9.3):

- **Д1** — атрибуция есть: africa — D1.4; south-asia — D1.2, D1.4.
- **Д3** — атрибуция есть: africa — D3.3; south-asia — D3.3, D3.5.
- **Д5** — атрибуция есть: africa — D5.1.
- **Д6** — сигналов не нашлось: в окнах недель кандидаты по эвакуации/военному
  положению не набрали ≥2 независимых источника на покрытый D6-критерий.
- **Д7** — атрибуция есть: africa — D7.1; south-asia — D7.2 (существующая
  разметка 09-27, не менялась).
- **Д8** — сигналов не нашлось: покрытые D8-критерии недель не удалось привязать
  к africa/south-asia источниками с должной независимостью.
- **D9.3** — сигналов не нашлось: единственный кандидат (энергокризис Бангладеш/
  Пакистан 09-20) — только A-mainstream без второго кластера (B/OSINT), атрибуция
  отклонена.

Diff — только добавления: существующие значения критериев и другие регионы не
менялись; `data/`, `js/**`, движок — не тронуты.

Каждый URL проверен fetch'ем (2026-10-12); дата публикации — в окне недели W−7…W.
`cluster_id`/`cluster` — из whitelist `PARAMS.clusters` A/B/C. Классификация
доменов — каноническая (AGENTS.md): `aljazeera.com` и `aa.com.tr` — B-state-media
(`state_affiliated: true`), `theguardian.com`/`washingtonpost.com`/`thehindu.com`/
`usnews.com`/`indiatvnews.com`/`nation.com.pk`/`darfur24.com`/`tbnnews`/`adf-magazine.com`/
`martinplaut.com`/`ssbcrack.com` — A-mainstream, `criticalthreats.org` — C-registries OSINT.

Недоступные кандидаты (403/401/406 → `blocked`, не битые; в ворота не роняют, но
не считаются единственным доказательством): reuters.com (401 site-wide),
apnews.com/criticalthreats.org/thenewhumanitarian.org/blogs.shu.edu (403),
africanews.com (406). Они добавлены только как второй кластер-контроль рядом с
живым 200-источником, либо не добавлены вовсе. Битых (404/410) кандидатов нет —
ни один выживший URL не отдал 404/410.

## Таблица: регион → неделя → критерий → R55-записи → обоснование

Формат строки: `url` — дата — кластер/type — дословный заголовок (язык оригинала).

### AFRICA (7 из 7 недель покрыты)

| Неделя | Критерий | R55-запись (url / дата / кластер / type) | Цитата-обоснование (заголовок оригинала) |
|---|---|---|---|
| 08-30 | D1.4 (боевые действия) | `nation.com.pk/24-Aug-2026/sudan-s-army-aligned-force-says-49-rsf-vehicles-destroyed-70-fighters-captured` / 2026-08-24 / A-mainstream / secondary | "Sudan's army-aligned force says 49 RSF vehicles destroyed, 70 fighters captured" |
| 08-30 | D1.4 | `criticalthreats.org/briefs/congo-war-security-review/august-28-2026` / 2026-08-28 / C-registries / OSINT *(blocked 403)* | "Congo War Security Review, August 28, 2026" |
| 08-30 | D3.3 (санкции/юр. решения) | `washingtonpost.com/world/2026/08/24/sudan-military-rsf-united-nations-sanctions-conflict/…` / 2026-08-24 / A-mainstream / secondary | "US urges new UN sanctions to spur rivals in Sudan to negotiate an end to war" |
| 09-06 | D1.4 | `aljazeera.com/news/2026/9/5/five-killed-in-sudans-kordofan-in-attack-by-rebel-group` / 2026-09-05 / B-state-media / secondary | "At least five killed in Sudan's South Kordofan in attack by rebel group" |
| 09-06 | D1.4 | `darfur24.com/en/2026/09/04/rsf-tightens-restrictions-around-el-fasher/` / 2026-09-04 / A-mainstream / secondary | "RSF Tightens Restrictions Around El Fasher" |
| 09-13 | D1.4 | `washingtonpost.com/world/2026/09/07/mozambique-south-africa-attack-niassa-cabo-delgado/…` / 2026-09-07 / A-mainstream / secondary | "South African among workers abducted after attack on hunting camp in Mozambique" |
| 09-13 | D7.1 (вовлечение новых государств) | `aa.com.tr/en/africa/foreign-support-for-rsf-major-reason-sudan-war-persists-sudan-s-prosecutor-general/4050152` / 2026-09-07 / B-state-media / secondary | "Foreign support for RSF major reason Sudan war persists: Sudan's prosecutor general" |
| 09-20 | D1.4 | `aa.com.tr/en/middle-east/sudanese-army-downs-3-drones-in-eastern-sudan/4057370` / 2026-09-15 / B-state-media / secondary | "Sudanese army downs 3 drones in eastern Sudan" |
| 09-20 | D1.4 | `nigerianeyenewspaper.com/2026/09/15/boko-haram-attack-in-adamawa-leaves-four-dead-and-homes-destroyed/` / 2026-09-15 / A-mainstream / secondary | "Boko Haram Attack in Adamawa Leaves Four Dead and Homes Destroyed" |
| 09-27 | D1.4 | `aljazeera.com/news/2026/9/22/hundreds-flee-homes-in-far-north-cameroon-after-armed-group-raid-kills-15` / 2026-09-22 / B-state-media / secondary | "Hundreds flee homes in Far North Cameroon after armed group raid kills 15" |
| 09-27 | D1.4 | `adf-magazine.com/2026/09/could-rsf-defections-turn-tide-of-sudanese-civil-war/` / 2026-09-22 / A-mainstream / secondary | "Could RSF Defections Turn Tide of Sudanese Civil War?" |
| 10-04 | D1.4 | `aljazeera.com/news/2026/10/1/the-battle-for-kordofan-the-corridor-linking-sudans-east-and-west` / 2026-10-01 / B-state-media / secondary | "The battle for Kordofan: The corridor linking Sudan's east and west" |
| 10-04 | D1.4 | `martinplaut.com/2026/10/01/eepa-situation-report-horn-of-africa-no-766-1-october-2026/` / 2026-10-01 / A-mainstream / secondary | "EEPA Situation Report, Horn of Africa, No. 766, 1 October 2026" |
| 10-04 | D1.4 | `criticalthreats.org/briefs/ethiopia-war-security-review/ethiopia-war-security-review-october-2-2026` / 2026-10-02 / C-registries / OSINT *(blocked 403)* | "Ethiopia War Security Review, October 2, 2026" |
| 10-11 | D5.1 (эскалация риторики) | `aljazeera.com/news/2026/10/11/ethiopia-eritrea-ramp-up-rhetoric-are-they-inching-towards-war` / 2026-10-11 / B-state-media / secondary | "Ethiopia, Eritrea ramp up rhetoric: Are they inching towards war?" |
| 10-11 | D1.4 | `aljazeera.com/news/2026/10/5/four-african-leaders-issue-joint-declaration-as-ethiopia-war-escalates` / 2026-10-05 / B-state-media / secondary | "Four African leaders issue joint declaration as Ethiopia war escalates" |
| 10-11 | D1.4 | `africanews.com/2026/10/08/drc-new-fighting-in-masisi-as-au-delegation-rushes-to-save-ceasefire/` / 2026-10-08 / A-mainstream / secondary *(blocked 406)* | "DRC: New fighting in Masisi as AU delegation rushes to save ceasefire" |

### SOUTH-ASIA (4 из 7 недель покрыты; 09-13, 09-20, 10-11 — слепые)

| Неделя | Критерий | R55-запись (url / дата / кластер / type) | Цитата-обоснование (заголовок оригинала) |
|---|---|---|---|
| 08-30 | D3.5 (гуманитарные договорённости) | `washingtonpost.com/world/2026/08/25/bangladesh-rohingya-myanmar-refugees-coxs-bazar-anniversary/…` / 2026-08-25 / A-mainstream / secondary | "Rohingya refugees rally in Bangladesh camps to demand safe return to Myanmar" |
| 09-06 | D1.2 (учения необычного масштаба) | `indiatvnews.com/news/india/panic-in-pakistan-emergency-meeting-called-as-indian-air-force-issued-notam-for-17-day-combat-exercise-2026-09-04-1053282` / 2026-09-04 / A-mainstream / secondary | "Panic in Pakistan, emergency meeting called as Indian Air Force issues NOTAM for 17-day combat exercise" |
| 09-06 | D1.2 | `ssbcrack.com/2026/09/indian-air-force-issues-17-day-notam-for-military-exercise-pakistan-steps-up-vigilance.html` / 2026-09-04 / A-mainstream / secondary | "Indian Air Force Issues 17-Day NOTAM for Military Exercise, Pakistan Steps Up Vigilance" |
| 09-06 | D3.3 (санкции/юр. решения) | `aljazeera.com/news/2026/9/1/pakistan-wins-indus-waters-battle-at-the-hague-but-india-threat-remains` / 2026-09-01 / B-state-media / secondary | "Pakistan wins Indus waters battle at The Hague, but India threat remains" |
| 09-27 | D1.4 | `aljazeera.com/news/2026/9/24/pakistan-says-it-launches-air-strikes-on-afghanistan-after-drone-attacks` / 2026-09-24 / B-state-media / secondary | "Afghanistan vows to respond after Pakistani air strikes kill four" |
| 09-27 | D1.4 | `thehindu.com/news/international/pakistani-forces-kill-several-afghan-taliban-fighters-in-border-clash-amid-escalating-tensions/article71507478.ece` / 2026-09-25 / A-mainstream / secondary | "Pakistani forces kill several Afghan Taliban fighters in border clash amid escalating tensions" |
| 10-04 | D1.4 | `aljazeera.com/news/2026/10/1/afghanistan-says-nine-killed-in-pakistani-air-raids-on-kunar-helmand` / 2026-10-01 / B-state-media / secondary | "Pakistan launches deadly air attacks on Afghanistan" |
| 10-04 | D1.4 | `washingtonpost.com/world/2026/10/01/pakistan-afghanistan-airstrikes-militants-civilians-border-clashes/…` / 2026-10-01 / A-mainstream / secondary | "Pakistani airstrikes in Afghanistan kill 10 civilians, Kabul and UN say" |

> Примечание: атрибуция 09-27 на D3.2 и D7.2 (`middle-east`, `south-asia`) уже
> присутствовала во входе до этого таска (существующая разметка, не менялась).

## Сводка

- **Регионов с сигналами** в неделях цепочки: **6/6** (africa и south-asia
  добавлены; остальные четыре не трогались).
- **africa: 7/7 недель** с сигналами (background → false во всех 7).
- **south-asia: 4/7 недель** с сигналами (08-30, 09-06, 09-27, 10-04).
- **Слепые регион-недели** (остаются `background:true`, помечены «— фон» в выводе
  `calc.js`): south-asia 09-13, 09-20, 10-11.

### Наблюдения по слепым неделям south-asia

- **09-13 (окно 09-06…09-13):** релевантного события в окне не найдено;
  кандидаты (`indiatoday`/`swarajyamag` LoC-fire) относятся к 2025 г., отклонены.
- **09-20 (окно 09-13…09-20):** найден только энергетический кризис Бангладеш/
  Пакистана (Guardian 09-18, TBS 09-17) — обе записи A-mainstream, второй кластер
  отсутствует (B/OSINT в окне нет), поэтому атрибуция отклонена по требованию
  независимости (≥2 кластера ИЛИ ≥1 primary|OSINT).
- **10-11 (окно 10-04…10-11):** датированных живым fetch'ем региональных
  conflict-источников в окне не нашлось (`blogs.shu.edu` 10-05 — 403 blocked,
  без второго кластера; `indiatoday` «Bangladesh skips BIMSTEC» — 2026-10-12,
  вне окна).

## Ворота (проверено)

- Все 7 входов: `engine.validate` = 0 ошибок, `validateInputSources` (R55) = 0,
  `validateSourceIndependence` = 0 (применяется только к 2026-10-11).
- Каждый покрытый региональный критерий: ≥2 кластера whitelist либо ≥1 OSINT.
- `node calc/calc.js <неделя>` (без `--write`) — расчёт проходит по всем 7 неделям.
- Битых (404/410) URL нет.
