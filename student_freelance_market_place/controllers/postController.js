const Post = require('../models/postModel');
const User = require('../models/userModel');
const BlockedUser = require('../models/blockedUserModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.createPost = catchAsync(async (req, res, next) => {
  const { title, description, stack, price, availability } = req.body;

  const newBugReport = new Post({
    title: title,
    description: description,
    stack: stack,
    price: price,
    availability: availability,
    user: req.user.id
  });

  await newBugReport.save();

  await User.findByIdAndUpdate(req.user.id, { $inc: { postCount: 1 } });

  res.status(201).json({
    status: 'success',
    data: newBugReport
  });
});

exports.updatePost = factory.updateOne(Post);

exports.deletePost = catchAsync(async (req, res, next) => {
  const doc = await Post.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(appError('No document found with that ID! ', 404));
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { postCount: -1 } });

  res.status(200).json({
    status: 'success',
    data: null
  });
});

exports.filterBlockedPosts = factory.blocksHandler(BlockedUser, 'post_ids');

exports.getAllPosts = factory.getAll(Post, 'post_ids');
exports.getPost = factory.getOne(Post, [
  { path: 'image' },
  { path: 'contributors' },
  { path: 'comments' },
  { path: 'categories' }
]);
