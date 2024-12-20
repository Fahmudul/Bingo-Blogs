import Blog from '../Blog/blog.model';
import User from '../User/user.model';

const blockUserFromDB = async (userID: string) => {
  const result = await User.updateOne({ _id: userID }, { isBlocked: true });
  return result;
};

const deleteBlogFromDB = async (blogID: string) => {
  const result = await Blog.findByIdAndDelete(blogID);
  return result;
};
export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
