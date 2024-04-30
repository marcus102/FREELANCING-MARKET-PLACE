const Category = require('../models/categoriesModel');
const Post = require('../models/postModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('username', req.user.username);
  setIfUndefined('post', req.params.post_id);

  next();
};
exports.checkInfo = catchAsync(async (req, res, next) => {
  const { post } = req.body;

  let id;
  let DB;

  if (post) {
    id = post;
    DB = Post;
  }

  const targetDoc = await DB.findById(id);

  if (!targetDoc) {
    return next(appError('You cannot perform this action', 405));
  }

  next();
}); // Test

exports.createCategory = catchAsync(async (req, res, next) => {
  const { user, username, post, category } = req.body;

  let updatedUsername = username;

  if (post) {
    updatedUsername = null;
  }

  const newCategory = await Category.create({
    category: category,
    user: user,
    username: updatedUsername,
    post: post
  });

  res.status(201).json({
    status: 'success',
    data: newCategory
  });
});

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);

exports.deleteMultiplePostsCategoriesById = factory.deleteMany(Category, 'post');
