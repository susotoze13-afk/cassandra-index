# Региональные источники недели 2026-11-01: закрытие «мало сигналов»

**Окно сбора:** `2026-10-25…2026-11-01`. Таксономия: v2 (12 регионов).
**Статус:** применено, неделя пересчитана штатным путём (`calc.js --write`,
`public-export.js --write`, `digest-export.js --write`), `node --test` — 977 pass.

## 1. Что было

Сайт помечал «мало региональных сигналов» четыре региона — у каждого было
`signals = 1` (порог пометки — `signals < 2`, ADR 0069):

| регион | сигнал до | критерий |
|---|---|---|
| Балканы (`balkans`) | 1 | D7.2 |
| Средняя Азия (`central-asia`) | 1 | D6.3 |
| Южная Азия (`south-asia`) | 1 | D6.3 (D4.3/D4.4 не считаются — ADR 0022) |
| Южный Кавказ (`south-caucasus`) | 1 | D3.2 |

## 2. Добавленные источники

Все — публикации окна, проверены запросом (HTTP 200). В top-level `sources`
и в `sources` соответствующего критерия; значения критериев и `events[]`
не менялись.

| id | критерий | издание | дата | кластер | URL |
|---|---|---|---|---|---|
| `dailystar-afghan-pak-clash` | D1.4 | The Daily Star | 2026-10-29 | A-mainstream | https://www.thedailystar.net/news/world/news/afghan-pak-border-clash-kills-one-injures-five-4310186 |
| `civilge-georgia-azerbaijan-border` | D3.4 | Civil Georgia | 2026-10-30 | A-mainstream | https://civil.ge/archives/756119 |
| `ocmedia-armenia-azerbaijan-peace` | D3.4 | OC Media | 2026-10-28 | A-mainstream | https://oc-media.org/armenian-fm-says-azerbaijani-presidential-aides-apology-demand-does-not-contribute-to-peace/ |
| `uza-ots-summit-consultations` | D3.4 | UZA.uz | 2026-10-30 | B-state-media, `state_affiliated: true` | https://uza.uz/en/posts/president-shavkat-mirziyoyev-puts-forward-key-initiatives-at-ots-summit_930582 |
| `astanatimes-ots-summit` | D3.4 | The Astana Times | 2026-10-30 | A-mainstream | https://astanatimes.com/2026/10/tokayev-highlights-trade-growth-backs-stronger-cooperation-among-turkic-states/ |
| `anewz-ots-foreign-ministers` | D3.4 | AnewZ | 2026-10-29 | A-mainstream | https://anewz.tv/region/central-asia/26078/turkic-states-meet-in-ankara-ahead-of-leaders-summit/news |
| `astanatimes-kazakhstan-drone-industry` | D6.3 | The Astana Times | 2026-10-27 | A-mainstream | https://astanatimes.com/2026/10/kazakhstan-targets-domestic-drone-industry-development-by-2029/ |

## 3. Атрибуция `regions[]`

| критерий | было | стало | основание |
|---|---|---|---|
| D1.4 | middle-east, ukraine-moldova, russia-belarus, africa | + `south-asia` | Перестрелка на афгано-пакистанской границе 28.10 (Южный Вазиристан): погибший и пятеро раненых, обстрел рынка в Ангуор-Адде — пограничный инцидент/боевые действия |
| D3.4 | middle-east, ukraine-moldova | + `south-caucasus`, `central-asia` | Южный Кавказ: межправкомиссия Грузии и Азербайджана 30.10 договорилась ускорить делимитацию границы; МИД Армении о мирном процессе с Азербайджаном. Средняя Азия: политические консультации глав МИД и лидеров ОТГ 29–30.10 (Анкарская декларация, координация подходов по региональной безопасности) |
| D9.3 | middle-east, eu-north-europe, east-asia | + `balkans` | Греческое контейнерное судно затонуло после атаки дрона у болгарского берега 30.10 — уже была запись недели, теперь региональная атрибуция Балканам (транспорт/страхование) |
| D6.3 | central-asia, east-asia, eu-north-europe, middle-east, south-asia | без изменений | Подтверждение для Средней Азии: программа развития собственного производства дронов Казахстана к 2029 (оборонно-промышленная переориентация) |

`D4.3`/`D4.4` у Южной Азии остаются атрибутированными, но агрегацией
игнорируются (ADR 0022) — в число сигналов не входят.

## 4. Измеренный эффект

- Глобальный индекс не изменился: **72 / Δ +4** (источники — подтверждение,
  `events[]`/значения не правились; добавление события в D1.4 сдвинуло бы
  глобальный индекс: 4.5/5 → 5/5).
- Сигналы после пересчёта: `balkans` 1 → **2**, `central-asia` 1 → **2**,
  `south-asia` 1 → **2**, `south-caucasus` 1 → **2** (все 12 регионов ≥ 2).
- Региональные индексы: `balkans` 72.3 (Δ +4.5, без изменений),
  `south-caucasus` 72.4 (Δ +4.7), `central-asia` 71.9 (Δ +4.8),
  `south-asia` 72.5 (Δ +5.0).
- `week.js`, `regions.js`, `sources.js`, публичный слой и дайджест пересобраны;
  запись аудита — `recalc-0133` (global diff пуст).

## 5. Границы и что осталось за рамками

- **Карточки регионов** (`data/2026-11-01/region-*.js`) не переписывались:
  это отдельный редакционный шаг (§3 `docs/regional-source-pool.md`).
  Атрибуция и источники критериев обновлены, наблюдения карточек — прежние.
- **D3.4 для Средней Азии** — трактовка на границе критерия: саммит ОТГ —
  политическая/экономическая площадка, а не посредничество в конфликте.
  Основание — регулярные политические консультации по региональной
  безопасности (UZA, Astana Times, AnewZ). Решение редактора; при несогласии
  атрибуцию снимать точечно (`regions` у D3.4).
- **Бэкфилл прошлых недель не делался** — правило forward-only не нарушено,
  правились только данные недели 2026-11-01.
- Коммит и push — за оркестратором (правило репозитория).
