import data from '../mocks/data/earthquakeData'
import connectToDatabaseStub from '../mocks/stubs/models/database'
import createEarthquakeModelStub from '../mocks/stubs/models/earthquakeModel'
import createEarthquakeService from '../services/earthquakeService'

describe('Fetching and storing earthquake data', () => {
  it('should fetch and store earthquake data', async () => {
    const database = connectToDatabaseStub()
    const earthquakeModel = createEarthquakeModelStub(database)
    const earthquakeService = createEarthquakeService(earthquakeModel)
    await earthquakeService.fetchEarthquakeData()

    const res = await earthquakeService.findEarthquakeData()

    expect(res).toEqual(data)
  })
})
