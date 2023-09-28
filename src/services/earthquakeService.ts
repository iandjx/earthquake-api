import axios from 'axios'
import { EARTHQUAKE_URL } from '../constants'

export const fetchEarthquakeData = async () => {
  const res = await axios.get(EARTHQUAKE_URL)

  return res.data
}
