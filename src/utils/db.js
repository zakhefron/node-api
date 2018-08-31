import mongoose from 'mongoose';

import logger from './logger';
import { getDatabaseURI } from '../helpers/common';

const databaseURI = getDatabaseURI();

mongoose.set('useCreateIndex', true);

const connection = mongoose.connect(
  databaseURI,
  {
    poolSize: 5,
    // eslint-disable-next-line camelcase
    native_parser: true,
    useNewUrlParser: true,
  }
);
connection
  .then((db) => {
    logger.info(`Successfully connected to ${databaseURI}`);
    return db;
  })
  .catch(async (err) => {
    if (err.message.code === 'ETIMEDOUT') {
      logger.info('Attempting to re-establish database connection.');
      await mongoose.connect(databaseURI);
    } else {
      logger.info('Error while attempting to connect to database:');
      logger.info(err);
    }
  });

export default connection;
