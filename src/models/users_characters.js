'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_characters = sequelize.define('users_characters', {
    userId: DataTypes.INTEGER,
    characterId: DataTypes.INTEGER
  }, {});
  users_characters.associate = function(models) {
    // associations can be defined here
  };
  return users_characters;
};