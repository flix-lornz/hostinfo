import { Router } from 'express';
import { readEvent, readEventList } from '../controllers/read-event.controller';
import { createEvent } from '../controllers/create-event.controller';
import { EventsRepository } from '../services/events.repository';
import { updateEvent } from '../controllers/update-event.controller';
import { deleteEvent } from '../controllers/delete-event.controller';
import { prisma } from '../services/prisma.service';
import { auth } from '../middlewares/auth.middleware';

//create repository for the events and provide database via dependency injection
//...Dependency injection is used to make a class independent of its dependencies...
const eventsRepo = new EventsRepository(prisma);
export const router = Router();

router.use(auth());
router
  .route('/')
  //Get List of Events
  .get(readEventList(eventsRepo))
  //create a new event and add it to list of events
  .post(createEvent(eventsRepo));

router
  .route('/:id')
  //get single event by id
  .get(readEvent(eventsRepo))
  //update a single event by id
  .patch(updateEvent(eventsRepo))
  //delete a single event bz id
  .delete(deleteEvent(eventsRepo));
