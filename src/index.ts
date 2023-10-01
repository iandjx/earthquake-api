import { config } from 'dotenv'
config()

import express from 'express'
import connectToDatabase from './models/database'
import createRequestModel from './models/requestModel'
import createRequestService from './services/requestService'
import createRequestLogger from './middlewares/requestLogger'

const app = express()
const port = 3000

const main = async () => {
  const database = await connectToDatabase({
    dynamoDbConfig: {
      endpoint: process.env.ENDPOINT as string,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY as string,
        secretAccessKey: process.env.SECRET_KEY as string,
      },
      region: process.env.REGION as string,
    },
    redisConfig: {
      host: process.env.REDIS_HOST as string,
      port: parseInt(process.env.REDIS_PORT as string),
    },
  })
  const requestModel = createRequestModel(database)
  const requestService = createRequestService(requestModel)
  const requestLogger = createRequestLogger(requestService)

  app.use(requestLogger)
  app.get('/', (req, res) => {
    res.send('Hello, Express.js!')
  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
