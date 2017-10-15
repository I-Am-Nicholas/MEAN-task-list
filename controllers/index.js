const express = require('express');
const router = express.Router();
const render = require('./render.js')

router.get('/', render);

module.exports = router;

// /* when the route is to the home page, get the value
//  of the index property in the render constant/file. */
