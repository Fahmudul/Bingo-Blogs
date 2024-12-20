import express from 'express';
import auth from '../../middlewares/auth';
import { AdminControllers } from './Admin.controller';
const router = express.Router();

// Admin Actions
router.patch(
  '/admin/users/:userId/block',
  auth('admin'),
  AdminControllers.blockUser,
);
router.delete('/admin/blogs/:id', auth('admin'), AdminControllers.deleteBlog);

export const AdminRoute = router;
