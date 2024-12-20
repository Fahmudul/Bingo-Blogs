import mongoose, { model } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema = new mongoose.Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
BlogSchema.post('save', async function (doc, next) {
  // console.log('Blog saved:', doc);
  await doc.populate('author');
  const newResponse = {
    _id: doc._id,
    title: doc.title,
    content: doc.content,
    author: doc.author,
  };
  // console.log(newResponse);
  doc.newResponse = newResponse;
  next();
});

BlogSchema.post('findOneAndUpdate', async function (doc, next) {
  await doc.populate('author');
  const newResponse = {
    _id: doc._id,
    title: doc.title,
    content: doc.content,
    author: doc.author,
  };
  doc.newResponse = newResponse;
  next();
});

// BlogSchema.post('find', async function (doc, next) {
//   await doc.populate('author').select('_id title content author ');
//   next();
// });
const Blog = model<TBlog>('Blog', BlogSchema);

export default Blog;
