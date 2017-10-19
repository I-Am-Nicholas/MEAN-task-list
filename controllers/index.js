'use strict';

const express = require('express');
const router = express.Router();
const render = require('./render.js')

router.get('/', render);

module.exports = router;
