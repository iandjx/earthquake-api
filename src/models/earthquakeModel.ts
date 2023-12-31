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
import Redis from 'ioredis'
import dayjs from 'dayjs'

export interface EarthquakeModel {
  saveEarthquakeData: (data: Earthquake[]) => void
  queryEarthquakeData: (
    options?: QueryOptions,
  ) => Promise<Earthquake[] | undefined>
}

const createEarthquakeModel = (
  database: [DynamoDBDocumentClient, Redis],
): EarthquakeModel => {
  return {
    saveEarthquakeData: async (data: Earthquake[]) => {
      const [docClient] = database
      const earthquakeChunks = chunkArray<Earthquake>(data, 25)

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

        await docClient.send(command)
      }
    },

    queryEarthquakeData: async (options?: QueryOptions) => {
      const [docClient, redisClient] = database
      const redisKey = `earthquake_data_${JSON.stringify(options)}`
      const oneWeekInMilliseconds = dayjs().add(7, 'day').diff(dayjs())

      const lastFetchTimestamp = await redisClient.get(
        `last_fetch_timestamp_${redisKey}`,
      )
      const currentTime = Date.now()

      if (
        !lastFetchTimestamp ||
        currentTime - Number(lastFetchTimestamp) >= oneWeekInMilliseconds
      ) {
        await redisClient.del(redisKey)

        const paginatorConfig: DynamoDBDocumentPaginationConfiguration = {
          client: docClient,
          pageSize: options?.pagination?.size || 20,
          startingToken: options?.pagination?.cursor,
        }

        const params = generateScanCommand(options)

        const paginator = paginateScan(paginatorConfig, params)

        const page = await paginator.next()
        const earthquakeData = page?.value?.Items as Earthquake[] | undefined

        await redisClient.set(redisKey, JSON.stringify(earthquakeData))
        await redisClient.set(
          `last_fetch_timestamp_${redisKey}`,
          String(currentTime),
        )

        return earthquakeData
      }

      const redisData = await redisClient.get(redisKey)
      if (redisData) {
        return JSON.parse(redisData)
      }

      return undefined
    },
  }
}
export default createEarthquakeModel

const generateScanCommand = (queryOptions?: QueryOptions): ScanCommandInput => {
  const params: ScanCommandInput = {
    TableName: Tables.EARTHQUAKES,
  }

  if (queryOptions?.time) {
    params.FilterExpression = `#time ${queryOptions.time.operator} :timeValue`
    params.ExpressionAttributeNames = {
      '#time': 'time',
    }
    params.ExpressionAttributeValues = {
      ':timeValue': queryOptions.time.value,
    }
  }

  if (queryOptions?.magnitude) {
    params.FilterExpression = params.FilterExpression
      ? `${params.FilterExpression} AND #mag ${queryOptions.magnitude.operator} :magValue`
      : `#mag ${queryOptions.magnitude.operator} :magValue`

    params.ExpressionAttributeNames = {
      ...params.ExpressionAttributeNames,
      '#mag': 'mag',
    }

    params.ExpressionAttributeValues = {
      ...params.ExpressionAttributeValues,
      ':magValue': queryOptions.magnitude.value,
    }
  }

  return params
}
