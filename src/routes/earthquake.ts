import express, { Router } from 'express'
import {
  Comparators,
  EarthquakeService,
  QueryOptions,
} from '../services/earthquakeService'

const router: Router = express.Router()

const generateEarthquakeRoutes = (earthquakeService: EarthquakeService) => {
  router.get('/fetch', async (req, res) => {
    try {
      await earthquakeService.fetchEarthquakeData()
      res.status(200).send('Earthquake data fetched successfully')
    } catch (error) {
      res.status(500).send('An error occurred while fetching earthquake data')
    }
  })

  router.get('/find', async (req, res) => {
    const {
      timeOperator,
      timeValue,
      magnitudeOperator,
      magnitudeValue,
      pageSize,
      cursorId,
      cursorTime,
    } = req.query

    const options: QueryOptions = {
      ...(timeOperator &&
        timeValue && {
          time: {
            operator: timeOperator as Comparators,
            value: parseInt(timeValue as string),
          },
        }),
      ...(magnitudeOperator &&
        magnitudeValue && {
          magnitude: {
            operator: magnitudeOperator as Comparators,
            value: parseInt(magnitudeValue as string),
          },
        }),
      ...(cursorId &&
        cursorTime && {
          pagination: {
            cursor: {
              id: cursorId as string,
              time: parseInt(cursorTime as string),
            },
            size: parseInt(pageSize as string),
          },
        }),
    }

    try {
      const earthquakeData = await earthquakeService.findEarthquakeData(options)
      res.status(200).json(earthquakeData)
    } catch (error) {
      res.status(500).send('An error occurred while finding earthquake data')
    }
  })

  router.get('/average-magnitude/:year', async (req, res) => {
    const { year } = req.params
    try {
      const averageMagnitude = await earthquakeService.getAveMagPerMonth(
        parseInt(year),
      )
      res.status(200).json(averageMagnitude)
    } catch (error) {
      res
        .status(500)
        .send('An error occurred while calculating average magnitude')
    }
  })
  return router
}
export default generateEarthquakeRoutes
