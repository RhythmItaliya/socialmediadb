'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userPosts.init({
    userProfileId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    postText: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isPhoto: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    caption: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isVisibility: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    postUploadURLs: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'userPosts',
  });
  return userPosts;
};