const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:spell'); // debug logger
const utils = require('../utils/spells');

router.get('/', function(req, res) {
  const query = req.query.lightlyload;
  return res.status(501).send("Not implemented.");
});