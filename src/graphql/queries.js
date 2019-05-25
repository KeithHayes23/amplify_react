// eslint-disable
// this is an auto generated file. This will be overwritten

export const getDevice = `query GetDevice($id: ID!) {
  getDevice(id: $id) {
    id
    serialNumber
    group
    deviceId
    activationCode
    activated
    name
    type
    endpoint
    location {
      lon
      lat
    }
  }
}
`;
export const listDevices = `query ListDevices(
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      serialNumber
      group
      deviceId
      activationCode
      activated
      name
      type
      endpoint
      location {
        lon
        lat
      }
    }
    nextToken
  }
}
`;
export const searchDevices = `query SearchDevices(
  $filter: SearchableDeviceFilterInput
  $sort: SearchableDeviceSortInput
  $limit: Int
  $nextToken: Int
) {
  searchDevices(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      serialNumber
      group
      deviceId
      activationCode
      activated
      name
      type
      endpoint
      location {
        lon
        lat
      }
    }
    nextToken
  }
}
`;
