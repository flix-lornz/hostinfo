import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';
import { BadRequestError } from '@hostinfo/node-common';

/** Update a single event by its ID. */
export const updateEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = +req.params.id;
      // Check id path param is valid
      if (isNaN(id)) {
        const message = `Id ${id} is not a number.`;
        console.info(message);

        return res.status(400).json({ message });
      }

      // const maybeEvent = await events.getEvent(id);
      // //check if event exists in db
      // if (maybeEvent != null) {
      //   const message = `Event with ID ${id} already exists.`;
      //   return res.status(404).json(message);
      // }

      // Check has body
      if (!req.body) throw new BadRequestError();

      // Get event from db via repository
      const event = await events.updateEvent(id, req.body);
      // Return found event
      return res.json(event);
    } catch (err) {
      console.error(err);
      return res.status(err.code ?? 500).json({ message: err.message });
    }
  };
