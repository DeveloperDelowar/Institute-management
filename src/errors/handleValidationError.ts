import mongoose from 'mongoose';
import { ErrorMessageType } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): ErrorMessageType[] => {
  const errors = Object.values(err?.errors);

  const errorMessages: ErrorMessageType[] = errors.map(
    (elem: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: elem?.path,
        message: elem?.message,
      };
    },
  );

  return errorMessages;
};

export default handleValidationError;
