'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.characters);
  };
  return users;
};