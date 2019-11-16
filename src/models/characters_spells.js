'use strict';
module.exports = (sequelize, DataTypes) => {
  const characters_spells = sequelize.define('characters_spells', {
    characterid: DataTypes.INTEGER,
    spellid: DataTypes.INTEGER
  }, {});
  characters_spells.associate = function(models) {
    // associations can be defined here
  };
  return characters_spells;
};