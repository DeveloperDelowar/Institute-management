import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import { logger, errorLogger } from './shared/Logger';
import { Server } from 'http';
(async function main() {
  let server: Server;

  try {
    await mongoose.connect(config.db_url as string);
    logger.info(`Database connected successfully.`);

    server = app.listen(config.port, () => {
      logger.info(`Application listen on ${config.port} port.`);
    });
  } catch (err) {
    errorLogger.error(`Database disconnected. `, err);
  }

  // Unhandle Rejection
  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }

    errorLogger.error(err);
    console.log('The system is crashed.');
  });
})();
