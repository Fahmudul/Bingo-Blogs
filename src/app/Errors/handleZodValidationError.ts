import { ZodError } from 'zod';
import { TGenericErrorResponse } from './ErrorType';

const handleZodValidationError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const error = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  // console.log(errorSources);
  return {
    statusCode,
    message: 'Zod Validation Error',
    error,
  };
};

export default handleZodValidationError;
