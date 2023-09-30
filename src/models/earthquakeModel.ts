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
import { QueryOptions } from '../services/earthquakeService'

export interface EarthquakeModel {
  saveEarthquakeData: (data: Earthquake[]) => void
  queryEarthquakeData: (
    options?: QueryOptions,
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
    queryEarthquakeData: async (options?: QueryOptions) => {
      const paginatorConfig: DynamoDBDocumentPaginationConfiguration = {
        client: database,
        pageSize: options?.pagination?.size || 20,
        startingToken: options?.pagination?.cursor,
      }

      const params: ScanCommandInput = {
        TableName: Tables.EARTHQUAKES,
        ...(options?.magnitude && {
          FilterExpression: `#mag ${options?.magnitude?.operator} :magValue`,
          ExpressionAttributeNames: {
            '#mag': 'mag',
          },
          ExpressionAttributeValues: {
            ':magValue': options?.magnitude?.value, // Replace with your desired magnitude value
          },
        }),
      }

      const paginator = paginateScan(paginatorConfig, params)

      const page = await paginator.next()

      return page?.value?.Items as Earthquake[] | undefined
    },
  }
}
export default createEarthquakeModel
