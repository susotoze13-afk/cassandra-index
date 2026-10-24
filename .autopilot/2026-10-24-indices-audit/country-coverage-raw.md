# Покрытие 14 стран: сырой срез по 12 проектам

**Дата среза:** 2026-10-24
**Вопрос:** у какого проекта есть оценка/ряд именно по стране, у какого — только региональная или ситуационная группировка, у какого — ничего.
**Метод:** первичная проверка страниц/файлов проектов из оболочки (`curl.exe` + headless Chrome). Chrome дал то, чего не даёт `curl`: отрендерил JS-оболочки (INFORM — прошёл WAF-челлендж, где `curl` получал 5,3 КБ заглушки; EWP, FSI). Cloudflare-челлендж «Just a moment…» не прошёл ни один способ (ACLED, CrisisWatch). Дата проверки у каждой строки — 2026-10-24.
**Правило:** клетка ставится только по подтверждению. Если подтверждения нет — `не проверено` с кодом/причиной; никаких «очевидно, что страна есть».

Обозначения:

- `страна` — у проекта есть страновой ряд или оценка именно по этой стране, подтверждено страницей/файлом/API проекта (URL — в §2 и §4).
- `регион` — только региональная или ситуационная группировка; страны внутри.
- `нет` — странового уровня по этой стране проект не публикует (основание — в сноске).
- `не проверено` — проверить не удалось; в клетке код ответа и дата.
- `*` — факт взят **документально (локальный источник)**, а не из сети сегодня; расшифровка в сноске под таблицей.

---

## 1. Матрица «проект × 14 стран»

Столбцы: РФ — Россия, УА — Украина, БУ — Беларусь, МД — Молдова, КЗ — Казахстан, ГЕ — Грузия, АМ — Армения, АЗ — Азербайджан, LT — Литва, LV — Латвия, EE — Эстония, UZ — Узбекистан, KG — Киргизия, TJ — Таджикистан.

| Проект | РФ | УА | БУ | МД | КЗ | ГЕ | АМ | АЗ | LT | LV | EE | UZ | KG | TJ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Cassandra Index | регион | регион | регион | регион | регион | регион | регион | регион | регион | регион | регион | регион | регион | регион |
| ACLED | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) |
| UCDP | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна |
| GDELT | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна |
| CrisisWatch (ICG) | не проверено (403 + Cloudflare, 24.10) | не проверено (403 + Cloudflare, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) | не проверено (403, 24.10) |
| War Monitor (warmonit.com) | страна | страна | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ | нет¹ |
| GPR Index | страна | страна | нет² | нет² | нет² | нет² | нет² | нет² | нет² | нет² | нет² | нет² | нет² | нет² |
| INFORM | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна |
| Global Peace Index (IEP) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) | не проверено (000, 24.10) |
| Fragile States Index | страна* | страна* | страна* | страна* | страна* | страна* | страна* | страна* | страна* | страна* | страна* | страна* | страна* | страна* |
| Early Warning Project | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна | страна |
| BlackRock BGRI | нет | нет | нет | нет | нет | нет | нет | нет | нет | нет | нет | нет | нет | нет |

Итого по 168 клеткам (12 × 14): `страна` — 74 (UCDP 14, GDELT 14, INFORM 14, EWP 14, FSI 14, War Monitor 2, GPR 2), `регион` — 14 (Cassandra), `нет` — 38 (BGRI 14 + War Monitor 12 + GPR 12), `не проверено` — 42 (ACLED 14, CrisisWatch 14, GPI 14).

### Сноски к матрице

1. **War Monitor, 12 стран `нет`.** У проекта есть страновые страницы `/country/<slug>` с серверной мета-разметкой CII («Russia at war today: instability 66/100»), но они существуют только для части стран: `200` для `russia`, `ukraine`; `404` для `belarus`, `moldova`, `kazakhstan`, `georgia`, `armenia`, `azerbaijan`, `lithuania`, `latvia`, `estonia`, `uzbekistan`, `kyrgyzstan`, `tajikistan` (все — 24.10.2026). Публичный список стран проекта `https://warmonit.com/countries` («Which countries are most unstable right now?») содержит ровно **30** ссылок `/country/…`, из 14 наших в нём только Россия и Украина. Глобальная карта может раскрашивать и остальные страны — это **не проверено** (значения рисуются скриптом, в HTML их нет).
2. **GPR: 12 стран `нет`.** На `https://www.matteoiacoviello.com/gpr_country.htm` перечислены все 44 страны, по которым строятся страновые индексы, шестью группами: Северная Америка (3), Южная Америка (6), Европа (север и восток): Дания, Финляндия, Венгрия, Норвегия, Польша, **Россия**, Швеция, **Украина**, Великобритания (9), Европа (юг и запад) (8), Ближний Восток и Африка (6), Азия и Океания (12). Беларуси, Молдовы, Казахстана, Грузии, Армении, Азербайджана, Литвы, Латвии, Эстонии, Узбекистана, Киргизии, Таджикистана в списке нет.
3. **FSI `страна*`.** Список стран поштучно не получен: дашборд `https://fragilestatesindex.org/country-data/` рендерится в Tableau (`public.tableau.com/views/fsi-2024-rankings/DashboardRankings`), в HTML стран нет; XLSX-выгрузки приходят обрезанными (см. §3). Основание для `страна`: собственный текст страницы проекта (получен через WP REST API 24.10.2026) — «comprehensive ranking of the pressures experienced by **178 nations**» / «**179 countries**» (страницы `2021-fsi-launch-event`, `global-data`). Страновой уровень заявлен самим проектом; принадлежность именно этих 14 стран к списку 178 поштучно не сверена.
4. **ACLED и CrisisWatch.** В обоих случаях сегодня получен только Cloudflare-челлендж «Just a moment...» (и `curl`, и headless Chrome). Документально (локальный источник, `docs/articles/crisis-monitoring-audit-2026-10-24.md` §5.2, §5.5) у ACLED страновой уровень есть (у события — страна и источник), у CrisisWatch — «страновой/ситуационный уровень», 70+ ситуаций с 2003 года. Поштучно по 14 странам **не проверено**.
5. **GPI.** `https://www.economicsandpeace.org/global-peace-index/` — `000` (сброс соединения) и в `curl`, и в headless Chrome; DNS резолвится (141.193.213.20/21). Документально (локальный источник, §5.9) — годовой индекс 163 стран. Поштучно не проверено.

### Региональная привязка 14 стран в таксономии Cassandra (v2)

Странового уровня в Cassandra нет — только 12 регионов (`data/regions/reference.json`, `taxonomies['2.0']`); страна попадает в регион через `regions[]` критериев.

| Страна | ISO2 | Регион v2 (`id`) | Название |
|---|---|---|---|
| Россия | RU | `russia-belarus` | Россия и Беларусь |
| Беларусь | BY | `russia-belarus` | Россия и Беларусь |
| Украина | UA | `ukraine-moldova` | Украина и Молдова |
| Молдова | MD | `ukraine-moldova` | Украина и Молдова |
| Литва | LT | `baltic` | Балтия |
| Латвия | LV | `baltic` | Балтия |
| Эстония | EE | `baltic` | Балтия |
| Грузия | GE | `south-caucasus` | Южный Кавказ |
| Армения | AM | `south-caucasus` | Южный Кавказ |
| Азербайджан | AZ | `south-caucasus` | Южный Кавказ |
| Казахстан | KZ | `central-asia` | Средняя Азия |
| Узбекистан | UZ | `central-asia` | Средняя Азия |
| Киргизия | KG | `central-asia` | Средняя Азия |
| Таджикистан | TJ | `central-asia` | Средняя Азия |

Источник: `data/regions/reference.json`, ключ `taxonomies['2.0'].regions[].countries` (локальный файл, прочитан 2026-10-24). Граница таксономии v2 — неделя 2026-10-18.

---

## 2. Атрибуты проектов

| Проект | Разрешение | С какого года ряд | Лаг публикации | Где смотреть (URL/файл) | Дата проверки |
|---|---|---|---|---|---|
| Cassandra Index | регион (12 регионов v2, страны — только через `regions[]`) | 2026-08-30 — пересчитанная цепочка методологии 3.0 (8 недель); 2026-08-02…08-23 — демо-история 1.0 | неделя | `data/regions/reference.json`; `data/<неделя>/week.js`; https://cassindex.ru | 2026-10-24 (локальные файлы) |
| ACLED | страна (событие с полем страны; Conflict Index по странам) — документально | не установлено: сайт 403, локальные материалы год начала ряда не называют | непрерывно / месячный индекс | https://acleddata.com/ — **403 Cloudflare** | 2026-10-24 |
| UCDP | страна + событие (геокоординаты) | «UCDP/PRIO Armed Conflict Dataset version 26.1» — 1946–2025; «UCDP Country-Year Dataset on Organized Violence within Country Borders version 26.1» | год (финализация) + месячный candidate («UCDP Candidate Events Dataset version 26.0.X») | https://ucdp.uu.se/downloads/ | 2026-10-24 |
| GDELT | событие с геокодом; страновой срез — через FIPS Country Code | с 1979-01-01 (около 250 млн геореференцированных записей) | непрерывно, ежедневно | https://www.gdeltproject.org/about.html, https://www.gdeltproject.org/data.html | 2026-10-24 |
| CrisisWatch (ICG) | ситуация (70+ конфликтов и кризисов) — страновой/ситуационный | документально: с 2003 (локальный источник) | месяц | https://www.crisisgroup.org/crisiswatch — **403 + Cloudflare-челлендж** | 2026-10-24 |
| War Monitor (warmonit.com) | страна (CII 0–100); публичных страновых страниц — 30 (список `/countries`) | не заявлено на странице страны; в FAQ — «a structural baseline … plus 30-day event pressure» (история не указана) | ежедневно 06:00 UTC (глобальный уровень); модуль country instability — «recomputed every 15 minutes» | https://warmonit.com/countries; https://warmonit.com/country/russia; https://warmonit.com/country/ukraine | 2026-10-24 |
| GPR Index | страна (44 страновых индекса) + глобальный | глобальный: 1900 (3 газеты) / 1985 (10 газет); страновые — те же окна | день и месяц (месячный ряд обновлён 2026-10-01) | https://www.matteoiacoviello.com/gpr.htm; список 44 стран — https://www.matteoiacoviello.com/gpr_country.htm | 2026-10-24 |
| INFORM | страна/территория (191 позиция в выпадающем списке) | файл тренда «INFORM2026_TREND_2017_2026_v72_ALL.xlsx» → ряд с 2017 | год + середина года (файлы `INFORM_Risk_2026_v072.xlsx`, `INFORM_Risk_Mid_2026_v073.xlsx`) | https://drmkc.jrc.ec.europa.eu/inform-index/INFORM-Risk/Results-and-data | 2026-10-24 |
| Global Peace Index (IEP) | страна (163 страны) — документально | документально: годовой ряд (локальный источник) | год | https://www.economicsandpeace.org/global-peace-index/ — **000, сброс соединения** | 2026-10-24 |
| Fragile States Index | страна (178 государств — заявлено проектом; поштучно не сверено) | с 2006 — текст страницы проекта `global-data`: «complete set of Fragile States Index data from 2006–2018» | год (последний отчёт — FSI 2024, файл от 2025-02) | https://fragilestatesindex.org/country-data/ (Tableau), https://fragilestatesindex.org/excel/ | 2026-10-24 |
| Early Warning Project | страна (168 стран/территорий в списке; ранг + 95 % интервал) | текущая оценка — «2025-26 Statistical Risk Assessment» | год | https://earlywarningproject.ushmm.org/ranking-of-all-countries; API: https://earlywarningproject.ushmm.org/api/select-countries; страница страны: https://earlywarningproject.ushmm.org/countries/russia | 2026-10-24 |
| BlackRock BGRI | нет странового уровня: 10 геополитических рисков, рыночное внимание | документально: около 5 лет (локальный источник) | дашборд | https://www.blackrock.com/corporate/insights/blackrock-investment-institute/interactive-charts/geopolitical-risk-dashboard (HTML 14 159 байт, ни одного значения и ни одного названия страны) | 2026-10-24 |

---

## 3. Что не удалось проверить

| Проект | URL | Дата | Код / причина |
|---|---|---|---|
| ACLED | https://acleddata.com/ | 2026-10-24 | `403` (5 542 байта) в `curl`; в headless Chrome — Cloudflare-челлендж «Just a moment…» (28 715 байт). То же на `/data-export-tool/` (403), `/methodology/` (403), `api.acleddata.com` (000) |
| CrisisWatch (ICG) | https://www.crisisgroup.org/crisiswatch | 2026-10-24 | `403` (5 624 байта); в headless Chrome — «Just a moment…» (28 793 байта). Корень `https://www.crisisgroup.org/` отдаётся (`200`, 22 364 байта), но ссылок на CrisisWatch в нём нет |
| Global Peace Index | https://www.economicsandpeace.org/global-peace-index/ | 2026-10-24 | `000`, размер 0 — сброс соединения (`curl` дважды, `--http1.1`, headless Chrome). DNS резолвится: 141.193.213.20, 141.193.213.21. То же для https://www.visionofhumanity.org/maps/ (000) |
| Fragile States Index — поштучный список стран | https://fragilestatesindex.org/country-data/, /excel/, https://public.tableau.com/views/fsi-2024-rankings/DashboardRankings | 2026-10-24 | Страницы отдаются (`200`, ~24.8 КБ), но тело пустое: данные в Tableau-embed, стран в HTML нет (рендер headless Chrome — 50 562 байта, 0 вхождений названий стран; Tableau-страница в headless — 7 063 байта, 0 стран). XLSX-выгрузки (`FSI-2023-DOWNLOAD.xlsx`, `fsi-2022-download.xlsx`, `fsi-2021.xlsx`) приходят обрезанными: 25 187 / 25 945 / 26 011 байт с нулевым хвостом, ZIP-центральный каталог отсутствует → файл нечитаем. `node fetch` на тот же URL — «terminated» |
| Early Warning Project — таблица рейтинга | https://earlywarningproject.ushmm.org/ranking-of-all-countries | 2026-10-24 | Страница — SPA-оболочка (16 378 байт, `<main>` без таблицы), таблица подгружается скриптом; страновой список получен обходным путём через API `/api/select-countries` (168 записей), сама таблица рангов не выгружена |
| INFORM — XLSX | https://drmkc.jrc.ec.europa.eu/inform-index/Portals/0/InfoRM/2026/INFORM_Risk_Mid_2026_v073.xlsx | 2026-10-24 | `200`, но 5 327 байт — WAF-заглушка вместо файла; прямой `curl` к `*.xlsx` режется защитой. Список стран получен из HTML страницы «Results and data» (191 `<option>`) |
| War Monitor — значения CII по 12 странам | https://warmonit.com/country/{belarus,moldova,kazakhstan,georgia,armenia,azerbaijan,lithuania,latvia,estonia,uzbekistan,kyrgyzstan,tajikistan} | 2026-10-24 | `404` на всех двенадцати (контроль: `russia`, `ukraine` — `200` с мета-описанием «instability NN/100»). Публичный API `https://warmonit.com/api/countries` и `/api/v1/countries` — `401 {"error":"API key required"}`, сырые числа без ключа недоступны |
| BlackRock BGRI — числа | https://www.blackrock.com/corporate/insights/blackrock-investment-institute/interactive-charts/geopolitical-risk-dashboard | 2026-10-24 | `200`, 14 159 байт: 10 вхождений «geopolitical», 0 вхождений «Russia», «Ukraine», «country». Дашборд рисуется скриптом, данных в разметке нет |

---

## 4. Источники

| URL | Дата | Что подтверждает |
|---|---|---|
| https://www.matteoiacoviello.com/gpr.htm | 2026-10-24 (11 874 804 байта) | страновые индексы строятся для 44 стран; ссылка на страницу списка; месячные данные обновлены 2026-10-01 |
| https://www.matteoiacoviello.com/gpr_country.htm | 2026-10-24 (14 513 152 байта) | полный перечень 44 стран по шести группам: Россия и Украина есть, остальных 12 наших стран нет |
| https://ucdp.uu.se/downloads/ | 2026-10-24 (200, 138 438 байт) | «UCDP Country-Year Dataset on Organized Violence within Country Borders version 26.1», «UCDP/PRIO Armed Conflict Dataset version 26.1» (1946–2025), GED Global 26.1, месячный Candidate 26.0.X — страновой уровень |
| https://www.gdeltproject.org/about.html | 2026-10-24 (200, 24 355 байт) | «quarter billion georeferenced records… 100+ languages… since January 1, 1979… daily updates» |
| https://www.gdeltproject.org/data.html | 2026-10-24 (200, 55 068 байт) | события кодируются FIPS Country Code: «CAMEO Country Codes are only used in the Actor fields, while FIPS Country Code…» |
| https://warmonit.com/countries | 2026-10-24 (200, 20 437 байт) | «Which countries are most unstable right now?» — ровно 30 ссылок `/country/…`; из 14 наших только `russia` и `ukraine` |
| https://warmonit.com/country/russia | 2026-10-24 (200, 20 689 байт) | страновой CII: «Russia at war today: instability 66/100», «a structural baseline (35 for Russia) plus 30-day event pressure»; дата в FAQ — «As of 24 October 2026» |
| https://warmonit.com/country/ukraine | 2026-10-24 (200, 20 632 байта) | страновой CII по Украине существует (страница страны отдаётся) |
| https://warmonit.com/country/belarus (и ещё 11 слагов) | 2026-10-24 | `404 Page not found` — страновой страницы нет |
| https://warmonit.com/api/countries, /api/v1/countries | 2026-10-24 | `401 {"error":"API key required"}` — данные по API требуют ключа |
| https://drmkc.jrc.ec.europa.eu/inform-index/INFORM-Risk/Results-and-data | 2026-10-24 (headless Chrome, 84 385 байт) | 191 `<option>` стран/территорий, включая RUS, UKR, BLR, MDA, KAZ, GEO, ARM, AZE, LTU, LVA, EST, UZB, KGZ, TJK; ссылки на `INFORM_Risk_2026_v072.xlsx`, `INFORM_Risk_Mid_2026_v073.xlsx`, `INFORM2026_TREND_2017_2026_v72_ALL.xlsx` |
| https://earlywarningproject.ushmm.org/api/select-countries | 2026-10-24 (200, 7 841 байт) | 168 стран/территорий с `uri`; все 14 наших присутствуют (Киргизия — с опечаткой «Kyrgystan», uri `kyrgyzstan`) |
| https://earlywarningproject.ushmm.org/countries/russia | 2026-10-24 (200) | страница страны «Country - Russia» существует — страновой уровень |
| https://earlywarningproject.ushmm.org/ranking-of-all-countries | 2026-10-24 (200, 16 378 байт) | текст страницы: «This table shows all countries, in descending order, by estimated risk for onset of intrastate mass killing in 2025-26»; сама таблица подгружается скриптом |
| https://fragilestatesindex.org/wp-json/wp/v2/pages?per_page=100 | 2026-10-24 (200) | содержимое страниц проекта: «a comprehensive ranking of the pressures experienced by 178 nations», «179 countries»; данные на `global-data` — Tableau `fsi-2024-rankings/DashboardRankings` |
| https://fragilestatesindex.org/wp-json/wp/v2/media?search=xlsx | 2026-10-24 (200) | опубликованные XLSX: `fsi-2018…2023` (последний — `FSI-2023-DOWNLOAD.xlsx`); выгрузки обрезаются при скачивании |
| https://www.blackrock.com/corporate/insights/blackrock-investment-institute/interactive-charts/geopolitical-risk-dashboard | 2026-10-24 (200, 14 159 байт) | странового уровня нет: 0 вхождений «Russia»/«Ukraine»/«country», 10 — «geopolitical» |
| https://acleddata.com/ | 2026-10-24 | `403` + Cloudflare-челлендж — источник недоступен |
| https://www.crisisgroup.org/crisiswatch | 2026-10-24 | `403` + Cloudflare-челлендж — источник недоступен |
| https://www.economicsandpeace.org/global-peace-index/ | 2026-10-24 | `000` (сброс соединения) — источник недоступен |
| `data/regions/reference.json` (локальный) | 2026-10-24 | таксономия v2: 12 регионов, состав `countries[]` — привязка всех 14 стран к регионам |
| `docs/articles/crisis-monitoring-audit-2026-10-24.md` (локальный) | 2026-10-24 | конструкт и ритм 12 проектов; для ACLED/CrisisWatch/GPI — документальное основание странового уровня (сети не было) |
| `docs/articles/competitor-sources-deep-dive-2026-10-24.md` (локальный) | 2026-10-24 | §1 статус проверки (ACLED 403, CrisisWatch 403 Cloudflare, GPI reset, INFORM WAF), §4.10 FSI 178 государств |

---

## 5. Ограничения этого среза

1. Три проекта (ACLED, CrisisWatch, GPI) не отдали ни одной страницы — 42 клетки остались `не проверено`. Это не «нет»: отрицательный вывод из недоступности источника не делается.
2. `страна*` у FSI — единственная клетка, где уровень доказательства слабее: страновой уровень заявлен самим проектом (178 государств), принадлежность 14 стран списку поштучно не сверена из-за Tableau и обрезанных XLSX.
3. Значения CII War Monitor по 12 странам не проверены: страновых страниц нет, API требует ключ. Отсутствие страновой страницы ≠ отсутствие страны на карте; в матрице это помечено сноской 1.
4. Для Cassandra странового уровня нет по построению (12 регионов, ADR 0028) — `регион` у всех 14 стран, а не «не проверено».
