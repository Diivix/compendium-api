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
        type: Sequelize.STRING
      },
      classtypes: {
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
      castingtime: {
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
      athigherlevels: {
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