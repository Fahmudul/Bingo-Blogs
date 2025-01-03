import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// eslint-disable-next-line no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
  });
};

export default notFound;
