// charger dotenv
require('dotenv').config();

// exporter URL base de données
module.exports = {
  DB_URL: process.env.DATABASE_URL
};