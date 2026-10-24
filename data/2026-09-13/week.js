window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.global = {
  "index": 43,
  "delta": 1
};
  s.published = "2026-09-13";
  s.through = "2026-09-13";
  s.methodology = "3.0";
  s.regions_taxonomy = "1.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 5.3;
  s.coverageCriteria = {
  "covered": 41,
  "total": 46,
  "uncovered": [
    "D3.5",
    "D4.2",
    "D9.1",
    "D9.4",
    "D9.5"
  ]
};
  s.recalc = {
  "at": "2026-10-24T17:53:49.402Z",
  "reason": "Еженедельный пересчёт",
  "previous": 43,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "europe": {
    "index": 37,
    "delta": -7,
    "status": "tense",
    "background": false
  },
  "east-asia": {
    "index": 34,
    "delta": 1,
    "status": "tense",
    "background": true
  },
  "middle-east": {
    "index": 42,
    "delta": 2,
    "status": "danger",
    "background": false
  },
  "north-america": {
    "index": 24,
    "delta": 1,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 46,
    "delta": 1,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 43,
    "delta": -1,
    "status": "danger",
    "background": false
  }
};
  s.regions["europe"] = {
  "index": 37,
  "delta": -7,
  "status": "tense",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Массированная атака 8 сентября включала сотни ракет и дронов; в Польше из-за ударов России объявлялись предупреждения об угрозе с воздуха.",
        "en": "The massed attack of 8 September involved hundreds of missiles and drones; Poland issued air-threat warnings because of the Russian strikes."
      },
      "why": {
        "ru": "Перебои в работе неба над союзником НАТО — прямой индикатор приближения конфликта к границам альянса.",
        "en": "Disruptions in the skies over a NATO ally are a direct indicator of the conflict closing in on the alliance’s borders."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "24tv-ua-massirovannaya-ataka-8-sentjabrja-n3137838",
          "title": {
            "ru": "Массированная атака 8 сентября 2026: сколько ракет и дронов запустила Россия",
            "en": "Massed attack on 8 September 2026: how many missiles and drones Russia launched"
          },
          "domain": "24tv.ua",
          "url": "https://24tv.ua/ru/massirovannaja-ataka-8-sentjabrja-2026-goda-skolko-raket-i-dronov-zapustila-rossija_n3137838",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "eurointegration-com-ua-poland-alerts-2026-09-13",
          "title": {
            "ru": "В Польше предупреждали об угрозе с воздуха в связи с атаками РФ на Украину",
            "en": "Poland issued air-threat warnings over Russian strikes on Ukraine"
          },
          "domain": "eurointegration.com.ua",
          "url": "https://www.eurointegration.com.ua/rus/news/2026/09/13/7245356/",
          "publication_date": "2026-09-13",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kp-ru-massirovanny-udar-8-sentyabrya-5299991",
          "title": {
            "ru": "Массированный удар по Украине 8 сентября 2026 года",
            "en": "Massed strike on Ukraine on September 8, 2026"
          },
          "domain": "kp.ru",
          "url": "https://www.kp.ru/daily/277813.4/5299991/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей; Россия в ответ объявила о закрытии генерального консульства Германии в Санкт-Петербурге.",
        "en": "Germany is expelling more than 150 Russian diplomats and their family members; Russia in response announced the closure of Germany’s consulate general in St. Petersburg."
      },
      "why": {
        "ru": "Дипломатический разрыв такого масштаба сокращает каналы связи между столицами в критический момент.",
        "en": "A diplomatic rupture of this scale cuts communication channels between capitals at a critical moment."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "forbes-ru-germany-expels-150-diplomats-568359",
          "title": {
            "ru": "Посольство России сообщило о высылке из Германии 150 дипломатов и членов их семей",
            "en": "Russian embassy reports expulsion of 150 diplomats and their family members from Germany"
          },
          "domain": "forbes.ru",
          "url": "https://www.forbes.ru/society/568359-posol-stvo-rossii-rasskazalo-o-vysylke-iz-germanii-150-diplomatov-i-clenov-ih-semej",
          "publication_date": "2026-09-10",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "unn-ua-germany-expels-150-diplomats-leipzig",
          "title": {
            "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей после инцидента в Лейпциге",
            "en": "Germany expels more than 150 Russian diplomats and their family members following Leipzig incident"
          },
          "domain": "unn.ua",
          "url": "https://unn.ua/en/news/germany-expels-more-than-150-russian-diplomats-and-their-family-members-following-sabotage-in-leipzig",
          "publication_date": "2026-09-10",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "dw-com-german-consulate-closing-a-79149908",
          "title": {
            "ru": "Россия объявила о закрытии генерального консульства Германии в Санкт-Петербурге",
            "en": "Russia announces it is closing Germany's consulate in St. Petersburg"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/russia-announces-it-is-closing-germanys-consulate-in-st-petersburg/a-79149908",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 34,
  "delta": 1,
  "status": "tense",
  "background": true,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР запустила несколько баллистических ракет в сторону Японского моря; сначала был зафиксирован неопознанный снаряд, затем — серия пусков.",
        "en": "The DPRK fired several ballistic missiles toward the Sea of Japan; an unidentified projectile was recorded first, followed by a series of launches."
      },
      "why": {
        "ru": "Серийные пуски повышают напряжённость вокруг Корейского полуострова и требуют координации сил сдерживания.",
        "en": "Serial launches raise tension around the Korean peninsula and require coordination of deterrent forces."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "en-yna-co-kr-nkorea-ballistic-2026-09-12",
          "title": {
            "ru": "КНДР запустила баллистические ракеты, 12 сентября 2026",
            "en": "N. Korea fires ballistic missiles, September 12, 2026"
          },
          "domain": "en.yna.co.kr",
          "url": "https://en.yna.co.kr/view/PYH20260912021500315",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "iz-ru-en-nkorea-missiles-2165769",
          "title": {
            "ru": "Yonhap: КНДР запустила несколько баллистических ракет в сторону Японского моря",
            "en": "Yonhap: North Korea launched several ballistic missiles toward the Sea of Japan"
          },
          "domain": "iz.ru",
          "url": "https://iz.ru/en/2165769/2026-09-12/yonhap-reported-north-korea-launched-several-missiles-towards-sea-japan",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "usnews-com-nkorea-projectile-2026-09-11",
          "title": {
            "ru": "КНДР выпустила неопознанный снаряд в сторону Японского моря, сообщает Рёнхап",
            "en": "North Korea launches unidentified projectile toward East Sea, Yonhap reports"
          },
          "domain": "usnews.com",
          "url": "https://www.usnews.com/news/world/articles/2026-09-11/north-korea-launches-unidentified-projectile-toward-east-sea-yonhap-reports",
          "publication_date": "2026-09-11",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Посол Японии выступил на Совете управляющих МАГАТЭ по применению гарантий к ДКНЯР; генеральный директор МАГАТЭ открыл сентябрьскую сессию Совета управляющих.",
        "en": "Japan’s ambassador addressed the IAEA Board of Governors on safeguards for the DPRK; the IAEA Director General opened the Board’s September session."
      },
      "why": {
        "ru": "Перенос ядерной повестки КНДР на площадку МАГАТЭ закрепляет международный контроль за программой и повышает ставки пусков.",
        "en": "Bringing the DPRK nuclear file to the IAEA board entrenches international oversight of the programme and raises the stakes of launches."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "vie-mission-emb-japan-dprk-safeguards-2026-09-09",
          "title": {
            "ru": "Заявление посла Японии Кайфу Ацуши на Совете управляющих МАГАТЭ по ДКНЯР, 9 сентября 2026",
            "en": "Statement by Ambassador KAIFU Atsushi at the IAEA Board of Governors, DPRK safeguards, 9 September 2026"
          },
          "domain": "vie-mission.emb-japan.go.jp",
          "url": "https://www.vie-mission.emb-japan.go.jp/itprtop_en/11_000001_00769.html",
          "publication_date": "2026-09-09",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "iaea-org-dg-statement-board-7-september-2026",
          "title": {
            "ru": "МАГАТЭ: вступительное заявление генерального директора на Совете управляющих, 7 сентября 2026",
            "en": "IAEA Director General's Introductory Statement to the Board of Governors, 7 September 2026"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/statements/iaea-director-generals-introductory-statement-to-the-board-of-governors-7-september-2026",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["middle-east"] = {
  "index": 42,
  "delta": 2,
  "status": "danger",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Совет управляющих МАГАТЭ принял резолюцию по выполнению соглашения о гарантиях НПТ с Ираном; заседание сопровождалось заявлениями сторон.",
        "en": "The IAEA Board of Governors adopted a resolution on implementation of the NPT safeguards agreement with Iran; the session was accompanied by statements from the parties."
      },
      "why": {
        "ru": "Формальная резолюция по иранским гарантиям повышает давление на Тегеран и усиливает неопределённость вокруг ядерной программы региона.",
        "en": "A formal resolution on Iran’s safeguards raises pressure on Tehran and adds uncertainty around the region’s nuclear programme."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "gov-uk-iaea-iran-resolution-september-2026",
          "title": {
            "ru": "Резолюция Совета управляющих МАГАТЭ по гарантиям НПТ с Ираном, сентябрь 2026",
            "en": "NPT Safeguards Agreement with Iran: Resolution to the IAEA Board of Governors, September 2026"
          },
          "domain": "gov.uk",
          "url": "https://www.gov.uk/government/speeches/npt-safeguards-agreement-with-iran-resolution-to-the-iaea-board-of-governors-september-2026",
          "publication_date": "2026-09-10",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "iranwatch-org-iaea-board-resolution-september-2026",
          "title": {
            "ru": "Резолюция Совета управляющих МАГАТЭ: выполнение соглашения о гарантиях НПТ с Ираном, сентябрь 2026",
            "en": "IAEA Board Resolution: Implementation of the NPT Safeguards Agreement with Iran, September 2026"
          },
          "domain": "iranwatch.org",
          "url": "https://www.iranwatch.org/library/multilateral-organizations/international-atomic-energy-agency/iaea-resolution/iaea-board-resolution-implementation-npt-safeguards-agreement-0",
          "publication_date": "2026-09-09",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "iaea-org-dg-statement-board-7-september-2026",
          "title": {
            "ru": "МАГАТЭ: вступительное заявление генерального директора на Совете управляющих, 7 сентября 2026",
            "en": "IAEA Director General's Introductory Statement to the Board of Governors, 7 September 2026"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/statements/iaea-director-generals-introductory-statement-to-the-board-of-governors-7-september-2026",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Хуситы захватили остров Перим в Красном море; США и Иран перешли к атакам на танкеры в ответ на военные корабли; нефть Brent подорожала выше 100 долларов.",
        "en": "The Houthis seized Perim island in the Red Sea; the United States and Iran moved to attacking tankers in response to military ships; Brent crude rose above USD 100."
      },
      "why": {
        "ru": "Перехват контроля в районе пролива и переход к атакам на танкеры угрожают одному из ключевых энергетических маршрутов мира.",
        "en": "Seizing control near the strait and moving to attacks on tankers threatens one of the world’s key energy routes."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "news-usni-org-houthis-perim-red-sea-2026-09-11",
          "title": {
            "ru": "Хуситы захватили остров Перим; США и Иран переходят к танкерам против военных кораблей",
            "en": "Houthis Make Moves on Red Sea, U.S., Iran Go Tanker for Warship"
          },
          "domain": "news.usni.org",
          "url": "https://news.usni.org/2026/09/11/houthis-make-moves-on-red-sea-u-s-iran-go-tanker-for-warship",
          "publication_date": "2026-09-11",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
          "title": {
            "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
            "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
          },
          "domain": "sergeytereshkin.co.uk",
          "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 24,
  "delta": 1,
  "status": "tense",
  "background": true,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Эмиссары Трампа Уиткофф и Кушнер ведут переговоры между Украиной и Россией; на фоне шаттл-дипломатии по Киеву ударили баллистическими ракетами.",
        "en": "Trump’s envoys Witkoff and Kushner are conducting talks between Ukraine and Russia; amid the shuttle diplomacy, Kyiv was hit by ballistic missiles."
      },
      "why": {
        "ru": "Американская посредническая линия остаётся главным каналом деэскалации, но удары в дни переговоров ограничивают её пространство.",
        "en": "The American mediation track remains the main channel for de-escalation, but strikes on the days of talks limit its room."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "independent-co-uk-witkoff-kushner-talks-b3045408",
          "title": {
            "ru": "Украина — Россия: эмиссары Трампа ведут переговоры, по Киеву ударили баллистическими ракетами",
            "en": "Ukraine–Russia war: Trump's envoys in talks as Kyiv hit by ballistic missiles"
          },
          "domain": "independent.co.uk",
          "url": "https://www.independent.co.uk/news/world/europe/ukraine-russia-war-live-trump-putin-zelensky-talks-witkoff-kushner-b3045408.html",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kp-ru-massirovanny-udar-8-sentyabrya-5299991",
          "title": {
            "ru": "Массированный удар по Украине 8 сентября 2026 года",
            "en": "Massed strike on Ukraine on September 8, 2026"
          },
          "domain": "kp.ru",
          "url": "https://www.kp.ru/daily/277813.4/5299991/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Brent подорожала выше 100 долларов после роста на 7 %; в США дизель дороже шести долларов; цены на бензин в регионах стабилизировались.",
        "en": "Brent rose above USD 100 after a 7% jump; diesel cost more than six dollars in the United States; petrol prices in Russian regions stabilised."
      },
      "why": {
        "ru": "Скачок цен на энергоносители напрямую бьёт по американской экономике и усиливает внимание к маршрутам поставок.",
        "en": "The spike in energy prices directly hits the US economy and sharpens attention on supply routes."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
          "title": {
            "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
            "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
          },
          "domain": "sergeytereshkin.co.uk",
          "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "mentoday-ru-benzin-azs-2026-09-08",
          "title": {
            "ru": "Цены устаканились, очереди на АЗС сокращаются: что происходит с бензином в регионах и что будет осенью",
            "en": "Fuel prices stabilise, gas station queues shrink: what is happening with petrol in Russian regions"
          },
          "domain": "mentoday.ru",
          "url": "https://www.mentoday.ru/life/news/08-09-2026/ceny-ustakanilis-ocheredi-na-azs-sokrashchayutsya-chto-proishodit-s-benzinom-v-regionah-i-chto-budet-osenyu/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 46,
  "delta": 1,
  "status": "danger",
  "background": true,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В России впервые не выпустили за границу военнообязанного запаса по решению военкомата — подтверждено тремя независимыми изданиями; Зеленский заявляет о планах России привлечь ещё около 300 тысяч военнослужащих.",
        "en": "Russia for the first time barred a reservist from leaving the country by a draft-board decision, confirmed by three independent outlets; Zelensky says Russia plans to recruit about 300,000 more troops."
      },
      "why": {
        "ru": "Наращивание мобилизационного ресурса меняет долгосрочный баланс сил в регионе и влияет на расчёты соседей.",
        "en": "Expanding the mobilisation resource changes the long-term balance of power in the region and shapes neighbours’ calculations."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "ru-themoscowtimes-com-zapasnik-vyezd-a205473",
          "title": {
            "ru": "В России начали ограничивать выезд запасников за границу по решению военкоматов",
            "en": "Russia begins restricting reservists' exit from country by military commissariat decisions"
          },
          "domain": "ru.themoscowtimes.com",
          "url": "https://ru.themoscowtimes.com/2026/09/07/v-rossii-nachali-ogranichivat-viezd-zapasnikov-za-granitsu-po-resheniyu-voenkomatov-a205473",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "nv-ua-zapret-vyezda-zapasniku-50639309",
          "title": {
            "ru": "В России впервые не выпустили за границу военнообязанного запаса по решению военкомата",
            "en": "Russia for first time bars military reservist from leaving country by military commissariat decision"
          },
          "domain": "nv.ua",
          "url": "https://nv.ua/world/countries/mobilizaciya-v-rossii-vpervye-voennoobyazannomu-zapasa-zapretili-vyezd-po-resheniyu-voenkomata-50639309.html",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "24tv-ua-mobilizacija-300-tysjach-n3138153",
          "title": {
            "ru": "Зеленский заявил о планах России привлечь ещё 300 тысяч военнослужащих",
            "en": "Zelensky says Russia plans to bring in 300,000 more troops"
          },
          "domain": "24tv.ua",
          "url": "https://24tv.ua/ru/mobilizacija-v-rossii-v-sentjabre-2026-goda-rossija-planiruet-otpravit-na-front-300-tysjach-chelovek_n3138153",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Цены на бензин в российских регионах стабилизировались, очереди на заправках сокращаются; мировые нефтяные цены при этом растут.",
        "en": "Petrol prices in Russian regions stabilised and queues at filling stations are shrinking; global oil prices are rising meanwhile."
      },
      "why": {
        "ru": "Разнонаправленные сигналы на топливных рынках удерживают неопределённость для импортозависимых экономик Южной Азии.",
        "en": "Mixed signals in fuel markets keep uncertainty high for import-dependent South Asian economies."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "mentoday-ru-benzin-azs-2026-09-08",
          "title": {
            "ru": "Цены устаканились, очереди на АЗС сокращаются: что происходит с бензином в регионах и что будет осенью",
            "en": "Fuel prices stabilise, gas station queues shrink: what is happening with petrol in Russian regions"
          },
          "domain": "mentoday.ru",
          "url": "https://www.mentoday.ru/life/news/08-09-2026/ceny-ustakanilis-ocheredi-na-azs-sokrashchayutsya-chto-proishodit-s-benzinom-v-regionah-i-chto-budet-osenyu/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
          "title": {
            "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
            "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
          },
          "domain": "sergeytereshkin.co.uk",
          "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 43,
  "delta": -1,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Хуситы захватили остров Перим в Красном море; морские маршруты вдоль восточного побережья Африки несут растущие страховые издержки.",
        "en": "The Houthis seized Perim island in the Red Sea; sea routes along Africa’s eastern coast face rising insurance costs."
      },
      "why": {
        "ru": "Нестабильность в Красном море ударяет по торговле и снабжению восточной Африки через фрахт и страхование.",
        "en": "Red Sea instability hits East African trade and supply through freight and insurance."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "news-usni-org-houthis-perim-red-sea-2026-09-11",
          "title": {
            "ru": "Хуситы захватили остров Перим; США и Иран переходят к танкерам против военных кораблей",
            "en": "Houthis Make Moves on Red Sea, U.S., Iran Go Tanker for Warship"
          },
          "domain": "news.usni.org",
          "url": "https://news.usni.org/2026/09/11/houthis-make-moves-on-red-sea-u-s-iran-go-tanker-for-warship",
          "publication_date": "2026-09-11",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
          "title": {
            "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
            "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
          },
          "domain": "sergeytereshkin.co.uk",
          "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Brent подорожала выше 100 долларов; рост цен на энергоносители повышает издержки импортёров.",
        "en": "Brent rose above USD 100; higher energy prices raise costs for importers."
      },
      "why": {
        "ru": "Дорогая энергия и логистика сокращают ресурсы африканских экономик на продовольствие и гуманитарные программы.",
        "en": "Expensive energy and logistics drain African economies’ resources for food and humanitarian programmes."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
          "title": {
            "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
            "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
          },
          "domain": "sergeytereshkin.co.uk",
          "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "mentoday-ru-benzin-azs-2026-09-08",
          "title": {
            "ru": "Цены устаканились, очереди на АЗС сокращаются: что происходит с бензином в регионах и что будет осенью",
            "en": "Fuel prices stabilise, gas station queues shrink: what is happening with petrol in Russian regions"
          },
          "domain": "mentoday.ru",
          "url": "https://www.mentoday.ru/life/news/08-09-2026/ceny-ustakanilis-ocheredi-na-azs-sokrashchayutsya-chto-proishodit-s-benzinom-v-regionah-i-chto-budet-osenyu/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.trend = [
  {
    "date": "2026-06-28",
    "value": 56
  },
  {
    "date": "2026-07-05",
    "value": 58
  },
  {
    "date": "2026-07-12",
    "value": 59
  },
  {
    "date": "2026-07-19",
    "value": 59
  },
  {
    "date": "2026-07-26",
    "value": 62
  },
  {
    "date": "2026-08-02",
    "value": 64
  },
  {
    "date": "2026-08-09",
    "value": 65
  },
  {
    "date": "2026-08-16",
    "value": 66
  },
  {
    "date": "2026-08-23",
    "value": 67
  },
  {
    "date": "2026-08-30",
    "value": 51,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-06",
    "value": 42,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-13",
    "value": 43,
    "methodology": "3.0"
  }
];
  // Редакционный сид недели 2026-09-13: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-09-13.json (R55).
s.drivers = [
  {
    "observation": {
      "ru": "8 сентября Россия нанесла массированный удар по Украине сотнями ракет и дронов; в ночь на 9 сентября дроны ударили по пункту пропуска «Староказачье» на границе с Молдовой, погибли два человека; из-за атак России в Польше объявлялись предупреждения об угрозе с воздуха; под обстрелами продолжается эвакуация из Донецкой области.",
      "en": "On 8 September Russia launched a massed strike on Ukraine with hundreds of missiles and drones; on the night of 9 September drones hit the Starokazachye crossing on the Moldovan border, killing two people; Poland issued air-threat warnings because of the Russian attacks; evacuation from Donetsk region continues under shelling."
    },
    "why": {
      "ru": "Удары в непосредственной близости от границ НАТО и Молдовы повышают риск случайного столкновения и распространения конфликта на соседние государства.",
      "en": "Strikes close to the borders of NATO and Moldova raise the risk of an unintended clash and of the conflict spreading to neighbouring states."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "kp-ru-massirovanny-udar-8-sentyabrya-5299991",
        "title": {
          "ru": "Массированный удар по Украине 8 сентября 2026 года",
          "en": "Massed strike on Ukraine on September 8, 2026"
        },
        "domain": "kp.ru",
        "url": "https://www.kp.ru/daily/277813.4/5299991/",
        "publication_date": "2026-09-08",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "24tv-ua-massirovannaya-ataka-8-sentjabrja-n3137838",
        "title": {
          "ru": "Массированная атака 8 сентября 2026: сколько ракет и дронов запустила Россия",
          "en": "Massed attack on 8 September 2026: how many missiles and drones Russia launched"
        },
        "domain": "24tv.ua",
        "url": "https://24tv.ua/ru/massirovannaja-ataka-8-sentjabrja-2026-goda-skolko-raket-i-dronov-zapustila-rossija_n3137838",
        "publication_date": "2026-09-08",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "esp-md-drony-kpp-starokazache-2026-09-09",
        "title": {
          "ru": "Дроны ударили по КПП Староказачье на границе с Молдовой: есть погибшие и раненые",
          "en": "Drones strike Starokazachye checkpoint on Moldova border: dead and injured reported"
        },
        "domain": "esp.md",
        "url": "https://esp.md/ru/sobytiya/2026/09/09/drony-udarili-po-kpp-starokazache-na-granice-s-moldovoy-est-pogibshie-i-ranenye",
        "publication_date": "2026-09-09",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "eurointegration-com-ua-poland-alerts-2026-09-13",
        "title": {
          "ru": "В Польше предупреждали об угрозе с воздуха в связи с атаками РФ на Украину",
          "en": "Poland issued air-threat warnings over Russian strikes on Ukraine"
        },
        "domain": "eurointegration.com.ua",
        "url": "https://www.eurointegration.com.ua/rus/news/2026/09/13/7245356/",
        "publication_date": "2026-09-13",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "zdg-md-evakuaciya-doneckaya-oblast-2026-09-12",
        "title": {
          "ru": "Под обстрелами — с детьми, кошками и холодильниками: как проходит эвакуация из Донецкой области",
          "en": "Under shelling — with children, cats and refrigerators: how evacuation from Donetsk region proceeds"
        },
        "domain": "zdg.md",
        "url": "https://www.zdg.md/ru/pod-obstrelami-s-detmi-koshkami-i-holodilnikami-kak-prohodit-evakuacziya-iz-doneczkoj-oblasti/",
        "publication_date": "2026-09-12",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ],
    "label": {
      "ru": "Массированный удар 8 сентября и атака дрона на границе с Молдовой",
      "en": "Massed strike of 8 September and drone attack on the Moldovan border"
    }
  },
  {
    "observation": {
      "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей после инцидента в Лейпциге — сообщают и российское посольство, и украинские издания; ЕС готовит пакет до 1600 листингов по российскому ВПК; Россия объявила о закрытии генерального консульства Германии в Санкт-Петербурге; эмиссары Трампа ведут переговоры без видимого итога.",
      "en": "Germany is expelling more than 150 Russian diplomats and their family members after the Leipzig incident, reported both by the Russian embassy and Ukrainian outlets; the EU is preparing a package of up to 1,600 listings targeting Russia’s defence industry; Russia announced the closure of Germany’s consulate general in St. Petersburg; Trump’s envoys are conducting talks without a visible outcome."
    },
    "why": {
      "ru": "Взаимные дипломатические меры такого масштаба закрепляют конфронтацию и делают возврат к переговорам дороже.",
      "en": "Reciprocal diplomatic measures of this scale entrench confrontation and make a return to talks costlier."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "forbes-ru-germany-expels-150-diplomats-568359",
        "title": {
          "ru": "Посольство России сообщило о высылке из Германии 150 дипломатов и членов их семей",
          "en": "Russian embassy reports expulsion of 150 diplomats and their family members from Germany"
        },
        "domain": "forbes.ru",
        "url": "https://www.forbes.ru/society/568359-posol-stvo-rossii-rasskazalo-o-vysylke-iz-germanii-150-diplomatov-i-clenov-ih-semej",
        "publication_date": "2026-09-10",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "unn-ua-germany-expels-150-diplomats-leipzig",
        "title": {
          "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей после инцидента в Лейпциге",
          "en": "Germany expels more than 150 Russian diplomats and their family members following Leipzig incident"
        },
        "domain": "unn.ua",
        "url": "https://unn.ua/en/news/germany-expels-more-than-150-russian-diplomats-and-their-family-members-following-sabotage-in-leipzig",
        "publication_date": "2026-09-10",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "legal500-com-weekly-sanctions-update-2026-09-08",
        "title": {
          "ru": "Еженедельный обзор санкций, 8 сентября 2026: ЕС готовит пакет до 1600 листингов по ВПК России",
          "en": "Weekly Sanctions Update: September 8, 2026"
        },
        "domain": "legal500.com",
        "url": "https://www.legal500.com/intelligence/global/government-public-sector/weekly-sanctions-update-september-8-2026",
        "publication_date": "2026-09-08",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "dw-com-german-consulate-closing-a-79149908",
        "title": {
          "ru": "Россия объявила о закрытии генерального консульства Германии в Санкт-Петербурге",
          "en": "Russia announces it is closing Germany's consulate in St. Petersburg"
        },
        "domain": "dw.com",
        "url": "https://www.dw.com/en/russia-announces-it-is-closing-germanys-consulate-in-st-petersburg/a-79149908",
        "publication_date": "2026-09-07",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "independent-co-uk-witkoff-kushner-talks-b3045408",
        "title": {
          "ru": "Украина — Россия: эмиссары Трампа ведут переговоры, по Киеву ударили баллистическими ракетами",
          "en": "Ukraine–Russia war: Trump's envoys in talks as Kyiv hit by ballistic missiles"
        },
        "domain": "independent.co.uk",
        "url": "https://www.independent.co.uk/news/world/europe/ukraine-russia-war-live-trump-putin-zelensky-talks-witkoff-kushner-b3045408.html",
        "publication_date": "2026-09-08",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ],
    "label": {
      "ru": "Германия выдворяет дипломатов, ЕС готовит пакет до 1600 листингов",
      "en": "Germany expels diplomats as the EU prepares up to 1,600 listings"
    }
  },
  {
    "observation": {
      "ru": "Минск объявил проверку боеготовности армии, вплоть до мобилизации; белорусские ВВС и ПВО прибыли на полигон Ашулук для второго этапа учений; КНДР запустила несколько баллистических ракет в сторону Японского моря — по данным ЦСС РК, Японии и Рёнхапа.",
      "en": "Minsk announced combat-readiness checks of its army, up to mobilisation; Belarusian air force and air defence arrived at the Ashuluk range for the second phase of exercises; the DPRK fired several ballistic missiles toward the Sea of Japan, according to South Korea’s JCS, Japan and Yonhap."
    },
    "why": {
      "ru": "Одновременные сигналы готовности сил на двух направлениях повышают фоновую напряжённость и требуют постоянного мониторинга от соседей.",
      "en": "Simultaneous readiness signals on two fronts raise background tension and demand constant monitoring by neighbours."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
      {
        "id": "ria-ru-lukashenko-check-readiness-2117062795",
        "title": {
          "ru": "Минск проведёт проверку боеготовности армии, вплоть до мобилизации",
          "en": "Minsk to hold combat readiness checks of the army, up to mobilisation"
        },
        "domain": "ria.ru",
        "url": "https://ria.ru/20260911/lukashenko-2117062795.html",
        "publication_date": "2026-09-11",
        "accessed_date": "2026-09-26",
        "source_type": "primary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "conflictora-ru-belarus-forces-ashuluk-2026-09-08",
        "title": {
          "ru": "Белорусские ВВС и ПВО прибыли на полигон Ашулук для второго этапа учений",
          "en": "Belarusian Air Force and Air Defence arrive at Ashuluk range for second phase of exercises"
        },
        "domain": "conflictora.ru",
        "url": "https://conflictora.ru/news/belorusskie-vvs-i-pvo-pribyli-na-2026-09-08",
        "publication_date": "2026-09-08",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "en-yna-co-kr-nkorea-ballistic-2026-09-12",
        "title": {
          "ru": "КНДР запустила баллистические ракеты, 12 сентября 2026",
          "en": "N. Korea fires ballistic missiles, September 12, 2026"
        },
        "domain": "en.yna.co.kr",
        "url": "https://en.yna.co.kr/view/PYH20260912021500315",
        "publication_date": "2026-09-12",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "iz-ru-en-nkorea-missiles-2165769",
        "title": {
          "ru": "Yonhap: КНДР запустила несколько баллистических ракет в сторону Японского моря",
          "en": "Yonhap: North Korea launched several ballistic missiles toward the Sea of Japan"
        },
        "domain": "iz.ru",
        "url": "https://iz.ru/en/2165769/2026-09-12/yonhap-reported-north-korea-launched-several-missiles-towards-sea-japan",
        "publication_date": "2026-09-12",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "usnews-com-nkorea-projectile-2026-09-11",
        "title": {
          "ru": "КНДР выпустила неопознанный снаряд в сторону Японского моря, сообщает Рёнхап",
          "en": "North Korea launches unidentified projectile toward East Sea, Yonhap reports"
        },
        "domain": "usnews.com",
        "url": "https://www.usnews.com/news/world/articles/2026-09-11/north-korea-launches-unidentified-projectile-toward-east-sea-yonhap-reports",
        "publication_date": "2026-09-11",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ],
    "label": {
      "ru": "Проверка боеготовности Беларуси и пуски КНДР",
      "en": "Belarus combat-readiness checks and DPRK launches"
    }
  }
];
  s.sources = [
  {
    "id": "ria-ru-lukashenko-check-readiness-2117062795",
    "title": {
      "ru": "Минск проведёт проверку боеготовности армии, вплоть до мобилизации",
      "en": "Minsk to hold combat readiness checks of the army, up to mobilisation"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20260911/lukashenko-2117062795.html",
    "publication_date": "2026-09-11",
    "accessed_date": "2026-09-26",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "conflictora-ru-belarus-forces-ashuluk-2026-09-08",
    "title": {
      "ru": "Белорусские ВВС и ПВО прибыли на полигон Ашулук для второго этапа учений",
      "en": "Belarusian Air Force and Air Defence arrive at Ashuluk range for second phase of exercises"
    },
    "domain": "conflictora.ru",
    "url": "https://conflictora.ru/news/belorusskie-vvs-i-pvo-pribyli-na-2026-09-08",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "understandingwar-org-roca-september-12-2026",
    "title": {
      "ru": "ISW: оценка российского наступления, 12 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 12, 2026"
    },
    "domain": "understandingwar.org",
    "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-12-2026/",
    "publication_date": "2026-09-13",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "kp-ru-massirovanny-udar-8-sentyabrya-5299991",
    "title": {
      "ru": "Массированный удар по Украине 8 сентября 2026 года",
      "en": "Massed strike on Ukraine on September 8, 2026"
    },
    "domain": "kp.ru",
    "url": "https://www.kp.ru/daily/277813.4/5299991/",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "24tv-ua-massirovannaya-ataka-8-sentjabrja-n3137838",
    "title": {
      "ru": "Массированная атака 8 сентября 2026: сколько ракет и дронов запустила Россия",
      "en": "Massed attack on 8 September 2026: how many missiles and drones Russia launched"
    },
    "domain": "24tv.ua",
    "url": "https://24tv.ua/ru/massirovannaja-ataka-8-sentjabrja-2026-goda-skolko-raket-i-dronov-zapustila-rossija_n3137838",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "esp-md-drony-kpp-starokazache-2026-09-09",
    "title": {
      "ru": "Дроны ударили по КПП Староказачье на границе с Молдовой: есть погибшие и раненые",
      "en": "Drones strike Starokazachye checkpoint on Moldova border: dead and injured reported"
    },
    "domain": "esp.md",
    "url": "https://esp.md/ru/sobytiya/2026/09/09/drony-udarili-po-kpp-starokazache-na-granice-s-moldovoy-est-pogibshie-i-ranenye",
    "publication_date": "2026-09-09",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "eurointegration-com-ua-moldova-kpp-2026-09-09",
    "title": {
      "ru": "Российские дроны атаковали пограничный пункт на границе Украины и Молдовы",
      "en": "Russian drones attack border checkpoint on Ukraine–Moldova border"
    },
    "domain": "eurointegration.com.ua",
    "url": "https://www.eurointegration.com.ua/rus/news/2026/09/9/7245095/",
    "publication_date": "2026-09-09",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "polskieradio-pl-drony-pogranperehod-moldova-2026-09-09",
    "title": {
      "ru": "Российские дроны атаковали погранпереход Украины и Молдовы: два человека погибли",
      "en": "Russian drones attack Ukraine–Moldova border crossing: two killed"
    },
    "domain": "polskieradio.pl",
    "url": "https://www.polskieradio.pl/397/9770/artykul/3729356,%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B5-%D0%B4%D1%80%D0%BE%D0%BD%D1%8B-%D0%B0%D1%82%D0%B0%D0%BA%D0%BE%D0%B2%D0%B0%D0%BB%D0%B8-%D0%BF%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%8B-%D0%B8-%D0%BC%D0%BE%D0%BB%D0%B4%D0%BE%D0%B2%D1%8B-%D0%B4%D0%B2%D0%B0-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B3%D0%B8%D0%B1%D0%BB%D0%B8",
    "publication_date": "2026-09-09",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "eurointegration-com-ua-poland-alerts-2026-09-13",
    "title": {
      "ru": "В Польше предупреждали об угрозе с воздуха в связи с атаками РФ на Украину",
      "en": "Poland issued air-threat warnings over Russian strikes on Ukraine"
    },
    "domain": "eurointegration.com.ua",
    "url": "https://www.eurointegration.com.ua/rus/news/2026/09/13/7245356/",
    "publication_date": "2026-09-13",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "en-yna-co-kr-nkorea-ballistic-2026-09-12",
    "title": {
      "ru": "КНДР запустила баллистические ракеты, 12 сентября 2026",
      "en": "N. Korea fires ballistic missiles, September 12, 2026"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/PYH20260912021500315",
    "publication_date": "2026-09-12",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "iz-ru-en-nkorea-missiles-2165769",
    "title": {
      "ru": "Yonhap: КНДР запустила несколько баллистических ракет в сторону Японского моря",
      "en": "Yonhap: North Korea launched several ballistic missiles toward the Sea of Japan"
    },
    "domain": "iz.ru",
    "url": "https://iz.ru/en/2165769/2026-09-12/yonhap-reported-north-korea-launched-several-missiles-towards-sea-japan",
    "publication_date": "2026-09-12",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "usnews-com-nkorea-projectile-2026-09-11",
    "title": {
      "ru": "КНДР выпустила неопознанный снаряд в сторону Японского моря, сообщает Рёнхап",
      "en": "North Korea launches unidentified projectile toward East Sea, Yonhap reports"
    },
    "domain": "usnews.com",
    "url": "https://www.usnews.com/news/world/articles/2026-09-11/north-korea-launches-unidentified-projectile-toward-east-sea-yonhap-reports",
    "publication_date": "2026-09-11",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "vie-mission-emb-japan-dprk-safeguards-2026-09-09",
    "title": {
      "ru": "Заявление посла Японии Кайфу Ацуши на Совете управляющих МАГАТЭ по ДКНЯР, 9 сентября 2026",
      "en": "Statement by Ambassador KAIFU Atsushi at the IAEA Board of Governors, DPRK safeguards, 9 September 2026"
    },
    "domain": "vie-mission.emb-japan.go.jp",
    "url": "https://www.vie-mission.emb-japan.go.jp/itprtop_en/11_000001_00769.html",
    "publication_date": "2026-09-09",
    "accessed_date": "2026-09-26",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "gov-uk-iaea-iran-resolution-september-2026",
    "title": {
      "ru": "Резолюция Совета управляющих МАГАТЭ по гарантиям НПТ с Ираном, сентябрь 2026",
      "en": "NPT Safeguards Agreement with Iran: Resolution to the IAEA Board of Governors, September 2026"
    },
    "domain": "gov.uk",
    "url": "https://www.gov.uk/government/speeches/npt-safeguards-agreement-with-iran-resolution-to-the-iaea-board-of-governors-september-2026",
    "publication_date": "2026-09-10",
    "accessed_date": "2026-09-26",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "iranwatch-org-iaea-board-resolution-september-2026",
    "title": {
      "ru": "Резолюция Совета управляющих МАГАТЭ: выполнение соглашения о гарантиях НПТ с Ираном, сентябрь 2026",
      "en": "IAEA Board Resolution: Implementation of the NPT Safeguards Agreement with Iran, September 2026"
    },
    "domain": "iranwatch.org",
    "url": "https://www.iranwatch.org/library/multilateral-organizations/international-atomic-energy-agency/iaea-resolution/iaea-board-resolution-implementation-npt-safeguards-agreement-0",
    "publication_date": "2026-09-09",
    "accessed_date": "2026-09-26",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "iaea-org-dg-statement-board-7-september-2026",
    "title": {
      "ru": "МАГАТЭ: вступительное заявление генерального директора на Совете управляющих, 7 сентября 2026",
      "en": "IAEA Director General's Introductory Statement to the Board of Governors, 7 September 2026"
    },
    "domain": "iaea.org",
    "url": "https://www.iaea.org/newscenter/statements/iaea-director-generals-introductory-statement-to-the-board-of-governors-7-september-2026",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-26",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "forbes-ru-germany-expels-150-diplomats-568359",
    "title": {
      "ru": "Посольство России сообщило о высылке из Германии 150 дипломатов и членов их семей",
      "en": "Russian embassy reports expulsion of 150 diplomats and their family members from Germany"
    },
    "domain": "forbes.ru",
    "url": "https://www.forbes.ru/society/568359-posol-stvo-rossii-rasskazalo-o-vysylke-iz-germanii-150-diplomatov-i-clenov-ih-semej",
    "publication_date": "2026-09-10",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "unn-ua-germany-expels-150-diplomats-leipzig",
    "title": {
      "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей после инцидента в Лейпциге",
      "en": "Germany expels more than 150 Russian diplomats and their family members following Leipzig incident"
    },
    "domain": "unn.ua",
    "url": "https://unn.ua/en/news/germany-expels-more-than-150-russian-diplomats-and-their-family-members-following-sabotage-in-leipzig",
    "publication_date": "2026-09-10",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "legal500-com-weekly-sanctions-update-2026-09-08",
    "title": {
      "ru": "Еженедельный обзор санкций, 8 сентября 2026: ЕС готовит пакет до 1600 листингов по ВПК России",
      "en": "Weekly Sanctions Update: September 8, 2026"
    },
    "domain": "legal500.com",
    "url": "https://www.legal500.com/intelligence/global/government-public-sector/weekly-sanctions-update-september-8-2026",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "dw-com-german-consulate-closing-a-79149908",
    "title": {
      "ru": "Россия объявила о закрытии генерального консульства Германии в Санкт-Петербурге",
      "en": "Russia announces it is closing Germany's consulate in St. Petersburg"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/en/russia-announces-it-is-closing-germanys-consulate-in-st-petersburg/a-79149908",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "independent-co-uk-witkoff-kushner-talks-b3045408",
    "title": {
      "ru": "Украина — Россия: эмиссары Трампа ведут переговоры, по Киеву ударили баллистическими ракетами",
      "en": "Ukraine–Russia war: Trump's envoys in talks as Kyiv hit by ballistic missiles"
    },
    "domain": "independent.co.uk",
    "url": "https://www.independent.co.uk/news/world/europe/ukraine-russia-war-live-trump-putin-zelensky-talks-witkoff-kushner-b3045408.html",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ru-themoscowtimes-com-zapasnik-vyezd-a205473",
    "title": {
      "ru": "В России начали ограничивать выезд запасников за границу по решению военкоматов",
      "en": "Russia begins restricting reservists' exit from country by military commissariat decisions"
    },
    "domain": "ru.themoscowtimes.com",
    "url": "https://ru.themoscowtimes.com/2026/09/07/v-rossii-nachali-ogranichivat-viezd-zapasnikov-za-granitsu-po-resheniyu-voenkomatov-a205473",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "nv-ua-zapret-vyezda-zapasniku-50639309",
    "title": {
      "ru": "В России впервые не выпустили за границу военнообязанного запаса по решению военкомата",
      "en": "Russia for first time bars military reservist from leaving country by military commissariat decision"
    },
    "domain": "nv.ua",
    "url": "https://nv.ua/world/countries/mobilizaciya-v-rossii-vpervye-voennoobyazannomu-zapasa-zapretili-vyezd-po-resheniyu-voenkomata-50639309.html",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tsn-ua-rossiyan-ostanavlivayut-granitse-3163967",
    "title": {
      "ru": "Россиян начали останавливать на границе: в чём причина",
      "en": "Russians being stopped at the border: what is known"
    },
    "domain": "tsn.ua",
    "url": "https://tsn.ua/ru/svit/rossiyan-nachali-ostanavlivat-na-granitse-v-chem-prichina-3163967.html",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "24tv-ua-mobilizacija-300-tysjach-n3138153",
    "title": {
      "ru": "Зеленский заявил о планах России привлечь ещё 300 тысяч военнослужащих",
      "en": "Zelensky says Russia plans to bring in 300,000 more troops"
    },
    "domain": "24tv.ua",
    "url": "https://24tv.ua/ru/mobilizacija-v-rossii-v-sentjabre-2026-goda-rossija-planiruet-otpravit-na-front-300-tysjach-chelovek_n3138153",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "zdg-md-evakuaciya-doneckaya-oblast-2026-09-12",
    "title": {
      "ru": "Под обстрелами — с детьми, кошками и холодильниками: как проходит эвакуация из Донецкой области",
      "en": "Under shelling — with children, cats and refrigerators: how evacuation from Donetsk region proceeds"
    },
    "domain": "zdg.md",
    "url": "https://www.zdg.md/ru/pod-obstrelami-s-detmi-koshkami-i-holodilnikami-kak-prohodit-evakuacziya-iz-doneczkoj-oblasti/",
    "publication_date": "2026-09-12",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "news-usni-org-houthis-perim-red-sea-2026-09-11",
    "title": {
      "ru": "Хуситы захватили остров Перим; США и Иран переходят к танкерам против военных кораблей",
      "en": "Houthis Make Moves on Red Sea, U.S., Iran Go Tanker for Warship"
    },
    "domain": "news.usni.org",
    "url": "https://news.usni.org/2026/09/11/houthis-make-moves-on-red-sea-u-s-iran-go-tanker-for-warship",
    "publication_date": "2026-09-11",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "mentoday-ru-benzin-azs-2026-09-08",
    "title": {
      "ru": "Цены устаканились, очереди на АЗС сокращаются: что происходит с бензином в регионах и что будет осенью",
      "en": "Fuel prices stabilise, gas station queues shrink: what is happening with petrol in Russian regions"
    },
    "domain": "mentoday.ru",
    "url": "https://www.mentoday.ru/life/news/08-09-2026/ceny-ustakanilis-ocheredi-na-azs-sokrashchayutsya-chto-proishodit-s-benzinom-v-regionah-i-chto-budet-osenyu/",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
    "title": {
      "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
      "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
    },
    "domain": "sergeytereshkin.co.uk",
    "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
    "publication_date": "2026-09-12",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "sputnik-by-apostol-sbu-posolstvo-britanii-2026-09-10",
    "title": {
      "ru": "ФСБ сообщила о задержании бывшего сотрудника охраны посольства Великобритании в Москве, агента СБУ",
      "en": "FSB reports detention of former UK embassy security employee, alleged SBU agent"
    },
    "domain": "sputnik.by",
    "url": "https://sputnik.by/20260910/apostol-sbu-chto-izvestno-o-kuratore-podgotovki-terakta-v-posolstve-britanii-1110661872.html",
    "publication_date": "2026-09-10",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "techora-ru-massovyy-sboy-interneta-2026-09-06",
    "title": {
      "ru": "6 сентября — массовый сбой интернета в России; среди причин названы учения по автономности Рунета",
      "en": "September 6: mass internet outage in Russia; Runet autonomy exercises cited among causes"
    },
    "domain": "techora.ru",
    "url": "https://techora.ru/news/6-sentyabrya-massovyy-sboy-interneta-v-2026-09-06",
    "publication_date": "2026-09-06",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-red-sea-houthis-bab-mandeb",
    "title": {
      "ru": "Страны Красного моря наблюдают, как хуситы захватывают Баб-эль-Мандебский пролив",
      "en": "Red Sea nations watch as Houthis seize Bab al-Mandeb strait"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/economy/2026/9/13/red-sea-nations-watch-as-houthis-seize-bab-al-mandeb-strait",
    "publication_date": "2026-09-13",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "wapo-mozambique-attack-0907",
    "title": {
      "ru": "Среди похищенных после нападения на охотничий лагерь в Мозамбике — гражданин ЮАР",
      "en": "South African among workers abducted after attack on hunting camp in Mozambique"
    },
    "domain": "washingtonpost.com",
    "url": "https://www.washingtonpost.com/world/2026/09/07/mozambique-south-africa-attack-niassa-cabo-delgado/cba94c14-aae1-11f1-b498-8697f35a6743_story.html",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-rsf-foreign-support-0907",
    "title": {
      "ru": "Генпрокурор Судана: внешняя поддержка RSF — главная причина затягивания войны",
      "en": "Foreign support for RSF major reason Sudan war persists: Sudan's prosecutor general"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/africa/foreign-support-for-rsf-major-reason-sudan-war-persists-sudan-s-prosecutor-general/4050152",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  }
];
})();
