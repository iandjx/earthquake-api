import data from '../mocks/data/earthquakeData'
import { fetchEarthquakeData } from '../services/earthquakeService'

describe('Fetching and storing earthquake data', () => {
  it('should fetch earthquake data', async () => {
    const res = await fetchEarthquakeData()
    expect(res).toEqual(data)
  })
})
