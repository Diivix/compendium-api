'use strict';
require('dotenv').config()
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = fs.readFileSync(process.env.SPELLS_DATA);
    const spells = JSON.parse(data);

    spells.forEach(spell => {
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
