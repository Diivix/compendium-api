const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:user'); // debug logger

//
// Get all spells
//
router.get('/', function(req, res) {
  return db.spells.findAll()
    .then(spells => {
      return res.status(200).send(spells);
    })
    .catch(err => {
      debug('Error retrieving spells.', JSON.stringify(err));
      return res.status(500).send("Error retrieving spells.");
    });
});

//
// Get all spells
//
router.get('/', function(req, res) {
  return db.spells.findAll()
    .then(spells => {
      return res.status(200).send(spells);
    })
    .catch(err => {
      debug('Error retrieving spells.', JSON.stringify(err));
      return res.status(500).send("Error retrieving spells.");
    });
});

module.exports = router;
