# 03 — README, вклад, безопасность и DCO

**Требования:** R06, R06i, R06ii, R07, R07i, R07ii, R09i, R10i
**Зависит от:** 01
**Зона:** `README.md` · `CONTRIBUTING.md` · `SECURITY.md` · `tools/` · `tests/dco.test.js` · `tests/governance.test.js` · `.github/workflows/dco.yml`
**Волна:** 2
**Ревью:** нет
**Модель:** обычная

## Что должно заработать

Репозиторий встречает читателя фразой про официальный источник, объясняет, что это и как
запустить, куда писать про уязвимость и как прислать правку. Pull request с неподписанным
коммитом краснеет в CI.

## Из брифа, дословно

> «Добавить CONTRIBUTING.md и SECURITY.md; для вкладов — DCO, а не тяжёлый CLA.»
> «Добавить README.md с одной фразой: «Официальный источник — cassindex.ru; форки не являются официальными».»

## Разделы спецификации

Истории 16–22, 27; «Решения по реализации» (абзац про DCO); `interfaces.md` §4, §5, §7.

## Критерии приёмки

- [ ] `README.md` в корне; в начале файла дословно: «Официальный источник — cassindex.ru;
      форки не являются официальными» (точка в конце, формулировка не переставлена)
- [ ] README объясняет: что это (еженедельный индекс по открытым данным), что он **не**
      означает (не прогноз даты, не вероятность, не официальная позиция), как открыть
      локально (`index.html`), как прогнать тесты (`node --test`), структуру, карту
      лицензий (код/данные/документы/название), цитирование, вклад и безопасность
- [ ] `CONTRIBUTING.md`: как предложить правку, требования (ноль зависимостей, ESM,
      тесты, `node build.js` после `js/**`, коммит только по договорённости), DCO 1.1
      с `git commit -s` и явным «CLA не требуется», раздел «Релизы и DOI» (тег `v<VERSION>`,
      `.zenodo.json` до релиза, DOI в `CITATION.cff` и README)
- [ ] `SECURITY.md`: приватный канал `Zasik2008@yandex.ru`, окно первого ответа,
      область (сайт, расчётный пайплайн, данные, действия CI) и список запрещённого
      (не открывать публичный issue, не проверять на живом сайте разрушающими запросами,
      не трогать чужие данные и секреты)
- [ ] `tools/check-dco.js` — ESM-модуль с чистыми `parseTrailers(message)` и
      `checkCommits(commits)` и тонким CLI (`node tools/check-dco.js <base> <head>`);
      merge-коммиты не считаются нарушением; находит `Signed-off-by:` в trailer-блоке
- [ ] `.github/workflows/dco.yml` на `pull_request`, `permissions: contents: read`,
      `actions/checkout` с тем же пином SHA, что в остальных workflow, `fetch-depth: 0`,
      шаг `run: node tools/check-dco.js "${{ github.event.pull_request.base.sha }}" "${{ github.event.pull_request.head.sha }}"`;
      сторонних action нет
- [ ] `tests/dco.test.js` покрывает: подписанный коммит, неподписанный, несколько
      trailers, merge-коммит; `tests/governance.test.js` пинит дословную фразу README
      и наличие трёх файлов
- [ ] `node --test` зелёный; `node build.js` не требуется

## Подсказки

- Образец формы workflow — `.github/workflows/weekly-calc.yml` (permissions, пиннинг, `node-version: 24`).
- README не должен обещать прогноза; лексика — как на сайте (`how-to-read.html`,
  футер `index.html`).
