'use strict';
module.exports = (sequelize, DataTypes) => {
  const spells = sequelize.define('spells', {
    name: DataTypes.STRING,
    classtypes: DataTypes.STRING,
    components: DataTypes.STRING,
    school: DataTypes.STRING,
    level: DataTypes.INTEGER,
    castingtime: DataTypes.STRING,
    range: DataTypes.STRING,
    materials: DataTypes.STRING,
    duration: DataTypes.STRING,
    description: DataTypes.STRING,
    athigherlevels: DataTypes.STRING,
    reference: DataTypes.STRING
  }, {});
  spells.associate = function(models) {
    // associations can be defined here
    spells.belongsToMany(models.characters, { through: 'characters_spells' });
  };
  return spells;
};