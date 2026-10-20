# Notes — разведка репозитория (спека)

## Что уже есть и что переиспользуем

- `calc/linkcheck.js` — чистый: `classify(status)` → ok|blocked|broken; `checkUrl(url, {fetchImpl, retries, timeoutMs})`
  (ретраи 429/406/5xx, 10 c, браузерные заголовки); `checkSources(items: {url, where})` → {checked, ok, broken, blocked};
  последовательный обход (не долбить сайты). Это ворото R08i — URL кандидата обязан пройти checkUrl.
- `calc/check-sources.js` — образец CLI: argv-разбор, `invokedDirectly`, `process.exitCode`, отчёт построчно,
  exit 1 при битых. Логика в чистых экспортах, CLI — тонкая обвязка.
- `calc/classify.js` — `normalizeText`, `quoteFound(text, corpus)` — дословность цитаты (правило 9 Jev);
  `validateDraft`, `toInput`. Цитата кандидата → `quoteFound` против корпуса `texts-<week>/<source_id>.txt`
  (корпуса у 10-18 на диске нет — в .gitignore; цитата отмечается «не проверена (нет корпуса)», не ворото).
- `calc/params.js` — `PARAMS.clusters = ['A-mainstream','B-state-media','C-registries','D-satellite-osint','E-field-osint','F-financial']`;
  window 10-11…10-18 = published−7…published.
- R55-схема источника (по `calc/input/2026-10-18.json`, 71 запись): обязательные id, title{ru,en}, domain, url,
  publication_date, accessed_date, source_type(primary|secondary|OSINT), cluster_id, state_affiliated;
  опциональные author, archive_url, archive_date, confidence, notes, quotes[{criterion,text}].
- `calc/validateInputSources` (calc.js) — строгая схема R55, cluster whitelist; схема источников дублируется в
  `tests/sources-schema.test.js` (там же образцы моков).
- Драйверы/критерии: `engine.CRITERIA` — 46 id (D1.1…D9.6b); критерии недели 10-18 с `criteria[id] = null` —
  «слепые» (12 шт.). R03 — только они: D1.3, D2.1, D3.1, D3.4, D4.1, D5.1, D5.4, D6.1, D6.4, D7.1, D7.5, D9.5.
  ADR 0022-eligible драйверы для `regions[]`: D1/D3/D5/D6/D7/D8/D9.3 (`engine.regionalSignals` → `eligible()`);
  региональную атрибуцию несут только критерии этих драйверов.
- Таксономия v2 (12 id): russia-belarus, ukraine-moldova, baltic, balkans, eu-north-europe, south-caucasus,
  central-asia, east-asia, middle-east, north-america, south-asia, africa (`js/region.js` REGIONS_V2;
  whitelist для `regions[]`).
- `docs/regional-source-pool.md` (untracked, чужая сессия — только читать): готовые RSS-URL по всем 12 регионам
  (Interfax/RBC/Медуза, УНИАН/Лента.ру/Forbes Ukraine, Delfi/LRT/ERR, N1/Balkan Insight/Reuters SEE,
  Notes from Poland/GeoPolitics, Civil.ge/Kavkaz Realia, TimesCA/カリдония?, Anadolu/JPost/Al Jazeera/Iron Diplomat,
  CBC/Globe & Mail/FP, The Hindu/ET/Dawn, Sahel Reporters/Mo/BeninReview + пресс-службы). Использовать как
  seed-пул лент для процедуры и как кандидатов для недели.
- `docs/governance.md` §10.1 (~строки 322–361): «Отбор источников остаётся ручным… LLM не ищет и не добавляет
  источники самостоятельно» — целевой текст корректировки. Список разделов — §9.3 (строка 195).
- `docs/adr/0026-regional-attribution-over-existing-criteria.md`: кандидат обязан (1) покрывать критерий
  недели, (2) window W−7…W, (3) ≥2 кластера на критерий, (4) цитата, (5) одобрение редактора до `--write`.
- ADR-формат: `# NNNN. Title`, секции Контекст/Решение/Почему/Последствия; следующий номер **0065**.
- Нумерация ADR сейчас 0001–0064 (`docs/adr/`).

## Конвенции CLI/тестов

- Zero deps, ESM; CLI — сухой прогон по умолчанию, запись только с `--write`; `process.exitCode`;
  guard `invokedDirectly`; логика — чистые экспорты; argv — простой разбор (пример check-sources.js).
- Тесты: `node --test` из корня; мок сети — `fetchImpl` (tests/linkcheck.test.js); паритет чисел/списков — пины
  в tests/*.test.js; после правок `js/**` обязателен `node build.js` (этот прогон в js/ не лезет, если не
  трогаем сайт — тогда и сборка не нужна).
- Коммиты: только оркестратор, DCO `git commit -s`, явные пути; рабочее дерево засорено чужими файлами
  (см. carried.md) — их не трогать.

## Риски/открытые

- Сеть из среды проверки «небезупречна» (DNS/Cloudflare 403/401 → blocked, не битые) — предупреждать в отчёте.
- RSS-фиды могут быть недоступны/заблокированы — фолбэк: прямой fetch HTML-страницы публикации (тот же checkUrl).
- Прямой пересчёт 10-18 в этом прогоне запрещён (ASSUMPTION 2): инструмент валидирует и печатает, `--write` в
  цепочку calc.js не подключаем.
