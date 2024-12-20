import express from 'express';
import { AuthController } from '../Auth/AuthController';
import validateRequest from '../../middlewares/validateRequest';
import { validationSchema } from '../Auth/AuthValidation';
import { BlogController } from '../Blog/blog.controller';
import auth from '../../middlewares/auth';
import { BlogValidationSchemas } from '../Blog/blog.validation';
const router = express.Router();
// Login-Register routes
router.post(
  '/auth/register',
  validateRequest(validationSchema.RegisterUserValidationSchema),
  AuthController.registerUser,
);
router.post(
  '/auth/login',
  validateRequest(validationSchema.loginUserValidationSchema),
  AuthController.loginUser,
);

// User routes
router.post(
  '/blogs',
  auth('user'),
  validateRequest(BlogValidationSchemas.CreateBlogValidationSchema),
  BlogController.createBlog,
);
router.patch(
  '/blogs/:id',
  auth('user'),
  validateRequest(BlogValidationSchemas.UpdateBlogValidationSchema),
  BlogController.updateBlog,
);
router.delete('/blogs/:id', auth('user'), BlogController.deleteBlog);
router.get('/blogs', BlogController.getBlog);

export const UserRoute = router;
