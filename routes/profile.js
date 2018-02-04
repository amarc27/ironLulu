const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Campaign = require('../models/campaign');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
    res.redirect('/profile/'+ req.user._id)
});

//Show Profile
router.get('/:id', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('profile/show', {user: req.user} )
});

//Edit profile
router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err)       { return next(err) }
    if (!user) { return next(new Error("404")) }
    return res.render('profile/edit', {user: req.user} )
  });
});

//Post Edit profile
router.post('/:id', ensureLoggedIn('/login'), (req, res, next) => {
    const updates = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description
    };

    User.findByIdAndUpdate(req.params.id, updates, (err, user) => {
      console.log(err,user);
      if (err) {
        console.log(err);
        return res.render('profile/edit', {
          user,
          errors: err
        });
      }
      if (!user) {
        return next(new Error('404'));
      }
      return res.redirect(`/profile/${user._id}`);
    });
});

//Delete Profile
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, (err, user) => {
    if (err){ return next(err); }
    return res.redirect('/campaign/all');
  });
});

module.exports = router;
