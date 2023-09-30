import { Tables } from '../../constants'

const EarthquakeSchema = {
  TableName: Tables.EARTHQUAKES,
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
    {
      AttributeName: 'mag',
      AttributeType: 'N',
    },
    {
      AttributeName: 'time',
      AttributeType: 'N',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'time',
      KeyType: 'RANGE',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
  GlobalSecondaryIndexes: [
    {
      IndexName: 'MagIndex',
      KeySchema: [
        {
          AttributeName: 'mag',
          KeyType: 'HASH', // GSI Hash Key
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
  ],
}

export default EarthquakeSchema
