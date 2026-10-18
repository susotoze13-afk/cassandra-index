# Разведка: кодовые точки, которых касается правовая рамка

Собрано субагентом по коду на 2026-10-18. Файл читают исполнители тасков вместо
повторной разведки.

## 1. Точные имена и формы

### `calc/public-export.js`

- `LICENSE` — строки 54–60:
  ```js
  const LICENSE = {
    name: null,
    url: null,
    attribution: 'Cassandra Index — https://cassindex.ru',
    note: 'Условия переиспользования данных не заданы владельцем проекта; атрибуция обязательна.',
    placeholder: true,
  };
  ```
- Использование: `buildDataset` (168) → `license: { ...LICENSE }` (187);
  `writePublicData` (359) → `license: dataset.license` в `latest.json` (374).
- Экспорты: `PUBLIC_SCHEMA_VERSION` (47), `datasetOf` (113), `buildDataset` (168),
  `toCsv` (214), `toTrendSvg` (240), `renderChangelogPage` (307), `writePublicData` (359),
  `loadSnapshotFromDisk` (422). `LICENSE` не экспортируется — тесты видят его только
  через `buildDataset`.
- На диске: `data/public/index.json:5-11`, `data/public/latest.json:5` — `name:null, url:null,
  placeholder:true`.

### `tests/public-export.test.js`

- Единственные упоминания `license` — тест 173–183:
  - 180: `assert.equal(typeof ds.license, 'object');`
  - 181: `assert.ok(ds.license && typeof ds.license.attribution === 'string' && ds.license.attribution);`
- `name/url/placeholder` не пинятся, но приёмка R02i требует пин.

### `calc/changelog-entries.js`

- Форма записи: `{date:'YYYY-MM-DD', version:'3.0', kind, title, body, link?}`.
- `KINDS` (11): `['methodology','taxonomy','schema','field','fix','product']` — kind
  «license» нет; запись о лицензии может идти как `product`.
- `validateChangelog` (80–115): date `^\d{4}-\d{2}-\d{2}$`, version непустая, kind из
  `KINDS`, title/body непустые, link только `http(s)://`, дубль `(date,title)` — ошибка.

### `js/i18n.js`

- Плоский словарь `DICTS.ru`. `footer.geo` — 157: `'© GeoNames, CC BY 4.0'`.
  `privacy.geodata.text` — 262. Других строк про лицензию/цитирование в UI нет.
- Бандлы (`js/bundle.js:1694` и др.) содержат копии; правка i18n требует `node build.js`.

### `how-to-read.html`

- Секция `#cite-title`, строки 94–103; формулировка (96) — «Cassandra Index, неделя
  18 октября 2026 года: 64 из 100, состояние „очень опасно“, изменение за неделю +8
  пунктов, методология 3.0»; пункты 98–100; машинное чтение 102 (ссылки на
  `data/public/index.json`, `cassandra-index.csv`, `changelog.html`).

### `privacy.html`

- Абзац атрибуции — 68: `privacy.geodata.text` + ссылка `https://creativecommons.org/licenses/by/4.0/`.
- `tests/privacy.test.js:45-56` разрешает ровно один внешний URL и требует этот `href`:
  новый внешний адрес в `privacy.html` сломает тест.

## 2. Где лицензия/атрибуция уже заявлена

- `js/i18n.js:157` — `footer.geo`; `js/sections/history.js:128-133` — рендер в футере.
- `privacy.html:68` + `js/i18n.js:262` — GeoNames, CC BY 4.0.
- `data/geo/cities.js:3`, `data/geo/countries.js:3` — шапка «Источник: GeoNames …
  CC BY 4.0», вписывает `data/geo/generate.js:475`.
- `data/regions/reference.json:6-9`, `reference.js:10-13` — `sources.cities: "GeoNames"`.
- `docs/adr/0029-city-country-reference.md:25,62,95` — источник и атрибуция.
- `package/package.json:52` — `"license": "MIT"` (@opengsd/gsd-core, сторонний пакет).
- `calc/public-export.js:54-60` + `data/public/*.json` — незаполненная лицензия данных.
- `docs/superpowers/` (2 файла) лицензий не упоминает; `out-tmp-anchors/` пуст.

## 3. Трекинг

- `.gitignore` игнорирует `.env*` (кроме `.env.example`), `node_modules/`, `__pycache__/`,
  `.DS_Store`, `.autopilot/serve.*`, `calc/input/drafts/texts-*/`, `data/geo/*.zip|*.txt|
  cities15000.*|countryInfo.*`, `.vscode/`.
- `package/` — ровно один файл `package/package.json`, tracked. Сторонний GSD Core
  (MIT, node ≥24, npm-зависимости) — не лицензия проекта.
- `out-tmp-anchors/` пуст → ничего не tracked.
- Корневых `LICENSE`/`README`/`CITATION`/`NOTICE` нет.
- `deploy.yml:37-40` публикует только whitelist (`index.html`, `privacy.html`,
  `how-to-read.html`, `changelog.html`, `digest.html`, `articles.html`, `compare*.html`,
  `icon.svg`, `robots.txt`, `sitemap.xml`, `css/`, `js/`, `data/`) — новые корневые
  файлы на сайт не попадут.

## 4. GitHub Actions

- `actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0` — во всех трёх workflow.
- `actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0`; `node-version: 24`.
- `deploy.yml`: `actions/upload-pages-artifact@56afc609e74202658d3ffba0e8f6dda462b719fa # v3.0.1`,
  `actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e # v4.0.5`.
- permissions — блок верхнего уровня после `on:`; deploy — `contents: read, pages: write,
  id-token: write`; weekly — `contents: write, actions: write`.
- Сторонних action в проекте нет; SHA-пиннинг обязателен (docs/security-review.md, F-06).

## 5. Конвенции тестов

- `import { test } from 'node:test'; import assert from 'node:assert/strict';`
- Корень: `path.resolve(import.meta.dirname, '..')` (есть и вариант через `fileURLToPath`).
- Чтение: `readFileSync(join(ROOT, file), 'utf8')` + `includes`/`match`; DOM не используется.
- Существование файла: `assert.ok(existsSync(path.join(root, '…')))` —
  `tests/site-pages.test.js:145`, `tests/build.test.js:90`.
- Тесты идут против исходников `js/**`; бандлы проверяет `tests/build.test.js`.

## 6. `build.js`

- Входы только `js/`: `js/bundle.js` ← `js/app.js` + `js/share.js`; `js/bundle-privacy.js`
  ← `js/i18n.js` + `js/ui.js`; `js/bundle-articles.js` ← `js/article.js`.
- README/LICENSE/NOTICE/CITATION и правки HTML пересборки не требуют. Правка
  `js/i18n.js` — требует `node build.js`.

## 7. ADR и architecture

- Имя `NNNN-kebab-case.md`, 4 цифры; заголовок `# NNNN. Название` (или `NNNN:`).
  Максимальный — `0055`, следующий свободный — **0056**.
- Структура: `## Контекст` / `## Решение` / `## Почему` / `## Последствия`
  (в новых — жирным без `##`).
- `docs/architecture.md` — 10 разделов; границы модулей §7, конвенции §8, публичный
  слой §10.
