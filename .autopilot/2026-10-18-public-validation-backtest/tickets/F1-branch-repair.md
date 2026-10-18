# F1 — Ремонт ветки: паритет артефактов, пересборка в CI, навигация

**Требования:** R26i, R25i, R16
**Зависит от:** —
**Зона:** `tests/validation-parity.test.js` · `tests/backtest.test.js` ·
`.github/workflows/weekly-calc.yml` · `how-to-read.html` · `compare.html` ·
`compare-war-monitor.html` · `compare-acled.html` · `compare-crisiswatch.html` ·
`privacy.html` · `calc/digest-page.js` · `digest.html` · `calc/validation-page.js` ·
`validation.html`
**Волна:** 4
**Ревью:** да — ремонт ветки
**Модель:** сильная

## Что должно заработать

Три находки код-ревью ветки закрыты: (1) коммиченные `data/public/validation.json`,
`data/public/forecast-ledger.json` и `validation.html` сверяются с выводом генератора
тестом, поэтому ручная правка числа на странице роняет прогон; (2) еженедельный
workflow пересобирает бэктест и журнал, иначе с первой новой неделей страница замирает
на 2026-10-18; (3) `validation.html` есть в шапке статических страниц, а не только в
футере главной.

Не трогай `calc/public-export.js` и `changelog.html` — они в работе параллельной сессии,
их шапка остаётся как есть (это уходит в отчёт, а не в молчаливый пропуск).

## Находки ревью — дословно

1. `Spec · tests (нет) · R26i не доставлен: ни один тест не сверяет коммиченные
   data/public/validation.json, forecast-ledger.json и validation.html с выводом
   генератора — только in-memory сборки и «≥1 запись». ... Условие: тест пересобирает
   buildValidation/buildLedger/renderValidationPage и сравнивает байты с файлами на
   диске; правка коэффициента в validation.html руками делает прогон красным.`

2. `Spec · .github/workflows/weekly-calc.yml:93-99 · пайплайн пересобирает
   public-export/digest/blog, но никогда не зовёт node calc/backtest.js --write; с
   первой же новой недели страница и журнал замирают на 10-18 ... Условие: вызов
   backtest в workflow до node --test.`

3. `Spec · how-to-read/compare*/digest/changelog · R25i «ссылка в футере главной И в
   шапке статических страниц» сделан наполовину: validation.html есть только в футере
   index.html. Условие: ссылка в .site-nav каждой статической страницы.`

## Разделы спецификации

Истории 2, 33, 34; «Решения по реализации» — «Публикация», «Детерминизм».

## Критерии приёмки

- [ ] тест паритета пересобирает артефакты и сравнивает побайтно с файлами на диске:
      изменение одной цифры в `data/public/validation.json` или в `validation.html`
      делает его красным (проверь это вручную и запиши в REDPROOF)
- [ ] `.github/workflows/weekly-calc.yml` вызывает `node calc/backtest.js --write`
      до `node --test` и коммитит `data/public/validation.json`,
      `data/public/forecast-ledger.json`, `validation.html` вместе с остальными
      производными файлами
- [ ] `how-to-read.html`, `compare.html`, `compare-war-monitor.html`,
      `compare-acled.html`, `compare-crisiswatch.html`, `privacy.html` содержат ссылку
      на `validation.html` в `nav.site-nav`
- [ ] `digest.html` и `validation.html` получают ту же ссылку через свои генераторы
      (`calc/digest-page.js`, `calc/validation-page.js`), а не ручной правкой
- [ ] `node --test` из корня зелёный целиком
- [ ] `tests/seo-pages.test.js` и `tests/site-pages.test.js` остаются зелёными
