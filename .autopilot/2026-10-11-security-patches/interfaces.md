# Интерфейсы — прогон security-patches

## Границы, решённые в спецификации

Одна единица работы — «проверка + git». Кода не пишется. Внешние контракты,
проверяемые как данные:

| Контракт | Что сверяется | Как |
|---|---|---|
| GitHub Actions-теги → SHA | deploy.yml пиннет checkout@`11d5960a…` (заявлен v4.4.0), upload-pages-artifact@`56afc609…` (v3.0.1), deploy-pages@`d6db9016…` (v4.0.5) | `gh api repos/actions/<name>/git/refs/tags/<tag>` → объект commit SHA совпадает с закреплённым |
| deploy.yml (YAML) | `rm -f _site/data/audit.jsonl` исключает журнал из артефакта; структура workflow не сломана | чтение diff + валидация отступов |
| index.html / privacy.html (заголовки) | meta-CSP/referrer соответствуют реальным ресурсам страниц (внешние скрипты, document.write data/latest.js, inline-скрипт локализации в privacy, FormSubmit в connect-src/form-action index) | ручной разбор страниц |
| .github/dependabot.yml | схема version 2, ecosystem github-actions | чтение файла |

## Правила проекта (не выводить — принять как данность)

- Стек: чистый HTML/CSS/JS, ноль зависимостей; Node ≥ 18; ESM (кроме CommonJS `build.js`).
- Тесты: `node --test` из корня, без аргументов. Зелёный до любого коммита.
- `node build.js` обязателен после правок `js/**` — в этом прогоне `js/**` не трогается, сборка не нужна.
- Push в master = автоматический выкат на cassindex.ru через `.github/workflows/deploy.yml` (публикуется только index.html, privacy.html, icon.svg, css/, js/, data/).
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`, git-историю.
- Коммитит и пушит только оркестратор этого прогона.
- Отсутствующая возможность/инструмент → вернуть BLOCKED с описанием, не ставить пакеты.

## Готовые таски — что построено

(нет — ярус T0, разбивки нет; этот прогон меняет только git-состояние и артефакты `.autopilot/`)
