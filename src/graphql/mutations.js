// eslint-disable
// this is an auto generated file. This will be overwritten

export const createDevice = `mutation CreateDevice($input: CreateDeviceInput!) {
  createDevice(input: $input) {
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
export const updateDevice = `mutation UpdateDevice($input: UpdateDeviceInput!) {
  updateDevice(input: $input) {
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
export const deleteDevice = `mutation DeleteDevice($input: DeleteDeviceInput!) {
  deleteDevice(input: $input) {
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
