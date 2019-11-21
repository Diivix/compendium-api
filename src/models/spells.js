'use strict';
module.exports = (sequelize, DataTypes) => {
  const spells = sequelize.define('spells', {
    name: DataTypes.STRING,
    classTypes: DataTypes.JSON,
    components: DataTypes.JSON,
    school: DataTypes.STRING,
    level: DataTypes.INTEGER,
    castingTime: DataTypes.STRING,
    range: DataTypes.STRING,
    materials: DataTypes.STRING(500),
    duration: DataTypes.STRING,
    description: DataTypes.STRING(5000),
    atHigherLevels: DataTypes.STRING(5000),
    reference: DataTypes.STRING
  }, {});
  spells.associate = function(models) {
    // associations can be defined here
    spells.belongsToMany(models.characters, { through: 'characters_spells' });
  };
  return spells;
};