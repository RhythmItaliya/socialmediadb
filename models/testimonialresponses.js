'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testimonialResponses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  testimonialResponses.init({
    testimonialId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    respondentUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    responseText: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isDeleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'testimonialResponses',
  });
  return testimonialResponses;
};