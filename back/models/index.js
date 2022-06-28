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

db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);

db.comments.belongsTo(db.users);
db.comments.belongsTo(db.posts);
db.users.hasMany(db.comments);
db.posts.hasMany(db.comments);

db.users.belongsToMany(db.posts, {through: 'likes', as: 'like'});
db.posts.belongsToMany(db.users, {through: 'likes', as: 'liked'});


module.exports = db;