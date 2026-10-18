# 04 — Публикация: sitemap, robots, deploy и сквозные проверки

**Требования:** R14, R27, R27.1, R13, R07
**Зависит от:** 01, 02, 03
**Зона:** `sitemap.xml` · `robots.txt` · `.github/workflows/deploy.yml` · `tests/site-pages.test.js`
**Волна:** 3
**Ревью:** нет
**Модель:** обычная

## Что должно заработать

Все новые страницы и файлы данных реально попадают на cassindex.ru: `deploy.yml`
перестаёт публиковать только `index.html`/`privacy.html`, рядом появляются `robots.txt`
и `sitemap.xml`, а тест ловит случай «страницу сделали, а в выкат забыли». Поисковик
находит страницы, читатель — данные.

## Из брифа, дословно

> «SEO-страницы против War Monitor/ACLED/CrisisWatch»

> «публичный JSON/CSV + changelog»

## Разделы спецификации

Истории 13–14, 27, 36; «Решения по реализации» — про публикацию и deploy-whitelist.

## Критерии приёмки

- [ ] `sitemap.xml` — валидный XML, абсолютные URL на `https://cassindex.ru/`, перечисляет
      `/`, `how-to-read.html`, `changelog.html`, `digest.html`, `compare.html`,
      `compare-war-monitor.html`, `compare-acled.html`, `compare-crisiswatch.html`
- [ ] `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://cassindex.ru/sitemap.xml`
- [ ] `deploy.yml`: в шаге «Stage site files» копируются все корневые `*.html` (кроме
      `cassindex-index-prototype.html`), `robots.txt`, `sitemap.xml`; `rm -f
      _site/data/audit.jsonl` и `CNAME` остались; actions по-прежнему закреплены SHA
- [ ] `tests/site-pages.test.js`: каждый корневой `*.html` есть в `cp`-списке deploy и в
      `sitemap.xml`; ни одного лишнего файла в обоих списках; каждая страница ссылается
      на `index.html`; `data/public/index.json` достижим по пути из `_site`
- [ ] `node --test` зелёный целиком; `node build.js` не даёт diff; повторный
      `node calc/public-export.js --write` не меняет файлов
- [ ] В отчёте таска: что именно проверить руками после пуша (живой URL `sitemap.xml`,
      `robots.txt`, `data/public/index.json`)
