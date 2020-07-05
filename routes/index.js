const express = require('express');

const router = express.Router();

// WELCOME PAGE
router.get('/', (req, res) => {
  res.status(200).send('Welcome');
});
module.exports = router;
