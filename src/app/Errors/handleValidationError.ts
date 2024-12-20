import mongoose from 'mongoose';
import { TGenericErrorResponse } from './ErrorType';

const handleValidationError = (err: mongoose.Error.ValidationError):TGenericErrorResponse => {
  const statusCode = 400;
  const error = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  // console.log(errorSources);
  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleValidationError;
