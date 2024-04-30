const express = require('express');
const authenticatioController = require('../controllers/authenticatioController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

module.exports = router;
