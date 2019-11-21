const express = require('express');
const router = express.Router();
const db = require('../models');
const debug = require('debug')('route:user'); // debug logger

router.get('/', function(req, res) {
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then(user => res.status(200).send(cleanUser(user)))
    .catch(err => {
      debug('Error retrieving user.', JSON.stringify(err));
      return res.status(500).send("Error retrieving user.");
    });
});

router.post('/', async function(req, res) {
  let { email } = req.body;
  const date = new Date().toISOString();

  db.users
    .create({ email, date, date })
    .then(user => {
      return res.status(200).send(user);
    })
    .catch(err => {
      debug('Error creating user.', JSON.stringify(err));
      return res.status(500).send("Error creating user.");
    });
});

router.delete('/', function(req, res) {
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then(user => user.destroy({ force: true }))
    .then(() => res.status(200).send(id))
    .catch(err => {
      debug('Error removing user.', JSON.stringify(err));
      return res.status(500).send("Error removing user.");
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
