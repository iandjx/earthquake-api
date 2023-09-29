import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb'
import { Earthquake } from '../types'
import { chunkArray } from '../utils'
import { Tables } from '../constants'

export interface EarthquakeModel {
  saveEarthquakeData: (data: Earthquake[]) => void
  queryEarthquakeData: () => Promise<Earthquake[] | undefined>
}

const createEarthquakeModel = (
  database: DynamoDBDocumentClient,
): EarthquakeModel => {
  return {
    saveEarthquakeData: async (data: Earthquake[]) => {
      const earthquakeChunks = chunkArray(data, 25)
      console.log(earthquakeChunks)

      for (const chunk of earthquakeChunks) {
        const putRequests = chunk.map((earthquake: Earthquake) => ({
          PutRequest: {
            Item: earthquake,
          },
        }))

        const command = new BatchWriteCommand({
          RequestItems: {
            [Tables.EARTHQUAKES]: putRequests,
          },
        })

        await database.send(command)
        console.log('success')
      }
    },
    queryEarthquakeData: async () => {
      const command = new ScanCommand({
        TableName: Tables.EARTHQUAKES,
      })
      const res = await database.send(command)
      console.log(res)
      const Items = res.Items
      console.log(Items, 'items')

      return Items as Earthquake[] | undefined
    },
  }
}
export default createEarthquakeModel
