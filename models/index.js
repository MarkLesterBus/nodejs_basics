const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.movies = require("./movies.model.js")(mongoose);
db.users = require("./users.models")(mongoose);
db.services = require("./services.model")(mongoose);

module.exports = db;