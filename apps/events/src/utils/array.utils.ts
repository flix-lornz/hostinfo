export const byId =
  <T extends { id: string | number }>(id: T['id']) =>
  (event: T) =>
    event.id === id;
