import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import api from './api';
import initializeDb from './db';
import config from './config.json';
import middleware from './middleware';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// connect to db
initializeDb(
  db => {
    // internal middleware
    app.use(middleware({ config, db }));

    // api router
    app.use('/api', api({ config, db }));

    app.server.listen(process.env.PORT || config.port, () => {
      console.log(`Started on port ${app.server.address().port}`);
    });
  }
);

export default app;
