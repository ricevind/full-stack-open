export const stableSort = <T extends { id: string }>(
  entities: Record<string, T>,
  lastSortIds: string[],
  sorter: (a: T, b: T) => number
) => {
  const currentIds = Object.keys(entities);
  const idsWithLastSort = [...new Set([...lastSortIds, ...currentIds])];

  const entitiesList = idsWithLastSort
    .map((id) => entities[id])
    .filter((entity) => entity !== undefined);
  entitiesList.sort(sorter);

  return {
    entitiesList,
    lastSortIds: entitiesList.map(({ id }) => id),
  };
};
