import { InfosysEvent, PrismaClient } from '@hostinfo/events-prisma'; //'@prisma/client';

/**
 * Repository to interact with events database.
 *
 * This is an abstraction over the DB. Ideally when we switch the underlying databse, we only
 * need to adjust his implementation and not the usage within our routers/controllers.
 */
export class EventsRepository {
  private get events() {
    return this.prisma.infosysEvent;
  }

  /**
   * Provide DB via dependency injection to de-couple the database instance from this repository.
   * Useful for testing since you can provide your own simple mock DB in a test and the real one
   * in production.
   */
  constructor(private prisma: PrismaClient) {}

  /** Check if an event with ID exists in database. */
  async hasEvent(id: InfosysEvent['id']): Promise<boolean> {
    //.count returns Prisma.PrismaPromise.
    // promise only in async methods => 'async hasEvent' , 'await this.events...'
    const count = await this.events.count({ where: { id } });
    return count > 0; //returns boolean. Alternative: !!count
  }

  /** Get a single event by ID. */
  getEvent(id: InfosysEvent['id']): Promise<InfosysEvent | null> {
    return this.events.findUnique({ where: { id } });
  }

  /** Get the list of all events. */
  getEvents(): Promise<InfosysEvent[]> {
    return this.events.findMany();
  }

  /** Create a new event with unique ID and insirt into DB. */
  createEvent(eventDto: Omit<InfosysEvent, 'id'>): Promise<InfosysEvent> {
    return this.events.create({ data: eventDto });
  }

  /** Partially update an event by ID. */
  updateEvent(
    id: InfosysEvent['id'],
    eventDto: Partial<InfosysEvent>
  ): Promise<InfosysEvent> {
    return this.events.update({ where: { id }, data: eventDto });

    // // const index = this.db.findIndex((event) => event.id === id);
    // // if (index < 0) throw new NotFoundError(id);
    /**
     *  ...(spread operator) copies all properties of the original event this.db[index]
     * and updates/overwrites them with new properties from eventDto
     * updating only keys with different value
     */
    // const updatedEvent: InfosysEvent = { ...this.db[index], ...eventDto };
    // this.db.splice(index, 1, updatedEvent);
    // return updatedEvent;
  }

  /** Delete an event from the database. */
  async deleteEvent(id: InfosysEvent['id']): Promise<InfosysEvent[]> {
    await this.events.delete({ where: { id } });
    return this.getEvents();

    // const index = this.db.findIndex((event) => event.id === id);
    // if (index < 0) throw new NotFoundError(id);
    // this.db.splice(index, 1);
    // return this.getEvents();
  }
}
