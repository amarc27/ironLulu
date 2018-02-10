const express = require('express');
const router = express.Router();
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const campaignTypes = require('../data/campaign-types');

const Campaign = require('../models/campaign');
const User = require('../models/user');

/* GET home page. */
//List all campaigns
router.get('/', (req, res, next) => {
  Campaign
    .find({})
    .populate('_creator')
    .then((campaigns) => {
      res.render('index', { campaigns, campaignTypes });
    });
  // New
});


//Liste des candidatures
router.get('/my-applications', ensureLoggedIn('/login'), (req, res, next) => {
  Campaign.find({applicants: req.user._id}, (err, campaigns) => {
    if (campaigns.length === 0) {
      res.redirect('/');
    } else {
    res.render('profile/myApplication', {"campaigns": campaigns} )
    }
  });
});

//Liste des campagnes d'un utilisateur
router.get('/my-campaigns',  ensureLoggedIn('/login'), (req, res, next) => {
  Campaign.find({_creator: req.user._id}, (err, campaigns) => {
    if(campaigns.length === 0){
      res.redirect('/');
    } else {
      res.render('profile/myCampaigns', {"campaigns": campaigns} )
    }
  });
});

module.exports = router;
