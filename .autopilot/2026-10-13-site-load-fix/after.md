# Замер «после» — загрузчик week.js (таск 02, прогон site-load-fix)

Дата замера: 2026-10-13. Окружение: Windows, Chrome (headless=new, чистый
временный профиль, `--disable-extensions`), Node 24, сервер `python -m http.server 8321
--bind 127.0.0.1` из корня репо. Скрипт: `.autopilot/2026-10-13-site-load-fix--wip/measure.mjs`
(CDP, ноль зависимостей; кэш холодный на каждый прогон). Сервер остановлен по pid
сразу после замера.

Команды (воспроизводимы):

```
# терминал 1 (из корня репо)
python -m http.server 8321 --bind 127.0.0.1

# терминал 2
node .autopilot/2026-10-13-site-load-fix--wip/measure.mjs "http://127.0.0.1:8321/index.html" 9333
node .autopilot/2026-10-13-site-load-fix--wip/measure.mjs "http://127.0.0.1:8321/privacy.html" 9335
node .autopilot/2026-10-13-site-load-fix--wip/measure.mjs "file:///C:/Users/1/Projects/Cassandra Index/index.html" 9334
node .autopilot/2026-10-13-site-load-fix--wip/measure.mjs "file:///C:/Users/1/Projects/Cassandra Index/privacy.html" 9336
```

Метрики — как в baseline.md (requests по CDP; transferred = сумма encodedDataLength;
resources = performance resource-timing; Finish = max(navDuration, последний responseEnd)).

## index.html, http://127.0.0.1:8321 (после; baseline: 127 запросов, DCL 286,6 мс)

| Метрика | До (baseline прогон 2) | После |
|---|---|---|
| requests | 127 | **17** |
| transferred | 1 088 129 B | 1 046 384 B |
| resources | 126 | 16 |
| DOMContentLoaded | 286,6 мс | **141,1 мс** |
| Load | 318,1 мс | 164,7 мс |
| Finish | 326,4 мс | 178,9 мс |
| console errors/warnings | 0 / 0 | **0 / 0** |

17 = index.html + styles.css + icon.svg + data/latest.js + 11 × week.js +
data/regions/reference.js + js/bundle.js. Критерии: requests ≤ 20 ✔, DCL ≤ 1,5 с ✔.

## index.html, file:// (после; baseline: 127 запросов, DCL 172,5 мс)

| Метрика | До | После |
|---|---|---|
| requests | 127 | **17** |
| transferred | 1 063 522 B | 1 043 086 B |
| resources | 0* | 0* |
| DOMContentLoaded | 172,5 мс | 82,0 мс |
| Load | 202,5 мс | 105,0 мс |
| Finish | 202,5 мс | 105,0 мс |
| console errors/warnings | 0 / 0 | **0 / 0** |

\* resource-timing на file:// в Chrome не записывает subresources — счётчик 0,
requests по CDP = 17 и есть честное число. Секции отрендерены (проверено
`--dump-dom`: regions/trend/drivers/methodology/feedback наполнены, hero показывает
индекс 56 из 10-11).

## privacy.html, http://127.0.0.1:8321

| Метрика | После |
|---|---|
| requests | 4 |
| transferred | 105 054 B |
| resources | 3 |
| DOMContentLoaded | 37,8 мс |
| Load | 38,0 мс |
| Finish | 41,8 мс |
| console errors/warnings | 0 / 0 |

## privacy.html, file://

| Метрика | После |
|---|---|
| requests | 4 |
| transferred | 104 291 B |
| resources | 0* |
| DOMContentLoaded | 14,2 мс |
| Load | 14,8 мс |
| Finish | 14,8 мс |
| console errors/warnings | 0 / 0 |

\* см. примечание выше.

## Итог

- requests index: 127 → 17 (−110: 121 document.write-часть → 11 week.js);
  DCL ≤ 1,5 с выполнено на порядок (≤ 0,15 с). Все шесть метрик зафиксированы
  для обеих страниц, оба протокола.
- Консоль чистого профиля: 0 ошибок / 0 предупреждений на всех четырёх
  комбинациях (http/file × index/privacy). Ошибки из скриншота пользователя
  (VM-eval, gtmpx, content.js) — чужие инъекции браузерного профиля
  (расширения/адваре), сайтом не исправляются (Диагноз §2 спецификации).
- failedRequests: пусто на всех прогонах.

## Отступление от тикета: meta-CSP не менял (блокер, не молчаливое ослушание)

Диагноз спецификации («аналитики Cloudflare в проекте нет — разрешение мёртвое»)
не подтверждён кодом: `js/analytics.js` жив — `CF_BEACON_TOKEN` задан,
`app.js:100` зовёт `analytics.maybeInit()`, `hero.js:422` показывает баннер
согласия, beacon `static.cloudflareinsights.com/beacon.min.js` грузится
после согласия, отчёты уходят на `cloudflareinsights.com` (privacy.html это
публично описывает). Удаление разрешений из CSP сломало бы аналитику для
давших согласие и дало бы им CSP-ошибки в консоли — противоположность целям
R02/R02.1. Зона таска (`js/` не трогаем) не позволяет снять фичу вместе с
разрешением. Решение отложено за оркестратором: либо разрешение обосновано
и остаётся (состав закреплён тестом tests/csp.test.js), либо аналитика
выводится из проекта отдельным таском (js/** + privacy.html + токен), и тогда
CSP чистится вслед за фичей. privacy.html разрешений cloudflareinsights не
несёт — чист (зафиксировано тем же тестом).
