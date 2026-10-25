# Письмо редактору и записка рецензенту

Два текста: короткое письмо в редакцию и отдельная записка рецензенту. Плейсхолдеры
`{{...}}` заполняются перед отправкой; ничего не отправляется автоматически.

## 1. Письмо в редакцию (RU)

> Уважаемый(ая) {{имя редактора}}!
>
> Направляю рукопись «Cassandra Index: недельный индекс уровня риска глобального
> конфликта на открытых данных — конструкт, метод, калибровка и границы применимости»
> для рассмотрения в {{название журнала}}.
>
> Работа описывает композитный индикатор, построенный на 46 критериях и девяти
> драйверах, с полным раскрытием формулы, весов, порогов и списка непокрытых мест.
> Параметр насыщения калиброван на десяти исторических якорях методом rolling-origin
> (семь якорей выбирают, три проверяют), чувствительность к параметрам опубликована.
>
> Отдельно обращаю внимание на §6: внешняя сверка с Geopolitical Risk Index не даёт
> согласия (по уровням r = −0,148 при p = 0,74, n = 7), сверка с ACLED и CrisisWatch
> статистически невозможна при имеющемся числе пар. Я не интерпретирую результат как
> подтверждение валидности и не заявляю прогностической силы индекса.
>
> Что, по моему мнению, составляет вклад: (1) операциональное определение конструкта
> как порядковой шкалы аномальности с прокалиброванными границами; (2) схема данных, в
> которой у каждого покрытого критерия есть запись источника с кластером
> происхождения, а у непокрытого — причина отсутствия; (3) воспроизводимость: весь
> ряд пересчитывается одной командой, 909 тестов пинят опубликованные числа.
>
> Рукопись не подана и не опубликована в другом издании. Препринт: {{да / нет, ссылка}}.
> Конфликт интересов раскрыт в конце текста: автор — единственный разработчик и
> редактор проекта, внешнего рецензирования до подачи не было.
>
> С уважением,
> {{имя}}, {{контакт}}, {{дата}}

## 2. Записка рецензенту (RU)

Прикладывается к рукописи, если площадка это позволяет; иначе — переносится в
сопроводительное письмо.

> **Что прошу проверить в первую очередь**
>
> 1. **Конструкт.** Корректно ли задана граница «индекс не вероятность и не прогноз»
>    (§2), и не протекает ли вероятностная интерпретация в текст и в интерфейс.
> 2. **Формула.** Воспроизводится ли агрегация из §4 по коду `calc/engine.js` без
>    устных договорённостей. Готов показать соответствие «абзац текста → функция».
> 3. **Калибровка.** Убедительно ли разделение якорей на выбирающие и проверяющие
>    (§5.2), и достаточно ли опубликованной чувствительности, чтобы считать выбор
>    `k = 1.95` не подгонкой.
> 4. **Валидация.** Согласны ли вы с тем, что при n = 7 и n = 6 коэффициенты не
>    доказывают ничего (§6), и какая конструкция следующего шага была бы корректной.
> 5. **Ограничения (§8).** Не упущен ли пункт, без которого работу нельзя принимать.
>
> **Чего в работе заведомо нет** (прошу не считать это упущением, а судить, насколько
> это критично): ряда длиннее девяти недель; второго кодировщика и
> межкодировочной надёжности; независимой перекодировки якорей; значимой внешней
> валидации; рецензирования до подачи.
>
> **Как проверить быстро** (Приложение B): `node --test`; `node calc/calc.js
> 2026-10-18`; `node calc/calibrate.js`; `data/public/validation.json`;
> `docs/api.md`; `docs/adr/`.

## 3. Cover letter (EN, для JOSS и англоязычных площадок)

> Dear Editor,
>
> I submit `Cassandra Index` — the computational core of a weekly, open-data index of
> global conflict-risk level and direction.
>
> The package computes a 0–100 ordinal index from 46 criteria grouped into nine drivers.
> Each criterion carries its source records (type, domain, date, provenance cluster) or
> an explicit statement of why it is absent. Aggregation is deterministic: weighted
> drivers, a saturating curve calibrated on ten historical anchors by a rolling-origin
> split, asymmetric inertia, a cap on indirect precursors, and a regional deviation
> model. There are no dependencies and no randomness — the same input produces the same
> output.
>
> The repository is built for verification rather than trust: published numbers for each
> week are pinned by tests, the public layer is checked byte-for-byte against its
> generator, every public file has a JSON Schema and an entry in the API document, and a
> snapshot cannot be written if a source URL is broken or the data contract fails. An
> append-only audit log with a hash chain records every recalculation.
>
> I disclose the limits plainly: the comparable series is nine weeks, external validation
> shows no significant agreement, and the method has not been independently reviewed.
> AI coding agents were used during development under human review; this is disclosed in
> the paper.
>
> Sincerely,
> {{name}}, {{contact}}, {{date}}
