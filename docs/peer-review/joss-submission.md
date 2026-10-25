# Подача в JOSS: текст и поля формы

Готовые блоки для формы `joss-submission`. Ничего не отправлено. Версия — `1.1.0`
(тег ставится перед подачей, см. `release.md`).

## 1. Поля формы

| Поле | Что вписать |
|---|---|
| Repository URL | `https://github.com/susotoze13-afk/cassandra-index` |
| Submitting author | Mikhail Zasidkevich (единственный автор) |
| Software version | `v1.1.0` (git-тег) |
| Archive DOI | `10.5281/zenodo.23458010` — концепт-DOI Zenodo (пуш тега `v1.1.0` сам пишет архив под ним; в форму можно вписать сразу, не дожидаясь индексации) |
| Paper title | `Cassandra Index: a deterministic, dependency-free pipeline for a weekly open-data conflict-risk index` |
| Paper file | `/paper.md` (в корне репозитория), библиография — `/paper.bib` |
| License | Apache License 2.0 (`LICENSE`); данные — CC BY 4.0 (`LICENSE-DATA`) |
| Language | English (статья), код и документация — смешанные RU/EN |
| Domain / field | peace and conflict studies; composite indicators; open data |

## 2. «What does this software do» — короткий ответ (EN)

> `calc/` is the computational core of a weekly index of global conflict risk built from
> open sources. One JSON file per week (46 criteria grouped into nine drivers, each
> criterion carrying source records or an explicit reason for being absent) produces a
> 0–100 ordinal score, per-region and per-country scores, a sensitivity estimate, an
> audit record, and a public data layer with JSON Schemas. Aggregation is deterministic:
> weighted drivers, a saturating curve calibrated on ten historical anchors by a
> rolling-origin split, asymmetric inertia with a structural-break override, a cap on
> indirect precursors, and a regional deviation model. No dependencies, no randomness.

## 3. Research application (обязательный вопрос JOSS)

> Researchers and journalists can recompute any published week of the index from the
> inputs in the repository, check the effect of removing a source domain or a provenance
> cluster, and compare the series with event-based or news-based measures (UCDP, ACLED,
> GPR). The pipeline is also a reference implementation of the calibration and
> sensitivity protocol described in the accompanying methodology paper: the same code
> that produces the public numbers is the one reviewers can run.

## 4. Что приложить и проверить перед отправкой

- [ ] Репозиторий публичный, issue tracker открыт без регистрации.
- [ ] `paper.md` и `paper.bib` в корне; `paper.md` не заявляет новых научных результатов
      (требование JOSS: статья о ПО, а не о результате).
- [ ] Тег `v1.1.0` поставлен, архив в Zenodo создан, DOI подставлен в `CITATION.cff`
      и в поле формы.
- [ ] `node --test` зелёный на теге (JOSS задаёт вопрос о тестах).
- [ ] В `paper.md` раскрыто использование ИИ при разработке (раздел «AI usage
      disclosure») — раздел обязателен, текст уже готов.
- [ ] Указано, что документация — `docs/api.md`, `METHODOLOGY.md`, `docs/architecture.md`.

## 5. Чего ожидать после подачи

- Рецензия идёт публично в GitHub-issue; ответы автора JOSS просит в течение 2 недель,
  изменения — за 4–6 недель.
- Проверяются: установка без зависимостей, тесты, документация, воспроизводимость
  примера из статьи, соответствие заявленному scope.
- Принятие → запись `docs/peer-review/records/<дата>-joss.json` с `kind:
  "software-review"`, `scope: "software"`, `decision: "accepted"` → пересчёт аудита.
- В основании клетки «Р» тогда будет написано: **проверено ПО, не метод**. Это
  проверяет сторож в `tests/peer-review.test.js`.

## 6. Если откажут по scope

Не переписывать статью и не спорить: перенести пакет в Journal of Open Research
Software (`venues.md`, трек B). Отказ фиксируется в `records/` с `decision: "rejected"`,
клетка остаётся минусом, содержательная работа не теряется.
