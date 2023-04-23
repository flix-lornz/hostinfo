import { Router } from 'express';
import { RequestWithUser } from '../models/request-with-user.model';

export const router = Router();

interface InfoSysEvent {
  id: number;
  name: string;
  description: string;
  date: string;
  author: string;
}

const events: InfoSysEvent[] = [
  {
    id: 0,
    name: 'start',
    description: 'initial Event',
    date: new Date().toISOString(),
    author: 'Felux',
  },
  {
    id: 1,
    name: 'event id 1',
    description: 'next Event',
    date: new Date().toISOString(),
    author: 'Felux',
  },
];

// check if isEvent.id is number !NaN
// check if isEvent has name && typecast to boolean with "!!"
const isInfoSysEvent = (isEvent: any): isEvent is InfoSysEvent =>
  !isNaN(isEvent.id) && !!isEvent.name;
//console.log(!!isInfoSysEvent.name)

//===== GET =====
// GET path = /api/events specified in main.ts

//GET Example:
//res.json(events[0].name); get name from index 0

//get all events as array
router.get('/', (req, res) => {
  return res.json(events);
});

//get events with id
router.get('/:id/', (req: RequestWithUser, res) => {
  //:id variable

  const id = +req.params.id; //typecast anything to number with + (here: req.params is string)
  if (isNaN(id)) {
    const message = `ID is not a number.`;
    console.info(message);
    return res.status(400).json(message);
  }
  // get specific object from events[]
  const event_by_ID = events.findIndex((event) => event.id === id);
  console.log(event_by_ID);

  if (!event_by_ID) {
    console.info(`Event with ID ${id} not found.`);
    return res.status(404).json('Event not found.');
  }

  return res.json(event_by_ID);
});

//===== POST =====
router.post('/', (req: RequestWithUser, res) => {
  const event = req.body;

  if (!req.body) {
    console.info('is not an event');
    return res.status(400).json('Not a valid event');
  }

  if (!isInfoSysEvent(event)) {
    return res.status(409).json('Not a valid Event');
  }

  //push
  events.push(event);
  return res.status(201).json(event);
});

//PATCH
router.patch('/:id', (req: RequestWithUser, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    const message = `ID is not a number.`;
    console.info(message);
    return res.status(400).json(message);
  }

  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    console.info(`Event with ID ${id} not found.`);
    return res.status(404).json('Event not found.');
  }

  // get event from events[eventIndex]
  // ... (spread operator) copies all properties of the original event
  // then updates/overwrites them with new properties from req.body
  // merging both objects and only updating keys with different value
  const updatedEvent = { ...events[eventIndex], ...req.body };

  if (!isInfoSysEvent(updatedEvent)) {
    return res.status(409).json('Not a valid Event');
  }

  events[eventIndex] = updatedEvent;

  return res.json(updatedEvent);
});

//DELETE
router.delete('/:id', (req: RequestWithUser, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    const message = `ID ivalid: not a number.`;
    console.info(message);
    return res.status(404).json(message);
  }
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    console.info(`Event with ID ${id} not found.`);
    return res.status(404).json('Event not found.');
  }

  //console.log(eventIndex);

  const delEvent = events.splice(eventIndex, 1);

  //return deleted Event
  return res.json(delEvent);
});
