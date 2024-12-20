import { Types } from 'mongoose';
import Blog from './blog.model';
import User from '../User/user.model';
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import { searchAbleFields } from './blog.constants';

const createBlogIntoDB = async (
  userID: Types.ObjectId,
  payload: { title: string; content: string },
) => {
  // console.log({ payload, userID });

  const payloadWithObjectID = { ...payload, author: userID };
  const result = await Blog.create(payloadWithObjectID);
  return result.newResponse;
};
const updateBlogIntoDB = async (
  authorEmail: string,
  blogID: Types.ObjectId,
  payload: { title: string; content: string },
) => {
  const user = await User.isUserExistsByEmail(authorEmail);
  if (!user) throw new Error('User not found');
  if (user.isBlocked) throw new Error('User is blocked');
  let userID;
  if (user._id) {
    userID = user._id.toString();
  }
  const blog = await Blog.findById(blogID);
  if (!blog) throw new Error('Blog not found');
  if (userID !== blog?.author.toString()) throw new Error('Unauthorized');
  const result = await Blog.findOneAndUpdate({ _id: blogID }, payload, {
    new: true,
  });
  if (result) {
    return result.newResponse;
  }
};
const deleteBlogFromDB = async (
  authorEmail: string,
  blogId: Types.ObjectId,
) => {
  const user = await User.isUserExistsByEmail(authorEmail);
  if (!user) throw new Error('User not found');
  if (user.isBlocked) throw new Error('User is blocked');
  let userID;
  if (user._id) {
    userID = user._id.toString();
  }
  const blog = await Blog.findById(blogId);
  if (!blog) throw new Error('Blog not found');
  if (userID !== blog?.author.toString()) throw new Error('Unauthorized');
  const result = await Blog.deleteOne({ _id: blogId });
  return result;
  // if (!result) throw new Error('Blog not found');
};
const getBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author').select('_id title content author'),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort();
  const result = await blogQuery.modelQuery;
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getBlogFromDB,
};
