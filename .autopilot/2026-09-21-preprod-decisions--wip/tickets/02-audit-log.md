# 02 — Immutable audit log с хэш-цепочкой

**Требования:** R19 (часть — инфраструктура), R35, R36
**Blocked by:** —
**Зона:** `calc/audit.js` (новый), `tests/audit.test.js` (новый), `data/audit.jsonl` (создаётся при первой записи)
**Волна:** 1

## Что должно заработать

Новый модуль аудита: append-only журнал в JSONL, каждая запись содержит 9 обязательных
полей + криптографическую цепочку (sha256). verify() пересчитывает цепочку и находит
подделку. Типы записей: recalc, flash, methodology. Записи после создания не изменяются
и не удаляются — тест доказывает.

## Из брифа, дословно

> «Immutable log (append-only) с криптографической верификацией (hash chain)»
> «snapshot_id (оригинальный), version_before, version_after, changed_by, changed_at,
> reason, parameters_changed, recalculation_method, diff, approved_by»
> «Данные хранятся как baseline + delta; после записи записи не удаляются и не изменяются»

## Разделы спецификации

Истории 33–34; Решения §3; Швы (модуль audit).

## Детали

- Чистый ESM-модуль, ноль зависимостей (crypto — Node stdlib, sha256 хэшировать через
  `node:crypto`; модуль должен оставаться импортируемым и в браузере НЕ нужен).
- API: `append(record) -> {id, hash}` (id — монотонный `NNNN` + префикс типа, hash —
  sha256(canonical JSON записи + prev_hash)); `verify() -> {ok, brokenAt, count}`;
  `read() -> массив записей`. Путь журнала — параметр с дефолтом `data/audit.jsonl`,
  чтобы тесты писали во временный файл (os.tmpdir).
- Обязательные поля записи: snapshot_id, version_before, version_after, changed_by,
  changed_at, reason, parameters_changed, recalculation_method, diff, approved_by —
  append отклоняет запись без любого из них (ошибка с именем поля). Плюс service-поля:
  type, id, prev_hash, hash, created_by (тот же changed_by).
- diff — объект {field: {from, to}}; для flash-записей diff допустим пустым, но
  snapshot_id обязан существовать (строка).
- Конкретные записи этого прогона пишут таски 03 (recalc недель) и 07 (methodology /
  результат калибровки) — этот таск только модуль + тесты + (опционально) одна
  демо-запись methodology при первом запуске verify в тестах на временном файле.

## Критерии приёмки

- [ ] append пишет в конец файла, возвращает id и hash; повторный append — новая запись с prev_hash = hash предыдущей
- [ ] verify() ок на чистой цепочке; после ручной правки любой записи в файле verify возвращает ok:false и индекс brokenAt
- [ ] append без любого из 9 обязательных полей бросает ошибку с именем поля
- [ ] Модуль без побочных эффектов при импорте; тесты не трогают реальный data/audit.jsonl
- [ ] `node --test` зелёный
