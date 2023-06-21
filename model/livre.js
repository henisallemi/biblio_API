'use strict';

const models = require(".");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livre extends Model {
   
    static associate(models) {
      // define association here
      
    }
  } 
  Livre.init({
    mot_cles: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Livre',
  });
  return Livre; 
};