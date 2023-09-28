import { Earthquake } from '../../types'

const data: Earthquake[] = [
  {
    type: 'Feature',
    properties: {
      mag: 2.71,
      place: 'Puerto Rico region',
      time: 1695883339600,
      updated: 1695883918280,
      tz: null,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/pr71426263',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/pr71426263.geojson',
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: 'reviewed',
      tsunami: 0,
      sig: 113,
      net: 'pr',
      code: '71426263',
      ids: ',pr71426263,',
      sources: ',pr,',
      types: ',origin,phase-data,',
      nst: 13,
      dmin: 0.1613,
      rms: 0.25,
      gap: 197,
      magType: 'md',
      type: 'earthquake',
      title: 'M 2.7 - Puerto Rico region',
    },
    geometry: {
      type: 'Point',
      coordinates: [-66.289, 17.9341666666667, 13.41],
    },
    id: 'pr71426263',
  },
]

export default data
