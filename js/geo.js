// js/geo.js — ленивая загрузка статического справочника городов и стран
// (ADR 0029). Данные — два классических скрипта data/geo/cities.js и
// countries.js (window.CI_GEO_*): работают с file://, в бандл не входят и в
// index.html статически не подключены. Первый вызов loadGeo() инжектит их
// <script>-тегами, ждёт загрузку, кэширует в памяти сессии; повторный вызов
// отдаёт кэш. Поиск и резолв региона — чистые функции над каталогом.

let cache = null;
let loading = null;

// Инъекция классического скрипта (по умолчанию). Тесты передают свой inject в
// loadGeo, чтобы не ходить в сеть/DOM.
function injectScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Не удалось загрузить справочник: ${src}`));
    document.head.appendChild(s);
  });
}

// loadGeo(inject?) -> Promise<{cities, countries}>. Кэш в памяти: повторный
// вызов не инжектит заново. `inject` — шов тестов (src -> Promise).
export function loadGeo(inject) {
  if (cache) return Promise.resolve(cache);
  if (loading) return loading;
  const put = inject ?? injectScript;
  loading = Promise.all([
    Promise.resolve(put('data/geo/cities.js')),
    Promise.resolve(put('data/geo/countries.js')),
  ]).then(() => {
    const root = typeof window !== 'undefined' ? window : globalThis;
    cache = {
      cities: Array.isArray(root.CI_GEO_CITIES) ? root.CI_GEO_CITIES : [],
      countries: root.CI_GEO_COUNTRIES ?? {},
    };
    loading = null;
    return cache;
  }, (err) => {
    loading = null;
    throw err;
  });
  return loading;
}

// Сброс кэша — шов тестов (в браузере не нужен: справочник неизменен).
export function resetGeoCache() {
  cache = null;
  loading = null;
}

// Поиск по справочнику — единый вход region.search(q, catalog) (см. js/region.js):
// отдельной обёртки здесь нет, поведение не дублируется.

// resolveRegion(countryOrCity, catalog) -> {country, region_v2, region_v1, name}|null.
// Принимает ISO2-код, объект-город ({country}) или строку-имя страны/города.
// Страна вне разбиения → region_*: null (честная пометка). Неизвестное → null.
export function resolveRegion(countryOrCity, catalog) {
  if (!catalog) return null;
  const countries = catalog.countries ?? {};
  let country = null;

  if (typeof countryOrCity === 'string') {
    const raw = countryOrCity.trim();
    if (/^[A-Za-z]{2}$/.test(raw) && countries[raw.toUpperCase()]) {
      country = raw.toUpperCase();
    } else {
      const q = raw.toLowerCase();
      country = Object.keys(countries).find((iso) => {
        const c = countries[iso];
        return c.name.ru.toLowerCase() === q || c.name.en.toLowerCase() === q;
      }) ?? null;
      if (!country) {
        const city = (catalog.cities ?? []).find((c) => (
          c.name.ru.toLowerCase() === q || c.name.en.toLowerCase() === q
        ));
        if (city) country = city.country ?? null;
      }
    }
  } else if (countryOrCity && typeof countryOrCity === 'object') {
    country = countryOrCity.country ?? null;
  }

  if (!country) return null;
  const info = countries[country];
  if (!info) return { country, region_v2: null, region_v1: null, name: null };
  return {
    country,
    region_v2: info.region_v2 ?? null,
    region_v1: info.region_v1 ?? null,
    name: info.name ?? null,
  };
}
