const router = require('express').Router();
const Op = require('sequelize').Op;
const db = require('../models');
const debug = require('debug')('route:spell'); // debug logger
const unique = require('../utils/unique');

const exclusionAttributes = { attributes: { exclude: ['description', 'atHigherLevels', 'reference', 'createdAt', 'updatedAt'] } };

//
// Get all spells
// [optional] url query param "lightlyload"
router.get('/', function(req, res) {
  //TODO: Check if param exists, even with no value.
  const attributes = req.query.lightlyload === 'true' ? exclusionAttributes : {};

  return db.spells
    .findAll(attributes)
    .then(spells => {
      return res.status(200).send(spells);
    })
    .catch(err => {
      debug('Error retrieving spells. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving spells.');
    });
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
// Get spells by tags
//
// If the id property exists, don't consider the tags.
// Use AND operator if tags exists and operatorIsAnd is true. Otherwise default to OR operator.
// Query object example (req.body)
// {
//    "id": 1,
//    "tags": ["classtype-sorcerer", "range-touch"]
//    "operatorAnd": true | false
// }
//
router.post('/', function(req, res) {
  const query = req.body;

  if (!query.hasOwnProperty('id') && !query.hasOwnProperty('tags')) {
    return res.status(400).send('Bad query. Both id and tags cannot be null.');
  }

  const id = query.hasOwnProperty('id') && !isNaN(query.id) ? parseInt(query.id) : 0;
  const queryAttributes = id !== 0 ? { where: { id: id } } : {};
  const combinedAttributes = req.query.lightlyload === 'true' ? Object.assign(queryAttributes, exclusionAttributes) : queryAttributes;

  const operatorAnd = query.hasOwnProperty('operatorAnd') && query.operatorAnd === true ? true : false;

  return db.spells
    .findAll(combinedAttributes)
    .then(spells => {
      if (spells.length > 1 && query.hasOwnProperty('tags')) {
        let filteredSpells = [];
        if (operatorAnd) {
          // FIXME: This is bad. Were getting all the spells from the db then filtering on them :(
          filteredSpells = spells.filter(spell => query.tags.every(tag => spell.tags.includes(tag)));
        } else {
          // FIXME: This is bad. Were getting all the spells from the db then filtering on them :(
          filteredSpells = spells.filter(spell => spell.tags.some(tag => query.tags.includes(tag)));
        }
        return res.status(200).send(filteredSpells);
      }
      return res.status(200).send(spells);
    })
    .catch(err => {
      debug('Error retrieving spells. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving spells.');
    });
});

module.exports = router;
