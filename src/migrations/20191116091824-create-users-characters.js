'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable('users_characters', {
          userId: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'users',
              },
              key: 'id'
            },
            allowNull: false
          },
          characterId: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'characters',
              },
              key: 'id'
            },
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        }, { transaction: t }),
        queryInterface.createTable('characters_spells', {
          characterId: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'characters',
              },
              key: 'id'
            },
            allowNull: false
          },
          spellId: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'spells',
              },
              key: 'id'
            },
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
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
