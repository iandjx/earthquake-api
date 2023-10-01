import {
  DynamoDBContainer,
  StartedDynamoDBContainer,
} from 'testcontainers-dynamodb'
import { server } from '../mocks/server'
import connectToDatabase from '../models/database'
import { GenericContainer, StartedTestContainer } from 'testcontainers'
import createRequestModel from '../models/requestModel'
import createRequestService, {
  RequestService,
} from '../services/requestService'
import dayjs from 'dayjs'
import { RequestData } from '../types'

describe('Earthquake service tests', () => {
  let requestService: RequestService
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
    const requestModel = createRequestModel(database)
    requestService = createRequestService(requestModel)
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

  it('Should store request data', async () => {
    const request: RequestData = {
      ip: '172.412.414.10',
      query: 'magnitute=5.0&time=2021-10-10T10:10:10Z&limit=10',
      path: '/earthquake',
      timestamp: dayjs().unix(),
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      acceptLanguage: 'en-US,en;q=0.5',
    }
    await requestService.storeRequestData(request)
    const requestData = await requestService.findRequestData({
      ip: request.ip,
      timestamp: request.timestamp,
    })
    expect(requestData?.[0]).toEqual(request)
  })
})
