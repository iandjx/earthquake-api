import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  DynamoDBDocumentPaginationConfiguration,
  ScanCommandInput,
  paginateScan,
} from '@aws-sdk/lib-dynamodb'
import { Earthquake } from '../types'
import { chunkArray } from '../utils'
import { Tables } from '../constants'

export interface EarthquakeModel {
  saveEarthquakeData: (data: Earthquake[]) => void
  queryEarthquakeData: (
    size?: number,
    cursor?: { id?: string; time?: number },
  ) => Promise<Earthquake[] | undefined>
}

const createEarthquakeModel = (
  database: DynamoDBDocumentClient,
): EarthquakeModel => {
  return {
    saveEarthquakeData: async (data: Earthquake[]) => {
      const earthquakeChunks = chunkArray(data, 25)

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
      }
    },
    queryEarthquakeData: async (pageSize, cursor) => {
      const paginatorConfig: DynamoDBDocumentPaginationConfiguration = {
        client: database,
        pageSize,
        startingToken: cursor,
      }

      const params: ScanCommandInput = {
        TableName: Tables.EARTHQUAKES,
      }

      const paginator = paginateScan(paginatorConfig, params)

      const page = await paginator.next()

      return page?.value?.Items as Earthquake[] | undefined
    },
  }
}
export default createEarthquakeModel
