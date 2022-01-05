const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('server started successfully');
});

module.exports = router;
