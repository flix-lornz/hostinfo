/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
// check if isEvent has name and Typecast w/ !! to bollean
const isInfoSysEvent = (isEvent: any): isEvent is InfoSysEvent =>
  !isNaN(isEvent.id) && !!isEvent.name;
//console.log(!!isInfoSysEvent.name)

//===== GET =====

//get all events as array
app.get('/api/events/', (req, res) => {
  res.json(events);
});

//get events with id
app.get('/api/events/:id/', (req, res) => {
  const id = +req.params.id; //typecast anything (here: req.params is string) to number with +
  if (isNaN(id)) {
    const message = `ID is not a number.`;
    console.info(message);
    return res.status(400).json(message);
  }
  const event_by_ID = events.find((event) => event.id === id);
  console.log(event_by_ID);

  if (!event_by_ID) {
    console.info(`Event with ID ${id} not found.`);
    return res.status(404).json('Event not found.');
  }
  return res.json(event_by_ID); // call find() on array events. event specific object from events[]
});

//===== POST =====
app.post('/api/events', (req, res) => {
  const event = req.body;

  if (!req.body) {
    console.info('is not an event');
    return res.status(400).json('Not a valid event');
  }

  if (isInfoSysEvent(event)) {
    return res.status(409).json('Not a valid Event');
  }

  //push
  events.push(event);
  return res.status(201).send();

  // [{
  //   id: ,
  //   name: 'event id 1',
  //   description: 'next Event',
  //   date: new Date().toISOString(),
  //   author: 'Felux',
  // }]
});

// //res.json(events[0].name); name from index 0
// app.get('/api/events/:name/', (req, res) => {
//   const name = req.params.name;  //typecast anything (here: req.params is string) to number with +
//   res.json(events.find((event) => event.name === name)); // call find() on array events. event specific object from events[]
// });

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
