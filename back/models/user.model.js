const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");
const db = require("../models");
const Post = db.posts;

module.exports = (sequelize, Sequelize) => {

const User = sequelize.define("user", {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    emailAddress: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    fonction: {
        type: Sequelize.STRING
    },
    site: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }

});


return User
};