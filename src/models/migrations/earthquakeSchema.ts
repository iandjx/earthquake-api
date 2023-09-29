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
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  BillingMode: 'PAY_PER_REQUEST',
  GlobalSecondaryIndexes: [
    {
      IndexName: 'MagIndex',
      KeySchema: [
        {
          AttributeName: 'mag',
          KeyType: 'HASH', // GSI Hash Key
        },
        {
          AttributeName: 'id',
          KeyType: 'RANGE', // GSI Range Key (for uniqueness)
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
    {
      IndexName: 'TimeIndex',
      KeySchema: [
        {
          AttributeName: 'time',
          KeyType: 'HASH', // GSI Hash Key
        },
        {
          AttributeName: 'id',
          KeyType: 'RANGE', // GSI Range Key (for uniqueness)
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
  ],
}
export default EarthquakeSchema
