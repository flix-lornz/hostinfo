import { RequestHandler } from 'express';
import { RequestWithUser } from '../models/request-with-user.model';
import { isInfosysEvent } from '../models/infosys-event.model';
import { EventsRepository } from '../services/events.repository';

//create new Event and push it to list of events
export const createEvent =
  (events: EventsRepository): RequestHandler =>
  async (req, res) => {
    const eventDto = req.body; //Dto: Data Transfer Object
    //check if event has a body
    if (!req.body)
      return res.status(400).json({ message: 'Provide a valid event body.' });

    //check if event is valid event
    if (!isInfosysEvent(eventDto))
      return res.status(400).json({ message: 'Event is not valid.' });

    //use repository to create & insert event -> Controller does not care about DB specifics
    const event = await events.createEvent(eventDto);

    return res.status(201).json(event);
  };

// //====PATCH====
// router.patch('/:id', (req: RequestWithUser, res) => {
//     const id = +req.params.id;

//     if (isNaN(id)) {
//       const message = `ID is not a number.`;
//       console.info(message);
//       return res.status(400).json(message);
//     }

//     const eventIndex = events.findIndex((event) => event.id === id);

//     if (eventIndex === -1) {
//       console.info(`Event with ID ${id} not found.`);
//       return res.status(404).json('Event not found.');
//     }

//

//     if (!isInfoSysEvent(updatedEvent)) {
//       return res.status(409).json('Not a valid Event');
//     }

//     events[eventIndex] = updatedEvent;

//     return res.json(updatedEvent);
//   });
