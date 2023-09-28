import axios from 'axios'
import { EARTHQUAKE_URL } from '../constants'
import { EarthquakeModel } from '../models/earthquakeModel'

const createEarthquakeService = (earthquakeModel: EarthquakeModel) => {
  return {
    fetchEarthquakeData: async () => {
      try {
        const res = await axios.get(EARTHQUAKE_URL)
        earthquakeModel.saveEarthquakeData(res.data)
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
