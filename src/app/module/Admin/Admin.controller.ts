import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './Admin.services';

const blockUser = catchAsync(async (req, res) => {
  const userID = req.params.userId;
  const result = await AdminServices.blockUserFromDB(userID);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User blocked successfully',
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const blogID = req.params.id;
  const result = await AdminServices.deleteBlogFromDB(blogID);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
  });
});
export const AdminControllers = {
  blockUser,
  deleteBlog,
};
