import data from '../mocks/data/earthquakeData'
import connectToDatabase from '../models/database'
import createEarthquakeModel from '../models/earthquakeModel'
import createEarthquakeService from '../services/earthquakeService'

describe('Fetching and storing earthquake data', () => {
  it('should fetch and store earthquake data', async () => {
    const database = connectToDatabase()
    const earthquakeModel = createEarthquakeModel(database)
    const earthquakeService = createEarthquakeService(earthquakeModel)
    await earthquakeService.fetchEarthquakeData()

    const res = await earthquakeService.findEarthquakeData()

    expect(res).toEqual(data)
  })
})
