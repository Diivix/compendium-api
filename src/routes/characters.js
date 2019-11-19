const express = require('express');
const router = express.Router();
const db = require('../models');
const debug = require('debug')('route:user'); // debug logger

//
// Get all of the user's characters
//
router.get('/', function(req, res) {
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then(user => {
      user.getCharacters()
        .then(characters => res.status(200).send(characters))
    })
    .catch(err => {
      debug('There was an error getting the user', JSON.stringify(err));
      return res.status(500).send(err);
    });
});

//
// Add a character to a user
//
router.post('/', async function(req, res) {
  if(!req.body.name) return res.status(200).send("Character name cannot be empty.");

  const id = parseInt(req.user.id);
  const { name, level, classType, description } = req.body;
  const date = new Date().toISOString();
  return db.users
    .findByPk(id)
    .then(user => {
      db.characters
        .create({ userId: id, name, level, classType, description, date, date })
        .then(character => {
          user.addCharacters(character);
          res.status(200).send(character);
        })
    })
    .catch(err => {
      debug('There was an error getting the user', JSON.stringify(err));
      return res.status(500).send(err);
    });
});

//
// Delete a character
//
router.delete('/:id', function(req, res) {
  const id = parseInt(req.user.id);
  const characterId = parseInt(req.params.id)
  return db.users
    .findByPk(id)
    .then(user => {
        user.removeCharacters(characterId)
        .then(characters => res.status(200).send(characters));
    })
    .catch(err => {
      debug('There was an error getting the user', JSON.stringify(err));
      return res.status(500).send(err);
    });
});

module.exports = router;
