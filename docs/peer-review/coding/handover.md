# Передача второму кодировщику: чек-лист автора

Два действия вручную, всё остальное — команды.

## 1. Отправить (одно сообщение)

- `docs/peer-review/coding/coding-2026-09-20.json`
- `docs/peer-review/coding/coding-2026-10-18.json`
- `docs/peer-review/coding/coder-brief.md` (текст письма — можно прямо его)

Листы свежие, если с момента генерации (коммит 69e7f90) входы недель не правились.
Проверка свежести: `node calc/coding-reliability.js template 2026-09-20` и сравнить
`sources`/`definitions` с лежащим файлом. Если вход недели менялся — перегенерировать:

```
node calc/coding-reliability.js template 2026-09-20 --out docs/peer-review/coding/coding-2026-09-20.json
node calc/coding-reliability.js template 2026-10-18 --out docs/peer-review/coding/coding-2026-10-18.json
```

(сторож `tests/peer-review.test.js` пинит пустоту листов — значений автора в них нет.)

## 2. Когда листы вернулись (заполненные)

```
node calc/coding-reliability.js author 2026-09-20 --out author-2026-09-20.json
node calc/coding-reliability.js author 2026-10-18 --out author-2026-10-18.json
node calc/coding-reliability.js compare author-2026-09-20.json <лист кодировщика 09-20.json>
node calc/coding-reliability.js compare author-2026-10-18.json <лист кодировщика 10-18.json>
```

Отчёты — в статью (κ по покрытию, взвешенная κ по значениям, разбивка по драйверам).
Спорные клетки разбираются по README §6; если значения меняются — неделя пересчитывается
`node calc/calc.js --write <неделя>` (событие уходит в `data/audit.jsonl` само).
