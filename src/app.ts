import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use router
app.use('/api/v1', router);

// Global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found.',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found.',
      },
    ],
  });

  next();
});

export default app;
