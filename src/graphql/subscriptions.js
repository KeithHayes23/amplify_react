// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateDevice = `subscription OnCreateDevice {
  onCreateDevice {
    id
    serialNumber
    group
    deviceId
    activationCode
    activated
    name
    type
    endpoint
  }
}
`;
export const onUpdateDevice = `subscription OnUpdateDevice {
  onUpdateDevice {
    id
    serialNumber
    group
    deviceId
    activationCode
    activated
    name
    type
    endpoint
  }
}
`;
export const onDeleteDevice = `subscription OnDeleteDevice {
  onDeleteDevice {
    id
    serialNumber
    group
    deviceId
    activationCode
    activated
    name
    type
    endpoint
  }
}
`;
export const onAnySubs = `subscription onAnySubs {
  onDeleteDevice {
    id
    serialNumber
    group
    deviceId
    activationCode
    activated
    name
    type
    endpoint
  },
  onUpdateDevice {
    id
    serialNumber
    group
    deviceId
    activationCode
    activated
    name
    type
    endpoint
  },
  onCreateDevice {
    id
    serialNumber
    group
    deviceId
    activationCode
    activated
    name
    type
    endpoint
  }
}
`;
