export interface InfosysEvent {
  id: number;
  name: string;
  description: string;
  author: string;
  date: string;
}

/** Assert an object is of type InfosysEvent. */
export const isInfosysEvent = (
  maybeEvent: InfosysEvent | null | undefined
): maybeEvent is InfosysEvent => !!maybeEvent?.name;
