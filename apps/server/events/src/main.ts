import express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import { router as eventsRouter } from './routes/events.routes';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(json());
app.use(urlencoded());

app.use('/api/events', eventsRouter);

//start server and listen on Port env varriable or fallback 3333
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

//Log errors
server.on('error', console.error);
