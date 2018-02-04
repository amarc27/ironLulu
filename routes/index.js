const express = require('express');
const router = express.Router();
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const Campaign = require('../models/campaign');
const User = require('../models/user');

/* GET home page. */
//List all campaigns
router.get('/', (req, res, next) => {
  Campaign
    .find({})
    .populate('_creator')
    .then((campaigns) => {
      res.render('index', { campaigns });
    });
  // New
});


//Liste des candidatures
router.get('/my-applications', ensureLoggedIn('/login'), (req, res, next) => {
  Campaign.find({}, (err, campaigns) => {
    if (err) { return next(err) }
    var filteredCampaigns = [];
    campaigns.forEach(campaign => {
      campaign.applicants.forEach(applicantId => {
        if (applicantId.toString() == req.user._id.toString()) {
          filteredCampaigns.push(campaign);
        }
      })
    })
    res.render('profile/myApplication', {"campaigns": filteredCampaigns} )
  });
});

//Liste des campagnes d'un utilisateur
/*router.get('/mytest', ensureLoggedIn('/login'), (req, res, next) => {
  Campaign
    .find({})
    .populate('_creator')
    .then((campaigns) => {
      res.render('index', { campaigns });
    });
});*/

module.exports = router;
