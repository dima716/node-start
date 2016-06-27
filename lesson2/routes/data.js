/* npm modules */
const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
/* npm modules */

/* app modules */
const config = require('../config');
/* app modules */

router.get('/', function(req, res, next) {
  jsonfile.readFile(config.jsonFileName, function(err, obj) {
    if (err) {
      next(err);
    }

    res.json(obj);
  });
});

module.exports = router;
