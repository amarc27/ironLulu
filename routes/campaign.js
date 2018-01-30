const express = require('express');
const Campaign = require('../models/campaign');
const TYPES    = require('../models/campaign-types');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();

//Créer une campagne
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
    _creator: req.user._id,
  });

  newCampaign.save( (err) => {
    if (err) {
    res.render('campaign/new', { campaign: newCampaign, types: TYPES });
  } else {
    res.redirect(`/campaign/${newCampaign._id}`);
  }
  });
});

//Afficher une campagne
router.get('/:id', (req, res, next) => {
  const campaignId = req.params.id;

  Campaign.findById(campaignId, (err, campaign) => {
    if (err) { return next(err); }

    campaign.populate('_creator', (err, campaign) => {
      if (err){ return next(err); }
      return res.render('campaign/show', { campaign });
    });
  });
});

//Editer la campagne
router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  Campaign.findById(req.params.id, (err, campaign) => {
    if (err)       { return next(err) }
    if (!campaign) { return next(new Error("404")) }
    return res.render('campaign/edit', { campaign, types: TYPES })
  });
});

router.post('/:id', ensureLoggedIn('/login'), (req, res, next) => {
  const updates = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    address: req.body.address,
    deadline: req.body.deadline
  };
});

module.exports = router;
