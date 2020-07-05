const express = require('express');

const router = express.Router();

// WELCOME PAGE
router.get('/', (req, res) => {
  res.status(200).render('welcome');
});
module.exports = router;