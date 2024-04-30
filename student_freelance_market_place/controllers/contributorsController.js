const Contributor = require('../models/contributorsModel');
const factory = require('./handlerFactory');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('post', req.params.post_id);

  next();
};

exports.createContribution = factory.createOne(Contributor);
exports.getAllContributions = factory.getAll(Contributor);
exports.getContribution = factory.getOne(Contributor);
exports.updateContribution = factory.updateOne(Contributor);
exports.deleteContribution = factory.deleteOne(Contributor);
exports.deleteMultipleContributionsById = factory.deleteMany(Contributor, 'post');
