const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('post', req.params.post_id);

  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.getReview = factory.getOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);

exports.deleteMultiplePostsReviewsById = factory.deleteMany(Review, 'post');
exports.deleteMultiplePostsReviewsByArrayOfIds = factory.deleteArray(Review, 'post');
