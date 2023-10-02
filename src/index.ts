import { config } from 'dotenv'
import express from 'express'
import connectToDatabase from './models/database'
import createRequestModel from './models/requestModel'
import createRequestService from './services/requestService'
import createRequestLogger from './middlewares/requestLogger'
import createEarthquakeModel from './models/earthquakeModel'
import createEarthquakeService from './services/earthquakeService'
import generateEarthquakeRoutes from './routes/earthquake'

config()

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

  const earthquakeModel = createEarthquakeModel(database)
  const earthquakeService = createEarthquakeService(earthquakeModel)

  const requestModel = createRequestModel(database)
  const requestService = createRequestService(requestModel)
  const requestLogger = createRequestLogger(requestService)

  app.use(requestLogger)

  app.use(express.json())

  app.use('/earthquake', generateEarthquakeRoutes(earthquakeService))

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
