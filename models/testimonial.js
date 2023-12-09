'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testimonials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  testimonials.init({
    writerUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    receiverUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    testimonialText: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isApproved: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isReported: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isDeleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    privacySetting: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'testimonials',
  });
  return testimonials;
};