# 02 — Загрузчик week.js и чистый CSP

**Требования:** R01, R02, R02.1, R03, R04, R05i, R06i
**Blocked by:** 01
**Зона:** `data/latest.js`, `index.html`, `privacy.html`, `tests/`
**Волна:** 2
**Status:** ready

## Что должно заработать

Сайт грузит 11 комбинированных `data/<week>/week.js` вместо 121 отдельных частей
(document.write сохраняется — единственная механика на file://). meta-CSP обеих
страниц очищена от мёртвых разрешений cloudflareinsights — и только этим,
никакого ослабления. Консоль чистого браузера на index.html и privacy.html (http
и file://) — ноль ошибок и предупреждений.

## Из брифа, дословно

> «долгая загрузка сайта и ошибки в консоли разработчика. Исправь.»
> «CSP-нарушения, 137 запросов, Finish 7.56 s»

## Разделы спецификации

Истории 1–6, 8, 9; Решения 3, 5, 6; Швы.

## Критерии приёмки

- [ ] `data/latest.js` пишет 11 тегов `data/<week>/week.js` (по CI_WEEKS) вместо
      121; механика document.write и window.CI_WEEKS/CI_LATEST не меняются
- [ ] meta-CSP: состав обеих страниц закреплён тестом (tests/csp.test.js).
      ~~Удаление cloudflareinsights~~ ОТМЕНЕНО решением оркестратора (D01):
      js/analytics.js жив (beacon после согласия), privacy.html описывает;
      удаление сломало бы аналитику. Запрещено любое другое изменение CSP —
      никакого ослабления; новых 'unsafe-inline'/'unsafe-eval' нет
- [ ] Тест на состав meta-CSP зелёный (существующие тесты страниц/ИБ; если пина
      нет — добавить минимальный, чтение HTML с диска)
- [ ] Замер «после» теми же командами, что baseline из таска 01: requests ≤ 20,
      DOMContentLoaded ≤ 1,5 с; все шесть метрик (requests, transferred, resources,
      DOMContentLoaded, Load, Finish) записаны в `.autopilot/2026-10-13-site-load-fix--wip/after.md`
- [ ] Headless Chrome (чистый профиль): 0 ошибок и 0 предупреждений консоли на
      index.html и privacy.html, оба раза — http:// и file://
- [ ] `node --test` зелёный (360+); `node build.js` не меняет бандлы (js/ не
      тронут) либо пересобран и чист
