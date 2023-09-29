import {
  DynamoDBContainer,
  StartedDynamoDBContainer,
} from 'testcontainers-dynamodb'
import { server } from '../mocks/server'
import createEarthquakeService from '../services/earthquakeService'
import connectToDatabase from '../models/database'
import createEarthquakeModel from '../models/earthquakeModel'
import { formattedData } from '../mocks/data/earthquakeData'

describe('DynamoDB container', () => {
  jest.setTimeout(120000)

  let startedContainer: StartedDynamoDBContainer
  beforeAll(async () => {
    startedContainer = await new DynamoDBContainer().start()
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

  it('should start dynamodb container', async () => {
    const dynamoClient = startedContainer.createDynamoClient()
    expect(await dynamoClient.listTables().promise()).toEqual({
      TableNames: [],
    })
  })

  it('should override data and reset it in dynamodb', async () => {
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
    const earthquakeService = createEarthquakeService(earthquakeModel)
    await earthquakeService.fetchEarthquakeData()
    const res = await earthquakeService.findEarthquakeData()
    expect(res).toEqual(formattedData)
  })
})
