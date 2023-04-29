import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';

//get all Events
export const readEventList =
  (events: EventsRepository): RequestHandler =>
  (req, res) =>
    res.json(events.getEvents());

// get single event from events[] by id
export const readEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  (req, res) => {
    const id = +req.params.id; //typecast anything to number with + (here: req.params is string)

    //check if path param is valid
    if (isNaN(id)) {
      const message = `id ${id} is not a number.`;
      console.info(message);

      return res.status(400).json({ message });
    }

    //get event from db via repository
    const event = events.getEvent(id);

    //check if event exoists in db
    if (!event) {
      console.info(`Event with ID ${id} not found.`);
      return res.status(404).json('Event not found.');
    }

    //return found event
    return res.json(event);
  };
