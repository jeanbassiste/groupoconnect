const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.comments = require('./comment.model.js')(sequelize, Sequelize);
db.likes = require('./like.model.js')(sequelize, Sequelize);
db.favs = require('./fav.model.js')(sequelize, Sequelize);


db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);

db.comments.belongsTo(db.users);
db.comments.belongsTo(db.posts);
db.users.hasMany(db.comments);
db.posts.hasMany(db.comments);

db.likes.belongsTo(db.posts);
db.posts.hasMany(db.likes);
db.likes.belongsTo(db.users);
db.users.hasMany(db.likes);

db.favs.belongsTo(db.posts);
db.posts.hasMany(db.favs);
db.favs.belongsTo(db.users);
db.users.hasMany(db.favs);

module.exports = db;