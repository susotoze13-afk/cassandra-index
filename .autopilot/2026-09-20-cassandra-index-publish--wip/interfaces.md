# Интерфейсы и правила проекта

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `deploy workflow` | `.github/workflows/deploy.yml` | trigger push→опубликовано | детали artifact/deploy actions |
| `publish-docs` | инструкция обновления в `AGENTS.md` | шаги «новая неделя → опубликовано» | — |
| `site` *(существующий, не меняется)* | весь пользовательский функционал | `node --test`, `node build.js` | — |

Швы для тестов: существующие — `node --test` (91 тест) и headless-проверка
страницы. Новых модулей с логикой нет, новых швов не вводим.

## Правила проекта (из AGENTS.md — выполнять, не переоткрывать)

- Стек: чистый HTML/CSS/JS, **ноль зависимостей и runtime-библиотек**.
  Любой импорт npm/CDN — ошибка. Недостающая зависимость возвращается как
  `BLOCKED`, а не доустанавливается.
- Node ≥ 18. Тесты: `node --test` (без аргументов; форма `node --test tests/`
  падает на Windows/Node 24).
- Сборка бандла: `node build.js` — обязательна после ЛЮБОЙ правки `js/**`;
  бандлы коммитятся, руками не правятся.
- **Не трогать:** `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/`.
- Пользовательские строки — только через словарь `js/i18n.js`; DOM — через
  `createElement` + `textContent`, без innerHTML со строками.
- Секретов в репозитории нет и быть не должно; если вдруг нужен токен — он
  живёт только в GitHub Secrets и никогда не коммитится.

## Контракт этого прогона

- Публикуется только: `index.html`, `privacy.html`, `css/`, `js/`, `data/`.
  Всё остальное (`.autopilot/`, `tests/`, `design/`, `docs/`, `*.md` корня,
  `cassandra-index-prototype.html`, `build.js`) — не публикуется.
- Абсолютные пути в корень (`href="/…"`) в публикуемых HTML запрещены —
  сайт живёт в подкаталоге `/<repo>/`.


## Из таска 01 — выкатная обвязка

- Workflow `Deploy to GitHub Pages` (`.github/workflows/deploy.yml`): push в
  `master` → job `deploy` (ubuntu-latest, environment github-pages): checkout →
  stage `_site` из `index.html`, `privacy.html`, `css/`, `js/`, `data/` →
  `actions/upload-pages-artifact@v3` (path `_site`) → `actions/deploy-pages@v4`.
  Permissions `pages: write`, `id-token: write`; concurrency group `pages`.
- Работа под префиксом `/<repo>/` подтверждена headless: все ресурсы 200,
  absolute-путей в HTML нет.
- В `AGENTS.md` раздел «Публикация» — публичный URL дописывается в таске 02
  после первого выката.
