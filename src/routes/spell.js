const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:spell'); // debug logger
const unique = require('../utils/unique');

//
// Get all spells
// [optional] url query param "lightlyload"
router.get('/', function(req, res) {
  //TODO: Check if param exists, even with no value.
  if (req.query.lightlyload) {
    return db.spells
      .findAll({ attributes: { exclude: ['description', 'atHigherLevels', 'reference', 'createdAt', 'updatedAt'] } })
      .then(spells => {
        return res.status(200).send(spells);
      })
      .catch(err => {
        debug('Error retrieving spells. %o', JSON.stringify(err));
        return res.status(500).send('Error retrieving spells.');
      });
  } else {
    return db.spells
      .findAll()
      .then(spells => {
        return res.status(200).send(spells);
      })
      .catch(err => {
        debug('Error retrieving spells. %o', JSON.stringify(err));
        return res.status(500).send('Error retrieving spells.');
      });
  }
});

//
// Get unique values of spells
//
router.get('/unique', function(req, res) {
  return db.spells
    .findAll()
    .then(spells => {
      return res.status(200).send(unique.spells(spells));
    })
    .catch(err => {
      debug('Error retrieving spells. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving spells.');
    });
});

//
// Get spells by filter
//
router.post('/', function(req, res) {
  const query = req.body;

  return db.spells
    .findAll({ where: {} })
    .then(spells => {
      return res.status(200).send(spells);
    })
    .catch(err => {
      debug('Error retrieving spells. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving spells.');
    });
});

module.exports = router;
