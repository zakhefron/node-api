import cors from 'cors';
import Raven from 'raven';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import './utils/db';
import routes from './routes';
import { Config } from './helpers/config';
import logger, { logStream } from './utils/logger';
import { jwtMiddleware } from './middlewares/jwtMiddleware';

// Initialize Raven
// https://docs.sentry.io/clients/node/integrations/express/
Raven.config(Config.get('SENTRY_DSN', '')).install();

const app = express();

// This request handler must be the first middleware on the app
app.use(Raven.requestHandler());

app.use(morgan('tiny', { stream: logStream }));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  jwtMiddleware.unless({
    // JWT Middleware won't run on the following paths.
    path: ['/api/users/register', '/api/users/login'],
  })
);

// API Routes
app.use('/api', routes);

// This error handler must be before any other error middleware
app.use(Raven.errorHandler());

app.listen(Config.get('APP_PORT', ''), Config.get('APP_HOST', ''), () => {
  logger.info(`Server started at http://${Config.get('APP_HOST', '127.0.0.1')}:${Config.get('APP_PORT', '3000')}/api`);
});
