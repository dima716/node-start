/* npm modules */
const express = require('express');
const router = express.Router();
/* npm modules */

/* app modules */
const config = require('../config');
/* app modules */

router.get('/', function(req, res) {
  res.render('index', {
    depth: config.depth
  });
});

module.exports = router;
