import { EarthquakeModel } from '../../../models/earthquakeModel'
import { Earthquake } from '../../../types'
import { Database } from './database'

const createEarthquakeModelStub = (database: Database): EarthquakeModel => {
  return {
    saveEarthquakeData: (data: Earthquake[]) => {
      database.data = data
    },
    queryEarthquakeData: (): Earthquake[] | undefined => {
      return database.data
    },
  }
}
export default createEarthquakeModelStub
