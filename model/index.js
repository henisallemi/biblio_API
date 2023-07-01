const Sequelize = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
  "host": host,
  "dialect": "mysql"
});

const DataTypes = Sequelize.DataTypes;
//Ouvrage , Article , Revue , Livre : 
const Ouvrage = sequelize.define("Ouvrage", {
  isbn: DataTypes.STRING,
  titre: DataTypes.STRING,
  editeur: DataTypes.STRING,     
  date: DataTypes.STRING,
  auteur1: DataTypes.STRING,
  nombreExemplaire: DataTypes.INTEGER,
  nombreDisponible: DataTypes.INTEGER,
  description: DataTypes.STRING,  
})   

const Article = sequelize.define('Article', {
  conference: DataTypes.STRING,
  auteur2: DataTypes.STRING,        
}); 

const Livre = sequelize.define("Livre", {
  auteur2: DataTypes.STRING,
  auteur3: DataTypes.STRING,
  auteur4: DataTypes.STRING,
});

const Revue = sequelize.define("Revue", {
  journal: DataTypes.STRING
});


Livre.hasOne(Ouvrage, {
  onDelete: "CASCADE",
  foreignKey: 'livreId',
  as: "ouvrage"
})

Ouvrage.belongsTo(Livre, {
  onDelete: "CASCADE",
  foreignKey: 'livreId',
  as: "livre"
})

Revue.hasOne(Ouvrage, {
  onDelete: "CASCADE",
  foreignKey: 'revueId',
  as: "ouvrage"
})

Ouvrage.belongsTo(Revue, {
  onDelete: "CASCADE",
  foreignKey: 'revueId',
  as: "revue"
})

Article.hasOne(Ouvrage, {
  onDelete: "CASCADE",
  foreignKey: 'articleId',
  as: "ouvrage"
})

Ouvrage.belongsTo(Article, {
  onDelete: "CASCADE",
  foreignKey: 'articleId',
  as: "article"
})

//Personne , Auteur , Adherents :  
const User = sequelize.define("User", {
  image: DataTypes.STRING,
  cin: DataTypes.STRING,
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  telephone: DataTypes.STRING,
  email: DataTypes.STRING,
  motDePasse: DataTypes.STRING,
  nombreLivrePrendre: DataTypes.INTEGER,
  role: DataTypes.INTEGER,
})

Ouvrage.belongsToMany(User, { through: "Emprunt" });
User.belongsToMany(Ouvrage, { through: "Emprunt" });

module.exports = {
  sequelize,
  Sequelize,
  Article,
  Ouvrage,
  Livre,
  Revue,
  User
} 