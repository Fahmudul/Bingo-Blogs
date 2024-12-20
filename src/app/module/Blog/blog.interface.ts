import { Types } from 'mongoose';

export type TBlog = {
  newResponse?: any;
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};
