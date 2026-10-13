# Baseline загрузки сайта — до правок (таск 01, прогон site-load-fix)

Дата замера: 2026-10-13. Окружение: Windows, Chrome (headless=new, чистый
временный профиль, `--disable-extensions`), Node 24, сервер `python -m http.server 8321`
из корня репо. Скрипт замера: `.autopilot/2026-10-13-site-load-fix--wip/measure.mjs`
(CDP поверх `chrome --headless=new --remote-debugging-port`, ноль зависимостей;
кэш холодный на каждый прогон).

Команды (воспроизводимы):

```
# терминал 1 (из корня репо)
python -m http.server 8321 --bind 127.0.0.1

# терминал 2
node .autopilot/2026-10-13-site-load-fix--wip/measure.mjs "http://127.0.0.1:8321/index.html" 9333
node .autopilot/2026-10-13-site-load-fix--wip/measure.mjs "file:///C:/Users/1/Projects/Cassandra Index/index.html" 9334
```

Метрики: `requests` = число `Network.requestWillBeSent`; `transferred` = сумма
`encodedDataLength` loadingFinished; `resources` = `performance.getEntriesByType('resource').length`;
DOMContentLoaded/Load = поля navigation entry; Finish = max(navigation.duration,
последний responseEnd ресурсов) — аналог Finish из DevTools. После loadEvent
выдержка 2,5 с на догрузку сети.

## index.html, http://127.0.0.1:8321 (прогон 1 — холодный сервер python)

| Метрика | Значение |
|---|---|
| requests | 127 |
| transferred | 1 088 129 B |
| resources | 126 |
| DOMContentLoaded | 1301,7 мс |
| Load | 1332 мс |
| Finish | 1342 мс |
| console errors/warnings | 0 / 0 |

## index.html, http://127.0.0.1:8321 (прогон 2 — сервер прогрет)

| Метрика | Значение |
|---|---|
| requests | 127 |
| transferred | 1 088 129 B |
| resources | 126 |
| DOMContentLoaded | 286,6 мс |
| Load | 318,1 мс |
| Finish | 326,4 мс |
| console errors/warnings | 0 / 0 |

(разброс DCL 0,3–1,3 с — инфраструктурный: холодный python http.server;
requests/transferred стабильны)

## index.html, file:// (двойной клик)

| Метрика | Значение |
|---|---|
| requests | 127 |
| transferred | 1 063 522 B |
| resources | 0* |
| DOMContentLoaded | 172,5 мс |
| Load | 202,5 мс |
| Finish | 202,5 мс |
| console errors/warnings | 0 / 0 |

\* resource-timing на file:// в Chrome не записывает subresources — счётчик 0,
requests по CDP = 127 и есть честное число.

## Замечания

- Число запросов 127 = index.html + css + 2 бандла + data/latest.js +
  121 document.write-снапшот (11 файлов × 11 недель) + reference/прочие.
  Скриншот пользователя («137 запросов», «Finish 7.56 s») — его рабочий
  профиль с расширениями; на чистом профиле своих ошибок консоли нет
  (подтверждает Диагноз §2: gtmpx/VM-eval — чужие инъекции).
- Бриф «долгая загрузка» на этой машине проявляется не временем (локальный
  диск даёт DCL ~0,2–0,3 с), а числом запросов 127 и полной блокировкой
  парсинга синхронными document.write; целевая метрика таска 02 —
  сопоставление «до/после» этим же скриптом.
