import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';

/** Delete a single event by its ID. */
export const deleteEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = +req.params.id;
      console.log(id);
      // Check id path param is valid
      if (isNaN(id)) {
        const message = `Id ${id} is not a number.`;
        console.info(message);
        return res.status(400).json({ message });
      }

      //get event from db via repository
      const event = await events.getEvent(id);
      //check if event exoists in db
      if (!event) {
        console.info(`Event with ID ${id} not found.`);
        return res.status(404).json('Event not found.');
      }

      // Get event from db via repository
      const eventList = await events.deleteEvent(id);
      // Return eventList
      return res.json(eventList);
    } catch (err) {
      console.error(err);
      return res.status(err.code ?? 500).json({ message: err.message });
    }
  };

// //DELETE
// router.delete('/:id', (req: RequestWithUser, res) => {
//     const id = +req.params.id;
//     if (isNaN(id)) {
//       const message = `ID invalid: not a number.`;
//       console.info(message);
//       return res.status(404).json(message);
//     }
//     const eventIndex = events.findIndex((event) => event.id === id);

//     if (eventIndex === -1) {
//       console.info(`Event with ID ${id} not found.`);
//       return res.status(404).json('Event not found.');
//     }

//     //console.log(eventIndex);

//     const delEvent = events.splice(eventIndex, 1);

//     //return deleted Event
//     return res.json(delEvent);
//   });
