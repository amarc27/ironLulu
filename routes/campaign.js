const express = require('express');
const Campaign = require('../models/campaign');
const TYPES    = require('../models/campaign-types');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();

router.get('/new', (req, res, next) => {
  res.render('campaign/new', { types: TYPES });
});

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newCampaign = new Campaign({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    address: req.body.address,
    deadline: req.body.deadline,
    _creator: req.user._id
  });

  newCampaign.save( (err) => {
    if (err) {
    res.render('campaigns/new', { campaign: newCampaign, types: TYPES });
  } else {
    res.redirect(`/campaigns/${newCampaign._id}`);
  }
  });
});

module.exports = router;
