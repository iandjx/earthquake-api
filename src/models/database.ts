import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Earthquake } from '../types'
import EarthquakeSchema from './migrations/earthquakeSchema'

export interface Database {
  data?: Earthquake[]
}

export interface ClientConfig {
  endpoint: string
  region: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
}

const connectToDatabase = async (
  config: ClientConfig,
): Promise<DynamoDBDocumentClient> => {
  const client = new DynamoDBClient(config)
  const docClient = DynamoDBDocumentClient.from(client)

  await migrateTables(client)
  return docClient
}

export default connectToDatabase

const migrateTables = async (client: DynamoDBClient) => {
  await client.send(new CreateTableCommand(EarthquakeSchema))
}
