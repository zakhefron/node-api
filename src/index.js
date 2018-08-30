import cors from 'cors';
import Raven from 'raven';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
import logger, { logStream } from './utils/logger';

// Initialize Raven
// https://docs.sentry.io/clients/node/integrations/express/
Raven.config(process.env.SENTRY_DSN).install();

const app = express();

app.set('port', process.env.APP_HOST);
app.set('host', process.env.APP_HOST);

// This request handler must be the first middleware on the app
app.use(Raven.requestHandler());

app.use(morgan('tiny', { stream: logStream }));
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api', routes);

app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
});
