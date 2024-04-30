const Like = require('../models/likesModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const appError = require('../utils/appError');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };

  setIfUndefined('user', req.user.id);
  setIfUndefined('post', req.params.post_id);
  setIfUndefined('comment', req.params.comment_id);

  next();
};

exports.toggleLike = catchAsync(async (req, res, next) => {
  const { post, user, comment } = req.body;
  if (!(post || comment)) {
    return next(appError('This operation cannot be performed!', 401));
  }

  let dataField;
  let DB;

  if (post) {
    dataField = 'post';
    DB = Post;
  } else if (comment) {
    dataField = 'comment';
    DB = Comment;
  }

  const query = { user: user, [dataField]: req.body[dataField] };

  const existingLike = await Like.findOne(query);

  if (existingLike) {
    await Like.findOneAndDelete(query);
    await DB.findByIdAndUpdate(req.body[dataField], {
      $inc: { likeCount: -1 }
    });
  } else {
    const likeData = { user: user, [dataField]: req.body[dataField] };
    const newLike = new Like(likeData);
    await newLike.save();
    await DB.findByIdAndUpdate(req.body[dataField], { $inc: { likeCount: 1 } });
  }

  res.status(200).json({ status: 'success' });
});

exports.getAllUsersThatLikePosts = factory.getAll(Like);
exports.getUserThatLikePosts = factory.getOne(Like);

exports.deleteMultiplePostsLikesById = factory.deleteMany(Like, 'post');
exports.deleteMultiplePostsLikesByArraysOfIds = factory.deleteArray(Like, 'post');
