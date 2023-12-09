'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postMentions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  postMentions.init({
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userProfileId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    mentionedUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    modelName: 'postMentions',
  });
  return postMentions;
};