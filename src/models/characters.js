'use strict';
module.exports = (sequelize, DataTypes) => {
  const characters = sequelize.define('characters', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    classType: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  characters.associate = function(models) {
    // associations can be defined here
    characters.belongsToMany(models.users, { through: 'users_characters' });
    characters.belongsToMany(models.spells, { through: 'characters_spells' });
  };
  return characters;
};