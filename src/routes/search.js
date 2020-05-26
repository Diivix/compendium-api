const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:spell'); // debug logger
const utils = require('../utils/common');
const spellUtils = require('../utils/spells');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async function (req, res) {
  const userId = parseInt(req.user.id);
  const query = req.query.query;
  const results = [];
  let hasError = false;

  // TODO: Fix error handling: https://dev.to/nedsoft/central-error-handling-in-express-3aej
  if (query === null || query === '') return res.status(400).send('A search query must be provided.');
  if (query.length < 3) return res.status(400).send("A search query must be longer than 3 characters.");

  // Search characters
  const characters = await db.characters
    .findAll({
      where: { userId: userId, name: { [Op.like]: `%${query}%` } },
      attributes: ['id', 'name', 'description'],
    })
    .catch((err) => {
      debug('Error searching characters. %o', JSON.stringify(err));
      hasError = true;
      return null;
    });

  // Search Spells
  const spells = await db.spells
    .findAll({
      where: { name: { [Op.like]: `%${query}%` } },
      attributes: ['id', 'name', 'level', 'school'],
    })
    .catch((err) => {
      debug('Error searching spells. %o', JSON.stringify(err));
      hasError = true;
      return null;
    });

  // Build results
  try {
    if (characters !== null && characters.length > 0) {
      results.push(...buildCharacterResults(characters));
    }

    if (spells !== null && spells.length > 0) {
      results.push(...buildSpellResults(spells));
    }
  } catch (err) {
    debug('Error building search results. %o', JSON.stringify(err));
    hasError = true;
  }

  if (hasError) return res.status(500).send();

  return res.status(200).send(results);
});

const buildCharacterResults = (characters) => {
  return characters.map((x) => buildResult(x.id, 'character', x.name, x.description));
};

const buildSpellResults = (spells) => {
  return spells.map((x) => {
    const builtLevel = spellUtils.buildLevel(x.level, x.school);
    return buildResult(x.id, 'spell', x.name, builtLevel);
  });
};

const buildResult = (id, type, title, description) => {
  return {
    id,
    type,
    title,
    description: utils.truncate(description, 20),
  };
};

module.exports = router;
