'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable('users_characters', {
          userid: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'users',
                schema: 'schema'
              },
              key: 'id'
            },
            allowNull: false
          },
          characterid: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'characters',
                schema: 'schema'
              },
              key: 'id'
            },
            allowNull: false
          }
        }, { transaction: t }),
        queryInterface.createTable('characters_spells', {
          characterid: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'characters',
                schema: 'schema'
              },
              key: 'id'
            },
            allowNull: false
          },
          spellid: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'spells',
                schema: 'schema'
              },
              key: 'id'
            },
            allowNull: false
          }
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
          queryInterface.dropTable('users_characters'),
          queryInterface.dropTable('characters_spells')
        ])
    })
  }
};
