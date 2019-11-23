const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:user'); // debug logger

//
// Get user
//
router.get('/', function(req, res) {
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then(user => res.status(200).send(cleanUser(user)))
    .catch(err => {
      debug('Error retrieving user. o%', JSON.stringify(err));
      return res.status(500).send("Error retrieving user.");
    });
});

//
// Delete user
//
router.delete('/', function(req, res) {
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then(user => user.destroy({ force: true }))
    .then(() => res.status(200).send(id))
    .catch(err => {
      debug('Error removing user. %o', JSON.stringify(err));
      return res.status(500).send("Error removing user.");
    });
});

//
// Add a character to a user
//
router.post('/character', async function(req, res) {
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
          res.status(201).send(character);
        })
    })
    .catch(err => {
      debug('Error retrieving user and adding characters. %o', JSON.stringify(err));
      return res.status(500).send("Error retrieving user and adding characters.");
    });
});

const cleanUser = user => {
  return {
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

module.exports = router;
