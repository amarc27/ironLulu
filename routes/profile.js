const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');




router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('profile/edit', {user: req.user} )
});
  
  
router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
    const updates = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description
    };
  
    User.findByIdAndUpdate(req.user._id, updates, (err, profile) => {
      if (err) {
        return res.render('profile/edit', {
          profile,
          errors: profile.errors
        });
      }
      if (!profile) {
        return next(new Error('404'));
      }
      return res.redirect(`/campaign/all`);
    });
});

module.exports = router;