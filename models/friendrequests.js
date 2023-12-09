'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friendRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  friendRequests.init({
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    receiverId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    requestStatus: {
      allowNull: false,
      type: DataTypes.ENUM('Pending', 'Rejected'),
      defaultValue: 'Pending',
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    modelName: 'friendRequests',
  });
  return friendRequests;
};