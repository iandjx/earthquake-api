import { Earthquake } from '../types'
import { Database } from './database'

export interface EarthquakeModel {
  saveEarthquakeData: (data: Earthquake[]) => void
  queryEarthquakeData: () => Earthquake[] | undefined
}

const createEarthquakeModel = (database: Database) => {
  return {
    saveEarthquakeData: (data: Earthquake[]) => {
      database.data = data
    },
    queryEarthquakeData: () => {
      return database.data
    },
  }
}
export default createEarthquakeModel
