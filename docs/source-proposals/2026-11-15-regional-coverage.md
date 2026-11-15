# Источники недели 2026-11-15: машинный сбор, покрытие регионов и стран

**Окно недели:** `2026-11-09`…`2026-11-15` (ADR 0073). **Таксономия:** v2 (12 регионов).
**Статус входа:** черновик собран из открытых лент скриптами (`calc/input/drafts/fetch-2026-11-15.mjs`,
`add-feeds-2026-11-15.mjs`, `add-regional-2026-11-15.mjs`, `build-input-2026-11-15.mjs`),
а не редакционным сбором §10.1 — **требует редакторской проверки** до следующей недели.

## 1. Что было доступно в сети из среды сбора

| Домен | Итог | Следствие для входа |
|---|---|---|
| theguardian.com, aa.com.tr, aljazeera.com, tass.com, report.az, al-monitor.com, jpost.com, washingtonpost.com, scmp.com, dawn.com, thehindu.com, hindustantimes.com, japantimes.co.jp, news.un.org, oilprice.com, cnbc.com, africanews.com, oc-media.org, balkaninsight.com, astanatimes.com, middleeasteye.net, cisa.gov | лента отдала окно | источник недели |
| **bnn-news.com / bnn.lv** (Балтия), **nova.rs, mia.mk, kossev.info** (Балканы), **kz.kursiv.media, timesca.com, uznews.uz, akipress.com, en.kabar.kg** (Центральная Азия), **civil.ge, news.am, trend.az** (Кавказ) | лента отдала окно | добор покрытия регионов (прогон «расширить источники») |
| reuters.com | 401 (site-wide) | кластер A без Reuters |
| apnews.com, understandingwar.org (ISW), state.gov, defense.gov, iaea.org | 403 | нет OSINT-ядра (C-registries) |
| bbc.com, dw.com, kyivindependent.com, ukrinform.net, pravda.com.ua, lrt.lt, delfi.lt, err.ee, postimees.ee, lsm.lv, eurasianet.org, fergana.agency, ozodlik.org | нет DNS/соединения | Литва, Эстония и часть Центральной Азии закрыты |
| news.google.com (все поисковые ленты) | обрыв | нет подборки по запросам |

Ядро источников (`PARAMS.coreSources`) представлено **2 доменами из 9** (theguardian.com,
aa.com.tr) — предупреждение расчёта, запись не блокирует.

## 2. Состав входа

`calc/input/2026-11-15.json` собран слиянием четырёх фрагментов
(`calc/input/drafts/2026-11-15/part-d1-d5.json`, `part-d2-d3-d6.json`,
`part-d4-d7-d8.json`, `part-d9.json`): **85 источников R55** (было 80 до добора),
покрыто **26 из 46** критериев, `q = 1` (все 9 драйверов выше порога покрытия).
Ворота независимости пройдены по всем покрытым критериям.

> **Обновлено после добора.** Второй проход (`calc/input/drafts/add-blind-2026-11-15.mjs`,
> реестр — `docs/backfill/2026-11-15-sources.md`) закрыл восемь слепых критериев:
> D1.2, D1.5, D1.6, D3.2, D4.2, D4.5, D7.3, D8.1. Покрытие — **34 из 46**,
> источников **115**, неделя пересчитана: индекс **70** (Δ +1) вместо 74 (Δ +5).
> Списки ниже описывают первую версию входа; слепыми остаются D2.4, D2.5, D3.1,
> D5.4, D6.1, D6.4, D8.4, D9.1, D9.5, D9.6a, D9.6b, D9.7.

Не покрыто и почему (первая версия входа):

- **gate-failed** (событие в окне есть, но подтверждение одним кластером): `D1.2`
  (испытание YJ-12 Алжиром — A; совместные учения Азербайджана, Турции и Грузии —
  только news.am), `D1.5` (2 500 ракет и «город ракет» Ирана — A), `D3.2`
  (требование убрать базы НАТО из Балтии — bnn + nova.rs, оба A), `D6.1`
  (усиление пограничных мер в Латвии — A; ЧП в Гватемале — A), `D7.3`
  (удары Эфиопия—Эритрея — только B), `D8.1` (призывы соблюдать перемирие в Газе — B),
  `D2.4`, `D9.5`, `D9.6a`, `D9.6b`.
- **searched-none**: `D1.6`, `D3.1`, `D4.2`, `D4.5`, `D5.4`, `D6.4`, `D8.4`,
  `D9.1`, `D9.7` — в лентах окна сигналов не нашлось.
- **перенос (приём проекта):** `D2.1` (0.33) перенесён из недели 2026-11-08 вместе с
  источниками (даты 2026-11-03…11-06), раскрытие — в `driverConfidence.D2` и в тексте
  драйвера недели.
- **слабое сопоставление, отмечено:** `D1.3` = 0.33 опирается на ремонт переданных
  Украине F-16 (B) и дроновые сделки Баку—Киев (A) — это снабжение, а не склады/переправы
  из описания критерия. Вклад в драйвер мал (вес Д1 снижен уровнем `low`).

## 3. Добор источников ради покрытия регионов

Прогон «расширить источники для регионов» (после первой записи недели, когда у трёх
регионов было по одному сигналу). Добавлены 5 источников и 6 региональных атрибуций:

| id | критерий | издание | дата | регион | URL |
|---|---|---|---|---|---|
| `bnn-gulf-warship` | D7.2 | BNN (bnn-news.com) | 2026-11-13 | `baltic` | https://bnn-news.com/world/ukrainian-drone-strikes-russian-warship-in-the-gulf-of-finland-7pb9k3z |
| `bnn-rail-baltica` | D9.3 | BNN | 2026-11-13 | `baltic` | https://bnn-news.com/social/you-cannot-bear-what-you-cannot-afford-latvia-considers-freezing-rail-baltica-project-vdx9k4n |
| `bnn-latvia-grain-checks` | D3.3 / D4.1 | BNN | 2026-11-12 | `baltic` | https://bnn-news.com/world/initial-checks-of-transit-grain-shipments-in-latvia-find-no-grain-stolen-from-ukraine-2g73jb6 |
| `kursiv-sibur-sanctions` | D3.3 / D4.1 | Kursiv (kz.kursiv.media) | 2026-11-13 | `central-asia` | https://kz.kursiv.media/en/2026-11-13/engk-tank-uk-imposes-sanctions-on-russias-sibur-kazakhstan-could-feel-the-impact/ |
| `kossev-serbia-kfor` | D3.4 | Kossev (kossev.info) | 2026-11-14 | `balkans` | https://kossev.info/nacelnik-generalstaba-vojske-srbije-sa-komandantom-kfora-razgovarao-o-bezbednosnoj-situaciji-na-kosovu/ |

## 4. Региональная атрибуция (`regions[]`)

Атрибуция ставилась на критериях допустимых драйверов (Д1, Д3, Д5–Д8, Д9.3).
Слепых регионов нет, у **всех 12 регионов ≥ 2 сигналов** (планка ADR 0076):

| Регион | index | Δ | сигналов | что дало покрытие сверх первого прохода |
|---|---|---|---|---|
| middle-east | 75.1 | +7.6 | 13 | — |
| eu-north-europe | 72.9 | +4.1 | 10 | — |
| ukraine-moldova | 72.3 | +4.8 | 8 | — |
| russia-belarus | 73.8 | +4.7 | 7 | — |
| north-america | 74 | +5.1 | 5 | — |
| east-asia | 73.5 | +4.5 | 4 | — |
| africa | 75 | +5.9 | 4 | — |
| baltic | 74.6 | +5 | **3** (было 1) | D7.2 — удар дрона по кораблю в Финском заливе; D9.3 — заморозка Rail Baltica |
| balkans | 73.8 | +4.1 | **2** (было 1) | D3.4 — контакты Генштаба Сербии с KFOR по Косову |
| central-asia | 73.5 | +4.2 | **2** (было 1) | D3.3 — санкции против СИБУРа с эффектом для Казахстана |
| south-caucasus | 74.1 | +5.4 | 2 | — |
| south-asia | 74.3 | +5.9 | 2 | — |

## 5. Страновой слой (ADR 0067)

`calc/input/countries/2026-11-15.json` — **8 критериев**, страны RU и UA, по 1–3 источника
из недели; опубликовано 2 строки из 152. Предупреждения `countryAttributionWarnings`
(один кластер, ADR 0067 п. 8 — предупреждение, не ворота): `D3.3`/`D4.1` (RU, только
tass), `D3.5` (RU и UA, только aa.com.tr).
Инвариант «регион ⊇ страна» (ADR 0068) проверен: сигналы обеих стран видны их регионам.

## 6. Прогон

`node calc/prepare-week.js --write 2026-11-15` → `node calc/calc.js --write 2026-11-15`
(84 ссылки: 76 ок, 8 blocked — 403 у japantimes/dawn/scmp/news.un.org, не битые) →
`public-export.js --write` → `backtest.js --write` → `ledger.js --write` →
`digest-export.js --write` → `blog-build.js --write` → `node build.js` → `node --test`
(**980 pass / 0 fail**).

**Индекс недели: 74, состояние `very`, дельта +5** (к 69 недели 2026-11-08),
`dataState: published`, `q = 1`, покрытие критериев 26/46, Precursor Risk 78
(3 сигналящие подгруппы), чувствительность 0 п.п.
Водопад 69 → 74: Д2 +6.0, Д4 +3.3, Д6 +2.9, Д7 +2.4, Д9 +2.0, Д5 +1.8, Д8 −1.4,
Д1 −4.7, Д3 −3.5, остаток −3.8.

Блог и статья недели не пересобирались: `docs/articles/weekly/2026-11-15.md` нет —
это редакционная работа, `blog-build.js` оставил 4 выпуска.
