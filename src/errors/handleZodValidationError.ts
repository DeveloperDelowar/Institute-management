import { ZodError, ZodIssue } from 'zod';
import { ErrorMessageType } from '../interfaces/error';

const handleZodValidationError = (err: ZodError): ErrorMessageType[] => {
  const errors = err?.errors;

  const messages: ErrorMessageType[] = errors?.map((elem: ZodIssue) => {
    const paths = elem?.path;
    const path = paths[paths.length - 1];
    const message = elem?.message;

    return {
      path,
      message,
    };
  });

  return messages;
};

export default handleZodValidationError;
