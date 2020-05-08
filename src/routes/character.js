const router = require('express').Router();
const db = require('../models');
const debug = require('debug')('route:character'); // debug logger

//
// Get all of the user's characters
//
router.get('/', function(req, res) {
  const id = parseInt(req.user.id);
  return db.users
    .findByPk(id)
    .then(user => {
      user.getCharacters().then(characters => res.status(200).send(characters));
    })
    .catch(err => {
      debug('Error retrieving user and characters. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving user and characters.');
    });
});

//
// Delete a character
//
router.delete('/:id/:characterId', function(req, res) {
  const userId = parseInt(req.user.id);
  const characterId = parseInt(req.params.id);

  return db.users
    .findByPk(userId)
    .then(user => {
      user.removeCharacters(characterId).then(characters => res.status(200).send(characters));
    })
    .catch(err => {
      debug('Error retrieving user and removing characters. %o', JSON.stringify(err));
      return res.status(500).send('Error retrieving user and removing characters.');
    });
});

//
// Add a spell to a character
//
router.put('/:id/spell/:spellId', async function(req, res) {
  const userId = parseInt(req.user.id);
  const characterId = parseInt(req.params.id);
  const spellId = parseInt(req.params.spellId);

  const user = await db.users.findByPk(userId).catch(err => {
    debug('Error retrieving user. %o', JSON.stringify(err));
    return null;
  });

  const spell = await db.spells.findByPk(spellId).catch(err => {
    debug('Error retrieving spell. %o', JSON.stringify(err));
    return null;
  });

  if (!user) return res.status(500).send('Error retrieving user.');
  if (!spell) return res.status(500).send('Error retrieving spell.');

  return user.getCharacters({ where: { id: characterId } }).then(characters => {
    if (characters && characters.length === 1) {
      characters[0]
        .addSpell(spell)
        .then(result => {
          if (result) {
            return res.status(201).send(result);
          } else {
            return res.status(204); // 204 - no response, spell already associated.
          }
        })
        .catch(err => {
          debug('Error associating character with spell. %o', JSON.stringify(err));
          return res.status(500).send('Error associating character with spell.');
        });
    } else {
      debug('Error adding spell to character: ' + characterId);
      return res.status(500).send('Error retrieving character.');
    }
  });
});

module.exports = router;
