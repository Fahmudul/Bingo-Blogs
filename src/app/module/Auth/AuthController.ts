import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './AuthServices';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await AuthServices.Login(req.body);
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: result,
  });
});

const registerUser = catchAsync(async (req, res) => {
  // console.log(req.body);
  const userCreated = await AuthServices.RegisterUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: userCreated,
  });
});

export const AuthController = {
  loginUser,
  registerUser,
};
