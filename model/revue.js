'use strict';

const models = require(".");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Revue extends Model {
   
    static associate(models) {
      // define association here
      
    }     
  }  
  Revue.init({
    journal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Revue',
  });
  return Revue; 
};