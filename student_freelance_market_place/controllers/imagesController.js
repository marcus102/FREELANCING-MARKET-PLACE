const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Image = require('./../models/imagesModel');
const Post = require('../models/postModel');
const AssignedJobs = require('../models/assignedJobsModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
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

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const { post } = req.body;
    let imgDestination = 'profiles';
    if (post) {
      imgDestination = 'images';
    }

    cb(null, `../student_freelance_market_place/assets/${imgDestination}`);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
exports.uploadImage = upload.single('image');

exports.checkInfo = catchAsync(async (req, res, next) => {
  const { post, jobAssignment } = req.body;

  let id;
  let DB;

  if (post) {
    id = post;
    DB = Post;
  } else if (jobAssignment) {
    id = jobAssignment;
    DB = AssignedJobs;
  }

  const targetDoc = await DB.findById(id);

  if (!targetDoc) {
    return next(appError('You cannot perform this action', 405));
  }

  next();
});

exports.createImage = catchAsync(async (req, res, next) => {
  const { caption, tags, likes, privacy, user, username, post, jobAssignment, comment } = req.body;
  const { mimetype, size } = req.file;

  if (!req.file) {
    return next(appError('No image file provided', 400));
  }

  let updatedUsername = username;
  let imgDirectory = 'profiles';

  if (post || comment || jobAssignment) {
    updatedUsername = null;
    imgDirectory = 'images';
  }

  const newImage = await Image.create({
    imageUrl: path.join(__dirname, '..', 'assets', imgDirectory, req.file.filename),
    caption: caption,
    tags: tags,
    likes: likes,
    privacy: privacy,
    size: size,
    fileFormat: mimetype,
    user: user,
    username: updatedUsername,
    post: post,
    jobAssignment: jobAssignment,
    comment: comment
  });

  res.status(201).json({
    status: 'success',
    data: {
      newImage
    }
  });
});

exports.updateImage = catchAsync(async (req, res, next) => {
  const imageData = await Image.findById(req.params.id);
  if (!imageData) {
    return next(appError('Image not found', 404));
  }

  if (!req.file) {
    return next(appError('No new image file provided for update', 400));
  }

  const { caption, tags, likes, privacy } = req.body;
  const { size, mimetype, filename } = req.file;

  let imgDirectory = 'profiles';

  if (imageData.username === null) {
    imgDirectory = 'images';
  }

  const oldImagePath = path.join(__dirname, '..', 'assets', imgDirectory, path.basename(imageData.imageUrl));

  await fs.unlink(oldImagePath, err => {
    if (err) throw err;
  });

  imageData.imageUrl = path.join(__dirname, '..', 'assets', imgDirectory, filename);
  imageData.caption = caption || imageData.caption;
  imageData.tags = tags || imageData.tags;
  imageData.likes = likes || imageData.likes;
  imageData.privacy = privacy || imageData.privacy;
  imageData.size = size || imageData.size;
  imageData.fileFormat = mimetype || imageData.fileFormat;

  await imageData.save({ validateBeforeSave: true });

  res.status(200).json({
    status: 'success',
    data: {
      imageData
    }
  });
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return next(appError('Image not found', 404));
  }

  await fs.unlink(image.imageUrl, err => {
    if (err) throw err;
  });

  await Image.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deletMultiplePostsImagesById = factory.deleteManyImages(Image, 'post');
exports.deletMultipleAssignedJobsImagesById = factory.deleteManyImages(AssignedJobs, 'jobAssignment');

exports.getAllImages = factory.getAll(Image);
exports.getImage = factory.getOne(Image);
