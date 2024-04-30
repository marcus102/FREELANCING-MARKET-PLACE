const appError = require('../utils/appError');
const Comment = require('../models/commentModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('post_', req.params.post_id);

  next();
};

exports.createComment = catchAsync(async (req, res, next) => {
  const { user, comment, post_ } = req.body;
  const { id } = req.params;
  if (!id) {
    let dataField;

    if (post_) {
      dataField = post_;
    }

    if (!dataField) {
      return next(appError('You are not allowed to perform this action!', 405));
    }

    const createComment = await Comment.create({
      comment: comment,
      parentComment: id,
      user: user,
      post: post_
    });

    res.status(201).json({
      status: 'success',
      data: createComment
    });
  }

  if (id) {
    const targetComment = await Comment.findById(id);

    if (!targetComment) {
      return next(appError('Parent comment does not exist!', 405));
    }

    const { post } = targetComment;

    const createComment = await Comment.create({
      comment: comment,
      parentComment: id,
      user: user,
      post: post.valueOf()
    });

    res.status(201).json({
      status: 'success',
      data: createComment
    });
  }
});

exports.getAllComments = factory.getAll(Comment, { path: 'childComments' });
exports.getComment = factory.getOne(Comment, [{ path: 'childComments' }, { path: 'likes' }, { path: 'images' }]);

exports.getPostComment = catchAsync(async (req, res, next) => {});

exports.deleteComment = factory.deleteOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteMultiplePostsCommentsById = factory.deleteMany(Comment, 'post');
