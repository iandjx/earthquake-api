import axios from 'axios'
import { EARTHQUAKE_URL } from '../constants'

export const fetchEarthquakeData = async () => {
  try {
    const res = await axios.get(EARTHQUAKE_URL)
    return res.data
  } catch (error) {
    return Error('Error fetching earthquake data')
  }
}
