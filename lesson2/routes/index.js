/* npm modules */
const express = require('express');
const router = express.Router();
/* npm modules */

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
