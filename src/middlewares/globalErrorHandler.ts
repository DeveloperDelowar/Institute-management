import { ErrorRequestHandler } from 'express';
import config from '../config/config';
import { ErrorMessageType } from '../interfaces/error';
import handleValidationError from '../errors/handleValidationError';
import ApiError from '../errors/ApiErrors';
import { ZodError } from 'zod';
import handleZodValidationError from '../errors/handleZodValidationError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = 500;
  let message: string = 'Something went wrong !';
  let errorMessages: ErrorMessageType[] = [];

  if (err?.name === 'ValidationError') {
    const validationErrorMessages = handleValidationError(err);

    statusCode = 400;
    message = 'Validation failed';
    errorMessages = validationErrorMessages;
  } else if (err instanceof ZodError) {
    const zodValidationErrorMessage = handleZodValidationError(err);

    statusCode = 400;
    message = 'Validation failed';
    errorMessages = zodValidationErrorMessage;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message ? makeErrorMessageFormat(err?.message) : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message ? makeErrorMessageFormat(err?.message) : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    statusCode,
    stack: config.env === 'production' ? undefined : err?.stack,
  });

  next();
};

const makeErrorMessageFormat = (message: string): ErrorMessageType[] => {
  const format: ErrorMessageType[] = [
    {
      path: '',
      message,
    },
  ];

  return format;
};

export default globalErrorHandler;
