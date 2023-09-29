import axios from 'axios'
import { EARTHQUAKE_URL } from '../constants'
import { EarthquakeModel } from '../models/earthquakeModel'
import { Earthquake, RawEarthquake } from '../types'

const createEarthquakeService = (earthquakeModel: EarthquakeModel) => {
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
    findEarthquakeData: () => {
      return earthquakeModel.queryEarthquakeData()
    },
  }
}

export default createEarthquakeService
