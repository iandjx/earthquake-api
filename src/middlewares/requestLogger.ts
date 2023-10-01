import { NextFunction, Request, Response } from 'express'
import { RequestData } from '../types'
import dayjs from 'dayjs'
import { RequestService } from '../services/requestService'

const createRequestLogger = (requestService: RequestService) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const requestData: RequestData = {
      path: req.path,
      query: JSON.stringify(req.query),
      timestamp: dayjs().unix(),
      ip:
        (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ??
        Math.random().toString(36).substring(2, 20),
      userAgent: req.headers['user-agent'] as string,
      acceptLanguage: req.headers['accept-language'] as string,
    }
    requestService.storeRequestData(requestData)

    next()
  }
}

export default createRequestLogger
