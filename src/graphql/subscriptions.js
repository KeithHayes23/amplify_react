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
    location {
      lon
      lat
    }
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
    location {
      lon
      lat
    }
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
    location {
      lon
      lat
    }
  }
}
`;
export const onCreateGps = `subscription OnCreateGps {
  onCreateGPS {
    lon
    lat
  }
}
`;
export const onUpdateGps = `subscription OnUpdateGps {
  onUpdateGPS {
    lon
    lat
  }
}
`;
export const onDeleteGps = `subscription OnDeleteGps {
  onDeleteGPS {
    lon
    lat
  }
}
`;
