import { RequestModel } from '../models/requestModel'
import { RequestData } from '../types'

export interface RequestService {
  storeRequestData: (request: RequestData) => Promise<void | Error>
  findRequestData: (key: {
    ip: string
    timestamp: number
  }) => Promise<RequestData[] | undefined>
}

const createRequestService = (requestModel: RequestModel): RequestService => {
  return {
    storeRequestData: async (request: RequestData) => {
      await requestModel.saveRequestData(request)
    },
    findRequestData: async (key: { ip: string; timestamp: number }) => {
      return await requestModel.queryRequestData(key)
    },
  }
}

export default createRequestService
