import { Database } from './database'

export interface EarthquakeModel {
  saveEarthquakeData: (data: any) => void
  queryEarthquakeData: () => any
}

const createEarthquakeModel = (database: Database) => {
  return {
    saveEarthquakeData: (data: any) => {
      database.data = data
    },
    queryEarthquakeData: () => {
      return database.data
    },
  }
}
export default createEarthquakeModel
