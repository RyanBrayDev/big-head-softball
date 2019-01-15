var express = require('express');
var router = express.Router();

// GET
// =============================================================================
router.get('/', function (req, res) {
  res.json({message: 'Big Head Softball API. All rights reserved.'});
});

module.exports = router;
