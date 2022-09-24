'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gblog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.gblog.belongsTo(models.user);
      models.gblog.hasMany(models.comment);
    }
  }
  gblog.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    topic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'gblog',
  });
  return gblog;
};