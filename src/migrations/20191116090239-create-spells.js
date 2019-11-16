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
        type: Sequelize.STRING
      },
      components: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      atHigherLevels: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
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