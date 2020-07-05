const express = require('express');

const router = express.Router();

// LOGIN PAGE
router.get('/login', (req, res) => {
  res.status(200).render('login');
});

// REGISTER PAGE
router.get('/register', (req, res) => {
  res.status(200).render('register');
});
module.exports = router;