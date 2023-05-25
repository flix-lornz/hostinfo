import { InfosysEvent } from '@hostinfo/events-prisma';

/** Assert an object is of type InfosysEvent. */
export const isInfosysEvent = (
  maybeEvent: InfosysEvent | null | undefined
): maybeEvent is InfosysEvent => !!maybeEvent?.name;
