import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb'
import { Tables } from '../constants'
import Redis from 'ioredis'
import { RequestData } from '../types'

export interface RequestModel {
  saveRequestData: (data: RequestData) => void
  queryRequestData: (key: {
    ip: string
    timestamp: number
  }) => Promise<RequestData[] | undefined>
}

const createRequestModel = (
  database: [DynamoDBDocumentClient, Redis],
): RequestModel => {
  return {
    saveRequestData: async (data: RequestData) => {
      const [docClient] = database
      const command = new PutCommand({
        TableName: Tables.REQUESTS,
        Item: data,
      })

      await docClient.send(command)
    },
    queryRequestData: async (key: { ip: string; timestamp: number }) => {
      const [docClient] = database

      const command = new QueryCommand({
        TableName: 'Requests',
        KeyConditionExpression: '#ip = :ip AND #timestamp = :timestamp', // Use aliases for attribute names
        ExpressionAttributeNames: {
          '#ip': 'ip', // Define an alias for 'ip'
          '#timestamp': 'timestamp', // Define an alias for 'timestamp'
        },
        ExpressionAttributeValues: {
          ':ip': key.ip,
          ':timestamp': key.timestamp,
        },
        ConsistentRead: true,
      })

      const response = await docClient.send(command)
      return response.Items as RequestData[]
    },
  }
}
export default createRequestModel
