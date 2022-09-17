'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emoji extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  emoji.init({
    character: DataTypes.STRING,
    codePoint: DataTypes.STRING,
    group: DataTypes.STRING,
    slug: DataTypes.STRING,
    subgroup: DataTypes.STRING,
    unicodeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'emoji',
  });
  return emoji;
};