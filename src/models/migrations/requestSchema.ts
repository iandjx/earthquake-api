import { Tables } from '../../constants'

const RequestSchema = {
  TableName: Tables.REQUESTS,
  AttributeDefinitions: [
    {
      AttributeName: 'ip',
      AttributeType: 'S',
    },
    {
      AttributeName: 'timestamp',
      AttributeType: 'N',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'ip',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'timestamp',
      KeyType: 'RANGE',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
}

export default RequestSchema
