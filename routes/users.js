const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('./../models/User');
const { forwardAuth } = require('./../config/auth');

const router = express.Router();

// LOGIN PAGE
router.get('/login', forwardAuth, (req, res) => {
  res.status(200).render('login');
});

// REGISTER PAGE
router.get('/register', forwardAuth, (req, res) => {
  res.status(200).render('register');
});

// REGISTER HANDLE
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // CHECK REQUIRED FIELDS
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please fill in all fields',
    });
  }

  // CHECK PASSWORD MATCH
  if (password !== password2) {
    errors.push({
      msg: 'Passwords do not match',
    });
  }

  // CHECK PASSWORD LENGTH
  if (password.length < 6) {
    errors.push({
      msg: 'Password should be at least 6 characters',
    });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation pass
    User.findOne({
      email,
    }).then((user) => {
      // User exist
      if (user) {
        errors.push({
          msg: 'Email is already registered',
        });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            // Save new User
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can login'
                );
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// LOGIN HANDLE
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
module.exports = router;
