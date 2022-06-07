const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");

const db = require("../models");
const User = db.users;

module.exports = (sequelize, Sequelize) => {
    
    const Post = sequelize.define('post', {
        title: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        },
        tag: {
            type: Sequelize.STRING
        }
    });

    //https://sequelize.org/v3/docs/associations/
    return Post
};