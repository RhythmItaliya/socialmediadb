'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userProfiles.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birthdate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING
    },
    bio: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    photoURL: {
      allowNull: false,
      type: DataTypes.STRING
    },
    token: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'userProfiles',
  });
  return userProfiles;
};