import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from './ErrorType';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const error: TErrorSource = [
    {
      path: err?.path,
      message: 'Cast Error',
    },
  ];
  return {
    statusCode,
    message: 'Cast Error',
    error,
  };
};

export default handleCastError;
