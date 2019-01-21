'use strict';

const express = require('express');
const router = express.Router();
const captcha = require('../controllers/captcha.controller.js');

router.get('/captcha', captcha.getCaptcha);

module.exports = router;