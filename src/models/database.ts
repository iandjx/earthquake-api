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
  // const command = new PutCommand({
  //   TableName: 'Earthquakes',
  //   Item: {
  //     id: '1',
  //     mag: 1,
  //     time: 1,
  //     place: 'test',
  //   },
  // })

  // await docClient.send(command)

  // const readCommand = new GetCommand({
  //   TableName: 'Earthquakes',
  //   Key: {
  //     id: '1',
  //   },
  // })

  // const res = await docClient.send(readCommand)
  // console.log(res.Item)

  return docClient
}

export default connectToDatabase

const migrateTables = async (client: DynamoDBClient) => {
  await client.send(new CreateTableCommand(EarthquakeSchema))
}
