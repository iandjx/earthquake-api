import { Earthquake, RawEarthquake } from '../../types'

export const data: RawEarthquake[] = [
  {
    type: 'Feature',
    properties: {
      mag: 4.1,
      place: '147 km NNE of Agats, Indonesia',
      time: 1695987672772,
      updated: 1695988805040,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us6000lbnf',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us6000lbnf.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'reviewed',
      tsunami: 0,
      sig: 259,
      net: 'us',
      code: '6000lbnf',
      ids: ',us6000lbnf,',
      sources: ',us,',
      types: ',origin,phase-data,',
      nst: 28,
      dmin: 2.816,
      rms: 0.71,
      gap: 123,
      magType: 'mb',
      type: 'earthquake',
      title: 'M 4.1 - 147 km NNE of Agats, Indonesia',
    },
    geometry: {
      type: 'Point',
      coordinates: [138.4754, -4.2537, 130.7],
    },
    id: 'us6000lbnf',
  },
  {
    type: 'Feature',
    properties: {
      mag: 0.9,
      place: '14 km WNW of Susitna North, Alaska',
      time: 1695987652846,
      updated: 1695987774354,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ak023ci0yup0',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak023ci0yup0.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'automatic',
      tsunami: 0,
      sig: 12,
      net: 'ak',
      code: '023ci0yup0',
      ids: ',ak023ci0yup0,',
      sources: ',ak,',
      types: ',origin,phase-data,',
      nst: null,
      dmin: null,
      rms: 0.63,
      gap: null,
      magType: 'ml',
      type: 'earthquake',
      title: 'M 0.9 - 14 km WNW of Susitna North, Alaska',
    },
    geometry: {
      type: 'Point',
      coordinates: [-150.1117, 62.1967, 24.3],
    },
    id: 'ak023ci0yup0',
  },
  {
    type: 'Feature',
    properties: {
      mag: 1.6,
      place: 'Central Alaska',
      time: 1695986854464,
      updated: 1695986929713,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ak023ci0w0yu',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak023ci0w0yu.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'automatic',
      tsunami: 0,
      sig: 39,
      net: 'ak',
      code: '023ci0w0yu',
      ids: ',ak023ci0w0yu,',
      sources: ',ak,',
      types: ',origin,phase-data,',
      nst: null,
      dmin: null,
      rms: 0.29,
      gap: null,
      magType: 'ml',
      type: 'earthquake',
      title: 'M 1.6 - Central Alaska',
    },
    geometry: {
      type: 'Point',
      coordinates: [-148.3258, 62.0619, 36.5],
    },
    id: 'ak023ci0w0yu',
  },
  {
    type: 'Feature',
    properties: {
      mag: 0.82,
      place: '17 km SSW of Oasis, CA',
      time: 1695986748400,
      updated: 1695986961003,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ci40574352',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci40574352.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'automatic',
      tsunami: 0,
      sig: 10,
      net: 'ci',
      code: '40574352',
      ids: ',ci40574352,',
      sources: ',ci,',
      types: ',nearby-cities,origin,phase-data,scitech-link,',
      nst: 30,
      dmin: 0.1501,
      rms: 0.22,
      gap: 47,
      magType: 'ml',
      type: 'earthquake',
      title: 'M 0.8 - 17 km SSW of Oasis, CA',
    },
    geometry: {
      type: 'Point',
      coordinates: [-116.1921667, 33.334, 10.49],
    },
    id: 'ci40574352',
  },
  {
    type: 'Feature',
    properties: {
      mag: 1.21,
      place: '10 km ENE of San Martin, CA',
      time: 1695986604650,
      updated: 1695986702161,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/nc73943266',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73943266.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'automatic',
      tsunami: 0,
      sig: 23,
      net: 'nc',
      code: '73943266',
      ids: ',nc73943266,',
      sources: ',nc,',
      types: ',nearby-cities,origin,phase-data,',
      nst: 11,
      dmin: 0.04077,
      rms: 0.08,
      gap: 68,
      magType: 'md',
      type: 'earthquake',
      title: 'M 1.2 - 10 km ENE of San Martin, CA',
    },
    geometry: {
      type: 'Point',
      coordinates: [-121.4981689, 37.1038322, 10.15],
    },
    id: 'nc73943266',
  },
  {
    type: 'Feature',
    properties: {
      mag: 2.37,
      place: '11 km SSE of Maria Antonia, Puerto Rico',
      time: 1695986520790,
      updated: 1695988646280,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/pr71426463',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/pr71426463.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'reviewed',
      tsunami: 0,
      sig: 86,
      net: 'pr',
      code: '71426463',
      ids: ',pr71426463,',
      sources: ',pr,',
      types: ',origin,phase-data,',
      nst: 7,
      dmin: 0.09485,
      rms: 0.09,
      gap: 240,
      magType: 'md',
      type: 'earthquake',
      title: 'M 2.4 - 11 km SSE of Maria Antonia, Puerto Rico',
    },
    geometry: {
      type: 'Point',
      coordinates: [-66.8566666666667, 17.8821666666667, 11.2],
    },
    id: 'pr71426463',
  },
  {
    type: 'Feature',
    properties: {
      mag: 1.88,
      place: '0 km NE of Bishop, CA',
      time: 1695986368710,
      updated: 1695986464890,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/nc73943261',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73943261.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'automatic',
      tsunami: 0,
      sig: 54,
      net: 'nc',
      code: '73943261',
      ids: ',nc73943261,',
      sources: ',nc,',
      types: ',nearby-cities,origin,phase-data,',
      nst: 10,
      dmin: 0.1625,
      rms: 0.07,
      gap: 160,
      magType: 'md',
      type: 'earthquake',
      title: 'M 1.9 - 0 km NE of Bishop, CA',
    },
    geometry: {
      type: 'Point',
      coordinates: [-118.390831, 37.3688316, 8.48],
    },
    id: 'nc73943261',
  },
  {
    type: 'Feature',
    properties: {
      mag: 1.6,
      place: '33 km NE of Lake Minchumina, Alaska',
      time: 1695985699803,
      updated: 1695985819768,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ak023ci0rx8c',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak023ci0rx8c.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'automatic',
      tsunami: 0,
      sig: 39,
      net: 'ak',
      code: '023ci0rx8c',
      ids: ',ak023ci0rx8c,',
      sources: ',ak,',
      types: ',origin,phase-data,',
      nst: null,
      dmin: null,
      rms: 0.88,
      gap: null,
      magType: 'ml',
      type: 'earthquake',
      title: 'M 1.6 - 33 km NE of Lake Minchumina, Alaska',
    },
    geometry: {
      type: 'Point',
      coordinates: [-151.9103, 64.124, 6.9],
    },
    id: 'ak023ci0rx8c',
  },
]

export const formattedData: Earthquake[] = [
  {
    mag: 4.1,
    place: '147 km NNE of Agats, Indonesia',
    time: 1695987672772,
    updated: 1695988805040,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us6000lbnf',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us6000lbnf.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'reviewed',
    tsunami: 0,
    sig: 259,
    net: 'us',
    code: '6000lbnf',
    ids: ',us6000lbnf,',
    sources: ',us,',
    types: ',origin,phase-data,',
    nst: 28,
    dmin: 2.816,
    rms: 0.71,
    gap: 123,
    magType: 'mb',
    type: 'earthquake',
    title: 'M 4.1 - 147 km NNE of Agats, Indonesia',
    coordinates: [138.4754, -4.2537, 130.7],
    id: 'us6000lbnf',
  },
  {
    mag: 0.9,
    place: '14 km WNW of Susitna North, Alaska',
    time: 1695987652846,
    updated: 1695987774354,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ak023ci0yup0',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak023ci0yup0.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'automatic',
    tsunami: 0,
    sig: 12,
    net: 'ak',
    code: '023ci0yup0',
    ids: ',ak023ci0yup0,',
    sources: ',ak,',
    types: ',origin,phase-data,',
    nst: null,
    dmin: null,
    rms: 0.63,
    gap: null,
    magType: 'ml',
    type: 'earthquake',
    title: 'M 0.9 - 14 km WNW of Susitna North, Alaska',
    coordinates: [-150.1117, 62.1967, 24.3],
    id: 'ak023ci0yup0',
  },
  {
    mag: 1.6,
    place: 'Central Alaska',
    time: 1695986854464,
    updated: 1695986929713,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ak023ci0w0yu',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak023ci0w0yu.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'automatic',
    tsunami: 0,
    sig: 39,
    net: 'ak',
    code: '023ci0w0yu',
    ids: ',ak023ci0w0yu,',
    sources: ',ak,',
    types: ',origin,phase-data,',
    nst: null,
    dmin: null,
    rms: 0.29,
    gap: null,
    magType: 'ml',
    type: 'earthquake',
    title: 'M 1.6 - Central Alaska',
    coordinates: [-148.3258, 62.0619, 36.5],
    id: 'ak023ci0w0yu',
  },
  {
    mag: 0.82,
    place: '17 km SSW of Oasis, CA',
    time: 1695986748400,
    updated: 1695986961003,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ci40574352',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci40574352.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'automatic',
    tsunami: 0,
    sig: 10,
    net: 'ci',
    code: '40574352',
    ids: ',ci40574352,',
    sources: ',ci,',
    types: ',nearby-cities,origin,phase-data,scitech-link,',
    nst: 30,
    dmin: 0.1501,
    rms: 0.22,
    gap: 47,
    magType: 'ml',
    type: 'earthquake',
    title: 'M 0.8 - 17 km SSW of Oasis, CA',
    coordinates: [-116.1921667, 33.334, 10.49],
    id: 'ci40574352',
  },
  {
    mag: 1.21,
    place: '10 km ENE of San Martin, CA',
    time: 1695986604650,
    updated: 1695986702161,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/nc73943266',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73943266.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'automatic',
    tsunami: 0,
    sig: 23,
    net: 'nc',
    code: '73943266',
    ids: ',nc73943266,',
    sources: ',nc,',
    types: ',nearby-cities,origin,phase-data,',
    nst: 11,
    dmin: 0.04077,
    rms: 0.08,
    gap: 68,
    magType: 'md',
    type: 'earthquake',
    title: 'M 1.2 - 10 km ENE of San Martin, CA',
    coordinates: [-121.4981689, 37.1038322, 10.15],
    id: 'nc73943266',
  },
  {
    mag: 2.37,
    place: '11 km SSE of Maria Antonia, Puerto Rico',
    time: 1695986520790,
    updated: 1695988646280,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/pr71426463',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/pr71426463.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'reviewed',
    tsunami: 0,
    sig: 86,
    net: 'pr',
    code: '71426463',
    ids: ',pr71426463,',
    sources: ',pr,',
    types: ',origin,phase-data,',
    nst: 7,
    dmin: 0.09485,
    rms: 0.09,
    gap: 240,
    magType: 'md',
    type: 'earthquake',
    title: 'M 2.4 - 11 km SSE of Maria Antonia, Puerto Rico',
    coordinates: [-66.8566666666667, 17.8821666666667, 11.2],
    id: 'pr71426463',
  },
  {
    mag: 1.88,
    place: '0 km NE of Bishop, CA',
    time: 1695986368710,
    updated: 1695986464890,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/nc73943261',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73943261.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'automatic',
    tsunami: 0,
    sig: 54,
    net: 'nc',
    code: '73943261',
    ids: ',nc73943261,',
    sources: ',nc,',
    types: ',nearby-cities,origin,phase-data,',
    nst: 10,
    dmin: 0.1625,
    rms: 0.07,
    gap: 160,
    magType: 'md',
    type: 'earthquake',
    title: 'M 1.9 - 0 km NE of Bishop, CA',
    coordinates: [-118.390831, 37.3688316, 8.48],
    id: 'nc73943261',
  },
  {
    mag: 1.6,
    place: '33 km NE of Lake Minchumina, Alaska',
    time: 1695985699803,
    updated: 1695985819768,
    tz: null,
    url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ak023ci0rx8c',
    detail:
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak023ci0rx8c.geojson',
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: 'automatic',
    tsunami: 0,
    sig: 39,
    net: 'ak',
    code: '023ci0rx8c',
    ids: ',ak023ci0rx8c,',
    sources: ',ak,',
    types: ',origin,phase-data,',
    nst: null,
    dmin: null,
    rms: 0.88,
    gap: null,
    magType: 'ml',
    type: 'earthquake',
    title: 'M 1.6 - 33 km NE of Lake Minchumina, Alaska',
    coordinates: [-151.9103, 64.124, 6.9],
    id: 'ak023ci0rx8c',
  },
]
