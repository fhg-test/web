const dev = require('@boringcodes/utils').isDev();
if (dev) require('dotenv').config();

import * as express from 'express';
import * as next from 'next';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { health } from '@boringcodes/utils/express';
import { MyError } from '@boringcodes/utils/error';
import errorHandler from '@boringcodes/utils/errorHandler';
import logger from '@boringcodes/utils/logger';

import routes from './routes';

const host = process.env.HOST || 'localhost';
const port = +process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET || 'mycookiesecret';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  // plug middleware
  server.use(morgan(dev ? 'dev' : 'common'));
  server.use(cookieParser(cookieSecret));
  server.use(health());

  // plug routes
  server.use(routes({ app, dev }));

  // start app
  server.listen(port, host, (err: Error) => {
    if (err) {
      throw err;
    }

    logger.info(`> App ready at http://${host}:${port}`);
  });
});

// handle unhandled promise
process.on('unhandledRejection', (err: Error) => {
  throw err;
});

// handle uncaught error and gracefully shutdown
process.on('uncaughtException', (err: Error) => {
  errorHandler.handle(new MyError(err));
});
