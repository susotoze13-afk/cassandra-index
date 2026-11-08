# F1 — Ремонт ветки по находкам код-ревью

**Требования:** R01, R02, R03, R05i, R07i
**Зависит от:** —
**Зона:** `calc/input/drafts/2026-11-08/` · `calc/input/countries/2026-11-08.json` ·
`docs/source-proposals/2026-11-08-regional-coverage.md` · `tests/data.test.js` ·
`docs/calibration-journal.md` · `docs/architecture.md` ·
пересобранные `data/2026-11-08/` · `data/public/**` · `data/analysis.js` ·
`changelog.html` · `digest.html` · `validation.html` · `data/audit.jsonl`
**Волна:** 5
**Ревью:** да — ремонт ветки
**Модель:** сильная

## Что должно заработать

Ветка сборки недели `2026-11-08` проходит ревью без находок FIX NOW: источники
трассируются от фрагментов до входа и реестра, основание страновой атрибуции
говорит то же, что её источник, счётчики недель в документации актуальны,
комментарий пина не ссылается на несуществующую строку журнала. После правок
неделя пересчитана, производные пересобраны, `node --test` зелёный.

## Из брифа, дословно

> «рассчитай индекс кассандры за период с 02.11 по 08.11.2026»
> «чтобы не было слепых регионов»

## Разделы спецификации

Истории 1–3, 6–9, 11; «Решения по реализации»; `interfaces.md` §«Вход недели»,
§«Страновой оверлей», §«Производные», §«Пины».

## Критерии приёмки

- [ ] id источников во фрагментах совпадают с входом: `aa-nato-drills-lithuania`
      → `aa-nato-lithuania-drills`, `fakti-switzerland-sanctions-lift` →
      `fakti-switzerland-lifts-sanctions`; висячих ссылок нет (фрагмент ↔ вход ↔
      сиды сверены программно)
- [ ] каждый top-level источник входа прослеживается до коммиченного фрагмента
      **или** до строки реестра `docs/source-proposals/2026-11-08-regional-coverage.md`
      (формат как у `2026-11-01-regional-coverage.md`): шесть источников,
      добавленных на слиянии, с основанием атрибуции (balkaninsight-romania-moldova,
      kursiv-kazakhstan-a400m, taiwannews-himars, reportaz-armenia-border,
      asbarez-…, шестой — по фактическому диффу источников)
- [ ] `calc/input/countries/2026-11-08.json`, критерий D1.5 / UA: основание
      говорит то, что в единственном источнике (`sputnikglobe-germany-patriot-ukraine`:
      Германия отказывается от дальнейших поставок Patriot Украине); если событие
      D1.5 этим не подтверждается — атрибуция UA снимается; инвариант
      «регион ⊇ страна» держится, `tests/region-country-consistency.test.js` зелёный,
      все 12 регионов остаются `background:false` при signals ≥2
- [ ] `tests/data.test.js`: комментарий пина не ссылается на отсутствующую строку
      таблицы «Результат пересчёта» — либо в `docs/calibration-journal.md` добавлена
      строка `2026-11-08` и «11 недель 4.0», либо комментарий говорит прямо, что
      числа — прогона `node calc/calc.js 2026-11-08`
- [ ] `docs/architecture.md:133` (и соседние упоминания) — счётчики актуальны:
      15 недель данных, 11 недель цепочки
- [ ] после правок оверлея: `node calc/calc.js --write 2026-11-08`,
      `public-export --write`, `backtest --write`, `ledger --write`,
      `digest-export --write`, `blog-build --write`, `node build.js`;
      `node --test` — 0 failed
