const EARTHQUAKE_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

enum Tables {
  EARTHQUAKES = 'Earthquakes',
  REQUESTS = 'Requests',
}

export { EARTHQUAKE_URL, Tables }
