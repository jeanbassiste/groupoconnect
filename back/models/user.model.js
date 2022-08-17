const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");
const db = require("../models");
const Post = db.posts;

module.exports = (sequelize, Sequelize) => {

const User = sequelize.define("user", {
    firstName: {
        type: Sequelize.STRING(64)
    },
    lastName: {
        type: Sequelize.STRING(64)
    },
    emailAddress: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING(64)
    },
    role: {
        type: Sequelize.STRING(64)
    },
    fonction: {
        type: Sequelize.STRING(64)
    },
    site: {
        type: Sequelize.STRING(64)
    },
    image: {
        type: Sequelize.STRING
    }

});


return User
};