'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Utilisateur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    motDePasse: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};