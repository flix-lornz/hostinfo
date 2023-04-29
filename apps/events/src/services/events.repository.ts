import { InfosysEvent } from '../models/infosys-event.model';
import { byId } from '../utils/array.utils';
import { NotFoundError } from '../utils/status.error';

/**
 * Repository to interact with events database.
 *
 * This is an abstraction over the DB. Ideally when we switch the underlying databse, we only
 * need to adjust his implementation and not the usage within our routers/controllers.
 */
export class EventsRepository {
  /**
   * Provide DB via dependency injection to de-couple the database instance from this repository.
   * Useful for testing since you can provide your own simple mock DB in a test and the real one
   * in production.
   */
  constructor(private db: InfosysEvent[]) {}

  /** Check if an event with ID exists in database. */
  hasEvent(id: InfosysEvent['id']): boolean {
    return this.db.some(byId(id));
  }

  /** Get a single event by ID. */
  getEvent(id: InfosysEvent['id']): InfosysEvent | undefined {
    return this.db.find(byId(id));
  }

  /** Get the list of all events. */
  getEvents(): InfosysEvent[] {
    return this.db;
  }

  /** Create a new event with unique ID and insirt into DB. */
  createEvent(eventDto: Omit<InfosysEvent, 'id'>) {
    const id = this.db.length;
    const event: InfosysEvent = { ...eventDto, id };

    this.db.push(event);

    return event;
  }

  /** Partially update an event by ID. */
  updateEvent(
    id: InfosysEvent['id'],
    eventDto: Partial<InfosysEvent>
  ): InfosysEvent {
    const index = this.db.findIndex((event) => event.id === id);

    if (index < 0) throw new NotFoundError(id);

    // ...(spread operator) copies all properties of the original event this.db[index]
    // and updates/overwrites them with new properties from eventDto
    // updating only keys with different value
    const updatedEvent: InfosysEvent = { ...this.db[index], ...eventDto };
    this.db.splice(index, 1, updatedEvent);

    return updatedEvent;
  }

  /** Delete an event from the database. */
  deleteEvent(id: InfosysEvent['id']): InfosysEvent[] {
    const index = this.db.findIndex((event) => event.id === id);

    if (index < 0) throw new NotFoundError(id);

    this.db.splice(index, 1);

    return this.getEvents();
  }
}
