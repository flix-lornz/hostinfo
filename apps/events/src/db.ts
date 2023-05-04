import { InfosysEvent } from './models/infosys-event.model';

export const events: InfosysEvent[] = [
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
