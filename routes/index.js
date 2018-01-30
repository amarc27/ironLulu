var express = require('express');
var router = express.Router();
const Campaign = require('../models/campaign');

/* GET home page. */
//List all campaigns
router.get('/', (req, res, next) => {
  // let userSignedIn = false;
  // if (req.user) { userSignedIn = true }
  // New
  Campaign
    .find({})
    .populate('_creator')
    .then((campaigns) => {
      res.render('index', { campaigns });
    });
  // New
});

module.exports = router;
