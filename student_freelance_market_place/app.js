const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./controllers/errorsController');
const appError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const commentRouter = require('./routes/commentsRoutes');
const imageRouter = require('./routes/imagesRoutes');
const likesRouter = require('./routes/likeRoutes');
const followersRouter = require('./routes/followersRoutes');
const reviewRouter = require('./routes/reviewsRoutes');
const contributorsRouter = require('./routes/contributorsRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const blockedUserRouter = require('./routes/blockedUserRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

const rootUrl = '/api/v1';

app.use(`${rootUrl}/users`, userRouter);
app.use(`${rootUrl}/images`, imageRouter);
app.use(`${rootUrl}/reviews`, reviewRouter);
app.use(`${rootUrl}/comments`, commentRouter);
app.use(`${rootUrl}/feedbacks`, feedbackRouter);
app.use(`${rootUrl}/likes`, likesRouter);
app.use(`${rootUrl}/followers`, followersRouter);
app.use(`${rootUrl}/contributors`, contributorsRouter);
app.use(`${rootUrl}/categories`, categoriesRouter);
app.use(`${rootUrl}/blocks`, blockedUserRouter);
app.use(`${rootUrl}/posts`, postRouter);

app.all('*', (req, res, next) => {
  next(appError(`Sorry!!! cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
