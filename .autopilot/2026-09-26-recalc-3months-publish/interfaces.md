# Интерфейсы прогона recalc-3months-publish

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `calc/input/<неделя>.json` | входные сигналы и источники недели | схему фиксируют `validate`/`validateInputSources` (calc.js) | editorial-оценки значений |
| `calc/calc.js` + `calc/engine.js` | пересчёт, классификация, рендер снапшотов | `runWeek`, `classifyPublication`, `renderGlobal` (through = дата недели) | формулы §4–§7 |
| `js/criteria.js` (новый) | статический список 45 критериев (id, драйвер, RU/EN название и описание) | один массив констант; нет функций | ничего |
| `js/sections/methodology.js` + i18n | рендер раздела «Методология» | регистрация секции в app.js (существующий шов) | DOM-строение |
| `js/data.js` | контракт снапшотов | `validate` — ворота перед записью | — |
| `docs/preproduction-decisions.md` | редакционный статус вопросов | — | — |

## Правила проекта (субагент не должен их выводить сам)

- Стек: чистый HTML/CSS/JS, **ноль зависимостей** (npm/CDN-импорт = ошибка). Node ≥ 18, ESM (кроме CommonJS `build.js`).
- Тесты: `node --test` из корня (без аргументов; `node --test tests/` падает на Windows). Один файл: `node --test tests/<имя>.test.js`.
- После ЛЮБОЙ правки `js/**` обязателен `node build.js`; бандлы `js/bundle.js`/`js/bundle-privacy.js` коммитятся. Бандл руками не править.
- Пользовательские строки — только через словарь `js/i18n.js` (data-i18n; плюрализация RU). DOM — только `createElement` + `textContent`, никакого innerHTML со строками. Цвета — только CSS-токены. a11y: видимый фокус, контраст ≥4.5:1, touch ≥44px, prefers-reduced-motion, значения не цветом.
- Лексика: запрещены слова из Avoid-списка PRD §11.5 и метафоры часов/«на пороге».
- Коммит — за исполнителем таска, в свою зону, сообщение по конвенции репозитория; **push не выполнять никому**. Формат коммитов — как в `git log`.
- Непересчитываемое: недели 02.08–23.08 в `data/` не трогать; `cassandra-index-prototype.html`, `PRD_Casandra_Index.md` — read-only. `design/cassandra-index.pen` — не сохранять.
- Отсутствующая возможность/пакет — не ставить: вернуть BLOCKED с описанием.
- Сеть небезупречна: apnews/crisisgroup/reuters — bot-защита (401/403 = «заблокирована», не битая); DNS www.bbc.com/www.dw.com может не резолвиться из среды. URL проверять `curl -sS -o /dev/null -w "%{http_code}" -L` с браузерным User-Agent; ретрай при 429/5xx. **Выдумывать URL запрещено** — каждый URL в входе должен быть curl-проверен в момент добавления.

## Формат-образец расширенного входа

`calc/input/2026-09-20.json` — эталон формата: поле `sources` (массив R55-записей:
id, title{ru,en}, domain, url, publication_date, accessed_date, source_type
(primary|secondary|OSINT), cluster_id (whitelist — `PARAMS.clusters` в
calc/params.js), state_affiliated, опционально author/notes), у критериев
`criteria[<id>]` — {value, covered, sources:[{url,date,cluster,type}]},
плюс `driverConfidence` с reason по каждому драйверу D1–D9.

## Конвейер пересчёта

`node calc/calc.js --write` (без недель — вся цепочка 08-30 → 09-20; старт от
опубликованного 08-23). Ворота перед записью: linkcheck (0 broken) →
контракт `validate` из js/data.js. После записи — append в data/audit.jsonl.
Требуются редакционные сиды `data/<неделя>/drivers.js` (ровно 3 драйвера) и
`data/<неделя>/region-*/drivers` с verbatim-записями источников из входа по id.

## Швы для тестов

- `validateInputSources` / `collectSourceItems` / `classifyPublication` из calc/calc.js;
- `engine.CRITERIA` (calc/engine.js) ↔ список в js/criteria.js — паритет 45 id;
- чистые модули сайта (i18n, risk, region, data) — по существующим образцам tests/.

## Из тасков 01–03 — расширенные входы недель

- `calc/input/2026-08-30.json` — покрытие 37/45 (R55-источники 38 url-проверок); слепые с аттестацией: D5.2, D5.3, D6.1, D8.3, D9.1, D9.5, D9.6a, D9.6b; индекс превью 51 (danger), класс full; коммит 5b0b56f.
- `calc/input/2026-09-06.json` — покрытие 40/45, 30 R55-записей; слепые: D6.2, D6.3, D9.1, D9.6b, D9.7; индекс превью 42, класс full; коммит 713e83d.
- `calc/input/2026-09-13.json` — покрытие 40/45, 31 R55-запись; слепые: D3.5, D4.2, D9.1, D9.4, D9.5; индекс превью 41 (не 46 — опечатка в коммите), класс full; коммит 2709587.
- Для всех: `accessed_date` = "2026-09-26"; часть доменов из среды curl'ится в blocked (401/403/DNS) — известная особенность сети, ворота не роняют.

## Из таска 04 — список критериев на сайте

- `js/criteria.js` — `CRITERIA_LIST: [{id, driver, name:{ru,en}, desc:{ru,en}}]`, 45 позиций, порядок = Object.keys(engine.CRITERIA); чистые данные.
- `js/sections/methodology.js` — `criteriaModel(lang) → [{driver, title, items:[{id,name,desc}]}]` (9 групп); рендер `<details>/<summary>`, классы `method-criteria-*`; ключи i18n `method.criteria.*`. Коммит c70b0e3.

## Из таска 05 — through-конвенция

- `calc/calc.js renderGlobal` — `s.through = week` для недель цепочки (writeWeek вызывается только для RECALC_WEEKS); published/methodology — по-прежнему из snap. Тест tests/through.test.js. Коммит 713e83d… нет: коммит таска — в отчёте (см. state.js); METHODOLOGY §2 переформулирован под «дата покрытия = конец окна включительно».

## Из таска 06 — предпродакшен-документ v1.2

- Структура docs/preproduction-decisions.md: шапка → «Нерешённые вопросы» (O1–O5) → «Решено (архив)» (B1–B6, P1, бывшие §2–5) → приложение со ссылками. Коммит bc739c4.
