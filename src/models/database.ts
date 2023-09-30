import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Earthquake } from '../types'
import EarthquakeSchema from './migrations/earthquakeSchema'
import Redis from 'ioredis'

export interface Database {
  data?: Earthquake[]
}

export interface ClientConfig {
  dynamoDbConfig: {
    endpoint: string
    region: string
    credentials: {
      accessKeyId: string
      secretAccessKey: string
    }
  }
  redisConfig: {
    host: string
    port: number
  }
}

const connectToDatabase = async (
  config: ClientConfig,
): Promise<[DynamoDBDocumentClient, Redis]> => {
  const client = new DynamoDBClient(config.dynamoDbConfig)
  const docClient = DynamoDBDocumentClient.from(client)
  const redisClient = new Redis(config.redisConfig)

  await migrateTables(client)

  return [docClient, redisClient]
}

export default connectToDatabase

const migrateTables = async (client: DynamoDBClient) => {
  try {
    await client.send(new DescribeTableCommand({ TableName: 'Earthquakes' }))
  } catch (err) {
    await client.send(new CreateTableCommand(EarthquakeSchema))
  }
}
