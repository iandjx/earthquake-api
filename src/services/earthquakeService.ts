import axios from 'axios'
import { EARTHQUAKE_URL } from '../constants'
import { EarthquakeModel } from '../models/earthquakeModel'
import { Earthquake, RawEarthquake } from '../types'

export interface EarthquakeService {
  fetchEarthquakeData: () => Promise<void | Error>
  findEarthquakeData: (
    size?: number,
    cursor?: { id?: string; time?: number },
  ) => Promise<Earthquake[] | undefined>
}

const createEarthquakeService = (
  earthquakeModel: EarthquakeModel,
): EarthquakeService => {
  return {
    fetchEarthquakeData: async () => {
      try {
        const res = await axios.get(EARTHQUAKE_URL)
        const formattedData = res.data.map((earthquake: RawEarthquake) => {
          return {
            ...earthquake.properties,
            coordinates: earthquake.geometry.coordinates,
            id: earthquake.id,
          }
        }) as Earthquake[]
        await earthquakeModel.saveEarthquakeData(formattedData)
      } catch (error) {
        return Error('Error fetching earthquake data')
      }
    },
    findEarthquakeData: (size = 20, cursor) => {
      return earthquakeModel.queryEarthquakeData(size, cursor)
    },
  }
}

export default createEarthquakeService
