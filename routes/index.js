var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let userSignedIn = false;
  if (req.user) { userSignedIn = true }
  res.render('index', {title: 'Express', userSignedIn});
});

module.exports = router;
