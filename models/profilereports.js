'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profileReports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profileReports.init({
    reporterId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    reportedUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    reason: {
      allowNull: false,
      type: DataTypes.STRING
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'profileReports',
  });
  return profileReports;
};