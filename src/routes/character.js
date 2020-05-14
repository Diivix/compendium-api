const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:character'); // debug logger

//
// Get all of the user's characters, lightly loaded.
//
router.get('/', function (req, res) {
  const userId = parseInt(req.user.id);

  return db.users
    .findByPk(userId)
    .then((user) => {
      user.getCharacters().then((characters) => res.status(200).send(characters));
    })
    .catch((err) => {
      debug('Error retrieving user and characters. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving user and characters.');
    });
});

//
// Get a full character by ID
//
router.get('/:id', function (req, res) {
  const userId = parseInt(req.user.id);
  const characterId = parseInt(req.params.id);

  return db.characters
    .findOne({ where: { id: characterId, userId: userId } })
    .then((character) => res.status(200).send(character))
    .catch((err) => {
      debug('Error retrieving user and characters. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving user and characters.');
    });
});

//
// Create a character
//
router.post('/', async function (req, res) {
  if (!req.body.name) return res.status(400).send('Character name cannot be empty.');

  const userId = parseInt(req.user.id);
  const { name, level, classType, description } = req.body;
  const date = new Date().toISOString();
  return db.users
    .findByPk(userId)
    .then((user) => { 
      db.characters
        .create({ userId: id, name, level, classType, description, date, date })
        .then((character) => {
          user.addCharacters(character);
          res.status(201).send(character);
      });
    })
    .catch((err) => {
      debug('Error retrieving user and adding characters. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving user and adding characters.');
    });
});

//
// Update a character
//
router.put('/', async function (req, res) {
  // TODO: update this to provide better validation.
  if (!req.body.id) return res.status(400).send('Character id is required.');
  if (!req.body.name) return res.status(400).send('Character name is required.');
  if (!req.body.level) return res.status(400).send('Character level is required.');
  if (!req.body.classType) return res.status(400).send('Character classType is required.');
  if (!req.body.description) return res.status(400).send('Character description is required.');

  const userId = parseInt(req.user.id);
  const characterId = parseInt(req.body.id);

  const character = await db.characters.findOne({ where: { id: characterId, userId: userId } }).catch((err) => {
    debug('Could not find character to update. %o', JSON.stringify(err));
    return null;
  });

  if (character === null) return res.status(500).send('Could not find character to update.');

  // Make sure we only update the DB with the properties we want to update.
  const updatedCharacter = {
    name: req.body.name,
    classType: req.body.classType,
    level: req.body.level,
    description: req.body.description,
  };

  return db.characters
    .update(updatedCharacter, { returning: true, where: { id: characterId, userId: userId } })
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => {
      debug('Error updating character. %o', err);
      return res.status(500).send('Error updating character.');
    });
});

//
// Delete a character
//
router.delete('/:id', async function (req, res) {
  const userId = parseInt(req.user.id);
  const characterId = parseInt(req.params.id);

  const character = await db.characters.findOne({ where: { id: characterId, userId: userId } }).catch((err) => {
    debug('Could not find character to delete. %o', JSON.stringify(err));
    return null;
  });

  if (character === null) return res.status(500).send();

  return db.characters
    .destroy({ where: { id: characterId, userId: userId } })
    .then(res.status(200).send())
    .catch((err) => {
      debug('Error deleting character. %o', JSON.stringify(err));
      return res.status(500).send('Could not delete character.');
    });
});

//
// Add a spell to a character
//
router.put('/addspell', async function (req, res) {
  if (!req.body.characterId) return res.status(400).send('A Character ID is required.');
  if (!req.body.spellId) return res.status(400).send('A Spell ID is required.');

  const userId = parseInt(req.user.id);
  const characterId = parseInt(req.params.id);
  const spellId = parseInt(req.params.spellId);

  const character = await db.characters
    .findOne({ where: { id: characterId, userId: userId } })
    .catch((err) => {
      debug('Error retrieving user. %o', JSON.stringify(err));
      return null;
  });

  const spell = await db.spells.findByPk(spellId).catch((err) => {
    debug('Error retrieving spell. %o', JSON.stringify(err));
    return null;
  });

  if (!user) return res.status(500).send('Error retrieving user.');
  if (!character) return res.status(500).send('Error retrieving character.');
  if (!spell) return res.status(500).send('Error retrieving spell.');

  const character_spell = await db.characters_spells
    .findOne({ where: { characterId, spellId } })
    .catch((err) => {
      debug('Error retrieving characters_spells. %o', JSON.stringify(err));
      return null;
  });

  if (character_spell) {
    return res.status(401).send('Spell has already been added to the character.');
  } else if (character_spell === null) {
    return res.status(500).send('Error retrieving characters_spells.');
  }

  return db.characters_spells
    .create({ characterId, spellId, date, date })
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => {
      debug('Error adding spell to character. %o', err);
      return res.status(500).send('Error adding spell to character.');
    });
});

module.exports = router;
