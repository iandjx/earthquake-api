import { Earthquake } from '../../../types'

export interface Database {
  data?: Earthquake[]
}

const connectToDatabaseStub = (): Database => {
  return {}
}
export default connectToDatabaseStub
