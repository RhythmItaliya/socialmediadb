'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profileRatings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profileRatings.init({
    raterId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ratedUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rating: {
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
    modelName: 'profileRatings',
  });
  return profileRatings;
};