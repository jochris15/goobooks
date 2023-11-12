'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wishlist.init({
    title: DataTypes.STRING,
    preview: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    bookId: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};