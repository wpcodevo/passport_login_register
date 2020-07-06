const express = require('express');
const {
  ensureAuth,
  forwardAuth
} = require('./../config/auth')

const router = express.Router();

// WELCOME PAGE
router.get('/', forwardAuth, (req, res) => {
  res.status(200).render('welcome');
});


// DASHBOARD PAGE
router.get('/dashboard', ensureAuth, (req, res) => {
  res.status(200).render('dashboard', {
    user: req.user
  });
  console.log(req.user)
});

module.exports = router;