'use strict';

const models = require(".");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ouvrage extends Model {
   
    static associate(models) {
      // define association here
      
    } 
  }
  Ouvrage.init({ 
      titre:DataTypes.STRING,
      auteurs:DataTypes.STRING,
      nb_exemplaire:DataTypes.STRING,   
      annéeEdition:DataTypes.STRING,
      
  }, {
    sequelize,
    modelName: 'Ouvrage',
  });
  return Ouvrage; 
};