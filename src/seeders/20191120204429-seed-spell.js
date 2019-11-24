'use strict';
require('dotenv').config();
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = fs.readFileSync(process.env.SPELLS_DATA);
    const spells = JSON.parse(data);

    spells.forEach(spell => {
      spell.tags = createTags(spell);

      spell.classTypes = JSON.stringify(spell.classTypes);
      spell.components = JSON.stringify(spell.components);
      spell.createdAt = new Date();
      spell.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('spells', spells, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('spells', null, {});
  }
};

function createTags(spell) {
  let tags = [];

  // Classes
  spell.classTypes.forEach(value => tags.push('classtype-' + value));

  // Components
  spell.components.forEach(value => {
    switch (value) {
      case 'v':
        tags.push('component-verbal');
        break;
      case 's':
        tags.push('component-somatic');
        break;
      case 'm':
        tags.push('component-material');
        break;
    }
  });

  // School
  tags.push('school-' + spell.school);

  // Level
  if (spell.level === 0) {
    tags.push('level-cantrip');
  } else if (spell.level >= 1 && spell.level <= 3) {
    tags.push('level-low_level');
  } else if (spell.level >= 4 && spell.level <= 6) {
    tags.push('level-mid_level');
  } else {
    tags.push('level-high_level');
  }

  // Cast time
  if (spell.castingTime === '1 action') {
    tags.push('castingtime-action');
  } else if (spell.castingTime === '1 bonus action') {
    tags.push('castingtime-bonus_action');
  } else if (spell.castingTime === '1 minute' || spell.castingTime === '10 minutes') {
    tags.push('castingtime-short_duration');
  } else {
    tags.push('castingtime-long_duration');
  }

  // Range
  if (spell.range === 'self') {
    tags.push('range-self');
  } else if (spell.range === 'touch') {
    tags.push('range-touch');
  } else {
    tags.push('range-ranged');
  }

  // Duration
  if (spell.duration.includes('concentration')) {
    tags.push('duration-concentration');
  } else if (spell.duration.includes('instantaneous')) {
    tags.push('duration-instantaneous');
  } else if (spell.duration.includes('minute') || spell.duration.includes('minutes') || spell.duration.includes('1 hour')) {
    tags.push('duration-short_duration');
  } else if (spell.duration.includes('until dispelled')) {
    tags.push('duration-until_dispelled');
  } else {
    tags.push('duration-long_duration');
  }

  // Reference
  if (spell.reference.includes('players handbook')) {
    tags.push('reference-players_handbook');
  } else if (spell.reference.includes('xanathar')) {
    tags.push('reference-xanathars_guide');
  } else if (spell.reference.includes('ee players companion')) {
    tags.push('reference-ee_players_companion');
  } else {
    tags.push('reference-unknown_book');
  }

  return JSON.stringify(tags);
}
