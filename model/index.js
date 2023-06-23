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
  annee: DataTypes.STRING,
  date: DataTypes.DATE,
  auteur1: DataTypes.STRING,  
  nombreExemplaire: DataTypes.STRING,
}) 

const Article = sequelize.define('Article', {
  conference: DataTypes.STRING
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
  foreignKey: 'livreId'
})

Ouvrage.belongsTo(Livre, {
  onDelete: "CASCADE",
  foreignKey: 'livreId'
})

Revue.hasOne(Ouvrage, {
  onDelete: "CASCADE",
  foreignKey: 'revueId'
})

Ouvrage.belongsTo(Revue, {
  onDelete: "CASCADE",
  foreignKey: 'revueId'
})
 
Article.hasOne(Ouvrage, {
  onDelete: "CASCADE",
  foreignKey: 'articleId'
})

Ouvrage.belongsTo(Article, {    
  onDelete: "CASCADE",
  foreignKey: 'articleId'
})

//Personne , Auteur , Adherents : 
const Personne = sequelize.define("Personne", {
  cin: DataTypes.STRING,
  nom: DataTypes.STRING,
  prenom : DataTypes.STRING,
  telephone : DataTypes.STRING,
  email : DataTypes.STRING,
  motDePasse : DataTypes.STRING, 
})
const Admin = sequelize.define("Admin", {
  matricule: DataTypes.STRING,
}); 
const Adherent = sequelize.define("Adherent", {
  numIns: DataTypes.STRING, 
}); 
Admin.hasOne(Personne, {
  onDelete: "CASCADE", 
  foreignKey: 'adminId'
})  

Personne.belongsTo(Admin, {
  onDelete: "CASCADE",
  foreignKey: 'adminId'
})
Adherent.hasOne(Personne, {
  onDelete: "CASCADE",
  foreignKey: 'adherentId'
})

Personne.belongsTo(Adherent, {
  onDelete: "CASCADE",
  foreignKey: 'adherentId'
}) 
//Les autres Associations :
Adherent.belongsTo(Ouvrage, {
  onDelete: "CASCADE",
  foreignKey: 'adherentId'
})

Ouvrage.belongsTo(Adherent, {
  onDelete: "CASCADE",
  foreignKey: 'ouvrageId'
})  
Admin.belongsTo(Ouvrage, {
  onDelete: "CASCADE",
  foreignKey: 'adminId'
})  
Ouvrage.hasOne(Admin, {
  onDelete: "CASCADE",
  foreignKey: 'ouvrageId'
})     

module.exports = {
  sequelize,
  Sequelize,
  Article,
  Ouvrage,
  Livre,
  Revue,
  Adherent,
  Personne,
  Admin
}