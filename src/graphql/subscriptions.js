// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateItem = `subscription OnCreateItem {
  onCreateItem {
    id
    name
    price
    description
  }
}
`;
export const onUpdateItem = `subscription OnUpdateItem {
  onUpdateItem {
    id
    name
    price
    description
  }
}
`;
export const onDeleteItem = `subscription OnDeleteItem {
  onDeleteItem {
    id
    name
    price
    description
  }
}
`;

export const onAnySubs = `subscription onAnySubs {
  onDeleteItem {
    id
    name
    price
    description
  },
  onUpdateItem {
    id
    name
    price
    description
  },
  onCreateItem {
    id
    name
    price
    description
  }
}
`;
