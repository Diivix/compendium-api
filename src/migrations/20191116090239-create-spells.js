'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      classTypes: {
        type: Sequelize.JSON
      },
      components: {
        type: Sequelize.JSON
      },
      school: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      castingTime: {
        type: Sequelize.STRING
      },
      range: {
        type: Sequelize.STRING
      },
      materials: {
        type: Sequelize.STRING(500)
      },
      duration: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(5000)
      },
      atHigherLevels: {
        type: Sequelize.STRING(5000)
      },
      reference: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('spells');
  }
};