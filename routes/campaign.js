const express = require('express');
const router  = express.Router();
const Campaign = require('../models/campaign');
const TYPES    = require('../models/campaign-types');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const { authorizeCampaign, checkOwnership } = require('../middleware/campaign-authorization');


//Afficher toutes les campagnes
router.get('/all', (req, res, next) => {
  Campaign
    .find({})
    .populate('_creator')
    .then((campaigns) => {
      res.render('index', { campaigns });
    });
});



//Créer une campagne
router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('campaign/new', { types: TYPES });
});

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newCampaign = new Campaign({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    location: {
      address: req.body.location,
      coordinates: [
        req.body.latitude, req.body.longitude
      ]
    },
    execDate: req.body.execDate,
    _creator: req.user._id
  });

  console.log("DEBUG newCampaign", newCampaign)

  newCampaign.save( (err) => {
    if (err) {
      console.log("DEBUG err", err)
      res.render('campaign/new', { campaign: newCampaign, types: TYPES });
    } else {
      res.redirect(`/campaign/${newCampaign._id}`);
    }
  });
});

//Afficher une campagne
router.get('/:id', checkOwnership, (req, res, next) => {
  Campaign.findById(req.params.id, (err, campaign) => {
    if (err){ return next(err); }

    campaign.populate('_creator').populate('applicants', ( err, campaign) => {
      if (err){ return next(err); }
      console.log(req.query)
      return res.render('campaign/show', { campaign , displayBannier: req.query.dspBannier});
    })
  });
});


//Editer une campagne
router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  Campaign.findById(req.params.id, (err, campaign) => {
    if (err)       { return next(err) }
    if (!campaign) { return next(new Error("404")) }
    return res.render('campaign/edit', { campaign, types: TYPES })
  });
});


router.post('/:id', ensureLoggedIn('/login'), authorizeCampaign, checkOwnership, (req, res, next) => {
  const updates = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    address: req.body.address,
    execDate: req.body.execDate
  };

  Campaign.findByIdAndUpdate(req.params.id, updates, (err, campaign) => {
    if (err) {
      return res.render('campaign/edit', {
        campaign,
        errors: campaign.errors
      });
    }
    if (!campaign) {
      return next(new Error('404'));
    }
    return res.redirect(`/campaign/${campaign._id}`);
  });
});



//DELETE A CAMPAIGN
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Campaign.findByIdAndRemove(id, (err, campaign) => {
    if (err){ return next(err); }
    return res.redirect('/campaign/all');
  });

});



//Postuler à une campagne
router.get('/:id/apply',  ensureLoggedIn('/login'), (req, res, next) => {
  let updates = {$push: {applicants: req.user._id}}
  Campaign.findByIdAndUpdate(req.params.id, updates, (err, campaign) => {
    if (err) {
      return res.redirect(`/campaign/${req.params.id}`)
    }
    if (!campaign) {
      return next(new Error('404'));
    }
    console.log(campaign)
    return res.redirect(`/campaign/${campaign._id}?dspBannier=true`);
  });
});


module.exports = router;
