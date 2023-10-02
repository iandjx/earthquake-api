import {
  DynamoDBContainer,
  StartedDynamoDBContainer,
} from 'testcontainers-dynamodb'
import { server } from '../mocks/server'
import createEarthquakeService, {
  Comparators,
  EarthquakeService,
  calculateMonthlyAverages,
} from '../services/earthquakeService'
import connectToDatabase from '../models/database'
import createEarthquakeModel from '../models/earthquakeModel'
import { formattedData } from '../mocks/data/earthquakeData'
import { GenericContainer, StartedTestContainer } from 'testcontainers'

describe('Earthquake service tests', () => {
  let earthquakeService: EarthquakeService
  jest.setTimeout(120000)

  let startedContainer: StartedDynamoDBContainer
  let redisContainer: StartedTestContainer
  beforeAll(async () => {
    startedContainer = await new DynamoDBContainer().start()
    redisContainer = await new GenericContainer('redis')
      .withExposedPorts(6379)
      .start()

    const database = await connectToDatabase({
      dynamoDbConfig: {
        endpoint: `http://${startedContainer.getContainerIpAddress()}:${startedContainer.getMappedPort(
          DynamoDBContainer.MAPPED_PORT,
        )}`,
        region: 'eu-central-1',
        credentials: {
          accessKeyId: 'dummy',
          secretAccessKey: 'dummy',
        },
      },
      redisConfig: {
        host: redisContainer.getContainerIpAddress(),
        port: redisContainer.getMappedPort(6379),
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
    await redisContainer.stop()
    server.close()
  })

  it('Should fetch and store earthquake data', async () => {
    await earthquakeService.fetchEarthquakeData()
    const res = await earthquakeService.findEarthquakeData()
    await earthquakeService.findEarthquakeData()
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

    const res = await earthquakeService.findEarthquakeData({
      time: { operator: Comparators.lt, value: 1695986854464 },
      magnitude: { operator: Comparators.lt, value: 1 },
    })

    expect(res?.length).toEqual(earthquakes?.length)
  })

  it('Should show average magnitude per month for a given year', async () => {
    await earthquakeService.findEarthquakeData()
    const allData = await earthquakeService.findEarthquakeData()
    if (!allData) {
      return
    }
    const averages = calculateMonthlyAverages(allData, 2023)
    const res = await earthquakeService.getAveMagPerMonth(2023)
    expect(averages).toEqual(res)
  })
})
