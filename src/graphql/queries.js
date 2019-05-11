// eslint-disable
// this is an auto generated file. This will be overwritten

export const getItem = `query GetItem($id: ID!) {
  getItem(id: $id) {
    id
    name
    price
    description
  }
}
`;
export const listItems = `query ListItems(
  $filter: ModelItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      price
      description
    }
    nextToken
  }
}
`;
export const searchItems = `query SearchItems(
  $filter: SearchableItemFilterInput
  $sort: SearchableItemSortInput
  $limit: Int
  $nextToken: Int
) {
  searchItems(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      price
      description
    }
    nextToken
  }
}
`;
