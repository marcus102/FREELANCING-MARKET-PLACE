const express = require('express');
// const userController = require('../controllers/userController');
const authenticatioController = require('../controllers/authenticatioController');
const commentsRouter = require('./commentsRoutes');
const imageRouter = require('./imagesRoutes');
const categoriesRouter = require('./categoriesRoutes');
const reviewRouter = require('./reviewsRoutes');
const likesRouter = require('./likeRoutes');
const postController = require('../controllers/postController');
const commentsController = require('../controllers/commentsControllers');
const imagesController = require('../controllers/imagesController');
const contributorsController = require('../controllers/contributorsController');
const reviewsController = require('../controllers/reviewsController');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

//engagement
router.use('/:post_id/comments', commentsRouter);
router.use('/:post_id/image', imageRouter);
router.use('/:post_id/reviews', reviewRouter);
router.use('/:post_id/likes', likesRouter);

//filtering
router.use('/:post_id/category', categoriesRouter);

router.get('/', postController.filterBlockedPosts, postController.getAllPosts);
router.get('/:id', postController.getPost);

router.use(authenticatioController.protect);

router.post('/', postController.createPost);

router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(
    commentsController.deleteMultiplePostsCommentsById,
    imagesController.deletMultiplePostsImagesById,
    contributorsController.deleteMultipleContributionsById,
    reviewsController.deleteMultiplePostsReviewsById,
    categoriesController.deleteMultiplePostsCategoriesById
  );

module.exports = router;
