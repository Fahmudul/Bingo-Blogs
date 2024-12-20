import express, { RequestHandler } from 'express';
import { UserRoute } from './app/module/User/user.routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import { AdminRoute } from './app/module/Admin/Admin.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));
//  Application routes
app.use('/api', UserRoute);
app.use('/api', AdminRoute);
const helloWorldHandler: RequestHandler = (req, res) => {
  res.send('Welcome to Bingo Blogs');
};

app.get('/', helloWorldHandler);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
