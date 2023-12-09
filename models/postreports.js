'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postReports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  postReports.init({
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    reportingUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    reportReason: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isResolved: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    modelName: 'postReports',
  });
  return postReports;
};