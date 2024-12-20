import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../Errors/ErrorType';
import handleZodValidationError from '../Errors/handleZodValidationError';
import config from '../config';
import handleValidationError from '../Errors/handleValidationError';
import handleCastError from '../Errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 400;
  let message = err.message || 'Something went wrong';
  let error: TErrorSource = [
    {
      path: err?.path || '',
      message: 'something went wrong',
    },
  ];
  if (err.name === 'ZodError') {
    const simplifiedError = handleZodValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;

    // console.log(errorSources);
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: {
      details: error,
    },
    stack: config.NODE_ENV !== 'production' && err.stack,
  });
};

export default globalErrorHandler;
