'use strict';

const models = require(".");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
   
    static associate(models) {
      // define association here
      
    }
  } 
  Article.init({
    conference: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article; 
};