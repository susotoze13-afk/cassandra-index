# Границы, решённые в спецификации

Новая единица — `js/sections/feedback.js` (секция «Обратная связь»,
регистрируется в js/render.js). Публичный шов — `render(appState)`; чистые
швы для тестов: `honeypotCheck`, `timingCheck`, `rateLimit`,
`originAllowed`, `timingToken`, `validateFeedback`.

## Правила проекта (для исполнителя)

- Стек: чистый HTML/CSS/JS, **ноль зависимостей**; Node ≥ 18, всё ESM.
  Отсутствующая возможность — не повод ставить пакет: верни BLOCKED.
- Сайт одноязычный RU: словарь только js/i18n.js (DICTS.ru), строки —
  только через него (data-i18n / t()).
- DOM только через `document.createElement` + `textContent` — никакого innerHTML
  со строками пользователя. Вводимые данные никогда не вставлять в DOM.
- Тесты: `node --test` из корня **без аргументов**. Один файл:
  `node --test tests/<имя>.test.js`.
- После **любой** правки `js/**` — обязателен `node build.js` (бандлы
  коммитятся; руками не править). Тесты — против исходников.
- Цвета — только токены из `css/styles.css`; a11y: контраст ≥4.5:1,
  touch ≥44px, ошибки текстом + aria-live, видимый фокус.
- Форма работает с file:// (fetch — внешний HTTPS, ок) и не требует
  бэкенда; секретов нет и не появляется.
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `data/**`, `calc/**`, демо-режим, share/hero.
- **Не коммитить** — коммит и push делает оркестратор.
