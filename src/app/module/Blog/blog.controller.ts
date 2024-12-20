import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.services';
import User from '../User/user.model';
import { Types } from 'mongoose';

const createBlog = catchAsync(async (req, res) => {
  const { email } = req.user;
  const user = await User.isUserExistsByEmail(email);
  if (!user) throw new Error('User not found');
  if (user.isBlocked) throw new Error('User is blocked');
  let userObjectID: Types.ObjectId;
  if (user) {
    userObjectID = new Types.ObjectId(user._id);
    const result = await BlogService.createBlogIntoDB(userObjectID, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog created successfully',
      data: result,
    });
  }
});

const updateBlog = catchAsync(async (req, res) => {
  const blogId = new Types.ObjectId(req.params.id);
  const { email } = req.user;
  const result = await BlogService.updateBlogIntoDB(email, blogId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { email } = req.user;
  const blogId = new Types.ObjectId(req.params.id);
  const result = await BlogService.deleteBlogFromDB(email, blogId);
  if (result === null) {
    sendResponse(res, {
      message: 'Blog not found',
      success: false,
      statusCode: httpStatus.NOT_FOUND,
    });
  } else {
    sendResponse(res, {
      message: 'Blog deleted successfully',
      success: true,
      statusCode: httpStatus.OK,
    });
  }
});

const getBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getBlogFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog fetched successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
};
