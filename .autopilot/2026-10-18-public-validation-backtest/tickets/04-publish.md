# 04 — Публикация: deploy, sitemap, llms, навигация, NOTICE

**Требования:** R25i, R27i, R23
**Зависит от:** 03
**Зона:** `deploy.yml` · `index.html` · `blog-build.js` · `sitemap.xml` · `llms.txt` ·
`NOTICE` · `tests/seo-pages.test.js` · `tests/lexicon.test.js` · `tests/site-pages.test.js` ·
`docs/calibration-journal.md`
**Волна:** 3
**Ревью:** нет
**Модель:** обычная

## Что должно заработать

Страница становится частью сайта: она публикуется workflow (строка `cp`), попадает в
`sitemap.xml` после `node blog-build.js --write`, в `llms.txt` появляется ссылка в
«Основные страницы», на главной — ссылка в футере. В `NOTICE` появляются три пункта про
внешние ряды (GPR, ACLED, CrisisWatch) с URL, условиями использования и тем, что именно
взято. Пины (SEO-страницы, запрещённая лексика, состав `cp`) обновлены так, что полный
`node --test` зелёный. В `docs/calibration-journal.md` добавляется строка о публичном
журнале прогнозов со ссылкой на `validation.html#ledger`.

## Из брифа, дословно

> «воспроизводимый скрипт calc/backtest.js с офлайн-фикстурами» — страница должна быть
> достижима читателю, а не только лежать в репозитории

> «сравнение уровня и направления индекса с ACLED Conflict Index, CrisisWatch и GPR» —
> чужие данные требуют атрибуции

## Разделы спецификации

Истории 2, 33, 35; «Решения по реализации» — «Публикация»; границы — §5 `interfaces.md`.

## Критерии приёмки

- [ ] `validation.html` есть в `cp`-строке `deploy.yml` (шаг «Stage site files»)
- [ ] на `index.html` в `.footer-nav` есть ссылка на `validation.html`
- [ ] после `node blog-build.js --write` в `sitemap.xml` есть
      `https://cassindex.ru/validation.html`, дублей нет
- [ ] `llms.txt` содержит ссылку на `validation.html` в разделе «Основные страницы»
- [ ] `NOTICE` содержит пункты про GPR, ACLED и CrisisWatch с URL и условиями, и не теряет
      обязательных фраз, которые пинит `tests/licensing.test.js`
- [ ] `tests/seo-pages.test.js`: `validation.html` в `PAGES`, все проверки проходят
- [ ] `tests/lexicon.test.js`: `validation.html` в `HTML_PAGES`, запрещённой лексики нет
- [ ] `tests/site-pages.test.js` зелёный (состав `cp` ↔ корневые страницы)
- [ ] `docs/calibration-journal.md` содержит строку о публичном журнале прогнозов и ссылку
- [ ] `node --test` из корня зелёный целиком
