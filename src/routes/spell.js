const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:spell'); // debug logger
const utils = require('../utils/spells');

const exclusionAttributes = { attributes: { exclude: ['description', 'atHigherLevels', 'reference', 'createdAt', 'updatedAt'] } };

//
// Get all spells
// [optional] url query param "lightlyload"
// [optional] url query param "limit"
router.get('/', function(req, res) {
  //TODO: Check if param exists, even with no value.
  let attributes = req.query.lightlyload === 'true' ? exclusionAttributes : {};
  attributes = req.query.limit ? Object.assign(attributes, { limit: req.query.limit }) : attributes;

  // FIXME: bug with ORDER causing all spells to be returned instead of a limited number of spells
  return db.spells
    .findAll({ attributes, order: [['name', 'asc']] })
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
      return res.status(200).send(utils.unique(spells));
    })
    .catch(err => {
      debug('Error retrieving spells. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving spells.');
    });
});

//
// Gets spells all spell names with IDs and unique tags.
// These are the filters that the users will use to send to /spells/query route.
//
router.get('/filters', function(req, res) {
  return db.spells
    .findAll({ attributes: ['id', 'name', 'tags'] })
    .then(spells => {
      return res.status(200).send(utils.filters(spells));
    })
    .catch(err => {
      debug('Error retrieving spell filters. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving spell filters.');
    });
});

//
// Get spells by id OR tags
//
// [optional] url query param "lightlyload"
// [optional] url query param "limit"
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
router.post('/query', function(req, res) {
  const query = req.body;

  if (!query.hasOwnProperty('id') && !query.hasOwnProperty('tags')) {
    return res.status(400).send('Bad query. Both ID and tags cannot be null.');
  }

  if(query.hasOwnProperty('id') && isNaN(query.id)) {
    return res.status(400).send('Bad query. ID must be a number.'); 
  }

  const id = query.hasOwnProperty('id') && !isNaN(query.id) ? parseInt(query.id) : 0;
  let attributes = id !== 0 ? { where: { id: id } } : {};
  attributes = req.query.lightlyload === 'true' ? Object.assign(attributes, exclusionAttributes) : attributes;
  attributes = req.query.limit ? Object.assign(attributes, { limit: req.query.limit }) : attributes;

  const operatorAnd = query.hasOwnProperty('operatorAnd') && query.operatorAnd === true ? true : false;

  return db.spells
    .findAll({ attributes, order: [[ 'name', 'asc' ]] })
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
