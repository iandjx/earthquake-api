import {
  DynamoDBContainer,
  StartedDynamoDBContainer,
} from 'testcontainers-dynamodb'
import { server } from '../mocks/server'
import createEarthquakeService, {
  Comparators,
  EarthquakeService,
} from '../services/earthquakeService'
import connectToDatabase from '../models/database'
import createEarthquakeModel from '../models/earthquakeModel'
import { formattedData } from '../mocks/data/earthquakeData'

describe('Earthquake service tests', () => {
  let earthquakeService: EarthquakeService
  jest.setTimeout(120000)

  let startedContainer: StartedDynamoDBContainer
  beforeAll(async () => {
    startedContainer = await new DynamoDBContainer().start()
    const database = await connectToDatabase({
      endpoint: `http://${startedContainer.getContainerIpAddress()}:${startedContainer.getMappedPort(
        DynamoDBContainer.MAPPED_PORT,
      )}`,
      region: 'eu-central-1',
      credentials: {
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy',
      },
    })
    const earthquakeModel = createEarthquakeModel(database)
    earthquakeService = createEarthquakeService(earthquakeModel)
    server.listen()
  })

  afterEach(async () => {
    await startedContainer.resetData()
    server.resetHandlers()
  })

  afterAll(async () => {
    await startedContainer.stop()
    server.close()
  })

  it('Should fetch and store earthquake data', async () => {
    await earthquakeService.fetchEarthquakeData()
    const res = await earthquakeService.findEarthquakeData()
    expect(res?.length).toEqual(formattedData.length)
  })

  it('Should allow data pagination', async () => {
    await earthquakeService.fetchEarthquakeData()

    const allData = await earthquakeService.findEarthquakeData()
    const slicedData = allData?.slice(1, 4)
    const cursor = { id: allData?.[0].id, time: allData?.[0].time }

    const res = await earthquakeService.findEarthquakeData({
      pagination: { cursor, size: 3 },
    })

    expect(res).toEqual(slicedData)
  })

  it('Should allow filtering based on mag value', async () => {
    await earthquakeService.fetchEarthquakeData()

    const allData = await earthquakeService.findEarthquakeData()
    const mildEarthquakes = allData?.filter((earthquake) => earthquake.mag < 1)

    const res = await earthquakeService.findEarthquakeData({
      magnitude: { operator: Comparators.lt, value: 1 },
    })

    expect(res?.length).toEqual(mildEarthquakes?.length)
  })

  it('Should allow filtering based on time value', async () => {
    await earthquakeService.fetchEarthquakeData()

    const allData = await earthquakeService.findEarthquakeData()
    const earthquakes = allData?.filter(
      (earthquake) => earthquake.time < 1695986854464,
    )

    const res = await earthquakeService.findEarthquakeData({
      time: { operator: Comparators.lt, value: 1695986854464 },
    })

    expect(res?.length).toEqual(earthquakes?.length)
  })

  it('Should allow filtering based on time and mag value', async () => {
    await earthquakeService.fetchEarthquakeData()

    const allData = await earthquakeService.findEarthquakeData()
    const earthquakes = allData?.filter(
      (earthquake) => earthquake.time < 1695986854464 && earthquake.mag < 1,
    )
    console.log(earthquakes?.length)

    const res = await earthquakeService.findEarthquakeData({
      time: { operator: Comparators.lt, value: 1695986854464 },
      magnitude: { operator: Comparators.lt, value: 1 },
    })

    expect(res?.length).toEqual(earthquakes?.length)
  })
})
