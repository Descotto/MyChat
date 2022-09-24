'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.blog);
      models.comment.belongsTo(models.gblog);
      models.comment.belongsTo(models.user);

    }
  }
  comment.init({
    userId: DataTypes.INTEGER,
    gblogId: DataTypes.INTEGER,
    blogId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};