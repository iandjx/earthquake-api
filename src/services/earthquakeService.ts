import axios from 'axios'
import { EARTHQUAKE_URL } from '../constants'
import { EarthquakeModel } from '../models/earthquakeModel'
import { Earthquake, RawEarthquake } from '../types'
import dayjs from 'dayjs'

export enum Comparators {
  gt = '>',
  lt = '<',
  eq = '=',
}
export interface QueryOptions {
  time?: {
    operator: Comparators
    value: number
  }
  magnitude?: {
    operator: Comparators
    value: number
  }
}
export interface QueryOptions {
  time?: {
    operator: Comparators
    value: number
  }
  magnitude?: {
    operator: Comparators
    value: number
  }
  pagination?: {
    size?: number
    cursor?: { id?: string; time?: number }
  }
}

export interface EarthquakeService {
  fetchEarthquakeData: () => Promise<void | Error>
  findEarthquakeData: (
    options?: QueryOptions,
  ) => Promise<Earthquake[] | undefined>
  getAveMagPerMonth: (year: number) => Promise<number[]>
}

const createEarthquakeService = (
  earthquakeModel: EarthquakeModel,
): EarthquakeService => {
  return {
    fetchEarthquakeData: async () => {
      try {
        const res = await axios.get(EARTHQUAKE_URL)
        const formattedData = res.data.features.map(
          (earthquake: RawEarthquake) => {
            return {
              ...earthquake.properties,
              coordinates: earthquake.geometry.coordinates,
              id: earthquake.id,
            }
          },
        ) as Earthquake[]
        await earthquakeModel.saveEarthquakeData(formattedData)
      } catch (error) {
        return Error('Error fetching earthquake data')
      }
    },
    findEarthquakeData: (options?: QueryOptions) => {
      return earthquakeModel.queryEarthquakeData(options)
    },
    getAveMagPerMonth: async (year: number) => {
      const earthquakeData = await earthquakeModel.queryEarthquakeData()
      if (!earthquakeData) {
        return []
      }
      const averages = calculateMonthlyAverages(earthquakeData, year)
      return averages
    },
  }
}

export default createEarthquakeService

export const calculateMonthlyAverages = (
  earthquakes: Earthquake[],
  targetYear: number,
): number[] => {
  const monthlyAverages: number[] = new Array(12).fill(0)

  const earthquakeCountsPerMonth: number[] = new Array(12).fill(0)

  earthquakes.forEach((earthquake) => {
    const earthquakeYear = dayjs(earthquake.time).year()

    if (earthquakeYear === targetYear) {
      const earthquakeMonth = dayjs(earthquake.time).month()
      const earthquakeMag = earthquake.mag

      monthlyAverages[earthquakeMonth] += earthquakeMag
      earthquakeCountsPerMonth[earthquakeMonth] += 1
    }
  })

  for (let i = 0; i < 12; i++) {
    if (earthquakeCountsPerMonth[i] !== 0) {
      monthlyAverages[i] /= earthquakeCountsPerMonth[i]
    }
  }

  return monthlyAverages
}
