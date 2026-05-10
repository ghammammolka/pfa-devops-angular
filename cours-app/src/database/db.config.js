const config = require('../config/config');
const mongoose = require('mongoose');

// objet database
const db = {};

db.mongoose = mongoose;
db.url = config.DB_URL;

module.exports = db;

// importer models
db.courses = require('../api/models/course.model')(mongoose);
db.formateurs = require('../api/models/formateur.model')(mongoose);