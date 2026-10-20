# Обнаружение и предложение источников (source discovery)

Процедура, при которой модель ищет публикации в открытых лентах и в интернете,
проверяет их воротами и **предлагает** редактору готовые URL с заполненными
R55-атрибутами. Модель предлагает — редактор выбирает и применяет записи ко
входу недели сам (`docs/governance.md` §10.1, ADR 0026). Инструмент —
`calc/source-discovery.js`; машинный реестр точек входа —
`calc/input/discovery/feeds.json`; пул готовых кандидатов —
`calc/input/discovery/<неделя>.json`. Пул — производство конкретной недели
(кладётся перед прогоном): синтетические demo-пулы по путям реальных
опубликованных недель не коммитятся — `--write` иначе создал бы фейковый
`data/discovery/<неделя>.json`; тесты инструмента сидируют свой пул во
временном каталоге.

## Роли

- **Модель** — поисковик и подготовитель: обходит реестр лент, извлекает ссылки
  на публикации в окне недели, заполняет R55-атрибуты (id, title{ru,en}, domain,
  url, publication_date, accessed_date, source_type, cluster_id,
  state_affiliated), прогоняет кандидата через ворота и **предлагает** список.
- **Редактор** — единственный, кто выбирает кандидатов и вносит записи во вход
  недели (`calc/input/<неделя>.json`). Модель не выбирает, не применяет и не
  пересчитывает неделю: `--write` пишет только артефакт предложения
  `data/discovery/<неделя>.json` и не вызывает `calc/calc.js`.
- Предложение — не решение: порог независимости (≥2 кластера на критерий,
  ADR 0026) здесь — ворота, а не мнение модели.

## Алгоритм недели

1. **(а)** Взять слепые критерии недели — `criteria[id] = null` во входе
   `calc/input/<неделя>.json` — и их драйверы.
2. **(б)** Для каждого определить окно W−7…W (включительно), допустимые для
   региональной атрибуции драйверы (D1/D3/D5/D6/D7/D8/D9.3) и whitelist
   регионов таксономии недели.
3. **(в)** Пройти реестр лент (`--feeds`) / поиск, отобрать публикации окна.
4. **(г)** Проверить URL воротами `linkcheck` (broken — отказ, blocked —
   предупреждение: это особенности среды проверки, не битая страница).
5. **(д)** Заполнить R55-атрибуты и предложить редактору список с вердиктами.
6. **(е)** Редактор выбирает и вносит записи во вход сам.

## Ворота (блокеры → кандидат отбракован)

- обязательные R55-поля не заполнены (включая `state_affiliated: boolean` и
  `title.ru`/`title.en`);
- критерий не указан, не из 46 критериев методологии или **не слепой** в этой
  неделе;
- дата публикации вне окна W−7…W или не в формате `YYYY-MM-DD` (та же проверка
  формата у `accessed_date`);
- `cluster_id` вне белого списка `PARAMS.clusters`; `source_type` вне
  `{primary, secondary, OSINT}`; URL не `http(s)`;
- регион вне таксономии недели, не массив, либо драйвер критерия не допустим для
  региональной атрибуции (ADR 0022);
- `quotes[]` с нарушением формы; цитата, не найденная в корпусе
  `calc/input/drafts/texts-<неделя>/` дословно (нет корпуса — предупреждение,
  не отказ);
- мёртвый URL (`broken`) при включённой сетевой проверке; **blocked — только
  предупреждение**;
- независимость: на критерий меньше 2 разных `cluster_id` среди прошедших
  кандидатов (ADR 0026).

## CLI

```
node calc/source-discovery.js                       # сухой прогон: вердикты, без сети, файлов не пишет
node calc/source-discovery.js --week 2026-10-18     # конкретная неделя (дефолт — последняя в data/)
node calc/source-discovery.js --feeds               # + проверка URL кандидатов и обход реестра лент
node calc/source-discovery.js --write               # + запись data/discovery/<неделя>.json
```

Коды выхода: `0` — все кандидаты прошли; `1` — есть хотя бы один отбракованный
кандидат, невалидный пул/реестр, неизвестный аргумент, отсутствующий пул
кандидатов или вход недели. Статусы лент на код выхода не влияют. `--write` записывает отчёт целиком
(OK и FAIL: вердикт, блокеры, предупреждения, полный R55-объект) и не трогает
`data/<неделя>/`.

## Реестр лент

Машинный источник — `calc/input/discovery/feeds.json`; таблица ниже —
человекочитаемое зеркало (их паритет пинится тестом
`tests/source-discovery.test.js`). Регион `—` = международная лента без
привязки к региону.

| id | Регион | Издание | URL | Тип |
|---|---|---|---|---|
| sd-balkaninsight | balkans | Balkan Insight | https://balkaninsight.com/feed/ | RSS |
| sd-n1 | balkans | N1 | https://n1info.rs/feed/ | RSS |
| sd-danas | balkans | Danas | https://danas.rs/feed/ | RSS |
| sd-vijesti | balkans | Vijesti | https://vijesti.me/rss | RSS |
| sd-belta | russia-belarus | БелТА | https://www.belta.by/rss/ | RSS |
| sd-moldova | ukraine-moldova | Moldova.org | https://moldova.org/feed/ | RSS |
| sd-baltictimes | baltic | The Baltic Times | https://baltictimes.com/rss | RSS |
| sd-nrk | eu-north-europe | NRK | https://www.nrk.no/nyheter/siste.rss | RSS |
| sd-civilge | south-caucasus | Civil Georgia | https://civil.ge/rss | RSS |
| sd-ocmedia | south-caucasus | OC Media | https://oc-media.org/feed | RSS |
| sd-reportaz | south-caucasus | Report.az | https://report.az/en/rss | RSS |
| sd-ferghana | central-asia | Ferghana.ru | https://www.ferghana.ru/rss/ | RSS |
| sd-astanatimes | central-asia | Astana Times | https://www.astanatimes.com/feed | RSS |
| sd-uza | central-asia | UZA | https://uza.uz/rss | RSS |
| sd-almonitor | middle-east | Al-Monitor | https://www.al-monitor.com/rss | RSS |
| sd-guardian-me | middle-east | The Guardian (Ближний Восток) | https://www.theguardian.com/world/middleeast/rss | RSS |
| sd-timesofisrael | middle-east | The Times of Israel | https://www.timesofisrael.com/feed/ | RSS |
| sd-africanews | africa | Africanews | https://africanews.com/feed/ | RSS |
| sd-premiumtimes | africa | Premium Times | https://www.premiumtimesng.com/feed/ | RSS |
| sd-scmp | east-asia | South China Morning Post | https://www.scmp.com/rss/feed | RSS |
| sd-koreaherald | east-asia | The Korea Herald | https://www.koreaherald.com/rss | RSS |
| sd-thehindu | south-asia | The Hindu | https://www.thehindu.com/news/feeder/default.rss | RSS |
| sd-npr | north-america | NPR News | https://feeds.npr.org/1001/rss.xml | RSS |
| sd-bbc | — | BBC World | https://feeds.bbci.co.uk/news/world/rss.xml | RSS |
| sd-aljazeera | — | Al Jazeera English | https://www.aljazeera.com/xml/rss/all.xml | RSS |
| sd-guardian | — | The Guardian (World) | https://www.theguardian.com/world/rss | RSS |

## Курирование

- Реестр и пул — только руками редактора (и правки агента по его прямому
  заданию): модель не добавляет ленты «сама». Новая лента — запись в
  `feeds.json` **и** строка в таблице выше (паритет), URL — реальный, проверенный
  из браузера.
- Пул кандидатов `<неделя>.json` заполняется прогоном инструмента/моделью, но
  попадает во вход недели только после отбора редактором (§10.1).
- `data/discovery/<неделя>.json` — производный артефакт (`--write`), руками не
  правится; в deploy-whitelist не входит и наружу не уходит.
