# Интерфейсы: Витрина доверия и ступени уровней (ADR 0033, фаза 1)

Скопировано из `spec.md` (раздел «Границы и швы») в начале фазы «План». Это не
проектирование — границы решены в спецификации; здесь они повторяются, чтобы первый
субагент не выдумал свои.

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `js/sections/trust.js` (новый) | представление панели доверия | `trustFacts(snapshot)` (чистый) · `render(appState)` | построение DOM, i18n-ключи, порог, форматирование чисел |
| `js/render.js` | реестр секций | `SECTIONS`, `registerSection(name,fn)`, `renderSection`, `renderAll` | порядок и обвязку вызовов |
| `js/data.js` | контракт снапшота | `validate` (в т.ч. `coverageCriteria`), `week/latest/listWeeks` | правила формы полей |
| `calc/calc.js` | запись снапшотов | `renderGlobal(week,snap,globalOut,meta)`, `loadSnapshotPart(week,file)` | сборку `meta` и расчёт чисел |
| `js/share.js` | карточку share | `cardLayout(lang,snapshot,regionId)`, `drawCard`, `CARD_W/CARD_H` | Canvas-отрисовку |

## Швы для тестов

1. `trustFacts(snapshot)` — новый чистый шов (`js/sections/trust.js`); всё поведение панели
   проверяется здесь, без DOM.
2. `validate(snapshot)` в `js/data.js` — существующий шов контракта (проверка `coverageCriteria`).
3. `loadSnapshotPart(week, file)` из `calc/calc.js` — существующий шов чтения дисковых снапшотов.
4. `cardLayout(lang, snapshot, regionId)` из `js/share.js` — существующий чистый шов
   (пин уровня и дельты недели).

Иные модули публичных подписей не получают.

## Формы, которые нельзя переименовать

- **`coverageCriteria`** — поле quality-блока снапшота: `{ covered: int ≥ 0, total: int > 0 }`,
  `covered ≤ total`. Пишется `calc/calc.js` (`meta.coverageCriteria` → `renderGlobal`),
  принимается `validateQuality` опционально (старые недели без него валидны).
- **Хост секции** — `<div class="section-body" data-section="trust"></div>` внутри
  `<section class="section trust-section" aria-labelledby="trust-title">`. Секция
  регистрируется в `js/render.js` (массив `SECTIONS` + импорт + `registerSection`).
- **Порог чувствительности на клиенте** — `TRUST_SENSITIVITY_THRESHOLD = 5`
  (комментарий «= PARAMS.sensitivityThreshold»); сайт `calc/` не читает.

## Правила проекта (субагент сам их не выведет)

- **Стек:** чистый HTML/CSS/JS, **ноль зависимостей**; ESM в `js/**`; сборщик `build.js` —
  CommonJS. Любой импорт npm/CDN — ошибка.
- **Команды:** тесты — `node --test` из корня, без аргументов; один файл —
  `node --test tests/<имя>.test.js`; форма `node --test tests/` падает на Windows/Node 24.
  **После любой правки `js/**` обязателен `node build.js`** — бандлы `js/bundle.js` /
  `js/bundle-privacy.js` коммитятся, тесты же идут против исходников. Бандл руками не править.
- **Пользовательские строки** — только через словарь `js/i18n.js` (`data-i18n`,
  `data-i18n-aria`, `data-i18n-placeholder`; плюрализация RU; даты через `Intl`). Сайт
  одноязычный RU.
- **DOM** — только `document.createElement` + `textContent`; никакого `innerHTML` со строками.
- **Цвета** — только CSS-токены из `css/styles.css`; тон статуса — `risk.tone`.
- **a11y** — видимый фокус 2px, контраст ≥4.5:1, touch ≥44px, значения не только цветом,
  `aria-live` — `[data-role="a11y-live"]`.
- **Не трогать:** `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`,
  `.autopilot/`. Снапшоты `data/**` — производные, руками не править (в этом прогоне недели
  не пересчитываются).
- **Отсутствующая возможность — не повод ставить пакет:** возвращай `BLOCKED` с описанием.
- **Коммитит только оркестратор.** Субагент-исполнитель не коммитит и не пушит; изменения
  остаются рабочим деревом.
- **Сеть недоступна** для тестов; тесты — чистые модули без DOM и без сети.

## Из таска 01 — покрытие критериев в снапшоте и контракте

- `snapshot.coverageCriteria` (quality-блок): `{ covered: int ≥ 0, total: int > 0, covered ≤ total }`.
- `js/data.js` — `validateQuality` принимает `coverageCriteria` **опционально**; любая
  битая форма (в т.ч. отсутствующее поле внутри заданного объекта) даёт ошибку
  `coverageCriteria: {...}`.
- `calc/calc.js` — `writeWeek` кладёт `meta.coverageCriteria = { covered: res.coverage.criteria,
  total: res.coverage.totalCriteria }`; `renderGlobal(week, snap, globalOut, meta)` пишет
  `s.coverageCriteria` **только когда `meta.coverageCriteria` задан**.
- Полный прогон до/после таска: 431 → **434 passed, 0 fail** (`node --test` из корня).
- Дисковые недели намеренно без поля (не пересчитывались); паритет `week.js` ↔ части не
  затронут — поле переносится verbatim.
