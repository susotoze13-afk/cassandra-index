## Правовая рамка, цитирование и границы репозитория

Лицензии разделены по типу материала — одной «лицензии репозитория» здесь нет:

| Что | Файл | Условия |
|---|---|---|
| Код (`calc/`, `js/`, `tools/`, `build.js`, `.github/`, HTML-разметка, CSS) | `LICENSE` | Apache License 2.0 |
| Данные (`data/**`: снапшоты недель, публичный слой, таксономия, справочники) | `LICENSE-DATA` | CC BY 4.0 |
| Документы и тексты (`docs/**`, корневые `*.md`, текст статических страниц) | `LICENSE-DOCS` | CC BY 4.0 |
| Название «Cassandra Index», логотип `icon.svg`, домен `cassindex.ru` | `TRADEMARK.md` | лицензиями не передаются |
| Чужие материалы: GeoNames (CC BY 4.0), тексты издателей и цитаты, Cloudflare Web Analytics, FormSubmit, сторонний `package/package.json` (GSD Core, MIT) | `NOTICE` | свои условия, не лицензии проекта |

- **Атрибуция данных и текстов** обязательна: «Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0», ссылка на canonical legalcode, отметка изменений. Форк называется иначе и указывает происхождение формулой «based on Cassandra Index».
- **Версия** — `VERSION`: одна строка semver, единственный источник; дублируется `version:` в `CITATION.cff`, паритет пинит `tests/citation.test.js`. Версия методологии (`PARAMS.methodology`) — не версия проекта.
- **Цитирование** — «Cassandra Index, версия, дата, URL»: версия из `VERSION`, дата релиза или дата цитируемой недели, URL https://cassindex.ru. Машинная форма — `CITATION.cff`, текстовый раздел — `how-to-read.html` (`#cite-title`).
- **Официальный источник один — cassindex.ru; форки неофициальны.** Фраза из `README.md` дословна, её пинит `tests/governance.test.js`.
- **Вклад** — под Developer Certificate of Origin 1.1: `git commit -s`, CLA нет. Каждый коммит PR подписан; проверка `tools/check-dco.js` через `.github/workflows/dco.yml` (merge-коммит нарушением не считается).
- **Уязвимости** — приватно на контакт из `SECURITY.md` (публичный issue не подходит); область, окна ответа и запрещённые действия — там же.
- **Граница репозитория**: здесь **публичное ядро** целиком; **коммерческий модуль** — отдельный приватный репозиторий, закрытое зависит от открытого, не наоборот (ADR 0056, `docs/repo-boundaries.md`). Каталогов `commercial/`, `private/`, `enterprise/` не заводить — приватность в git не выражается папкой. Термины — в `CONTEXT.md`.
- **Юридическое замечание**: правообладатель в `LICENSE` — `Cassandra Index contributors` (допущение, пока владелец не назван иначе); контакт безопасности — `Zasik2008@yandex.ru`.

**Новые корневые файлы** (не искать заново): `LICENSE`, `LICENSE-DATA`, `LICENSE-DOCS`, `NOTICE`, `TRADEMARK.md`, `VERSION`, `CITATION.cff`, `.zenodo.json`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md`. Рядом: `tools/check-dco.js`, `.github/workflows/dco.yml`, `docs/repo-boundaries.md`, `docs/adr/0056-repository-boundary-public-core.md`, тесты-пины `tests/licensing.test.js`, `tests/citation.test.js`, `tests/dco.test.js`.
