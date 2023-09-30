import { config } from 'dotenv'
import { server } from './mocks/server'
import connectToDatabase from './models/database'
import createEarthquakeModel from './models/earthquakeModel'
import createEarthquakeService from './services/earthquakeService'
config()

server.listen()
const seedDatabase = async () => {
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

  await earthquakeService.fetchEarthquakeData()
  const res = await earthquakeService.findEarthquakeData()
  console.log(res)
}

seedDatabase()
