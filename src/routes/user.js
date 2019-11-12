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
      debug('There was an error getting the user', JSON.stringify(err));
      return res.status(500).send(err);
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
      debug('There was an error creating the user', JSON.stringify(err));
      return res.status(500).send(err);
    });
});

router.delete('/', function(req, res) {
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then(user => user.destroy({ force: true }))
    .then(() => res.status(200).send(id))
    .catch(err => {
      debug('There was an error getting the user', JSON.stringify(err));
      return res.status(500).send(err);
    });
});

const cleanUser = user => {
  return {
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

module.exports = router;
