# 01 — Правовая рамка: лицензии, NOTICE, торговая марка

**Требования:** R01, R01i, R02, R02ii, R03, R03i, R05, R05i, R08ii, R10i
**Зависит от:** —
**Зона:** корень (`LICENSE`, `LICENSE-DATA`, `LICENSE-DOCS`, `NOTICE`, `TRADEMARK.md`) · `tests/licensing.test.js`
**Волна:** 1
**Ревью:** да — фундамент
**Модель:** сильная

## Что должно заработать

Человек открывает репозиторий и видит ровно одну лицензию кода, отдельные лицензии данных
и документов, NOTICE с чужими материалами и TRADEMARK.md, объясняющий, что название и
логотип лицензиями не покрыты. Тест `tests/licensing.test.js` пинит всё это — и заодно
запрещает закрытые каталоги в этом репозитории.

## Из брифа, дословно

> «Добавить LICENSE (Apache-2.0) для кода.»
> «Добавить LICENSE-DATA (CC BY 4.0) и LICENSE-DOCS (CC BY 4.0).»
> «Добавить NOTICE с атрибуцией GeoNames и сторонних данных.»
> «Добавить TRADEMARK.md: название и логотип — не под open-source лицензией; форк обязан называться иначе.»

## Разделы спецификации

Истории 1–5, 7–9, 14–15, 25, 28; «Решения по реализации» (абзацы про дословные тексты,
правообладателя, NOTICE); `interfaces.md` §1 и §6.

## Критерии приёмки

- [ ] В корне есть `LICENSE` с полным дословным текстом Apache License 2.0 (шапка
      «Apache License / Version 2.0, January 2004» и блок «END OF TERMS AND CONDITIONS»),
      строкой copyright на `Cassandra Index contributors` и заполненным приложением
      «APPENDIX: How to apply the Apache License to your work»→`Copyright 2026 …`
- [ ] `LICENSE-DATA` и `LICENSE-DOCS` есть в корне: шапка области применения
      (что покрыто — `data/**` и `docs/**` + корневые `*.md` + текст статических страниц
      соответственно; что не покрыто — код, третьи тексты, дампы GeoNames), строка
      атрибуции `Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0`,
      ссылка на canonical legalcode и сам текст CC BY 4.0
- [ ] `NOTICE` перечисляет по пунктам GeoNames (CC BY 4.0, geonames.org), тексты источников
      (права издателей, цитаты — цитирование), Cloudflare Web Analytics, FormSubmit,
      сторонний `package/package.json` (GSD Core, MIT); отдельной фразой — что ни один
      из перечисленных материалов не покрывается лицензиями проекта
- [ ] `TRADEMARK.md` называет защищаемое (словесное «Cassandra Index», логотип `icon.svg`,
      домен `cassindex.ru`) и даёт два списка: разрешено без спроса (правдиво сказать
      «based on Cassandra Index», ссылаться на сайт, цитировать) / требует письменного
      разрешения (называть форк Cassandra Index, брать логотип, выдавать за официальный)
- [ ] `tests/licensing.test.js` существует, проверяет наличие и содержимое всех пяти
      файлов и отсутствие в `git ls-files` каталогов `commercial/`, `private/`,
      `enterprise/`; тест зелёный
- [ ] `node --test` зелёный целиком; `node --test tests/licensing.test.js` зелёный
- [ ] Ни один существующий тест не сломан; `node build.js` не требуется (js/** не тронут)

## Подсказки

- Тексты лицензий брать с первоисточника (`apache.org/licenses/LICENSE-2.0.txt`,
  `creativecommons.org/licenses/by/4.0/legalcode.txt`), не пересказывать.
- Файлы — обычный текст в UTF-8, LF; запуск на Windows с CRLF не должен ломать тест
  (сравнивать по вхождению подстрок, не по хешу).
- Тест читает файлы так же, как `tests/page-structure.test.js` (`readFileSync` +
  `includes`), DOM не нужен.
