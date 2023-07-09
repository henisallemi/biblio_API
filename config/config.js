const dotenv = require('dotenv');
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const ADMIN = 1;
const ADHERANT = 2;

const LIVRE = 1;
const ARTICLE = 2;
const REVUE = 3;

module.exports = {
  ADMIN,
  ADHERANT,
  LIVRE,
  ARTICLE,
  REVUE,
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "mysql"
  },
  "test": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "mysql"
  },
  "production": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "mysql"
  }
}
