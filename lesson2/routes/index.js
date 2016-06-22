const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/scrap', function(req, res) {
  var formData = req.body;

  if (req.body) {
    res.json(formData);
  } else {
    next('Form data is undefined');
  }
});

module.exports = router;
