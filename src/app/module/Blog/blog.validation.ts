import { z } from 'zod';
const CreateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty')
      .max(100, 'Title cannot exceed 100 characters'),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, 'Content cannot be empty'),
  }),
});
const UpdateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty')
      .max(100, 'Title cannot exceed 100 characters')
      .optional(),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, 'Content cannot be empty')
      .optional(),
  }),
});

export const BlogValidationSchemas = {
  CreateBlogValidationSchema,
  UpdateBlogValidationSchema,
};
