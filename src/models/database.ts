import { Earthquake } from '../types'

export interface Database {
  data?: Earthquake[]
}

const connectToDatabase = (): Database => {
  return {}
}
export default connectToDatabase
