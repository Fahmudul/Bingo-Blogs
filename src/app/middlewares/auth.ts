import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../module/User/user.model';
import sendResponse from '../utils/sendResponse';
const auth = (...requiredRoles: string[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      // console.log(req.headers.authorization);
      const token = req.headers.authorization?.split(' ')[1] as string;
      // console.log(token);
      if (!token) {
        sendResponse(res, {
          success: false,
          statusCode: 401,
          message: 'Unauthorized',
        });
      }
      // verify token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      req.user = decoded;
      // console.log('from autth', req.user);

      const { email } = decoded;
      const user = await User.isUserExistsByEmail(email);
      // console.log('from line 20', user.role);
      if (!user) {
        sendResponse(res, {
          success: false,
          statusCode: 401,
          message: 'Unauthorized',
        });
      }
      if (requiredRoles && !requiredRoles.includes(user.role as string)) {
        sendResponse(res, {
          success: false,
          statusCode: 403,
          message: 'Forbidden',
        });
      }
      next();
    },
  );
};

export default auth;
