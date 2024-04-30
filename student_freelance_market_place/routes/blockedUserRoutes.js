const express = require('express');
const authenticatioController = require('../controllers/authenticatioController');
const blockedUserController = require('../controllers/blockedUserController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

router
  .route('/')
  .post(blockedUserController.blockUserHandler)
  .get(blockedUserController.getAllBlockedUsers);

router
  .route('/id')
  .get(blockedUserController.getBlockedUser)
  .patch(blockedUserController.updateBlockedUser);

router.delete('/:id/unblock', blockedUserController.unblockedUserHandler);

module.exports = router;
